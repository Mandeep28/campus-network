import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useLocation } from "react-router-dom";
import NotFound from "../../Pages/NotFound";
import { saveAs } from "file-saver";

const AllNotes = ({  fetchAgain }) => {
  const [question, setQuestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [found, setFound] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const id = params.get("id");
    fetchQuestion(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  //  fetch latest notice
  const fetchQuestion = async (id) => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/user/notes?id=${id}`, config);
      console.log(data);
      setQuestion(data.data);
      setSubjectName(data.subject.name);

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setFound(false);
    }
  };

  if (!found) {
    return <NotFound />;
  }
  if ( question?.length === 0) {
    return (
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <h5>No Notes to show ....</h5>
      </div>
    );
  }

  const filteredItems = question.filter(
    (item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())
    //  || item.uploadBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //  pagination logic start

  const itemsPerPage = 5;
  const pageCount = Math.ceil(question.length / itemsPerPage);
  // const pageCount = 3;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // reset to first page when search query changes
  };





  return (
    <>
      <div className="container py-3" style={{ minHeight: "60vh" }}>
        <h2 className="text-teal my-2 text-center text-capitalize">
          {subjectName} Notes
        </h2>
        <div className="underline-1 mb-4"></div>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Something ...."
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* <button className="btn btn-outline-teal mx-3" onClick={handleSearch} type="submit">
    Search
  </button> */}
        </form>

        {/* single item start */}
        {itemsToDisplay &&
          itemsToDisplay.map((item, index) => {
            return (
              <div className="card my-3 shadow" key={item._id}>
                <div className="card-body">
                  <h5 className="card-title my-2">{item.title}</h5>
                  {/* <p>{parse(item.body.slice(0, 150))}...</p> */}

                  <div className="d-flex  align-items-center  px-2">
                    <div>
                      <img
                        src={item.uploadBy.image}
                        alt=""
                        className="rounded-circle image-fluid"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <a
                        href="#!"
                        className="text-decoration-none d-inline-block mx-3 text-secondary"
                      >
                        <p className="card-text">By {item.uploadBy.name}</p>
                      </a>
                    </div>

                    <div>
                      <p className="card-text  d-inline-block">
                        <small className="text-body-secondary">
                          {" "}
                          {/* {moment(new Date(item.createdAt).toLocaleString()).fromNow()}  */}
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </p>
                      
                    </div>
                    {/* <a href={item.attachment_url} download={item.attachment_url} className="text-decoration-none text-teal" > */}
                    <i
                      className="fa fa-download mx-3 mt-2 fs-5 text-teal"
                      data-url={item.attachment_url}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        console.log("url is :", e.target.dataset.url);
                        
                        saveAs(e.target.dataset.url, e.target.dataset.url);
                      }}
                    ></i>
                    {/* </a> */}
                  </div>
                </div>
              </div>
            );
          })}
        {/* single item end */}
      </div>
      {question.length > 0 && (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"pagination"}
          activeClassName={"active"}
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
        />
      )}
    </>
  );
};

export default AllNotes;

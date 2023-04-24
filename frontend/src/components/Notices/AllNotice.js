import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast } from "react-toastify";
import moment from 'moment'
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";


const AllNotice = ({ endpoint, showTrash, fetchAgain }) => {
  const [notice, setNotice] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotice();
  }, [fetchAgain]);

  //  fetch latest notice
  const fetchNotice = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/${endpoint}`, config);
      console.log(data);
      setNotice(data.data);

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
 

  const filteredItems = notice.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase())
    //  || item.uploadBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //  pagination logic start
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(notice.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // reset to first page when search query changes
  };

  //  handle delete

  const handleDelete = async (e) => {
    // console.log("delted", e.target.id);
    const noticeId = e.target.id;
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete(
        "/api/v1/admin/notice/" + noticeId,
        config
      );
      // console.log(data);
      toast.success("Notice deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }
      fetchNotice();
  };

  // if(question.length > 0 ) {
  //   return (
  //     <div className="container d-flex align-items-center justify-content-center" style={{minHeight : "60vh"} }>
  //       <h5>No question to show ... You can add question anytime.</h5>
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="container" style={{ minHeight: "60vh" }}>
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

        <div className="row row-cols-1 row-cols-sm-4 row-cols-md-4 justify-content-center">

            {/* single item start here  */}
        { itemsToDisplay && itemsToDisplay.map ((item , index)=>{
       

            return (
                <div className=" col card m-3 mx-2 px-2" key={item._id} style={{width: "20rem"}}>
                <img
                  src={item.attachment_url}
                  className="card-img-top img-thumbnail d-inline-block m-auto border-0"
                  alt="notice name"
                  style={{ width: "95%", height: "230px", objectFit: "cover"}}
                />
                <div className="card-body">
                  <h6 className="card-title">
                   <Link to={`/notice/singleNotice/${item._id}`} className="text-dark"> {item.title}</Link>
                   </h6>
                   <div className="d-flex justify-content-between my-3 align-item-center">
                    <div className="d-flex align-items-center ">
                    <img src={item.uploadBy.image} alt="user profile image" style={{width : "30px"}}  className="rounded-circle"/>
                    <p className="d-inline-block mx-1" style={{fontSize: "12px"}}>By <a href="#!" className="text-decoration-none text-dark">{item.uploadBy.name}</a></p>
                    </div>
                    <p style={{fontSize: "12px"}} className="my-2 text-center" >{moment( new Date(item.createdAt).toDateString()).fromNow()}</p>
                   </div>
                {showTrash ? <div className="text-end">
                    <i className="fa fa-trash text-danger fs-5" id={item._id} onClick={handleDelete}></i>
                </div> : ""} 
                </div>
              </div>
            )
        })
    }
    
        {/* single item end here  */}
         

        </div>
      </div>
      {notice.length > 0 && (
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

export default AllNotice;

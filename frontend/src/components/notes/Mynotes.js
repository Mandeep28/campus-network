import React , {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {  toast } from "react-toastify";
import moment from 'moment'
import NotFound from '../../Pages/NotFound'

const Mynotes = ({endpoint , showTrash , fetchAgain}) => {

  const [question , setQuestion ] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

const [found, setFound] = useState(true);
const [currentPage, setCurrentPage] = useState(0);


  useEffect(()=>{
      fetchQuestion();
  },[fetchAgain])


    //  fetch latest notice
    const fetchQuestion = async (id ) => {
      let token = localStorage.getItem("userToken");
      try {
        const config = {
          headers: { "Content-type": "application/json", "auth-token": token },
        };
  
        const { data } = await axios.get(`/api/v1/user/notes`, config);
        console.log(data);
        setQuestion(data.data);
  
        // setLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setFound(false);
      }
    };

    if(!found) {
        return (
            <NotFound/>
        )
    }
   

    const filteredItems = question.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase()) 
        //  || item.uploadBy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //  pagination logic start
   

const itemsPerPage = 5;
const pageCount = Math.ceil(question.length / itemsPerPage);
// const pageCount = 3;

const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
 const itemsToDisplay = filteredItems.slice(startIndex, endIndex);



 const handleSearch = e => {
  setSearchQuery(e.target.value);
  setCurrentPage(0); // reset to first page when search query changes
};

//  handle delete 

const handleDelete = async (e)=>{
  // console.log("delted", e.target.id);
  const notesId = e.target.id;
  console.log(notesId)
  let token = localStorage.getItem("userToken");
  try {
    const config = {
      headers: { "Content-type": "application/json", "auth-token": token },
    };

    const { data } = await axios.delete("/api/v1/user/mynotes/"+notesId, config);
    console.log(data);
    toast.success("Notes deleted successfully", {
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
  fetchQuestion();

  
}


if(question.length < 0 ) {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{minHeight : "60vh"} }>
      <h5>No Notes to show....</h5>
    </div>
  )
}


  return (
    <>
      <div className="container my-3 " style={{minHeight : "60vh"}}>
      <form className="d-flex" role="search">
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search Something ...."
    aria-label="Search"
    value={searchQuery} onChange={handleSearch}
  />
  {/* <button className="btn btn-outline-teal mx-3" onClick={handleSearch} type="submit">
    Search
  </button> */}
</form>

        {/* single item start */}
        { itemsToDisplay && itemsToDisplay.map ((item)=>{
                return (
                    <div className="card my-3 shadow " key={item._id}>
            <div className="card-body">
              <h5 className="card-title my-2">
                    {item.title}
              </h5>
              {/* <p>{parse(item.body.slice(0, 150))}...</p> */}
              

              <div className="d-flex  align-items-center  justify-content-between px-2 flex-wrap ">
               <div>
               <img src={item.uploadBy.image} alt="" className="rounded-circle image-fluid" style={{width: "30px" , height: "30px"}} />
                  <a href="#!" className="text-decoration-none d-inline-block mx-3 text-secondary">
                  <p className="card-text">
                      By {item.uploadBy.name}
                   
                  </p>
                  </a>
               </div>
              
                  <div>
                  <a href={item.attachment_url} download={item.attachment_url} className="text-decoration-none text-teal" >
               <i className="fa fa-download mx-3 mt-2 fs-5"></i>
               </a>
               <i className="fa fa-trash mx-1 fs-5 text-danger cursor-pointer" id={item._id} onClick={handleDelete}></i>
                  </div>
             
              
               <p className="card-text  d-inline-block mx-1">
                    <small className="text-body-secondary">
                      {moment(item.createdAt).fromNow()} 
                      {/* {item.createdAt} */}
                    </small>
                  </p>
                  
                 
              
               
              </div>
            </div>
          </div>
                )

        })}
    {/* single item end */}
      </div>
    { (question.length > 0) && 
     <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => setCurrentPage(selected)}
      containerClassName={'pagination'}
      activeClassName={'active'}
      breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
    />
   
  }
    </>
  );
};

export default Mynotes;

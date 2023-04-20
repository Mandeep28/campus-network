import React from 'react'

const SingleQuestinItem = () => {
  return (
    <div>
       <div className="card shadow shadow-md mb-4">
  <div className="card-body">
    <h5 className="card-title h5">I want to know how to solve the problem of z-index html ? </h5>
    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quo ea harum sed, esse quia quos a hic Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, veniam!....</p>
    <div className='d-flex justify-content-start gap-4'>
        <p className="card-text mx-2"> <small className="text-body-secondary">Post By Mandeep Singh</small></p>
         <p className="card-text"><small className="text-body-secondary">Post At 3 mins ago</small></p>
         <p className="card-text"><small className="text-body-secondary">13 Answer</small></p>
         <p className="card-text"><small className="text-body-secondary"><i className="fa fa-pencil "></i></small></p>
         <p className="card-text"><small className="text-body-secondary"><i className="fa fa-trash "></i></small></p>
         </div>
   
  </div>
</div>
    </div>
  )
}

export default SingleQuestinItem

import React from 'react'
import pageNOtFound from '../assets/images/pageNotFound.jpg'

const NotFound = () => {
  return (
    <div className='container text-center py-4'>
     <img src={pageNOtFound} alt="page not found jpg file" className='mb-5' />
    </div>
  )
}

export default NotFound

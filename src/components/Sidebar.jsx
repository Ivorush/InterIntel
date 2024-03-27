import React from 'react'
import "./sidebar.scss"

import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className='sidebar'>
       <div className='title'>
          <h1>InterIntel Interview  Task</h1>
       </div>
       <div>
           <ul>
             <Link className='link' to="/"><li>Add Product</li></Link>
             <Link className='link' to="/product"><li>View Product</li></Link>

           
           
           </ul>
       
       
       </div>
    </div>
  )
}

export default Sidebar

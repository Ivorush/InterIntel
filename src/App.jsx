import { useState , useEffect} from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Product from './pages/Product';
import Sidebar from './components/Sidebar';



function App() {

  return (
    <>
     <BrowserRouter>
       <div className="container">
         <Sidebar/>
         <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/product" element={<Product/>} />
         </Routes>
       </div>
     </BrowserRouter>
    </>
  )
}

export default App

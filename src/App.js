import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Ytvid from './Components/Ytvid';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import KnowMore from './Components/KnowMore';
import Faq from './Components/Faq';
import About from './Components/About';
import UploadVideoPage from './Components/Uploadvid';
import MyUpload from './Components/MyUpload';
import Form from './Components/Form';
import Contact from './Components/Contact'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ytvid" element={<Ytvid/>} />
        <Route path='/knowmore' element={<KnowMore/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/faq" element={<Faq/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path='/myupload' element={<MyUpload/>}/>
        <Route path='/upload' element={<UploadVideoPage/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;

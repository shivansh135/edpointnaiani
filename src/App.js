import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import NavScrollExample from './components/navbar/navbar';
import {Footer} from './components/footer/footer';
import Login from './components/login/login';
import './App.css'
function App() {
  return (
    <Router>
      <NavScrollExample/>

          <div class="area" >
                  <ul class="circles">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                  </ul>
      </div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

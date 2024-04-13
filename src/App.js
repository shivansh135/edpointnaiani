import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import NavScrollExample from './components/navbar/navbar';
import {Footer} from './components/footer/footer';
import Login from './components/login/login';
import './App.css'
import { Admin } from './components/admin/admin';
import AdminNavScrollExample from './components/admin/navbar/navbar';
import { AdminCource } from './components/admin/course/course';
import { Subject } from './components/admin/course/subject';
import { Videos } from './components/admin/course/videos';
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
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/cource' element={<AdminCource/>}/>
        <Route path='/subject' element={<Subject/>}/>
        <Route path='/videos' element={<Videos/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

function App2(){
  return (
    <Router>
        <AdminNavScrollExample/>

      <Routes>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/cource' element={<AdminCource/>}/>
        <Route path='/subject' element={<Subject/>}/>
        <Route path='/videos' element={<Videos/>}/>
      </Routes>
    </Router>
  );
}


export default App;

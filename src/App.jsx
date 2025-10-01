import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Index from './Pages/Index'
import Login from './Pages/Login'
import Registration from './Pages/Registeration'
import Contact_us from './Pages/Contact_us'
import About_us from './Pages/About_us'
import Re_contactus from './Pages/Re_contactus'
import Carriers from './Pages/Carriers'
import Calculator from './Pages/Calculator'
import PersonalLoanEmi from './Pages/PersonalLoanEmi'
import CarLoanEmi from './Pages/CarLoanEmi'
import BlogPage from './Pages/BlogPage'
import GuidesPage from './Pages/GuidesPage'
import GuideSubPage from './Pages/GuideSubPage '
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Team from './Pages/Team'
import Personal_loan from './Pages/Personal_loan'
import Vehicle_loan from './Pages/Vehicle_loan'
import Home_loan from './Pages/Home_loan'
import Education_loan from './Pages/Education_loan'
import Business_loan from './Pages/Business_loan'
import Insurance_loan from './Pages/Insurance_loan'
import Gold_loan from './Pages/Gold_loan'
import Location from './Pages/Locations'
import Carrier_form from './Pages/Carriers_form'
import Register from './Components/Registration'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route path="/" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><Index  isDarkMode={isDarkMode}/></>} />
        <Route path="/login" element={<><Login  isDarkMode={isDarkMode}/></>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Registration" element={<><Registration  isDarkMode={isDarkMode}/></>} />
        <Route path="/Support" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><Contact_us  isDarkMode={isDarkMode}/></>} />
        <Route path="/About_us" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><About_us  isDarkMode={isDarkMode}/></>} />
        <Route path="/Locations" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><Location  isDarkMode={isDarkMode}/></>} />
        <Route path="/Carriers_form" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><Carrier_form  isDarkMode={isDarkMode}/></>} />
        
        <Route path="/Tools" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Calculator isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Team" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Team isDarkMode={isDarkMode} /></>}></Route>
       
       {/* Loan Pages */}
        <Route path="/Personal_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Personal_loan isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Vehicle_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Vehicle_loan isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Education_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Education_loan isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Business_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Business_loan isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Insurance_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Insurance_loan isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Home_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Home_loan isDarkMode={isDarkMode} /></>}></Route>
        <Route path="/Gold_loan" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <Gold_loan isDarkMode={isDarkMode} /></>}></Route>

        <Route path="/Tools/personal-loan-emi-calculator" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <PersonalLoanEmi isDarkMode={isDarkMode} /></>} />
        <Route path="/Tools/emi-calculator-for-car-loans" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> <CarLoanEmi isDarkMode={isDarkMode} /></>} />
        
        <Route path="/Contact_us" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><Re_contactus isDarkMode={isDarkMode}/></>} />
        <Route path="/Carriers" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><Carriers isDarkMode={isDarkMode}/></>} />
        <Route path="/Blogs" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><BlogPage isDarkMode={isDarkMode}/></>} />
        <Route path="/Guides" element={<><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/><GuidesPage isDarkMode={isDarkMode}/></>} />
        <Route path="/Guides/:tab" element={ <><Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} /><GuideSubPage isDarkMode={isDarkMode} /></>}/>
      </Routes>
    </Router>
  )
}

export default App

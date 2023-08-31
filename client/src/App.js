import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Books from './pages/Books';
import Update from './pages/Update';
import CheckIn from './pages/Checkin';
import CheckOut from './pages/Checkout'
import FootTrafficTable from './pages/FootTrafficTable';
import CheckInTable from './pages/CheckInTable';
import CheckOutTable from './pages/CheckOutTable';

import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Books/>}/>           
          <Route path = "/checkin" element = {<CheckIn/>}/>
          <Route path = "/checkout" element = {<CheckOut/>}/>
          <Route path = "/foot-traffic-table" element = {<FootTrafficTable/>}/>
          <Route path = "/check-in-table" element = {<CheckInTable/>}/>
          <Route path = "/check-out-table" element = {<CheckOutTable/>}/>
          <Route path = "/update/:id" element = {<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

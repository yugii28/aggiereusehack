import React, { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../App.css'


{/* how to fetch data from sql server in react */}

const Books = () => {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);


    const addFootTraffic = async e => {
        try{
            await axios.post("http://localhost:8800/foottraffic")
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false); // Hide the "Item added!" message after 3 seconds
              }, 1000);
        }catch(err){
           console.log(err);
        }
    }
    
  return (
    <div>
        <div class="main-body">
            <div class="navbar-alpha">
                <nav onClick = {() => navigate("/")} className="navbar">
                    <img className ="logoImage" src="/logo.png" size="130" width="130"></img>
                    <div className="column1">
                        <h1 className="heavy">Aggie Reuse Store</h1>
                        <h1 className="asucd">ASUCD</h1>
                    </div>
                </nav>
                <button><h1 class="inspect-data" onClick = {() => navigate("/foot-traffic-table")}> INSPECT <br></br>FOOT <br></br>TRAFFIC</h1></button>
            </div>
                <div className="image-choose">
                    <div class="element">
                            <button><Link to = "/checkin"><img onClick = {() => navigate("/checkin")} className="curve-img" src="donate1.jpeg"  width="350"></img></Link></button>
                            <h1>DONATIONS</h1>
                    </div>
                    <div class="element">
                        <button><Link to = "/checkout"><img onClick = {() => navigate("/checkout")} className="curve-img" src="checkout.avif" width="350"></img></Link></button>
                        <h1>CHECK OUT</h1>
                    </div>
                    <div class="element">
                    {showMessage && (
                    <div className="modal">
                        <div className="modal-content">
                             <h3>Person Counted!</h3>
                        </div>
                    </div>
                    )}         
                    <button><img onClick = {() => addFootTraffic()} className="curve-img" src="footraffic.jpeg" width="350"></img></button>
                    <h1>INCREMENT FOOT TRAFFIC</h1>
                    </div>
                </div>
            </div>
         </div>
  )
}

export default Books
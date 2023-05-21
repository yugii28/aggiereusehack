import React, { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../App.css'

{/* how to fetch data from sql server in react */}

const Books = () => {
    const navigate = useNavigate()

    const addFootTraffic = async e => {
        try{
            await axios.post("http://localhost:8800/foottraffic")
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
                <button><h1 class="inspect-data" onClick = {() => navigate("/foot-traffic-table")}> INSPECT <br></br>DATA</h1></button>
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
                    <button><img onClick = {() => addFootTraffic()} className="curve-img" src="footraffic.jpeg" width="350"></img></button>
                    <h1>INCREMENT FOOT TRAFFIC</h1>
                    </div>
                </div>


                    {/* <button onClick = {() => router.push("/checkin")}>Check in</button>
                    <button onClick = {() => router.push("/checkout")}>Check out</button>
                    <button onClick = {() => addFootTraffic()}>Foot traffic</button> */}
                </div>
        {/* <button className='add'>
            <Link to = "/add">
                <h3>Add new book</h3>
            </Link>
        </button>
        <button onClick = {() => addFootTraffic()}>Foot traffic</button>
        <button>
            <Link to = "/checkin">
                <h3>Check in</h3>
            </Link>        
        </button>
        <button>
            <Link to = "/checkout">
                <h3>Check out</h3>
            </Link>        
        </button>    
        <button>
            <Link to = "/foot-traffic-table">
                <h3>View foot traffic table</h3>
            </Link>        
        </button>    */}
    </div>
  )
}

export default Books
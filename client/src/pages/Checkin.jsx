import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'


export default function CheckIn(){
    const navigate = useNavigate()

    async function addCheckIn(value) {
        const text = value;
        const b = {
            t: text
        };
        try{
            await axios.post("http://localhost:8800/checkin", b)
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
                <button><h1 class="inspect-data">INSPECT <br></br>DATA</h1></button>
                </div>
                <br></br>
                <h1 className="add-header">ADD ITEM</h1>
                <div className="category-icons">
                <button onClick = {() => addCheckIn("BOOK")}>
                    <div class="items">
                        <img src="book.png"></img>
                        <h1>BOOK</h1>
                    </div>
                </button>
                <button onClick = {(event) => addCheckIn("DRESS")}> 
                <div class="items">
                    <img src="dress.png"></img>
                    <h1>DRESS</h1>
                 </div></button>
            <button onClick = {(event) => addCheckIn("HAT")}><div class="items">
                    <img src="hat.png"></img>
                    <h1>HAT</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("HOUSEHOLD SUPPLIES")}><div class="items">
                    <img src="household.png"></img>
                    <h1>HOUSEHOLD SUPPLIES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("JACKET")}><div class="items">
                    <img src="jacket.png"></img>
                    <h1>JACKET</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("LONG-SLEEVE")}><div class="items">
                    <img src="clothes.png"></img>
                    <h1>LONG-SLEEVE</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("PANTS")}><div class="items">
                    <img src="pants.png"></img>
                    <h1>PANTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("RINGS")}><div class="items">
                    <img src="diamond-ring.png"></img>
                    <h1>RINGS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("SCHOOL SUPPLIES")}><div class="items">
                    <img src="stationery.png"></img>
                    <h1>SCHOOL SUPPLIES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("SHIRTS")}><div class="items">
                    <img src="hawaiian-shirt.png"></img>
                    <h1>SHIRTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("SHOES")}><div class="items">
                    <img src="shoes.png"></img>
                    <h1>SHOES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("SHORTS")}><div class="items">
                    <img src="denim-shorts.png"></img>
                    <h1>SHORTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("SKIRTS")}><div class="items">
                    <img src="skirt.png"></img>
                    <h1>SKIRTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("SUNGLASSES")}><div class="items">
                    <img src="sunglasses.png"></img>
                    <h1>SUNGLASSES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckIn("ADD CATEGORY")}><div class="items">
                    <img src="apps.png"></img>
                    <h1>ADD CATEGORY</h1>
                    </div></button>
                    </div>

        </div>
        </div>
    )
    }

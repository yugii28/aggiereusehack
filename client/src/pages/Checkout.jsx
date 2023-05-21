import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function Checkout(){
    const navigate = useNavigate()

    async function addCheckout(value) {
        const text = value;
        const b = {
            t: text
        };
        try{
            await axios.post("http://localhost:8800/checkout", b)
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
                <h1 className="add-header">DONATE ITEM</h1>
                <div className="category-icons">
                <button onClick = {() => addCheckout("BOOK")}>
                    <div class="items">
                        <img src="book.png"></img>
                        <h1>BOOK</h1>
                    </div>
                </button>
                <button onClick = {(event) => addCheckout("DRESS")}> 
                <div class="items">
                    <img src="dress.png"></img>
                    <h1>DRESS</h1>
                 </div></button>
            <button onClick = {(event) => addCheckout("HAT")}><div class="items">
                    <img src="hat.png"></img>
                    <h1>HAT</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("HOUSEHOLD SUPPLIES")}><div class="items">
                    <img src="household.png"></img>
                    <h1>HOUSEHOLD SUPPLIES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("JACKET")}><div class="items">
                    <img src="jacket.png"></img>
                    <h1>JACKET</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("LONG-SLEEVE")}><div class="items">
                    <img src="clothes.png"></img>
                    <h1>LONG-SLEEVE</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("PANTS")}><div class="items">
                    <img src="pants.png"></img>
                    <h1>PANTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("RINGS")}><div class="items">
                    <img src="diamond-ring.png"></img>
                    <h1>RINGS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("SCHOOL SUPPLIES")}><div class="items">
                    <img src="stationery.png"></img>
                    <h1>SCHOOL SUPPLIES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("SHIRTS")}><div class="items">
                    <img src="hawaiian-shirt.png"></img>
                    <h1>SHIRTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("SHOES")}><div class="items">
                    <img src="shoes.png"></img>
                    <h1>SHOES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("SHORTS")}><div class="items">
                    <img src="denim-shorts.png"></img>
                    <h1>SHORTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("SKIRTS")}><div class="items">
                    <img src="skirt.png"></img>
                    <h1>SKIRTS</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("SUNGLASSES")}><div class="items">
                    <img src="sunglasses.png"></img>
                    <h1>SUNGLASSES</h1>
                    </div></button>
                    <button onClick = {(event) => addCheckout("ADD CATEGORY")}><div class="items">
                    <img src="apps.png"></img>
                    <h1>ADD CATEGORY</h1>
                    </div></button>
                    </div>

        </div>
        </div>
    )
    }

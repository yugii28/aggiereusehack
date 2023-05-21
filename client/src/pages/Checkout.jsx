import axios from 'axios'
import { useState } from 'react';

export default function Checkout(){
    
    async function addCheckout(event, text) {
        const b = {
            t: text.innerHTML
        };
        try{
            await axios.post("http://localhost:8800/checkout", b)
        }catch(err){
           console.log(err);
        }
    }
    return (
        <div>
            <button onClick = {(event) => addCheckout(event, event.target)}>Shirt</button>
            <button onClick = {(event) => addCheckout(event, event.target)}>Pant</button>
            <button onClick = {(event) => addCheckout(event, event.target)}>Miscellaneous</button>
        </div>
    )
}
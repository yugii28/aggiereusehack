import axios from 'axios'
import { useState } from 'react';

export default function CheckIn(){
    
    async function addCheckIn(event, text) {
        const b = {
            t: text.innerHTML
        };
        try{
            await axios.post("http://localhost:8800/checkin", b)
        }catch(err){
           console.log(err);
        }
    }
    return (
        <div>
            <button onClick = {(event) => addCheckIn(event, event.target)}>Shirt</button>
            <button onClick = {(event) => addCheckIn(event, event.target)}>Pant</button>
            <button onClick = {(event) => addCheckIn(event, event.target)}>Miscellaneous</button>
        </div>
    )
}
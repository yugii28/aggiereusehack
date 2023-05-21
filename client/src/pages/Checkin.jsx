import axios from 'axios'

export default function CheckIn(){

    const addCheckIn = async e => {
        try{
            await axios.post("http://localhost:8800/checkin")
        }catch(err){
           console.log(err);
        }
    }
    return (
        <div>
            <button onClick = {() => addCheckIn()}>Shirt</button>
            <button onClick = {() => addCheckIn()}>Pant</button>
            <button onClick = {() => addCheckIn()}>Foot traffic</button>
        </div>
    )
}
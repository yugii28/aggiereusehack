import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


export default function CheckInTable(){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchAllCheckIn = async () => {
            try {
                const res = await axios.get("http://localhost:8800/checkin")
                setData(res.data)
                setLoading(prev => !prev)
            }
            catch(err){
                // console.log(err)
            }
        }
        fetchAllCheckIn()
    }, [])

    if(!loading && Array.isArray(data)){
    return (
        <div>
            <div class="main-body1">
                        <div class="navbar-alpha1">
                        <nav onClick = {() => navigate("/")} className="navbar">
                            <img className ="logoImage" src="/logo.png" size="130" width="130"></img>
                            <div className="column1">
                                <h1 className="heavy">Aggie Reuse Store</h1>
                                <h1 className="asucd">ASUCD</h1>
                            </div>
                        </nav>
                        <button><h1 class="inspect-data1" onClick = {() => navigate("/foot-traffic-table")}> INSPECT <br></br>FOOT <br></br>TRAFFIC</h1></button>
                        </div>
            <h1 className="bar-header" align="center">DATABASE FOR DONATIONS</h1>
            <div class="checktable">
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Date</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>        
                {data.map((element) => (
                    <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.day == 0 ? "Sunday": element.day == 1 ? "Monday": element.day == 2 ? "Tuesday": element.day == 3 ? "Wednesday": element.day == 4 ? "Thursday": element.day == 5 ? "Friday": element.day == 6 ? "Saturday": null}</td>
                    <td>{element.hour}</td>
                    <td>{element.date ? element.date.split("T")[0]: null}</td>
                    <td>{element.category}</td>
                </tr>
                ))}
                </tbody>
            </Table>
            </div>
            </div>        
        </div>
    )
    }
}
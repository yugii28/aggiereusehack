import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function CheckOutTable(){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [cat, setCat] = useState();
    const [impData, setImpData] = useState();

    const [mainpageshow, setmainmageshow] = useState(true);
    const [isCats, setIsCats] = useState();

    useEffect(() => {
        const fetchAllCheckOut = async () => {
            try {
                const res = await axios.get("http://localhost:8800/checkout")
                setData(res.data)
                setLoading(prev => !prev)
            }
            catch(err){
                // console.log(err)
            }
        }
        fetchAllCheckOut()
    }, [])


    if(!loading && Array.isArray(data)){
    return (
        <div>
            <div className="main-body1">
                        <div className="navbar-alpha1">
                        <nav onClick = {() => navigate("/")} className="navbar">
                            <img className ="logoImage" src="/logo.png" size="130" width="130"></img>
                            <div className="column1">
                                <h1 className="heavy">Aggie Reuse Store</h1>
                                <h1 className="asucd">ASUCD</h1>
                            </div>
                        </nav>
                        <button><h1 class="inspect-data1" onClick = {() => navigate("/foot-traffic-table")}> INSPECT <br></br>FOOT <br></br>TRAFFIC</h1></button>
                        </div>
            <h1 className="bar-header" align="center">DATABASE FOR GIVEAWAYS</h1>
            <div className="checktable">
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
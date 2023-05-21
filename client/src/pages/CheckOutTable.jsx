import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from '@mantine/core';

export default function CheckOutTable(){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

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
    )
    }
}
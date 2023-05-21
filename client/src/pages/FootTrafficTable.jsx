import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from '@mantine/core';

export default function FootTrafficTable(){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [hours, setHours] = useState();

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/foottraffic")
                setData(res.data)
                setLoading(prev => !prev)
            }
            catch(err){
                // console.log(err)
            }
        }
    fetchAllBooks()
    }, [])

    useEffect(() => {
        const getAllHours = async() => {
            try {
                const res = await axios.get("http://localhost:8800/foottraffic/getallhours")
                setHours(res)
            }
            catch(err){
                // console.log(err)
            }
        }
        getAllHours()
    }, [])
    
    console.log(data)
    console.log(hours.data)

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
                </tr>
            </thead>
            <tbody>        
            {data.map((element) => (
                <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.day}</td>
                <td>{element.hour}</td>
                <td>{element.date}</td>
              </tr>
            ))}
            </tbody>
          
        </Table>        

    </div>
    )
    }
}
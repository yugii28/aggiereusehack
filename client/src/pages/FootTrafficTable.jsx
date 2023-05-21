import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from '@mantine/core';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function FootTrafficTable(){
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const [days, setDays] = useState();
    const [impData, setImpData] = useState();
    const [isDays, setIsDays] = useState();

    const [hours, setHours] = useState();
    const [hoursHighcharts, setHoursHighcharts] = useState();
    const [isHours, setIsHours] = useState(false);

    const [weeks, setWeeks] = useState();
    const [weeksHighcharts, setWeeksHighcharts] = useState();
    const [isWeeks, setIsWeeks] = useState(false);

    const [mainpageshow, setmainmageshow] = useState(true);

          
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
        const getAllDays = async() => {
            try {
                const res = await axios.get("http://localhost:8800/foottraffic/getalldays")
                setDays(res)
            }
            catch(err){
                // console.log(err)
            }
        }
        getAllDays()
    }, [])

    useEffect(() => {
        const getAllWeeks = async() => {
            try {
                const res = await axios.get("http://localhost:8800/foottraffic/getallweeks")
                setWeeks(res)
            }
            catch(err){
                // console.log(err)
            }
        }
        getAllWeeks()
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

    
    console.log("hours", hours)

    function handleclick(){
        // console.log("hi")
        // console.log(hours.data)
        // console.log(hours.data[0])

        const imp_data = days.data.map(dataPoint => ({
            y: dataPoint["COUNT(day)"],
            x: dataPoint["day"],
          }));
        setImpData(imp_data)

        // for (let i = 0; i < imp_data.length; i++){
        //     if(imp_data[i]["x"] == 1){
        //         imp_data[i]["x"] = "Monday"
        //     }
        // }
        // for(let i = 0; i < hours.data.length; i++){
        //     console.log(hours.data[i]["COUNT(day)"])
        //     console.log(hours.data[i].day)
        // }
        setmainmageshow(prev => !prev);
        setIsDays(prev => !prev);
    }

    function handleHours(){
        const imp_data = hours.data.map(dataPoint => ({
            y: dataPoint["COUNT(hour)"],
            x: dataPoint["hour"],
          }));
        setHoursHighcharts(imp_data)
        setmainmageshow(prev => !prev);
        setIsHours(prev => !prev);
    }

    const options = {
        chart: {
          type: 'column',
          borderWidth: 0,
          backgroundColor: "transparent"
          },
          tooltip: {
            formatter: function() {
                return 'There have been <b>' + this.y + '</b>  people on <b>' + this.x + 's</b>'
            }
        },
          legend: {
              enabled: false
          },
          title: {
              text: "Number of students entering Aggie Reuse per day"
          },
          yAxis: {
              gridLineWidth: 0,
              title: {
                  text: "Number of students",
              }
          },
          xAxis: {
              categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              labels: {
                  enabled: true
              },
              lineWidth: 2,
              lineColor: 'black'
          },
          credits: {
              enabled: false,
          },
          series: [
              {
                  colorByPoint: true,
                  data: impData
              }
          ],
      };

      const hoursOptions = {
        chart: {
          type: 'column',
          borderWidth: 0,
          backgroundColor: "transparent"
          },
          tooltip: {
            formatter: function() {
                return 'There have been <b>' + this.y + '</b>  people on <b>' + this.x + 's</b>'
            }
        },
          legend: {
              enabled: false
          },
          title: {
              text: "Number of students entering Aggie Reuse per day"
          },
          yAxis: {
              gridLineWidth: 0,
              title: {
                  text: "Number of students",
              }
          },
          xAxis: {
              labels: {
                  enabled: true
              },
              lineWidth: 2,
              lineColor: 'black'
          },
          credits: {
              enabled: false,
          },
          series: [
              {
                  colorByPoint: true,
                  data: hoursHighcharts
              }
          ],
      };

    if(!loading && Array.isArray(data)){
        if(mainpageshow){
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
                    <button onClick = {() => handleclick()}>View foot traffic day vs. people data</button>
                    <button onClick = {() => handleHours()}>View foot traffic hours vs. people data</button>
                </div>
            )
        }else if(!mainpageshow && !isHours && isDays){
            console.log("days", impData)
            return (
                <div className= {{width: "90vw"}}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                    <button onClick = {() => setmainmageshow(prev => !prev)}>Go back</button>
                </div>
            )
        }else if(!mainpageshow && !isDays && isHours){
            console.log("hours", hoursHighcharts)
            return (
                <div className= {{width: "90vw"}}>
                    <HighchartsReact highcharts={Highcharts} options={hoursOptions} />
                    <button onClick = {() => setIsHours(prev => !prev)}>Go back</button>
                </div>
            )
        }
    }
}
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@mantine/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function FootTrafficTable() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const [days, setDays] = useState();
  const [impData, setImpData] = useState();
  const [isDays, setIsDays] = useState();

  const [hours, setHours] = useState();
  const [hoursHighcharts, setHoursHighcharts] = useState();
  const [isHours, setIsHours] = useState(false);

  const [mainpageshow, setmainmageshow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DEV_LINK}/foottraffic`
        );
        setData(res.data);
        setLoading(false);
      } catch (err) {
        // console.log(err)
      }
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    const getAllDays = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DEV_LINK}/foottraffic/getalldays`
        );
        setDays(res);
      } catch (err) {
        // console.log(err)
      }
    };
    getAllDays();
  }, []);

  // useEffect(() => {
  //     const getAllWeeks = async() => {
  //         try {
  //             const res = await axios.get("http://localhost:8800/foottraffic/getallweeks")
  //             setWeeks(res)
  //         }
  //         catch(err){
  //             // console.log(err)
  //         }
  //     }
  //     getAllWeeks()
  // }, [])

  useEffect(() => {
    const getAllHours = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DEV_LINK}/foottraffic/getallhours`
        );
        setHours(res);
      } catch (err) {
        // console.log(err)
      }
    };
    getAllHours();
  }, []);

  function handleclick() {
    const imp_data = days.data.map((dataPoint) => ({
      y: dataPoint["count(day)"],
      x: dataPoint["day"],
    }));
    setImpData(imp_data);
    setmainmageshow((prev) => !prev);
    setIsDays((prev) => !prev);
  }

  function handleHours() {
    const imp_data = hours.data.map((dataPoint) => ({
      y: dataPoint["count(hour)"],
      x: dataPoint["hour"],
    }));
    setHoursHighcharts(imp_data);
    setmainmageshow((prev) => !prev);
    setIsHours((prev) => !prev);
  }

  const options = {
    chart: {
      type: "column",
      borderWidth: 0,
      backgroundColor: "transparent",
    },
    tooltip: {
      formatter: function () {
        return (
          "There have been <b>" +
          this.y +
          "</b>  people on <b>" +
          this.x +
          "s</b>"
        );
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: "Number of students",
      },
    },
    xAxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      labels: {
        enabled: true,
      },
      title: {
        text: "Day of the week",
      },
      lineWidth: 2,
      lineColor: "black",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        colorByPoint: true,
        data: impData,
      },
    ],
  };

  const hoursOptions = {
    chart: {
      type: "column",
      borderWidth: 0,
      backgroundColor: "transparent",
    },
    tooltip: {
      formatter: function () {
        return (
          "There have been <b>" +
          this.y +
          "</b>  people at <b>" +
          this.x +
          "</b>oclock"
        );
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: "Number of students",
      },
    },
    xAxis: {
      labels: {
        enabled: true,
      },
      lineWidth: 2,
      lineColor: "black",
      title: {
        text: "Hour of the day",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        colorByPoint: true,
        data: hoursHighcharts,
      },
    ],
  };

  if (!loading && Array.isArray(data)) {
    if (mainpageshow) {
      return (
        <div>
          <div class="main-body1">
            <div class="navbar-alpha1">
              <nav onClick={() => navigate("/")} className="navbar">
                <img
                  className="logoImage"
                  src="/logo.png"
                  size="130"
                  width="130"
                ></img>
                <div className="column1">
                  <h1 className="heavy">Aggie Reuse Store</h1>
                  <h1 className="asucd">ASUCD</h1>
                </div>
              </nav>
              <button>
                <h1
                  class="inspect-data1"
                  onClick={() => navigate("/foot-traffic-table")}
                >
                  {" "}
                  INSPECT <br></br>FOOT <br></br>TRAFFIC
                </h1>
              </button>
            </div>
            <h1 className="bar-header" align="center">
              DATABASE FOR FOOT TRAFFIC
            </h1>
            <div className="checktable">
              <table>
                <tr>
                  <th>Number</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
                {data.map((element) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>
                      {element.day == 0
                        ? "Sunday"
                        : element.day == 1
                        ? "Monday"
                        : element.day == 2
                        ? "Tuesday"
                        : element.day == 3
                        ? "Wednesday"
                        : element.day == 4
                        ? "Thursday"
                        : element.day == 5
                        ? "Friday"
                        : element.day == 6
                        ? "Saturday"
                        : null}
                    </td>
                    <td>{element.hour + ":" + element.minutes}</td>
                    <td>{element.date ? element.date.split("T")[0] : null}</td>
                  </tr>
                ))}
              </table>
            </div>
            <div class="model-choice-row">
              <h1 align="center">GENERATE VISUAL TRENDS BY</h1>
              <button onClick={() => handleclick()}>
                <h1 class="model-options"> DAY</h1>
              </button>
              <button onClick={() => handleHours()}>
                <h1 class="model-options"> HOUR</h1>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (isDays && !isHours) {
      return (
        <div>
          <div class="main-body1">
            <div class="navbar-alpha1">
              <nav onClick={() => navigate("/")} className="navbar">
                <img
                  className="logoImage"
                  src="/logo.png"
                  size="130"
                  width="130"
                ></img>
                <div className="column1">
                  <h1 className="heavy">Aggie Reuse Store</h1>
                  <h1 className="asucd">ASUCD</h1>
                </div>
              </nav>
              <button>
                <h1
                  class="inspect-data1"
                  onClick={() => navigate("/foot-traffic-table")}
                >
                  {" "}
                  INSPECT <br></br>FOOT <br></br>TRAFFIC
                </h1>
              </button>
            </div>
            <div className="charts">
              <h1 className="bar-header" align="center">
                NUMBER OF STUDENTS PER DAY OF THE WEEK
              </h1>
              <HighchartsReact highcharts={Highcharts} options={options} />
              <div align="right">
                <button
                  className="previous"
                  onClick={() => setmainmageshow(true)}
                >
                  <img src="/previous1.svg" height="50px"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isHours && !isDays) {
      return (
        <div>
          <div class="main-body1">
            <div class="navbar-alpha1">
              <nav onClick={() => navigate("/")} className="navbar">
                <img
                  className="logoImage"
                  src="/logo.png"
                  size="130"
                  width="130"
                ></img>
                <div className="column1">
                  <h1 className="heavy">Aggie Reuse Store</h1>
                  <h1 className="asucd">ASUCD</h1>
                </div>
              </nav>
              <button>
                <h1
                  class="inspect-data1"
                  onClick={() => navigate("/foot-traffic-table")}
                >
                  {" "}
                  INSPECT <br></br>FOOT <br></br>TRAFFIC
                </h1>
              </button>
            </div>
            <div className="charts">
              <h1 className="bar-header" align="center">
                NUMBER OF STUDENTS PER HOUR OF THE DAY
              </h1>
              <HighchartsReact highcharts={Highcharts} options={hoursOptions} />
              <div align="right">
                <button
                  className="previous"
                  onClick={() => setmainmageshow((prev) => !prev)}
                >
                  <img src="/previous1.svg" height="50px"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

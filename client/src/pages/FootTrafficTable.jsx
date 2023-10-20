import { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";

export default function FootTrafficTable() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const [days, setDays] = useState();
  const [isDays, setIsDays] = useState();

  const [hours, setHours] = useState();
  const [isHours, setIsHours] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [dayOptions, setDayOptions] = useState();
  const [hourOptions, setHourOptions] = useState();


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
        console.log(err)
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
        console.log(err)
      }
    };
    getAllDays();
  }, []);

  useEffect(() => {
    const getAllHours = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DEV_LINK}/foottraffic/getallhours`
        );
        setHours(res);
      } catch (err) {
        console.log(err)
      }
    };
    getAllHours();
  }, []);

  function handleclick() {
    const imp_data = days.data.map((dataPoint) => ({
      y: dataPoint["count(`day`)"],
      x: dataPoint["day"],
    }));
    // setImpData(imp_data);
    setmainmageshow((prev) => !prev);
    setIsDays((prev) => !prev);
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
        categories: imp_data.map((item) => item.x),
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
          data: imp_data.map((item) => item.y),
        },
      ],
    };
    setDayOptions(options);
  }

  function handleHours() {
    const imp_data = hours.data.map((dataPoint) => ({
      y: dataPoint["count(`hour`)"],
      x: dataPoint["hour"],
    }));
    setmainmageshow((prev) => !prev);
    setIsHours((prev) => !prev);
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
        categories: imp_data.map((item) => item.x),
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
          data: imp_data.map((item) => item.y),
        },
      ],
    };
    setHourOptions(options)
  }

  const deleteItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_DEV_LINK}/deletefoottraffic/${id}`)
      .then((response) => {
        setData(
          data.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const handleDelete = (id) => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false); // Hide the "Item added!" message after 3 seconds
    }, 3000);
    const confirmed = window.confirm(
      "Are you sure you want to delete this item? Note that once deleted, the item can never be recovered."
    );
    if (confirmed) {
      deleteItem(id);
    }
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
                  <th>Delete</th>
                </tr>
                {data.map((element, index) => (
                  <tr key={element.id}>
                    <td>{index + 1}</td>
                    <td>{element.day}</td>
                    <td>
                      {element.hour +
                        ":" +
                        (element.minutes.toString().length == 1
                          ? "0" + element.minutes
                          : element.minutes)}{" "}
                    </td>{" "}
                    <td>{element.date}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => {
                          handleDelete(element.id);
                        }}
                      >
                        Delete Item
                      </button>
                    </td>
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
              <HighchartsReact highcharts={Highcharts} options={dayOptions} />
              <div align="right">
                <button
                  className="previous"
                  onClick={() => setmainmageshow(true)}
                >
                  <img src="/previous1.svg" height="50px" alt = "go-back-button"></img>
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
                  alt = "aggie-reuse-store-logo"
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
              <HighchartsReact highcharts={Highcharts} options={hourOptions} />
              <div align="right">
                <button
                  className="previous"
                  onClick={() => setmainmageshow((prev) => !prev)}
                >
                  <img src="/previous1.svg" height="50px" alt = "go-back-button"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

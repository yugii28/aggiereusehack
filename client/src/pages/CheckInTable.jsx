import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function CheckInTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [cat, setCat] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [mainPageShow, setmainPageShow] = useState(true);
  const [isCats, setIsCats] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    const fetchAllCheckIn = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/checkin`
        );
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCheckIn();
  }, []);

  useEffect(() => {
    const getAllCats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/checkin/getallcategories`
        );
        setCat(res);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCats();
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8800/deletecheckin/${id}`)
      .then((response) => {
        setData(
          data.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  function getCategory() {
    const imp_data = cat.data.map((dataPoint) => ({
      y: dataPoint["COUNT(category)"],
      x: dataPoint["category"],
    }));
    setmainPageShow((prev) => !prev);
    setIsCats((prev) => !prev);

    const options = {
      chart: {
        type: "column",
        borderWidth: 0,
        backgroundColor: "transparent",
      },
      tooltip: {
        formatter: function () {
          return this.y + " " + this.x + "s have been received";
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
          text: "Number of items received",
        },
      },
      xAxis: {
        type: "category",
        categories: imp_data.map((item) => item.x),
        labels: {
          enabled: true,
        },
        title: {
          text: "Categories",
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
    setOptions(options);
  }

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
    if (mainPageShow) {
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
              DATABASE FOR DONATIONS
            </h1>
            <div class="checktable">
              <table>
                <tr>
                  <th>Item Number</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Category</th>
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
                    </td>
                    <td>{element.date}</td>
                    <td>{element.category}</td>
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
            {showMessage && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Item Deleted!</h3>
                </div>
              </div>
            )}
            <div class="model-choice-row">
              <h1 align="center">GENERATE VISUAL TRENDS BY</h1>
              <button className="button-category" onClick={() => getCategory()}>
                <h1 class="model-options"> CATEGORY</h1>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="main-body1">
            <div className="navbar-alpha1">
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
            <div className="charts">
              <h1 className="bar-header" align="center">
                AMOUNT OF EACH ITEM RECEIVED
              </h1>
              <HighchartsReact highcharts={Highcharts} options={options} />
              <div align="right">
                <button
                  className="previous"
                  onClick={() => setmainPageShow((prev) => !prev)}
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

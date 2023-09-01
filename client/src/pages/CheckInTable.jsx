import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function CheckInTable() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [cat, setCat] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [mainpageshow, setmainmageshow] = useState(true);
  const [isCats, setIsCats] = useState();
  console.log(process.env.REACT_APP_DEV_LINK);
  const [options, setOptions] = useState();

  useEffect(() => {
    const fetchAllCheckIn = async () => {
      try {
        console.log("hi inside get all check in ")
        const res = await axios.get(`${process.env.REACT_APP_DEV_LINK}/checkin`);
        console.log("res data", res.data)
        setData(res.data);
        console.log(data)
        setLoading((prev) => !prev);
      } catch (err) {
        console.log(err)
      }
    };
    fetchAllCheckIn();
  }, []);

  useEffect(() => {
    const getAllCats = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DEV_LINK}/checkin/getallcategories`
        );
        setCat(res);
      } catch (err) {
        // console.log(err)
      }
    };
    getAllCats();
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_DEV_LINK}/deletecheckin/${id}`)
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
    console.log(imp_data);
    setmainmageshow((prev) => !prev);
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
              DATABASE FOR DONATIONS
            </h1>
            <div class="checktable">
              <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                  <tr>
                    <th>Item Number</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
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
                      <td>{element.hour}</td>
                      <td>
                        {element.date ? element.date.split("T")[0] : null}
                      </td>
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
                </tbody>
              </Table>
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

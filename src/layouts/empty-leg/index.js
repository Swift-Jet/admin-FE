import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import Select from "react-tailwindcss-select";
import "react-tailwindcss-select/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Grid } from "@mui/material";
import data from "./data.json";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
function EmptyLeg() {
  const [airports, setAirports] = useState(data);
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");
  const [aircrafts, setAircrafts] = useState([]);
  const [flights, setFlights] = useState([]);
  const [highlight, setHighlight] = useState("text");
  const [highlight2, setHighlight2] = useState("text");
  const [formData, setFormData] = useState({
    flight_type: null,
    destination_airport: null,
    departure_airport: null,
    inbound_price: null,
    departure_date: null,
    departure_time: null,
    arrival_time: null,
    aircraft: null,
    created_by: "Admin",
    updated_by: "Admin",
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `https://swiftwings-mw.onrender.com/api/v1/aircraft/all`
      );
      setAircrafts(data?.data);
    }
    async function fetchFlights() {
      const { data } = await axios.get(
        `https://swiftwings-mw.onrender.com/api/v1/flight/all`
      );
      setFlights(data?.data);
    }
    fetchData();
    fetchFlights();
  }, []);
  const handleFlight = () => {
    alert(`You have selected`);
  };

  const handleSelectChange = (value) => {
    let newFormData = formData;
    newFormData.destination_airport = value;
    setFormData(newFormData);
    setVal(value);
  };

  const handleSelectChange1 = (value) => {
    let newFormData = formData;
    newFormData.departure_airport = value;
    setFormData(newFormData);
    setVal2(value);
  };

  const setDepartureDate = (value) => {
    let newFormData = formData;
    newFormData.departure_date = value;
    setFormData(newFormData);
  };

  const setDepartureTime = (value) => {
    let newFormData = formData;
    newFormData.departure_time = value;
    setFormData(newFormData);
  };

  const setArrivalDate = (value) => {
    let newFormData = formData;
    newFormData.arrival_time = value;
    setFormData(newFormData);
  };

  const setPrice = (value) => {
    let newFormData = formData;
    newFormData.inbound_price = value;
    setFormData(newFormData);
    console.log(formData);
  };
  const options = airports.map((item, i) => ({
    label:
      item.name +
      " - " +
      item.city +
      " - " +
      item.iata_code +
      " - " +
      item.country,
    value: item,
  }));

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`https://swiftwings-mw.onrender.com/api/v1/flight/add`, formData)
      .then((data) => {
        setLoading(false);
        toast("Flight added successflly");
      })
      .catch((error) => {
        setLoading(false);

        toast(error?.response?.data?.error);
      });
  };
  const handleAircraft = (value) => {
    let newFormData = formData;
    newFormData.aircraft = value;
    setFormData(newFormData);
    alert(`You have selected ${value?.model}`);
  };
  const handleFlightType = (value) => {
    if (value === "Shared") {
      setHighlight("gradient");
      setHighlight2("text");
    } else {
      setHighlight2("gradient");
      setHighlight("text");
    }
    let newFormData = formData;
    newFormData.flight_type = value;
    setFormData(newFormData);
 //   alert(`You have selected ${value} type`);
  };
  return (
    <DashboardLayout image={bgImage}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={6} xl={6}>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="h3" pb={3} textTransform="capitalize">
                Add Flight
              </MDTypography>
              <MDBox component="form" role="form" gap={"2"}>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Select Flight Type</label>
                  <br></br>
                  <br></br>
                  <Grid
                    display={"flex"}
                    direction={"flex"}
                    justifyContent={"space-between"}
                    mb={2}
                    gap={"2"}
                  >
                    <MDButton
                      variant={highlight2}
                      color="warning"
                      onClick={() => handleFlightType("Sharedd")}
                    >
                      Shared
                    </MDButton>
                    <MDButton
                      variant={highlight}
                      color="warning"
                      onClick={() => handleFlightType("Shared")}
                    >
                      Empty Leg
                    </MDButton>
                  </Grid>
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Destination</label>
                  <Select
                    className="truncate-select"
                    noOptionsMessage={"No airport found"}
                    isSearchable={true}
                    menuIsOpen={false}
                    placeholder={"search destination"}
                    primaryColor={"sky"}
                    isClearable={false}
                    name={"destination_airport"}
                    options={options}
                    onChange={handleSelectChange}
                    getOptionValue={(option) => option.value.id}
                    getOptionLabel={(option) => option.label}
                  />
                  <MDTypography fontWeight="500" variant="caption">
                    {val?.label}
                  </MDTypography>
                </MDBox>

                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Departure </label>
                  <Select
                    className="truncate-select"
                    noOptionsMessage={"No airport found"}
                    isSearchable={true}
                    menuIsOpen={false}
                    placeholder={"search departure"}
                    primaryColor={"sky"}
                    isClearable={false}
                    name={"departure_airport"}
                    options={options}
                    onChange={handleSelectChange1}
                    getOptionValue={(option) => option.value.id}
                    getOptionLabel={(option) => option.label}
                  />
                  <MDTypography fontWeight="500" variant="caption">
                    {val2?.label}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Departure Date</label>
                  <MDInput
                    type="date"
                    name="departure_date"
                    onChange={(e) => {
                      setDepartureDate(e.target.value);
                    }}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Departure Time</label>
                  <MDInput
                    type="time"
                    name="departure_date"
                    onChange={(e) => {
                      setDepartureTime(e.target.value);
                    }}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Arrival Time</label>
                  <MDInput
                    type="time"
                    name="departure_date"
                    onChange={(e) => {
                      setArrivalDate(e.target.value);
                    }}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Price</label>
                  <MDInput
                    type="number"
                    name="departure_date"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    fullWidth
                  />
                </MDBox>

                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="success"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    {loading ? "Processing..." : "Add Flight"}
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          <br></br>
          <Card mt={4}>
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="h6" pb={3} textTransform="capitalize">
                Select Aircraft
              </MDTypography>
              <MDBox component="form" role="form" gap={"2"}>
                <MDBox p={2}>
                  <Grid container spacing={6}>
                    {aircrafts.map((item) => (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        xl={6}
                        onClick={() => {
                          handleAircraft(item);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <DefaultProjectCard
                          image={item.image_url}
                        //   label={item.manufacturer}
                          title={item.model}
                          description={item.manufacturer}
                          action={""}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          xl={6}
          overflow={"scroll"}
          height={"1000px"}
        >
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="h6" pb={3} textTransform="capitalize">
                All Empty Leg Flights
              </MDTypography>
              <MDBox component="form" role="form" gap={"2"}>
                <MDBox p={2}>
                  <Grid container spacing={6}>
                    {flights.map((item) => (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        xl={6}
                        style={{ cursor: "pointer" }}
                   
                      >
                        <DefaultProjectCard
                          image={item.aircraft.image_url}
                          description={item.aircraft.model}
                          label={
                            item.departure_airport.label +
                            " " +
                            "|" +
                            " " +
                            item.destination_airport.label
                          }
                          title={"$" + item.inbound_price}
                          action={{
                            type: "internal",
                            route: `/single-flight/${item._id}`,
                            color: "info",
                            label: "view details",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default EmptyLeg;

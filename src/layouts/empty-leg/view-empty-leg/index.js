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
import { Grid, Alert } from "@mui/material";
import data from "../data.json";
import { useParams } from "react-router-dom";

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
function SingleEmptyLeg() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airports, setAirports] = useState(data);
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");
  const [bgcolor, setBgColor]= ""
  const [openDelete, setOpenDelete] = useState(true);
  const [openDeleteInit, setOpenDeleteInit] = useState(false);
//   const [flight, setFlight] = useState({});
  const [aircrafts, setAircrafts] = useState([]);
  const [highlight, setHighlight] = useState("text");
  const [highlight2, setHighlight2] = useState("text");
  const [flight, setFlight] = useState({
    flight_type: "",
    destination_airport: null,
    departure_airport: null,
    inbound_price: "",
    departure_date: "",
    departure_time: "",
    arrival_time: "",
    aircraft: null,
    created_by: "Admin",
    updated_by: "Admin",
  });

 
  const handleSelectChange = (value) => {
    let newFormData = flight;
    newFormData.destination_airport = value;
    setFlight(newFormData);
    setVal(value);
  };

  const handleSelectChange1 = (value) => {
    let newFormData = flight;
    newFormData.departure_airport = value;
    setFlight(newFormData);
    setVal2(value);
  };
  const handleAircraft = (value) => {
    let newFormData = flight;
    newFormData.aircraft = value;
    setFlight(newFormData);
    alert(`You have selected ${value?.model}`);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
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
      .put(`https://swiftwings-mw.onrender.com/api/v1/flight/update/${id}`, flight)
      .then((data) => {
        console.log(data);
        setLoading(false);
        setFlight(data?.data?.data);
        toast("Flight updated successflly");
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.error);
      });
  };
  const handleDelete = (e) => {
    setLoading(true);
    axios
      .delete(`https://swiftwings-mw.onrender.com/api/v1/flight/delete/${id}`)
      .then((data) => {
        setLoading(false);
        toast("Aircraft deleted successflly");
        navigate("/add-flight");
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.error);
      });
  };
 

  useEffect(() => {
    axios
      .get(`https://swiftwings-mw.onrender.com/api/v1/flight/single?id=${id}`)
      .then((data) => {
        setLoading(false);
        setFlight(data?.data?.data[0]);
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.error);
      });
      async function fetchData() {
        const { data } = await axios.get(
          `https://swiftwings-mw.onrender.com/api/v1/aircraft/all`
        );
        setAircrafts(data?.data);
      }
      fetchData()
  }, []);
  return (
    <DashboardLayout image={bgImage}>
         <div hidden={openDelete}>
        <Alert
          severity="error"
          action={
            <div>
              <MDButton
                ml={2}
                color="error"
                variant="gradient"
                size="small"
                onClick={() => {
                  handleDelete()
                  setOpenDelete(false);
                }}
              >
                Delete
              </MDButton>
              <MDButton
                style={{"margin": "10px"}}
                color="info"
                variant="gradient"
                size="small"
                onClick={() => {
                  setOpenDelete(false);
                  setOpenDelete(true);
                  setOpenDeleteInit(false);
                }}
              >
                Close
              </MDButton>
            </div>
          }
        >
          This action can't be undone, Are you sure you want to continue?
        </Alert>
      </div>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={6} xl={6}>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="h3" pb={3} textTransform="capitalize">
                Update/View Flight
              </MDTypography>
              <MDBox component="form" role="form" gap={"2"}>
                <MDBox mb={2}>
                  Flight Type : {flight.flight_type === "Shared" ? "Empty Legs" : null}
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
                    {val?.label || flight?.destination_airport?.label}
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
                    {val2?.label || flight?.departure_airport?.label}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Departure Date</label>
                  <MDInput
                    type="date"
                    name="departure_date"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    value={flight?.departure_date?.slice(0, 10)}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Available From</label>
                  <MDInput
                    type="time"
                    name="departure_time"
                    value={flight.departure_time}
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Available To</label>
                  <MDInput
                    type="time"
                    name="arrival_time"
                    value={flight.arrival_time}
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <label style={{ fontSize: "13px" }}>Inbound Price</label>
                  <MDInput
                    type="text"
                    name="inbound_price"
                    value={flight.inbound_price}
                    onChange={(e) => {
                        handleChange(e)
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
                    {loading ? "Processing..." : "Update Flight"}
                  </MDButton>
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
             
          <Card mt={4}>
            <MDBox pt={4} pb={3} px={3}>
            <MDBox pt={3} px={2} display="flex" justifyContent="space-between">
              <MDTypography variant="h4" fontWeight="medium">
                Select New Aircraft
              </MDTypography>
              {
                <div hidden={openDeleteInit}>
                  <MDButton
                    color="error"
                    variant="gradient"
                    size="small"
                    onClick={() => {
                      setOpenDelete(false);
                      setOpenDeleteInit(true);
                    }}
                  >
                    {loading ? "Processing..." : "Delete Flight"}
                  </MDButton>
                </div>
              }
            </MDBox>
              <MDBox component="form" role="form" gap={"2"}>
                <MDBox p={2}>
                  <Grid container spacing={6}>
                    {aircrafts.map((item) => (
                      <Grid
                      bgcolor={bgcolor}
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
      </Grid>
    </DashboardLayout>
  );
}

export default SingleEmptyLeg;

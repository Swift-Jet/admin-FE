import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Grid, Typography } from "@mui/material";

function SingleAircraft() {
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [previewURL2, setPreviewURL2] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [seat, setSeat] = useState("");
  const [aircraft, setAircraft] = useState({});
  const [classification, setClassification] = useState("");
  const [speed, setSpeed] = useState("");
  const [range, setRange] = useState("");
  const [luggage, setLuggage] = useState("");
  const [summary, setSummary] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/aircraft/single?id=${id}`)
      .then((data) => {
        setLoading(false);
        setAircraft(data?.data?.data[0]);
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.error);
      });
  }, []);

  return (
    <DashboardLayout image={bgImage}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={6} xl={6}>
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="h3" pb={3} textTransform="capitalize">
                Single Aircraft
              </MDTypography>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                    <label>Manufacturer</label>
                  <MDInput
                    type="text"
                    name="manufacturer"
                    onChange={(e) => {
                      setManufacturer(e.target.value);
                    }}
                    value={aircraft.manufacturer}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Model</label>
                  <MDInput
                    type="text"
                    name="model"
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                    value={aircraft.model}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Classification</label>
                  <MDInput
                    type="text"
                    name="classification"
                    onChange={(e) => {
                      setClassification(e.target.value);
                    }}
                    value={aircraft.classification}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Seat Number</label>
                  <MDInput
                    type="number"
                    name="seats"
                    onChange={(e) => {
                      setSeat(e.target.value);
                    }}
                    value={aircraft.no_of_seats}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Speed</label>
                  <MDInput
                    type="text"
                    name="speed"
                    onChange={(e) => {
                      setSpeed(e.target.value);
                    }}
                    value={aircraft.speed}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Range</label>
                  <MDInput
                    type="text"
                    name="range"
                    onChange={(e) => {
                      setRange(e.target.value);
                    }}
                    value={aircraft.range}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Luggage Capacity</label>
                  <MDInput
                    type="text"
                    name="luggage"
                    onChange={(e) => {
                      setLuggage(e.target.value);
                    }}
                    value={aircraft.luggage_capacity}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Summary</label>
                 <p>{aircraft.overview_summary}</p>
                    
                </MDBox>
                <MDBox mb={2}>
                <label>Height</label>
                  <MDInput
                    type="text"
                    name="height"
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                    value={aircraft.interior_height}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                <label>Width</label>
                  <MDInput
                    type="text"
                    name="width"
                    onChange={(e) => {
                      setWidth(e.target.value);
                    }}
                    value={aircraft.interior_width}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}> 
                <label>Image 1</label>
                   <img
                      height="400px"
                      width="100%"
                      src={aircraft.image_url}
                      alt="Preview"
                    />
                </MDBox>
                <MDBox mb={2}>
                <label>Image 2</label>
                    <img
                      height="400px"
                      width="100%"
                      src={aircraft.image_url_2}
                      alt="Preview"
                    />
                </MDBox>
                <MDBox mb={2}>
                <label>Image 3</label>
                    <img
                      height="400px"
                      width="100%"
                      src={aircraft.image_url_3}
                      alt="Preview"
                    />
                </MDBox>
                <MDBox mb={2}>
                <label>Image 4</label>
                    <img
                      height="400px"
                      width="100%"
                      src={aircraft.image_url_4}
                      alt="Preview"
                    />
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default SingleAircraft;

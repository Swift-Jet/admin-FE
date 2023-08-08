import { useState, useEffect } from "react";
import { Link, Router, useNavigate, useParams } from "react-router-dom";
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
import { Grid, Alert } from "@mui/material";


function SingleAircraft() {
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [previewURL2, setPreviewURL2] = useState("");
  const [previewURL3, setPreviewURL3] = useState("");
  const [previewURL4, setPreviewURL4] = useState("");
  const [openDelete, setOpenDelete] = useState(true);
  const [openDeleteInit, setOpenDeleteInit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [aircraft, setAircraft] = useState({
    sjac_code: "",
    manufacturer: "",
    model: "",
    classification: "",
    no_of_seats: "",
    speed: "",
    range: "",
    luggage_capacity: "",
    interior_height: "",
    interior_width: "",
    overview_summary: "",
    image_url: "",
    image_url_2: "",
    image_url_3: "",
    image_url_4: "",
    image_url_5: "",
  });
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setAircraft({ ...aircraft, [name]: files[0] });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAircraft({ ...aircraft, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in aircraft) {
      formData.append(key, aircraft[key]);
    }

    axios
      .put(`https://swiftwings-mw.onrender.com/api/v1/aircraft/update/${id}`, formData)
      .then((data) => {
        setLoading(false);

        toast("Aircraft updated successflly");
        setAircraft(data?.data?.data);
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.error);
      });
  };

  const handleDelete = (e) => {
    setLoading(true);
    axios
      .delete(`https://swiftwings-mw.onrender.com/api/v1/aircraft/delete/${id}`)
      .then((data) => {
        setLoading(false);
        toast("Aircraft deleted successflly");
        navigate('/aircraft');
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://swiftwings-mw.onrender.com/api/v1/aircraft/single?id=${id}`)
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
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Card>
            <MDBox pt={3} px={2} display="flex" justifyContent="space-between">
              <MDTypography variant="h4" fontWeight="medium">
                Single Aircraft
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
                    {loading ? "Processing..." : "Delete Aircraft"}
                  </MDButton>
                </div>
              }
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={6} xl={6}>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Manufacturer</label>
                      <MDInput
                        type="text"
                        name="manufacturer"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.manufacturer}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Model</label>
                      <MDInput
                        type="text"
                        name="model"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.model}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Classification</label>
                      <MDInput
                        type="text"
                        name="classification"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.classification}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Seat Number</label>
                      <MDInput
                        type="text"
                        name="no_of_seats"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.no_of_seats}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Speed</label>
                      <MDInput
                        type="text"
                        name="speed"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.speed}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Range</label>
                      <MDInput
                        type="text"
                        name="range"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.range}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>
                        Luggage Capacity
                      </label>
                      <MDInput
                        type="text"
                        name="luggage_capacity"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.luggage_capacity}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Summary</label>
                      <MDTypography fullWidth>
                        <textarea
                          style={{ width: "100%" }}
                          rows={4}
                          type="textarea"
                          name="overview_summary"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={aircraft.overview_summary}
                        ></textarea>
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Height</label>
                      <MDInput
                        type="text"
                        name="interior_height"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.interior_height}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Width</label>
                      <MDInput
                        type="text"
                        name="interior_width"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={aircraft.interior_width}
                        fullWidth
                      />
                    </MDBox>
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
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Image 1</label>
                      <MDInput
                        md={2}
                        type="file"
                        name="image_url"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          handleImageChange(e);
                          setPreviewURL(URL.createObjectURL(file));
                        }}
                        fullWidth
                      />

                      <img
                        height="400px"
                        width="100%"
                        src={previewURL ? previewURL : aircraft.image_url}
                        alt="Preview"
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Image 2</label>
                      <MDInput
                        md={2}
                        type="file"
                        name="image_url_2"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          handleImageChange(e);
                          setPreviewURL2(URL.createObjectURL(file));
                        }}
                        fullWidth
                      />

                      <img
                        height="400px"
                        width="100%"
                        src={previewURL2 ? previewURL2 : aircraft.image_url_2}
                        alt="Preview"
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Image 3</label>
                      <MDInput
                        md={2}
                        type="file"
                        name="image_url_3"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          handleImageChange(e);
                          setPreviewURL3(URL.createObjectURL(file));
                        }}
                        fullWidth
                      />

                      <img
                        height="400px"
                        width="100%"
                        src={previewURL3 ? previewURL3 : aircraft.image_url_3}
                        alt="Preview"
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label style={{ fontSize: "13px" }}>Image 4</label>
                      <MDInput
                        md={2}
                        type="file"
                        name="image_url_4"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          handleImageChange(e);
                          setPreviewURL4(URL.createObjectURL(file));
                        }}
                        fullWidth
                      />

                      <img
                        height="400px"
                        width="100%"
                        src={previewURL4 ? previewURL4 : aircraft.image_url_4}
                        alt="Preview"
                      />
                    </MDBox>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleSubmit}
                        color="success"
                        fullWidth
                      >
                        {loading ? "Processing..." : "Update Aircraft"}
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default SingleAircraft;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Aircraft() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [previewURL2, setPreviewURL2] = useState('');
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const [seat, setSeat] = useState('')
    const [classification, setClassification] = useState('')
    const [speed, setSpeed] = useState('')
    const [range, setRange] = useState('')
    const [luggage, setLuggage] = useState('')
    const [summary, setSummary] = useState('')
    const [height, setHeight] = useState('')
    const [width, setWidth] = useState('')
    //const history = useHistory();

    const data = { email, password };
    const togglePasswordFunc = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    const handleSubmit = (e) => {
        setLoading(true)
        const data = new FormData();
        data.append("manufacturer", manufacturer);
        data.append("model", model);
        data.append("classification", classification);
        data.append("no_of_seats", seat);
        data.append("speed", speed);
        data.append("range", range);
        data.append("luggage_capacity", luggage);
        data.append("interior_height", height);
        data.append("interior_width", width);
        data.append("overview_summary", summary);
        data.append("image_url", image);
        data.append("image_url_2", image2);
   
        e.preventDefault();
        axios
            .post(`http://localhost:8000/api/v1/aircraft/add`, data)
            .then((data) => {
                setLoading(false)
              toast("Aircraft added successflly")
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast(error?.response?.data?.error);
            });
    };

    return (
        <DashboardLayout image={bgImage}>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={6} xl={6}>
                    <Card>
                        <MDBox pt={4} pb={3} px={3}>
                        <MDTypography variant="h3" pb={3} textTransform="capitalize">
                            Add Aircraft
                        </MDTypography>
                            <MDBox component="form" role="form">
                                <MDBox mb={2}>
                                    <MDInput type="text" name="manufacturer" onChange={(e) => {
                                         setManufacturer(e.target.value);
                                    }} label="Manufacturer" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="model" onChange={(e) => {
                                        setModel(e.target.value);
                                    }} label="Model" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="classification" onChange={(e) => {
                                        setClassification(e.target.value);
                                    }} label="Classification" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="number" name="seats" onChange={(e) => {
                                        setSeat(e.target.value);
                                    }} label="Number of seats" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="speed" onChange={(e) => {
                                        setSpeed(e.target.value);
                                    }} label="Speed" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="range" onChange={(e) => {
                                        setRange(e.target.value);
                                    }} label="Range" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="luggage" onChange={(e) => {
                                        setLuggage(e.target.value);
                                    }} label="Luggage Capacity" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="summary" onChange={(e) => {
                                        setSummary(e.target.value);
                                    }} label="Summary" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="height" onChange={(e) => {
                                        setHeight(e.target.value);
                                    }} label="Interior height" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" name="width" onChange={(e) => {
                                        setWidth(e.target.value);
                                    }} label="Interior width" fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        md={2}
                                        type="file"
                                        name="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImage(file);
                                            setPreviewURL(URL.createObjectURL(file));
                                        }}
                                        fullWidth
                                    />
                                    {previewURL && <img height="200px" width="200px" src={previewURL} alt="Preview" />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        md={2}
                                        type="file"
                                        name="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImage2(file);
                                            setPreviewURL2(URL.createObjectURL(file));
                                        }}
                                        fullWidth
                                    />
                                    {previewURL2 && <img height="200px" width="200px" src={previewURL2} alt="Preview" />}
                                </MDBox>
                                {/* <MDBox mb={2}>
                                    <MDInput
                                        md={2}
                                        type="file"
                                        name="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImage3(file);
                                            setPreviewURL3(URL.createObjectURL(file));
                                        }}
                                        fullWidth
                                    />
                                    {previewURL3 && <img height="200px" width="200px" src={previewURL3} alt="Preview" />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        md={2}
                                        type="file"
                                        name="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImage4(file);
                                            setPreviewURL4(URL.createObjectURL(file));
                                        }}
                                        fullWidth
                                    />
                                    {previewURL4 && <img height="200px" width="200px" src={previewURL4} alt="Preview" />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        md={2}
                                        type="file"
                                        name="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImage5(file);
                                            setPreviewURL5(URL.createObjectURL(file));
                                        }}
                                        fullWidth
                                    />
                                    {previewURL5 && <img height="200px" width="200px" src={previewURL5} alt="Preview" />}
                                </MDBox> */}

                                <MDBox mt={4} mb={1}>
                                    <MDButton variant="gradient" onClick={handleSubmit} color="success" fullWidth>
                                       {loading ? "Processing..." : "Add Aircraft"}
                                    </MDButton>
                                </MDBox>

                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>



        </DashboardLayout>
    );
}

export default Aircraft;

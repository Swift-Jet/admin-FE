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
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  //const history = useHistory();

  const data = { email, password };
  const togglePasswordFunc = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`https://swift-jet-backend.onrender.com/api/v1/admin/login`, data)
      .then((data) => {
        localStorage.setItem("authenticated", JSON.stringify(true));
        navigate("/")
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast(error?.response?.data?.error);
      });
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  return (
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            SwiftWings Admin
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" name="email" onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }} label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name="password" onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }} label="Password" fullWidth />
            </MDBox>
                
                
            {/* <div height="500px">
              <MDInput
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
            </div> */}

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleSubmit} color="error" fullWidth>
                sign in
              </MDButton>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;

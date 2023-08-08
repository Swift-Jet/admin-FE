import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import profilesListData from "layouts/profile/data/profilesListData";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";

function Profile() {

  const navigate = useNavigate()

  const [aircrafts, setAircrafts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://swiftwings-mw.onrender.com/api/v1/aircraft/all"
      );
      setAircrafts(data?.data);
    }
    fetchData();

  }, []);
  return (
    <DashboardLayout >
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header >
        {/* <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "USA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox pt={3} pb={3} px={2} display="flex" justifyContent="space-between">
          <MDTypography variant="h6" fontWeight="medium">
            Aircrafts
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium">
            <MDButton color="info" onClick={() => {
              navigate("/add-aircraft")
            }}> Add Aircraft</MDButton>

          </MDTypography>

        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {
              aircrafts.map((item) => (
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    image={item.image_url}
                    // label={item.manufacturer}
                    title={item.model}
                    description={item.maunfacturer}
                    action={{
                      type: "internal",
                      route: `/single-aircraft/${item._id}`,
                      color: "info",
                      label: "view details",
                    }}
                  />
                </Grid>
              ))
            }
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;

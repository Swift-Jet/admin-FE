/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { Image } from "@mui/icons-material";
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { CardMedia } from "@mui/material";
import Transaction from "layouts/billing/components/Transaction";

function Transactions({name}) {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Aircraft information
        </MDTypography>
      </MDBox>
      {
      name?.map((item) => (
        <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="h6" color="text" fontWeight="bold" >
            {item?.model} - {item?.sjac_code}
          </MDTypography>
        </MDBox>
        <MDBox mt={1} mb={2}>
          <MDTypography variant="h6" color="text" fontWeight="bold">
            {item?.manufacturer}
          </MDTypography>
        </MDBox>
        <MDBox mt={1} mb={2}>
        <CardMedia
          src={item?.image_url}
          component="img"
          title={item?.model}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        </MDBox>
      </MDBox>
      ))
      }
   
    </Card>
  );
}

export default Transactions;

import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Transactions from "../Transactions";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  let booking_no = JSON.parse(localStorage.getItem("booking_number"))
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    setLoading(true)
    const body = { status: status }
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/admin/update?_id=${details._id}`, body
    );
    setDetails(data?.data);
    setLoading(false)
    window.location.reload(false);
  }
  const getButtonColor = (status) => {
    switch (status) {
      case 'New':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Confirmed':
        return 'success';
      default:
        return 'gray';
    }
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/admin/single?booking_number=${booking_no}`
      );
      setDetails(data?.data);
      console.log(data?.data);
    }
    fetchData();
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card id="delete-account">
          <MDBox pt={3} px={2} display="flex" justifyContent="space-between">
            <MDTypography variant="h6" fontWeight="medium">
              {details?.booking_number}

            </MDTypography>
            {
              details.status === "New" ? <MDButton
                color="success"
                variant="gradient"
                size="small"
                onClick={() => {
                  updateStatus("Processing")
                }}

              >
                {loading ? "updating" : "Update to processing"}
              </MDButton> : <MDButton
                color="success"
                variant="gradient"
                size="small"
                onClick={() => {
                  updateStatus("Confirmed")
                }}
              >
                {loading ? "updating" : "Update to complete"}
              </MDButton>
            }
          </MDBox>
          <MDBox pt={1} pb={2} px={2}>
            <MDBox component="ul" display="flex" flexDirection="column" p={0} m={2}>
              <MDBox>
                <MDTypography variant="button" fontWeight="medium">
                  {details.user?.first_name + " " + details.user?.last_name}
                  <br></br>
                  {details.user?.email}
                </MDTypography>
                <br></br>
                <MDBox display="flex" alignItems="center">
                  <MDBox mr={1}>
                    <MDButton size={"small"} variant="outlined" color={getButtonColor(details?.status)}>
                      {details?.status}
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              {
                details?.booking_details?.tripType == "Shared" ?
                  <Bill
                    name={details?.booking_details?.source?.name}
                    city={details?.booking_details?.source?.iata_code}
                    country={details?.booking_details?.source?.country_code}
                    d_name={details?.booking_details?.destination?.name}
                    d_city={details?.booking_details?.destination?.iata_code}
                    d_country={details?.booking_details?.destination?.country_code}
                    d_date={details?.booking_details?.depatureDate}
                    d_time={details?.booking_details?.depatureTime}
                    vat={details?.booking_details?.tripType}
                    adults={details?.booking_details?.adults}
                  />
                  : details?.booking_details?.formData.map((item) => (
                    <Bill
                      name={item?.source.value.name}
                      city={item?.source.value.city}
                      country={item?.source.value.country}
                      d_name={item?.destination.value.name}
                      d_city={item?.destination.value.city}
                      d_country={item?.destination.value.country}
                      d_date={item?.depatureDate}
                      d_time={item?.depatureTime}
                      r_date={item?.returningDate}
                      r_time={item?.returningTime}
                      vat={details?.booking_details?.tripType}
                      adults={item?.passengers.adults}
                      children={item?.passengers.children}
                      pets={item?.passengers.pets}
                    />
                  ))
              }
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={5}>
        <Transactions name={details?.additional_quote} />
      </Grid>
    </Grid>

  );
}

export default BillingInformation;

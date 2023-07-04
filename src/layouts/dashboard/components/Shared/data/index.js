
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import MDButton from "components/MDButton";


export default function Data() {

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
  const [summary, setSummary] = useState([]);
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
        "http://localhost:8000/api/v1/admin/summary"
      );

      console.log(data);
      const _data = data?.data.bookings.filter((item) => item.booking_details.tripType == "Shared")
      console.log("_data",_data);
      var newObj = {};

      let newArr = _data?.map((item) => {
        newObj = {
          _id: item._id,
          booking_number: item.booking_number,
          status:(<MDButton variant="text" size="small" color={getButtonColor(item.status)}>{item.status}</MDButton>) ,
          trip_type: item.booking_details.tripType,
          email: item.user.email,
          link: (<Link href="/booking" onClick={() => {
            localStorage.setItem("booking_number", JSON.stringify(item.booking_number));

          }}>view</Link>)
        };
        return newObj;
      });

      setSummary(newArr);
    }
    fetchData();

  }, []);
  return {
    columns: [
      { Header: "Booking Number", accessor: "booking_number", width: "20%", align: "left" },
      { Header: "Status", accessor: "status", width: "20%", align: "center" },
      { Header: "Trip Type", accessor: "trip_type", width: "20%", align: "center" },
      { Header: "Client Email", accessor: "email", width: "20%", align: "center" },
      { Header: "Action", accessor: "link", width: "20%", align: "right" },
    ],
    rows: summary
  };
}

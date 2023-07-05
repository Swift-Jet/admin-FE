import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Transaction from "../Transaction";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function BillShared({ name, city, country, d_name, d_city, d_country, d_date, d_time, r_date, r_time, email, vat, noGutter, adults, children, pets, client_name, client_email }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDBox mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Leaving From : {name}, {city}, {country}
              </MDTypography>
              <br></br>
              <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Leaving To : {d_name}, {d_city}, {d_country}
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error">
               {vat}
              </MDButton>
            </MDBox>
          
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Departure Date & Time:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {d_date} at {d_time} (24 hrs format)
            </MDTypography>
          </MDTypography>
        </MDBox>
        {
          vat !== "One way Trip" ? <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption"fontWeight="medium" color="text">
              Returning Date & Time:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {r_date} at {r_time} (24 hrs format)
              </MDTypography>
            </MDTypography>
          </MDBox> : null
        }

        <br></br>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="success"
            icon="expand_less"
            name="Children"

            value={children}
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Adults"

            value={adults}
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Pets"

            value={pets}
          />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

BillShared.defaultProps = {
  noGutter: false,
};

BillShared.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default BillShared;

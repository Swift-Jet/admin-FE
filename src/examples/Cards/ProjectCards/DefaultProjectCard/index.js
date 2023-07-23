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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  authors,
  click,
}) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
      onClick={() => click}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            width: "100%",
            height: "200px",
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>

      <MDBox mt={1} mx={0.5} lineHeight={0}>
        {label ? (
          <MDBox mb={1} height="100px" lineHeight={0.5}>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              textTransform="capitalize"
            >
              {label}
            </MDTypography>
          </MDBox>
        ) : null}

        <MDBox mb={1}>
          {action?.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h6"
              height={"30px"}
              display="block"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h6"
              height="30px"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography
            height="80px"
            variant="button"
            fontWeight="light"
            color="text"
          >
            {description}
          </MDTypography>
        </MDBox>
        {action === "" ? (
          <></>
        ) : (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {action?.type === "internal" ? (
              <MDButton
                component={Link}
                to={action.route}
                variant="outlined"
                size="small"
                color={action.color}
                onClick={() => {
                  localStorage.setItem("id", JSON.stringify("id"));
                }}
                height="100px"
              >
                {action.label}
              </MDButton>
            ) : (
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                color={action.color}
                onClick={() => {
                  localStorage.setItem("id", JSON.stringify("id"));
                }}
                height="100px"
              >
                {action.label}
              </MDButton>
            )}
            <MDBox display="flex">{renderAuthors}</MDBox>
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;

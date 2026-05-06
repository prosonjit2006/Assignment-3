import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Box, Button } from "@mui/material";
import { navbarItems } from "../services/json/global.json";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container
        //  maxWidth="xl"
        maxWidth={false}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* dashboard text */}
          <Typography
            variant="h6"
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              // fontFamily: "monospace",
              fontWeight: 700,
              fontWidth: "bold",
              fontSize: "30px",
              color: "inherit",
              // textDecoration: "none",
            }}
          >
            Logo
          </Typography>

          {/* navitems */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 6,
            }}
          >
            {/* {navbarItems.map((item) => (
              <Box
                key={item.name}
                component={NavLink}
                to={item.path}
                sx={{
                  textDecoration: "none",
                  //   color: "white",
                  //   display: "inline-block",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  textShadow: "2px 2px 5px gray",

                  "&:hover": {
                    transform: "scale(1.05)",
                    textShadow: "2px 2px 5px black",
                    color: "#ffffff",
                  },

                  "&.active": {
                    color: "#fff000",
                  },
                }}
              >
                {item.name}
              </Box>
            ))} */}

            {navbarItems.map((item) => (
              <Box
                key={item.name}
                component={NavLink}
                to={item.path}
                sx={{
                  textDecoration: "none",
                  position: "relative",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  color: "rgba(255,255,255,0.7)",

                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "#fff",
                  },

                  "&.active": {
                    color: "#fff",
                    transform: "scale(1.08)",
                  },

                  //  underline animation
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: "-4px",
                    width: "0%",
                    height: "2px",
                    backgroundColor: "#fff",
                    transition: "width 0.3s ease",
                  },

                  "&:hover::after": {
                    width: "100%",
                  },

                  "&.active::after": {
                    width: "100%",
                    backgroundColor: "#ffeb3b",
                  },
                }}
              >
                {item.name}
              </Box>
            ))}
          </Box>

          <Button
            onClick={() => navigate("/studentmanagement/login")}
            variant="contained"
          >
            Student CRUD
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

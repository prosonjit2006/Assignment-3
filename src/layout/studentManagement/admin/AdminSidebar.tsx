import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { adminSidebarItems } from "../../../services/json/admin.json";
import Logo from "../../../assets/image/logo-admin.png";

const AdminSidebar = () => {
  return (
    <Container
      // disableGutters
      
      maxWidth={false}
      sx={{
        color: "#fff",
        width: "100%",
        height: "100vh",
        background: "linear-gradient(150deg, #1C4D8D 20%, #1D546C 70% )",
        position: 'static',
        top: '0'
      }}
    >
      {/* <Box
        sx={{
          // border: '1px solid black',
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h5">Admin Panel</Typography>
      </Box> */}
      <Box
        component="figure"
        sx={{
          width: "200px",
          height: "120px",
          objectFit: "cover",
          p: 1,
          pt: 3,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="admin logo"
          // sx={{ width: "100%", height: "100%", }}
        />
      </Box>

      {/* navlinks */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          fontSize: "17px",
          mt: 3,
        }}
      >
        {adminSidebarItems.map((item) => (
          <Box
            component={NavLink}
            key={item.name}
            to={item.path}
            sx={{
              p: 1,
              transition: "all 0.35s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
                transform: "translateX(5px)",
              },

              "&.active": {
                color: "#fffaaa",
                fontWeight: "bold",
                transform: "translateX(8px)",
                borderRight: "3px solid yellow",
              },
            }}
          >
            {item.name}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AdminSidebar;

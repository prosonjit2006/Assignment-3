import { Box, Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminWrapper = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "15%" }}>
          <AdminSidebar />
        </Box>
        <Box sx={{ width: "85%" }}>
          <AdminNavbar />
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminWrapper;

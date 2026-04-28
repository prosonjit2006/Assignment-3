import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

const StudentWrapper = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "15%" }}>
          <StudentSidebar />
        </Box>
        <Box sx={{ width: "85%" }}>
          <StudentNavbar />
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default StudentWrapper;

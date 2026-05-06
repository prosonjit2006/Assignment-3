import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminWrapper = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* sidebar */}
      <Box
        sx={{
          width: 240,
          height: "100vh",
          position: "sticky",
          top: 0,
          borderRight: "1px solid #eee",
          bgcolor: "#fff",
        }}
      >
        <AdminSidebar />
      </Box>

      {/* right section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* navbar (fixed inside layout) */}
        <Box sx={{ flexShrink: 0 }}>
          <AdminNavbar />
        </Box>

        {/* scrollable content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminWrapper;

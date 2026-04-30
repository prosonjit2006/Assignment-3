// import user from "../../../assets/image/user.png";
import { Box, Container, Typography } from "@mui/material";
import Cookies from "js-cookie";

const user = JSON.parse(Cookies.get("user") as string);

const StudentDashboard = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      <Box sx={{ bgcolor: "#bbdefb", borderRadius: "10px", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4" sx={{ color: "#000aaa" }}>
            
              Welcome Back <span className="text-cyan-900">{user.name}</span>
            </Typography>
          </Box>
          <Box component="figure">
            <Box
              component="img"
              src={user.image}
              alt={user.name}
              sx={{ width: "200px", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentDashboard;

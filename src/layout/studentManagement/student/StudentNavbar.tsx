import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { LogOut } from "lucide-react";
import { forceLogout } from "../../../services/helper/global.helper";
import Cookies from "js-cookie";

const getUserFromCookie = () => {
  try {
    const cookie = Cookies.get("user");
    if (!cookie) return null;

    return JSON.parse(cookie);
  } catch (error) {
    console.error("Invalid user cookie", error);
    return null;
  }
};

const user = getUserFromCookie();

const StudentNavbar = () => {
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
            Dashboard
          </Typography>

          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton sx={{ p: 0 }}>
                  {user ? (
                    <Avatar alt={user.name} src={user.image} />
                  ) : (
                    <Avatar alt="Student" src="/avatar.png" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <Tooltip onClick={forceLogout} title="LogOut">
              <LogOut className="ml-2" />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default StudentNavbar;

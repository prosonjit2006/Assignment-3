import userAvater from "../../../assets/image/user.png";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { tablesDB } from "../../../lib/Appwrite.config";
import { Query } from "appwrite";
import type { ProfileType } from "../../../typescript/interface/student.interface";

// looking into this matter

const StudentDashboard = () => {
  
  const user = JSON.parse(Cookies.get("user") as string);

  // const [user, setUser] = useState<UserType | null>(null);
  // useEffect(() => {
  //   const getUserFromCookie = () => {
  //     try {
  //       const cookie = Cookies.get("user");
  //       if (!cookie) return null;

  //       const user = JSON.parse(cookie);
  //       setUser(user);
  //     } catch (error) {
  //       console.error("Invalid user cookie", error);
  //       return null;
  //     }
  //   };

  //   getUserFromCookie();
  // }, []);

  const [profileDetails, setProfileDetails] = useState<ProfileType | null>(
    null,
  );

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await tablesDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: "student",
          queries: [Query.equal("email", [user.email])],
        });

        const row = res.rows[0];
        console.log("res form student", row);

        if (!row) {
          toast.error("User not found");
          return;
        }

        setProfileDetails(row as unknown as ProfileType);
      } catch (error: any) {
        toast.error(error?.message);
      }
    };

    fetchStudent();
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      <Box sx={{ bgcolor: "#bbdefb", borderRadius: "10px", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            {/* <Typography variant="h2" sx={{ color: "#000aaa" }}>
              Welcome Back{" "}
              <span className="text-cyan-900 capitalize">
                {profileDetails?.name}
              </span>
            </Typography> */}

            <Typography
              variant="h2"
              sx={{ color: "#25343F", fontWeight: "600" }}
            >
              Welcome Back{" "}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textTransform: "capitalize",
                color: "#1D546D",
                fontWeight: "600",
              }}
            >
              {profileDetails?.name}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px", mt: 2 }}>
              Always stay updated in your student portal
            </Typography>
          </Box>
          <Box component="figure">
            <Box
              component="img"
              src={profileDetails?.image || userAvater}
              alt={profileDetails?.name}
              sx={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentDashboard;

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { tablesDB } from "../../../lib/Appwrite.config";
import { Query } from "appwrite";
import Cookies from "js-cookie";
import { profileInputFields } from "../../../services/json/profileInput.json";
import type { ProfileType } from "../../../typescript/interface/student.interface";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState<ProfileType | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileType>>({});

  const user = JSON.parse(Cookies.get("user") as string);
  // console.log(user);

  // initial data fetch
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      try {
        const res = await tablesDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: "student",
          queries: [Query.equal("email", [user.email])],
        });

        const row = res.rows[0];

        if (!row) {
          toast.error("User not found");
          return;
        }

        const userData: ProfileType = {
          $id: row.$id,
          name: row.name,
          email: row.email,
          role: row.role,
          image: row.image,
          phone: row.phone,
          address: row.address,
          course: row.course,
          $createdAt: row.$createdAt,
        };

        setProfileDetails(userData);
        setFormData(userData);
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [user.email]);

  //  handle change
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //  handel update
  const handleUpdate = async () => {
    if (!profileDetails?.$id) return;

    try {
      await tablesDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "student",
        rowId: profileDetails.$id,
        data: formData,
      });

      toast.success("Profile updated");

      setProfileDetails((prev) => ({
        ...prev!,
        ...formData,
      }));

      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {isLoading === true ? (
        <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
          {" "}
          Loading...
        </Typography>
      ) : (
        // main ui part
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "#fff",
            boxShadow: "1px 1px 7px #aad",
          }}
        >
          {/* header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={profileDetails?.image}
              alt="profile img"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #eee",
              }}
            />

            <Box>
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {profileDetails?.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {profileDetails?.email}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: "inline-block",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  bgcolor: "#f5f5f5",
                  textTransform: "capitalize",
                }}
              >
                {profileDetails?.role}
              </Typography>
            </Box>
          </Box>

          {/* devider */}
          <Box
            sx={{
              height: "1px",
              bgcolor: "#eee",
              mb: 3,
            }}
          />

          {/* info grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2.5,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Phone
              </Typography>
              <Typography>{profileDetails?.phone || "-"}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Course
              </Typography>
              <Typography sx={{ textTransform: "uppercase" }}>
                {profileDetails?.course || "-"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Address
              </Typography>
              <Typography sx={{ textTransform: "capitalize" }}>
                {profileDetails?.address || "-"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Joined
              </Typography>
              <Typography>
                {profileDetails?.$createdAt.slice(0, 10) || "-"}
              </Typography>
            </Box>
          </Box>

          {/* Action */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button variant="contained" onClick={() => setOpen(true)}>
              Edit Profile
            </Button>
          </Box>

          {/* dialog */}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Edit Profile</DialogTitle>

            <DialogContent sx={{ mt: 1 }}>
              {profileInputFields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  size="small"
                  margin="normal"
                  value={(formData as any)[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  // sx={{padding: 2}}
                />
              ))}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleUpdate}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Container>
  );
};

export default Profile;

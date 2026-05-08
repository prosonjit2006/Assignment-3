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
import { ID, tablesDB } from "../../../lib/Appwrite.config";
import { Pencil, Trash2 } from "lucide-react";
import userAvater from "../../../assets/image/user.png";
import { studentInputFields } from "../../../services/json/studentInput.json";
import type { ProfileType } from "../../../typescript/interface/student.interface";

const StudentList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<ProfileType[]>([]);
  const [formData, setFormData] = useState<Partial<ProfileType>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // initial data fetch using useeffect
  useEffect(() => {
    const studentsListFetch = async () => {
      setIsLoading(true);
      try {
        const res = await tablesDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: "student",
        });

        console.log("student list", res.rows);

        setStudentList(res.rows as unknown as ProfileType[]);
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    studentsListFetch();
  }, []);

  // open dialog + prefield data
  const handleEdit = async (item: any) => {
    setOpen(true);
    setEditId(item.$id);
    setFormData(item);
  };

  //   if (!editId) return;

  // };

  // input change
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle update
  const handleUpdate = async () => {
    if (!editId) return;

    try {
      await tablesDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "student",
        rowId: editId,
        data: formData,
      });

      toast.success("Student Updated Successfully");

      setStudentList((prev) =>
        prev?.map((item) =>
          item?.$id === editId ? { ...item, ...formData } : item,
        ),
      );

      handleClose();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
  };

  //   handle delete
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    if (!confirmDelete) return;

    try {
      await tablesDB.deleteRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "student",
        rowId: id,
      });

      // await tablesDB.deleteRow({
      //   databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      //   tableId: "users",
      //   rowId: id,
      // });

      toast.success("Student deleted");

      // update UI instantly (no refetch needed)
      setStudentList((prev) => prev.filter((item) => item.$id !== id));
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  // handle create
  const handleCreate = async () => {
    try {
      const res = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "student",
        rowId: ID.unique(),
        data: formData,
      });

      // const resUser = await tablesDB.createRow({
      //   databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      //   tableId: "users",
      //   rowId: ID.unique(),
      //   data: formData,
      // });

      // console.log('user data', resUser)

      toast.success("Student Added Successfully");

      // update UI instantly
      setStudentList((prev) => [...prev, res as unknown as ProfileType]);

      handleClose();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  // handle add
  const handleAdd = () => {
    setOpen(true);
    setEditId(null); // important
    setFormData({}); // empty form
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setFormData({});
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ px: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "#CAAA98",
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Typography variant="h6"> Student List</Typography>
        <Button onClick={handleAdd} variant="contained">
          Add student
        </Button>
      </Box>

      {isLoading === true ? (
        <Typography variant="body1" sx={{ color: "red", textAlign: "center" }}>
          Loading...
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {studentList?.map((item) => (
            <Box
              key={item.$id}
              sx={{
                width: 380,
                borderRadius: 3,
                p: 3,
                bgcolor: "#fff",
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.8s ease",
                },
              }}
            >
              {/* header */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  component="img"
                  src={item.image || userAvater}
                  alt={item.name || "image"}
                  sx={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <Box>
                  <Typography
                    sx={{ fontSize: "15px", textTransform: "capitalize" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{ font: "12px", color: "gray", textWrap: "wrap" }}
                  >
                    {item.email}
                  </Typography>
                </Box>
              </Box>

              {/* Info */}
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                  Phone
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {item.phone || "-"}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                    mt: 1,
                    color: "gray",
                  }}
                >
                  Course
                </Typography>
                <Typography
                  sx={{ fontSize: "13px", textTransform: "capitalize" }}
                >
                  {item.course || "-"}
                </Typography>

                <Typography sx={{ fontSize: "12px", mt: 1, color: "gray" }}>
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                >
                  {item.address || "-"}
                </Typography>
              </Box>

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1.5,
                }}
              >
                <Box
                  component="button"
                  onClick={() => handleEdit(item)}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    bgcolor: "#e3f2fd",
                    "&:hover": { bgcolor: "#bbdefb" },
                    transition: "all 0.5s ease",
                  }}
                >
                  <Pencil size={18} />
                </Box>

                <Box
                  //   disabled
                  component="button"
                  onClick={() => handleDelete(item.$id)}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    bgcolor: "#ffebee",
                    "&:hover": {
                      bgcolor: "#ffcdd2",
                      transition: "all 0.5s ease",
                    },
                  }}
                >
                  <Trash2 size={18} color="red" />
                </Box>
              </Box>
            </Box>
          ))}

          {/*  dialog up part  */}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>{editId ? "Edit Profile" : "Add Student"}</DialogTitle>

            <DialogContent sx={{ mt: 1 }}>
              {studentInputFields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  // size="small"
                  margin="normal"
                  value={(formData as any)[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  // sx={{padding: 2}}
                />
              ))}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={editId ? handleUpdate : handleCreate}
              >
                {editId ? "Edit Student" : "Add Student"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Container>
  );
};

export default StudentList;

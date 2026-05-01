import { Box, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signupFields } from "../../services/json/signup.json";
import DynamyicInput from "../../components/DynamyicInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../services/validation/signup.validation";
import { useState } from "react";
import { account, bucket, ID, tablesDB } from "../../lib/Appwrite.config";
import type { signupformvalue } from "../../typescript/interface/auth.interface";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: signupformvalue) => {
    setIsLoading(true);
    try {
      const userAuth = await account.create({
        userId: ID.unique(),
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("userauth", userAuth);

      let imageUrl;
      if (data.image) {
        // console.log("comming image", data.image);

        const uploadImage = await bucket.createFile({
          bucketId: import.meta.env.VITE_BUCKET_ID,
          fileId: ID.unique(),
          file: data.image,
        });
        // console.log("upload img", uploadImage);

        const viewImage = bucket.getFileView({
          bucketId: import.meta.env.VITE_BUCKET_ID,
          fileId: uploadImage.$id,
        });

        // console.log("vew img", viewImage);
        imageUrl = viewImage;
      }

      // user row data
      const user = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "users",
        rowId: ID.unique(),
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "user",
          image: imageUrl,
        },
      });

      // student row data
      const student = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "student",
        rowId: ID.unique(),
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "student",
          image: imageUrl,
        },
      });

      console.log("user rgister res", user);
      console.log("Student data", student);

      // if (user) {
      //   toast.success("User Register Successfully!!");
      //   reset();
      //   setPreview(null);
      //   navigate("/studentmanagement/login");
      // }
      if (student) {
        toast.success("Student Register Successfully!!");
        reset();
        setPreview(null);
        navigate("/studentmanagement/login");
      }
    } catch (error: any) {
      // console.log("error", error);
      // toast.error(error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 3,
            bgcolor: "#fff",
            border: "1px solid #e5e7eb",
            boxShadow: "2px 2px 5px gray",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
          >
            Create account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {signupFields.map((field) => (
                <DynamyicInput
                  key={field.name}
                  field={field}
                  register={register}
                  errors={errors}
                />
              ))}

              {/* Image Preview */}
              {preview && (
                <Box
                  component="img"
                  src={preview}
                  alt="preview"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mx: "auto",
                  }}
                />
              )}

              {/* Upload */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => document.getElementById("fileInput")?.click()}
                sx={{ textTransform: "none" }}
              >
                Upload profile image
                <Box
                  component="input"
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setValue("image", file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </Button>

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                {isLoading ? "Creating..." : "Create account"}
              </Button>

              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                Already have an account?{" "}
                <Box
                  component="span"
                  onClick={() => navigate("/studentmanagement/login")}
                  sx={{
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Login
                </Box>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

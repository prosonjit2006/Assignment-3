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
  const Navigate = useNavigate();

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        console.log("comming image", data.image);

        const uploadImage = await bucket.createFile({
          bucketId: import.meta.env.VITE_BUCKET_ID,
          fileId: ID.unique(),
          file: data.image,
        });
        console.log("upload img", uploadImage);
        const viewImage = bucket.getFileView({
          bucketId: import.meta.env.VITE_BUCKET_ID,
          fileId: uploadImage.$id,
        });

        console.log("vew img", viewImage);
        imageUrl = viewImage;
      }
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
      console.log("user rgister res", user);
      if (user) {
        toast.success("User Register Successfully!!");
        reset();
        setPreview(null);
        Navigate("/studentmanagement/login");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            boxShadow: "2px 2px 5px gray",
            p: 6,
            borderRadius: 7,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Signup
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              {signupFields.map((field) => (
                <DynamyicInput
                  key={field.name}
                  field={field}
                  register={register}
                  errors={errors}
                />
              ))}

              {/* img preview */}
              {preview && (
                <Box
                  component="img"
                  src={preview}
                  alt="img"
                  sx={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "7px",
                  }}
                />
              )}

              {/* file upload */}
              <Button
                variant="contained"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Upload File
                <Box
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setValue("image", file);

                    const imgUrl = URL.createObjectURL(file);
                    setPreview(imgUrl);
                  }}
                  component="input"
                  type="file"
                  id="fileInput"
                  hidden
                ></Box>
              </Button>

              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Loading..." : "Signup"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

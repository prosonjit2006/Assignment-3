import { Box, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DynamyicInput from "../../components/DynamyicInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { account, bucket, ID, tablesDB } from "../../lib/Appwrite.config";
import type {
  Loginformvalue,
} from "../../typescript/interface/auth.interface";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../../services/json/login.json";
import { loginSchema } from "../../services/validation/login.validation";
import { Query } from "appwrite";
import Cookies from 'js-cookie'

const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<string | null>(null);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Loginformvalue>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      
    },
  });

  const onSubmit = async (data: Loginformvalue) => {
    setIsLoading(true);
    try {
      const findUser = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: "users",
        queries: [Query.equal("email", [data.email])],
      });
      console.log("find user", findUser);
      if (findUser.rows.length > 0) {
        await account.createEmailPasswordSession({
          email: data.email,
          password: data.password,
        });

        Cookies.set("token", "true");
        Cookies.set("role", findUser?.rows?.[0]?.role);
        Cookies.set("user", JSON.stringify(findUser?.rows?.[0]));
        toast.success("Login Successfully!!");
        reset();
        if (findUser?.rows?.[0]?.role === "admin") {
          console.log("checking....");

          navigate("/studentmanagement/admin/dashboard");
        } else {
          navigate("/studentmanagement/user/dashbaord");
        }
      } else {
        toast.error("User not found!!");
      }
    } catch (error: any) {
      console.log("error", error);
      
      // setIsError(error.message);
      toast.error(error?.message)
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
            Login
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
              {loginFields.map((field) => (
                <DynamyicInput
                  key={field.name}
                  field={field}
                  register={register}
                  errors={errors}
                />
              ))}

              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

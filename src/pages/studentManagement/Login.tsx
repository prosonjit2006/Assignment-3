import { Box, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DynamyicInput from "../../components/DynamyicInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { account, tablesDB } from "../../lib/Appwrite.config";
import type { Loginformvalue } from "../../typescript/interface/auth.interface";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../../services/json/login.json";
import { loginSchema } from "../../services/validation/login.validation";
import { Query } from "appwrite";
import Cookies from "js-cookie";

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

      // console.log("find user", findUser);

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
          navigate("/studentmanagement/student/dashboard");
        }
      } else {
        toast.error("User not found!!");
      }
    } catch (error: any) {
      console.log("error", error);

      // setIsError(error.message);
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
            sx={{
              mb: 3,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Welcome back
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {loginFields.map((field) => (
                <DynamyicInput
                  key={field.name}
                  field={field}
                  register={register}
                  errors={errors}
                />
              ))}

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
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              {/* Footer */}
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                Don’t have an account?{" "}
                <Box
                  component="span"
                  onClick={() => navigate("/studentmanagement/signup")}
                  sx={{
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Create one
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

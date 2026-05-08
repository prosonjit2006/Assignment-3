import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { formOptimizarInput } from "../../services/json/formOptimizarInput.json";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptimizarSchema } from "../../services/validation/formOptimizar.validation";
import { useCallback, useMemo } from "react";

export type FormOptimizerInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  course: string;
  fees: number;
  discount: number;
  tax: number;
};

const FormOptimize = () => {
  console.log("render");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormOptimizerInput>({
    resolver: yupResolver(formOptimizarSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      course: "",
      fees: 0,
      discount: 0,
      tax: 0,
    },
  });

  const onSubmit = useCallback((data: FormOptimizerInput) => {
    console.log("response on submit", data);
    reset();
  }, [reset]);

  const [fees, discount, tax] = useWatch({
    control,
    name: ["fees", "discount", "tax"],
  });

  console.log("fees", fees, "discount", discount, "tax", tax);

  const totalFees = useMemo(() => {
    const f = Number(fees || 0);
    const discountAmount = (f * Number(discount || 0)) / 100;
    const taxAmount = (f * Number(tax || 0)) / 100;
    const raw = f - discountAmount + taxAmount;
    return Math.max(0, raw);
  }, [fees, discount, tax]);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "1px solid #eee",
          p: 5,
          borderRadius: 3,
          maxWidth: "750px",
          boxShadow: "2px 2px 5px gray",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
            Large Form Optimizer
          </Typography>
          <Typography variant="body1">Using useMemo & useCallback</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {formOptimizarInput.map((field) => (
              <Grid key={field.name} size={{ xs: 2, sm: 4, md: 6 }}>
                <TextField
                  fullWidth
                  type={field.type}
                  label={field.label}
                  {...register(field.name as keyof FormOptimizerInput)}
                  error={!!errors[field.name as keyof FormOptimizerInput]}
                  helperText={
                    errors[field.name as keyof FormOptimizerInput]?.message
                  }
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              mt: 2,
              bgcolor: "#e3f2fd",
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">Total Fees: </Typography>
            <span>${totalFees}</span>
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormOptimize;

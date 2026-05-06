import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { formOptimizarInput } from "../../services/json/formOptimizarInput.json";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptimizarSchema } from "../../services/validation/formOptimizar.validation";
import DynamyicInput from "../../components/DynamyicInput";
import { useMemo } from "react";

export type FormOprimizarInput = {
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
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm<FormOprimizarInput>({
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

  const onSubmit = (data: FormOprimizarInput) => {
    console.log("response on submit", data);
  };

  // const values = useWatch({ control });

  const fees = useWatch({ control, name: "fees" });
  const discount = useWatch({ control, name: "discount" });
  const tax = useWatch({ control, name: "tax" });

  console.log("fees", fees);
  console.log("discount", discount);
  console.log("tax", tax);

  // const totalFees = useMemo(() => {
  //   const fees = Number(values?.fees || 0);
  //   const discount = Number(values?.discount || 0);
  //   const tax = Number(values?.tax || 0);

  //   return fees - discount + tax;
  // }, [values?.fees, values?.discount, values?.tax]);

  const totalFees = useMemo(() => {
    return Number(fees || 0) - Number(discount || 0) + Number(tax || 0);
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {formOptimizarInput.map((field) => (
              <Grid
                key={field.name}
                // key={index}
                size={{ xs: 2, sm: 4, md: 6 }}
              >
                <DynamyicInput
                  field={field}
                  register={register}
                  errors={errors}
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
            <span>{totalFees}</span>
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

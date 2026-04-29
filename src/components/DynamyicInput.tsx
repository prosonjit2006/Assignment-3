import { TextField, MenuItem } from "@mui/material";

type Field = {
  name: string;
  label: string;
  type: string;
  options?: string[];
};

type Props = {
  field: Field;
  register: any;
  errors: any;
};

const DynamyicInput = ({ field, register, errors }: Props) => {
  const error = errors?.[field.name];

  
  return (
    <TextField
      fullWidth
      type={field.type}
      label={field.label}
      {...register(field.name)}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default DynamyicInput;

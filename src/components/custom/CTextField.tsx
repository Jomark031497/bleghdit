import { BaseTextFieldProps, TextField } from "@mui/material";

interface Props extends BaseTextFieldProps {
  placeholder?: string;
  label?: string;
  InputProps?: any;
  value?: any;
}

const CTextField: React.FC<Props> = ({ ...props }) => {
  return (
    <TextField
      {...props}
      sx={{ m: "0.5rem 0rem" }}
      size="small"
      fullWidth
      variant="outlined"
      label={props.label}
      placeholder={props.placeholder}
      InputProps={props.InputProps}
      value={props.value}
    />
  );
};

export default CTextField;

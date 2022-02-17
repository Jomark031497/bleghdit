import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface IButtonProps extends ButtonProps {
  mx?: string;
  my?: string;
}

const CButton: React.FC<IButtonProps> = ({ ...props }) => {
  return <Button {...props} sx={{ p: "0.3rem 2.5rem", borderRadius: "1rem", mx: props.mx, my: props.my }} />;
};

export default CButton;

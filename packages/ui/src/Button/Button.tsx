import * as React from "react";
import MuiButton from "@mui/material/Button";

interface ButtonProps {
  message: string;
  color?: string;
}

const Button = (props: ButtonProps) => {
  return <MuiButton variant="contained">{props.message}</MuiButton>;
};

export default Button;

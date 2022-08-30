import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface SignupFormFieldProps {
  label: string;
  type: string;
  minLength: number;
  validationRegex?: RegExp;
  onChange: (value: string) => void;
  error: boolean;
}

export const SignupFormField: React.FC<SignupFormFieldProps> = ({
  label,
  type,
  validationRegex,
  onChange,
  error,
}) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!value) {
      setMessage(`${label} is required`);
      setShowError(true);

      return;
    } else {
      setShowError(false);
    }

    if (validationRegex && !validationRegex.test(value)) {
      setMessage("Please enter the correct email");
      return;
    }

    setMessage("");
  }, [focus, label, validationRegex, value]);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <TextField
      fullWidth
      helperText={message}
      error={showError}
      label={label}
      type={type}
      className="form-control"
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
};

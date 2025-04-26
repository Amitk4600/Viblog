import * as React from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Link,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useRegisterUserMutation } from "../../features/api/authApi";

function Registration() {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [registerUser, { data, error, isLoading, isSuccess }] =
    useRegisterUserMutation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpInput({ ...signUpInput, [name]: value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(signUpInput)
      .unwrap()
      .then(() => {
        setSignUpInput({ name: "", email: "", password: "" });
        setOpen(true);
      });
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    maxWidth: "305px",
    margin: "150px auto",
    width: "90%",
    borderRadius: 10,
  };
  const buttonStyle = {
    margin: "8px 0",
  };
  const typographyStyle = {
    margin: "8px 0",
    textAlign: "center",
    color: "gray",
    fontSize: "1rem",
    fontWeight: "bold",
  };
  const linkStyle = {
    listStyle: "none",
    textDecoration: "none",
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Grid
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar></Avatar>
          <h2 className="font-semibold">Sign Up</h2>
        </Grid>
        <TextField
          label="User Name"
          placeholder="User name"
          variant="standard"
          name="name"
          value={signUpInput.name}
          fullWidth
          required
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          placeholder="Email"
          name="email"
          value={signUpInput.email}
          variant="standard"
          type="email"
          fullWidth
          required
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          value={signUpInput.password}
          name="password"
          variant="standard"
          fullWidth
          required
          onChange={handleInputChange}
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            "&:hover": {
              backgroundColor: "#3f51b5",
              color: "white",
            },
          }}
          style={buttonStyle}
          onClick={handleSubmit}
        >
          {isLoading ? <CircularProgress /> : "Sign Up"}
        </Button>
        <Typography style={typographyStyle}>
          Already have an account{" "}
          <Link style={linkStyle} href="#">
            Sign In
          </Link>
        </Typography>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registration successful
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Registration;
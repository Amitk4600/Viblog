import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

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
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { useLoginUserMutation } from "../../features/api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [loginUser, { data, error, isLoading, isSuccess }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginInput)
      .unwrap()
      .then((response) => {
        localStorage.setItem("username", response.user.name);
        setLoginInput({ email: "", password: "" });
        setOpen(true);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home", { replace: true });
    }
  }, [isSuccess, navigate]);
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
          <h2>Login</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          value={loginInput.email}
          variant="standard"
          fullWidth
          required
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={loginInput.password}
          variant="standard"
          fullWidth
          required
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
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
          {isLoading ? <CircularProgress /> : "Login"}
        </Button>
        <Typography style={typographyStyle}>
          <Link to="#" style={linkStyle}>
            Forget Password?
          </Link>
        </Typography>
        <Typography style={typographyStyle}>
          Don't have an account?{" "}
          <Link style={linkStyle} to="#">
            Sign Up
          </Link>
        </Typography>
      </Paper>
      {isSuccess && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            welcome back {data.user.name}
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );
}

export default Login;

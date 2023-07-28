import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import validate from "validate.js";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { LockOutlined, AccountCircle, Lock } from "@material-ui/icons";

import customerApi from "../../api/customerApi";
import staffApi from "../../api/staffApi";

const constraints = {
  email: {
    presence: { allowEmpty: false, message: "bắt buộc" },
  },
  password: {
    presence: { allowEmpty: false, message: "bắt buộc" },
    length: {
      minimum: 6,
      message: "quá ngắn (tối thiểu 6 ký tự)",
    },
  },
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Fabric
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://agorafabrics.com/wp-content/uploads/2021/11/AGORA_WEB_1rst.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertContainer: {
    position: "relative",
    height: 20,
    width: "100%",
    marginTop: theme.spacing(1),
  },
  alert: {
    color: "red",
    position: "absolute",
    left: 0,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
      password: "",
      role: "staff",
    },
    touched: {},
    errors: {},
  });

  const [alert, setAlert] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, constraints);
    setLoginError(false);
    // update form validation
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  // for submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =
        formState.values.role === "customer"
          ? await customerApi.login({
              email: formState.values.email,
              password: formState.values.password,
            })
          : await staffApi.login({
              email: formState.values.email,
              password: formState.values.password,
            });

      localStorage.setItem(
        "user",
        JSON.stringify({ role: formState.values.role, ...response })
      );
      localStorage.setItem("access_token", response.access_token);
      history.push("/dashboard");
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleChange = (e) => {
    e.persist();

    // update form data
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
      touched: { ...formState.touched, [e.target.name]: true },
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <div className={classes.alertContainer}>
            <Typography
              component="span"
              variant="subtitle1"
              className={classes.alert}
            >
              {alert}
            </Typography>
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              error={hasError("email")}
              helperText={hasError("email") ? formState.errors.email[0] : null}
              onChange={handleChange}
              value={formState.values.email || ""}
              name="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ email"
              autoComplete="email"
              autoFocus
              placeholder="Nhập địa chỉ Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={hasError("password")}
              helperText={
                hasError("password") ? formState.errors.password[0] : null
              }
              onChange={handleChange}
              value={formState.values.password || ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="role"
              label="Vai trò"
              value={formState.values.role}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="staff">Nhân viên</option>
              <option value="customer">Khách hàng</option>
            </TextField>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ tài khoản"
            />

            {loginError && (
              <Typography variant="body2" color="error">
                Đăng nhập thất bại, vui lòng thử lại.
              </Typography>
            )}
            <Button
              disabled={!formState.isValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Đăng kí tài khoản"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

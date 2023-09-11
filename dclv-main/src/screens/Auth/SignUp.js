import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { LockOutlined } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel } from "@material-ui/core";
import customerApi from "../../api/customerApi";
import { async } from "validate.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        BK Fabric
      </Link>{" "}
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
    // backgroundImage:
    //   "url(https://webservices.wkf.fr/editorial/medias/images/actu-77374-report-d_imposition-des.jpg)",
    backgroundImage:
      "url(https://www.cottoneerfabrics.com/wp-content/uploads/space-dye-wovens-by-figo-fabrics-8.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(0, 4),
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
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [info, setInfo] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !info.email ||
      !info.name ||
      !info.password ||
      !info.inputPassword ||
      !info.address ||
      !info.phone
    ) {
      alert("Vui lòng điền thông tin còn thiếu!");
    } else if (info.password !== info.inputPassword) {
      alert("Mật khẩu không khớp, vui lòng thử lại");
    } else {
      var data = { ...info, role: "customer" };

      delete data.inputPassword;
      console.log(data);
      customerApi
        .regiter(data)
        .then((res) => {
          alert("Đăng kí thành công");
          setTimeout(3000);
          history.push("/signin");
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };
  useEffect(() => {
    console.log(info);
  }, [info]);
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
            Đăng kí
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="email-customer"></InputLabel>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.btnColor}>
                Email
              </Typography>
              <TextField
                required={true}
                id="standard-required"
                name="email-customer"
                variant="outlined"
                className={classes.inputPassword}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="telephone-customer"></InputLabel>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.btnColor}>
                Số điện thoại
              </Typography>
              <TextField
                required
                id="standard-required"
                name="telephone-customer"
                variant="outlined"
                type="number"
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              />
            </FormControl>

            <FormControl
              fullWidth
              margin="dense"
              style={{ marginRight: "10px" }}>
              <InputLabel htmlFor="nameCustomer"></InputLabel>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.btnColor}>
                Họ tên
              </Typography>
              <TextField
                required
                id="standard-required"
                name="nameCustomer"
                variant="outlined"
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="address-customer"></InputLabel>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.btnColor}>
                Địa chỉ
              </Typography>
              <TextField
                required
                id="standard-required"
                name="address-customer"
                variant="outlined"
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="password"></InputLabel>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.btnColor}>
                Mật khẩu
              </Typography>
              <TextField
                id="password"
                name="newPass"
                type="password"
                variant="outlined"
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="password-confirm"></InputLabel>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.btnColor}>
                Nhập lại mật khẩu
              </Typography>
              <TextField
                id="password-confirm"
                name="confirmPass"
                type="password"
                variant="outlined"
                className={classes.inputPassword}
                onChange={(e) =>
                  setInfo({ ...info, inputPassword: e.target.value })
                }
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}>
              Đăng kí
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signin" variant="body2">
                  Quay lại đăng nhập
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

import React from "react";
import Typography from "@material-ui/core/Typography";
import FormPasswordReset from "./Components/FormPasswordReset";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  contain: {
    direction: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

function ChangePassword() {
  const classes = useStyles();
  return (
    <div className={classes.contain}>
      <Typography variant="title" styles={{ textAlign: "center" }}>
        Đổi mật khẩu
      </Typography>
      <FormPasswordReset />
    </div>
  );
}

export default ChangePassword;

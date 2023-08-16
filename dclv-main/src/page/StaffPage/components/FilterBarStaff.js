import React from "react";
import { Grid, FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import SearchField from "../../../components/SearchField";
import NotificationButton from "../../../components/Button/NotificationButton";
import AddStaffModal from "./AddStaffModal";

const useStyles = makeStyles(() => ({
  checkboxText: {
    fontSize: 14,
  },
  notiSearch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxCustom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function FilterBarStaff(props) {
  const classes = useStyles();
  const { filterPos, setFilterPos, setFilterName, setRefresh } = props;

  const handleChange = (event) => {
    setFilterPos(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterPos || "all"}
              label="Chức vụ"
              onChange={handleChange}>
              <option value={"all"}>Tất cả</option>
              <option value={"SALESMAN"}>Nhân viên bán hàng</option>
              <option value={"SHIPPER"}>Nhân viên giao hàng</option>
              <option value={"ADMIN"}>Quản lý</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item container md={2} sm={3} xs={12}>
          <AddStaffModal setRefresh={setRefresh} />
        </Grid>
        <Grid
          item
          container
          md={4}
          sm={3}
          xs={12}
          className={classes.notiSearch}>
          <Grid item xs={2}>
            <NotificationButton />
          </Grid>
          <Grid item xs={10}>
            <SearchField onChange={setFilterName} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default FilterBarStaff;

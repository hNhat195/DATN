import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
// import { Grid, Typography } from "@material-ui/core";
import FilterBarStaff from "./components/FilterBarStaff";
import StaffList from "./components/StaffList";
import StaffHeader from "./components/StaffHeader";
import staffApi from "../../api/staffApi";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  staffList: {
    marginTop: "10px",
  },
}));

function StaffPage() {
  const classes = useStyles();
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [filterPos, setFilterPos] = useState("all");
  const [filterName, setFilterName] = useState("");

  const fetchStaff = async () => {
    try {
      const response = await staffApi.getAll();
      const data = response;
      setStaffs(data);
      setFilteredStaffs(data);
    } catch (error) {
      alert("Failed to fetch staff list");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [refresh]);

  useEffect(() => {
    let tempStaffs = staffs;
    if (filterPos !== "all") {
      tempStaffs = staffs?.filter((item) => item.role === filterPos);
    }

    if (filterName) {
      tempStaffs = staffs?.filter((item) =>
        item.name?.toLowerCase().includes(filterName?.toLowerCase())
      );
    }

    setFilteredStaffs(tempStaffs);
  }, [filterPos, filterName]);

  return (
    <>
      <Container>
        <div className={classes.root}>
          <FilterBarStaff
            filterPos={filterPos}
            setFilterPos={setFilterPos}
            filterName={filterName}
            setFilterName={setFilterName}
            setRefresh={setRefresh}
          />
          <StaffHeader />
          {filteredStaffs && (
            <StaffList className={classes.staffList} staff={filteredStaffs} />
          )}
        </div>
      </Container>
    </>
  );
}

export default StaffPage;

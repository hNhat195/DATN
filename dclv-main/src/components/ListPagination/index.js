import { Box } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";

export default function ListPagination({ pageSize, itemList, setItemList, itemPerPage, setItemPerPage, filter}) {
  
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setItemPerPage(itemList.slice(0, pageSize));
  }, [itemList]);

  useEffect(() => {
    setItemPerPage(itemList.slice(pagination.from, pagination.to));
  }, [pagination.from, pagination.to]);

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setCurrentPage(page);
    setPagination({ ...pagination, from: from, to: to });
    
  };
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      sx={{ margin: "20px 0px" }}
    >
      <Pagination
        count={Math.ceil(itemList.length / pageSize)}
        onChange={handlePageChange}
        page={currentPage}
      />
    </Box>
  );
}

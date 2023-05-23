import { Box } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
const pageSize = 6;

export default function ListPagination({ orderList, setOrderList, getAll }) {
  const [allProduct, setAllProduct] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getAll(0, 100);
      setPagination({ ...pagination, count: response.length });
      setAllProduct(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setOrderList(allProduct.slice(0, pageSize));
  }, [allProduct]);

  useEffect(() => {
    setOrderList(allProduct.slice(pagination.from, pagination.to));
  }, [pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

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
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handlePageChange}
      />
    </Box>
  );
}

import { Box, Pagination } from "@mui/material";

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Box
      sx={{
        margin: "10px 0 ",
      }}
      alignContent={"center"}
      justifyContent={"center"}
      display={"flex"}
    >
      <Pagination
        color="primary"
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            margin: "0 20px",
            display: { xs: 'none', sm: 'block' },
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;

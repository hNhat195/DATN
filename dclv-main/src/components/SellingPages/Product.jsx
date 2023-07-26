import * as React from "react";

import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Product({ item }) {
  return (
    <Card
      sx={{
        border: "none",
        boxShadow: "none",
        maxWidth: 345,
        minWidth: 320,
        margin: 1,
      }}
    >
      <a href={`/product/${item.slug}`}>
        <CardMedia
          sx={{ margin: 1 }}
          component="img"
          height="250"
          image={item?.image[0]}
          alt="Paella dish"
        />
      </a>
      <CardContent>
        <Typography
          sx={{ typography: "subtitle2" }}
          variant="body2"
          align="center"
        >
          <Link href={`/product/${item.slug}`} underline="none" color="inherit">
            {item?.name || "Name of fabric"}
          </Link>
        </Typography>
        <Typography variant="body2" align="center">
          {item?.price || "250"}
        </Typography>
      </CardContent>
    </Card>
  );
}

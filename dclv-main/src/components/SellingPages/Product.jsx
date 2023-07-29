import * as React from "react";

import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    height: '240px',
    width: '320px',
    position: 'relative',
    '&:hover img': {
      display: 'none',
    },
    '&:hover:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: ({ hoverImage }) => `url(${hoverImage})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      pointerEvents: 'none',
    },
  },
});

export default function Product({ item }) {
  // const [hovered, setHovered] = React.useState(false);
  const history = useHistory();
  const classes = useStyles({ hoverImage: item?.image[item?.image.length-1] });
  const redirect = () => {
    history.push(`/product/${item.slug}`);
  }
  return (
    <Card
      sx={{
        border: "none",
        boxShadow: "none",
        maxWidth: 345,
        minWidth: 320,
        margin: 1,
      }}
      
      onClick={redirect}
    >
      <div className={classes.card}>
        <CardMedia
          sx={{ margin: 1 }}
          component="img"
          height="250"
          // image={hovered ? item?.image[2] : item?.image[0]}
          image={item?.image[0]}
          alt="Paella dish"
        />
      </div>
      
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

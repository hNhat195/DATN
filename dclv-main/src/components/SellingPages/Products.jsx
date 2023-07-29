import styled from "styled-components";
import { popularProducts } from "../../data";
import Product from "./Product";
import { Grid } from "@material-ui/core";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ products }) => {
  return (
    <Container>
      <Grid container>
        {products?.map((item) => (
          <Grid key={item.id} item xs={4}>
            <Product item={item}/>
          </Grid>
        ))}
      </Grid>
    </Container>
    // <Container>
      
    //     {products?.map((item) => (
          
    //         <Product item={item}/>
          
    //     ))}
      
    // </Container>
  );
};

export default Products;

import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Link from "@mui/material/Link";
import { mobile } from "../../responsive";

import SearchBar from "./SearchBar";
import { useHistory } from "react-router";
import cartUtil from "../../utils/cart";

const Container = styled.div`
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  margin: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ margin: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin: 0;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ searchWord, setSearchWord, cartNumber }) => {
  const history = useHistory();
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
        </Left>
        <Center>
          <Logo>FABRICVN</Logo>
        </Center>
        <Right>
          <MenuItem
            onClick={() => {
              history.push("/signup");
            }}>
            REGISTER
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/signin");
            }}>
            SIGN IN
          </MenuItem>
          <MenuItem>
            <Link href={`/home/create-order`} underline="none" color="inherit">
              <Badge
                badgeContent={cartNumber || cartUtil.getCartNumber()}
                color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

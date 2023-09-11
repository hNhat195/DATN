import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

import SearchBar from "./SearchBar";
import { useHistory } from "react-router";

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

const Navbar = ({ searchWord, setSearchWord }) => {
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
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

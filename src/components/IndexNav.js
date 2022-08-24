import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { lg } from "../BreakPoints";
import trelloLogo from "../images/trello-logo.svg";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../services/userService";
const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  z-index: 100;
  ${lg({
    justifyContent: "space-between",    
  })}
`;

const Icon = styled.img`
  margin-left: 1rem;
  ${lg({
    marginLeft: "0",
  })}
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #0952cc;
`;

const Button = styled.button`
  background-color: #0065ff;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;  
  &:hover {
    background-color: #0952cc;
  }
`;

const IndexNav = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
    const onLogout = ()=>{
      logOut(user, dispatch);
      navigate('/login')
    }
  return (
    <Container>
      <Icon src={trelloLogo} />
      <RightSide>
          {user.userInfo?(<Link onClick={onLogout}>Log out</Link>):(<>
              <Link onClick={() => navigate("/login")}>Log in</Link>
              <Button onClick={()=>navigate("/register")}>Get Trello for free</Button></>)}
      </RightSide>
    </Container>
  );
};

export default IndexNav;
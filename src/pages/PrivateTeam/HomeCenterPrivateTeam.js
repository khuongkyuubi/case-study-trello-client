import styled from "styled-components";
import React from "react";
import MediaCardPrivateTeam from "./MediaCardPrivateTeam";

const Container = styled.div`
  width: 34%;
  margin-top: 40px;
  margin-left:5px;
`
const WrapperMain = styled.div`
  width: 100%;
  height:auto;
  border-radius: 3px;
`


const HomeCenterPrivateTeam = () => {
    return (
        <Container>
            <WrapperMain>
                <MediaCardPrivateTeam/>
            </WrapperMain>
        </Container>
    );
};

export default HomeCenterPrivateTeam;
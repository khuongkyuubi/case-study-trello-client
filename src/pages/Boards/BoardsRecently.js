import React from 'react';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "styled-components";
const BoardsRecently = styled.div`
  width: 100%;
  height: 100%;
`

const Recently = styled.div`
  width: 100%;
  height: 100%;
`

const Tittle = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  margin: 5px 5px;
`

const IconTitle = styled.div`
  margin: 0 7px;
  color: #42526e;

`

const NameTitle = styled.div`
  font-size: 17px;
  font-weight: bold;
`

export const Cards = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;

`

export const Card = styled.div`
  width: 23%;
  height: 100px;
  background-color: #4097a2;
  color: #f5eded;
  display: flex;
  flex-wrap: wrap;
  margin: 7px 10px;
  border-radius: 5px;

  &:hover {
    color: red;
    cursor: pointer;
    border-radius: 5px;
  }
`


export const NameWorkSpaceRecently = styled.div`
  margin: 7px 15px;
  font-size: 18px;
  font-weight: bold;
`

export const IconWorkSpaceRecently = styled.div`

`

const BoardRecently = () => {
    return (
        <BoardsRecently>
            <Recently>
                <Tittle>
                    <IconTitle><AccessTimeIcon/></IconTitle>
                    <NameTitle>Recently viewed</NameTitle>
                </Tittle>

                <Cards>
                    <Card>
                        <NameWorkSpaceRecently>AlphaWolf_Trello</NameWorkSpaceRecently>
                        <IconWorkSpaceRecently>o</IconWorkSpaceRecently>
                    </Card>
                    <Card>
                        <NameWorkSpaceRecently>AlphaWolf_Trello</NameWorkSpaceRecently>
                        <IconWorkSpaceRecently>o</IconWorkSpaceRecently>
                    </Card>
                    <Card>
                        <NameWorkSpaceRecently>AlphaWolf_Trello</NameWorkSpaceRecently>
                        <IconWorkSpaceRecently>o</IconWorkSpaceRecently>
                    </Card>
                    <Card>
                        <NameWorkSpaceRecently>AlphaWolf_Trello</NameWorkSpaceRecently>
                        <IconWorkSpaceRecently>o</IconWorkSpaceRecently>
                    </Card>
                    <Card>
                        <NameWorkSpaceRecently>AlphaWolf_Trello</NameWorkSpaceRecently>
                        <IconWorkSpaceRecently>o</IconWorkSpaceRecently>
                    </Card>

                </Cards>

            </Recently>
        </BoardsRecently>

    );
};

export default BoardRecently;
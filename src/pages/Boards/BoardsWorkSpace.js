import React from 'react';
import styled from "styled-components";
import {Cards, IconWorkSpaceRecently, NameWorkSpaceRecently, Card} from "./MyBoards";
import {IconProject} from "../Home/HomeLeft";


const BoardsWorkSpace = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5%;
`

const Workspaces = styled.div``

const Desc = styled.div`
  margin-left: 10px;
  color: #5e6c84;
  font-size: 20px;
  font-weight: bold;
`

const ContentWorkspace = styled.div``

export const CreateBoard = styled.div`
  width: 22%;
  height: 80px;
  //background-color: #f0f2f5;
  background-image: {()};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 7px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
    border-radius: 5px;
  }
`

const TitleNameProject = styled.div`
  margin-left: 10px;
`

const ContentProject = styled.div`
  height: 45px;
  margin-top: 7px;
  //margin-left:2px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
    border-radius: 5px;
  }
`
const NameProject = styled.div`
  font-weight: bold;
`

const BoardWorkSpace = () => {
    return (
        <BoardsWorkSpace>
            <Workspaces>
                <Desc>YOUR WORKSPACES</Desc>
                <ContentWorkspace>

                    <TitleNameProject>
                        Dự án C03H_JS
                        <ContentProject>
                            <IconProject>D</IconProject>
                            <NameProject>Du an C03H_JS</NameProject>
                        </ContentProject>
                    </TitleNameProject>

                    <Cards>
                        <Card>
                            <NameWorkSpaceRecently>AlphaWolf_Trello</NameWorkSpaceRecently>
                            <IconWorkSpaceRecently>o</IconWorkSpaceRecently>
                        </Card>
                        <CreateBoard>
                            create new board
                        </CreateBoard>
                    </Cards>
                </ContentWorkspace>
            </Workspaces>
        </BoardsWorkSpace>
    );
};

export default BoardWorkSpace;
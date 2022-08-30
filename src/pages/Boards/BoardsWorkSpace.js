import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Cards, IconWorkSpaceRecently, NameWorkSpaceRecently, Card} from "./MyBoards";
import {IconProject} from "../Home/HomeLeft";
import CreateBoardInTeam from "../../components/modals/CreateBoardInTeamModal/CreateBoardInTeam";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ContentWorkSpaces from "./ContenWorkSpace";
import {getTeams} from "../../services/teamService";

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

export const ContentWorkspace = styled.div``

export const CreateBoards = styled.div`
  width: 22%;
  height: 80px;
  background-color: #f0f2f5;
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

export const TitleNameProject = styled.div`
  margin-left: 10px;
display: flex;
  justify-content: space-between
`

export const ContentProject = styled.div`
  height: 45px;
  margin-top: 7px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
    border-radius: 5px;
  }
`

export const DivButton=styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  margin-top:5px;
  margin-right:10%;
`

export const ButtonMember=styled.div`
  padding:5px;
margin-right:15%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:5px;
  &:hover {
    background-color:#f0f2f5;
  }
`

export const ButtonSettings=styled.div`
  padding:5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:5px;
  &:hover {
    background-color:#f0f2f5;
  }
`



export const NameProject = styled.div`
  font-weight: bold;
`

const BoardWorkSpace = () => {

    const {listTeamData} =useSelector(state =>state.boardInTeam)
    useEffect(() => {
        document.title = "Boards | Trello Clone"
    }, [])

    return (
        <BoardsWorkSpace>
            <Workspaces>
                <Desc>YOUR WORKSPACES</Desc>
                {listTeamData.map(team=>(
                 <ContentWorkSpaces team={team} key={team._id}/>
                ))}
            </Workspaces>
        </BoardsWorkSpace>
    );
};

export default BoardWorkSpace;
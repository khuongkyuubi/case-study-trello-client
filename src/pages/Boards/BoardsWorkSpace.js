import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Cards, IconWorkSpaceRecently, NameWorkSpaceRecently, Card} from "./MyBoards";
import {IconProject} from "../Home/HomeLeft";
import CreateBoardInTeam from "../../components/modals/CreateBoardInTeamModal/CreateBoardInTeam";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

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

const TitleNameProject = styled.div`
  margin-left: 10px;
`

const ContentProject = styled.div`
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
const NameProject = styled.div`
  font-weight: bold;
`

const BoardWorkSpace = () => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const {listTeamData}=useSelector(state =>state.boardInTeam)
    const {teamsData} =useSelector(state =>state.team)

    const handleModalClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        document.title = "Boards | Trello Clone"
    }, [])


    return (
        <BoardsWorkSpace>
            <Workspaces>
                <Desc>YOUR WORKSPACES</Desc>
                {teamsData.map(team=>(

                <ContentWorkspace key={team._id}>
                    <TitleNameProject>
                        <ContentProject>
                            <IconProject>{team.name.charAt(0).toUpperCase()}</IconProject>
                            <NameProject>{team.name}</NameProject>
                        </ContentProject>
                    </TitleNameProject>

                    <Cards>
                        {listTeamData.map(boardTeam =>{
                            if(boardTeam.teams===team._id){
                                return (
                                        <Card
                                            link={boardTeam.backgroundImageLink}
                                            isImage={boardTeam.isImage}
                                            onClick={() => navigate(`/board/${boardTeam._id}`)}
                                            key={boardTeam._id}
                                        >
                                            <NameWorkSpaceRecently>{boardTeam.title}</NameWorkSpaceRecently>
                                        </Card>
                             )}
                        })}



                        <CreateBoards onClick={() => setOpenModal(true)}>
                            create new board
                        </CreateBoards>
                        {openModal && <CreateBoardInTeam idTeam={team._id} handleModalClose={handleModalClose}/>}
                    </Cards>
                </ContentWorkspace>
                ))}
            </Workspaces>
        </BoardsWorkSpace>
    );
};

export default BoardWorkSpace;
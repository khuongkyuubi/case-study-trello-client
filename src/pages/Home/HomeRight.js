import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import CreateBoard from '../../components/modals/CreateBoardModal/CreateBoard'
import {useDispatch, useSelector} from "react-redux";
import {getTwoBoardRecentlyOfUser} from "../../services/userService";

const Container = styled.div`
  width: 17%;
`

const DivTop = styled.div``

const Recently = styled.div`
  display: flex;
  align-items: center;
  color: #42526e;
  font-weight: 400;
  margin-top: 36px;
`

const IconRecently = styled.div`
  margin: 8px 8px;
`

const ContentRecently = styled.div``

const ProjectOld = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
  }
`

const ImageProject = styled.div`
  width: 25px;
  height: 25px;
  margin: 8px 8px;
  border-radius: 4px;
  background-color: #bd3d77;
  text-align: center;
  color: white;
`

const TitleProject = styled.span`
  font-weight: 360;
  color: black;
  font-size: 16px;
`

const DivBottom = styled.span``

const Links = styled.div`
  margin: 12px 8px;
`

const CreateBoardWrapper = styled.div``

const ButtonCreate = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 15px 8px 8px;
  border-radius: 4px;
  color: #42526e;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
  }
`

const IconCreate = styled.span`
  margin: 8px 15px 8px 8px;
  padding: 4px;
  background-color: #FAFBFC;
  border-radius: 4px;
`

const TitleCreate = styled.span``

const HomeRight = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createBoard, setCreateBoard] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const {userInfo, boardsRecently} = useSelector(state => state.user);

    const handleClick = (idBoard) => {
        navigate(`/board/${idBoard}`)
    }
    const handleModalClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        getTwoBoardRecentlyOfUser(userInfo._id, dispatch)
        document.title = "Boards | Trello Clone"
    }, [])

    return (
        <Container>
            <DivTop>
                <Recently>
                    <IconRecently><AccessTimeIcon/></IconRecently>
                    <ContentRecently>Recently viewed</ContentRecently>
                </Recently>
                    {boardsRecently?.map((board) => (
                        <ProjectOld key={board._id} onClick={()=>handleClick(board._id)}>
                            <ImageProject>{board.title[0].toUpperCase()}</ImageProject>
                            <TitleProject>{board.title}</TitleProject>
                        </ProjectOld>
                    ))}

            </DivTop>
            <Links>
                <p>Links</p>
            </Links>
            <CreateBoardWrapper onClick={() => setOpenModal(true)}>
                <ButtonCreate>
                    <IconCreate><AddIcon/></IconCreate>
                    <TitleCreate>Create a board</TitleCreate>
                </ButtonCreate>
            </CreateBoardWrapper>
            {openModal && <CreateBoard defaultTeam={userInfo.defaultTeam} callback={handleModalClose}/>}
            <DivBottom/>
        </Container>
    );
};

export default HomeRight;
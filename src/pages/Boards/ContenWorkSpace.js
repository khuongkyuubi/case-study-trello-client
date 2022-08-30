import React, {useState} from 'react';
import {IconProject} from "../Home/HomeLeft";
import {Card, Cards, NameWorkSpaceRecently} from "./MyBoards";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import CreateBoardInTeam from "../../components/modals/CreateBoardInTeamModal/CreateBoardInTeam";
import {
    ButtonMember,
    ButtonSettings,
    ContentProject,
    ContentWorkspace,
    CreateBoards,
    DivButton,
    NameProject,
    TitleNameProject
} from "./BoardsWorkSpace";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ContentWorkSpaces = ({team}) => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const {listTeamData} = useSelector(state => state.boardInTeam);
    const {boardsData} = useSelector(state => state.boards)

    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <ContentWorkspace key={team._id}>
            <TitleNameProject>
                <ContentProject>
                    <IconProject>{team.name.charAt(0).toUpperCase()}</IconProject>
                    <NameProject>{team.name}</NameProject>
                </ContentProject>

                <DivButton>
                    <ButtonMember onClick={()=>navigate(`/members/${team._id}`)}>
                        <span><PersonOutlineIcon/></span>
                        <span>Member({team.members.length})</span>
                    </ButtonMember>
                    <ButtonSettings onClick={()=>navigate(`/setting/${team._id}`)}>
                        <span><SettingsIcon/></span>
                        <span>Settings</span>
                    </ButtonSettings>
                </DivButton>
            </TitleNameProject>

            <Cards>
                {boardsData.map(boardTeam => {
                    if (boardTeam?.teams === team._id) {
                        return (
                            <Card
                                link={boardTeam.backgroundImageLink}
                                isImage={boardTeam.isImage}
                                onClick={() => navigate(`/board/${boardTeam._id}`)}
                                key={boardTeam._id}
                            >
                                <NameWorkSpaceRecently>{boardTeam.title}</NameWorkSpaceRecently>
                            </Card>
                        )
                    }
                })}

                <CreateBoards onClick={() => setOpenModal(true)}>
                    create new board
                </CreateBoards>
                {openModal && <CreateBoardInTeam idTeam={team._id} handleModalClose={handleModalClose}/>}
            </Cards>
        </ContentWorkspace>
    );
};

export default ContentWorkSpaces;
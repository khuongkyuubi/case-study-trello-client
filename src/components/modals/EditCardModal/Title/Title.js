import React, {useEffect, useState} from 'react';
import {Container, IconWrapper, RightContainer, TitleInput, Description, Link} from './styled';
import TitleIcon from '@mui/icons-material/ChromeReaderMode';
import {titleUpdate} from '../../../../services/cardService';
import {useDispatch, useSelector} from 'react-redux';
import {isMemberOfBoard} from "../../../../utils/checkMemberRoleOfBoard";

const Title = () => {
    const {userInfo}=useSelector(state =>state.user)
    const {members}=useSelector(state =>state.board)
    const isMember = isMemberOfBoard(userInfo._id,members)

    const dispatch = useDispatch();
    const card = useSelector((state) => state.card);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(card.title);
    }, [card.title]);

    const handleTitleAccept = async () => {
        await titleUpdate(card.cardId, card.listId, card.boardId, title, dispatch);
    };

    return (
        <Container>
            <IconWrapper>
                <TitleIcon fontSize='small'/>
            </IconWrapper>
            <RightContainer>
                <TitleInput
                    value={title}
                    onChange={(e) =>{
                        if(!isMember)return;
                        setTitle(e.target.value)
                    }
                }
                    onBlur={handleTitleAccept}
                />
                <Description>
                    in list <Link>{card.listTitle}</Link>
                </Description>
            </RightContainer>
        </Container>
    );
};

export default Title;

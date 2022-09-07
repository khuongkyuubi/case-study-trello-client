import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import DoneIcon from '@mui/icons-material/Done';
import {useDispatch, useSelector} from 'react-redux';
import {memberAdd, memberDelete} from '../../../../../services/cardService';
import {Avatar} from '@mui/material';
import Button from '../../ReUsableComponents/Button';
import {getUserFromEmail} from "../../../../../services/userService";
import {boardMemberAdd} from "../../../../../services/boardService";
import io from "socket.io-client";
let socket;
const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const SearchArea = styled.input`
  width: 100%;
  height: 2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding-left: 0.5rem;
  outline: none;
  background-color: rgba(0, 0, 0, 0.02);

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    border: 2px solid #0079bf;
    background-color: #fff;
  }
`;

export const Title = styled.div`
  color: #5e6c84;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MemberWrapper = styled.div`
  width: 100%;
  background-color: transparent;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  height: 2rem;
  align-items: center;
  padding: 0.5rem;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const IconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

const MemberName = styled.div``;

const MemberComponent = (props) => {
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card);
    const {members: boardMembers, teams} = useSelector((state) => state.board);
    const board = useSelector((state) => state.board);
    const {userInfo} = useSelector((state) => state.user)
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("join private", {room: props.user}, (error)=> {
            if (error) {
                alert(error);
            }
        })
    }, []);
    // check is member of this card
    const isMember = card.members.filter((a) => a.user === props.user).length ? true : false;
    // check is member of this board
    const isMemberOfBoard = !!boardMembers.filter(mem => mem.user === props.user).length;
    const handleClick = async () => {
        if (isMember) {
            await memberDelete(card.cardId, card.listId, card.boardId, props.user, props.name, dispatch);
            socket.emit("sendPrivateNotify", {sender: userInfo._id, room: props.user,  message:
                    {
                        user: userInfo.name,
                        userColor: userInfo.color,
                        action: "Remove A Member To Card",
                        member: props.name,
                        color: props.color,
                        card: card.title,
                        board: board.title,
                        date: Date.now()
                    }})
        } else {
            if (!isMemberOfBoard) {
                // add member to this board before
                const result = await getUserFromEmail(props.email, dispatch);
                if (!result) return;
                const members = [result]
                await boardMemberAdd(card.boardId,members,dispatch);
            }
            await memberAdd(card.cardId, card.listId, card.boardId, props.user, props.name, props.color, dispatch);
            socket.emit("sendPrivateNotify", {sender: userInfo._id, room: props.user,  message:
                    {
                        user: userInfo.name,
                        userColor: userInfo.color,
                        action: "Add A Member To Card",
                        member: props.name,
                        color: props.color,
                        card: card.title,
                        board: board.title,
                        date: Date.now()
                    }})
        }
        socket.emit("leave private", {room: props.user}, (error)=> {
            if (error) {
                alert(error);
            }
        })
    };
    return (
        <MemberWrapper onClick={handleClick}>
            <Avatar sx={{width: 28, height: 28, bgcolor: props.color, fontSize: '0.875rem', fontWeight: '800'}}>
                {props.name[0].toUpperCase()}
            </Avatar>
            <MemberName>{props.name}</MemberName>
            {isMember && (
                <IconWrapper>
                    <DoneIcon fontSize='1rem'/>
                </IconWrapper>
            )}
        </MemberWrapper>
    );
};
const MembersPopover = () => {
    const {members, teams} = useSelector((state) => state.board);
    const team = useSelector((state) => state.team);
    const {listTeamData} = useSelector(state => state.boardInTeam)
    const [searchMember, setSearchMember] = useState("");
    const [isShowOtherMembers, setIsShowOtherMembers] = useState(false)
    const thisTeamMember = teams.members;
    const otherTeamMember = useMemo(() => teams.members?.filter(teamMem => !members.find(mem => mem.user === teamMem.user)) , [teams, members])

    const searchThisTeamMember = useMemo(() => searchMembers(members, searchMember) , [members, searchMember]);
    const searchOtherMember = useMemo(() => searchMembers(otherTeamMember, searchMember) , [teams,otherTeamMember, searchMember]);

    const isFoundMember = searchThisTeamMember.length || searchOtherMember.length; // no member found

    const handleChange = e => {
        setSearchMember(e.target.value);
    }

    return (
        <Container>
            <SearchArea value={searchMember} onChange={handleChange} placeholder='Search member...'/>


            {isFoundMember ? (<>
            <Title>Board members</Title>
            {searchThisTeamMember.length > 0 ?
                searchThisTeamMember
                .map((member) => {
                    return <MemberComponent key={member.user} {...member} />;
                }) :
                <Button
                    style={{width: '100%', height: '3rem'}}
                    clickCallback={null}
                    title='No result!'
                />
            }

            {!isShowOtherMembers && !searchMember  && <Button
                style={{width: '100%'}}
                clickCallback={() => {
                    setIsShowOtherMembers(prev => !prev);
                }}
                title='Show other Workspace members'
            />}
            {(isShowOtherMembers || searchMember)  &&
                <>
                    <Title>Workspace members</Title>
                    {searchOtherMember?.length > 0 ?
                        searchOtherMember
                            .map((member) => {
                                return <MemberComponent key={member.user} {...member} />;
                            }) :
                        <Button
                            style={{width: '100%', height: '2.5rem'}}
                            clickCallback={null}
                            title='No result!'
                        />
                    }
                </>
            }
            </>) :  <Button
                style={{maxWidth: '100%', fontSize: '0.75rem'}}
                clickCallback={null}
                title={`Looks like that person isn't a member yet.  
                Enter their email address to add them to the card and board.`}
            />
            }
        </Container>
    );
};

export default MembersPopover;

const searchMembers = (membersList, searchKeyword) => {
    return membersList
        ?.filter(member => member.name.toLowerCase().includes(searchKeyword.toLowerCase()))
}

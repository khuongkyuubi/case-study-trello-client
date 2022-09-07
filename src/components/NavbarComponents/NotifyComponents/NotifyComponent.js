import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton, Tooltip} from "@mui/material";
import {markAsRead} from "../../../redux/Slices/userSlice";
import Avatar from "@mui/material/Avatar";
import moment from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: fit-content;
  width: 100%;
  gap: 0.75rem;
`
const Paragraph = styled.p`



`;
// For Comment
export const ActionContainer = styled.div`
  padding: 0rem 0.25rem;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: flex-start;
  transition: height 2s;
`;

export const ActionWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
export const NotifyContainer = styled.div`
  padding: 0rem 0.25rem;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
export const CommentTitle = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between !important;
  gap: 0.5rem;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  overflow-x: hidden;
  //word-break: break-all;
  word-wrap: break-word;
  flex: 8;
`;

export const Date = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  color: #5e6c84;
  flex: 4;
`;

export const CommentArea = styled.div`
  width: 100%;
  //background-color: white;
  background-color: ${props => props.backgroundColor || "white"};
  color: ${props => props.color || "inherit"};
  text-align: left;
  padding: 0.5rem;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.065);
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 0.875rem;
  font-weight: 500;
`;

function NotifyComponent({notify, index, handleClick}) {

    return <ActionContainer>
        <Tooltip title={notify.isUnread ? "Mark as read" : "Mark as un read"}>
            <IconButton size="small" onClick={handleClick.bind(this, index)}>
                <CircleIcon color={notify.isUnread ? "primary" : "disabled"} fontSize="0.5rem"/>
            </IconButton>
        </Tooltip>
        <NotifyContainer>
            <Avatar
                sx={{width: 32, height: 32, bgcolor: notify.notify.userColor, fontSize: '0.875rem', fontWeight: '800'}}>
                {notify.notify.user[0].toUpperCase()}
            </Avatar>
            <ActionWrapper>
                <CommentTitle>
                    <Text>
                        <b style={{fontSize: '0.875rem'}}>{notify.notify.user}</b> on board <b>{notify.notify.board}</b>
                    </Text>
                    <Date>{moment(notify.notify.date).fromNow()}</Date>
                </CommentTitle>
                {notify.notify.action === "Comment" &&
                    (<CommentArea backgroundColor={"#008080"} color={"white"}>Comment on card <b>{notify.notify.card}</b></CommentArea>)
                }
                {notify.notify.action === "Create A Card" &&
                    (<CommentArea backgroundColor={"#752653"} color={"white"}>Create card <b>{notify.notify.card}</b> on
                        list <b>{notify.notify.list}</b> </CommentArea>)
                }
                {notify.notify.action === "Move A Card" &&
                    (<CommentArea backgroundColor={"#666479"} color={"white"}>Move card <b>{notify.notify.card}</b> from list <b>{notify.notify.source}</b> to list <b>{notify.notify.destination}</b> </CommentArea>)
                }
                {notify.notify.action === "Add A Member To Card" &&
                    (<CommentArea backgroundColor={"#ffcc00"} color={"white"}>Add member <b>{notify.notify.member}</b> to card <b>{notify.notify.card}</b> </CommentArea>)
                }
                {notify.notify.action === "Remove A Member To Card" &&
                    (<CommentArea backgroundColor={"#e55151"} color={"white"}>Remove member <b>{notify.notify.member}</b> from card <b>{notify.notify.card}</b> </CommentArea>)
                }

            </ActionWrapper>
        </NotifyContainer>
        {/*<strong>{notify.notify.user}</strong> {notify.notify.action} board <strong>{notify.notify.board}</strong>*/}
    </ActionContainer>


}

export default NotifyComponent;
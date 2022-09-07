import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton, Tooltip} from "@mui/material";
import {markAsRead} from "../../../redux/Slices/userSlice";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import NotifyComponent from "./NotifyComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: fit-content;
  width: 100%;
  gap: 0.75rem;
  margin-bottom: 30px;
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
  align-items: flex-end;
  gap: 0.5rem;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  overflow-x: hidden;
  //word-break: break-all;
  word-wrap: break-word;
`;

export const Date = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  color: #5e6c84;
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

function NewNotify() {
    const {notifications} = useSelector((state) => state.user);
    // console.log(notifications.data)
    const dispatch = useDispatch();
    const handleClick = (index) => {
        dispatch(markAsRead({index, isUnread: false}))
    }
    return (
        <Container>
            {notifications.data.map((notify, index) => {
                    return notify.isUnread && (
                        <NotifyComponent key={index} handleClick={handleClick} index={index} notify={notify}/>)
                }
            )}
        </Container>
    );
}

export default NewNotify;
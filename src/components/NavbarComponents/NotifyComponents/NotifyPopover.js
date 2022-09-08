import React, {useEffect, useLayoutEffect, useState} from 'react';
import styled from 'styled-components';
import NewNotify from "./NewNotify";
import AllNotify from "./AllNotify";
import {useDispatch, useSelector} from "react-redux";
import {markAsRead} from "../../../redux/Slices/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: fit-content;
  width: 100%;
`
const Link = styled.div`
  display: inline;
  color: #5e6c84;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;
const LinkWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const NoUnreadContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function NotifyPopover() {
    const [showNew, setShowNew] = useState(true);
    const [isNoUnread, setIsNoUnread] = useState(true);
    const {notifications} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        setIsNoUnread(true)
        for (const notify of notifications.data) {
            if (notify.isUnread) {
                setIsNoUnread(false)
                return;
            }
        }
    }, [notifications])
    console.log(notifications)
    const handleClick = () => {
        // setIsNoUnread(true)
        notifications.data.forEach((notify, index) => {
            if (notify.isUnread) {
                dispatch(markAsRead({index, isUnread: false}))
            }
        })
    }

    return (
        <Container>
            <LinkWrapper>
                <Link onClick={setShowNew.bind(this, !showNew)}>{showNew ? "View all" : "Show Newest"}</Link>
                {showNew && <Link onClick={handleClick}>Mark all as read</Link>}
            </LinkWrapper>
            {showNew && isNoUnread && (
                <NoUnreadContainer>
                    <img src="https://a.trellocdn.com/prgb/dist/images/taco-sleep.ee2660df9335718b1a80.svg"
                         alt="No unread notifications"/>
                    <h3>No unread notifications!</h3>
                    <div>Click <Link onClick={setShowNew.bind(this, !showNew)}>{"View all"}</Link> to view all of your
                        notifications
                    </div>
                </NoUnreadContainer>
            )}
            {showNew ? <NewNotify/> : <AllNotify/>}

        </Container>
    );
}

export default NotifyPopover;
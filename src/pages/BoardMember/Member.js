import ButtonDetailMember from "./ButtonDetailMember";
import ButtonRoles from "./ButtonRoles";
import ButtonRemove from "./ButtonRemove";
import React from "react";
import {
    Account, Avatar, Detail,
    DivContainerDetailMember,
    DivHr, Edit,
    Email,
    ListFriends,
    NameAcc, Remove, Roles,
    WrapperContentRight
} from "./BoardMemberHome";
import styled from "styled-components";
import {useState} from "react";
import BasePopover from "../../components/modals/EditCardModal/ReUsableComponents/BasePopover";
import {Button} from "../../components/modals/EditCardModal/Comment/styled";
import {commentDelete} from "../../services/cardService";
import {useDispatch} from "react-redux";
import {removeMemberTeam} from "../../services/teamService";


export default function Member({member, isAdmin, idTeam}){
    const [deletePopover, setDeletePopover] = useState(null);
    const dispatch = useDispatch();
    const handleDeleteClick = async () => {
        // console.log(member, "member deleted");
        await removeMemberTeam(member?._id, idTeam, dispatch, member?.user);
    };
    const handleClickDelete = (e) => {
        setDeletePopover(e.target)
    }

    return (
        <DivContainerDetailMember >
            <WrapperContentRight>
                <ListFriends>
                    <Avatar><span>{member.name.charAt(0).toUpperCase()}</span></Avatar>
                    <NameAcc>
                        <Account>{member.name}</Account>
                        <Email>{member.email}</Email>
                    </NameAcc>
                    <Edit>
                        {/*<Detail>*/}
                        {/*    <ButtonDetailMember />*/}
                        {/*</Detail>*/}

                        <Roles>
                            <ButtonRoles role = {member.role} isAdmin = {isAdmin} idMember = {member?._id} idTeam={idTeam} memberUser={member?.user} />
                        </Roles>
                        {isAdmin && <Remove onClick={handleClickDelete}>
                            <ButtonRemove/>
                        </Remove>}
                    </Edit>
                    {deletePopover && (
                        <BasePopover
                            anchorElement={deletePopover}
                            closeCallback={() => {
                                setDeletePopover(null);
                            }}
                            title={'Remove this member!'}
                            contents={
                                <Button onClick={handleDeleteClick}>Confirm Remove</Button>
                            }
                        />
                    )}
                </ListFriends>
            </WrapperContentRight>
            <DivHr>
                <hr/>
            </DivHr>
        </DivContainerDetailMember>
    )
}
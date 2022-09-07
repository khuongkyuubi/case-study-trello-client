import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteMemberInBoard} from "../../../../services/boardService";
import {useState} from "react";
import BasePopover from "../../../modals/EditCardModal/ReUsableComponents/BasePopover";
import Button from "@mui/material/Button";
import {
    isAdminOfBoard,
    isMemberOfBoard,
    isMemberOrViewerOfBoard,
    isMemOfBoard
} from "../../../../utils/checkMemberRoleOfBoard";
import checkManyAdminOfBoard from "../../../../utils/checkManyAdminOfBoard";
import '../../../../Link.css'
import {ButtonDelete, Text} from "./styled";
import {openAlert} from "../../../../redux/Slices/alertSlice";


export default function CardDetail({member, setAnchorEl2}) {
    console.log(member,'.....')
    const [deletePopover, setDeletePopover] = useState(null);
    const {allLists} = useSelector((state) => state.list);
    const boardMembers = useSelector((state) => state.board.members);
    const {userInfo} = useSelector(state => state.user);
    const isAdminInBoard = isAdminOfBoard(userInfo._id, boardMembers)
    const isMemberOrViewerInBoard = isMemberOrViewerOfBoard(userInfo._id, boardMembers)
    const handleClickDelete = (e) => {
        setDeletePopover(e.target)
    }
    const dispatch = useDispatch();
    const {id} = useParams()
    const isMemberOrAdmin = isMemberOfBoard(userInfo._id, boardMembers);
    const handleDeleteMember = async (idBoard, idMember, memberUser) => {
        setAnchorEl2(null)
        if (isAdminInBoard) {
            await deleteMemberInBoard(idBoard, idMember, memberUser, allLists, dispatch)
        } else if (isMemberOrViewerInBoard) {
           const mem= boardMembers.filter(members=>members._id === idMember)
            if(mem[0].user===userInfo._id){
                    await deleteMemberInBoard(idBoard, idMember, memberUser, allLists, dispatch)
            }else {
                    // alert("dont enough permissions")
                dispatch(openAlert({
                    message: "You have no permissions!",
                    severity: "error",
                }))
                }
        } else {
            dispatch(openAlert({
                message: "You have no permissions!",
                severity: "error",
            }))
        }
    }

    return (
        <Card sx={{maxWidth: 350}} className="cardDetail">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="85"
                    image="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2k-de-thuong-cute.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    {/*<Typography gutterBottom variant="h5" component="div">*/}
                    {/*    Lizard*/}
                    {/*</Typography>*/}
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <div style={{display: 'flex', width: '100%'}}>
                            <div style={{width: '100%', display: 'flex'}}>
                                <Avatar

                                    alt="Remy Sharp"
                                    src={member?.avatar}
                                    sx={{
                                        width: 80, height: 80, mt: -8.5,
                                        background: member?.color,
                                    }
                                    }
                                >
                                    {member.name.charAt(0).toUpperCase()}
                                </Avatar>

                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: "column",
                                    marginTop: '-35%',
                                    marginLeft: '4.5%',
                                    color: '#ffffff'
                                }}>
                                    <div>{member.name}</div>
                                    <div>{member.email}</div>
                                </div>

                            </div>

                        </div>


                        <CardContent className='hover'>
                            {/*<Typography gutterBottom variant="body1" component="div">*/}
                            {/*    View profile*/}
                            {/*</Typography>*/}
                            <hr/>


                            {member.user===userInfo._id &&

                                <Text variant="body1" component="div"
                                            onClick={handleClickDelete}>
                                    leave board
                                </Text>
                            }
                            {member.user!==userInfo._id && isMemberOrAdmin &&

                                <Text variant="body1" component="div"
                                            onClick={handleClickDelete}>
                                    remove
                                </Text>
                            }


                            <Typography variant="body2" component="div"
                            >
                                roles: {member.role}
                            </Typography>

                        </CardContent>
                        {deletePopover && (
                            <BasePopover
                                anchorElement={deletePopover}
                                closeCallback={() => {
                                    setDeletePopover(null);
                                }}
                                title={'Delete this member!'}
                                contents={
                                    <ButtonDelete onClick={() => handleDeleteMember(id, member._id, member.user)}>Confirm
                                        Delete
                                    </ButtonDelete>
                                }
                            />
                        )}

                    </div>


                </CardContent>
            </CardActionArea>
        </Card>
    )
}





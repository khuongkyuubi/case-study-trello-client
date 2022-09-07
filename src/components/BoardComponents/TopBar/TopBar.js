import React, {useEffect, useState, useMemo} from 'react';
import * as style from './styled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as common from '../../../pages/BoardPage/CommonStyled';
import {useDispatch, useSelector} from 'react-redux';
import {boardTitleUpdate} from '../../../services/boardsService';
import RightDrawer from '../../drawers/RightDrawer/RightDrawer';
import BasePopover from '../../modals/EditCardModal/ReUsableComponents/BasePopover';
import InviteMembers from '../../modals/EditCardModal/Popovers/InviteMembers/InviteMembers';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {AvatarGroup} from "@mui/material";
import {useParams} from "react-router-dom";
import {getBoard} from "../../../services/boardsService";
import background from "../../Background";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import CardDetail from "./Popover/CardDetail";
import SearchInput from "./Popover/InputSearch";
import {FilterListOutlined} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import FilterMembers from "../../modals/EditCardModal/Popovers/Filter/FilterMembers";
import {ButtonGroup} from "./styled";
import {isMemberOfBoard} from "../../../utils/checkMemberRoleOfBoard";
import {updateFilterLabel, updateFilterMembers} from "../../../redux/Slices/boardSlice";
import FilterLabels from "../../modals/EditCardModal/Popovers/Filter/FilterLabels";
import {SearchArea} from "../../modals/EditCardModal/Popovers/Filter/styled";
import NotiFilter from "../../modals/EditCardModal/Popovers/Filter/NotiFilter/NotiFilter";


const TopBar = ({listMember}) => {
    const board = useSelector((state) => state.board);
    const [currentTitle, setCurrentTitle] = useState(board.title);
    const [showDrawer, setShowDrawer] = useState(false);
    const [invitePopover, setInvitePopover] = React.useState(null);
    const [currentMember, setCurrentMember] = useState({})
    const [listSearch, setListSearch] = useState(listMember);
    const [filterPopover, setFilterPopover] = useState(null);
    const {userInfo} = useSelector((state) => state.user);
    const {members} = useSelector((state) => state.board);
    const isMember = isMemberOfBoard(userInfo._id, members);


    const [search, setSearch] = useState("");
    // console.log(listMember, "list members")
    const {filter} = useSelector((state) => state.board);
    const isFilterMember = useMemo(() => !!Object.values(filter.members).filter(value => value).length, [filter]);
    const isFilterLabel = useMemo(() => Object.values(filter.labels).includes(true), [filter]);
    const [isSearch,setIsSearch] = useState({member:true,
    label:true
    })
    console.log(isSearch)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!board.loading)
            setCurrentTitle(board.title);
    }, [board.loading, board.title]);
    const handleTitleChange = () => {
        boardTitleUpdate(currentTitle, board.id, dispatch);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setListSearch(listMember);
        setAnchorEl(event.currentTarget);
    };
    const handleChange = e => {
        setSearch(e.target.value);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event, member) => {
        setAnchorEl2(event.currentTarget);
        setCurrentMember(member)
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    const handleResetFilter = () => {
        const members = {...filter.members}
        Object.keys(members).forEach(member => members[member] = false);
        dispatch(updateFilterMembers(members));
        // reset filter.labels
        const labels = {...filter.labels}
        Object.keys(labels).forEach(label => labels[label] = false);
        dispatch(updateFilterLabel(labels));
    }


    return (
        <style.TopBar>
            <style.LeftWrapper>
                {isMember &&
                <style.BoardNameInput
                    placeholder='Board Name'
                    value={currentTitle}
                    onChange={(e) =>{
                        setCurrentTitle(e.target.value)
                    }
                }
                    onBlur={handleTitleChange}
                />
                }
                 {!isMember &&
                <style.BoardNameInputs
                    placeholder='Board Name'
                    value={currentTitle}
                />
                }
                {/*<span style={{color: "white", fontSize: "1.25rem"}}>|</span>*/}
                <style.Span>|</style.Span>
                <AvatarGroup sx={{
                    '& .MuiAvatar-root': {width: 25, height: 25, fontSize: "0.75rem"},
                }}>
                    {listMember.map((member, index) => (
                        index < 4 && (
                            <div key={member._id}>
                                <Avatar onClick={(e) => handleClick2(e, member)}
                                        src={member?.avatar}
                                        sx={{
                                            background: member?.color,
                                            '&:hover': {
                                                backgroundColor: '#00000029'
                                            },
                                            mr: -1.3
                                        }}
                                        key={member._id}>{member.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </div>
                        )
                    ))}

                    {listMember.length > 4 &&
                        <div key={1}>
                            <Avatar
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#00000029'
                                    }
                                }}
                                onClick={handleClick}
                            >
                                +{listMember.length - 4}
                            </Avatar>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                sx={{width: 380}}
                            >


                                <Typography sx={{textAlign: "center"}}>Board members</Typography>
                                <hr/>
                                <SearchInput listMember={listMember} setListSearch={setListSearch}/>
                                <hr/>
                                <AvatarGroup max={listSearch.length < 2 ? 2 : listSearch.length}>
                                    <div style={{
                                        width: '100%', display: 'flex', alignItems: 'center',
                                        flexWrap: 'wrap'
                                        , justifyContent: 'center'
                                    }}>
                                        {listSearch.map(member => (
                                            <Avatar
                                                key={listSearch._id}
                                                src={member?.avatar}
                                                sx={{
                                                    background: member?.color,
                                                    '&:hover': {
                                                        backgroundColor: '#00000029',
                                                    },
                                                    mr: 1
                                                }}>
                                                {member.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        ))}
                                    </div>
                                </AvatarGroup>

                            </Popover>

                        </div>
                    }
                </AvatarGroup>
                <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorEl2}
                    onClose={handleClose2}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >

                    <CardDetail member={currentMember} setAnchorEl2={setAnchorEl2}/>

                </Popover>

                <style.InviteButton onClick={(event) => setInvitePopover(event.currentTarget)}>
                    <PersonAddAltIcon/>
                    <style.TextSpan> Share</style.TextSpan>
                </style.InviteButton>
                {invitePopover && (
                    <BasePopover
                        anchorElement={invitePopover}
                        closeCallback={() => {
                            setInvitePopover(null);
                        }}
                        title='Invite Members'
                        contents={<InviteMembers listMember={listMember} closeCallback={() => {
                            setInvitePopover(null);
                        }}/>}
                    />
                )}
            </style.LeftWrapper>

            <style.RightWrapper>
                <style.ButtonGroup>
                    <common.Button isFilterMember={isFilterMember}
                                   isFilterLabel={isFilterLabel}
                                   filterPopover={filterPopover}
                                   onClick={event => {
                                       setFilterPopover(event.currentTarget);
                                   }}>
                        <FilterListOutlined sx={{fontSize: '1rem'}}/>
                        <style.TextSpan>Filter</style.TextSpan>
                    </common.Button>
                    {(isFilterMember || isFilterLabel) && <style.CloseButton
                        isFilterMember={isFilterMember}
                        isFilterLabel={isFilterLabel}
                        onClick={handleResetFilter}>
                        <CloseIcon sx={{fontSize: '1rem'}}/>
                    </style.CloseButton>}
                </style.ButtonGroup>
                {filterPopover && (
                    <BasePopover
                        anchorElement={filterPopover}
                        closeCallback={() => {
                            setFilterPopover(null);
                        }}
                        contents={
                            <>
                                <SearchArea value={search} onChange={handleChange} placeholder='Enter a key word ...'/>
                                <FilterMembers closeCallback={() => {
                                    setFilterPopover(null);
                                }}
                                               checkSearchCallback={(member) => {
                                                   setIsSearch(prevState => ({...prevState,member:member}))
                                               }}
                                               search={search}
                                />
                                <FilterLabels closeCallback={() => {
                                    setFilterPopover(null);
                                }}
                                              checkSearchCallback={(label) => {
                                                  setIsSearch(prevState => ({...prevState,label:label}))
                                              }}
                                              search={search}
                                />
                                {!(isSearch.label || isSearch.member)&&<NotiFilter/>}
                            </>
                        }
                        title='Filter'
                    />
                )}
                <style.Span style={{margin: '0 5px'}}>|</style.Span>
                <common.Button onClick={() => {
                    setShowDrawer(true)
                }}>
                    <MoreHorizIcon/>
                    <style.TextSpan>Show menu</style.TextSpan>
                </common.Button>
            </style.RightWrapper>
            <RightDrawer show={showDrawer} closeCallback={() => {
                setShowDrawer(false)
            }}/>
        </style.TopBar>
    );
};

export default TopBar;

import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormGroup} from '@mui/material';
import Button from '../../ReUsableComponents/Button';
import {Container, SearchArea, Title, ButtonSpan} from "./styled";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import MemberCheckbox from "./FilterComponents/MemberCheckbox";
import {updateFilterMembers} from "../../../../../redux/Slices/boardSlice";

const FilterMembersPopover = () => {
    const {members, filter} = useSelector((state) => state.board);
    const dispatch = useDispatch();
    const [searchMember, setSearchMember] = useState("");
    const [isShowOtherMembers, setIsShowOtherMembers] = useState(false);
    const SHOW_MEMBERS_NUMBERS = 1;
    const showMember = useMemo(() => members?.filter((member, index) => index < SHOW_MEMBERS_NUMBERS), [members, members]);
    const moreMembers = useMemo(() => members?.filter((member, index) => index >= SHOW_MEMBERS_NUMBERS), [members, members]);
    const searchShowMembers = useMemo(() => searchMembers(showMember, searchMember), [members, searchMember]);
    const searchOtherMember = useMemo(() => searchMembers(moreMembers, searchMember), [members, moreMembers, searchMember]);

    const isFoundMember = !!(searchShowMembers.length || searchOtherMember.length); // no member found
    const handleChange = e => {
        setSearchMember(e.target.value);
    }

    const handleChangeCallback = (event) => {
        dispatch(updateFilterMembers({
            ...filter.members,
            [event.target.name]: event.target.checked,
        }))
    };

    console.log(filter.members, "checked list")
    const checkedLength = searchOtherMember.filter(member => filter.members[member.user]).length;
    return (
        <Container>
            <SearchArea value={searchMember} onChange={handleChange} placeholder='Search member...'/>
            {isFoundMember && (<>
                <Title>Members</Title>
                <Box sx={{display: 'flex'}}>
                    <FormControl sx={{m: 1}} component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={filter.members.noMembers} onChange={handleChangeCallback}
                                              name={"noMembers"}/>
                                }
                                label={"No members"}
                            />
                            {searchShowMembers.length > 0 &&
                                searchShowMembers
                                    .map((member) => {
                                        return <MemberCheckbox key={member.user} {...member}
                                                               onChangeCallback={handleChangeCallback}
                                                               checkedList={filter.members}
                                        />;
                                    })
                            }
                            {!isShowOtherMembers && !!searchOtherMember.length  && !searchMember &&
                                <Button
                                    style={{width: '100%'}}
                                    clickCallback={() => {
                                        setIsShowOtherMembers(prev => !prev);
                                    }}
                                    title={
                                        <ButtonSpan>
                                            Show all members {checkedLength ? `(${checkedLength} selected)` : ""}
                                        </ButtonSpan>
                                    }
                                />}
                            {(isShowOtherMembers || searchMember) &&
                                <>
                                    {searchOtherMember?.length > 0 &&
                                        searchOtherMember
                                            .map((member) => {
                                                return <MemberCheckbox key={member.user} {...member}
                                                                       onChangeCallback={handleChangeCallback}
                                                                       checkedList={filter.members}
                                                />;
                                            })
                                    }
                                </>
                            }
                        </FormGroup>
                    </FormControl>
                </Box>
            </>)
            }
        </Container>
    );
};

export default FilterMembersPopover;

const searchMembers = (membersList, searchKeyword) => {
    return membersList
        ?.filter(member => member.name.toLowerCase().includes(searchKeyword.toLowerCase()))
}

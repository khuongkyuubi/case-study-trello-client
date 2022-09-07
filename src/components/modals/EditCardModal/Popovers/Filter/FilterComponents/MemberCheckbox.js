import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Avatar} from "@mui/material";
import {MemberName, MemberWrapper} from "../styled";

export default function MemberCheckbox(props) {
    return (
        <FormControlLabel
            control={
                <Checkbox checked={props.checkedList[props.user]} onChange={props.onChangeCallback} name={props.user}/>
            }
            label={<MemberWrap {...props}/>}
        />
    )
}

const MemberWrap = (props) => {
    return (
        <MemberWrapper>
            <Avatar sx={{width: 28, height: 28, bgcolor: props.color, fontSize: '0.875rem', fontWeight: '800'}}>
                {props.name[0].toUpperCase()}
            </Avatar>
            <MemberName>{props.name}</MemberName>
        </MemberWrapper>
    )
}

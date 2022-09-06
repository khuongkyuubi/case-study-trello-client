import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {LabelName, LabelWrapper} from "../styled";

// export default function LabelCheckbox(props){
//     return(
//         <FormControlLabel
//             control={
//                 <Checkbox checked={props.checkedList[props._id]} onChange={props.onChangeCallback} name={props.user}/>
//             }
//             label={<LabelWrap {...props}/>}
//         />
//     )
// }
const LabelWrap = ({props}) => {
    return (
        <LabelWrapper bg={props}>
        <LabelName>{props.text}</LabelName>
        </LabelWrapper>
    )
}
export default LabelWrap
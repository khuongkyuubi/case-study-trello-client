import {ButtonSpan, Container, Title} from "./styled";
import {useDispatch, useSelector} from "react-redux";
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";
import {updateFilterLabel} from "../../../../../redux/Slices/boardSlice"
import LabelWrap from "./FilterComponents/LabelCheckbox";
import {useEffect, useMemo, useState} from "react";
import Button from "../../ReUsableComponents/Button";

const FilterLabels = ({search,checkSearchCallback}) => {
    const {labels, filter} = useSelector((state) => state.board)
    const SHOW_LABELS_NUMBERS = 1;
    const [showMoreLabel, setShowMoreLabels] = useState(false)
    const showLabel = useMemo(() => labels?.filter((label, index) => index < SHOW_LABELS_NUMBERS), [labels]);
    const moreLabels = useMemo(() => labels?.filter((label, index) => index >= SHOW_LABELS_NUMBERS), [labels]);
    const searchShowLabel = useMemo(() => searchLabels(showLabel, search), [labels, search]);
    const searchOtherLabel = useMemo(() => searchLabels(moreLabels, search), [labels, moreLabels, search]);
    const isFoundLabel = !!(searchShowLabel.length || searchOtherLabel.length); // no label found
    const dispatch = useDispatch();
    const labelChecked = useMemo(() => Object.values(filter.labels).filter(label => label === true).length, [labels])
    useEffect(()=>{
        const sendStatus = ()=>{checkSearchCallback(isFoundLabel)}
        sendStatus()
    },[isFoundLabel])

    const handleChangeCallback = (e) => {
        dispatch(updateFilterLabel({
            ...filter.labels,
            [e.target.name]: e.target.checked
        }))
    }
    return (
        <Container>
            {isFoundLabel &&
                <>
                    <Title>Labels</Title>
                    <Box>
                        <FormControl sx={{m: 1}} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={filter.labels.noLabels} onChange={handleChangeCallback}
                                                       name={"noLabels"}/>}
                                    label={"No labels"}
                                />
                                {
                                    searchShowLabel.length>0&&searchShowLabel.map((label, index) =>
                                        <FormControlLabel
                                            key={index}
                                            control={<Checkbox checked={filter.labels[label._id]}
                                                               onChange={handleChangeCallback}
                                                               name={label._id}/>}
                                            label={<LabelWrap props={label}/>}
                                        />
                                    )
                                }
                                {!showMoreLabel &&!!searchOtherLabel&&!search&&<Button
                                    style={{width: '100%'}}
                                    clickCallback={() => {
                                        setShowMoreLabels(prev => !prev);
                                    }}
                                    title={
                                        <ButtonSpan>
                                            Show all labels{labelChecked ? ` (${labelChecked} selected)` : ''}
                                        </ButtonSpan>
                                    }
                                />}
                                {(showMoreLabel||search) && searchOtherLabel.map((label, index) =>
                                    <FormControlLabel
                                        key={index}
                                        control={<Checkbox checked={filter.labels[label._id]}
                                                           onChange={handleChangeCallback}
                                                           name={label._id}/>}
                                        label={<LabelWrap props={label}/>}
                                    />
                                )}
                            </FormGroup>
                        </FormControl>
                    </Box>
                </>}
        </Container>
    )
}
export default FilterLabels
const searchLabels = (labelsList, searchKeyword) => {
    return labelsList?.filter(label => label.text.toLowerCase().includes(searchKeyword.toLowerCase()))
}
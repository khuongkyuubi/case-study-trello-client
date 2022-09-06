import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';

import {
    reset,
    setPending,
    updateTitle,
    setCard,
    updateLabel,
    updateLabelSelection, createLabel, updateCreatedLabelId,
    addComment,
    deleteComment,
    updateComment,
    deleteLabel,
    updateSetAttachments,
    addMember,
    deleteMember,
    deleteAttachment,
    updateAttachments,
} from '../redux/Slices/cardSlice';
import {
    createLabelBoard, deleteLabelBoard,deleteFilterLabel,

    updateBoardLabel, updateCreatedLabelIdBoard, updateFilterLabel
} from '../redux/Slices/boardSlice';

import {
    createLabelForCard,
    deleteLabelOfCard,
    setCardTitle,
    successCreatingList,
    successFetchingLists,
    updateLabelOfCard,
    updateLabelSelectionOfCard,
    createCommentsForCard,
    deleteCommentsForCard,
    deleteMemberOfCard,
    updateMemberOfCard,
    addAttachmentForCard,
    deleteAttachmentOfCard,

} from '../redux/Slices/listSlice';
import {getLists} from "./boardService";
import initLabelsFilter from "../utils/initLabelFilter";


const baseUrl = process.env.REACT_APP_API_ENDPOINT + '/card';
const listURl = process.env.REACT_APP_API_ENDPOINT + '/list';
let submitCall = Promise.resolve();

export const getCard = async (cardId, listId, boardId, dispatch, boardLabels) => {
    dispatch(setPending(true));
    try {
        // let response = '';
        // submitCall = submitCall.then(() =>
        //     axios.get(baseUrl + '/' + boardId + '/' + listId + '/' + cardId).then((res) => {
        //         response = res;
        //     })
        // );
        // await submitCall;

        const response = await axios.get(baseUrl + '/' + boardId + '/' + listId + '/' + cardId);
        const card = await JSON.parse(JSON.stringify(response.data));
        // b1 lay label cua card
        // b2 so sanh labl card voi lbael board
        // neu chua co , thi push
        // neu da co, lay ten cua label board gan vao ten cua label card

        for (let i = 0; i < boardLabels.length; i++) {
            let flag = false;
            for (let j = 0; j < card.labels.length; j++) {
                if (card.labels[j]._id.toString() === boardLabels[i]._id.toString()) {
                    card.labels[j].text = boardLabels[i].text;
                    card.labels[j].color = boardLabels[i].color;
                    flag = true;
                    break;
                }
            }
            if (flag === false) {
                card.labels.push(boardLabels[i]);
            }
        }

        for (let i = 0; i < card.labels.length; i++) {
            let flag= false;
            for (let j = 0; j < boardLabels.length; j++) {
                if(card.labels[i]._id.toString() === boardLabels[j]._id.toString()) {
                    flag = true;
                    break;
                }
            }
            if(flag === false){
                card.labels.splice(i,1);
            }
        }

        await axios.put(baseUrl + '/' + boardId + '/' + listId + '/' + cardId, {labels: card.labels});
        const res = await axios.get(listURl + '/' + boardId);
        dispatch(successFetchingLists(res.data));
        dispatch(setCard(card));
        dispatch(setPending(false));
    } catch (error) {
        dispatch(setPending(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const titleUpdate = async (cardId, listId, boardId, title, dispatch) => {
    try {
        dispatch(setCardTitle({listId, cardId, title}));
        dispatch(updateTitle(title));


        await axios.put(baseUrl + '/' + boardId + '/' + listId + '/' + cardId, {title: title})

    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const labelUpdate = async (cardId, listId, boardId, labelId, label, dispatch) => {
    try {
        dispatch(updateLabel({labelId: labelId, text: label.text, color: label.color, backColor: label.backColor}));

        dispatch(updateBoardLabel({
            labelId: labelId,
            text: label.text,
            color: label.color,
            backColor: label.backColor
        }));
        dispatch(
            updateLabelOfCard({
                listId,
                cardId,
                labelId: labelId,
                text: label.text,
                color: label.color,
                backColor: label.backColor,
            })
        );

        submitCall = submitCall.then(() =>
            axios.put(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/' + labelId + '/update-label', label)
        );
        await submitCall;


    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const labelUpdateSelection = async (cardId, listId, boardId, labelId, selected, dispatch) => {
    try {
        dispatch(updateLabelSelection({labelId: labelId, selected: selected}));
        dispatch(updateLabelSelectionOfCard({listId, cardId, labelId, selected}));
        submitCall = submitCall.then(() =>
            axios.put(
                baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/' + labelId + '/update-label-selection',
                {selected: selected}
            )
        );
        await submitCall;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const labelCreate = async (cardId, listId, boardId, text, color, backColor, dispatch) => {
    try {
        dispatch(createLabel({_id: 'notUpdated', text, color, backColor, selected: true}));
        dispatch(createLabelBoard({_id: 'notUpdated', text, color, backColor, selected: false}));

        let response = '';
        submitCall = submitCall.then(() =>
            axios
                .post(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/create-label', {
                    text,
                    color,
                    backColor,
                })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(updateCreatedLabelId(response.data.labelId));
        dispatch(updateCreatedLabelIdBoard(response.data.labelId));
        dispatch(updateFilterLabel(initLabelsFilter(response.data.card.labels)))
        dispatch(
            createLabelForCard({listId, cardId, _id: response.data.labelId, text, color, backColor, selected: true})
        );

    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const labelDelete = async (cardId, listId, boardId, labelId, dispatch) => {
    try {
        dispatch(deleteLabel(labelId));
        dispatch(deleteLabelBoard(labelId));
        dispatch(deleteLabelOfCard({ listId, cardId, labelId }));
        dispatch(deleteFilterLabel(labelId))
        submitCall = submitCall.then(() =>
            axios.delete(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/' + labelId + '/delete-label')
        );
        await submitCall;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const comment = async (cardId, listId, boardId, text, userName, dispatch) => {
    try {
        // dispatch(setPending(true));
        let response = '';
        submitCall = submitCall.then(() =>
            axios
                .post(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/add-comment', {
                    text: text,
                })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(addComment(response.data)); // addComment to cardSlice
        dispatch(createCommentsForCard({listId, cardId, data: response.data})); // addComments to List (to rerender on card outside modal)
        // dispatch(setPending(false));
    } catch (error) {
        dispatch(setPending(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};


export const commentDelete = async (cardId, listId, boardId, commentId, dispatch) => {
    try {
        dispatch(deleteComment(commentId));

        const response = await axios.delete(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/' + commentId)
        // distpacth to remove coment with list
        dispatch(deleteCommentsForCard({listId, cardId, commentId}))
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const commentUpdate = async (cardId, listId, boardId, text, commentId, dispatch) => {
    try {
        dispatch(updateComment(commentId, text));
        await axios.put(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/' + commentId, {
            text: text,
        });
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};
export const attachmentAdd = async (cardId, listId, boardId,link, linkName, dispatch) => {
    try{
     let res =   await axios.post(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/add-attachment',{link,linkName})
        dispatch(updateSetAttachments(res.data))
        dispatch(
            addAttachmentForCard({
                listId,
                cardId,
                // link: link,
                // name: linkName,
                // _id: res.data.attachmentId,
                // date: Date(),
                attachments: res.data.attachments,
            })
        );
        dispatch(openAlert(
            {
                message: 'Success',
                severity: 'success'
            }
        ))
    }catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const attachmentAddFile = async (cardId, listId, file, dispatch) => {
    try {
        let res = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/uploads/cards/'+cardId,  file)
        dispatch(updateSetAttachments(res.data))
        dispatch(
            addAttachmentForCard({
                listId,
                cardId,
                // link: link,
                // name: linkName,
                // _id: res.data.attachmentId,
                // date: Date(),
                attachments: res.data.attachments,
            })
        );
        dispatch(openAlert(
            {
                message: 'Success',
                severity: 'success'
            }
        ))
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        )
    }
}

export const memberAdd = async (cardId, listId, boardId, memberId, memberName, memberColor, dispatch) => {
    try {
        dispatch(addMember({ memberId, memberName, memberColor }));
        dispatch(updateMemberOfCard({ listId, cardId, memberId, memberName, memberColor }));

        submitCall = submitCall.then(() =>
            axios.post(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/add-member', {
                memberId: memberId,
            })
        );
        await submitCall;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const memberDelete = async (cardId, listId, boardId, memberId, memberName, dispatch) => {
    try {
        dispatch(deleteMember({ memberId }));
        dispatch(deleteMemberOfCard({ listId, cardId, memberId }));

        submitCall = submitCall.then(() =>
            axios.delete(baseUrl + '/' + boardId + '/' + listId + '/' + cardId + '/' + memberId + '/delete-member')
        );
        await submitCall;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
}
export const attachmentDelete = async(cardId,listId,boardId,attachmentId,dispatch) =>{
    try{
    let res = await axios.delete(baseUrl + '/attachment/' + boardId + '/' + listId + '/' + cardId+'/'+attachmentId)
        dispatch(deleteAttachment(res.data))
        dispatch(
            deleteAttachmentOfCard({
                listId,
                cardId,
                // link: link,
                // name: linkName,
                // _id: res.data.attachmentId,
                // date: Date(),
                attachments: res.data.card.attachments,
            })
        );
        dispatch(openAlert(
            {
                message: 'Success',
                severity: 'success',
            }
        ))
    }catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        )
    }
};
export const attachmentUpdate = async(cardId,listId,boardId,attachmentId,link,linkName,check,dispatch)=>{
    try{
        if(linkName === undefined||linkName === null||linkName ===''){
            linkName = link
        }
    let res = await axios.put(baseUrl + '/attachment/' + boardId + '/' + listId + '/' + cardId + '/' + attachmentId,{link,linkName,check});
        // console.log(res.data)
        dispatch(updateAttachments(res.data))
        dispatch(openAlert(
            {
                message: 'Success',
                severity: 'success',
            }
        ))
    }catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        )
    }
}


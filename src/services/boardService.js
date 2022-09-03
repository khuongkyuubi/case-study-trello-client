import axios from 'axios';
import {
    deleteMemberOfCard,
    removeAList,
    setLoading,
    successCreatingList,
    successDeletingList,
    successFetchingLists,
    updateListTitle,
} from '../redux/Slices/listSlice';
import {openAlert} from '../redux/Slices/alertSlice';
import {
    addMembers, changeIsExpanded, deleteFilterMember, deleteMember,
    setActivityLoading,
    updateActivity,
    updateBackground,
    updateDescription,
    updateFilterMembers
} from '../redux/Slices/boardSlice';
import board from "../pages/BoardPage/Board";
import initMembersFilter from "../utils/initMembersFilter";

const listRoute = process.env.REACT_APP_API_ENDPOINT + '/list';
const boardRoute = process.env.REACT_APP_API_ENDPOINT + '/board';

export const getLists = async (boardId, dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.get(listRoute + '/' + boardId);
        dispatch(successFetchingLists(res.data));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 300);
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const activityUpdate = async (boardId, dispatch) => {
    dispatch(setActivityLoading(true));
    try {
        const res = await axios.get(boardRoute + '/' + boardId + '/activity');
        dispatch(updateActivity(res.data));
        dispatch(setActivityLoading(false));
    } catch (error) {
        dispatch(setActivityLoading(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const createList = async (title, boardId, dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.post(listRoute + '/create', {title: title, boardId: boardId});
        dispatch(successCreatingList(res.data));
        dispatch(setLoading(false));
        dispatch(openAlert({
                message: "Add column successfully!",
                severity: 'success',
                duration: 1000
            })
        );
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const DeleteList = async (listId, boardId, dispatch) => {
    // dispatch(setLoading(true));
    try {
        await dispatch(successDeletingList(listId));
        await axios.delete(listRoute + '/' + boardId + '/' + listId);
        // dispatch(setLoading(false));
        dispatch(openAlert({
                message: "Remove column successfully!",
                severity: 'success',
                duration: 1000
            })
        );
    } catch (error) {
        // dispatch(setLoading(false));
        dispatch(setLoading(true));
        const duration = 2000;
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
                duration: duration
            })
        );
        setTimeout(() => {
            getLists(boardId, dispatch);
        }, duration)
    }
};

export const listTitleUpdate = async (listId, boardId, title, dispatch) => {
    try {
        await dispatch(updateListTitle({listId: listId, title: title}));
        await axios.put(listRoute + '/' + boardId + '/' + listId + '/update-title', {title: title});
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

export const boardDescriptionUpdate = async (boardId, description, dispatch) => {
    try {
        await dispatch(updateDescription(description));
        await axios.put(`${boardRoute}/${boardId}/update-board-description`, {
            description
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

export const boardBackgroundUpdate = async (boardId, background, isImage, dispatch) => {
    try {
        await dispatch(updateBackground({background, isImage}));
        await axios.put(`${boardRoute}/${boardId}/update-background`, {
            background,
            isImage,
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

export const boardMemberAdd = async (boardId, members, dispatch) => {
    try {

        const result = await axios.post(`${boardRoute}/${boardId}/add-member`, {
            members
        });

        await dispatch(addMembers(result.data));
        dispatch(updateFilterMembers(initMembersFilter(result.data)));
        dispatch(
            openAlert({
                message: 'Members are added to this board successfully',
                severity: 'success',
            })
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

export const updateIsExpandedLabels = async (boardId, dispatch) => {

    try {
        dispatch(changeIsExpanded());
        await axios.put(`${boardRoute}/${boardId}/update-expanded-labels`);
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }


}
export const deleteMemberInBoard = async (boardId,idMember, memberUser, allLists, dispatch) => {

    try {
      const res=  await axios.put(`${boardRoute}/${boardId}/delete-member`,
            {
                idMember,
                boardId,
                memberUser
            }
            );

        await dispatch(deleteMember({idMember}))
        dispatch(deleteFilterMember(memberUser))

        allLists.map(list => {
            list.cards.map(card => {
                dispatch(deleteMemberOfCard({ listId : list._id, cardId : card._id , memberId : memberUser }));
            })
        })
        dispatch(
            openAlert({
                message: res.data.message,
                severity: 'success',
            })
        );

    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }


}

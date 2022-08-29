import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';

import {
    reset,
    setPending,
    updateTitle,
    setCard
} from '../redux/Slices/cardSlice';

import {
    setCardTitle,
} from '../redux/Slices/listSlice';


const baseUrl = process.env.REACT_APP_API_ENDPOINT + '/card';
let submitCall = Promise.resolve();

export const getCard = async (cardId, listId, boardId, dispatch) => {
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

        // submitCall = submitCall.then(() =>
        await axios.put(baseUrl + '/' + boardId + '/' + listId + '/' + cardId, {title: title})
        // );
        // await submitCall;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

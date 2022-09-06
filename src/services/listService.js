import axios from 'axios';
import { openAlert } from '../redux/Slices/alertSlice';
import {setLoading, successCreatingCard, successDeletingCard} from '../redux/Slices/listSlice';

const baseUrl = process.env.REACT_APP_API_ENDPOINT +'/card';

export const createCard = async (title, listId, boardId, dispatch) => {
    // dispatch(setLoading(true));
    try {
        const updatedList = await axios.post(baseUrl + '/create', { title: title, listId: listId, boardId: boardId });
        console.log("new list",updatedList.data)
        dispatch(successCreatingCard({ listId: listId, updatedList: updatedList.data }));
        // dispatch(setLoading(false));
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

export const deleteCard = async( boardId, listId, cardId, dispatch)=>{
    dispatch(setLoading(true));
    try{
        const updatedList = await axios.delete(baseUrl + `/delete-card`,{data:{boardId, listId, cardId}})
        dispatch(setLoading(false));
        dispatch(successDeletingCard({listId,cardId, updatedList: updatedList.data}))
    }catch(error){
        dispatch(setLoading(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
}

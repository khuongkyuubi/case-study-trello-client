import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import LoadingScreen from '../../components/LoadingScreeen';
import {useParams} from "react-router-dom";
import {getBoard} from "../../services/boardsService";

const Board = (props) => {
    const {id: boardId} = useParams();
    const dispatch = useDispatch();
    const {backgroundImageLink, isImage, loading, title} = useSelector((state) => state.board);
    const {allLists, loadingListService} = useSelector((state) => state.list);
    const [searchString, setSearchString] = useState("");
    //const boardId = props.match.params.id;
    useEffect(()=> {
        getBoard(boardId, dispatch);

    }, [boardId, dispatch]);

    useEffect(()=> {
        document.title = title + ' | Trello'
    }, [title])

    return (
        <div>

        </div>
    )



}

export default Board;
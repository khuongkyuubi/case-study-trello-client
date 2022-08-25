import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as style from './Styled';

import {DragDropContext, Droppable} from "react-beautiful-dnd";
import LoadingScreen from '../../components/LoadingScreeen';
import {useParams} from "react-router-dom";
import {getBoard} from "../../services/boardsService";
import {getLists} from "../../services/boardService";
import Navbar from "../../components/Navbar2";
import TopBar from "../../components/BoardComponents/TopBar/TopBar"; // please fix
import List from "../../components/BoardComponents/List/List";
import AddList from "../../components/BoardComponents/AddList/AddList";
import {updateCardOrder, updateListOrder} from "../../services/dragAndDropService";

const Board = (props) => {
    const {id: boardId} = useParams();
    const dispatch = useDispatch();
    const {backgroundImageLink, isImage, loading, title} = useSelector((state) => state.board);
    const {allLists, loadingListService} = useSelector((state) => state.list);
    const [searchString, setSearchString] = useState("");

    //const boardId = props.match.params.id;
    useEffect(() => {
        getBoard(boardId, dispatch)
        getLists(boardId, dispatch);

    }, [boardId, dispatch]);

    useEffect(() => {
        document.title = title + ' | Trello'
    }, [title])


    const onDragEnd = async (result) => {
        const {draggableId, source, destination} = result;
        if (!destination) return;
        if (result.type === 'column') {
            if (source.index === destination.index) return;
            try {
                await updateListOrder(
                    {
                        sourceIndex: source.index,
                        destinationIndex: destination.index,
                        listId: draggableId,
                        boardId: boardId,
                        allLists: allLists,
                    },
                    dispatch
                );
            } catch (e) {
                console.log(e.message);
            }
            return;
        }
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        try {
            await updateCardOrder(
                {
                    sourceId: source.droppableId,
                    destinationId: destination.droppableId,
                    sourceIndex: source.index,
                    destinationIndex: destination.index,
                    cardId: draggableId,
                    boardId: boardId,
                    allLists: allLists,
                },
                dispatch
            );
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <>
            <Navbar searchString={searchString} setSearchString={setSearchString}/>
            <style.Container
                isImage={isImage}
                bgImage={isImage ? backgroundImageLink.split('?')[0] : backgroundImageLink}
            >
                <TopBar/>
                {(loading || loadingListService) && <LoadingScreen/>}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                        {(provided, snapshot) => {
                            return (
                                <style.ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                                    {!loading &&
                                        allLists.map((list, index) => {
                                            return (
                                                <List
                                                    searchString={searchString}
                                                    key={list._id}
                                                    index={index}
                                                    info={list}
                                                    boardId={boardId}
                                                />
                                            );
                                        })}
                                    {provided.placeholder}
                                    <AddList boardId={boardId}/>
                                </style.ListContainer>
                            );
                        }}
                    </Droppable>
                </DragDropContext>

            </style.Container>

        </>
    )


}

export default Board;
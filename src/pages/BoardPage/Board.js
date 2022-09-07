import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as style from './Styled';

import {DragDropContext, Droppable} from "react-beautiful-dnd";
import LoadingScreen from '../../components/LoadingScreen';
import {useNavigate, useParams} from "react-router-dom";
import {getBoard} from "../../services/boardsService";
import {getLists} from "../../services/boardService";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/BoardComponents/TopBar/TopBar"; // please fix
import List from "../../components/BoardComponents/List/List";
import AddList from "../../components/BoardComponents/AddList/AddList";
import {updateCardOrder, updateListOrder} from "../../services/dragAndDropService";
import {getCard} from "../../services/cardService";
import {isMemberOfBoard} from "../../utils/checkMemberRoleOfBoard";
import checkBoardVisibility from "../../utils/checkBoardVisibility";
import {memRoles} from "../../utils/roles";
import io from "socket.io-client";
let socket;
const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

const Board = (props) => {
    const navigate = useNavigate()
    const {id: boardId} = useParams();
    const dispatch = useDispatch();
    const {
        backgroundImageLink,
        isImage,
        loading,
        title,
        members,
        labels,
        visibility,
        teams : boardTeams,

    } = useSelector((state) => state.board);
    const {allLists, loadingListService} = useSelector((state) => state.list);
    const [searchString, setSearchString] = useState("");
    const {userInfo, boards, teams} = useSelector((state) => state.user);

    const board = boards.filter(board => board._id.toString() === boardId.toString())
    const isMember = isMemberOfBoard(userInfo._id, members);
    const [isAccessBoard , setIsAccessBoard] = useState(false)
    const boardData = useSelector((state) => state.board);


    // console.log(userInfo._id,'11111',
    //     visibility,'222222',
    //     board[0]?.members,'33333',
    //     team[0]?.members,'444444')
    //
    // console.log(loadingListService, loading)

    // console.log(members, "member of board")

    useEffect(() => {
        if((!loading && !loadingListService)) {
            const result = checkBoardVisibility(userInfo._id, visibility, members, boardTeams.members);
            result ? setIsAccessBoard(true) : navigate("/");
            // console.log(result)
            // if(!result) navigate("/")
        }
    })



    useEffect(() => {
        getBoard(boardId, dispatch);
        getLists(boardId, dispatch);
        //   if(!result){
        //     navigate('/home')
        // }
    }, [boardId, dispatch]);

    useEffect(() => {
        document.title = title + ' | Trello'
    }, [title])

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("join", {rooms: userInfo.boards}, (error) => {
            if (error) {
                alert(error);
            }
        });

    }, []);

    // console.log(allLists, "all list")
    const onDragEnd = async (result) => {
        const {draggableId, source, destination} = result;
        if (!destination) return;
        if (!isMember && source.droppableId !== destination.droppableId) return;
        if(destination.droppableId !== source.droppableId) {
            const {title: sourceTitle} = allLists.find(list => list._id === source.droppableId )
            const {title: destinationTitle} = allLists.find(list => list._id === destination.droppableId )
            let cardTitle = "";
            for (const list of allLists ) {
                const card = list.cards.find(card => card._id === draggableId)

                if(card) {
                    cardTitle = card.title;
                    break;
                }
            }
            // console.log({sourceTitle, destinationTitle, cardTitle})
            // const {title: sourceTitle} = allLists.find(list => list._id === source.droppableId )
            socket.emit("sendNotify", {sender: userInfo._id, room: boardData.id,  message:
                    {
                        user: userInfo.name,
                        userColor: userInfo.color,
                        action: "Move A Card",
                        source: sourceTitle,
                        destination: destinationTitle,
                        card: cardTitle,
                        board: boardData.title,
                        date: Date.now()
                    }})
        }
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
            <Navbar searchString={searchString} isTranslucent={true} setSearchString={setSearchString}/>

            {(!loading && !loadingListService && isAccessBoard)
            ?
            <style.Container
                isImage={isImage}
                bgImage={isImage ? backgroundImageLink.split('?')[0] : backgroundImageLink}
            >

                <TopBar listMember={members}/>

                {/*{(loading || loadingListService) && <LoadingScreen/>}*/}
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
                :
                <LoadingScreen/>
            }

        </>

    )


}

export default Board;
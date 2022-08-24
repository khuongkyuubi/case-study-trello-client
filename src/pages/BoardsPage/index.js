import Navbar from "../../components/Navbar";
import {useEffect, useState} from "react";
import { Container, Wrapper, Title, Board, AddBoard } from "./styled";
import {useDispatch, useSelector} from "react-redux";
import CreateBoard from "../../components/modals/modalCreateBoard/CreateBoard";
import LoadingScreen from "../../components/LoadingScreeen";
// import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";
import {getBoards} from "../../services/boardsService";



export default function BoardsPage(){
    const colors = ['red', "blue", 'green', 'yellow'];
    const dispatch = useDispatch();
    const [backgroundColor, setBackgroundColor] = useState(colors[0]);
    const [searchString, setSearchString] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const { pending, boardsData } = useSelector((state) => state.boards);

    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/board/${e.target.id}`)
    }
    const handleModalClose = () => {
        setOpenModal(false);
    };

    useEffect(  () => {
          getBoards(false,dispatch);
    }, [dispatch]);

    useEffect(() => {
        document.title = "Boards | Trello Clone"
    }, [])


    return (
        <>
            {pending && <LoadingScreen />}
            <Container>
                <Navbar searchString={searchString} setSearchString={setSearchString} />
                <Wrapper>
                    <Title>Your Boards</Title>
                    {!pending &&
                        boardsData.length>0 &&
                        boardsData.filter(item=>searchString?item.title.toLowerCase().includes(searchString.toLowerCase()):true).map((item, index) => {
                            return (
                                <Board key={index} link={item.backgroundImageLink} isImage={item.isImage} id={item._id} onClick={(e)=>handleClick(e)}>
                                    {item.title}
                                </Board>
                            );
                        })}
                    {!pending && (
                        <AddBoard onClick={() => setOpenModal(true)}>
                            Create new board
                        </AddBoard>
                    )}
                    {openModal && <CreateBoard callback={handleModalClose} />}
                </Wrapper>
            </Container>
        </>
    )
}
import React, {useEffect} from 'react';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "styled-components";
import {getBoards} from "../../services/boardsService";
import {useDispatch, useSelector} from "react-redux";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useNavigate} from "react-router-dom";

const BoardsRecently = styled.div`
  width: 100%;
  height: 100%;
`

const Recently = styled.div`
  width: 100%;
  height: 100%;
`

const Tittle = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  margin: 5px 5px;
`

const IconTitle = styled.div`
  margin: 0 7px;
  color: #42526e;

`

const NameTitle = styled.div`
  font-size: 17px;
  font-weight: bold;
`

export const Cards = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;

`

export const Card = styled.div`
  width: 22%;
  height: 80px;
  //background-color: #4097a2;

  ${(props) =>
          props.isImage ? 'background-image: url(' + props.link + ');' : 'background-color: ' + props.link + ';'}
  color: #f5eded;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 7px 10px;
  border-radius: 5px;
  background-size: cover;

  &:hover {
    color: red;
    cursor: pointer;
    border-radius: 5px;
  }
`


export const NameWorkSpaceRecently = styled.div`
  margin: 7px 15px;
  font-size: 18px;
  font-weight: bold;
`

export const IconWorkSpaceRecently = styled.div`

`

const BoardRecently = () => {
    const dispatch = useDispatch();
   const navigate =useNavigate()
    const {pending, boardsData} = useSelector((state) => state.boards);

    console.log(boardsData)
    useEffect(() => {
        getBoards(false, dispatch);
    }, [dispatch]);

    return (
        <BoardsRecently>
            <Recently>
                <Tittle>
                    <IconTitle><PermIdentityIcon/></IconTitle>
                    <NameTitle>My boards</NameTitle>
                </Tittle>
                <Cards>
                    {boardsData?.map(board => (
                        <Card link={board.backgroundImageLink} isImage={board.isImage} onClick={()=>navigate(`/board/${board._id}`)}>
                            <NameWorkSpaceRecently>
                                {board.title}
                            </NameWorkSpaceRecently>
                            {/*<IconWorkSpaceRecently>o</IconWorkSpaceRecently>*/}
                        </Card>
                    ))}
                </Cards>


            </Recently>
        </BoardsRecently>

    );
};

export default BoardRecently;
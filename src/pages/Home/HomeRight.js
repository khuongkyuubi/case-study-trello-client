import React, {useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';


const Container = styled.div`
  width: 17%;
  margin-left: 20px;
`

const DivTop = styled.div`

`


const Recently = styled.div`
  display: flex;
  align-items: center;
  color: #42526e;
  font-weight: 400;
  margin-top: 36px;

`

const IconRecently = styled.div`
  margin: 8px 8px;

`

const ContentRecently = styled.div`

`

const ProjectOld = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;

  }


`

const ImageProject = styled.img`
  width: 30px;
  height: 30px;
  margin: 8px 8px;
  border-radius: 4px;
`

const WrapperTitle = styled.div`
  display: flex;
  flex-direction: column;

`


const TitleProject = styled.span`
  font-weight: bold;
  color: black;
  font-size: 17px;
`

const TitleWS = styled.span`
  color: #42526e;
`


const DivBottom = styled.span`

`

const ContainerCreateBoard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top:40px;
`

const WrapperCreateBoard = styled.div`
  height: 640px;
  width: 300px;
  margin-top: 5px;
  background-color:#ffffff;
  display: flex;
  gap: 20px;
  position: relative;
  border-radius: 3px;
  flex-direction: column;


`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold
`

const TitleBoard = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 7px;
  color: #a3abb9;
  font-size:14px;
  font-weight: bold;
`

const ImageBackground = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WrapperBackground=styled.div`
  margin-left: 5px;

`

const TittleBackground=styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size:12px;
    color: #a3abb9;

`

const ChooseBackground=styled.div`
    display:flex;
  flex-direction: column;
  width: 100%;
  height:80px;
 
`

const CardBackground=styled.div`
  width: 100%;
  height:50%;
  background-color:red;
`





const DivColorBackground=styled.div`
  background-color: #332b2b;
  width: 100%;
  height:50%;
`

const Cards = styled.div`
  width: 70%;
  height: 120px;
  background-color: #6a6962;
  border-radius:4px;

`

const Links = styled.div`
  margin: 12px 8px;
`

const CreateBoard = styled.div`

`

const ButtonCreate = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 15px 8px 8px;
  border-radius: 4px;
  color: #42526e;


  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
  }
`

const IconCreate = styled.span`
  margin: 8px 15px 8px 8px;
  padding: 4px;
  background-color: #FAFBFC;
  border-radius: 4px;
`

const TitleCreate = styled.span`

`


const HomeRight = () => {
    const [createBoard, setCreateBoard] = useState(false)

    return (
        <Container>
            <DivTop>
                <Recently>
                    <IconRecently><AccessTimeIcon/></IconRecently>
                    <ContentRecently>Recently viewed</ContentRecently>
                </Recently>

                <Link to='/' style={{textDecoration: 'none'}}>
                    <ProjectOld>

                        <ImageProject src='https://www.tugo.com.vn/wp-content/uploads/1-3339-1415416821.jpg'
                                      alt="anh loi"/>

                        <WrapperTitle>
                            <TitleProject>Kanban Template</TitleProject>
                            <TitleWS>kkkkkkkkk</TitleWS>
                        </WrapperTitle>


                    </ProjectOld>
                    <ProjectOld>

                        <ImageProject src='https://www.tugo.com.vn/wp-content/uploads/1-3339-1415416821.jpg'
                                      alt="anh loi"/>
                        <TitleProject>Kanban Template</TitleProject>

                    </ProjectOld>
                </Link>

            </DivTop>
            <Links>
                <p>Links</p>
            </Links>

            <CreateBoard>
                <ButtonCreate>
                    <IconCreate><AddIcon/></IconCreate>

                    <TitleCreate onClick={() => setCreateBoard(true)}>Create a board</TitleCreate>
                </ButtonCreate>
            </CreateBoard>

            <DivBottom>

            </DivBottom>

            {/*{createBoard &&*/}
            {/*    <ContainerCreateBoard>*/}
            {/*        <WrapperCreateBoard>*/}
            {/*            <Close onClick={() => setCreateBoard(false)}>X</Close>*/}
            {/*            <TitleBoard>*/}
            {/*                Create board*/}
            {/*            </TitleBoard>*/}

            {/*            <ImageBackground>*/}
            {/*                <Cards>*/}
            {/*                </Cards>*/}
            {/*            </ImageBackground>*/}

            {/*            <WrapperBackground>*/}
            {/*                <TittleBackground>Background</TittleBackground>*/}

            {/*                <ChooseBackground>*/}

            {/*                    <CardBackground>*/}
            {/*                        <CardBackgroundSmall>*/}

            {/*                        </CardBackgroundSmall>*/}
            {/*                    </CardBackground>*/}

            {/*                    <DivColorBackground>*/}
            {/*                        <CardColorBackground>*/}

            {/*                        </CardColorBackground>*/}
            {/*                    </DivColorBackground>*/}

            {/*                </ChooseBackground>*/}
            {/*            </WrapperBackground>*/}

            {/*            /!*<FormContent></FormContent>*!/*/}


            {/*        </WrapperCreateBoard>*/}
            {/*    </ContainerCreateBoard>*/}
            {/*}*/}

        </Container>
    );
};

export default HomeRight;
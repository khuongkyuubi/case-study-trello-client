import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';


const Container = styled.div`
  width: 17%;
  margin-left:20px;
`

const DivTop = styled.div`

`


const Recently = styled.div`
  display: flex;
  align-items: center;
  color: #42526e;
  font-weight:400;
  margin-top:36px;

`

const IconRecently = styled.div`
  margin: 8px 8px;

`

const ContentRecently = styled.div`

`

const ProjectOld = styled.div`
  display: flex;
  align-items: center;
  border-radius:4px;
  &:hover {
    background-color:#e6eaee;
    cursor:pointer;

  }


`

const ImageProject = styled.img`
  width: 30px;
  height: 30px;
  margin: 8px 8px;
  border-radius:4px;
`

const WrapperTitle=styled.div`
display:flex;
  flex-direction:column;
 
`


const TitleProject = styled.span`
font-weight:bold;
  color:black;
  font-size:17px;
  margin:4px 0;
`

const TitleWS=styled.span`
  color: #42526e;

`


const DivBottom = styled.span`

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
  border-radius:4px;
  color: #42526e;


  &:hover {
    background-color:#e6eaee;
    cursor:pointer;
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
    return (
        <Container>
            <DivTop>
                <Recently>
                    <IconRecently><AccessTimeIcon/></IconRecently>
                    <ContentRecently>Recently viewed</ContentRecently>
                </Recently>

                <Link to='/' style={{textDecoration:'none'}}>
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
                    <TitleCreate>Create a board</TitleCreate>
                </ButtonCreate>
            </CreateBoard>

            <DivBottom>

            </DivBottom>

        </Container>
    );
};

export default HomeRight;
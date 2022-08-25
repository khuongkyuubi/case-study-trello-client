import React, {useState} from 'react';
import styled from "styled-components";
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from "@mui/icons-material/Add";
import NestedList from "./MenuWorkSpaces";
import BasicList from "./ListButton";

const ContentLeft2 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`

const DivItem = styled.div`
  margin-top: 30px;
`

const WrapperItem = styled.ul``

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 6px 0;
  padding: 8px;


  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
    border-radius: 5px;
  }
`
export const IconItem = styled.span`
  margin: 0 5px;
  color: #42526e;
`

export const ContentItem = styled.span`
  font-weight: bold;
  font-size: 12px;

`


const DivProject = styled.div`

`

const Workspace = styled.div`
  display: flex;
  color: #42526e;
  font-weight: 300;
  justify-content: space-around;
`

const ContentWorkspace = styled.div`
  margin-left: 25px;
`
const IconWorkspace = styled.button`
  border: none;
  border-radius: 4px;
  color: #42526e;
  cursor: pointer;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;

  }
`

const ProjectOld = styled.div`
  margin: 12px 0px;
  padding-left: 30px;
`


export const IconProject = styled.div`
  width: 21px;
  height: 21px;
  display: flex;
  margin-left: 10px;
  margin-right: 7px;
  justify-content: center;
  color: white;
  border-radius: 3px;
  font-weight: bold;
  background: linear-gradient(#b22865, #cd5a91)
`



const CreateWorkSpace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
`

const WrapperWorkSpace = styled.div`
  height: 550px;
  width: 1000px;
  //margin-top: 5px;
  background-color: #e4f7fa;
  display: flex;
  gap: 20px;
  position: relative;
  border-radius:3px;
`
const LeftCreateSPace = styled.div`
  width: 50%;
  height: 100%;



`

const ContentWorkSpace = styled.div`
  margin: 35px;

`


const Tittle = styled.div`
  color: #091e42;
  font-size: 18px;
  font-weight: bold;
`

const Desc1 = styled.div`
  color: #8e98a8;
`

const WorkspaceName = styled.div`
  margin-top: 15px;
  font-weight: bold;
`
const InputName = styled.input`
  margin-top: 3px;
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border-color:#f5f6f8;

`
const Desc2 = styled.div`
  font-size: 10px;
  margin-top: 3px;
  color:#7f8285;
`

const WorkspaceType = styled.div`
  margin-top: 15px;

`

const SelectType = styled.select`
  width: 100%;
  padding: 7px;
  border-radius: 4px;
  border-color:#f5f6f8;
  background-color:#f5f6f8;
`

const Opition = styled.option`
`

const WorkspaceDesc = styled.div`
  margin-top:15px;
`

const TextArea = styled.textarea`
  border-radius: 4px;
  width: 100%;
  border-color:#f5f6f8;

`

const Desc3=styled.div`
color:#7f8285;
  font-size:10px;
  margin-bottom:3px;
`
const DivButton = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonSubmit=styled.button`
margin-top:8px;
  background-color:#ffffff;
  width:100%;
  padding: 7px;
  border-radius: 4px;
  border-color:#f5f6f8;
`




const RightCreateSPace = styled.div`
  width: 50%;
  height: 100%;

`
const ImageTrello = styled.img`
  width: 100%;
  height: 100%;
  border-radius:3px;

`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold
`


const HomeLeft = () => {
    const [createWorkSpace, setCreateWorkSpace] = useState(false)
    const [form,setForm]=useState({})
    const handleChange=(e)=>{
        setForm({
            [e.target.name]:e.target.value
        })
    }
    console.log(form)


    return (
        <ContentLeft2 >
            <DivItem>
                <WrapperItem>
                    <BasicList/>
                </WrapperItem>
            </DivItem>

            <DivProject>
                <Workspace>
                    <ContentWorkspace>workspaces</ContentWorkspace>
                    <IconWorkspace>
                        <AddIcon onClick={() => setCreateWorkSpace(true)}/>
                    </IconWorkspace>
                </Workspace>

                <ProjectOld>
                    <NestedList/>
                </ProjectOld>


            </DivProject>

            {createWorkSpace && <CreateWorkSpace>
                <WrapperWorkSpace >
                    <LeftCreateSPace>
                            <Close onClick={() => setCreateWorkSpace(false)}>X</Close>
                            <ContentWorkSpace>
                                <Tittle>Let's build a Workspace</Tittle>
                                <Desc1>
                                    Boost your productivity by making it easier for everyone to access boards in one
                                    location.
                                </Desc1>

                                <WorkspaceName>Workspace name</WorkspaceName>
                                <InputName placeholder="Taco's Co." name="nameSpace" onChange={handleChange}></InputName>
                                <Desc2>This is the name of your company, team or organization.</Desc2>

                                <WorkspaceType>Workspace type</WorkspaceType>
                                <SelectType name="typeSpace" onChange={handleChange}>
                                    <Opition>choose...</Opition>
                                    <Opition>2</Opition>
                                    <Opition>3</Opition>
                                </SelectType>

                                <WorkspaceDesc>Workspace description</WorkspaceDesc>
                                <TextArea name="typeSpace" onChange={handleChange} placeholder="Our team organizes everything here." rows="4"></TextArea>
                                <Desc3>Get your members on board with a few words about your Workspace.</Desc3>

                                <DivButton>
                                    <ButtonSubmit type="submit">Continute</ButtonSubmit>
                                </DivButton>

                            </ContentWorkSpace>

                    </LeftCreateSPace>


                    <RightCreateSPace>
                        <ImageTrello src="https://wiki.tino.org/wp-content/uploads/2021/07/word-image-981.png"/>
                    </RightCreateSPace>
                </WrapperWorkSpace>
            </CreateWorkSpace>
            }


        </ContentLeft2>
    );
};

export default HomeLeft;
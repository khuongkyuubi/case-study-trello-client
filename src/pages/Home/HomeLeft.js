import React from 'react';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import styled from "styled-components";
import {Workspaces} from "@mui/icons-material";
import MultipleSelectPlaceholder from "./MenuWorkSpaces";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from "@mui/icons-material/Add";
import BasicExample from "./MenuWorkSpaces";
import NestedList from "./MenuWorkSpaces";
import {Link} from "react-router-dom";


const ContentLeft2 = styled.div`
  width: 17%;
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`

const DivItem = styled.div`
  margin-top: 30px;
`

const WrapperItem = styled.ul`

`

const Item = styled.li`
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
 const IconItem = styled.span`
  margin: 0 5px;
  color: #42526e;
`

const ContentItem = styled.span`
  font-weight: bold;
  font-size: 16px;

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
margin-left:25px;
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



const HomeLeft = () => {

    return (
        <ContentLeft2>
            <DivItem>
                <WrapperItem>
                    <Link to='/boards' style={{textDecoration:"none",color:" #42526e"}}>
                        <Item>
                            <IconItem><AnalyticsIcon/></IconItem>
                            <ContentItem>Boards</ContentItem>
                        </Item>
                    </Link>
                    <Item>
                        <IconItem><BubbleChartIcon/></IconItem>
                        <ContentItem>Templates</ContentItem>
                    </Item>

                    <Link to='/' style={{textDecoration:"none",color:" #42526e"}}>
                    <Item>
                        <IconItem><HolidayVillageIcon/></IconItem>
                        <ContentItem>Home</ContentItem>
                    </Item>
                    </Link>

                </WrapperItem>
            </DivItem>


            <DivProject>
                <Workspace>
                    <ContentWorkspace>workspaces</ContentWorkspace>
                    <IconWorkspace><AddIcon/></IconWorkspace>
                </Workspace>

                {/*<ProjectOld>*/}
                {/*    <ContentProject>*/}
                {/*        <IconProject>D</IconProject>*/}
                {/*        <NameProject>Du an C03H_JS</NameProject>*/}
                {/*    </ContentProject>*/}
                {/*</ProjectOld>*/}

                <ProjectOld>
                    <NestedList/>
                </ProjectOld>


            </DivProject>
        </ContentLeft2>
    );
};

export default HomeLeft;
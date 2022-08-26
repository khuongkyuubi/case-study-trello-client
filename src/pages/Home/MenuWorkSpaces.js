import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {IconProject} from "./HomeLeft";
import {Link} from "react-router-dom";
import "../../Link.css"
import Typography from "@mui/material/Typography";


export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (


        <List
            sx={{width: '100%', maxWidth: 360}}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >

            <ListItemButton onClick={handleClick} className="NameProject">
                <ListItemIcon>
                    <IconProject>D</IconProject>
                </ListItemIcon>

                <ListItemText>
                    <Typography sx={{fontSize:'1rem',fontWeight:'medium'
                    }} >Dự án C03H_JS</Typography>
                </ListItemText>

                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <Link to={'/my-boards'} className="my-board">
                        <ListItemButton sx={{pl: 4}} className="NameProject">
                            <ListItemIcon>
                                <AnalyticsIcon/>
                            </ListItemIcon>

                            <ListItemText primary="Board"/>

                        </ListItemButton>
                    </Link>


                    <Link to={'/members'} className="my-board">
                        <ListItemButton sx={{pl: 4}} className="NameProject">
                            <ListItemIcon>
                                <SupervisedUserCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Members"/>
                        </ListItemButton>
                    </Link>

                    <Link to={'/setting'} className="my-board">
                        <ListItemButton sx={{pl: 4}} className="NameProject">
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Setting"/>
                        </ListItemButton>
                    </Link>

                </List>
            </Collapse>
        </List>
    );
}

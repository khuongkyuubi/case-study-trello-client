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



export default function NestedList() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <IconProject>D</IconProject>
                </ListItemIcon>
                <ListItemText primary="C03H_JS" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AnalyticsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Board" />
                    </ListItemButton>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SupervisedUserCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Members" />
                    </ListItemButton>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Setting" />
                    </ListItemButton>


                </List>
            </Collapse>
        </List>
    );
}

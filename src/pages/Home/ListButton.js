import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Link} from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";

export default function BasicList() {
    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <nav aria-label="main mailbox folders">
                <List>
                    <Link to={'/boards'} style={{textDecoration: "none", color: " #42526e"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AnalyticsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Boards"/>
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to={'/boards'} style={{textDecoration: "none", color: " #42526e"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BubbleChartIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Templates"/>
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to={'/home'} style={{textDecoration: "none", color: " #42526e"}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HolidayVillageIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </nav>
            <Divider/>
        </Box>
    );
}





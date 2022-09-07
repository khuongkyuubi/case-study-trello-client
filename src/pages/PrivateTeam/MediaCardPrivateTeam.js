import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function MediaCardPrivateTeam() {
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardMedia
                component="img"
                image="https://media.hoclaptrinh.vn/images/trello-la-gi-5c36cae13c513.jpg"
                alt="green iguana"
            />
            <CardContent >
                <Typography gutterBottom variant="h5" component="div" align="center">
                    Fail to connect this team
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    You don't have permission to connect this team
                </Typography>
            </CardContent>

        </Card>
    );
}
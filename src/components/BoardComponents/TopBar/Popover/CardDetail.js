import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function CardDetail({member}) {
    return (
        <Card sx={{maxWidth: 350}} className="cardDetail">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="85"
                    image="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2k-de-thuong-cute.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    {/*<Typography gutterBottom variant="h5" component="div">*/}
                    {/*    Lizard*/}
                    {/*</Typography>*/}
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <div style={{display: 'flex', width: '100%'}}>
                            <div style={{width: '100%', display: 'flex'}}>
                                <Avatar

                                    alt="Remy Sharp"
                                    src={member?.avatar}
                                    sx={{
                                        width: 80, height: 80, mt: -8.5,
                                        background: member?.color,
                                    }
                                    }
                                >
                                    {member.name.charAt(0).toUpperCase()}
                                </Avatar>

                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: "column",
                                    marginTop: '-28%',
                                    marginLeft: '4.5%',
                                    color: '#ffffff'
                                }}>
                                    <div>{member.name}</div>
                                    <div>{member.email}</div>
                                </div>

                            </div>

                        </div>


                        <CardContent  className='hover'>
                            <Typography gutterBottom variant="body1" component="div">
                                View profile
                            </Typography>
                            <hr/>
                            <Typography variant="body1"  component="div">

                                lol
                            </Typography>
                        </CardContent>
                    </div>




                </CardContent>
            </CardActionArea>
        </Card>
    )}





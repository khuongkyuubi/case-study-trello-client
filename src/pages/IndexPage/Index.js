import React, {useEffect, useState} from "react";

import IndexNav from "../../components/IndexNav";
import { useNavigate,Link } from "react-router-dom";
import {
    Container,
    Content,
    LeftSide,
    RightSide,
    LeftWrapper,
    Title,
    Text,
    Button,
    SvgItem, Form, Input,
} from "./Styled";
import {useSelector} from "react-redux";
import axios from "axios";
import {CircularProgress} from "@mui/material";

const Index = () => {
    const url = process.env.REACT_APP_API_ENDPOINT
    let navigate = useNavigate();
    const [formData,setFormData] =  useState();
    const [pending, setPending] = useState(false);
    let {userInfo} = useSelector(state => state.user)
    useEffect(() => {
        document.title = "Trello Clone"
    }, [])
    // navigate(`/home`);
    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            setPending(true);
            const res = await axios.get(url + '/user/check-email/' + formData);
            setPending(false);
            const email = res.data.checkMail;
            if (email) {
                navigate('/login', {state: {email: formData}})
            } else {
                navigate('/register', {state: {email: formData}})
            }
        }catch (e) {
            navigate('/register', {state: {email: formData}})
            console.log(e);
        }
    }
    return (
        <>
            <IndexNav />
            <Container>
                <Content>
                    <LeftSide>
                        <LeftWrapper>
                            <Title>Trello helps teams move work forward.</Title>
                            <Text>
                                Collaborate, manage projects, and reach new productivity peaks.
                                From high rises to the home office, the way your team works is
                                unique—accomplish it all with Trello.
                            </Text>
                            {userInfo ? (
                                    <main>
                                        <p>Welcome to Trello</p>
                                        <Link to={'/boards'}>Back to Boards --></Link>
                                    </main>)
                                : (
                                    <>
                                        <Form onSubmit={onSubmit}>
                                            <Input disabled={pending} type="email" placeholder='Email' onChange={(e) =>{setFormData(e.target.value)}}/>
                                            {pending ? <CircularProgress size={"2.5rem"} /> :<Button type='submit'>Sign up-It's free</Button>}
                                        </Form>
                                    </>
                                )
                            }
                        </LeftWrapper>
                    </LeftSide>
                    <RightSide>
                        <SvgItem src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp" />
                    </RightSide>
                </Content>
            </Container>
        </>
    );
};

export default Index;
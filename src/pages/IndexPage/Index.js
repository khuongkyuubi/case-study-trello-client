import React, {useEffect, useState} from "react";
import IndexNav from "../../components/IndexNav";
import { useNavigate } from "react-router-dom";
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

const Index = () => {
    const url = process.env.REACT_APP_API_ENDPOINT
    let navigate = useNavigate();
    const [formData,setFormData] =  useState()
    let {userInfo} = useSelector(state => state.user)
    useEffect(() => {
        document.title = "Trello Clone"
    }, [])
    // navigate(`/home`);
    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.get(url + '/user/check-email/' + formData);
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
                                        Welcome to Trello
                                    </main>)
                                : (
                                    <>
                                        <Form onSubmit={onSubmit}>
                                            <Input type="email" placeholder='Email' onChange={(e) =>{setFormData(e.target.value)}}/>
                                            <Button type='submit'>Sign up-It's free</Button>
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
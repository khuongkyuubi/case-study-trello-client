import React, {useState} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../../services/userService";
import Background from "../../components/Background";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    BgContainer,
    Container,
    TrelloIconContainer,
    FormSection,
    FormCard,
    Form,
    Title,
    Input,
    Button,
    Icon,
    Hr,
    Link, IconWrap, WrapPassword,
} from "./Styled";

const Login = () => {
    const {state} = useLocation()
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInformations, setUserInformations] = useState({
        email: "",
        password: "",
        showPassword: false
    });
    const [typeInput,setTypeInput] = useState('password')
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setUserInformations({
            ...userInformations,
            showPassword: !userInformations.showPassword,
        });
    };
    useEffect(() => {
        if(userInformations.showPassword) {
            setTypeInput('text')
        }else{
            setTypeInput('password')
        }
    },[userInformations])
    useEffect(() => {
        if (state) {
            setUserInformations({
                email: state.email
            })
        }
        document.title = "Log in to Trello Clone"
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        login(userInformations, dispatch);
    };
    return (
        <>
            <BgContainer>
                <Background/>
            </BgContainer>
            <Container>
                <TrelloIconContainer onClick={() => navigate("/")}>
                    <Icon
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"/>
                </TrelloIconContainer>
                <FormSection>
                    <FormCard>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Title>Log in to Trello</Title>
                            <Input
                                type="text"
                                placeholder="Enter email"
                                required
                                value={userInformations.email || ''}
                                onChange={(e) =>
                                    setUserInformations({
                                        ...userInformations,
                                        email: e.target.value,
                                    })
                                }
                            />
                            {/*<OutlinedInput*/}
                            {/*    id="margin-none fullWidth"*/}
                            {/*    type={userInformations.showPassword ? 'text' : 'password'}*/}
                            {/*    value={userInformations.password}*/}
                            {/*    size={"small"}*/}
                            {/*    onChange={(e) =>*/}
                            {/*        setUserInformations({*/}
                            {/*            ...userInformations,*/}
                            {/*            password: e.target.value,*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*    endAdornment={*/}
                            {/*        <InputAdornment position="end">*/}
                            {/*            <IconButton*/}
                            {/*                aria-label="toggle password visibility"*/}
                            {/*                onClick={handleClickShowPassword}*/}
                            {/*                onMouseDown={handleMouseDownPassword}*/}
                            {/*                edge="end"*/}
                            {/*            >*/}
                            {/*                {userInformations.showPassword ? <VisibilityOff/> : <Visibility/>}*/}
                            {/*            </IconButton>*/}
                            {/*        </InputAdornment>*/}
                            {/*    }*/}
                            {/*    label="Password"*/}
                            {/*/>*/}
                            <WrapPassword>
                                <Input
                                    type={typeInput}
                                    placeholder="Enter password"
                                    required
                                    value={userInformations.password||''}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <IconWrap>
                                    {userInformations.showPassword?<RemoveRedEyeIcon onClick={handleClickShowPassword}/>:<VisibilityOffIcon onClick={handleClickShowPassword}/>}
                                </IconWrap>
                            </WrapPassword>

                            <Button>Log in</Button>
                            <Hr/>
                            <Link
                                fontSize="0.85rem"
                                onClick={() => navigate("/register")}
                            >
                                Sign up for an account
                            </Link>

                        </Form>
                    </FormCard>
                </FormSection>
            </Container>
        </>
    );
};

export default Login;
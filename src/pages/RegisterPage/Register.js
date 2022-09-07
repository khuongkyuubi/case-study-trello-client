import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Background from "../../components/Background";
import {register} from "../../services/userService";
import {useDispatch, useSelector} from "react-redux";
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
    Text,
    Icon,
    Hr,
    Link, WrapPassword,
} from "./Styled";
import {useEffect} from "react";
import {IconWrap} from "../LoginPage/Styled";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
        let navigate = useNavigate();
        const {state} = useLocation()
        const dispatch = useDispatch();
        const {pending} = useSelector((state) => state.user);
        const [typeInput, setTypeInput] = useState({
            password: 'password',
            rePassword: 'password'
        })
        const [userInformations, setUserInformations] = useState({
            name: "",
            surname: "",
            email: "",
            password: "",
            repassword: "",
            showPassword: false,
            showRePassword: false
        });
        useEffect(() => {
            document.title = "Create a Trello Account";
            if (state) {
                setUserInformations({
                    ...userInformations,
                    email: state.email
                })
            }
        }, [])
    console.log(typeInput)
    useEffect(()=>{
        if (userInformations.showPassword) {
            console.log('1')
            setTypeInput({
                ...typeInput,
                password: 'text'
            })
        }
        else{
            console.log('3')
            setTypeInput({
                ...typeInput,
                password: 'password'
            })
        }
    },[userInformations.showPassword])
        useEffect(() => {
                 if (userInformations.showRePassword) {
                    console.log('2')
                    setTypeInput({
                        ...typeInput,
                        rePassword: 'text'
                    })
                }else {
                    console.log('4')
                    setTypeInput({
                        ...typeInput,
                        rePassword: 'password'
                    })
                }
            },
            [ userInformations.showRePassword]
        )
        const handleClickShowPassword = () => {
            setUserInformations({
                ...userInformations,
                showPassword: !userInformations.showPassword,
            });
        };
        const handleClickShowRePassword = () => {
            setUserInformations({
                ...userInformations,
                showRePassword: !userInformations.showRePassword,
            });
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            await register(userInformations, dispatch);
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
                                <Title>Sign up for your account</Title>
                                <Input
                                    type="text"
                                    placeholder="Enter name"
                                    required
                                    value={userInformations.name}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Enter surname"
                                    required
                                    value={userInformations.surname}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            surname: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Enter email"
                                    required
                                    value={userInformations.email}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <WrapPassword>
                                    <Input
                                        type={typeInput.password}
                                        placeholder="Enter password"
                                        required
                                        value={userInformations.password}
                                        onChange={(e) =>
                                            setUserInformations({
                                                ...userInformations,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    <IconWrap>
                                        {userInformations.showPassword ?
                                            <RemoveRedEyeIcon onClick={handleClickShowPassword}/> :
                                            <VisibilityOffIcon onClick={handleClickShowPassword}/>}
                                    </IconWrap>
                                </WrapPassword>
                                <WrapPassword>
                                    <Input
                                        type={typeInput.rePassword}
                                        placeholder="Confirm password"
                                        required
                                        value={userInformations.repassword}
                                        onChange={(e) =>
                                            setUserInformations({
                                                ...userInformations,
                                                repassword: e.target.value,
                                            })
                                        }
                                    />
                                    <IconWrap>
                                        {userInformations.showRePassword ?
                                            <RemoveRedEyeIcon onClick={handleClickShowRePassword}/> :
                                            <VisibilityOffIcon onClick={handleClickShowRePassword}/>}
                                    </IconWrap>
                                </WrapPassword>


                                <Text>
                                    By signing up, you confirm that you've read and accepted our{" "}
                                    <Link fontSize="0.75rem">Terms of Service</Link> and{" "}
                                    <Link fontSize="0.75rem">Privacy Policy</Link>.
                                </Text>
                                <Button type="submit" disabled={pending}>
                                    Complete
                                </Button>
                                <Hr/>
                                <Link fontSize="0.85rem" onClick={() => navigate("/login")}>
                                    Already have an account? Log In
                                </Link>
                            </Form>
                        </FormCard>
                    </FormSection>
                </Container>
            </>
        );
    }
;

export default Register;
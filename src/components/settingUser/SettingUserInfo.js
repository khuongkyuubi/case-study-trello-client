import {BodyWrapper, LeftWrapper, MiddleWrapper, RightWrapper} from "../../pages/SettingsUser/Styled";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, IconButton, InputAdornment, OutlinedInput, Stack} from "@mui/material";
import {useEffect, useLayoutEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {getUserInfo, loadUser, updateInfoUser, uploadAvatar} from "../../services/userService";
function SettingUserInfo({props}){
    const data = props;
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.user)
    const [status,setStatus] = useState(false)
    const [values, setValues] = useState({
        name:'',
        surname:'',
        email:'',
        password: '',
        newPassword:'',
        confirmPassword:'',
        showPassword: false,
    });
    useEffect(()=>{
        setValues({
            ...values,
            name:userInfo.name,
            surname:userInfo.surname,
            email:userInfo.email
            }
        )
    },[])
    useLayoutEffect(()=>{
        if(values.confirmPassword===values.newPassword){
            setStatus(false)
        }else{
            setStatus(true)
        }
    },[values])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSave = async (e) => {
        e.preventDefault();
        await updateInfoUser(values,dispatch)
        await uploadAvatar(data,dispatch)
        await getUserInfo(dispatch)
    }
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    return(
        <BodyWrapper>
            <LeftWrapper>
            </LeftWrapper>
            <MiddleWrapper>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%',fontSize:'20px' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <h1>Account details</h1>
                    <hr/>
                    <TextField id="outlined-basic name" name='name' onChange={handleChange} value={values.name} label="Name"  variant="outlined" />
                    <TextField id="outlined-basic surname" name='surname' onChange={handleChange} value={values.surname} label="Sur Name" variant="outlined" />
                    <TextField id="outlined-basic email" name='email' onChange={handleChange} value={values.email} label="Email"  variant="outlined" />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            name='password'
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-newPassword">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-newPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            name='newPassword'
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirmPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            name='confirmPassword'
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {status&&<p style={{color:'red',fontSize:'12px'}}>Password does not match</p>}
                    <Stack direction="row" spacing={2}>
                        {status?<Button variant="contained" type="submit" color="success" onClick={handleSave} disabled>
                            Save
                        </Button>:<Button variant="contained" type="submit" color="success" onClick={handleSave}>
                            Save
                        </Button>}
                    <Button variant="outlined" color="error">
                        Cancel
                    </Button>
                    </Stack>
                </Box>
            </MiddleWrapper>
            <RightWrapper>
            </RightWrapper>
        </BodyWrapper>

    )
}
export default SettingUserInfo
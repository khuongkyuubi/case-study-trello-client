import {BodyWrapper, LeftWrapper, MiddleWrapper, RightWrapper} from "../../pages/SettingsUser/Styled";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {FormControl, IconButton, InputAdornment, OutlinedInput, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
function SettingUserInfo({props}){
    console.log(props)
    const {userInfo} = useSelector(state => state.user)
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
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSave = (e) => {
        e.preventDefault();
        if(values.newPassword !== values.confirmPassword){
            console.log('error')
        }

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
                    <TextField id="outlined-basic" name='name' onChange={handleChange} value={values.name} label="Name" defaultValue={values.name} variant="outlined" />
                    <TextField id="outlined-basic" name='surname' onChange={handleChange} value={values.surname} label="Sur Name" defaultValue={values.surname} variant="outlined" />
                    <TextField id="outlined-basic" name='email' onChange={handleChange} value={values.email} label="Email" defaultValue={values.email} variant="outlined" />
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
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                    <Stack direction="row" spacing={2}>
                    <Button variant="contained" type="submit" color="success" onClick={handleSave}>
                        Save
                    </Button>
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
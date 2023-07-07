import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState } from 'react';
import apiURL from "../ApiURL"
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';



const defaultTheme = createTheme();

export default function Verification() {

    const navigate = useNavigate();

    const [otp, setOTP] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const handleOTPChange = (e) => {
        setOTP(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        //checking for all fields
        if (otp != null) {
            //verifying

            const res = await axios.post(apiURL + "/authentication/verify", {
                otp: otp
            })
            if (res.data.message == 'OTP verified') {                
                //navigate to login page
                navigate('/login')
            }
            else
                alert(res.data.message)
        }
        else
            alert('please enter otp')
        setIsLoading(false)

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        OTP verification
                    </Typography>
                    <Typography variant="h7">
                        An OTP has been sent to your mail
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleOTPChange}
                                    autoComplete="given-name"

                                    required
                                    fullWidth

                                    label="Enter OTP"
                                    autoFocus
                                />
                            </Grid>




                        </Grid>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >


                            Verify
                            <div style={{ "paddingLeft": "10px" }}></div>
                            {isLoading ? (<CircularProgress color="primary" size={25} />) : null}
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
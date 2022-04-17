import React, {useState} from 'react';
import { Checkbox, Link, Grid, Box, FormControlLabel, TextField, 
    CssBaseline, Button, Avatar, Typography, Container, ThemeProvider} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { useEffect } from 'react';
const theme = createTheme();
const BASE_URL = "http://localhost:7000";

function Signup() {

    const defaultValues = {
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
    }

    const [formValues, setFormValues] = useState(defaultValues);
    const [status, setStatus] = useState("");
    const [statusCode, setStatusCode] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    } 

    
    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        };

        fetch(`${BASE_URL}/user/signup`, requestOptions)
        .then(response => response.json())
        .then(function (response) {
            const message = response["message"];
            const data = response["data"];
            const code = response["status"];
            setStatus(message);
            setStatusCode(code);
            setTimeout(() => {
                setStatus("");
              }, 3000)

            if( code === 201 ){
                setFormValues(defaultValues);
                // history.push("/");
                window.location = "/";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };


    return (
        <ThemeProvider theme={theme}>
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
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {
                statusCode ? (
                  <div style={{color:"green"}}>{status}</div>
                ) :
                ( <div style={{color:"red"}}>{status}</div> )
                }
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        onChange={handleInputChange}
                        autoComplete="given-name"
                        name="first_name"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        onChange={handleInputChange}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="last_name"
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        onChange={handleInputChange}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        onChange={handleInputChange}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Signup;
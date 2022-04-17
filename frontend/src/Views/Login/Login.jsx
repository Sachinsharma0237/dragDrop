import React, {useState} from 'react';
import { Checkbox, Link, Grid, Box, FormControlLabel, TextField, 
        CssBaseline, Button, Avatar, Typography, Container, ThemeProvider} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
const theme = createTheme();
const BASE_URL = "http://localhost:7000";
export default function Login() {

    const defaultValues = {
        "email": "",
        "password": "",
    }

    
    const [formValues, setFormValues] = useState(defaultValues);
    const [status, setStatus] = useState("");
    const [user, setUserData] = useState([]);

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

        fetch(`${BASE_URL}/user/login`, requestOptions)
        .then(response => response.json())
        .then(function (response) {
            console.log(response);
            const message = response["message"];
            const data = response["data"];
            const code = response["status"];
            setUserData(data);
            setStatus(message);
            setTimeout(() => {
              setStatus("");
            }, 3000)
            if(code === 201){
              window.location = "/home";
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
                Sign in
              </Typography>
              {
                user.length > 0 ? (
                  <div style={{color:"green"}}>{status}</div>
                ) :
                ( <div style={{color:"red"}}>{status}</div> )
              }
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )
}

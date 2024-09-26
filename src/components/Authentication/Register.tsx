import React, {useState} from "react"
import {Avatar, Box, Button, Grid, TextField, Typography} from "@mui/material"

import axios from "axios"

let BASE_URL = process.env.SERVER_DEV
if (process.env.APP_ENV === "prod") {
    BASE_URL = process.env.SERVER_PROD
}

export function register(data) {
    console.info(data)
    return axios
        .post(
            `${BASE_URL}/api/v1/authentication/register`,
            {name: data.name, email: data.email, password: data.password},
            {headers: {"content-type": "application/json"}},
        )

        .then((response) => {
            return response.data
        })
        .catch((err) => Promise.reject(err.response.data))
}
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}
const Register = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [, setLogin] = useState(true)
    const [message, setMessage] = useState({message: undefined})

    const handleRegister = async () => {
        name.length >= 6 &&
            password.length > 6 &&
            validateEmail(email) &&
            register({name, password, email})
                .then((response) => {
                    console.info("gothere")
                    setMessage(response)
                    setLogin(true)
                })
                .catch((err) => setMessage(err))
        name.length < 6 && alert("username needs to be greater than 6 characters")
        password.length < 6 && alert("password needs to be greater than 6 characters")
        !validateEmail(email) && alert("email needs to be a valid email address")
    }

    return (
        <>
            <Box
                sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* <Avatar sx={{m: 1, bgcolor: "primary.light"}}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Register</Typography> */}
                <Box sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Username"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        {/* <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid> */}
                        <Grid item>{message && message.message}</Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
export default Register

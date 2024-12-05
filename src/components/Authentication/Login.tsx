import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {useRouter, usePathname} from "next/navigation"
import {loadGlobal} from "@/features/global/globalSlice"
import {Box, Typography, TextField, Button, Grid} from "@mui/material"
import axios from "axios"
import Cookies from "js-cookie"

let BASE_URL = process.env.SERVER_DEV
if (process.env.APP_ENV === "prod") {
    BASE_URL = process.env.SERVER_PROD
}

export function login(data) {
    return axios
        .post(
            `${BASE_URL}/api/v1/authentication/login`,
            {name: data.name, password: data.password},
            {headers: {"content-type": "application/json"}},
        )

        .then((response) => {
            Cookies.set("token", response.data.token, {sameSite: "None", secure: true})
            // localStorage.setItem("x-access-token", response.data.token)
            const exp = Date.now() + 2 * 60 * 60 * 1000
            Cookies.set("token-expiration", exp.toString(), {sameSite: "None", secure: true})
            // localStorage.setItem("x-access-token-expiration", exp.toString())

            return response.data
        })
        .catch((err) => Promise.reject({message: "Authentication Failed!", err}))
}

export function user(token = Cookies.get("token"), url = BASE_URL) {
    return axios
        .post(
            `${url}/api/v1/authentication/user`,
            {token},
            {headers: {"content-type": "application/json"}},
        )

        .then((response) => {
            return response.data
        })
        .catch((err) => Promise.reject({message: "User Gathered!", err}))
}

export function logOut() {
    localStorage.removeItem("x-access-token")
    Cookies.remove("token")
    Cookies.remove("token-expiration")
    let currentUrl = window.location.pathname
    window.location.replace(currentUrl)
}

export async function isAuthenticated() {
    // const token = Cookies.get("token")
    const token = localStorage.getItem("x-access-token")
    const currUser = token ? await user(token) : null
    const isAuth = token && Number(localStorage.getItem("x-access-token-expiration")) > Date.now()
    console.log(isAuth)
    return false
}

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        login({name, password})
            .then((currUser) => {
                currUser &&
                    dispatch(
                        loadGlobal({
                            jwt: currUser?.token,
                            user: {
                                name: currUser?.user?.name,
                                roles: currUser?.user?.roles,
                            },
                        }),
                    )
                !currUser && alert("username and/or password are incorrect, please try again")
                // if (location) {
                //     window.location = location
                // }
                router.push(pathname)
            })
            .catch((err) => console.log(err))
    }

    return (
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
            <Typography variant="h5">Login</Typography> */}
            <Box sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Username"
                    name="name"
                    autoFocus={pathname !== "/experience"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}} onClick={handleLogin}>
                    Login
                </Button>
                <Grid container justifyContent={"flex-end"}>
                    {/* <Grid item>
                        <Link to="/register">Don't have an account? Register</Link>
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    )
}
export default Login

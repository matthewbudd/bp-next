import React, {useEffect} from "react"
import {useAppSelector} from "@/lib/hooks"
import {Box, IconButton, Button, Typography} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LogoutIcon from "@mui/icons-material/Logout"
import Modal from "@mui/material/Modal"
import PayPal from "./Paypal"
import LogReg from "./LogReg"
import {logOut} from "./Login"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
}

const LogRegSub = (props) => {
    const {user} = props
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        if (user?.roles?.includes("subscriber")) {
            setOpen(false)
        }
    }, [user?.roles])

    return (
        <>
            <IconButton
                // variant={"egg" as any}
                onClick={handleOpen}
                sx={{
                    color: "#333",
                    background: "none",
                    "&:hover": {color: "#666", background: "none"},
                }}
            >
                {/* <LogoutIcon /> */}
                {user?.roles === null || user?.roles.includes("") ? (
                    <LoginIcon />
                ) : user?.roles?.includes("subscriber") ? (
                    <LogoutIcon />
                ) : (
                    <LockOpenIcon />
                )}
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                {/* {console.log(user?.roles)} */}
                    {user?.roles &&
                    user?.roles.some((item) => ["subscriber", ""].includes(item)) ? (
                        <>
                            {user?.roles.includes("subscriber") && (
                                <Box>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{mb: 2}}
                                        onClick={logOut}
                                    >
                                        Logout
                                    </Button>
                                    <Typography align="center">or</Typography>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    display: "inline-block",
                                    margin: "0 0 -10px 5px",
                                }}
                            >
                                {" "}
                                <LogReg user={user} />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box>
                                <Button fullWidth variant="contained" sx={{mb: 2}} onClick={logOut}>
                                    Logout
                                </Button>
                                <Typography sx={{pt: 4, pb: 6}} align="center">
                                    or subscribe to see full content..
                                </Typography>
                            </Box>
                            <PayPal items={[{id: 2, quantity: 1}]} userRole={"subscriber"} />
                            <Typography sx={{pt: 1, fontSize: 14, color: "#999"}} align="center">
                                In order to keep quality high, a one off secure payment will unlock
                                key content forever.
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    )
}
export default LogRegSub

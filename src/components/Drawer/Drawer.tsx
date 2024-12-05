import * as React from "react"
// import {useNavigate} from "react-router-dom"

import {useRouter} from "next/router"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
// import Button from "@mui/material/Button"
import {IconButton} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import List from "@mui/material/List"
// import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
// import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
// import InboxIcon from "@mui/icons-material/MoveToInbox"
// import MailIcon from "@mui/icons-material/Mail"
import MenuIcon from "@mui/icons-material/Menu"
import LogRegSub from "@/components//Authentication/LogRegSub"
import data from "./blog-list.json"

export default function TemporaryDrawer(props) {
    // const navigate = useNavigate()
    const {user} = props
    const router = useRouter()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })
    const handleClick = (loc, anchor) => {
        setState({...state, [anchor]: false})
        router.push(loc)
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setState({...state, [anchor]: open})
    }

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {data.map((item) => {
                    return item.slug == "/" ? (
                        <IconButton
                            key={item.title}
                            sx={{
                                "&:hover": {
                                    background: "none",
                                    color: "#666",
                                },
                                marginLeft: 0.7,
                                color: "#000",
                            }}
                            onClick={() => {
                                handleClick(item.slug, anchor)
                            }}
                        >
                            <HomeIcon />
                        </IconButton>
                    ) : (
                        <ListItem key={item.title} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    handleClick(`/blog/${item.slug}`, anchor)
                                }}
                            >
                                {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box
                ml={2}
                p={0}
                sx={{
                    // border: "1px solid #000",
                    display: "inline-block",
                    borderRadius: "6px",
                    lineHeight: 0.8,
                    float: "right",
                    margin: 1,
                }}
            >
                <LogRegSub user={user} />
            </Box>
            {/* <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    )

    return (
        <div>
            {["left" /*, "right", "top", "bottom"*/].map((anchor) => {
                return (
                    <React.Fragment key={anchor}>
                        <IconButton
                            onClick={toggleDrawer(anchor, true)}
                            style={{
                                position: "fixed",
                                top: 0,
                                zIndex: 4,
                            }}
                            sx={{"&:hover": {color: "#666"}, color: "#333"}}
                        >
                            {/* {anchor} */}
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor={anchor as "left"}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            variant="temporary"
                            ModalProps={{keepMounted:true, disablePortal: true}}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

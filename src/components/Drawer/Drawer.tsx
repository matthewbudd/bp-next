import * as React from "react"

import {useRouter} from "next/navigation"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import {IconButton} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import LogRegSub from "@/components//Authentication/LogRegSub"
import data from "./page-list.json"

export default function TemporaryDrawer(props) {
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
                    display: "inline-block",
                    borderRadius: "6px",
                    lineHeight: 0.8,
                    float: "right",
                    margin: 1,
                }}
            >
                <LogRegSub user={user} />
            </Box>
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

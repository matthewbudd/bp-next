
const Local = (props) => {
    const {local, dispatch, site, setSite, siteSwitch} = props.switch
    return (
        local && (
            <button
                onClick={() => siteSwitch(dispatch, site, setSite)}
                style={{
                    position: "fixed",
                    zIndex: 3000,
                    right: 0,
                    bottom: 0,
                }}
            >
                Local Switch
            </button>
        )
    )
}
export default Local
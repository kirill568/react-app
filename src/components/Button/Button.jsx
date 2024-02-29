const Button = ({ label = "default", color = "blue", onClick = () => { }, disabled, ...props }) => {
    let classes = "b-button"
    classes += ` b-button__color-${color}`

    return (
        <button 
            disabled={disabled ? "disabled" : false} 
            className={classes} 
            onClick={onClick} {...props}
        >
            {label}
        </button>
    )
}
export default Button
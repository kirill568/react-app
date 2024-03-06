import Button from "../../../components/Button"
import ThemeContext from "../../../contexts/ThemeContext"
import { THEME_LIGHT, THEME_DARK } from "../../../contexts/ThemeContext"
import { BUTTON_COLOR_ORANGE } from "../../../components/Button/config"
import { useContext, useState, useEffect } from "react"

const Lab4 = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(0)
    }, [theme])

    return (
            <div className="lab4-template">
                <Button
                    label="Light theme"
                    onClick={() => setTheme(THEME_LIGHT)}
                ></Button>

                <Button
                    label="dark theme"
                    onClick={() => setTheme(THEME_DARK)}
                ></Button>

                <div className="lab4-template__clicker-wrapper">
                    <span>You clicked {count} times</span>
                    <Button
                        color={ BUTTON_COLOR_ORANGE }
                        label="Click me"
                        onClick={() => setCount(count + 1)}
                    ></Button>
                </div>
            </div>
        )
}

export default Lab4
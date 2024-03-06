import Button from "../../../components/Button"
import ThemeContext from "../../../contexts/ThemeContext"
import { THEME_LIGHT, THEME_DARK } from "../../../contexts/ThemeContext"
import { useContext } from "react"

const Lab4 = () => {
    const { theme, setTheme } = useContext(ThemeContext)

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
            </div>
        )
}

export default Lab4
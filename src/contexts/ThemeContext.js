import { createContext } from "react"

const THEME_LIGHT = "light"
const THEME_DARK = "dark"

const ThemeContext = createContext()

export default ThemeContext

export {THEME_LIGHT, THEME_DARK}
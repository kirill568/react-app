import Button from "../../../components/Button"
import ThemeContext from "../../../contexts/ThemeContext"
import { THEME_LIGHT, THEME_DARK } from "../../../contexts/ThemeContext"
import { BUTTON_COLOR_ORANGE, BUTTON_COLOR_RED, BUTTON_COLOR_GREEN } from "../../../components/Button/config"
import { useContext, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, setValue, selectCount } from "../../../features/counter/counterSlice"

const Lab4 = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const [count, setCount] = useState(0)
  const countRedux = useSelector(selectCount)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Use effect")
    setCount(0)
    dispatch(setValue(0))
  }, [theme, dispatch])

  return (
    <div className="lab4-template">
      <Button
        label="Light theme"
        onClick={() => setTheme(THEME_LIGHT)}
      ></Button>

      <Button
        label="Dark theme"
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

      <div className="lab4-template__clicker-wrapper">
        <span>You clicked {countRedux} times (Redux)</span>
        <Button
          color={ BUTTON_COLOR_GREEN }
          label="Increment"
          onClick={() => dispatch(increment())}
        ></Button>

        <Button
          color={ BUTTON_COLOR_RED }
          label="Decrement "
          onClick={() => dispatch(decrement())}
        ></Button>
      </div>
    </div>
  )
}

export default Lab4
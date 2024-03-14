import Button from "../../../components/Button"
import { BUTTON_COLOR_ORANGE, BUTTON_COLOR_GREEN } from "../../../components/Button/config"

const Lab2 = () => {
  return (
    <div className="lab2-template">
      <Button
        label="Button 1"
        onClick={() => console.log("On click")}
      ></Button>

      <Button
        color={BUTTON_COLOR_ORANGE}
        label="Button 2"
        onClick={() => console.log("On click2")}
        disabled
      ></Button>

      <Button
        color={BUTTON_COLOR_GREEN}
        label="Button 3"
        onClick={() => console.log("On click3")}
      ></Button>
    </div>
  )
}

export default Lab2
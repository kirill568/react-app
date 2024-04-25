import Button from "../Button.jsx"
import renderer from "react-test-renderer"

test("Button has onPress fn", () => {
  let x = 0
  const component = renderer.create(<Button onClick = {() => x++} />)
  const tree = component.toJSON()

  expect(tree.props.onClick).toBeDefined()
  expect(x).toBe(0)
  tree.props.onClick()
  expect(x).toBe(1)
})
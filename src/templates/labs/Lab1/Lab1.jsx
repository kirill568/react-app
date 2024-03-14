import { useState } from 'react'

const Lab1 = () => {
  const [login, setLogin] = useState(localStorage.getItem("login") ? localStorage.getItem("login") : '')
  const [password, setPassword] = useState(localStorage.getItem("password") ? localStorage.getItem("password") : '')
  const [isRememberMe, setIsRememberMe] = useState(false)
  const [counter, setCounter] = useState(0)

  const onFirstButton = () => {
    console.log("onClick", counter)
    setCounter(counter + 1)
  }

  const onSecondButton = () => {
    console.log("onClick", counter)
    setCounter(counter - 1)
  }

  const onSubmitForm = (event) => {
    event.preventDefault()
        
    if (login === "admin" && password === "admin") {
      alert("Success")
    } else {
      alert("Failed")
    }

    if (isRememberMe) {
      localStorage.setItem("login", login)
      localStorage.setItem("password", password)
    }
  }

  const onClearButton = () => {
    setLogin("")
    setPassword("")
  }

  return (
    <div className="lab1-template">
      <h1>Балаев Кирилл</h1>

      <button 
        onClick={onFirstButton}
        className="lab1-template__button" 
        type="button"                    
      >
        Click me
      </button>

      <span className="lab1-template__counter">{ counter }</span>

      <button 
        onClick={onSecondButton}
        className="lab1-template__button" 
        type="button"                     
      >
        Click me 2
      </button>

      <form className="lab1-template__form" onSubmit={onSubmitForm}>
        <input 
          value={login}
          onChange={e => setLogin(e.target.value)}
          className="lab1-template__input"
          type="text" 
          name="login" 
          placeholder="login" 
        />
        <input 
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="lab1-template__input" 
          type="password" 
          name="password"
          placeholder="password" 
        />

        <div className="lab1-template__buttons">
          <button 
            className="lab1-template__button"
            type="submit"
          >
            Send
          </button>

          <button 
            onClick={onClearButton} 
            className="lab1-template__button" 
            type="reset"
          >
            Clear
          </button>
        </div>

        <div>
          <input 
            value={isRememberMe}
            onChange={e => setIsRememberMe(e.target.checked)}
            className="lab1-template__input" 
            type="checkbox" 
            name="rememberMe"
            id="rememberMe"
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
      </form>
    </div>
  )
}

export default Lab1
import { Formik, Field, Form, } from "formik"
import { useCallback } from 'react'

const Lab5 = () => {
  const handleSubmit = useCallback((values, { setSubmitting }) => {
    if (values.login === "admin" && values.password === "admin") {
      alert("Success")
    } else {
      alert("Failed")
    }

    if (values.isRememberMe) {
      localStorage.setItem("login", values.login)
      localStorage.setItem("password", values.password)
    }
    setSubmitting(false)
  }, [])

  const handleReset = useCallback((values) => {
    values.login = ""
    values.password = ""
    values.isRememberMe = false
  }, [])

  return (
    <Formik
      initialValues={{
        login: localStorage.getItem("login") ? localStorage.getItem("login") : '',
        password: localStorage.getItem("password") ? localStorage.getItem("password") : '',
        isRememberMe: false
      }}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {
        (
          {
            resetForm
          }
        ) => (
          <Form className="lab5-form">
            <div className="form-group">
              <Field
                type="text"
                name="login"
                className="form-control"
                placeholder="login"
              />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="password"
              />
            </div>
            <div className="form-group">
              <Field
                className="form-control"
                type="checkbox"
                name="isRememberMe"
                id="rememberMe2"
              />
              <label htmlFor="rememberMe2">Remember me</label>
            </div>
            <div className="form-group buttons">
              <button type="button" onClick={resetForm}>Clear</button>
              <button type="reset">Clear2</button>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )
      }
    </Formik>
  )
}

export default Lab5
import { createContext, useState } from "react";
const RegisterContext = createContext(null)

export const RegisterProvider = ({ children }) => {
  const [formData, setFromData] = useState({
    email: "",
    phoneNum: 0,
    username: "",
    displayUsername: "",
    password: "",
    birthday: ""
  })

  const editRegisterInfo = (value) => {
    setFromData(value)
  }

  return (
    <RegisterContext.Provider
      value={{ data: formData, editRegisterInfo }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export const RegisterConsumer = RegisterContext.Consumer

export default RegisterContext

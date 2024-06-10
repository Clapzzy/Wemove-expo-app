import { createContext, useState } from "react";
const MainContext = createContext(null)

export const MainProvider = ({ children }) => {
  const [Data, setData] = useState({
    currentPicUrl: "",
  })

  const editInfo = (value) => {
    setData(value)
  }

  return (
    <MainContext.Provider
      value={{ data: Data, editInfo }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainConsumer = MainContext.Consumer

export default MainContext

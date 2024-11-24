import { createContext, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
const MainContext = createContext(null)

export const MainProvider = ({ children }) => {
  const [Data, setData] = useState({
    currentPicUrl: "",
  })
  const sharedAnimatedValue = useSharedValue(0)

  const editInfo = (value) => {
    setData(value)
  }

  return (
    <MainContext.Provider
      value={{ data: Data, editInfo, sharedAnimatedValue: sharedAnimatedValue }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainConsumer = MainContext.Consumer

export default MainContext

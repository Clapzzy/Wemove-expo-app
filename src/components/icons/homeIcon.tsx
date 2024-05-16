import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HomeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    color={props.color}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M13.11 1.24a2 2 0 0 0-2.22 0l-10 6.666A2 2 0 0 0 0 9.57V22.5a2 2 0 0 0 2 2h3.5a2 2 0 0 0 2-2v-5.333a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2V22.5a2 2 0 0 0 2 2H22a2 2 0 0 0 2-2V9.57a2 2 0 0 0-.89-1.664l-10-6.666Z"
    />
  </Svg>
)
export default HomeIcon

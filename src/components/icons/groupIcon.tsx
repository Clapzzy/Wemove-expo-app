import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const GroupIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={23}
    color={props.color}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M2.344 23a2 2 0 0 1-2-2v-2.025c0-.815.21-1.563.629-2.246a4.192 4.192 0 0 1 1.67-1.563 21.344 21.344 0 0 1 4.529-1.671 19.78 19.78 0 0 1 4.672-.557c1.581 0 3.138.185 4.672.556 1.533.372 3.042.929 4.528 1.672.694.359 1.252.88 1.67 1.563a4.21 4.21 0 0 1 .63 2.246V21a2 2 0 0 1-2 2h-19Zm25.875 0a2 2 0 0 1-2-2v-2.313c0-1.054-.294-2.066-.88-3.036-.45-.742.126-2.027.952-1.761 1.078.347 2.084.772 3.018 1.276.863.479 1.522 1.012 1.977 1.599.455.587.683 1.228.683 1.922V21a2 2 0 0 1-2 2h-1.75ZM11.844 11.5c-1.582 0-2.935-.563-4.061-1.69-1.126-1.125-1.69-2.479-1.69-4.06 0-1.581.564-2.935 1.69-4.06C8.909.562 10.263 0 11.843 0c1.582 0 2.936.563 4.062 1.69 1.126 1.125 1.689 2.479 1.689 4.06 0 1.581-.563 2.935-1.69 4.06-1.125 1.127-2.479 1.69-4.06 1.69Zm14.375-5.75c0 1.581-.563 2.935-1.69 4.06-1.125 1.127-2.479 1.69-4.06 1.69-.264 0-.6-.03-1.007-.09-.473-.07-.655-.619-.391-1.018.356-.541.649-1.118.877-1.731a8.286 8.286 0 0 0 .52-2.911 8.286 8.286 0 0 0-.52-2.91 8.526 8.526 0 0 0-.872-1.724C18.8.698 18.964.107 19.462.054 19.798.018 20.133 0 20.47 0c1.581 0 2.935.563 4.06 1.69 1.127 1.125 1.69 2.479 1.69 4.06Zm-23 13.225c0 .635.515 1.15 1.15 1.15h14.95a1.15 1.15 0 0 0 1.15-1.15 1.399 1.399 0 0 0-.719-1.222 18.742 18.742 0 0 0-3.917-1.455 16.672 16.672 0 0 0-7.978 0 18.74 18.74 0 0 0-3.918 1.455 1.398 1.398 0 0 0-.718 1.222Zm8.625-10.35c.79 0 1.467-.282 2.03-.845.563-.563.845-1.24.845-2.03 0-.79-.282-1.467-.845-2.03a2.768 2.768 0 0 0-2.03-.845c-.79 0-1.468.282-2.03.845a2.768 2.768 0 0 0-.845 2.03c0 .79.281 1.467.844 2.03.563.563 1.24.845 2.03.845Z"
    />
  </Svg>
)
export default GroupIcon
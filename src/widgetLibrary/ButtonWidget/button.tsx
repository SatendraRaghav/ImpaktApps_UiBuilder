import { FC, useCallback, useEffect } from "react"
import Button from '@mui/material/Button';

import { ButtonWidgetProps, WrappedButtonProps } from "./interface"

export const WrappedButton: FC<WrappedButtonProps> = (props) => {
  const {
    text,
    variant,
    // leftIcon,
    // rightIcon,
    // disabled,
    // loading,
    // colorScheme,
    // handleOnClick,
  } = props

  return (
   <Button
   variant={variant}
 
   sx={{height:"100%",width:"100%"}}
   >
   {text}
   </Button>
   
  )
}

WrappedButton.displayName = "WrappedButton"

export const ButtonWidget = () => {
// : FC<ButtonWidgetProps>
//   const {
//     text,
//     variant,
//     leftIcon,
//     rightIcon,
//     disabled,
//     loading,
//     colorScheme,
//     handleUpdateGlobalData,
//     handleDeleteGlobalData,
//     displayName,
//     tooltipText,
//     triggerEventHandler,
//   } = props

//   useEffect(() => {
//     handleUpdateGlobalData(displayName, {
//       text,
//       variant,
//       leftIcon,
//       rightIcon,
//       disabled,
//       loading,
//       colorScheme,
//     })
//     return () => {
//       handleDeleteGlobalData(displayName)
//     }
//   }, [
//     text,
//     variant,
//     leftIcon,
//     rightIcon,
//     disabled,
//     loading,
//     colorScheme,
//     handleUpdateGlobalData,
//     displayName,
//     handleDeleteGlobalData,
//   ])

//   const handleOnClick = useCallback(() => {
//     triggerEventHandler("click")
//   }, [triggerEventHandler])

  return ( 
    <WrappedButton variant="contained" text={"button"} handleOnClick={()=>console.log("click")}/>
//     <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
//       <div css={buttonLayoutStyle}>
//         <WrappedButton {...props} handleOnClick={handleOnClick} />
//       </div>
//     </TooltipWrapper>
  )
}

ButtonWidget.displayName = "ButtonWidget"

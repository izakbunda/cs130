import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton(props) {
  const navigate = useNavigate() // For navigation

  const navigateTo = props.navigateTo

  //   const handleBack = () => {
  //     if (window.electronAPI) {
  //       window.electronAPI.navigateBack()
  //     } else {
  //       console.error('electronAPI is not available')
  //     }
  //   }

  return (
    // <button
    //   onClick={() => {
    //     navigate(navigateTo)
    //   }}
    // >
    //   {navigateTo}
    // </button>
    <></>
  )
}

export default BackButton

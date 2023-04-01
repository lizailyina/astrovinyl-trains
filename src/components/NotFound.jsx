import React from 'react'
import IMG from '../assets/NotFound.png'
import { TfiFaceSad } from 'react-icons/tfi'

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={IMG} alt="" />
      <h1> Sorry, no trains found <TfiFaceSad /></h1>
      <p> Please, try to change your filter settings. </p>
    </div>
  )
}

export default NotFound
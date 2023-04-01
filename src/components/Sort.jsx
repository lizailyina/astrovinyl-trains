import React from 'react'
import { useSelector } from 'react-redux'
import { AiFillFilter } from 'react-icons/ai'

const Sort = () => {

  return (
    <div className='sort'>
      <h2>Filter</h2>
      <AiFillFilter size={24} />
    </div>
  )
}

export default Sort
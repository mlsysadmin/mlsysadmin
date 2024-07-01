import { Input } from 'antd';
import React from 'react'

const RoundInput = ({ placeholder, style, classname }) => {
  return (
    <Input placeholder={placeholder} style={style} className={classname}/>
  )
}

export default RoundInput;
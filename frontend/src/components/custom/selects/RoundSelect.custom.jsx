import { Select } from 'antd';
import React from 'react'

const RoundSelect = ({ options, placeholder, size, style, classname, suffixIcon }) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      size={size}
      style={style}
      className={classname}
      suffixIcon={suffixIcon}
    />
  )
}

export default RoundSelect;
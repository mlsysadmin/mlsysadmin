import { Button } from 'antd'
import React from 'react'

const SemiRoundBtn = ({ label, style, className, type, icon, size, handleClick }) => {
  return (
    <Button type={type} shape='default' className={className} icon={icon} size={size}
                style={style} onClick={handleClick}
    >
       {label}
    </Button>
  )
}

export default SemiRoundBtn;
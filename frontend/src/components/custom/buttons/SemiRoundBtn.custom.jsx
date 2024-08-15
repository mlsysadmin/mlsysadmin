import { Button } from 'antd'
import React from 'react'

const SemiRoundBtn = ({ label, style, className, type, icon, size, handleClick, disabled }) => {
  return (
    <Button type={type} shape='default' className={className} icon={icon} size={size}
                style={style} onClick={handleClick} disabled={disabled}
    >
       {label}
    </Button>
  )
}

export default SemiRoundBtn;
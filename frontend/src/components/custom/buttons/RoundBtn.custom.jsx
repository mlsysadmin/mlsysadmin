import { Button } from 'antd';
import React from 'react';

const RoundBtn = ({ label, style, className, type, icon, size}) => {
  return (
    <Button type={type} shape='round' className={className} icon={icon}
                style={style} size={size}
    >
       {label}
    </Button>
  )
}

export default RoundBtn
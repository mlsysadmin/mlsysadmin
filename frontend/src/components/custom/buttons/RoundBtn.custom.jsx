import { Button } from 'antd';
import React from 'react';

const RoundBtn = ({ label, style, className, type}) => {
  return (
    <Button type={type} shape='round' className={className} 
                style={style}
    >
       {label}
    </Button>
  )
}

export default RoundBtn
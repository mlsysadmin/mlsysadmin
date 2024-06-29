import { Popover } from 'antd'
import React from 'react'

const MenuPopup = ({ label, popUpOpen, handleOpenChange, content, title }) => {
  return (
    <Popover
        placement="bottomLeft"
        arrow={false}
        content={content}
        title={title}
        trigger="click"
        open={popUpOpen}
        // onOpenChange={handleOpenChange}
        >
        <div type='text' className={`rent-menu--btn`}>{label}</div>
    </Popover>
  )
}

export default MenuPopup
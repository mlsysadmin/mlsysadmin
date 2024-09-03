import { Select } from 'antd';
import React, { Children } from 'react'

const RoundSelect = ({
	options,
	placeholder,
	size,
	style,
	classname,
	suffixIcon,
	children,
}) => {
	return (
		<Select
			options={options}
			placeholder={placeholder}
			size={size}
			style={style}
			className={classname}
			suffixIcon={suffixIcon}
		>
      {children}
    </Select>
	);
};

export default RoundSelect;
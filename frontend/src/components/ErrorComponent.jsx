import { Button, Result } from "antd";
import React from "react";

const Error = () => {
    return (
        <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        style={{ marginTop: '5em' }}
        extra={<Button>Back Home</Button>}
      />
    )
}

export default Error;
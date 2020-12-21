import React, { Component } from 'react'

// antd.css都加载
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'

import { Button } from 'antd'

export default class AntdTest extends Component {
  render() {
    return (
      <div>
        <Button type="primary">提交</Button>
      </div>
    )
  }
}

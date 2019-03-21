import React from 'react';
import {  DatePicker, message } from 'antd';

// TODO use less
import 'antd/dist/antd.css'
class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = (date:any) => {
    message.info(`您选择的日期是: ${date.format('YYYY-MM-DD')}`);
    this.setState({ date });
  }
  render() {
    const { date } = this.state;
    return (
        <div>
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
            当前日期：{date ? (date as any).format('YYYY-MM-DD') : '未选择'}
          </div>
        </div>
    );
  }
}
export default App;
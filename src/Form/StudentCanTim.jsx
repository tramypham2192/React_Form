import React, { Component } from 'react'

export default class StudentCanTim extends Component {
  render() {
    const {studentCanTim, arrStudent} = this.props;
    return (
        <table className='table'>
        <thead className='bg-dark text-white'>
            <tr>
                <th>Ma SV</th>
                <th>So dien thoai</th>
                <th>Ho ten</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{studentCanTim.maSV}</td>
                <td>{studentCanTim.soDienThoai}</td>
                <td>{studentCanTim.hoTen}</td>
                <td>{studentCanTim.email}</td>
            </tr>
        </tbody>
      </table>
    )
  }
}

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa } from "@fortawesome/free-solid-svg-icons";

export default class TableStudent extends Component {
  render() {
    const { arrStudent,handleDelStudent,handleEditStudent } = this.props;
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
            {arrStudent.map(({maSV, soDienThoai, hoTen, email}, index) => {
                return <tr key={index}>
                    <td>{maSV}</td>
                    <td>{soDienThoai}</td>
                    <td>{hoTen}</td>
                    <td>{email}</td>
                    <td>
                        <button className='btn btn-danger' onClick={() => {
                            this.props.handleDelStudent(maSV);
                        }}>
                            <i className='fa fa-trash'></i>
                        </button>
                        <button onClick={() => {
                            let studentEdit = {maSV, soDienThoai, hoTen, email}
                            this.props.handleEditStudent(studentEdit)
                        }} className='btn btn-primary mx-2'>
                            <i className='fa fa-edit'></i>
                        </button>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    )
  }
}

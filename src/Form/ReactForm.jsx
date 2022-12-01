import React, { Component } from 'react'
import TableStudent from './TableStudent';
import StudentCanTim from './StudentCanTim';

export default class ReactForm extends Component {
  state = {
    formValue: {
        maSV: '',
        soDienThoai: '',
        hoTen: '',
        email: ''
    },
    formError: {
        maSV: '',
        soDienThoai: '',
        hoTen: '',
        email: '',
    },
    valid: false,
    arrStudent: [
    ],
    studentCanTim: {
        maSV: '',
        soDienThoai: '',
        hoTen: '',
        email: ''
    }
  } 
  checkFormValid = () => {
    //return true | false : true khi form hợp lệ, false khi form không hợp lệ
    /*
        form hợp lệ khi: Các trường formError = rỗng, và các trường value tưng ứng phải khác rỗng 
    */
    let { formError, formValue } = this.state;
    for (let key in formError) {
        if (formError[key] !== '' || formValue[key] === '') {
            return false;
        }
    }
    return true;
  }
  handleChangeInput = (e) => {
    /*
        Trên 1 thẻ html sẽ có 2 dạng thuộc tính
        properties : là các thuộc tính có sẵn của thẻ như id, className,name, value,style ...
        attribute (thuộc tính mở rộng): Do mình thêm vào -> không thể dùng dom.thuocTinh => dom.getAttribute('tenAttribute');        
    */

    let { value, name } = e.target; //image, '' | abc
    let dataType = e.target.getAttribute('data-type');
    let dataMaxLength = e.target.getAttribute('data-max-length');
    //Lấy object form value ra xử lý riêng
    let newFormValue = this.state.formValue;
    //dynamic key
    newFormValue[name] = value;

    /*Xử lý cho formError */
    let newFromError = this.state.formError;
    let message = '';
    if (value.trim() === '') {
        message = name + ' cannot be blank !';
    } else {
        if (dataType == 'number') {
            let regexNumber = /^\d+(,\d{1,2})?$/;
            if (!regexNumber.test(value)) {
                message = name + ' is invalid!';
            }
        }
        if (dataMaxLength !== null && value.length > dataMaxLength) {
            message = name + ` no more than  ${dataMaxLength} character !`;
        }
        // if(dataType == 'email') 
        // {

        // }
    }
    newFromError[name] = message;
    //setState
    this.setState({
        formValue: newFormValue,
        formError: newFromError
    }, () => {

        //Gọi hàm check lỗi sau mỗi lần cập nhật value và error từ người dùng nhập
        this.setState({
            valid: this.checkFormValid()
        })
    })


    console.log(name, value);
  }
  handleSubmit = (e) => {
    //Ngăn sự kiện reload browser
    e.preventDefault();
    if (!this.checkFormValid()) {
        alert('Form is invalid!');
        return; //Nếu form không hợp lệ => không submit
    }
    //Thêm sản phẩm vào arrProduct => cập nhật state arrProduct
    let arrStudent = this.state.arrStudent;
    let newStudent = { ...this.state.formValue };
    arrStudent.push(newStudent);
    //arrPrudct = [{001},{002},{003},{003}]
    this.setState({
        arrStudent: arrStudent
    })
    // console.log('submit',this.state.formValue);
  }
  handleDelStudent = (idClick) => {
    //Lấy ra các sản phẩm có mã khác sản phẩm mình xoá
    let arrStudent = this.state.arrStudent.filter(student => student.maSV !== idClick);
    //Cập nhật lại state
    this.setState({
        arrStudent: arrStudent
    })
  }
  
  handleUpdateStudent = () => {
    //Tìm ra sản phẩm chứa mã tương đương formValue.id
    let { arrStudent, formValue } = this.state;
    let studentUpdate = arrStudent.find(student => student.maSV === formValue.maSV);

    if (studentUpdate) {
        for (let key in studentUpdate) {
            if (key !== 'maSV') {
                studentUpdate[key] = formValue[key];
            }
        }
    }

    //Cập nhật lại state sau khi chỉnh sửa
    this.setState({
        arrStudent: arrStudent
    })

   }
   handleEditStudent = (studentClick) => {
    //Click vào product nào thì state của formvalue sẽ thay đổi giá trị thành product đó
    this.setState({
        formValue: studentClick
    }, () => {
        this.setState({
            valid: this.checkFormValid()
        })
    })

  }
  timStudentTheoMaSV = (e) => {
    let timer;
    clearTimeout(timer);
    // Sets new timer that may or may not get cleared
    // timer = setTimeout(() => {
    //     let maSVcanTim = e.target.value;
    //     console.log("ma sv can tim: " + maSVcanTim)
    //     let { arrStudent, formValue } = this.state;
    //     let studentTimDuoc = arrStudent.find(student => student.maSV == maSVcanTim);
    //     //Cập nhật lại state sau khi chỉnh sửa
    //     this.setState({
    //         studentCanTim: studentTimDuoc
    //     })
    // }, 1000);
    let maSVcanTim = e.target.value;
    console.log("ma sv can tim: " + maSVcanTim)
    let { arrStudent, formValue } = this.state;
    let studentTimDuoc = arrStudent.filter(student => student.maSV == maSVcanTim);
    console.log(studentTimDuoc)
    //Cập nhật lại state sau khi chỉnh sửa
    this.setState({
        studentCanTim: studentTimDuoc[0]
    })
  }
  render() {
    let {formValue} = this.state;
    return (
      <>
        <form className='container' onSubmit={this.handleSubmit}>
            <div className='card'>
                <div className='card-header'>Thong tin sinh vien</div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='form-group'>
                                <p>Ma sinh vien</p>
                                <input value={formValue.maSV} data-max-length="6" className='form-control' name="maSV" onInput={this.handleChangeInput} />
                                {this.state.formError.maSV && <div className='alert alert-danger mt-2'>{this.state.formError.maSV}</div>}
                            </div>
                            <div className='form-group'>
                               <p>So dien thoai</p>
                               <input value={formValue.soDienThoai} className='form-control' name="soDienThoai" onInput={this.handleChangeInput} />
                               {this.state.formError.soDienThoai && <div className='alert alert-danger mt-2'>{this.state.formError.soDienThoai}</div>}
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='form-group'>
                                <p>Ho ten</p>
                                <input value={formValue.hoTen} className='form-control' name='hoTen' onInput={this.handleChangeInput} />
                                {this.state.formError.hoTen && <div className='alert alert-danger mt-2'>{this.state.formError.hoTen}</div>}
                            </div>
                            <div className='form-group'>
                                <p>Email</p>
                                <input value={formValue.email} className='form-control' name='email' onInput={this.handleChangeInput} />
                                {this.state.formError.email && <div className='alert alert-danger mt-2'>{this.state.formError.email}</div>}
                            </div>
                            <div className='form-group'>
                                <p>Ma SV cua sinh vien can tim</p>
                                <input className='form-control' name='maSVcanTim' onInput={this.timStudentTheoMaSV} />
                                {this.state.formError.maSV && <div className='alert alert-danger mt-2'>{this.state.formError.maSV}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <button type='submit' className='btn btn-success m-2' disabled={!this.state.valid}>Create</button>
                    <button type='button' className='btn btn-success m-2' disabled={!this.state.valid} onClick={() => {this.handleUpdateStudent()}}>Edit</button>
                </div>
            </div>
        </form>
        <div className='container mt-2'>
            <TableStudent handleEditStudent={this.handleEditStudent} arrStudent={this.state.arrStudent} handleDelStudent={this.handleDelStudent} />
            <StudentCanTim studentCanTim={this.state.studentCanTim} />
        </div>
      </>
    )
  }
}
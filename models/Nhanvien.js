// Mảng chứa danh sách nhân viên
let listNhanVien = []

// Constructor Nhân viên
function Nhanvien() {
  this.taiKhoan = document.querySelector('#tknv').value
  this.hoTen = document.querySelector('#name').value
  this.email = document.querySelector('#email').value
  this.matKhau = document.querySelector('#password').value
  this.ngayLam = document.querySelector('#datepicker').value
  this.luongCoBan = document.querySelector('#luongCB').value
  this.chucVu = document.querySelector('#chucvu').value
  this.gioLam = document.querySelector('#gioLam').value
  this.tongLuong = function () {
    if (this.chucVu === 'Giám Đốc') {
      return this.luongCoBan * 3
    } else if (this.chucVu === 'Trưởng Phòng') {
      return this.luongCoBan * 2
    } else if (this.chucVu === 'Nhân Viên') {
      return this.luongCoBan * 1
    } else {
      return 'Vui lòng chọn chức vụ'
    }
  }
  this.xepLoai = function () {
    switch (true) {
      case this.gioLam < 160:
        return 'Nhân viên trung bình'
      case this.gioLam < 176:
        return 'Nhân viên khá'
      case this.gioLam < 192:
        return 'Nhân viên giỏi'
      case this.gioLam >= 192:
        return 'Nhân viên xuất sắc'
    }
  }
}

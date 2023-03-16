// Gán chức năng cho nút thêm nhân viên
document.querySelector('#btnThemNV').onclick = function () {
  // Tạo đối tượng nhân viên mới
  let nhanVien = addNhanVien()

  // Kiểm tra các thông báo lỗi, nếu có sẽ dừng không duyệt thêm nhân viên
  if (nhanVien.chucVu === 'Chọn Chức Vụ') {
    document.querySelector('#tbChucVu').innerHTML = 'Vui lòng chọn chức vụ'
    document.querySelector('#tbChucVu').style.display = 'block'
    return
  } else {
    document.querySelector('#tbChucVu').innerHTML = ''
    document.querySelector('#tbChucVu').style.display = 'none'
  }
  if (validationDone) {
    let errorElement = document.querySelectorAll('.sp-thongbao')
    for (let i = 0; i < errorElement.length; i++) {
      if (errorElement[i].innerHTML !== '') {
        return
      }
    }

    // thêm nhân viên mới vào mảng sau khi kiểm tra
    listNhanVien.push(nhanVien)

    // in mảng ra giao diện
    document.querySelector('#tableDanhSach').innerHTML =
      renderString(listNhanVien)
  }
}

// Gán chức năng cho nút đóng form input
document.querySelector('#btnDong').onclick = function () {
  document.querySelector('#btnThemNV').disabled = false
  document.querySelector('#tknv').disabled = false
}

// Gán chức năng tìm kiếm theo xếp loại cho input search
document.querySelector('#searchName').oninput = function () {
  let keyword = document.querySelector('#searchName').value
  let keywordAscent = removeAscent(keyword)
  let listNhanVienSearch = []
  for (let i = 0; i < listNhanVien.length; i++) {
    if (removeAscent(listNhanVien[i].xepLoai()).search(keywordAscent) !== -1) {
      listNhanVienSearch.push(listNhanVien[i])
    }
  }
  document.querySelector('#tableDanhSach').innerHTML =
    renderString(listNhanVienSearch)
}

// Gọi các phương thức của đối tượng Validation để kiểm tra dữ liệu nhập vào
Validation({
  button: '#btnThemNV',
  form: '.modal-body form',
  errorSelector: '.sp-thongbao',
  rules: [
    Validation.isRequired('#tknv'),
    Validation.isNumber('#tknv'),
    Validation.isMinLength('#tknv', 4),
    Validation.isMaxLength('#tknv', 6),
    Validation.isRequired('#name'),
    Validation.isLetter('#name'),
    Validation.isRequired('#email'),
    Validation.isEmail('#email'),
    Validation.isRequired('#password'),
    Validation.isPassword('#password'),
    Validation.isMinLength('#password', 6),
    Validation.isMaxLength('#password', 10),
    Validation.isRequired('#datepicker'),
    Validation.isDate('#datepicker'),
    Validation.isRequired('#luongCB'),
    Validation.isNumber('#luongCB'),
    Validation.isMinValue('#luongCB', 1000000),
    Validation.isMaxValue('#luongCB', 20000000),
    Validation.isRequired('#gioLam'),
    Validation.isNumber('#gioLam'),
    Validation.isMinValue('#gioLam', 80),
    Validation.isMaxValue('#gioLam', 200),
  ],
})

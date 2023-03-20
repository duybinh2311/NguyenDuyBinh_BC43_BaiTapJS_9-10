/* ------- ĐỊNH NGHĨA CÁC HÀM XỬ LÝ TÍNH NĂNG  --------- */
// Thêm nhân viên mới
function addNhanVien() {
  const newNhanVien = new Nhanvien()
  return newNhanVien
}

// Render danh sách nhân viên ra string
function renderString(listNhanVien) {
  let htmlString = ''
  for (let i = 0; i < listNhanVien.length; i++) {
    const nhanVien = listNhanVien[i]
    htmlString += `  <tr>
      <td>${nhanVien.taiKhoan}</td>
      <td>${nhanVien.hoTen}</td>
      <td>${nhanVien.email}</td>
      <td>${nhanVien.ngayLam}</td>
      <td>${nhanVien.chucVu}</td>
      <td>${nhanVien.tongLuong().toLocaleString()}</td>
      <td>${nhanVien.xepLoai()}</td>
      <td>
        <button class="btn btn-primary" id="editNhanVien" onclick="editNhanVien('${
          nhanVien.taiKhoan
        }', '${nhanVien.hoTen}', '${nhanVien.email}', '${nhanVien.matKhau}', '${
      nhanVien.ngayLam
    }', '${nhanVien.luongCoBan}', '${nhanVien.chucVu}', '${
      nhanVien.gioLam
    }', ${i})" data-toggle="modal" data-target="#myModal">Edit</button>
        <button class="btn btn-danger" id="deleteNhanVien" onclick="deleteNhanVien(${i})">Delete</button>
      </td>
    </tr>`
  }
  return htmlString
}

// Chỉnh sửa thông tin nhân viên
function editNhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam,
  index
) {
  document.querySelector('#tknv').value = taiKhoan
  document.querySelector('#name').value = hoTen
  document.querySelector('#email').value = email
  document.querySelector('#password').value = matKhau
  document.querySelector('#datepicker').value = ngayLam
  document.querySelector('#luongCB').value = luongCoBan
  document.querySelector('#chucvu').value = chucVu
  document.querySelector('#gioLam').value = gioLam
  document.querySelector('#btnThemNV').disabled = true
  document.querySelector('#tknv').disabled = true
  document.querySelector('#btnCapNhat').onclick = function () {
    const nhanVienEdit = new Nhanvien()
    listNhanVien[index].hoTen = nhanVienEdit.hoTen
    listNhanVien[index].email = nhanVienEdit.email
    listNhanVien[index].matKhau = nhanVienEdit.matKhau
    listNhanVien[index].ngayLam = nhanVienEdit.ngayLam
    listNhanVien[index].luongCoBan = nhanVienEdit.luongCoBan
    listNhanVien[index].chucVu = nhanVienEdit.chucVu
    listNhanVien[index].gioLam = nhanVienEdit.gioLam
    document.querySelector('#tableDanhSach').innerHTML =
      renderString(listNhanVien)
    document.querySelector('#btnThemNV').disabled = false
    document.querySelector('#tknv').disabled = false
  }
}

// Xóa nhân viên
function deleteNhanVien(index) {
  listNhanVien.splice(index, 1)
  document.querySelector('#tableDanhSach').innerHTML =
    renderString(listNhanVien)
}

// Bỏ dấu trước khi kiểm tra chuỗi
function removeAscent(str) {
  if (str === null || str === undefined) return str
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  return str
}


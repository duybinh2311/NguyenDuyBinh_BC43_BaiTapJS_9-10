// XÂY DỰNG CÁC CHỨC NĂNG
// Thêm nhân viên mới
function addNew() {
  let newNhanVien = new Nhanvien()
  return newNhanVien
}

// Render danh sách nhân viên ra string
function renderString(listNhanVien) {
  let htmlString = ''
  for (let i = 0; i < listNhanVien.length; i++) {
    let nhanVien = listNhanVien[i]
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
    let nhanVienEdit = new Nhanvien()
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

// Chuyển đổi string sang slug
function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  let slug = title.toLowerCase()

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
  slug = slug.replace(/đ/gi, 'd')
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ''
  )
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-')
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-')
  slug = slug.replace(/\-\-\-\-/gi, '-')
  slug = slug.replace(/\-\-\-/gi, '-')
  slug = slug.replace(/\-\-/gi, '-')
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@'
  slug = slug.replace(/\@\-|\-\@|\@/gi, '')
  return slug
}

// Gán chức năng cho nút thêm nhân viên
document.querySelector('#btnThemNV').onclick = function () {
  // thêm nhân viên mới vào mảng
  listNhanVien.push(addNew())

  // in mảng ra giao diện
  document.querySelector('#tableDanhSach').innerHTML =
    renderString(listNhanVien)
}

// Gán chức năng cho nút đóng
document.querySelector('#btnDong').onclick = function () {
  document.querySelector('#btnThemNV').disabled = false
  document.querySelector('#tknv').disabled = false
}

// Gán chức năng tìm kiếm theo xếp loại cho input search
document.querySelector('#searchName').oninput = function () {
  let keyWord = document.querySelector('#searchName').value
  let keyWordSlug = stringToSlug(keyWord)
  let listNhanVienSearch = []
  for (let i = 0; i < listNhanVien.length; i++) {
    if (stringToSlug(listNhanVien[i].xepLoai()).search(keyWordSlug) !== -1) {
      listNhanVienSearch.push(listNhanVien[i])
    }
  }
  document.querySelector('#tableDanhSach').innerHTML =
    renderString(listNhanVienSearch)
}

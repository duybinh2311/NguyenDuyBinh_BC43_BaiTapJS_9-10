// Đối tượng Validation
function Validation(object) {
  // Chứa function test của từng selector
  let functionTest = {}
  // Hàm thông báo lỗi lên giao diện
  function validate(inputElement, rule) {
    let errorElement = inputElement
      .closest('.form-group')
      .querySelector(object.errorSelector)
    let errorMessage
    let rules = functionTest[rule.selector]
    // Lặp qua từng function trong mảng để kiểm tra, nếu có lỗi thì dừng và thông báo lên giao diện
    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value)
      if (errorMessage) break
    }
    if (errorMessage) {
      errorElement.style.display = 'block'
      errorElement.innerHTML = errorMessage
    } else {
      errorElement.style.display = 'none'
      errorElement.innerHTML = ''
    }
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    inputElement.oninput = function () {
      errorElement.style.display = 'none'
      errorElement.innerHTML = ''
    }
  }
  // lấy ra form chứa các input
  let formElement = document.querySelector(object.form)
  // Duyệt qua từng phần tử trong rules của object truyền vào Validation
  if (formElement) {
    object.rules.forEach(function (rule) {
      let inputElement = formElement.querySelector(rule.selector)
      // Lấy ra các function test qua mỗi lân lặp, push vào mảng để kiểm tra
      if (Array.isArray(functionTest[rule.selector])) {
        functionTest[rule.selector].push(rule.test)
      } else {
        functionTest[rule.selector] = [rule.test]
      }
      if (inputElement) {
      // Thông báo nếu có lỗi khi người dùng ra khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule)
        }
      }
    })
  }
}

// Kiểm tra bắt buộc nhập vào
Validation.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? '' : `Vui lòng không bỏ trống trường này`
    },
  }
}

// Kiểm tra số
Validation.isNumber = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      regexNumber = /^[0-9]+$/
      return regexNumber.test(value) ? '' : `Giá trị nhập vào phải là số`
    },
  }
}

// Kiểm tra kí tự
Validation.isLetter = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      regexLetter = /^[A-Z a-z]+$/
      return regexLetter.test(value) ? '' : `Giá trị nhập vào phải là kí tự`
    },
  }
}

// Kiểm tra định dạng email
Validation.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      return regexEmail.test(value) ? '' : `Email không hợp lệ`
    },
  }
}

// Kiểm tra định dạng ngày
Validation.isDate = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      regexDate = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
      return regexDate.test(value) ? '' : `Định dạng ngày phải là mm/dd/yyyy`
    },
  }
}

// Kiểm tra định dạng password
Validation.isPassword = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      // Chứa ít nhất một số, chữ in hoa và kí tự đặc biệt
      regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      return regexPassword.test(value)
        ? ''
        : 'Mật khẩu cần ít nhất một kí tự hoa, đặc biệt và số'
    },
  }
}

// Kiểm tra tối thiểu kí tự
Validation.isMinLength = function (selector, minLength) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= minLength
        ? ''
        : `Giá trị nhập vào tối thiểu ${minLength} kí tự`
    },
  }
}

// Kiểm tra tối đa kí tự
Validation.isMaxLength = function (selector, maxLength) {
  return {
    selector: selector,
    test: function (value) {
      return value.length <= maxLength
        ? ''
        : `Giá trị nhập vào tối đa ${maxLength} kí tự`
    },
  }
}

// Kiểm tra giá trị tối thiểu
Validation.isMinValue = function (selector, minValue) {
  return {
    selector: selector,
    test: function (value) {
      return value >= minValue ? '' : `Giá trị nhập vào không hợp lệ`
    },
  }
}

// Kiểm tra giá trị tối đa
Validation.isMaxValue = function (selector, maxValue) {
  return {
    selector: selector,
    test: function (value) {
      return value <= maxValue ? '' : `Giá trị nhập vào không hợp lệ`
    },
  }
}

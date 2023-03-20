let validationDone = false
function Validation(object) {
  const functionTest = {}
  function validate(inputElement, rule) {
    const errorElement = inputElement
      .closest('.form-group')
      .querySelector(object.errorSelector)
    let errorMessage
    const rules = functionTest[rule.selector]
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
    inputElement.oninput = function () {
      errorElement.style.display = 'none'
      errorElement.innerHTML = ''
    }
  }
  const formElement = document.querySelector(object.form)
  const button = document.querySelector(object.button)
  if (formElement) {
    button.addEventListener('click', function () {
      object.rules.forEach(function (rule) {
        const inputElement = formElement.querySelector(rule.selector)
        validate(inputElement, rule)
        if (inputElement) {
          inputElement.onblur = function () {
            validate(inputElement, rule)
          }
        }
      })
      validationDone = true
    })
    object.rules.forEach(function (rule) {
      if (Array.isArray(functionTest[rule.selector])) {
        functionTest[rule.selector].push(rule.test)
      } else {
        functionTest[rule.selector] = [rule.test]
      }
    })
  }
}

/* ------- ĐỊNH NGHĨA CÁC HÀM KIỂM TRA THÔNG QUA ĐỐI TƯỢNG VALIDATION --------- */
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
      const regexNumber = /^[0-9]+$/
      return regexNumber.test(value) ? '' : `Giá trị nhập vào phải là số`
    },
  }
}

// Kiểm tra kí tự
Validation.isLetter = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexLetter = /^[A-Z a-z]+$/
      return regexLetter.test(removeAscent(value))
        ? ''
        : `Giá trị nhập vào phải là kí tự`
    },
  }
}

// Kiểm tra định dạng email
Validation.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      return regexEmail.test(value) ? '' : `Email nhập vào không hợp lệ`
    },
  }
}

// Kiểm tra định dạng ngày
Validation.isDate = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexDate =
        /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
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
      const regexPassword =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      return regexPassword.test(value)
        ? ''
        : `Mật khẩu cần ít nhất một kí tự hoa, số và kí tự đặc biệt`
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
      return value >= minValue
        ? ''
        : `Giá trị nhập vào tối thiểu là ${minValue.toLocaleString()}`
    },
  }
}

// Kiểm tra giá trị tối đa
Validation.isMaxValue = function (selector, maxValue) {
  return {
    selector: selector,
    test: function (value) {
      return value <= maxValue
        ? ''
        : `Giá trị nhập vào tối thiểu là ${maxValue.toLocaleString()}`
    },
  }
}

// Kiểm tra chức vụ
document.querySelector('#chucvu').onchange = function () {
  const optionCheck = document.querySelector('#chucvu').value
  if (optionCheck === 'Chọn Chức Vụ') {
    document.querySelector('#tbChucVu').innerHTML = 'Vui lòng chọn chức vụ'
    document.querySelector('#tbChucVu').style.display = 'block'
  } else {
    document.querySelector('#tbChucVu').innerHTML = ''
    document.querySelector('#tbChucVu').style.display = 'none'
  }
}

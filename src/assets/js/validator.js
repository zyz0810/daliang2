// 验证密码
export function validatePassword (rule, value, callback) {
  const reg = /^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>\/?~！@#￥%……&*（）――+|{}【】‘；：”“'。，、？]){6,20}$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入6-20位的密码'))
    } else {
      callback()
    }
  }
}

//验证两位小数
export function validateTwoFloat (rule, value, callback) {
  const reg = /^(\d+|\d+\.\d{1,2})$/
  if (value == '' || value == undefined || value == null) {
	  callback()
  } else {
	  if (!reg.test(value)) {
	    callback(new Error('请输入正确两位小数'))
	  } else {
	    callback()
	  }
  }
}

/* 是否手机号码 */
export function validatePhone (rule, value, callback) {
  const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback()
    }
  }
}

// 验证身份证号
export function validateIdCard (rule, value, callback) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
	  callback(new Error('请输入正确的身份证号'))
    } else {
	  callback()
    }
  }
}

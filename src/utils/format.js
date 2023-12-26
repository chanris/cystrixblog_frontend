/*
 * @Description: 各种格式化转换
 * @Version: 0.0.1
 * @Autor: wubo
 * @Date: 2020-09-09 14:19:44
 * @LastEditors: wubo 13996437157@139.com
 * @LastEditTime: 2022-06-15 15:41:23
 * @FilePath: \nonCustodial-manager\src\utils\format.js
 * @text: 小小的我，大大的世界我也想去走走 可不可以。。。。
 */
export const formatDate = (row, column, cellValue, index) => {
	return cellValue ? cellValue.split(' ')[0] : ''
  }
  /**
   * 货币转换
   * @param {String, Number} number  要格式化的数字
   * @param {Number} decimal  保留几位小数
   * @param {String} currency  货币符号
   * @param {String} thousands  千分位符号
   * @param {String} unit  货币单位
   */
  export const numberFormat = (number, { decimal = 2, thousands = ',', currency = '￥', unit = '元' } = {}) => {
	const flag = isNaN(number)
	let v = Number(flag ? 0 : number).toFixed(decimal)
	flag && console.error(`The number(${number}) parameter cannot be converted to a number`)
	v = v.split('.')
	v[0] = v[0].replace(/\d{1,3}(?=(\d{3})+$)/g, `$&${thousands}`)
	v = [v.join('.')]
	v.unshift(currency)
	v.push(unit)
	return v.join('')
  }
  
  export function parseTime (time, cFormat) {
	if (arguments.length === 0) {
	  return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
	  date = time
	} else {
	  if (('' + time).length === 10) time = parseInt(time) * 1000
	  date = new Date(time)
	}
	const formatObj = {
	  y: date.getFullYear(),
	  m: date.getMonth() + 1,
	  d: date.getDate(),
	  h: date.getHours(),
	  i: date.getMinutes(),
	  s: date.getSeconds(),
	  a: date.getDay()
	}
	return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
	  let value = formatObj[key]
	  if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
	  if (result.length > 0 && value < 10) {
		value = '0' + value
	  }
	  return value || 0
	})
  }
  
  export function format (date, fmt) {
	var o = {
	  'M+': date.getMonth() + 1, // 月份
	  'd+': date.getDate(), // 日
	  'h+': date.getHours(), // 小时
	  'm+': date.getMinutes(), // 分
	  's+': date.getSeconds(), // 秒
	  'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
	  S: date.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) {
	  fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
	  if (new RegExp('(' + k + ')').test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
	  }
	}
	return fmt
  }
  
  export function formatTime (time, option) {
	time = +time * 1000
	const d = new Date(time)
	var now = Date.now()
  
	const diff = (now - d) / 1000
  
	if (diff < 30) {
	  return '刚刚'
	} else if (diff < 3600) { // less 1 hour
	  return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
	  return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
	  return '1天前'
	}
	if (option) {
	  return parseTime(time, option)
	} else {
	  return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
	}
  }
  
  /**
   * 时间格式化
   * @param {Object} time 时间
   * @param {Object} format
   * @param {Array} weekText
   */
  export function time (time, format, weekText) {
	if (!time) return time
  
	// 处理兼容格式 => yyyy/MM/dd hh:mm:ss
	if (typeof time === 'string') {
	  time = time.replace(/\.\d{3}\+\d{4}/, '').replace(/-/g, '/').replace('T', ' ')
	}
  
	const t = new Date(time)
  
	const zero = function (i) {
	  return (i < 10 ? '0' + i : i)
	}
  
	return format.replace(/yyyy|MM|dd|hh|mm|ss|week/g, function (a) {
	  let str = ''
	  switch (a) {
		case 'yyyy':
		  str = zero(t.getFullYear())
		  break
		case 'MM':
		  str = zero(t.getMonth() + 1)
		  break
		case 'mm':
		  str = zero(t.getMinutes())
		  break
		case 'dd':
		  str = zero(t.getDate())
		  break
		case 'hh':
		  str = zero(t.getHours())
		  break
		case 'ss':
		  str = zero(t.getSeconds())
		  break
		case 'week':
		  str = weekText ? weekText[t.getDay()] : t.getDay()
		  break
	  }
	  return str
	})
  }
  
  /**
   * 清理数据对象
   * @param {Object} d // 要清理的数据
   * @param {Array} el // 要排除的key
   * @param {Function} callback // 除了需要排除的数据，自定义清理方法
   * @returns Object
   */
  export function clearQueryParams (d, el = [], callback) {
	let excludeKeys = ['total']
	excludeKeys = excludeKeys.concat(el)
	const queryData = JSON.parse(JSON.stringify(d, (k, v) => {
	  if (excludeKeys.indexOf(k) !== -1) {
		return undefined
	  }
	  if (callback && typeof callback === 'function') {
		return callback(k, v)
	  }
	  // return !v && v !== 0 ? undefined : !v.toString() ? undefined : v
	  return typeof v !== 'boolean' && !v && v !== 0 ? undefined : !v.toString() ? undefined : v
	}))
	return queryData
  }
  export function tableIndexformat (i, d) {
	return (d.pageNum - 1) * d.pageSize + i + 1
  }
  
  export function standardToStamp (date) {
	const result = new Date(date).getTime()
	return result
  }
  
  export default {
	formatDate,
	numberFormat,
	parseTime,
	format,
	formatTime,
	time,
	clearQueryParams,
	tableIndexformat,
	standardToStamp
  }
  
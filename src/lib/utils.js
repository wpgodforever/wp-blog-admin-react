// 一些常用的工具方法

// 获取字符串中 Query
export const getQueryString = function (name, string = location.href) {
  // console.log('getQueryString -- name', name)
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var arr = string.split('?')
  var query = arr[arr.length - 1]
  var r = query.match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 判断是否为空
export const isEmpty = function (val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

// 处理换行符
export const handleWrap = value => {
  if (!value) return
  return value.replace(/\r|\n/g, '<br>')
}

// get方法组合参数
export const concatPramas = function (config) {
  let url = config.url + '?'
  for (const propName of Object.keys(config.params)) {
    const value = config.params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        if (config.sameParam) {
          url += value.map(item => `${propName}=${item}`).join('&') + '&'
        } else {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            url += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        url += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return (url = url.slice(0, -1))
}

// 下载图片
export function downloadQrcode(codeCanvas, name) {
  let canvas = codeCanvas
  let url = canvas.toDataURL('image/png') //得到图片的base64编码数据
  let a = document.createElement('a') // 生成一个a元素
  let event = new MouseEvent('click') // 创建一个单击事件
  a.download = name || 'photo' // 设置图片名称
  a.href = url // 将生成的URL设置为a.href属性
  a.dispatchEvent(event) // 触发a的单击事件
}

// 图片打印 srcs-图片链接数组
export function imgToPrint(srcs) {
  const nodes = []
  Promise.all(
    srcs.map((src, index) => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.onload = () => {
          const div = document.createElement('div')
          div.appendChild(img.cloneNode(true))
          resolve(div.cloneNode(true))
        }
      }).then(ele => {
        nodes[index] = ele
      })
    })
  ).then(() => {
    const iframe = document.createElement('iframe'),
      iframeStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'hidden',
      },
      iframeBodyStyle = { margin: 0 }

    Object.keys(iframeStyle).forEach(i => (iframe.style[i] = iframeStyle[i]))

    document.body.appendChild(iframe)

    const _document =
      iframe.contentWindow && iframe.contentWindow.document
        ? iframe.contentWindow.document
        : null

    if (_document) {
      const _body = _document.getElementsByTagName('body')[0]
      if (_body) {
        Object.keys(iframeBodyStyle).forEach(
          i => (_body.style[i] = iframeBodyStyle[i])
        )

        nodes.forEach(ele => {
          _body.appendChild(ele)
        })

        iframe.contentWindow.print()
        document.body.removeChild(iframe)
      }
    } else {
      return new Error('打印失败！请检查浏览器是否支持iframe标签！')
    }
  })
}

// 将格林尼治时间转换为北京时间
export function timeTransform(time) {
  var date = new Date(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var s = date.getSeconds();
  s = s < 10 ? "0" + s : s;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
}
// 图片转base64
export function getBase64Image(img) {  
  var canvas = document.createElement("canvas");  
  canvas.width = img.width;  
  canvas.height = img.height;  
  var ctx = canvas.getContext("2d");  
  ctx.drawImage(img, 0, 0, img.width, img.height);  
  var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
  var dataURL = canvas.toDataURL("image/"+ext);  
  console.log(dataURL)
  return dataURL;  
} 

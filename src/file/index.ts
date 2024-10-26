export function formatFileSize(fileSize = 0) {
  if (fileSize === 0) {
    return '0 B';
  }

  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let size = fileSize * 1;
  let index = Math.floor(Math.log(size) / Math.log(1024));
  size = size / Math.pow(1024, index);
  return String(size.toFixed(2)) + unitArr[index];
}

/**
 * 获取URL中文件的扩展名
 *
 * @param {string} [url=''] - 要解析的URL字符串
 * @returns {string} 返回文件的扩展名（包括点号），如果没有扩展名则返回空字符串
 *
 * @description
 * 此函数接受一个URL字符串，并返回其中文件名的扩展名。
 * 它会处理以下情况：
 * 1. 从URL中提取文件名
 * 2. 移除文件名中的查询参数和哈希部分
 * 3. 提取扩展名（包括点号）
 *
 * 注意：
 * - 如果URL不包含文件名或扩展名，将返回空字符串
 * - 此函数不验证URL的有效性，仅基于字符串操作
 */
export function extname(url = '') {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
}

/**
 * 从文件名中提取文件类型和名称
 *
 * @param {string} fileName - 完整的文件名（可能包含路径）
 * @returns {{type: string, name: string}} 包含文件类型和名称的对象
 *
 * @example
 * getUrlFileNameAndType('path/to/file.txt')
 * 返回 { type: 'txt', name: 'file' }
 */
export function getUrlFileNameAndType(fileName: string) {
  return {
    type: extname(fileName),
    name: fileName.replace(/(.*\/)*([^.]+).*/gi, '$2'),
  };
}

/**
 * 获取文件详细信息
 */
export function parseFileDetail(file: File) {
  const { name: fileName, size, type: mime } = file;
  const { name, type } = getUrlFileNameAndType(fileName);
  return {
    // 文件名称（包含后缀名）
    fileName: name,
    // 文件名称（不包含后缀名）
    name,
    fileSuffix: type.toLocaleLowerCase(),
    fileSuffixUpper: type.toLocaleUpperCase(),
    size,
    mime,
    formatSize: formatFileSize(size),
    raw: file,
  };
}

type UrlFileInfo = {
  name: string;
  type: string;
  fileName: string;
};

/**
 * 根据url路径提取文件类型和文件名
 */
export function extractFileInfoFromUrl(url: string): UrlFileInfo | null {
  const matches = url.match(/\/([^/]+\.[^/?#]+)(\?.*)?(#.*)?$/);

  if (!matches || matches.length < 2) {
    return null;
  }

  const filePath = matches[1];
  const fileExt = extname(filePath);
  const fileName = filePath.slice(0, filePath.lastIndexOf(fileExt));
  return {
    type: fileExt,
    name: fileName,
    fileName: `${fileName}.${fileExt}}`,
  };
}

/**
 * 判断是否为base64文件
 */
export function isBase64File(str: string) {
  // 数据URI的正则表达式
  const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,.*$/;
  return regex.test(str);
}

/**
 * 将文件转换为base64
 */
export function fileToBase64Async(file: File | Blob) {
  return new Promise<string>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
  });
}

export function base64ToBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

const MEASURE_SIZE = 200;
/**
 * 预览图片文件并生成缩略图
 *
 * @param {File | Blob} file - 要预览的图片文件
 * @returns {Promise<string>} 返回一个Promise，解析为图片的Data URL
 *
 * @description
 * 此函数接受一个File或Blob对象，创建一个200x200像素的画布，
 * 并在其上绘制图片的缩略图。它会保持图片的宽高比，并居中裁剪。
 * 对于SVG文件，会使用FileReader读取。
 * 最后返回画布的Data URL。
 *
 * 注意：
 * - 如果输入不是图片文件，将返回空字符串
 * - 使用了跨域设置，以支持跨域图片
 * - 临时创建的画布元素会被添加到DOM中，然后在使用后移除
 */
export function previewImage(file: File | Blob): Promise<string> {
  return new Promise(resolve => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;

      if (width > height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);

      resolve(dataURL);
    };
    img.crossOrigin = 'anonymous';
    if (file.type.startsWith('image/svg+xml')) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result) img.src = reader.result as string;
      });
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}

export const ScreenShot = class ScreenShot {
    // 截图框的属性
    private width: number;// 截图框的宽度
    private height: number;// 截图框的高度
    private x: number;// 截图框的左上角点坐标
    private y: number;// 截图框的左上角点坐标
    private points: Array<number>;// 拖拽点的位置
    private preMask: Array<number>;// 截图框位置
    private xPercent: number;//截图框移动的X轴距离与画布总宽度之比
    private yPercent: number;//截图框移动的Y轴距离与画布总高度之比
    private widthPercent: number;//截图框宽度与画布总宽度之比
    private heightPercent: number;//截图框高度与画布总高度之比

    // canvas相关属性
    private canvasDom: HTMLCanvasElement;//canvas dom
    private canvasHeight: number;//canvas dom高度
    private canvaswidth: number;//canvas dom宽度
    private ctx: CanvasRenderingContext2D;//canvas上下文

    // 图片相关属性
    private img: HTMLImageElement;//传入的图片

    // 鼠标相关属性
    private isDown: boolean;// 鼠标在canvas画布中是否按下
    
    constructor(canvasDom: HTMLCanvasElement, img: HTMLImageElement, x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.canvasDom = canvasDom;
      this.img = img
    }
    draw(img: HTMLImageElement) {
      this.ctx.beginPath()
      // 绘制图片
      this.ctx.drawImage(img, 0, 0, this.canvaswidth, this.canvasHeight);
      // 绘制蒙层
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvaswidth, this.canvasHeight);
  
      // 绘制截图区域
      const { width: imgWidth, height: imgHeight } = img;
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      this.xPercent = this.x / this.canvaswidth;
      this.yPercent = this.y / this.canvasHeight;
      this.widthPercent = this.width / this.canvaswidth;
      this.heightPercent = this.height / this.canvasHeight;
      this.ctx.drawImage(img, this.xPercent * imgWidth, this.yPercent * imgHeight, this.widthPercent * imgWidth, this.heightPercent * imgHeight, this.x, this.y, this.width, this.height)
      // 绘制拖拽点
      this.points = [this.x + this.width, this.y + this.height];
      const [px, py] = this.points;
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(px - 3, py - 3, 6, 6);
    }
    //   初始化
    init(canvasDom: HTMLCanvasElement, img: HTMLImageElement, limitWidth?: number, limitHeight?: number) {
      //切换图片重置截图框位置
      this.x = 0;
      this.y = 0;
      this.canvaswidth = limitWidth || img.width;
      this.canvasHeight = limitHeight|| img.height;
      this.canvasDom.height = limitHeight || img.height;
      this.canvasDom.width = limitWidth || img.width;
      this.ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D;
      this.draw(img);
      canvasDom.addEventListener('mousemove',(e) =>{
          this.maskMove(e)
      })
      canvasDom.addEventListener('mousedown',(e) =>{
          this.clickDown(e)
      })
      canvasDom.addEventListener('mouseup',(e) =>{
          this.clickUp()
      })
      canvasDom.addEventListener('mouseleave',(e) =>{
          this.mouseleave()
      })
      this.isDown = false
      this.preMask = []
    }
    //   截图
    save() {
      // 将截图框中的内容渲染到新的canvas中用于下载
      const tmp_canvas = document.createElement('canvas');
      const tmp_ctx = tmp_canvas.getContext('2d');
      tmp_canvas.width = this.width;
      tmp_canvas.height = this.height;
      const img_source = this.canvasDom;
      tmp_ctx.drawImage(
        img_source,
        this.x,
        this.y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
      // 将canvas转换成base64的url
      let url = tmp_canvas.toDataURL('image/png');
      this.toImg(url)
    }

    toImg(url:string){
      // 把Canvas 转化为图片
      // img.src = url;
      // 将base64转换为文件对象
      let arr = url.split(',');
      let mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
      let bstr = atob(arr[1]); // 此处将base64解码
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      let file = new File([u8arr], 'filename', { type: mime });
      // 将文件对象通过a标签下载
      let aDom = document.createElement('a'); // 创建一个 a 标签
      aDom.download = file.name; // 设置文件名
      let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
      aDom.href = href; // 放入href
      document.body.appendChild(aDom); // 将a标签插入 body
      aDom.click(); // 触发 a 标签的点击
      document.body.removeChild(aDom); // 移除刚才插入的 a 标签
      URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
    }
    maskMove(e){
      const { offsetX, offsetY } = e
      
        let moveX = offsetX - this.preMask[0]
        let moveY = offsetY - this.preMask[1]
        // 移动的逻辑
        if ((offsetX >= this.x && offsetX <= (this.x + this.width) &&
            offsetY >= this.y && offsetY <= (this.y + this.height - 10)) || (offsetX >= this.x && offsetX <= (this.x + this.width - 10) &&
            offsetY >= (this.y + this.height - 10) && offsetY <= (this.y + this.height))) {
            this.canvasDom.style.cursor = 'move'
            if (this.isDown) {
                // 判断mask移动的趋向
                if (this.x + moveX <= (this.canvaswidth - this.width) && moveX > 0) this.x += moveX
                if (this.y + moveY <= (this.canvasHeight - this.height) && moveY > 0) this.y += moveY
                if (this.x + moveX >= 0 && moveX < 0) this.x += moveX
                if (this.y + moveY >= 0 && moveY < 0) this.y += moveY
              //   this.x = offsetX
              //   this.y = offsetY
                this.draw(this.img)
                this.preMask = [offsetX, offsetY]
                
            }
        }
  
        // 拖拽的逻辑
        else if (offsetX >= (this.x + this.width - 10) && offsetX <= (this.x + this.width + 10) &&
            offsetY >= (this.y + this.height - 10) && offsetY <= (this.y + this.height + 10)) {
            this.canvasDom.style.cursor = 'nwse-resize'
            if (this.isDown) {
                // 判断mask伸缩的趋向
                if (this.x < (this.canvaswidth - this.width) && moveX > 0) this.width += moveX
                if (this.y < (this.canvasHeight - this.height) && moveY > 0) this.height += moveY
                if (this.width + moveX >= 20 && moveX < 0) this.width += moveX
                if (this.height + moveY >= 20 && moveY < 0) this.height += moveY
                this.draw(this.img)
                this.preMask = [offsetX, offsetY]
            }
        } else {
            this.canvasDom.style.cursor = 'default'
        }
    }
    clickDown(e){
          const { offsetX, offsetY } = e
        this.isDown = true
        this.preMask = [offsetX, offsetY]
    }
    clickUp(){
        this.isDown = false
    }
    mouseleave(){
      this.isDown = false
    }
  }


export class Ball {
    canvas: HTMLCanvasElement; //canvas DOM
    canvasWidth: number; //小球右边界
    canvasHeigh: number; //小球下边界
    ctx: CanvasRenderingContext2D; //canvas上下文
    ballList: Array<{
      offsetX:number,//小球下一帧位置
      offsetY:number,//小球下一帧位置
      vx:number,//小球水平速度
      vy:number,//小球下落速度
      r:number,
      color:string
    }> = [];//小球下落数组
    constructor(canvas: HTMLCanvasElement,) {
      this.canvas = canvas;
      this.canvasWidth = canvas.width;
      this.canvasHeigh = canvas.height;
      this.ctx = canvas.getContext('2d');
      this.init()
    }
    init() {
      this.animate()
    }
    setBall(r?: number, color?: string) {
      if (r && (typeof r !== 'number' || isNaN(r) || r <= 0)) {
        throw new Error('小球半径必须是正数');
      }
      r = r || Math.floor(Math.random() * 5) + 15;
      color = color || this.randomColor();
      return { r, color }
    }
    drawBall(x: number, y: number,r?: number, color?: string) {
      // 定义随机渐变圆
      const circleStyle = this.ctx.createRadialGradient(
        x,
        y,
        r,
        x,
        y,
        r - 3
      );
      circleStyle.addColorStop(1, color);
      circleStyle.addColorStop(0, '#fff');
      this.ctx.fillStyle = circleStyle;
      // 每次点都清空画布
      // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigh);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 360 * (Math.PI / 180));
      this.ctx.fill();
      this.ctx.closePath();
    }
    fall(x: number, y: number,vx: number, vy: number,index: number,r?: number, color?: string) {
      let speedY = vy +1.5;
      const dx = x + vx; // 粒子移动后的x坐标
      const dy = y + speedY; // 粒子移动后的y坐标
      //   下面的条件是当小球超出画板时，将水平方向相反
      if (dx > this.canvasWidth-r || dx < r) {
        this.ballList[index].vx = -vx;
      }
      if (
        (dy >= this.canvasHeigh-r && vy > 0) ||
        (dy < r && vy < 0)
      ) {
        if (Math.abs(vy) <= 1.5) {
          this.drawBall(dx, dy,r,color);
          return
        };
        this.ballList[index].vy = -vy;
      }else{
        this.ballList[index].vy = speedY;
      }
      this.drawBall(dx, dy,r,color);
      this.ballList[index].offsetX = dx; // 粒子移动后的x坐标
      this.ballList[index].offsetY = dy; // 粒子移动后的y坐标
    }
    // 随机颜色
    randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    }
    // 随机生成一个0-180°的方向
    randomDirect() {
      const vx = Math.floor(Math.random() * 20) - 10;
      const vy = Math.floor(Math.random() * 5) - 10;
      return {vx,vy}
    }
    animate(){
      window.requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigh);
        this.ballList.forEach((v,index) => {
          this.fall(v.offsetX,v.offsetY,v.vx,v.vy,index,v.r,v.color)
        })
        
        this.animate()
      });
    }
    add(offsetX?:number, offsetY?:number,ballR?: number, ballColor?: string){
      const { r, color } = this.setBall(ballR, ballColor);
      const vx = this.randomDirect().vx
      const vy = this.randomDirect().vy
      this.ballList.push({offsetX,offsetY,vx,vy,r,color})
    }
  }
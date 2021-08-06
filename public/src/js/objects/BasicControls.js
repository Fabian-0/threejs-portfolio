class BasicControls {
  constructor() {
    this.controls = {
      87: false, // advance
      83: false, // back
      65: false, // left
      68: false, // rigth
    };
    this.joystick = document.getElementById('joystick');;
    this.parentControls = this.joystick.parentElement;
    this.minX = this.parentControls.offsetLeft;
    this.maxX =  this.parentControls.offsetWidth + this.parentControls.offsetLeft;
    this.minY = this.parentControls.offsetTop;
    this.maxY = this.parentControls.offsetTop + this.parentControls.offsetHeight;
    this.alignX = this.parentControls.offsetLeft + (this.joystick.offsetWidth / 2);    
    this.alignY = this.parentControls.offsetTop + (this.joystick.offsetHeight / 2);
    this.horizontalCenter =  this.parentControls.offsetTop + (this.parentControls.offsetHeight / 2);
    this.verticalCenter =  this.parentControls.offsetLeft + (this.parentControls.offsetWidth / 2);
    this.margin = 10;
    this.up = this.horizontalCenter - this.margin;
    this.down = this.horizontalCenter + this.margin;
    this.left = this.verticalCenter - this.margin;
    this.rigth = this.verticalCenter + this.margin;
    this.isTouchLeft = false;
    this.isTouchRigth = false;
    this.isTouchUp = false;
    this.isTouchDown = false;
  }

  activePcControls () {
    window.addEventListener('keydown', (e) => {
      this.onKeydown(e);
      return;
    });
    window.addEventListener('keyup', (e) => {
      this.onKeyup(e);
      return;
    });
    this.activeMovileControls();
    return;
  }

  activeMovileControls = () => {
    joystick.parentElement.addEventListener('touchmove', (e)=>{
      e.preventDefault();
      this.onTouchMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
      return;
    });
    this.parentControls.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.onTouchEnd();
      return;
    });
    return;
  }
  
  onKeydown(e) {
    if(this.controls[e.keyCode] == undefined) return false;
    this.controls[e.keyCode] = true;
    return e.keyCode;
  }

  onKeyup(e) {
    if(this.controls[e.keyCode] == undefined) return false;
    this.controls[e.keyCode] = false;
    return e.keyCode;
  }

  onTouchMove(clientX, clientY) {
    if(clientX < this.minX) clientX = this.minX;
    if(clientX > this.maxX) clientX = this.maxX;
    if(clientY > this.maxY) clientY = this.maxY;
    if(clientY < this.minY) clientY = this.minY;

    (clientX < this.left) ? this.isTouchLeft = true : this.isTouchLeft = false;
    (clientX > this.rigth) ? this.isTouchRigth = true : this.isTouchRigth = false;
    (clientY < this.up) ? this.isTouchUp = true : this.isTouchUp = false;
    (clientY > this.down) ? this.isTouchDown = true : this.isTouchDown = false;

    this.joystick.style.transform = `translate(${(clientX - this.alignX)}px, ${(clientY - this.alignY)}px)`;
    return;
  }

  onTouchEnd() {
    this.isTouchLeft = false;
    this.isTouchRigth = false;
    this.isTouchUp = false;
    this.isTouchDown = false;
    this.joystick.style.transform = `translate(32%, 32%)`;
    return;
  }

  updateValues() {
    this.minX = this.parentControls.offsetLeft;
    this.maxX =  this.parentControls.offsetWidth + this.parentControls.offsetLeft;
    this.minY = this.parentControls.offsetTop;
    this.maxY = this.parentControls.offsetTop + this.parentControls.offsetHeight;
    this.alignX = this.parentControls.offsetLeft + (this.joystick.offsetWidth / 2);    
    this.alignY = this.parentControls.offsetTop + (this.joystick.offsetHeight / 2);
    this.horizontalCenter =  this.parentControls.offsetTop + (this.parentControls.offsetHeight / 2);
    this.verticalCenter =  this.parentControls.offsetLeft + (this.parentControls.offsetWidth / 2);
    this.up = this.horizontalCenter + this.margin;
    this.down = this.horizontalCenter - this.margin;
    this.left = this.verticalCenter - this.margin;
    this.rigth = this.verticalCenter + this.margin;
    return;
  }
}

export default BasicControls;
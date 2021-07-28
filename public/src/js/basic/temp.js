export class ControlsConfig {
  constructor() {
    this.controls = {
      87: false, // advance
      83: false, // back
      65: false, // left
      68: false, // rigth
    },
    this.callbacks = [];
    console.log(this.controls);
  }
  
  addLetter(letter) {
    this.controls[letter] = false;
    return letter;
  }

  active(letter) {
    if(!this.controls[letter]) return false;
    this.controls[letter] = true;
    return letter;
  }
  
  deactive(letter) {
    if(!this.controls[letter]) return false;
    this.controls[letter] = false;
    return letter;
  }
  
  toggle(letter) {
    if(!this.controls[letter]) return false;
    this.controls[letter] = !this.controls[letter];
    return letter;
  }

  activeControls () {
    window.addEventListener('keydown', (e) => this.onKeydown(e));
    window.addEventListener('keyup', (e) => this.onKeyup(e));
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
}
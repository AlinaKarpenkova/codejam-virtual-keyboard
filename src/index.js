import keyboard from './storage';

const header = document.createElement('h1');
const text = document.createTextNode("The virtual keyboard!!!");
header.appendChild(text);
header.setAttribute("class", "header");
const body = document.body;
body.appendChild(header);

const buttonAmount = 63;
const ul = document.createElement('ul');
const p = document.createElement('p');
const textarea = document.createElement('textarea');

class Box {
  constructor(rutext, entext, code) {
    this.rutext = rutext;
    this.entext = entext;
    this.code = code;
    const li = document.createElement('li');
    this.elem = li;
  }

  setText() {
    if (localStorage.getItem('lang') === null || localStorage.getItem('lang') === 'ru') {
      this.elem.textContent = this.rutext;
    } else {
      this.elem.textContent = this.entext;
    }
  }
}

function CapsLock() {
  if (localStorage.capslock === null || localStorage.capslock === 'false') {
    localStorage.setItem('capslock', true);
    keyboard.link[keyboard.code.indexOf('CapsLock')].classList.add('click');
    keyboard.code.forEach((item, i) => {
      if (keyboard.link[i].classList.contains('specialButton')) {
        keyboard.link[i].textContent = keyboard.link[i].textContent.toLowerCase();
      } else {
        keyboard.link[i].textContent = keyboard.link[i].textContent.toUpperCase();
      }
    });
  } else {
    localStorage.setItem('capslock', false);
    keyboard.link[keyboard.code.indexOf('CapsLock')].classList.remove('click');
    keyboard.code.forEach((item, i) => {
      keyboard.link[i].textContent = keyboard.link[i].textContent.toLowerCase();
    });
  }
}

function Shift() {
  keyboard.shiftArray.length = 0;
  keyboard.link.forEach((_item, i) => {
    if (keyboard.link[i].classList.contains('firstLine')) {
      keyboard.shiftArray.push(keyboard.link[i]);
      keyboard.firstline.push(keyboard.link[i].textContent);
    }
    if (localStorage.capslock === 'false' && !(keyboard.link[i].classList.contains('specialButton'))) {
      keyboard.link[i].textContent = keyboard.link[i].textContent.toUpperCase();
    }
    if (localStorage.capslock === 'true' && !(keyboard.link[i].classList.contains('specialButton'))) {
      keyboard.link[i].textContent = keyboard.link[i].textContent.toLowerCase();
    }
  });
  keyboard.shiftArray.forEach((item, i) => {
    keyboard.shiftArray[i].textContent = keyboard.firstlineS[i];
  });
}

function ChangeLanguage() {
  if (localStorage.lang === null || localStorage.lang === 'ru') {
    localStorage.setItem('lang', 'en');
    keyboard.code.forEach((item, i) => {
      keyboard.link[i].textContent = keyboard.en[i];
      if (localStorage.capslock === 'true' && !(keyboard.link[i].classList.contains('specialButton'))) {
        keyboard.link[i].textContent = keyboard.link[i].textContent.toUpperCase();
      }
    });
    if (keyboard.firstline.length !== 0) {
      keyboard.firstline[0] = '~';
    }
  } else {
    localStorage.setItem('lang', 'ru');
    keyboard.code.forEach((item, i) => {
      keyboard.link[i].textContent = keyboard.ru[i];
      if (localStorage.capslock === 'true' && !(keyboard.link[i].classList.contains('specialButton'))) {
        keyboard.link[i].textContent = keyboard.link[i].textContent.toUpperCase();
      }
    });
    if (keyboard.firstline.length !== 0) {
      keyboard.firstline[0] = 'ё';
    }
  }
}

for (let i = 0; i < buttonAmount; i += 1) {
  const button = new Box(keyboard.ru[i], keyboard.en[i], keyboard.code[i]);
  button.setText();
  ul.appendChild(button.elem);
  button.elem.classList.add('button', keyboard.code[i].toLocaleLowerCase());
  switch (button.elem.textContent) {
    case 'tab':
    case 'shift':
    case 'caps lock':
    case 'backspace':
    case 'alt':
    case 'enter':
    case 'ctrl':
    case 'win':
      button.elem.classList.add('specialButton');
      break;
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '-':
    case '=':
    case '`':
    case 'ё':
    case 'Ё':
    case '\\':
    case '|':
      button.elem.classList.add('firstLine');
      break;
    default:
      break;
  }
  keyboard.link.push(button.elem);
}
document.body.appendChild(textarea);
document.body.appendChild(ul);
document.body.appendChild(p);
CapsLock();
CapsLock();

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (keyboard.code.indexOf(event.code) !== -1) {
    keyboard.link[keyboard.code.indexOf(event.code)].classList.add('click');
  }
  if (event.code === 'Backspace') {
    const str = textarea.value.substr(0, textarea.value.length - 1);
    textarea.value = str;
    return;
  }
  if (event.code === 'Tab') {
    textarea.value += '   ';
    return;
  }
  if (event.code === 'CapsLock') {
    CapsLock();
    return;
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    Shift();
    return;
  }
  if (event.code === 'ControlLeft') {
    keyboard.changelanguage[0] = 1;
    if (keyboard.changelanguage[1] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'ControlRight') {
    keyboard.changelanguage[2] = 1;
    if (keyboard.changelanguage[3] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'AltLeft') {
    keyboard.changelanguage[1] = 1;
    if (keyboard.changelanguage[0] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'AltRight') {
    keyboard.changelanguage[3] = 1;
    if (keyboard.changelanguage[2] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'Enter') {
    textarea.value += '\n';
    return;
  }
  if (keyboard.code.indexOf(event.code) !== -1) {
    textarea.value += keyboard.link[keyboard.code.indexOf(event.code)].textContent;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') return;
  if (keyboard.code.indexOf(event.code) !== -1) {
    keyboard.link[keyboard.code.indexOf(event.code)].classList.remove('click');
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    keyboard.shiftArray.forEach((item, i) => {
      keyboard.shiftArray[i].textContent = keyboard.firstline[i];
    });
    keyboard.link.forEach((item, i) => {
      if (localStorage.capslock === 'false' && !(keyboard.link[i].classList.contains('specialButton'))) {
        keyboard.link[i].textContent = keyboard.link[i].textContent.toLowerCase();
      }
      if (localStorage.capslock === 'true' && !(keyboard.link[i].classList.contains('specialButton'))) {
        keyboard.link[i].textContent = keyboard.link[i].textContent.toUpperCase();
      }
    });
  }
  const arr = [0, 0, 0, 0];
  keyboard.changelanguage.splice(0, keyboard.changelanguage.length, ...arr);
});

ul.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('button') && !(event.target.classList.contains('specialButton'))) {
    textarea.value += event.target.textContent;
  }
  if (event.target.classList.contains('enter')) {
    textarea.value += '\n';
  }
  if (event.target.classList.contains('tab')) {
    textarea.value += '   ';
  }
  if (event.target.classList.contains('capslock')) {
    CapsLock();
  }
  if (event.target.classList.contains('backspace')) {
    const str = textarea.value.substr(0, textarea.value.length - 1);
    textarea.value = str;
  }
});
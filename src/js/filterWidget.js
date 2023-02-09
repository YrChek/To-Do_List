import Task from './task';
import beginText from './filters';

export default class FilterWidget {
  constructor(arayBuffer) {
    this.arayBuffer = arayBuffer;
    this.input = document.querySelector('.input');
    this.form = document.querySelector('.form');
    this.pinned = document.querySelector('.pinned');
    this.allTasks = document.querySelector('.all-tasks');
    this.stopper = document.querySelector('.stopper');
    this.listClasses = [];
    this.random = this.random.bind(this);
    this.decoder = this.decoder.bind(this);
    this.clickingEnter = this.clickingEnter.bind(this);
    this.encoder = this.encoder.bind(this);
    this.decoder = this.decoder.bind(this);
    this.widget = this.widget.bind(this);
    this.moveToPinned = this.moveToPinned.bind(this);
    this.clear = this.clear.bind(this);
    this.removeFromPinned = this.removeFromPinned.bind(this);
    this.switchingVisibility = this.switchingVisibility.bind(this);

    this.form.addEventListener('submit', this.clickingEnter);
    this.form.addEventListener('input', this.widget);
    this.allTasks.addEventListener('click', this.moveToPinned);
    this.pinned.addEventListener('click', this.removeFromPinned);
  }

  clear() {
    const items = this.allTasks.querySelectorAll('.task-item');
    if (items.length === 0) return;
    for (const item of items) {
      item.remove();
    }
  }

  random() {
    const stringLength = 15;
    const text = 'abcdefghigklmnopqrctuvwxyz0123456789';
    const textLength = text.length;
    let result = '';
    for (let i = 0; i < stringLength;) {
      result += text.charAt(Math.floor(Math.random() * textLength));
      i += 1;
    }
    if (this.listClasses.includes(result)) this.random();
    return result;
  }

  decoder(text, obj) {
    const addNumber = obj.initialNumber;
    const typedArray = new Uint32Array(this.arayBuffer);
    text.split('').forEach((item, index) => {
      const count = item.charCodeAt(item);
      if (!count) {
        typedArray[index + addNumber] = item;
      } else {
        typedArray[index + addNumber] = count;
      }
    });
  }

  encoder(obj) {
    let start = obj.initialNumber;
    const typedArray = new Uint32Array(this.arayBuffer);
    const stop = obj.textLength;
    let i = 1;
    let text = '';
    while (i <= stop) {
      const binary = typedArray[start];
      if (binary > 9) {
        const symbol = String.fromCharCode(binary);
        text += symbol;
      } else {
        text += binary;
      }
      start += 1;
      i += 1;
    }
    return text;
  }

  widget() {
    this.clear();
    const textForm = this.input.value;
    const textPined = [];
    const arrayNodesPined = this.pinned.querySelectorAll('.task-item-text');
    if (arrayNodesPined.length) {
      arrayNodesPined.forEach((item) => {
        textPined.push(item.textContent);
      });
    }
    this.listClasses.forEach((item) => {
      const referenceText = this.encoder(item);
      const bulle = textPined.includes(referenceText);
      if (beginText(referenceText, textForm) && !bulle) {
        item.add(referenceText);
      }
    });
    this.switchingVisibility();
  }

  clickingEnter(e) {
    e.preventDefault();
    const randomName = this.random();
    const text = this.input.value;
    const pureText = text.trim();
    const textLength = pureText.length;
    this.listClasses.unshift(randomName);
    this.listClasses[0] = new Task(randomName, textLength);
    this.decoder(pureText, this.listClasses[0]);
    this.input.value = '';
    this.widget();
  }

  moveToPinned(e) {
    const cild = e.target;
    cild.textContent = 'V';
    const parent = cild.closest('.task-item');
    this.pinned.append(parent);
    this.stopper.style.display = 'none';
  }

  removeFromPinned(e) {
    const cild = e.target;
    cild.textContent = '';
    const parent = cild.closest('.task-item');
    parent.remove();
    const nodes = this.pinned.querySelectorAll('.task-item');
    if (!nodes.length) this.stopper.style.display = '';
    this.widget();
  }

  switchingVisibility() {
    const nodes = this.allTasks.querySelectorAll('.task-item-text');
    const shield = document.querySelector('.hidden');
    if (nodes.length) {
      shield.style.display = 'none';
    } else {
      shield.style.display = 'block';
    }
  }
}

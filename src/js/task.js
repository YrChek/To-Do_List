export default class Task {
  static count = 0;

  constructor(name, textLength) {
    this.name = name;
    this.textLength = textLength;
    this.initialNumber = Task.count;
    this.parentElement = document.querySelector('.all-tasks');
    Task.count += this.textLength;
    this.item = this.item.bind(this);
    this.add = this.add.bind(this);
  }

  item(text) {
    return `
      <div class="task-item" name = "${this.name}">
        <div class="task-item-text">${text}</div>
        <div class="task-item-switch"></div>
      </div>
    `;
  }

  add(text) {
    const textNodes = this.item(text);
    this.parentElement.insertAdjacentHTML('beforeend', textNodes);
  }
}

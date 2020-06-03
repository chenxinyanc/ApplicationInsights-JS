export class debugBin {
  public el: HTMLDivElement;
  public elSpan: HTMLSpanElement;

  public _self: debugBin;

  constructor(
    public name: string,
    public value: number,
    public parent: HTMLDivElement,
    bottomDistance: number,
    backgroundColor?: string
  ) {
    const s = this._self = this;

    s.el = document.createElement('div');
    s.el.className = 'debug-bin';
    s.el.style.bottom = `${20 + bottomDistance}px`;
    s.el.style.backgroundColor = backgroundColor || '#000000';

    s.elSpan = document.createElement('span');
    s.elSpan.innerText = `${value}`;
    s.elSpan.setAttribute('data-name', name);
    s.el.appendChild(s.elSpan);
  }

  increment() {
    const s = this._self;
    s.elSpan.innerText = `${++s.value}`;
    this.render();
  }

  render() {
    const s = this._self;
    if (s.el.parentElement) {
      s.el.parentElement.removeChild(s.el);
    }
    s.parent.appendChild(s.el);
  }
}
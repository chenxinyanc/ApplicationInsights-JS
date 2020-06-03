import { CoreUtils } from '@microsoft/applicationinsights-core-js';

export const ObjectToElements = (target: Object, key?: string, level?: number): HTMLElement => {
  if (!level) { level = 0; }
  const currentLine = document.createElement('span');
  currentLine.className = 'obj-key';
  currentLine.innerText = `${key ? key : 'obj'}: ${target.toString()}`;

  const children: HTMLElement[] = [];
  let openState = false;

  for (const key of CoreUtils.objKeys(target)) {
    if (CoreUtils.isTypeof(target[key], "object")) {
      children.push(ObjectToElements(target[key], key, level + 1))
    } else {
      const builder = document.createElement("div");
      const outerSpan = document.createElement("span");
      const keySpan = document.createElement("span");
      keySpan.className = 'key';
      keySpan.textContent = `${key}: `;
      outerSpan.appendChild(keySpan);

      const valueSpan = document.createElement("span");
      if (CoreUtils.isTypeof(target[key], "function")) {
        const fnStr = target[key].toString();
        const fnHead = fnStr.match(/^([^{]+)/)[1];
        valueSpan.textContent = `${fnHead}{...}`;
      } else {
        valueSpan.textContent = `${target[key]}`;
      }
      valueSpan.className = `${typeof target[key]}`;
      outerSpan.appendChild(valueSpan);
      builder.appendChild(outerSpan);
      children.push(builder);
    }
  }

  const rootDiv = document.createElement("div");
  rootDiv.appendChild(currentLine);
  rootDiv.onclick = (evt) => {
    evt.stopPropagation();
    if (openState) {
      rootDiv.innerHTML = '';
      rootDiv.appendChild(currentLine);
      openState = false;
    }
    else {
      openState = true;
      for (const child of children) {
        rootDiv.appendChild(child);
      }
    }
  }

  return rootDiv;
}
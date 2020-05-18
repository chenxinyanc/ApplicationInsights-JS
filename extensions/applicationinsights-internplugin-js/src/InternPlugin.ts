/**
 * InternPlugin.ts
 * @copyright Microsoft 2020
 */

import {
  BaseTelemetryPlugin, IConfiguration, CoreUtils,
  IAppInsightsCore, IPlugin, ITelemetryItem, IProcessTelemetryContext, _InternalLogMessage, LoggingSeverity, _InternalMessageId, getNavigator,
  ITelemetryPluginChain
} from '@microsoft/applicationinsights-core-js';


export default class InternPlugin extends BaseTelemetryPlugin {
  public myRootElement: HTMLDivElement;
  public myLogger: HTMLTextAreaElement;

  initialize(config: IConfiguration, core: IAppInsightsCore, extensions: IPlugin[], pluginChain?: ITelemetryPluginChain) {
    const rootEl = this.myRootElement = document.createElement("div");
    // TODO: research more accessibility (aria)
    rootEl.style.position = 'fixed';
    rootEl.style.width = '100vw';
    rootEl.style.height = '100vh';
    rootEl.style.backgroundColor = '#ffffff';
    rootEl.style.opacity = '0';
    rootEl.style.pointerEvents = 'none';
    rootEl.style.top = '-100%';
    rootEl.style.transition = '.2s top cubic-bezier(0.87, 0, 0.13, 1)';
    document.addEventListener("keyup", (evt: KeyboardEvent) => {
      evt.preventDefault();
      if (evt.key === 'd') {
        rootEl.style.top = (rootEl.style.opacity === '0') ? '0%' : '-100%';
        rootEl.style.pointerEvents = (rootEl.style.opacity === '0') ? 'auto' : 'none';
        rootEl.style.opacity = (rootEl.style.opacity === '0') ? '1' : '0';
      }
    })
    const logHeading = document.createElement("h1");
    logHeading.textContent = 'event logger or something';
    logHeading.style.textAlign = 'center';
    rootEl.appendChild(logHeading);

    const loggerEl = this.myLogger = document.createElement("textarea");
    loggerEl.style.width = '80%';
    loggerEl.style.minWidth = '200px';
    loggerEl.style.height = '1000px';
    loggerEl.style.position = 'absolute';
    loggerEl.style.margin = 'auto';
    loggerEl.style.left = '0';
    loggerEl.style.right = '0';
    loggerEl.setAttribute('disabled', 'true');
    rootEl.appendChild(loggerEl);

    document.body.appendChild(
      rootEl
    )
  }

  processTelemetry(event: ITelemetryItem, itemCtx?: IProcessTelemetryContext) {
    console.log(event);
    let out = '';
    out += `[${event.time}] ${event.baseType}\n`;
    out += 'properties:\n';
    for (const key of CoreUtils.objKeys(event.baseData)) {
      out += `- ${key}: ${event.baseData[key]}\n`;
    }
    switch(event.baseType) {
      case "EventData":
        break;
      case "ExceptionData":
        break;
      case "MetricData":
        break;
      case "PageviewData":
        break;
      case "PageviewPerformanceData":
        break;
      case "RemoteDependencyData":
        break;
      case "MessageData":
        break;
    }
    this.myLogger.innerHTML += `${out}\n`;
  }
}
/// <reference path="../../JavaScriptSDK/appInsights.ts" />

// This file was copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/applicationinsights-js/applicationinsights-js-tests.ts 
// If you have to make changes here, plese update the DefinitelyTyped repo - https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/applicationinsights-js

var config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: "<your iKey>",
    endpointUrl: "endpointUrl",
    emitLineDelimitedJson: false,
    accountId: "accountId",
    sessionRenewalMs: 30,
    sessionExpirationMs: 24 * 60 * 60 * 1000,
    maxBatchSizeInBytes: 100 * 1024,
    maxBatchInterval: 15,
    enableDebug: false,
    disableTelemetry: false,
    verboseLogging: false,
    diagnosticLogInterval: 10,
    samplingPercentage: 100,
    autoTrackPageVisitTime: true,
    disableExceptionTracking: false,
    disableAjaxTracking: false,
    overridePageViewDuration: false,
    maxAjaxCallsPerView: -1,
    disableDataLossAnalysis: true,
    disableCorrelationHeaders: true,
    disableFlushOnBeforeUnload: false,
    enableSessionStorageBuffer: false,
    cookieDomain: ""
};

var appInsights: Microsoft.ApplicationInsights.IAppInsights = {
    config: config,
    context: null,
    queue: null,

    startTrackPage(name?: string) { return null; },
    stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) { return null; },
    trackPageView(name?: string, url?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }, duration?: number) { return null; },
    startTrackEvent(name: string) { return null },
    stopTrackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) { return null },
    trackEvent(name: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }) { return null },
    trackAjax(id: string, absoluteUrl: string, pathName: string, totalTime: number, success: boolean, resultCode: number, method?: string) { return null },
    trackException(exception: Error, handledAt?: string, properties?: { [name: string]: string; }, measurements?: { [name: string]: number; }, severityLevel?: AI.SeverityLevel) { return null },
    trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string; }) { return null },
    trackTrace(message: string, properties?: { [name: string]: string; }) { return null },
    flush() { return null },
    setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string) { return null },
    clearAuthenticatedUserContext() { return null },
    _onerror(message: string, url: string, lineNumber: number, columnNumber: number, error: Error) { return null }
};

// trackPageView
appInsights.trackPageView("page1");
appInsights.trackPageView("page2", "http://example.com", null, null, 1000);

// startTrackPage
appInsights.startTrackPage("page");

// stopTrackPage
appInsights.stopTrackPage("page");
appInsights.stopTrackPage("page", "http://example.com", null, null);

// trackEvent
appInsights.trackEvent("page1");
appInsights.trackEvent("page1", null, null);

// trackMetric
appInsights.trackMetric("page1", 999);
appInsights.trackMetric("page1", 999, 1, 1, 2, null);

// trackException
appInsights.trackException(new Error("sample error"));
appInsights.trackException(new Error("sample error"), "handledAt", null, null);

// trackTrace
appInsights.trackTrace("message");
appInsights.trackTrace("message", null);

// flush
appInsights.flush();

// setAuthenticatedUserContext
appInsights.setAuthenticatedUserContext("userId");
appInsights.setAuthenticatedUserContext("userId", "accountId");

// set config dynamically
appInsights.config.instrumentationKey = "<new key>";


// TelementryContext
var context: Microsoft.ApplicationInsights.ITelemetryContext = appInsights.context;

context.application.ver = "v0.0.0";
context.application.build = "1.1.1";

context.device.type = "sampleDevice";
context.device.locale = "en-US";

context.user.id = "userId";
context.user.authenticatedId = "authId";

context.session.id = "sessionId";
context.session.isFirst = true;

context.location.ip = "127.0.0.1";

context.operation.id = "1";
context.operation.syntheticSource = "testAgent";

// track
var data = new Microsoft.Telemetry.Base();
var envelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(data, "name");

context.track(envelope);

context.addTelemetryInitializer((envelope) => false);

// track event
var eventObj = new Microsoft.Telemetry.Event("test", null, null);
var eventData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.Event>(Microsoft.Telemetry.Event.dataType, eventObj);
var eventEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(eventData, Microsoft.Telemetry.Event.envelopeType);
context.track(eventEnvelope);

// track exception
var exceptionObj = new Microsoft.Telemetry.Exception(new Error(), "handledAt", null, null, AI.SeverityLevel.Critical);
var exceptionData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.Exception>(Microsoft.Telemetry.Exception.dataType, exceptionObj);
var exceptionEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(exceptionData, Microsoft.Telemetry.Exception.envelopeType);
context.track(exceptionEnvelope);

// track metric
var metricObj = new Microsoft.Telemetry.Metric("name", 1234, 1, 0, 100, null);
var metricData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.Metric>(Microsoft.Telemetry.Metric.dataType, metricObj);
var metricEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(metricData, Microsoft.Telemetry.Metric.envelopeType);
context.track(metricEnvelope);

// track page view
var pageViewObj = new Microsoft.Telemetry.PageView("page name", "url", 999, null, null);
var pageViewData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.PageView>(Microsoft.Telemetry.PageView.dataType, pageViewObj);
var pageViewEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(pageViewData, Microsoft.Telemetry.PageView.envelopeType);
context.track(pageViewEnvelope);

// track page view performance
var pageViewPerfObj = new Microsoft.Telemetry.PageViewPerformance("page name", "url", 999, null, null);
var pageViewPerfData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.PageViewPerformance>(Microsoft.Telemetry.PageViewPerformance.dataType, pageViewPerfObj);
var pageViewPerfEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(pageViewPerfData, Microsoft.Telemetry.PageViewPerformance.envelopeType);
context.track(pageViewPerfEnvelope);

// track remote dependency
var remoteDepObj = new Microsoft.Telemetry.RemoteDependencyData("id", "url", "command", 1, true, 1234, "GET");
var remoteDepData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.RemoteDependencyData>(Microsoft.Telemetry.RemoteDependencyData.dataType, remoteDepObj);
var remoteDepEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(remoteDepData, Microsoft.Telemetry.RemoteDependencyData.envelopeType);
context.track(pageViewPerfEnvelope);

// track trace
var traceObj = new Microsoft.Telemetry.Trace("message", null);
var traceData = new Microsoft.ApplicationInsights.Telemetry.Common.Data<Microsoft.Telemetry.Trace>(Microsoft.Telemetry.Trace.dataType, traceObj);
var traceEnvelope = new Microsoft.ApplicationInsights.Telemetry.Common.Envelope(traceData, Microsoft.Telemetry.Trace.envelopeType);
context.track(traceEnvelope);
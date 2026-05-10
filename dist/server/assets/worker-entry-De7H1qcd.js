import { EventEmitter } from "node:events";
const hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
const NODE_VERSION = "22.14.0";
class Process extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess = globalThis["process"];
const getBuiltinModule = globalProcess.getBuiltinModule;
const workerdProcess = getBuiltinModule("node:process");
const unenvProcess = new Process({
  env: globalProcess.env,
  hrtime: hrtime$1,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
const { exit, features, platform } = workerdProcess;
const {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config: config$1,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env: env$1,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime2,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version: version$1,
  versions
} = unenvProcess;
const _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config: config$1,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env: env$1,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime2,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version: version$1,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
globalThis.process = _process;
const _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure extends PerformanceEntry {
  entryType = "measure";
}
class PerformanceResourceTiming extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
let lastCapturedError;
const TTL_MS = 5e3;
function record$1(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record$1(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record$1(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
const hasOwn = Object.prototype.hasOwnProperty;
function pathToFunc(pathPattern, options) {
  const paramRE = /\{([a-zA-Z0-9_][a-zA-Z0-9_-]*?)\}/g;
  return function buildURLPath(params = {}) {
    return pathPattern.replace(paramRE, function(_, placeholder) {
      if (!hasOwn.call(params, placeholder)) {
        throw new Error(`Parameter '${placeholder}' is required`);
      }
      const value = params[placeholder];
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error(`Parameter '${placeholder}' must be a string or number`);
      }
      return `${value}`;
    }).replace(/^\/+/, "");
  };
}
const ServerProduction = "production";
const ServerList = {
  [ServerProduction]: "https://openrouter.ai/api/v1"
};
function serverURLFromOptions(options) {
  let serverURL = options.serverURL;
  const params = {};
  if (!serverURL) {
    const server2 = options.server ?? ServerProduction;
    serverURL = ServerList[server2] || "";
  }
  const u = pathToFunc(serverURL)(params);
  return new URL(u);
}
const SDK_METADATA = {
  userAgent: "speakeasy-sdk/typescript 0.12.35 2.879.1 1.0.0 @openrouter/sdk"
};
const DEFAULT_FETCHER = (input, init) => {
  if (init == null) {
    return fetch(input);
  } else {
    return fetch(input, init);
  }
};
class HTTPClient {
  constructor(options = {}) {
    this.options = options;
    this.requestHooks = [];
    this.requestErrorHooks = [];
    this.responseHooks = [];
    this.fetcher = options.fetcher || DEFAULT_FETCHER;
  }
  async request(request) {
    let req = request;
    for (const hook of this.requestHooks) {
      const nextRequest = await hook(req);
      if (nextRequest) {
        req = nextRequest;
      }
    }
    try {
      const res = await this.fetcher(req);
      for (const hook of this.responseHooks) {
        await hook(res, req);
      }
      return res;
    } catch (err) {
      for (const hook of this.requestErrorHooks) {
        await hook(err, req);
      }
      throw err;
    }
  }
  addHook(...args) {
    if (args[0] === "beforeRequest") {
      this.requestHooks.push(args[1]);
    } else if (args[0] === "requestError") {
      this.requestErrorHooks.push(args[1]);
    } else if (args[0] === "response") {
      this.responseHooks.push(args[1]);
    } else {
      throw new Error(`Invalid hook type: ${args[0]}`);
    }
    return this;
  }
  removeHook(...args) {
    let target;
    if (args[0] === "beforeRequest") {
      target = this.requestHooks;
    } else if (args[0] === "requestError") {
      target = this.requestErrorHooks;
    } else if (args[0] === "response") {
      target = this.responseHooks;
    } else {
      throw new Error(`Invalid hook type: ${args[0]}`);
    }
    const index = target.findIndex((v) => v === args[1]);
    if (index >= 0) {
      target.splice(index, 1);
    }
    return this;
  }
  clone() {
    const child = new HTTPClient(this.options);
    child.requestHooks = this.requestHooks.slice();
    child.requestErrorHooks = this.requestErrorHooks.slice();
    child.responseHooks = this.responseHooks.slice();
    return child;
  }
}
const mediaParamSeparator = /\s*;\s*/g;
function matchContentType(response, pattern) {
  if (pattern === "*") {
    return true;
  }
  let contentType = response.headers.get("content-type")?.trim() || "application/octet-stream";
  contentType = contentType.toLowerCase();
  const wantParts = pattern.toLowerCase().trim().split(mediaParamSeparator);
  const [wantType = "", ...wantParams] = wantParts;
  if (wantType.split("/").length !== 2) {
    return false;
  }
  const gotParts = contentType.split(mediaParamSeparator);
  const [gotType = "", ...gotParams] = gotParts;
  const [type = "", subtype = ""] = gotType.split("/");
  if (!type || !subtype) {
    return false;
  }
  if (wantType !== "*/*" && gotType !== wantType && `${type}/*` !== wantType && `*/${subtype}` !== wantType) {
    return false;
  }
  if (gotParams.length < wantParams.length) {
    return false;
  }
  const params = new Set(gotParams);
  for (const wantParam of wantParams) {
    if (!params.has(wantParam)) {
      return false;
    }
  }
  return true;
}
const codeRangeRE$1 = new RegExp("^[0-9]xx$", "i");
function matchStatusCode(response, codes) {
  const actual = `${response.status}`;
  const expectedCodes = Array.isArray(codes) ? codes : [codes];
  if (!expectedCodes.length) {
    return false;
  }
  return expectedCodes.some((ec) => {
    const code = `${ec}`;
    if (code === "default") {
      return true;
    }
    if (!codeRangeRE$1.test(`${code}`)) {
      return code === actual;
    }
    const expectFamily = code.charAt(0);
    if (!expectFamily) {
      throw new Error("Invalid status code range");
    }
    const actualFamily = actual.charAt(0);
    if (!actualFamily) {
      throw new Error(`Invalid response status code: ${actual}`);
    }
    return actualFamily === expectFamily;
  });
}
function matchResponse(response, code, contentTypePattern) {
  return matchStatusCode(response, code) && matchContentType(response, contentTypePattern);
}
function isConnectionError(err) {
  if (typeof err !== "object" || err == null) {
    return false;
  }
  const isBrowserErr = err instanceof TypeError && err.message.toLowerCase().startsWith("failed to fetch");
  const isNodeErr = err instanceof TypeError && err.message.toLowerCase().startsWith("fetch failed");
  const isBunErr = "name" in err && err.name === "ConnectionError";
  const isGenericErr = "code" in err && typeof err.code === "string" && err.code.toLowerCase() === "econnreset";
  return isBrowserErr || isNodeErr || isGenericErr || isBunErr;
}
function isTimeoutError(err) {
  if (typeof err !== "object" || err == null) {
    return false;
  }
  const isNative = "name" in err && err.name === "TimeoutError";
  const isLegacyNative = "code" in err && err.code === 23;
  const isGenericErr = "code" in err && typeof err.code === "string" && err.code.toLowerCase() === "econnaborted";
  return isNative || isLegacyNative || isGenericErr;
}
function isAbortError(err) {
  if (typeof err !== "object" || err == null) {
    return false;
  }
  const isNative = "name" in err && err.name === "AbortError";
  const isLegacyNative = "code" in err && err.code === 20;
  const isGenericErr = "code" in err && typeof err.code === "string" && err.code.toLowerCase() === "econnaborted";
  return isNative || isLegacyNative || isGenericErr;
}
class SDKHooks {
  constructor() {
    this.sdkInitHooks = [];
    this.beforeCreateRequestHooks = [];
    this.beforeRequestHooks = [];
    this.afterSuccessHooks = [];
    this.afterErrorHooks = [];
    const presetHooks = [];
    for (const hook of presetHooks) {
      if ("sdkInit" in hook) {
        this.registerSDKInitHook(hook);
      }
      if ("beforeCreateRequest" in hook) {
        this.registerBeforeCreateRequestHook(hook);
      }
      if ("beforeRequest" in hook) {
        this.registerBeforeRequestHook(hook);
      }
      if ("afterSuccess" in hook) {
        this.registerAfterSuccessHook(hook);
      }
      if ("afterError" in hook) {
        this.registerAfterErrorHook(hook);
      }
    }
  }
  registerSDKInitHook(hook) {
    this.sdkInitHooks.push(hook);
  }
  registerBeforeCreateRequestHook(hook) {
    this.beforeCreateRequestHooks.push(hook);
  }
  registerBeforeRequestHook(hook) {
    this.beforeRequestHooks.push(hook);
  }
  registerAfterSuccessHook(hook) {
    this.afterSuccessHooks.push(hook);
  }
  registerAfterErrorHook(hook) {
    this.afterErrorHooks.push(hook);
  }
  sdkInit(opts) {
    return this.sdkInitHooks.reduce((opts2, hook) => hook.sdkInit(opts2), opts);
  }
  beforeCreateRequest(hookCtx, input) {
    let inp = input;
    for (const hook of this.beforeCreateRequestHooks) {
      inp = hook.beforeCreateRequest(hookCtx, inp);
    }
    return inp;
  }
  async beforeRequest(hookCtx, request) {
    let req = request;
    for (const hook of this.beforeRequestHooks) {
      req = await hook.beforeRequest(hookCtx, req);
    }
    return req;
  }
  async afterSuccess(hookCtx, response) {
    let res = response;
    for (const hook of this.afterSuccessHooks) {
      res = await hook.afterSuccess(hookCtx, res);
    }
    return res;
  }
  async afterError(hookCtx, response, error) {
    let res = response;
    let err = error;
    for (const hook of this.afterErrorHooks) {
      const result = await hook.afterError(hookCtx, res, err);
      res = result.response;
      err = result.error;
    }
    return { response: res, error: err };
  }
}
class HTTPClientError extends Error {
  constructor(message, opts) {
    let msg = message;
    if (opts?.cause) {
      msg += `: ${opts.cause}`;
    }
    super(msg, opts);
    this.name = "HTTPClientError";
    if (typeof this.cause === "undefined") {
      this.cause = opts?.cause;
    }
  }
}
class UnexpectedClientError extends HTTPClientError {
  constructor() {
    super(...arguments);
    this.name = "UnexpectedClientError";
  }
}
class InvalidRequestError extends HTTPClientError {
  constructor() {
    super(...arguments);
    this.name = "InvalidRequestError";
  }
}
class RequestAbortedError extends HTTPClientError {
  constructor() {
    super(...arguments);
    this.name = "RequestAbortedError";
  }
}
class RequestTimeoutError extends HTTPClientError {
  constructor() {
    super(...arguments);
    this.name = "RequestTimeoutError";
  }
}
class ConnectionError extends HTTPClientError {
  constructor() {
    super(...arguments);
    this.name = "ConnectionError";
  }
}
function OK$1(value) {
  return { ok: true, value };
}
function ERR(error) {
  return { ok: false, error };
}
async function unwrapAsync(pr) {
  const r = await pr;
  if (!r.ok) {
    throw r.error;
  }
  return r.value;
}
const NEVER$1 = Object.freeze({
  status: "aborted"
});
function $constructor(name, initializer2, params) {
  function init(inst, def) {
    var _a2;
    Object.defineProperty(inst, "_zod", {
      value: inst._zod ?? {},
      enumerable: false
    });
    (_a2 = inst._zod).traits ?? (_a2.traits = /* @__PURE__ */ new Set());
    inst._zod.traits.add(name);
    initializer2(inst, def);
    for (const k in _.prototype) {
      if (!(k in inst))
        Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
    }
    inst._zod.constr = _;
    inst._zod.def = def;
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a2;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}
const globalConfig = {};
function config(newConfig) {
  return globalConfig;
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  return {
    get value() {
      {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder$1(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function defineLazy(object2, key, getter) {
  Object.defineProperty(object2, key, {
    get() {
      {
        const value = getter();
        object2[key] = value;
        return value;
      }
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function esc(str) {
  return JSON.stringify(str);
}
const captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject$1(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
const propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
const NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
  const newShape = {};
  const currDef = schema._zod.def;
  for (const key in mask) {
    if (!(key in currDef.shape)) {
      throw new Error(`Unrecognized key: "${key}"`);
    }
    if (!mask[key])
      continue;
    newShape[key] = currDef.shape[key];
  }
  return clone(schema, {
    ...schema._zod.def,
    shape: newShape,
    checks: []
  });
}
function omit(schema, mask) {
  const newShape = { ...schema._zod.def.shape };
  const currDef = schema._zod.def;
  for (const key in mask) {
    if (!(key in currDef.shape)) {
      throw new Error(`Unrecognized key: "${key}"`);
    }
    if (!mask[key])
      continue;
    delete newShape[key];
  }
  return clone(schema, {
    ...schema._zod.def,
    shape: newShape,
    checks: []
  });
}
function extend(schema, shape) {
  if (!isPlainObject$1(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const def = {
    ...schema._zod.def,
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    checks: []
    // delete existing checks
  };
  return clone(schema, def);
}
function merge(a, b) {
  return clone(a, {
    ...a._zod.def,
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    catchall: b._zod.def.catchall,
    checks: []
    // delete existing checks
  });
}
function partial(Class, schema, mask) {
  const oldShape = schema._zod.def.shape;
  const shape = { ...oldShape };
  if (mask) {
    for (const key in mask) {
      if (!(key in oldShape)) {
        throw new Error(`Unrecognized key: "${key}"`);
      }
      if (!mask[key])
        continue;
      shape[key] = Class ? new Class({
        type: "optional",
        innerType: oldShape[key]
      }) : oldShape[key];
    }
  } else {
    for (const key in oldShape) {
      shape[key] = Class ? new Class({
        type: "optional",
        innerType: oldShape[key]
      }) : oldShape[key];
    }
  }
  return clone(schema, {
    ...schema._zod.def,
    shape,
    checks: []
  });
}
function required(Class, schema, mask) {
  const oldShape = schema._zod.def.shape;
  const shape = { ...oldShape };
  if (mask) {
    for (const key in mask) {
      if (!(key in shape)) {
        throw new Error(`Unrecognized key: "${key}"`);
      }
      if (!mask[key])
        continue;
      shape[key] = new Class({
        type: "nonoptional",
        innerType: oldShape[key]
      });
    }
  } else {
    for (const key in oldShape) {
      shape[key] = new Class({
        type: "nonoptional",
        innerType: oldShape[key]
      });
    }
  }
  return clone(schema, {
    ...schema._zod.def,
    shape,
    // optional: [],
    checks: []
  });
}
function aborted(x, startIndex = 0) {
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true)
      return true;
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
const initializer$1 = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  Object.defineProperty(inst, "message", {
    get() {
      return JSON.stringify(def, jsonStringifyReplacer, 2);
    },
    enumerable: true
    // configurable: false,
  });
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, _mapper) {
  const mapper = _mapper || function(issue2) {
    return issue2.message;
  };
  const fieldErrors = { _errors: [] };
  const processError = (error2) => {
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}
function toDotPath(path) {
  const segs = [];
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error) {
  const lines = [];
  const issues = [...error.issues].sort((a, b) => a.path.length - b.path.length);
  for (const issue2 of issues) {
    lines.push(`✖ ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  → at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}
const _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
const safeParse$2 = /* @__PURE__ */ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
const safeParseAsync$1 = /* @__PURE__ */ _safeParseAsync($ZodRealError);
const cuid = /^[cC][^\s-]{8,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const uuid = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji$1, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
const hostname = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
const e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$2 = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time$1(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
  const time2 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-]\\d{2}:\\d{2})`);
  const timeRegex2 = `${time2}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex2})$`);
}
const string$1 = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
const integer = /^\d+$/;
const number$1 = /^-?\d+(?:\.\d+)?/i;
const boolean$2 = /true|false/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
const $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a2;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
});
const numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
const $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a2;
    (_a2 = inst2._zod.bag).multipleOf ?? (_a2.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder$1(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inst
      });
    }
  };
});
const $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a2, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {
    });
});
const $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
}
const version = {
  major: 4,
  minor: 0,
  patch: 0
};
const $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a2;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted2 = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted2) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted2)
              isAborted2 = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted2)
            isAborted2 = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    inst._zod.run = (payload, ctx) => {
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  inst["~standard"] = {
    validate: (value) => {
      try {
        const r = safeParse$2(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
});
const $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
const $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
const $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
const $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
const $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
const $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const orig = payload.value;
      const url = new URL(orig);
      const href = url.href;
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (!orig.endsWith("/") && href.endsWith("/")) {
        payload.value = href.slice(0, -1);
      } else {
        payload.value = href;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
const $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
const $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
const $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
const $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime$1(def));
  $ZodStringFormat.init(inst, def);
});
const $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date$2);
  $ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time$1(def));
  $ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = `ipv4`;
  });
});
const $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = `ipv6`;
  });
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
const $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const [address, prefix] = payload.value.split("/");
    try {
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
const $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.contentEncoding = "base64";
  });
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
  return isValidBase64(padded);
}
const $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.contentEncoding = "base64url";
  });
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT$1(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
const $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT$1(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
const $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
const $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean$2;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
const $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
const $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
const $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {
      }
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
const $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handleObjectResult(result, final, key) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(key, result.issues));
  }
  final.value[key] = result.value;
}
function handleOptionalObjectResult(result, final, key, input) {
  if (result.issues.length) {
    if (input[key] === void 0) {
      if (key in input) {
        final.value[key] = void 0;
      } else {
        final.value[key] = result.value;
      }
    } else {
      final.issues.push(...prefixIssues(key, result.issues));
    }
  } else if (result.value === void 0) {
    if (key in input)
      final.value[key] = void 0;
  } else {
    final.value[key] = result.value;
  }
}
const $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const _normalized = cached(() => {
    const keys = Object.keys(def.shape);
    for (const k of keys) {
      if (!(def.shape[k] instanceof $ZodType)) {
        throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
      }
    }
    const okeys = optionalKeys(def.shape);
    return {
      shape: def.shape,
      keys,
      keySet: new Set(keys),
      numKeys: keys.length,
      optionalKeys: new Set(okeys)
    };
  });
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {}`);
    for (const key of normalized.keys) {
      if (normalized.optionalKeys.has(key)) {
        const id = ids[key];
        doc.write(`const ${id} = ${parseStr(key)};`);
        const k = esc(key);
        doc.write(`
        if (${id}.issues.length) {
          if (input[${k}] === undefined) {
            if (${k} in input) {
              newResult[${k}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${id}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${k}, ...iss.path] : [${k}],
              }))
            );
          }
        } else if (${id}.value === undefined) {
          if (${k} in input) newResult[${k}] = undefined;
        } else {
          newResult[${k}] = ${id}.value;
        }
        `);
      } else {
        const id = ids[key];
        doc.write(`const ${id} = ${parseStr(key)};`);
        doc.write(`
          if (${id}.issues.length) payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${esc(key)}, ...iss.path] : [${esc(key)}]
          })));`);
        doc.write(`newResult[${esc(key)}] = ${id}.value`);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject$1 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval$1 = allowsEval;
  const fastEnabled = jit && allowsEval$1.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject$1(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
    } else {
      payload.value = {};
      const shape = value.shape;
      for (const key of value.keys) {
        const el = shape[key];
        const r = el._zod.run({ value: input[key], issues: [] }, ctx);
        const isOptional = el._zod.optin === "optional" && el._zod.optout === "optional";
        if (r instanceof Promise) {
          proms.push(r.then((r2) => isOptional ? handleOptionalObjectResult(r2, payload, key, input) : handleObjectResult(r2, payload, key)));
        } else if (isOptional) {
          handleOptionalObjectResult(r, payload, key, input);
        } else {
          handleObjectResult(r, payload, key);
        }
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    const unrecognized2 = [];
    const keySet = value.keySet;
    const _catchall = catchall._zod;
    const t = _catchall.def.type;
    for (const key of Object.keys(input)) {
      if (keySet.has(key))
        continue;
      if (t === "never") {
        unrecognized2.push(key);
        continue;
      }
      const r = _catchall.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handleObjectResult(r2, payload, key)));
      } else {
        handleObjectResult(r, payload, key);
      }
    }
    if (unrecognized2.length) {
      payload.issues.push({
        code: "unrecognized_keys",
        keys: unrecognized2,
        input,
        inst
      });
    }
    if (!proms.length)
      return payload;
    return Promise.all(proms).then(() => {
      return payload;
    });
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
const $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
const $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues$1(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject$1(a) && isPlainObject$1(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues$1(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues$1(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  if (left.issues.length) {
    result.issues.push(...left.issues);
  }
  if (right.issues.length) {
    result.issues.push(...right.issues);
  }
  if (aborted(result))
    return result;
  const merged = mergeValues$1(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
const $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject$1(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    if (def.keyType._zod.values) {
      const values = def.keyType._zod.values;
      payload.value = {};
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized2;
      for (const key in input) {
        if (!values.has(key)) {
          unrecognized2 = unrecognized2 ?? [];
          unrecognized2.push(key);
        }
      }
      if (unrecognized2 && unrecognized2.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized2
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        if (keyResult.issues.length) {
          payload.issues.push({
            origin: "record",
            code: "invalid_key",
            issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
            input: key,
            path: [key],
            inst
          });
          payload.value[keyResult.value] = keyResult.value;
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
const $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  inst._zod.values = new Set(values);
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (inst._zod.values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
const $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.values = new Set(def.values);
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? o.toString() : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (inst._zod.values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
const $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const _out = def.transform(payload.value, payload);
    if (_ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    return payload;
  };
});
const $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
const $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
const $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
const $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def, ctx));
    }
    return handlePipeResult(left, def, ctx);
  };
});
function handlePipeResult(left, def, ctx) {
  if (aborted(left)) {
    return left;
  }
  return def.out._zod.run({ value: left.value, issues: left.issues }, ctx);
}
const $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
const $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
const $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
class $ZodRegistry {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      if (this._idmap.has(meta.id)) {
        throw new Error(`ID ${meta.id} already exists in the registry`);
      }
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new Map();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      return { ...pm, ...this._map.get(schema) };
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry();
}
const globalRegistry = /* @__PURE__ */ registry();
function _string(Class, params) {
  return new Class({
    type: "string",
    ...normalizeParams(params)
  });
}
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class, params) {
  return new Class({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class, params) {
  return new Class({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _any(Class) {
  return new Class({
    type: "any"
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown"
  });
}
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params)
  });
}
function _date(Class, params) {
  return new Class({
    type: "date",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
function _custom(Class, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
class JSONSchemaGenerator {
  constructor(params) {
    this.counter = 0;
    this.metadataRegistry = params?.metadata ?? globalRegistry;
    this.target = params?.target ?? "draft-2020-12";
    this.unrepresentable = params?.unrepresentable ?? "throw";
    this.override = params?.override ?? (() => {
    });
    this.io = params?.io ?? "output";
    this.seen = /* @__PURE__ */ new Map();
  }
  process(schema, _params = { path: [], schemaPath: [] }) {
    var _a2;
    const def = schema._zod.def;
    const formatMap = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: ""
      // do not set
    };
    const seen = this.seen.get(schema);
    if (seen) {
      seen.count++;
      const isCycle = _params.schemaPath.includes(schema);
      if (isCycle) {
        seen.cycle = _params.path;
      }
      return seen.schema;
    }
    const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
    this.seen.set(schema, result);
    const overrideSchema = schema._zod.toJSONSchema?.();
    if (overrideSchema) {
      result.schema = overrideSchema;
    } else {
      const params = {
        ..._params,
        schemaPath: [..._params.schemaPath, schema],
        path: _params.path
      };
      const parent = schema._zod.parent;
      if (parent) {
        result.ref = parent;
        this.process(parent, params);
        this.seen.get(parent).isParent = true;
      } else {
        const _json = result.schema;
        switch (def.type) {
          case "string": {
            const json2 = _json;
            json2.type = "string";
            const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
            if (typeof minimum === "number")
              json2.minLength = minimum;
            if (typeof maximum === "number")
              json2.maxLength = maximum;
            if (format) {
              json2.format = formatMap[format] ?? format;
              if (json2.format === "")
                delete json2.format;
            }
            if (contentEncoding)
              json2.contentEncoding = contentEncoding;
            if (patterns && patterns.size > 0) {
              const regexes = [...patterns];
              if (regexes.length === 1)
                json2.pattern = regexes[0].source;
              else if (regexes.length > 1) {
                result.schema.allOf = [
                  ...regexes.map((regex) => ({
                    ...this.target === "draft-7" ? { type: "string" } : {},
                    pattern: regex.source
                  }))
                ];
              }
            }
            break;
          }
          case "number": {
            const json2 = _json;
            const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
            if (typeof format === "string" && format.includes("int"))
              json2.type = "integer";
            else
              json2.type = "number";
            if (typeof exclusiveMinimum === "number")
              json2.exclusiveMinimum = exclusiveMinimum;
            if (typeof minimum === "number") {
              json2.minimum = minimum;
              if (typeof exclusiveMinimum === "number") {
                if (exclusiveMinimum >= minimum)
                  delete json2.minimum;
                else
                  delete json2.exclusiveMinimum;
              }
            }
            if (typeof exclusiveMaximum === "number")
              json2.exclusiveMaximum = exclusiveMaximum;
            if (typeof maximum === "number") {
              json2.maximum = maximum;
              if (typeof exclusiveMaximum === "number") {
                if (exclusiveMaximum <= maximum)
                  delete json2.maximum;
                else
                  delete json2.exclusiveMaximum;
              }
            }
            if (typeof multipleOf === "number")
              json2.multipleOf = multipleOf;
            break;
          }
          case "boolean": {
            const json2 = _json;
            json2.type = "boolean";
            break;
          }
          case "bigint": {
            if (this.unrepresentable === "throw") {
              throw new Error("BigInt cannot be represented in JSON Schema");
            }
            break;
          }
          case "symbol": {
            if (this.unrepresentable === "throw") {
              throw new Error("Symbols cannot be represented in JSON Schema");
            }
            break;
          }
          case "null": {
            _json.type = "null";
            break;
          }
          case "any": {
            break;
          }
          case "unknown": {
            break;
          }
          case "undefined": {
            if (this.unrepresentable === "throw") {
              throw new Error("Undefined cannot be represented in JSON Schema");
            }
            break;
          }
          case "void": {
            if (this.unrepresentable === "throw") {
              throw new Error("Void cannot be represented in JSON Schema");
            }
            break;
          }
          case "never": {
            _json.not = {};
            break;
          }
          case "date": {
            if (this.unrepresentable === "throw") {
              throw new Error("Date cannot be represented in JSON Schema");
            }
            break;
          }
          case "array": {
            const json2 = _json;
            const { minimum, maximum } = schema._zod.bag;
            if (typeof minimum === "number")
              json2.minItems = minimum;
            if (typeof maximum === "number")
              json2.maxItems = maximum;
            json2.type = "array";
            json2.items = this.process(def.element, { ...params, path: [...params.path, "items"] });
            break;
          }
          case "object": {
            const json2 = _json;
            json2.type = "object";
            json2.properties = {};
            const shape = def.shape;
            for (const key in shape) {
              json2.properties[key] = this.process(shape[key], {
                ...params,
                path: [...params.path, "properties", key]
              });
            }
            const allKeys = new Set(Object.keys(shape));
            const requiredKeys = new Set([...allKeys].filter((key) => {
              const v = def.shape[key]._zod;
              if (this.io === "input") {
                return v.optin === void 0;
              } else {
                return v.optout === void 0;
              }
            }));
            if (requiredKeys.size > 0) {
              json2.required = Array.from(requiredKeys);
            }
            if (def.catchall?._zod.def.type === "never") {
              json2.additionalProperties = false;
            } else if (!def.catchall) {
              if (this.io === "output")
                json2.additionalProperties = false;
            } else if (def.catchall) {
              json2.additionalProperties = this.process(def.catchall, {
                ...params,
                path: [...params.path, "additionalProperties"]
              });
            }
            break;
          }
          case "union": {
            const json2 = _json;
            json2.anyOf = def.options.map((x, i) => this.process(x, {
              ...params,
              path: [...params.path, "anyOf", i]
            }));
            break;
          }
          case "intersection": {
            const json2 = _json;
            const a = this.process(def.left, {
              ...params,
              path: [...params.path, "allOf", 0]
            });
            const b = this.process(def.right, {
              ...params,
              path: [...params.path, "allOf", 1]
            });
            const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
            const allOf = [
              ...isSimpleIntersection(a) ? a.allOf : [a],
              ...isSimpleIntersection(b) ? b.allOf : [b]
            ];
            json2.allOf = allOf;
            break;
          }
          case "tuple": {
            const json2 = _json;
            json2.type = "array";
            const prefixItems = def.items.map((x, i) => this.process(x, { ...params, path: [...params.path, "prefixItems", i] }));
            if (this.target === "draft-2020-12") {
              json2.prefixItems = prefixItems;
            } else {
              json2.items = prefixItems;
            }
            if (def.rest) {
              const rest = this.process(def.rest, {
                ...params,
                path: [...params.path, "items"]
              });
              if (this.target === "draft-2020-12") {
                json2.items = rest;
              } else {
                json2.additionalItems = rest;
              }
            }
            if (def.rest) {
              json2.items = this.process(def.rest, {
                ...params,
                path: [...params.path, "items"]
              });
            }
            const { minimum, maximum } = schema._zod.bag;
            if (typeof minimum === "number")
              json2.minItems = minimum;
            if (typeof maximum === "number")
              json2.maxItems = maximum;
            break;
          }
          case "record": {
            const json2 = _json;
            json2.type = "object";
            json2.propertyNames = this.process(def.keyType, { ...params, path: [...params.path, "propertyNames"] });
            json2.additionalProperties = this.process(def.valueType, {
              ...params,
              path: [...params.path, "additionalProperties"]
            });
            break;
          }
          case "map": {
            if (this.unrepresentable === "throw") {
              throw new Error("Map cannot be represented in JSON Schema");
            }
            break;
          }
          case "set": {
            if (this.unrepresentable === "throw") {
              throw new Error("Set cannot be represented in JSON Schema");
            }
            break;
          }
          case "enum": {
            const json2 = _json;
            const values = getEnumValues(def.entries);
            if (values.every((v) => typeof v === "number"))
              json2.type = "number";
            if (values.every((v) => typeof v === "string"))
              json2.type = "string";
            json2.enum = values;
            break;
          }
          case "literal": {
            const json2 = _json;
            const vals = [];
            for (const val of def.values) {
              if (val === void 0) {
                if (this.unrepresentable === "throw") {
                  throw new Error("Literal `undefined` cannot be represented in JSON Schema");
                }
              } else if (typeof val === "bigint") {
                if (this.unrepresentable === "throw") {
                  throw new Error("BigInt literals cannot be represented in JSON Schema");
                } else {
                  vals.push(Number(val));
                }
              } else {
                vals.push(val);
              }
            }
            if (vals.length === 0) ;
            else if (vals.length === 1) {
              const val = vals[0];
              json2.type = val === null ? "null" : typeof val;
              json2.const = val;
            } else {
              if (vals.every((v) => typeof v === "number"))
                json2.type = "number";
              if (vals.every((v) => typeof v === "string"))
                json2.type = "string";
              if (vals.every((v) => typeof v === "boolean"))
                json2.type = "string";
              if (vals.every((v) => v === null))
                json2.type = "null";
              json2.enum = vals;
            }
            break;
          }
          case "file": {
            const json2 = _json;
            const file = {
              type: "string",
              format: "binary",
              contentEncoding: "binary"
            };
            const { minimum, maximum, mime } = schema._zod.bag;
            if (minimum !== void 0)
              file.minLength = minimum;
            if (maximum !== void 0)
              file.maxLength = maximum;
            if (mime) {
              if (mime.length === 1) {
                file.contentMediaType = mime[0];
                Object.assign(json2, file);
              } else {
                json2.anyOf = mime.map((m) => {
                  const mFile = { ...file, contentMediaType: m };
                  return mFile;
                });
              }
            } else {
              Object.assign(json2, file);
            }
            break;
          }
          case "transform": {
            if (this.unrepresentable === "throw") {
              throw new Error("Transforms cannot be represented in JSON Schema");
            }
            break;
          }
          case "nullable": {
            const inner = this.process(def.innerType, params);
            _json.anyOf = [inner, { type: "null" }];
            break;
          }
          case "nonoptional": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            break;
          }
          case "success": {
            const json2 = _json;
            json2.type = "boolean";
            break;
          }
          case "default": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            _json.default = JSON.parse(JSON.stringify(def.defaultValue));
            break;
          }
          case "prefault": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            if (this.io === "input")
              _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
            break;
          }
          case "catch": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            let catchValue;
            try {
              catchValue = def.catchValue(void 0);
            } catch {
              throw new Error("Dynamic catch values are not supported in JSON Schema");
            }
            _json.default = catchValue;
            break;
          }
          case "nan": {
            if (this.unrepresentable === "throw") {
              throw new Error("NaN cannot be represented in JSON Schema");
            }
            break;
          }
          case "template_literal": {
            const json2 = _json;
            const pattern = schema._zod.pattern;
            if (!pattern)
              throw new Error("Pattern not found in template literal");
            json2.type = "string";
            json2.pattern = pattern.source;
            break;
          }
          case "pipe": {
            const innerType = this.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
            this.process(innerType, params);
            result.ref = innerType;
            break;
          }
          case "readonly": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            _json.readOnly = true;
            break;
          }
          // passthrough types
          case "promise": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            break;
          }
          case "optional": {
            this.process(def.innerType, params);
            result.ref = def.innerType;
            break;
          }
          case "lazy": {
            const innerType = schema._zod.innerType;
            this.process(innerType, params);
            result.ref = innerType;
            break;
          }
          case "custom": {
            if (this.unrepresentable === "throw") {
              throw new Error("Custom types cannot be represented in JSON Schema");
            }
            break;
          }
        }
      }
    }
    const meta = this.metadataRegistry.get(schema);
    if (meta)
      Object.assign(result.schema, meta);
    if (this.io === "input" && isTransforming(schema)) {
      delete result.schema.examples;
      delete result.schema.default;
    }
    if (this.io === "input" && result.schema._prefault)
      (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
    delete result.schema._prefault;
    const _result = this.seen.get(schema);
    return _result.schema;
  }
  emit(schema, _params) {
    const params = {
      cycles: _params?.cycles ?? "ref",
      reused: _params?.reused ?? "inline",
      // unrepresentable: _params?.unrepresentable ?? "throw",
      // uri: _params?.uri ?? ((id) => `${id}`),
      external: _params?.external ?? void 0
    };
    const root = this.seen.get(schema);
    if (!root)
      throw new Error("Unprocessed schema. This is a bug in Zod.");
    const makeURI = (entry) => {
      const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
      if (params.external) {
        const externalId = params.external.registry.get(entry[0])?.id;
        const uriGenerator = params.external.uri ?? ((id2) => id2);
        if (externalId) {
          return { ref: uriGenerator(externalId) };
        }
        const id = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
        entry[1].defId = id;
        return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
      }
      if (entry[1] === root) {
        return { ref: "#" };
      }
      const uriPrefix = `#`;
      const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
      const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
      return { defId, ref: defUriPrefix + defId };
    };
    const extractToDef = (entry) => {
      if (entry[1].schema.$ref) {
        return;
      }
      const seen = entry[1];
      const { ref: ref2, defId } = makeURI(entry);
      seen.def = { ...seen.schema };
      if (defId)
        seen.defId = defId;
      const schema2 = seen.schema;
      for (const key in schema2) {
        delete schema2[key];
      }
      schema2.$ref = ref2;
    };
    if (params.cycles === "throw") {
      for (const entry of this.seen.entries()) {
        const seen = entry[1];
        if (seen.cycle) {
          throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
      }
    }
    for (const entry of this.seen.entries()) {
      const seen = entry[1];
      if (schema === entry[0]) {
        extractToDef(entry);
        continue;
      }
      if (params.external) {
        const ext = params.external.registry.get(entry[0])?.id;
        if (schema !== entry[0] && ext) {
          extractToDef(entry);
          continue;
        }
      }
      const id = this.metadataRegistry.get(entry[0])?.id;
      if (id) {
        extractToDef(entry);
        continue;
      }
      if (seen.cycle) {
        extractToDef(entry);
        continue;
      }
      if (seen.count > 1) {
        if (params.reused === "ref") {
          extractToDef(entry);
          continue;
        }
      }
    }
    const flattenRef = (zodSchema, params2) => {
      const seen = this.seen.get(zodSchema);
      const schema2 = seen.def ?? seen.schema;
      const _cached = { ...schema2 };
      if (seen.ref === null) {
        return;
      }
      const ref2 = seen.ref;
      seen.ref = null;
      if (ref2) {
        flattenRef(ref2, params2);
        const refSchema = this.seen.get(ref2).schema;
        if (refSchema.$ref && params2.target === "draft-7") {
          schema2.allOf = schema2.allOf ?? [];
          schema2.allOf.push(refSchema);
        } else {
          Object.assign(schema2, refSchema);
          Object.assign(schema2, _cached);
        }
      }
      if (!seen.isParent)
        this.override({
          zodSchema,
          jsonSchema: schema2,
          path: seen.path ?? []
        });
    };
    for (const entry of [...this.seen.entries()].reverse()) {
      flattenRef(entry[0], { target: this.target });
    }
    const result = {};
    if (this.target === "draft-2020-12") {
      result.$schema = "https://json-schema.org/draft/2020-12/schema";
    } else if (this.target === "draft-7") {
      result.$schema = "http://json-schema.org/draft-07/schema#";
    } else {
      console.warn(`Invalid target: ${this.target}`);
    }
    if (params.external?.uri) {
      const id = params.external.registry.get(schema)?.id;
      if (!id)
        throw new Error("Schema is missing an `id` property");
      result.$id = params.external.uri(id);
    }
    Object.assign(result, root.def);
    const defs = params.external?.defs ?? {};
    for (const entry of this.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        defs[seen.defId] = seen.def;
      }
    }
    if (params.external) ;
    else {
      if (Object.keys(defs).length > 0) {
        if (this.target === "draft-2020-12") {
          result.$defs = defs;
        } else {
          result.definitions = defs;
        }
      }
    }
    try {
      return JSON.parse(JSON.stringify(result));
    } catch (_err) {
      throw new Error("Error converting schema to JSON.");
    }
  }
}
function toJSONSchema(input, _params) {
  if (input instanceof $ZodRegistry) {
    const gen2 = new JSONSchemaGenerator(_params);
    const defs = {};
    for (const entry of input._idmap.entries()) {
      const [_, schema] = entry;
      gen2.process(schema);
    }
    const schemas = {};
    const external = {
      registry: input,
      uri: _params?.uri,
      defs
    };
    for (const entry of input._idmap.entries()) {
      const [key, schema] = entry;
      schemas[key] = gen2.emit(schema, {
        ..._params,
        external
      });
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = gen2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const gen = new JSONSchemaGenerator(_params);
  gen.process(input);
  return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const schema = _schema;
  const def = schema._zod.def;
  switch (def.type) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "date":
    case "symbol":
    case "undefined":
    case "null":
    case "any":
    case "unknown":
    case "never":
    case "void":
    case "literal":
    case "enum":
    case "nan":
    case "file":
    case "template_literal":
      return false;
    case "array": {
      return isTransforming(def.element, ctx);
    }
    case "object": {
      for (const key in def.shape) {
        if (isTransforming(def.shape[key], ctx))
          return true;
      }
      return false;
    }
    case "union": {
      for (const option of def.options) {
        if (isTransforming(option, ctx))
          return true;
      }
      return false;
    }
    case "intersection": {
      return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    case "tuple": {
      for (const item of def.items) {
        if (isTransforming(item, ctx))
          return true;
      }
      if (def.rest && isTransforming(def.rest, ctx))
        return true;
      return false;
    }
    case "record": {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    case "map": {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    case "set": {
      return isTransforming(def.valueType, ctx);
    }
    // inner types
    case "promise":
    case "optional":
    case "nonoptional":
    case "nullable":
    case "readonly":
      return isTransforming(def.innerType, ctx);
    case "lazy":
      return isTransforming(def.getter(), ctx);
    case "default": {
      return isTransforming(def.innerType, ctx);
    }
    case "prefault": {
      return isTransforming(def.innerType, ctx);
    }
    case "custom": {
      return false;
    }
    case "transform": {
      return true;
    }
    case "pipe": {
      return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    case "success": {
      return false;
    }
    case "catch": {
      return false;
    }
  }
  throw new Error(`Unknown schema type: ${def.type}`);
}
const ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime(params) {
  return _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date$1(params) {
  return _isoDate(ZodISODate, params);
}
const ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time(params) {
  return _isoTime(ZodISOTime, params);
}
const ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration(params) {
  return _isoDuration(ZodISODuration, params);
}
const initializer = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => inst.issues.push(issue2)
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => inst.issues.push(...issues2)
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
const ZodRealError = $constructor("ZodError", initializer, {
  Parent: Error
});
const parse = /* @__PURE__ */ _parse(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse$1 = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const ZodType$1 = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  inst.def = def;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(
      {
        ...def,
        checks: [
          ...def.checks ?? [],
          ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
        ]
      }
      // { parent: true }
    );
  };
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta) => {
    reg.add(inst, meta);
    return inst;
  });
  inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse$1(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.refine = (check2, params) => inst.check(refine(check2, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(void 0).success;
  inst.isNullable = () => inst.safeParse(null).success;
  return inst;
});
const _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType$1.init(inst, def);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
});
const ZodString$1 = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime(params));
  inst.date = (params) => inst.check(date$1(params));
  inst.time = (params) => inst.check(time(params));
  inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
  return _string(ZodString$1, params);
}
const ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
const ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
const ZodNumber$1 = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType$1.init(inst, def);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number(params) {
  return _number(ZodNumber$1, params);
}
const ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber$1.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
const ZodBoolean$1 = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType$1.init(inst, def);
});
function boolean$1(params) {
  return _boolean(ZodBoolean$1, params);
}
const ZodAny$1 = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType$1.init(inst, def);
});
function any() {
  return _any(ZodAny$1);
}
const ZodUnknown$1 = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType$1.init(inst, def);
});
function unknown() {
  return _unknown(ZodUnknown$1);
}
const ZodNever$1 = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType$1.init(inst, def);
});
function never(params) {
  return _never(ZodNever$1, params);
}
const ZodDate$1 = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType$1.init(inst, def);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
  return _date(ZodDate$1, params);
}
const ZodArray$1 = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType$1.init(inst, def);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray$1, element, params);
}
const ZodObject$1 = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObject.init(inst, def);
  ZodType$1.init(inst, def);
  defineLazy(inst, "shape", () => def.shape);
  inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
  inst.extend = (incoming) => {
    return extend(inst, incoming);
  };
  inst.merge = (other) => merge(inst, other);
  inst.pick = (mask) => pick(inst, mask);
  inst.omit = (mask) => omit(inst, mask);
  inst.partial = (...args) => partial(ZodOptional$1, inst, args[0]);
  inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    ...normalizeParams(params)
  };
  return new ZodObject$1(def);
}
const ZodUnion$1 = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType$1.init(inst, def);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion$1({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
const ZodIntersection$1 = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType$1.init(inst, def);
});
function intersection(left, right) {
  return new ZodIntersection$1({
    type: "intersection",
    left,
    right
  });
}
const ZodRecord$1 = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType$1.init(inst, def);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord$1({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
const ZodEnum$1 = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType$1.init(inst, def);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum$1({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum$1({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum$1({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
const ZodLiteral$1 = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType$1.init(inst, def);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral$1({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
const ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType$1.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.addIssue = (issue$1) => {
      if (typeof issue$1 === "string") {
        payload.issues.push(issue(issue$1, payload.value, def));
      } else {
        const _issue = issue$1;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        _issue.continue ?? (_issue.continue = true);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
const ZodOptional$1 = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional$1({
    type: "optional",
    innerType
  });
}
const ZodNullable$1 = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable$1({
    type: "nullable",
    innerType
  });
}
const ZodDefault$1 = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
  return new ZodDefault$1({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
const ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
const ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
const ZodCatch$1 = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
  return new ZodCatch$1({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
const ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType$1.init(inst, def);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
const ZodReadonly$1 = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType$1.init(inst, def);
});
function readonly(innerType) {
  return new ZodReadonly$1({
    type: "readonly",
    innerType
  });
}
const ZodLazy$1 = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType$1.init(inst, def);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy$1({
    type: "lazy",
    getter
  });
}
const ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType$1.init(inst, def);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom$1(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  const ch = check((payload) => {
    payload.addIssue = (issue$1) => {
      if (typeof issue$1 === "string") {
        payload.issues.push(issue(issue$1, payload.value, ch._zod.def));
      } else {
        const _issue = issue$1;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
function boolean(params) {
  return _coercedBoolean(ZodBoolean$1, params);
}
function bytesToBase64(u8arr) {
  return btoa(String.fromCodePoint(...u8arr));
}
function bytesFromBase64(encoded) {
  return Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
}
function stringToBytes(str) {
  return new TextEncoder().encode(str);
}
function stringToBase64(str) {
  return bytesToBase64(stringToBytes(str));
}
custom$1((x) => x instanceof Uint8Array).or(string().transform(stringToBytes));
custom$1((x) => x instanceof Uint8Array).or(string().transform(bytesFromBase64));
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function formEncoder(sep) {
  return (key, value, options) => {
    let out = "";
    const pairs = options?.explode ? explode(key, value) : [[key, value]];
    if (pairs.every(([_, v]) => v == null)) {
      return;
    }
    const encodeString = (v) => {
      return options?.charEncoding === "percent" ? encodeURIComponent(v) : v;
    };
    const encodeValue = (v) => encodeString(serializeValue(v));
    const encodedSep = encodeString(sep);
    pairs.forEach(([pk, pv]) => {
      let tmp = "";
      let encValue = null;
      if (pv == null) {
        return;
      } else if (Array.isArray(pv)) {
        encValue = mapDefined(pv, (v) => `${encodeValue(v)}`)?.join(encodedSep);
      } else if (isPlainObject(pv)) {
        encValue = mapDefinedEntries(Object.entries(pv), ([k, v]) => {
          return `${encodeString(k)}${encodedSep}${encodeValue(v)}`;
        })?.join(encodedSep);
      } else {
        encValue = `${encodeValue(pv)}`;
      }
      if (encValue == null) {
        return;
      }
      tmp = `${encodeString(pk)}=${encValue}`;
      if (!tmp || tmp === "=") {
        return;
      }
      out += `&${tmp}`;
    });
    return out.slice(1);
  };
}
const encodeForm = formEncoder(",");
function encodeJSON(key, value, options) {
  if (typeof value === "undefined") {
    return;
  }
  const encodeString = (v) => {
    return options?.charEncoding === "percent" ? encodeURIComponent(v) : v;
  };
  const encVal = encodeString(JSON.stringify(value, jsonReplacer));
  return options?.explode ? encVal : `${encodeString(key)}=${encVal}`;
}
const encodeSimple = (key, value, options) => {
  let out = "";
  const pairs = options?.explode ? explode(key, value) : [[key, value]];
  if (pairs.every(([_, v]) => v == null)) {
    return;
  }
  const encodeString = (v) => {
    return options?.charEncoding === "percent" ? encodeURIComponent(v) : v;
  };
  const encodeValue = (v) => encodeString(serializeValue(v));
  pairs.forEach(([pk, pv]) => {
    let tmp = "";
    if (pv == null) {
      return;
    } else if (Array.isArray(pv)) {
      tmp = mapDefined(pv, (v) => `${encodeValue(v)}`)?.join(",");
    } else if (isPlainObject(pv)) {
      const mapped = mapDefinedEntries(Object.entries(pv), ([k, v]) => {
        return `,${encodeString(k)},${encodeValue(v)}`;
      });
      tmp = mapped?.join("").slice(1);
    } else {
      const k = options?.explode && isPlainObject(value) ? `${pk}=` : "";
      tmp = `${k}${encodeValue(pv)}`;
    }
    out += tmp ? `,${tmp}` : "";
  });
  return out.slice(1);
};
function explode(key, value) {
  if (Array.isArray(value)) {
    return value.map((v) => [key, v]);
  } else if (isPlainObject(value)) {
    const o = value ?? {};
    return Object.entries(o).map(([k, v]) => [k, v]);
  } else {
    return [[key, value]];
  }
}
function serializeValue(value) {
  if (value == null) {
    return "";
  } else if (value instanceof Date) {
    return value.toISOString();
  } else if (value instanceof Uint8Array) {
    return bytesToBase64(value);
  } else if (typeof value === "object") {
    return JSON.stringify(value, jsonReplacer);
  }
  return `${value}`;
}
function jsonReplacer(_, value) {
  if (value instanceof Uint8Array) {
    return bytesToBase64(value);
  } else {
    return value;
  }
}
function mapDefined(inp, mapper) {
  const res = inp.reduce((acc, v) => {
    if (v == null) {
      return acc;
    }
    const m = mapper(v);
    if (m == null) {
      return acc;
    }
    acc.push(m);
    return acc;
  }, []);
  return res.length ? res : null;
}
function mapDefinedEntries(inp, mapper) {
  const acc = [];
  for (const [k, v] of inp) {
    if (v == null) {
      continue;
    }
    const m = mapper([k, v]);
    if (m == null) {
      continue;
    }
    acc.push(m);
  }
  return acc.length ? acc : null;
}
function queryJoin(...args) {
  return args.filter(Boolean).join("&");
}
function queryEncoder(f) {
  const bulkEncode = function(values, options) {
    const opts = {
      ...options,
      explode: options?.explode ?? true,
      charEncoding: options?.charEncoding ?? "percent"
    };
    const allowEmptySet = new Set(options?.allowEmptyValue ?? []);
    const encoded = Object.entries(values).map(([key, value]) => {
      if (allowEmptySet.has(key)) {
        if (value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0) {
          return `${encodeURIComponent(key)}=`;
        }
      }
      return f(key, value, opts);
    });
    return queryJoin(...encoded);
  };
  return bulkEncode;
}
const encodeFormQuery = queryEncoder(encodeForm);
function dlv(obj, key, def, p, undef) {
  key = Array.isArray(key) ? key : key.split(".");
  for (p = 0; p < key.length; p++) {
    const k = key[p];
    obj = k != null && obj ? obj[k] : undef;
  }
  return obj === undef ? def : obj;
}
const envSchema = object({
  OPENROUTER_API_KEY: string().optional(),
  OPENROUTER_HTTP_REFERER: string().optional(),
  OPENROUTER_APP_TITLE: string().optional(),
  OPENROUTER_APP_CATEGORIES: string().optional(),
  OPENROUTER_DEBUG: boolean().optional()
});
function isDeno() {
  if ("Deno" in globalThis) {
    return true;
  }
  return false;
}
let envMemo = void 0;
function env() {
  if (envMemo) {
    return envMemo;
  }
  let envObject = {};
  if (isDeno()) {
    envObject = globalThis.Deno?.env?.toObject?.() ?? {};
  } else {
    envObject = dlv(globalThis, "process.env") ?? {};
  }
  envMemo = envSchema.parse(envObject);
  return envMemo;
}
function fillGlobals(options) {
  const clone2 = { ...options };
  const envVars = env();
  if (typeof envVars.OPENROUTER_HTTP_REFERER !== "undefined") {
    clone2.httpReferer ?? (clone2.httpReferer = envVars.OPENROUTER_HTTP_REFERER);
  }
  if (typeof envVars.OPENROUTER_APP_TITLE !== "undefined") {
    clone2.appTitle ?? (clone2.appTitle = envVars.OPENROUTER_APP_TITLE);
  }
  if (typeof envVars.OPENROUTER_APP_CATEGORIES !== "undefined") {
    clone2.appCategories ?? (clone2.appCategories = envVars.OPENROUTER_APP_CATEGORIES);
  }
  return clone2;
}
const defaultBackoff = {
  initialInterval: 500,
  maxInterval: 6e4,
  exponent: 1.5,
  maxElapsedTime: 36e5
};
class PermanentError extends Error {
  constructor(message, options) {
    let msg = message;
    if (options?.cause) {
      msg += `: ${options.cause}`;
    }
    super(msg, options);
    this.name = "PermanentError";
    if (typeof this.cause === "undefined") {
      this.cause = options?.cause;
    }
    Object.setPrototypeOf(this, PermanentError.prototype);
  }
}
class TemporaryError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
    this.name = "TemporaryError";
    Object.setPrototypeOf(this, TemporaryError.prototype);
  }
}
async function retry(fetchFn, options) {
  switch (options.config.strategy) {
    case "backoff":
      return retryBackoff(wrapFetcher(fetchFn, {
        statusCodes: options.statusCodes,
        retryConnectionErrors: !!options.config.retryConnectionErrors
      }), options.config.backoff ?? defaultBackoff);
    default:
      return await fetchFn();
  }
}
function wrapFetcher(fn, options) {
  return async () => {
    try {
      const res = await fn();
      if (isRetryableResponse(res, options.statusCodes)) {
        throw new TemporaryError("Response failed with retryable status code", res);
      }
      return res;
    } catch (err) {
      if (err instanceof TemporaryError) {
        throw err;
      }
      if (options.retryConnectionErrors && (isTimeoutError(err) || isConnectionError(err))) {
        throw err;
      }
      throw new PermanentError("Permanent error", { cause: err });
    }
  };
}
const codeRangeRE = new RegExp("^[0-9]xx$", "i");
function isRetryableResponse(res, statusCodes) {
  const actual = `${res.status}`;
  return statusCodes.some((code) => {
    if (!codeRangeRE.test(code)) {
      return code === actual;
    }
    const expectFamily = code.charAt(0);
    if (!expectFamily) {
      throw new Error("Invalid status code range");
    }
    const actualFamily = actual.charAt(0);
    if (!actualFamily) {
      throw new Error(`Invalid response status code: ${actual}`);
    }
    return actualFamily === expectFamily;
  });
}
async function retryBackoff(fn, strategy) {
  const { maxElapsedTime, initialInterval, exponent, maxInterval } = strategy;
  const start = Date.now();
  let x = 0;
  while (true) {
    try {
      const res = await fn();
      return res;
    } catch (err) {
      if (err instanceof PermanentError) {
        throw err.cause;
      }
      const elapsed = Date.now() - start;
      if (elapsed > maxElapsedTime) {
        if (err instanceof TemporaryError) {
          return err.response;
        }
        throw err;
      }
      let retryInterval = 0;
      if (err instanceof TemporaryError) {
        retryInterval = retryIntervalFromResponse(err.response);
      }
      if (retryInterval <= 0) {
        retryInterval = initialInterval * Math.pow(x, exponent) + Math.random() * 1e3;
      }
      const d = Math.min(retryInterval, maxInterval);
      await delay(d);
      x++;
    }
  }
}
function retryIntervalFromResponse(res) {
  const retryVal = res.headers.get("retry-after") || "";
  if (!retryVal) {
    return 0;
  }
  const parsedNumber = Number(retryVal);
  if (Number.isInteger(parsedNumber)) {
    return parsedNumber * 1e3;
  }
  const parsedDate = Date.parse(retryVal);
  if (Number.isInteger(parsedDate)) {
    const deltaMS = parsedDate - Date.now();
    return deltaMS > 0 ? Math.ceil(deltaMS) : 0;
  }
  return 0;
}
async function delay(delay2) {
  return new Promise((resolve) => setTimeout(resolve, delay2));
}
var __classPrivateFieldSet$1 = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet$1 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ClientSDK_httpClient, _ClientSDK_hooks, _ClientSDK_logger;
const gt = typeof globalThis === "undefined" ? null : globalThis;
const webWorkerLike = typeof gt === "object" && gt != null && "importScripts" in gt && typeof gt["importScripts"] === "function";
const isBrowserLike = webWorkerLike || typeof navigator !== "undefined" && "serviceWorker" in navigator || typeof window === "object" && typeof window.document !== "undefined";
class ClientSDK {
  constructor(options = {}) {
    _ClientSDK_httpClient.set(this, void 0);
    _ClientSDK_hooks.set(this, void 0);
    _ClientSDK_logger.set(this, void 0);
    const opt = options;
    if (typeof opt === "object" && opt != null && "hooks" in opt && opt.hooks instanceof SDKHooks) {
      __classPrivateFieldSet$1(this, _ClientSDK_hooks, opt.hooks, "f");
    } else {
      __classPrivateFieldSet$1(this, _ClientSDK_hooks, new SDKHooks(), "f");
    }
    const defaultHttpClient = new HTTPClient();
    options.httpClient = options.httpClient || defaultHttpClient;
    options = __classPrivateFieldGet$1(this, _ClientSDK_hooks, "f").sdkInit(options);
    const url = serverURLFromOptions(options);
    if (url) {
      url.pathname = url.pathname.replace(/\/+$/, "") + "/";
    }
    this._baseURL = url;
    __classPrivateFieldSet$1(this, _ClientSDK_httpClient, options.httpClient || defaultHttpClient, "f");
    this._options = { ...fillGlobals(options), hooks: __classPrivateFieldGet$1(this, _ClientSDK_hooks, "f") };
    __classPrivateFieldSet$1(this, _ClientSDK_logger, this._options.debugLogger, "f");
    if (!__classPrivateFieldGet$1(this, _ClientSDK_logger, "f") && env().OPENROUTER_DEBUG) {
      __classPrivateFieldSet$1(this, _ClientSDK_logger, console, "f");
    }
  }
  _createRequest(context, conf, options) {
    const { method, path, query, headers: opHeaders, security } = conf;
    const base = conf.baseURL ?? this._baseURL;
    if (!base) {
      return ERR(new InvalidRequestError("No base URL provided for operation"));
    }
    const baseURL = new URL(base);
    let reqURL;
    if (path) {
      baseURL.pathname = baseURL.pathname.replace(/\/+$/, "") + "/";
      reqURL = new URL(path, baseURL);
    } else {
      reqURL = baseURL;
    }
    reqURL.hash = "";
    let finalQuery = query || "";
    const secQuery = [];
    for (const [k, v] of Object.entries(security?.queryParams || {})) {
      const q = encodeForm(k, v, { charEncoding: "percent" });
      if (typeof q !== "undefined") {
        secQuery.push(q);
      }
    }
    if (secQuery.length) {
      finalQuery += `&${secQuery.join("&")}`;
    }
    if (finalQuery) {
      const q = finalQuery.startsWith("&") ? finalQuery.slice(1) : finalQuery;
      reqURL.search = `?${q}`;
    }
    const headers = new Headers(opHeaders);
    const username = security?.basic.username;
    const password = security?.basic.password;
    if (username != null || password != null) {
      const encoded = stringToBase64([username || "", password || ""].join(":"));
      headers.set("Authorization", `Basic ${encoded}`);
    }
    const securityHeaders = new Headers(security?.headers || {});
    for (const [k, v] of securityHeaders) {
      headers.set(k, v);
    }
    let cookie = headers.get("cookie") || "";
    for (const [k, v] of Object.entries(security?.cookies || {})) {
      cookie += `; ${k}=${v}`;
    }
    cookie = cookie.startsWith("; ") ? cookie.slice(2) : cookie;
    headers.set("cookie", cookie);
    const userHeaders = new Headers(options?.headers ?? options?.fetchOptions?.headers);
    for (const [k, v] of userHeaders) {
      headers.set(k, v);
    }
    if (!isBrowserLike) {
      headers.set(conf.uaHeader ?? "user-agent", conf.userAgent ?? SDK_METADATA.userAgent);
    }
    const fetchOptions = {
      ...options?.fetchOptions,
      ...options
    };
    if (!fetchOptions?.signal && conf.timeoutMs && conf.timeoutMs > 0) {
      const timeoutSignal = AbortSignal.timeout(conf.timeoutMs);
      fetchOptions.signal = timeoutSignal;
    }
    if (conf.body instanceof ReadableStream) {
      Object.assign(fetchOptions, { duplex: "half" });
    }
    let input;
    try {
      input = __classPrivateFieldGet$1(this, _ClientSDK_hooks, "f").beforeCreateRequest(context, {
        url: reqURL,
        options: {
          ...fetchOptions,
          body: conf.body ?? null,
          headers,
          method
        }
      });
    } catch (err) {
      return ERR(new UnexpectedClientError("Create request hook failed to execute", {
        cause: err
      }));
    }
    return OK$1(new Request(input.url, input.options));
  }
  async _do(request, options) {
    const { context, errorCodes } = options;
    return retry(async () => {
      const req = await __classPrivateFieldGet$1(this, _ClientSDK_hooks, "f").beforeRequest(context, request.clone());
      await logRequest(__classPrivateFieldGet$1(this, _ClientSDK_logger, "f"), req).catch((e) => __classPrivateFieldGet$1(this, _ClientSDK_logger, "f")?.log("Failed to log request:", e));
      let response = await __classPrivateFieldGet$1(this, _ClientSDK_httpClient, "f").request(req);
      try {
        if (matchStatusCode(response, errorCodes)) {
          const result = await __classPrivateFieldGet$1(this, _ClientSDK_hooks, "f").afterError(context, response, null);
          if (result.error) {
            throw result.error;
          }
          response = result.response || response;
        } else {
          response = await __classPrivateFieldGet$1(this, _ClientSDK_hooks, "f").afterSuccess(context, response);
        }
      } finally {
        await logResponse(__classPrivateFieldGet$1(this, _ClientSDK_logger, "f"), response, req).catch((e) => __classPrivateFieldGet$1(this, _ClientSDK_logger, "f")?.log("Failed to log response:", e));
      }
      return response;
    }, { config: options.retryConfig, statusCodes: options.retryCodes }).then((r) => OK$1(r), (err) => {
      switch (true) {
        case isAbortError(err):
          return ERR(new RequestAbortedError("Request aborted by client", {
            cause: err
          }));
        case isTimeoutError(err):
          return ERR(new RequestTimeoutError("Request timed out", { cause: err }));
        case isConnectionError(err):
          return ERR(new ConnectionError("Unable to make request", { cause: err }));
        default:
          return ERR(new UnexpectedClientError("Unexpected HTTP client error", {
            cause: err
          }));
      }
    });
  }
}
_ClientSDK_httpClient = /* @__PURE__ */ new WeakMap(), _ClientSDK_hooks = /* @__PURE__ */ new WeakMap(), _ClientSDK_logger = /* @__PURE__ */ new WeakMap();
const jsonLikeContentTypeRE = /^(application|text)\/([^+]+\+)*json.*/;
const jsonlLikeContentTypeRE = /^(application|text)\/([^+]+\+)*(jsonl|x-ndjson)\b.*/;
async function logRequest(logger, req) {
  if (!logger) {
    return;
  }
  const contentType = req.headers.get("content-type");
  const ct = contentType?.split(";")[0] || "";
  logger.group(`> Request: ${req.method} ${req.url}`);
  logger.group("Headers:");
  for (const [k, v] of req.headers.entries()) {
    logger.log(`${k}: ${v}`);
  }
  logger.groupEnd();
  logger.group("Body:");
  switch (true) {
    case jsonLikeContentTypeRE.test(ct):
      logger.log(await req.clone().json());
      break;
    case ct.startsWith("text/"):
      logger.log(await req.clone().text());
      break;
    case ct === "multipart/form-data": {
      const body = await req.clone().formData();
      for (const [k, v] of body) {
        const vlabel = v instanceof Blob ? "<Blob>" : v;
        logger.log(`${k}: ${vlabel}`);
      }
      break;
    }
    default:
      logger.log(`<${contentType}>`);
      break;
  }
  logger.groupEnd();
  logger.groupEnd();
}
async function logResponse(logger, res, req) {
  if (!logger) {
    return;
  }
  const contentType = res.headers.get("content-type");
  const ct = contentType?.split(";")[0] || "";
  logger.group(`< Response: ${req.method} ${req.url}`);
  logger.log("Status Code:", res.status, res.statusText);
  logger.group("Headers:");
  for (const [k, v] of res.headers.entries()) {
    logger.log(`${k}: ${v}`);
  }
  logger.groupEnd();
  logger.group("Body:");
  switch (true) {
    case (matchContentType(res, "application/json") || jsonLikeContentTypeRE.test(ct) && !jsonlLikeContentTypeRE.test(ct)):
      logger.log(await res.clone().json());
      break;
    case (matchContentType(res, "application/jsonl") || jsonlLikeContentTypeRE.test(ct)):
      logger.log(await res.clone().text());
      break;
    case matchContentType(res, "text/event-stream"):
      logger.log(`<${contentType}>`);
      break;
    case matchContentType(res, "text/*"):
      logger.log(await res.clone().text());
      break;
    case matchContentType(res, "multipart/form-data"): {
      const body = await res.clone().formData();
      for (const [k, v] of body) {
        const vlabel = v instanceof Blob ? "<Blob>" : v;
        logger.log(`${k}: ${vlabel}`);
      }
      break;
    }
    default:
      logger.log(`<${contentType}>`);
      break;
  }
  logger.groupEnd();
  logger.groupEnd();
}
class OpenRouterError extends Error {
  constructor(message, httpMeta) {
    super(message);
    this.statusCode = httpMeta.response.status;
    this.body = httpMeta.body;
    this.headers = httpMeta.response.headers;
    this.contentType = httpMeta.response.headers.get("content-type") || "";
    this.rawResponse = httpMeta.response;
    this.name = "OpenRouterError";
  }
}
class OpenRouterDefaultError extends OpenRouterError {
  constructor(message, httpMeta) {
    if (message) {
      message += `: `;
    }
    message += `Status ${httpMeta.response.status}`;
    const contentType = httpMeta.response.headers.get("content-type") || `""`;
    if (contentType !== "application/json") {
      message += ` Content-Type ${contentType.includes(" ") ? `"${contentType}"` : contentType}`;
    }
    const body = httpMeta.body || `""`;
    message += body.length > 100 ? "\n" : ". ";
    let bodyDisplay = body;
    if (body.length > 1e4) {
      const truncated = body.substring(0, 1e4);
      const remaining = body.length - 1e4;
      bodyDisplay = `${truncated}...and ${remaining} more chars`;
    }
    message += `Body: ${bodyDisplay}`;
    message = message.trim();
    super(message, httpMeta);
    this.name = "OpenRouterDefaultError";
  }
}
class SDKValidationError extends Error {
  // Allows for backwards compatibility for `instanceof` checks of `ResponseValidationError`
  static [Symbol.hasInstance](instance) {
    if (!(instance instanceof Error))
      return false;
    if (!("rawValue" in instance))
      return false;
    if (!("rawMessage" in instance))
      return false;
    if (!("pretty" in instance))
      return false;
    if (typeof instance.pretty !== "function")
      return false;
    return true;
  }
  constructor(message, cause, rawValue) {
    super(`${message}: ${cause}`);
    this.name = "SDKValidationError";
    this.cause = cause;
    this.rawValue = rawValue;
    this.rawMessage = message;
  }
  /**
   * Return a pretty-formatted error message if the underlying validation error
   * is a ZodError or some other recognized error type, otherwise return the
   * default error message.
   */
  pretty() {
    if (this.cause instanceof $ZodError) {
      return `${this.rawMessage}
${formatZodError(this.cause)}`;
    } else {
      return this.toString();
    }
  }
}
function formatZodError(err) {
  return prettifyError(err);
}
class ResponseValidationError extends OpenRouterError {
  constructor(message, extra) {
    super(message, extra);
    this.name = "ResponseValidationError";
    this.cause = extra.cause;
    this.rawValue = extra.rawValue;
    this.rawMessage = extra.rawMessage;
  }
  /**
   * Return a pretty-formatted error message if the underlying validation error
   * is a ZodError or some other recognized error type, otherwise return the
   * default error message.
   */
  pretty() {
    if (this.cause instanceof $ZodError) {
      return `${this.rawMessage}
${formatZodError(this.cause)}`;
    } else {
      return this.toString();
    }
  }
}
const DEFAULT_CONTENT_TYPES = {
  jsonl: "application/jsonl",
  json: "application/json",
  text: "text/plain",
  bytes: "application/octet-stream",
  stream: "application/octet-stream",
  sse: "text/event-stream",
  nil: "*",
  fail: "*"
};
function jsonErr(codes, schema, options) {
  return { ...options, err: true, enc: "json", codes, schema };
}
function json(codes, schema, options) {
  return { ...options, enc: "json", codes, schema };
}
function text(codes, schema, options) {
  return { ...options, enc: "text", codes, schema };
}
function stream(codes, schema, options) {
  return { ...options, enc: "stream", codes, schema };
}
function sse(codes, schema, options) {
  return { ...options, enc: "sse", codes, schema };
}
function fail(codes) {
  return { enc: "fail", codes };
}
function match(...matchers) {
  return async function matchFunc(response, request, options) {
    let raw;
    let matcher;
    for (const match2 of matchers) {
      const { codes } = match2;
      const ctpattern = "ctype" in match2 ? match2.ctype : DEFAULT_CONTENT_TYPES[match2.enc];
      if (ctpattern && matchResponse(response, codes, ctpattern)) {
        matcher = match2;
        break;
      } else if (!ctpattern && matchStatusCode(response, codes)) {
        matcher = match2;
        break;
      }
    }
    if (!matcher) {
      return [{
        ok: false,
        error: new OpenRouterDefaultError("Unexpected Status or Content-Type", {
          response,
          request,
          body: await response.text().catch(() => "")
        })
      }, raw];
    }
    const encoding = matcher.enc;
    let body = "";
    switch (encoding) {
      case "json":
        body = await response.text();
        raw = JSON.parse(body);
        break;
      case "jsonl":
        raw = response.body;
        break;
      case "bytes":
        raw = new Uint8Array(await response.arrayBuffer());
        break;
      case "stream":
        raw = response.body;
        break;
      case "text":
        body = await response.text();
        raw = body;
        break;
      case "sse":
        raw = response.body;
        break;
      case "nil":
        body = await response.text();
        raw = void 0;
        break;
      case "fail":
        body = await response.text();
        raw = body;
        break;
      default:
        throw new Error(`Unsupported response type: ${encoding}`);
    }
    if (matcher.enc === "fail") {
      return [{
        ok: false,
        error: new OpenRouterDefaultError("API error occurred", {
          request,
          response,
          body
        })
      }, raw];
    }
    const resultKey = matcher.key || options?.resultKey;
    let data;
    if ("err" in matcher) {
      data = {
        ...options?.extraFields,
        ...matcher.hdrs ? { Headers: unpackHeaders(response.headers) } : null,
        ...isPlainObject(raw) ? raw : null,
        request$: request,
        response$: response,
        body$: body
      };
    } else if (resultKey) {
      data = {
        ...options?.extraFields,
        ...matcher.hdrs ? { Headers: unpackHeaders(response.headers) } : null,
        [resultKey]: raw
      };
    } else if (matcher.hdrs) {
      data = {
        ...options?.extraFields,
        ...matcher.hdrs ? { Headers: unpackHeaders(response.headers) } : null,
        ...isPlainObject(raw) ? raw : null
      };
    } else {
      data = raw;
    }
    if ("err" in matcher) {
      const result = safeParseResponse(data, (v) => matcher.schema.parse(v), "Response validation failed", { request, response, body });
      return [result.ok ? { ok: false, error: result.value } : result, raw];
    } else {
      return [
        safeParseResponse(data, (v) => matcher.schema.parse(v), "Response validation failed", { request, response, body }),
        raw
      ];
    }
  };
}
const headerValRE = /, */;
function unpackHeaders(headers) {
  const out = {};
  for (const [k, v] of headers.entries()) {
    out[k] = v.split(headerValRE);
  }
  return out;
}
function safeParseResponse(rawValue, fn, errorMessage, httpMeta) {
  try {
    return OK$1(fn(rawValue));
  } catch (err) {
    return ERR(new ResponseValidationError(errorMessage, {
      cause: err,
      rawValue,
      rawMessage: errorMessage,
      ...httpMeta
    }));
  }
}
function remap(inp, mappings) {
  let out = {};
  if (!Object.keys(mappings).length) {
    out = inp;
    return out;
  }
  for (const [k, v] of Object.entries(inp)) {
    const j = mappings[k];
    if (j === null) {
      continue;
    }
    out[j ?? k] = v;
  }
  return out;
}
function compactMap(values) {
  const out = {};
  for (const [k, v] of Object.entries(values)) {
    if (typeof v !== "undefined") {
      out[k] = v;
    }
  }
  return out;
}
function safeParse(rawValue, fn, errorMessage) {
  try {
    return OK$1(fn(rawValue));
  } catch (err) {
    return ERR(new SDKValidationError(errorMessage, err, rawValue));
  }
}
function collectExtraKeys(obj, extrasKey, optional2) {
  return obj.transform((val) => {
    const extras = {};
    const { shape } = obj;
    for (const [key] of Object.entries(val)) {
      if (key in shape) {
        continue;
      }
      const v = val[key];
      if (typeof v === "undefined") {
        continue;
      }
      extras[key] = v;
      delete val[key];
    }
    if (Object.keys(extras).length === 0) {
      return val;
    }
    return { ...val, [extrasKey]: extras };
  });
}
var SecurityErrorCode;
(function(SecurityErrorCode2) {
  SecurityErrorCode2["Incomplete"] = "incomplete";
  SecurityErrorCode2["UnrecognisedSecurityType"] = "unrecognized_security_type";
})(SecurityErrorCode || (SecurityErrorCode = {}));
class SecurityError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "SecurityError";
  }
  static incomplete() {
    return new SecurityError(SecurityErrorCode.Incomplete, "Security requirements not met in order to perform the operation");
  }
  static unrecognizedType(type) {
    return new SecurityError(SecurityErrorCode.UnrecognisedSecurityType, `Unrecognised security type: ${type}`);
  }
}
function resolveSecurity(...options) {
  const state = {
    basic: {},
    headers: {},
    queryParams: {},
    cookies: {},
    oauth2: { type: "none" }
  };
  const option = options.find((opts) => {
    return opts.every((o) => {
      if (o.value == null) {
        return false;
      } else if (o.type === "http:basic") {
        return o.value.username != null || o.value.password != null;
      } else if (o.type === "http:custom") {
        return null;
      } else if (o.type === "oauth2:password") {
        return typeof o.value === "string" && !!o.value;
      } else if (o.type === "oauth2:client_credentials") {
        if (typeof o.value == "string") {
          return !!o.value;
        }
        return o.value.clientID != null || o.value.clientSecret != null;
      } else if (typeof o.value === "string") {
        return !!o.value;
      } else {
        throw new Error(`Unrecognized security type: ${o.type} (value type: ${typeof o.value})`);
      }
    });
  });
  if (option == null) {
    return null;
  }
  option.forEach((spec) => {
    if (spec.value == null) {
      return;
    }
    const { type } = spec;
    switch (type) {
      case "apiKey:header":
        state.headers[spec.fieldName] = spec.value;
        break;
      case "apiKey:query":
        state.queryParams[spec.fieldName] = spec.value;
        break;
      case "apiKey:cookie":
        state.cookies[spec.fieldName] = spec.value;
        break;
      case "http:basic":
        applyBasic(state, spec);
        break;
      case "http:custom":
        break;
      case "http:bearer":
        applyBearer(state, spec);
        break;
      case "oauth2":
        applyBearer(state, spec);
        break;
      case "oauth2:password":
        applyBearer(state, spec);
        break;
      case "oauth2:client_credentials":
        break;
      case "openIdConnect":
        applyBearer(state, spec);
        break;
      default:
        throw SecurityError.unrecognizedType(type);
    }
  });
  return state;
}
function applyBasic(state, spec) {
  if (spec.value == null) {
    return;
  }
  state.basic = spec.value;
}
function applyBearer(state, spec) {
  if (typeof spec.value !== "string" || !spec.value) {
    return;
  }
  let value = spec.value;
  if (value.slice(0, 7).toLowerCase() !== "bearer ") {
    value = `Bearer ${value}`;
  }
  if (spec.fieldName !== void 0) {
    state.headers[spec.fieldName] = value;
  }
}
function resolveGlobalSecurity(security, allowedFields) {
  let inputs = [
    [
      {
        fieldName: "Authorization",
        type: "http:bearer",
        value: security?.apiKey ?? env().OPENROUTER_API_KEY
      }
    ]
  ];
  return resolveSecurity(...inputs);
}
async function extractSecurity(sec) {
  if (sec == null) {
    return;
  }
  return typeof sec === "function" ? sec() : sec;
}
const ActivityItem$inboundSchema = object({
  byok_usage_inference: number(),
  completion_tokens: int(),
  date: string(),
  endpoint_id: string(),
  model: string(),
  model_permaslug: string(),
  prompt_tokens: int(),
  provider_name: string(),
  reasoning_tokens: int(),
  requests: int(),
  usage: number()
}).transform((v) => {
  return remap(v, {
    "byok_usage_inference": "byokUsageInference",
    "completion_tokens": "completionTokens",
    "endpoint_id": "endpointId",
    "model_permaslug": "modelPermaslug",
    "prompt_tokens": "promptTokens",
    "provider_name": "providerName",
    "reasoning_tokens": "reasoningTokens"
  });
});
const ActivityResponse$inboundSchema = object({
  data: array(ActivityItem$inboundSchema)
});
function unrecognized(value) {
  return value;
}
const UNKNOWN = /* @__PURE__ */ Symbol("UNKNOWN");
function discriminatedUnion(inputPropertyName, options, opts = {}) {
  const { unknownValue = "UNKNOWN", outputPropertyName } = opts;
  return unknown().transform((input) => {
    const fallback = Object.defineProperties({
      raw: input,
      [outputPropertyName ?? inputPropertyName]: unknownValue,
      isUnknown: true
    }, { [UNKNOWN]: { value: true, enumerable: false, configurable: false } });
    const isObject2 = typeof input === "object" && input !== null;
    if (!isObject2)
      return fallback;
    const discriminator = input[inputPropertyName];
    if (typeof discriminator !== "string")
      return fallback;
    if (!(discriminator in options))
      return fallback;
    const schema = options[discriminator];
    if (!schema)
      return fallback;
    const result = schema.safeParse(input);
    if (!result.success) {
      return fallback;
    }
    if (outputPropertyName) {
      result.data[outputPropertyName] = discriminator;
    }
    return result.data;
  });
}
const FileCitation$inboundSchema = object({
  file_id: string(),
  filename: string(),
  index: int(),
  type: literal("file_citation")
}).transform((v) => {
  return remap(v, {
    "file_id": "fileId"
  });
});
const FileCitation$outboundSchema = object({
  fileId: string(),
  filename: string(),
  index: int(),
  type: literal("file_citation")
}).transform((v) => {
  return remap(v, {
    fileId: "file_id"
  });
});
const FilePath$inboundSchema = object({
  file_id: string(),
  index: int(),
  type: literal("file_path")
}).transform((v) => {
  return remap(v, {
    "file_id": "fileId"
  });
});
const FilePath$outboundSchema = object({
  fileId: string(),
  index: int(),
  type: literal("file_path")
}).transform((v) => {
  return remap(v, {
    fileId: "file_id"
  });
});
const URLCitation$inboundSchema = object({
  end_index: int(),
  start_index: int(),
  title: string(),
  type: literal("url_citation"),
  url: string()
}).transform((v) => {
  return remap(v, {
    "end_index": "endIndex",
    "start_index": "startIndex"
  });
});
const URLCitation$outboundSchema = object({
  endIndex: int(),
  startIndex: int(),
  title: string(),
  type: literal("url_citation"),
  url: string()
}).transform((v) => {
  return remap(v, {
    endIndex: "end_index",
    startIndex: "start_index"
  });
});
const OpenAIResponsesAnnotation$inboundSchema = discriminatedUnion("type", {
  file_citation: FileCitation$inboundSchema,
  url_citation: URLCitation$inboundSchema,
  file_path: FilePath$inboundSchema
});
const OpenAIResponsesAnnotation$outboundSchema = union([
  FileCitation$outboundSchema,
  URLCitation$outboundSchema,
  FilePath$outboundSchema
]);
const AnnotationAddedEvent$inboundSchema = object({
  annotation: OpenAIResponsesAnnotation$inboundSchema,
  annotation_index: int(),
  content_index: int(),
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.output_text.annotation.added")
}).transform((v) => {
  return remap(v, {
    "annotation_index": "annotationIndex",
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
function inboundSchema(enumObj) {
  const options = Object.values(enumObj);
  return union([
    ...options.map((x) => literal(x)),
    string().transform((x) => unrecognized(x))
  ]);
}
function inboundSchemaInt(enumObj) {
  const options = Object.values(enumObj).filter((v) => typeof v === "number");
  return union([
    ...options.map((x) => literal(x)),
    int().transform((x) => unrecognized(x))
  ]);
}
function outboundSchema(_) {
  return string();
}
const AnthropicCacheControlTtl = {
  Fivem: "5m",
  Oneh: "1h"
};
const AnthropicCacheControlTtl$inboundSchema = inboundSchema(AnthropicCacheControlTtl);
const AnthropicCacheControlTtl$outboundSchema = outboundSchema();
const AnthropicCacheControlDirectiveType = {
  Ephemeral: "ephemeral"
};
const AnthropicCacheControlDirectiveType$outboundSchema = _enum(AnthropicCacheControlDirectiveType);
const AnthropicCacheControlDirective$outboundSchema = object({
  ttl: AnthropicCacheControlTtl$outboundSchema.optional(),
  type: AnthropicCacheControlDirectiveType$outboundSchema
});
const ApplyPatchServerTool$inboundSchema = object({
  type: literal("apply_patch")
});
const ApplyPatchServerTool$outboundSchema = object({
  type: literal("apply_patch")
});
const AutoRouterPlugin$outboundSchema = object({
  allowedModels: array(string()).optional(),
  enabled: boolean$1().optional(),
  id: literal("auto-router")
}).transform((v) => {
  return remap(v, {
    allowedModels: "allowed_models"
  });
});
const BadGatewayResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const BadRequestResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const FormatEnum = {
  Mp3: "mp3",
  Wav: "wav"
};
const FormatEnum$inboundSchema = inboundSchema(FormatEnum);
const FormatEnum$outboundSchema = outboundSchema();
const InputAudioInputAudio$inboundSchema = object({
  data: string(),
  format: FormatEnum$inboundSchema
});
const InputAudioInputAudio$outboundSchema = object({
  data: string(),
  format: FormatEnum$outboundSchema
});
const InputAudio$inboundSchema = object({
  input_audio: lazy(() => InputAudioInputAudio$inboundSchema),
  type: literal("input_audio")
}).transform((v) => {
  return remap(v, {
    "input_audio": "inputAudio"
  });
});
const InputAudio$outboundSchema = object({
  inputAudio: lazy(() => InputAudioInputAudio$outboundSchema),
  type: literal("input_audio")
}).transform((v) => {
  return remap(v, {
    inputAudio: "input_audio"
  });
});
const InputFile$inboundSchema = object({
  file_data: string().optional(),
  file_id: nullable(string()).optional(),
  file_url: string().optional(),
  filename: string().optional(),
  type: literal("input_file")
}).transform((v) => {
  return remap(v, {
    "file_data": "fileData",
    "file_id": "fileId",
    "file_url": "fileUrl"
  });
});
const InputFile$outboundSchema = object({
  fileData: string().optional(),
  fileId: nullable(string()).optional(),
  fileUrl: string().optional(),
  filename: string().optional(),
  type: literal("input_file")
}).transform((v) => {
  return remap(v, {
    fileData: "file_data",
    fileId: "file_id",
    fileUrl: "file_url"
  });
});
const InputImageDetail = {
  Auto: "auto",
  High: "high",
  Low: "low"
};
const InputImageTypeEnum = {
  InputImage: "input_image"
};
const InputImageDetail$inboundSchema = inboundSchema(InputImageDetail);
const InputImageDetail$outboundSchema = outboundSchema();
const InputImageTypeEnum$inboundSchema = _enum(InputImageTypeEnum);
const InputImageTypeEnum$outboundSchema = InputImageTypeEnum$inboundSchema;
const InputImage$inboundSchema = object({
  detail: InputImageDetail$inboundSchema,
  image_url: nullable(string()).optional(),
  type: InputImageTypeEnum$inboundSchema
}).transform((v) => {
  return remap(v, {
    "image_url": "imageUrl"
  });
});
const InputImage$outboundSchema = object({
  detail: InputImageDetail$outboundSchema,
  imageUrl: nullable(string()).optional(),
  type: InputImageTypeEnum$outboundSchema
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
const InputText$inboundSchema = object({
  text: string(),
  type: literal("input_text")
});
const InputText$outboundSchema = object({
  text: string(),
  type: literal("input_text")
});
const ToolCallStatus = {
  InProgress: "in_progress",
  Completed: "completed",
  Incomplete: "incomplete"
};
const ToolCallStatus$inboundSchema = inboundSchema(ToolCallStatus);
const ToolCallStatus$outboundSchema = outboundSchema();
const OpenAIResponseFunctionToolCallType = {
  FunctionCall: "function_call"
};
const OpenAIResponseFunctionToolCallType$inboundSchema = _enum(OpenAIResponseFunctionToolCallType);
const OpenAIResponseFunctionToolCall$inboundSchema = object({
  arguments: string(),
  call_id: string(),
  id: string().optional(),
  name: string(),
  namespace: string().optional(),
  status: ToolCallStatus$inboundSchema.optional(),
  type: OpenAIResponseFunctionToolCallType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "call_id": "callId"
  });
});
const OpenAIResponseFunctionToolCallOutputStatus = {
  InProgress: "in_progress",
  Completed: "completed",
  Incomplete: "incomplete"
};
const OpenAIResponseFunctionToolCallOutputType = {
  FunctionCallOutput: "function_call_output"
};
discriminatedUnion("type", {
  input_file: InputFile$inboundSchema,
  input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
  input_text: InputText$inboundSchema
});
union([
  string(),
  array(discriminatedUnion("type", {
    input_file: InputFile$inboundSchema,
    input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
    input_text: InputText$inboundSchema
  }))
]);
const OpenAIResponseFunctionToolCallOutputStatus$inboundSchema = inboundSchema(OpenAIResponseFunctionToolCallOutputStatus);
const OpenAIResponseFunctionToolCallOutputType$inboundSchema = _enum(OpenAIResponseFunctionToolCallOutputType);
const OpenAIResponseFunctionToolCallOutput$inboundSchema = object({
  call_id: string(),
  id: nullable(string()).optional(),
  output: union([
    string(),
    array(discriminatedUnion("type", {
      input_file: InputFile$inboundSchema,
      input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
      input_text: InputText$inboundSchema
    }))
  ]),
  status: nullable(OpenAIResponseFunctionToolCallOutputStatus$inboundSchema).optional(),
  type: OpenAIResponseFunctionToolCallOutputType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "call_id": "callId"
  });
});
const OpenAIResponseInputMessageItemRoleDeveloper = {
  Developer: "developer"
};
const OpenAIResponseInputMessageItemRoleSystem = {
  System: "system"
};
const OpenAIResponseInputMessageItemRoleUser = {
  User: "user"
};
const OpenAIResponseInputMessageItemType = {
  Message: "message"
};
discriminatedUnion("type", {
  input_audio: InputAudio$inboundSchema,
  input_file: InputFile$inboundSchema,
  input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
  input_text: InputText$inboundSchema
});
const OpenAIResponseInputMessageItemRoleDeveloper$inboundSchema = _enum(OpenAIResponseInputMessageItemRoleDeveloper);
const OpenAIResponseInputMessageItemRoleSystem$inboundSchema = _enum(OpenAIResponseInputMessageItemRoleSystem);
const OpenAIResponseInputMessageItemRoleUser$inboundSchema = _enum(OpenAIResponseInputMessageItemRoleUser);
union([
  OpenAIResponseInputMessageItemRoleUser$inboundSchema,
  OpenAIResponseInputMessageItemRoleSystem$inboundSchema,
  OpenAIResponseInputMessageItemRoleDeveloper$inboundSchema
]);
const OpenAIResponseInputMessageItemType$inboundSchema = _enum(OpenAIResponseInputMessageItemType);
const OpenAIResponseInputMessageItem$inboundSchema = object({
  content: array(discriminatedUnion("type", {
    input_audio: InputAudio$inboundSchema,
    input_file: InputFile$inboundSchema,
    input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
    input_text: InputText$inboundSchema
  })),
  id: string(),
  role: union([
    OpenAIResponseInputMessageItemRoleUser$inboundSchema,
    OpenAIResponseInputMessageItemRoleSystem$inboundSchema,
    OpenAIResponseInputMessageItemRoleDeveloper$inboundSchema
  ]),
  type: OpenAIResponseInputMessageItemType$inboundSchema.optional()
});
const ImageGenerationStatus = {
  InProgress: "in_progress",
  Completed: "completed",
  Generating: "generating",
  Failed: "failed"
};
const ImageGenerationStatus$inboundSchema = inboundSchema(ImageGenerationStatus);
const ImageGenerationStatus$outboundSchema = outboundSchema();
const OutputItemImageGenerationCallType = {
  ImageGenerationCall: "image_generation_call"
};
const OutputItemImageGenerationCallType$inboundSchema = _enum(OutputItemImageGenerationCallType);
const OutputItemImageGenerationCall$inboundSchema = object({
  id: string(),
  result: nullable(string()).default(null),
  status: ImageGenerationStatus$inboundSchema,
  type: OutputItemImageGenerationCallType$inboundSchema
});
const OpenAIResponsesRefusalContent$inboundSchema = object({
  refusal: string(),
  type: literal("refusal")
});
const OpenAIResponsesRefusalContent$outboundSchema = object({
  refusal: string(),
  type: literal("refusal")
});
const ResponseOutputTextTopLogprob$inboundSchema = object({
  bytes: array(int()),
  logprob: number(),
  token: string()
});
const ResponseOutputTextTopLogprob$outboundSchema = object({
  bytes: array(int()),
  logprob: number(),
  token: string()
});
const Logprob$inboundSchema = object({
  bytes: array(int()),
  logprob: number(),
  token: string(),
  top_logprobs: array(lazy(() => ResponseOutputTextTopLogprob$inboundSchema))
}).transform((v) => {
  return remap(v, {
    "top_logprobs": "topLogprobs"
  });
});
const Logprob$outboundSchema = object({
  bytes: array(int()),
  logprob: number(),
  token: string(),
  topLogprobs: array(lazy(() => ResponseOutputTextTopLogprob$outboundSchema))
}).transform((v) => {
  return remap(v, {
    topLogprobs: "top_logprobs"
  });
});
const ResponseOutputText$inboundSchema = object({
  annotations: array(OpenAIResponsesAnnotation$inboundSchema).optional(),
  logprobs: array(lazy(() => Logprob$inboundSchema)).optional(),
  text: string(),
  type: literal("output_text")
});
const ResponseOutputText$outboundSchema = object({
  annotations: array(OpenAIResponsesAnnotation$outboundSchema).optional(),
  logprobs: array(lazy(() => Logprob$outboundSchema)).optional(),
  text: string(),
  type: literal("output_text")
});
const OutputMessagePhaseFinalAnswer = {
  FinalAnswer: "final_answer"
};
const OutputMessagePhaseCommentary = {
  Commentary: "commentary"
};
const OutputMessageRole = {
  Assistant: "assistant"
};
const OutputMessageStatusInProgress = {
  InProgress: "in_progress"
};
const OutputMessageStatusIncomplete = {
  Incomplete: "incomplete"
};
const OutputMessageStatusCompleted = {
  Completed: "completed"
};
const OutputMessageType = {
  Message: "message"
};
discriminatedUnion("type", {
  output_text: ResponseOutputText$inboundSchema,
  refusal: OpenAIResponsesRefusalContent$inboundSchema
});
const OutputMessagePhaseFinalAnswer$inboundSchema = _enum(OutputMessagePhaseFinalAnswer);
const OutputMessagePhaseCommentary$inboundSchema = _enum(OutputMessagePhaseCommentary);
union([
  OutputMessagePhaseCommentary$inboundSchema,
  OutputMessagePhaseFinalAnswer$inboundSchema,
  any()
]);
const OutputMessageRole$inboundSchema = _enum(OutputMessageRole);
const OutputMessageStatusInProgress$inboundSchema = _enum(OutputMessageStatusInProgress);
const OutputMessageStatusIncomplete$inboundSchema = _enum(OutputMessageStatusIncomplete);
const OutputMessageStatusCompleted$inboundSchema = _enum(OutputMessageStatusCompleted);
union([
  OutputMessageStatusCompleted$inboundSchema,
  OutputMessageStatusIncomplete$inboundSchema,
  OutputMessageStatusInProgress$inboundSchema
]);
const OutputMessageType$inboundSchema = _enum(OutputMessageType);
const OutputMessage$inboundSchema = object({
  content: array(discriminatedUnion("type", {
    output_text: ResponseOutputText$inboundSchema,
    refusal: OpenAIResponsesRefusalContent$inboundSchema
  })),
  id: string(),
  phase: nullable(union([
    OutputMessagePhaseCommentary$inboundSchema,
    OutputMessagePhaseFinalAnswer$inboundSchema,
    any()
  ])).optional(),
  role: OutputMessageRole$inboundSchema,
  status: union([
    OutputMessageStatusCompleted$inboundSchema,
    OutputMessageStatusIncomplete$inboundSchema,
    OutputMessageStatusInProgress$inboundSchema
  ]).optional(),
  type: OutputMessageType$inboundSchema
});
const BaseInputsPhaseFinalAnswer = {
  FinalAnswer: "final_answer"
};
const BaseInputsPhaseCommentary = {
  Commentary: "commentary"
};
const BaseInputsRoleDeveloper = {
  Developer: "developer"
};
const BaseInputsRoleAssistant = {
  Assistant: "assistant"
};
const BaseInputsRoleSystem = {
  System: "system"
};
const BaseInputsRoleUser = {
  User: "user"
};
const BaseInputsType = {
  Message: "message"
};
discriminatedUnion("type", {
  input_audio: InputAudio$inboundSchema,
  input_file: InputFile$inboundSchema,
  input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
  input_text: InputText$inboundSchema
});
union([
  array(discriminatedUnion("type", {
    input_audio: InputAudio$inboundSchema,
    input_file: InputFile$inboundSchema,
    input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
    input_text: InputText$inboundSchema
  })),
  string()
]);
const BaseInputsPhaseFinalAnswer$inboundSchema = _enum(BaseInputsPhaseFinalAnswer);
const BaseInputsPhaseCommentary$inboundSchema = _enum(BaseInputsPhaseCommentary);
union([
  BaseInputsPhaseCommentary$inboundSchema,
  BaseInputsPhaseFinalAnswer$inboundSchema,
  any()
]);
const BaseInputsRoleDeveloper$inboundSchema = _enum(BaseInputsRoleDeveloper);
const BaseInputsRoleAssistant$inboundSchema = _enum(BaseInputsRoleAssistant);
const BaseInputsRoleSystem$inboundSchema = _enum(BaseInputsRoleSystem);
const BaseInputsRoleUser$inboundSchema = _enum(BaseInputsRoleUser);
union([
  BaseInputsRoleUser$inboundSchema,
  BaseInputsRoleSystem$inboundSchema,
  BaseInputsRoleAssistant$inboundSchema,
  BaseInputsRoleDeveloper$inboundSchema
]);
const BaseInputsType$inboundSchema = _enum(BaseInputsType);
const BaseInputsMessage$inboundSchema = object({
  content: union([
    array(discriminatedUnion("type", {
      input_audio: InputAudio$inboundSchema,
      input_file: InputFile$inboundSchema,
      input_image: InputImage$inboundSchema.and(object({ type: literal("input_image") })),
      input_text: InputText$inboundSchema
    })),
    string()
  ]),
  phase: nullable(union([
    BaseInputsPhaseCommentary$inboundSchema,
    BaseInputsPhaseFinalAnswer$inboundSchema,
    any()
  ])).optional(),
  role: union([
    BaseInputsRoleUser$inboundSchema,
    BaseInputsRoleSystem$inboundSchema,
    BaseInputsRoleAssistant$inboundSchema,
    BaseInputsRoleDeveloper$inboundSchema
  ]),
  type: BaseInputsType$inboundSchema.optional()
});
union([
  OpenAIResponseFunctionToolCall$inboundSchema,
  OutputMessage$inboundSchema,
  OpenAIResponseInputMessageItem$inboundSchema,
  OpenAIResponseFunctionToolCallOutput$inboundSchema,
  OutputItemImageGenerationCall$inboundSchema,
  lazy(() => BaseInputsMessage$inboundSchema)
]);
const BaseInputsUnion$inboundSchema = union([
  string(),
  array(union([
    OpenAIResponseFunctionToolCall$inboundSchema,
    OutputMessage$inboundSchema,
    OpenAIResponseInputMessageItem$inboundSchema,
    OpenAIResponseFunctionToolCallOutput$inboundSchema,
    OutputItemImageGenerationCall$inboundSchema,
    lazy(() => BaseInputsMessage$inboundSchema)
  ])),
  any()
]);
const ReasoningEffort = {
  Xhigh: "xhigh",
  High: "high",
  Medium: "medium",
  Low: "low",
  Minimal: "minimal",
  None: "none"
};
const ReasoningEffort$inboundSchema = inboundSchema(ReasoningEffort);
const ReasoningEffort$outboundSchema = outboundSchema();
const ReasoningSummaryVerbosity = {
  Auto: "auto",
  Concise: "concise",
  Detailed: "detailed"
};
const ReasoningSummaryVerbosity$inboundSchema = inboundSchema(ReasoningSummaryVerbosity);
const ReasoningSummaryVerbosity$outboundSchema = outboundSchema();
const BaseReasoningConfig$inboundSchema = object({
  effort: nullable(ReasoningEffort$inboundSchema).optional(),
  summary: nullable(ReasoningSummaryVerbosity$inboundSchema).optional()
});
const BulkAddWorkspaceMembersRequest$outboundSchema$1 = object({
  userIds: array(string())
}).transform((v) => {
  return remap(v, {
    userIds: "user_ids"
  });
});
const WorkspaceMemberRole = {
  Admin: "admin",
  Member: "member"
};
const WorkspaceMemberRole$inboundSchema = inboundSchema(WorkspaceMemberRole);
const WorkspaceMember$inboundSchema = object({
  created_at: string(),
  id: string(),
  role: WorkspaceMemberRole$inboundSchema,
  user_id: string(),
  workspace_id: string()
}).transform((v) => {
  return remap(v, {
    "created_at": "createdAt",
    "user_id": "userId",
    "workspace_id": "workspaceId"
  });
});
const BulkAddWorkspaceMembersResponse$inboundSchema = object({
  added_count: int(),
  data: array(WorkspaceMember$inboundSchema)
}).transform((v) => {
  return remap(v, {
    "added_count": "addedCount"
  });
});
const BulkAssignKeysRequest$outboundSchema = object({
  keyHashes: array(string())
}).transform((v) => {
  return remap(v, {
    keyHashes: "key_hashes"
  });
});
const BulkAssignKeysResponse$inboundSchema = object({
  assigned_count: int()
}).transform((v) => {
  return remap(v, {
    "assigned_count": "assignedCount"
  });
});
const BulkAssignMembersRequest$outboundSchema = object({
  memberUserIds: array(string())
}).transform((v) => {
  return remap(v, {
    memberUserIds: "member_user_ids"
  });
});
const BulkAssignMembersResponse$inboundSchema = object({
  assigned_count: int()
}).transform((v) => {
  return remap(v, {
    "assigned_count": "assignedCount"
  });
});
const BulkRemoveWorkspaceMembersRequest$outboundSchema$1 = object({
  userIds: array(string())
}).transform((v) => {
  return remap(v, {
    userIds: "user_ids"
  });
});
const BulkRemoveWorkspaceMembersResponse$inboundSchema = object({
  removed_count: int()
}).transform((v) => {
  return remap(v, {
    "removed_count": "removedCount"
  });
});
const BulkUnassignKeysRequest$outboundSchema = object({
  keyHashes: array(string())
}).transform((v) => {
  return remap(v, {
    keyHashes: "key_hashes"
  });
});
const BulkUnassignKeysResponse$inboundSchema = object({
  unassigned_count: int()
}).transform((v) => {
  return remap(v, {
    "unassigned_count": "unassignedCount"
  });
});
const BulkUnassignMembersRequest$outboundSchema = object({
  memberUserIds: array(string())
}).transform((v) => {
  return remap(v, {
    memberUserIds: "member_user_ids"
  });
});
const BulkUnassignMembersResponse$inboundSchema = object({
  unassigned_count: int()
}).transform((v) => {
  return remap(v, {
    "unassigned_count": "unassignedCount"
  });
});
const ChatAssistantImagesImageUrl$inboundSchema = object({
  url: string()
});
const ChatAssistantImagesImageUrl$outboundSchema = object({
  url: string()
});
const ChatAssistantImages$inboundSchema = object({
  image_url: lazy(() => ChatAssistantImagesImageUrl$inboundSchema)
}).transform((v) => {
  return remap(v, {
    "image_url": "imageUrl"
  });
});
const ChatAssistantImages$outboundSchema = object({
  imageUrl: lazy(() => ChatAssistantImagesImageUrl$outboundSchema)
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
const ChatAudioOutput$inboundSchema = object({
  data: string().optional(),
  expires_at: int().optional(),
  id: string().optional(),
  transcript: string().optional()
}).transform((v) => {
  return remap(v, {
    "expires_at": "expiresAt"
  });
});
const ChatAudioOutput$outboundSchema = object({
  data: string().optional(),
  expiresAt: int().optional(),
  id: string().optional(),
  transcript: string().optional()
}).transform((v) => {
  return remap(v, {
    expiresAt: "expires_at"
  });
});
const ChatContentAudioInputAudio$inboundSchema = object({
  data: string(),
  format: string()
});
const ChatContentAudioInputAudio$outboundSchema = object({
  data: string(),
  format: string()
});
const ChatContentAudio$inboundSchema = object({
  input_audio: lazy(() => ChatContentAudioInputAudio$inboundSchema),
  type: literal("input_audio")
}).transform((v) => {
  return remap(v, {
    "input_audio": "inputAudio"
  });
});
const ChatContentAudio$outboundSchema = object({
  inputAudio: lazy(() => ChatContentAudioInputAudio$outboundSchema),
  type: literal("input_audio")
}).transform((v) => {
  return remap(v, {
    inputAudio: "input_audio"
  });
});
const FileT$inboundSchema = object({
  file_data: string().optional(),
  file_id: string().optional(),
  filename: string().optional()
}).transform((v) => {
  return remap(v, {
    "file_data": "fileData",
    "file_id": "fileId"
  });
});
const FileT$outboundSchema = object({
  fileData: string().optional(),
  fileId: string().optional(),
  filename: string().optional()
}).transform((v) => {
  return remap(v, {
    fileData: "file_data",
    fileId: "file_id"
  });
});
const ChatContentFile$inboundSchema = object({
  file: lazy(() => FileT$inboundSchema),
  type: literal("file")
});
const ChatContentFile$outboundSchema = object({
  file: lazy(() => FileT$outboundSchema),
  type: literal("file")
});
const ChatContentImageDetail = {
  Auto: "auto",
  Low: "low",
  High: "high"
};
const ChatContentImageDetail$inboundSchema = inboundSchema(ChatContentImageDetail);
const ChatContentImageDetail$outboundSchema = outboundSchema();
const ChatContentImageImageUrl$inboundSchema = object({
  detail: ChatContentImageDetail$inboundSchema.optional(),
  url: string()
});
const ChatContentImageImageUrl$outboundSchema = object({
  detail: ChatContentImageDetail$outboundSchema.optional(),
  url: string()
});
const ChatContentImage$inboundSchema = object({
  image_url: lazy(() => ChatContentImageImageUrl$inboundSchema),
  type: literal("image_url")
}).transform((v) => {
  return remap(v, {
    "image_url": "imageUrl"
  });
});
const ChatContentImage$outboundSchema = object({
  imageUrl: lazy(() => ChatContentImageImageUrl$outboundSchema),
  type: literal("image_url")
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
const ChatContentCacheControlType = {
  Ephemeral: "ephemeral"
};
const ChatContentCacheControlType$inboundSchema = _enum(ChatContentCacheControlType);
const ChatContentCacheControlType$outboundSchema = ChatContentCacheControlType$inboundSchema;
const ChatContentCacheControl$inboundSchema = object({
  ttl: AnthropicCacheControlTtl$inboundSchema.optional(),
  type: ChatContentCacheControlType$inboundSchema
});
const ChatContentCacheControl$outboundSchema = object({
  ttl: AnthropicCacheControlTtl$outboundSchema.optional(),
  type: ChatContentCacheControlType$outboundSchema
});
const ChatContentTextType = {
  Text: "text"
};
const ChatContentTextType$inboundSchema = _enum(ChatContentTextType);
const ChatContentTextType$outboundSchema = ChatContentTextType$inboundSchema;
const ChatContentText$inboundSchema = object({
  cache_control: ChatContentCacheControl$inboundSchema.optional(),
  text: string(),
  type: ChatContentTextType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "cache_control": "cacheControl"
  });
});
const ChatContentText$outboundSchema = object({
  cacheControl: ChatContentCacheControl$outboundSchema.optional(),
  text: string(),
  type: ChatContentTextType$outboundSchema
}).transform((v) => {
  return remap(v, {
    cacheControl: "cache_control"
  });
});
const ChatContentVideoInput$inboundSchema = object({
  url: string()
});
const ChatContentVideoInput$outboundSchema = object({
  url: string()
});
const ChatContentVideo$inboundSchema = object({
  type: literal("video_url"),
  video_url: ChatContentVideoInput$inboundSchema
}).transform((v) => {
  return remap(v, {
    "video_url": "videoUrl"
  });
});
const ChatContentVideo$outboundSchema = object({
  type: literal("video_url"),
  videoUrl: ChatContentVideoInput$outboundSchema
}).transform((v) => {
  return remap(v, {
    videoUrl: "video_url"
  });
});
const LegacyChatContentVideo$inboundSchema = object({
  type: literal("input_video"),
  video_url: ChatContentVideoInput$inboundSchema
}).transform((v) => {
  return remap(v, {
    "video_url": "videoUrl"
  });
});
const LegacyChatContentVideo$outboundSchema = object({
  type: literal("input_video"),
  videoUrl: ChatContentVideoInput$outboundSchema
}).transform((v) => {
  return remap(v, {
    videoUrl: "video_url"
  });
});
const ChatContentItems$inboundSchema = discriminatedUnion("type", {
  file: ChatContentFile$inboundSchema,
  image_url: ChatContentImage$inboundSchema,
  input_audio: ChatContentAudio$inboundSchema,
  input_video: LegacyChatContentVideo$inboundSchema,
  text: ChatContentText$inboundSchema.and(object({ type: literal("text") })),
  video_url: ChatContentVideo$inboundSchema
});
const ChatContentItems$outboundSchema = union([
  ChatContentFile$outboundSchema,
  ChatContentImage$outboundSchema,
  ChatContentAudio$outboundSchema,
  LegacyChatContentVideo$outboundSchema,
  ChatContentText$outboundSchema.and(object({ type: literal("text") })),
  ChatContentVideo$outboundSchema
]);
const ChatToolCallType = {
  Function: "function"
};
const ChatToolCallFunction$inboundSchema = object({
  arguments: string(),
  name: string()
});
const ChatToolCallFunction$outboundSchema = object({
  arguments: string(),
  name: string()
});
const ChatToolCallType$inboundSchema = _enum(ChatToolCallType);
const ChatToolCallType$outboundSchema = ChatToolCallType$inboundSchema;
const ChatToolCall$inboundSchema = object({
  function: lazy(() => ChatToolCallFunction$inboundSchema),
  id: string(),
  type: ChatToolCallType$inboundSchema
});
const ChatToolCall$outboundSchema = object({
  function: lazy(() => ChatToolCallFunction$outboundSchema),
  id: string(),
  type: ChatToolCallType$outboundSchema
});
const ReasoningFormat = {
  Unknown: "unknown",
  OpenaiResponsesV1: "openai-responses-v1",
  AzureOpenaiResponsesV1: "azure-openai-responses-v1",
  XaiResponsesV1: "xai-responses-v1",
  AnthropicClaudeV1: "anthropic-claude-v1",
  GoogleGeminiV1: "google-gemini-v1"
};
const ReasoningFormat$inboundSchema = inboundSchema(ReasoningFormat);
const ReasoningFormat$outboundSchema = outboundSchema();
const ReasoningDetailEncrypted$inboundSchema = object({
  data: string(),
  format: nullable(ReasoningFormat$inboundSchema).optional(),
  id: nullable(string()).optional(),
  index: int().optional(),
  type: literal("reasoning.encrypted")
});
const ReasoningDetailEncrypted$outboundSchema = object({
  data: string(),
  format: nullable(ReasoningFormat$outboundSchema).optional(),
  id: nullable(string()).optional(),
  index: int().optional(),
  type: literal("reasoning.encrypted")
});
const ReasoningDetailSummary$inboundSchema = object({
  format: nullable(ReasoningFormat$inboundSchema).optional(),
  id: nullable(string()).optional(),
  index: int().optional(),
  summary: string(),
  type: literal("reasoning.summary")
});
const ReasoningDetailSummary$outboundSchema = object({
  format: nullable(ReasoningFormat$outboundSchema).optional(),
  id: nullable(string()).optional(),
  index: int().optional(),
  summary: string(),
  type: literal("reasoning.summary")
});
const ReasoningDetailText$inboundSchema = object({
  format: nullable(ReasoningFormat$inboundSchema).optional(),
  id: nullable(string()).optional(),
  index: int().optional(),
  signature: nullable(string()).optional(),
  text: nullable(string()).optional(),
  type: literal("reasoning.text")
});
const ReasoningDetailText$outboundSchema = object({
  format: nullable(ReasoningFormat$outboundSchema).optional(),
  id: nullable(string()).optional(),
  index: int().optional(),
  signature: nullable(string()).optional(),
  text: nullable(string()).optional(),
  type: literal("reasoning.text")
});
const ReasoningDetailUnion$inboundSchema = discriminatedUnion("type", {
  ["reasoning.encrypted"]: ReasoningDetailEncrypted$inboundSchema,
  ["reasoning.summary"]: ReasoningDetailSummary$inboundSchema,
  ["reasoning.text"]: ReasoningDetailText$inboundSchema
});
const ReasoningDetailUnion$outboundSchema = union([
  ReasoningDetailEncrypted$outboundSchema,
  ReasoningDetailSummary$outboundSchema,
  ReasoningDetailText$outboundSchema
]);
const ChatAssistantMessageRole = {
  Assistant: "assistant"
};
union([string(), array(ChatContentItems$inboundSchema), any()]);
union([string(), array(ChatContentItems$outboundSchema), any()]);
const ChatAssistantMessageRole$inboundSchema = _enum(ChatAssistantMessageRole);
const ChatAssistantMessageRole$outboundSchema = ChatAssistantMessageRole$inboundSchema;
const ChatAssistantMessage$inboundSchema = object({
  audio: ChatAudioOutput$inboundSchema.optional(),
  content: nullable(union([string(), array(ChatContentItems$inboundSchema), any()])).optional(),
  images: array(ChatAssistantImages$inboundSchema).optional(),
  name: string().optional(),
  reasoning: nullable(string()).optional(),
  reasoning_details: array(ReasoningDetailUnion$inboundSchema).optional(),
  refusal: nullable(string()).optional(),
  role: ChatAssistantMessageRole$inboundSchema,
  tool_calls: array(ChatToolCall$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "reasoning_details": "reasoningDetails",
    "tool_calls": "toolCalls"
  });
});
const ChatAssistantMessage$outboundSchema = object({
  audio: ChatAudioOutput$outboundSchema.optional(),
  content: nullable(union([string(), array(ChatContentItems$outboundSchema), any()])).optional(),
  images: array(ChatAssistantImages$outboundSchema).optional(),
  name: string().optional(),
  reasoning: nullable(string()).optional(),
  reasoningDetails: array(ReasoningDetailUnion$outboundSchema).optional(),
  refusal: nullable(string()).optional(),
  role: ChatAssistantMessageRole$outboundSchema,
  toolCalls: array(ChatToolCall$outboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    reasoningDetails: "reasoning_details",
    toolCalls: "tool_calls"
  });
});
const ChatFinishReasonEnum = {
  ToolCalls: "tool_calls",
  Stop: "stop",
  Length: "length",
  ContentFilter: "content_filter",
  Error: "error"
};
const ChatFinishReasonEnum$inboundSchema = inboundSchema(ChatFinishReasonEnum);
const ChatTokenLogprobTopLogprob$inboundSchema = object({
  bytes: nullable(array(int())),
  logprob: number(),
  token: string()
});
const ChatTokenLogprob$inboundSchema = object({
  bytes: nullable(array(int())),
  logprob: number(),
  token: string(),
  top_logprobs: array(lazy(() => ChatTokenLogprobTopLogprob$inboundSchema))
}).transform((v) => {
  return remap(v, {
    "top_logprobs": "topLogprobs"
  });
});
const ChatTokenLogprobs$inboundSchema = object({
  content: nullable(array(ChatTokenLogprob$inboundSchema)),
  refusal: nullable(array(ChatTokenLogprob$inboundSchema)).optional()
});
const ChatChoice$inboundSchema = object({
  finish_reason: nullable(ChatFinishReasonEnum$inboundSchema),
  index: int(),
  logprobs: nullable(ChatTokenLogprobs$inboundSchema).optional(),
  message: ChatAssistantMessage$inboundSchema
}).transform((v) => {
  return remap(v, {
    "finish_reason": "finishReason"
  });
});
const ChatDebugOptions$outboundSchema = object({
  echoUpstreamBody: boolean$1().optional()
}).transform((v) => {
  return remap(v, {
    echoUpstreamBody: "echo_upstream_body"
  });
});
union([string(), array(ChatContentText$outboundSchema)]);
const ChatDeveloperMessage$outboundSchema = object({
  content: union([string(), array(ChatContentText$outboundSchema)]),
  name: string().optional(),
  role: literal("developer")
});
const ChatFormatGrammarConfig$outboundSchema = object({
  grammar: string(),
  type: literal("grammar")
});
const ChatJsonSchemaConfig$outboundSchema = object({
  description: string().optional(),
  name: string(),
  schema: record(string(), nullable(any())).optional(),
  strict: nullable(boolean$1()).optional()
});
const ChatFormatJsonSchemaConfig$outboundSchema = object({
  jsonSchema: ChatJsonSchemaConfig$outboundSchema,
  type: literal("json_schema")
}).transform((v) => {
  return remap(v, {
    jsonSchema: "json_schema"
  });
});
const ChatFormatPythonConfig$outboundSchema = object({
  type: literal("python")
});
const ChatFormatTextConfig$outboundSchema = object({
  type: literal("text")
});
const SearchModelsServerToolConfig$outboundSchema = object({
  maxResults: int().optional()
}).transform((v) => {
  return remap(v, {
    maxResults: "max_results"
  });
});
const ChatSearchModelsServerToolType = {
  OpenrouterExperimentalSearchModels: "openrouter:experimental__search_models"
};
const ChatSearchModelsServerToolType$outboundSchema = _enum(ChatSearchModelsServerToolType);
const ChatSearchModelsServerTool$outboundSchema = object({
  parameters: SearchModelsServerToolConfig$outboundSchema.optional(),
  type: ChatSearchModelsServerToolType$outboundSchema
});
const SearchQualityLevel$outboundSchema = outboundSchema();
const WebSearchEngineEnum = {
  Auto: "auto",
  Native: "native",
  Exa: "exa",
  Firecrawl: "firecrawl",
  Parallel: "parallel"
};
const WebSearchEngineEnum$inboundSchema = inboundSchema(WebSearchEngineEnum);
const WebSearchEngineEnum$outboundSchema = outboundSchema();
const WebSearchUserLocationServerToolType = {
  Approximate: "approximate"
};
const WebSearchUserLocationServerToolType$outboundSchema = _enum(WebSearchUserLocationServerToolType);
const WebSearchUserLocationServerTool$outboundSchema = object({
  city: nullable(string()).optional(),
  country: nullable(string()).optional(),
  region: nullable(string()).optional(),
  timezone: nullable(string()).optional(),
  type: WebSearchUserLocationServerToolType$outboundSchema.optional()
});
const WebSearchConfig$outboundSchema = object({
  allowedDomains: array(string()).optional(),
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  excludedDomains: array(string()).optional(),
  maxResults: int().optional(),
  maxTotalResults: int().optional(),
  searchContextSize: SearchQualityLevel$outboundSchema.optional(),
  userLocation: WebSearchUserLocationServerTool$outboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    allowedDomains: "allowed_domains",
    excludedDomains: "excluded_domains",
    maxResults: "max_results",
    maxTotalResults: "max_total_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const ChatWebSearchShorthandType$outboundSchema = outboundSchema();
const ChatWebSearchShorthand$outboundSchema = object({
  allowedDomains: array(string()).optional(),
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  excludedDomains: array(string()).optional(),
  maxResults: int().optional(),
  maxTotalResults: int().optional(),
  parameters: WebSearchConfig$outboundSchema.optional(),
  searchContextSize: SearchQualityLevel$outboundSchema.optional(),
  type: ChatWebSearchShorthandType$outboundSchema,
  userLocation: WebSearchUserLocationServerTool$outboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    allowedDomains: "allowed_domains",
    excludedDomains: "excluded_domains",
    maxResults: "max_results",
    maxTotalResults: "max_total_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const DatetimeServerToolConfig$outboundSchema = object({
  timezone: string().optional()
});
const DatetimeServerToolType = {
  OpenrouterDatetime: "openrouter:datetime"
};
const DatetimeServerToolType$outboundSchema = _enum(DatetimeServerToolType);
const DatetimeServerTool$outboundSchema = object({
  parameters: DatetimeServerToolConfig$outboundSchema.optional(),
  type: DatetimeServerToolType$outboundSchema
});
const ImageGenerationServerToolConfigUnion$outboundSchema = union([string(), number(), array(nullable(any()))]);
const ImageGenerationServerToolConfig$outboundSchema = object({
  model: string().optional(),
  additionalProperties: record(string(), ImageGenerationServerToolConfigUnion$outboundSchema).optional()
}).transform((v) => {
  return {
    ...v.additionalProperties,
    ...remap(v, {
      additionalProperties: null
    })
  };
});
const ImageGenerationServerToolOpenRouterType = {
  OpenrouterImageGeneration: "openrouter:image_generation"
};
const ImageGenerationServerToolOpenRouterType$outboundSchema = _enum(ImageGenerationServerToolOpenRouterType);
const ImageGenerationServerToolOpenRouter$outboundSchema = object({
  parameters: ImageGenerationServerToolConfig$outboundSchema.optional(),
  type: ImageGenerationServerToolOpenRouterType$outboundSchema
});
const OpenRouterWebSearchServerToolType = {
  OpenrouterWebSearch: "openrouter:web_search"
};
const OpenRouterWebSearchServerToolType$outboundSchema = _enum(OpenRouterWebSearchServerToolType);
const OpenRouterWebSearchServerTool$outboundSchema = object({
  parameters: WebSearchConfig$outboundSchema.optional(),
  type: OpenRouterWebSearchServerToolType$outboundSchema
});
const WebFetchEngineEnum$outboundSchema = outboundSchema();
const WebFetchServerToolConfig$outboundSchema = object({
  allowedDomains: array(string()).optional(),
  blockedDomains: array(string()).optional(),
  engine: WebFetchEngineEnum$outboundSchema.optional(),
  maxContentTokens: int().optional(),
  maxUses: int().optional()
}).transform((v) => {
  return remap(v, {
    allowedDomains: "allowed_domains",
    blockedDomains: "blocked_domains",
    maxContentTokens: "max_content_tokens",
    maxUses: "max_uses"
  });
});
const WebFetchServerToolType = {
  OpenrouterWebFetch: "openrouter:web_fetch"
};
const WebFetchServerToolType$outboundSchema = _enum(WebFetchServerToolType);
const WebFetchServerTool$outboundSchema = object({
  parameters: WebFetchServerToolConfig$outboundSchema.optional(),
  type: WebFetchServerToolType$outboundSchema
});
const ChatFunctionToolType = {
  Function: "function"
};
const ChatFunctionToolFunctionFunction$outboundSchema = object({
  description: string().optional(),
  name: string(),
  parameters: record(string(), nullable(any())).optional(),
  strict: nullable(boolean$1()).optional()
});
const ChatFunctionToolType$outboundSchema = _enum(ChatFunctionToolType);
const ChatFunctionToolFunction$outboundSchema = object({
  cacheControl: ChatContentCacheControl$outboundSchema.optional(),
  function: lazy(() => ChatFunctionToolFunctionFunction$outboundSchema),
  type: ChatFunctionToolType$outboundSchema
}).transform((v) => {
  return remap(v, {
    cacheControl: "cache_control"
  });
});
const ChatFunctionTool$outboundSchema = union([
  lazy(() => ChatFunctionToolFunction$outboundSchema),
  DatetimeServerTool$outboundSchema,
  ImageGenerationServerToolOpenRouter$outboundSchema,
  ChatSearchModelsServerTool$outboundSchema,
  WebFetchServerTool$outboundSchema,
  OpenRouterWebSearchServerTool$outboundSchema,
  ChatWebSearchShorthand$outboundSchema
]);
union([string(), array(ChatContentText$outboundSchema)]);
const ChatSystemMessage$outboundSchema = object({
  content: union([string(), array(ChatContentText$outboundSchema)]),
  name: string().optional(),
  role: literal("system")
});
union([string(), array(ChatContentItems$outboundSchema)]);
const ChatToolMessage$outboundSchema = object({
  content: union([string(), array(ChatContentItems$outboundSchema)]),
  role: literal("tool"),
  toolCallId: string()
}).transform((v) => {
  return remap(v, {
    toolCallId: "tool_call_id"
  });
});
union([string(), array(ChatContentItems$outboundSchema)]);
const ChatUserMessage$outboundSchema = object({
  content: union([string(), array(ChatContentItems$outboundSchema)]),
  name: string().optional(),
  role: literal("user")
});
const ChatMessages$outboundSchema = union([
  ChatAssistantMessage$outboundSchema.and(object({ role: literal("assistant") })),
  ChatDeveloperMessage$outboundSchema,
  ChatSystemMessage$outboundSchema,
  ChatToolMessage$outboundSchema,
  ChatUserMessage$outboundSchema
]);
const ChatNamedToolChoiceType = {
  Function: "function"
};
const ChatNamedToolChoiceFunction$outboundSchema = object({
  name: string()
});
const ChatNamedToolChoiceType$outboundSchema = _enum(ChatNamedToolChoiceType);
const ChatNamedToolChoice$outboundSchema = object({
  function: lazy(() => ChatNamedToolChoiceFunction$outboundSchema),
  type: ChatNamedToolChoiceType$outboundSchema
});
const ChatReasoningSummaryVerbosityEnum$outboundSchema = outboundSchema();
const ChatStreamOptions$outboundSchema = object({
  includeUsage: boolean$1().optional()
}).transform((v) => {
  return remap(v, {
    includeUsage: "include_usage"
  });
});
const ChatToolChoiceRequired = {
  Required: "required"
};
const ChatToolChoiceAuto = {
  Auto: "auto"
};
const ChatToolChoiceNone = {
  None: "none"
};
const ChatToolChoiceRequired$outboundSchema = _enum(ChatToolChoiceRequired);
const ChatToolChoiceAuto$outboundSchema = _enum(ChatToolChoiceAuto);
const ChatToolChoiceNone$outboundSchema = _enum(ChatToolChoiceNone);
const ChatToolChoice$outboundSchema = union([
  ChatNamedToolChoice$outboundSchema,
  ChatToolChoiceNone$outboundSchema,
  ChatToolChoiceAuto$outboundSchema,
  ChatToolChoiceRequired$outboundSchema
]);
const ContextCompressionEngine = {
  MiddleOut: "middle-out"
};
const ContextCompressionEngine$outboundSchema = _enum(ContextCompressionEngine);
const ContextCompressionPlugin$outboundSchema = object({
  enabled: boolean$1().optional(),
  engine: ContextCompressionEngine$outboundSchema.optional(),
  id: literal("context-compression")
});
const PDFParserEnginePDFText = {
  PdfText: "pdf-text"
};
const PDFParserEnginePDFText$outboundSchema = _enum(PDFParserEnginePDFText);
const PDFParserEngineEnum$outboundSchema = outboundSchema();
const PDFParserEngine$outboundSchema = union([
  PDFParserEngineEnum$outboundSchema,
  PDFParserEnginePDFText$outboundSchema
]);
const PDFParserOptions$outboundSchema = object({
  engine: PDFParserEngine$outboundSchema.optional()
});
const FileParserPlugin$outboundSchema = object({
  enabled: boolean$1().optional(),
  id: literal("file-parser"),
  pdf: PDFParserOptions$outboundSchema.optional()
});
const FormatJsonObjectConfig$inboundSchema = object({
  type: literal("json_object")
});
const FormatJsonObjectConfig$outboundSchema = object({
  type: literal("json_object")
});
const ImageConfig$outboundSchema = union([string(), number(), array(nullable(any()))]);
const ModerationPlugin$outboundSchema = object({
  id: literal("moderation")
});
const ParetoRouterPlugin$outboundSchema = object({
  enabled: boolean$1().optional(),
  id: literal("pareto-router"),
  minCodingScore: number().optional()
}).transform((v) => {
  return remap(v, {
    minCodingScore: "min_coding_score"
  });
});
const PercentileLatencyCutoffs$outboundSchema = object({
  p50: nullable(number()).optional(),
  p75: nullable(number()).optional(),
  p90: nullable(number()).optional(),
  p99: nullable(number()).optional()
});
const PreferredMaxLatency$outboundSchema = union([number(), PercentileLatencyCutoffs$outboundSchema, any()]);
const PercentileThroughputCutoffs$outboundSchema = object({
  p50: nullable(number()).optional(),
  p75: nullable(number()).optional(),
  p90: nullable(number()).optional(),
  p99: nullable(number()).optional()
});
const PreferredMinThroughput$outboundSchema = union([number(), PercentileThroughputCutoffs$outboundSchema, any()]);
const ProviderName = {
  AkashML: "AkashML",
  Ai21: "AI21",
  AionLabs: "AionLabs",
  Alibaba: "Alibaba",
  Ambient: "Ambient",
  Baidu: "Baidu",
  AmazonBedrock: "Amazon Bedrock",
  AmazonNova: "Amazon Nova",
  Anthropic: "Anthropic",
  ArceeAI: "Arcee AI",
  AtlasCloud: "AtlasCloud",
  Avian: "Avian",
  Azure: "Azure",
  BaseTen: "BaseTen",
  BytePlus: "BytePlus",
  BlackForestLabs: "Black Forest Labs",
  Cerebras: "Cerebras",
  Chutes: "Chutes",
  Cirrascale: "Cirrascale",
  Clarifai: "Clarifai",
  Cloudflare: "Cloudflare",
  Cohere: "Cohere",
  Crusoe: "Crusoe",
  DeepInfra: "DeepInfra",
  DeepSeek: "DeepSeek",
  DekaLLM: "DekaLLM",
  Featherless: "Featherless",
  Fireworks: "Fireworks",
  Friendli: "Friendli",
  GMICloud: "GMICloud",
  Google: "Google",
  GoogleAIStudio: "Google AI Studio",
  Groq: "Groq",
  Hyperbolic: "Hyperbolic",
  Inception: "Inception",
  Inceptron: "Inceptron",
  InferenceNet: "InferenceNet",
  Ionstream: "Ionstream",
  Infermatic: "Infermatic",
  IoNet: "Io Net",
  Inflection: "Inflection",
  Liquid: "Liquid",
  Mara: "Mara",
  Mancer2: "Mancer 2",
  Minimax: "Minimax",
  ModelRun: "ModelRun",
  Mistral: "Mistral",
  Modular: "Modular",
  MoonshotAI: "Moonshot AI",
  Morph: "Morph",
  NCompass: "NCompass",
  Nebius: "Nebius",
  NexAGI: "Nex AGI",
  NextBit: "NextBit",
  Novita: "Novita",
  Nvidia: "Nvidia",
  OpenAI: "OpenAI",
  OpenInference: "OpenInference",
  Parasail: "Parasail",
  Poolside: "Poolside",
  Perceptron: "Perceptron",
  Perplexity: "Perplexity",
  Phala: "Phala",
  Recraft: "Recraft",
  Reka: "Reka",
  Relace: "Relace",
  SambaNova: "SambaNova",
  Seed: "Seed",
  SiliconFlow: "SiliconFlow",
  Sourceful: "Sourceful",
  StepFun: "StepFun",
  Stealth: "Stealth",
  StreamLake: "StreamLake",
  Switchpoint: "Switchpoint",
  Together: "Together",
  Upstage: "Upstage",
  Venice: "Venice",
  WandB: "WandB",
  Xiaomi: "Xiaomi",
  XAI: "xAI",
  ZAi: "Z.AI",
  FakeProvider: "FakeProvider"
};
const ProviderName$inboundSchema = inboundSchema(ProviderName);
const ProviderName$outboundSchema = outboundSchema();
const ProviderSort$outboundSchema = outboundSchema();
const By$outboundSchema = outboundSchema();
const Partition$outboundSchema = outboundSchema();
const ProviderSortConfig$outboundSchema = object({
  by: nullable(By$outboundSchema).optional(),
  partition: nullable(Partition$outboundSchema).optional()
});
const Quantization$outboundSchema = outboundSchema();
const DataCollection$outboundSchema = outboundSchema();
union([ProviderName$outboundSchema, string()]);
const MaxPrice$outboundSchema = object({
  audio: string().optional(),
  completion: string().optional(),
  image: string().optional(),
  prompt: string().optional(),
  request: string().optional()
});
union([
  ProviderName$outboundSchema,
  string()
]);
union([
  ProviderName$outboundSchema,
  string()
]);
union([
  ProviderSort$outboundSchema,
  ProviderSortConfig$outboundSchema,
  any()
]);
const ProviderPreferences$outboundSchema = object({
  allowFallbacks: nullable(boolean$1()).optional(),
  dataCollection: nullable(DataCollection$outboundSchema).optional(),
  enforceDistillableText: nullable(boolean$1()).optional(),
  ignore: nullable(array(union([ProviderName$outboundSchema, string()]))).optional(),
  maxPrice: lazy(() => MaxPrice$outboundSchema).optional(),
  only: nullable(array(union([ProviderName$outboundSchema, string()]))).optional(),
  order: nullable(array(union([ProviderName$outboundSchema, string()]))).optional(),
  preferredMaxLatency: nullable(PreferredMaxLatency$outboundSchema).optional(),
  preferredMinThroughput: nullable(PreferredMinThroughput$outboundSchema).optional(),
  quantizations: nullable(array(Quantization$outboundSchema)).optional(),
  requireParameters: nullable(boolean$1()).optional(),
  sort: nullable(union([
    ProviderSort$outboundSchema,
    ProviderSortConfig$outboundSchema,
    any()
  ])).optional(),
  zdr: nullable(boolean$1()).optional()
}).transform((v) => {
  return remap(v, {
    allowFallbacks: "allow_fallbacks",
    dataCollection: "data_collection",
    enforceDistillableText: "enforce_distillable_text",
    maxPrice: "max_price",
    preferredMaxLatency: "preferred_max_latency",
    preferredMinThroughput: "preferred_min_throughput",
    requireParameters: "require_parameters"
  });
});
const ResponseHealingPlugin$outboundSchema = object({
  enabled: boolean$1().optional(),
  id: literal("response-healing")
});
const TraceConfig$outboundSchema = object({
  generationName: string().optional(),
  parentSpanId: string().optional(),
  spanName: string().optional(),
  traceId: string().optional(),
  traceName: string().optional(),
  additionalProperties: record(string(), nullable(any())).optional()
}).transform((v) => {
  return {
    ...v.additionalProperties,
    ...remap(v, {
      generationName: "generation_name",
      parentSpanId: "parent_span_id",
      spanName: "span_name",
      traceId: "trace_id",
      traceName: "trace_name",
      additionalProperties: null
    })
  };
});
const WebSearchEngine$outboundSchema = outboundSchema();
const WebSearchPluginType = {
  Approximate: "approximate"
};
const WebSearchPluginType$outboundSchema = _enum(WebSearchPluginType);
const UserLocation$outboundSchema = object({
  city: nullable(string()).optional(),
  country: nullable(string()).optional(),
  region: nullable(string()).optional(),
  timezone: nullable(string()).optional(),
  type: WebSearchPluginType$outboundSchema
});
const WebSearchPlugin$outboundSchema = object({
  enabled: boolean$1().optional(),
  engine: WebSearchEngine$outboundSchema.optional(),
  excludeDomains: array(string()).optional(),
  id: literal("web"),
  includeDomains: array(string()).optional(),
  maxResults: int().optional(),
  maxUses: int().optional(),
  searchPrompt: string().optional(),
  userLocation: nullable(lazy(() => UserLocation$outboundSchema)).optional()
}).transform((v) => {
  return remap(v, {
    excludeDomains: "exclude_domains",
    includeDomains: "include_domains",
    maxResults: "max_results",
    maxUses: "max_uses",
    searchPrompt: "search_prompt",
    userLocation: "user_location"
  });
});
const Modality$outboundSchema = outboundSchema();
union([
  AutoRouterPlugin$outboundSchema,
  ContextCompressionPlugin$outboundSchema,
  FileParserPlugin$outboundSchema,
  ModerationPlugin$outboundSchema,
  ParetoRouterPlugin$outboundSchema,
  ResponseHealingPlugin$outboundSchema,
  WebSearchPlugin$outboundSchema
]);
const Effort$outboundSchema = outboundSchema();
const Reasoning$outboundSchema = object({
  effort: nullable(Effort$outboundSchema).optional(),
  summary: nullable(ChatReasoningSummaryVerbosityEnum$outboundSchema).optional()
});
union([
  ChatFormatGrammarConfig$outboundSchema,
  FormatJsonObjectConfig$outboundSchema,
  ChatFormatJsonSchemaConfig$outboundSchema,
  ChatFormatPythonConfig$outboundSchema,
  ChatFormatTextConfig$outboundSchema
]);
const ChatRequestServiceTier$outboundSchema = outboundSchema();
union([
  string(),
  array(string()),
  any()
]);
const ChatRequest$outboundSchema = object({
  cacheControl: AnthropicCacheControlDirective$outboundSchema.optional(),
  debug: ChatDebugOptions$outboundSchema.optional(),
  frequencyPenalty: nullable(number()).optional(),
  imageConfig: record(string(), ImageConfig$outboundSchema).optional(),
  logitBias: nullable(record(string(), number())).optional(),
  logprobs: nullable(boolean$1()).optional(),
  maxCompletionTokens: nullable(int()).optional(),
  maxTokens: nullable(int()).optional(),
  messages: array(ChatMessages$outboundSchema),
  metadata: record(string(), string()).optional(),
  modalities: array(Modality$outboundSchema).optional(),
  model: string().optional(),
  models: array(string()).optional(),
  parallelToolCalls: nullable(boolean$1()).optional(),
  plugins: array(union([
    AutoRouterPlugin$outboundSchema,
    ContextCompressionPlugin$outboundSchema,
    FileParserPlugin$outboundSchema,
    ModerationPlugin$outboundSchema,
    ParetoRouterPlugin$outboundSchema,
    ResponseHealingPlugin$outboundSchema,
    WebSearchPlugin$outboundSchema
  ])).optional(),
  presencePenalty: nullable(number()).optional(),
  provider: nullable(ProviderPreferences$outboundSchema).optional(),
  reasoning: lazy(() => Reasoning$outboundSchema).optional(),
  responseFormat: union([
    ChatFormatGrammarConfig$outboundSchema,
    FormatJsonObjectConfig$outboundSchema,
    ChatFormatJsonSchemaConfig$outboundSchema,
    ChatFormatPythonConfig$outboundSchema,
    ChatFormatTextConfig$outboundSchema
  ]).optional(),
  seed: nullable(int()).optional(),
  serviceTier: nullable(ChatRequestServiceTier$outboundSchema).optional(),
  sessionId: string().optional(),
  stop: nullable(union([string(), array(string()), any()])).optional(),
  stream: boolean$1().default(false),
  streamOptions: nullable(ChatStreamOptions$outboundSchema).optional(),
  temperature: nullable(number()).optional(),
  toolChoice: ChatToolChoice$outboundSchema.optional(),
  tools: array(ChatFunctionTool$outboundSchema).optional(),
  topLogprobs: nullable(int()).optional(),
  topP: nullable(number()).optional(),
  trace: TraceConfig$outboundSchema.optional(),
  user: string().optional()
}).transform((v) => {
  return remap(v, {
    cacheControl: "cache_control",
    frequencyPenalty: "frequency_penalty",
    imageConfig: "image_config",
    logitBias: "logit_bias",
    maxCompletionTokens: "max_completion_tokens",
    maxTokens: "max_tokens",
    parallelToolCalls: "parallel_tool_calls",
    presencePenalty: "presence_penalty",
    responseFormat: "response_format",
    serviceTier: "service_tier",
    sessionId: "session_id",
    streamOptions: "stream_options",
    toolChoice: "tool_choice",
    topLogprobs: "top_logprobs",
    topP: "top_p"
  });
});
const CostDetails$inboundSchema = object({
  upstream_inference_completions_cost: number(),
  upstream_inference_cost: nullable(number()).optional(),
  upstream_inference_prompt_cost: number()
}).transform((v) => {
  return remap(v, {
    "upstream_inference_completions_cost": "upstreamInferenceCompletionsCost",
    "upstream_inference_cost": "upstreamInferenceCost",
    "upstream_inference_prompt_cost": "upstreamInferencePromptCost"
  });
});
const CompletionTokensDetails$inboundSchema = object({
  accepted_prediction_tokens: nullable(int()).optional(),
  audio_tokens: nullable(int()).optional(),
  reasoning_tokens: nullable(int()).optional(),
  rejected_prediction_tokens: nullable(int()).optional()
}).transform((v) => {
  return remap(v, {
    "accepted_prediction_tokens": "acceptedPredictionTokens",
    "audio_tokens": "audioTokens",
    "reasoning_tokens": "reasoningTokens",
    "rejected_prediction_tokens": "rejectedPredictionTokens"
  });
});
const PromptTokensDetails$inboundSchema$1 = object({
  audio_tokens: int().optional(),
  cache_write_tokens: int().optional(),
  cached_tokens: int().optional(),
  video_tokens: int().optional()
}).transform((v) => {
  return remap(v, {
    "audio_tokens": "audioTokens",
    "cache_write_tokens": "cacheWriteTokens",
    "cached_tokens": "cachedTokens",
    "video_tokens": "videoTokens"
  });
});
const ChatUsage$inboundSchema = object({
  completion_tokens: int(),
  completion_tokens_details: nullable(lazy(() => CompletionTokensDetails$inboundSchema)).optional(),
  cost: nullable(number()).optional(),
  cost_details: nullable(CostDetails$inboundSchema).optional(),
  is_byok: boolean$1().optional(),
  prompt_tokens: int(),
  prompt_tokens_details: nullable(lazy(() => PromptTokensDetails$inboundSchema$1)).optional(),
  total_tokens: int()
}).transform((v) => {
  return remap(v, {
    "completion_tokens": "completionTokens",
    "completion_tokens_details": "completionTokensDetails",
    "cost_details": "costDetails",
    "is_byok": "isByok",
    "prompt_tokens": "promptTokens",
    "prompt_tokens_details": "promptTokensDetails",
    "total_tokens": "totalTokens"
  });
});
const EndpointInfo$inboundSchema = object({
  model: string(),
  provider: string(),
  selected: boolean$1()
});
const EndpointsMetadata$inboundSchema = object({
  available: array(EndpointInfo$inboundSchema),
  total: int()
});
const PipelineStageType = {
  Guardrail: "guardrail",
  Plugin: "plugin",
  ServerTools: "server_tools",
  ResponseHealing: "response_healing",
  ContextCompression: "context_compression"
};
const PipelineStageType$inboundSchema = inboundSchema(PipelineStageType);
const PipelineStage$inboundSchema = object({
  cost_usd: nullable(number()).optional(),
  data: record(string(), nullable(any())).optional(),
  guardrail_id: string().optional(),
  guardrail_scope: string().optional(),
  name: string(),
  type: PipelineStageType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "cost_usd": "costUsd",
    "guardrail_id": "guardrailId",
    "guardrail_scope": "guardrailScope"
  });
});
const RouterAttempt$inboundSchema = object({
  model: string(),
  provider: string(),
  status: int()
});
const RouterParams$inboundSchema = collectExtraKeys(object({
  quality_floor: number().optional(),
  throughput_floor: number().optional(),
  version_group: string().optional()
}).catchall(any()), "additionalProperties").transform((v) => {
  return remap(v, {
    "quality_floor": "qualityFloor",
    "throughput_floor": "throughputFloor",
    "version_group": "versionGroup"
  });
});
const RoutingStrategy = {
  Direct: "direct",
  Auto: "auto",
  Free: "free",
  Latest: "latest",
  Alias: "alias",
  Fallback: "fallback",
  Pareto: "pareto",
  Bodybuilder: "bodybuilder"
};
const RoutingStrategy$inboundSchema = inboundSchema(RoutingStrategy);
const OpenRouterMetadata$inboundSchema = object({
  attempt: int(),
  attempts: array(RouterAttempt$inboundSchema).optional(),
  endpoints: EndpointsMetadata$inboundSchema,
  is_byok: boolean$1(),
  params: RouterParams$inboundSchema.optional(),
  pipeline: array(PipelineStage$inboundSchema).optional(),
  region: nullable(string()),
  requested: string(),
  strategy: RoutingStrategy$inboundSchema,
  summary: string()
}).transform((v) => {
  return remap(v, {
    "is_byok": "isByok"
  });
});
const ChatResultObject = {
  ChatCompletion: "chat.completion"
};
const ChatResultObject$inboundSchema = _enum(ChatResultObject);
const ChatResult$inboundSchema = object({
  choices: array(ChatChoice$inboundSchema),
  created: int(),
  id: string(),
  model: string(),
  object: ChatResultObject$inboundSchema,
  openrouter_metadata: OpenRouterMetadata$inboundSchema.optional(),
  service_tier: nullable(string()).optional(),
  system_fingerprint: nullable(string()),
  usage: ChatUsage$inboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "service_tier": "serviceTier",
    "system_fingerprint": "systemFingerprint"
  });
});
const ChatStreamToolCallType = {
  Function: "function"
};
const ChatStreamToolCallFunction$inboundSchema = object({
  arguments: string().optional(),
  name: string().optional()
});
const ChatStreamToolCallType$inboundSchema = _enum(ChatStreamToolCallType);
const ChatStreamToolCall$inboundSchema = object({
  function: lazy(() => ChatStreamToolCallFunction$inboundSchema).optional(),
  id: string().optional(),
  index: int(),
  type: ChatStreamToolCallType$inboundSchema.optional()
});
const ChatStreamDeltaRole = {
  Assistant: "assistant"
};
const ChatStreamDeltaRole$inboundSchema = _enum(ChatStreamDeltaRole);
const ChatStreamDelta$inboundSchema = object({
  audio: ChatAudioOutput$inboundSchema.optional(),
  content: nullable(string()).optional(),
  reasoning: nullable(string()).optional(),
  reasoning_details: array(ReasoningDetailUnion$inboundSchema).optional(),
  refusal: nullable(string()).optional(),
  role: ChatStreamDeltaRole$inboundSchema.optional(),
  tool_calls: array(ChatStreamToolCall$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "reasoning_details": "reasoningDetails",
    "tool_calls": "toolCalls"
  });
});
const ChatStreamChoice$inboundSchema = object({
  delta: ChatStreamDelta$inboundSchema,
  finish_reason: nullable(ChatFinishReasonEnum$inboundSchema),
  index: int(),
  logprobs: nullable(ChatTokenLogprobs$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "finish_reason": "finishReason"
  });
});
const ChatStreamChunkObject = {
  ChatCompletionChunk: "chat.completion.chunk"
};
const ErrorT$inboundSchema = object({
  code: int(),
  message: string()
});
const ChatStreamChunkObject$inboundSchema = _enum(ChatStreamChunkObject);
const ChatStreamChunk$inboundSchema = object({
  choices: array(ChatStreamChoice$inboundSchema),
  created: int(),
  error: lazy(() => ErrorT$inboundSchema).optional(),
  id: string(),
  model: string(),
  object: ChatStreamChunkObject$inboundSchema,
  openrouter_metadata: OpenRouterMetadata$inboundSchema.optional(),
  service_tier: nullable(string()).optional(),
  system_fingerprint: string().optional(),
  usage: ChatUsage$inboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "service_tier": "serviceTier",
    "system_fingerprint": "systemFingerprint"
  });
});
const ChatStreamingResponse$inboundSchema = object({
  data: string().transform((v, ctx) => {
    try {
      return JSON.parse(v);
    } catch (err) {
      ctx.addIssue({
        input: v,
        code: "custom",
        message: `malformed json: ${err}`
      });
      return NEVER$1;
    }
  }).pipe(ChatStreamChunk$inboundSchema)
});
const MemoryLimit = {
  Oneg: "1g",
  Fourg: "4g",
  Sixteeng: "16g",
  SixtyFourg: "64g"
};
const ContainerType = {
  Auto: "auto"
};
const MemoryLimit$inboundSchema = inboundSchema(MemoryLimit);
const MemoryLimit$outboundSchema = outboundSchema();
const ContainerType$inboundSchema = _enum(ContainerType);
const ContainerType$outboundSchema = ContainerType$inboundSchema;
const ContainerAuto$inboundSchema = object({
  file_ids: array(string()).optional(),
  memory_limit: nullable(MemoryLimit$inboundSchema).optional(),
  type: ContainerType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "file_ids": "fileIds",
    "memory_limit": "memoryLimit"
  });
});
const ContainerAuto$outboundSchema = object({
  fileIds: array(string()).optional(),
  memoryLimit: nullable(MemoryLimit$outboundSchema).optional(),
  type: ContainerType$outboundSchema
}).transform((v) => {
  return remap(v, {
    fileIds: "file_ids",
    memoryLimit: "memory_limit"
  });
});
union([
  lazy(() => ContainerAuto$inboundSchema),
  string()
]);
union([lazy(() => ContainerAuto$outboundSchema), string()]);
const CodeInterpreterServerTool$inboundSchema = object({
  container: union([lazy(() => ContainerAuto$inboundSchema), string()]),
  type: literal("code_interpreter")
});
const CodeInterpreterServerTool$outboundSchema = object({
  container: union([lazy(() => ContainerAuto$outboundSchema), string()]),
  type: literal("code_interpreter")
});
const CodexLocalShellTool$inboundSchema = object({
  type: literal("local_shell")
});
const CodexLocalShellTool$outboundSchema = object({
  type: literal("local_shell")
});
const CompoundFilterType = {
  And: "and",
  Or: "or"
};
const CompoundFilterType$inboundSchema = inboundSchema(CompoundFilterType);
const CompoundFilterType$outboundSchema = outboundSchema();
const CompoundFilter$inboundSchema = object({
  filters: array(record(string(), nullable(any()))),
  type: CompoundFilterType$inboundSchema
});
const CompoundFilter$outboundSchema = object({
  filters: array(record(string(), nullable(any()))),
  type: CompoundFilterType$outboundSchema
});
const Environment = {
  Windows: "windows",
  Mac: "mac",
  Linux: "linux",
  Ubuntu: "ubuntu",
  Browser: "browser"
};
const Environment$inboundSchema = inboundSchema(Environment);
const Environment$outboundSchema = outboundSchema();
const ComputerUseServerTool$inboundSchema = object({
  display_height: int(),
  display_width: int(),
  environment: Environment$inboundSchema,
  type: literal("computer_use_preview")
}).transform((v) => {
  return remap(v, {
    "display_height": "displayHeight",
    "display_width": "displayWidth"
  });
});
const ComputerUseServerTool$outboundSchema = object({
  displayHeight: int(),
  displayWidth: int(),
  environment: Environment$outboundSchema,
  type: literal("computer_use_preview")
}).transform((v) => {
  return remap(v, {
    displayHeight: "display_height",
    displayWidth: "display_width"
  });
});
const ConflictResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const ContentFilterAction = {
  Redact: "redact",
  Block: "block"
};
const ContentFilterAction$inboundSchema = inboundSchema(ContentFilterAction);
const ContentFilterAction$outboundSchema = outboundSchema();
const ContentFilterBuiltinAction = {
  Redact: "redact",
  Block: "block",
  Flag: "flag"
};
const ContentFilterBuiltinAction$inboundSchema = inboundSchema(ContentFilterBuiltinAction);
const ContentFilterBuiltinAction$outboundSchema = outboundSchema();
const ContentFilterBuiltinSlug = {
  Email: "email",
  Phone: "phone",
  Ssn: "ssn",
  CreditCard: "credit-card",
  IpAddress: "ip-address",
  PersonName: "person-name",
  Address: "address",
  RegexPromptInjection: "regex-prompt-injection"
};
const ContentFilterBuiltinSlug$inboundSchema = inboundSchema(ContentFilterBuiltinSlug);
const ContentFilterBuiltinSlug$outboundSchema = outboundSchema();
const ContentFilterBuiltinEntry$inboundSchema = object({
  action: ContentFilterBuiltinAction$inboundSchema,
  label: string().optional(),
  slug: ContentFilterBuiltinSlug$inboundSchema
});
const ContentFilterBuiltinEntry$outboundSchema = object({
  action: ContentFilterBuiltinAction$outboundSchema,
  label: string().optional(),
  slug: ContentFilterBuiltinSlug$outboundSchema
});
const ContentFilterEntry$inboundSchema = object({
  action: ContentFilterAction$inboundSchema,
  label: nullable(string()).optional(),
  pattern: string()
});
const ContentFilterEntry$outboundSchema = object({
  action: ContentFilterAction$outboundSchema,
  label: nullable(string()).optional(),
  pattern: string()
});
const ReasoningTextContentType = {
  ReasoningText: "reasoning_text"
};
const ReasoningTextContentType$inboundSchema = _enum(ReasoningTextContentType);
const ReasoningTextContentType$outboundSchema = ReasoningTextContentType$inboundSchema;
const ReasoningTextContent$inboundSchema = object({
  text: string(),
  type: ReasoningTextContentType$inboundSchema
});
const ReasoningTextContent$outboundSchema = object({
  text: string(),
  type: ReasoningTextContentType$outboundSchema
});
discriminatedUnion("type", {
  output_text: ResponseOutputText$inboundSchema,
  reasoning_text: ReasoningTextContent$inboundSchema.and(object({ type: literal("reasoning_text") })),
  refusal: OpenAIResponsesRefusalContent$inboundSchema
});
const ContentPartAddedEvent$inboundSchema = object({
  content_index: int(),
  item_id: string(),
  output_index: int(),
  part: discriminatedUnion("type", {
    output_text: ResponseOutputText$inboundSchema,
    reasoning_text: ReasoningTextContent$inboundSchema.and(object({ type: literal("reasoning_text") })),
    refusal: OpenAIResponsesRefusalContent$inboundSchema
  }),
  sequence_number: int(),
  type: literal("response.content_part.added")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
discriminatedUnion("type", {
  output_text: ResponseOutputText$inboundSchema,
  reasoning_text: ReasoningTextContent$inboundSchema.and(object({ type: literal("reasoning_text") })),
  refusal: OpenAIResponsesRefusalContent$inboundSchema
});
const ContentPartDoneEvent$inboundSchema = object({
  content_index: int(),
  item_id: string(),
  output_index: int(),
  part: discriminatedUnion("type", {
    output_text: ResponseOutputText$inboundSchema,
    reasoning_text: ReasoningTextContent$inboundSchema.and(object({ type: literal("reasoning_text") })),
    refusal: OpenAIResponsesRefusalContent$inboundSchema
  }),
  sequence_number: int(),
  type: literal("response.content_part.done")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const ContentPartImageType = {
  ImageUrl: "image_url"
};
const ContentPartImageImageUrl$outboundSchema = object({
  url: string()
});
const ContentPartImageType$outboundSchema = _enum(ContentPartImageType);
const ContentPartImage$outboundSchema = object({
  imageUrl: lazy(() => ContentPartImageImageUrl$outboundSchema),
  type: ContentPartImageType$outboundSchema
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
const GuardrailInterval = {
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly"
};
const GuardrailInterval$inboundSchema = inboundSchema(GuardrailInterval);
const GuardrailInterval$outboundSchema = outboundSchema();
const CreateGuardrailRequest$outboundSchema$1 = object({
  allowedModels: nullable(array(string())).optional(),
  allowedProviders: nullable(array(string())).optional(),
  contentFilterBuiltins: nullable(array(ContentFilterBuiltinEntry$outboundSchema)).optional(),
  contentFilters: nullable(array(ContentFilterEntry$outboundSchema)).optional(),
  description: nullable(string()).optional(),
  enforceZdr: nullable(boolean$1()).optional(),
  ignoredModels: nullable(array(string())).optional(),
  ignoredProviders: nullable(array(string())).optional(),
  limitUsd: nullable(number()).optional(),
  name: string(),
  resetInterval: nullable(GuardrailInterval$outboundSchema).optional(),
  workspaceId: string().optional()
}).transform((v) => {
  return remap(v, {
    allowedModels: "allowed_models",
    allowedProviders: "allowed_providers",
    contentFilterBuiltins: "content_filter_builtins",
    contentFilters: "content_filters",
    enforceZdr: "enforce_zdr",
    ignoredModels: "ignored_models",
    ignoredProviders: "ignored_providers",
    limitUsd: "limit_usd",
    resetInterval: "reset_interval",
    workspaceId: "workspace_id"
  });
});
const Guardrail$inboundSchema = object({
  allowed_models: nullable(array(string())).optional(),
  allowed_providers: nullable(array(string())).optional(),
  content_filter_builtins: nullable(array(ContentFilterBuiltinEntry$inboundSchema)).optional(),
  content_filters: nullable(array(ContentFilterEntry$inboundSchema)).optional(),
  created_at: string(),
  description: nullable(string()).optional(),
  enforce_zdr: nullable(boolean$1()).optional(),
  id: string(),
  ignored_models: nullable(array(string())).optional(),
  ignored_providers: nullable(array(string())).optional(),
  limit_usd: nullable(number()).optional(),
  name: string(),
  reset_interval: nullable(GuardrailInterval$inboundSchema).optional(),
  updated_at: nullable(string()).optional(),
  workspace_id: string()
}).transform((v) => {
  return remap(v, {
    "allowed_models": "allowedModels",
    "allowed_providers": "allowedProviders",
    "content_filter_builtins": "contentFilterBuiltins",
    "content_filters": "contentFilters",
    "created_at": "createdAt",
    "enforce_zdr": "enforceZdr",
    "ignored_models": "ignoredModels",
    "ignored_providers": "ignoredProviders",
    "limit_usd": "limitUsd",
    "reset_interval": "resetInterval",
    "updated_at": "updatedAt",
    "workspace_id": "workspaceId"
  });
});
const CreateGuardrailResponse$inboundSchema = object({
  data: Guardrail$inboundSchema
});
const CreateWorkspaceRequest$outboundSchema$1 = object({
  defaultImageModel: nullable(string()).optional(),
  defaultProviderSort: nullable(string()).optional(),
  defaultTextModel: nullable(string()).optional(),
  description: nullable(string()).optional(),
  ioLoggingApiKeyIds: nullable(array(int())).optional(),
  ioLoggingSamplingRate: number().optional(),
  isDataDiscountLoggingEnabled: boolean$1().optional(),
  isObservabilityBroadcastEnabled: boolean$1().optional(),
  isObservabilityIoLoggingEnabled: boolean$1().optional(),
  name: string(),
  slug: string()
}).transform((v) => {
  return remap(v, {
    defaultImageModel: "default_image_model",
    defaultProviderSort: "default_provider_sort",
    defaultTextModel: "default_text_model",
    ioLoggingApiKeyIds: "io_logging_api_key_ids",
    ioLoggingSamplingRate: "io_logging_sampling_rate",
    isDataDiscountLoggingEnabled: "is_data_discount_logging_enabled",
    isObservabilityBroadcastEnabled: "is_observability_broadcast_enabled",
    isObservabilityIoLoggingEnabled: "is_observability_io_logging_enabled"
  });
});
const Workspace$inboundSchema = object({
  created_at: string(),
  created_by: nullable(string()),
  default_image_model: nullable(string()),
  default_provider_sort: nullable(string()),
  default_text_model: nullable(string()),
  description: nullable(string()),
  id: string(),
  io_logging_api_key_ids: nullable(array(int())),
  io_logging_sampling_rate: number(),
  is_data_discount_logging_enabled: boolean$1(),
  is_observability_broadcast_enabled: boolean$1(),
  is_observability_io_logging_enabled: boolean$1(),
  name: string(),
  slug: string(),
  updated_at: nullable(string())
}).transform((v) => {
  return remap(v, {
    "created_at": "createdAt",
    "created_by": "createdBy",
    "default_image_model": "defaultImageModel",
    "default_provider_sort": "defaultProviderSort",
    "default_text_model": "defaultTextModel",
    "io_logging_api_key_ids": "ioLoggingApiKeyIds",
    "io_logging_sampling_rate": "ioLoggingSamplingRate",
    "is_data_discount_logging_enabled": "isDataDiscountLoggingEnabled",
    "is_observability_broadcast_enabled": "isObservabilityBroadcastEnabled",
    "is_observability_io_logging_enabled": "isObservabilityIoLoggingEnabled",
    "updated_at": "updatedAt"
  });
});
const CreateWorkspaceResponse$inboundSchema = object({
  data: Workspace$inboundSchema
});
const Syntax = {
  Lark: "lark",
  Regex: "regex"
};
const Syntax$inboundSchema = inboundSchema(Syntax);
const Syntax$outboundSchema = outboundSchema();
const FormatGrammar$inboundSchema = object({
  definition: string(),
  syntax: Syntax$inboundSchema,
  type: literal("grammar")
});
const FormatGrammar$outboundSchema = object({
  definition: string(),
  syntax: Syntax$outboundSchema,
  type: literal("grammar")
});
const FormatText$inboundSchema = object({
  type: literal("text")
});
const FormatText$outboundSchema = object({
  type: literal("text")
});
discriminatedUnion("type", {
  text: lazy(() => FormatText$inboundSchema),
  grammar: lazy(() => FormatGrammar$inboundSchema)
});
union([
  lazy(() => FormatText$outboundSchema),
  lazy(() => FormatGrammar$outboundSchema)
]);
const CustomTool$inboundSchema = object({
  description: string().optional(),
  format: discriminatedUnion("type", {
    text: lazy(() => FormatText$inboundSchema),
    grammar: lazy(() => FormatGrammar$inboundSchema)
  }).optional(),
  name: string(),
  type: literal("custom")
});
const CustomTool$outboundSchema = object({
  description: string().optional(),
  format: union([
    lazy(() => FormatText$outboundSchema),
    lazy(() => FormatGrammar$outboundSchema)
  ]).optional(),
  name: string(),
  type: literal("custom")
});
const DefaultParameters$inboundSchema = object({
  frequency_penalty: nullable(number()).optional(),
  presence_penalty: nullable(number()).optional(),
  repetition_penalty: nullable(number()).optional(),
  temperature: nullable(number()).optional(),
  top_k: nullable(int()).optional(),
  top_p: nullable(number()).optional()
}).transform((v) => {
  return remap(v, {
    "frequency_penalty": "frequencyPenalty",
    "presence_penalty": "presencePenalty",
    "repetition_penalty": "repetitionPenalty",
    "top_k": "topK",
    "top_p": "topP"
  });
});
const DeleteGuardrailResponse$inboundSchema = object({
  deleted: literal(true)
});
const DeleteWorkspaceResponse$inboundSchema = object({
  deleted: literal(true)
});
const InputVideo$outboundSchema = object({
  type: literal("input_video"),
  videoUrl: string()
}).transform((v) => {
  return remap(v, {
    videoUrl: "video_url"
  });
});
const EasyInputMessagePhaseFinalAnswer = {
  FinalAnswer: "final_answer"
};
const EasyInputMessagePhaseCommentary = {
  Commentary: "commentary"
};
const EasyInputMessageRoleDeveloper = {
  Developer: "developer"
};
const EasyInputMessageRoleAssistant = {
  Assistant: "assistant"
};
const EasyInputMessageRoleSystem = {
  System: "system"
};
const EasyInputMessageRoleUser = {
  User: "user"
};
const EasyInputMessageTypeMessage = {
  Message: "message"
};
const EasyInputMessageDetail$outboundSchema = outboundSchema();
const EasyInputMessageContentInputImage$outboundSchema = object({
  detail: EasyInputMessageDetail$outboundSchema,
  imageUrl: nullable(string()).optional(),
  type: literal("input_image")
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
union([
  InputText$outboundSchema,
  lazy(() => EasyInputMessageContentInputImage$outboundSchema),
  InputFile$outboundSchema,
  InputAudio$outboundSchema,
  InputVideo$outboundSchema
]);
union([
  array(union([
    InputText$outboundSchema,
    lazy(() => EasyInputMessageContentInputImage$outboundSchema),
    InputFile$outboundSchema,
    InputAudio$outboundSchema,
    InputVideo$outboundSchema
  ])),
  string(),
  any()
]);
const EasyInputMessagePhaseFinalAnswer$outboundSchema = _enum(EasyInputMessagePhaseFinalAnswer);
const EasyInputMessagePhaseCommentary$outboundSchema = _enum(EasyInputMessagePhaseCommentary);
union([
  EasyInputMessagePhaseCommentary$outboundSchema,
  EasyInputMessagePhaseFinalAnswer$outboundSchema,
  any()
]);
const EasyInputMessageRoleDeveloper$outboundSchema = _enum(EasyInputMessageRoleDeveloper);
const EasyInputMessageRoleAssistant$outboundSchema = _enum(EasyInputMessageRoleAssistant);
const EasyInputMessageRoleSystem$outboundSchema = _enum(EasyInputMessageRoleSystem);
const EasyInputMessageRoleUser$outboundSchema = _enum(EasyInputMessageRoleUser);
union([
  EasyInputMessageRoleUser$outboundSchema,
  EasyInputMessageRoleSystem$outboundSchema,
  EasyInputMessageRoleAssistant$outboundSchema,
  EasyInputMessageRoleDeveloper$outboundSchema
]);
const EasyInputMessageTypeMessage$outboundSchema = _enum(EasyInputMessageTypeMessage);
const EasyInputMessage$outboundSchema = object({
  content: nullable(union([
    array(union([
      InputText$outboundSchema,
      lazy(() => EasyInputMessageContentInputImage$outboundSchema),
      InputFile$outboundSchema,
      InputAudio$outboundSchema,
      InputVideo$outboundSchema
    ])),
    string(),
    any()
  ])).optional(),
  phase: nullable(union([
    EasyInputMessagePhaseCommentary$outboundSchema,
    EasyInputMessagePhaseFinalAnswer$outboundSchema,
    any()
  ])).optional(),
  role: union([
    EasyInputMessageRoleUser$outboundSchema,
    EasyInputMessageRoleSystem$outboundSchema,
    EasyInputMessageRoleAssistant$outboundSchema,
    EasyInputMessageRoleDeveloper$outboundSchema
  ]),
  type: EasyInputMessageTypeMessage$outboundSchema.optional()
});
const EdgeNetworkTimeoutResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const EndpointStatus = {
  Zero: 0,
  Minus1: -1,
  Minus2: -2,
  Minus3: -3,
  Minus5: -5,
  Minus10: -10
};
const EndpointStatus$inboundSchema = inboundSchemaInt(EndpointStatus);
const ErrorEvent$inboundSchema = object({
  code: nullable(string()),
  message: string(),
  param: nullable(string()),
  sequence_number: int(),
  type: literal("error")
}).transform((v) => {
  return remap(v, {
    "sequence_number": "sequenceNumber"
  });
});
const FiltersType = {
  Eq: "eq",
  Ne: "ne",
  Gt: "gt",
  Gte: "gte",
  Lt: "lt",
  Lte: "lte"
};
const Ranker = {
  Auto: "auto",
  Default20241115: "default-2024-11-15"
};
const FiltersType$inboundSchema = inboundSchema(FiltersType);
const FiltersType$outboundSchema = outboundSchema();
union([
  string(),
  number()
]);
union([string(), number()]);
union([
  string(),
  number(),
  boolean$1(),
  array(union([string(), number()]))
]);
union([
  string(),
  number(),
  boolean$1(),
  array(union([string(), number()]))
]);
const Filters$inboundSchema = object({
  key: string(),
  type: FiltersType$inboundSchema,
  value: union([
    string(),
    number(),
    boolean$1(),
    array(union([string(), number()]))
  ])
});
const Filters$outboundSchema = object({
  key: string(),
  type: FiltersType$outboundSchema,
  value: union([
    string(),
    number(),
    boolean$1(),
    array(union([string(), number()]))
  ])
});
union([
  lazy(() => Filters$inboundSchema),
  CompoundFilter$inboundSchema,
  any()
]);
union([
  lazy(() => Filters$outboundSchema),
  CompoundFilter$outboundSchema,
  any()
]);
const Ranker$inboundSchema = inboundSchema(Ranker);
const Ranker$outboundSchema = outboundSchema();
const RankingOptions$inboundSchema = object({
  ranker: Ranker$inboundSchema.optional(),
  score_threshold: number().optional()
}).transform((v) => {
  return remap(v, {
    "score_threshold": "scoreThreshold"
  });
});
const RankingOptions$outboundSchema = object({
  ranker: Ranker$outboundSchema.optional(),
  scoreThreshold: number().optional()
}).transform((v) => {
  return remap(v, {
    scoreThreshold: "score_threshold"
  });
});
const FileSearchServerTool$inboundSchema = object({
  filters: nullable(union([
    lazy(() => Filters$inboundSchema),
    CompoundFilter$inboundSchema,
    any()
  ])).optional(),
  max_num_results: int().optional(),
  ranking_options: lazy(() => RankingOptions$inboundSchema).optional(),
  type: literal("file_search"),
  vector_store_ids: array(string())
}).transform((v) => {
  return remap(v, {
    "max_num_results": "maxNumResults",
    "ranking_options": "rankingOptions",
    "vector_store_ids": "vectorStoreIds"
  });
});
const FileSearchServerTool$outboundSchema = object({
  filters: nullable(union([
    lazy(() => Filters$outboundSchema),
    CompoundFilter$outboundSchema,
    any()
  ])).optional(),
  maxNumResults: int().optional(),
  rankingOptions: lazy(() => RankingOptions$outboundSchema).optional(),
  type: literal("file_search"),
  vectorStoreIds: array(string())
}).transform((v) => {
  return remap(v, {
    maxNumResults: "max_num_results",
    rankingOptions: "ranking_options",
    vectorStoreIds: "vector_store_ids"
  });
});
const ForbiddenResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const FormatJsonSchemaConfig$inboundSchema = object({
  description: string().optional(),
  name: string(),
  schema: record(string(), nullable(any())),
  strict: nullable(boolean$1()).optional(),
  type: literal("json_schema")
});
const FormatJsonSchemaConfig$outboundSchema = object({
  description: string().optional(),
  name: string(),
  schema: record(string(), nullable(any())),
  strict: nullable(boolean$1()).optional(),
  type: literal("json_schema")
});
const FormatTextConfig$inboundSchema = object({
  type: literal("text")
});
const FormatTextConfig$outboundSchema = object({
  type: literal("text")
});
const Formats$inboundSchema = discriminatedUnion("type", {
  text: FormatTextConfig$inboundSchema,
  json_object: FormatJsonObjectConfig$inboundSchema,
  json_schema: FormatJsonSchemaConfig$inboundSchema
});
const Formats$outboundSchema = union([
  FormatTextConfig$outboundSchema,
  FormatJsonObjectConfig$outboundSchema,
  FormatJsonSchemaConfig$outboundSchema
]);
const FrameImageType = {
  ImageUrl: "image_url"
};
const FrameImageImageUrl$outboundSchema = object({
  url: string()
});
const FrameImageType$outboundSchema = _enum(FrameImageType);
const FrameType$outboundSchema = outboundSchema();
const FrameImage$outboundSchema = object({
  imageUrl: lazy(() => FrameImageImageUrl$outboundSchema),
  type: FrameImageType$outboundSchema,
  frameType: FrameType$outboundSchema
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url",
    frameType: "frame_type"
  });
});
const FunctionCallArgsDeltaEvent$inboundSchema = object({
  delta: string(),
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.function_call_arguments.delta")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const FunctionCallArgsDoneEvent$inboundSchema = object({
  arguments: string(),
  item_id: string(),
  name: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.function_call_arguments.done")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const FunctionCallItemType = {
  FunctionCall: "function_call"
};
const FunctionCallItemType$outboundSchema = _enum(FunctionCallItemType);
const FunctionCallItem$outboundSchema = object({
  arguments: string(),
  callId: string(),
  id: string(),
  name: string(),
  namespace: string().optional(),
  status: ToolCallStatus$outboundSchema.optional(),
  type: FunctionCallItemType$outboundSchema
}).transform((v) => {
  return remap(v, {
    callId: "call_id"
  });
});
const FunctionCallOutputItemTypeFunctionCallOutput = {
  FunctionCallOutput: "function_call_output"
};
const FunctionCallOutputItemDetail$outboundSchema = outboundSchema();
const OutputInputImage$outboundSchema = object({
  detail: FunctionCallOutputItemDetail$outboundSchema,
  imageUrl: nullable(string()).optional(),
  type: literal("input_image")
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
union([
  InputText$outboundSchema,
  lazy(() => OutputInputImage$outboundSchema),
  InputFile$outboundSchema
]);
union([
  string(),
  array(union([
    InputText$outboundSchema,
    lazy(() => OutputInputImage$outboundSchema),
    InputFile$outboundSchema
  ]))
]);
const FunctionCallOutputItemStatus$outboundSchema = outboundSchema();
const FunctionCallOutputItemTypeFunctionCallOutput$outboundSchema = _enum(FunctionCallOutputItemTypeFunctionCallOutput);
const FunctionCallOutputItem$outboundSchema = object({
  callId: string(),
  id: nullable(string()).optional(),
  output: union([
    string(),
    array(union([
      InputText$outboundSchema,
      lazy(() => OutputInputImage$outboundSchema),
      InputFile$outboundSchema
    ]))
  ]),
  status: nullable(FunctionCallOutputItemStatus$outboundSchema).optional(),
  type: FunctionCallOutputItemTypeFunctionCallOutput$outboundSchema
}).transform((v) => {
  return remap(v, {
    callId: "call_id"
  });
});
const Input2$inboundSchema = object({
  messages: array(nullable(any()))
});
const Input1$inboundSchema = object({
  prompt: string()
});
union([lazy(() => Input1$inboundSchema), lazy(() => Input2$inboundSchema)]);
const GenerationContentDataOutput$inboundSchema = object({
  completion: nullable(string()),
  reasoning: nullable(string())
});
const GenerationContentData$inboundSchema = object({
  input: union([
    lazy(() => Input1$inboundSchema),
    lazy(() => Input2$inboundSchema)
  ]),
  output: lazy(() => GenerationContentDataOutput$inboundSchema)
});
const GenerationContentResponse$inboundSchema = object({
  data: GenerationContentData$inboundSchema
});
const ProviderResponseProviderName = {
  AnyScale: "AnyScale",
  Atoma: "Atoma",
  CentML: "Cent-ML",
  CrofAI: "CrofAI",
  Enfer: "Enfer",
  GoPomelo: "GoPomelo",
  HuggingFace: "HuggingFace",
  Hyperbolic2: "Hyperbolic 2",
  InoCloud: "InoCloud",
  Kluster: "Kluster",
  Lambda: "Lambda",
  Lepton: "Lepton",
  Lynn2: "Lynn 2",
  Lynn: "Lynn",
  Mancer: "Mancer",
  Meta: "Meta",
  Modal: "Modal",
  Nineteen: "Nineteen",
  OctoAI: "OctoAI",
  Recursal: "Recursal",
  Reflection: "Reflection",
  Replicate: "Replicate",
  SambaNova2: "SambaNova 2",
  SFCompute: "SF Compute",
  Targon: "Targon",
  Together2: "Together 2",
  Ubicloud: "Ubicloud",
  OneDotAI: "01.AI",
  AkashML: "AkashML",
  Ai21: "AI21",
  AionLabs: "AionLabs",
  Alibaba: "Alibaba",
  Ambient: "Ambient",
  Baidu: "Baidu",
  AmazonBedrock: "Amazon Bedrock",
  AmazonNova: "Amazon Nova",
  Anthropic: "Anthropic",
  ArceeAI: "Arcee AI",
  AtlasCloud: "AtlasCloud",
  Avian: "Avian",
  Azure: "Azure",
  BaseTen: "BaseTen",
  BytePlus: "BytePlus",
  BlackForestLabs: "Black Forest Labs",
  Cerebras: "Cerebras",
  Chutes: "Chutes",
  Cirrascale: "Cirrascale",
  Clarifai: "Clarifai",
  Cloudflare: "Cloudflare",
  Cohere: "Cohere",
  Crusoe: "Crusoe",
  DeepInfra: "DeepInfra",
  DeepSeek: "DeepSeek",
  DekaLLM: "DekaLLM",
  Featherless: "Featherless",
  Fireworks: "Fireworks",
  Friendli: "Friendli",
  GMICloud: "GMICloud",
  Google: "Google",
  GoogleAIStudio: "Google AI Studio",
  Groq: "Groq",
  Hyperbolic: "Hyperbolic",
  Inception: "Inception",
  Inceptron: "Inceptron",
  InferenceNet: "InferenceNet",
  Ionstream: "Ionstream",
  Infermatic: "Infermatic",
  IoNet: "Io Net",
  Inflection: "Inflection",
  Liquid: "Liquid",
  Mara: "Mara",
  Mancer2: "Mancer 2",
  Minimax: "Minimax",
  ModelRun: "ModelRun",
  Mistral: "Mistral",
  Modular: "Modular",
  MoonshotAI: "Moonshot AI",
  Morph: "Morph",
  NCompass: "NCompass",
  Nebius: "Nebius",
  NexAGI: "Nex AGI",
  NextBit: "NextBit",
  Novita: "Novita",
  Nvidia: "Nvidia",
  OpenAI: "OpenAI",
  OpenInference: "OpenInference",
  Parasail: "Parasail",
  Poolside: "Poolside",
  Perceptron: "Perceptron",
  Perplexity: "Perplexity",
  Phala: "Phala",
  Recraft: "Recraft",
  Reka: "Reka",
  Relace: "Relace",
  SambaNova: "SambaNova",
  Seed: "Seed",
  SiliconFlow: "SiliconFlow",
  Sourceful: "Sourceful",
  StepFun: "StepFun",
  Stealth: "Stealth",
  StreamLake: "StreamLake",
  Switchpoint: "Switchpoint",
  Together: "Together",
  Upstage: "Upstage",
  Venice: "Venice",
  WandB: "WandB",
  Xiaomi: "Xiaomi",
  XAI: "xAI",
  ZAi: "Z.AI",
  FakeProvider: "FakeProvider"
};
const ProviderResponseProviderName$inboundSchema = inboundSchema(ProviderResponseProviderName);
const ProviderResponse$inboundSchema = object({
  endpoint_id: string().optional(),
  id: string().optional(),
  is_byok: boolean$1().optional(),
  latency: number().optional(),
  model_permaslug: string().optional(),
  provider_name: ProviderResponseProviderName$inboundSchema.optional(),
  status: nullable(number())
}).transform((v) => {
  return remap(v, {
    "endpoint_id": "endpointId",
    "is_byok": "isByok",
    "model_permaslug": "modelPermaslug",
    "provider_name": "providerName"
  });
});
const ApiType = {
  Completions: "completions",
  Embeddings: "embeddings",
  Rerank: "rerank",
  Tts: "tts",
  Stt: "stt",
  Video: "video"
};
const ApiType$inboundSchema = inboundSchema(ApiType);
const GenerationResponseData$inboundSchema = object({
  api_type: nullable(ApiType$inboundSchema),
  app_id: nullable(int()),
  cache_discount: nullable(number()),
  cancelled: nullable(boolean$1()),
  created_at: string(),
  external_user: nullable(string()),
  finish_reason: nullable(string()),
  generation_time: nullable(number()),
  http_referer: nullable(string()),
  id: string(),
  is_byok: boolean$1(),
  latency: nullable(number()),
  model: string(),
  moderation_latency: nullable(number()),
  native_finish_reason: nullable(string()),
  native_tokens_cached: nullable(int()),
  native_tokens_completion: nullable(int()),
  native_tokens_completion_images: nullable(int()),
  native_tokens_prompt: nullable(int()),
  native_tokens_reasoning: nullable(int()),
  num_fetches: nullable(int()),
  num_input_audio_prompt: nullable(int()),
  num_media_completion: nullable(int()),
  num_media_prompt: nullable(int()),
  num_search_results: nullable(int()),
  origin: string(),
  provider_name: nullable(string()),
  provider_responses: nullable(array(ProviderResponse$inboundSchema)),
  request_id: nullable(string()).optional(),
  response_cache_source_id: nullable(string()).optional(),
  router: nullable(string()),
  session_id: nullable(string()).optional(),
  streamed: nullable(boolean$1()),
  tokens_completion: nullable(int()),
  tokens_prompt: nullable(int()),
  total_cost: number(),
  upstream_id: nullable(string()),
  upstream_inference_cost: nullable(number()),
  usage: number(),
  user_agent: nullable(string()),
  web_search_engine: nullable(string())
}).transform((v) => {
  return remap(v, {
    "api_type": "apiType",
    "app_id": "appId",
    "cache_discount": "cacheDiscount",
    "created_at": "createdAt",
    "external_user": "externalUser",
    "finish_reason": "finishReason",
    "generation_time": "generationTime",
    "http_referer": "httpReferer",
    "is_byok": "isByok",
    "moderation_latency": "moderationLatency",
    "native_finish_reason": "nativeFinishReason",
    "native_tokens_cached": "nativeTokensCached",
    "native_tokens_completion": "nativeTokensCompletion",
    "native_tokens_completion_images": "nativeTokensCompletionImages",
    "native_tokens_prompt": "nativeTokensPrompt",
    "native_tokens_reasoning": "nativeTokensReasoning",
    "num_fetches": "numFetches",
    "num_input_audio_prompt": "numInputAudioPrompt",
    "num_media_completion": "numMediaCompletion",
    "num_media_prompt": "numMediaPrompt",
    "num_search_results": "numSearchResults",
    "provider_name": "providerName",
    "provider_responses": "providerResponses",
    "request_id": "requestId",
    "response_cache_source_id": "responseCacheSourceId",
    "session_id": "sessionId",
    "tokens_completion": "tokensCompletion",
    "tokens_prompt": "tokensPrompt",
    "total_cost": "totalCost",
    "upstream_id": "upstreamId",
    "upstream_inference_cost": "upstreamInferenceCost",
    "user_agent": "userAgent",
    "web_search_engine": "webSearchEngine"
  });
});
const GenerationResponse$inboundSchema = object({
  data: lazy(() => GenerationResponseData$inboundSchema)
});
const GetGuardrailResponse$inboundSchema = object({
  data: Guardrail$inboundSchema
});
const GetWorkspaceResponse$inboundSchema = object({
  data: Workspace$inboundSchema
});
const ImageGenCallCompletedEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.image_generation_call.completed")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const ImageGenCallGeneratingEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.image_generation_call.generating")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const ImageGenCallInProgressEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.image_generation_call.in_progress")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const ImageGenCallPartialImageEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  partial_image_b64: string(),
  partial_image_index: int(),
  sequence_number: int(),
  type: literal("response.image_generation_call.partial_image")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "partial_image_b64": "partialImageB64",
    "partial_image_index": "partialImageIndex",
    "sequence_number": "sequenceNumber"
  });
});
const Background = {
  Transparent: "transparent",
  Opaque: "opaque",
  Auto: "auto"
};
const InputFidelity = {
  High: "high",
  Low: "low"
};
const ModelEnum = {
  GptImage1: "gpt-image-1",
  GptImage1Mini: "gpt-image-1-mini"
};
const Moderation = {
  Auto: "auto",
  Low: "low"
};
const OutputFormat = {
  Png: "png",
  Webp: "webp",
  Jpeg: "jpeg"
};
const Quality = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Auto: "auto"
};
const Size = {
  OneThousandAndTwentyFourx1024: "1024x1024",
  OneThousandAndTwentyFourx1536: "1024x1536",
  OneThousandFiveHundredAndThirtySixx1024: "1536x1024",
  Auto: "auto"
};
const Background$inboundSchema = inboundSchema(Background);
const Background$outboundSchema = outboundSchema();
const InputFidelity$inboundSchema = inboundSchema(InputFidelity);
const InputFidelity$outboundSchema = outboundSchema();
const InputImageMask$inboundSchema = object({
  file_id: string().optional(),
  image_url: string().optional()
}).transform((v) => {
  return remap(v, {
    "file_id": "fileId",
    "image_url": "imageUrl"
  });
});
const InputImageMask$outboundSchema = object({
  fileId: string().optional(),
  imageUrl: string().optional()
}).transform((v) => {
  return remap(v, {
    fileId: "file_id",
    imageUrl: "image_url"
  });
});
const ModelEnum$inboundSchema = inboundSchema(ModelEnum);
const ModelEnum$outboundSchema = outboundSchema();
const Moderation$inboundSchema = inboundSchema(Moderation);
const Moderation$outboundSchema = outboundSchema();
const OutputFormat$inboundSchema = inboundSchema(OutputFormat);
const OutputFormat$outboundSchema = outboundSchema();
const Quality$inboundSchema = inboundSchema(Quality);
const Quality$outboundSchema = outboundSchema();
const Size$inboundSchema = inboundSchema(Size);
const Size$outboundSchema = outboundSchema();
const ImageGenerationServerTool$inboundSchema = object({
  background: Background$inboundSchema.optional(),
  input_fidelity: nullable(InputFidelity$inboundSchema).optional(),
  input_image_mask: lazy(() => InputImageMask$inboundSchema).optional(),
  model: ModelEnum$inboundSchema.optional(),
  moderation: Moderation$inboundSchema.optional(),
  output_compression: int().optional(),
  output_format: OutputFormat$inboundSchema.optional(),
  partial_images: int().optional(),
  quality: Quality$inboundSchema.optional(),
  size: Size$inboundSchema.optional(),
  type: literal("image_generation")
}).transform((v) => {
  return remap(v, {
    "input_fidelity": "inputFidelity",
    "input_image_mask": "inputImageMask",
    "output_compression": "outputCompression",
    "output_format": "outputFormat",
    "partial_images": "partialImages"
  });
});
const ImageGenerationServerTool$outboundSchema = object({
  background: Background$outboundSchema.optional(),
  inputFidelity: nullable(InputFidelity$outboundSchema).optional(),
  inputImageMask: lazy(() => InputImageMask$outboundSchema).optional(),
  model: ModelEnum$outboundSchema.optional(),
  moderation: Moderation$outboundSchema.optional(),
  outputCompression: int().optional(),
  outputFormat: OutputFormat$outboundSchema.optional(),
  partialImages: int().optional(),
  quality: Quality$outboundSchema.optional(),
  size: Size$outboundSchema.optional(),
  type: literal("image_generation")
}).transform((v) => {
  return remap(v, {
    inputFidelity: "input_fidelity",
    inputImageMask: "input_image_mask",
    outputCompression: "output_compression",
    outputFormat: "output_format",
    partialImages: "partial_images"
  });
});
const Reason = {
  MaxOutputTokens: "max_output_tokens",
  ContentFilter: "content_filter"
};
const Reason$inboundSchema = inboundSchema(Reason);
const IncompleteDetails$inboundSchema = object({
  reason: Reason$inboundSchema.optional()
});
const InputMessageItemRoleDeveloper = {
  Developer: "developer"
};
const InputMessageItemRoleSystem = {
  System: "system"
};
const InputMessageItemRoleUser = {
  User: "user"
};
const InputMessageItemTypeMessage = {
  Message: "message"
};
const InputMessageItemDetail$outboundSchema = outboundSchema();
const InputMessageItemContentInputImage$outboundSchema = object({
  detail: InputMessageItemDetail$outboundSchema,
  imageUrl: nullable(string()).optional(),
  type: literal("input_image")
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
union([
  InputText$outboundSchema,
  lazy(() => InputMessageItemContentInputImage$outboundSchema),
  InputFile$outboundSchema,
  InputAudio$outboundSchema,
  InputVideo$outboundSchema
]);
const InputMessageItemRoleDeveloper$outboundSchema = _enum(InputMessageItemRoleDeveloper);
const InputMessageItemRoleSystem$outboundSchema = _enum(InputMessageItemRoleSystem);
const InputMessageItemRoleUser$outboundSchema = _enum(InputMessageItemRoleUser);
union([
  InputMessageItemRoleUser$outboundSchema,
  InputMessageItemRoleSystem$outboundSchema,
  InputMessageItemRoleDeveloper$outboundSchema
]);
const InputMessageItemTypeMessage$outboundSchema = _enum(InputMessageItemTypeMessage);
const InputMessageItem$outboundSchema = object({
  content: nullable(array(union([
    InputText$outboundSchema,
    lazy(() => InputMessageItemContentInputImage$outboundSchema),
    InputFile$outboundSchema,
    InputAudio$outboundSchema,
    InputVideo$outboundSchema
  ]))).optional(),
  id: string().optional(),
  role: union([
    InputMessageItemRoleUser$outboundSchema,
    InputMessageItemRoleSystem$outboundSchema,
    InputMessageItemRoleDeveloper$outboundSchema
  ]),
  type: InputMessageItemTypeMessage$outboundSchema.optional()
});
const InputModality = {
  Text: "text",
  Image: "image",
  File: "file",
  Audio: "audio",
  Video: "video"
};
const InputModality$inboundSchema = inboundSchema(InputModality);
const OutputApplyPatchServerToolItemType = {
  OpenrouterApplyPatch: "openrouter:apply_patch"
};
const OutputApplyPatchServerToolItemType$inboundSchema = _enum(OutputApplyPatchServerToolItemType);
const OutputApplyPatchServerToolItemType$outboundSchema = OutputApplyPatchServerToolItemType$inboundSchema;
const OutputApplyPatchServerToolItem$inboundSchema = object({
  filePath: string().optional(),
  id: string().optional(),
  patch: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputApplyPatchServerToolItemType$inboundSchema
});
const OutputApplyPatchServerToolItem$outboundSchema = object({
  filePath: string().optional(),
  id: string().optional(),
  patch: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputApplyPatchServerToolItemType$outboundSchema
});
const OutputBashServerToolItemType = {
  OpenrouterBash: "openrouter:bash"
};
const OutputBashServerToolItemType$inboundSchema = _enum(OutputBashServerToolItemType);
const OutputBashServerToolItemType$outboundSchema = OutputBashServerToolItemType$inboundSchema;
const OutputBashServerToolItem$inboundSchema = object({
  command: string().optional(),
  exitCode: int().optional(),
  id: string().optional(),
  status: ToolCallStatus$inboundSchema,
  stderr: string().optional(),
  stdout: string().optional(),
  type: OutputBashServerToolItemType$inboundSchema
});
const OutputBashServerToolItem$outboundSchema = object({
  command: string().optional(),
  exitCode: int().optional(),
  id: string().optional(),
  status: ToolCallStatus$outboundSchema,
  stderr: string().optional(),
  stdout: string().optional(),
  type: OutputBashServerToolItemType$outboundSchema
});
const OutputBrowserUseServerToolItemType = {
  OpenrouterBrowserUse: "openrouter:browser_use"
};
const OutputBrowserUseServerToolItemType$inboundSchema = _enum(OutputBrowserUseServerToolItemType);
const OutputBrowserUseServerToolItemType$outboundSchema = OutputBrowserUseServerToolItemType$inboundSchema;
const OutputBrowserUseServerToolItem$inboundSchema = object({
  action: string().optional(),
  id: string().optional(),
  screenshotB64: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputBrowserUseServerToolItemType$inboundSchema
});
const OutputBrowserUseServerToolItem$outboundSchema = object({
  action: string().optional(),
  id: string().optional(),
  screenshotB64: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputBrowserUseServerToolItemType$outboundSchema
});
const TypeCodeInterpreterCall = {
  CodeInterpreterCall: "code_interpreter_call"
};
const OutputLogs$inboundSchema = object({
  logs: string(),
  type: literal("logs")
});
const OutputLogs$outboundSchema = object({
  logs: string(),
  type: literal("logs")
});
const OutputImage$inboundSchema = object({
  type: literal("image"),
  url: string()
});
const OutputImage$outboundSchema = object({
  type: literal("image"),
  url: string()
});
discriminatedUnion("type", {
  image: lazy(() => OutputImage$inboundSchema),
  logs: lazy(() => OutputLogs$inboundSchema)
});
union([
  lazy(() => OutputImage$outboundSchema),
  lazy(() => OutputLogs$outboundSchema)
]);
const TypeCodeInterpreterCall$inboundSchema = _enum(TypeCodeInterpreterCall);
const TypeCodeInterpreterCall$outboundSchema = TypeCodeInterpreterCall$inboundSchema;
const OutputCodeInterpreterCallItem$inboundSchema = object({
  code: nullable(string()),
  container_id: string(),
  id: string(),
  outputs: nullable(array(discriminatedUnion("type", {
    image: lazy(() => OutputImage$inboundSchema),
    logs: lazy(() => OutputLogs$inboundSchema)
  }))),
  status: ToolCallStatus$inboundSchema,
  type: TypeCodeInterpreterCall$inboundSchema
}).transform((v) => {
  return remap(v, {
    "container_id": "containerId"
  });
});
const OutputCodeInterpreterCallItem$outboundSchema = object({
  code: nullable(string()),
  containerId: string(),
  id: string(),
  outputs: nullable(array(union([
    lazy(() => OutputImage$outboundSchema),
    lazy(() => OutputLogs$outboundSchema)
  ]))),
  status: ToolCallStatus$outboundSchema,
  type: TypeCodeInterpreterCall$outboundSchema
}).transform((v) => {
  return remap(v, {
    containerId: "container_id"
  });
});
const OutputCodeInterpreterServerToolItemType = {
  OpenrouterCodeInterpreter: "openrouter:code_interpreter"
};
const OutputCodeInterpreterServerToolItemType$inboundSchema = _enum(OutputCodeInterpreterServerToolItemType);
const OutputCodeInterpreterServerToolItemType$outboundSchema = OutputCodeInterpreterServerToolItemType$inboundSchema;
const OutputCodeInterpreterServerToolItem$inboundSchema = object({
  code: string().optional(),
  exitCode: int().optional(),
  id: string().optional(),
  language: string().optional(),
  status: ToolCallStatus$inboundSchema,
  stderr: string().optional(),
  stdout: string().optional(),
  type: OutputCodeInterpreterServerToolItemType$inboundSchema
});
const OutputCodeInterpreterServerToolItem$outboundSchema = object({
  code: string().optional(),
  exitCode: int().optional(),
  id: string().optional(),
  language: string().optional(),
  status: ToolCallStatus$outboundSchema,
  stderr: string().optional(),
  stdout: string().optional(),
  type: OutputCodeInterpreterServerToolItemType$outboundSchema
});
const OutputComputerCallItemStatus = {
  Completed: "completed",
  Incomplete: "incomplete",
  InProgress: "in_progress"
};
const OutputComputerCallItemType = {
  ComputerCall: "computer_call"
};
const PendingSafetyCheck$inboundSchema = object({
  code: string(),
  id: string(),
  message: string()
});
const PendingSafetyCheck$outboundSchema = object({
  code: string(),
  id: string(),
  message: string()
});
const OutputComputerCallItemStatus$inboundSchema = inboundSchema(OutputComputerCallItemStatus);
const OutputComputerCallItemStatus$outboundSchema = outboundSchema();
const OutputComputerCallItemType$inboundSchema = _enum(OutputComputerCallItemType);
const OutputComputerCallItemType$outboundSchema = OutputComputerCallItemType$inboundSchema;
const OutputComputerCallItem$inboundSchema = object({
  action: nullable(any()).optional(),
  call_id: string(),
  id: string().optional(),
  pending_safety_checks: array(lazy(() => PendingSafetyCheck$inboundSchema)),
  status: OutputComputerCallItemStatus$inboundSchema,
  type: OutputComputerCallItemType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "call_id": "callId",
    "pending_safety_checks": "pendingSafetyChecks"
  });
});
const OutputComputerCallItem$outboundSchema = object({
  action: nullable(any()).optional(),
  callId: string(),
  id: string().optional(),
  pendingSafetyChecks: array(lazy(() => PendingSafetyCheck$outboundSchema)),
  status: OutputComputerCallItemStatus$outboundSchema,
  type: OutputComputerCallItemType$outboundSchema
}).transform((v) => {
  return remap(v, {
    callId: "call_id",
    pendingSafetyChecks: "pending_safety_checks"
  });
});
const OutputDatetimeItemType = {
  OpenrouterDatetime: "openrouter:datetime"
};
const OutputDatetimeItemType$inboundSchema = _enum(OutputDatetimeItemType);
const OutputDatetimeItemType$outboundSchema = OutputDatetimeItemType$inboundSchema;
const OutputDatetimeItem$inboundSchema = object({
  datetime: string(),
  id: string().optional(),
  status: ToolCallStatus$inboundSchema,
  timezone: string(),
  type: OutputDatetimeItemType$inboundSchema
});
const OutputDatetimeItem$outboundSchema = object({
  datetime: string(),
  id: string().optional(),
  status: ToolCallStatus$outboundSchema,
  timezone: string(),
  type: OutputDatetimeItemType$outboundSchema
});
const WebSearchStatus = {
  Completed: "completed",
  Searching: "searching",
  InProgress: "in_progress",
  Failed: "failed"
};
const WebSearchStatus$inboundSchema = inboundSchema(WebSearchStatus);
const WebSearchStatus$outboundSchema = outboundSchema();
const OutputFileSearchCallItemType = {
  FileSearchCall: "file_search_call"
};
const OutputFileSearchCallItemType$inboundSchema = _enum(OutputFileSearchCallItemType);
const OutputFileSearchCallItemType$outboundSchema = OutputFileSearchCallItemType$inboundSchema;
const OutputFileSearchCallItem$inboundSchema = object({
  id: string(),
  queries: array(string()),
  status: WebSearchStatus$inboundSchema,
  type: OutputFileSearchCallItemType$inboundSchema
});
const OutputFileSearchCallItem$outboundSchema = object({
  id: string(),
  queries: array(string()),
  status: WebSearchStatus$outboundSchema,
  type: OutputFileSearchCallItemType$outboundSchema
});
const OutputFileSearchServerToolItemType = {
  OpenrouterFileSearch: "openrouter:file_search"
};
const OutputFileSearchServerToolItemType$inboundSchema = _enum(OutputFileSearchServerToolItemType);
const OutputFileSearchServerToolItemType$outboundSchema = OutputFileSearchServerToolItemType$inboundSchema;
const OutputFileSearchServerToolItem$inboundSchema = object({
  id: string().optional(),
  queries: array(string()).optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputFileSearchServerToolItemType$inboundSchema
});
const OutputFileSearchServerToolItem$outboundSchema = object({
  id: string().optional(),
  queries: array(string()).optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputFileSearchServerToolItemType$outboundSchema
});
const OutputFunctionCallItemStatusInProgress = {
  InProgress: "in_progress"
};
const OutputFunctionCallItemStatusIncomplete = {
  Incomplete: "incomplete"
};
const OutputFunctionCallItemStatusCompleted = {
  Completed: "completed"
};
const OutputFunctionCallItemType = {
  FunctionCall: "function_call"
};
const OutputFunctionCallItemStatusInProgress$inboundSchema = _enum(OutputFunctionCallItemStatusInProgress);
const OutputFunctionCallItemStatusInProgress$outboundSchema = OutputFunctionCallItemStatusInProgress$inboundSchema;
const OutputFunctionCallItemStatusIncomplete$inboundSchema = _enum(OutputFunctionCallItemStatusIncomplete);
const OutputFunctionCallItemStatusIncomplete$outboundSchema = OutputFunctionCallItemStatusIncomplete$inboundSchema;
const OutputFunctionCallItemStatusCompleted$inboundSchema = _enum(OutputFunctionCallItemStatusCompleted);
const OutputFunctionCallItemStatusCompleted$outboundSchema = OutputFunctionCallItemStatusCompleted$inboundSchema;
union([
  OutputFunctionCallItemStatusCompleted$inboundSchema,
  OutputFunctionCallItemStatusIncomplete$inboundSchema,
  OutputFunctionCallItemStatusInProgress$inboundSchema
]);
union([
  OutputFunctionCallItemStatusCompleted$outboundSchema,
  OutputFunctionCallItemStatusIncomplete$outboundSchema,
  OutputFunctionCallItemStatusInProgress$outboundSchema
]);
const OutputFunctionCallItemType$inboundSchema = _enum(OutputFunctionCallItemType);
const OutputFunctionCallItemType$outboundSchema = OutputFunctionCallItemType$inboundSchema;
const OutputFunctionCallItem$inboundSchema = object({
  arguments: string(),
  call_id: string(),
  id: string().optional(),
  name: string(),
  namespace: string().optional(),
  status: union([
    OutputFunctionCallItemStatusCompleted$inboundSchema,
    OutputFunctionCallItemStatusIncomplete$inboundSchema,
    OutputFunctionCallItemStatusInProgress$inboundSchema
  ]).optional(),
  type: OutputFunctionCallItemType$inboundSchema
}).transform((v) => {
  return remap(v, {
    "call_id": "callId"
  });
});
const OutputFunctionCallItem$outboundSchema = object({
  arguments: string(),
  callId: string(),
  id: string().optional(),
  name: string(),
  namespace: string().optional(),
  status: union([
    OutputFunctionCallItemStatusCompleted$outboundSchema,
    OutputFunctionCallItemStatusIncomplete$outboundSchema,
    OutputFunctionCallItemStatusInProgress$outboundSchema
  ]).optional(),
  type: OutputFunctionCallItemType$outboundSchema
}).transform((v) => {
  return remap(v, {
    callId: "call_id"
  });
});
const OutputImageGenerationCallItemType = {
  ImageGenerationCall: "image_generation_call"
};
const OutputImageGenerationCallItemType$inboundSchema = _enum(OutputImageGenerationCallItemType);
const OutputImageGenerationCallItemType$outboundSchema = OutputImageGenerationCallItemType$inboundSchema;
const OutputImageGenerationCallItem$inboundSchema = object({
  id: string(),
  result: nullable(string()).default(null),
  status: ImageGenerationStatus$inboundSchema,
  type: OutputImageGenerationCallItemType$inboundSchema
});
const OutputImageGenerationCallItem$outboundSchema = object({
  id: string(),
  result: nullable(string()).default(null),
  status: ImageGenerationStatus$outboundSchema,
  type: OutputImageGenerationCallItemType$outboundSchema
});
const OutputImageGenerationServerToolItemType = {
  OpenrouterImageGeneration: "openrouter:image_generation"
};
const OutputImageGenerationServerToolItemType$inboundSchema = _enum(OutputImageGenerationServerToolItemType);
const OutputImageGenerationServerToolItemType$outboundSchema = OutputImageGenerationServerToolItemType$inboundSchema;
const OutputImageGenerationServerToolItem$inboundSchema = object({
  id: string().optional(),
  imageB64: string().optional(),
  imageUrl: string().optional(),
  result: nullable(string()).optional(),
  revisedPrompt: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputImageGenerationServerToolItemType$inboundSchema
});
const OutputImageGenerationServerToolItem$outboundSchema = object({
  id: string().optional(),
  imageB64: string().optional(),
  imageUrl: string().optional(),
  result: nullable(string()).optional(),
  revisedPrompt: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputImageGenerationServerToolItemType$outboundSchema
});
const OutputMcpServerToolItemType = {
  OpenrouterMcp: "openrouter:mcp"
};
const OutputMcpServerToolItemType$inboundSchema = _enum(OutputMcpServerToolItemType);
const OutputMcpServerToolItemType$outboundSchema = OutputMcpServerToolItemType$inboundSchema;
const OutputMcpServerToolItem$inboundSchema = object({
  id: string().optional(),
  serverLabel: string().optional(),
  status: ToolCallStatus$inboundSchema,
  toolName: string().optional(),
  type: OutputMcpServerToolItemType$inboundSchema
});
const OutputMcpServerToolItem$outboundSchema = object({
  id: string().optional(),
  serverLabel: string().optional(),
  status: ToolCallStatus$outboundSchema,
  toolName: string().optional(),
  type: OutputMcpServerToolItemType$outboundSchema
});
const ActionEnum = {
  Read: "read",
  Write: "write",
  Delete: "delete"
};
const OutputMemoryServerToolItemType = {
  OpenrouterMemory: "openrouter:memory"
};
const ActionEnum$inboundSchema = inboundSchema(ActionEnum);
const ActionEnum$outboundSchema = outboundSchema();
const OutputMemoryServerToolItemType$inboundSchema = _enum(OutputMemoryServerToolItemType);
const OutputMemoryServerToolItemType$outboundSchema = OutputMemoryServerToolItemType$inboundSchema;
const OutputMemoryServerToolItem$inboundSchema = object({
  action: ActionEnum$inboundSchema.optional(),
  id: string().optional(),
  key: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputMemoryServerToolItemType$inboundSchema,
  value: nullable(any()).optional()
});
const OutputMemoryServerToolItem$outboundSchema = object({
  action: ActionEnum$outboundSchema.optional(),
  id: string().optional(),
  key: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputMemoryServerToolItemType$outboundSchema,
  value: nullable(any()).optional()
});
const OutputSearchModelsServerToolItemType = {
  OpenrouterExperimentalSearchModels: "openrouter:experimental__search_models"
};
const OutputSearchModelsServerToolItemType$inboundSchema = _enum(OutputSearchModelsServerToolItemType);
const OutputSearchModelsServerToolItemType$outboundSchema = OutputSearchModelsServerToolItemType$inboundSchema;
const OutputSearchModelsServerToolItem$inboundSchema = object({
  arguments: string().optional(),
  id: string().optional(),
  query: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputSearchModelsServerToolItemType$inboundSchema
});
const OutputSearchModelsServerToolItem$outboundSchema = object({
  arguments: string().optional(),
  id: string().optional(),
  query: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputSearchModelsServerToolItemType$outboundSchema
});
const Command = {
  View: "view",
  Create: "create",
  StrReplace: "str_replace",
  Insert: "insert"
};
const OutputTextEditorServerToolItemType = {
  OpenrouterTextEditor: "openrouter:text_editor"
};
const Command$inboundSchema = inboundSchema(Command);
const Command$outboundSchema = outboundSchema();
const OutputTextEditorServerToolItemType$inboundSchema = _enum(OutputTextEditorServerToolItemType);
const OutputTextEditorServerToolItemType$outboundSchema = OutputTextEditorServerToolItemType$inboundSchema;
const OutputTextEditorServerToolItem$inboundSchema = object({
  command: Command$inboundSchema.optional(),
  filePath: string().optional(),
  id: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputTextEditorServerToolItemType$inboundSchema
});
const OutputTextEditorServerToolItem$outboundSchema = object({
  command: Command$outboundSchema.optional(),
  filePath: string().optional(),
  id: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputTextEditorServerToolItemType$outboundSchema
});
const OutputToolSearchServerToolItemType = {
  OpenrouterToolSearch: "openrouter:tool_search"
};
const OutputToolSearchServerToolItemType$inboundSchema = _enum(OutputToolSearchServerToolItemType);
const OutputToolSearchServerToolItemType$outboundSchema = OutputToolSearchServerToolItemType$inboundSchema;
const OutputToolSearchServerToolItem$inboundSchema = object({
  id: string().optional(),
  query: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputToolSearchServerToolItemType$inboundSchema
});
const OutputToolSearchServerToolItem$outboundSchema = object({
  id: string().optional(),
  query: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputToolSearchServerToolItemType$outboundSchema
});
const OutputWebFetchServerToolItemType = {
  OpenrouterWebFetch: "openrouter:web_fetch"
};
const OutputWebFetchServerToolItemType$inboundSchema = _enum(OutputWebFetchServerToolItemType);
const OutputWebFetchServerToolItemType$outboundSchema = OutputWebFetchServerToolItemType$inboundSchema;
const OutputWebFetchServerToolItem$inboundSchema = object({
  content: string().optional(),
  error: string().optional(),
  httpStatus: int().optional(),
  id: string().optional(),
  status: ToolCallStatus$inboundSchema,
  title: string().optional(),
  type: OutputWebFetchServerToolItemType$inboundSchema,
  url: string().optional()
});
const OutputWebFetchServerToolItem$outboundSchema = object({
  content: string().optional(),
  error: string().optional(),
  httpStatus: int().optional(),
  id: string().optional(),
  status: ToolCallStatus$outboundSchema,
  title: string().optional(),
  type: OutputWebFetchServerToolItemType$outboundSchema,
  url: string().optional()
});
const WebSearchSourceType = {
  Url: "url"
};
const WebSearchSourceType$inboundSchema = _enum(WebSearchSourceType);
const WebSearchSourceType$outboundSchema = WebSearchSourceType$inboundSchema;
const WebSearchSource$inboundSchema = object({
  type: WebSearchSourceType$inboundSchema,
  url: string()
});
const WebSearchSource$outboundSchema = object({
  type: WebSearchSourceType$outboundSchema,
  url: string()
});
const TypeWebSearchCall = {
  WebSearchCall: "web_search_call"
};
const ActionFindInPage$inboundSchema = object({
  pattern: string(),
  type: literal("find_in_page"),
  url: string()
});
const ActionFindInPage$outboundSchema = object({
  pattern: string(),
  type: literal("find_in_page"),
  url: string()
});
const ActionOpenPage$inboundSchema = object({
  type: literal("open_page"),
  url: nullable(string()).optional()
});
const ActionOpenPage$outboundSchema = object({
  type: literal("open_page"),
  url: nullable(string()).optional()
});
const OutputWebSearchCallItemActionSearch$inboundSchema = object({
  queries: array(string()).optional(),
  query: string(),
  sources: array(WebSearchSource$inboundSchema).optional(),
  type: literal("search")
});
const OutputWebSearchCallItemActionSearch$outboundSchema = object({
  queries: array(string()).optional(),
  query: string(),
  sources: array(WebSearchSource$outboundSchema).optional(),
  type: literal("search")
});
discriminatedUnion("type", {
  search: lazy(() => OutputWebSearchCallItemActionSearch$inboundSchema),
  open_page: lazy(() => ActionOpenPage$inboundSchema),
  find_in_page: lazy(() => ActionFindInPage$inboundSchema)
});
union([
  lazy(() => OutputWebSearchCallItemActionSearch$outboundSchema),
  lazy(() => ActionOpenPage$outboundSchema),
  lazy(() => ActionFindInPage$outboundSchema)
]);
const TypeWebSearchCall$inboundSchema = _enum(TypeWebSearchCall);
const TypeWebSearchCall$outboundSchema = TypeWebSearchCall$inboundSchema;
const OutputWebSearchCallItem$inboundSchema = object({
  action: discriminatedUnion("type", {
    search: lazy(() => OutputWebSearchCallItemActionSearch$inboundSchema),
    open_page: lazy(() => ActionOpenPage$inboundSchema),
    find_in_page: lazy(() => ActionFindInPage$inboundSchema)
  }),
  id: string(),
  status: WebSearchStatus$inboundSchema,
  type: TypeWebSearchCall$inboundSchema
});
const OutputWebSearchCallItem$outboundSchema = object({
  action: union([
    lazy(() => OutputWebSearchCallItemActionSearch$outboundSchema),
    lazy(() => ActionOpenPage$outboundSchema),
    lazy(() => ActionFindInPage$outboundSchema)
  ]),
  id: string(),
  status: WebSearchStatus$outboundSchema,
  type: TypeWebSearchCall$outboundSchema
});
const OutputWebSearchServerToolItemTypeURL = {
  Url: "url"
};
const OutputWebSearchServerToolItemTypeSearch = {
  Search: "search"
};
const OutputWebSearchServerToolItemTypeOpenrouterWebSearch = {
  OpenrouterWebSearch: "openrouter:web_search"
};
const OutputWebSearchServerToolItemTypeURL$inboundSchema = _enum(OutputWebSearchServerToolItemTypeURL);
const OutputWebSearchServerToolItemTypeURL$outboundSchema = OutputWebSearchServerToolItemTypeURL$inboundSchema;
const Source$inboundSchema = object({
  type: OutputWebSearchServerToolItemTypeURL$inboundSchema,
  url: string()
});
const Source$outboundSchema = object({
  type: OutputWebSearchServerToolItemTypeURL$outboundSchema,
  url: string()
});
const OutputWebSearchServerToolItemTypeSearch$inboundSchema = _enum(OutputWebSearchServerToolItemTypeSearch);
const OutputWebSearchServerToolItemTypeSearch$outboundSchema = OutputWebSearchServerToolItemTypeSearch$inboundSchema;
const OutputWebSearchServerToolItemAction$inboundSchema = object({
  query: string(),
  sources: array(lazy(() => Source$inboundSchema)).optional(),
  type: OutputWebSearchServerToolItemTypeSearch$inboundSchema
});
const OutputWebSearchServerToolItemAction$outboundSchema = object({
  query: string(),
  sources: array(lazy(() => Source$outboundSchema)).optional(),
  type: OutputWebSearchServerToolItemTypeSearch$outboundSchema
});
const OutputWebSearchServerToolItemTypeOpenrouterWebSearch$inboundSchema = _enum(OutputWebSearchServerToolItemTypeOpenrouterWebSearch);
const OutputWebSearchServerToolItemTypeOpenrouterWebSearch$outboundSchema = OutputWebSearchServerToolItemTypeOpenrouterWebSearch$inboundSchema;
const OutputWebSearchServerToolItem$inboundSchema = object({
  action: lazy(() => OutputWebSearchServerToolItemAction$inboundSchema).optional(),
  id: string().optional(),
  status: ToolCallStatus$inboundSchema,
  type: OutputWebSearchServerToolItemTypeOpenrouterWebSearch$inboundSchema
});
const OutputWebSearchServerToolItem$outboundSchema = object({
  action: lazy(() => OutputWebSearchServerToolItemAction$outboundSchema).optional(),
  id: string().optional(),
  status: ToolCallStatus$outboundSchema,
  type: OutputWebSearchServerToolItemTypeOpenrouterWebSearch$outboundSchema
});
const ReasoningSummaryTextType = {
  SummaryText: "summary_text"
};
const ReasoningSummaryTextType$inboundSchema = _enum(ReasoningSummaryTextType);
const ReasoningSummaryTextType$outboundSchema = ReasoningSummaryTextType$inboundSchema;
const ReasoningSummaryText$inboundSchema = object({
  text: string(),
  type: ReasoningSummaryTextType$inboundSchema
});
const ReasoningSummaryText$outboundSchema = object({
  text: string(),
  type: ReasoningSummaryTextType$outboundSchema
});
const ReasoningItemStatusInProgress = {
  InProgress: "in_progress"
};
const ReasoningItemStatusIncomplete = {
  Incomplete: "incomplete"
};
const ReasoningItemStatusCompleted = {
  Completed: "completed"
};
const ReasoningItemType = {
  Reasoning: "reasoning"
};
const ReasoningItemStatusInProgress$outboundSchema = _enum(ReasoningItemStatusInProgress);
const ReasoningItemStatusIncomplete$outboundSchema = _enum(ReasoningItemStatusIncomplete);
const ReasoningItemStatusCompleted$outboundSchema = _enum(ReasoningItemStatusCompleted);
union([
  ReasoningItemStatusCompleted$outboundSchema,
  ReasoningItemStatusIncomplete$outboundSchema,
  ReasoningItemStatusInProgress$outboundSchema
]);
const ReasoningItemType$outboundSchema = _enum(ReasoningItemType);
const ReasoningItem$outboundSchema = object({
  content: nullable(array(ReasoningTextContent$outboundSchema)).optional(),
  encryptedContent: nullable(string()).optional(),
  id: string(),
  status: union([
    ReasoningItemStatusCompleted$outboundSchema,
    ReasoningItemStatusIncomplete$outboundSchema,
    ReasoningItemStatusInProgress$outboundSchema
  ]).optional(),
  summary: array(ReasoningSummaryText$outboundSchema),
  type: ReasoningItemType$outboundSchema,
  format: nullable(ReasoningFormat$outboundSchema).optional(),
  signature: nullable(string()).optional()
}).transform((v) => {
  return remap(v, {
    encryptedContent: "encrypted_content"
  });
});
const InputsStatusInProgress2 = {
  InProgress: "in_progress"
};
const InputsStatusIncomplete2 = {
  Incomplete: "incomplete"
};
const InputsStatusCompleted2 = {
  Completed: "completed"
};
const InputsTypeReasoning = {
  Reasoning: "reasoning"
};
const InputsPhaseFinalAnswer = {
  FinalAnswer: "final_answer"
};
const InputsPhaseCommentary = {
  Commentary: "commentary"
};
const InputsRole = {
  Assistant: "assistant"
};
const InputsStatusInProgress1 = {
  InProgress: "in_progress"
};
const InputsStatusIncomplete1 = {
  Incomplete: "incomplete"
};
const InputsStatusCompleted1 = {
  Completed: "completed"
};
const InputsTypeMessage = {
  Message: "message"
};
const InputsStatusInProgress2$outboundSchema = _enum(InputsStatusInProgress2);
const InputsStatusIncomplete2$outboundSchema = _enum(InputsStatusIncomplete2);
const InputsStatusCompleted2$outboundSchema = _enum(InputsStatusCompleted2);
union([
  InputsStatusCompleted2$outboundSchema,
  InputsStatusIncomplete2$outboundSchema,
  InputsStatusInProgress2$outboundSchema
]);
const InputsTypeReasoning$outboundSchema = _enum(InputsTypeReasoning);
const InputsReasoning$outboundSchema = object({
  content: nullable(array(ReasoningTextContent$outboundSchema)).optional(),
  encryptedContent: nullable(string()).optional(),
  id: string(),
  status: union([
    InputsStatusCompleted2$outboundSchema,
    InputsStatusIncomplete2$outboundSchema,
    InputsStatusInProgress2$outboundSchema
  ]).optional(),
  summary: nullable(array(ReasoningSummaryText$outboundSchema)),
  type: InputsTypeReasoning$outboundSchema,
  format: nullable(ReasoningFormat$outboundSchema).optional(),
  signature: nullable(string()).optional()
}).transform((v) => {
  return remap(v, {
    encryptedContent: "encrypted_content"
  });
});
union([
  ResponseOutputText$outboundSchema,
  OpenAIResponsesRefusalContent$outboundSchema
]);
union([
  array(union([
    ResponseOutputText$outboundSchema,
    OpenAIResponsesRefusalContent$outboundSchema
  ])),
  string(),
  any()
]);
const InputsPhaseFinalAnswer$outboundSchema = _enum(InputsPhaseFinalAnswer);
const InputsPhaseCommentary$outboundSchema = _enum(InputsPhaseCommentary);
union([
  InputsPhaseCommentary$outboundSchema,
  InputsPhaseFinalAnswer$outboundSchema,
  any()
]);
const InputsRole$outboundSchema = _enum(InputsRole);
const InputsStatusInProgress1$outboundSchema = _enum(InputsStatusInProgress1);
const InputsStatusIncomplete1$outboundSchema = _enum(InputsStatusIncomplete1);
const InputsStatusCompleted1$outboundSchema = _enum(InputsStatusCompleted1);
union([
  InputsStatusCompleted1$outboundSchema,
  InputsStatusIncomplete1$outboundSchema,
  InputsStatusInProgress1$outboundSchema
]);
const InputsTypeMessage$outboundSchema = _enum(InputsTypeMessage);
const InputsMessage$outboundSchema = object({
  content: nullable(union([
    array(union([
      ResponseOutputText$outboundSchema,
      OpenAIResponsesRefusalContent$outboundSchema
    ])),
    string(),
    any()
  ])),
  id: string(),
  phase: nullable(union([
    InputsPhaseCommentary$outboundSchema,
    InputsPhaseFinalAnswer$outboundSchema,
    any()
  ])).optional(),
  role: InputsRole$outboundSchema,
  status: union([
    InputsStatusCompleted1$outboundSchema,
    InputsStatusIncomplete1$outboundSchema,
    InputsStatusInProgress1$outboundSchema
  ]).optional(),
  type: InputsTypeMessage$outboundSchema
});
union([
  OutputCodeInterpreterCallItem$outboundSchema,
  FunctionCallItem$outboundSchema,
  lazy(() => InputsMessage$outboundSchema),
  OutputFunctionCallItem$outboundSchema,
  OutputWebSearchCallItem$outboundSchema,
  OutputFileSearchCallItem$outboundSchema,
  OutputComputerCallItem$outboundSchema,
  OutputDatetimeItem$outboundSchema,
  ReasoningItem$outboundSchema,
  FunctionCallOutputItem$outboundSchema,
  lazy(() => InputsReasoning$outboundSchema),
  OutputImageGenerationCallItem$outboundSchema,
  OutputWebSearchServerToolItem$outboundSchema,
  OutputCodeInterpreterServerToolItem$outboundSchema,
  OutputFileSearchServerToolItem$outboundSchema,
  OutputImageGenerationServerToolItem$outboundSchema,
  OutputBrowserUseServerToolItem$outboundSchema,
  OutputBashServerToolItem$outboundSchema,
  OutputTextEditorServerToolItem$outboundSchema,
  OutputApplyPatchServerToolItem$outboundSchema,
  OutputWebFetchServerToolItem$outboundSchema,
  OutputToolSearchServerToolItem$outboundSchema,
  OutputMemoryServerToolItem$outboundSchema,
  OutputMcpServerToolItem$outboundSchema,
  OutputSearchModelsServerToolItem$outboundSchema,
  EasyInputMessage$outboundSchema,
  InputMessageItem$outboundSchema
]);
const InputsUnion$outboundSchema = union([
  string(),
  array(union([
    OutputCodeInterpreterCallItem$outboundSchema,
    FunctionCallItem$outboundSchema,
    lazy(() => InputsMessage$outboundSchema),
    OutputFunctionCallItem$outboundSchema,
    OutputWebSearchCallItem$outboundSchema,
    OutputFileSearchCallItem$outboundSchema,
    OutputComputerCallItem$outboundSchema,
    OutputDatetimeItem$outboundSchema,
    ReasoningItem$outboundSchema,
    FunctionCallOutputItem$outboundSchema,
    lazy(() => InputsReasoning$outboundSchema),
    OutputImageGenerationCallItem$outboundSchema,
    OutputWebSearchServerToolItem$outboundSchema,
    OutputCodeInterpreterServerToolItem$outboundSchema,
    OutputFileSearchServerToolItem$outboundSchema,
    OutputImageGenerationServerToolItem$outboundSchema,
    OutputBrowserUseServerToolItem$outboundSchema,
    OutputBashServerToolItem$outboundSchema,
    OutputTextEditorServerToolItem$outboundSchema,
    OutputApplyPatchServerToolItem$outboundSchema,
    OutputWebFetchServerToolItem$outboundSchema,
    OutputToolSearchServerToolItem$outboundSchema,
    OutputMemoryServerToolItem$outboundSchema,
    OutputMcpServerToolItem$outboundSchema,
    OutputSearchModelsServerToolItem$outboundSchema,
    EasyInputMessage$outboundSchema,
    InputMessageItem$outboundSchema
  ]))
]);
const InstructType = {
  None: "none",
  Airoboros: "airoboros",
  Alpaca: "alpaca",
  AlpacaModif: "alpaca-modif",
  Chatml: "chatml",
  Claude: "claude",
  CodeLlama: "code-llama",
  Gemma: "gemma",
  Llama2: "llama2",
  Llama3: "llama3",
  Mistral: "mistral",
  Nemotron: "nemotron",
  Neural: "neural",
  Openchat: "openchat",
  Phi3: "phi3",
  Rwkv: "rwkv",
  Vicuna: "vicuna",
  Zephyr: "zephyr",
  DeepseekR1: "deepseek-r1",
  DeepseekV31: "deepseek-v3.1",
  Qwq: "qwq",
  Qwen3: "qwen3"
};
const InstructType$inboundSchema = inboundSchema(InstructType);
const InternalServerResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const KeyAssignment$inboundSchema = object({
  assigned_by: nullable(string()),
  created_at: string(),
  guardrail_id: string(),
  id: string(),
  key_hash: string(),
  key_label: string(),
  key_name: string()
}).transform((v) => {
  return remap(v, {
    "assigned_by": "assignedBy",
    "created_at": "createdAt",
    "guardrail_id": "guardrailId",
    "key_hash": "keyHash",
    "key_label": "keyLabel",
    "key_name": "keyName"
  });
});
const SearchContextSizeEnum = {
  Low: "low",
  Medium: "medium",
  High: "high"
};
const SearchContextSizeEnum$inboundSchema = inboundSchema(SearchContextSizeEnum);
const SearchContextSizeEnum$outboundSchema = outboundSchema();
const WebSearchDomainFilter$inboundSchema = object({
  allowed_domains: nullable(array(string())).optional(),
  excluded_domains: nullable(array(string())).optional()
}).transform((v) => {
  return remap(v, {
    "allowed_domains": "allowedDomains",
    "excluded_domains": "excludedDomains"
  });
});
const WebSearchDomainFilter$outboundSchema = object({
  allowedDomains: nullable(array(string())).optional(),
  excludedDomains: nullable(array(string())).optional()
}).transform((v) => {
  return remap(v, {
    allowedDomains: "allowed_domains",
    excludedDomains: "excluded_domains"
  });
});
const WebSearchUserLocationType = {
  Approximate: "approximate"
};
const WebSearchUserLocationType$inboundSchema = _enum(WebSearchUserLocationType);
const WebSearchUserLocationType$outboundSchema = WebSearchUserLocationType$inboundSchema;
const WebSearchUserLocation$inboundSchema = object({
  city: nullable(string()).optional(),
  country: nullable(string()).optional(),
  region: nullable(string()).optional(),
  timezone: nullable(string()).optional(),
  type: WebSearchUserLocationType$inboundSchema.optional()
});
const WebSearchUserLocation$outboundSchema = object({
  city: nullable(string()).optional(),
  country: nullable(string()).optional(),
  region: nullable(string()).optional(),
  timezone: nullable(string()).optional(),
  type: WebSearchUserLocationType$outboundSchema.optional()
});
const LegacyWebSearchServerTool$inboundSchema = object({
  engine: WebSearchEngineEnum$inboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$inboundSchema).optional(),
  max_results: int().optional(),
  search_context_size: SearchContextSizeEnum$inboundSchema.optional(),
  type: literal("web_search"),
  user_location: nullable(WebSearchUserLocation$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "max_results": "maxResults",
    "search_context_size": "searchContextSize",
    "user_location": "userLocation"
  });
});
const LegacyWebSearchServerTool$outboundSchema = object({
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$outboundSchema).optional(),
  maxResults: int().optional(),
  searchContextSize: SearchContextSizeEnum$outboundSchema.optional(),
  type: literal("web_search"),
  userLocation: nullable(WebSearchUserLocation$outboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    maxResults: "max_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const OutputModality = {
  Text: "text",
  Image: "image",
  Embeddings: "embeddings",
  Audio: "audio",
  Video: "video",
  Rerank: "rerank",
  Speech: "speech",
  Transcription: "transcription"
};
const OutputModality$inboundSchema = inboundSchema(OutputModality);
const Parameter = {
  Temperature: "temperature",
  TopP: "top_p",
  TopK: "top_k",
  MinP: "min_p",
  TopA: "top_a",
  FrequencyPenalty: "frequency_penalty",
  PresencePenalty: "presence_penalty",
  RepetitionPenalty: "repetition_penalty",
  MaxTokens: "max_tokens",
  MaxCompletionTokens: "max_completion_tokens",
  LogitBias: "logit_bias",
  Logprobs: "logprobs",
  TopLogprobs: "top_logprobs",
  Seed: "seed",
  ResponseFormat: "response_format",
  StructuredOutputs: "structured_outputs",
  Stop: "stop",
  Tools: "tools",
  ToolChoice: "tool_choice",
  ParallelToolCalls: "parallel_tool_calls",
  IncludeReasoning: "include_reasoning",
  Reasoning: "reasoning",
  ReasoningEffort: "reasoning_effort",
  WebSearchOptions: "web_search_options",
  Verbosity: "verbosity"
};
const Parameter$inboundSchema = inboundSchema(Parameter);
const PercentileStats$inboundSchema = object({
  p50: number(),
  p75: number(),
  p90: number(),
  p99: number()
});
const PublicEndpointQuantization = {
  Int4: "int4",
  Int8: "int8",
  Fp4: "fp4",
  Fp6: "fp6",
  Fp8: "fp8",
  Fp16: "fp16",
  Bf16: "bf16",
  Fp32: "fp32",
  Unknown: "unknown"
};
const Pricing$inboundSchema = object({
  audio: string().optional(),
  audio_output: string().optional(),
  completion: string(),
  discount: number().optional(),
  image: string().optional(),
  image_output: string().optional(),
  image_token: string().optional(),
  input_audio_cache: string().optional(),
  input_cache_read: string().optional(),
  input_cache_write: string().optional(),
  internal_reasoning: string().optional(),
  prompt: string(),
  request: string().optional(),
  web_search: string().optional()
}).transform((v) => {
  return remap(v, {
    "audio_output": "audioOutput",
    "image_output": "imageOutput",
    "image_token": "imageToken",
    "input_audio_cache": "inputAudioCache",
    "input_cache_read": "inputCacheRead",
    "input_cache_write": "inputCacheWrite",
    "internal_reasoning": "internalReasoning",
    "web_search": "webSearch"
  });
});
const PublicEndpointQuantization$inboundSchema = inboundSchema(PublicEndpointQuantization);
const PublicEndpoint$inboundSchema = object({
  context_length: int(),
  latency_last_30m: nullable(PercentileStats$inboundSchema),
  max_completion_tokens: nullable(int()),
  max_prompt_tokens: nullable(int()),
  model_id: string(),
  model_name: string(),
  name: string(),
  pricing: lazy(() => Pricing$inboundSchema),
  provider_name: ProviderName$inboundSchema,
  quantization: nullable(PublicEndpointQuantization$inboundSchema),
  status: EndpointStatus$inboundSchema.optional(),
  supported_parameters: array(Parameter$inboundSchema),
  supports_implicit_caching: boolean$1(),
  tag: string(),
  throughput_last_30m: nullable(PercentileStats$inboundSchema),
  uptime_last_1d: nullable(number()),
  uptime_last_30m: nullable(number()),
  uptime_last_5m: nullable(number())
}).transform((v) => {
  return remap(v, {
    "context_length": "contextLength",
    "latency_last_30m": "latencyLast30m",
    "max_completion_tokens": "maxCompletionTokens",
    "max_prompt_tokens": "maxPromptTokens",
    "model_id": "modelId",
    "model_name": "modelName",
    "provider_name": "providerName",
    "supported_parameters": "supportedParameters",
    "supports_implicit_caching": "supportsImplicitCaching",
    "throughput_last_30m": "throughputLast30m",
    "uptime_last_1d": "uptimeLast1d",
    "uptime_last_30m": "uptimeLast30m",
    "uptime_last_5m": "uptimeLast5m"
  });
});
const Tokenizer = {
  Router: "Router",
  Media: "Media",
  Other: "Other",
  Gpt: "GPT",
  Claude: "Claude",
  Gemini: "Gemini",
  Gemma: "Gemma",
  Grok: "Grok",
  Cohere: "Cohere",
  Nova: "Nova",
  Qwen: "Qwen",
  Yi: "Yi",
  DeepSeek: "DeepSeek",
  Mistral: "Mistral",
  Llama2: "Llama2",
  Llama3: "Llama3",
  Llama4: "Llama4",
  PaLM: "PaLM",
  Rwkv: "RWKV",
  Qwen3: "Qwen3"
};
const Tokenizer$inboundSchema = inboundSchema(Tokenizer);
const Architecture$inboundSchema = object({
  input_modalities: array(InputModality$inboundSchema),
  instruct_type: nullable(InstructType$inboundSchema),
  modality: nullable(string()),
  output_modalities: array(OutputModality$inboundSchema),
  tokenizer: nullable(Tokenizer$inboundSchema)
}).transform((v) => {
  return remap(v, {
    "input_modalities": "inputModalities",
    "instruct_type": "instructType",
    "output_modalities": "outputModalities"
  });
});
const ListEndpointsResponse$inboundSchema$1 = object({
  architecture: lazy(() => Architecture$inboundSchema),
  created: int(),
  description: string(),
  endpoints: array(PublicEndpoint$inboundSchema),
  id: string(),
  name: string()
});
const ListGuardrailsResponse$inboundSchema$1 = object({
  data: array(Guardrail$inboundSchema),
  total_count: int()
}).transform((v) => {
  return remap(v, {
    "total_count": "totalCount"
  });
});
const ListKeyAssignmentsResponse$inboundSchema$1 = object({
  data: array(KeyAssignment$inboundSchema),
  total_count: int()
}).transform((v) => {
  return remap(v, {
    "total_count": "totalCount"
  });
});
const MemberAssignment$inboundSchema = object({
  assigned_by: nullable(string()),
  created_at: string(),
  guardrail_id: string(),
  id: string(),
  organization_id: string(),
  user_id: string()
}).transform((v) => {
  return remap(v, {
    "assigned_by": "assignedBy",
    "created_at": "createdAt",
    "guardrail_id": "guardrailId",
    "organization_id": "organizationId",
    "user_id": "userId"
  });
});
const ListMemberAssignmentsResponse$inboundSchema$1 = object({
  data: array(MemberAssignment$inboundSchema),
  total_count: int()
}).transform((v) => {
  return remap(v, {
    "total_count": "totalCount"
  });
});
const ListWorkspacesResponse$inboundSchema$1 = object({
  data: array(Workspace$inboundSchema),
  total_count: int()
}).transform((v) => {
  return remap(v, {
    "total_count": "totalCount"
  });
});
const ConnectorId = {
  ConnectorDropbox: "connector_dropbox",
  ConnectorGmail: "connector_gmail",
  ConnectorGooglecalendar: "connector_googlecalendar",
  ConnectorGoogledrive: "connector_googledrive",
  ConnectorMicrosoftteams: "connector_microsoftteams",
  ConnectorOutlookcalendar: "connector_outlookcalendar",
  ConnectorOutlookemail: "connector_outlookemail",
  ConnectorSharepoint: "connector_sharepoint"
};
const RequireApprovalNever = {
  Never: "never"
};
const RequireApprovalAlways = {
  Always: "always"
};
const AllowedTools$inboundSchema = object({
  read_only: boolean$1().optional(),
  tool_names: array(string()).optional()
}).transform((v) => {
  return remap(v, {
    "read_only": "readOnly",
    "tool_names": "toolNames"
  });
});
const AllowedTools$outboundSchema = object({
  readOnly: boolean$1().optional(),
  toolNames: array(string()).optional()
}).transform((v) => {
  return remap(v, {
    readOnly: "read_only",
    toolNames: "tool_names"
  });
});
union([
  array(string()),
  lazy(() => AllowedTools$inboundSchema),
  any()
]);
union([
  array(string()),
  lazy(() => AllowedTools$outboundSchema),
  any()
]);
const ConnectorId$inboundSchema = inboundSchema(ConnectorId);
const ConnectorId$outboundSchema = outboundSchema();
const RequireApprovalNever$inboundSchema = _enum(RequireApprovalNever);
const RequireApprovalNever$outboundSchema = RequireApprovalNever$inboundSchema;
const RequireApprovalAlways$inboundSchema = _enum(RequireApprovalAlways);
const RequireApprovalAlways$outboundSchema = RequireApprovalAlways$inboundSchema;
const Always$inboundSchema = object({
  tool_names: array(string()).optional()
}).transform((v) => {
  return remap(v, {
    "tool_names": "toolNames"
  });
});
const Always$outboundSchema = object({
  toolNames: array(string()).optional()
}).transform((v) => {
  return remap(v, {
    toolNames: "tool_names"
  });
});
const Never$inboundSchema = object({
  tool_names: array(string()).optional()
}).transform((v) => {
  return remap(v, {
    "tool_names": "toolNames"
  });
});
const Never$outboundSchema = object({
  toolNames: array(string()).optional()
}).transform((v) => {
  return remap(v, {
    toolNames: "tool_names"
  });
});
const RequireApproval$inboundSchema = object({
  always: lazy(() => Always$inboundSchema).optional(),
  never: lazy(() => Never$inboundSchema).optional()
});
const RequireApproval$outboundSchema = object({
  always: lazy(() => Always$outboundSchema).optional(),
  never: lazy(() => Never$outboundSchema).optional()
});
union([
  lazy(() => RequireApproval$inboundSchema),
  RequireApprovalAlways$inboundSchema,
  RequireApprovalNever$inboundSchema,
  any()
]);
union([
  lazy(() => RequireApproval$outboundSchema),
  RequireApprovalAlways$outboundSchema,
  RequireApprovalNever$outboundSchema,
  any()
]);
const McpServerTool$inboundSchema = object({
  allowed_tools: nullable(union([
    array(string()),
    lazy(() => AllowedTools$inboundSchema),
    any()
  ])).optional(),
  authorization: string().optional(),
  connector_id: ConnectorId$inboundSchema.optional(),
  headers: nullable(record(string(), string())).optional(),
  require_approval: nullable(union([
    lazy(() => RequireApproval$inboundSchema),
    RequireApprovalAlways$inboundSchema,
    RequireApprovalNever$inboundSchema,
    any()
  ])).optional(),
  server_description: string().optional(),
  server_label: string(),
  server_url: string().optional(),
  type: literal("mcp")
}).transform((v) => {
  return remap(v, {
    "allowed_tools": "allowedTools",
    "connector_id": "connectorId",
    "require_approval": "requireApproval",
    "server_description": "serverDescription",
    "server_label": "serverLabel",
    "server_url": "serverUrl"
  });
});
const McpServerTool$outboundSchema = object({
  allowedTools: nullable(union([
    array(string()),
    lazy(() => AllowedTools$outboundSchema),
    any()
  ])).optional(),
  authorization: string().optional(),
  connectorId: ConnectorId$outboundSchema.optional(),
  headers: nullable(record(string(), string())).optional(),
  requireApproval: nullable(union([
    lazy(() => RequireApproval$outboundSchema),
    RequireApprovalAlways$outboundSchema,
    RequireApprovalNever$outboundSchema,
    any()
  ])).optional(),
  serverDescription: string().optional(),
  serverLabel: string(),
  serverUrl: string().optional(),
  type: literal("mcp")
}).transform((v) => {
  return remap(v, {
    allowedTools: "allowed_tools",
    connectorId: "connector_id",
    requireApproval: "require_approval",
    serverDescription: "server_description",
    serverLabel: "server_label",
    serverUrl: "server_url"
  });
});
const MetadataLevel$outboundSchema = outboundSchema();
const ModelGroup = {
  Router: "Router",
  Media: "Media",
  Other: "Other",
  Gpt: "GPT",
  Claude: "Claude",
  Gemini: "Gemini",
  Gemma: "Gemma",
  Grok: "Grok",
  Cohere: "Cohere",
  Nova: "Nova",
  Qwen: "Qwen",
  Yi: "Yi",
  DeepSeek: "DeepSeek",
  Mistral: "Mistral",
  Llama2: "Llama2",
  Llama3: "Llama3",
  Llama4: "Llama4",
  PaLM: "PaLM",
  Rwkv: "RWKV",
  Qwen3: "Qwen3"
};
const ModelGroup$inboundSchema = inboundSchema(ModelGroup);
const ModelArchitectureInstructType = {
  None: "none",
  Airoboros: "airoboros",
  Alpaca: "alpaca",
  AlpacaModif: "alpaca-modif",
  Chatml: "chatml",
  Claude: "claude",
  CodeLlama: "code-llama",
  Gemma: "gemma",
  Llama2: "llama2",
  Llama3: "llama3",
  Mistral: "mistral",
  Nemotron: "nemotron",
  Neural: "neural",
  Openchat: "openchat",
  Phi3: "phi3",
  Rwkv: "rwkv",
  Vicuna: "vicuna",
  Zephyr: "zephyr",
  DeepseekR1: "deepseek-r1",
  DeepseekV31: "deepseek-v3.1",
  Qwq: "qwq",
  Qwen3: "qwen3"
};
const ModelArchitectureInstructType$inboundSchema = inboundSchema(ModelArchitectureInstructType);
const ModelArchitecture$inboundSchema = object({
  input_modalities: array(InputModality$inboundSchema),
  instruct_type: nullable(ModelArchitectureInstructType$inboundSchema).optional(),
  modality: nullable(string()),
  output_modalities: array(OutputModality$inboundSchema),
  tokenizer: ModelGroup$inboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    "input_modalities": "inputModalities",
    "instruct_type": "instructType",
    "output_modalities": "outputModalities"
  });
});
const ModelLinks$inboundSchema = object({
  details: string()
});
const PerRequestLimits$inboundSchema = object({
  completion_tokens: number(),
  prompt_tokens: number()
}).transform((v) => {
  return remap(v, {
    "completion_tokens": "completionTokens",
    "prompt_tokens": "promptTokens"
  });
});
const PublicPricing$inboundSchema = object({
  audio: string().optional(),
  audio_output: string().optional(),
  completion: string(),
  discount: number().optional(),
  image: string().optional(),
  image_output: string().optional(),
  image_token: string().optional(),
  input_audio_cache: string().optional(),
  input_cache_read: string().optional(),
  input_cache_write: string().optional(),
  internal_reasoning: string().optional(),
  prompt: string(),
  request: string().optional(),
  web_search: string().optional()
}).transform((v) => {
  return remap(v, {
    "audio_output": "audioOutput",
    "image_output": "imageOutput",
    "image_token": "imageToken",
    "input_audio_cache": "inputAudioCache",
    "input_cache_read": "inputCacheRead",
    "input_cache_write": "inputCacheWrite",
    "internal_reasoning": "internalReasoning",
    "web_search": "webSearch"
  });
});
const TopProviderInfo$inboundSchema = object({
  context_length: nullable(int()).optional(),
  is_moderated: boolean$1(),
  max_completion_tokens: nullable(int()).optional()
}).transform((v) => {
  return remap(v, {
    "context_length": "contextLength",
    "is_moderated": "isModerated",
    "max_completion_tokens": "maxCompletionTokens"
  });
});
const Model$inboundSchema = object({
  architecture: ModelArchitecture$inboundSchema,
  canonical_slug: string(),
  context_length: nullable(int()),
  created: int(),
  default_parameters: nullable(DefaultParameters$inboundSchema),
  description: string().optional(),
  expiration_date: nullable(string()).optional(),
  hugging_face_id: nullable(string()).optional(),
  id: string(),
  knowledge_cutoff: nullable(string()).optional(),
  links: ModelLinks$inboundSchema,
  name: string(),
  per_request_limits: nullable(PerRequestLimits$inboundSchema),
  pricing: PublicPricing$inboundSchema,
  supported_parameters: array(Parameter$inboundSchema),
  supported_voices: nullable(array(string())),
  top_provider: TopProviderInfo$inboundSchema
}).transform((v) => {
  return remap(v, {
    "canonical_slug": "canonicalSlug",
    "context_length": "contextLength",
    "default_parameters": "defaultParameters",
    "expiration_date": "expirationDate",
    "hugging_face_id": "huggingFaceId",
    "knowledge_cutoff": "knowledgeCutoff",
    "per_request_limits": "perRequestLimits",
    "supported_parameters": "supportedParameters",
    "supported_voices": "supportedVoices",
    "top_provider": "topProvider"
  });
});
const ModelsCountResponseData$inboundSchema = object({
  count: int()
});
const ModelsCountResponse$inboundSchema = object({
  data: lazy(() => ModelsCountResponseData$inboundSchema)
});
const ModelsListResponse$inboundSchema = object({
  data: array(Model$inboundSchema)
});
const NotFoundResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const OpenAIResponsesResponseStatus = {
  Completed: "completed",
  Incomplete: "incomplete",
  InProgress: "in_progress",
  Failed: "failed",
  Cancelled: "cancelled",
  Queued: "queued"
};
const OpenAIResponsesResponseStatus$inboundSchema = inboundSchema(OpenAIResponsesResponseStatus);
const ModeRequired = {
  Required: "required"
};
const ModeAuto = {
  Auto: "auto"
};
const ToolChoiceAllowedType = {
  AllowedTools: "allowed_tools"
};
const ModeRequired$inboundSchema = _enum(ModeRequired);
const ModeRequired$outboundSchema = ModeRequired$inboundSchema;
const ModeAuto$inboundSchema = _enum(ModeAuto);
const ModeAuto$outboundSchema = ModeAuto$inboundSchema;
union([
  ModeAuto$inboundSchema,
  ModeRequired$inboundSchema
]);
union([
  ModeAuto$outboundSchema,
  ModeRequired$outboundSchema
]);
const ToolChoiceAllowedType$inboundSchema = _enum(ToolChoiceAllowedType);
const ToolChoiceAllowedType$outboundSchema = ToolChoiceAllowedType$inboundSchema;
const ToolChoiceAllowed$inboundSchema = object({
  mode: union([ModeAuto$inboundSchema, ModeRequired$inboundSchema]),
  tools: array(record(string(), nullable(any()))),
  type: ToolChoiceAllowedType$inboundSchema
});
const ToolChoiceAllowed$outboundSchema = object({
  mode: union([ModeAuto$outboundSchema, ModeRequired$outboundSchema]),
  tools: array(record(string(), nullable(any()))),
  type: ToolChoiceAllowedType$outboundSchema
});
const OpenAIResponsesToolChoiceTypeWebSearchPreview = {
  WebSearchPreview: "web_search_preview"
};
const OpenAIResponsesToolChoiceTypeWebSearchPreview20250311 = {
  WebSearchPreview20250311: "web_search_preview_2025_03_11"
};
const OpenAIResponsesToolChoiceTypeFunction = {
  Function: "function"
};
const OpenAIResponsesToolChoiceRequired = {
  Required: "required"
};
const OpenAIResponsesToolChoiceNone = {
  None: "none"
};
const OpenAIResponsesToolChoiceAuto = {
  Auto: "auto"
};
const OpenAIResponsesToolChoiceTypeWebSearchPreview$inboundSchema = _enum(OpenAIResponsesToolChoiceTypeWebSearchPreview);
const OpenAIResponsesToolChoiceTypeWebSearchPreview$outboundSchema = OpenAIResponsesToolChoiceTypeWebSearchPreview$inboundSchema;
const OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$inboundSchema = _enum(OpenAIResponsesToolChoiceTypeWebSearchPreview20250311);
const OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$outboundSchema = OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$inboundSchema;
union([
  OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$inboundSchema,
  OpenAIResponsesToolChoiceTypeWebSearchPreview$inboundSchema
]);
union([
  OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$outboundSchema,
  OpenAIResponsesToolChoiceTypeWebSearchPreview$outboundSchema
]);
const OpenAIResponsesToolChoice$inboundSchema = object({
  type: union([
    OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$inboundSchema,
    OpenAIResponsesToolChoiceTypeWebSearchPreview$inboundSchema
  ])
});
const OpenAIResponsesToolChoice$outboundSchema = object({
  type: union([
    OpenAIResponsesToolChoiceTypeWebSearchPreview20250311$outboundSchema,
    OpenAIResponsesToolChoiceTypeWebSearchPreview$outboundSchema
  ])
});
const OpenAIResponsesToolChoiceTypeFunction$inboundSchema = _enum(OpenAIResponsesToolChoiceTypeFunction);
const OpenAIResponsesToolChoiceTypeFunction$outboundSchema = OpenAIResponsesToolChoiceTypeFunction$inboundSchema;
const OpenAIResponsesToolChoiceFunction$inboundSchema = object({
  name: string(),
  type: OpenAIResponsesToolChoiceTypeFunction$inboundSchema
});
const OpenAIResponsesToolChoiceFunction$outboundSchema = object({
  name: string(),
  type: OpenAIResponsesToolChoiceTypeFunction$outboundSchema
});
const OpenAIResponsesToolChoiceRequired$inboundSchema = _enum(OpenAIResponsesToolChoiceRequired);
const OpenAIResponsesToolChoiceRequired$outboundSchema = OpenAIResponsesToolChoiceRequired$inboundSchema;
const OpenAIResponsesToolChoiceNone$inboundSchema = _enum(OpenAIResponsesToolChoiceNone);
const OpenAIResponsesToolChoiceNone$outboundSchema = OpenAIResponsesToolChoiceNone$inboundSchema;
const OpenAIResponsesToolChoiceAuto$inboundSchema = _enum(OpenAIResponsesToolChoiceAuto);
const OpenAIResponsesToolChoiceAuto$outboundSchema = OpenAIResponsesToolChoiceAuto$inboundSchema;
const OpenAIResponsesToolChoiceUnion$inboundSchema = union([
  ToolChoiceAllowed$inboundSchema,
  lazy(() => OpenAIResponsesToolChoiceFunction$inboundSchema),
  lazy(() => OpenAIResponsesToolChoice$inboundSchema),
  OpenAIResponsesToolChoiceAuto$inboundSchema,
  OpenAIResponsesToolChoiceNone$inboundSchema,
  OpenAIResponsesToolChoiceRequired$inboundSchema
]);
const OpenAIResponsesToolChoiceUnion$outboundSchema = union([
  ToolChoiceAllowed$outboundSchema,
  lazy(() => OpenAIResponsesToolChoiceFunction$outboundSchema),
  lazy(() => OpenAIResponsesToolChoice$outboundSchema),
  OpenAIResponsesToolChoiceAuto$outboundSchema,
  OpenAIResponsesToolChoiceNone$outboundSchema,
  OpenAIResponsesToolChoiceRequired$outboundSchema
]);
const OpenAIResponsesTruncation$outboundSchema = outboundSchema();
const OutputMessageItemPhaseFinalAnswer = {
  FinalAnswer: "final_answer"
};
const OutputMessageItemPhaseCommentary = {
  Commentary: "commentary"
};
const OutputMessageItemRole = {
  Assistant: "assistant"
};
const OutputMessageItemStatusInProgress = {
  InProgress: "in_progress"
};
const OutputMessageItemStatusIncomplete = {
  Incomplete: "incomplete"
};
const OutputMessageItemStatusCompleted = {
  Completed: "completed"
};
discriminatedUnion("type", {
  output_text: ResponseOutputText$inboundSchema,
  refusal: OpenAIResponsesRefusalContent$inboundSchema
});
const OutputMessageItemPhaseFinalAnswer$inboundSchema = _enum(OutputMessageItemPhaseFinalAnswer);
const OutputMessageItemPhaseCommentary$inboundSchema = _enum(OutputMessageItemPhaseCommentary);
union([
  OutputMessageItemPhaseCommentary$inboundSchema,
  OutputMessageItemPhaseFinalAnswer$inboundSchema,
  any()
]);
const OutputMessageItemRole$inboundSchema = _enum(OutputMessageItemRole);
const OutputMessageItemStatusInProgress$inboundSchema = _enum(OutputMessageItemStatusInProgress);
const OutputMessageItemStatusIncomplete$inboundSchema = _enum(OutputMessageItemStatusIncomplete);
const OutputMessageItemStatusCompleted$inboundSchema = _enum(OutputMessageItemStatusCompleted);
union([
  OutputMessageItemStatusCompleted$inboundSchema,
  OutputMessageItemStatusIncomplete$inboundSchema,
  OutputMessageItemStatusInProgress$inboundSchema
]);
const OutputMessageItem$inboundSchema = object({
  content: array(discriminatedUnion("type", {
    output_text: ResponseOutputText$inboundSchema,
    refusal: OpenAIResponsesRefusalContent$inboundSchema
  })),
  id: string(),
  phase: nullable(union([
    OutputMessageItemPhaseCommentary$inboundSchema,
    OutputMessageItemPhaseFinalAnswer$inboundSchema,
    any()
  ])).optional(),
  role: OutputMessageItemRole$inboundSchema,
  status: union([
    OutputMessageItemStatusCompleted$inboundSchema,
    OutputMessageItemStatusIncomplete$inboundSchema,
    OutputMessageItemStatusInProgress$inboundSchema
  ]).optional(),
  type: literal("message")
});
const OutputReasoningItemStatusInProgress = {
  InProgress: "in_progress"
};
const OutputReasoningItemStatusIncomplete = {
  Incomplete: "incomplete"
};
const OutputReasoningItemStatusCompleted = {
  Completed: "completed"
};
const OutputReasoningItemStatusInProgress$inboundSchema = _enum(OutputReasoningItemStatusInProgress);
const OutputReasoningItemStatusIncomplete$inboundSchema = _enum(OutputReasoningItemStatusIncomplete);
const OutputReasoningItemStatusCompleted$inboundSchema = _enum(OutputReasoningItemStatusCompleted);
union([
  OutputReasoningItemStatusCompleted$inboundSchema,
  OutputReasoningItemStatusIncomplete$inboundSchema,
  OutputReasoningItemStatusInProgress$inboundSchema
]);
const OutputReasoningItem$inboundSchema = object({
  content: nullable(array(ReasoningTextContent$inboundSchema)).optional(),
  encrypted_content: nullable(string()).optional(),
  id: string(),
  status: union([
    OutputReasoningItemStatusCompleted$inboundSchema,
    OutputReasoningItemStatusIncomplete$inboundSchema,
    OutputReasoningItemStatusInProgress$inboundSchema
  ]).optional(),
  summary: array(ReasoningSummaryText$inboundSchema),
  type: literal("reasoning"),
  format: nullable(ReasoningFormat$inboundSchema).optional(),
  signature: nullable(string()).optional()
}).transform((v) => {
  return remap(v, {
    "encrypted_content": "encryptedContent"
  });
});
const OutputItems$inboundSchema = discriminatedUnion("type", {
  code_interpreter_call: OutputCodeInterpreterCallItem$inboundSchema.and(object({ type: literal("code_interpreter_call") })),
  computer_call: OutputComputerCallItem$inboundSchema.and(object({ type: literal("computer_call") })),
  file_search_call: OutputFileSearchCallItem$inboundSchema.and(object({ type: literal("file_search_call") })),
  function_call: OutputFunctionCallItem$inboundSchema.and(object({ type: literal("function_call") })),
  image_generation_call: OutputImageGenerationCallItem$inboundSchema.and(object({ type: literal("image_generation_call") })),
  message: OutputMessageItem$inboundSchema,
  ["openrouter:apply_patch"]: OutputApplyPatchServerToolItem$inboundSchema.and(object({ type: literal("openrouter:apply_patch") })),
  ["openrouter:bash"]: OutputBashServerToolItem$inboundSchema.and(object({ type: literal("openrouter:bash") })),
  ["openrouter:browser_use"]: OutputBrowserUseServerToolItem$inboundSchema.and(object({ type: literal("openrouter:browser_use") })),
  ["openrouter:code_interpreter"]: OutputCodeInterpreterServerToolItem$inboundSchema.and(object({ type: literal("openrouter:code_interpreter") })),
  ["openrouter:datetime"]: OutputDatetimeItem$inboundSchema.and(object({ type: literal("openrouter:datetime") })),
  ["openrouter:experimental__search_models"]: OutputSearchModelsServerToolItem$inboundSchema.and(object({ type: literal("openrouter:experimental__search_models") })),
  ["openrouter:file_search"]: OutputFileSearchServerToolItem$inboundSchema.and(object({ type: literal("openrouter:file_search") })),
  ["openrouter:image_generation"]: OutputImageGenerationServerToolItem$inboundSchema.and(object({ type: literal("openrouter:image_generation") })),
  ["openrouter:mcp"]: OutputMcpServerToolItem$inboundSchema.and(object({ type: literal("openrouter:mcp") })),
  ["openrouter:memory"]: OutputMemoryServerToolItem$inboundSchema.and(object({ type: literal("openrouter:memory") })),
  ["openrouter:text_editor"]: OutputTextEditorServerToolItem$inboundSchema.and(object({ type: literal("openrouter:text_editor") })),
  ["openrouter:tool_search"]: OutputToolSearchServerToolItem$inboundSchema.and(object({ type: literal("openrouter:tool_search") })),
  ["openrouter:web_fetch"]: OutputWebFetchServerToolItem$inboundSchema.and(object({ type: literal("openrouter:web_fetch") })),
  ["openrouter:web_search"]: OutputWebSearchServerToolItem$inboundSchema.and(object({ type: literal("openrouter:web_search") })),
  reasoning: OutputReasoningItem$inboundSchema,
  web_search_call: OutputWebSearchCallItem$inboundSchema.and(object({ type: literal("web_search_call") }))
});
const PreviewWebSearchUserLocationType = {
  Approximate: "approximate"
};
const PreviewWebSearchUserLocationType$inboundSchema = _enum(PreviewWebSearchUserLocationType);
const PreviewWebSearchUserLocationType$outboundSchema = PreviewWebSearchUserLocationType$inboundSchema;
const PreviewWebSearchUserLocation$inboundSchema = object({
  city: nullable(string()).optional(),
  country: nullable(string()).optional(),
  region: nullable(string()).optional(),
  timezone: nullable(string()).optional(),
  type: PreviewWebSearchUserLocationType$inboundSchema
});
const PreviewWebSearchUserLocation$outboundSchema = object({
  city: nullable(string()).optional(),
  country: nullable(string()).optional(),
  region: nullable(string()).optional(),
  timezone: nullable(string()).optional(),
  type: PreviewWebSearchUserLocationType$outboundSchema
});
const Preview20250311WebSearchServerTool$inboundSchema = object({
  engine: WebSearchEngineEnum$inboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$inboundSchema).optional(),
  max_results: int().optional(),
  search_context_size: SearchContextSizeEnum$inboundSchema.optional(),
  type: literal("web_search_preview_2025_03_11"),
  user_location: nullable(PreviewWebSearchUserLocation$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "max_results": "maxResults",
    "search_context_size": "searchContextSize",
    "user_location": "userLocation"
  });
});
const Preview20250311WebSearchServerTool$outboundSchema = object({
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$outboundSchema).optional(),
  maxResults: int().optional(),
  searchContextSize: SearchContextSizeEnum$outboundSchema.optional(),
  type: literal("web_search_preview_2025_03_11"),
  userLocation: nullable(PreviewWebSearchUserLocation$outboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    maxResults: "max_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const PreviewWebSearchServerTool$inboundSchema = object({
  engine: WebSearchEngineEnum$inboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$inboundSchema).optional(),
  max_results: int().optional(),
  search_context_size: SearchContextSizeEnum$inboundSchema.optional(),
  type: literal("web_search_preview"),
  user_location: nullable(PreviewWebSearchUserLocation$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "max_results": "maxResults",
    "search_context_size": "searchContextSize",
    "user_location": "userLocation"
  });
});
const PreviewWebSearchServerTool$outboundSchema = object({
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$outboundSchema).optional(),
  maxResults: int().optional(),
  searchContextSize: SearchContextSizeEnum$outboundSchema.optional(),
  type: literal("web_search_preview"),
  userLocation: nullable(PreviewWebSearchUserLocation$outboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    maxResults: "max_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const Code = {
  ServerError: "server_error",
  RateLimitExceeded: "rate_limit_exceeded",
  InvalidPrompt: "invalid_prompt",
  VectorStoreTimeout: "vector_store_timeout",
  InvalidImage: "invalid_image",
  InvalidImageFormat: "invalid_image_format",
  InvalidBase64Image: "invalid_base64_image",
  InvalidImageUrl: "invalid_image_url",
  ImageTooLarge: "image_too_large",
  ImageTooSmall: "image_too_small",
  ImageParseError: "image_parse_error",
  ImageContentPolicyViolation: "image_content_policy_violation",
  InvalidImageMode: "invalid_image_mode",
  ImageFileTooLarge: "image_file_too_large",
  UnsupportedImageMediaType: "unsupported_image_media_type",
  EmptyImageFile: "empty_image_file",
  FailedToDownloadImage: "failed_to_download_image",
  ImageFileNotFound: "image_file_not_found"
};
const Code$inboundSchema = inboundSchema(Code);
const ResponsesErrorField$inboundSchema = object({
  code: Code$inboundSchema,
  message: string()
});
const ShellServerTool$inboundSchema = object({
  type: literal("shell")
});
const ShellServerTool$outboundSchema = object({
  type: literal("shell")
});
union([
  InputText$inboundSchema,
  InputImage$inboundSchema,
  InputFile$inboundSchema,
  string()
]);
union([
  InputText$outboundSchema,
  InputImage$outboundSchema,
  InputFile$outboundSchema,
  string()
]);
const StoredPromptTemplate$inboundSchema = object({
  id: string(),
  variables: nullable(record(string(), union([
    InputText$inboundSchema,
    InputImage$inboundSchema,
    InputFile$inboundSchema,
    string()
  ]))).optional()
});
const StoredPromptTemplate$outboundSchema = object({
  id: string(),
  variables: nullable(record(string(), union([
    InputText$outboundSchema,
    InputImage$outboundSchema,
    InputFile$outboundSchema,
    string()
  ]))).optional()
});
const Verbosity = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Xhigh: "xhigh",
  Max: "max"
};
const Verbosity$inboundSchema = inboundSchema(Verbosity);
const Verbosity$outboundSchema = outboundSchema();
const TextExtendedConfig$inboundSchema = object({
  format: Formats$inboundSchema.optional(),
  verbosity: nullable(Verbosity$inboundSchema).optional()
});
const TextExtendedConfig$outboundSchema = object({
  format: Formats$outboundSchema.optional(),
  verbosity: nullable(Verbosity$outboundSchema).optional()
});
const Truncation = {
  Auto: "auto",
  Disabled: "disabled"
};
const Truncation$inboundSchema = inboundSchema(Truncation);
const InputTokensDetails$inboundSchema = object({
  cached_tokens: int()
}).transform((v) => {
  return remap(v, {
    "cached_tokens": "cachedTokens"
  });
});
const OutputTokensDetails$inboundSchema = object({
  reasoning_tokens: int()
}).transform((v) => {
  return remap(v, {
    "reasoning_tokens": "reasoningTokens"
  });
});
const UsageCostDetails$inboundSchema = object({
  upstream_inference_cost: nullable(number()).optional(),
  upstream_inference_input_cost: number(),
  upstream_inference_output_cost: number()
}).transform((v) => {
  return remap(v, {
    "upstream_inference_cost": "upstreamInferenceCost",
    "upstream_inference_input_cost": "upstreamInferenceInputCost",
    "upstream_inference_output_cost": "upstreamInferenceOutputCost"
  });
});
const Usage$inboundSchema = object({
  input_tokens: int(),
  input_tokens_details: lazy(() => InputTokensDetails$inboundSchema),
  output_tokens: int(),
  output_tokens_details: lazy(() => OutputTokensDetails$inboundSchema),
  total_tokens: int(),
  cost: nullable(number()).optional(),
  cost_details: lazy(() => UsageCostDetails$inboundSchema).optional(),
  is_byok: boolean$1().optional()
}).transform((v) => {
  return remap(v, {
    "input_tokens": "inputTokens",
    "input_tokens_details": "inputTokensDetails",
    "output_tokens": "outputTokens",
    "output_tokens_details": "outputTokensDetails",
    "total_tokens": "totalTokens",
    "cost_details": "costDetails",
    "is_byok": "isByok"
  });
});
const WebSearchServerTool$inboundSchema = object({
  engine: WebSearchEngineEnum$inboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$inboundSchema).optional(),
  max_results: int().optional(),
  search_context_size: SearchContextSizeEnum$inboundSchema.optional(),
  type: literal("web_search_2025_08_26"),
  user_location: nullable(WebSearchUserLocation$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "max_results": "maxResults",
    "search_context_size": "searchContextSize",
    "user_location": "userLocation"
  });
});
const WebSearchServerTool$outboundSchema = object({
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  filters: nullable(WebSearchDomainFilter$outboundSchema).optional(),
  maxResults: int().optional(),
  searchContextSize: SearchContextSizeEnum$outboundSchema.optional(),
  type: literal("web_search_2025_08_26"),
  userLocation: nullable(WebSearchUserLocation$outboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    maxResults: "max_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const OpenResponsesResultObject = {
  Response: "response"
};
const OpenResponsesResultObject$inboundSchema = _enum(OpenResponsesResultObject);
const OpenResponsesResultToolFunction$inboundSchema = object({
  description: nullable(string()).optional(),
  name: string(),
  parameters: nullable(record(string(), nullable(any()))),
  strict: nullable(boolean$1()).optional(),
  type: literal("function")
});
discriminatedUnion("type", {
  function: lazy(() => OpenResponsesResultToolFunction$inboundSchema),
  web_search_preview: PreviewWebSearchServerTool$inboundSchema,
  web_search_preview_2025_03_11: Preview20250311WebSearchServerTool$inboundSchema,
  web_search: LegacyWebSearchServerTool$inboundSchema,
  web_search_2025_08_26: WebSearchServerTool$inboundSchema,
  file_search: FileSearchServerTool$inboundSchema,
  computer_use_preview: ComputerUseServerTool$inboundSchema,
  code_interpreter: CodeInterpreterServerTool$inboundSchema,
  mcp: McpServerTool$inboundSchema,
  image_generation: ImageGenerationServerTool$inboundSchema,
  local_shell: CodexLocalShellTool$inboundSchema,
  shell: ShellServerTool$inboundSchema,
  apply_patch: ApplyPatchServerTool$inboundSchema,
  custom: CustomTool$inboundSchema
});
const OpenResponsesResult$inboundSchema = object({
  background: nullable(boolean$1()).optional(),
  completed_at: nullable(int()),
  created_at: int(),
  error: nullable(ResponsesErrorField$inboundSchema),
  frequency_penalty: nullable(number()),
  id: string(),
  incomplete_details: nullable(IncompleteDetails$inboundSchema),
  instructions: nullable(BaseInputsUnion$inboundSchema),
  max_output_tokens: nullable(int()).optional(),
  max_tool_calls: nullable(int()).optional(),
  metadata: nullable(record(string(), string())),
  model: string(),
  object: OpenResponsesResultObject$inboundSchema,
  output: array(OutputItems$inboundSchema),
  output_text: string().optional(),
  parallel_tool_calls: boolean$1(),
  presence_penalty: nullable(number()),
  previous_response_id: nullable(string()).optional(),
  prompt: nullable(StoredPromptTemplate$inboundSchema).optional(),
  prompt_cache_key: nullable(string()).optional(),
  reasoning: nullable(BaseReasoningConfig$inboundSchema).optional(),
  safety_identifier: nullable(string()).optional(),
  service_tier: nullable(string()).optional(),
  status: OpenAIResponsesResponseStatus$inboundSchema,
  store: boolean$1().optional(),
  temperature: nullable(number()),
  text: TextExtendedConfig$inboundSchema.optional(),
  tool_choice: OpenAIResponsesToolChoiceUnion$inboundSchema,
  tools: array(discriminatedUnion("type", {
    function: lazy(() => OpenResponsesResultToolFunction$inboundSchema),
    web_search_preview: PreviewWebSearchServerTool$inboundSchema,
    web_search_preview_2025_03_11: Preview20250311WebSearchServerTool$inboundSchema,
    web_search: LegacyWebSearchServerTool$inboundSchema,
    web_search_2025_08_26: WebSearchServerTool$inboundSchema,
    file_search: FileSearchServerTool$inboundSchema,
    computer_use_preview: ComputerUseServerTool$inboundSchema,
    code_interpreter: CodeInterpreterServerTool$inboundSchema,
    mcp: McpServerTool$inboundSchema,
    image_generation: ImageGenerationServerTool$inboundSchema,
    local_shell: CodexLocalShellTool$inboundSchema,
    shell: ShellServerTool$inboundSchema,
    apply_patch: ApplyPatchServerTool$inboundSchema,
    custom: CustomTool$inboundSchema
  })),
  top_logprobs: nullable(int()).optional(),
  top_p: nullable(number()),
  truncation: nullable(Truncation$inboundSchema).optional(),
  usage: nullable(Usage$inboundSchema).optional(),
  user: nullable(string()).optional(),
  openrouter_metadata: OpenRouterMetadata$inboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    "completed_at": "completedAt",
    "created_at": "createdAt",
    "frequency_penalty": "frequencyPenalty",
    "incomplete_details": "incompleteDetails",
    "max_output_tokens": "maxOutputTokens",
    "max_tool_calls": "maxToolCalls",
    "output_text": "outputText",
    "parallel_tool_calls": "parallelToolCalls",
    "presence_penalty": "presencePenalty",
    "previous_response_id": "previousResponseId",
    "prompt_cache_key": "promptCacheKey",
    "safety_identifier": "safetyIdentifier",
    "service_tier": "serviceTier",
    "tool_choice": "toolChoice",
    "top_logprobs": "topLogprobs",
    "top_p": "topP",
    "openrouter_metadata": "openrouterMetadata"
  });
});
const OpenResponsesCreatedEvent$inboundSchema = object({
  response: OpenResponsesResult$inboundSchema,
  sequence_number: int(),
  type: literal("response.created")
}).transform((v) => {
  return remap(v, {
    "sequence_number": "sequenceNumber"
  });
});
const OpenResponsesInProgressEvent$inboundSchema = object({
  response: OpenResponsesResult$inboundSchema,
  sequence_number: int(),
  type: literal("response.in_progress")
}).transform((v) => {
  return remap(v, {
    "sequence_number": "sequenceNumber"
  });
});
const OutputModalityEnum$outboundSchema = outboundSchema();
const PayloadTooLargeResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const PaymentRequiredResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const ProviderOptions$outboundSchema = object({
  oneai: record(string(), nullable(any())).optional(),
  ai21: record(string(), nullable(any())).optional(),
  aionLabs: record(string(), nullable(any())).optional(),
  akashml: record(string(), nullable(any())).optional(),
  alibaba: record(string(), nullable(any())).optional(),
  amazonBedrock: record(string(), nullable(any())).optional(),
  amazonNova: record(string(), nullable(any())).optional(),
  ambient: record(string(), nullable(any())).optional(),
  anthropic: record(string(), nullable(any())).optional(),
  anyscale: record(string(), nullable(any())).optional(),
  arceeAi: record(string(), nullable(any())).optional(),
  atlasCloud: record(string(), nullable(any())).optional(),
  atoma: record(string(), nullable(any())).optional(),
  avian: record(string(), nullable(any())).optional(),
  azure: record(string(), nullable(any())).optional(),
  baidu: record(string(), nullable(any())).optional(),
  baseten: record(string(), nullable(any())).optional(),
  blackForestLabs: record(string(), nullable(any())).optional(),
  byteplus: record(string(), nullable(any())).optional(),
  centml: record(string(), nullable(any())).optional(),
  cerebras: record(string(), nullable(any())).optional(),
  chutes: record(string(), nullable(any())).optional(),
  cirrascale: record(string(), nullable(any())).optional(),
  clarifai: record(string(), nullable(any())).optional(),
  cloudflare: record(string(), nullable(any())).optional(),
  cohere: record(string(), nullable(any())).optional(),
  crofai: record(string(), nullable(any())).optional(),
  crusoe: record(string(), nullable(any())).optional(),
  deepinfra: record(string(), nullable(any())).optional(),
  deepseek: record(string(), nullable(any())).optional(),
  dekallm: record(string(), nullable(any())).optional(),
  enfer: record(string(), nullable(any())).optional(),
  fakeProvider: record(string(), nullable(any())).optional(),
  featherless: record(string(), nullable(any())).optional(),
  fireworks: record(string(), nullable(any())).optional(),
  friendli: record(string(), nullable(any())).optional(),
  gmicloud: record(string(), nullable(any())).optional(),
  googleAiStudio: record(string(), nullable(any())).optional(),
  googleVertex: record(string(), nullable(any())).optional(),
  gopomelo: record(string(), nullable(any())).optional(),
  groq: record(string(), nullable(any())).optional(),
  huggingface: record(string(), nullable(any())).optional(),
  hyperbolic: record(string(), nullable(any())).optional(),
  hyperbolicQuantized: record(string(), nullable(any())).optional(),
  inception: record(string(), nullable(any())).optional(),
  inceptron: record(string(), nullable(any())).optional(),
  inferenceNet: record(string(), nullable(any())).optional(),
  infermatic: record(string(), nullable(any())).optional(),
  inflection: record(string(), nullable(any())).optional(),
  inocloud: record(string(), nullable(any())).optional(),
  ioNet: record(string(), nullable(any())).optional(),
  ionstream: record(string(), nullable(any())).optional(),
  klusterai: record(string(), nullable(any())).optional(),
  lambda: record(string(), nullable(any())).optional(),
  lepton: record(string(), nullable(any())).optional(),
  liquid: record(string(), nullable(any())).optional(),
  lynn: record(string(), nullable(any())).optional(),
  lynnPrivate: record(string(), nullable(any())).optional(),
  mancer: record(string(), nullable(any())).optional(),
  mancerOld: record(string(), nullable(any())).optional(),
  mara: record(string(), nullable(any())).optional(),
  meta: record(string(), nullable(any())).optional(),
  minimax: record(string(), nullable(any())).optional(),
  mistral: record(string(), nullable(any())).optional(),
  modal: record(string(), nullable(any())).optional(),
  modelrun: record(string(), nullable(any())).optional(),
  modular: record(string(), nullable(any())).optional(),
  moonshotai: record(string(), nullable(any())).optional(),
  morph: record(string(), nullable(any())).optional(),
  ncompass: record(string(), nullable(any())).optional(),
  nebius: record(string(), nullable(any())).optional(),
  nexAgi: record(string(), nullable(any())).optional(),
  nextbit: record(string(), nullable(any())).optional(),
  nineteen: record(string(), nullable(any())).optional(),
  novita: record(string(), nullable(any())).optional(),
  nvidia: record(string(), nullable(any())).optional(),
  octoai: record(string(), nullable(any())).optional(),
  openInference: record(string(), nullable(any())).optional(),
  openai: record(string(), nullable(any())).optional(),
  parasail: record(string(), nullable(any())).optional(),
  perceptron: record(string(), nullable(any())).optional(),
  perplexity: record(string(), nullable(any())).optional(),
  phala: record(string(), nullable(any())).optional(),
  poolside: record(string(), nullable(any())).optional(),
  recraft: record(string(), nullable(any())).optional(),
  recursal: record(string(), nullable(any())).optional(),
  reflection: record(string(), nullable(any())).optional(),
  reka: record(string(), nullable(any())).optional(),
  relace: record(string(), nullable(any())).optional(),
  replicate: record(string(), nullable(any())).optional(),
  sambanova: record(string(), nullable(any())).optional(),
  sambanovaCloaked: record(string(), nullable(any())).optional(),
  seed: record(string(), nullable(any())).optional(),
  sfCompute: record(string(), nullable(any())).optional(),
  siliconflow: record(string(), nullable(any())).optional(),
  sourceful: record(string(), nullable(any())).optional(),
  stealth: record(string(), nullable(any())).optional(),
  stepfun: record(string(), nullable(any())).optional(),
  streamlake: record(string(), nullable(any())).optional(),
  switchpoint: record(string(), nullable(any())).optional(),
  targon: record(string(), nullable(any())).optional(),
  together: record(string(), nullable(any())).optional(),
  togetherLite: record(string(), nullable(any())).optional(),
  ubicloud: record(string(), nullable(any())).optional(),
  upstage: record(string(), nullable(any())).optional(),
  venice: record(string(), nullable(any())).optional(),
  wandb: record(string(), nullable(any())).optional(),
  xai: record(string(), nullable(any())).optional(),
  xiaomi: record(string(), nullable(any())).optional(),
  zAi: record(string(), nullable(any())).optional()
}).transform((v) => {
  return remap(v, {
    oneai: "01ai",
    aionLabs: "aion-labs",
    amazonBedrock: "amazon-bedrock",
    amazonNova: "amazon-nova",
    arceeAi: "arcee-ai",
    atlasCloud: "atlas-cloud",
    blackForestLabs: "black-forest-labs",
    fakeProvider: "fake-provider",
    googleAiStudio: "google-ai-studio",
    googleVertex: "google-vertex",
    hyperbolicQuantized: "hyperbolic-quantized",
    inferenceNet: "inference-net",
    ioNet: "io-net",
    lynnPrivate: "lynn-private",
    mancerOld: "mancer-old",
    nexAgi: "nex-agi",
    openInference: "open-inference",
    sambanovaCloaked: "sambanova-cloaked",
    sfCompute: "sf-compute",
    togetherLite: "together-lite",
    zAi: "z-ai"
  });
});
const ProviderOverloadedResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const ReasoningConfig$outboundSchema = object({
  effort: nullable(ReasoningEffort$outboundSchema).optional(),
  summary: nullable(ReasoningSummaryVerbosity$outboundSchema).optional(),
  enabled: nullable(boolean$1()).optional(),
  maxTokens: nullable(int()).optional()
}).transform((v) => {
  return remap(v, {
    maxTokens: "max_tokens"
  });
});
const ReasoningDeltaEvent$inboundSchema = object({
  content_index: int(),
  delta: string(),
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.reasoning_text.delta")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const ReasoningDoneEvent$inboundSchema = object({
  content_index: int(),
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  text: string(),
  type: literal("response.reasoning_text.done")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const ReasoningSummaryPartAddedEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  part: ReasoningSummaryText$inboundSchema,
  sequence_number: int(),
  summary_index: int(),
  type: literal("response.reasoning_summary_part.added")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber",
    "summary_index": "summaryIndex"
  });
});
const ReasoningSummaryPartDoneEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  part: ReasoningSummaryText$inboundSchema,
  sequence_number: int(),
  summary_index: int(),
  type: literal("response.reasoning_summary_part.done")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber",
    "summary_index": "summaryIndex"
  });
});
const ReasoningSummaryTextDeltaEvent$inboundSchema = object({
  delta: string(),
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  summary_index: int(),
  type: literal("response.reasoning_summary_text.delta")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber",
    "summary_index": "summaryIndex"
  });
});
const ReasoningSummaryTextDoneEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  summary_index: int(),
  text: string(),
  type: literal("response.reasoning_summary_text.done")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber",
    "summary_index": "summaryIndex"
  });
});
const RefusalDeltaEvent$inboundSchema = object({
  content_index: int(),
  delta: string(),
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.refusal.delta")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const RefusalDoneEvent$inboundSchema = object({
  content_index: int(),
  item_id: string(),
  output_index: int(),
  refusal: string(),
  sequence_number: int(),
  type: literal("response.refusal.done")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const RequestTimeoutResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const ResponseIncludesEnum$outboundSchema = outboundSchema();
const WebSearchServerToolConfig$outboundSchema = object({
  allowedDomains: array(string()).optional(),
  engine: WebSearchEngineEnum$outboundSchema.optional(),
  excludedDomains: array(string()).optional(),
  maxResults: int().optional(),
  maxTotalResults: int().optional(),
  searchContextSize: SearchQualityLevel$outboundSchema.optional(),
  userLocation: WebSearchUserLocationServerTool$outboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    allowedDomains: "allowed_domains",
    excludedDomains: "excluded_domains",
    maxResults: "max_results",
    maxTotalResults: "max_total_results",
    searchContextSize: "search_context_size",
    userLocation: "user_location"
  });
});
const WebSearchServerToolOpenRouter$outboundSchema = object({
  parameters: WebSearchServerToolConfig$outboundSchema.optional(),
  type: literal("openrouter:web_search")
});
union([
  AutoRouterPlugin$outboundSchema,
  ContextCompressionPlugin$outboundSchema,
  FileParserPlugin$outboundSchema,
  ModerationPlugin$outboundSchema,
  ParetoRouterPlugin$outboundSchema,
  ResponseHealingPlugin$outboundSchema,
  WebSearchPlugin$outboundSchema
]);
const ResponsesRequestServiceTier$outboundSchema = outboundSchema();
const ResponsesRequestToolFunction$outboundSchema = object({
  description: nullable(string()).optional(),
  name: string(),
  parameters: nullable(record(string(), nullable(any()))),
  strict: nullable(boolean$1()).optional(),
  type: literal("function")
});
union([
  lazy(() => ResponsesRequestToolFunction$outboundSchema),
  PreviewWebSearchServerTool$outboundSchema,
  Preview20250311WebSearchServerTool$outboundSchema,
  LegacyWebSearchServerTool$outboundSchema,
  WebSearchServerTool$outboundSchema,
  FileSearchServerTool$outboundSchema,
  ComputerUseServerTool$outboundSchema,
  CodeInterpreterServerTool$outboundSchema,
  McpServerTool$outboundSchema,
  ImageGenerationServerTool$outboundSchema,
  CodexLocalShellTool$outboundSchema,
  ShellServerTool$outboundSchema,
  ApplyPatchServerTool$outboundSchema,
  CustomTool$outboundSchema,
  DatetimeServerTool$outboundSchema.and(object({ type: literal("openrouter:datetime") })),
  ImageGenerationServerToolOpenRouter$outboundSchema.and(object({ type: literal("openrouter:image_generation") })),
  ChatSearchModelsServerTool$outboundSchema.and(object({ type: literal("openrouter:experimental__search_models") })),
  WebFetchServerTool$outboundSchema.and(object({ type: literal("openrouter:web_fetch") })),
  WebSearchServerToolOpenRouter$outboundSchema
]);
const ResponsesRequest$outboundSchema = object({
  background: nullable(boolean$1()).optional(),
  frequencyPenalty: nullable(number()).optional(),
  imageConfig: record(string(), ImageConfig$outboundSchema).optional(),
  include: nullable(array(ResponseIncludesEnum$outboundSchema)).optional(),
  input: InputsUnion$outboundSchema.optional(),
  instructions: nullable(string()).optional(),
  maxOutputTokens: nullable(int()).optional(),
  maxToolCalls: nullable(int()).optional(),
  metadata: nullable(record(string(), string())).optional(),
  modalities: array(OutputModalityEnum$outboundSchema).optional(),
  model: string().optional(),
  models: array(string()).optional(),
  parallelToolCalls: nullable(boolean$1()).optional(),
  plugins: array(union([
    AutoRouterPlugin$outboundSchema,
    ContextCompressionPlugin$outboundSchema,
    FileParserPlugin$outboundSchema,
    ModerationPlugin$outboundSchema,
    ParetoRouterPlugin$outboundSchema,
    ResponseHealingPlugin$outboundSchema,
    WebSearchPlugin$outboundSchema
  ])).optional(),
  presencePenalty: nullable(number()).optional(),
  previousResponseId: nullable(string()).optional(),
  prompt: nullable(StoredPromptTemplate$outboundSchema).optional(),
  promptCacheKey: nullable(string()).optional(),
  provider: nullable(ProviderPreferences$outboundSchema).optional(),
  reasoning: nullable(ReasoningConfig$outboundSchema).optional(),
  safetyIdentifier: nullable(string()).optional(),
  serviceTier: nullable(ResponsesRequestServiceTier$outboundSchema.default("auto")),
  sessionId: string().optional(),
  store: literal(false).default(false),
  stream: boolean$1().default(false),
  temperature: nullable(number()).optional(),
  text: TextExtendedConfig$outboundSchema.optional(),
  toolChoice: OpenAIResponsesToolChoiceUnion$outboundSchema.optional(),
  tools: array(union([
    lazy(() => ResponsesRequestToolFunction$outboundSchema),
    PreviewWebSearchServerTool$outboundSchema,
    Preview20250311WebSearchServerTool$outboundSchema,
    LegacyWebSearchServerTool$outboundSchema,
    WebSearchServerTool$outboundSchema,
    FileSearchServerTool$outboundSchema,
    ComputerUseServerTool$outboundSchema,
    CodeInterpreterServerTool$outboundSchema,
    McpServerTool$outboundSchema,
    ImageGenerationServerTool$outboundSchema,
    CodexLocalShellTool$outboundSchema,
    ShellServerTool$outboundSchema,
    ApplyPatchServerTool$outboundSchema,
    CustomTool$outboundSchema,
    DatetimeServerTool$outboundSchema.and(object({ type: literal("openrouter:datetime") })),
    ImageGenerationServerToolOpenRouter$outboundSchema.and(object({ type: literal("openrouter:image_generation") })),
    ChatSearchModelsServerTool$outboundSchema.and(object({ type: literal("openrouter:experimental__search_models") })),
    WebFetchServerTool$outboundSchema.and(object({ type: literal("openrouter:web_fetch") })),
    WebSearchServerToolOpenRouter$outboundSchema
  ])).optional(),
  topK: int().optional(),
  topLogprobs: nullable(int()).optional(),
  topP: nullable(number()).optional(),
  trace: TraceConfig$outboundSchema.optional(),
  truncation: nullable(OpenAIResponsesTruncation$outboundSchema).optional(),
  user: string().optional()
}).transform((v) => {
  return remap(v, {
    frequencyPenalty: "frequency_penalty",
    imageConfig: "image_config",
    maxOutputTokens: "max_output_tokens",
    maxToolCalls: "max_tool_calls",
    parallelToolCalls: "parallel_tool_calls",
    presencePenalty: "presence_penalty",
    previousResponseId: "previous_response_id",
    promptCacheKey: "prompt_cache_key",
    safetyIdentifier: "safety_identifier",
    serviceTier: "service_tier",
    sessionId: "session_id",
    toolChoice: "tool_choice",
    topK: "top_k",
    topLogprobs: "top_logprobs",
    topP: "top_p"
  });
});
const StreamEventsResponseCompleted$inboundSchema = object({
  response: OpenResponsesResult$inboundSchema,
  sequence_number: int(),
  type: literal("response.completed")
}).transform((v) => {
  return remap(v, {
    "sequence_number": "sequenceNumber"
  });
});
const StreamEventsResponseFailed$inboundSchema = object({
  response: OpenResponsesResult$inboundSchema,
  sequence_number: int(),
  type: literal("response.failed")
}).transform((v) => {
  return remap(v, {
    "sequence_number": "sequenceNumber"
  });
});
const StreamEventsResponseIncomplete$inboundSchema = object({
  response: OpenResponsesResult$inboundSchema,
  sequence_number: int(),
  type: literal("response.incomplete")
}).transform((v) => {
  return remap(v, {
    "sequence_number": "sequenceNumber"
  });
});
const StreamEventsResponseOutputItemAdded$inboundSchema = object({
  item: OutputItems$inboundSchema,
  output_index: int(),
  sequence_number: int(),
  type: literal("response.output_item.added")
}).transform((v) => {
  return remap(v, {
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const StreamEventsResponseOutputItemDone$inboundSchema = object({
  item: OutputItems$inboundSchema,
  output_index: int(),
  sequence_number: int(),
  type: literal("response.output_item.done")
}).transform((v) => {
  return remap(v, {
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const StreamLogprobTopLogprob$inboundSchema = object({
  bytes: array(int()).optional(),
  logprob: number().optional(),
  token: string().optional()
});
const StreamLogprob$inboundSchema = object({
  bytes: array(int()).optional(),
  logprob: number(),
  token: string(),
  top_logprobs: array(StreamLogprobTopLogprob$inboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    "top_logprobs": "topLogprobs"
  });
});
const TextDeltaEvent$inboundSchema = object({
  content_index: int(),
  delta: string(),
  item_id: string(),
  logprobs: array(StreamLogprob$inboundSchema),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.output_text.delta")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const TextDoneEvent$inboundSchema = object({
  content_index: int(),
  item_id: string(),
  logprobs: array(StreamLogprob$inboundSchema),
  output_index: int(),
  sequence_number: int(),
  text: string(),
  type: literal("response.output_text.done")
}).transform((v) => {
  return remap(v, {
    "content_index": "contentIndex",
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const WebSearchCallCompletedEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.web_search_call.completed")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const WebSearchCallInProgressEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.web_search_call.in_progress")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const WebSearchCallSearchingEvent$inboundSchema = object({
  item_id: string(),
  output_index: int(),
  sequence_number: int(),
  type: literal("response.web_search_call.searching")
}).transform((v) => {
  return remap(v, {
    "item_id": "itemId",
    "output_index": "outputIndex",
    "sequence_number": "sequenceNumber"
  });
});
const StreamEvents$inboundSchema = discriminatedUnion("type", {
  error: ErrorEvent$inboundSchema,
  ["response.completed"]: StreamEventsResponseCompleted$inboundSchema,
  ["response.content_part.added"]: ContentPartAddedEvent$inboundSchema,
  ["response.content_part.done"]: ContentPartDoneEvent$inboundSchema,
  ["response.created"]: OpenResponsesCreatedEvent$inboundSchema,
  ["response.failed"]: StreamEventsResponseFailed$inboundSchema,
  ["response.function_call_arguments.delta"]: FunctionCallArgsDeltaEvent$inboundSchema,
  ["response.function_call_arguments.done"]: FunctionCallArgsDoneEvent$inboundSchema,
  ["response.image_generation_call.completed"]: ImageGenCallCompletedEvent$inboundSchema,
  ["response.image_generation_call.generating"]: ImageGenCallGeneratingEvent$inboundSchema,
  ["response.image_generation_call.in_progress"]: ImageGenCallInProgressEvent$inboundSchema,
  ["response.image_generation_call.partial_image"]: ImageGenCallPartialImageEvent$inboundSchema,
  ["response.in_progress"]: OpenResponsesInProgressEvent$inboundSchema,
  ["response.incomplete"]: StreamEventsResponseIncomplete$inboundSchema,
  ["response.output_item.added"]: StreamEventsResponseOutputItemAdded$inboundSchema,
  ["response.output_item.done"]: StreamEventsResponseOutputItemDone$inboundSchema,
  ["response.output_text.annotation.added"]: AnnotationAddedEvent$inboundSchema,
  ["response.output_text.delta"]: TextDeltaEvent$inboundSchema,
  ["response.output_text.done"]: TextDoneEvent$inboundSchema,
  ["response.reasoning_summary_part.added"]: ReasoningSummaryPartAddedEvent$inboundSchema,
  ["response.reasoning_summary_part.done"]: ReasoningSummaryPartDoneEvent$inboundSchema,
  ["response.reasoning_summary_text.delta"]: ReasoningSummaryTextDeltaEvent$inboundSchema,
  ["response.reasoning_summary_text.done"]: ReasoningSummaryTextDoneEvent$inboundSchema,
  ["response.reasoning_text.delta"]: ReasoningDeltaEvent$inboundSchema,
  ["response.reasoning_text.done"]: ReasoningDoneEvent$inboundSchema,
  ["response.refusal.delta"]: RefusalDeltaEvent$inboundSchema,
  ["response.refusal.done"]: RefusalDoneEvent$inboundSchema,
  ["response.web_search_call.completed"]: WebSearchCallCompletedEvent$inboundSchema,
  ["response.web_search_call.in_progress"]: WebSearchCallInProgressEvent$inboundSchema,
  ["response.web_search_call.searching"]: WebSearchCallSearchingEvent$inboundSchema
});
const ResponsesStreamingResponse$inboundSchema = object({
  data: string().transform((v, ctx) => {
    try {
      return JSON.parse(v);
    } catch (err) {
      ctx.addIssue({
        input: v,
        code: "custom",
        message: `malformed json: ${err}`
      });
      return NEVER$1;
    }
  }).pipe(StreamEvents$inboundSchema)
});
const ServiceUnavailableResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const SpeechRequestProvider$outboundSchema = object({
  options: ProviderOptions$outboundSchema.optional()
});
const ResponseFormatEnum$outboundSchema = outboundSchema();
const SpeechRequest$outboundSchema = object({
  input: string(),
  model: string(),
  provider: lazy(() => SpeechRequestProvider$outboundSchema).optional(),
  responseFormat: ResponseFormatEnum$outboundSchema.default("pcm"),
  speed: number().optional(),
  voice: string()
}).transform((v) => {
  return remap(v, {
    responseFormat: "response_format"
  });
});
const STTInputAudio$outboundSchema = object({
  data: string(),
  format: string()
});
const STTRequestProvider$outboundSchema = object({
  options: ProviderOptions$outboundSchema.optional()
});
const STTRequest$outboundSchema = object({
  inputAudio: STTInputAudio$outboundSchema,
  language: string().optional(),
  model: string(),
  provider: lazy(() => STTRequestProvider$outboundSchema).optional(),
  temperature: number().optional()
}).transform((v) => {
  return remap(v, {
    inputAudio: "input_audio"
  });
});
const STTUsage$inboundSchema = object({
  cost: number().optional(),
  input_tokens: int().optional(),
  output_tokens: int().optional(),
  seconds: number().optional(),
  total_tokens: int().optional()
}).transform((v) => {
  return remap(v, {
    "input_tokens": "inputTokens",
    "output_tokens": "outputTokens",
    "total_tokens": "totalTokens"
  });
});
const STTResponse$inboundSchema = object({
  text: string(),
  usage: STTUsage$inboundSchema.optional()
});
const TooManyRequestsResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const UnauthorizedResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const UnprocessableEntityResponseErrorData$inboundSchema = object({
  code: int(),
  message: string(),
  metadata: nullable(record(string(), nullable(any()))).optional()
});
const UpdateGuardrailRequest$outboundSchema$1 = object({
  allowedModels: nullable(array(string())).optional(),
  allowedProviders: nullable(array(string())).optional(),
  contentFilterBuiltins: nullable(array(ContentFilterBuiltinEntry$outboundSchema)).optional(),
  contentFilters: nullable(array(ContentFilterEntry$outboundSchema)).optional(),
  description: nullable(string()).optional(),
  enforceZdr: nullable(boolean$1()).optional(),
  ignoredModels: nullable(array(string())).optional(),
  ignoredProviders: nullable(array(string())).optional(),
  limitUsd: nullable(number()).optional(),
  name: string().optional(),
  resetInterval: nullable(GuardrailInterval$outboundSchema).optional()
}).transform((v) => {
  return remap(v, {
    allowedModels: "allowed_models",
    allowedProviders: "allowed_providers",
    contentFilterBuiltins: "content_filter_builtins",
    contentFilters: "content_filters",
    enforceZdr: "enforce_zdr",
    ignoredModels: "ignored_models",
    ignoredProviders: "ignored_providers",
    limitUsd: "limit_usd",
    resetInterval: "reset_interval"
  });
});
const UpdateGuardrailResponse$inboundSchema = object({
  data: Guardrail$inboundSchema
});
const UpdateWorkspaceRequest$outboundSchema$1 = object({
  defaultImageModel: nullable(string()).optional(),
  defaultProviderSort: nullable(string()).optional(),
  defaultTextModel: nullable(string()).optional(),
  description: nullable(string()).optional(),
  ioLoggingApiKeyIds: nullable(array(int())).optional(),
  ioLoggingSamplingRate: number().optional(),
  isDataDiscountLoggingEnabled: boolean$1().optional(),
  isObservabilityBroadcastEnabled: boolean$1().optional(),
  isObservabilityIoLoggingEnabled: boolean$1().optional(),
  name: string().optional(),
  slug: string().optional()
}).transform((v) => {
  return remap(v, {
    defaultImageModel: "default_image_model",
    defaultProviderSort: "default_provider_sort",
    defaultTextModel: "default_text_model",
    ioLoggingApiKeyIds: "io_logging_api_key_ids",
    ioLoggingSamplingRate: "io_logging_sampling_rate",
    isDataDiscountLoggingEnabled: "is_data_discount_logging_enabled",
    isObservabilityBroadcastEnabled: "is_observability_broadcast_enabled",
    isObservabilityIoLoggingEnabled: "is_observability_io_logging_enabled"
  });
});
const UpdateWorkspaceResponse$inboundSchema = object({
  data: Workspace$inboundSchema
});
const AspectRatio$outboundSchema = outboundSchema();
const Options$outboundSchema = object({
  oneai: record(string(), nullable(any())).optional(),
  ai21: record(string(), nullable(any())).optional(),
  aionLabs: record(string(), nullable(any())).optional(),
  akashml: record(string(), nullable(any())).optional(),
  alibaba: record(string(), nullable(any())).optional(),
  amazonBedrock: record(string(), nullable(any())).optional(),
  amazonNova: record(string(), nullable(any())).optional(),
  ambient: record(string(), nullable(any())).optional(),
  anthropic: record(string(), nullable(any())).optional(),
  anyscale: record(string(), nullable(any())).optional(),
  arceeAi: record(string(), nullable(any())).optional(),
  atlasCloud: record(string(), nullable(any())).optional(),
  atoma: record(string(), nullable(any())).optional(),
  avian: record(string(), nullable(any())).optional(),
  azure: record(string(), nullable(any())).optional(),
  baidu: record(string(), nullable(any())).optional(),
  baseten: record(string(), nullable(any())).optional(),
  blackForestLabs: record(string(), nullable(any())).optional(),
  byteplus: record(string(), nullable(any())).optional(),
  centml: record(string(), nullable(any())).optional(),
  cerebras: record(string(), nullable(any())).optional(),
  chutes: record(string(), nullable(any())).optional(),
  cirrascale: record(string(), nullable(any())).optional(),
  clarifai: record(string(), nullable(any())).optional(),
  cloudflare: record(string(), nullable(any())).optional(),
  cohere: record(string(), nullable(any())).optional(),
  crofai: record(string(), nullable(any())).optional(),
  crusoe: record(string(), nullable(any())).optional(),
  deepinfra: record(string(), nullable(any())).optional(),
  deepseek: record(string(), nullable(any())).optional(),
  dekallm: record(string(), nullable(any())).optional(),
  enfer: record(string(), nullable(any())).optional(),
  fakeProvider: record(string(), nullable(any())).optional(),
  featherless: record(string(), nullable(any())).optional(),
  fireworks: record(string(), nullable(any())).optional(),
  friendli: record(string(), nullable(any())).optional(),
  gmicloud: record(string(), nullable(any())).optional(),
  googleAiStudio: record(string(), nullable(any())).optional(),
  googleVertex: record(string(), nullable(any())).optional(),
  gopomelo: record(string(), nullable(any())).optional(),
  groq: record(string(), nullable(any())).optional(),
  huggingface: record(string(), nullable(any())).optional(),
  hyperbolic: record(string(), nullable(any())).optional(),
  hyperbolicQuantized: record(string(), nullable(any())).optional(),
  inception: record(string(), nullable(any())).optional(),
  inceptron: record(string(), nullable(any())).optional(),
  inferenceNet: record(string(), nullable(any())).optional(),
  infermatic: record(string(), nullable(any())).optional(),
  inflection: record(string(), nullable(any())).optional(),
  inocloud: record(string(), nullable(any())).optional(),
  ioNet: record(string(), nullable(any())).optional(),
  ionstream: record(string(), nullable(any())).optional(),
  klusterai: record(string(), nullable(any())).optional(),
  lambda: record(string(), nullable(any())).optional(),
  lepton: record(string(), nullable(any())).optional(),
  liquid: record(string(), nullable(any())).optional(),
  lynn: record(string(), nullable(any())).optional(),
  lynnPrivate: record(string(), nullable(any())).optional(),
  mancer: record(string(), nullable(any())).optional(),
  mancerOld: record(string(), nullable(any())).optional(),
  mara: record(string(), nullable(any())).optional(),
  meta: record(string(), nullable(any())).optional(),
  minimax: record(string(), nullable(any())).optional(),
  mistral: record(string(), nullable(any())).optional(),
  modal: record(string(), nullable(any())).optional(),
  modelrun: record(string(), nullable(any())).optional(),
  modular: record(string(), nullable(any())).optional(),
  moonshotai: record(string(), nullable(any())).optional(),
  morph: record(string(), nullable(any())).optional(),
  ncompass: record(string(), nullable(any())).optional(),
  nebius: record(string(), nullable(any())).optional(),
  nexAgi: record(string(), nullable(any())).optional(),
  nextbit: record(string(), nullable(any())).optional(),
  nineteen: record(string(), nullable(any())).optional(),
  novita: record(string(), nullable(any())).optional(),
  nvidia: record(string(), nullable(any())).optional(),
  octoai: record(string(), nullable(any())).optional(),
  openInference: record(string(), nullable(any())).optional(),
  openai: record(string(), nullable(any())).optional(),
  parasail: record(string(), nullable(any())).optional(),
  perceptron: record(string(), nullable(any())).optional(),
  perplexity: record(string(), nullable(any())).optional(),
  phala: record(string(), nullable(any())).optional(),
  poolside: record(string(), nullable(any())).optional(),
  recraft: record(string(), nullable(any())).optional(),
  recursal: record(string(), nullable(any())).optional(),
  reflection: record(string(), nullable(any())).optional(),
  reka: record(string(), nullable(any())).optional(),
  relace: record(string(), nullable(any())).optional(),
  replicate: record(string(), nullable(any())).optional(),
  sambanova: record(string(), nullable(any())).optional(),
  sambanovaCloaked: record(string(), nullable(any())).optional(),
  seed: record(string(), nullable(any())).optional(),
  sfCompute: record(string(), nullable(any())).optional(),
  siliconflow: record(string(), nullable(any())).optional(),
  sourceful: record(string(), nullable(any())).optional(),
  stealth: record(string(), nullable(any())).optional(),
  stepfun: record(string(), nullable(any())).optional(),
  streamlake: record(string(), nullable(any())).optional(),
  switchpoint: record(string(), nullable(any())).optional(),
  targon: record(string(), nullable(any())).optional(),
  together: record(string(), nullable(any())).optional(),
  togetherLite: record(string(), nullable(any())).optional(),
  ubicloud: record(string(), nullable(any())).optional(),
  upstage: record(string(), nullable(any())).optional(),
  venice: record(string(), nullable(any())).optional(),
  wandb: record(string(), nullable(any())).optional(),
  xai: record(string(), nullable(any())).optional(),
  xiaomi: record(string(), nullable(any())).optional(),
  zAi: record(string(), nullable(any())).optional()
}).transform((v) => {
  return remap(v, {
    oneai: "01ai",
    aionLabs: "aion-labs",
    amazonBedrock: "amazon-bedrock",
    amazonNova: "amazon-nova",
    arceeAi: "arcee-ai",
    atlasCloud: "atlas-cloud",
    blackForestLabs: "black-forest-labs",
    fakeProvider: "fake-provider",
    googleAiStudio: "google-ai-studio",
    googleVertex: "google-vertex",
    hyperbolicQuantized: "hyperbolic-quantized",
    inferenceNet: "inference-net",
    ioNet: "io-net",
    lynnPrivate: "lynn-private",
    mancerOld: "mancer-old",
    nexAgi: "nex-agi",
    openInference: "open-inference",
    sambanovaCloaked: "sambanova-cloaked",
    sfCompute: "sf-compute",
    togetherLite: "together-lite",
    zAi: "z-ai"
  });
});
const VideoGenerationRequestProvider$outboundSchema = object({
  options: lazy(() => Options$outboundSchema).optional()
});
const Resolution$outboundSchema = outboundSchema();
const VideoGenerationRequest$outboundSchema = object({
  aspectRatio: AspectRatio$outboundSchema.optional(),
  callbackUrl: string().optional(),
  duration: int().optional(),
  frameImages: array(FrameImage$outboundSchema).optional(),
  generateAudio: boolean$1().optional(),
  inputReferences: array(ContentPartImage$outboundSchema).optional(),
  model: string(),
  prompt: string(),
  provider: lazy(() => VideoGenerationRequestProvider$outboundSchema).optional(),
  resolution: Resolution$outboundSchema.optional(),
  seed: int().optional(),
  size: string().optional()
}).transform((v) => {
  return remap(v, {
    aspectRatio: "aspect_ratio",
    callbackUrl: "callback_url",
    frameImages: "frame_images",
    generateAudio: "generate_audio",
    inputReferences: "input_references"
  });
});
const VideoGenerationUsage$inboundSchema = object({
  cost: nullable(number()).optional(),
  is_byok: boolean$1().optional()
}).transform((v) => {
  return remap(v, {
    "is_byok": "isByok"
  });
});
const VideoGenerationResponseStatus = {
  Pending: "pending",
  InProgress: "in_progress",
  Completed: "completed",
  Failed: "failed",
  Cancelled: "cancelled",
  Expired: "expired"
};
const VideoGenerationResponseStatus$inboundSchema = inboundSchema(VideoGenerationResponseStatus);
const VideoGenerationResponse$inboundSchema = object({
  error: string().optional(),
  generation_id: string().optional(),
  id: string(),
  polling_url: string(),
  status: VideoGenerationResponseStatus$inboundSchema,
  unsigned_urls: array(string()).optional(),
  usage: VideoGenerationUsage$inboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    "generation_id": "generationId",
    "polling_url": "pollingUrl",
    "unsigned_urls": "unsignedUrls"
  });
});
const SupportedAspectRatio = {
  OneHundredAndSixtyNine: "16:9",
  NineHundredAndSixteen: "9:16",
  Eleven: "1:1",
  FortyThree: "4:3",
  ThirtyFour: "3:4",
  TwoHundredAndNineteen: "21:9",
  NineHundredAndTwentyOne: "9:21"
};
const SupportedFrameImage = {
  FirstFrame: "first_frame",
  LastFrame: "last_frame"
};
const SupportedResolution = {
  FourHundredAndEightyp: "480p",
  SevenHundredAndTwentyp: "720p",
  OneThousandAndEightyp: "1080p",
  OneK: "1K",
  TwoK: "2K",
  FourK: "4K"
};
const SupportedSize = {
  FourHundredAndEightyx480: "480x480",
  FourHundredAndEightyx640: "480x640",
  FourHundredAndEightyx854: "480x854",
  FourHundredAndEightyx1120: "480x1120",
  SixHundredAndFortyx480: "640x480",
  SevenHundredAndTwentyx720: "720x720",
  SevenHundredAndTwentyx960: "720x960",
  SevenHundredAndTwentyx1280: "720x1280",
  SevenHundredAndTwentyx1680: "720x1680",
  EightHundredAndFiftyFourx480: "854x480",
  NineHundredAndSixtyx720: "960x720",
  OneThousandAndEightyx1080: "1080x1080",
  OneThousandAndEightyx1440: "1080x1440",
  OneThousandAndEightyx1920: "1080x1920",
  OneThousandAndEightyx2520: "1080x2520",
  OneThousandOneHundredAndTwentyx480: "1120x480",
  OneThousandTwoHundredAndEightyx720: "1280x720",
  OneThousandFourHundredAndFortyx1080: "1440x1080",
  OneThousandSixHundredAndEightyx720: "1680x720",
  OneThousandNineHundredAndTwentyx1080: "1920x1080",
  TwoThousandOneHundredAndSixtyx2160: "2160x2160",
  TwoThousandOneHundredAndSixtyx2880: "2160x2880",
  TwoThousandOneHundredAndSixtyx3840: "2160x3840",
  TwoThousandOneHundredAndSixtyx5040: "2160x5040",
  TwoThousandFiveHundredAndTwentyx1080: "2520x1080",
  TwoThousandEightHundredAndEightyx2160: "2880x2160",
  ThreeThousandEightHundredAndFortyx2160: "3840x2160",
  FiveThousandAndFortyx2160: "5040x2160"
};
const SupportedAspectRatio$inboundSchema = inboundSchema(SupportedAspectRatio);
const SupportedFrameImage$inboundSchema = inboundSchema(SupportedFrameImage);
const SupportedResolution$inboundSchema = inboundSchema(SupportedResolution);
const SupportedSize$inboundSchema = inboundSchema(SupportedSize);
const VideoModel$inboundSchema = object({
  allowed_passthrough_parameters: array(string()),
  canonical_slug: string(),
  created: int(),
  description: string().optional(),
  generate_audio: nullable(boolean$1()),
  hugging_face_id: nullable(string()).optional(),
  id: string(),
  name: string(),
  pricing_skus: nullable(record(string(), string())).optional(),
  seed: nullable(boolean$1()),
  supported_aspect_ratios: nullable(array(SupportedAspectRatio$inboundSchema)),
  supported_durations: nullable(array(int())),
  supported_frame_images: nullable(array(SupportedFrameImage$inboundSchema)),
  supported_resolutions: nullable(array(SupportedResolution$inboundSchema)),
  supported_sizes: nullable(array(SupportedSize$inboundSchema))
}).transform((v) => {
  return remap(v, {
    "allowed_passthrough_parameters": "allowedPassthroughParameters",
    "canonical_slug": "canonicalSlug",
    "generate_audio": "generateAudio",
    "hugging_face_id": "huggingFaceId",
    "pricing_skus": "pricingSkus",
    "supported_aspect_ratios": "supportedAspectRatios",
    "supported_durations": "supportedDurations",
    "supported_frame_images": "supportedFrameImages",
    "supported_resolutions": "supportedResolutions",
    "supported_sizes": "supportedSizes"
  });
});
const VideoModelsListResponse$inboundSchema = object({
  data: array(VideoModel$inboundSchema)
});
class BadGatewayResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "BadGatewayResponseError";
  }
}
const BadGatewayResponseError$inboundSchema = object({
  error: BadGatewayResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new BadGatewayResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class BadRequestResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "BadRequestResponseError";
  }
}
const BadRequestResponseError$inboundSchema = object({
  error: BadRequestResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new BadRequestResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class ConflictResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "ConflictResponseError";
  }
}
const ConflictResponseError$inboundSchema = object({
  error: ConflictResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new ConflictResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class EdgeNetworkTimeoutResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "EdgeNetworkTimeoutResponseError";
  }
}
const EdgeNetworkTimeoutResponseError$inboundSchema = object({
  error: EdgeNetworkTimeoutResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new EdgeNetworkTimeoutResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class ForbiddenResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "ForbiddenResponseError";
  }
}
const ForbiddenResponseError$inboundSchema = object({
  error: ForbiddenResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new ForbiddenResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class InternalServerResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "InternalServerResponseError";
  }
}
const InternalServerResponseError$inboundSchema = object({
  error: InternalServerResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new InternalServerResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class NotFoundResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "NotFoundResponseError";
  }
}
const NotFoundResponseError$inboundSchema = object({
  error: NotFoundResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new NotFoundResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class PayloadTooLargeResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "PayloadTooLargeResponseError";
  }
}
const PayloadTooLargeResponseError$inboundSchema = object({
  error: PayloadTooLargeResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new PayloadTooLargeResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class PaymentRequiredResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "PaymentRequiredResponseError";
  }
}
const PaymentRequiredResponseError$inboundSchema = object({
  error: PaymentRequiredResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new PaymentRequiredResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class ProviderOverloadedResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "ProviderOverloadedResponseError";
  }
}
const ProviderOverloadedResponseError$inboundSchema = object({
  error: ProviderOverloadedResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new ProviderOverloadedResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class RequestTimeoutResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "RequestTimeoutResponseError";
  }
}
const RequestTimeoutResponseError$inboundSchema = object({
  error: RequestTimeoutResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new RequestTimeoutResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class ServiceUnavailableResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "ServiceUnavailableResponseError";
  }
}
const ServiceUnavailableResponseError$inboundSchema = object({
  error: ServiceUnavailableResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new ServiceUnavailableResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class TooManyRequestsResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "TooManyRequestsResponseError";
  }
}
const TooManyRequestsResponseError$inboundSchema = object({
  error: TooManyRequestsResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new TooManyRequestsResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class UnauthorizedResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "UnauthorizedResponseError";
  }
}
const UnauthorizedResponseError$inboundSchema = object({
  error: UnauthorizedResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new UnauthorizedResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
class UnprocessableEntityResponseError extends OpenRouterError {
  constructor(err, httpMeta) {
    const message = err.error?.message || `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    this.error = err.error;
    if (err.openrouterMetadata != null) {
      this.openrouterMetadata = err.openrouterMetadata;
    }
    if (err.userId != null)
      this.userId = err.userId;
    this.name = "UnprocessableEntityResponseError";
  }
}
const UnprocessableEntityResponseError$inboundSchema = object({
  error: UnprocessableEntityResponseErrorData$inboundSchema,
  openrouter_metadata: nullable(record(string(), nullable(any()))).optional(),
  user_id: nullable(string()).optional(),
  request$: custom$1((x) => x instanceof Request),
  response$: custom$1((x) => x instanceof Response),
  body$: string()
}).transform((v) => {
  const remapped = remap(v, {
    "openrouter_metadata": "openrouterMetadata",
    "user_id": "userId"
  });
  return new UnprocessableEntityResponseError(remapped, {
    request: v.request$,
    response: v.response$,
    body: v.body$
  });
});
const BulkAddWorkspaceMembersRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  bulkAddWorkspaceMembersRequest: BulkAddWorkspaceMembersRequest$outboundSchema$1
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    bulkAddWorkspaceMembersRequest: "BulkAddWorkspaceMembersRequest"
  });
});
const BulkAssignKeysToGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  bulkAssignKeysRequest: BulkAssignKeysRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    bulkAssignKeysRequest: "BulkAssignKeysRequest"
  });
});
const BulkAssignMembersToGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  bulkAssignMembersRequest: BulkAssignMembersRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    bulkAssignMembersRequest: "BulkAssignMembersRequest"
  });
});
const BulkRemoveWorkspaceMembersRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  bulkRemoveWorkspaceMembersRequest: BulkRemoveWorkspaceMembersRequest$outboundSchema$1
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    bulkRemoveWorkspaceMembersRequest: "BulkRemoveWorkspaceMembersRequest"
  });
});
const BulkUnassignKeysFromGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  bulkUnassignKeysRequest: BulkUnassignKeysRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    bulkUnassignKeysRequest: "BulkUnassignKeysRequest"
  });
});
const BulkUnassignMembersFromGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  bulkUnassignMembersRequest: BulkUnassignMembersRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    bulkUnassignMembersRequest: "BulkUnassignMembersRequest"
  });
});
const CreateAudioSpeechRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  speechRequest: SpeechRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    speechRequest: "SpeechRequest"
  });
});
const CreateAudioTranscriptionsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  sttRequest: STTRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    sttRequest: "STTRequest"
  });
});
const CreateAuthKeysCodeCodeChallengeMethod$outboundSchema = outboundSchema();
const UsageLimitType$outboundSchema = outboundSchema();
const CreateAuthKeysCodeRequestBody$outboundSchema = object({
  callbackUrl: string(),
  codeChallenge: string().optional(),
  codeChallengeMethod: CreateAuthKeysCodeCodeChallengeMethod$outboundSchema.optional(),
  expiresAt: nullable(date().transform((v) => v.toISOString())).optional(),
  keyLabel: string().optional(),
  limit: number().optional(),
  usageLimitType: UsageLimitType$outboundSchema.optional()
}).transform((v) => {
  return remap(v, {
    callbackUrl: "callback_url",
    codeChallenge: "code_challenge",
    codeChallengeMethod: "code_challenge_method",
    expiresAt: "expires_at",
    keyLabel: "key_label",
    usageLimitType: "usage_limit_type"
  });
});
const CreateAuthKeysCodeRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  requestBody: lazy(() => CreateAuthKeysCodeRequestBody$outboundSchema)
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    requestBody: "RequestBody"
  });
});
const CreateAuthKeysCodeData$inboundSchema = object({
  app_id: int(),
  created_at: string(),
  id: string()
}).transform((v) => {
  return remap(v, {
    "app_id": "appId",
    "created_at": "createdAt"
  });
});
const CreateAuthKeysCodeResponse$inboundSchema = object({
  data: lazy(() => CreateAuthKeysCodeData$inboundSchema)
});
const ObjectEmbedding = {
  Embedding: "embedding"
};
const ObjectT = {
  List: "list"
};
const EncodingFormat$outboundSchema = outboundSchema();
const ImageUrl$outboundSchema = object({
  url: string()
});
const ContentImageURL$outboundSchema = object({
  imageUrl: lazy(() => ImageUrl$outboundSchema),
  type: literal("image_url")
}).transform((v) => {
  return remap(v, {
    imageUrl: "image_url"
  });
});
const ContentText$outboundSchema = object({
  text: string(),
  type: literal("text")
});
union([
  lazy(() => ContentText$outboundSchema),
  lazy(() => ContentImageURL$outboundSchema)
]);
const Input$outboundSchema = object({
  content: array(union([
    lazy(() => ContentText$outboundSchema),
    lazy(() => ContentImageURL$outboundSchema)
  ]))
});
union([
  string(),
  array(string()),
  array(number()),
  array(array(number())),
  array(lazy(() => Input$outboundSchema))
]);
const CreateEmbeddingsRequestBody$outboundSchema = object({
  dimensions: int().optional(),
  encodingFormat: EncodingFormat$outboundSchema.optional(),
  input: union([
    string(),
    array(string()),
    array(number()),
    array(array(number())),
    array(lazy(() => Input$outboundSchema))
  ]),
  inputType: string().optional(),
  model: string(),
  provider: nullable(ProviderPreferences$outboundSchema).optional(),
  user: string().optional()
}).transform((v) => {
  return remap(v, {
    encodingFormat: "encoding_format",
    inputType: "input_type"
  });
});
const CreateEmbeddingsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  requestBody: lazy(() => CreateEmbeddingsRequestBody$outboundSchema)
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    requestBody: "RequestBody"
  });
});
union([
  array(number()),
  string()
]);
const ObjectEmbedding$inboundSchema = _enum(ObjectEmbedding);
const CreateEmbeddingsData$inboundSchema = object({
  embedding: union([array(number()), string()]),
  index: int().optional(),
  object: ObjectEmbedding$inboundSchema
});
const ObjectT$inboundSchema = _enum(ObjectT);
const PromptTokensDetails$inboundSchema = object({
  audio_tokens: int().optional(),
  image_tokens: int().optional(),
  text_tokens: int().optional(),
  video_tokens: int().optional()
}).transform((v) => {
  return remap(v, {
    "audio_tokens": "audioTokens",
    "image_tokens": "imageTokens",
    "text_tokens": "textTokens",
    "video_tokens": "videoTokens"
  });
});
const CreateEmbeddingsUsage$inboundSchema = object({
  cost: number().optional(),
  prompt_tokens: int(),
  prompt_tokens_details: lazy(() => PromptTokensDetails$inboundSchema).optional(),
  total_tokens: int()
}).transform((v) => {
  return remap(v, {
    "prompt_tokens": "promptTokens",
    "prompt_tokens_details": "promptTokensDetails",
    "total_tokens": "totalTokens"
  });
});
const CreateEmbeddingsResponseBody$inboundSchema = object({
  data: array(lazy(() => CreateEmbeddingsData$inboundSchema)),
  id: string().optional(),
  model: string(),
  object: ObjectT$inboundSchema,
  usage: lazy(() => CreateEmbeddingsUsage$inboundSchema).optional()
});
const CreateEmbeddingsResponse$inboundSchema = union([
  lazy(() => CreateEmbeddingsResponseBody$inboundSchema),
  string()
]);
const CreateGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  createGuardrailRequest: CreateGuardrailRequest$outboundSchema$1
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    createGuardrailRequest: "CreateGuardrailRequest"
  });
});
const CreateKeysLimitReset$outboundSchema = outboundSchema();
const CreateKeysRequestBody$outboundSchema = object({
  creatorUserId: nullable(string()).optional(),
  expiresAt: nullable(date().transform((v) => v.toISOString())).optional(),
  includeByokInLimit: boolean$1().optional(),
  limit: nullable(number()).optional(),
  limitReset: nullable(CreateKeysLimitReset$outboundSchema).optional(),
  name: string(),
  workspaceId: string().optional()
}).transform((v) => {
  return remap(v, {
    creatorUserId: "creator_user_id",
    expiresAt: "expires_at",
    includeByokInLimit: "include_byok_in_limit",
    limitReset: "limit_reset",
    workspaceId: "workspace_id"
  });
});
const CreateKeysRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  requestBody: lazy(() => CreateKeysRequestBody$outboundSchema)
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    requestBody: "RequestBody"
  });
});
const CreateKeysData$inboundSchema = object({
  byok_usage: number(),
  byok_usage_daily: number(),
  byok_usage_monthly: number(),
  byok_usage_weekly: number(),
  created_at: string(),
  creator_user_id: nullable(string()),
  disabled: boolean$1(),
  expires_at: nullable(datetime({ offset: true }).transform((v) => new Date(v))).optional(),
  hash: string(),
  include_byok_in_limit: boolean$1(),
  label: string(),
  limit: nullable(number()),
  limit_remaining: nullable(number()),
  limit_reset: nullable(string()),
  name: string(),
  updated_at: nullable(string()),
  usage: number(),
  usage_daily: number(),
  usage_monthly: number(),
  usage_weekly: number(),
  workspace_id: string()
}).transform((v) => {
  return remap(v, {
    "byok_usage": "byokUsage",
    "byok_usage_daily": "byokUsageDaily",
    "byok_usage_monthly": "byokUsageMonthly",
    "byok_usage_weekly": "byokUsageWeekly",
    "created_at": "createdAt",
    "creator_user_id": "creatorUserId",
    "expires_at": "expiresAt",
    "include_byok_in_limit": "includeByokInLimit",
    "limit_remaining": "limitRemaining",
    "limit_reset": "limitReset",
    "updated_at": "updatedAt",
    "usage_daily": "usageDaily",
    "usage_monthly": "usageMonthly",
    "usage_weekly": "usageWeekly",
    "workspace_id": "workspaceId"
  });
});
const CreateKeysResponse$inboundSchema = object({
  data: lazy(() => CreateKeysData$inboundSchema),
  key: string()
});
const CreateRerankRequestBody$outboundSchema = object({
  documents: array(string()),
  model: string(),
  provider: nullable(ProviderPreferences$outboundSchema).optional(),
  query: string(),
  topN: int().optional()
}).transform((v) => {
  return remap(v, {
    topN: "top_n"
  });
});
const CreateRerankRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  requestBody: lazy(() => CreateRerankRequestBody$outboundSchema)
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    requestBody: "RequestBody"
  });
});
const Document$inboundSchema = object({
  text: string()
});
const Result$inboundSchema = object({
  document: lazy(() => Document$inboundSchema),
  index: int(),
  relevance_score: number()
}).transform((v) => {
  return remap(v, {
    "relevance_score": "relevanceScore"
  });
});
const CreateRerankUsage$inboundSchema = object({
  cost: number().optional(),
  search_units: int().optional(),
  total_tokens: int().optional()
}).transform((v) => {
  return remap(v, {
    "search_units": "searchUnits",
    "total_tokens": "totalTokens"
  });
});
const CreateRerankResponseBody$inboundSchema = object({
  id: string().optional(),
  model: string(),
  provider: string().optional(),
  results: array(lazy(() => Result$inboundSchema)),
  usage: lazy(() => CreateRerankUsage$inboundSchema).optional()
});
const CreateRerankResponse$inboundSchema = union([lazy(() => CreateRerankResponseBody$inboundSchema), string()]);
class EventStream extends ReadableStream {
  constructor(responseBody, parse2, opts) {
    const upstream = responseBody.getReader();
    let buffer = new Uint8Array();
    const state = { eventId: void 0 };
    const dataRequired = opts?.dataRequired ?? true;
    super({
      async pull(downstream) {
        try {
          while (true) {
            const match2 = findBoundary(buffer);
            if (!match2) {
              const chunk = await upstream.read();
              if (chunk.done)
                return downstream.close();
              buffer = concatBuffer(buffer, chunk.value);
              continue;
            }
            const message = buffer.slice(0, match2.index);
            buffer = buffer.slice(match2.index + match2.length);
            const item = parseMessage(message, parse2, state, dataRequired);
            if (item && !item.done)
              return downstream.enqueue(item.value);
            if (item?.done) {
              await upstream.cancel("done");
              return downstream.close();
            }
          }
        } catch (e) {
          downstream.error(e);
          await upstream.cancel(e);
        }
      },
      cancel: (reason) => upstream.cancel(reason)
    });
  }
  // Polyfill for older browsers
  [Symbol.asyncIterator]() {
    const fn = ReadableStream.prototype[Symbol.asyncIterator];
    if (typeof fn === "function")
      return fn.call(this);
    const reader = this.getReader();
    return {
      next: async () => {
        const r = await reader.read();
        if (r.done) {
          reader.releaseLock();
          return { done: true, value: void 0 };
        }
        return { done: false, value: r.value };
      },
      throw: async (e) => {
        await reader.cancel(e);
        reader.releaseLock();
        return { done: true, value: void 0 };
      },
      return: async () => {
        await reader.cancel("done");
        reader.releaseLock();
        return { done: true, value: void 0 };
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
}
function concatBuffer(a, b) {
  const c = new Uint8Array(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}
const CR = 13;
const LF = 10;
const BOUNDARIES = [
  [CR, LF, CR, LF],
  // \r\n\r\n
  [CR, LF, CR],
  // \r\n\r
  [CR, LF, LF],
  // \r\n\n
  [CR, CR, LF],
  // \r\r\n
  [LF, CR, LF],
  // \n\r\n
  [CR, CR],
  // \r\r
  [LF, CR],
  // \n\r
  [LF, LF]
  // \n\n
];
function findBoundary(buf) {
  const len = buf.length;
  for (let i = 0; i < len; i++) {
    if (buf[i] !== CR && buf[i] !== LF)
      continue;
    for (const boundary of BOUNDARIES) {
      if (i + boundary.length > len)
        continue;
      let match2 = true;
      for (let j = 0; j < boundary.length; j++) {
        if (buf[i + j] !== boundary[j]) {
          match2 = false;
          break;
        }
      }
      if (match2)
        return { index: i, length: boundary.length };
    }
  }
  return null;
}
function parseMessage(chunk, parse2, state, dataRequired) {
  const text2 = new TextDecoder().decode(chunk);
  const lines = text2.split(/\r\n|\r|\n/);
  const dataLines = [];
  const ret = {};
  let ignore = true;
  for (const line of lines) {
    if (!line || line.startsWith(":"))
      continue;
    ignore = false;
    const i = line.indexOf(":");
    let field = line;
    let value = "";
    if (i > 0) {
      field = line.slice(0, i);
      value = line[i + 1] === " " ? line.slice(i + 2) : line.slice(i + 1);
    }
    if (field === "data")
      dataLines.push(value);
    else if (field === "event")
      ret.event = value;
    else if (field === "id" && !value.includes("\0"))
      state.eventId = value;
    else if (field === "retry" && /^\d+$/.test(value)) {
      ret.retry = Number(value);
    }
  }
  if (ignore)
    return;
  ret.id = state.eventId;
  if (dataLines.length)
    ret.data = dataLines.join("\n");
  else if (dataRequired)
    return;
  return parse2(ret);
}
const CreateResponsesRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  xOpenRouterExperimentalMetadata: MetadataLevel$outboundSchema.optional(),
  responsesRequest: ResponsesRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    xOpenRouterExperimentalMetadata: "X-OpenRouter-Experimental-Metadata",
    responsesRequest: "ResponsesRequest"
  });
});
const CreateResponsesResponse$inboundSchema = union([
  OpenResponsesResult$inboundSchema,
  custom$1((x) => x instanceof ReadableStream).transform((stream2) => {
    return new EventStream(stream2, (rawEvent) => {
      if (rawEvent.data === "[DONE]")
        return { done: true, value: void 0 };
      return {
        done: false,
        value: ResponsesStreamingResponse$inboundSchema.parse(rawEvent)?.data
      };
    });
  })
]);
const CreateVideosRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  videoGenerationRequest: VideoGenerationRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    videoGenerationRequest: "VideoGenerationRequest"
  });
});
const CreateWorkspaceRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  createWorkspaceRequest: CreateWorkspaceRequest$outboundSchema$1
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    createWorkspaceRequest: "CreateWorkspaceRequest"
  });
});
const DeleteGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const DeleteKeysRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  hash: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const DeleteKeysResponse$inboundSchema = object({
  deleted: literal(true)
});
const DeleteWorkspaceRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ExchangeAuthCodeForAPIKeyCodeChallengeMethod$outboundSchema = outboundSchema();
const ExchangeAuthCodeForAPIKeyRequestBody$outboundSchema = object({
  code: string(),
  codeChallengeMethod: nullable(ExchangeAuthCodeForAPIKeyCodeChallengeMethod$outboundSchema).optional(),
  codeVerifier: string().optional()
}).transform((v) => {
  return remap(v, {
    codeChallengeMethod: "code_challenge_method",
    codeVerifier: "code_verifier"
  });
});
const ExchangeAuthCodeForAPIKeyRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  requestBody: lazy(() => ExchangeAuthCodeForAPIKeyRequestBody$outboundSchema)
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    requestBody: "RequestBody"
  });
});
const ExchangeAuthCodeForAPIKeyResponse$inboundSchema = object({
  key: string(),
  user_id: nullable(string())
}).transform((v) => {
  return remap(v, {
    "user_id": "userId"
  });
});
const GetCreditsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const GetCreditsData$inboundSchema = object({
  total_credits: number(),
  total_usage: number()
}).transform((v) => {
  return remap(v, {
    "total_credits": "totalCredits",
    "total_usage": "totalUsage"
  });
});
const GetCreditsResponse$inboundSchema = object({
  data: lazy(() => GetCreditsData$inboundSchema)
});
const GetCurrentKeyRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const RateLimit$inboundSchema = object({
  interval: string(),
  note: string(),
  requests: int()
});
const GetCurrentKeyData$inboundSchema = object({
  byok_usage: number(),
  byok_usage_daily: number(),
  byok_usage_monthly: number(),
  byok_usage_weekly: number(),
  creator_user_id: nullable(string()),
  expires_at: nullable(datetime({ offset: true }).transform((v) => new Date(v))).optional(),
  include_byok_in_limit: boolean$1(),
  is_free_tier: boolean$1(),
  is_management_key: boolean$1(),
  is_provisioning_key: boolean$1(),
  label: string(),
  limit: nullable(number()),
  limit_remaining: nullable(number()),
  limit_reset: nullable(string()),
  rate_limit: lazy(() => RateLimit$inboundSchema),
  usage: number(),
  usage_daily: number(),
  usage_monthly: number(),
  usage_weekly: number()
}).transform((v) => {
  return remap(v, {
    "byok_usage": "byokUsage",
    "byok_usage_daily": "byokUsageDaily",
    "byok_usage_monthly": "byokUsageMonthly",
    "byok_usage_weekly": "byokUsageWeekly",
    "creator_user_id": "creatorUserId",
    "expires_at": "expiresAt",
    "include_byok_in_limit": "includeByokInLimit",
    "is_free_tier": "isFreeTier",
    "is_management_key": "isManagementKey",
    "is_provisioning_key": "isProvisioningKey",
    "limit_remaining": "limitRemaining",
    "limit_reset": "limitReset",
    "rate_limit": "rateLimit",
    "usage_daily": "usageDaily",
    "usage_monthly": "usageMonthly",
    "usage_weekly": "usageWeekly"
  });
});
const GetCurrentKeyResponse$inboundSchema = object({
  data: lazy(() => GetCurrentKeyData$inboundSchema)
});
const GetGenerationRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const GetGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const GetKeyRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  hash: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const GetKeyData$inboundSchema = object({
  byok_usage: number(),
  byok_usage_daily: number(),
  byok_usage_monthly: number(),
  byok_usage_weekly: number(),
  created_at: string(),
  creator_user_id: nullable(string()),
  disabled: boolean$1(),
  expires_at: nullable(datetime({ offset: true }).transform((v) => new Date(v))).optional(),
  hash: string(),
  include_byok_in_limit: boolean$1(),
  label: string(),
  limit: nullable(number()),
  limit_remaining: nullable(number()),
  limit_reset: nullable(string()),
  name: string(),
  updated_at: nullable(string()),
  usage: number(),
  usage_daily: number(),
  usage_monthly: number(),
  usage_weekly: number(),
  workspace_id: string()
}).transform((v) => {
  return remap(v, {
    "byok_usage": "byokUsage",
    "byok_usage_daily": "byokUsageDaily",
    "byok_usage_monthly": "byokUsageMonthly",
    "byok_usage_weekly": "byokUsageWeekly",
    "created_at": "createdAt",
    "creator_user_id": "creatorUserId",
    "expires_at": "expiresAt",
    "include_byok_in_limit": "includeByokInLimit",
    "limit_remaining": "limitRemaining",
    "limit_reset": "limitReset",
    "updated_at": "updatedAt",
    "usage_daily": "usageDaily",
    "usage_monthly": "usageMonthly",
    "usage_weekly": "usageWeekly",
    "workspace_id": "workspaceId"
  });
});
const GetKeyResponse$inboundSchema = object({
  data: lazy(() => GetKeyData$inboundSchema)
});
const Category$outboundSchema = outboundSchema();
const GetModelsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  category: Category$outboundSchema.optional(),
  supportedParameters: string().optional(),
  outputModalities: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    supportedParameters: "supported_parameters",
    outputModalities: "output_modalities"
  });
});
const GetUserActivityRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  date: string().optional(),
  apiKeyHash: string().optional(),
  userId: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    apiKeyHash: "api_key_hash",
    userId: "user_id"
  });
});
const GetVideosRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  jobId: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const GetWorkspaceRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  includeDisabled: boolean$1().optional(),
  offset: nullable(int()).optional(),
  workspaceId: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    includeDisabled: "include_disabled",
    workspaceId: "workspace_id"
  });
});
const ListData$inboundSchema = object({
  byok_usage: number(),
  byok_usage_daily: number(),
  byok_usage_monthly: number(),
  byok_usage_weekly: number(),
  created_at: string(),
  creator_user_id: nullable(string()),
  disabled: boolean$1(),
  expires_at: nullable(datetime({ offset: true }).transform((v) => new Date(v))).optional(),
  hash: string(),
  include_byok_in_limit: boolean$1(),
  label: string(),
  limit: nullable(number()),
  limit_remaining: nullable(number()),
  limit_reset: nullable(string()),
  name: string(),
  updated_at: nullable(string()),
  usage: number(),
  usage_daily: number(),
  usage_monthly: number(),
  usage_weekly: number(),
  workspace_id: string()
}).transform((v) => {
  return remap(v, {
    "byok_usage": "byokUsage",
    "byok_usage_daily": "byokUsageDaily",
    "byok_usage_monthly": "byokUsageMonthly",
    "byok_usage_weekly": "byokUsageWeekly",
    "created_at": "createdAt",
    "creator_user_id": "creatorUserId",
    "expires_at": "expiresAt",
    "include_byok_in_limit": "includeByokInLimit",
    "limit_remaining": "limitRemaining",
    "limit_reset": "limitReset",
    "updated_at": "updatedAt",
    "usage_daily": "usageDaily",
    "usage_monthly": "usageMonthly",
    "usage_weekly": "usageWeekly",
    "workspace_id": "workspaceId"
  });
});
const ListResponse$inboundSchema = object({
  data: array(lazy(() => ListData$inboundSchema))
});
const ListEmbeddingsModelsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListEndpointsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  author: string(),
  slug: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListEndpointsResponse$inboundSchema = object({
  data: ListEndpointsResponse$inboundSchema$1
});
const ListEndpointsZdrRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListEndpointsZdrResponse$inboundSchema = object({
  data: array(PublicEndpoint$inboundSchema)
});
const ListGenerationContentRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListGuardrailKeyAssignmentsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  offset: nullable(int()).optional(),
  limit: int().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListGuardrailKeyAssignmentsResponse$inboundSchema = object({
  Result: ListKeyAssignmentsResponse$inboundSchema$1
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const ListGuardrailMemberAssignmentsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  offset: nullable(int()).optional(),
  limit: int().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListGuardrailMemberAssignmentsResponse$inboundSchema = object({
  Result: ListMemberAssignmentsResponse$inboundSchema$1
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const ListGuardrailsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  offset: nullable(int()).optional(),
  limit: int().optional(),
  workspaceId: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    workspaceId: "workspace_id"
  });
});
const ListGuardrailsResponse$inboundSchema = object({
  Result: ListGuardrailsResponse$inboundSchema$1
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const ListKeyAssignmentsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  offset: nullable(int()).optional(),
  limit: int().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListKeyAssignmentsResponse$inboundSchema = object({
  Result: ListKeyAssignmentsResponse$inboundSchema$1
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const ListMemberAssignmentsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  offset: nullable(int()).optional(),
  limit: int().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListMemberAssignmentsResponse$inboundSchema = object({
  Result: ListMemberAssignmentsResponse$inboundSchema$1
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const ListModelsCountRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  outputModalities: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    outputModalities: "output_modalities"
  });
});
object({
  bearer: string()
});
const ListModelsUserRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const Role = {
  OrgAdmin: "org:admin",
  OrgMember: "org:member"
};
const ListOrganizationMembersRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  offset: nullable(int()).optional(),
  limit: int().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const Role$inboundSchema = inboundSchema(Role);
const ListOrganizationMembersData$inboundSchema = object({
  email: string(),
  first_name: nullable(string()),
  id: string(),
  last_name: nullable(string()),
  role: Role$inboundSchema
}).transform((v) => {
  return remap(v, {
    "first_name": "firstName",
    "last_name": "lastName"
  });
});
const ListOrganizationMembersResponseBody$inboundSchema = object({
  data: array(lazy(() => ListOrganizationMembersData$inboundSchema)),
  total_count: int()
}).transform((v) => {
  return remap(v, {
    "total_count": "totalCount"
  });
});
const ListOrganizationMembersResponse$inboundSchema = object({
  Result: lazy(() => ListOrganizationMembersResponseBody$inboundSchema)
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const Datacenter = {
  Ad: "AD",
  Ae: "AE",
  Af: "AF",
  Ag: "AG",
  Ai: "AI",
  Al: "AL",
  Am: "AM",
  Ao: "AO",
  Aq: "AQ",
  Ar: "AR",
  As: "AS",
  At: "AT",
  Au: "AU",
  Aw: "AW",
  Ax: "AX",
  Az: "AZ",
  Ba: "BA",
  Bb: "BB",
  Bd: "BD",
  Be: "BE",
  Bf: "BF",
  Bg: "BG",
  Bh: "BH",
  Bi: "BI",
  Bj: "BJ",
  Bl: "BL",
  Bm: "BM",
  Bn: "BN",
  Bo: "BO",
  Bq: "BQ",
  Br: "BR",
  Bs: "BS",
  Bt: "BT",
  Bv: "BV",
  Bw: "BW",
  By: "BY",
  Bz: "BZ",
  Ca: "CA",
  Cc: "CC",
  Cd: "CD",
  Cf: "CF",
  Cg: "CG",
  Ch: "CH",
  Ci: "CI",
  Ck: "CK",
  Cl: "CL",
  Cm: "CM",
  Cn: "CN",
  Co: "CO",
  Cr: "CR",
  Cu: "CU",
  Cv: "CV",
  Cw: "CW",
  Cx: "CX",
  Cy: "CY",
  Cz: "CZ",
  De: "DE",
  Dj: "DJ",
  Dk: "DK",
  Dm: "DM",
  Do: "DO",
  Dz: "DZ",
  Ec: "EC",
  Ee: "EE",
  Eg: "EG",
  Eh: "EH",
  Er: "ER",
  Es: "ES",
  Et: "ET",
  Fi: "FI",
  Fj: "FJ",
  Fk: "FK",
  Fm: "FM",
  Fo: "FO",
  Fr: "FR",
  Ga: "GA",
  Gb: "GB",
  Gd: "GD",
  Ge: "GE",
  Gf: "GF",
  Gg: "GG",
  Gh: "GH",
  Gi: "GI",
  Gl: "GL",
  Gm: "GM",
  Gn: "GN",
  Gp: "GP",
  Gq: "GQ",
  Gr: "GR",
  Gs: "GS",
  Gt: "GT",
  Gu: "GU",
  Gw: "GW",
  Gy: "GY",
  Hk: "HK",
  Hm: "HM",
  Hn: "HN",
  Hr: "HR",
  Ht: "HT",
  Hu: "HU",
  Id: "ID",
  Ie: "IE",
  Il: "IL",
  Im: "IM",
  In: "IN",
  Io: "IO",
  Iq: "IQ",
  Ir: "IR",
  Is: "IS",
  It: "IT",
  Je: "JE",
  Jm: "JM",
  Jo: "JO",
  Jp: "JP",
  Ke: "KE",
  Kg: "KG",
  Kh: "KH",
  Ki: "KI",
  Km: "KM",
  Kn: "KN",
  Kp: "KP",
  Kr: "KR",
  Kw: "KW",
  Ky: "KY",
  Kz: "KZ",
  La: "LA",
  Lb: "LB",
  Lc: "LC",
  Li: "LI",
  Lk: "LK",
  Lr: "LR",
  Ls: "LS",
  Lt: "LT",
  Lu: "LU",
  Lv: "LV",
  Ly: "LY",
  Ma: "MA",
  Mc: "MC",
  Md: "MD",
  Me: "ME",
  Mf: "MF",
  Mg: "MG",
  Mh: "MH",
  Mk: "MK",
  Ml: "ML",
  Mm: "MM",
  Mn: "MN",
  Mo: "MO",
  Mp: "MP",
  Mq: "MQ",
  Mr: "MR",
  Ms: "MS",
  Mt: "MT",
  Mu: "MU",
  Mv: "MV",
  Mw: "MW",
  Mx: "MX",
  My: "MY",
  Mz: "MZ",
  Na: "NA",
  Nc: "NC",
  Ne: "NE",
  Nf: "NF",
  Ng: "NG",
  Ni: "NI",
  Nl: "NL",
  No: "NO",
  Np: "NP",
  Nr: "NR",
  Nu: "NU",
  Nz: "NZ",
  Om: "OM",
  Pa: "PA",
  Pe: "PE",
  Pf: "PF",
  Pg: "PG",
  Ph: "PH",
  Pk: "PK",
  Pl: "PL",
  Pm: "PM",
  Pn: "PN",
  Pr: "PR",
  Ps: "PS",
  Pt: "PT",
  Pw: "PW",
  Py: "PY",
  Qa: "QA",
  Re: "RE",
  Ro: "RO",
  Rs: "RS",
  Ru: "RU",
  Rw: "RW",
  Sa: "SA",
  Sb: "SB",
  Sc: "SC",
  Sd: "SD",
  Se: "SE",
  Sg: "SG",
  Sh: "SH",
  Si: "SI",
  Sj: "SJ",
  Sk: "SK",
  Sl: "SL",
  Sm: "SM",
  Sn: "SN",
  So: "SO",
  Sr: "SR",
  Ss: "SS",
  St: "ST",
  Sv: "SV",
  Sx: "SX",
  Sy: "SY",
  Sz: "SZ",
  Tc: "TC",
  Td: "TD",
  Tf: "TF",
  Tg: "TG",
  Th: "TH",
  Tj: "TJ",
  Tk: "TK",
  Tl: "TL",
  Tm: "TM",
  Tn: "TN",
  To: "TO",
  Tr: "TR",
  Tt: "TT",
  Tv: "TV",
  Tw: "TW",
  Tz: "TZ",
  Ua: "UA",
  Ug: "UG",
  Um: "UM",
  Us: "US",
  Uy: "UY",
  Uz: "UZ",
  Va: "VA",
  Vc: "VC",
  Ve: "VE",
  Vg: "VG",
  Vi: "VI",
  Vn: "VN",
  Vu: "VU",
  Wf: "WF",
  Ws: "WS",
  Ye: "YE",
  Yt: "YT",
  Za: "ZA",
  Zm: "ZM",
  Zw: "ZW"
};
const Headquarters = {
  Ad: "AD",
  Ae: "AE",
  Af: "AF",
  Ag: "AG",
  Ai: "AI",
  Al: "AL",
  Am: "AM",
  Ao: "AO",
  Aq: "AQ",
  Ar: "AR",
  As: "AS",
  At: "AT",
  Au: "AU",
  Aw: "AW",
  Ax: "AX",
  Az: "AZ",
  Ba: "BA",
  Bb: "BB",
  Bd: "BD",
  Be: "BE",
  Bf: "BF",
  Bg: "BG",
  Bh: "BH",
  Bi: "BI",
  Bj: "BJ",
  Bl: "BL",
  Bm: "BM",
  Bn: "BN",
  Bo: "BO",
  Bq: "BQ",
  Br: "BR",
  Bs: "BS",
  Bt: "BT",
  Bv: "BV",
  Bw: "BW",
  By: "BY",
  Bz: "BZ",
  Ca: "CA",
  Cc: "CC",
  Cd: "CD",
  Cf: "CF",
  Cg: "CG",
  Ch: "CH",
  Ci: "CI",
  Ck: "CK",
  Cl: "CL",
  Cm: "CM",
  Cn: "CN",
  Co: "CO",
  Cr: "CR",
  Cu: "CU",
  Cv: "CV",
  Cw: "CW",
  Cx: "CX",
  Cy: "CY",
  Cz: "CZ",
  De: "DE",
  Dj: "DJ",
  Dk: "DK",
  Dm: "DM",
  Do: "DO",
  Dz: "DZ",
  Ec: "EC",
  Ee: "EE",
  Eg: "EG",
  Eh: "EH",
  Er: "ER",
  Es: "ES",
  Et: "ET",
  Fi: "FI",
  Fj: "FJ",
  Fk: "FK",
  Fm: "FM",
  Fo: "FO",
  Fr: "FR",
  Ga: "GA",
  Gb: "GB",
  Gd: "GD",
  Ge: "GE",
  Gf: "GF",
  Gg: "GG",
  Gh: "GH",
  Gi: "GI",
  Gl: "GL",
  Gm: "GM",
  Gn: "GN",
  Gp: "GP",
  Gq: "GQ",
  Gr: "GR",
  Gs: "GS",
  Gt: "GT",
  Gu: "GU",
  Gw: "GW",
  Gy: "GY",
  Hk: "HK",
  Hm: "HM",
  Hn: "HN",
  Hr: "HR",
  Ht: "HT",
  Hu: "HU",
  Id: "ID",
  Ie: "IE",
  Il: "IL",
  Im: "IM",
  In: "IN",
  Io: "IO",
  Iq: "IQ",
  Ir: "IR",
  Is: "IS",
  It: "IT",
  Je: "JE",
  Jm: "JM",
  Jo: "JO",
  Jp: "JP",
  Ke: "KE",
  Kg: "KG",
  Kh: "KH",
  Ki: "KI",
  Km: "KM",
  Kn: "KN",
  Kp: "KP",
  Kr: "KR",
  Kw: "KW",
  Ky: "KY",
  Kz: "KZ",
  La: "LA",
  Lb: "LB",
  Lc: "LC",
  Li: "LI",
  Lk: "LK",
  Lr: "LR",
  Ls: "LS",
  Lt: "LT",
  Lu: "LU",
  Lv: "LV",
  Ly: "LY",
  Ma: "MA",
  Mc: "MC",
  Md: "MD",
  Me: "ME",
  Mf: "MF",
  Mg: "MG",
  Mh: "MH",
  Mk: "MK",
  Ml: "ML",
  Mm: "MM",
  Mn: "MN",
  Mo: "MO",
  Mp: "MP",
  Mq: "MQ",
  Mr: "MR",
  Ms: "MS",
  Mt: "MT",
  Mu: "MU",
  Mv: "MV",
  Mw: "MW",
  Mx: "MX",
  My: "MY",
  Mz: "MZ",
  Na: "NA",
  Nc: "NC",
  Ne: "NE",
  Nf: "NF",
  Ng: "NG",
  Ni: "NI",
  Nl: "NL",
  No: "NO",
  Np: "NP",
  Nr: "NR",
  Nu: "NU",
  Nz: "NZ",
  Om: "OM",
  Pa: "PA",
  Pe: "PE",
  Pf: "PF",
  Pg: "PG",
  Ph: "PH",
  Pk: "PK",
  Pl: "PL",
  Pm: "PM",
  Pn: "PN",
  Pr: "PR",
  Ps: "PS",
  Pt: "PT",
  Pw: "PW",
  Py: "PY",
  Qa: "QA",
  Re: "RE",
  Ro: "RO",
  Rs: "RS",
  Ru: "RU",
  Rw: "RW",
  Sa: "SA",
  Sb: "SB",
  Sc: "SC",
  Sd: "SD",
  Se: "SE",
  Sg: "SG",
  Sh: "SH",
  Si: "SI",
  Sj: "SJ",
  Sk: "SK",
  Sl: "SL",
  Sm: "SM",
  Sn: "SN",
  So: "SO",
  Sr: "SR",
  Ss: "SS",
  St: "ST",
  Sv: "SV",
  Sx: "SX",
  Sy: "SY",
  Sz: "SZ",
  Tc: "TC",
  Td: "TD",
  Tf: "TF",
  Tg: "TG",
  Th: "TH",
  Tj: "TJ",
  Tk: "TK",
  Tl: "TL",
  Tm: "TM",
  Tn: "TN",
  To: "TO",
  Tr: "TR",
  Tt: "TT",
  Tv: "TV",
  Tw: "TW",
  Tz: "TZ",
  Ua: "UA",
  Ug: "UG",
  Um: "UM",
  Us: "US",
  Uy: "UY",
  Uz: "UZ",
  Va: "VA",
  Vc: "VC",
  Ve: "VE",
  Vg: "VG",
  Vi: "VI",
  Vn: "VN",
  Vu: "VU",
  Wf: "WF",
  Ws: "WS",
  Ye: "YE",
  Yt: "YT",
  Za: "ZA",
  Zm: "ZM",
  Zw: "ZW"
};
const ListProvidersRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const Datacenter$inboundSchema = inboundSchema(Datacenter);
const Headquarters$inboundSchema = inboundSchema(Headquarters);
const ListProvidersData$inboundSchema = object({
  datacenters: nullable(array(Datacenter$inboundSchema)).optional(),
  headquarters: nullable(Headquarters$inboundSchema).optional(),
  name: string(),
  privacy_policy_url: nullable(string()),
  slug: string(),
  status_page_url: nullable(string()).optional(),
  terms_of_service_url: nullable(string()).optional()
}).transform((v) => {
  return remap(v, {
    "privacy_policy_url": "privacyPolicyUrl",
    "status_page_url": "statusPageUrl",
    "terms_of_service_url": "termsOfServiceUrl"
  });
});
const ListProvidersResponse$inboundSchema = object({
  data: array(lazy(() => ListProvidersData$inboundSchema))
});
const ListVideosContentRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  jobId: string(),
  index: nullable(int().default(0))
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListVideosModelsRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListWorkspacesRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  offset: nullable(int()).optional(),
  limit: int().optional()
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer"
  });
});
const ListWorkspacesResponse$inboundSchema = object({
  Result: ListWorkspacesResponse$inboundSchema$1
}).transform((v) => {
  return remap(v, {
    "Result": "result"
  });
});
const SendChatCompletionRequestRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  xOpenRouterExperimentalMetadata: MetadataLevel$outboundSchema.optional(),
  chatRequest: ChatRequest$outboundSchema
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    xOpenRouterExperimentalMetadata: "X-OpenRouter-Experimental-Metadata",
    chatRequest: "ChatRequest"
  });
});
const SendChatCompletionRequestResponse$inboundSchema = union([
  ChatResult$inboundSchema,
  custom$1((x) => x instanceof ReadableStream).transform((stream2) => {
    return new EventStream(stream2, (rawEvent) => {
      if (rawEvent.data === "[DONE]")
        return { done: true, value: void 0 };
      return {
        done: false,
        value: ChatStreamingResponse$inboundSchema.parse(rawEvent)?.data
      };
    });
  })
]);
const UpdateGuardrailRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  updateGuardrailRequest: UpdateGuardrailRequest$outboundSchema$1
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    updateGuardrailRequest: "UpdateGuardrailRequest"
  });
});
const UpdateKeysLimitReset$outboundSchema = outboundSchema();
const UpdateKeysRequestBody$outboundSchema = object({
  disabled: boolean$1().optional(),
  includeByokInLimit: boolean$1().optional(),
  limit: nullable(number()).optional(),
  limitReset: nullable(UpdateKeysLimitReset$outboundSchema).optional(),
  name: string().optional()
}).transform((v) => {
  return remap(v, {
    includeByokInLimit: "include_byok_in_limit",
    limitReset: "limit_reset"
  });
});
const UpdateKeysRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  hash: string(),
  requestBody: lazy(() => UpdateKeysRequestBody$outboundSchema)
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    requestBody: "RequestBody"
  });
});
const UpdateKeysData$inboundSchema = object({
  byok_usage: number(),
  byok_usage_daily: number(),
  byok_usage_monthly: number(),
  byok_usage_weekly: number(),
  created_at: string(),
  creator_user_id: nullable(string()),
  disabled: boolean$1(),
  expires_at: nullable(datetime({ offset: true }).transform((v) => new Date(v))).optional(),
  hash: string(),
  include_byok_in_limit: boolean$1(),
  label: string(),
  limit: nullable(number()),
  limit_remaining: nullable(number()),
  limit_reset: nullable(string()),
  name: string(),
  updated_at: nullable(string()),
  usage: number(),
  usage_daily: number(),
  usage_monthly: number(),
  usage_weekly: number(),
  workspace_id: string()
}).transform((v) => {
  return remap(v, {
    "byok_usage": "byokUsage",
    "byok_usage_daily": "byokUsageDaily",
    "byok_usage_monthly": "byokUsageMonthly",
    "byok_usage_weekly": "byokUsageWeekly",
    "created_at": "createdAt",
    "creator_user_id": "creatorUserId",
    "expires_at": "expiresAt",
    "include_byok_in_limit": "includeByokInLimit",
    "limit_remaining": "limitRemaining",
    "limit_reset": "limitReset",
    "updated_at": "updatedAt",
    "usage_daily": "usageDaily",
    "usage_monthly": "usageMonthly",
    "usage_weekly": "usageWeekly",
    "workspace_id": "workspaceId"
  });
});
const UpdateKeysResponse$inboundSchema = object({
  data: lazy(() => UpdateKeysData$inboundSchema)
});
const UpdateWorkspaceRequest$outboundSchema = object({
  httpReferer: string().optional(),
  appTitle: string().optional(),
  appCategories: string().optional(),
  id: string(),
  updateWorkspaceRequest: UpdateWorkspaceRequest$outboundSchema$1
}).transform((v) => {
  return remap(v, {
    httpReferer: "HTTP-Referer",
    updateWorkspaceRequest: "UpdateWorkspaceRequest"
  });
});
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _APIPromise_promise, _APIPromise_unwrapped, _a;
class APIPromise {
  constructor(p) {
    _APIPromise_promise.set(this, void 0);
    _APIPromise_unwrapped.set(this, void 0);
    this[_a] = "APIPromise";
    __classPrivateFieldSet(this, _APIPromise_promise, p instanceof Promise ? p : Promise.resolve(p), "f");
    __classPrivateFieldSet(this, _APIPromise_unwrapped, p instanceof Promise ? __classPrivateFieldGet(this, _APIPromise_promise, "f").then(([value]) => value) : Promise.resolve(p[0]), "f");
  }
  then(onfulfilled, onrejected) {
    return __classPrivateFieldGet(this, _APIPromise_promise, "f").then(onfulfilled ? ([value]) => onfulfilled(value) : void 0, onrejected);
  }
  catch(onrejected) {
    return __classPrivateFieldGet(this, _APIPromise_unwrapped, "f").catch(onrejected);
  }
  finally(onfinally) {
    return __classPrivateFieldGet(this, _APIPromise_unwrapped, "f").finally(onfinally);
  }
  $inspect() {
    return __classPrivateFieldGet(this, _APIPromise_promise, "f");
  }
}
_APIPromise_promise = /* @__PURE__ */ new WeakMap(), _APIPromise_unwrapped = /* @__PURE__ */ new WeakMap(), _a = Symbol.toStringTag;
function analyticsGetUserActivity(client, request, options) {
  return new APIPromise($do$N(client, request, options));
}
async function $do$N(client, request, options) {
  const parsed = safeParse(request, (value) => GetUserActivityRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/activity")();
  const query = encodeFormQuery({
    "api_key_hash": payload?.api_key_hash,
    "date": payload?.date,
    "user_id": payload?.user_id
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getUserActivity",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ActivityResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Analytics extends ClientSDK {
  /**
   * Get user activity grouped by endpoint
   *
   * @remarks
   * Returns user activity data grouped by endpoint for the last 30 (completed) UTC days. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async getUserActivity(request, options) {
    return unwrapAsync(analyticsGetUserActivity(this, request, options));
  }
}
function apiKeysCreate(client, request, options) {
  return new APIPromise($do$M(client, request, options));
}
async function $do$M(client, request, options) {
  const parsed = safeParse(request, (value) => CreateKeysRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });
  const path = pathToFunc("/keys")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createKeys",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "429", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(201, CreateKeysResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function apiKeysDelete(client, request, options) {
  return new APIPromise($do$L(client, request, options));
}
async function $do$L(client, request, options) {
  const parsed = safeParse(request, (value) => DeleteKeysRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    hash: encodeSimple("hash", payload.hash, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/keys/{hash}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "deleteKeys",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "DELETE",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "429", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, DeleteKeysResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function apiKeysGet(client, request, options) {
  return new APIPromise($do$K(client, request, options));
}
async function $do$K(client, request, options) {
  const parsed = safeParse(request, (value) => GetKeyRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    hash: encodeSimple("hash", payload.hash, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/keys/{hash}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getKey",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "429", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GetKeyResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function apiKeysGetCurrentKeyMetadata(client, request, options) {
  return new APIPromise($do$J(client, request, options));
}
async function $do$J(client, request, options) {
  const parsed = safeParse(request, (value) => GetCurrentKeyRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/key")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getCurrentKey",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GetCurrentKeyResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function apiKeysList(client, request, options) {
  return new APIPromise($do$I(client, request, options));
}
async function $do$I(client, request, options) {
  const parsed = safeParse(request, (value) => ListRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/keys")();
  const query = encodeFormQuery({
    "include_disabled": payload?.include_disabled,
    "offset": payload?.offset,
    "workspace_id": payload?.workspace_id
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "list",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "429", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ListResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function apiKeysUpdate(client, request, options) {
  return new APIPromise($do$H(client, request, options));
}
async function $do$H(client, request, options) {
  const parsed = safeParse(request, (value) => UpdateKeysRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });
  const pathParams = {
    hash: encodeSimple("hash", payload.hash, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/keys/{hash}")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "updateKeys",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "PATCH",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "429", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, UpdateKeysResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class APIKeys extends ClientSDK {
  /**
   * Get current API key
   *
   * @remarks
   * Get information on the API key associated with the current authentication session
   */
  async getCurrentKeyMetadata(request, options) {
    return unwrapAsync(apiKeysGetCurrentKeyMetadata(this, request, options));
  }
  /**
   * List API keys
   *
   * @remarks
   * List all API keys for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async list(request, options) {
    return unwrapAsync(apiKeysList(this, request, options));
  }
  /**
   * Create a new API key
   *
   * @remarks
   * Create a new API key for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async create(request, options) {
    return unwrapAsync(apiKeysCreate(this, request, options));
  }
  /**
   * Delete an API key
   *
   * @remarks
   * Delete an existing API key. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async delete(request, options) {
    return unwrapAsync(apiKeysDelete(this, request, options));
  }
  /**
   * Get a single API key
   *
   * @remarks
   * Get a single API key by hash. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async get(request, options) {
    return unwrapAsync(apiKeysGet(this, request, options));
  }
  /**
   * Update an API key
   *
   * @remarks
   * Update an existing API key. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async update(request, options) {
    return unwrapAsync(apiKeysUpdate(this, request, options));
  }
}
function betaResponsesSend(client, request, options) {
  return new APIPromise($do$G(client, request, options));
}
async function $do$G(client, request, options) {
  const parsed = safeParse(request, (value) => CreateResponsesRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.ResponsesRequest, { explode: true });
  const path = pathToFunc("/responses")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: request?.responsesRequest?.stream ? "text/event-stream" : "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Experimental-Metadata": encodeSimple("X-OpenRouter-Experimental-Metadata", payload["X-OpenRouter-Experimental-Metadata"], { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createResponses",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "402",
      "404",
      "408",
      "413",
      "422",
      "429",
      "4XX",
      "500",
      "502",
      "503",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, CreateResponsesResponse$inboundSchema), sse(200, CreateResponsesResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(408, RequestTimeoutResponseError$inboundSchema), jsonErr(413, PayloadTooLargeResponseError$inboundSchema), jsonErr(422, UnprocessableEntityResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(503, ServiceUnavailableResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Responses extends ClientSDK {
  async send(request, options) {
    return unwrapAsync(betaResponsesSend(this, request, options));
  }
}
class Beta extends ClientSDK {
  get responses() {
    return this._responses ?? (this._responses = new Responses(this._options));
  }
}
function chatSend(client, request, options) {
  return new APIPromise($do$F(client, request, options));
}
async function $do$F(client, request, options) {
  const parsed = safeParse(request, (value) => SendChatCompletionRequestRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.ChatRequest, { explode: true });
  const path = pathToFunc("/chat/completions")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: request?.chatRequest?.stream ? "text/event-stream" : "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Experimental-Metadata": encodeSimple("X-OpenRouter-Experimental-Metadata", payload["X-OpenRouter-Experimental-Metadata"], { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "sendChatCompletionRequest",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "402",
      "403",
      "404",
      "408",
      "413",
      "422",
      "429",
      "4XX",
      "500",
      "502",
      "503",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, SendChatCompletionRequestResponse$inboundSchema), sse(200, SendChatCompletionRequestResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(408, RequestTimeoutResponseError$inboundSchema), jsonErr(413, PayloadTooLargeResponseError$inboundSchema), jsonErr(422, UnprocessableEntityResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(503, ServiceUnavailableResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Chat extends ClientSDK {
  async send(request, options) {
    return unwrapAsync(chatSend(this, request, options));
  }
}
function creditsGetCredits(client, request, options) {
  return new APIPromise($do$E(client, request, options));
}
async function $do$E(client, request, options) {
  const parsed = safeParse(request, (value) => GetCreditsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/credits")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getCredits",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "403", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GetCreditsResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Credits extends ClientSDK {
  /**
   * Get remaining credits
   *
   * @remarks
   * Get total credits purchased and used for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async getCredits(request, options) {
    return unwrapAsync(creditsGetCredits(this, request, options));
  }
}
function embeddingsGenerate(client, request, options) {
  return new APIPromise($do$D(client, request, options));
}
async function $do$D(client, request, options) {
  const parsed = safeParse(request, (value) => CreateEmbeddingsRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });
  const path = pathToFunc("/embeddings")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json;q=1, text/event-stream;q=0",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createEmbeddings",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "402",
      "404",
      "429",
      "4XX",
      "500",
      "502",
      "503",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, CreateEmbeddingsResponse$inboundSchema), text(200, CreateEmbeddingsResponse$inboundSchema, {
    ctype: "text/event-stream"
  }), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(503, ServiceUnavailableResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function embeddingsListModels(client, request, options) {
  return new APIPromise($do$C(client, request, options));
}
async function $do$C(client, request, options) {
  const parsed = safeParse(request, (value) => ListEmbeddingsModelsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/embeddings/models")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listEmbeddingsModels",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ModelsListResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Embeddings extends ClientSDK {
  /**
   * Submit an embedding request
   *
   * @remarks
   * Submits an embedding request to the embeddings router
   */
  async generate(request, options) {
    return unwrapAsync(embeddingsGenerate(this, request, options));
  }
  /**
   * List all embeddings models
   *
   * @remarks
   * Returns a list of all available embeddings models and their properties
   */
  async listModels(request, options) {
    return unwrapAsync(embeddingsListModels(this, request, options));
  }
}
function endpointsList(client, request, options) {
  return new APIPromise($do$B(client, request, options));
}
async function $do$B(client, request, options) {
  const parsed = safeParse(request, (value) => ListEndpointsRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    author: encodeSimple("author", payload.author, {
      explode: false,
      charEncoding: "percent"
    }),
    slug: encodeSimple("slug", payload.slug, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/models/{author}/{slug}/endpoints")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listEndpoints",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ListEndpointsResponse$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function endpointsListZdrEndpoints(client, request, options) {
  return new APIPromise($do$A(client, request, options));
}
async function $do$A(client, request, options) {
  const parsed = safeParse(request, (value) => ListEndpointsZdrRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/endpoints/zdr")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listEndpointsZdr",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ListEndpointsZdrResponse$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Endpoints extends ClientSDK {
  /**
   * Preview the impact of ZDR on the available endpoints
   */
  async listZdrEndpoints(request, options) {
    return unwrapAsync(endpointsListZdrEndpoints(this, request, options));
  }
  /**
   * List all endpoints for a model
   */
  async list(request, options) {
    return unwrapAsync(endpointsList(this, request, options));
  }
}
function generationsGetGeneration(client, request, options) {
  return new APIPromise($do$z(client, request, options));
}
async function $do$z(client, request, options) {
  const parsed = safeParse(request, (value) => GetGenerationRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/generation")();
  const query = encodeFormQuery({
    "id": payload.id
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getGeneration",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "401",
      "402",
      "404",
      "429",
      "4XX",
      "500",
      "502",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GenerationResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function generationsListGenerationContent(client, request, options) {
  return new APIPromise($do$y(client, request, options));
}
async function $do$y(client, request, options) {
  const parsed = safeParse(request, (value) => ListGenerationContentRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/generation/content")();
  const query = encodeFormQuery({
    "id": payload.id
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listGenerationContent",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "401",
      "403",
      "404",
      "429",
      "4XX",
      "500",
      "502",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GenerationContentResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Generations extends ClientSDK {
  /**
   * Get request & usage metadata for a generation
   */
  async getGeneration(request, options) {
    return unwrapAsync(generationsGetGeneration(this, request, options));
  }
  /**
   * Get stored prompt and completion content for a generation
   */
  async listGenerationContent(request, options) {
    return unwrapAsync(generationsListGenerationContent(this, request, options));
  }
}
function guardrailsBulkAssignKeys(client, request, options) {
  return new APIPromise($do$x(client, request, options));
}
async function $do$x(client, request, options) {
  const parsed = safeParse(request, (value) => BulkAssignKeysToGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.BulkAssignKeysRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}/assignments/keys")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "bulkAssignKeysToGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, BulkAssignKeysResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function guardrailsBulkAssignMembers(client, request, options) {
  return new APIPromise($do$w(client, request, options));
}
async function $do$w(client, request, options) {
  const parsed = safeParse(request, (value) => BulkAssignMembersToGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.BulkAssignMembersRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}/assignments/members")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "bulkAssignMembersToGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, BulkAssignMembersResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function guardrailsBulkUnassignKeys(client, request, options) {
  return new APIPromise($do$v(client, request, options));
}
async function $do$v(client, request, options) {
  const parsed = safeParse(request, (value) => BulkUnassignKeysFromGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.BulkUnassignKeysRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}/assignments/keys/remove")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "bulkUnassignKeysFromGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, BulkUnassignKeysResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function guardrailsBulkUnassignMembers(client, request, options) {
  return new APIPromise($do$u(client, request, options));
}
async function $do$u(client, request, options) {
  const parsed = safeParse(request, (value) => BulkUnassignMembersFromGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.BulkUnassignMembersRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}/assignments/members/remove")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "bulkUnassignMembersFromGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, BulkUnassignMembersResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function guardrailsCreate(client, request, options) {
  return new APIPromise($do$t(client, request, options));
}
async function $do$t(client, request, options) {
  const parsed = safeParse(request, (value) => CreateGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.CreateGuardrailRequest, {
    explode: true
  });
  const path = pathToFunc("/guardrails")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(201, CreateGuardrailResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function guardrailsDelete(client, request, options) {
  return new APIPromise($do$s(client, request, options));
}
async function $do$s(client, request, options) {
  const parsed = safeParse(request, (value) => DeleteGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "deleteGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "DELETE",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, DeleteGuardrailResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function guardrailsGet(client, request, options) {
  return new APIPromise($do$r(client, request, options));
}
async function $do$r(client, request, options) {
  const parsed = safeParse(request, (value) => GetGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GetGuardrailResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function createPageIterator(page, halt) {
  return {
    [Symbol.asyncIterator]: async function* paginator() {
      yield page;
      if (halt(page)) {
        return;
      }
      let p = page;
      for (p = await p.next(); p != null; p = await p.next()) {
        yield p;
        if (halt(p)) {
          return;
        }
      }
    }
  };
}
function haltIterator(v) {
  return {
    ...v,
    next: () => null,
    [Symbol.asyncIterator]: async function* paginator() {
      yield v;
    }
  };
}
async function unwrapResultIterator(iteratorPromise) {
  const resultIter = await iteratorPromise;
  if (!resultIter.ok) {
    throw resultIter.error;
  }
  return {
    ...resultIter.value,
    next: unwrapPaginator(resultIter.next),
    "~next": resultIter["~next"],
    [Symbol.asyncIterator]: async function* paginator() {
      for await (const page of resultIter) {
        if (!page.ok) {
          throw page.error;
        }
        yield page.value;
      }
    }
  };
}
function unwrapPaginator(paginator) {
  return () => {
    const nextResult = paginator();
    if (nextResult == null) {
      return null;
    }
    return nextResult.then((res) => {
      if (!res.ok) {
        throw res.error;
      }
      const out = {
        ...res.value,
        next: unwrapPaginator(res.next)
      };
      return out;
    });
  };
}
function guardrailsList(client, request, options) {
  return new APIPromise($do$q(client, request, options));
}
async function $do$q(client, request, options) {
  const parsed = safeParse(request, (value) => ListGuardrailsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/guardrails")();
  const query = encodeFormQuery({
    "limit": payload?.limit,
    "offset": payload?.offset,
    "workspace_id": payload?.workspace_id
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listGuardrails",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListGuardrailsResponse$inboundSchema, {
    key: "Result"
  }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => guardrailsList(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
function guardrailsListGuardrailKeyAssignments(client, request, options) {
  return new APIPromise($do$p(client, request, options));
}
async function $do$p(client, request, options) {
  const parsed = safeParse(request, (value) => ListGuardrailKeyAssignmentsRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}/assignments/keys")(pathParams);
  const query = encodeFormQuery({
    "limit": payload.limit,
    "offset": payload.offset
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listGuardrailKeyAssignments",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListGuardrailKeyAssignmentsResponse$inboundSchema, {
    key: "Result"
  }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => guardrailsListGuardrailKeyAssignments(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
function guardrailsListGuardrailMemberAssignments(client, request, options) {
  return new APIPromise($do$o(client, request, options));
}
async function $do$o(client, request, options) {
  const parsed = safeParse(request, (value) => ListGuardrailMemberAssignmentsRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}/assignments/members")(pathParams);
  const query = encodeFormQuery({
    "limit": payload.limit,
    "offset": payload.offset
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listGuardrailMemberAssignments",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListGuardrailMemberAssignmentsResponse$inboundSchema, { key: "Result" }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => guardrailsListGuardrailMemberAssignments(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
function guardrailsListKeyAssignments(client, request, options) {
  return new APIPromise($do$n(client, request, options));
}
async function $do$n(client, request, options) {
  const parsed = safeParse(request, (value) => ListKeyAssignmentsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/guardrails/assignments/keys")();
  const query = encodeFormQuery({
    "limit": payload?.limit,
    "offset": payload?.offset
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listKeyAssignments",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListKeyAssignmentsResponse$inboundSchema, {
    key: "Result"
  }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => guardrailsListKeyAssignments(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
function guardrailsListMemberAssignments(client, request, options) {
  return new APIPromise($do$m(client, request, options));
}
async function $do$m(client, request, options) {
  const parsed = safeParse(request, (value) => ListMemberAssignmentsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/guardrails/assignments/members")();
  const query = encodeFormQuery({
    "limit": payload?.limit,
    "offset": payload?.offset
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listMemberAssignments",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListMemberAssignmentsResponse$inboundSchema, {
    key: "Result"
  }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => guardrailsListMemberAssignments(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
function guardrailsUpdate(client, request, options) {
  return new APIPromise($do$l(client, request, options));
}
async function $do$l(client, request, options) {
  const parsed = safeParse(request, (value) => UpdateGuardrailRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.UpdateGuardrailRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/guardrails/{id}")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "updateGuardrail",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "PATCH",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, UpdateGuardrailResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Guardrails extends ClientSDK {
  /**
   * List guardrails
   *
   * @remarks
   * List all guardrails for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async list(request, options) {
    return unwrapResultIterator(guardrailsList(this, request, options));
  }
  /**
   * Create a guardrail
   *
   * @remarks
   * Create a new guardrail for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async create(request, options) {
    return unwrapAsync(guardrailsCreate(this, request, options));
  }
  /**
   * Delete a guardrail
   *
   * @remarks
   * Delete an existing guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async delete(request, options) {
    return unwrapAsync(guardrailsDelete(this, request, options));
  }
  /**
   * Get a guardrail
   *
   * @remarks
   * Get a single guardrail by ID. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async get(request, options) {
    return unwrapAsync(guardrailsGet(this, request, options));
  }
  /**
   * Update a guardrail
   *
   * @remarks
   * Update an existing guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async update(request, options) {
    return unwrapAsync(guardrailsUpdate(this, request, options));
  }
  /**
   * List key assignments for a guardrail
   *
   * @remarks
   * List all API key assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async listGuardrailKeyAssignments(request, options) {
    return unwrapResultIterator(guardrailsListGuardrailKeyAssignments(this, request, options));
  }
  /**
   * Bulk assign keys to a guardrail
   *
   * @remarks
   * Assign multiple API keys to a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async bulkAssignKeys(request, options) {
    return unwrapAsync(guardrailsBulkAssignKeys(this, request, options));
  }
  /**
   * Bulk unassign keys from a guardrail
   *
   * @remarks
   * Unassign multiple API keys from a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async bulkUnassignKeys(request, options) {
    return unwrapAsync(guardrailsBulkUnassignKeys(this, request, options));
  }
  /**
   * List member assignments for a guardrail
   *
   * @remarks
   * List all organization member assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async listGuardrailMemberAssignments(request, options) {
    return unwrapResultIterator(guardrailsListGuardrailMemberAssignments(this, request, options));
  }
  /**
   * Bulk assign members to a guardrail
   *
   * @remarks
   * Assign multiple organization members to a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async bulkAssignMembers(request, options) {
    return unwrapAsync(guardrailsBulkAssignMembers(this, request, options));
  }
  /**
   * Bulk unassign members from a guardrail
   *
   * @remarks
   * Unassign multiple organization members from a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async bulkUnassignMembers(request, options) {
    return unwrapAsync(guardrailsBulkUnassignMembers(this, request, options));
  }
  /**
   * List all key assignments
   *
   * @remarks
   * List all API key guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async listKeyAssignments(request, options) {
    return unwrapResultIterator(guardrailsListKeyAssignments(this, request, options));
  }
  /**
   * List all member assignments
   *
   * @remarks
   * List all organization member guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async listMemberAssignments(request, options) {
    return unwrapResultIterator(guardrailsListMemberAssignments(this, request, options));
  }
}
function modelsCount(client, request, options) {
  return new APIPromise($do$k(client, request, options));
}
async function $do$k(client, request, options) {
  const parsed = safeParse(request, (value) => ListModelsCountRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/models/count")();
  const query = encodeFormQuery({
    "output_modalities": payload?.output_modalities
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listModelsCount",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ModelsCountResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function modelsList(client, request, options) {
  return new APIPromise($do$j(client, request, options));
}
async function $do$j(client, request, options) {
  const parsed = safeParse(request, (value) => GetModelsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/models")();
  const query = encodeFormQuery({
    "category": payload?.category,
    "output_modalities": payload?.output_modalities,
    "supported_parameters": payload?.supported_parameters
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getModels",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ModelsListResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function modelsListForUser(client, security, request, options) {
  return new APIPromise($do$i(client, security, request, options));
}
async function $do$i(client, security, request, options) {
  const parsed = safeParse(request, (value) => ListModelsUserRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/models/user")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const requestSecurity = resolveSecurity([
    {
      fieldName: "Authorization",
      type: "http:bearer",
      value: security?.bearer
    }
  ]);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listModelsUser",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: security,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ModelsListResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Models extends ClientSDK {
  /**
   * List all models and their properties
   */
  async list(request, options) {
    return unwrapAsync(modelsList(this, request, options));
  }
  /**
   * Get total count of available models
   */
  async count(request, options) {
    return unwrapAsync(modelsCount(this, request, options));
  }
  /**
   * List models filtered by user provider preferences, privacy settings, and guardrails
   *
   * @remarks
   * List models filtered by user provider preferences, [privacy settings](https://openrouter.ai/docs/guides/privacy/provider-logging), and [guardrails](https://openrouter.ai/docs/guides/features/guardrails). If requesting through `eu.openrouter.ai/api/v1/...` the results will be filtered to models that satisfy [EU in-region routing](https://openrouter.ai/docs/guides/privacy/provider-logging#enterprise-eu-in-region-routing).
   */
  async listForUser(security, request, options) {
    return unwrapAsync(modelsListForUser(this, security, request, options));
  }
}
function oAuthCreateAuthCode(client, request, options) {
  return new APIPromise($do$h(client, request, options));
}
async function $do$h(client, request, options) {
  const parsed = safeParse(request, (value) => CreateAuthKeysCodeRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });
  const path = pathToFunc("/auth/keys/code")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createAuthKeysCode",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "409", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, CreateAuthKeysCodeResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(409, ConflictResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function oAuthExchangeAuthCodeForAPIKey(client, request, options) {
  return new APIPromise($do$g(client, request, options));
}
async function $do$g(client, request, options) {
  const parsed = safeParse(request, (value) => ExchangeAuthCodeForAPIKeyRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });
  const path = pathToFunc("/auth/keys")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "exchangeAuthCodeForAPIKey",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "403", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ExchangeAuthCodeForAPIKeyResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array2, separator = " | ") {
    return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
const quotelessJson = (obj) => {
  const json2 = JSON.stringify(obj, null, 2);
  return json2.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue2) {
      return issue2.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue2 of error.issues) {
        if (issue2.code === "invalid_union") {
          issue2.unionErrors.map(processError);
        } else if (issue2.code === "invalid_return_type") {
          processError(issue2.returnTypeError);
        } else if (issue2.code === "invalid_arguments") {
          processError(issue2.argumentsError);
        } else if (issue2.path.length === 0) {
          fieldErrors._errors.push(mapper(issue2));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue2.path.length) {
            const el = issue2.path[i];
            const terminal = i === issue2.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue2));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue2) => issue2.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue2, _ctx) => {
  let message;
  switch (issue2.code) {
    case ZodIssueCode.invalid_type:
      if (issue2.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue2.expected}, received ${issue2.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue2.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue2.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue2.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue2.options)}, received '${issue2.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue2.validation === "object") {
        if ("includes" in issue2.validation) {
          message = `Invalid input: must include "${issue2.validation.includes}"`;
          if (typeof issue2.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue2.validation.position}`;
          }
        } else if ("startsWith" in issue2.validation) {
          message = `Invalid input: must start with "${issue2.validation.startsWith}"`;
        } else if ("endsWith" in issue2.validation) {
          message = `Invalid input: must end with "${issue2.validation.endsWith}"`;
        } else {
          util.assertNever(issue2.validation);
        }
      } else if (issue2.validation !== "regex") {
        message = `Invalid ${issue2.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue2.type === "array")
        message = `Array must contain ${issue2.exact ? "exactly" : issue2.inclusive ? `at least` : `more than`} ${issue2.minimum} element(s)`;
      else if (issue2.type === "string")
        message = `String must contain ${issue2.exact ? "exactly" : issue2.inclusive ? `at least` : `over`} ${issue2.minimum} character(s)`;
      else if (issue2.type === "number")
        message = `Number must be ${issue2.exact ? `exactly equal to ` : issue2.inclusive ? `greater than or equal to ` : `greater than `}${issue2.minimum}`;
      else if (issue2.type === "bigint")
        message = `Number must be ${issue2.exact ? `exactly equal to ` : issue2.inclusive ? `greater than or equal to ` : `greater than `}${issue2.minimum}`;
      else if (issue2.type === "date")
        message = `Date must be ${issue2.exact ? `exactly equal to ` : issue2.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue2.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue2.type === "array")
        message = `Array must contain ${issue2.exact ? `exactly` : issue2.inclusive ? `at most` : `less than`} ${issue2.maximum} element(s)`;
      else if (issue2.type === "string")
        message = `String must contain ${issue2.exact ? `exactly` : issue2.inclusive ? `at most` : `under`} ${issue2.maximum} character(s)`;
      else if (issue2.type === "number")
        message = `Number must be ${issue2.exact ? `exactly` : issue2.inclusive ? `less than or equal to` : `less than`} ${issue2.maximum}`;
      else if (issue2.type === "bigint")
        message = `BigInt must be ${issue2.exact ? `exactly` : issue2.inclusive ? `less than or equal to` : `less than`} ${issue2.maximum}`;
      else if (issue2.type === "date")
        message = `Date must be ${issue2.exact ? `exactly` : issue2.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue2.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue2.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue2);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue2 = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue2);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check2, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check2(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check2, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check2(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform2) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform: transform2 }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base642 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base642));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        if (input.data.length < check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check2.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        if (input.data.length > check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check2.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "length") {
        const tooBig = input.data.length > check2.value;
        const tooSmall = input.data.length < check2.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check2.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check2.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check2.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check2.message
            });
          }
          status.dirty();
        }
      } else if (check2.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "regex") {
        check2.regex.lastIndex = 0;
        const testResult = check2.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "trim") {
        input.data = input.data.trim();
      } else if (check2.kind === "includes") {
        if (!input.data.includes(check2.value, check2.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check2.value, position: check2.position },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check2.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check2.kind === "startsWith") {
        if (!input.data.startsWith(check2.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check2.value },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "endsWith") {
        if (!input.data.endsWith(check2.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check2.value },
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "datetime") {
        const regex = datetimeRegex(check2);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "time") {
        const regex = timeRegex(check2);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "ip") {
        if (!isValidIP(input.data, check2.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "jwt") {
        if (!isValidJWT(input.data, check2.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "cidr") {
        if (!isValidCidr(input.data, check2.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check2) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check2 of this._def.checks) {
      if (check2.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "min") {
        const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check2.value,
            type: "number",
            inclusive: check2.inclusive,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check2.value,
            type: "number",
            inclusive: check2.inclusive,
            exact: false,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check2.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check2.value,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        const tooSmall = check2.inclusive ? input.data < check2.value : input.data <= check2.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check2.value,
            inclusive: check2.inclusive,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        const tooBig = check2.inclusive ? input.data > check2.value : input.data >= check2.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check2.value,
            inclusive: check2.inclusive,
            message: check2.message
          });
          status.dirty();
        }
      } else if (check2.kind === "multipleOf") {
        if (input.data % check2.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check2.value,
            message: check2.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check2 of this._def.checks) {
      if (check2.kind === "min") {
        if (input.data.getTime() < check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check2.message,
            inclusive: true,
            exact: false,
            minimum: check2.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check2.kind === "max") {
        if (input.data.getTime() > check2.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check2.message,
            inclusive: true,
            exact: false,
            maximum: check2.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check2);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check2) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue2, ctx) => {
          const defaultError = this._def.errorMap?.(issue2, ctx).message ?? ctx.defaultError;
          if (issue2.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
const getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
const BRAND = /* @__PURE__ */ Symbol("zod_brand");
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check2, _params = {}, fatal) {
  if (check2)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check2(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
const late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
const NEVER = INVALID;
const z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BRAND,
  DIRTY,
  EMPTY_PATH,
  INVALID,
  NEVER,
  OK,
  ParseStatus,
  Schema: ZodType,
  ZodAny,
  ZodArray,
  ZodBigInt,
  ZodBoolean,
  ZodBranded,
  ZodCatch,
  ZodDate,
  ZodDefault,
  ZodDiscriminatedUnion,
  ZodEffects,
  ZodEnum,
  ZodError,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  ZodFunction,
  ZodIntersection,
  ZodIssueCode,
  ZodLazy,
  ZodLiteral,
  ZodMap,
  ZodNaN,
  ZodNativeEnum,
  ZodNever,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodParsedType,
  ZodPipeline,
  ZodPromise,
  ZodReadonly,
  ZodRecord,
  ZodSchema: ZodType,
  ZodSet,
  ZodString,
  ZodSymbol,
  ZodTransformer: ZodEffects,
  ZodTuple,
  ZodType,
  ZodUndefined,
  ZodUnion,
  ZodUnknown,
  ZodVoid,
  addIssueToContext,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  coerce,
  custom,
  date: dateType,
  datetimeRegex,
  defaultErrorMap: errorMap,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  enum: enumType,
  function: functionType,
  getErrorMap,
  getParsedType,
  instanceof: instanceOfType,
  intersection: intersectionType,
  isAborted,
  isAsync,
  isDirty,
  isValid,
  late,
  lazy: lazyType,
  literal: literalType,
  makeIssue,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  null: nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  get objectUtil() {
    return objectUtil;
  },
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  quotelessJson,
  record: recordType,
  set: setType,
  setErrorMap,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  undefined: undefinedType,
  union: unionType,
  unknown: unknownType,
  get util() {
    return util;
  },
  void: voidType
}, Symbol.toStringTag, { value: "Module" }));
const CreateAuthorizationUrlBaseSchema = z.object({
  callbackUrl: z.union([
    z.string().url(),
    z.instanceof(URL)
  ]),
  limit: z.number().optional()
});
const CreateAuthorizationurlParamsSchema = z.union([
  CreateAuthorizationUrlBaseSchema.extend({
    codeChallengeMethod: z.enum([
      "S256",
      "plain"
    ]),
    codeChallenge: z.string()
  }),
  CreateAuthorizationUrlBaseSchema
]);
function oAuthCreateAuthorizationUrl(client, params) {
  const parsedParams = CreateAuthorizationurlParamsSchema.safeParse(params);
  if (!parsedParams.success) {
    return {
      ok: false,
      error: parsedParams.error
    };
  }
  const baseURL = serverURLFromOptions(client._options);
  if (!baseURL) {
    return {
      ok: false,
      error: new Error("No server URL configured")
    };
  }
  const authURL = new URL("/auth", baseURL);
  authURL.searchParams.set("callback_url", parsedParams.data.callbackUrl.toString());
  if ("codeChallengeMethod" in parsedParams.data) {
    authURL.searchParams.set("code_challenge", parsedParams.data.codeChallenge);
    authURL.searchParams.set("code_challenge_method", parsedParams.data.codeChallengeMethod);
  }
  if (parsedParams.data.limit !== void 0) {
    authURL.searchParams.set("limit", parsedParams.data.limit.toString());
  }
  return {
    ok: true,
    value: authURL.toString()
  };
}
const CreateSHA256CodeChallengeRequestSchema = z.object({
  /**
   * If not provided, a random code verifier will be generated.
   * If provided, must be 43-128 characters and contain only unreserved
   * characters [A-Za-z0-9-._~] per RFC 7636.
   */
  codeVerifier: z.string().min(43, "Code verifier must be at least 43 characters").max(128, "Code verifier must be at most 128 characters").regex(/^[A-Za-z0-9\-._~]+$/, "Code verifier must only contain unreserved characters: [A-Za-z0-9-._~]").optional()
});
function arrayBufferToBase64Url(buffer) {
  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function generateCodeVerifier() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return arrayBufferToBase64Url(randomBytes);
}
async function oAuthCreateSHA256CodeChallenge(params = {}) {
  const parsedParams = CreateSHA256CodeChallengeRequestSchema.safeParse(params);
  if (!parsedParams.success) {
    return {
      ok: false,
      error: parsedParams.error
    };
  }
  const { codeVerifier = generateCodeVerifier() } = parsedParams.data;
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = new Uint8Array(hash);
  const codeChallenge = arrayBufferToBase64Url(hashArray);
  return {
    ok: true,
    value: {
      codeChallenge,
      codeVerifier
    }
  };
}
class OAuth extends ClientSDK {
  // #region sdk-class-body
  /**
   * Generate a OAuth2 authorization URL
   *
   * @remarks
   * Generates a URL to redirect users to for authorizing your application. The
   * URL includes the provided callback URL and, if applicable, the code
   * challenge parameters for PKCE.
   *
   * @see {@link https://openrouter.ai/docs/use-cases/oauth-pkce}
   */
  async createAuthorizationUrl(request) {
    const result = oAuthCreateAuthorizationUrl(this, request);
    if (!result.ok) {
      throw result.error;
    }
    return result.value;
  }
  /**
   * Generate a SHA-256 code challenge for PKCE
   *
   * @remarks
   * Generates a SHA-256 code challenge and corresponding code verifier for use
   * in the PKCE extension to OAuth2. If no code verifier is provided, a random
   * one will be generated according to RFC 7636 (32 random bytes, base64url
   * encoded). If a code verifier is provided, it must be 43-128 characters and
   * contain only unreserved characters [A-Za-z0-9-._~].
   *
   * @see {@link https://openrouter.ai/docs/use-cases/oauth-pkce}
   * @see {@link https://datatracker.ietf.org/doc/html/rfc7636}
   */
  async createSHA256CodeChallenge() {
    return unwrapAsync(oAuthCreateSHA256CodeChallenge());
  }
  // #endregion sdk-class-body
  /**
   * Exchange authorization code for API key
   *
   * @remarks
   * Exchange an authorization code from the PKCE flow for a user-controlled API key
   */
  async exchangeAuthCodeForAPIKey(request, options) {
    return unwrapAsync(oAuthExchangeAuthCodeForAPIKey(this, request, options));
  }
  /**
   * Create authorization code
   *
   * @remarks
   * Create an authorization code for the PKCE flow to generate a user-controlled API key
   */
  async createAuthCode(request, options) {
    return unwrapAsync(oAuthCreateAuthCode(this, request, options));
  }
}
function organizationListMembers(client, request, options) {
  return new APIPromise($do$f(client, request, options));
}
async function $do$f(client, request, options) {
  const parsed = safeParse(request, (value) => ListOrganizationMembersRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/organization/members")();
  const query = encodeFormQuery({
    "limit": payload?.limit,
    "offset": payload?.offset
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listOrganizationMembers",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListOrganizationMembersResponse$inboundSchema, {
    key: "Result"
  }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => organizationListMembers(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
class Organization extends ClientSDK {
  /**
   * List organization members
   *
   * @remarks
   * List all members of the organization associated with the authenticated management key. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async listMembers(request, options) {
    return unwrapResultIterator(organizationListMembers(this, request, options));
  }
}
function providersList(client, request, options) {
  return new APIPromise($do$e(client, request, options));
}
async function $do$e(client, request, options) {
  const parsed = safeParse(request, (value) => ListProvidersRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/providers")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listProviders",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, ListProvidersResponse$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Providers extends ClientSDK {
  /**
   * List all providers
   */
  async list(request, options) {
    return unwrapAsync(providersList(this, request, options));
  }
}
function rerankRerank(client, request, options) {
  return new APIPromise($do$d(client, request, options));
}
async function $do$d(client, request, options) {
  const parsed = safeParse(request, (value) => CreateRerankRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });
  const path = pathToFunc("/rerank")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json;q=1, text/event-stream;q=0",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createRerank",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "402",
      "404",
      "429",
      "4XX",
      "500",
      "502",
      "503",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, CreateRerankResponse$inboundSchema), text(200, CreateRerankResponse$inboundSchema, {
    ctype: "text/event-stream"
  }), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(503, ServiceUnavailableResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Rerank extends ClientSDK {
  /**
   * Submit a rerank request
   *
   * @remarks
   * Submits a rerank request to the rerank router
   */
  async rerank(request, options) {
    return unwrapAsync(rerankRerank(this, request, options));
  }
}
function sttCreateTranscription(client, request, options) {
  return new APIPromise($do$c(client, request, options));
}
async function $do$c(client, request, options) {
  const parsed = safeParse(request, (value) => CreateAudioTranscriptionsRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.STTRequest, { explode: true });
  const path = pathToFunc("/audio/transcriptions")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createAudioTranscriptions",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "402",
      "404",
      "429",
      "4XX",
      "500",
      "502",
      "503",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, STTResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(503, ServiceUnavailableResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Stt extends ClientSDK {
  /**
   * Create transcription
   *
   * @remarks
   * Transcribes audio into text. Accepts base64-encoded audio input and returns the transcribed text.
   */
  async createTranscription(request, options) {
    return unwrapAsync(sttCreateTranscription(this, request, options));
  }
}
function ttsCreateSpeech(client, request, options) {
  return new APIPromise($do$b(client, request, options));
}
async function $do$b(client, request, options) {
  const parsed = safeParse(request, (value) => CreateAudioSpeechRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.SpeechRequest, { explode: true });
  const path = pathToFunc("/audio/speech")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "audio/*",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createAudioSpeech",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "402",
      "404",
      "429",
      "4XX",
      "500",
      "502",
      "503",
      "524",
      "529",
      "5XX"
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(stream(200, custom$1((x) => x instanceof ReadableStream), { ctype: "audio/*" }), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), jsonErr(503, ServiceUnavailableResponseError$inboundSchema), jsonErr(524, EdgeNetworkTimeoutResponseError$inboundSchema), jsonErr(529, ProviderOverloadedResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Tts extends ClientSDK {
  /**
   * Create speech
   *
   * @remarks
   * Synthesizes audio from the input text. Returns a raw audio bytestream in the requested format (e.g. mp3, pcm, wav).
   */
  async createSpeech(request, options) {
    return unwrapAsync(ttsCreateSpeech(this, request, options));
  }
}
function videoGenerationGenerate(client, request, options) {
  return new APIPromise($do$a(client, request, options));
}
async function $do$a(client, request, options) {
  const parsed = safeParse(request, (value) => CreateVideosRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.VideoGenerationRequest, {
    explode: true
  });
  const path = pathToFunc("/videos")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createVideos",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "402", "404", "429", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(202, VideoGenerationResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(402, PaymentRequiredResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(429, TooManyRequestsResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function videoGenerationGetGeneration(client, request, options) {
  return new APIPromise($do$9(client, request, options));
}
async function $do$9(client, request, options) {
  const parsed = safeParse(request, (value) => GetVideosRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    jobId: encodeSimple("jobId", payload.jobId, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/videos/{jobId}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getVideos",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, VideoGenerationResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function videoGenerationGetVideoContent(client, request, options) {
  return new APIPromise($do$8(client, request, options));
}
async function $do$8(client, request, options) {
  const parsed = safeParse(request, (value) => ListVideosContentRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    jobId: encodeSimple("jobId", payload.jobId, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/videos/{jobId}/content")(pathParams);
  const query = encodeFormQuery({
    "index": payload.index
  });
  const headers = new Headers(compactMap({
    Accept: "application/octet-stream",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listVideosContent",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "4XX", "500", "502", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(stream(200, custom$1((x) => x instanceof ReadableStream)), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), jsonErr(502, BadGatewayResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function videoGenerationListVideosModels(client, request, options) {
  return new APIPromise($do$7(client, request, options));
}
async function $do$7(client, request, options) {
  const parsed = safeParse(request, (value) => ListVideosModelsRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/videos/models")();
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listVideosModels",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, VideoModelsListResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class VideoGeneration extends ClientSDK {
  /**
   * Submit a video generation request
   *
   * @remarks
   * Submits a video generation request and returns a polling URL to check status
   */
  async generate(request, options) {
    return unwrapAsync(videoGenerationGenerate(this, request, options));
  }
  /**
   * Poll video generation status
   *
   * @remarks
   * Returns job status and content URLs when completed
   */
  async getGeneration(request, options) {
    return unwrapAsync(videoGenerationGetGeneration(this, request, options));
  }
  /**
   * Download generated video content
   *
   * @remarks
   * Streams the generated video content from the upstream provider
   */
  async getVideoContent(request, options) {
    return unwrapAsync(videoGenerationGetVideoContent(this, request, options));
  }
  /**
   * List all video generation models
   *
   * @remarks
   * Returns a list of all available video generation models and their properties
   */
  async listVideosModels(request, options) {
    return unwrapAsync(videoGenerationListVideosModels(this, request, options));
  }
}
function workspacesBulkAddMembers(client, request, options) {
  return new APIPromise($do$6(client, request, options));
}
async function $do$6(client, request, options) {
  const parsed = safeParse(request, (value) => BulkAddWorkspaceMembersRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.BulkAddWorkspaceMembersRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/workspaces/{id}/members/add")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "bulkAddWorkspaceMembers",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, BulkAddWorkspaceMembersResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function workspacesBulkRemoveMembers(client, request, options) {
  return new APIPromise($do$5(client, request, options));
}
async function $do$5(client, request, options) {
  const parsed = safeParse(request, (value) => BulkRemoveWorkspaceMembersRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.BulkRemoveWorkspaceMembersRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/workspaces/{id}/members/remove")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "bulkRemoveWorkspaceMembers",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, BulkRemoveWorkspaceMembersResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function workspacesCreate(client, request, options) {
  return new APIPromise($do$4(client, request, options));
}
async function $do$4(client, request, options) {
  const parsed = safeParse(request, (value) => CreateWorkspaceRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.CreateWorkspaceRequest, {
    explode: true
  });
  const path = pathToFunc("/workspaces")();
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createWorkspace",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(201, CreateWorkspaceResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function workspacesDelete(client, request, options) {
  return new APIPromise($do$3(client, request, options));
}
async function $do$3(client, request, options) {
  const parsed = safeParse(request, (value) => DeleteWorkspaceRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/workspaces/{id}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "deleteWorkspace",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "DELETE",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, DeleteWorkspaceResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function workspacesGet(client, request, options) {
  return new APIPromise($do$2(client, request, options));
}
async function $do$2(client, request, options) {
  const parsed = safeParse(request, (value) => GetWorkspaceRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/workspaces/{id}")(pathParams);
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "getWorkspace",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, GetWorkspaceResponse$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
function workspacesList(client, request, options) {
  return new APIPromise($do$1(client, request, options));
}
async function $do$1(client, request, options) {
  const parsed = safeParse(request, (value) => ListWorkspacesRequest$outboundSchema.optional().parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;
  const path = pathToFunc("/workspaces")();
  const query = encodeFormQuery({
    "limit": payload?.limit,
    "offset": payload?.offset
  });
  const headers = new Headers(compactMap({
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload?.["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload?.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload?.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listWorkspaces",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["401", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result, raw] = await match(json(200, ListWorkspacesResponse$inboundSchema, {
    key: "Result"
  }), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response
    }];
  }
  const nextFunc = (responseData) => {
    const offset = request?.offset ?? 0;
    if (!responseData) {
      return { next: () => null };
    }
    const results = dlv(responseData, "data");
    if (!Array.isArray(results) || !results.length) {
      return { next: () => null };
    }
    const limit = request?.limit ?? 0;
    if (results.length < limit) {
      return { next: () => null };
    }
    const nextOffset = offset + results.length;
    const nextVal = () => workspacesList(client, {
      ...request,
      offset: nextOffset
    }, options);
    return { next: nextVal, "~next": { offset: nextOffset } };
  };
  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response
  }];
}
function workspacesUpdate(client, request, options) {
  return new APIPromise($do(client, request, options));
}
async function $do(client, request, options) {
  const parsed = safeParse(request, (value) => UpdateWorkspaceRequest$outboundSchema.parse(value), "Input validation failed");
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.UpdateWorkspaceRequest, {
    explode: true
  });
  const pathParams = {
    id: encodeSimple("id", payload.id, {
      explode: false,
      charEncoding: "percent"
    })
  };
  const path = pathToFunc("/workspaces/{id}")(pathParams);
  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "HTTP-Referer": encodeSimple("HTTP-Referer", payload["HTTP-Referer"] ?? client._options.httpReferer, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Categories": encodeSimple("X-OpenRouter-Categories", payload.appCategories ?? client._options.appCategories, { explode: false, charEncoding: "none" }),
    "X-OpenRouter-Title": encodeSimple("X-OpenRouter-Title", payload.appTitle ?? client._options.appTitle, { explode: false, charEncoding: "none" })
  }));
  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);
  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "updateWorkspace",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.apiKey,
    retryConfig: options?.retries || client._options.retryConfig || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 6e4,
        exponent: 1.5,
        maxElapsedTime: 36e5
      },
      retryConnectionErrors: true
    },
    retryCodes: options?.retryCodes || ["5XX"]
  };
  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "PATCH",
    baseURL: options?.serverURL,
    path,
    headers,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;
  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "403", "404", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;
  const responseFields = {
    HttpMeta: { Response: response, Request: req }
  };
  const [result] = await match(json(200, UpdateWorkspaceResponse$inboundSchema), jsonErr(400, BadRequestResponseError$inboundSchema), jsonErr(401, UnauthorizedResponseError$inboundSchema), jsonErr(403, ForbiddenResponseError$inboundSchema), jsonErr(404, NotFoundResponseError$inboundSchema), jsonErr(500, InternalServerResponseError$inboundSchema), fail("4XX"), fail("5XX"))(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }
  return [result, { status: "complete", request: req, response }];
}
class Workspaces extends ClientSDK {
  /**
   * List workspaces
   *
   * @remarks
   * List all workspaces for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async list(request, options) {
    return unwrapResultIterator(workspacesList(this, request, options));
  }
  /**
   * Create a workspace
   *
   * @remarks
   * Create a new workspace for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async create(request, options) {
    return unwrapAsync(workspacesCreate(this, request, options));
  }
  /**
   * Delete a workspace
   *
   * @remarks
   * Delete an existing workspace. The default workspace cannot be deleted. Workspaces with active API keys cannot be deleted. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async delete(request, options) {
    return unwrapAsync(workspacesDelete(this, request, options));
  }
  /**
   * Get a workspace
   *
   * @remarks
   * Get a single workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async get(request, options) {
    return unwrapAsync(workspacesGet(this, request, options));
  }
  /**
   * Update a workspace
   *
   * @remarks
   * Update an existing workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async update(request, options) {
    return unwrapAsync(workspacesUpdate(this, request, options));
  }
  /**
   * Bulk add members to a workspace
   *
   * @remarks
   * Add multiple organization members to a workspace. Members are assigned the same role they hold in the organization. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async bulkAddMembers(request, options) {
    return unwrapAsync(workspacesBulkAddMembers(this, request, options));
  }
  /**
   * Bulk remove members from a workspace
   *
   * @remarks
   * Remove multiple members from a workspace. Members with active API keys in the workspace cannot be removed. [Management key](/docs/guides/overview/auth/management-api-keys) required.
   */
  async bulkRemoveMembers(request, options) {
    return unwrapAsync(workspacesBulkRemoveMembers(this, request, options));
  }
}
class ToolEventBroadcaster {
  constructor() {
    this.buffer = [];
    this.consumers = /* @__PURE__ */ new Map();
    this.nextConsumerId = 0;
    this.isComplete = false;
    this.completionError = null;
  }
  /**
   * Push a new event to all consumers.
   * Events are buffered so late-joining consumers can catch up.
   */
  push(event) {
    if (this.isComplete) {
      return;
    }
    this.buffer.push(event);
    this.notifyWaitingConsumers();
  }
  /**
   * Mark the broadcaster as complete - no more events will be pushed.
   * Optionally pass an error to signal failure to all consumers.
   * Cleans up buffer and consumers after completion.
   */
  complete(error) {
    this.isComplete = true;
    this.completionError = error ?? null;
    this.notifyWaitingConsumers();
    queueMicrotask(() => this.cleanup());
  }
  /**
   * Clean up resources after all consumers have finished.
   * Called automatically after complete(), but can be called manually.
   */
  cleanup() {
    if (this.isComplete && this.consumers.size === 0) {
      this.buffer = [];
    }
  }
  /**
   * Create a new consumer that can independently iterate over events.
   * Consumers can join at any time and will receive events from position 0.
   * Multiple consumers can be created and will all receive the same events.
   */
  createConsumer() {
    const consumerId = this.nextConsumerId++;
    const state = {
      position: 0,
      waitingPromise: null,
      cancelled: false
    };
    this.consumers.set(consumerId, state);
    const self = this;
    return {
      async next() {
        const consumer = self.consumers.get(consumerId);
        if (!consumer) {
          return { done: true, value: void 0 };
        }
        if (consumer.cancelled) {
          return { done: true, value: void 0 };
        }
        if (consumer.position < self.buffer.length) {
          const value = self.buffer[consumer.position];
          consumer.position++;
          return { done: false, value };
        }
        if (self.isComplete) {
          self.consumers.delete(consumerId);
          self.cleanup();
          if (self.completionError) {
            throw self.completionError;
          }
          return { done: true, value: void 0 };
        }
        const waitPromise = new Promise((resolve, reject) => {
          consumer.waitingPromise = { resolve, reject };
          if (self.isComplete || self.completionError || consumer.position < self.buffer.length) {
            resolve();
          }
        });
        await waitPromise;
        consumer.waitingPromise = null;
        return this.next();
      },
      async return() {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
          self.cleanup();
        }
        return { done: true, value: void 0 };
      },
      async throw(e) {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
          self.cleanup();
        }
        throw e;
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  /**
   * Notify all waiting consumers that new data is available or stream completed
   */
  notifyWaitingConsumers() {
    for (const consumer of this.consumers.values()) {
      if (consumer.waitingPromise) {
        if (this.completionError) {
          consumer.waitingPromise.reject(this.completionError);
        } else {
          consumer.waitingPromise.resolve();
        }
        consumer.waitingPromise = null;
      }
    }
  }
}
var ToolType;
(function(ToolType2) {
  ToolType2["Function"] = "function";
})(ToolType || (ToolType = {}));
const SHARED_CONTEXT_KEY = "shared";
function hasExecuteFunction(tool) {
  return "execute" in tool.function && typeof tool.function.execute === "function";
}
function isGeneratorTool(tool) {
  return "eventSchema" in tool.function;
}
function isRegularExecuteTool(tool) {
  return hasExecuteFunction(tool) && !isGeneratorTool(tool);
}
function isToolCallOutputEvent(event) {
  return event.type === "tool.call_output";
}
class ToolContextStore {
  constructor(initialValues = {}) {
    this.listeners = /* @__PURE__ */ new Set();
    this.store = {};
    for (const [key, value] of Object.entries(initialValues)) {
      this.store[key] = { ...value };
    }
  }
  /** Subscribe to context changes. Returns an unsubscribe function. */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  /** Get a deep-shallow copy of the full context (all tools) */
  getSnapshot() {
    const snapshot = {};
    for (const [key, value] of Object.entries(this.store)) {
      snapshot[key] = { ...value };
    }
    return snapshot;
  }
  /** Get a shallow copy of context for a specific tool */
  getToolContext(toolName) {
    const data = this.store[toolName];
    if (!data) {
      return {};
    }
    return { ...data };
  }
  /** Set context for a specific tool and notify listeners */
  setToolContext(toolName, values) {
    this.store[toolName] = { ...values };
    this.notifyListeners();
  }
  /** Merge partial values into a specific tool's context and notify listeners */
  mergeToolContext(toolName, partial2) {
    const existing = this.store[toolName] ?? {};
    this.store[toolName] = { ...existing, ...partial2 };
    this.notifyListeners();
  }
  notifyListeners() {
    const snapshot = {};
    for (const [key, value] of Object.entries(this.store)) {
      snapshot[key] = { ...value };
    }
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}
function validatePartialAgainstSchema(partial2, schema) {
  const schemaKeys = Object.keys(schema._zod.def.shape);
  const filteredPartial = {};
  for (const [key, value] of Object.entries(partial2)) {
    if (schemaKeys.includes(key)) {
      filteredPartial[key] = value;
    }
  }
  const shape = schema._zod.def.shape;
  for (const [key, value] of Object.entries(filteredPartial)) {
    const keySchema = shape[key];
    if (keySchema) {
      parse(keySchema, value);
    }
  }
  return filteredPartial;
}
function buildToolExecuteContext(turnContext, store, toolName, schema, sharedSchema) {
  if (store && schema) {
    extractToolContext(store, toolName, schema);
  }
  if (store && sharedSchema) {
    extractToolContext(store, SHARED_CONTEXT_KEY, sharedSchema);
  }
  const ctx = {
    ...turnContext,
    get local() {
      const data = store ? store.getToolContext(toolName) : {};
      return Object.freeze(data);
    },
    setContext(partial2) {
      if (!store || !schema) {
        return;
      }
      const filteredPartial = validatePartialAgainstSchema(partial2, schema);
      store.mergeToolContext(toolName, filteredPartial);
    },
    get shared() {
      const data = store ? store.getToolContext(SHARED_CONTEXT_KEY) : {};
      return Object.freeze(data);
    },
    setSharedContext(partial2) {
      if (!store || !sharedSchema) {
        return;
      }
      const filteredPartial = validatePartialAgainstSchema(partial2, sharedSchema);
      store.mergeToolContext(SHARED_CONTEXT_KEY, filteredPartial);
    }
  };
  return ctx;
}
async function resolveContext(contextInput, turnContext) {
  if (contextInput === void 0) {
    return {};
  }
  if (typeof contextInput === "function") {
    return Promise.resolve(contextInput(turnContext));
  }
  return contextInput;
}
function extractToolContext(store, toolName, schema) {
  if (!schema) {
    return {};
  }
  const toolData = store.getToolContext(toolName);
  parse(schema, toolData);
  return toolData;
}
function isParameterFunction(value) {
  return typeof value === "function";
}
function buildResolvedRequest(entries) {
  const obj = Object.fromEntries(entries);
  return obj;
}
async function resolveAsyncFunctions(input, context) {
  const resolvedEntries = [];
  const clientOnlyFields = /* @__PURE__ */ new Set([
    "stopWhen",
    // Handled separately in ModelResult
    "state",
    // Client-side state management
    "requireApproval",
    // Client-side approval check function
    "approveToolCalls",
    // Client-side approval decisions
    "rejectToolCalls",
    // Client-side rejection decisions
    "context",
    // Passed through via GetResponseOptions, not sent to API
    "sharedContextSchema",
    // Client-side schema for shared context validation
    "onTurnStart",
    // Client-side turn start callback
    "onTurnEnd"
    // Client-side turn end callback
  ]);
  for (const [key, value] of Object.entries(input)) {
    if (clientOnlyFields.has(key)) {
      continue;
    }
    if (isParameterFunction(value)) {
      try {
        const result = await Promise.resolve(value(context));
        resolvedEntries.push([key, result]);
      } catch (error) {
        throw new Error(`Failed to resolve async function for field "${key}": ${error instanceof Error ? error.message : String(error)}`);
      }
    } else {
      resolvedEntries.push([key, value]);
    }
  }
  return buildResolvedRequest(resolvedEntries);
}
function hasAsyncFunctions(input) {
  if (!input || typeof input !== "object") {
    return false;
  }
  return Object.values(input).some((value) => typeof value === "function");
}
function normalizeInputToArray(input) {
  if (typeof input === "string") {
    const message = {
      role: EasyInputMessageRoleUser.User,
      content: input
    };
    return [message];
  }
  return input;
}
function isValidUnsentToolResult(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  return "callId" in obj && typeof obj.callId === "string" && "name" in obj && typeof obj.name === "string" && "output" in obj;
}
function generateConversationId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `conv_${crypto.randomUUID()}`;
  }
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}
function createInitialState(id) {
  const now = Date.now();
  return {
    id: id ?? generateConversationId(),
    messages: [],
    status: "in_progress",
    createdAt: now,
    updatedAt: now
  };
}
function updateState(state, updates) {
  return {
    ...state,
    ...updates,
    updatedAt: Date.now()
  };
}
function appendToMessages(current, newItems) {
  const currentArray = normalizeInputToArray(current);
  return [...currentArray, ...newItems];
}
async function toolRequiresApproval(toolCall, tools, context, callLevelCheck) {
  if (callLevelCheck) {
    return callLevelCheck(toolCall, context);
  }
  const tool = tools.find((t) => t.function.name === toolCall.name);
  if (!tool)
    return false;
  const requireApproval = tool.function.requireApproval;
  if (typeof requireApproval === "function") {
    return requireApproval(toolCall.arguments, context);
  }
  return requireApproval ?? false;
}
async function partitionToolCalls(toolCalls, tools, context, callLevelCheck) {
  const requiresApproval = [];
  const autoExecute = [];
  for (const tc of toolCalls) {
    if (await toolRequiresApproval(tc, tools, context, callLevelCheck)) {
      requiresApproval.push(tc);
    } else {
      autoExecute.push(tc);
    }
  }
  return { requiresApproval, autoExecute };
}
function createUnsentResult(callId, name, output) {
  const result = { callId, name, output };
  if (!isValidUnsentToolResult(result)) {
    throw new Error("Invalid UnsentToolResult structure");
  }
  return result;
}
function createRejectedResult(callId, name, reason) {
  const result = {
    callId,
    name,
    output: null,
    error: reason ?? "Tool call rejected by user"
  };
  if (!isValidUnsentToolResult(result)) {
    throw new Error("Invalid UnsentToolResult structure");
  }
  return result;
}
function unsentResultsToAPIFormat(results) {
  return results.map((r) => ({
    type: "function_call_output",
    id: `output_${r.callId}`,
    callId: r.callId,
    output: r.error ? JSON.stringify({ error: r.error }) : JSON.stringify(r.output)
  }));
}
function extractTextFromResponse$1(response) {
  if (!response.output) {
    return "";
  }
  const outputs = Array.isArray(response.output) ? response.output : [response.output];
  const textParts = [];
  for (const item of outputs) {
    if (item.type === "message" && "content" in item && item.content) {
      for (const content of item.content) {
        if (content.type === "output_text" && "text" in content && content.text) {
          textParts.push(content.text);
        }
      }
    }
  }
  return textParts.join("");
}
class ReusableReadableStream {
  constructor(sourceStream) {
    this.sourceStream = sourceStream;
    this.buffer = [];
    this.consumers = /* @__PURE__ */ new Map();
    this.nextConsumerId = 0;
    this.sourceReader = null;
    this.sourceComplete = false;
    this.sourceError = null;
    this.pumpStarted = false;
  }
  /**
   * Create a new consumer that can independently iterate over the stream.
   * Multiple consumers can be created and will all receive the same data.
   */
  createConsumer() {
    const consumerId = this.nextConsumerId++;
    const state = {
      position: 0,
      waitingPromise: null,
      cancelled: false
    };
    this.consumers.set(consumerId, state);
    if (!this.pumpStarted) {
      this.startPump();
    }
    const self = this;
    return {
      async next() {
        const consumer = self.consumers.get(consumerId);
        if (!consumer) {
          return {
            done: true,
            value: void 0
          };
        }
        if (consumer.cancelled) {
          return {
            done: true,
            value: void 0
          };
        }
        if (consumer.position < self.buffer.length) {
          const value = self.buffer[consumer.position];
          consumer.position++;
          return {
            done: false,
            value
          };
        }
        if (self.sourceComplete) {
          self.consumers.delete(consumerId);
          return {
            done: true,
            value: void 0
          };
        }
        if (self.sourceError) {
          self.consumers.delete(consumerId);
          throw self.sourceError;
        }
        const waitPromise = new Promise((resolve, reject) => {
          consumer.waitingPromise = {
            resolve,
            reject
          };
          if (self.sourceComplete || self.sourceError || consumer.position < self.buffer.length) {
            resolve();
          }
        });
        await waitPromise;
        consumer.waitingPromise = null;
        return this.next();
      },
      async return() {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
        }
        return {
          done: true,
          value: void 0
        };
      },
      async throw(e) {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
        }
        throw e;
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  /**
   * Start pumping data from the source stream into the buffer
   */
  startPump() {
    if (this.pumpStarted) {
      return;
    }
    this.pumpStarted = true;
    this.sourceReader = this.sourceStream.getReader();
    void (async () => {
      try {
        while (true) {
          const result = await this.sourceReader.read();
          if (result.done) {
            this.sourceComplete = true;
            this.notifyAllConsumers();
            break;
          }
          this.buffer.push(result.value);
          this.notifyAllConsumers();
        }
      } catch (error) {
        this.sourceError = error instanceof Error ? error : new Error(String(error));
        this.notifyAllConsumers();
      } finally {
        if (this.sourceReader) {
          this.sourceReader.releaseLock();
        }
      }
    })();
  }
  /**
   * Notify all waiting consumers that new data is available
   */
  notifyAllConsumers() {
    for (const consumer of this.consumers.values()) {
      if (consumer.waitingPromise) {
        if (this.sourceError) {
          consumer.waitingPromise.reject(this.sourceError);
        } else {
          consumer.waitingPromise.resolve();
        }
        consumer.waitingPromise = null;
      }
    }
  }
  /**
   * Cancel the source stream and all consumers
   */
  async cancel() {
    for (const consumer of this.consumers.values()) {
      consumer.cancelled = true;
      if (consumer.waitingPromise) {
        consumer.waitingPromise.resolve();
      }
    }
    this.consumers.clear();
    if (this.sourceReader) {
      await this.sourceReader.cancel();
      this.sourceReader.releaseLock();
    }
  }
}
function isOutputTextDeltaEvent(event) {
  return "type" in event && event.type === "response.output_text.delta";
}
function isReasoningDeltaEvent(event) {
  return "type" in event && event.type === "response.reasoning_text.delta";
}
function isFunctionCallArgumentsDeltaEvent(event) {
  return "type" in event && event.type === "response.function_call_arguments.delta";
}
function isOutputItemAddedEvent(event) {
  return "type" in event && event.type === "response.output_item.added";
}
function isOutputItemDoneEvent(event) {
  return "type" in event && event.type === "response.output_item.done";
}
function isResponseCompletedEvent(event) {
  return "type" in event && event.type === "response.completed";
}
function isResponseFailedEvent(event) {
  return "type" in event && event.type === "response.failed";
}
function isResponseIncompleteEvent(event) {
  return "type" in event && event.type === "response.incomplete";
}
function isFunctionCallArgumentsDoneEvent(event) {
  return "type" in event && event.type === "response.function_call_arguments.done";
}
function isOutputMessage(item) {
  return typeof item === "object" && item !== null && "type" in item && item.type === "message";
}
function isFunctionCallItem(item) {
  return typeof item === "object" && item !== null && "type" in item && item.type === "function_call";
}
function isReasoningOutputItem(item) {
  return typeof item === "object" && item !== null && "type" in item && item.type === "reasoning";
}
function isWebSearchCallOutputItem(item) {
  return typeof item === "object" && item !== null && "type" in item && item.type === "web_search_call";
}
function isFileSearchCallOutputItem(item) {
  return typeof item === "object" && item !== null && "type" in item && item.type === "file_search_call";
}
function isImageGenerationCallOutputItem(item) {
  return typeof item === "object" && item !== null && "type" in item && item.type === "image_generation_call";
}
function hasTypeProperty(item) {
  return typeof item === "object" && item !== null && "type" in item && typeof item.type === "string";
}
async function* extractTextDeltas(stream2) {
  const consumer = stream2.createConsumer();
  for await (const event of consumer) {
    if (isOutputTextDeltaEvent(event)) {
      if (event.delta) {
        yield event.delta;
      }
    }
  }
}
async function* extractReasoningDeltas(stream2) {
  const consumer = stream2.createConsumer();
  for await (const event of consumer) {
    if (isReasoningDeltaEvent(event)) {
      if (event.delta) {
        yield event.delta;
      }
    }
  }
}
async function* extractToolDeltas(stream2) {
  const consumer = stream2.createConsumer();
  for await (const event of consumer) {
    if (isFunctionCallArgumentsDeltaEvent(event)) {
      if (event.delta) {
        yield event.delta;
      }
    }
  }
}
async function* buildMessageStreamCore(stream2) {
  const consumer = stream2.createConsumer();
  let currentText = "";
  let currentId = "";
  let hasStarted = false;
  for await (const event of consumer) {
    if (!("type" in event)) {
      continue;
    }
    switch (event.type) {
      case "response.output_item.added": {
        if (isOutputItemAddedEvent(event)) {
          if (event.item && isOutputMessage(event.item)) {
            hasStarted = true;
            currentText = "";
            currentId = event.item.id;
          }
        }
        break;
      }
      case "response.output_text.delta": {
        if (isOutputTextDeltaEvent(event)) {
          if (hasStarted && event.delta) {
            currentText += event.delta;
            yield {
              type: "delta",
              text: currentText,
              messageId: currentId
            };
          }
        }
        break;
      }
      case "response.output_item.done": {
        if (isOutputItemDoneEvent(event)) {
          if (event.item && isOutputMessage(event.item)) {
            yield {
              type: "complete",
              completeMessage: event.item
            };
          }
        }
        break;
      }
      case "response.completed":
      case "response.failed":
      case "response.incomplete":
        return;
    }
  }
}
async function* buildResponsesMessageStream(stream2) {
  for await (const update of buildMessageStreamCore(stream2)) {
    if (update.type === "delta" && update.text !== void 0 && update.messageId !== void 0) {
      yield {
        id: update.messageId,
        type: "message",
        role: "assistant",
        status: "in_progress",
        content: [
          {
            type: "output_text",
            text: update.text,
            annotations: []
          }
        ]
      };
    } else if (update.type === "complete" && update.completeMessage) {
      yield update.completeMessage;
    }
  }
}
function handleOutputItemAdded(event, itemsInProgress) {
  if (!isOutputItemAddedEvent(event) || !event.item) {
    return void 0;
  }
  const item = event.item;
  if (isOutputMessage(item)) {
    itemsInProgress.set(item.id, {
      type: "message",
      id: item.id,
      textContent: ""
    });
    return {
      id: item.id,
      type: "message",
      role: "assistant",
      status: "in_progress",
      content: []
    };
  }
  if (isFunctionCallItem(item)) {
    const itemKey = item.id ?? item.callId;
    itemsInProgress.set(itemKey, {
      type: "function_call",
      id: itemKey,
      name: item.name,
      callId: item.callId,
      argumentsAccumulated: ""
    });
    return {
      type: "function_call",
      id: item.id,
      callId: item.callId,
      name: item.name,
      arguments: "",
      status: "in_progress"
    };
  }
  if (isReasoningOutputItem(item)) {
    itemsInProgress.set(item.id, {
      type: "reasoning",
      id: item.id,
      reasoningContent: ""
    });
    return {
      type: "reasoning",
      id: item.id,
      status: "in_progress",
      summary: []
    };
  }
  if (isWebSearchCallOutputItem(item)) {
    return item;
  }
  if (isFileSearchCallOutputItem(item)) {
    return item;
  }
  if (isImageGenerationCallOutputItem(item)) {
    return item;
  }
  return void 0;
}
function handleTextDelta(event, itemsInProgress) {
  if (!isOutputTextDeltaEvent(event) || !event.delta) {
    return void 0;
  }
  const item = itemsInProgress.get(event.itemId);
  if (item?.type === "message") {
    item.textContent += event.delta;
    return {
      id: item.id,
      type: "message",
      role: "assistant",
      status: "in_progress",
      content: [
        {
          type: "output_text",
          text: item.textContent,
          annotations: []
        }
      ]
    };
  }
  return void 0;
}
function handleFunctionCallDelta(event, itemsInProgress) {
  if (!isFunctionCallArgumentsDeltaEvent(event) || !event.delta) {
    return void 0;
  }
  const item = itemsInProgress.get(event.itemId);
  if (item?.type === "function_call") {
    item.argumentsAccumulated += event.delta;
    return {
      type: "function_call",
      // Include id if it differs from callId (means API provided an id)
      id: item.id !== item.callId ? item.id : void 0,
      callId: item.callId,
      name: item.name,
      arguments: item.argumentsAccumulated,
      status: "in_progress"
    };
  }
  return void 0;
}
function handleReasoningDelta(event, itemsInProgress) {
  if (!isReasoningDeltaEvent(event) || !event.delta) {
    return void 0;
  }
  const item = itemsInProgress.get(event.itemId);
  if (item?.type === "reasoning") {
    item.reasoningContent += event.delta;
    return {
      type: "reasoning",
      id: item.id,
      status: "in_progress",
      summary: [
        {
          type: "summary_text",
          text: item.reasoningContent
        }
      ]
    };
  }
  return void 0;
}
function handleOutputItemDone(event, itemsInProgress) {
  if (!isOutputItemDoneEvent(event) || !event.item) {
    return void 0;
  }
  const item = event.item;
  if (isOutputMessage(item)) {
    itemsInProgress.delete(item.id);
    return item;
  }
  if (isFunctionCallItem(item)) {
    itemsInProgress.delete(item.id ?? item.callId);
    return item;
  }
  if (isReasoningOutputItem(item)) {
    itemsInProgress.delete(item.id);
    return item;
  }
  if (isWebSearchCallOutputItem(item)) {
    return item;
  }
  if (isFileSearchCallOutputItem(item)) {
    return item;
  }
  if (isImageGenerationCallOutputItem(item)) {
    return item;
  }
  return void 0;
}
const itemsStreamHandlers = {
  "response.output_item.added": handleOutputItemAdded,
  "response.output_text.delta": handleTextDelta,
  "response.function_call_arguments.delta": handleFunctionCallDelta,
  "response.reasoning_text.delta": handleReasoningDelta,
  "response.output_item.done": handleOutputItemDone
};
const streamTerminationEvents = /* @__PURE__ */ new Set([
  "response.completed",
  "response.failed",
  "response.incomplete"
]);
async function* buildItemsStream(stream2) {
  const consumer = stream2.createConsumer();
  const itemsInProgress = /* @__PURE__ */ new Map();
  for await (const event of consumer) {
    if (!("type" in event)) {
      continue;
    }
    if (streamTerminationEvents.has(event.type)) {
      return;
    }
    const handler = itemsStreamHandlers[event.type];
    if (handler) {
      const result = handler(event, itemsInProgress);
      if (result) {
        yield result;
      }
    }
  }
}
async function consumeStreamForCompletion(stream2) {
  const consumer = stream2.createConsumer();
  for await (const event of consumer) {
    if (!("type" in event)) {
      continue;
    }
    if (isResponseCompletedEvent(event)) {
      return event.response;
    }
    if (isResponseFailedEvent(event)) {
      throw new Error(`Response failed: ${JSON.stringify(event.response.error)}`);
    }
    if (isResponseIncompleteEvent(event)) {
      return event.response;
    }
  }
  throw new Error("Stream ended without completion event");
}
function convertToAssistantMessage(outputMessage) {
  const textContent = outputMessage.content.filter((part) => "type" in part && part.type === "output_text").map((part) => part.text).join("");
  return {
    role: "assistant",
    content: textContent || null
  };
}
function extractMessageFromResponse(response) {
  const messageItem = response.output.find((item) => "type" in item && item.type === "message");
  if (!messageItem) {
    throw new Error("No message found in response output");
  }
  return convertToAssistantMessage(messageItem);
}
function extractResponsesMessageFromResponse(response) {
  const messageItem = response.output.find((item) => "type" in item && item.type === "message");
  if (!messageItem) {
    throw new Error("No message found in response output");
  }
  return messageItem;
}
function extractTextFromResponse(response) {
  if (response.outputText) {
    return response.outputText;
  }
  const hasMessage = response.output.some((item) => "type" in item && item.type === "message");
  if (!hasMessage) {
    return "";
  }
  const message = extractMessageFromResponse(response);
  if (typeof message.content === "string") {
    return message.content;
  }
  return "";
}
function extractToolCallsFromResponse(response) {
  const toolCalls = [];
  for (const item of response.output) {
    if (isFunctionCallItem(item)) {
      try {
        const trimmedArgs = item.arguments.trim();
        const parsedArguments = trimmedArgs ? JSON.parse(trimmedArgs) : {};
        toolCalls.push({
          id: item.callId,
          name: item.name,
          arguments: parsedArguments
        });
      } catch (error) {
        console.warn(`Failed to parse tool call arguments for ${item.name}:`, error instanceof Error ? error.message : String(error), `
Arguments: ${item.arguments.substring(0, 100)}${item.arguments.length > 100 ? "..." : ""}`);
        toolCalls.push({
          id: item.callId,
          name: item.name,
          arguments: item.arguments
          // Keep as string if parsing fails
        });
      }
    }
  }
  return toolCalls;
}
async function* buildToolCallStream(stream2) {
  const consumer = stream2.createConsumer();
  const toolCallsInProgress = /* @__PURE__ */ new Map();
  for await (const event of consumer) {
    if (!("type" in event)) {
      continue;
    }
    switch (event.type) {
      case "response.output_item.added": {
        if (isOutputItemAddedEvent(event) && event.item && isFunctionCallItem(event.item)) {
          const itemKey = event.item.id ?? event.item.callId;
          toolCallsInProgress.set(itemKey, {
            id: event.item.callId,
            name: event.item.name,
            argumentsAccumulated: ""
          });
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        if (isFunctionCallArgumentsDeltaEvent(event)) {
          const toolCall = toolCallsInProgress.get(event.itemId);
          if (toolCall && event.delta) {
            toolCall.argumentsAccumulated += event.delta;
          }
        }
        break;
      }
      case "response.function_call_arguments.done": {
        if (isFunctionCallArgumentsDoneEvent(event)) {
          const toolCall = toolCallsInProgress.get(event.itemId);
          if (toolCall) {
            try {
              const trimmedArgs = event.arguments.trim();
              const parsedArguments = trimmedArgs ? JSON.parse(trimmedArgs) : {};
              yield {
                id: toolCall.id,
                name: event.name,
                arguments: parsedArguments
              };
            } catch (error) {
              console.warn(`Failed to parse tool call arguments for ${event.name}:`, error instanceof Error ? error.message : String(error), `
Arguments: ${event.arguments.substring(0, 100)}${event.arguments.length > 100 ? "..." : ""}`);
              yield {
                id: toolCall.id,
                name: event.name,
                arguments: event.arguments
              };
            }
            toolCallsInProgress.delete(event.itemId);
          }
        }
        break;
      }
      case "response.output_item.done": {
        if (isOutputItemDoneEvent(event) && event.item && isFunctionCallItem(event.item)) {
          const itemKey = event.item.id ?? event.item.callId;
          if (toolCallsInProgress.has(itemKey)) {
            try {
              const trimmedArgs = event.item.arguments.trim();
              const parsedArguments = trimmedArgs ? JSON.parse(trimmedArgs) : {};
              yield {
                id: event.item.callId,
                name: event.item.name,
                arguments: parsedArguments
              };
            } catch (_error) {
              yield {
                id: event.item.callId,
                name: event.item.name,
                arguments: event.item.arguments
              };
            }
            toolCallsInProgress.delete(itemKey);
          }
        }
        break;
      }
    }
  }
}
function isNonNullObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function sanitizeJsonSchema(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeJsonSchema);
  }
  if (!isNonNullObject(obj)) {
    return obj;
  }
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!key.startsWith("~")) {
      result[key] = sanitizeJsonSchema(obj[key]);
    }
  }
  return result;
}
function isZodSchema(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (!("_zod" in value)) {
    return false;
  }
  return typeof value._zod === "object";
}
function convertZodToJsonSchema(zodSchema) {
  if (!isZodSchema(zodSchema)) {
    throw new Error("Invalid Zod schema provided");
  }
  const jsonSchema = toJSONSchema(zodSchema, {
    target: "draft-7"
  });
  return sanitizeJsonSchema(jsonSchema);
}
function convertToolsToAPIFormat(tools) {
  return tools.map((tool) => ({
    type: "function",
    name: tool.function.name,
    description: tool.function.description || null,
    strict: null,
    parameters: convertZodToJsonSchema(tool.function.inputSchema)
  }));
}
function validateToolInput(schema, args) {
  return parse(schema, args);
}
function validateToolOutput(schema, result) {
  return parse(schema, result);
}
function tryValidate(schema, value) {
  const result = safeParse$1(schema, value);
  return result.success;
}
function buildExecuteCtx(tool, turnContext, contextStore, sharedSchema) {
  return buildToolExecuteContext(turnContext, contextStore, tool.function.name, tool.function.contextSchema, sharedSchema);
}
async function executeRegularTool(tool, toolCall, context, contextStore, sharedSchema) {
  if (!isRegularExecuteTool(tool)) {
    throw new Error(`Tool "${toolCall.name}" is not a regular execute tool or has no execute function`);
  }
  try {
    const validatedInput = validateToolInput(tool.function.inputSchema, toolCall.arguments);
    const executeContext = buildExecuteCtx(tool, context, contextStore, sharedSchema);
    const result = await Promise.resolve(tool.function.execute(validatedInput, executeContext));
    if (tool.function.outputSchema) {
      const validatedOutput = validateToolOutput(tool.function.outputSchema, result);
      return {
        toolCallId: toolCall.id,
        toolName: toolCall.name,
        result: validatedOutput
      };
    }
    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result
    };
  } catch (error) {
    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result: null,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}
async function executeGeneratorTool(tool, toolCall, context, onPreliminaryResult, contextStore, sharedSchema) {
  if (!isGeneratorTool(tool)) {
    throw new Error(`Tool "${toolCall.name}" is not a generator tool`);
  }
  try {
    const validatedInput = validateToolInput(tool.function.inputSchema, toolCall.arguments);
    const executeContext = buildExecuteCtx(tool, context, contextStore, sharedSchema);
    const preliminaryResults = [];
    let finalResult;
    let hasFinalResult = false;
    let lastEmittedValue;
    let hasEmittedValue = false;
    const iterator = tool.function.execute(validatedInput, executeContext);
    let iterResult = await iterator.next();
    while (!iterResult.done) {
      const event = iterResult.value;
      lastEmittedValue = event;
      hasEmittedValue = true;
      const matchesOutputSchema = tryValidate(tool.function.outputSchema, event);
      const matchesEventSchema = tryValidate(tool.function.eventSchema, event);
      if (matchesOutputSchema && !matchesEventSchema && !hasFinalResult) {
        finalResult = validateToolOutput(tool.function.outputSchema, event);
        hasFinalResult = true;
      } else {
        const validatedPreliminary = validateToolOutput(tool.function.eventSchema, event);
        preliminaryResults.push(validatedPreliminary);
        if (onPreliminaryResult) {
          onPreliminaryResult(toolCall.id, validatedPreliminary);
        }
      }
      iterResult = await iterator.next();
    }
    if (iterResult.value !== void 0) {
      finalResult = validateToolOutput(tool.function.outputSchema, iterResult.value);
      hasFinalResult = true;
    }
    if (!hasFinalResult) {
      if (!hasEmittedValue) {
        throw new Error(`Generator tool "${toolCall.name}" completed without emitting any values or returning a result`);
      }
      finalResult = validateToolOutput(tool.function.outputSchema, lastEmittedValue);
    }
    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result: finalResult,
      preliminaryResults
    };
  } catch (error) {
    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result: null,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}
async function executeTool(tool, toolCall, context, onPreliminaryResult, contextStore, sharedSchema) {
  if (!hasExecuteFunction(tool)) {
    throw new Error(`Tool "${toolCall.name}" has no execute function. Use manual tool execution.`);
  }
  if (isGeneratorTool(tool)) {
    return executeGeneratorTool(tool, toolCall, context, onPreliminaryResult, contextStore, sharedSchema);
  }
  return executeRegularTool(tool, toolCall, context, contextStore, sharedSchema);
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function buildNextTurnParamsContext(request) {
  return {
    input: request.input ?? [],
    model: request.model ?? "",
    models: request.models ?? [],
    temperature: request.temperature ?? null,
    maxOutputTokens: request.maxOutputTokens ?? null,
    topP: request.topP ?? null,
    topK: request.topK,
    instructions: request.instructions ?? null
  };
}
async function executeNextTurnParamsFunctions(toolCalls, tools, currentRequest) {
  const context = buildNextTurnParamsContext(currentRequest);
  const result = {};
  const workingContext = { ...context };
  for (const tool of tools) {
    if (!tool.function.nextTurnParams) {
      continue;
    }
    const callsForTool = toolCalls.filter((tc) => tc.name === tool.function.name);
    for (const call of callsForTool) {
      const nextParams = tool.function.nextTurnParams;
      if (!isRecord(call.arguments)) {
        const typeStr = Array.isArray(call.arguments) ? "array" : typeof call.arguments;
        throw new Error(`Tool call arguments for ${tool.function.name} must be an object, got ${typeStr}`);
      }
      await processNextTurnParamsForCall(nextParams, call.arguments, workingContext, result, tool.function.name);
    }
  }
  return result;
}
async function processNextTurnParamsForCall(nextParams, params, workingContext, result, toolName) {
  for (const paramKey of Object.keys(nextParams)) {
    const fn = nextParams[paramKey];
    if (typeof fn !== "function") {
      continue;
    }
    if (!isValidNextTurnParamKey(paramKey)) {
      if (process.env["NODE_ENV"] !== "production") {
        console.warn(`Invalid nextTurnParams key "${paramKey}" in tool "${toolName}". Valid keys: input, model, models, temperature, maxOutputTokens, topP, topK, instructions`);
      }
      continue;
    }
    const newValue = await Promise.resolve(fn(params, workingContext));
    setNextTurnParam(result, paramKey, newValue);
    setNextTurnParam(workingContext, paramKey, newValue);
  }
}
function isValidNextTurnParamKey(key) {
  const validKeys = /* @__PURE__ */ new Set([
    "input",
    "model",
    "models",
    "temperature",
    "maxOutputTokens",
    "topP",
    "topK",
    "instructions"
  ]);
  return validKeys.has(key);
}
function setNextTurnParam(target, key, value) {
  target[key] = value;
}
function applyNextTurnParamsToRequest(request, computedParams) {
  const sanitized = {};
  for (const [key, value] of Object.entries(computedParams)) {
    sanitized[key] = value === null ? void 0 : value;
  }
  return {
    ...request,
    ...sanitized
  };
}
function stepCountIs(stepCount) {
  return ({ steps }) => steps.length >= stepCount;
}
async function isStopConditionMet(options) {
  const { stopConditions, steps } = options;
  const results = await Promise.all(stopConditions.map((condition) => Promise.resolve(condition({
    steps
  }))));
  return results.some((result) => result === true);
}
const DEFAULT_MAX_STEPS = 5;
function isEventStream(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const constructorName = Object.getPrototypeOf(value)?.constructor?.name;
  if (constructorName === "EventStream") {
    return true;
  }
  const maybeStream = value;
  return typeof maybeStream.toReadableStream === "function";
}
class ModelResult {
  constructor(options) {
    this.reusableStream = null;
    this.textPromise = null;
    this.initPromise = null;
    this.toolExecutionPromise = null;
    this.finalResponse = null;
    this.toolEventBroadcaster = null;
    this.allToolExecutionRounds = [];
    this.resolvedRequest = null;
    this.stateAccessor = null;
    this.currentState = null;
    this.requireApprovalFn = null;
    this.approvedToolCalls = [];
    this.rejectedToolCalls = [];
    this.isResumingFromApproval = false;
    this.turnBroadcaster = null;
    this.initialStreamPipeStarted = false;
    this.initialPipePromise = null;
    this.contextStore = null;
    this.options = options;
    const hasApprovalDecisions = options.approveToolCalls && options.approveToolCalls.length > 0 || options.rejectToolCalls && options.rejectToolCalls.length > 0;
    if (hasApprovalDecisions && !options.state) {
      throw new Error('approveToolCalls and rejectToolCalls require a state accessor. Provide a StateAccessor via the "state" parameter to persist approval decisions.');
    }
    this.stateAccessor = options.state ?? null;
    this.requireApprovalFn = options.requireApproval ?? null;
    this.approvedToolCalls = options.approveToolCalls ?? [];
    this.rejectedToolCalls = options.rejectToolCalls ?? [];
  }
  /**
   * Get or create the unified turn broadcaster (lazy initialization).
   * Broadcasts all API stream events, tool events, and turn delimiters across turns.
   */
  ensureTurnBroadcaster() {
    if (!this.turnBroadcaster) {
      this.turnBroadcaster = new ToolEventBroadcaster();
    }
    return this.turnBroadcaster;
  }
  /**
   * Start piping the initial stream into the turn broadcaster.
   * Idempotent — only starts once even if called multiple times.
   * Wraps the initial stream events with turn.start(0) / turn.end(0) delimiters.
   */
  startInitialStreamPipe() {
    if (this.initialStreamPipeStarted)
      return;
    this.initialStreamPipeStarted = true;
    const broadcaster = this.ensureTurnBroadcaster();
    if (!this.reusableStream) {
      return;
    }
    const stream2 = this.reusableStream;
    this.initialPipePromise = (async () => {
      broadcaster.push({
        type: "turn.start",
        turnNumber: 0,
        timestamp: Date.now()
      });
      const consumer = stream2.createConsumer();
      for await (const event of consumer) {
        broadcaster.push(event);
      }
      broadcaster.push({
        type: "turn.end",
        turnNumber: 0,
        timestamp: Date.now()
      });
    })().catch((error) => {
      broadcaster.complete(error instanceof Error ? error : new Error(String(error)));
    });
  }
  /**
   * Pipe a follow-up stream into the turn broadcaster and capture the completed response.
   * Emits turn.start / turn.end delimiters around the stream events.
   */
  async pipeAndConsumeStream(stream2, turnNumber) {
    const broadcaster = this.turnBroadcaster;
    broadcaster.push({
      type: "turn.start",
      turnNumber,
      timestamp: Date.now()
    });
    const consumer = stream2.createConsumer();
    let completedResponse = null;
    for await (const event of consumer) {
      broadcaster.push(event);
      if (isResponseCompletedEvent(event)) {
        completedResponse = event.response;
      }
      if (isResponseFailedEvent(event)) {
        const errorMsg = "message" in event ? String(event.message) : "Response failed";
        throw new Error(errorMsg);
      }
      if (isResponseIncompleteEvent(event)) {
        completedResponse = event.response;
      }
    }
    broadcaster.push({
      type: "turn.end",
      turnNumber,
      timestamp: Date.now()
    });
    if (!completedResponse) {
      throw new Error("Follow-up stream ended without a completed response");
    }
    return completedResponse;
  }
  /**
   * Push a tool result event to both the legacy tool event broadcaster
   * and the unified turn broadcaster.
   */
  broadcastToolResult(toolCallId, result, preliminaryResults) {
    this.toolEventBroadcaster?.push({
      type: "tool_result",
      toolCallId,
      result,
      ...preliminaryResults?.length && { preliminaryResults }
    });
    this.turnBroadcaster?.push({
      type: "tool.result",
      toolCallId,
      result,
      timestamp: Date.now(),
      ...preliminaryResults?.length && { preliminaryResults }
    });
  }
  /**
   * Push a preliminary result event to both the legacy tool event broadcaster
   * and the unified turn broadcaster.
   */
  broadcastPreliminaryResult(toolCallId, result) {
    this.toolEventBroadcaster?.push({
      type: "preliminary_result",
      toolCallId,
      result
    });
    this.turnBroadcaster?.push({
      type: "tool.preliminary_result",
      toolCallId,
      result,
      timestamp: Date.now()
    });
  }
  /**
   * Set up the turn broadcaster with tool execution and return the consumer.
   * Used by stream methods that need to iterate over all turns.
   */
  startTurnBroadcasterExecution() {
    const broadcaster = this.ensureTurnBroadcaster();
    this.startInitialStreamPipe();
    const consumer = broadcaster.createConsumer();
    const executionPromise = this.executeToolsIfNeeded().finally(async () => {
      if (this.initialPipePromise) {
        await this.initialPipePromise;
      }
      broadcaster.complete();
    });
    return { consumer, executionPromise };
  }
  /**
   * Type guard to check if a value is a non-streaming response
   * Only requires 'output' field and absence of 'toReadableStream' method
   */
  isNonStreamingResponse(value) {
    return value !== null && typeof value === "object" && "output" in value && !("toReadableStream" in value);
  }
  // =========================================================================
  // Extracted Helper Methods for executeToolsIfNeeded
  // =========================================================================
  /**
   * Get initial response from stream or cached final response.
   * Consumes the stream to completion if needed to extract the response.
   *
   * @returns The complete non-streaming response
   * @throws Error if neither stream nor response has been initialized
   */
  async getInitialResponse() {
    if (this.finalResponse) {
      return this.finalResponse;
    }
    if (this.reusableStream) {
      return consumeStreamForCompletion(this.reusableStream);
    }
    throw new Error("Neither stream nor response initialized");
  }
  /**
   * Save response output to state.
   * Appends the response output to the message history and records the response ID.
   *
   * @param response - The API response to save
   */
  async saveResponseToState(response) {
    if (!this.stateAccessor || !this.currentState)
      return;
    const outputItems = Array.isArray(response.output) ? response.output : [response.output];
    await this.saveStateSafely({
      messages: appendToMessages(this.currentState.messages, outputItems),
      previousResponseId: response.id
    });
  }
  /**
   * Mark state as complete.
   * Sets the conversation status to 'complete' indicating no further tool execution is needed.
   */
  async markStateComplete() {
    await this.saveStateSafely({ status: "complete" });
  }
  /**
   * Save tool results to state.
   * Appends tool execution results to the message history for multi-turn context.
   *
   * @param toolResults - The tool execution results to save
   */
  async saveToolResultsToState(toolResults) {
    if (!this.currentState)
      return;
    await this.saveStateSafely({
      messages: appendToMessages(this.currentState.messages, toolResults)
    });
  }
  /**
   * Check if execution should be interrupted by external signal.
   * Polls the state accessor for interruption flags set by external processes.
   *
   * @param currentResponse - The current response to save as partial state
   * @returns True if interrupted and caller should exit, false to continue
   */
  async checkForInterruption(currentResponse) {
    if (!this.stateAccessor)
      return false;
    const freshState = await this.stateAccessor.load();
    if (!freshState?.interruptedBy)
      return false;
    if (this.currentState) {
      const currentToolCalls = extractToolCallsFromResponse(currentResponse);
      await this.saveStateSafely({
        status: "interrupted",
        partialResponse: {
          text: extractTextFromResponse$1(currentResponse),
          toolCalls: currentToolCalls
        }
      });
    }
    this.finalResponse = currentResponse;
    return true;
  }
  /**
   * Check if stop conditions are met.
   * Returns true if execution should stop.
   *
   * @remarks
   * Default: stepCountIs(DEFAULT_MAX_STEPS) if no stopWhen is specified.
   * This evaluates stop conditions against the complete step history.
   */
  async shouldStopExecution() {
    const stopWhen = this.options.stopWhen ?? stepCountIs(DEFAULT_MAX_STEPS);
    const stopConditions = Array.isArray(stopWhen) ? stopWhen : [stopWhen];
    return isStopConditionMet({
      stopConditions,
      steps: this.allToolExecutionRounds.map((round) => ({
        stepType: "continue",
        text: extractTextFromResponse(round.response),
        toolCalls: round.toolCalls,
        toolResults: round.toolResults.map((tr) => ({
          toolCallId: tr.callId,
          toolName: round.toolCalls.find((tc) => tc.id === tr.callId)?.name ?? "",
          result: typeof tr.output === "string" ? JSON.parse(tr.output) : tr.output
        })),
        response: round.response,
        usage: round.response.usage,
        finishReason: void 0
      }))
    });
  }
  /**
   * Check if any tool calls have execute functions.
   * Used to determine if automatic tool execution should be attempted.
   *
   * @param toolCalls - The tool calls to check
   * @returns True if at least one tool call has an executable function
   */
  hasExecutableToolCalls(toolCalls) {
    return toolCalls.some((toolCall) => {
      const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
      return tool && hasExecuteFunction(tool);
    });
  }
  /**
   * Execute tools that can auto-execute (don't require approval) in parallel.
   *
   * @param toolCalls - The tool calls to execute
   * @param turnContext - The current turn context
   * @returns Array of unsent tool results for later submission
   */
  async executeAutoApproveTools(toolCalls, turnContext) {
    const toolCallPromises = toolCalls.map(async (tc) => {
      const tool = this.options.tools?.find((t) => t.function.name === tc.name);
      if (!tool || !hasExecuteFunction(tool)) {
        return null;
      }
      const result = await executeTool(tool, tc, turnContext, void 0, this.contextStore ?? void 0, this.options.sharedContextSchema);
      if (result.error) {
        return createRejectedResult(tc.id, String(tc.name), result.error.message);
      }
      return createUnsentResult(tc.id, String(tc.name), result.result);
    });
    const settledResults = await Promise.allSettled(toolCallPromises);
    const results = [];
    for (let i = 0; i < settledResults.length; i++) {
      const settled = settledResults[i];
      const tc = toolCalls[i];
      if (!settled || !tc)
        continue;
      if (settled.status === "rejected") {
        const errorMessage = settled.reason instanceof Error ? settled.reason.message : String(settled.reason);
        results.push(createRejectedResult(tc.id, String(tc.name), errorMessage));
        continue;
      }
      if (settled.value) {
        results.push(settled.value);
      }
    }
    return results;
  }
  /**
   * Check for tools requiring approval and handle accordingly.
   * Partitions tool calls into those needing approval and those that can auto-execute.
   *
   * @param toolCalls - The tool calls to check
   * @param currentRound - The current execution round (1-indexed)
   * @param currentResponse - The current response to save if pausing
   * @returns True if execution should pause for approval, false to continue
   * @throws Error if approval is required but no state accessor is configured
   */
  async handleApprovalCheck(toolCalls, currentRound, currentResponse) {
    if (!this.options.tools)
      return false;
    const turnContext = {
      numberOfTurns: currentRound
      // context is handled via contextStore, not on TurnContext
    };
    const { requiresApproval: needsApproval, autoExecute } = await partitionToolCalls(toolCalls, this.options.tools, turnContext, this.requireApprovalFn ?? void 0);
    if (needsApproval.length === 0)
      return false;
    if (!this.stateAccessor) {
      const toolNames = needsApproval.map((tc) => tc.name).join(", ");
      throw new Error(`Tool(s) require approval but no state accessor is configured: ${toolNames}. Provide a StateAccessor via the "state" parameter to enable approval workflows.`);
    }
    const unsentResults = await this.executeAutoApproveTools(autoExecute, turnContext);
    const stateUpdates = {
      pendingToolCalls: needsApproval,
      status: "awaiting_approval"
    };
    if (unsentResults.length > 0) {
      stateUpdates.unsentToolResults = unsentResults;
    }
    await this.saveStateSafely(stateUpdates);
    this.finalResponse = currentResponse;
    return true;
  }
  /**
   * Execute all tools in a single round in parallel.
   * Emits tool.result events after tool execution completes.
   *
   * @param toolCalls - The tool calls to execute
   * @param turnContext - The current turn context
   * @returns Array of function call outputs formatted for the API
   */
  async executeToolRound(toolCalls, turnContext) {
    const toolCallPromises = toolCalls.map(async (toolCall) => {
      const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
      if (!tool || !hasExecuteFunction(tool)) {
        return null;
      }
      const args = toolCall.arguments;
      if (typeof args === "string") {
        const rawArgs = args;
        const errorMessage = `Failed to parse tool call arguments for "${toolCall.name}": The model provided invalid JSON. Raw arguments received: "${rawArgs}". Please provide valid JSON arguments for this tool call.`;
        this.broadcastToolResult(toolCall.id, { error: errorMessage });
        return {
          type: "parse_error",
          toolCall,
          output: {
            type: "function_call_output",
            id: `output_${toolCall.id}`,
            callId: toolCall.id,
            output: JSON.stringify({ error: errorMessage })
          }
        };
      }
      const preliminaryResultsForCall = [];
      const hasBroadcaster = this.toolEventBroadcaster || this.turnBroadcaster;
      const onPreliminaryResult = hasBroadcaster ? (callId, resultValue) => {
        const typedResult = resultValue;
        preliminaryResultsForCall.push(typedResult);
        this.broadcastPreliminaryResult(callId, typedResult);
      } : void 0;
      const result = await executeTool(tool, toolCall, turnContext, onPreliminaryResult, this.contextStore ?? void 0, this.options.sharedContextSchema);
      return {
        type: "execution",
        toolCall,
        tool,
        result,
        preliminaryResultsForCall
      };
    });
    const settledResults = await Promise.allSettled(toolCallPromises);
    const toolResults = [];
    for (let i = 0; i < settledResults.length; i++) {
      const settled = settledResults[i];
      const originalToolCall = toolCalls[i];
      if (!settled || !originalToolCall)
        continue;
      if (settled.status === "rejected") {
        const errorMessage = settled.reason instanceof Error ? settled.reason.message : String(settled.reason);
        this.broadcastToolResult(originalToolCall.id, { error: errorMessage });
        const rejectedOutput = {
          type: "function_call_output",
          id: `output_${originalToolCall.id}`,
          callId: originalToolCall.id,
          output: JSON.stringify({ error: errorMessage })
        };
        toolResults.push(rejectedOutput);
        this.turnBroadcaster?.push({
          type: "tool.call_output",
          output: rejectedOutput,
          timestamp: Date.now()
        });
        continue;
      }
      const value = settled.value;
      if (!value)
        continue;
      if (value.type === "parse_error") {
        toolResults.push(value.output);
        this.turnBroadcaster?.push({
          type: "tool.call_output",
          output: value.output,
          timestamp: Date.now()
        });
        continue;
      }
      const toolResult = value.result.error ? { error: value.result.error.message } : value.result.result;
      this.broadcastToolResult(value.toolCall.id, toolResult, value.preliminaryResultsForCall.length > 0 ? value.preliminaryResultsForCall : void 0);
      const executedOutput = {
        type: "function_call_output",
        id: `output_${value.toolCall.id}`,
        callId: value.toolCall.id,
        output: value.result.error ? JSON.stringify({ error: value.result.error.message }) : JSON.stringify(value.result.result)
      };
      toolResults.push(executedOutput);
      this.turnBroadcaster?.push({
        type: "tool.call_output",
        output: executedOutput,
        timestamp: Date.now()
      });
    }
    return toolResults;
  }
  /**
   * Resolve async functions for the current turn.
   * Updates the resolved request with turn-specific parameter values.
   *
   * @param turnContext - The turn context for parameter resolution
   */
  async resolveAsyncFunctionsForTurn(turnContext) {
    if (hasAsyncFunctions(this.options.request)) {
      const resolved = await resolveAsyncFunctions(this.options.request, turnContext);
      const preservedInput = this.resolvedRequest?.input;
      const preservedStream = this.resolvedRequest?.stream;
      this.resolvedRequest = {
        ...resolved,
        stream: preservedStream ?? true,
        ...preservedInput !== void 0 && { input: preservedInput }
      };
    }
  }
  /**
   * Apply nextTurnParams from executed tools.
   * Allows tools to modify request parameters for subsequent turns.
   *
   * @param toolCalls - The tool calls that were just executed
   */
  async applyNextTurnParams(toolCalls) {
    if (!this.options.tools || toolCalls.length === 0 || !this.resolvedRequest) {
      return;
    }
    const computedParams = await executeNextTurnParamsFunctions(toolCalls, this.options.tools, this.resolvedRequest);
    if (Object.keys(computedParams).length > 0) {
      this.resolvedRequest = applyNextTurnParamsToRequest(this.resolvedRequest, computedParams);
    }
  }
  /**
   * Make a follow-up API request with tool results.
   * Uses streaming and pipes events through the turn broadcaster when available.
   */
  async makeFollowupRequest(currentResponse, toolResults, turnNumber) {
    const originalInput = this.resolvedRequest?.input;
    const normalizedOriginalInput = Array.isArray(originalInput) ? originalInput : originalInput ? [{ role: "user", content: originalInput }] : [];
    const newInput = [
      ...normalizedOriginalInput,
      ...Array.isArray(currentResponse.output) ? currentResponse.output : [currentResponse.output],
      ...toolResults
    ];
    if (!this.resolvedRequest) {
      throw new Error("Request not initialized");
    }
    this.resolvedRequest = {
      ...this.resolvedRequest,
      input: newInput
    };
    const newRequest = {
      ...this.resolvedRequest,
      stream: true
    };
    const newResult = await betaResponsesSend(this.options.client, { responsesRequest: newRequest }, this.options.options);
    if (!newResult.ok) {
      throw newResult.error;
    }
    const value = newResult.value;
    if (isEventStream(value)) {
      const followUpStream = new ReusableReadableStream(value);
      if (this.turnBroadcaster) {
        return this.pipeAndConsumeStream(followUpStream, turnNumber);
      }
      return consumeStreamForCompletion(followUpStream);
    } else if (this.isNonStreamingResponse(value)) {
      return value;
    } else {
      throw new Error("Unexpected response type from API");
    }
  }
  /**
   * Validate the final response has required fields.
   *
   * @param response - The response to validate
   * @throws Error if response is missing required fields or has invalid output
   */
  validateFinalResponse(response) {
    if (!response?.id || !response?.output) {
      throw new Error("Invalid final response: missing required fields");
    }
    if (!Array.isArray(response.output) || response.output.length === 0) {
      throw new Error("Invalid final response: empty or invalid output");
    }
  }
  /**
   * Resolve async functions in the request for a given turn context.
   * Extracts non-function fields and resolves any async parameter functions.
   *
   * @param context - The turn context for parameter resolution
   * @returns The resolved request without async functions
   */
  async resolveRequestForContext(context) {
    if (hasAsyncFunctions(this.options.request)) {
      return resolveAsyncFunctions(this.options.request, context);
    }
    const { stopWhen: _, state: _s, requireApproval: _r, approveToolCalls: _a2, rejectToolCalls: _rj, context: _c, ...rest } = this.options.request;
    return rest;
  }
  /**
   * Safely persist state with error handling.
   * Wraps state save operations to ensure failures are properly reported.
   *
   * @param updates - Optional partial state updates to apply before saving
   * @throws Error if state persistence fails
   */
  async saveStateSafely(updates) {
    if (!this.stateAccessor || !this.currentState)
      return;
    if (updates) {
      this.currentState = updateState(this.currentState, updates);
    }
    try {
      await this.stateAccessor.save(this.currentState);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to persist conversation state: ${message}`);
    }
  }
  /**
   * Remove optional properties from state when they should be cleared.
   * Uses delete to properly remove optional properties rather than setting undefined.
   *
   * @param props - Array of property names to remove from current state
   */
  clearOptionalStateProperties(props) {
    if (!this.currentState)
      return;
    for (const prop of props) {
      delete this.currentState[prop];
    }
  }
  // =========================================================================
  // Core Methods
  // =========================================================================
  /**
   * Initialize the stream if not already started
   * This is idempotent - multiple calls will return the same promise
   */
  initStream() {
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = (async () => {
      if (this.stateAccessor) {
        const loadedState = await this.stateAccessor.load();
        if (loadedState) {
          this.currentState = loadedState;
          if (loadedState.status === "awaiting_approval" && (this.approvedToolCalls.length > 0 || this.rejectedToolCalls.length > 0)) {
            if (this.options.context !== void 0) {
              const approvalContext = { numberOfTurns: 0 };
              const resolvedCtx = await resolveContext(this.options.context, approvalContext);
              this.contextStore = new ToolContextStore(resolvedCtx);
            }
            this.isResumingFromApproval = true;
            await this.processApprovalDecisions();
            return;
          }
          if (loadedState.interruptedBy) {
            this.currentState = updateState(loadedState, { status: "in_progress" });
            this.clearOptionalStateProperties(["interruptedBy"]);
            await this.saveStateSafely();
          }
        } else {
          this.currentState = createInitialState();
        }
        await this.saveStateSafely({ status: "in_progress" });
      }
      const initialContext = { numberOfTurns: 0 };
      if (this.options.context !== void 0) {
        const resolvedCtx = await resolveContext(this.options.context, initialContext);
        this.contextStore = new ToolContextStore(resolvedCtx);
      }
      let baseRequest = await this.resolveRequestForContext(initialContext);
      if (this.currentState && this.currentState.messages && Array.isArray(this.currentState.messages) && this.currentState.messages.length > 0) {
        const newInput = baseRequest.input;
        if (newInput) {
          const inputArray = Array.isArray(newInput) ? newInput : [newInput];
          baseRequest = {
            ...baseRequest,
            input: appendToMessages(this.currentState.messages, inputArray)
          };
        } else {
          baseRequest = {
            ...baseRequest,
            input: this.currentState.messages
          };
        }
      }
      this.resolvedRequest = {
        ...baseRequest,
        stream: true
      };
      const request = this.resolvedRequest;
      const apiResult = await betaResponsesSend(this.options.client, { responsesRequest: request }, this.options.options);
      if (!apiResult.ok) {
        throw apiResult.error;
      }
      if (isEventStream(apiResult.value)) {
        this.reusableStream = new ReusableReadableStream(apiResult.value);
      } else if (this.isNonStreamingResponse(apiResult.value)) {
        this.finalResponse = apiResult.value;
      } else {
        throw new Error("Unexpected response type from API");
      }
    })();
    return this.initPromise;
  }
  /**
   * Process approval/rejection decisions and resume execution
   */
  async processApprovalDecisions() {
    if (!this.currentState || !this.stateAccessor) {
      throw new Error("Cannot process approval decisions without state");
    }
    const pendingCalls = this.currentState.pendingToolCalls ?? [];
    const unsentResults = [...this.currentState.unsentToolResults ?? []];
    const turnContext = {
      numberOfTurns: this.allToolExecutionRounds.length + 1
      // context is handled via contextStore, not on TurnContext
    };
    for (const callId of this.approvedToolCalls) {
      const toolCall = pendingCalls.find((tc) => tc.id === callId);
      if (!toolCall)
        continue;
      const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
      if (!tool || !hasExecuteFunction(tool)) {
        unsentResults.push(createRejectedResult(callId, String(toolCall.name), "Tool not found or not executable"));
        continue;
      }
      const result = await executeTool(tool, toolCall, turnContext, void 0, this.contextStore ?? void 0, this.options.sharedContextSchema);
      if (result.error) {
        unsentResults.push(createRejectedResult(callId, String(toolCall.name), result.error.message));
      } else {
        unsentResults.push(createUnsentResult(callId, String(toolCall.name), result.result));
      }
    }
    for (const callId of this.rejectedToolCalls) {
      const toolCall = pendingCalls.find((tc) => tc.id === callId);
      if (!toolCall)
        continue;
      unsentResults.push(createRejectedResult(callId, String(toolCall.name), "Rejected by user"));
    }
    const processedIds = /* @__PURE__ */ new Set([...this.approvedToolCalls, ...this.rejectedToolCalls]);
    const remainingPending = pendingCalls.filter((tc) => !processedIds.has(tc.id));
    const stateUpdates = {
      status: remainingPending.length > 0 ? "awaiting_approval" : "in_progress"
    };
    if (remainingPending.length > 0) {
      stateUpdates.pendingToolCalls = remainingPending;
    }
    if (unsentResults.length > 0) {
      stateUpdates.unsentToolResults = unsentResults;
    }
    await this.saveStateSafely(stateUpdates);
    const propsToClear = [];
    if (remainingPending.length === 0)
      propsToClear.push("pendingToolCalls");
    if (unsentResults.length === 0)
      propsToClear.push("unsentToolResults");
    if (propsToClear.length > 0) {
      this.clearOptionalStateProperties(propsToClear);
      await this.saveStateSafely();
    }
    if (remainingPending.length > 0) {
      return;
    }
    await this.continueWithUnsentResults();
  }
  /**
   * Continue execution with unsent tool results
   */
  async continueWithUnsentResults() {
    if (!this.currentState || !this.stateAccessor)
      return;
    const unsentResults = this.currentState.unsentToolResults ?? [];
    if (unsentResults.length === 0)
      return;
    const toolOutputs = unsentResultsToAPIFormat(unsentResults);
    const currentMessages = this.currentState.messages;
    const newInput = appendToMessages(currentMessages, toolOutputs);
    this.currentState = updateState(this.currentState, {
      messages: newInput
    });
    this.clearOptionalStateProperties(["unsentToolResults"]);
    await this.saveStateSafely();
    const turnContext = {
      numberOfTurns: this.allToolExecutionRounds.length + 1
    };
    const baseRequest = await this.resolveRequestForContext(turnContext);
    const request = {
      ...baseRequest,
      input: newInput,
      stream: true
    };
    this.resolvedRequest = request;
    const apiResult = await betaResponsesSend(this.options.client, { responsesRequest: request }, this.options.options);
    if (!apiResult.ok) {
      throw apiResult.error;
    }
    if (isEventStream(apiResult.value)) {
      this.reusableStream = new ReusableReadableStream(apiResult.value);
    } else if (this.isNonStreamingResponse(apiResult.value)) {
      this.finalResponse = apiResult.value;
    } else {
      throw new Error("Unexpected response type from API");
    }
  }
  /**
   * Execute tools automatically if they are provided and have execute functions
   * This is idempotent - multiple calls will return the same promise
   */
  async executeToolsIfNeeded() {
    if (this.toolExecutionPromise) {
      return this.toolExecutionPromise;
    }
    this.toolExecutionPromise = (async () => {
      await this.initStream();
      if (this.isResumingFromApproval && this.currentState?.status === "awaiting_approval") {
        return;
      }
      let currentResponse = await this.getInitialResponse();
      await this.saveResponseToState(currentResponse);
      const hasToolCalls = currentResponse.output.some((item) => hasTypeProperty(item) && item.type === "function_call");
      if (!this.options.tools?.length || !hasToolCalls) {
        this.finalResponse = currentResponse;
        await this.markStateComplete();
        return;
      }
      const toolCalls = extractToolCallsFromResponse(currentResponse);
      if (await this.handleApprovalCheck(toolCalls, 0, currentResponse)) {
        return;
      }
      if (!this.hasExecutableToolCalls(toolCalls)) {
        this.finalResponse = currentResponse;
        await this.markStateComplete();
        return;
      }
      let currentRound = 0;
      while (true) {
        if (await this.checkForInterruption(currentResponse)) {
          return;
        }
        if (await this.shouldStopExecution()) {
          break;
        }
        const currentToolCalls = extractToolCallsFromResponse(currentResponse);
        if (currentToolCalls.length === 0) {
          break;
        }
        if (await this.handleApprovalCheck(currentToolCalls, currentRound + 1, currentResponse)) {
          return;
        }
        if (!this.hasExecutableToolCalls(currentToolCalls)) {
          break;
        }
        const turnNumber = currentRound + 1;
        const turnContext = { numberOfTurns: turnNumber };
        await this.options.onTurnStart?.(turnContext);
        await this.resolveAsyncFunctionsForTurn(turnContext);
        const toolResults = await this.executeToolRound(currentToolCalls, turnContext);
        this.allToolExecutionRounds.push({
          round: currentRound,
          toolCalls: currentToolCalls,
          response: currentResponse,
          toolResults
        });
        await this.saveToolResultsToState(toolResults);
        await this.applyNextTurnParams(currentToolCalls);
        currentResponse = await this.makeFollowupRequest(currentResponse, toolResults, turnNumber);
        await this.options.onTurnEnd?.(turnContext, currentResponse);
        await this.saveResponseToState(currentResponse);
        currentRound++;
      }
      this.validateFinalResponse(currentResponse);
      this.finalResponse = currentResponse;
      await this.markStateComplete();
    })();
    return this.toolExecutionPromise;
  }
  /**
   * Internal helper to get the text after tool execution
   */
  async getTextInternal() {
    await this.executeToolsIfNeeded();
    if (!this.finalResponse) {
      throw new Error("Response not available");
    }
    return extractTextFromResponse(this.finalResponse);
  }
  /**
   * Get just the text content from the response.
   * This will consume the stream until completion, execute any tools, and extract the text.
   */
  getText() {
    if (this.textPromise) {
      return this.textPromise;
    }
    this.textPromise = this.getTextInternal();
    return this.textPromise;
  }
  /**
   * Get the complete response object including usage information.
   * This will consume the stream until completion and execute any tools.
   * Returns the full OpenResponsesResult with usage data (inputTokens, outputTokens, cachedTokens, etc.)
   */
  async getResponse() {
    await this.executeToolsIfNeeded();
    if (!this.finalResponse) {
      throw new Error("Response not available");
    }
    return this.finalResponse;
  }
  /**
   * Stream all response events as they arrive across all turns.
   * Multiple consumers can iterate over this stream concurrently.
   * Includes API events, tool events, and turn.start/turn.end delimiters.
   */
  getFullResponsesStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (!this.options.tools?.length) {
        if (this.reusableStream) {
          const consumer2 = this.reusableStream.createConsumer();
          for await (const event of consumer2) {
            yield event;
          }
        }
        return;
      }
      const { consumer, executionPromise } = this.startTurnBroadcasterExecution();
      for await (const event of consumer) {
        yield event;
      }
      await executionPromise;
    }.call(this);
  }
  /**
   * Stream only text deltas as they arrive from all turns.
   * This filters the full event stream to only yield text content,
   * including text from follow-up responses in multi-turn tool loops.
   */
  getTextStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (!this.options.tools?.length) {
        if (this.reusableStream) {
          yield* extractTextDeltas(this.reusableStream);
        }
        return;
      }
      const { consumer, executionPromise } = this.startTurnBroadcasterExecution();
      for await (const event of consumer) {
        if (isOutputTextDeltaEvent(event)) {
          yield event.delta;
        }
      }
      await executionPromise;
    }.call(this);
  }
  /**
   * Stream all output items cumulatively as they arrive.
   * Items are emitted with the same ID but progressively updated content as streaming progresses.
   * Also yields tool results (function_call_output) after tool execution completes.
   *
   * Item types include:
   * - message: Assistant text responses (emitted cumulatively as text streams)
   * - function_call: Tool calls (emitted cumulatively as arguments stream)
   * - reasoning: Model reasoning (emitted cumulatively as thinking streams)
   * - web_search_call: Web search operations
   * - file_search_call: File search operations
   * - image_generation_call: Image generation operations
   * - function_call_output: Results from executed tools
   */
  getItemsStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (!this.options.tools?.length) {
        if (this.reusableStream) {
          yield* buildItemsStream(this.reusableStream);
        }
        return;
      }
      const { consumer, executionPromise } = this.startTurnBroadcasterExecution();
      const itemsInProgress = /* @__PURE__ */ new Map();
      for await (const event of consumer) {
        if (isToolCallOutputEvent(event)) {
          yield event.output;
          continue;
        }
        if ("type" in event && streamTerminationEvents.has(event.type)) {
          itemsInProgress.clear();
        }
        if ("type" in event && event.type in itemsStreamHandlers) {
          const handler = itemsStreamHandlers[event.type];
          if (handler) {
            const result = handler(event, itemsInProgress);
            if (result) {
              yield result;
            }
          }
        }
      }
      await executionPromise;
    }.call(this);
  }
  /**
   * @deprecated Use `getItemsStream()` instead. This method only streams messages,
   * while `getItemsStream()` streams all output item types (messages, function_calls,
   * reasoning, etc.) with cumulative updates.
   *
   * Stream cumulative message snapshots as content is added in responses format.
   * Each iteration yields an updated version of the message with new content.
   * Also yields function_call items and FunctionCallOutputItem after tool execution completes.
   * Returns OutputMessage, OutputFunctionCallItem, or FunctionCallOutputItem
   * compatible with OpenAI Responses API format.
   */
  getNewMessagesStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (this.reusableStream) {
        yield* buildResponsesMessageStream(this.reusableStream);
      }
      await this.executeToolsIfNeeded();
      for (const round of this.allToolExecutionRounds) {
        for (const item of round.response.output) {
          if (isFunctionCallItem(item)) {
            yield item;
          }
        }
        for (const toolResult of round.toolResults) {
          yield toolResult;
        }
      }
      if (this.finalResponse && this.allToolExecutionRounds.length > 0) {
        const hasMessage = this.finalResponse.output.some((item) => hasTypeProperty(item) && item.type === "message");
        if (hasMessage) {
          yield extractResponsesMessageFromResponse(this.finalResponse);
        }
      }
    }.call(this);
  }
  /**
   * Stream only reasoning deltas as they arrive from all turns.
   * This filters the full event stream to only yield reasoning content,
   * including reasoning from follow-up responses in multi-turn tool loops.
   */
  getReasoningStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (!this.options.tools?.length) {
        if (this.reusableStream) {
          yield* extractReasoningDeltas(this.reusableStream);
        }
        return;
      }
      const { consumer, executionPromise } = this.startTurnBroadcasterExecution();
      for await (const event of consumer) {
        if (isReasoningDeltaEvent(event)) {
          yield event.delta;
        }
      }
      await executionPromise;
    }.call(this);
  }
  /**
   * Stream tool call argument deltas and preliminary results from all turns.
   * Preliminary results are streamed in REAL-TIME as generator tools yield.
   * - Tool call argument deltas as { type: "delta", content: string }
   * - Preliminary results as { type: "preliminary_result", toolCallId, result }
   */
  getToolStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (!this.options.tools?.length) {
        if (this.reusableStream) {
          for await (const delta of extractToolDeltas(this.reusableStream)) {
            yield { type: "delta", content: delta };
          }
        }
        return;
      }
      const { consumer, executionPromise } = this.startTurnBroadcasterExecution();
      for await (const event of consumer) {
        if (event.type === "response.function_call_arguments.delta") {
          yield { type: "delta", content: event.delta };
          continue;
        }
        if (event.type === "tool.preliminary_result") {
          yield {
            type: "preliminary_result",
            toolCallId: event.toolCallId,
            result: event.result
          };
        }
      }
      await executionPromise;
    }.call(this);
  }
  /**
   * Get all tool calls from the completed response (before auto-execution).
   * Note: If tools have execute functions, they will be automatically executed
   * and this will return the tool calls from the initial response.
   * Returns structured tool calls with parsed arguments.
   */
  async getToolCalls() {
    await this.initStream();
    if (this.finalResponse) {
      return extractToolCallsFromResponse(this.finalResponse);
    }
    if (!this.reusableStream) {
      throw new Error("Stream not initialized");
    }
    const completedResponse = await consumeStreamForCompletion(this.reusableStream);
    return extractToolCallsFromResponse(completedResponse);
  }
  /**
   * Stream structured tool call objects as they're completed.
   * Each iteration yields a complete tool call with parsed arguments.
   */
  getToolCallsStream() {
    return async function* () {
      await this.initStream();
      if (!this.reusableStream && !this.finalResponse) {
        throw new Error("Stream not initialized");
      }
      if (this.reusableStream) {
        yield* buildToolCallStream(this.reusableStream);
      }
    }.call(this);
  }
  /**
   * Returns an async iterable that emits a full context snapshot every time
   * any tool calls ctx.update(). Can be consumed concurrently with getText(),
   * getToolStream(), etc.
   *
   * @example
   * ```typescript
   * for await (const snapshot of result.getContextUpdates()) {
   *   console.log('Context changed:', snapshot);
   * }
   * ```
   */
  async *getContextUpdates() {
    await this.initStream();
    if (!this.contextStore) {
      return;
    }
    const store = this.contextStore;
    const queue = [];
    let resolve = null;
    let done = false;
    const unsubscribe = store.subscribe((snapshot) => {
      queue.push(snapshot);
      if (resolve) {
        resolve();
        resolve = null;
      }
    });
    this.executeToolsIfNeeded().then(() => {
      done = true;
      if (resolve) {
        resolve();
        resolve = null;
      }
    }, () => {
      done = true;
      if (resolve) {
        resolve();
        resolve = null;
      }
    });
    try {
      while (!done) {
        if (queue.length > 0) {
          yield queue.shift();
        } else {
          await new Promise((r) => {
            resolve = r;
          });
        }
      }
      while (queue.length > 0) {
        yield queue.shift();
      }
    } finally {
      unsubscribe();
    }
  }
  /**
   * Cancel the underlying stream and all consumers
   */
  async cancel() {
    if (this.reusableStream) {
      await this.reusableStream.cancel();
    }
  }
  // =========================================================================
  // Multi-Turn Conversation State Methods
  // =========================================================================
  /**
   * Check if the conversation requires human approval to continue.
   * Returns true if there are pending tool calls awaiting approval.
   */
  async requiresApproval() {
    await this.initStream();
    if (this.currentState?.status === "awaiting_approval") {
      return true;
    }
    return (this.currentState?.pendingToolCalls?.length ?? 0) > 0;
  }
  /**
   * Get the pending tool calls that require approval.
   * Returns empty array if no approvals needed.
   */
  async getPendingToolCalls() {
    await this.initStream();
    if (!this.isResumingFromApproval) {
      await this.executeToolsIfNeeded();
    }
    return this.currentState?.pendingToolCalls ?? [];
  }
  /**
   * Get the current conversation state.
   * Useful for inspection, debugging, or custom persistence.
   * Note: This returns the raw ConversationState for inspection only.
   * To resume a conversation, use the StateAccessor pattern.
   */
  async getState() {
    await this.initStream();
    if (!this.isResumingFromApproval) {
      await this.executeToolsIfNeeded();
    }
    if (!this.currentState) {
      throw new Error("State not initialized. Make sure a StateAccessor was provided to callModel.");
    }
    return this.currentState;
  }
}
function callModel(client, request, options) {
  const { tools, stopWhen, state, requireApproval, approveToolCalls, rejectToolCalls, context, sharedContextSchema, onTurnStart, onTurnEnd, ...apiRequest } = request;
  const apiTools = tools ? convertToolsToAPIFormat(tools) : void 0;
  const finalRequest = {
    ...apiRequest
  };
  if (apiTools !== void 0) {
    finalRequest["tools"] = apiTools;
  }
  const callModelOptions = {
    ...options,
    headers: {
      ...Object.fromEntries(new Headers(options?.headers ?? options?.fetchOptions?.headers ?? void 0)),
      "x-openrouter-callmodel": "true"
    }
  };
  return new ModelResult({
    client,
    request: finalRequest,
    options: callModelOptions,
    tools,
    ...stopWhen !== void 0 && { stopWhen },
    // Pass state management options
    ...state !== void 0 && { state },
    ...requireApproval !== void 0 && { requireApproval },
    ...approveToolCalls !== void 0 && { approveToolCalls },
    ...rejectToolCalls !== void 0 && { rejectToolCalls },
    ...context !== void 0 && { context },
    ...sharedContextSchema !== void 0 && { sharedContextSchema },
    ...onTurnStart !== void 0 && { onTurnStart },
    ...onTurnEnd !== void 0 && { onTurnEnd }
  });
}
class OpenRouter extends ClientSDK {
  get analytics() {
    return this._analytics ?? (this._analytics = new Analytics(this._options));
  }
  get tts() {
    return this._tts ?? (this._tts = new Tts(this._options));
  }
  get stt() {
    return this._stt ?? (this._stt = new Stt(this._options));
  }
  get oAuth() {
    return this._oAuth ?? (this._oAuth = new OAuth(this._options));
  }
  get chat() {
    return this._chat ?? (this._chat = new Chat(this._options));
  }
  get credits() {
    return this._credits ?? (this._credits = new Credits(this._options));
  }
  get embeddings() {
    return this._embeddings ?? (this._embeddings = new Embeddings(this._options));
  }
  get endpoints() {
    return this._endpoints ?? (this._endpoints = new Endpoints(this._options));
  }
  get generations() {
    return this._generations ?? (this._generations = new Generations(this._options));
  }
  get guardrails() {
    return this._guardrails ?? (this._guardrails = new Guardrails(this._options));
  }
  get apiKeys() {
    return this._apiKeys ?? (this._apiKeys = new APIKeys(this._options));
  }
  get models() {
    return this._models ?? (this._models = new Models(this._options));
  }
  get organization() {
    return this._organization ?? (this._organization = new Organization(this._options));
  }
  get providers() {
    return this._providers ?? (this._providers = new Providers(this._options));
  }
  get rerank() {
    return this._rerank ?? (this._rerank = new Rerank(this._options));
  }
  get beta() {
    return this._beta ?? (this._beta = new Beta(this._options));
  }
  get videoGeneration() {
    return this._videoGeneration ?? (this._videoGeneration = new VideoGeneration(this._options));
  }
  get workspaces() {
    return this._workspaces ?? (this._workspaces = new Workspaces(this._options));
  }
  // #region sdk-class-body
  callModel(request, options) {
    return callModel(this, request, options);
  }
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-DVOLq0Aw.js").then((n) => n.a6).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function getEnvValue(env2, key) {
  if (env2 && typeof env2 === "object" && key in env2) {
    const value = env2[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  if (typeof process !== "undefined" && process.env) {
    const value = process.env[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return void 0;
}
function getDataApiConfig(env2) {
  const url = getEnvValue(env2, "MONGODB_DATA_API_URL");
  const apiKey = getEnvValue(env2, "MONGODB_DATA_API_KEY");
  const dataSource = getEnvValue(env2, "MONGODB_DATA_SOURCE");
  const database = getEnvValue(env2, "MONGODB_DATABASE");
  const collection = getEnvValue(env2, "MONGODB_USERS_COLLECTION") ?? "users";
  if (!url || !apiKey || !dataSource || !database) {
    return null;
  }
  return { url, apiKey, dataSource, database, collection };
}
async function callDataApi(config2, action, body) {
  return fetch(toDataApiActionUrl(config2.url, action), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": config2.apiKey
    },
    body: JSON.stringify({
      dataSource: config2.dataSource,
      database: config2.database,
      collection: config2.collection,
      ...body
    })
  });
}
async function lookupFirebaseUserByIdToken(idToken, env2) {
  const apiKey = getEnvValue(env2, "FIREBASE_WEB_API_KEY") ?? getEnvValue(env2, "VITE_FIREBASE_API_KEY");
  if (!apiKey) {
    throw new Error(
      "Missing FIREBASE_WEB_API_KEY or VITE_FIREBASE_API_KEY for token verification."
    );
  }
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken })
    }
  );
  if (!response.ok) {
    return null;
  }
  const payload = await response.json();
  return payload.users?.[0] ?? null;
}
function toDataApiActionUrl(url, action) {
  return url.replace(/\/action\/[^/]+$/, `/action/${action}`);
}
async function syncUserProfile(user, env2) {
  const config2 = getDataApiConfig(env2);
  if (!config2) {
    return;
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const response = await callDataApi(config2, "updateOne", {
    filter: { firebaseUid: user.localId },
    update: {
      $set: {
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        photoUrl: user.photoUrl ?? null,
        emailVerified: Boolean(user.emailVerified),
        lastLoginAt: now
      },
      $setOnInsert: {
        firebaseUid: user.localId,
        createdAt: now
      }
    },
    upsert: true
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }
}
async function readUserProfile(userId, env2) {
  const config2 = getDataApiConfig(env2);
  if (!config2) {
    return null;
  }
  const response = await callDataApi(config2, "findOne", {
    filter: { firebaseUid: userId },
    projection: { _id: 0 }
  });
  if (!response.ok) {
    return null;
  }
  const payload = await response.json();
  return payload.document ?? null;
}
function buildUserProfile(user, storedProfile) {
  const profile = storedProfile ?? {};
  return {
    ...profile,
    firebaseUid: user.localId ?? String(profile.firebaseUid ?? ""),
    email: profile.email ?? user.email ?? null,
    displayName: profile.displayName ?? user.displayName ?? null,
    photoUrl: profile.photoUrl ?? user.photoUrl ?? null,
    emailVerified: profile.emailVerified ?? Boolean(user.emailVerified),
    createdAt: profile.createdAt ?? user.createdAt ?? null,
    lastLoginAt: profile.lastLoginAt ?? user.lastLoginAt ?? null,
    source: storedProfile ? "backend" : "firebase",
    walletBalance: typeof profile.walletBalance === "number" ? profile.walletBalance : 1e3
  };
}
async function readWalletBalance(userId, env2) {
  const profile = await readUserProfile(userId, env2);
  return typeof profile?.walletBalance === "number" ? profile.walletBalance : 1e3;
}
async function readTransactions(userId, env2) {
  const config2 = getDataApiConfig(env2);
  if (!config2) {
    return [];
  }
  const response = await callDataApi(config2, "find", {
    filter: { $or: [{ senderId: userId }, { receiverId: userId }] },
    sort: { createdAt: -1 },
    limit: 50
  });
  if (!response.ok) {
    return [];
  }
  const payload = await response.json();
  return payload.documents ?? [];
}
async function incrementWalletBalance(userId, amount, env2) {
  const config2 = getDataApiConfig(env2);
  if (!config2) {
    throw new Error("Missing MongoDB Data API configuration for wallet updates.");
  }
  const response = await callDataApi(config2, "updateOne", {
    filter: { firebaseUid: userId },
    update: { $inc: { walletBalance: amount } }
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }
}
async function insertTransaction(transaction, env2) {
  const config2 = getDataApiConfig(env2);
  if (!config2) {
    throw new Error("Missing MongoDB Data API configuration for transactions.");
  }
  const response = await callDataApi(config2, "insertOne", {
    document: transaction
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }
}
async function syncUserToMongo(user, env2) {
  return syncUserProfile(user, env2);
}
async function completeAiChat(messages, env2) {
  const apiKey = getEnvValue(env2, "OPENROUTER_API_KEY") ?? getEnvValue(env2, "OPEN_ROUTER_API_KEY") ?? getEnvValue(env2, "OPENROUTER_KEY");
  const model = getEnvValue(env2, "OPENROUTER_MODEL") ?? getEnvValue(env2, "OPEN_ROUTER_MODEL") ?? "meta-llama/llama-3.1-8b-instruct";
  if (!apiKey) {
    throw new Error(
      "Missing OpenRouter key. Set OPENROUTER_API_KEY in server environment variables."
    );
  }
  const client = new OpenRouter({ apiKey });
  const response = await client.chat.send({
    chatRequest: {
      model,
      stream: false,
      messages
    }
  });
  const text2 = response.choices?.[0]?.message?.content;
  if (typeof text2 === "string") {
    return text2;
  }
  if (Array.isArray(text2)) {
    return text2.map((part) => typeof part === "string" ? part : part?.text ?? "").join("").trim();
  }
  return "I could not generate a response right now.";
}
async function handleApiRequest(request, env2) {
  const url = new URL(request.url);
  const allowedPaths = [
    "/api/users/sync",
    "/api/users/me",
    "/api/ai/chat",
    "/api/economy/balance",
    "/api/economy/transactions",
    "/api/economy/transfer",
    "/api/bots/tick"
  ];
  if (!allowedPaths.includes(url.pathname)) {
    return null;
  }
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const allowAnonymousAi = getEnvValue(env2, "OPENROUTER_ALLOW_ANONYMOUS") === "true";
  const aiChatAllowsAnonymous = url.pathname === "/api/ai/chat" && allowAnonymousAi;
  const isBotTick = url.pathname === "/api/bots/tick";
  if (!token && !aiChatAllowsAnonymous && !isBotTick) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (url.pathname === "/api/users/me") {
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }
    try {
      const user = await lookupFirebaseUserByIdToken(token, env2);
      if (!user?.localId) {
        return new Response("Unauthorized", { status: 401 });
      }
      let storedProfile = null;
      try {
        storedProfile = await readUserProfile(user.localId, env2);
      } catch {
        storedProfile = null;
      }
      const responseBody = {
        ok: true,
        user: buildUserProfile(user, storedProfile)
      };
      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }
  }
  if (url.pathname === "/api/ai/chat") {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    try {
      const body = await request.json().catch(() => ({}));
      const messages = (body.messages ?? []).filter(
        (message) => Boolean(message) && (message.role === "system" || message.role === "user" || message.role === "assistant") && typeof message.content === "string" && message.content.trim().length > 0
      );
      if (messages.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "No messages provided." }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      const content = await completeAiChat(messages, env2);
      return new Response(JSON.stringify({ ok: true, content }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "AI response failed.";
      return new Response(JSON.stringify({ ok: false, error: message }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }
  }
  if (url.pathname === "/api/economy/balance" && request.method === "GET") {
    try {
      const user = await lookupFirebaseUserByIdToken(token, env2);
      if (!user?.localId) return new Response("Unauthorized", { status: 401 });
      const balance = await readWalletBalance(user.localId, env2);
      return new Response(JSON.stringify({ ok: true, balance }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }
  }
  if (url.pathname === "/api/economy/transactions" && request.method === "GET") {
    try {
      const user = await lookupFirebaseUserByIdToken(token, env2);
      if (!user?.localId) return new Response("Unauthorized", { status: 401 });
      const transactions = await readTransactions(user.localId, env2);
      return new Response(JSON.stringify({ ok: true, transactions }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, transactions: [] }), { status: 500 });
    }
  }
  if (url.pathname === "/api/economy/transfer" && request.method === "POST") {
    try {
      const user = await lookupFirebaseUserByIdToken(token, env2);
      if (!user?.localId) return new Response("Unauthorized", { status: 401 });
      const body = await request.json();
      const amount = Number(body.amount);
      if (isNaN(amount) || amount <= 0 || !body.receiverId) {
        return new Response(JSON.stringify({ error: "Invalid transfer parameters" }), { status: 400 });
      }
      const senderProfile = await readUserProfile(user.localId, env2);
      const senderBalance = typeof senderProfile?.walletBalance === "number" ? senderProfile.walletBalance : 1e3;
      if (senderBalance < amount) {
        return new Response(JSON.stringify({ error: "Insufficient balance" }), { status: 400 });
      }
      const receiverProfile = await readUserProfile(body.receiverId, env2);
      if (!receiverProfile) {
        return new Response(JSON.stringify({ error: "Receiver not found in db" }), { status: 400 });
      }
      await incrementWalletBalance(user.localId, -amount, env2);
      await incrementWalletBalance(body.receiverId, amount, env2);
      const transaction = {
        id: crypto.randomUUID(),
        senderId: user.localId,
        receiverId: body.receiverId,
        amount,
        type: body.type || "buy",
        description: body.description || "Transfer",
        referenceId: body.referenceId,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await insertTransaction(transaction, env2);
      return new Response(JSON.stringify({ ok: true, transaction }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      console.error("Transfer error", error);
      const message = error instanceof Error ? error.message : "Transfer failed";
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  }
  if (url.pathname === "/api/bots/tick" && request.method === "POST") {
    try {
      const projectId = getEnvValue(env2, "VITE_FIREBASE_PROJECT_ID");
      if (!projectId) throw new Error("Firebase Project ID not configured");
      const prompt = `Generate a realistic classifieds listing for a university campus marketplace. 
Return ONLY a valid JSON object (no markdown, no extra text) with the following string keys:
"title" (short item name), 
"description" (2-3 sentences), 
"category" (one of: Books, Gadgets, Notes, Electronics, Cycles, Hostel Essentials, Lab Equipment, Furniture),
"price" (number in INR, realistic second-hand price like 500 or 1200),
"condition" (one of: New, Like New, Good, Fair).
Make it something a student would realistically sell.`;
      const aiText = await completeAiChat([{ role: "user", content: prompt }], env2);
      let aiData;
      try {
        const cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
        aiData = JSON.parse(cleanedText);
      } catch (e) {
        throw new Error(`Failed to parse AI response: ${aiText}`);
      }
      const sellerId = `ai_bot_${Math.floor(Math.random() * 1e3)}`;
      const sellerName = ["Alex", "Sam", "Jordan", "Taylor", "Casey"][Math.floor(Math.random() * 5)];
      const seed = Math.random().toString(36).substring(2, 9);
      const firestorePayload = {
        fields: {
          title: { stringValue: aiData.title || "Study Material" },
          description: { stringValue: aiData.description || "Good condition." },
          price: { doubleValue: Number(aiData.price) || 500 },
          category: { stringValue: aiData.category || "Books" },
          condition: { stringValue: aiData.condition || "Good" },
          sellerId: { stringValue: sellerId },
          sellerName: { stringValue: sellerName },
          sellerCollege: { stringValue: "Campus" },
          availability: { stringValue: "Available" },
          image: { stringValue: `https://picsum.photos/seed/${seed}/600/600` },
          sellerAvatar: { stringValue: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sellerId}` },
          isAi: { booleanValue: true },
          createdAtIso: { stringValue: (/* @__PURE__ */ new Date()).toISOString() }
        }
      };
      const fbUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/listings`;
      const fbResponse = await fetch(fbUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(firestorePayload)
      });
      if (!fbResponse.ok) {
        const err = await fbResponse.text();
        throw new Error(`Firestore Error: ${err}`);
      }
      return new Response(JSON.stringify({ ok: true, generated: aiData }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      console.error("Bot tick error", error);
      const message = error instanceof Error ? error.message : "Bot failed";
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  }
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const user = await lookupFirebaseUserByIdToken(token, env2);
    if (!user?.localId) {
      return new Response("Unauthorized", { status: 401 });
    }
    await syncUserToMongo(user, env2);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}
const server = {
  async fetch(request, env2, ctx) {
    try {
      const apiResponse = await handleApiRequest(request, env2);
      if (apiResponse) {
        return apiResponse;
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env2, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  }
};
const workerEntry = server ?? {};
export {
  notImplemented as a,
  notImplementedClass as n,
  renderErrorPage as r,
  workerEntry as w
};

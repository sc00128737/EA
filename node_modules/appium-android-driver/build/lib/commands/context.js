'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _portfinder = require('portfinder');

var _portfinder2 = _interopRequireDefault(_portfinder);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumBaseDriver = require('appium-base-driver');

var _webviewHelpers = require('../webview-helpers');

var _webviewHelpers2 = _interopRequireDefault(_webviewHelpers);

var commands = {},
    helpers = {},
    extensions = {};

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', this.curContext || this.defaultContextName());

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getContexts = function callee$0$0() {
  var webviews;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        webviews = undefined;

        if (!this.isChromeSession) {
          context$1$0.next = 5;
          break;
        }

        // if we have a Chrome browser session, we only care about the Chrome
        // context and the native context
        webviews = [_webviewHelpers.CHROMIUM_WIN];
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_webviewHelpers2['default'].getWebviews(this.adb, this.opts.androidDeviceSocket));

      case 7:
        webviews = context$1$0.sent;

      case 8:
        this.contexts = _lodash2['default'].union([_webviewHelpers.NATIVE_WIN], webviews);
        _logger2['default'].debug('Available contexts: ' + JSON.stringify(this.contexts));
        return context$1$0.abrupt('return', this.contexts);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setContext = function callee$0$0(name) {
  var contexts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (name === null) {
          name = this.defaultContextName();
        } else if (name === _webviewHelpers.WEBVIEW_WIN) {
          // handle setContext "WEBVIEW"
          name = this.defaultWebviewName();
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getContexts());

      case 3:
        contexts = context$1$0.sent;

        if (_lodash2['default'].includes(contexts, name)) {
          context$1$0.next = 6;
          break;
        }

        throw new _appiumBaseDriver.errors.NoSuchContextError();

      case 6:
        if (!(name === this.curContext)) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.switchContext(name));

      case 10:
        this.curContext = name;

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.switchContext = function callee$0$0(name) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isChromedriverContext(name)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.startChromedriverProxy(name));

      case 3:
        context$1$0.next = 10;
        break;

      case 5:
        if (!this.isChromedriverContext(this.curContext)) {
          context$1$0.next = 9;
          break;
        }

        // if we're moving to a non-chromedriver webview, and our current context
        // _is_ a chromedriver webview, if caps recreateChromeDriverSessions is set
        // to true then kill chromedriver session using stopChromedriverProxies or
        // else simply suspend proxying to the latter
        if (this.opts.recreateChromeDriverSessions) {
          _logger2['default'].debug("recreateChromeDriverSessions set to true; killing existing chromedrivers");
          this.stopChromedriverProxies();
        } else {
          this.suspendChromedriverProxy();
        }
        context$1$0.next = 10;
        break;

      case 9:
        throw new Error('Didn\'t know how to handle switching to context \'' + name + '\'');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/* ---------------------------------
 * On-object context-related helpers
 * --------------------------------- */

// The reason this is a function and not just a constant is that both android-
// driver and selendroid-driver use this logic, and each one returns
// a different default context name
helpers.defaultContextName = function () {
  return _webviewHelpers.NATIVE_WIN;
};

helpers.defaultWebviewName = function () {
  return _webviewHelpers.WEBVIEW_BASE + this.opts.appPackage;
};

helpers.isWebContext = function () {
  return this.curContext !== null && this.curContext !== _webviewHelpers.NATIVE_WIN;
};

// Turn on proxying to an existing Chromedriver session or a new one
helpers.startChromedriverProxy = function callee$0$0(context) {
  var cd, opts, androidPackage;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Connecting to chrome-backed webview context \'' + context + '\'');

        cd = undefined;

        if (!this.sessionChromedrivers[context]) {
          context$1$0.next = 9;
          break;
        }

        // in the case where we've already set up a chromedriver for a context,
        // we want to reconnect to it, not create a whole new one
        _logger2['default'].debug('Found existing Chromedriver for context \'' + context + '\'. Using it.');
        cd = this.sessionChromedrivers[context];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(setupExistingChromedriver(cd));

      case 7:
        context$1$0.next = 17;
        break;

      case 9:
        opts = _lodash2['default'].cloneDeep(this.opts);

        opts.chromeUseRunningApp = true;
        if (opts.extractChromeAndroidPackageFromContextName) {
          androidPackage = context.match(_webviewHelpers.WEBVIEW_BASE + '(.+)');

          if (androidPackage && androidPackage.length > 0) {
            opts.chromeAndroidPackage = androidPackage[1];
          }
        }
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(setupNewChromedriver(opts, this.adb.curDeviceId, this.adb));

      case 14:
        cd = context$1$0.sent;

        // bind our stop/exit handler, passing in context so we know which
        // one stopped unexpectedly
        cd.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
          if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
            _this.onChromedriverStop(context);
          }
        });
        // save the chromedriver object under the context
        this.sessionChromedrivers[context] = cd;

      case 17:
        // hook up the local variables so we can proxy this biz
        this.chromedriver = cd;
        this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
        this.jwpProxyActive = true;

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Stop proxying to any Chromedriver
helpers.suspendChromedriverProxy = function () {
  this.chromedriver = null;
  this.proxyReqRes = null;
  this.jwpProxyActive = false;
};

// Handle an out-of-band Chromedriver stop event
helpers.onChromedriverStop = function callee$0$0(context) {
  var err;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].warn('Chromedriver for context ' + context + ' stopped unexpectedly');

        if (!(context === this.curContext)) {
          context$1$0.next = 7;
          break;
        }

        err = new Error("Chromedriver quit unexpectedly during session");
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

      case 5:
        context$1$0.next = 9;
        break;

      case 7:
        // if a Chromedriver in the non-active context barfs, we don't really
        // care, we'll just make a new one next time we need the context.
        _logger2['default'].warn("Chromedriver quit unexpectedly, but it wasn't the active " + "context, ignoring");
        delete this.sessionChromedrivers[context];

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Intentionally stop all the chromedrivers currently active, and ignore
// their exit events
helpers.stopChromedriverProxies = function callee$0$0() {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, context, cd;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.suspendChromedriverProxy(); // make sure we turn off the proxy flag
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;
        _iterator = _getIterator(_lodash2['default'].keys(this.sessionChromedrivers));

      case 6:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        context = _step.value;
        cd = this.sessionChromedrivers[context];

        _logger2['default'].debug('Stopping chromedriver for context ' + context);
        // stop listening for the stopped state event
        cd.removeAllListeners(_appiumChromedriver2['default'].EVENT_CHANGED);
        context$1$0.prev = 11;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(cd.stop());

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](11);

        _logger2['default'].warn('Error stopping Chromedriver: ' + context$1$0.t0.message);

      case 19:
        delete this.sessionChromedrivers[context];

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t1 = context$1$0['catch'](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 25, 29, 37], [11, 16], [30,, 32, 36]]);
};

helpers.isChromedriverContext = function (viewName) {
  return _lodash2['default'].includes(viewName, _webviewHelpers.WEBVIEW_WIN) || viewName === _webviewHelpers.CHROMIUM_WIN;
};

/* --------------------------
 * Internal library functions
 * -------------------------- */

function setupExistingChromedriver(chromedriver) {
  return _regeneratorRuntime.async(function setupExistingChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(chromedriver.hasWorkingWebview());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("ChromeDriver is not associated with a window. " + "Re-initializing the session.");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(chromedriver.restart());

      case 6:
        return context$1$0.abrupt('return', chromedriver);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function setupNewChromedriver(opts, curDeviceId, adb) {
  var getPort, chromeArgs, chromedriver, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, opt, appPackage, caps;

  return _regeneratorRuntime.async(function setupNewChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (opts.chromeDriverPort) {
          context$1$0.next = 6;
          break;
        }

        getPort = _bluebird2['default'].promisify(_portfinder2['default'].getPort, { context: _portfinder2['default'] });
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(getPort());

      case 4:
        opts.chromeDriverPort = context$1$0.sent;

        _logger2['default'].debug('A port was not given, using random port: ' + opts.chromeDriverPort);

      case 6:
        chromeArgs = {
          port: opts.chromeDriverPort,
          executable: opts.chromedriverExecutable,
          adb: adb,
          verbose: !!opts.showChromedriverLog
        };
        chromedriver = new _appiumChromedriver2['default'](chromeArgs);

        // make sure there are chromeOptions
        opts.chromeOptions = opts.chromeOptions || {};
        // try out any prefixed chromeOptions,
        // and strip the prefix
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 12;
        for (_iterator2 = _getIterator(_lodash2['default'].keys(opts)); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          opt = _step2.value;

          if (opt.endsWith(':chromeOptions')) {
            _logger2['default'].warn('Merging \'' + opt + '\' into \'chromeOptions\'. This may cause unexpected behavior');
            _lodash2['default'].merge(opts.chromeOptions, opts[opt]);
          }
        }

        context$1$0.next = 20;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 20:
        context$1$0.prev = 20;
        context$1$0.prev = 21;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 23:
        context$1$0.prev = 23;

        if (!_didIteratorError2) {
          context$1$0.next = 26;
          break;
        }

        throw _iteratorError2;

      case 26:
        return context$1$0.finish(23);

      case 27:
        return context$1$0.finish(20);

      case 28:
        appPackage = opts.chromeOptions.androidPackage || opts.appPackage;
        caps = {
          chromeOptions: {
            androidPackage: appPackage
          }
        };

        if (opts.chromeUseRunningApp) {
          caps.chromeOptions.androidUseRunningApp = opts.chromeUseRunningApp;
        }
        if (opts.chromeAndroidPackage) {
          caps.chromeOptions.androidPackage = opts.chromeAndroidPackage;
        }
        if (opts.chromeAndroidActivity) {
          caps.chromeOptions.androidActivity = opts.chromeAndroidActivity;
        }
        if (opts.chromeAndroidProcess) {
          caps.chromeOptions.androidProcess = opts.chromeAndroidProcess;
        }
        if (opts.enablePerformanceLogging) {
          caps.loggingPrefs = { performance: 'ALL' };
        }
        if (opts.browserName === 'chromium-webview') {
          caps.chromeOptions.androidActivity = opts.appActivity;
        }
        if (opts.pageLoadStrategy) {
          caps.pageLoadStrategy = opts.pageLoadStrategy;
        }
        caps = _webviewHelpers2['default'].decorateChromeOptions(caps, opts, curDeviceId);
        context$1$0.next = 40;
        return _regeneratorRuntime.awrap(chromedriver.start(caps));

      case 40:
        return context$1$0.abrupt('return', chromedriver);

      case 41:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 16, 20, 28], [21,, 23, 27]]);
}

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports.setupNewChromedriver = setupNewChromedriver;
exports['default'] = extensions;

// if the current context is `null`, indicating no context
// explicitly set, it is the default context

// otherwise we use ADB to figure out which webviews are available

// if the context we want doesn't exist, fail

// if we're already in the context we want, do nothing

// We have some options when it comes to webviews. If we want a
// Chromedriver webview, we can only control one at a time.

// start proxying commands directly to chromedriver

// we exited unexpectedly while automating the current context and so want
// to shut down the session and respond with an error

// check the status by sending a simple window-based command to ChromeDriver
// if there is an error, we want to recreate the ChromeDriver session

// if a port wasn't given, pick a random available one
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7c0JBQ0gsV0FBVzs7OztrQ0FDTCxxQkFBcUI7Ozs7MEJBQ3ZCLFlBQVk7Ozs7d0JBQ3JCLFVBQVU7Ozs7Z0NBQ0Qsb0JBQW9COzs4QkFFeUIsb0JBQW9COzs7O0FBR3hGLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7O0FBTWpELFFBQVEsQ0FBQyxpQkFBaUIsR0FBRzs7Ozs0Q0FHcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Ozs7Ozs7Q0FDcEQsQ0FBQzs7QUFFRixRQUFRLENBQUMsV0FBVyxHQUFHO01BQ2pCLFFBQVE7Ozs7QUFBUixnQkFBUTs7YUFDUixJQUFJLENBQUMsZUFBZTs7Ozs7OztBQUd0QixnQkFBUSxHQUFHLDhCQUFjLENBQUM7Ozs7Ozt5Q0FHVCw0QkFBZSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBRGhDLGdCQUFROzs7QUFHVixZQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFFLEtBQUssQ0FBQyw0QkFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELDRCQUFPLEtBQUssMEJBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFHLENBQUM7NENBQzlELElBQUksQ0FBQyxRQUFROzs7Ozs7O0NBQ3JCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsSUFBSTtNQU9wQyxRQUFROzs7O0FBTlosWUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ2pCLGNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNsQyxNQUFNLElBQUksSUFBSSxnQ0FBZ0Is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LGNBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztTQUNqRTtBQUNELFlBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO0FBQzdCLGNBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztTQUMvRDtBQUNELFlBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO0FBQ2pDLGNBQUksQ0FBQyxZQUFZLEdBQUcsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLENBQUM7U0FDMUM7QUFDRCxZQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssa0JBQWtCLEVBQUU7QUFDM0MsY0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN2RDtBQUNELFlBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3pCLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDL0M7QUFDRCxZQUFJLEdBQUcsNEJBQWUscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7eUNBQy9ELFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7NENBQ3ZCLFlBQVk7Ozs7Ozs7Q0FDcEI7O0FBRUQsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87UUFBRSxvQkFBb0IsR0FBcEIsb0JBQW9CO3FCQUNqQyxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBDaHJvbWVkcml2ZXIgZnJvbSAnYXBwaXVtLWNocm9tZWRyaXZlcic7XG5pbXBvcnQgUG9ydEZpbmRlciBmcm9tICdwb3J0ZmluZGVyJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHdlYnZpZXdIZWxwZXJzLFxuICAgICAgICAgTkFUSVZFX1dJTiwgV0VCVklFV19CQVNFLCBXRUJWSUVXX1dJTiwgQ0hST01JVU1fV0lOIH0gZnJvbSAnLi4vd2Vidmlldy1oZWxwZXJzJztcblxuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWN0dWFsIE1KU09OV1AgY29tbWFuZCBoYW5kbGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29tbWFuZHMuZ2V0Q3VycmVudENvbnRleHQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8vIGlmIHRoZSBjdXJyZW50IGNvbnRleHQgaXMgYG51bGxgLCBpbmRpY2F0aW5nIG5vIGNvbnRleHRcbiAgLy8gZXhwbGljaXRseSBzZXQsIGl0IGlzIHRoZSBkZWZhdWx0IGNvbnRleHRcbiAgcmV0dXJuIHRoaXMuY3VyQ29udGV4dCB8fCB0aGlzLmRlZmF1bHRDb250ZXh0TmFtZSgpO1xufTtcblxuY29tbWFuZHMuZ2V0Q29udGV4dHMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCB3ZWJ2aWV3cztcbiAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XG4gICAgLy8gaWYgd2UgaGF2ZSBhIENocm9tZSBicm93c2VyIHNlc3Npb24sIHdlIG9ubHkgY2FyZSBhYm91dCB0aGUgQ2hyb21lXG4gICAgLy8gY29udGV4dCBhbmQgdGhlIG5hdGl2ZSBjb250ZXh0XG4gICAgd2Vidmlld3MgPSBbQ0hST01JVU1fV0lOXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlcndpc2Ugd2UgdXNlIEFEQiB0byBmaWd1cmUgb3V0IHdoaWNoIHdlYnZpZXdzIGFyZSBhdmFpbGFibGVcbiAgICB3ZWJ2aWV3cyA9IGF3YWl0IHdlYnZpZXdIZWxwZXJzLmdldFdlYnZpZXdzKHRoaXMuYWRiLFxuICAgICAgdGhpcy5vcHRzLmFuZHJvaWREZXZpY2VTb2NrZXQpO1xuICB9XG4gIHRoaXMuY29udGV4dHMgPSBfLnVuaW9uKFtOQVRJVkVfV0lOXSwgd2Vidmlld3MpO1xuICBsb2dnZXIuZGVidWcoYEF2YWlsYWJsZSBjb250ZXh0czogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRleHRzKX1gKTtcbiAgcmV0dXJuIHRoaXMuY29udGV4dHM7XG59O1xuXG5jb21tYW5kcy5zZXRDb250ZXh0ID0gYXN5bmMgZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKG5hbWUgPT09IG51bGwpIHtcbiAgICBuYW1lID0gdGhpcy5kZWZhdWx0Q29udGV4dE5hbWUoKTtcbiAgfSBlbHNlIGlmIChuYW1lID09PSBXRUJWSUVXX1dJTikge1xuICAgIC8vIGhhbmRsZSBzZXRDb250ZXh0IFwiV0VCVklFV1wiXG4gICAgbmFtZSA9IHRoaXMuZGVmYXVsdFdlYnZpZXdOYW1lKCk7XG4gIH1cbiAgbGV0IGNvbnRleHRzID0gYXdhaXQgdGhpcy5nZXRDb250ZXh0cygpO1xuICAvLyBpZiB0aGUgY29udGV4dCB3ZSB3YW50IGRvZXNuJ3QgZXhpc3QsIGZhaWxcbiAgaWYgKCFfLmluY2x1ZGVzKGNvbnRleHRzLCBuYW1lKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoQ29udGV4dEVycm9yKCk7XG4gIH1cbiAgLy8gaWYgd2UncmUgYWxyZWFkeSBpbiB0aGUgY29udGV4dCB3ZSB3YW50LCBkbyBub3RoaW5nXG4gIGlmIChuYW1lID09PSB0aGlzLmN1ckNvbnRleHQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCB0aGlzLnN3aXRjaENvbnRleHQobmFtZSk7XG4gIHRoaXMuY3VyQ29udGV4dCA9IG5hbWU7XG59O1xuXG5oZWxwZXJzLnN3aXRjaENvbnRleHQgPSBhc3luYyBmdW5jdGlvbiAobmFtZSkge1xuICAvLyBXZSBoYXZlIHNvbWUgb3B0aW9ucyB3aGVuIGl0IGNvbWVzIHRvIHdlYnZpZXdzLiBJZiB3ZSB3YW50IGFcbiAgLy8gQ2hyb21lZHJpdmVyIHdlYnZpZXcsIHdlIGNhbiBvbmx5IGNvbnRyb2wgb25lIGF0IGEgdGltZS5cbiAgaWYgKHRoaXMuaXNDaHJvbWVkcml2ZXJDb250ZXh0KG5hbWUpKSB7XG4gICAgLy8gc3RhcnQgcHJveHlpbmcgY29tbWFuZHMgZGlyZWN0bHkgdG8gY2hyb21lZHJpdmVyXG4gICAgYXdhaXQgdGhpcy5zdGFydENocm9tZWRyaXZlclByb3h5KG5hbWUpO1xuICB9IGVsc2UgaWYgKHRoaXMuaXNDaHJvbWVkcml2ZXJDb250ZXh0KHRoaXMuY3VyQ29udGV4dCkpIHtcbiAgICAvLyBpZiB3ZSdyZSBtb3ZpbmcgdG8gYSBub24tY2hyb21lZHJpdmVyIHdlYnZpZXcsIGFuZCBvdXIgY3VycmVudCBjb250ZXh0XG4gICAgLy8gX2lzXyBhIGNocm9tZWRyaXZlciB3ZWJ2aWV3LCBpZiBjYXBzIHJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMgaXMgc2V0XG4gICAgLy8gdG8gdHJ1ZSB0aGVuIGtpbGwgY2hyb21lZHJpdmVyIHNlc3Npb24gdXNpbmcgc3RvcENocm9tZWRyaXZlclByb3hpZXMgb3JcbiAgICAvLyBlbHNlIHNpbXBseSBzdXNwZW5kIHByb3h5aW5nIHRvIHRoZSBsYXR0ZXJcbiAgICBpZiAodGhpcy5vcHRzLnJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcInJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMgc2V0IHRvIHRydWU7IGtpbGxpbmcgZXhpc3RpbmcgY2hyb21lZHJpdmVyc1wiKTtcbiAgICAgIHRoaXMuc3RvcENocm9tZWRyaXZlclByb3hpZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEaWRuJ3Qga25vdyBob3cgdG8gaGFuZGxlIHN3aXRjaGluZyB0byBjb250ZXh0ICcke25hbWV9J2ApO1xuICB9XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogT24tb2JqZWN0IGNvbnRleHQtcmVsYXRlZCBoZWxwZXJzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8gVGhlIHJlYXNvbiB0aGlzIGlzIGEgZnVuY3Rpb24gYW5kIG5vdCBqdXN0IGEgY29uc3RhbnQgaXMgdGhhdCBib3RoIGFuZHJvaWQtXG4vLyBkcml2ZXIgYW5kIHNlbGVuZHJvaWQtZHJpdmVyIHVzZSB0aGlzIGxvZ2ljLCBhbmQgZWFjaCBvbmUgcmV0dXJuc1xuLy8gYSBkaWZmZXJlbnQgZGVmYXVsdCBjb250ZXh0IG5hbWVcbmhlbHBlcnMuZGVmYXVsdENvbnRleHROYW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTkFUSVZFX1dJTjtcbn07XG5cbmhlbHBlcnMuZGVmYXVsdFdlYnZpZXdOYW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gV0VCVklFV19CQVNFICsgdGhpcy5vcHRzLmFwcFBhY2thZ2U7XG59O1xuXG5oZWxwZXJzLmlzV2ViQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY3VyQ29udGV4dCAhPT0gbnVsbCAmJiB0aGlzLmN1ckNvbnRleHQgIT09IE5BVElWRV9XSU47XG59O1xuXG4vLyBUdXJuIG9uIHByb3h5aW5nIHRvIGFuIGV4aXN0aW5nIENocm9tZWRyaXZlciBzZXNzaW9uIG9yIGEgbmV3IG9uZVxuaGVscGVycy5zdGFydENocm9tZWRyaXZlclByb3h5ID0gYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgbG9nZ2VyLmRlYnVnKGBDb25uZWN0aW5nIHRvIGNocm9tZS1iYWNrZWQgd2VidmlldyBjb250ZXh0ICcke2NvbnRleHR9J2ApO1xuXG4gIGxldCBjZDtcbiAgaWYgKHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF0pIHtcbiAgICAvLyBpbiB0aGUgY2FzZSB3aGVyZSB3ZSd2ZSBhbHJlYWR5IHNldCB1cCBhIGNocm9tZWRyaXZlciBmb3IgYSBjb250ZXh0LFxuICAgIC8vIHdlIHdhbnQgdG8gcmVjb25uZWN0IHRvIGl0LCBub3QgY3JlYXRlIGEgd2hvbGUgbmV3IG9uZVxuICAgIGxvZ2dlci5kZWJ1ZyhgRm91bmQgZXhpc3RpbmcgQ2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICcke2NvbnRleHR9Jy4gVXNpbmcgaXQuYCk7XG4gICAgY2QgPSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xuICAgIGF3YWl0IHNldHVwRXhpc3RpbmdDaHJvbWVkcml2ZXIoY2QpO1xuICB9IGVsc2Uge1xuICAgIGxldCBvcHRzID0gXy5jbG9uZURlZXAodGhpcy5vcHRzKTtcbiAgICBvcHRzLmNocm9tZVVzZVJ1bm5pbmdBcHAgPSB0cnVlO1xuICAgIGlmIChvcHRzLmV4dHJhY3RDaHJvbWVBbmRyb2lkUGFja2FnZUZyb21Db250ZXh0TmFtZSkge1xuICAgICAgbGV0IGFuZHJvaWRQYWNrYWdlID0gY29udGV4dC5tYXRjaChgJHtXRUJWSUVXX0JBU0V9KC4rKWApO1xuICAgICAgaWYgKGFuZHJvaWRQYWNrYWdlICYmIGFuZHJvaWRQYWNrYWdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0cy5jaHJvbWVBbmRyb2lkUGFja2FnZSA9IGFuZHJvaWRQYWNrYWdlWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICBjZCA9IGF3YWl0IHNldHVwTmV3Q2hyb21lZHJpdmVyKG9wdHMsIHRoaXMuYWRiLmN1ckRldmljZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGIpO1xuICAgIC8vIGJpbmQgb3VyIHN0b3AvZXhpdCBoYW5kbGVyLCBwYXNzaW5nIGluIGNvbnRleHQgc28gd2Uga25vdyB3aGljaFxuICAgIC8vIG9uZSBzdG9wcGVkIHVuZXhwZWN0ZWRseVxuICAgIGNkLm9uKENocm9tZWRyaXZlci5FVkVOVF9DSEFOR0VELCAobXNnKSA9PiB7XG4gICAgICBpZiAobXNnLnN0YXRlID09PSBDaHJvbWVkcml2ZXIuU1RBVEVfU1RPUFBFRCkge1xuICAgICAgICB0aGlzLm9uQ2hyb21lZHJpdmVyU3RvcChjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzYXZlIHRoZSBjaHJvbWVkcml2ZXIgb2JqZWN0IHVuZGVyIHRoZSBjb250ZXh0XG4gICAgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XSA9IGNkO1xuICB9XG4gIC8vIGhvb2sgdXAgdGhlIGxvY2FsIHZhcmlhYmxlcyBzbyB3ZSBjYW4gcHJveHkgdGhpcyBiaXpcbiAgdGhpcy5jaHJvbWVkcml2ZXIgPSBjZDtcbiAgdGhpcy5wcm94eVJlcVJlcyA9IHRoaXMuY2hyb21lZHJpdmVyLnByb3h5UmVxLmJpbmQodGhpcy5jaHJvbWVkcml2ZXIpO1xuICB0aGlzLmp3cFByb3h5QWN0aXZlID0gdHJ1ZTtcbn07XG5cbi8vIFN0b3AgcHJveHlpbmcgdG8gYW55IENocm9tZWRyaXZlclxuaGVscGVycy5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2hyb21lZHJpdmVyID0gbnVsbDtcbiAgdGhpcy5wcm94eVJlcVJlcyA9IG51bGw7XG4gIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcbn07XG5cbi8vIEhhbmRsZSBhbiBvdXQtb2YtYmFuZCBDaHJvbWVkcml2ZXIgc3RvcCBldmVudFxuaGVscGVycy5vbkNocm9tZWRyaXZlclN0b3AgPSBhc3luYyBmdW5jdGlvbiAoY29udGV4dCkge1xuICBsb2dnZXIud2FybihgQ2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICR7Y29udGV4dH0gc3RvcHBlZCB1bmV4cGVjdGVkbHlgKTtcbiAgaWYgKGNvbnRleHQgPT09IHRoaXMuY3VyQ29udGV4dCkge1xuICAgIC8vIHdlIGV4aXRlZCB1bmV4cGVjdGVkbHkgd2hpbGUgYXV0b21hdGluZyB0aGUgY3VycmVudCBjb250ZXh0IGFuZCBzbyB3YW50XG4gICAgLy8gdG8gc2h1dCBkb3duIHRoZSBzZXNzaW9uIGFuZCByZXNwb25kIHdpdGggYW4gZXJyb3JcbiAgICBsZXQgZXJyID0gbmV3IEVycm9yKFwiQ2hyb21lZHJpdmVyIHF1aXQgdW5leHBlY3RlZGx5IGR1cmluZyBzZXNzaW9uXCIpO1xuICAgIGF3YWl0IHRoaXMuc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24oZXJyKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpZiBhIENocm9tZWRyaXZlciBpbiB0aGUgbm9uLWFjdGl2ZSBjb250ZXh0IGJhcmZzLCB3ZSBkb24ndCByZWFsbHlcbiAgICAvLyBjYXJlLCB3ZSdsbCBqdXN0IG1ha2UgYSBuZXcgb25lIG5leHQgdGltZSB3ZSBuZWVkIHRoZSBjb250ZXh0LlxuICAgIGxvZ2dlci53YXJuKFwiQ2hyb21lZHJpdmVyIHF1aXQgdW5leHBlY3RlZGx5LCBidXQgaXQgd2Fzbid0IHRoZSBhY3RpdmUgXCIgK1xuICAgICAgICAgICAgICAgIFwiY29udGV4dCwgaWdub3JpbmdcIik7XG4gICAgZGVsZXRlIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XG4gIH1cbn07XG5cbi8vIEludGVudGlvbmFsbHkgc3RvcCBhbGwgdGhlIGNocm9tZWRyaXZlcnMgY3VycmVudGx5IGFjdGl2ZSwgYW5kIGlnbm9yZVxuLy8gdGhlaXIgZXhpdCBldmVudHNcbmhlbHBlcnMuc3RvcENocm9tZWRyaXZlclByb3hpZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3VzcGVuZENocm9tZWRyaXZlclByb3h5KCk7IC8vIG1ha2Ugc3VyZSB3ZSB0dXJuIG9mZiB0aGUgcHJveHkgZmxhZ1xuICBmb3IgKGxldCBjb250ZXh0IG9mIF8ua2V5cyh0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzKSkge1xuICAgIGxldCBjZCA9IHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XG4gICAgbG9nZ2VyLmRlYnVnKGBTdG9wcGluZyBjaHJvbWVkcml2ZXIgZm9yIGNvbnRleHQgJHtjb250ZXh0fWApO1xuICAgIC8vIHN0b3AgbGlzdGVuaW5nIGZvciB0aGUgc3RvcHBlZCBzdGF0ZSBldmVudFxuICAgIGNkLnJlbW92ZUFsbExpc3RlbmVycyhDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNkLnN0b3AoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGBFcnJvciBzdG9wcGluZyBDaHJvbWVkcml2ZXI6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xuICB9XG59O1xuXG5oZWxwZXJzLmlzQ2hyb21lZHJpdmVyQ29udGV4dCA9IGZ1bmN0aW9uICh2aWV3TmFtZSkge1xuICByZXR1cm4gXy5pbmNsdWRlcyh2aWV3TmFtZSwgV0VCVklFV19XSU4pIHx8IHZpZXdOYW1lID09PSBDSFJPTUlVTV9XSU47XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBJbnRlcm5hbCBsaWJyYXJ5IGZ1bmN0aW9uc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBFeGlzdGluZ0Nocm9tZWRyaXZlciAoY2hyb21lZHJpdmVyKSB7XG4gIC8vIGNoZWNrIHRoZSBzdGF0dXMgYnkgc2VuZGluZyBhIHNpbXBsZSB3aW5kb3ctYmFzZWQgY29tbWFuZCB0byBDaHJvbWVEcml2ZXJcbiAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3IsIHdlIHdhbnQgdG8gcmVjcmVhdGUgdGhlIENocm9tZURyaXZlciBzZXNzaW9uXG4gIGlmICghYXdhaXQgY2hyb21lZHJpdmVyLmhhc1dvcmtpbmdXZWJ2aWV3KCkpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJDaHJvbWVEcml2ZXIgaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBhIHdpbmRvdy4gXCIgK1xuICAgICAgICAgICAgICAgICBcIlJlLWluaXRpYWxpemluZyB0aGUgc2Vzc2lvbi5cIik7XG4gICAgYXdhaXQgY2hyb21lZHJpdmVyLnJlc3RhcnQoKTtcbiAgfVxuICByZXR1cm4gY2hyb21lZHJpdmVyO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cE5ld0Nocm9tZWRyaXZlciAob3B0cywgY3VyRGV2aWNlSWQsIGFkYikge1xuICAvLyBpZiBhIHBvcnQgd2Fzbid0IGdpdmVuLCBwaWNrIGEgcmFuZG9tIGF2YWlsYWJsZSBvbmVcbiAgaWYgKCFvcHRzLmNocm9tZURyaXZlclBvcnQpIHtcbiAgICBsZXQgZ2V0UG9ydCA9IEIucHJvbWlzaWZ5KFBvcnRGaW5kZXIuZ2V0UG9ydCwge2NvbnRleHQ6IFBvcnRGaW5kZXJ9KTtcbiAgICBvcHRzLmNocm9tZURyaXZlclBvcnQgPSBhd2FpdCBnZXRQb3J0KCk7XG4gICAgbG9nZ2VyLmRlYnVnKGBBIHBvcnQgd2FzIG5vdCBnaXZlbiwgdXNpbmcgcmFuZG9tIHBvcnQ6ICR7b3B0cy5jaHJvbWVEcml2ZXJQb3J0fWApO1xuICB9XG4gIGxldCBjaHJvbWVBcmdzID0ge1xuICAgIHBvcnQ6IG9wdHMuY2hyb21lRHJpdmVyUG9ydCxcbiAgICBleGVjdXRhYmxlOiBvcHRzLmNocm9tZWRyaXZlckV4ZWN1dGFibGUsXG4gICAgYWRiLFxuICAgIHZlcmJvc2U6ICEhb3B0cy5zaG93Q2hyb21lZHJpdmVyTG9nLFxuICB9O1xuICBsZXQgY2hyb21lZHJpdmVyID0gbmV3IENocm9tZWRyaXZlcihjaHJvbWVBcmdzKTtcblxuICAvLyBtYWtlIHN1cmUgdGhlcmUgYXJlIGNocm9tZU9wdGlvbnNcbiAgb3B0cy5jaHJvbWVPcHRpb25zID0gb3B0cy5jaHJvbWVPcHRpb25zIHx8IHt9O1xuICAvLyB0cnkgb3V0IGFueSBwcmVmaXhlZCBjaHJvbWVPcHRpb25zLFxuICAvLyBhbmQgc3RyaXAgdGhlIHByZWZpeFxuICBmb3IgKGxldCBvcHQgb2YgXy5rZXlzKG9wdHMpKSB7XG4gICAgaWYgKG9wdC5lbmRzV2l0aCgnOmNocm9tZU9wdGlvbnMnKSkge1xuICAgICAgbG9nZ2VyLndhcm4oYE1lcmdpbmcgJyR7b3B0fScgaW50byAnY2hyb21lT3B0aW9ucycuIFRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3JgKTtcbiAgICAgIF8ubWVyZ2Uob3B0cy5jaHJvbWVPcHRpb25zLCBvcHRzW29wdF0pO1xuICAgIH1cbiAgfVxuXG4gIGxldCBhcHBQYWNrYWdlID0gb3B0cy5jaHJvbWVPcHRpb25zLmFuZHJvaWRQYWNrYWdlIHx8IG9wdHMuYXBwUGFja2FnZTtcbiAgbGV0IGNhcHMgPSB7XG4gICAgY2hyb21lT3B0aW9uczoge1xuICAgICAgYW5kcm9pZFBhY2thZ2U6IGFwcFBhY2thZ2UsXG4gICAgfVxuICB9O1xuICBpZiAob3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwKSB7XG4gICAgY2Fwcy5jaHJvbWVPcHRpb25zLmFuZHJvaWRVc2VSdW5uaW5nQXBwID0gb3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwO1xuICB9XG4gIGlmIChvcHRzLmNocm9tZUFuZHJvaWRQYWNrYWdlKSB7XG4gICAgY2Fwcy5jaHJvbWVPcHRpb25zLmFuZHJvaWRQYWNrYWdlID0gb3B0cy5jaHJvbWVBbmRyb2lkUGFja2FnZTtcbiAgfVxuICBpZiAob3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHkpIHtcbiAgICBjYXBzLmNocm9tZU9wdGlvbnMuYW5kcm9pZEFjdGl2aXR5ID0gb3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHk7XG4gIH1cbiAgaWYgKG9wdHMuY2hyb21lQW5kcm9pZFByb2Nlc3MpIHtcbiAgICBjYXBzLmNocm9tZU9wdGlvbnMuYW5kcm9pZFByb2Nlc3MgPSBvcHRzLmNocm9tZUFuZHJvaWRQcm9jZXNzO1xuICB9XG4gIGlmIChvcHRzLmVuYWJsZVBlcmZvcm1hbmNlTG9nZ2luZykge1xuICAgIGNhcHMubG9nZ2luZ1ByZWZzID0ge3BlcmZvcm1hbmNlOiAnQUxMJ307XG4gIH1cbiAgaWYgKG9wdHMuYnJvd3Nlck5hbWUgPT09ICdjaHJvbWl1bS13ZWJ2aWV3Jykge1xuICAgIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkQWN0aXZpdHkgPSBvcHRzLmFwcEFjdGl2aXR5O1xuICB9XG4gIGlmIChvcHRzLnBhZ2VMb2FkU3RyYXRlZ3kpIHtcbiAgICBjYXBzLnBhZ2VMb2FkU3RyYXRlZ3kgPSBvcHRzLnBhZ2VMb2FkU3RyYXRlZ3k7XG4gIH1cbiAgY2FwcyA9IHdlYnZpZXdIZWxwZXJzLmRlY29yYXRlQ2hyb21lT3B0aW9ucyhjYXBzLCBvcHRzLCBjdXJEZXZpY2VJZCk7XG4gIGF3YWl0IGNocm9tZWRyaXZlci5zdGFydChjYXBzKTtcbiAgcmV0dXJuIGNocm9tZWRyaXZlcjtcbn1cblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycywgc2V0dXBOZXdDaHJvbWVkcml2ZXIgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

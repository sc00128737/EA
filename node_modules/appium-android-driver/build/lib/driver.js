'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumBaseDriver = require('appium-base-driver');

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _desiredCaps = require('./desired-caps');

var _desiredCaps2 = _interopRequireDefault(_desiredCaps);

var _commandsIndex = require('./commands/index');

var _commandsIndex2 = _interopRequireDefault(_commandsIndex);

var _commandsContext = require('./commands/context');

var _androidHelpers = require('./android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _webviewHelpers = require('./webview-helpers');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var _sharedPreferencesBuilder = require('shared-preferences-builder');

var APP_EXTENSION = '.apk';
var DEVICE_PORT = 4724;

// This is a set of methods and paths that we never want to proxy to
// Chromedriver
var NO_PROXY = [['POST', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/appium')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/orientation')], ['GET', new RegExp('^/session/[^/]+/orientation')]];

var AndroidDriver = (function (_BaseDriver) {
  _inherits(AndroidDriver, _BaseDriver);

  function AndroidDriver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AndroidDriver);

    _get(Object.getPrototypeOf(AndroidDriver.prototype), 'constructor', this).call(this, opts, shouldValidateCaps);

    this.locatorStrategies = ['xpath', 'id', 'class name', 'accessibility id', '-android uiautomator'];
    this.desiredCapConstraints = _desiredCaps2['default'];
    this.sessionChromedrivers = {};
    this.jwpProxyActive = false;
    this.jwpProxyAvoid = _lodash2['default'].clone(NO_PROXY);
    this.settings = new _appiumBaseDriver.DeviceSettings({ ignoreUnimportantViews: false }, this.onSettingsUpdate.bind(this));
    this.chromedriver = null;
    this.apkStrings = {};
    this.bootstrapPort = opts.bootstrapPort || DEVICE_PORT;
    this.unlocker = _androidHelpers2['default'].unlocker;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_lodash2['default'].toPairs(_commandsIndex2['default'])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var cmd = _step$value[0];
        var fn = _step$value[1];

        AndroidDriver.prototype[cmd] = fn;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(AndroidDriver, [{
    key: 'createSession',
    value: function createSession() {
      var _len,
          args,
          _key,
          _ref,
          _ref2,
          sessionId,
          caps,
          serverDetails,
          defaultOpts,
          _helpers$getChromePkg,
          pkg,
          activity,
          _ref3,

      // get device udid for this session
      udid,
          emPort,
          networkSpeed,
          args$2$0 = arguments;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;

            for (_len = args$2$0.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = args$2$0[_key];
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'createSession', this).apply(this, args));

          case 4:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            sessionId = _ref2[0];
            caps = _ref2[1];
            serverDetails = { platform: 'LINUX',
              webStorageEnabled: false,
              takesScreenshot: true,
              javascriptEnabled: true,
              databaseEnabled: false,
              networkConnectionEnabled: true,
              locationContextEnabled: false,
              warnings: {},
              desired: this.caps };

            this.caps = _Object$assign(serverDetails, this.caps);

            // assigning defaults
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(_appiumSupport.tempDir.staticDir());

          case 12:
            context$2$0.t0 = context$2$0.sent;
            context$2$0.t1 = _appiumAdb.DEFAULT_ADB_PORT;
            defaultOpts = {
              action: "android.intent.action.MAIN",
              category: "android.intent.category.LAUNCHER",
              flags: "0x10200000",
              disableAndroidWatchers: false,
              tmpDir: context$2$0.t0,
              fullReset: false,
              autoLaunch: true,
              adbPort: context$2$0.t1,
              androidInstallTimeout: 90000
            };

            _lodash2['default'].defaults(this.opts, defaultOpts);

            if (this.opts.javaVersion) {
              context$2$0.next = 20;
              break;
            }

            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getJavaVersion());

          case 19:
            this.opts.javaVersion = context$2$0.sent;

          case 20:
            this.useUnlockHelperApp = _lodash2['default'].isUndefined(this.caps.unlockType);

            // not user visible via caps
            if (this.opts.noReset === true) {
              this.opts.fullReset = false;
            }
            if (this.opts.fullReset === true) {
              this.opts.noReset = false;
            }
            this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
            this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

            this.curContext = this.defaultContextName();

            if (this.isChromeSession) {
              _logger2['default'].info("We're going to run a Chrome-based session");
              _helpers$getChromePkg = _androidHelpers2['default'].getChromePkg(this.opts.browserName);
              pkg = _helpers$getChromePkg.pkg;
              activity = _helpers$getChromePkg.activity;

              this.opts.appPackage = pkg;
              this.opts.appActivity = activity;
              _logger2['default'].info('Chrome-type package and activity are ' + pkg + ' and ' + activity);
            }

            if (this.opts.nativeWebScreenshot) {
              this.jwpProxyAvoid.push(['GET', new RegExp('^/session/[^/]+/screenshot')]);
            }

            if (this.opts.reboot) {
              this.setAvdFromCapabilities(caps);
            }context$2$0.next = 31;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getDeviceInfoFromCaps(this.opts));

          case 31:
            _ref3 = context$2$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            this.opts.udid = udid;
            this.opts.emPort = emPort;

            // set up an instance of ADB
            context$2$0.next = 38;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].createADB(this.opts.javaVersion, this.opts.udid, this.opts.emPort, this.opts.adbPort, this.opts.suppressKillServer, this.opts.remoteAdbHost, this.opts.clearDeviceLogsOnStart));

          case 38:
            this.adb = context$2$0.sent;

            if (this.helpers.isPackageOrBundle(this.opts.app)) {
              // user provided package instead of app for 'app' capability, massage options
              this.opts.appPackage = this.opts.app;
              this.opts.app = null;
            }

            if (!this.opts.app) {
              context$2$0.next = 49;
              break;
            }

            context$2$0.next = 43;
            return _regeneratorRuntime.awrap(this.helpers.configureApp(this.opts.app, APP_EXTENSION));

          case 43:
            this.opts.app = context$2$0.sent;

            this.opts.appIsTemp = caps.app !== this.opts.app; // did we make a temporary copy?
            context$2$0.next = 47;
            return _regeneratorRuntime.awrap(this.checkAppPresent());

          case 47:
            context$2$0.next = 53;
            break;

          case 49:
            if (!this.appOnDevice) {
              context$2$0.next = 53;
              break;
            }

            // the app isn't an actual app file but rather something we want to
            // assume is on the device and just launch via the appPackage
            _logger2['default'].info('App file was not listed, instead we\'re going to run ' + (this.opts.appPackage + ' directly on the device'));
            context$2$0.next = 53;
            return _regeneratorRuntime.awrap(this.checkPackagePresent());

          case 53:
            if (!_appiumSupport.util.hasValue(this.opts.networkSpeed)) {
              context$2$0.next = 61;
              break;
            }

            if (this.isEmulator()) {
              context$2$0.next = 58;
              break;
            }

            _logger2['default'].warn("Sorry, networkSpeed capability is only available for emulators");
            context$2$0.next = 61;
            break;

          case 58:
            networkSpeed = _androidHelpers2['default'].ensureNetworkSpeed(this.adb, this.opts.networkSpeed);
            context$2$0.next = 61;
            return _regeneratorRuntime.awrap(this.adb.networkSpeed(networkSpeed));

          case 61:
            if (!_appiumSupport.util.hasValue(this.opts.gpsEnabled)) {
              context$2$0.next = 69;
              break;
            }

            if (!this.isEmulator()) {
              context$2$0.next = 68;
              break;
            }

            _logger2['default'].info('Trying to ' + (this.opts.gpsEnabled ? "enable" : "disable") + ' gps location provider');
            context$2$0.next = 66;
            return _regeneratorRuntime.awrap(this.adb.toggleGPSLocationProvider(this.opts.gpsEnabled));

          case 66:
            context$2$0.next = 69;
            break;

          case 68:
            _logger2['default'].warn('Sorry! gpsEnabled capability is only available for emulators');

          case 69:
            context$2$0.next = 71;
            return _regeneratorRuntime.awrap(this.startAndroidSession(this.opts));

          case 71:
            return context$2$0.abrupt('return', [sessionId, this.caps]);

          case 74:
            context$2$0.prev = 74;
            context$2$0.t2 = context$2$0['catch'](0);
            context$2$0.prev = 76;
            context$2$0.next = 79;
            return _regeneratorRuntime.awrap(this.deleteSession());

          case 79:
            context$2$0.next = 83;
            break;

          case 81:
            context$2$0.prev = 81;
            context$2$0.t3 = context$2$0['catch'](76);

          case 83:
            throw context$2$0.t2;

          case 84:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 74], [76, 81]]);
    }
  }, {
    key: 'isEmulator',
    value: function isEmulator() {
      return !!(this.opts.avd || /emulator/.test(this.opts.udid));
    }
  }, {
    key: 'setAvdFromCapabilities',
    value: function setAvdFromCapabilities(caps) {
      if (this.opts.avd) {
        _logger2['default'].info('avd name defined, ignoring device name and platform version');
      } else {
        if (!caps.deviceName) {
          _logger2['default'].errorAndThrow('avd or deviceName should be specified when reboot option is enables');
        }
        if (!caps.platformVersion) {
          _logger2['default'].errorAndThrow('avd or platformVersion should be specified when reboot option is enabled');
        }
        var avdDevice = caps.deviceName.replace(/[^a-zA-Z0-9_.]/g, "-");
        this.opts.avd = avdDevice + '__' + caps.platformVersion;
      }
    }
  }, {
    key: 'onSettingsUpdate',
    value: function onSettingsUpdate(key, value) {
      return _regeneratorRuntime.async(function onSettingsUpdate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(key === "ignoreUnimportantViews")) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.setCompressedLayoutHierarchy(value));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startAndroidSession',
    value: function startAndroidSession() {
      return _regeneratorRuntime.async(function startAndroidSession$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('Starting Android session');
            // set up the device to run on (real or emulator, etc)
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].initDevice(this.adb, this.opts));

          case 3:
            this.defaultIME = context$2$0.sent;

            // set actual device name, udid, platform version, screen size, model and manufacturer details
            this.caps.deviceName = this.adb.curDeviceId;
            this.caps.deviceUDID = this.opts.udid;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.adb.getPlatformVersion());

          case 8:
            this.caps.platformVersion = context$2$0.sent;
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(this.adb.getScreenSize());

          case 11:
            this.caps.deviceScreenSize = context$2$0.sent;
            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(this.adb.getModel());

          case 14:
            this.caps.deviceModel = context$2$0.sent;
            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(this.adb.getManufacturer());

          case 17:
            this.caps.deviceManufacturer = context$2$0.sent;

            if (!this.opts.autoLaunch) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.initAUT());

          case 21:
            // start UiAutomator
            this.bootstrap = new _androidHelpers2['default'].bootstrap(this.adb, this.bootstrapPort, this.opts.websocket);
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(this.bootstrap.start(this.opts.appPackage, this.opts.disableAndroidWatchers, this.opts.acceptSslCerts));

          case 24:
            // handling unexpected shutdown
            this.bootstrap.onUnexpectedShutdown['catch'](function callee$2$0(err) {
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    if (this.bootstrap.ignoreUnexpectedShutdown) {
                      context$3$0.next = 3;
                      break;
                    }

                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

                  case 3:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            });

            if (this.opts.skipUnlock) {
              context$2$0.next = 28;
              break;
            }

            context$2$0.next = 28;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this, this.adb, this.caps));

          case 28:
            if (!this.opts.ignoreUnimportantViews) {
              context$2$0.next = 31;
              break;
            }

            context$2$0.next = 31;
            return _regeneratorRuntime.awrap(this.settings.update({ ignoreUnimportantViews: this.opts.ignoreUnimportantViews }));

          case 31:
            if (!this.isChromeSession) {
              context$2$0.next = 39;
              break;
            }

            context$2$0.next = 34;
            return _regeneratorRuntime.awrap(this.startChromeSession());

          case 34:
            if (!this.shouldDismissChromeWelcome()) {
              context$2$0.next = 37;
              break;
            }

            context$2$0.next = 37;
            return _regeneratorRuntime.awrap(this.dismissChromeWelcome());

          case 37:
            context$2$0.next = 42;
            break;

          case 39:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 42;
              break;
            }

            context$2$0.next = 42;
            return _regeneratorRuntime.awrap(this.startAUT());

          case 42:
            if (!_appiumSupport.util.hasValue(this.opts.orientation)) {
              context$2$0.next = 46;
              break;
            }

            _logger2['default'].debug('Setting initial orientation to \'' + this.opts.orientation + '\'');
            context$2$0.next = 46;
            return _regeneratorRuntime.awrap(this.setOrientation(this.opts.orientation));

          case 46:
            context$2$0.next = 48;
            return _regeneratorRuntime.awrap(this.initAutoWebview());

          case 48:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'shouldDismissChromeWelcome',
    value: function shouldDismissChromeWelcome() {
      return !_lodash2['default'].isUndefined(this.opts.chromeOptions) && _lodash2['default'].isArray(this.opts.chromeOptions.args) && this.opts.chromeOptions.args.indexOf('--no-first-run') !== -1;
    }
  }, {
    key: 'dismissChromeWelcome',
    value: function dismissChromeWelcome() {
      var activity, el, _el;

      return _regeneratorRuntime.async(function dismissChromeWelcome$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info("Trying to dismiss Chrome welcome");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.getCurrentActivity());

          case 3:
            activity = context$2$0.sent;

            if (!(activity !== "org.chromium.chrome.browser.firstrun.FirstRunActivity")) {
              context$2$0.next = 7;
              break;
            }

            _logger2['default'].info("Chrome welcome dialog never showed up! Continuing");
            return context$2$0.abrupt('return');

          case 7:
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(this.findElOrEls('id', 'com.android.chrome:id/terms_accept', false));

          case 9:
            el = context$2$0.sent;
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(this.click(el.ELEMENT));

          case 12:
            context$2$0.prev = 12;
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.findElOrEls('id', 'com.android.chrome:id/negative_button', false));

          case 15:
            _el = context$2$0.sent;
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.click(_el.ELEMENT));

          case 18:
            context$2$0.next = 23;
            break;

          case 20:
            context$2$0.prev = 20;
            context$2$0.t0 = context$2$0['catch'](12);

            // DO NOTHING, THIS DEVICE DIDNT LAUNCH THE SIGNIN DIALOG
            // IT MUST BE A NON GMS DEVICE
            _logger2['default'].warn('This device didnt show Chrome SignIn dialog, ' + context$2$0.t0.message);

          case 23:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[12, 20]]);
    }
  }, {
    key: 'initAutoWebview',
    value: function initAutoWebview() {
      return _regeneratorRuntime.async(function initAutoWebview$(context$2$0) {
        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.autoWebview) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap((function callee$2$0() {
              var viewName, timeout;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this2 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    viewName = this.defaultWebviewName();
                    timeout = this.opts.autoWebviewTimeout || 2000;

                    _logger2['default'].info('Setting auto webview to context \'' + viewName + '\' with timeout ' + timeout + 'ms');

                    // try every 500ms until timeout is over
                    context$3$0.next = 5;
                    return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(timeout / 500, 500, function callee$3$0() {
                      return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                          case 0:
                            context$4$0.next = 2;
                            return _regeneratorRuntime.awrap(this.setContext(viewName));

                          case 2:
                          case 'end':
                            return context$4$0.stop();
                        }
                      }, null, _this2);
                    }));

                  case 5:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this3);
            })());

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAUT',
    value: function initAUT() {
      var launchInfo;
      return _regeneratorRuntime.async(function initAUT$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getLaunchInfo(this.adb, this.opts));

          case 2:
            launchInfo = context$2$0.sent;

            _Object$assign(this.opts, launchInfo);
            _Object$assign(this.caps, launchInfo);
            // install app

            if (this.opts.app) {
              context$2$0.next = 14;
              break;
            }

            if (this.opts.fullReset) {
              _logger2['default'].errorAndThrow('Full reset requires an app capability, use fastReset if app is not provided');
            }
            _logger2['default'].debug('No app capability. Assuming it is already on the device');

            if (!this.opts.fastReset) {
              context$2$0.next = 11;
              break;
            }

            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].resetApp(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

          case 11:
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.grantPermissions());

          case 13:
            return context$2$0.abrupt('return');

          case 14:
            if (this.opts.skipUninstall) {
              context$2$0.next = 17;
              break;
            }

            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 17:
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts));

          case 19:
            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.grantPermissions());

          case 21:
            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(this.opts.language, this.adb, this.opts));

          case 23:
            this.apkStrings[this.opts.language] = context$2$0.sent;

            if (_lodash2['default'].isUndefined(this.opts.sharedPreferences)) {
              context$2$0.next = 27;
              break;
            }

            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.setSharedPreferences(this.opts));

          case 27:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startChromeSession',
    value: function startChromeSession() {
      var opts, knownPackages;
      return _regeneratorRuntime.async(function startChromeSession$(context$2$0) {
        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info("Starting a chrome-based browser session");
            opts = _lodash2['default'].cloneDeep(this.opts);

            opts.chromeUseRunningApp = false;

            knownPackages = ["org.chromium.chrome.shell", "com.android.chrome", "com.chrome.beta", "org.chromium.chrome", "org.chromium.webview_shell"];

            if (!_lodash2['default'].includes(knownPackages, this.opts.appPackage)) {
              opts.chromeAndroidActivity = this.opts.appActivity;
            }
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _commandsContext.setupNewChromedriver)(opts, this.adb.curDeviceId, this.adb));

          case 7:
            this.chromedriver = context$2$0.sent;

            this.chromedriver.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
              if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
                _this4.onChromedriverStop(_webviewHelpers.CHROMIUM_WIN);
              }
            });

            // Now that we have a Chrome session, we ensure that the context is
            // appropriately set and that this chromedriver is added to the list
            // of session chromedrivers so we can switch back and forth
            this.curContext = _webviewHelpers.CHROMIUM_WIN;
            this.sessionChromedrivers[_webviewHelpers.CHROMIUM_WIN] = this.chromedriver;
            this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
            this.jwpProxyActive = true;

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkAppPresent',
    value: function checkAppPresent() {
      return _regeneratorRuntime.async(function checkAppPresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether app is actually present");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.opts.app));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find app apk at ' + this.opts.app);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkPackagePresent',
    value: function checkPackagePresent() {
      return _regeneratorRuntime.async(function checkPackagePresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether package is present on the device");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.adb.shell(['pm', 'list', 'packages', this.opts.appPackage]));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find package ' + this.opts.appPackage + ' on the device');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'grantPermissions',
    value: function grantPermissions() {
      return _regeneratorRuntime.async(function grantPermissions$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.autoGrantPermissions) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.adb.grantAllPermissions(this.opts.appPackage, this.opts.app));

          case 4:
            context$2$0.next = 9;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](1);

            _logger2['default'].error('Unable to grant permissions requested. Original error: ' + context$2$0.t0.message);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 6]]);
    }

    // Set CompressedLayoutHierarchy on the device
  }, {
    key: 'setCompressedLayoutHierarchy',
    value: function setCompressedLayoutHierarchy(compress) {
      return _regeneratorRuntime.async(function setCompressedLayoutHierarchy$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.bootstrap.sendAction("compressedLayoutHierarchy", { compressLayout: compress }));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      var avdName;
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Shutting down Android driver");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'deleteSession', this).call(this));

          case 3:
            if (!this.bootstrap) {
              context$2$0.next = 23;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.stopChromedriverProxies());

          case 6:
            if (!(this.opts.unicodeKeyboard && this.opts.resetKeyboard && this.defaultIME)) {
              context$2$0.next = 10;
              break;
            }

            _logger2['default'].debug('Resetting IME to ' + this.defaultIME);
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(this.adb.setIME(this.defaultIME));

          case 10:
            if (this.isChromeSession) {
              context$2$0.next = 13;
              break;
            }

            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

          case 13:
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.goToHome());

          case 15:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 18:
            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.bootstrap.shutdown());

          case 20:
            this.bootstrap = null;
            context$2$0.next = 24;
            break;

          case 23:
            _logger2['default'].debug("Called deleteSession but bootstrap wasn't active");

          case 24:
            context$2$0.next = 26;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 26:
            if (!this.useUnlockHelperApp) {
              context$2$0.next = 29;
              break;
            }

            context$2$0.next = 29;
            return _regeneratorRuntime.awrap(this.adb.forceStop('io.appium.unlock'));

          case 29:
            if (!this.opts.reboot) {
              context$2$0.next = 34;
              break;
            }

            avdName = this.opts.avd.replace('@', '');

            _logger2['default'].debug('closing emulator \'' + avdName + '\'');
            context$2$0.next = 34;
            return _regeneratorRuntime.awrap(this.adb.killEmulator(avdName));

          case 34:
            if (!this.opts.clearSystemFiles) {
              context$2$0.next = 50;
              break;
            }

            if (!this.opts.appIsTemp) {
              context$2$0.next = 47;
              break;
            }

            _logger2['default'].debug('Temporary copy of app was made: deleting \'' + this.opts.app + '\'');
            context$2$0.prev = 37;
            context$2$0.next = 40;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(this.opts.app));

          case 40:
            context$2$0.next = 45;
            break;

          case 42:
            context$2$0.prev = 42;
            context$2$0.t0 = context$2$0['catch'](37);

            _logger2['default'].warn('Unable to delete temporary app: ' + context$2$0.t0.message);

          case 45:
            context$2$0.next = 48;
            break;

          case 47:
            _logger2['default'].debug('App was not copied, so not deleting');

          case 48:
            context$2$0.next = 51;
            break;

          case 50:
            _logger2['default'].debug('Not cleaning generated files. Add `clearSystemFiles` capability if wanted.');

          case 51:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[37, 42]]);
    }
  }, {
    key: 'setSharedPreferences',
    value: function setSharedPreferences() {
      var sharedPrefs, name, remotePath, remoteFile, localPath, builder;
      return _regeneratorRuntime.async(function setSharedPreferences$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            sharedPrefs = this.opts.sharedPreferences;

            _logger2['default'].info("Trying to set shared preferences");
            name = sharedPrefs.name;

            if (!_lodash2['default'].isUndefined(name)) {
              context$2$0.next = 6;
              break;
            }

            _logger2['default'].warn('Skipping setting Shared preferences, name is undefined: ' + JSON.stringify(sharedPrefs));
            return context$2$0.abrupt('return', false);

          case 6:
            remotePath = '/data/data/' + this.opts.appPackage + '/shared_prefs';
            remoteFile = remotePath + '/' + name + '.xml';
            localPath = '/tmp/' + name + '.xml';
            builder = this.getPrefsBuilder();

            builder.build(sharedPrefs.prefs);
            _logger2['default'].info('Creating temporary shared preferences: ' + localPath);
            builder.toFile(localPath);
            _logger2['default'].info('Creating shared_prefs remote folder: ' + remotePath);
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(this.adb.shell(['mkdir', '-p', remotePath]));

          case 16:
            _logger2['default'].info('Pushing shared_prefs to ' + remoteFile);
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(this.adb.push(localPath, remoteFile));

          case 19:
            context$2$0.prev = 19;

            _logger2['default'].info('Trying to remove shared preferences temporary file');
            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localPath));

          case 23:
            if (!context$2$0.sent) {
              context$2$0.next = 26;
              break;
            }

            context$2$0.next = 26;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localPath));

          case 26:
            context$2$0.next = 31;
            break;

          case 28:
            context$2$0.prev = 28;
            context$2$0.t0 = context$2$0['catch'](19);

            _logger2['default'].warn('Error trying to remove temporary file ' + localPath);

          case 31:
            return context$2$0.abrupt('return', true);

          case 32:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[19, 28]]);
    }
  }, {
    key: 'getPrefsBuilder',
    value: function getPrefsBuilder() {
      /* Add this method to create a new SharedPrefsBuilder instead of
       * directly creating the object on setSharedPreferences for testing purposes
      */
      return new _sharedPreferencesBuilder.SharedPrefsBuilder();
    }
  }, {
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      // check with the base class, and return if it fails
      var res = _get(Object.getPrototypeOf(AndroidDriver.prototype), 'validateDesiredCaps', this).call(this, caps);
      if (!res) return res; // eslint-disable-line curly

      // make sure that the capabilities have one of `app`, `appPackage` or `browser`
      if ((!caps.browserName || !_androidHelpers2['default'].isChromeBrowser(caps.browserName)) && !caps.app && !caps.appPackage) {
        var msg = 'The desired capabilities must include either an app, appPackage or browserName';
        _logger2['default'].errorAndThrow(msg);
      }
      // warn if the capabilities have both `app` and `browser, although this
      // is common with selenium grid
      if (caps.browserName && caps.app) {
        var msg = 'The desired capabilities should generally not include both an app and a browserName';
        _logger2['default'].warn(msg);
      }
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'proxyActive', this).call(this, sessionId);

      return this.jwpProxyActive;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'getProxyAvoidList', this).call(this, sessionId);

      return this.jwpProxyAvoid;
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'canProxy', this).call(this, sessionId);

      // this will change depending on ChromeDriver status
      return _lodash2['default'].isFunction(this.proxyReqRes);
    }
  }, {
    key: 'appOnDevice',
    get: function get() {
      return this.helpers.isPackageOrBundle(this.opts.app) || !this.opts.app && this.helpers.isPackageOrBundle(this.opts.appPackage);
    }
  }, {
    key: 'isChromeSession',
    get: function get() {
      return _androidHelpers2['default'].isChromeBrowser(this.opts.browserName);
    }
  }]);

  return AndroidDriver;
})(_appiumBaseDriver.BaseDriver);

exports['default'] = AndroidDriver;
module.exports = exports['default'];

// the whole createSession flow is surrounded in a try-catch statement
// if creating a session fails at any point, we teardown everything we
// set up before throwing the error.

// find and copy, or download and unzip an app url or path

// Some cloud services using appium launch the avd themselves, so we ensure netspeed
// is set for emulators by calling adb.networkSpeed before running the app

// check if we have to enable/disable gps before running the application

// ignoring delete session exception if any and throw the real error
// that happened while creating the session.

// If the user sets autoLaunch to false, they are responsible for initAUT() and startAUT()

// set up app under test
// eslint-disable-line promise/prefer-await-to-callbacks

// Let's try to unlock the device

// Set CompressedLayoutHierarchy on the device based on current settings object
// this has to happen _after_ bootstrap is initialized

// start a chromedriver session and proxy to it

// dismiss Chrome welcome dialog

// start app

// populate appPackage, appActivity, appWaitPackage, appWaitActivity,
// and the device being used
// in the opts and caps (so it gets back to the user on session creation)

// This must run after installing the apk, otherwise it would cause the
// install to fail. And before running the app.

// certain cleanup we only care to do if the bootstrap was ever run

// some cleanup we want to do regardless, in case we are shutting down
// mid-startup
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUcscUZBQXFGLENBQUM7QUFDaEcsNEJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ2Y7S0FDRjs7O1dBRVcscUJBQUMsU0FBUyxFQUFFO0FBQ3RCLGlDQTFlRSxhQUFhLDZDQTBlRyxTQUFTLEVBQUU7O0FBRTdCLGFBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztLQUM1Qjs7O1dBRWlCLDJCQUFDLFNBQVMsRUFBRTtBQUM1QixpQ0FoZkUsYUFBYSxtREFnZlMsU0FBUyxFQUFFOztBQUVuQyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDM0I7OztXQUVRLGtCQUFDLFNBQVMsRUFBRTtBQUNuQixpQ0F0ZkUsYUFBYSwwQ0FzZkEsU0FBUyxFQUFFOzs7QUFHMUIsYUFBTyxvQkFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZDOzs7U0ExVWUsZUFBRztBQUNqQixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEFBQUMsQ0FBQztLQUM5RDs7O1NBRW1CLGVBQUc7QUFDckIsYUFBTyw0QkFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN2RDs7O1NBdkxHLGFBQWE7OztxQkE2ZkosYUFBYSIsImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZURyaXZlciwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IENocm9tZWRyaXZlciBmcm9tICdhcHBpdW0tY2hyb21lZHJpdmVyJztcbmltcG9ydCBkZXNpcmVkQ29uc3RyYWludHMgZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xuaW1wb3J0IHsgc2V0dXBOZXdDaHJvbWVkcml2ZXIgfSBmcm9tICcuL2NvbW1hbmRzL2NvbnRleHQnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IHsgQ0hST01JVU1fV0lOIH0gZnJvbSAnLi93ZWJ2aWV3LWhlbHBlcnMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgREVGQVVMVF9BREJfUE9SVCB9IGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgZnMsIHRlbXBEaXIsIHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IHsgU2hhcmVkUHJlZnNCdWlsZGVyIH0gZnJvbSAnc2hhcmVkLXByZWZlcmVuY2VzLWJ1aWxkZXInO1xuXG5jb25zdCBBUFBfRVhURU5TSU9OID0gJy5hcGsnO1xuY29uc3QgREVWSUNFX1BPUlQgPSA0NzI0O1xuXG4vLyBUaGlzIGlzIGEgc2V0IG9mIG1ldGhvZHMgYW5kIHBhdGhzIHRoYXQgd2UgbmV2ZXIgd2FudCB0byBwcm94eSB0b1xuLy8gQ2hyb21lZHJpdmVyXG5jb25zdCBOT19QUk9YWSA9IFtcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2NvbnRleHQnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2NvbnRleHQnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0nKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL3BlcmZvcm0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy90b3VjaC9tdWx0aS9wZXJmb3JtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvb3JpZW50YXRpb24nKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxuXTtcblxuY2xhc3MgQW5kcm9pZERyaXZlciBleHRlbmRzIEJhc2VEcml2ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9LCBzaG91bGRWYWxpZGF0ZUNhcHMgPSB0cnVlKSB7XG4gICAgc3VwZXIob3B0cywgc2hvdWxkVmFsaWRhdGVDYXBzKTtcblxuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbXG4gICAgICAneHBhdGgnLFxuICAgICAgJ2lkJyxcbiAgICAgICdjbGFzcyBuYW1lJyxcbiAgICAgICdhY2Nlc3NpYmlsaXR5IGlkJyxcbiAgICAgICctYW5kcm9pZCB1aWF1dG9tYXRvcidcbiAgICBdO1xuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENvbnN0cmFpbnRzO1xuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMgPSB7fTtcbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5qd3BQcm94eUF2b2lkID0gXy5jbG9uZShOT19QUk9YWSk7XG4gICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBEZXZpY2VTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNldHRpbmdzVXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuY2hyb21lZHJpdmVyID0gbnVsbDtcbiAgICB0aGlzLmFwa1N0cmluZ3MgPSB7fTtcbiAgICB0aGlzLmJvb3RzdHJhcFBvcnQgPSBvcHRzLmJvb3RzdHJhcFBvcnQgfHwgREVWSUNFX1BPUlQ7XG4gICAgdGhpcy51bmxvY2tlciA9IGhlbHBlcnMudW5sb2NrZXI7XG5cbiAgICBmb3IgKGxldCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGNvbW1hbmRzKSkge1xuICAgICAgQW5kcm9pZERyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKC4uLmFyZ3MpIHtcbiAgICAvLyB0aGUgd2hvbGUgY3JlYXRlU2Vzc2lvbiBmbG93IGlzIHN1cnJvdW5kZWQgaW4gYSB0cnktY2F0Y2ggc3RhdGVtZW50XG4gICAgLy8gaWYgY3JlYXRpbmcgYSBzZXNzaW9uIGZhaWxzIGF0IGFueSBwb2ludCwgd2UgdGVhcmRvd24gZXZlcnl0aGluZyB3ZVxuICAgIC8vIHNldCB1cCBiZWZvcmUgdGhyb3dpbmcgdGhlIGVycm9yLlxuICAgIHRyeSB7XG4gICAgICBsZXQgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKC4uLmFyZ3MpO1xuXG4gICAgICBsZXQgc2VydmVyRGV0YWlscyA9IHtwbGF0Zm9ybTogJ0xJTlVYJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlN0b3JhZ2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VzU2NyZWVuc2hvdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtDb25uZWN0aW9uRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uQ29udGV4dEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybmluZ3M6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaXJlZDogdGhpcy5jYXBzfTtcblxuICAgICAgdGhpcy5jYXBzID0gT2JqZWN0LmFzc2lnbihzZXJ2ZXJEZXRhaWxzLCB0aGlzLmNhcHMpO1xuXG4gICAgICAvLyBhc3NpZ25pbmcgZGVmYXVsdHNcbiAgICAgIGxldCBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgYWN0aW9uOiBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOXCIsXG4gICAgICAgIGNhdGVnb3J5OiBcImFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkxBVU5DSEVSXCIsXG4gICAgICAgIGZsYWdzOiBcIjB4MTAyMDAwMDBcIixcbiAgICAgICAgZGlzYWJsZUFuZHJvaWRXYXRjaGVyczogZmFsc2UsXG4gICAgICAgIHRtcERpcjogYXdhaXQgdGVtcERpci5zdGF0aWNEaXIoKSxcbiAgICAgICAgZnVsbFJlc2V0OiBmYWxzZSxcbiAgICAgICAgYXV0b0xhdW5jaDogdHJ1ZSxcbiAgICAgICAgYWRiUG9ydDogREVGQVVMVF9BREJfUE9SVCxcbiAgICAgICAgYW5kcm9pZEluc3RhbGxUaW1lb3V0OiA5MDAwMFxuICAgICAgfTtcbiAgICAgIF8uZGVmYXVsdHModGhpcy5vcHRzLCBkZWZhdWx0T3B0cyk7XG4gICAgICBpZiAoIXRoaXMub3B0cy5qYXZhVmVyc2lvbikge1xuICAgICAgICB0aGlzLm9wdHMuamF2YVZlcnNpb24gPSBhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnVzZVVubG9ja0hlbHBlckFwcCA9IF8uaXNVbmRlZmluZWQodGhpcy5jYXBzLnVubG9ja1R5cGUpO1xuXG4gICAgICAvLyBub3QgdXNlciB2aXNpYmxlIHZpYSBjYXBzXG4gICAgICBpZiAodGhpcy5vcHRzLm5vUmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRzLmZ1bGxSZXNldCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRzLm5vUmVzZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0cy5mYXN0UmVzZXQgPSAhdGhpcy5vcHRzLmZ1bGxSZXNldCAmJiAhdGhpcy5vcHRzLm5vUmVzZXQ7XG4gICAgICB0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCA9IHRoaXMub3B0cy5mYXN0UmVzZXQgfHwgdGhpcy5vcHRzLm5vUmVzZXQ7XG5cbiAgICAgIHRoaXMuY3VyQ29udGV4dCA9IHRoaXMuZGVmYXVsdENvbnRleHROYW1lKCk7XG5cbiAgICAgIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgICBsb2cuaW5mbyhcIldlJ3JlIGdvaW5nIHRvIHJ1biBhIENocm9tZS1iYXNlZCBzZXNzaW9uXCIpO1xuICAgICAgICBsZXQge3BrZywgYWN0aXZpdHl9ID0gaGVscGVycy5nZXRDaHJvbWVQa2codGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcbiAgICAgICAgdGhpcy5vcHRzLmFwcFBhY2thZ2UgPSBwa2c7XG4gICAgICAgIHRoaXMub3B0cy5hcHBBY3Rpdml0eSA9IGFjdGl2aXR5O1xuICAgICAgICBsb2cuaW5mbyhgQ2hyb21lLXR5cGUgcGFja2FnZSBhbmQgYWN0aXZpdHkgYXJlICR7cGtnfSBhbmQgJHthY3Rpdml0eX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0cy5uYXRpdmVXZWJTY3JlZW5zaG90KSB7XG4gICAgICAgIHRoaXMuandwUHJveHlBdm9pZC5wdXNoKFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3NjcmVlbnNob3QnKV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRzLnJlYm9vdCkge1xuICAgICAgICB0aGlzLnNldEF2ZEZyb21DYXBhYmlsaXRpZXMoY2Fwcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCBkZXZpY2UgdWRpZCBmb3IgdGhpcyBzZXNzaW9uXG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2Fwcyh0aGlzLm9wdHMpO1xuICAgICAgdGhpcy5vcHRzLnVkaWQgPSB1ZGlkO1xuICAgICAgdGhpcy5vcHRzLmVtUG9ydCA9IGVtUG9ydDtcblxuICAgICAgLy8gc2V0IHVwIGFuIGluc3RhbmNlIG9mIEFEQlxuICAgICAgdGhpcy5hZGIgPSBhd2FpdCBoZWxwZXJzLmNyZWF0ZUFEQih0aGlzLm9wdHMuamF2YVZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy51ZGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZW1Qb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuYWRiUG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnN1cHByZXNzS2lsbFNlcnZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnJlbW90ZUFkYkhvc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5jbGVhckRldmljZUxvZ3NPblN0YXJ0KTtcblxuICAgICAgaWYgKHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSkge1xuICAgICAgICAvLyB1c2VyIHByb3ZpZGVkIHBhY2thZ2UgaW5zdGVhZCBvZiBhcHAgZm9yICdhcHAnIGNhcGFiaWxpdHksIG1hc3NhZ2Ugb3B0aW9uc1xuICAgICAgICB0aGlzLm9wdHMuYXBwUGFja2FnZSA9IHRoaXMub3B0cy5hcHA7XG4gICAgICAgIHRoaXMub3B0cy5hcHAgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRzLmFwcCkge1xuICAgICAgICAvLyBmaW5kIGFuZCBjb3B5LCBvciBkb3dubG9hZCBhbmQgdW56aXAgYW4gYXBwIHVybCBvciBwYXRoXG4gICAgICAgIHRoaXMub3B0cy5hcHAgPSBhd2FpdCB0aGlzLmhlbHBlcnMuY29uZmlndXJlQXBwKHRoaXMub3B0cy5hcHAsIEFQUF9FWFRFTlNJT04pO1xuICAgICAgICB0aGlzLm9wdHMuYXBwSXNUZW1wID0gY2Fwcy5hcHAgIT09IHRoaXMub3B0cy5hcHA7IC8vIGRpZCB3ZSBtYWtlIGEgdGVtcG9yYXJ5IGNvcHk/XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tBcHBQcmVzZW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXBwT25EZXZpY2UpIHtcbiAgICAgICAgLy8gdGhlIGFwcCBpc24ndCBhbiBhY3R1YWwgYXBwIGZpbGUgYnV0IHJhdGhlciBzb21ldGhpbmcgd2Ugd2FudCB0b1xuICAgICAgICAvLyBhc3N1bWUgaXMgb24gdGhlIGRldmljZSBhbmQganVzdCBsYXVuY2ggdmlhIHRoZSBhcHBQYWNrYWdlXG4gICAgICAgIGxvZy5pbmZvKGBBcHAgZmlsZSB3YXMgbm90IGxpc3RlZCwgaW5zdGVhZCB3ZSdyZSBnb2luZyB0byBydW4gYCArXG4gICAgICAgICAgICAgICAgIGAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBkaXJlY3RseSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tQYWNrYWdlUHJlc2VudCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTb21lIGNsb3VkIHNlcnZpY2VzIHVzaW5nIGFwcGl1bSBsYXVuY2ggdGhlIGF2ZCB0aGVtc2VsdmVzLCBzbyB3ZSBlbnN1cmUgbmV0c3BlZWRcbiAgICAgIC8vIGlzIHNldCBmb3IgZW11bGF0b3JzIGJ5IGNhbGxpbmcgYWRiLm5ldHdvcmtTcGVlZCBiZWZvcmUgcnVubmluZyB0aGUgYXBwXG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLm9wdHMubmV0d29ya1NwZWVkKSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbXVsYXRvcigpKSB7XG4gICAgICAgICAgbG9nLndhcm4oXCJTb3JyeSwgbmV0d29ya1NwZWVkIGNhcGFiaWxpdHkgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbmV0d29ya1NwZWVkID0gaGVscGVycy5lbnN1cmVOZXR3b3JrU3BlZWQodGhpcy5hZGIsIHRoaXMub3B0cy5uZXR3b3JrU3BlZWQpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWRiLm5ldHdvcmtTcGVlZChuZXR3b3JrU3BlZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBjaGVjayBpZiB3ZSBoYXZlIHRvIGVuYWJsZS9kaXNhYmxlIGdwcyBiZWZvcmUgcnVubmluZyB0aGUgYXBwbGljYXRpb25cbiAgICAgIGlmICh1dGlsLmhhc1ZhbHVlKHRoaXMub3B0cy5ncHNFbmFibGVkKSkge1xuICAgICAgICBpZiAodGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICAgICAgICBsb2cuaW5mbyhgVHJ5aW5nIHRvICR7dGhpcy5vcHRzLmdwc0VuYWJsZWQgPyBcImVuYWJsZVwiIDogXCJkaXNhYmxlXCJ9IGdwcyBsb2NhdGlvbiBwcm92aWRlcmApO1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWRiLnRvZ2dsZUdQU0xvY2F0aW9uUHJvdmlkZXIodGhpcy5vcHRzLmdwc0VuYWJsZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZy53YXJuKCdTb3JyeSEgZ3BzRW5hYmxlZCBjYXBhYmlsaXR5IGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnMnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0QW5kcm9pZFNlc3Npb24odGhpcy5vcHRzKTtcbiAgICAgIHJldHVybiBbc2Vzc2lvbklkLCB0aGlzLmNhcHNdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlnbm9yaW5nIGRlbGV0ZSBzZXNzaW9uIGV4Y2VwdGlvbiBpZiBhbnkgYW5kIHRocm93IHRoZSByZWFsIGVycm9yXG4gICAgICAvLyB0aGF0IGhhcHBlbmVkIHdoaWxlIGNyZWF0aW5nIHRoZSBzZXNzaW9uLlxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVTZXNzaW9uKCk7XG4gICAgICB9IGNhdGNoIChpZ24pIHt9XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGlzRW11bGF0b3IgKCkge1xuICAgIHJldHVybiAhISh0aGlzLm9wdHMuYXZkIHx8IC9lbXVsYXRvci8udGVzdCh0aGlzLm9wdHMudWRpZCkpO1xuICB9XG5cbiAgc2V0QXZkRnJvbUNhcGFiaWxpdGllcyAoY2Fwcykge1xuICAgIGlmICh0aGlzLm9wdHMuYXZkKSB7XG4gICAgICBsb2cuaW5mbygnYXZkIG5hbWUgZGVmaW5lZCwgaWdub3JpbmcgZGV2aWNlIG5hbWUgYW5kIHBsYXRmb3JtIHZlcnNpb24nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjYXBzLmRldmljZU5hbWUpIHtcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coJ2F2ZCBvciBkZXZpY2VOYW1lIHNob3VsZCBiZSBzcGVjaWZpZWQgd2hlbiByZWJvb3Qgb3B0aW9uIGlzIGVuYWJsZXMnKTtcbiAgICAgIH1cbiAgICAgIGlmICghY2Fwcy5wbGF0Zm9ybVZlcnNpb24pIHtcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coJ2F2ZCBvciBwbGF0Zm9ybVZlcnNpb24gc2hvdWxkIGJlIHNwZWNpZmllZCB3aGVuIHJlYm9vdCBvcHRpb24gaXMgZW5hYmxlZCcpO1xuICAgICAgfVxuICAgICAgbGV0IGF2ZERldmljZSA9IGNhcHMuZGV2aWNlTmFtZS5yZXBsYWNlKC9bXmEtekEtWjAtOV8uXS9nLCBcIi1cIik7XG4gICAgICB0aGlzLm9wdHMuYXZkID0gYCR7YXZkRGV2aWNlfV9fJHtjYXBzLnBsYXRmb3JtVmVyc2lvbn1gO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhcHBPbkRldmljZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSB8fCAoIXRoaXMub3B0cy5hcHAgJiZcbiAgICAgICAgICAgdGhpcy5oZWxwZXJzLmlzUGFja2FnZU9yQnVuZGxlKHRoaXMub3B0cy5hcHBQYWNrYWdlKSk7XG4gIH1cblxuICBnZXQgaXNDaHJvbWVTZXNzaW9uICgpIHtcbiAgICByZXR1cm4gaGVscGVycy5pc0Nocm9tZUJyb3dzZXIodGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcbiAgfVxuXG4gIGFzeW5jIG9uU2V0dGluZ3NVcGRhdGUgKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5ID09PSBcImlnbm9yZVVuaW1wb3J0YW50Vmlld3NcIikge1xuICAgICAgYXdhaXQgdGhpcy5zZXRDb21wcmVzc2VkTGF5b3V0SGllcmFyY2h5KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzdGFydEFuZHJvaWRTZXNzaW9uICgpIHtcbiAgICBsb2cuaW5mbyhgU3RhcnRpbmcgQW5kcm9pZCBzZXNzaW9uYCk7XG4gICAgLy8gc2V0IHVwIHRoZSBkZXZpY2UgdG8gcnVuIG9uIChyZWFsIG9yIGVtdWxhdG9yLCBldGMpXG4gICAgdGhpcy5kZWZhdWx0SU1FID0gYXdhaXQgaGVscGVycy5pbml0RGV2aWNlKHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuXG4gICAgLy8gc2V0IGFjdHVhbCBkZXZpY2UgbmFtZSwgdWRpZCwgcGxhdGZvcm0gdmVyc2lvbiwgc2NyZWVuIHNpemUsIG1vZGVsIGFuZCBtYW51ZmFjdHVyZXIgZGV0YWlsc1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VOYW1lID0gdGhpcy5hZGIuY3VyRGV2aWNlSWQ7XG4gICAgdGhpcy5jYXBzLmRldmljZVVESUQgPSB0aGlzLm9wdHMudWRpZDtcbiAgICB0aGlzLmNhcHMucGxhdGZvcm1WZXJzaW9uID0gYXdhaXQgdGhpcy5hZGIuZ2V0UGxhdGZvcm1WZXJzaW9uKCk7XG4gICAgdGhpcy5jYXBzLmRldmljZVNjcmVlblNpemUgPSBhd2FpdCB0aGlzLmFkYi5nZXRTY3JlZW5TaXplKCk7XG4gICAgdGhpcy5jYXBzLmRldmljZU1vZGVsID0gYXdhaXQgdGhpcy5hZGIuZ2V0TW9kZWwoKTtcbiAgICB0aGlzLmNhcHMuZGV2aWNlTWFudWZhY3R1cmVyID0gYXdhaXQgdGhpcy5hZGIuZ2V0TWFudWZhY3R1cmVyKCk7XG5cbiAgICAvLyBJZiB0aGUgdXNlciBzZXRzIGF1dG9MYXVuY2ggdG8gZmFsc2UsIHRoZXkgYXJlIHJlc3BvbnNpYmxlIGZvciBpbml0QVVUKCkgYW5kIHN0YXJ0QVVUKClcbiAgICBpZiAodGhpcy5vcHRzLmF1dG9MYXVuY2gpIHtcbiAgICAgIC8vIHNldCB1cCBhcHAgdW5kZXIgdGVzdFxuICAgICAgYXdhaXQgdGhpcy5pbml0QVVUKCk7XG4gICAgfVxuICAgIC8vIHN0YXJ0IFVpQXV0b21hdG9yXG4gICAgdGhpcy5ib290c3RyYXAgPSBuZXcgaGVscGVycy5ib290c3RyYXAodGhpcy5hZGIsIHRoaXMuYm9vdHN0cmFwUG9ydCwgdGhpcy5vcHRzLndlYnNvY2tldCk7XG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc3RhcnQodGhpcy5vcHRzLmFwcFBhY2thZ2UsIHRoaXMub3B0cy5kaXNhYmxlQW5kcm9pZFdhdGNoZXJzLCB0aGlzLm9wdHMuYWNjZXB0U3NsQ2VydHMpO1xuICAgIC8vIGhhbmRsaW5nIHVuZXhwZWN0ZWQgc2h1dGRvd25cbiAgICB0aGlzLmJvb3RzdHJhcC5vblVuZXhwZWN0ZWRTaHV0ZG93bi5jYXRjaChhc3luYyAoZXJyKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tY2FsbGJhY2tzXG4gICAgICBpZiAoIXRoaXMuYm9vdHN0cmFwLmlnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93bikge1xuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5sb2NrKSB7XG4gICAgICAvLyBMZXQncyB0cnkgdG8gdW5sb2NrIHRoZSBkZXZpY2VcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKHRoaXMsIHRoaXMuYWRiLCB0aGlzLmNhcHMpO1xuICAgIH1cblxuICAgIC8vIFNldCBDb21wcmVzc2VkTGF5b3V0SGllcmFyY2h5IG9uIHRoZSBkZXZpY2UgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncyBvYmplY3RcbiAgICAvLyB0aGlzIGhhcyB0byBoYXBwZW4gX2FmdGVyXyBib290c3RyYXAgaXMgaW5pdGlhbGl6ZWRcbiAgICBpZiAodGhpcy5vcHRzLmlnbm9yZVVuaW1wb3J0YW50Vmlld3MpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0dGluZ3MudXBkYXRlKHtpZ25vcmVVbmltcG9ydGFudFZpZXdzOiB0aGlzLm9wdHMuaWdub3JlVW5pbXBvcnRhbnRWaWV3c30pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgLy8gc3RhcnQgYSBjaHJvbWVkcml2ZXIgc2Vzc2lvbiBhbmQgcHJveHkgdG8gaXRcbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRDaHJvbWVTZXNzaW9uKCk7XG4gICAgICBpZiAodGhpcy5zaG91bGREaXNtaXNzQ2hyb21lV2VsY29tZSgpKSB7XG4gICAgICAgIC8vIGRpc21pc3MgQ2hyb21lIHdlbGNvbWUgZGlhbG9nXG4gICAgICAgIGF3YWl0IHRoaXMuZGlzbWlzc0Nocm9tZVdlbGNvbWUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0cy5hdXRvTGF1bmNoKSB7XG4gICAgICAgIC8vIHN0YXJ0IGFwcFxuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWwuaGFzVmFsdWUodGhpcy5vcHRzLm9yaWVudGF0aW9uKSkge1xuICAgICAgbG9nLmRlYnVnKGBTZXR0aW5nIGluaXRpYWwgb3JpZW50YXRpb24gdG8gJyR7dGhpcy5vcHRzLm9yaWVudGF0aW9ufSdgKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5vcHRzLm9yaWVudGF0aW9uKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmluaXRBdXRvV2VidmlldygpO1xuICB9XG5cbiAgc2hvdWxkRGlzbWlzc0Nocm9tZVdlbGNvbWUgKCkge1xuICAgIHJldHVybiAhXy5pc1VuZGVmaW5lZCh0aGlzLm9wdHMuY2hyb21lT3B0aW9ucykgJiZcbiAgICAgIF8uaXNBcnJheSh0aGlzLm9wdHMuY2hyb21lT3B0aW9ucy5hcmdzKSAmJlxuICAgICAgdGhpcy5vcHRzLmNocm9tZU9wdGlvbnMuYXJncy5pbmRleE9mKCctLW5vLWZpcnN0LXJ1bicpICE9PSAtMTtcbiAgfVxuXG4gIGFzeW5jIGRpc21pc3NDaHJvbWVXZWxjb21lICgpIHtcbiAgICBsb2cuaW5mbyhcIlRyeWluZyB0byBkaXNtaXNzIENocm9tZSB3ZWxjb21lXCIpO1xuICAgIGxldCBhY3Rpdml0eSA9IGF3YWl0IHRoaXMuZ2V0Q3VycmVudEFjdGl2aXR5KCk7XG4gICAgaWYgKGFjdGl2aXR5ICE9PSBcIm9yZy5jaHJvbWl1bS5jaHJvbWUuYnJvd3Nlci5maXJzdHJ1bi5GaXJzdFJ1bkFjdGl2aXR5XCIpIHtcbiAgICAgIGxvZy5pbmZvKFwiQ2hyb21lIHdlbGNvbWUgZGlhbG9nIG5ldmVyIHNob3dlZCB1cCEgQ29udGludWluZ1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGVsID0gYXdhaXQgdGhpcy5maW5kRWxPckVscygnaWQnLCAnY29tLmFuZHJvaWQuY2hyb21lOmlkL3Rlcm1zX2FjY2VwdCcsIGZhbHNlKTtcbiAgICBhd2FpdCB0aGlzLmNsaWNrKGVsLkVMRU1FTlQpO1xuICAgIHRyeSB7XG4gICAgICBsZXQgZWwgPSBhd2FpdCB0aGlzLmZpbmRFbE9yRWxzKCdpZCcsICdjb20uYW5kcm9pZC5jaHJvbWU6aWQvbmVnYXRpdmVfYnV0dG9uJywgZmFsc2UpO1xuICAgICAgYXdhaXQgdGhpcy5jbGljayhlbC5FTEVNRU5UKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBETyBOT1RISU5HLCBUSElTIERFVklDRSBESUROVCBMQVVOQ0ggVEhFIFNJR05JTiBESUFMT0dcbiAgICAgIC8vIElUIE1VU1QgQkUgQSBOT04gR01TIERFVklDRVxuICAgICAgbG9nLndhcm4oYFRoaXMgZGV2aWNlIGRpZG50IHNob3cgQ2hyb21lIFNpZ25JbiBkaWFsb2csICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGluaXRBdXRvV2VidmlldyAoKSB7XG4gICAgaWYgKHRoaXMub3B0cy5hdXRvV2Vidmlldykge1xuICAgICAgbGV0IHZpZXdOYW1lID0gdGhpcy5kZWZhdWx0V2Vidmlld05hbWUoKTtcbiAgICAgIGxldCB0aW1lb3V0ID0gKHRoaXMub3B0cy5hdXRvV2Vidmlld1RpbWVvdXQpIHx8IDIwMDA7XG5cbiAgICAgIGxvZy5pbmZvKGBTZXR0aW5nIGF1dG8gd2VidmlldyB0byBjb250ZXh0ICcke3ZpZXdOYW1lfScgd2l0aCB0aW1lb3V0ICR7dGltZW91dH1tc2ApO1xuXG4gICAgICAvLyB0cnkgZXZlcnkgNTAwbXMgdW50aWwgdGltZW91dCBpcyBvdmVyXG4gICAgICBhd2FpdCByZXRyeUludGVydmFsKHRpbWVvdXQgLyA1MDAsIDUwMCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnNldENvbnRleHQodmlld05hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW5pdEFVVCAoKSB7XG4gICAgLy8gcG9wdWxhdGUgYXBwUGFja2FnZSwgYXBwQWN0aXZpdHksIGFwcFdhaXRQYWNrYWdlLCBhcHBXYWl0QWN0aXZpdHksXG4gICAgLy8gYW5kIHRoZSBkZXZpY2UgYmVpbmcgdXNlZFxuICAgIC8vIGluIHRoZSBvcHRzIGFuZCBjYXBzIChzbyBpdCBnZXRzIGJhY2sgdG8gdGhlIHVzZXIgb24gc2Vzc2lvbiBjcmVhdGlvbilcbiAgICBsZXQgbGF1bmNoSW5mbyA9IGF3YWl0IGhlbHBlcnMuZ2V0TGF1bmNoSW5mbyh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0cywgbGF1bmNoSW5mbyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNhcHMsIGxhdW5jaEluZm8pO1xuICAgIC8vIGluc3RhbGwgYXBwXG4gICAgaWYgKCF0aGlzLm9wdHMuYXBwKSB7XG4gICAgICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCkge1xuICAgICAgICBsb2cuZXJyb3JBbmRUaHJvdygnRnVsbCByZXNldCByZXF1aXJlcyBhbiBhcHAgY2FwYWJpbGl0eSwgdXNlIGZhc3RSZXNldCBpZiBhcHAgaXMgbm90IHByb3ZpZGVkJyk7XG4gICAgICB9XG4gICAgICBsb2cuZGVidWcoJ05vIGFwcCBjYXBhYmlsaXR5LiBBc3N1bWluZyBpdCBpcyBhbHJlYWR5IG9uIHRoZSBkZXZpY2UnKTtcbiAgICAgIGlmICh0aGlzLm9wdHMuZmFzdFJlc2V0KSB7XG4gICAgICAgIGF3YWl0IGhlbHBlcnMucmVzZXRBcHAodGhpcy5hZGIsIHRoaXMub3B0cy5hcHAsIHRoaXMub3B0cy5hcHBQYWNrYWdlLCB0aGlzLm9wdHMuZmFzdFJlc2V0KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuZ3JhbnRQZXJtaXNzaW9ucygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5pbnN0YWxsKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIH1cbiAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseSh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICBhd2FpdCB0aGlzLmdyYW50UGVybWlzc2lvbnMoKTtcbiAgICB0aGlzLmFwa1N0cmluZ3NbdGhpcy5vcHRzLmxhbmd1YWdlXSA9IGF3YWl0IGhlbHBlcnMucHVzaFN0cmluZ3MoXG4gICAgICAgIHRoaXMub3B0cy5sYW5ndWFnZSwgdGhpcy5hZGIsIHRoaXMub3B0cyk7XG5cbiAgICAvLyBUaGlzIG11c3QgcnVuIGFmdGVyIGluc3RhbGxpbmcgdGhlIGFwaywgb3RoZXJ3aXNlIGl0IHdvdWxkIGNhdXNlIHRoZVxuICAgIC8vIGluc3RhbGwgdG8gZmFpbC4gQW5kIGJlZm9yZSBydW5uaW5nIHRoZSBhcHAuXG4gICAgaWYgKCFfLmlzVW5kZWZpbmVkKHRoaXMub3B0cy5zaGFyZWRQcmVmZXJlbmNlcykpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0U2hhcmVkUHJlZmVyZW5jZXModGhpcy5vcHRzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzdGFydENocm9tZVNlc3Npb24gKCkge1xuICAgIGxvZy5pbmZvKFwiU3RhcnRpbmcgYSBjaHJvbWUtYmFzZWQgYnJvd3NlciBzZXNzaW9uXCIpO1xuICAgIGxldCBvcHRzID0gXy5jbG9uZURlZXAodGhpcy5vcHRzKTtcbiAgICBvcHRzLmNocm9tZVVzZVJ1bm5pbmdBcHAgPSBmYWxzZTtcblxuICAgIGNvbnN0IGtub3duUGFja2FnZXMgPSBbXCJvcmcuY2hyb21pdW0uY2hyb21lLnNoZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbS5hbmRyb2lkLmNocm9tZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb20uY2hyb21lLmJldGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3JnLmNocm9taXVtLmNocm9tZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcmcuY2hyb21pdW0ud2Vidmlld19zaGVsbFwiXTtcblxuICAgIGlmICghXy5pbmNsdWRlcyhrbm93blBhY2thZ2VzLCB0aGlzLm9wdHMuYXBwUGFja2FnZSkpIHtcbiAgICAgIG9wdHMuY2hyb21lQW5kcm9pZEFjdGl2aXR5ID0gdGhpcy5vcHRzLmFwcEFjdGl2aXR5O1xuICAgIH1cbiAgICB0aGlzLmNocm9tZWRyaXZlciA9IGF3YWl0IHNldHVwTmV3Q2hyb21lZHJpdmVyKG9wdHMsIHRoaXMuYWRiLmN1ckRldmljZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGIpO1xuICAgIHRoaXMuY2hyb21lZHJpdmVyLm9uKENocm9tZWRyaXZlci5FVkVOVF9DSEFOR0VELCAobXNnKSA9PiB7XG4gICAgICBpZiAobXNnLnN0YXRlID09PSBDaHJvbWVkcml2ZXIuU1RBVEVfU1RPUFBFRCkge1xuICAgICAgICB0aGlzLm9uQ2hyb21lZHJpdmVyU3RvcChDSFJPTUlVTV9XSU4pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTm93IHRoYXQgd2UgaGF2ZSBhIENocm9tZSBzZXNzaW9uLCB3ZSBlbnN1cmUgdGhhdCB0aGUgY29udGV4dCBpc1xuICAgIC8vIGFwcHJvcHJpYXRlbHkgc2V0IGFuZCB0aGF0IHRoaXMgY2hyb21lZHJpdmVyIGlzIGFkZGVkIHRvIHRoZSBsaXN0XG4gICAgLy8gb2Ygc2Vzc2lvbiBjaHJvbWVkcml2ZXJzIHNvIHdlIGNhbiBzd2l0Y2ggYmFjayBhbmQgZm9ydGhcbiAgICB0aGlzLmN1ckNvbnRleHQgPSBDSFJPTUlVTV9XSU47XG4gICAgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tDSFJPTUlVTV9XSU5dID0gdGhpcy5jaHJvbWVkcml2ZXI7XG4gICAgdGhpcy5wcm94eVJlcVJlcyA9IHRoaXMuY2hyb21lZHJpdmVyLnByb3h5UmVxLmJpbmQodGhpcy5jaHJvbWVkcml2ZXIpO1xuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tBcHBQcmVzZW50ICgpIHtcbiAgICBsb2cuZGVidWcoXCJDaGVja2luZyB3aGV0aGVyIGFwcCBpcyBhY3R1YWxseSBwcmVzZW50XCIpO1xuICAgIGlmICghKGF3YWl0IGZzLmV4aXN0cyh0aGlzLm9wdHMuYXBwKSkpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBhcHAgYXBrIGF0ICR7dGhpcy5vcHRzLmFwcH1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja1BhY2thZ2VQcmVzZW50ICgpIHtcbiAgICBsb2cuZGVidWcoXCJDaGVja2luZyB3aGV0aGVyIHBhY2thZ2UgaXMgcHJlc2VudCBvbiB0aGUgZGV2aWNlXCIpO1xuICAgIGlmICghKGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsncG0nLCAnbGlzdCcsICdwYWNrYWdlcycsIHRoaXMub3B0cy5hcHBQYWNrYWdlXSkpKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgcGFja2FnZSAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ3JhbnRQZXJtaXNzaW9ucyAoKSB7XG4gICAgaWYgKHRoaXMub3B0cy5hdXRvR3JhbnRQZXJtaXNzaW9ucykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuZ3JhbnRBbGxQZXJtaXNzaW9ucyh0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmFwcCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoYFVuYWJsZSB0byBncmFudCBwZXJtaXNzaW9ucyByZXF1ZXN0ZWQuIE9yaWdpbmFsIGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIFNldCBDb21wcmVzc2VkTGF5b3V0SGllcmFyY2h5IG9uIHRoZSBkZXZpY2VcbiAgYXN5bmMgc2V0Q29tcHJlc3NlZExheW91dEhpZXJhcmNoeSAoY29tcHJlc3MpIHtcbiAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiY29tcHJlc3NlZExheW91dEhpZXJhcmNoeVwiLCB7Y29tcHJlc3NMYXlvdXQ6IGNvbXByZXNzfSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcbiAgICBsb2cuZGVidWcoXCJTaHV0dGluZyBkb3duIEFuZHJvaWQgZHJpdmVyXCIpO1xuICAgIGF3YWl0IHN1cGVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICBpZiAodGhpcy5ib290c3RyYXApIHtcbiAgICAgIC8vIGNlcnRhaW4gY2xlYW51cCB3ZSBvbmx5IGNhcmUgdG8gZG8gaWYgdGhlIGJvb3RzdHJhcCB3YXMgZXZlciBydW5cbiAgICAgIGF3YWl0IHRoaXMuc3RvcENocm9tZWRyaXZlclByb3hpZXMoKTtcbiAgICAgIGlmICh0aGlzLm9wdHMudW5pY29kZUtleWJvYXJkICYmIHRoaXMub3B0cy5yZXNldEtleWJvYXJkICYmIHRoaXMuZGVmYXVsdElNRSkge1xuICAgICAgICBsb2cuZGVidWcoYFJlc2V0dGluZyBJTUUgdG8gJHt0aGlzLmRlZmF1bHRJTUV9YCk7XG4gICAgICAgIGF3YWl0IHRoaXMuYWRiLnNldElNRSh0aGlzLmRlZmF1bHRJTUUpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0ICYmICF0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCAmJiAhdGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2h1dGRvd24oKTtcbiAgICAgIHRoaXMuYm9vdHN0cmFwID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmRlYnVnKFwiQ2FsbGVkIGRlbGV0ZVNlc3Npb24gYnV0IGJvb3RzdHJhcCB3YXNuJ3QgYWN0aXZlXCIpO1xuICAgIH1cbiAgICAvLyBzb21lIGNsZWFudXAgd2Ugd2FudCB0byBkbyByZWdhcmRsZXNzLCBpbiBjYXNlIHdlIGFyZSBzaHV0dGluZyBkb3duXG4gICAgLy8gbWlkLXN0YXJ0dXBcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wTG9nY2F0KCk7XG4gICAgaWYgKHRoaXMudXNlVW5sb2NrSGVscGVyQXBwKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AoJ2lvLmFwcGl1bS51bmxvY2snKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0cy5yZWJvb3QpIHtcbiAgICAgIGxldCBhdmROYW1lID0gdGhpcy5vcHRzLmF2ZC5yZXBsYWNlKCdAJywgJycpO1xuICAgICAgbG9nLmRlYnVnKGBjbG9zaW5nIGVtdWxhdG9yICcke2F2ZE5hbWV9J2ApO1xuICAgICAgYXdhaXQgdGhpcy5hZGIua2lsbEVtdWxhdG9yKGF2ZE5hbWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRzLmNsZWFyU3lzdGVtRmlsZXMpIHtcbiAgICAgIGlmICh0aGlzLm9wdHMuYXBwSXNUZW1wKSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhgVGVtcG9yYXJ5IGNvcHkgb2YgYXBwIHdhcyBtYWRlOiBkZWxldGluZyAnJHt0aGlzLm9wdHMuYXBwfSdgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBmcy5yaW1yYWYodGhpcy5vcHRzLmFwcCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZy53YXJuKGBVbmFibGUgdG8gZGVsZXRlIHRlbXBvcmFyeSBhcHA6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5kZWJ1ZygnQXBwIHdhcyBub3QgY29waWVkLCBzbyBub3QgZGVsZXRpbmcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmRlYnVnKCdOb3QgY2xlYW5pbmcgZ2VuZXJhdGVkIGZpbGVzLiBBZGQgYGNsZWFyU3lzdGVtRmlsZXNgIGNhcGFiaWxpdHkgaWYgd2FudGVkLicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldFNoYXJlZFByZWZlcmVuY2VzICgpIHtcbiAgICBsZXQgc2hhcmVkUHJlZnMgPSB0aGlzLm9wdHMuc2hhcmVkUHJlZmVyZW5jZXM7XG4gICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gc2V0IHNoYXJlZCBwcmVmZXJlbmNlc1wiKTtcbiAgICBsZXQgbmFtZSA9IHNoYXJlZFByZWZzLm5hbWU7XG4gICAgaWYgKF8uaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICAgIGxvZy53YXJuKGBTa2lwcGluZyBzZXR0aW5nIFNoYXJlZCBwcmVmZXJlbmNlcywgbmFtZSBpcyB1bmRlZmluZWQ6ICR7SlNPTi5zdHJpbmdpZnkoc2hhcmVkUHJlZnMpfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgcmVtb3RlUGF0aCA9IGAvZGF0YS9kYXRhLyR7dGhpcy5vcHRzLmFwcFBhY2thZ2V9L3NoYXJlZF9wcmVmc2A7XG4gICAgbGV0IHJlbW90ZUZpbGUgPSBgJHtyZW1vdGVQYXRofS8ke25hbWV9LnhtbGA7XG4gICAgbGV0IGxvY2FsUGF0aCA9IGAvdG1wLyR7bmFtZX0ueG1sYDtcbiAgICBsZXQgYnVpbGRlciA9IHRoaXMuZ2V0UHJlZnNCdWlsZGVyKCk7XG4gICAgYnVpbGRlci5idWlsZChzaGFyZWRQcmVmcy5wcmVmcyk7XG4gICAgbG9nLmluZm8oYENyZWF0aW5nIHRlbXBvcmFyeSBzaGFyZWQgcHJlZmVyZW5jZXM6ICR7bG9jYWxQYXRofWApO1xuICAgIGJ1aWxkZXIudG9GaWxlKGxvY2FsUGF0aCk7XG4gICAgbG9nLmluZm8oYENyZWF0aW5nIHNoYXJlZF9wcmVmcyByZW1vdGUgZm9sZGVyOiAke3JlbW90ZVBhdGh9YCk7XG4gICAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydta2RpcicsICctcCcsIHJlbW90ZVBhdGhdKTtcbiAgICBsb2cuaW5mbyhgUHVzaGluZyBzaGFyZWRfcHJlZnMgdG8gJHtyZW1vdGVGaWxlfWApO1xuICAgIGF3YWl0IHRoaXMuYWRiLnB1c2gobG9jYWxQYXRoLCByZW1vdGVGaWxlKTtcbiAgICB0cnkge1xuICAgICAgbG9nLmluZm8oYFRyeWluZyB0byByZW1vdmUgc2hhcmVkIHByZWZlcmVuY2VzIHRlbXBvcmFyeSBmaWxlYCk7XG4gICAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsUGF0aCkpIHtcbiAgICAgICAgYXdhaXQgZnMudW5saW5rKGxvY2FsUGF0aCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLndhcm4oYEVycm9yIHRyeWluZyB0byByZW1vdmUgdGVtcG9yYXJ5IGZpbGUgJHtsb2NhbFBhdGh9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UHJlZnNCdWlsZGVyICgpIHtcbiAgICAvKiBBZGQgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFNoYXJlZFByZWZzQnVpbGRlciBpbnN0ZWFkIG9mXG4gICAgICogZGlyZWN0bHkgY3JlYXRpbmcgdGhlIG9iamVjdCBvbiBzZXRTaGFyZWRQcmVmZXJlbmNlcyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgICovXG4gICAgcmV0dXJuIG5ldyBTaGFyZWRQcmVmc0J1aWxkZXIoKTtcbiAgfVxuXG4gIHZhbGlkYXRlRGVzaXJlZENhcHMgKGNhcHMpIHtcbiAgICAvLyBjaGVjayB3aXRoIHRoZSBiYXNlIGNsYXNzLCBhbmQgcmV0dXJuIGlmIGl0IGZhaWxzXG4gICAgbGV0IHJlcyA9IHN1cGVyLnZhbGlkYXRlRGVzaXJlZENhcHMoY2Fwcyk7XG4gICAgaWYgKCFyZXMpIHJldHVybiByZXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBjYXBhYmlsaXRpZXMgaGF2ZSBvbmUgb2YgYGFwcGAsIGBhcHBQYWNrYWdlYCBvciBgYnJvd3NlcmBcbiAgICBpZiAoKCFjYXBzLmJyb3dzZXJOYW1lIHx8ICFoZWxwZXJzLmlzQ2hyb21lQnJvd3NlcihjYXBzLmJyb3dzZXJOYW1lKSkgJiZcbiAgICAgICFjYXBzLmFwcCAmJiAhY2Fwcy5hcHBQYWNrYWdlKSB7XG4gICAgICBsZXQgbXNnID0gJ1RoZSBkZXNpcmVkIGNhcGFiaWxpdGllcyBtdXN0IGluY2x1ZGUgZWl0aGVyIGFuIGFwcCwgYXBwUGFja2FnZSBvciBicm93c2VyTmFtZSc7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhtc2cpO1xuICAgIH1cbiAgICAvLyB3YXJuIGlmIHRoZSBjYXBhYmlsaXRpZXMgaGF2ZSBib3RoIGBhcHBgIGFuZCBgYnJvd3NlciwgYWx0aG91Z2ggdGhpc1xuICAgIC8vIGlzIGNvbW1vbiB3aXRoIHNlbGVuaXVtIGdyaWRcbiAgICBpZiAoY2Fwcy5icm93c2VyTmFtZSAmJiBjYXBzLmFwcCkge1xuICAgICAgbGV0IG1zZyA9ICdUaGUgZGVzaXJlZCBjYXBhYmlsaXRpZXMgc2hvdWxkIGdlbmVyYWxseSBub3QgaW5jbHVkZSBib3RoIGFuIGFwcCBhbmQgYSBicm93c2VyTmFtZSc7XG4gICAgICBsb2cud2Fybihtc2cpO1xuICAgIH1cbiAgfVxuXG4gIHByb3h5QWN0aXZlIChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5wcm94eUFjdGl2ZShzZXNzaW9uSWQpO1xuXG4gICAgcmV0dXJuIHRoaXMuandwUHJveHlBY3RpdmU7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIuZ2V0UHJveHlBdm9pZExpc3Qoc2Vzc2lvbklkKTtcblxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QXZvaWQ7XG4gIH1cblxuICBjYW5Qcm94eSAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIuY2FuUHJveHkoc2Vzc2lvbklkKTtcblxuICAgIC8vIHRoaXMgd2lsbCBjaGFuZ2UgZGVwZW5kaW5nIG9uIENocm9tZURyaXZlciBzdGF0dXNcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHRoaXMucHJveHlSZXFSZXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuZHJvaWREcml2ZXI7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=

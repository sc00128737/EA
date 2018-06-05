'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _uiautomator2 = require('./uiautomator2');

var _uiautomator22 = _interopRequireDefault(_uiautomator2);

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _commandsIndex = require('./commands/index');

var _commandsIndex2 = _interopRequireDefault(_commandsIndex);

var _appiumAdb = require('appium-adb');

var _helpers = require('./helpers');

var uiautomator2Helpers = _interopRequireWildcard(_helpers);

var _appiumAndroidDriver = require('appium-android-driver');

var _desiredCaps = require('./desired-caps');

var _desiredCaps2 = _interopRequireDefault(_desiredCaps);

var _portscanner = require('portscanner');

var helpers = _Object$assign({}, uiautomator2Helpers, _appiumAndroidDriver.androidHelpers);

// The range of ports we can use on the system for communicating to the
// UiAutomator2 HTTP server on the device
var SYSTEM_PORT_RANGE = [8200, 8299];

// This is the port that UiAutomator2 listens to on the device. We will forward
// one of the ports above on the system to this port on the device.
var DEVICE_PORT = 6790;

// NO_PROXY contains the paths that we never want to proxy to UiAutomator2 server.
// TODO:  Add the list of paths that we never want to proxy to UiAutomator2 server.
// TODO: Need to segregate the paths better way using regular expressions wherever applicable.
// (Not segregating right away because more paths to be added in the NO_PROXY list)
var NO_PROXY = [['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/element')], ['POST', new RegExp('^/session/[^/]+/appium/element/[^/]+/value')], ['POST', new RegExp('^/session/[^/]+/appium/element/[^/]+/replace_value')], ['GET', new RegExp('^/session/[^/]+/appium/[^/]+/current_activity')], ['GET', new RegExp('^/session/[^/]+/appium/[^/]+/current_package')], ['POST', new RegExp('^/session/[^/]+/appium/[^/]+/start_activity')], ['POST', new RegExp('^/session/[^/]+/ime/activate')], ['POST', new RegExp('^/session/[^/]+/ime/deactivate')], ['GET', new RegExp('^/session/[^/]+/ime/active_engine')], ['GET', new RegExp('^/session/[^/]+/ime/available_engines')], ['GET', new RegExp('^/session/[^/]+/url')], ['POST', new RegExp('^/session/[^/]+/url')], ['POST', new RegExp('^/session/[^/]+/app/[^/]')], ['POST', new RegExp('^/session/[^/]+/location')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/location_in_view')], ['GET', new RegExp('^/session/[^/]+/appium/device/system_time')], ['POST', new RegExp('^/session/[^/]+/appium/settings')], ['GET', new RegExp('^/session/[^/]+/appium/settings')], ['POST', new RegExp('^/session/[^/]+/appium/device/app_installed')], ['POST', new RegExp('^/session/[^/]+/appium/device/lock')], ['POST', new RegExp('^/session/[^/]+/appium/app/close')], ['POST', new RegExp('^/session/[^/]+/appium/app/launch')], ['POST', new RegExp('^/session/[^/]+/appium/device/pull_file')], ['POST', new RegExp('^/session/[^/]+/appium/device/pull_folder')], ['POST', new RegExp('^/session/[^/]+/appium/device/push_file')], ['POST', new RegExp('^/session/[^/]+/appium/app/reset')], ['POST', new RegExp('^/session/[^/]+/appium/app/background')], ['POST', new RegExp('^/session/[^/]+/appium/device/toggle_location_services')], ['POST', new RegExp('^/session/[^/]+/appium/device/is_locked')], ['POST', new RegExp('^/session/[^/]+/appium/device/unlock')], ['POST', new RegExp('^/session/[^/]+/appium/device/press_keycode')], ['POST', new RegExp('^/session/[^/]+/appium/device/long_press_keycode')], ['POST', new RegExp('^/session/[^/]+/appium/app/end_test_coverage')], ['GET', new RegExp('^/session/[^/]+/contexts')], ['POST', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/network_connection')], ['GET', new RegExp('^/session/[^/]+/network_connection')], ['POST', new RegExp('^/session/[^/]+/timeouts')], ['GET', new RegExp('^/session/[^/]+/screenshot')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/attribute')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/enabled')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/selected')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/displayed')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/name')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/screenshot')], ['GET', new RegExp('^/session/(?!.*\/)')], ['POST', new RegExp('^/session/[^/]+/keys')], ['POST', new RegExp('^/session/[^/]+/appium/device/hide_keyboard')], ['POST', new RegExp('^/session/[^/]+/log')], ['GET', new RegExp('^/session/[^/]+/log/types')], ['POST', new RegExp('^/session/[^/]+/appium/device/remove_app')], ['POST', new RegExp('^/session/[^/]+/appium/device/install_app')], ['GET', new RegExp('^/session/[^/]+/appium/device/current_package')], ['GET', new RegExp('^/session/[^/]+/appium/device/display_density')], ['GET', new RegExp('^/session/[^/]+/appium/device/system_bars')], ['GET', new RegExp('^/session/[^/]+/appium/device/is_keyboard_shown')], ['POST', new RegExp('^/session/[^/]+/appium/app/strings')], ['POST', new RegExp('^/session/[^/]+/appium/getPerformanceData')], ['POST', new RegExp('^/session/[^/]+/appium/performanceData/types')], ['POST', new RegExp('^/session/[^/]+/appium/start_recording_screen')], ['POST', new RegExp('^/session/[^/]+/appium/stop_recording_screen')], ['GET', new RegExp('^/session/[^/]+/ime/available_engines')], ['GET', new RegExp('^/session/[^/]+/ime/active_engine')], ['GET', new RegExp('^/session/[^/]+/ime/activated')], ['POST', new RegExp('^/session/[^/]+/ime/deactivate')], ['POST', new RegExp('^/session/[^/]+/ime/activate')],
// MJSONWP commands
['POST', new RegExp('^/session/[^/]+/execute')], ['POST', new RegExp('^/session/[^/]+/execute_async')],
// W3C commands
['POST', new RegExp('^/session/[^/]+/execute/sync')], ['POST', new RegExp('^/session/[^/]+/execute/async')], ['GET', new RegExp('^/session/[^/]+/window/rect')]];

// This is a set of methods and paths that we never want to proxy to Chromedriver.
var CHROME_NO_PROXY = [['POST', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/appium')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/orientation')], ['GET', new RegExp('^/session/[^/]+/orientation')]];
var APP_EXTENSION = '.apk';

var AndroidUiautomator2Driver = (function (_BaseDriver) {
  _inherits(AndroidUiautomator2Driver, _BaseDriver);

  function AndroidUiautomator2Driver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AndroidUiautomator2Driver);

    // `shell` overwrites adb.shell, so remove
    delete opts.shell;

    _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'constructor', this).call(this, opts, shouldValidateCaps);
    this.locatorStrategies = ['xpath', 'id', 'class name', 'accessibility id', '-android uiautomator'];
    this.desiredCapConstraints = _desiredCaps2['default'];
    this.uiautomator2 = null;
    this.jwpProxyActive = false;
    this.defaultIME = null;
    this.jwpProxyAvoid = NO_PROXY;
    this.apkStrings = {}; // map of language -> strings obj

    this.settings = new _appiumBaseDriver.DeviceSettings({ ignoreUnimportantViews: false, allowInvisibleElements: false }, this.onSettingsUpdate.bind(this));
    // handle webview mechanics from AndroidDriver
    this.chromedriver = null;
    this.sessionChromedrivers = {};

    // memoize per-instance commands
    this.getStatusBarHeight = _lodash2['default'].memoize(this.getStatusBarHeight);
  }

  // first add the android-driver commands which we will fall back to

  _createClass(AndroidUiautomator2Driver, [{
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
          args$2$0 = arguments;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;

            for (_len = args$2$0.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = args$2$0[_key];
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'createSession', this).apply(this, args));

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

            this.curContext = this.defaultContextName();

            defaultOpts = {
              fullReset: false,
              autoLaunch: true,
              adbPort: _appiumAdb.DEFAULT_ADB_PORT,
              androidInstallTimeout: 90000
            };

            _lodash2['default'].defaults(this.opts, defaultOpts);

            if (this.isChromeSession) {
              _logger2['default'].info("We're going to run a Chrome-based session");
              _helpers$getChromePkg = helpers.getChromePkg(this.opts.browserName);
              pkg = _helpers$getChromePkg.pkg;
              activity = _helpers$getChromePkg.activity;

              this.opts.appPackage = this.caps.appPackage = pkg;
              this.opts.appActivity = this.caps.appActivity = activity;
              _logger2['default'].info('Chrome-type package and activity are ' + pkg + ' and ' + activity);
            }

            if (this.opts.reboot) {
              this.setAvdFromCapabilities(caps);
            }

            if (!this.opts.app) {
              context$2$0.next = 23;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.helpers.configureApp(this.opts.app, APP_EXTENSION));

          case 18:
            this.opts.app = context$2$0.sent;
            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.checkAppPresent());

          case 21:
            context$2$0.next = 27;
            break;

          case 23:
            if (!this.appOnDevice) {
              context$2$0.next = 27;
              break;
            }

            // the app isn't an actual app file but rather something we want to
            // assume is on the device and just launch via the appPackage
            _logger2['default'].info('App file was not listed, instead we\'re going to run ' + (this.opts.appPackage + ' directly on the device'));
            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.checkPackagePresent());

          case 27:
            context$2$0.t0 = this.opts.systemPort;

            if (context$2$0.t0) {
              context$2$0.next = 32;
              break;
            }

            context$2$0.next = 31;
            return _regeneratorRuntime.awrap((0, _portscanner.findAPortNotInUse)(SYSTEM_PORT_RANGE[0], SYSTEM_PORT_RANGE[1]));

          case 31:
            context$2$0.t0 = context$2$0.sent;

          case 32:
            this.opts.systemPort = context$2$0.t0;

            this.opts.adbPort = this.opts.adbPort || _appiumAdb.DEFAULT_ADB_PORT;

            context$2$0.next = 36;
            return _regeneratorRuntime.awrap(this.startUiAutomator2Session());

          case 36:
            context$2$0.next = 38;
            return _regeneratorRuntime.awrap(this.fillDeviceDetails());

          case 38:
            return context$2$0.abrupt('return', [sessionId, caps]);

          case 41:
            context$2$0.prev = 41;
            context$2$0.t1 = context$2$0['catch'](0);
            context$2$0.next = 45;
            return _regeneratorRuntime.awrap(this.deleteSession());

          case 45:
            throw context$2$0.t1;

          case 46:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 41]]);
    }
  }, {
    key: 'fillDeviceDetails',
    value: function fillDeviceDetails() {
      return _regeneratorRuntime.async(function fillDeviceDetails$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.getDevicePixelRatio());

          case 2:
            this.caps.pixelRatio = context$2$0.sent;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.getStatusBarHeight());

          case 5:
            this.caps.statBarHeight = context$2$0.sent;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.getViewPortRect());

          case 8:
            this.caps.viewportRect = context$2$0.sent;

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'isEmulator',
    value: function isEmulator() {
      return !!this.opts.avd;
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
    key: 'startUiAutomator2Session',
    value: function startUiAutomator2Session() {
      var _ref3,

      // get device udid for this session
      udid, emPort, appInfo;

      return _regeneratorRuntime.async(function startUiAutomator2Session$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (this.opts.javaVersion) {
              context$2$0.next = 4;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(helpers.getJavaVersion());

          case 3:
            this.opts.javaVersion = context$2$0.sent;

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(helpers.getDeviceInfoFromCaps(this.opts));

          case 6:
            _ref3 = context$2$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            this.opts.udid = udid;
            this.opts.emPort = emPort;

            // now that we know our java version and device info, we can create our
            // ADB instance
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.createADB(this.opts.javaVersion, this.opts.udid, this.opts.emPort, this.opts.adbPort, this.opts.suppressKillServer, this.opts.remoteAdbHost, this.opts.clearDeviceLogsOnStart));

          case 13:
            this.adb = context$2$0.sent;
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(this.adb.getApiLevel());

          case 16:
            context$2$0.t0 = context$2$0.sent;

            if (!(context$2$0.t0 < 21)) {
              context$2$0.next = 19;
              break;
            }

            _logger2['default'].errorAndThrow('UIAutomation2 is only supported since Android 5.0 (Lollipop). ' + 'You could still use other supported backends in order to automate older Android versions.');

          case 19:
            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(helpers.getLaunchInfo(this.adb, this.opts));

          case 21:
            appInfo = context$2$0.sent;

            // and get it onto our 'opts' object so we use it from now on
            _Object$assign(this.opts, appInfo);

            // set actual device name, udid, platform version, screen size, screen density, model and manufacturer details
            this.caps.deviceName = this.adb.curDeviceId;
            this.caps.deviceUDID = this.opts.udid;
            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.adb.getPlatformVersion());

          case 27:
            this.caps.platformVersion = context$2$0.sent;
            context$2$0.next = 30;
            return _regeneratorRuntime.awrap(this.adb.getScreenSize());

          case 30:
            this.caps.deviceScreenSize = context$2$0.sent;
            context$2$0.next = 33;
            return _regeneratorRuntime.awrap(this.adb.getScreenDensity());

          case 33:
            this.caps.deviceScreenDensity = context$2$0.sent;
            context$2$0.next = 36;
            return _regeneratorRuntime.awrap(this.adb.getModel());

          case 36:
            this.caps.deviceModel = context$2$0.sent;
            context$2$0.next = 39;
            return _regeneratorRuntime.awrap(this.adb.getManufacturer());

          case 39:
            this.caps.deviceManufacturer = context$2$0.sent;
            context$2$0.next = 42;
            return _regeneratorRuntime.awrap(this.initUiAutomator2Server());

          case 42:
            context$2$0.next = 44;
            return _regeneratorRuntime.awrap(helpers.initDevice(this.adb, this.opts));

          case 44:
            this.defaultIME = context$2$0.sent;

            // Further prepare the device by forwarding the UiAutomator2 port
            _logger2['default'].debug('Forwarding UiAutomator2 Server port ' + DEVICE_PORT + ' to ' + this.opts.systemPort);
            context$2$0.next = 48;
            return _regeneratorRuntime.awrap(this.adb.forwardPort(this.opts.systemPort, DEVICE_PORT));

          case 48:
            if (this.opts.skipUnlock) {
              context$2$0.next = 53;
              break;
            }

            context$2$0.next = 51;
            return _regeneratorRuntime.awrap(helpers.unlock(this, this.adb, this.caps));

          case 51:
            context$2$0.next = 54;
            break;

          case 53:
            _logger2['default'].debug('\'skipUnlock\' capability set, so skipping device unlock');

          case 54:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 57;
              break;
            }

            context$2$0.next = 57;
            return _regeneratorRuntime.awrap(this.initAUT());

          case 57:
            // Adding AUT package name in the capabilities if package name not exist in caps
            if (!this.caps.appPackage && appInfo) {
              this.caps.appPackage = appInfo.appPackage;
            }

            // launch UiAutomator2 and wait till its online and we have a session
            context$2$0.next = 60;
            return _regeneratorRuntime.awrap(this.uiautomator2.startSession(this.caps));

          case 60:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 63;
              break;
            }

            context$2$0.next = 63;
            return _regeneratorRuntime.awrap(this.ensureAppStarts());

          case 63:
            if (!_appiumSupport.util.hasValue(this.opts.orientation)) {
              context$2$0.next = 67;
              break;
            }

            _logger2['default'].debug('Setting initial orientation to \'' + this.opts.orientation + '\'');
            context$2$0.next = 67;
            return _regeneratorRuntime.awrap(this.setOrientation(this.opts.orientation));

          case 67:
            if (!this.opts.autoWebview) {
              context$2$0.next = 70;
              break;
            }

            context$2$0.next = 70;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(20, this.opts.autoWebviewTimeout || 2000, function callee$2$0() {
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    context$3$0.next = 2;
                    return _regeneratorRuntime.awrap(this.setContext(this.defaultWebviewName()));

                  case 2:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            }));

          case 70:
            if (!this.isChromeSession) {
              context$2$0.next = 73;
              break;
            }

            context$2$0.next = 73;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.AndroidDriver.prototype.startChromeSession.call(this));

          case 73:

            // now that everything has started successfully, turn on proxying so all
            // subsequent session requests go straight to/from uiautomator2
            this.jwpProxyActive = true;

          case 74:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initUiAutomator2Server',
    value: function initUiAutomator2Server() {
      return _regeneratorRuntime.async(function initUiAutomator2Server$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // now that we have package and activity, we can create an instance of
            // uiautomator2 with the appropriate data
            this.uiautomator2 = new _uiautomator22['default']({
              host: this.opts.remoteAdbHost || this.opts.host || 'localhost',
              systemPort: this.opts.systemPort,
              devicePort: DEVICE_PORT,
              adb: this.adb,
              apk: this.opts.app,
              tmpDir: this.opts.tmpDir,
              appPackage: this.opts.appPackage,
              appActivity: this.opts.appActivity,
              disableWindowAnimation: !!this.opts.disableWindowAnimation
            });
            this.proxyReqRes = this.uiautomator2.proxyReqRes.bind(this.uiautomator2);

            // killing any uiautomator existing processes
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.uiautomator2.killUiAutomatorOnDevice());

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.uiautomator2.installServerApk(this.opts.uiautomator2ServerInstallTimeout));

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAUT',
    value: function initAUT() {
      var signed;
      return _regeneratorRuntime.async(function initAUT$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.pushStrings(this.opts.language, this.adb, this.opts));

          case 2:
            this.apkStrings[this.opts.language] = context$2$0.sent;

            if (this.opts.app) {
              context$2$0.next = 9;
              break;
            }

            if (this.opts.fullReset) {
              _logger2['default'].errorAndThrow('Full reset requires an app capability, use fastReset if app is not provided');
            }
            _logger2['default'].debug('No app capability. Assuming it is already on the device');

            if (!this.opts.fastReset) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(helpers.resetApp(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

          case 9:
            if (this.opts.skipUninstall) {
              context$2$0.next = 12;
              break;
            }

            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 12:
            if (this.opts.noSign) {
              context$2$0.next = 19;
              break;
            }

            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.checkApkCert(this.opts.app, this.opts.appPackage));

          case 15:
            signed = context$2$0.sent;

            if (!(!signed && this.opts.app)) {
              context$2$0.next = 19;
              break;
            }

            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(this.adb.sign(this.opts.app, this.opts.appPackage));

          case 19:
            if (!this.opts.app) {
              context$2$0.next = 22;
              break;
            }

            context$2$0.next = 22;
            return _regeneratorRuntime.awrap(helpers.installApkRemotely(this.adb, this.opts));

          case 22:
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(this.grantPermissions());

          case 24:
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
  }, {
    key: 'ensureAppStarts',
    value: function ensureAppStarts() {
      var appWaitPackage, appWaitActivity;
      return _regeneratorRuntime.async(function ensureAppStarts$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            appWaitPackage = this.opts.appWaitPackage || this.opts.appPackage;
            appWaitActivity = this.opts.appWaitActivity || this.opts.appActivity;

            _logger2['default'].info('UiAutomator2 did not start the activity we were waiting for, ' + ('\'' + appWaitPackage + '/' + appWaitActivity + '\'. ') + 'Starting it ourselves');

            if (!this.caps.androidCoverage) {
              context$2$0.next = 9;
              break;
            }

            _logger2['default'].info('androidCoverage is configured. ' + (' Starting instrumentation of \'' + this.caps.androidCoverage + '\'...'));
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.adb.androidCoverage(this.caps.androidCoverage, appWaitPackage, appWaitActivity));

          case 7:
            context$2$0.next = 11;
            break;

          case 9:
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(this.adb.startApp({
              pkg: this.opts.appPackage,
              activity: this.opts.appActivity,
              action: this.opts.intentAction,
              category: this.opts.intentCategory,
              flags: this.opts.intentFlags,
              waitPkg: this.opts.appWaitPackage,
              waitActivity: this.opts.appWaitActivity,
              optionalIntentArguments: this.opts.optionalIntentArguments,
              stopApp: !this.opts.dontStopAppOnReset,
              retry: false
            }));

          case 11:
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
            _logger2['default'].debug('Deleting UiAutomator2 session');

            if (!this.uiautomator2) {
              context$2$0.next = 20;
              break;
            }

            context$2$0.prev = 2;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.stopChromedriverProxies());

          case 5:
            context$2$0.next = 10;
            break;

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](2);

            _logger2['default'].warn('Unable to stop ChromeDriver proxies: ' + context$2$0.t0.message);

          case 10:
            if (!this.jwpProxyActive) {
              context$2$0.next = 19;
              break;
            }

            context$2$0.prev = 11;
            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(this.uiautomator2.deleteSession());

          case 14:
            context$2$0.next = 19;
            break;

          case 16:
            context$2$0.prev = 16;
            context$2$0.t1 = context$2$0['catch'](11);

            _logger2['default'].warn('Unable to proxy deleteSession to UiAutomator2: ' + context$2$0.t1.message);

          case 19:
            this.uiautomator2 = null;

          case 20:
            this.jwpProxyActive = false;

            if (!this.adb) {
              context$2$0.next = 75;
              break;
            }

            if (!(this.opts.unicodeKeyboard && this.opts.resetKeyboard && this.defaultIME)) {
              context$2$0.next = 32;
              break;
            }

            _logger2['default'].debug('Resetting IME to \'' + this.defaultIME + '\'');
            context$2$0.prev = 24;
            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.adb.setIME(this.defaultIME));

          case 27:
            context$2$0.next = 32;
            break;

          case 29:
            context$2$0.prev = 29;
            context$2$0.t2 = context$2$0['catch'](24);

            _logger2['default'].warn('Unable to reset IME: ' + context$2$0.t2.message);

          case 32:
            if (!this.caps.androidCoverage) {
              context$2$0.next = 43;
              break;
            }

            _logger2['default'].info('Shutting down the adb process of instrumentation...');
            context$2$0.next = 36;
            return _regeneratorRuntime.awrap(this.adb.endAndroidCoverage());

          case 36:
            if (!this.caps.androidCoverageEndIntent) {
              context$2$0.next = 42;
              break;
            }

            _logger2['default'].info('Sending intent broadcast \'' + this.caps.androidCoverageEndIntent + '\' at the end of instrumenting.');
            context$2$0.next = 40;
            return _regeneratorRuntime.awrap(this.adb.broadcast(this.caps.androidCoverageEndIntent));

          case 40:
            context$2$0.next = 43;
            break;

          case 42:
            _logger2['default'].warn('No androidCoverageEndIntent is configured in caps. Possibly you cannot get coverage file.');

          case 43:
            if (!this.opts.appPackage) {
              context$2$0.next = 52;
              break;
            }

            context$2$0.prev = 44;
            context$2$0.next = 47;
            return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

          case 47:
            context$2$0.next = 52;
            break;

          case 49:
            context$2$0.prev = 49;
            context$2$0.t3 = context$2$0['catch'](44);

            _logger2['default'].warn('Unable to force stop app: ' + context$2$0.t3.message);

          case 52:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 62;
              break;
            }

            _logger2['default'].debug('Capability \'fullReset\' set to \'true\', Uninstalling \'' + this.opts.appPackage + '\'');
            context$2$0.prev = 54;
            context$2$0.next = 57;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 57:
            context$2$0.next = 62;
            break;

          case 59:
            context$2$0.prev = 59;
            context$2$0.t4 = context$2$0['catch'](54);

            _logger2['default'].warn('Unable to uninstall app: ' + context$2$0.t4.message);

          case 62:
            context$2$0.next = 64;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 64:
            if (!this.opts.reboot) {
              context$2$0.next = 75;
              break;
            }

            avdName = this.opts.avd.replace('@', '');

            _logger2['default'].debug('Closing emulator \'' + avdName + '\'');
            context$2$0.prev = 67;
            context$2$0.next = 70;
            return _regeneratorRuntime.awrap(this.adb.killEmulator(avdName));

          case 70:
            context$2$0.next = 75;
            break;

          case 72:
            context$2$0.prev = 72;
            context$2$0.t5 = context$2$0['catch'](67);

            _logger2['default'].warn('Unable to close emulator: ' + context$2$0.t5.message);

          case 75:
            context$2$0.next = 77;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'deleteSession', this).call(this));

          case 77:
            if (!(this.opts.systemPort !== undefined && this.adb)) {
              context$2$0.next = 86;
              break;
            }

            context$2$0.prev = 78;
            context$2$0.next = 81;
            return _regeneratorRuntime.awrap(this.adb.removePortForward(this.opts.systemPort));

          case 81:
            context$2$0.next = 86;
            break;

          case 83:
            context$2$0.prev = 83;
            context$2$0.t6 = context$2$0['catch'](78);

            _logger2['default'].warn('Unable to remove port forward \'' + context$2$0.t6.message + '\'');
            //Ignore, this block will also be called when we fall in catch block
            // and before even port forward.

          case 86:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[2, 7], [11, 16], [24, 29], [44, 49], [54, 59], [67, 72], [78, 83]]);
    }
  }, {
    key: 'checkAppPresent',
    value: function checkAppPresent() {
      return _regeneratorRuntime.async(function checkAppPresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Checking whether app is actually present');
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.opts.app));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find app apk at \'' + this.opts.app + '\'');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'defaultWebviewName',
    value: function defaultWebviewName() {
      return _appiumAndroidDriver.WEBVIEW_BASE + '0';
    }
  }, {
    key: 'onSettingsUpdate',
    value: function onSettingsUpdate(key, value) {
      var settings;
      return _regeneratorRuntime.async(function onSettingsUpdate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            settings = _defineProperty({}, key, value);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/settings', 'POST', { settings: settings }));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    // Need to override android-driver's version of this since we don't actually
    // have a bootstrap; instead we just restart adb and re-forward the UiAutomator2
    // port
  }, {
    key: 'wrapBootstrapDisconnect',
    value: function wrapBootstrapDisconnect(wrapped) {
      return _regeneratorRuntime.async(function wrapBootstrapDisconnect$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(wrapped());

          case 2:
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.adb.restart());

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.adb.forwardPort(this.opts.systemPort, DEVICE_PORT));

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'proxyActive', this).call(this, sessionId);

      // we always have an active proxy to the UiAutomator2 server
      return true;
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'canProxy', this).call(this, sessionId);

      // we can always proxy to the uiautomator2 server
      return true;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'getProxyAvoidList', this).call(this, sessionId);
      // we are maintaining two sets of NO_PROXY lists, one for chromedriver(CHROME_NO_PROXY)
      // and one for uiautomator2(NO_PROXY), based on current context will return related NO_PROXY list
      if (_appiumSupport.util.hasValue(this.chromedriver)) {
        //if the current context is webview(chromedriver), then return CHROME_NO_PROXY list
        this.jwpProxyAvoid = CHROME_NO_PROXY;
      } else {
        this.jwpProxyAvoid = NO_PROXY;
      }
      if (this.opts.nativeWebScreenshot) {
        this.jwpProxyAvoid = [].concat(_toConsumableArray(this.jwpProxyAvoid), [['GET', new RegExp('^/session/[^/]+/screenshot')]]);
      }

      return this.jwpProxyAvoid;
    }
  }, {
    key: 'driverData',
    get: function get() {
      // TODO fill out resource info here
      return {};
    }
  }, {
    key: 'isChromeSession',
    get: function get() {
      return helpers.isChromeBrowser(this.opts.browserName);
    }
  }]);

  return AndroidUiautomator2Driver;
})(_appiumBaseDriver.BaseDriver);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _getIterator(_lodash2['default'].toPairs(_appiumAndroidDriver.androidCommands)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2);

    var cmd = _step$value[0];
    var fn = _step$value[1];

    // we do some different/special things with these methods
    if (!_lodash2['default'].includes(['defaultWebviewName'], cmd)) {
      AndroidUiautomator2Driver.prototype[cmd] = fn;
    }
  }

  // then overwrite with any uiautomator2-specific commands
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

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(_commandsIndex2['default'])), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 2);

    var cmd = _step2$value[0];
    var fn = _step2$value[1];

    AndroidUiautomator2Driver.prototype[cmd] = fn;
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
      _iterator2['return']();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

exports['default'] = AndroidUiautomator2Driver;
module.exports = exports['default'];

// TODO handle otherSessionData for multiple sessions

// find and copy, or download and unzip an app url or path

// get appPackage et al from manifest if necessary

// set up the modified UiAutomator2 server etc

// start an avd, set the language/locale, pick an emulator, etc...
// TODO with multiple devices we'll need to parameterize this

// unlock the device to prepare it for testing

// If the user sets autoLaunch to false, they are responsible for initAUT() and startAUT()

// set up app under test
// prepare our actual AUT, get it on the device, etc...

// rescue UiAutomator2 if it fails to start our AUT

// if the initial orientation is requested, set it

// if we want to immediately get into a webview, set our context
// appropriately

// set the localized strings for the current language from the apk
// TODO: incorporate changes from appium#5308 which fix a race cond-
// ition bug in old appium and need to be replicated here

// make sure we have an activity and package to wait for

// Use this broadcast intent to notify it's time to dump coverage to file
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFHLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDL0M7R0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxxQ0FBc0Isb0JBQUUsT0FBTyw0QkFBVSxpSEFBRTs7O1FBQWpDLEdBQUc7UUFBRSxFQUFFOztBQUNmLDZCQUF5QixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7R0FDL0M7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRWMseUJBQXlCIiwiZmlsZSI6ImxpYi9kcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQmFzZURyaXZlciwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IFVpQXV0b21hdG9yMlNlcnZlciBmcm9tICcuL3VpYXV0b21hdG9yMic7XG5pbXBvcnQgeyBmcywgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBjb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzL2luZGV4JztcbmltcG9ydCB7IERFRkFVTFRfQURCX1BPUlQgfSBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCAqIGFzIHVpYXV0b21hdG9yMkhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IGFuZHJvaWRIZWxwZXJzLCBhbmRyb2lkQ29tbWFuZHMsIFdFQlZJRVdfQkFTRSwgQW5kcm9pZERyaXZlciB9IGZyb20gJ2FwcGl1bS1hbmRyb2lkLWRyaXZlcic7XG5pbXBvcnQgZGVzaXJlZENhcENvbnN0cmFpbnRzIGZyb20gJy4vZGVzaXJlZC1jYXBzJztcbmltcG9ydCB7IGZpbmRBUG9ydE5vdEluVXNlIH0gZnJvbSAncG9ydHNjYW5uZXInO1xuXG5sZXQgaGVscGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHVpYXV0b21hdG9yMkhlbHBlcnMsIGFuZHJvaWRIZWxwZXJzKTtcblxuLy8gVGhlIHJhbmdlIG9mIHBvcnRzIHdlIGNhbiB1c2Ugb24gdGhlIHN5c3RlbSBmb3IgY29tbXVuaWNhdGluZyB0byB0aGVcbi8vIFVpQXV0b21hdG9yMiBIVFRQIHNlcnZlciBvbiB0aGUgZGV2aWNlXG5jb25zdCBTWVNURU1fUE9SVF9SQU5HRSA9IFs4MjAwLCA4Mjk5XTtcblxuLy8gVGhpcyBpcyB0aGUgcG9ydCB0aGF0IFVpQXV0b21hdG9yMiBsaXN0ZW5zIHRvIG9uIHRoZSBkZXZpY2UuIFdlIHdpbGwgZm9yd2FyZFxuLy8gb25lIG9mIHRoZSBwb3J0cyBhYm92ZSBvbiB0aGUgc3lzdGVtIHRvIHRoaXMgcG9ydCBvbiB0aGUgZGV2aWNlLlxuY29uc3QgREVWSUNFX1BPUlQgPSA2NzkwO1xuXG4vLyBOT19QUk9YWSBjb250YWlucyB0aGUgcGF0aHMgdGhhdCB3ZSBuZXZlciB3YW50IHRvIHByb3h5IHRvIFVpQXV0b21hdG9yMiBzZXJ2ZXIuXG4vLyBUT0RPOiAgQWRkIHRoZSBsaXN0IG9mIHBhdGhzIHRoYXQgd2UgbmV2ZXIgd2FudCB0byBwcm94eSB0byBVaUF1dG9tYXRvcjIgc2VydmVyLlxuLy8gVE9ETzogTmVlZCB0byBzZWdyZWdhdGUgdGhlIHBhdGhzIGJldHRlciB3YXkgdXNpbmcgcmVndWxhciBleHByZXNzaW9ucyB3aGVyZXZlciBhcHBsaWNhYmxlLlxuLy8gKE5vdCBzZWdyZWdhdGluZyByaWdodCBhd2F5IGJlY2F1c2UgbW9yZSBwYXRocyB0byBiZSBhZGRlZCBpbiB0aGUgTk9fUFJPWFkgbGlzdClcbmNvbnN0IE5PX1BST1hZID0gW1xuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdG91Y2gvbXVsdGkvcGVyZm9ybScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL3BlcmZvcm0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9lbGVtZW50JyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2VsZW1lbnQvW14vXSsvdmFsdWUnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZWxlbWVudC9bXi9dKy9yZXBsYWNlX3ZhbHVlJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vW14vXSsvY3VycmVudF9hY3Rpdml0eScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL1teL10rL2N1cnJlbnRfcGFja2FnZScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9bXi9dKy9zdGFydF9hY3Rpdml0eScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2ltZS9hY3RpdmF0ZScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2ltZS9kZWFjdGl2YXRlJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9pbWUvYWN0aXZlX2VuZ2luZScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvaW1lL2F2YWlsYWJsZV9lbmdpbmVzJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy91cmwnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy91cmwnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHAvW14vXScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2xvY2F0aW9uJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9lbGVtZW50L1teL10rL2xvY2F0aW9uX2luX3ZpZXcnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2Uvc3lzdGVtX3RpbWUnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vc2V0dGluZ3MnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9zZXR0aW5ncycpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvYXBwX2luc3RhbGxlZCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvbG9jaycpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9hcHAvY2xvc2UnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vYXBwL2xhdW5jaCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvcHVsbF9maWxlJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2RldmljZS9wdWxsX2ZvbGRlcicpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvcHVzaF9maWxlJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2FwcC9yZXNldCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9hcHAvYmFja2dyb3VuZCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvdG9nZ2xlX2xvY2F0aW9uX3NlcnZpY2VzJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2RldmljZS9pc19sb2NrZWQnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZGV2aWNlL3VubG9jaycpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvcHJlc3Nfa2V5Y29kZScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvbG9uZ19wcmVzc19rZXljb2RlJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2FwcC9lbmRfdGVzdF9jb3ZlcmFnZScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dHMnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9jb250ZXh0JyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9jb250ZXh0JyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvbmV0d29ya19jb25uZWN0aW9uJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9uZXR3b3JrX2Nvbm5lY3Rpb24nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy90aW1lb3V0cycpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvc2NyZWVuc2hvdCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZWxlbWVudC9bXi9dKy9hdHRyaWJ1dGUnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2VsZW1lbnQvW14vXSsvZW5hYmxlZCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZWxlbWVudC9bXi9dKy9zZWxlY3RlZCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZWxlbWVudC9bXi9dKy9kaXNwbGF5ZWQnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2VsZW1lbnQvW14vXSsvbmFtZScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZWxlbWVudC9bXi9dKy9zY3JlZW5zaG90JyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi8oPyEuKlxcLyknKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9rZXlzJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2RldmljZS9oaWRlX2tleWJvYXJkJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvbG9nJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9sb2cvdHlwZXMnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZGV2aWNlL3JlbW92ZV9hcHAnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZGV2aWNlL2luc3RhbGxfYXBwJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZGV2aWNlL2N1cnJlbnRfcGFja2FnZScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL2RldmljZS9kaXNwbGF5X2RlbnNpdHknKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2Uvc3lzdGVtX2JhcnMnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvaXNfa2V5Ym9hcmRfc2hvd24nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vYXBwL3N0cmluZ3MnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZ2V0UGVyZm9ybWFuY2VEYXRhJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL3BlcmZvcm1hbmNlRGF0YS90eXBlcycpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9zdGFydF9yZWNvcmRpbmdfc2NyZWVuJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL3N0b3BfcmVjb3JkaW5nX3NjcmVlbicpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvaW1lL2F2YWlsYWJsZV9lbmdpbmVzJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9pbWUvYWN0aXZlX2VuZ2luZScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvaW1lL2FjdGl2YXRlZCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2ltZS9kZWFjdGl2YXRlJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvaW1lL2FjdGl2YXRlJyldLFxuICAvLyBNSlNPTldQIGNvbW1hbmRzXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9leGVjdXRlJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZXhlY3V0ZV9hc3luYycpXSxcbiAgLy8gVzNDIGNvbW1hbmRzXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9leGVjdXRlL3N5bmMnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9leGVjdXRlL2FzeW5jJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy93aW5kb3cvcmVjdCcpXSxcbl07XG5cbi8vIFRoaXMgaXMgYSBzZXQgb2YgbWV0aG9kcyBhbmQgcGF0aHMgdGhhdCB3ZSBuZXZlciB3YW50IHRvIHByb3h5IHRvIENocm9tZWRyaXZlci5cbmNvbnN0IENIUk9NRV9OT19QUk9YWSA9IFtcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2NvbnRleHQnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2NvbnRleHQnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0nKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL3BlcmZvcm0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy90b3VjaC9tdWx0aS9wZXJmb3JtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvb3JpZW50YXRpb24nKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxuXTtcbmNvbnN0IEFQUF9FWFRFTlNJT04gPSAnLmFwayc7XG5cbmNsYXNzIEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIgZXh0ZW5kcyBCYXNlRHJpdmVyIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSwgc2hvdWxkVmFsaWRhdGVDYXBzID0gdHJ1ZSkge1xuICAgIC8vIGBzaGVsbGAgb3ZlcndyaXRlcyBhZGIuc2hlbGwsIHNvIHJlbW92ZVxuICAgIGRlbGV0ZSBvcHRzLnNoZWxsO1xuXG4gICAgc3VwZXIob3B0cywgc2hvdWxkVmFsaWRhdGVDYXBzKTtcbiAgICB0aGlzLmxvY2F0b3JTdHJhdGVnaWVzID0gW1xuICAgICAgJ3hwYXRoJyxcbiAgICAgICdpZCcsXG4gICAgICAnY2xhc3MgbmFtZScsXG4gICAgICAnYWNjZXNzaWJpbGl0eSBpZCcsXG4gICAgICAnLWFuZHJvaWQgdWlhdXRvbWF0b3InXG4gICAgXTtcbiAgICB0aGlzLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IGRlc2lyZWRDYXBDb25zdHJhaW50cztcbiAgICB0aGlzLnVpYXV0b21hdG9yMiA9IG51bGw7XG4gICAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuZGVmYXVsdElNRSA9IG51bGw7XG4gICAgdGhpcy5qd3BQcm94eUF2b2lkID0gTk9fUFJPWFk7XG4gICAgdGhpcy5hcGtTdHJpbmdzID0ge307IC8vIG1hcCBvZiBsYW5ndWFnZSAtPiBzdHJpbmdzIG9ialxuXG4gICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBEZXZpY2VTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2UsIGFsbG93SW52aXNpYmxlRWxlbWVudHM6IGZhbHNlfSxcbiAgICAgICAgdGhpcy5vblNldHRpbmdzVXBkYXRlLmJpbmQodGhpcykpO1xuICAgIC8vIGhhbmRsZSB3ZWJ2aWV3IG1lY2hhbmljcyBmcm9tIEFuZHJvaWREcml2ZXJcbiAgICB0aGlzLmNocm9tZWRyaXZlciA9IG51bGw7XG4gICAgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVycyA9IHt9O1xuXG4gICAgLy8gbWVtb2l6ZSBwZXItaW5zdGFuY2UgY29tbWFuZHNcbiAgICB0aGlzLmdldFN0YXR1c0JhckhlaWdodCA9IF8ubWVtb2l6ZSh0aGlzLmdldFN0YXR1c0JhckhlaWdodCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVTZXNzaW9uICguLi5hcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFRPRE8gaGFuZGxlIG90aGVyU2Vzc2lvbkRhdGEgZm9yIG11bHRpcGxlIHNlc3Npb25zXG4gICAgICBsZXQgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKC4uLmFyZ3MpO1xuXG4gICAgICBsZXQgc2VydmVyRGV0YWlscyA9IHtwbGF0Zm9ybTogJ0xJTlVYJyxcbiAgICAgICAgd2ViU3RvcmFnZUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICB0YWtlc1NjcmVlbnNob3Q6IHRydWUsXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICBkYXRhYmFzZUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBuZXR3b3JrQ29ubmVjdGlvbkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGxvY2F0aW9uQ29udGV4dEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICB3YXJuaW5nczoge30sXG4gICAgICAgIGRlc2lyZWQ6IHRoaXMuY2Fwc307XG5cbiAgICAgIHRoaXMuY2FwcyA9IE9iamVjdC5hc3NpZ24oc2VydmVyRGV0YWlscywgdGhpcy5jYXBzKTtcblxuICAgICAgdGhpcy5jdXJDb250ZXh0ID0gdGhpcy5kZWZhdWx0Q29udGV4dE5hbWUoKTtcblxuICAgICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgICBmdWxsUmVzZXQ6IGZhbHNlLFxuICAgICAgICBhdXRvTGF1bmNoOiB0cnVlLFxuICAgICAgICBhZGJQb3J0OiBERUZBVUxUX0FEQl9QT1JULFxuICAgICAgICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQ6IDkwMDAwXG4gICAgICB9O1xuICAgICAgXy5kZWZhdWx0cyh0aGlzLm9wdHMsIGRlZmF1bHRPcHRzKTtcblxuICAgICAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiV2UncmUgZ29pbmcgdG8gcnVuIGEgQ2hyb21lLWJhc2VkIHNlc3Npb25cIik7XG4gICAgICAgIGxldCB7cGtnLCBhY3Rpdml0eX0gPSBoZWxwZXJzLmdldENocm9tZVBrZyh0aGlzLm9wdHMuYnJvd3Nlck5hbWUpO1xuICAgICAgICB0aGlzLm9wdHMuYXBwUGFja2FnZSA9IHRoaXMuY2Fwcy5hcHBQYWNrYWdlID0gcGtnO1xuICAgICAgICB0aGlzLm9wdHMuYXBwQWN0aXZpdHkgPSB0aGlzLmNhcHMuYXBwQWN0aXZpdHkgPSBhY3Rpdml0eTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENocm9tZS10eXBlIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGFyZSAke3BrZ30gYW5kICR7YWN0aXZpdHl9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdHMucmVib290KSB7XG4gICAgICAgIHRoaXMuc2V0QXZkRnJvbUNhcGFiaWxpdGllcyhjYXBzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0cy5hcHApIHtcbiAgICAgICAgLy8gZmluZCBhbmQgY29weSwgb3IgZG93bmxvYWQgYW5kIHVuemlwIGFuIGFwcCB1cmwgb3IgcGF0aFxuICAgICAgICB0aGlzLm9wdHMuYXBwID0gYXdhaXQgdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcCh0aGlzLm9wdHMuYXBwLCBBUFBfRVhURU5TSU9OKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja0FwcFByZXNlbnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICAvLyB0aGUgYXBwIGlzbid0IGFuIGFjdHVhbCBhcHAgZmlsZSBidXQgcmF0aGVyIHNvbWV0aGluZyB3ZSB3YW50IHRvXG4gICAgICAgIC8vIGFzc3VtZSBpcyBvbiB0aGUgZGV2aWNlIGFuZCBqdXN0IGxhdW5jaCB2aWEgdGhlIGFwcFBhY2thZ2VcbiAgICAgICAgbG9nZ2VyLmluZm8oYEFwcCBmaWxlIHdhcyBub3QgbGlzdGVkLCBpbnN0ZWFkIHdlJ3JlIGdvaW5nIHRvIHJ1biBgICtcbiAgICAgICAgICAgIGAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBkaXJlY3RseSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tQYWNrYWdlUHJlc2VudCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRzLnN5c3RlbVBvcnQgPSB0aGlzLm9wdHMuc3lzdGVtUG9ydCB8fCBhd2FpdCBmaW5kQVBvcnROb3RJblVzZShTWVNURU1fUE9SVF9SQU5HRVswXSwgU1lTVEVNX1BPUlRfUkFOR0VbMV0pO1xuICAgICAgdGhpcy5vcHRzLmFkYlBvcnQgPSB0aGlzLm9wdHMuYWRiUG9ydCB8fCBERUZBVUxUX0FEQl9QT1JUO1xuXG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0VWlBdXRvbWF0b3IyU2Vzc2lvbigpO1xuICAgICAgYXdhaXQgdGhpcy5maWxsRGV2aWNlRGV0YWlscygpO1xuICAgICAgcmV0dXJuIFtzZXNzaW9uSWQsIGNhcHNdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmaWxsRGV2aWNlRGV0YWlscyAoKSB7XG4gICAgdGhpcy5jYXBzLnBpeGVsUmF0aW8gPSBhd2FpdCB0aGlzLmdldERldmljZVBpeGVsUmF0aW8oKTtcbiAgICB0aGlzLmNhcHMuc3RhdEJhckhlaWdodCA9IGF3YWl0IHRoaXMuZ2V0U3RhdHVzQmFySGVpZ2h0KCk7XG4gICAgdGhpcy5jYXBzLnZpZXdwb3J0UmVjdCA9IGF3YWl0IHRoaXMuZ2V0Vmlld1BvcnRSZWN0KCk7XG4gIH1cblxuICBnZXQgZHJpdmVyRGF0YSAoKSB7XG4gICAgLy8gVE9ETyBmaWxsIG91dCByZXNvdXJjZSBpbmZvIGhlcmVcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBpc0VtdWxhdG9yICgpIHtcbiAgICByZXR1cm4gISF0aGlzLm9wdHMuYXZkO1xuICB9XG5cbiAgc2V0QXZkRnJvbUNhcGFiaWxpdGllcyAoY2Fwcykge1xuICAgIGlmICh0aGlzLm9wdHMuYXZkKSB7XG4gICAgICBsb2dnZXIuaW5mbygnYXZkIG5hbWUgZGVmaW5lZCwgaWdub3JpbmcgZGV2aWNlIG5hbWUgYW5kIHBsYXRmb3JtIHZlcnNpb24nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjYXBzLmRldmljZU5hbWUpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coJ2F2ZCBvciBkZXZpY2VOYW1lIHNob3VsZCBiZSBzcGVjaWZpZWQgd2hlbiByZWJvb3Qgb3B0aW9uIGlzIGVuYWJsZXMnKTtcbiAgICAgIH1cbiAgICAgIGlmICghY2Fwcy5wbGF0Zm9ybVZlcnNpb24pIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coJ2F2ZCBvciBwbGF0Zm9ybVZlcnNpb24gc2hvdWxkIGJlIHNwZWNpZmllZCB3aGVuIHJlYm9vdCBvcHRpb24gaXMgZW5hYmxlZCcpO1xuICAgICAgfVxuICAgICAgbGV0IGF2ZERldmljZSA9IGNhcHMuZGV2aWNlTmFtZS5yZXBsYWNlKC9bXmEtekEtWjAtOV8uXS9nLCBcIi1cIik7XG4gICAgICB0aGlzLm9wdHMuYXZkID0gYCR7YXZkRGV2aWNlfV9fJHtjYXBzLnBsYXRmb3JtVmVyc2lvbn1gO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN0YXJ0VWlBdXRvbWF0b3IyU2Vzc2lvbiAoKSB7XG4gICAgaWYgKCF0aGlzLm9wdHMuamF2YVZlcnNpb24pIHtcbiAgICAgIHRoaXMub3B0cy5qYXZhVmVyc2lvbiA9IGF3YWl0IGhlbHBlcnMuZ2V0SmF2YVZlcnNpb24oKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgZGV2aWNlIHVkaWQgZm9yIHRoaXMgc2Vzc2lvblxuICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKHRoaXMub3B0cyk7XG4gICAgdGhpcy5vcHRzLnVkaWQgPSB1ZGlkO1xuICAgIHRoaXMub3B0cy5lbVBvcnQgPSBlbVBvcnQ7XG5cbiAgICAvLyBub3cgdGhhdCB3ZSBrbm93IG91ciBqYXZhIHZlcnNpb24gYW5kIGRldmljZSBpbmZvLCB3ZSBjYW4gY3JlYXRlIG91clxuICAgIC8vIEFEQiBpbnN0YW5jZVxuICAgIHRoaXMuYWRiID0gYXdhaXQgYW5kcm9pZEhlbHBlcnMuY3JlYXRlQURCKHRoaXMub3B0cy5qYXZhVmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMudWRpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZW1Qb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5hZGJQb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5zdXBwcmVzc0tpbGxTZXJ2ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnJlbW90ZUFkYkhvc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLmNsZWFyRGV2aWNlTG9nc09uU3RhcnQpO1xuXG4gICAgaWYgKGF3YWl0IHRoaXMuYWRiLmdldEFwaUxldmVsKCkgPCAyMSkge1xuICAgICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coJ1VJQXV0b21hdGlvbjIgaXMgb25seSBzdXBwb3J0ZWQgc2luY2UgQW5kcm9pZCA1LjAgKExvbGxpcG9wKS4gJyArXG4gICAgICAgICdZb3UgY291bGQgc3RpbGwgdXNlIG90aGVyIHN1cHBvcnRlZCBiYWNrZW5kcyBpbiBvcmRlciB0byBhdXRvbWF0ZSBvbGRlciBBbmRyb2lkIHZlcnNpb25zLicpO1xuICAgIH1cblxuICAgIC8vIGdldCBhcHBQYWNrYWdlIGV0IGFsIGZyb20gbWFuaWZlc3QgaWYgbmVjZXNzYXJ5XG4gICAgbGV0IGFwcEluZm8gPSBhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8odGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gICAgLy8gYW5kIGdldCBpdCBvbnRvIG91ciAnb3B0cycgb2JqZWN0IHNvIHdlIHVzZSBpdCBmcm9tIG5vdyBvblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBhcHBJbmZvKTtcblxuICAgIC8vIHNldCBhY3R1YWwgZGV2aWNlIG5hbWUsIHVkaWQsIHBsYXRmb3JtIHZlcnNpb24sIHNjcmVlbiBzaXplLCBzY3JlZW4gZGVuc2l0eSwgbW9kZWwgYW5kIG1hbnVmYWN0dXJlciBkZXRhaWxzXG4gICAgdGhpcy5jYXBzLmRldmljZU5hbWUgPSB0aGlzLmFkYi5jdXJEZXZpY2VJZDtcbiAgICB0aGlzLmNhcHMuZGV2aWNlVURJRCA9IHRoaXMub3B0cy51ZGlkO1xuICAgIHRoaXMuY2Fwcy5wbGF0Zm9ybVZlcnNpb24gPSBhd2FpdCB0aGlzLmFkYi5nZXRQbGF0Zm9ybVZlcnNpb24oKTtcbiAgICB0aGlzLmNhcHMuZGV2aWNlU2NyZWVuU2l6ZSA9IGF3YWl0IHRoaXMuYWRiLmdldFNjcmVlblNpemUoKTtcbiAgICB0aGlzLmNhcHMuZGV2aWNlU2NyZWVuRGVuc2l0eSA9IGF3YWl0IHRoaXMuYWRiLmdldFNjcmVlbkRlbnNpdHkoKTtcbiAgICB0aGlzLmNhcHMuZGV2aWNlTW9kZWwgPSBhd2FpdCB0aGlzLmFkYi5nZXRNb2RlbCgpO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VNYW51ZmFjdHVyZXIgPSBhd2FpdCB0aGlzLmFkYi5nZXRNYW51ZmFjdHVyZXIoKTtcblxuICAgIC8vIHNldCB1cCB0aGUgbW9kaWZpZWQgVWlBdXRvbWF0b3IyIHNlcnZlciBldGNcbiAgICBhd2FpdCB0aGlzLmluaXRVaUF1dG9tYXRvcjJTZXJ2ZXIoKTtcblxuICAgIC8vIHN0YXJ0IGFuIGF2ZCwgc2V0IHRoZSBsYW5ndWFnZS9sb2NhbGUsIHBpY2sgYW4gZW11bGF0b3IsIGV0Yy4uLlxuICAgIC8vIFRPRE8gd2l0aCBtdWx0aXBsZSBkZXZpY2VzIHdlJ2xsIG5lZWQgdG8gcGFyYW1ldGVyaXplIHRoaXNcbiAgICB0aGlzLmRlZmF1bHRJTUUgPSBhd2FpdCBoZWxwZXJzLmluaXREZXZpY2UodGhpcy5hZGIsIHRoaXMub3B0cyk7XG5cbiAgICAvLyBGdXJ0aGVyIHByZXBhcmUgdGhlIGRldmljZSBieSBmb3J3YXJkaW5nIHRoZSBVaUF1dG9tYXRvcjIgcG9ydFxuICAgIGxvZ2dlci5kZWJ1ZyhgRm9yd2FyZGluZyBVaUF1dG9tYXRvcjIgU2VydmVyIHBvcnQgJHtERVZJQ0VfUE9SVH0gdG8gJHt0aGlzLm9wdHMuc3lzdGVtUG9ydH1gKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5mb3J3YXJkUG9ydCh0aGlzLm9wdHMuc3lzdGVtUG9ydCwgREVWSUNFX1BPUlQpO1xuXG4gICAgaWYgKCF0aGlzLm9wdHMuc2tpcFVubG9jaykge1xuICAgICAgLy8gdW5sb2NrIHRoZSBkZXZpY2UgdG8gcHJlcGFyZSBpdCBmb3IgdGVzdGluZ1xuICAgICAgYXdhaXQgaGVscGVycy51bmxvY2sodGhpcywgdGhpcy5hZGIsIHRoaXMuY2Fwcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgJ3NraXBVbmxvY2snIGNhcGFiaWxpdHkgc2V0LCBzbyBza2lwcGluZyBkZXZpY2UgdW5sb2NrYCk7XG4gICAgfVxuICAgIC8vIElmIHRoZSB1c2VyIHNldHMgYXV0b0xhdW5jaCB0byBmYWxzZSwgdGhleSBhcmUgcmVzcG9uc2libGUgZm9yIGluaXRBVVQoKSBhbmQgc3RhcnRBVVQoKVxuICAgIGlmICh0aGlzLm9wdHMuYXV0b0xhdW5jaCkge1xuICAgICAgLy8gc2V0IHVwIGFwcCB1bmRlciB0ZXN0XG4gICAgICAvLyBwcmVwYXJlIG91ciBhY3R1YWwgQVVULCBnZXQgaXQgb24gdGhlIGRldmljZSwgZXRjLi4uXG4gICAgICBhd2FpdCB0aGlzLmluaXRBVVQoKTtcbiAgICB9XG4gICAgLy8gQWRkaW5nIEFVVCBwYWNrYWdlIG5hbWUgaW4gdGhlIGNhcGFiaWxpdGllcyBpZiBwYWNrYWdlIG5hbWUgbm90IGV4aXN0IGluIGNhcHNcbiAgICBpZiAoIXRoaXMuY2Fwcy5hcHBQYWNrYWdlICYmIGFwcEluZm8pIHtcbiAgICAgIHRoaXMuY2Fwcy5hcHBQYWNrYWdlID0gYXBwSW5mby5hcHBQYWNrYWdlO1xuICAgIH1cblxuICAgIC8vIGxhdW5jaCBVaUF1dG9tYXRvcjIgYW5kIHdhaXQgdGlsbCBpdHMgb25saW5lIGFuZCB3ZSBoYXZlIGEgc2Vzc2lvblxuICAgIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLnN0YXJ0U2Vzc2lvbih0aGlzLmNhcHMpO1xuXG4gICAgLy8gcmVzY3VlIFVpQXV0b21hdG9yMiBpZiBpdCBmYWlscyB0byBzdGFydCBvdXIgQVVUXG4gICAgaWYgKHRoaXMub3B0cy5hdXRvTGF1bmNoKSB7XG4gICAgICBhd2FpdCB0aGlzLmVuc3VyZUFwcFN0YXJ0cygpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBpbml0aWFsIG9yaWVudGF0aW9uIGlzIHJlcXVlc3RlZCwgc2V0IGl0XG4gICAgaWYgKHV0aWwuaGFzVmFsdWUodGhpcy5vcHRzLm9yaWVudGF0aW9uKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBTZXR0aW5nIGluaXRpYWwgb3JpZW50YXRpb24gdG8gJyR7dGhpcy5vcHRzLm9yaWVudGF0aW9ufSdgKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5vcHRzLm9yaWVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSB3YW50IHRvIGltbWVkaWF0ZWx5IGdldCBpbnRvIGEgd2Vidmlldywgc2V0IG91ciBjb250ZXh0XG4gICAgLy8gYXBwcm9wcmlhdGVseVxuICAgIGlmICh0aGlzLm9wdHMuYXV0b1dlYnZpZXcpIHtcbiAgICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMjAsIHRoaXMub3B0cy5hdXRvV2Vidmlld1RpbWVvdXQgfHwgMjAwMCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnNldENvbnRleHQodGhpcy5kZWZhdWx0V2Vidmlld05hbWUoKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAgIGF3YWl0IEFuZHJvaWREcml2ZXIucHJvdG90eXBlLnN0YXJ0Q2hyb21lU2Vzc2lvbi5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIG5vdyB0aGF0IGV2ZXJ5dGhpbmcgaGFzIHN0YXJ0ZWQgc3VjY2Vzc2Z1bGx5LCB0dXJuIG9uIHByb3h5aW5nIHNvIGFsbFxuICAgIC8vIHN1YnNlcXVlbnQgc2Vzc2lvbiByZXF1ZXN0cyBnbyBzdHJhaWdodCB0by9mcm9tIHVpYXV0b21hdG9yMlxuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgYXN5bmMgaW5pdFVpQXV0b21hdG9yMlNlcnZlciAoKSB7XG4gICAgLy8gbm93IHRoYXQgd2UgaGF2ZSBwYWNrYWdlIGFuZCBhY3Rpdml0eSwgd2UgY2FuIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZlxuICAgIC8vIHVpYXV0b21hdG9yMiB3aXRoIHRoZSBhcHByb3ByaWF0ZSBkYXRhXG4gICAgdGhpcy51aWF1dG9tYXRvcjIgPSBuZXcgVWlBdXRvbWF0b3IyU2VydmVyKHtcbiAgICAgIGhvc3Q6IHRoaXMub3B0cy5yZW1vdGVBZGJIb3N0IHx8IHRoaXMub3B0cy5ob3N0IHx8ICdsb2NhbGhvc3QnLFxuICAgICAgc3lzdGVtUG9ydDogdGhpcy5vcHRzLnN5c3RlbVBvcnQsXG4gICAgICBkZXZpY2VQb3J0OiBERVZJQ0VfUE9SVCxcbiAgICAgIGFkYjogdGhpcy5hZGIsXG4gICAgICBhcGs6IHRoaXMub3B0cy5hcHAsXG4gICAgICB0bXBEaXI6IHRoaXMub3B0cy50bXBEaXIsXG4gICAgICBhcHBQYWNrYWdlOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICAgIGFwcEFjdGl2aXR5OiB0aGlzLm9wdHMuYXBwQWN0aXZpdHksXG4gICAgICBkaXNhYmxlV2luZG93QW5pbWF0aW9uOiAhIXRoaXMub3B0cy5kaXNhYmxlV2luZG93QW5pbWF0aW9uLFxuICAgIH0pO1xuICAgIHRoaXMucHJveHlSZXFSZXMgPSB0aGlzLnVpYXV0b21hdG9yMi5wcm94eVJlcVJlcy5iaW5kKHRoaXMudWlhdXRvbWF0b3IyKTtcblxuICAgIC8vIGtpbGxpbmcgYW55IHVpYXV0b21hdG9yIGV4aXN0aW5nIHByb2Nlc3Nlc1xuICAgIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmtpbGxVaUF1dG9tYXRvck9uRGV2aWNlKCk7XG5cbiAgICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5pbnN0YWxsU2VydmVyQXBrKHRoaXMub3B0cy51aWF1dG9tYXRvcjJTZXJ2ZXJJbnN0YWxsVGltZW91dCk7XG4gIH1cblxuICBhc3luYyBpbml0QVVUICgpIHtcbiAgICAvLyBzZXQgdGhlIGxvY2FsaXplZCBzdHJpbmdzIGZvciB0aGUgY3VycmVudCBsYW5ndWFnZSBmcm9tIHRoZSBhcGtcbiAgICAvLyBUT0RPOiBpbmNvcnBvcmF0ZSBjaGFuZ2VzIGZyb20gYXBwaXVtIzUzMDggd2hpY2ggZml4IGEgcmFjZSBjb25kLVxuICAgIC8vIGl0aW9uIGJ1ZyBpbiBvbGQgYXBwaXVtIGFuZCBuZWVkIHRvIGJlIHJlcGxpY2F0ZWQgaGVyZVxuICAgIHRoaXMuYXBrU3RyaW5nc1t0aGlzLm9wdHMubGFuZ3VhZ2VdID0gYXdhaXQgYW5kcm9pZEhlbHBlcnMucHVzaFN0cmluZ3MoXG4gICAgICAgIHRoaXMub3B0cy5sYW5ndWFnZSwgdGhpcy5hZGIsIHRoaXMub3B0cyk7XG5cbiAgICBpZiAoIXRoaXMub3B0cy5hcHApIHtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0KSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KCdGdWxsIHJlc2V0IHJlcXVpcmVzIGFuIGFwcCBjYXBhYmlsaXR5LCB1c2UgZmFzdFJlc2V0IGlmIGFwcCBpcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1ZygnTm8gYXBwIGNhcGFiaWxpdHkuIEFzc3VtaW5nIGl0IGlzIGFscmVhZHkgb24gdGhlIGRldmljZScpO1xuICAgICAgaWYgKHRoaXMub3B0cy5mYXN0UmVzZXQpIHtcbiAgICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcCh0aGlzLmFkYiwgdGhpcy5vcHRzLmFwcCwgdGhpcy5vcHRzLmFwcFBhY2thZ2UsIHRoaXMub3B0cy5mYXN0UmVzZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRzLnNraXBVbmluc3RhbGwpIHtcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnVuaW5zdGFsbEFwayh0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5vcHRzLm5vU2lnbikge1xuICAgICAgbGV0IHNpZ25lZCA9IGF3YWl0IHRoaXMuYWRiLmNoZWNrQXBrQ2VydCh0aGlzLm9wdHMuYXBwLCB0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gICAgICBpZiAoIXNpZ25lZCAmJiB0aGlzLm9wdHMuYXBwKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuYWRiLnNpZ24odGhpcy5vcHRzLmFwcCwgdGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRzLmFwcCkge1xuICAgICAgYXdhaXQgaGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkodGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuZ3JhbnRQZXJtaXNzaW9ucygpO1xuICB9XG5cbiAgYXN5bmMgZ3JhbnRQZXJtaXNzaW9ucyAoKSB7XG4gICAgaWYgKHRoaXMub3B0cy5hdXRvR3JhbnRQZXJtaXNzaW9ucykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuZ3JhbnRBbGxQZXJtaXNzaW9ucyh0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmFwcCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBncmFudCBwZXJtaXNzaW9ucyByZXF1ZXN0ZWQuIE9yaWdpbmFsIGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZW5zdXJlQXBwU3RhcnRzICgpIHtcbiAgICAvLyBtYWtlIHN1cmUgd2UgaGF2ZSBhbiBhY3Rpdml0eSBhbmQgcGFja2FnZSB0byB3YWl0IGZvclxuICAgIGxldCBhcHBXYWl0UGFja2FnZSA9IHRoaXMub3B0cy5hcHBXYWl0UGFja2FnZSB8fCB0aGlzLm9wdHMuYXBwUGFja2FnZTtcbiAgICBsZXQgYXBwV2FpdEFjdGl2aXR5ID0gdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSB8fCB0aGlzLm9wdHMuYXBwQWN0aXZpdHk7XG5cbiAgICBsb2dnZXIuaW5mbyhgVWlBdXRvbWF0b3IyIGRpZCBub3Qgc3RhcnQgdGhlIGFjdGl2aXR5IHdlIHdlcmUgd2FpdGluZyBmb3IsIGAgK1xuICAgICAgICBgJyR7YXBwV2FpdFBhY2thZ2V9LyR7YXBwV2FpdEFjdGl2aXR5fScuIGAgK1xuICAgICAgICBgU3RhcnRpbmcgaXQgb3Vyc2VsdmVzYCk7XG5cbiAgICBpZiAodGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZSkge1xuICAgICAgbG9nZ2VyLmluZm8oYGFuZHJvaWRDb3ZlcmFnZSBpcyBjb25maWd1cmVkLiBgICtcbiAgICAgICAgYCBTdGFydGluZyBpbnN0cnVtZW50YXRpb24gb2YgJyR7dGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZX0nLi4uYCk7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5hbmRyb2lkQ292ZXJhZ2UodGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZSwgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnN0YXJ0QXBwKHtcbiAgICAgICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICAgICAgYWN0aXZpdHk6IHRoaXMub3B0cy5hcHBBY3Rpdml0eSxcbiAgICAgICAgYWN0aW9uOiB0aGlzLm9wdHMuaW50ZW50QWN0aW9uLFxuICAgICAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgICAgICBmbGFnczogdGhpcy5vcHRzLmludGVudEZsYWdzLFxuICAgICAgICB3YWl0UGtnOiB0aGlzLm9wdHMuYXBwV2FpdFBhY2thZ2UsXG4gICAgICAgIHdhaXRBY3Rpdml0eTogdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSxcbiAgICAgICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IHRoaXMub3B0cy5vcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICAgICAgc3RvcEFwcDogIXRoaXMub3B0cy5kb250U3RvcEFwcE9uUmVzZXQsXG4gICAgICAgIHJldHJ5OiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0RlbGV0aW5nIFVpQXV0b21hdG9yMiBzZXNzaW9uJyk7XG4gICAgaWYgKHRoaXMudWlhdXRvbWF0b3IyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byBzdG9wIENocm9tZURyaXZlciBwcm94aWVzOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuandwUHJveHlBY3RpdmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5kZWxldGVTZXNzaW9uKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci53YXJuKGBVbmFibGUgdG8gcHJveHkgZGVsZXRlU2Vzc2lvbiB0byBVaUF1dG9tYXRvcjI6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudWlhdXRvbWF0b3IyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuYWRiKSB7XG4gICAgICBpZiAodGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZCAmJiB0aGlzLm9wdHMucmVzZXRLZXlib2FyZCAmJiB0aGlzLmRlZmF1bHRJTUUpIHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZXNldHRpbmcgSU1FIHRvICcke3RoaXMuZGVmYXVsdElNRX0nYCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hZGIuc2V0SU1FKHRoaXMuZGVmYXVsdElNRSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci53YXJuKGBVbmFibGUgdG8gcmVzZXQgSU1FOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZSkge1xuICAgICAgICBsb2dnZXIuaW5mbygnU2h1dHRpbmcgZG93biB0aGUgYWRiIHByb2Nlc3Mgb2YgaW5zdHJ1bWVudGF0aW9uLi4uJyk7XG4gICAgICAgIGF3YWl0IHRoaXMuYWRiLmVuZEFuZHJvaWRDb3ZlcmFnZSgpO1xuICAgICAgICAvLyBVc2UgdGhpcyBicm9hZGNhc3QgaW50ZW50IHRvIG5vdGlmeSBpdCdzIHRpbWUgdG8gZHVtcCBjb3ZlcmFnZSB0byBmaWxlXG4gICAgICAgIGlmICh0aGlzLmNhcHMuYW5kcm9pZENvdmVyYWdlRW5kSW50ZW50KSB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlbmRpbmcgaW50ZW50IGJyb2FkY2FzdCAnJHt0aGlzLmNhcHMuYW5kcm9pZENvdmVyYWdlRW5kSW50ZW50fScgYXQgdGhlIGVuZCBvZiBpbnN0cnVtZW50aW5nLmApO1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWRiLmJyb2FkY2FzdCh0aGlzLmNhcHMuYW5kcm9pZENvdmVyYWdlRW5kSW50ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIud2FybignTm8gYW5kcm9pZENvdmVyYWdlRW5kSW50ZW50IGlzIGNvbmZpZ3VyZWQgaW4gY2Fwcy4gUG9zc2libHkgeW91IGNhbm5vdCBnZXQgY292ZXJhZ2UgZmlsZS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0cy5hcHBQYWNrYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hZGIuZm9yY2VTdG9wKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byBmb3JjZSBzdG9wIGFwcDogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQgJiYgIXRoaXMub3B0cy5za2lwVW5pbnN0YWxsICYmICF0aGlzLmFwcE9uRGV2aWNlKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2FwYWJpbGl0eSAnZnVsbFJlc2V0JyBzZXQgdG8gJ3RydWUnLCBVbmluc3RhbGxpbmcgJyR7dGhpcy5vcHRzLmFwcFBhY2thZ2V9J2ApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWRiLnVuaW5zdGFsbEFwayh0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci53YXJuKGBVbmFibGUgdG8gdW5pbnN0YWxsIGFwcDogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5hZGIuc3RvcExvZ2NhdCgpO1xuICAgICAgaWYgKHRoaXMub3B0cy5yZWJvb3QpIHtcbiAgICAgICAgbGV0IGF2ZE5hbWUgPSB0aGlzLm9wdHMuYXZkLnJlcGxhY2UoJ0AnLCAnJyk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2xvc2luZyBlbXVsYXRvciAnJHthdmROYW1lfSdgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi5raWxsRW11bGF0b3IoYXZkTmFtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZ2dlci53YXJuKGBVbmFibGUgdG8gY2xvc2UgZW11bGF0b3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgc3VwZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIGlmICh0aGlzLm9wdHMuc3lzdGVtUG9ydCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYWRiKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5yZW1vdmVQb3J0Rm9yd2FyZCh0aGlzLm9wdHMuc3lzdGVtUG9ydCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIHJlbW92ZSBwb3J0IGZvcndhcmQgJyR7ZXJyb3IubWVzc2FnZX0nYCk7XG4gICAgICAgIC8vSWdub3JlLCB0aGlzIGJsb2NrIHdpbGwgYWxzbyBiZSBjYWxsZWQgd2hlbiB3ZSBmYWxsIGluIGNhdGNoIGJsb2NrXG4gICAgICAgIC8vIGFuZCBiZWZvcmUgZXZlbiBwb3J0IGZvcndhcmQuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tBcHBQcmVzZW50ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0NoZWNraW5nIHdoZXRoZXIgYXBwIGlzIGFjdHVhbGx5IHByZXNlbnQnKTtcbiAgICBpZiAoIShhd2FpdCBmcy5leGlzdHModGhpcy5vcHRzLmFwcCkpKSB7XG4gICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgYXBwIGFwayBhdCAnJHt0aGlzLm9wdHMuYXBwfSdgKTtcbiAgICB9XG4gIH1cblxuICBkZWZhdWx0V2Vidmlld05hbWUgKCkge1xuICAgIHJldHVybiBgJHtXRUJWSUVXX0JBU0V9MGA7XG4gIH1cblxuICBhc3luYyBvblNldHRpbmdzVXBkYXRlIChrZXksIHZhbHVlKSB7XG4gICAgbGV0IHNldHRpbmdzID0ge1trZXldOiB2YWx1ZX07XG4gICAgYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvYXBwaXVtL3NldHRpbmdzJywgJ1BPU1QnLCB7c2V0dGluZ3N9KTtcbiAgfVxuXG4gIC8vIE5lZWQgdG8gb3ZlcnJpZGUgYW5kcm9pZC1kcml2ZXIncyB2ZXJzaW9uIG9mIHRoaXMgc2luY2Ugd2UgZG9uJ3QgYWN0dWFsbHlcbiAgLy8gaGF2ZSBhIGJvb3RzdHJhcDsgaW5zdGVhZCB3ZSBqdXN0IHJlc3RhcnQgYWRiIGFuZCByZS1mb3J3YXJkIHRoZSBVaUF1dG9tYXRvcjJcbiAgLy8gcG9ydFxuICBhc3luYyB3cmFwQm9vdHN0cmFwRGlzY29ubmVjdCAod3JhcHBlZCkge1xuICAgIGF3YWl0IHdyYXBwZWQoKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5yZXN0YXJ0KCk7XG4gICAgYXdhaXQgdGhpcy5hZGIuZm9yd2FyZFBvcnQodGhpcy5vcHRzLnN5c3RlbVBvcnQsIERFVklDRV9QT1JUKTtcbiAgfVxuXG4gIHByb3h5QWN0aXZlIChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5wcm94eUFjdGl2ZShzZXNzaW9uSWQpO1xuXG4gICAgLy8gd2UgYWx3YXlzIGhhdmUgYW4gYWN0aXZlIHByb3h5IHRvIHRoZSBVaUF1dG9tYXRvcjIgc2VydmVyXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjYW5Qcm94eSAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIuY2FuUHJveHkoc2Vzc2lvbklkKTtcblxuICAgIC8vIHdlIGNhbiBhbHdheXMgcHJveHkgdG8gdGhlIHVpYXV0b21hdG9yMiBzZXJ2ZXJcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0IChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5nZXRQcm94eUF2b2lkTGlzdChzZXNzaW9uSWQpO1xuICAgIC8vIHdlIGFyZSBtYWludGFpbmluZyB0d28gc2V0cyBvZiBOT19QUk9YWSBsaXN0cywgb25lIGZvciBjaHJvbWVkcml2ZXIoQ0hST01FX05PX1BST1hZKVxuICAgIC8vIGFuZCBvbmUgZm9yIHVpYXV0b21hdG9yMihOT19QUk9YWSksIGJhc2VkIG9uIGN1cnJlbnQgY29udGV4dCB3aWxsIHJldHVybiByZWxhdGVkIE5PX1BST1hZIGxpc3RcbiAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLmNocm9tZWRyaXZlcikpIHtcbiAgICAgIC8vaWYgdGhlIGN1cnJlbnQgY29udGV4dCBpcyB3ZWJ2aWV3KGNocm9tZWRyaXZlciksIHRoZW4gcmV0dXJuIENIUk9NRV9OT19QUk9YWSBsaXN0XG4gICAgICB0aGlzLmp3cFByb3h5QXZvaWQgPSBDSFJPTUVfTk9fUFJPWFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuandwUHJveHlBdm9pZCA9IE5PX1BST1hZO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRzLm5hdGl2ZVdlYlNjcmVlbnNob3QpIHtcbiAgICAgIHRoaXMuandwUHJveHlBdm9pZCA9IFsuLi50aGlzLmp3cFByb3h5QXZvaWQsIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3NjcmVlbnNob3QnKV1dO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QXZvaWQ7XG4gIH1cblxuICBnZXQgaXNDaHJvbWVTZXNzaW9uICgpIHtcbiAgICByZXR1cm4gaGVscGVycy5pc0Nocm9tZUJyb3dzZXIodGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcbiAgfVxufVxuXG4vLyBmaXJzdCBhZGQgdGhlIGFuZHJvaWQtZHJpdmVyIGNvbW1hbmRzIHdoaWNoIHdlIHdpbGwgZmFsbCBiYWNrIHRvXG5mb3IgKGxldCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGFuZHJvaWRDb21tYW5kcykpIHtcbiAgLy8gd2UgZG8gc29tZSBkaWZmZXJlbnQvc3BlY2lhbCB0aGluZ3Mgd2l0aCB0aGVzZSBtZXRob2RzXG4gIGlmICghXy5pbmNsdWRlcyhbJ2RlZmF1bHRXZWJ2aWV3TmFtZSddLCBjbWQpKSB7XG4gICAgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xuICB9XG59XG5cbi8vIHRoZW4gb3ZlcndyaXRlIHdpdGggYW55IHVpYXV0b21hdG9yMi1zcGVjaWZpYyBjb21tYW5kc1xuZm9yIChsZXQgW2NtZCwgZm5dIG9mIF8udG9QYWlycyhjb21tYW5kcykpIHtcbiAgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9

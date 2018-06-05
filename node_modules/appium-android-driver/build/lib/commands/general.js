'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var APP_EXTENSION = '.apk';

var commands = {},
    helpers = {},
    extensions = {};

var logTypesSupported = {
  'logcat': 'Logs for Android applications on real device and emulators via ADB'
};

commands.keys = function callee$0$0(keys) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // Protocol sends an array; rethink approach
        keys = _lodash2['default'].isArray(keys) ? keys.join('') : keys;
        params = {
          text: keys,
          replace: false
        };

        if (this.opts.unicodeKeyboard) {
          params.unicodeKeyboard = true;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.doSendKeys(params));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doSendKeys = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('setText', params));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getDeviceTime = function callee$0$0() {
  var out;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Attempting to capture android device date and time');
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.shell(['date']));

      case 4:
        out = context$1$0.sent;
        return context$1$0.abrupt('return', out.trim());

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].errorAndThrow('Could not capture device date and time: ' + context$1$0.t0);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 8]]);
};

commands.getPageSource = function () {
  return this.bootstrap.sendAction('source');
};

commands.back = function () {
  return this.bootstrap.sendAction('pressBack');
};

commands.isKeyboardShown = function callee$0$0() {
  var keyboardInfo;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isSoftKeyboardPresent());

      case 2:
        keyboardInfo = context$1$0.sent;
        return context$1$0.abrupt('return', keyboardInfo.isKeyboardShown);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.hideKeyboard = function callee$0$0() {
  var _ref, isKeyboardShown, canCloseKeyboard;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isSoftKeyboardPresent());

      case 2:
        _ref = context$1$0.sent;
        isKeyboardShown = _ref.isKeyboardShown;
        canCloseKeyboard = _ref.canCloseKeyboard;

        if (isKeyboardShown) {
          context$1$0.next = 7;
          break;
        }

        throw new Error("Soft keyboard not present, cannot hide keyboard");

      case 7:
        if (!canCloseKeyboard) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', this.back());

      case 11:
        _logger2['default'].info("Keyboard has no UI; no closing necessary");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openSettingsActivity = function callee$0$0(setting) {
  var _ref2, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        _ref2 = context$1$0.sent;
        appPackage = _ref2.appPackage;
        appActivity = _ref2.appActivity;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.shell(['am', 'start', '-a', 'android.settings.' + setting]));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getWindowSize = function () {
  return this.bootstrap.sendAction('getDeviceSize');
};

// For W3C
commands.getWindowRect = function () {
  var _getWindowSize = this.getWindowSize();

  var width = _getWindowSize.width;
  var height = _getWindowSize.height;

  return {
    width: width,
    height: height,
    x: 0,
    y: 0
  };
};

commands.getCurrentActivity = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent.appActivity);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getCurrentPackage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent.appPackage);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLogTypes = function () {
  return _lodash2['default'].keys(logTypesSupported);
};

commands.getLog = function (logType) {
  if (!_lodash2['default'].has(logTypesSupported, logType)) {
    throw new Error('Unsupported log type ' + logType + '. ' + ('Supported types are ' + JSON.stringify(logTypesSupported)));
  }

  if (logType === 'logcat') {
    return this.adb.getLogcatLogs();
  }
};

commands.isAppInstalled = function (appPackage) {
  return this.adb.isAppInstalled(appPackage);
};

commands.removeApp = function (appPackage) {
  return this.adb.uninstallApk(appPackage);
};

commands.installApp = function callee$0$0(appPath) {
  var _ref3, apkPackage, opts;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.helpers.configureApp(appPath, APP_EXTENSION));

      case 2:
        appPath = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(appPath));

      case 5:
        if (context$1$0.sent) {
          context$1$0.next = 7;
          break;
        }

        _logger2['default'].errorAndThrow('Could not find app apk at ' + appPath);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.packageAndLaunchActivityFromManifest(appPath));

      case 9:
        _ref3 = context$1$0.sent;
        apkPackage = _ref3.apkPackage;
        opts = {
          app: appPath,
          appPackage: apkPackage,
          fastReset: this.opts.fastReset
        };
        return context$1$0.abrupt('return', _androidHelpers2['default'].installApkRemotely(this.adb, opts));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.background = function callee$0$0(seconds) {
  var _ref4, appPackage, appActivity, args;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(seconds < 0)) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.goToHome());

      case 3:
        return context$1$0.abrupt('return', true);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 6:
        _ref4 = context$1$0.sent;
        appPackage = _ref4.appPackage;
        appActivity = _ref4.appActivity;
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.adb.goToHome());

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(seconds * 1000));

      case 13:
        args = undefined;

        if (this.opts.startActivityArgs && this.opts.startActivityArgs[appPackage + '/' + appActivity]) {
          // the activity was started with `startActivity`, so use those args to restart
          args = this.opts.startActivityArgs[appPackage + '/' + appActivity];
        } else if (appPackage === this.opts.appPackage && appActivity === this.opts.appActivity) {
          // the activity is the original session activity, so use the original args
          args = {
            pkg: appPackage,
            activity: appActivity,
            action: this.opts.intentAction,
            category: this.opts.intentCategory,
            flags: this.opts.intentFlags,
            waitPkg: this.opts.appWaitPackage,
            waitActivity: this.opts.appWaitActivity,
            optionalIntentArguments: this.opts.optionalIntentArguments,
            stopApp: false
          };
        } else {
          // the activity was started some other way, so use defaults
          args = {
            pkg: appPackage,
            activity: appActivity,
            waitPkg: appPackage,
            waitActivity: appActivity,
            stopApp: false
          };
        }
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_appiumSupport.util.filterObject(args));

      case 17:
        args = context$1$0.sent;

        _logger2['default'].debug('Bringing application back to foreground with arguments: ' + JSON.stringify(args));
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.adb.startApp(args));

      case 21:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getStrings = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (language) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getDeviceLanguage());

      case 3:
        language = context$1$0.sent;

        _logger2['default'].info('No language specified, returning strings for: ' + language);

      case 5:
        if (!this.apkStrings[language]) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(language, this.adb, this.opts));

      case 9:
        this.apkStrings[language] = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('updateStrings'));

      case 12:
        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.launchApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.initAUT());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startActivity = function callee$0$0(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Starting package \'' + appPackage + '\' and activity \'' + appActivity + '\'');

        // dontStopAppOnReset is both an argument here, and a desired capability
        // if the argument is set, use it, otherwise use the cap
        if (!_appiumSupport.util.hasValue(dontStopAppOnReset)) {
          dontStopAppOnReset = !!this.opts.dontStopAppOnReset;
        }

        args = {
          pkg: appPackage,
          activity: appActivity,
          waitPkg: appWaitPackage || appPackage,
          waitActivity: appWaitActivity || appActivity,
          action: intentAction,
          category: intentCategory,
          flags: intentFlags,
          optionalIntentArguments: optionalIntentArguments,
          stopApp: !dontStopAppOnReset
        };

        this.opts.startActivityArgs = this.opts.startActivityArgs || {};
        this.opts.startActivityArgs[appPackage + '/' + appActivity] = args;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.startApp(args));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.reset = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.opts.fullReset) {
          context$1$0.next = 10;
          break;
        }

        _logger2['default'].info("Running old fashion reset (reinstall)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts));

      case 8:
        context$1$0.next = 13;
        break;

      case 10:
        _logger2['default'].info("Running fast reset (stop and clear)");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 13:
        // reset context since we don't know what kind on context we will end up after app launch.
        this.curContext = null;

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.grantPermissions());

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 18:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startAUT = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startApp({
          pkg: this.opts.appPackage,
          activity: this.opts.appActivity,
          action: this.opts.intentAction,
          category: this.opts.intentCategory,
          flags: this.opts.intentFlags,
          waitPkg: this.opts.appWaitPackage,
          waitActivity: this.opts.appWaitActivity,
          waitDuration: this.opts.appWaitDuration,
          optionalIntentArguments: this.opts.optionalIntentArguments,
          stopApp: !this.opts.dontStopAppOnReset
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// we override setUrl to take an android URI which can be used for deep-linking
// inside an app, similar to starting an intent
commands.setUrl = function callee$0$0(uri) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startUri(uri, this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// closing app using force stop
commands.closeApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

      case 2:
        // reset context since we don't know what kind on context we will end up after app launch.
        this.curContext = null;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getDisplayDensity = function callee$0$0() {
  var out, val;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.shell(['getprop', 'ro.sf.lcd_density']));

      case 2:
        out = context$1$0.sent;

        if (!out) {
          context$1$0.next = 8;
          break;
        }

        val = parseInt(out, 10);

        if (isNaN(val)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', val);

      case 7:
        _logger2['default'].debug('Parsed density value was NaN: "' + out + '"');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.adb.shell(['getprop', 'qemu.sf.lcd_density']));

      case 10:
        out = context$1$0.sent;

        if (!out) {
          context$1$0.next = 16;
          break;
        }

        val = parseInt(out, 10);

        if (isNaN(val)) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', val);

      case 15:
        _logger2['default'].debug('Parsed density value was NaN: "' + out + '"');

      case 16:
        // couldn't get anything, so error out
        _logger2['default'].errorAndThrow('Failed to get display density property.');

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Parses the given window manager Surface string to get info.
 * @param line: To parse. This is assumed to be valid.
 * @return: Visibility and bounds of the Surface.
 */
function parseSurfaceLine(line) {
  // the surface bounds are in the format:
  // "rect=(0.0,1184.0) 768.0 x 96.0"
  //       ^ location   ^ size
  // cut out the stuff before the 'rect' and then split the numbers apart
  var bounds = line.split('rect=')[1].replace(/[\(\), x]+/g, ' ').trim().split(' ');

  return {
    visible: line.indexOf('shown=true') !== -1,
    x: parseFloat(bounds[0]),
    y: parseFloat(bounds[1]),
    width: parseFloat(bounds[2]),
    height: parseFloat(bounds[3])
  };
}

/**
 * Extracts status and navigation bar information from the window manager output.
 * @param lines: Output from dumpsys command
 * @return: Visibility and bounds info of status and navigation bar
 */
function parseWindows(lines) {
  var atStatusBar = false;
  var atNavBar = false;
  var statusBar = undefined;
  var navigationBar = undefined;
  // the window manager output looks like:
  // Window #1 ... WindowID
  //   A bunch of properties
  // Window #2 ... WindowID
  //   A bunch of properties
  lines.split('\n').forEach(function (line) {
    // the start of a new window section
    if (line.indexOf('  Window #') !== -1) {
      // determine which section we're in
      // only one will be true
      atStatusBar = line.indexOf('StatusBar') !== -1;
      atNavBar = line.indexOf('NavigationBar') !== -1;
      // don't need anything else. move to next line
      return;
    }
    // once we're in a window section, look for the surface data line
    if (line.indexOf('      Surface:') === -1) {
      return;
    }
    if (atStatusBar) {
      statusBar = parseSurfaceLine(line);
      atStatusBar = false;
    } else if (atNavBar) {
      navigationBar = parseSurfaceLine(line);
      atNavBar = false;
    }
  });

  if (!statusBar) {
    _logger2['default'].errorAndThrow('Failed to parse status bar information.');
  }
  if (!navigationBar) {
    _logger2['default'].errorAndThrow('Failed to parse navigation bar information.');
  }

  return { statusBar: statusBar, navigationBar: navigationBar };
}

commands.getSystemBars = function callee$0$0() {
  var out;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.shell(['dumpsys', 'window', 'windows']));

      case 2:
        out = context$1$0.sent;

        if (!out) {
          _logger2['default'].errorAndThrow('Did not get window manager output.');
        }
        return context$1$0.abrupt('return', parseWindows(out));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// for unit tests
exports.parseWindows = parseWindows;
exports.parseSurfaceLine = parseSurfaceLine;

// if user passes in a negative seconds value, interpret that as the instruction
// to not bring the app back at all

// Return cached strings

// TODO: This is mutating the current language, but it's how appium currently works

// first try the property for devices

// if the value is NaN, try getting the emulator property

// fallback to trying property for emulators
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7OzhCQUNLLG9CQUFvQjs7Ozs2QkFDdEIsZ0JBQWdCOzt3QkFDM0IsVUFBVTs7OztzQkFDUixXQUFXOzs7O0FBRzNCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQzs7QUFFN0IsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxpQkFBaUIsR0FBRztBQUN4QixVQUFRLEVBQUcsb0VBQW9FO0NBQ2hGLENBQUM7O0FBRUYsUUFBUSxDQUFDLElBQUksR0FBRyxvQkFBZ0IsSUFBSTtNQUc5QixNQUFNOzs7OztBQURWLFlBQUksR0FBRyxvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDMUMsY0FBTSxHQUFHO0FBQ1gsY0FBSSxFQUFFLElBQUk7QUFDVixpQkFBTyxFQUFFLEtBQUs7U0FDZjs7QUFDRCxZQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzdCLGdCQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjs7eUNBQ0ssSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Q0FDOUIsQ0FBQzs7QUFFRixRQUFRLENBQUMsVUFBVSxHQUFHLG9CQUFnQixNQUFNOzs7Ozt5Q0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQzs7Ozs7Ozs7OztDQUMxRCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxhQUFhLEdBQUc7TUFHakIsR0FBRzs7OztBQUZULDRCQUFJLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDOzs7eUNBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUFwQyxXQUFHOzRDQUNBLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Ozs7OztBQUVqQiw0QkFBSSxhQUFhLDZEQUFrRCxDQUFDOzs7Ozs7O0NBRXZFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGFBQWEsR0FBRyxZQUFZO0FBQ25DLFNBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDNUMsQ0FBQzs7QUFFRixRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVk7QUFDMUIsU0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUMvQyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxlQUFlLEdBQUc7TUFDckIsWUFBWTs7Ozs7eUNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRTs7O0FBQXJELG9CQUFZOzRDQUNULFlBQVksQ0FBQyxlQUFlOzs7Ozs7O0NBQ3BDLENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRztZQUNqQixlQUFlLEVBQUUsZ0JBQWdCOzs7Ozs7eUNBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRTs7OztBQUEzRSx1QkFBZSxRQUFmLGVBQWU7QUFBRSx3QkFBZ0IsUUFBaEIsZ0JBQWdCOztZQUNqQyxlQUFlOzs7OztjQUNaLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDOzs7YUFHaEUsZ0JBQWdCOzs7Ozs0Q0FDWCxJQUFJLENBQUMsSUFBSSxFQUFFOzs7QUFFbEIsNEJBQUksSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7Ozs7Ozs7Q0FFeEQsQ0FBQzs7QUFFRixRQUFRLENBQUMsb0JBQW9CLEdBQUcsb0JBQWdCLE9BQU87YUFDaEQsVUFBVSxFQUFFLFdBQVc7Ozs7Ozt5Q0FBVSxJQUFJLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQXhFLGtCQUFVLFNBQVYsVUFBVTtBQUFFLG1CQUFXLFNBQVgsV0FBVzs7eUNBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLHdCQUFzQixPQUFPLENBQUcsQ0FBQzs7Ozt5Q0FDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQzs7Ozs7OztDQUNqRSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxhQUFhLEdBQUcsWUFBWTtBQUNuQyxTQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0NBQ25ELENBQUM7OztBQUdGLFFBQVEsQ0FBQyxhQUFhLEdBQUcsWUFBWTt1QkFDVCxJQUFJLENBQUMsYUFBYSxFQUFFOztNQUF0QyxLQUFLLGtCQUFMLEtBQUs7TUFBRSxNQUFNLGtCQUFOLE1BQU07O0FBQ3JCLFNBQU87QUFDTCxTQUFLLEVBQUwsS0FBSztBQUNMLFVBQU0sRUFBTixNQUFNO0FBQ04sS0FBQyxFQUFFLENBQUM7QUFDSixLQUFDLEVBQUUsQ0FBQztHQUNMLENBQUM7Q0FDSCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRzs7Ozs7eUNBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRTs7OzZEQUFFLFdBQVc7Ozs7Ozs7Q0FDbkUsQ0FBQzs7QUFFRixRQUFRLENBQUMsaUJBQWlCLEdBQUc7Ozs7O3lDQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUU7Ozs2REFBRSxVQUFVOzs7Ozs7O0NBQ2xFLENBQUM7O0FBRUYsUUFBUSxDQUFDLFdBQVcsR0FBRyxZQUFZO0FBQ2pDLFNBQU8sb0JBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7QUFFRixRQUFRLENBQUMsTUFBTSxHQUFHLFVBQVUsT0FBTyxFQUFFO0FBQ25DLE1BQUksQ0FBQyxvQkFBRSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEVBQUU7QUFDdEMsVUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBd0IsT0FBTyxvQ0FDUixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUUsQ0FBQyxDQUFDO0dBQzdFOztBQUVELE1BQUksT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUN4QixXQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7R0FDakM7Q0FDRixDQUFDOztBQUVGLFFBQVEsQ0FBQyxjQUFjLEdBQUcsVUFBVSxVQUFVLEVBQUU7QUFDOUMsU0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUM1QyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxVQUFVLEVBQUU7QUFDekMsU0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUMxQyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLE9BQU87YUFNdEMsVUFBVSxFQUNYLElBQUk7Ozs7Ozt5Q0FOUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDOzs7QUFBakUsZUFBTzs7eUNBQ0ssa0JBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7QUFDNUIsNEJBQUksYUFBYSxnQ0FBOEIsT0FBTyxDQUFHLENBQUM7Ozs7eUNBR25DLElBQUksQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsT0FBTyxDQUFDOzs7O0FBQTFFLGtCQUFVLFNBQVYsVUFBVTtBQUNYLFlBQUksR0FBRztBQUNULGFBQUcsRUFBRSxPQUFPO0FBQ1osb0JBQVUsRUFBRSxVQUFVO0FBQ3RCLG1CQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1NBQy9COzRDQUNNLDRCQUFlLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O0NBQ3pELENBQUM7O0FBRUYsUUFBUSxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsT0FBTzthQU90QyxVQUFVLEVBQUUsV0FBVyxFQUl4QixJQUFJOzs7OztjQVZKLE9BQU8sR0FBRyxDQUFDLENBQUE7Ozs7Ozt5Q0FHUCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTs7OzRDQUNsQixJQUFJOzs7O3lDQUV5QixJQUFJLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQXhFLGtCQUFVLFNBQVYsVUFBVTtBQUFFLG1CQUFXLFNBQVgsV0FBVzs7eUNBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFOzs7O3lDQUNuQixzQkFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7O0FBRXpCLFlBQUk7O0FBQ1IsWUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUksVUFBVSxTQUFJLFdBQVcsQ0FBRyxFQUFFOztBQUU5RixjQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBSSxVQUFVLFNBQUksV0FBVyxDQUFHLENBQUM7U0FDcEUsTUFBTSxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7O0FBRXZGLGNBQUksR0FBRztBQUNMLGVBQUcsRUFBRSxVQUFVO0FBQ2Ysb0JBQVEsRUFBRSxXQUFXO0FBQ3JCLGtCQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQzlCLG9CQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO0FBQ2xDLGlCQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO0FBQzVCLG1CQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO0FBQ2pDLHdCQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQ3ZDLG1DQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCO0FBQzFELG1CQUFPLEVBQUUsS0FBSztXQUNmLENBQUM7U0FDSCxNQUFNOztBQUVMLGNBQUksR0FBRztBQUNMLGVBQUcsRUFBRSxVQUFVO0FBQ2Ysb0JBQVEsRUFBRSxXQUFXO0FBQ3JCLG1CQUFPLEVBQUUsVUFBVTtBQUNuQix3QkFBWSxFQUFFLFdBQVc7QUFDekIsbUJBQU8sRUFBRSxLQUFLO1dBQ2YsQ0FBQztTQUNIOzt5Q0FDWSxvQkFBSyxZQUFZLENBQUMsSUFBSSxDQUFDOzs7QUFBcEMsWUFBSTs7QUFDSiw0QkFBSSxLQUFLLDhEQUE0RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFHLENBQUM7O3lDQUNoRixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FDckMsQ0FBQzs7QUFFRixRQUFRLENBQUMsVUFBVSxHQUFHLG9CQUFnQixRQUFROzs7O1lBQ3ZDLFFBQVE7Ozs7Ozt5Q0FDTSxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFOzs7QUFBN0MsZ0JBQVE7O0FBQ1IsNEJBQUksSUFBSSxvREFBa0QsUUFBUSxDQUFHLENBQUM7OzthQUdwRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7Ozs7NENBRXBCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDOzs7O3lDQUlBLDRCQUFlLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7QUFBM0YsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7O3lDQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7Ozs0Q0FFekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Q0FDakMsQ0FBQzs7QUFFRixRQUFRLENBQUMsU0FBUyxHQUFHOzs7Ozt5Q0FDYixJQUFJLENBQUMsT0FBTyxFQUFFOzs7O3lDQUNkLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Q0FDdEIsQ0FBQzs7QUFFRixRQUFRLENBQUMsYUFBYSxHQUFHLG9CQUFnQixVQUFVLEVBQUUsV0FBVyxFQUN2QixjQUFjLEVBQUUsZUFBZSxFQUMvQixZQUFZLEVBQUUsY0FBYyxFQUM1QixXQUFXLEVBQUUsdUJBQXVCLEVBQ3BDLGtCQUFrQjtNQVNyRCxJQUFJOzs7O0FBUlIsNEJBQUksS0FBSyx5QkFBc0IsVUFBVSwwQkFBbUIsV0FBVyxRQUFJLENBQUM7Ozs7QUFJNUUsWUFBSSxDQUFDLG9CQUFLLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO0FBQ3RDLDRCQUFrQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ3JEOztBQUVHLFlBQUksR0FBRztBQUNULGFBQUcsRUFBRSxVQUFVO0FBQ2Ysa0JBQVEsRUFBRSxXQUFXO0FBQ3JCLGlCQUFPLEVBQUUsY0FBYyxJQUFJLFVBQVU7QUFDckMsc0JBQVksRUFBRSxlQUFlLElBQUksV0FBVztBQUM1QyxnQkFBTSxFQUFFLFlBQVk7QUFDcEIsa0JBQVEsRUFBRSxjQUFjO0FBQ3hCLGVBQUssRUFBRSxXQUFXO0FBQ2xCLGlDQUF1QixFQUF2Qix1QkFBdUI7QUFDdkIsaUJBQU8sRUFBRSxDQUFDLGtCQUFrQjtTQUM3Qjs7QUFDRCxZQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO0FBQ2hFLFlBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUksVUFBVSxTQUFJLFdBQVcsQ0FBRyxHQUFHLElBQUksQ0FBQzs7eUNBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzs7Ozs7OztDQUM5QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxLQUFLLEdBQUc7Ozs7YUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7Ozs7O0FBQ3JCLDRCQUFJLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOzt5Q0FDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Ozs7eUNBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7O3lDQUMzQyw0QkFBZSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7QUFFNUQsNEJBQUksSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7O3lDQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7OztBQUduRCxZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7O3lDQUVqQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Ozs7eUNBRWhCLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FDN0IsQ0FBQzs7QUFFRixRQUFRLENBQUMsUUFBUSxHQUFHOzs7Ozt5Q0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUN0QixhQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQ3pCLGtCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO0FBQy9CLGdCQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQzlCLGtCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO0FBQ2xDLGVBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7QUFDNUIsaUJBQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7QUFDakMsc0JBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7QUFDdkMsc0JBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7QUFDdkMsaUNBQXVCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUI7QUFDMUQsaUJBQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCO1NBQ3ZDLENBQUM7Ozs7Ozs7Q0FDSCxDQUFDOzs7O0FBSUYsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBZ0IsR0FBRzs7Ozs7eUNBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztDQUNuRCxDQUFDOzs7QUFHRixRQUFRLENBQUMsUUFBUSxHQUFHOzs7Ozt5Q0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7OztBQUU5QyxZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7Ozs7OztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRztNQUV2QixHQUFHLEVBWUQsR0FBRzs7Ozs7eUNBWk8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7O0FBQTVELFdBQUc7O2FBQ0gsR0FBRzs7Ozs7QUFDRCxXQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7O1lBRXRCLEtBQUssQ0FBQyxHQUFHLENBQUM7Ozs7OzRDQUNOLEdBQUc7OztBQUVaLDRCQUFJLEtBQUsscUNBQW1DLEdBQUcsT0FBSSxDQUFDOzs7O3lDQUcxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDOzs7QUFBOUQsV0FBRzs7YUFDQyxHQUFHOzs7OztBQUNELFdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzs7WUFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7Ozs7NENBQ04sR0FBRzs7O0FBRVosNEJBQUksS0FBSyxxQ0FBbUMsR0FBRyxPQUFJLENBQUM7Ozs7QUFHdEQsNEJBQUksYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7Ozs7Ozs7Q0FDOUQsQ0FBQzs7Ozs7OztBQU9GLFNBQVMsZ0JBQWdCLENBQUUsSUFBSSxFQUFFOzs7OztBQUsvQixNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsQyxPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUMzQixJQUFJLEVBQUUsQ0FDTixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRVosU0FBTztBQUNMLFdBQU8sRUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxBQUFDO0FBQzVDLEtBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLEtBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLFNBQUssRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFVBQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQzlCLENBQUM7Q0FDSDs7Ozs7OztBQU9ELFNBQVMsWUFBWSxDQUFFLEtBQUssRUFBRTtBQUM1QixNQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDeEIsTUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLE1BQUksU0FBUyxZQUFBLENBQUM7QUFDZCxNQUFJLGFBQWEsWUFBQSxDQUFDOzs7Ozs7QUFNbEIsT0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7O0FBRWxDLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7O0FBR3JDLGlCQUFXLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQUFBQyxDQUFDO0FBQ2pELGNBQVEsR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxBQUFDLENBQUM7O0FBRWxELGFBQU87S0FDUjs7QUFFRCxRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN6QyxhQUFPO0tBQ1I7QUFDRCxRQUFJLFdBQVcsRUFBRTtBQUNmLGVBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxpQkFBVyxHQUFHLEtBQUssQ0FBQztLQUNyQixNQUFNLElBQUksUUFBUSxFQUFFO0FBQ25CLG1CQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsY0FBUSxHQUFHLEtBQUssQ0FBQztLQUNsQjtHQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2Qsd0JBQUksYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7R0FDOUQ7QUFDRCxNQUFJLENBQUMsYUFBYSxFQUFFO0FBQ2xCLHdCQUFJLGFBQWEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0dBQ2xFOztBQUVELFNBQU8sRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFFLGFBQWEsRUFBYixhQUFhLEVBQUMsQ0FBQztDQUNuQzs7QUFFRCxRQUFRLENBQUMsYUFBYSxHQUFHO01BQ25CLEdBQUc7Ozs7O3lDQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzs7O0FBQTVELFdBQUc7O0FBQ1AsWUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLDhCQUFJLGFBQWEsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEOzRDQUNNLFlBQVksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Q0FDekIsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVOzs7UUFFaEIsWUFBWSxHQUFaLFlBQVk7UUFBRSxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBhbmRyb2lkSGVscGVycyBmcm9tICcuLi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IHsgZnMsIHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cblxuY29uc3QgQVBQX0VYVEVOU0lPTiA9ICcuYXBrJztcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5jb25zdCBsb2dUeXBlc1N1cHBvcnRlZCA9IHtcbiAgJ2xvZ2NhdCcgOiAnTG9ncyBmb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMgb24gcmVhbCBkZXZpY2UgYW5kIGVtdWxhdG9ycyB2aWEgQURCJ1xufTtcblxuY29tbWFuZHMua2V5cyA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XG4gIC8vIFByb3RvY29sIHNlbmRzIGFuIGFycmF5OyByZXRoaW5rIGFwcHJvYWNoXG4gIGtleXMgPSBfLmlzQXJyYXkoa2V5cykgPyBrZXlzLmpvaW4oJycpIDoga2V5cztcbiAgbGV0IHBhcmFtcyA9IHtcbiAgICB0ZXh0OiBrZXlzLFxuICAgIHJlcGxhY2U6IGZhbHNlXG4gIH07XG4gIGlmICh0aGlzLm9wdHMudW5pY29kZUtleWJvYXJkKSB7XG4gICAgcGFyYW1zLnVuaWNvZGVLZXlib2FyZCA9IHRydWU7XG4gIH1cbiAgYXdhaXQgdGhpcy5kb1NlbmRLZXlzKHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy5kb1NlbmRLZXlzID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcykge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbignc2V0VGV4dCcsIHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy5nZXREZXZpY2VUaW1lID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsb2cuaW5mbygnQXR0ZW1wdGluZyB0byBjYXB0dXJlIGFuZHJvaWQgZGV2aWNlIGRhdGUgYW5kIHRpbWUnKTtcbiAgdHJ5IHtcbiAgICBsZXQgb3V0ID0gYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydkYXRlJ10pO1xuICAgIHJldHVybiBvdXQudHJpbSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGNhcHR1cmUgZGV2aWNlIGRhdGUgYW5kIHRpbWU6ICR7ZXJyfWApO1xuICB9XG59O1xuXG5jb21tYW5kcy5nZXRQYWdlU291cmNlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbignc291cmNlJyk7XG59O1xuXG5jb21tYW5kcy5iYWNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbigncHJlc3NCYWNrJyk7XG59O1xuXG5jb21tYW5kcy5pc0tleWJvYXJkU2hvd24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBrZXlib2FyZEluZm8gPSBhd2FpdCB0aGlzLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcbiAgcmV0dXJuIGtleWJvYXJkSW5mby5pc0tleWJvYXJkU2hvd247XG59O1xuXG5jb21tYW5kcy5oaWRlS2V5Ym9hcmQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCB7aXNLZXlib2FyZFNob3duLCBjYW5DbG9zZUtleWJvYXJkfSA9IGF3YWl0IHRoaXMuYWRiLmlzU29mdEtleWJvYXJkUHJlc2VudCgpO1xuICBpZiAoIWlzS2V5Ym9hcmRTaG93bikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlNvZnQga2V5Ym9hcmQgbm90IHByZXNlbnQsIGNhbm5vdCBoaWRlIGtleWJvYXJkXCIpO1xuICB9XG5cbiAgaWYgKGNhbkNsb3NlS2V5Ym9hcmQpIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oXCJLZXlib2FyZCBoYXMgbm8gVUk7IG5vIGNsb3NpbmcgbmVjZXNzYXJ5XCIpO1xuICB9XG59O1xuXG5jb21tYW5kcy5vcGVuU2V0dGluZ3NBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uIChzZXR0aW5nKSB7XG4gIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ2FtJywgJ3N0YXJ0JywgJy1hJywgYGFuZHJvaWQuc2V0dGluZ3MuJHtzZXR0aW5nfWBdKTtcbiAgYXdhaXQgdGhpcy5hZGIud2FpdEZvck5vdEFjdGl2aXR5KGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LCA1MDAwKTtcbn07XG5cbmNvbW1hbmRzLmdldFdpbmRvd1NpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdnZXREZXZpY2VTaXplJyk7XG59O1xuXG4vLyBGb3IgVzNDXG5jb21tYW5kcy5nZXRXaW5kb3dSZWN0ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuZ2V0V2luZG93U2l6ZSgpO1xuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcbn07XG5cbmNvbW1hbmRzLmdldEN1cnJlbnRBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIChhd2FpdCB0aGlzLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCkpLmFwcEFjdGl2aXR5O1xufTtcblxuY29tbWFuZHMuZ2V0Q3VycmVudFBhY2thZ2UgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAoYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpKS5hcHBQYWNrYWdlO1xufTtcblxuY29tbWFuZHMuZ2V0TG9nVHlwZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfLmtleXMobG9nVHlwZXNTdXBwb3J0ZWQpO1xufTtcblxuY29tbWFuZHMuZ2V0TG9nID0gZnVuY3Rpb24gKGxvZ1R5cGUpIHtcbiAgaWYgKCFfLmhhcyhsb2dUeXBlc1N1cHBvcnRlZCwgbG9nVHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGxvZyB0eXBlICR7bG9nVHlwZX0uIGAgK1xuICAgICAgICAgICAgICAgICAgICBgU3VwcG9ydGVkIHR5cGVzIGFyZSAke0pTT04uc3RyaW5naWZ5KGxvZ1R5cGVzU3VwcG9ydGVkKX1gKTtcbiAgfVxuXG4gIGlmIChsb2dUeXBlID09PSAnbG9nY2F0Jykge1xuICAgIHJldHVybiB0aGlzLmFkYi5nZXRMb2djYXRMb2dzKCk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLmlzQXBwSW5zdGFsbGVkID0gZnVuY3Rpb24gKGFwcFBhY2thZ2UpIHtcbiAgcmV0dXJuIHRoaXMuYWRiLmlzQXBwSW5zdGFsbGVkKGFwcFBhY2thZ2UpO1xufTtcblxuY29tbWFuZHMucmVtb3ZlQXBwID0gZnVuY3Rpb24gKGFwcFBhY2thZ2UpIHtcbiAgcmV0dXJuIHRoaXMuYWRiLnVuaW5zdGFsbEFwayhhcHBQYWNrYWdlKTtcbn07XG5cbmNvbW1hbmRzLmluc3RhbGxBcHAgPSBhc3luYyBmdW5jdGlvbiAoYXBwUGF0aCkge1xuICBhcHBQYXRoID0gYXdhaXQgdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcChhcHBQYXRoLCBBUFBfRVhURU5TSU9OKTtcbiAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKGFwcFBhdGgpKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBhcHAgYXBrIGF0ICR7YXBwUGF0aH1gKTtcbiAgfVxuXG4gIGxldCB7YXBrUGFja2FnZX0gPSBhd2FpdCB0aGlzLmFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QoYXBwUGF0aCk7XG4gIGxldCBvcHRzID0ge1xuICAgIGFwcDogYXBwUGF0aCxcbiAgICBhcHBQYWNrYWdlOiBhcGtQYWNrYWdlLFxuICAgIGZhc3RSZXNldDogdGhpcy5vcHRzLmZhc3RSZXNldFxuICB9O1xuICByZXR1cm4gYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCBvcHRzKTtcbn07XG5cbmNvbW1hbmRzLmJhY2tncm91bmQgPSBhc3luYyBmdW5jdGlvbiAoc2Vjb25kcykge1xuICBpZiAoc2Vjb25kcyA8IDApIHtcbiAgICAvLyBpZiB1c2VyIHBhc3NlcyBpbiBhIG5lZ2F0aXZlIHNlY29uZHMgdmFsdWUsIGludGVycHJldCB0aGF0IGFzIHRoZSBpbnN0cnVjdGlvblxuICAgIC8vIHRvIG5vdCBicmluZyB0aGUgYXBwIGJhY2sgYXQgYWxsXG4gICAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgYXdhaXQgQi5kZWxheShzZWNvbmRzICogMTAwMCk7XG5cbiAgbGV0IGFyZ3M7XG4gIGlmICh0aGlzLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgJiYgdGhpcy5vcHRzLnN0YXJ0QWN0aXZpdHlBcmdzW2Ake2FwcFBhY2thZ2V9LyR7YXBwQWN0aXZpdHl9YF0pIHtcbiAgICAvLyB0aGUgYWN0aXZpdHkgd2FzIHN0YXJ0ZWQgd2l0aCBgc3RhcnRBY3Rpdml0eWAsIHNvIHVzZSB0aG9zZSBhcmdzIHRvIHJlc3RhcnRcbiAgICBhcmdzID0gdGhpcy5vcHRzLnN0YXJ0QWN0aXZpdHlBcmdzW2Ake2FwcFBhY2thZ2V9LyR7YXBwQWN0aXZpdHl9YF07XG4gIH0gZWxzZSBpZiAoYXBwUGFja2FnZSA9PT0gdGhpcy5vcHRzLmFwcFBhY2thZ2UgJiYgYXBwQWN0aXZpdHkgPT09IHRoaXMub3B0cy5hcHBBY3Rpdml0eSkge1xuICAgIC8vIHRoZSBhY3Rpdml0eSBpcyB0aGUgb3JpZ2luYWwgc2Vzc2lvbiBhY3Rpdml0eSwgc28gdXNlIHRoZSBvcmlnaW5hbCBhcmdzXG4gICAgYXJncyA9IHtcbiAgICAgIHBrZzogYXBwUGFja2FnZSxcbiAgICAgIGFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcbiAgICAgIGFjdGlvbjogdGhpcy5vcHRzLmludGVudEFjdGlvbixcbiAgICAgIGNhdGVnb3J5OiB0aGlzLm9wdHMuaW50ZW50Q2F0ZWdvcnksXG4gICAgICBmbGFnczogdGhpcy5vcHRzLmludGVudEZsYWdzLFxuICAgICAgd2FpdFBrZzogdGhpcy5vcHRzLmFwcFdhaXRQYWNrYWdlLFxuICAgICAgd2FpdEFjdGl2aXR5OiB0aGlzLm9wdHMuYXBwV2FpdEFjdGl2aXR5LFxuICAgICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IHRoaXMub3B0cy5vcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICAgIHN0b3BBcHA6IGZhbHNlLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhlIGFjdGl2aXR5IHdhcyBzdGFydGVkIHNvbWUgb3RoZXIgd2F5LCBzbyB1c2UgZGVmYXVsdHNcbiAgICBhcmdzID0ge1xuICAgICAgcGtnOiBhcHBQYWNrYWdlLFxuICAgICAgYWN0aXZpdHk6IGFwcEFjdGl2aXR5LFxuICAgICAgd2FpdFBrZzogYXBwUGFja2FnZSxcbiAgICAgIHdhaXRBY3Rpdml0eTogYXBwQWN0aXZpdHksXG4gICAgICBzdG9wQXBwOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgYXJncyA9IGF3YWl0IHV0aWwuZmlsdGVyT2JqZWN0KGFyZ3MpO1xuICBsb2cuZGVidWcoYEJyaW5naW5nIGFwcGxpY2F0aW9uIGJhY2sgdG8gZm9yZWdyb3VuZCB3aXRoIGFyZ3VtZW50czogJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYWRiLnN0YXJ0QXBwKGFyZ3MpO1xufTtcblxuY29tbWFuZHMuZ2V0U3RyaW5ncyA9IGFzeW5jIGZ1bmN0aW9uIChsYW5ndWFnZSkge1xuICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgbGFuZ3VhZ2UgPSBhd2FpdCB0aGlzLmFkYi5nZXREZXZpY2VMYW5ndWFnZSgpO1xuICAgIGxvZy5pbmZvKGBObyBsYW5ndWFnZSBzcGVjaWZpZWQsIHJldHVybmluZyBzdHJpbmdzIGZvcjogJHtsYW5ndWFnZX1gKTtcbiAgfVxuXG4gIGlmICh0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdKSB7XG4gICAgLy8gUmV0dXJuIGNhY2hlZCBzdHJpbmdzXG4gICAgcmV0dXJuIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV07XG4gIH1cblxuICAvLyBUT0RPOiBUaGlzIGlzIG11dGF0aW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCBidXQgaXQncyBob3cgYXBwaXVtIGN1cnJlbnRseSB3b3Jrc1xuICB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdID0gYXdhaXQgYW5kcm9pZEhlbHBlcnMucHVzaFN0cmluZ3MobGFuZ3VhZ2UsIHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCd1cGRhdGVTdHJpbmdzJyk7XG5cbiAgcmV0dXJuIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV07XG59O1xuXG5jb21tYW5kcy5sYXVuY2hBcHAgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IHRoaXMuaW5pdEFVVCgpO1xuICBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XG59O1xuXG5jb21tYW5kcy5zdGFydEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBXYWl0UGFja2FnZSwgYXBwV2FpdEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnRBY3Rpb24sIGludGVudENhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnRGbGFncywgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbnRTdG9wQXBwT25SZXNldCkge1xuICBsb2cuZGVidWcoYFN0YXJ0aW5nIHBhY2thZ2UgJyR7YXBwUGFja2FnZX0nIGFuZCBhY3Rpdml0eSAnJHthcHBBY3Rpdml0eX0nYCk7XG5cbiAgLy8gZG9udFN0b3BBcHBPblJlc2V0IGlzIGJvdGggYW4gYXJndW1lbnQgaGVyZSwgYW5kIGEgZGVzaXJlZCBjYXBhYmlsaXR5XG4gIC8vIGlmIHRoZSBhcmd1bWVudCBpcyBzZXQsIHVzZSBpdCwgb3RoZXJ3aXNlIHVzZSB0aGUgY2FwXG4gIGlmICghdXRpbC5oYXNWYWx1ZShkb250U3RvcEFwcE9uUmVzZXQpKSB7XG4gICAgZG9udFN0b3BBcHBPblJlc2V0ID0gISF0aGlzLm9wdHMuZG9udFN0b3BBcHBPblJlc2V0O1xuICB9XG5cbiAgbGV0IGFyZ3MgPSB7XG4gICAgcGtnOiBhcHBQYWNrYWdlLFxuICAgIGFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcbiAgICB3YWl0UGtnOiBhcHBXYWl0UGFja2FnZSB8fCBhcHBQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogYXBwV2FpdEFjdGl2aXR5IHx8IGFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogaW50ZW50QWN0aW9uLFxuICAgIGNhdGVnb3J5OiBpbnRlbnRDYXRlZ29yeSxcbiAgICBmbGFnczogaW50ZW50RmxhZ3MsXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgc3RvcEFwcDogIWRvbnRTdG9wQXBwT25SZXNldFxuICB9O1xuICB0aGlzLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgPSB0aGlzLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgfHwge307XG4gIHRoaXMub3B0cy5zdGFydEFjdGl2aXR5QXJnc1tgJHthcHBQYWNrYWdlfS8ke2FwcEFjdGl2aXR5fWBdID0gYXJncztcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRBcHAoYXJncyk7XG59O1xuXG5jb21tYW5kcy5yZXNldCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQpIHtcbiAgICBsb2cuaW5mbyhcIlJ1bm5pbmcgb2xkIGZhc2hpb24gcmVzZXQgKHJlaW5zdGFsbClcIik7XG4gICAgYXdhaXQgdGhpcy5hZGIuc3RvcEFuZENsZWFyKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIGF3YWl0IGFuZHJvaWRIZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseSh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgfSBlbHNlIHtcbiAgICBsb2cuaW5mbyhcIlJ1bm5pbmcgZmFzdCByZXNldCAoc3RvcCBhbmQgY2xlYXIpXCIpO1xuICAgIGF3YWl0IHRoaXMuYWRiLnN0b3BBbmRDbGVhcih0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gIH1cbiAgLy8gcmVzZXQgY29udGV4dCBzaW5jZSB3ZSBkb24ndCBrbm93IHdoYXQga2luZCBvbiBjb250ZXh0IHdlIHdpbGwgZW5kIHVwIGFmdGVyIGFwcCBsYXVuY2guXG4gIHRoaXMuY3VyQ29udGV4dCA9IG51bGw7XG5cbiAgYXdhaXQgdGhpcy5ncmFudFBlcm1pc3Npb25zKCk7XG5cbiAgcmV0dXJuIGF3YWl0IHRoaXMuc3RhcnRBVVQoKTtcbn07XG5cbmNvbW1hbmRzLnN0YXJ0QVVUID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICBhY3Rpdml0eTogdGhpcy5vcHRzLmFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogdGhpcy5vcHRzLmludGVudEFjdGlvbixcbiAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgIGZsYWdzOiB0aGlzLm9wdHMuaW50ZW50RmxhZ3MsXG4gICAgd2FpdFBrZzogdGhpcy5vcHRzLmFwcFdhaXRQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSxcbiAgICB3YWl0RHVyYXRpb246IHRoaXMub3B0cy5hcHBXYWl0RHVyYXRpb24sXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IHRoaXMub3B0cy5vcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICBzdG9wQXBwOiAhdGhpcy5vcHRzLmRvbnRTdG9wQXBwT25SZXNldFxuICB9KTtcbn07XG5cbi8vIHdlIG92ZXJyaWRlIHNldFVybCB0byB0YWtlIGFuIGFuZHJvaWQgVVJJIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBkZWVwLWxpbmtpbmdcbi8vIGluc2lkZSBhbiBhcHAsIHNpbWlsYXIgdG8gc3RhcnRpbmcgYW4gaW50ZW50XG5jb21tYW5kcy5zZXRVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJpKSB7XG4gIGF3YWl0IHRoaXMuYWRiLnN0YXJ0VXJpKHVyaSwgdGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xufTtcblxuLy8gY2xvc2luZyBhcHAgdXNpbmcgZm9yY2Ugc3RvcFxuY29tbWFuZHMuY2xvc2VBcHAgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IHRoaXMuYWRiLmZvcmNlU3RvcCh0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gIC8vIHJlc2V0IGNvbnRleHQgc2luY2Ugd2UgZG9uJ3Qga25vdyB3aGF0IGtpbmQgb24gY29udGV4dCB3ZSB3aWxsIGVuZCB1cCBhZnRlciBhcHAgbGF1bmNoLlxuICB0aGlzLmN1ckNvbnRleHQgPSBudWxsO1xufTtcblxuY29tbWFuZHMuZ2V0RGlzcGxheURlbnNpdHkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8vIGZpcnN0IHRyeSB0aGUgcHJvcGVydHkgZm9yIGRldmljZXNcbiAgbGV0IG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZ2V0cHJvcCcsICdyby5zZi5sY2RfZGVuc2l0eSddKTtcbiAgaWYgKG91dCkge1xuICAgIGxldCB2YWwgPSBwYXJzZUludChvdXQsIDEwKTtcbiAgICAvLyBpZiB0aGUgdmFsdWUgaXMgTmFOLCB0cnkgZ2V0dGluZyB0aGUgZW11bGF0b3IgcHJvcGVydHlcbiAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhgUGFyc2VkIGRlbnNpdHkgdmFsdWUgd2FzIE5hTjogXCIke291dH1cImApO1xuICB9XG4gIC8vIGZhbGxiYWNrIHRvIHRyeWluZyBwcm9wZXJ0eSBmb3IgZW11bGF0b3JzXG4gIG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZ2V0cHJvcCcsICdxZW11LnNmLmxjZF9kZW5zaXR5J10pO1xuICBpZiAob3V0KSB7XG4gICAgbGV0IHZhbCA9IHBhcnNlSW50KG91dCwgMTApO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgbG9nLmRlYnVnKGBQYXJzZWQgZGVuc2l0eSB2YWx1ZSB3YXMgTmFOOiBcIiR7b3V0fVwiYCk7XG4gIH1cbiAgLy8gY291bGRuJ3QgZ2V0IGFueXRoaW5nLCBzbyBlcnJvciBvdXRcbiAgbG9nLmVycm9yQW5kVGhyb3coJ0ZhaWxlZCB0byBnZXQgZGlzcGxheSBkZW5zaXR5IHByb3BlcnR5LicpO1xufTtcblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHdpbmRvdyBtYW5hZ2VyIFN1cmZhY2Ugc3RyaW5nIHRvIGdldCBpbmZvLlxuICogQHBhcmFtIGxpbmU6IFRvIHBhcnNlLiBUaGlzIGlzIGFzc3VtZWQgdG8gYmUgdmFsaWQuXG4gKiBAcmV0dXJuOiBWaXNpYmlsaXR5IGFuZCBib3VuZHMgb2YgdGhlIFN1cmZhY2UuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlU3VyZmFjZUxpbmUgKGxpbmUpIHtcbiAgLy8gdGhlIHN1cmZhY2UgYm91bmRzIGFyZSBpbiB0aGUgZm9ybWF0OlxuICAvLyBcInJlY3Q9KDAuMCwxMTg0LjApIDc2OC4wIHggOTYuMFwiXG4gIC8vICAgICAgIF4gbG9jYXRpb24gICBeIHNpemVcbiAgLy8gY3V0IG91dCB0aGUgc3R1ZmYgYmVmb3JlIHRoZSAncmVjdCcgYW5kIHRoZW4gc3BsaXQgdGhlIG51bWJlcnMgYXBhcnRcbiAgbGV0IGJvdW5kcyA9IGxpbmUuc3BsaXQoJ3JlY3Q9JylbMV1cbiAgLnJlcGxhY2UoL1tcXChcXCksIHhdKy9nLCAnICcpXG4gIC50cmltKClcbiAgLnNwbGl0KCcgJyk7XG5cbiAgcmV0dXJuIHtcbiAgICB2aXNpYmxlOiAobGluZS5pbmRleE9mKCdzaG93bj10cnVlJykgIT09IC0xKSxcbiAgICB4OiBwYXJzZUZsb2F0KGJvdW5kc1swXSksXG4gICAgeTogcGFyc2VGbG9hdChib3VuZHNbMV0pLFxuICAgIHdpZHRoOiBwYXJzZUZsb2F0KGJvdW5kc1syXSksXG4gICAgaGVpZ2h0OiBwYXJzZUZsb2F0KGJvdW5kc1szXSlcbiAgfTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0cyBzdGF0dXMgYW5kIG5hdmlnYXRpb24gYmFyIGluZm9ybWF0aW9uIGZyb20gdGhlIHdpbmRvdyBtYW5hZ2VyIG91dHB1dC5cbiAqIEBwYXJhbSBsaW5lczogT3V0cHV0IGZyb20gZHVtcHN5cyBjb21tYW5kXG4gKiBAcmV0dXJuOiBWaXNpYmlsaXR5IGFuZCBib3VuZHMgaW5mbyBvZiBzdGF0dXMgYW5kIG5hdmlnYXRpb24gYmFyXG4gKi9cbmZ1bmN0aW9uIHBhcnNlV2luZG93cyAobGluZXMpIHtcbiAgbGV0IGF0U3RhdHVzQmFyID0gZmFsc2U7XG4gIGxldCBhdE5hdkJhciA9IGZhbHNlO1xuICBsZXQgc3RhdHVzQmFyO1xuICBsZXQgbmF2aWdhdGlvbkJhcjtcbiAgLy8gdGhlIHdpbmRvdyBtYW5hZ2VyIG91dHB1dCBsb29rcyBsaWtlOlxuICAvLyBXaW5kb3cgIzEgLi4uIFdpbmRvd0lEXG4gIC8vICAgQSBidW5jaCBvZiBwcm9wZXJ0aWVzXG4gIC8vIFdpbmRvdyAjMiAuLi4gV2luZG93SURcbiAgLy8gICBBIGJ1bmNoIG9mIHByb3BlcnRpZXNcbiAgbGluZXMuc3BsaXQoJ1xcbicpLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAvLyB0aGUgc3RhcnQgb2YgYSBuZXcgd2luZG93IHNlY3Rpb25cbiAgICBpZiAobGluZS5pbmRleE9mKCcgIFdpbmRvdyAjJykgIT09IC0xKSB7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggc2VjdGlvbiB3ZSdyZSBpblxuICAgICAgLy8gb25seSBvbmUgd2lsbCBiZSB0cnVlXG4gICAgICBhdFN0YXR1c0JhciA9IChsaW5lLmluZGV4T2YoJ1N0YXR1c0JhcicpICE9PSAtMSk7XG4gICAgICBhdE5hdkJhciA9IChsaW5lLmluZGV4T2YoJ05hdmlnYXRpb25CYXInKSAhPT0gLTEpO1xuICAgICAgLy8gZG9uJ3QgbmVlZCBhbnl0aGluZyBlbHNlLiBtb3ZlIHRvIG5leHQgbGluZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBvbmNlIHdlJ3JlIGluIGEgd2luZG93IHNlY3Rpb24sIGxvb2sgZm9yIHRoZSBzdXJmYWNlIGRhdGEgbGluZVxuICAgIGlmIChsaW5lLmluZGV4T2YoJyAgICAgIFN1cmZhY2U6JykgPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhdFN0YXR1c0Jhcikge1xuICAgICAgc3RhdHVzQmFyID0gcGFyc2VTdXJmYWNlTGluZShsaW5lKTtcbiAgICAgIGF0U3RhdHVzQmFyID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChhdE5hdkJhcikge1xuICAgICAgbmF2aWdhdGlvbkJhciA9IHBhcnNlU3VyZmFjZUxpbmUobGluZSk7XG4gICAgICBhdE5hdkJhciA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFzdGF0dXNCYXIpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdygnRmFpbGVkIHRvIHBhcnNlIHN0YXR1cyBiYXIgaW5mb3JtYXRpb24uJyk7XG4gIH1cbiAgaWYgKCFuYXZpZ2F0aW9uQmFyKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coJ0ZhaWxlZCB0byBwYXJzZSBuYXZpZ2F0aW9uIGJhciBpbmZvcm1hdGlvbi4nKTtcbiAgfVxuXG4gIHJldHVybiB7c3RhdHVzQmFyLCBuYXZpZ2F0aW9uQmFyfTtcbn1cblxuY29tbWFuZHMuZ2V0U3lzdGVtQmFycyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKTtcbiAgaWYgKCFvdXQpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdygnRGlkIG5vdCBnZXQgd2luZG93IG1hbmFnZXIgb3V0cHV0LicpO1xuICB9XG4gIHJldHVybiBwYXJzZVdpbmRvd3Mob3V0KTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4vLyBmb3IgdW5pdCB0ZXN0c1xuZXhwb3J0IHsgcGFyc2VXaW5kb3dzLCBwYXJzZVN1cmZhY2VMaW5lIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

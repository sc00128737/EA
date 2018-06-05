'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var _helpers = require('../helpers');

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var systemCallMethods = {};

var DEFAULT_ADB_EXEC_TIMEOUT = 20000; // in milliseconds
var DEFAULT_ADB_REBOOT_RETRIES = 90;

/**
 * Retrieve full path to the given binary.
 *
 * @param {string} binaryName - The name of the binary.
 * @return {string} Full path to the given binary including current SDK root.
 */
systemCallMethods.getSdkBinaryPath = function callee$0$0(binaryName) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].info('Checking whether ' + binaryName + ' is present');

        if (!this.sdkRoot) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getBinaryFromSdkRoot(binaryName));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
        _loggerJs2['default'].warn('The ANDROID_HOME environment variable is not set to the Android SDK ' + 'root directory path. ANDROID_HOME is required for compatibility ' + ('with SDK 23+. Checking along PATH for ' + binaryName + '.'));
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getBinaryFromPath(binaryName));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the name of the tool,
 * which prints full path to the given command shortcut.
 *
 * @return {string} Depending on the current platform this is
 *                  supposed to be either 'which' or 'where'.
 */
systemCallMethods.getCommandForOS = function () {
  return _appiumSupport.system.isWindows() ? 'where' : 'which';
};

/**
 * Retrieve full binary name for the current operating system.
 *
 * @param {string} binaryName - simple binary name, for example 'android'.
 * @return {string} Formatted binary name depending on the current platform,
 *                  for example, 'android.bat' on Windows.
 */
systemCallMethods.getBinaryNameForOS = function (binaryName) {
  if (!_appiumSupport.system.isWindows()) {
    return binaryName;
  }

  if (['android', 'apksigner'].indexOf(binaryName) >= 0 && !binaryName.toLowerCase().endsWith('.bat')) {
    return binaryName + '.bat';
  }
  if (!binaryName.toLowerCase().endsWith('.exe')) {
    return binaryName + '.exe';
  }
  return binaryName;
};

/**
 * Retrieve full path to the given binary.
 *
 * @param {string} binaryName - Simple name of a binary file.
 * @return {string} Full path to the given binary. The method tries
 *                  to enumerate all the known locations where the binary
 *                  might be located and stops the search as soon as the first
 *                  match is found on the local file system.
 * @throws {Error} If the binary with given name is not present at any
 *                 of known locations or Android SDK is not installed on the
 *                 local file system.
 */
systemCallMethods.getBinaryFromSdkRoot = _lodash2['default'].memoize(function callee$0$0(binaryName) {
  var binaryLoc, binaryLocs, buildToolDirs, pairs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, loc;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;

        binaryName = this.getBinaryNameForOS(binaryName);
        binaryLocs = [_path2['default'].resolve(this.sdkRoot, "platform-tools", binaryName), _path2['default'].resolve(this.sdkRoot, "emulator", binaryName), _path2['default'].resolve(this.sdkRoot, "tools", binaryName), _path2['default'].resolve(this.sdkRoot, "tools", "bin", binaryName)];
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.glob(_path2['default'].resolve(this.sdkRoot, 'build-tools', '*') + _path2['default'].sep, { absolute: true }));

      case 5:
        buildToolDirs = context$1$0.sent;

        if (!buildToolDirs.length) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].map(buildToolDirs, function callee$1$0(dir) {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(dir));

              case 2:
                context$2$0.t0 = context$2$0.sent.mtimeMs;
                context$2$0.t1 = dir;
                return context$2$0.abrupt('return', [context$2$0.t0, context$2$0.t1]);

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 9:
        pairs = context$1$0.sent;

        buildToolDirs = pairs.sort(function (a, b) {
          return a[0] > b[0];
        }).map(function (pair) {
          return pair[1];
        });
        _loggerJs2['default'].info('Found the following \'build-tools\' folders (newest first):');
        _loggerJs2['default'].info('    ' + buildToolDirs.join('\n    '));
        _lodash2['default'].forEach(buildToolDirs, function (dir) {
          return binaryLocs.push(_path2['default'].resolve(dir, binaryName));
        });
        context$1$0.next = 17;
        break;

      case 16:
        _loggerJs2['default'].info('Found zero \'build-tools\' folders');

      case 17:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 20;
        _iterator = _getIterator(binaryLocs);

      case 22:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 32;
          break;
        }

        loc = _step.value;
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(loc));

      case 26:
        if (!context$1$0.sent) {
          context$1$0.next = 29;
          break;
        }

        binaryLoc = loc;
        return context$1$0.abrupt('break', 32);

      case 29:
        _iteratorNormalCompletion = true;
        context$1$0.next = 22;
        break;

      case 32:
        context$1$0.next = 38;
        break;

      case 34:
        context$1$0.prev = 34;
        context$1$0.t0 = context$1$0['catch'](20);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 38:
        context$1$0.prev = 38;
        context$1$0.prev = 39;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 41:
        context$1$0.prev = 41;

        if (!_didIteratorError) {
          context$1$0.next = 44;
          break;
        }

        throw _iteratorError;

      case 44:
        return context$1$0.finish(41);

      case 45:
        return context$1$0.finish(38);

      case 46:
        if (!_lodash2['default'].isNull(binaryLoc)) {
          context$1$0.next = 48;
          break;
        }

        throw new Error('Could not find ' + binaryName + ' in ' + binaryLocs + '. ' + ('Do you have the Android SDK installed at \'' + this.sdkRoot + '\'?'));

      case 48:
        binaryLoc = binaryLoc.trim();
        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + binaryLoc);
        return context$1$0.abrupt('return', binaryLoc);

      case 51:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[20, 34, 38, 46], [39,, 41, 45]]);
});

/**
 * Retrieve full path to a binary file using the standard system lookup tool.
 *
 * @param {string} binaryName - The name of the binary.
 * @return {string} Full path to the binary received from 'which'/'where'
 *                  output.
 * @throws {Error} If lookup tool returns non-zero return code.
 */
systemCallMethods.getBinaryFromPath = function callee$0$0(binaryName) {
  var binaryLoc, cmd, _ref, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;
        cmd = this.getCommandForOS();
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, [binaryName]));

      case 5:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;

        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + stdout);
        // TODO write a test for binaries with spaces.
        binaryLoc = stdout.trim();
        return context$1$0.abrupt('return', binaryLoc);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Could not find ' + binaryName + ' Please set the ANDROID_HOME ' + 'environment variable with the Android SDK root directory path.');

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 12]]);
};

/**
 * @typedef {Object} Device
 * @property {string} udid - The device udid.
 * @property {string} state - Current device state, as it is visible in
 *                            _adb devices -l_ output.
 */

/**
 * Retrieve the list of devices visible to adb.
 *
 * @return {Array.<Device>} The list of devices or an empty list if
 *                          no devices are connected.
 * @throws {Error} If there was an error while listing devices.
 */
systemCallMethods.getConnectedDevices = function callee$0$0() {
  var _ref2, stdout, startingIndex, devices, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, lineInfo;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting connected devices...");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, this.executable.defaultArgs.concat(['devices'])));

      case 4:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        startingIndex = stdout.indexOf("List of devices");

        if (!(startingIndex === -1)) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unexpected output while trying to get devices. output was: ' + stdout);

      case 9:
        // slicing ouput we care about.
        stdout = stdout.slice(startingIndex);
        devices = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 14;

        for (_iterator2 = _getIterator(stdout.split("\n")); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          line = _step2.value;

          if (line.trim() !== "" && line.indexOf("List of devices") === -1 && line.indexOf("adb server") === -1 && line.indexOf("* daemon") === -1 && line.indexOf("offline") === -1) {
            lineInfo = line.split("\t");

            // state is either "device" or "offline", afaict
            devices.push({ udid: lineInfo[0], state: lineInfo[1] });
          }
        }
        context$1$0.next = 22;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t0 = context$1$0['catch'](14);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 22:
        context$1$0.prev = 22;
        context$1$0.prev = 23;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 25:
        context$1$0.prev = 25;

        if (!_didIteratorError2) {
          context$1$0.next = 28;
          break;
        }

        throw _iteratorError2;

      case 28:
        return context$1$0.finish(25);

      case 29:
        return context$1$0.finish(22);

      case 30:
        _loggerJs2['default'].debug(devices.length + ' device(s) connected');
        return context$1$0.abrupt('return', devices);

      case 34:
        context$1$0.prev = 34;
        context$1$0.t1 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error while getting connected devices. Original error: ' + context$1$0.t1.message);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 34], [14, 18, 22, 30], [23,, 25, 29]]);
};

/**
 * Retrieve the list of devices visible to adb within the given timeout.
 *
 * @param {number} timeoutMs - The maximum number of milliseconds to get at least
 *                             one list item.
 * @return {Array.<Device>} The list of connected devices.
 * @throws {Error} If no connected devices can be detected within the given timeout.
 */
systemCallMethods.getDevicesWithRetry = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? 20000 : arguments[0];
  var start, getDevices;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();

        _loggerJs2['default'].debug("Trying to find a connected android device");

        getDevices = function getDevices() {
          var devices;
          return _regeneratorRuntime.async(function getDevices$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(Date.now() - start > timeoutMs)) {
                  context$2$0.next = 2;
                  break;
                }

                throw new Error("Could not find a connected Android device.");

              case 2:
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 5:
                devices = context$2$0.sent;

                if (!(devices.length < 1)) {
                  context$2$0.next = 15;
                  break;
                }

                _loggerJs2['default'].debug("Could not find devices, restarting adb server...");
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 10:
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

              case 12:
                context$2$0.next = 14;
                return _regeneratorRuntime.awrap(getDevices());

              case 14:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 15:
                return context$2$0.abrupt('return', devices);

              case 18:
                context$2$0.prev = 18;
                context$2$0.t0 = context$2$0['catch'](2);

                _loggerJs2['default'].debug("Could not find devices, restarting adb server...");
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 23:
                context$2$0.next = 25;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

              case 25:
                context$2$0.next = 27;
                return _regeneratorRuntime.awrap(getDevices());

              case 27:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 28:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[2, 18]]);
        };

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(getDevices());

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Restart adb server if _this.suppressKillServer_ property is true.
 */
systemCallMethods.restartAdb = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.suppressKillServer) {
          context$1$0.next = 3;
          break;
        }

        _loggerJs2['default'].debug('Not restarting abd since \'suppressKillServer\' is on');
        return context$1$0.abrupt('return');

      case 3:

        _loggerJs2['default'].debug('Restarting adb');
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.killServer());

      case 7:
        context$1$0.next = 12;
        break;

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](4);

        _loggerJs2['default'].error("Error killing ADB server, going to see if it's online anyway");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 9]]);
};

/**
 * Kill adb server.
 */
systemCallMethods.killServer = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Killing adb server on port ' + this.adbPort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, [].concat(_toConsumableArray(this.executable.defaultArgs), ['kill-server'])));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Reset Telnet authentication token.
 * @see {@link http://tools.android.com/recent/emulator2516releasenotes} for more details.
 *
 * @returns {boolean} If token reset was successful.
 */
systemCallMethods.resetTelnetAuthToken = _lodash2['default'].memoize(function callee$0$0() {
  var homeFolderPath, dstPath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        homeFolderPath = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

        if (homeFolderPath) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].warn('Cannot find the path to user home folder. Ignoring resetting of emulator\'s telnet authentication token');
        return context$1$0.abrupt('return', false);

      case 4:
        dstPath = _path2['default'].resolve(homeFolderPath, '.emulator_console_auth_token');

        _loggerJs2['default'].debug('Overriding ' + dstPath + ' with an empty string to avoid telnet authentication for emulator commands');
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(dstPath, ''));

      case 9:
        context$1$0.next = 15;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](6);

        _loggerJs2['default'].warn('Error ' + context$1$0.t0.message + ' while resetting the content of ' + dstPath + '. Ignoring resetting of emulator\'s telnet authentication token');
        return context$1$0.abrupt('return', false);

      case 15:
        return context$1$0.abrupt('return', true);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 11]]);
});

/**
 * Execute the given emulator command using _adb emu_ tool.
 *
 * @param {Array.<string>} cmd - The array of rest command line parameters.
 */
systemCallMethods.adbExecEmu = function callee$0$0(cmd) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.verifyEmulatorConnected());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.resetTelnetAuthToken());

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adbExec(['emu'].concat(_toConsumableArray(cmd))));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Execute the given adb command.
 *
 * @param {Array.<string>} cmd - The array of rest command line parameters
 *                      or a single string parameter.
 * @param {Object} opts - Additional options mapping. See
 *                        {@link https://github.com/appium/node-teen_process}
 *                        for more details.
 * @return {string} - Command's stdout.
 * @throws {Error} If the command returned non-zero exit code.
 */
systemCallMethods.adbExec = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execFunc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (cmd) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("You need to pass in a command to adbExec()");

      case 2:
        // setting default timeout for each command to prevent infinite wait.
        opts.timeout = opts.timeout || DEFAULT_ADB_EXEC_TIMEOUT;

        execFunc = function execFunc() {
          var linkerWarningRe, args, _ref3, stdout, protocolFaultError, deviceNotFoundError;

          return _regeneratorRuntime.async(function execFunc$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                linkerWarningRe = /^WARNING: linker.+$/m;
                context$2$0.prev = 1;

                if (!(cmd instanceof Array)) {
                  cmd = [cmd];
                }
                args = this.executable.defaultArgs.concat(cmd);

                _loggerJs2['default'].debug('Running \'' + this.executable.path + '\' with args: ' + ('' + JSON.stringify(args)));
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, args, opts));

              case 7:
                _ref3 = context$2$0.sent;
                stdout = _ref3.stdout;

                // sometimes ADB prints out weird stdout warnings that we don't want
                // to include in any of the response data, so let's strip it out
                stdout = stdout.replace(linkerWarningRe, '').trim();
                return context$2$0.abrupt('return', stdout);

              case 13:
                context$2$0.prev = 13;
                context$2$0.t0 = context$2$0['catch'](1);
                protocolFaultError = new RegExp("protocol fault \\(no status\\)", "i").test(context$2$0.t0);
                deviceNotFoundError = new RegExp("error: device ('.+' )?not found", "i").test(context$2$0.t0);

                if (!(protocolFaultError || deviceNotFoundError)) {
                  context$2$0.next = 23;
                  break;
                }

                _loggerJs2['default'].info('Error sending command, reconnecting device and retrying: ' + cmd);
                context$2$0.next = 21;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1000));

              case 21:
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.getDevicesWithRetry());

              case 23:
                if (!(context$2$0.t0.code === 0 && context$2$0.t0.stdout)) {
                  context$2$0.next = 27;
                  break;
                }

                stdout = context$2$0.t0.stdout;

                stdout = stdout.replace(linkerWarningRe, '').trim();
                return context$2$0.abrupt('return', stdout);

              case 27:
                throw new Error('Error executing adbExec. Original error: \'' + context$2$0.t0.message + '\'; ' + ('Stderr: \'' + (context$2$0.t0.stderr || '').trim() + '\'; Code: \'' + context$2$0.t0.code + '\''));

              case 28:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3, [[1, 13]]);
        };

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(2, execFunc));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Execute the given command using _adb shell_ prefix.
 *
 * @param {Array.<string>|string} cmd - The array of rest command line parameters or a single
 *                                      string parameter.
 * @param {Object} opts - Additional options mapping. See
 *                        {@link https://github.com/appium/node-teen_process}
 *                        for more details.
 * @return {string} - Command's stdout.
 * @throws {Error} If the command returned non-zero exit code.
 */
systemCallMethods.shell = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execCmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isDeviceConnected());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('No device connected, cannot run adb shell command \'' + cmd.join(' ') + '\'');

      case 4:
        execCmd = ['shell'];

        if (cmd instanceof Array) {
          execCmd = execCmd.concat(cmd);
        } else {
          execCmd.push(cmd);
        }
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adbExec(execCmd, opts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.createSubProcess = function () {
  var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  // add the default arguments
  args = this.executable.defaultArgs.concat(args);
  _loggerJs2['default'].debug('Creating ADB subprocess with args: ' + JSON.stringify(args));
  return new _teen_process.SubProcess(this.getAdbPath(), args);
};

/**
 * Retrieve the current adb port.
 * @todo can probably deprecate this now that the logic is just to read this.adbPort
 * @return {number} The current adb port number.
 */
systemCallMethods.getAdbServerPort = function () {
  return this.adbPort;
};

/**
 * Retrieve the current emulator port from _adb devives_ output.
 *
 * @return {number} The current emulator port.
 * @throws {Error} If there are no connected devices.
 */
systemCallMethods.getEmulatorPort = function callee$0$0() {
  var devices, port;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting running emulator port");

        if (!(this.emulatorPort !== null)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt('return', this.emulatorPort);

      case 3:
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 6:
        devices = context$1$0.sent;
        port = this.getPortFromEmulatorString(devices[0].udid);

        if (!port) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return', port);

      case 12:
        throw new Error('Emulator port not found');

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](3);

        _loggerJs2['default'].errorAndThrow('No devices connected. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 15]]);
};

/**
 * Retrieve the current emulator port by parsing emulator name string.
 *
 * @param {string} emStr - Emulator name string.
 * @return {number|boolean} Either the current emulator port or
 *                          _false_ if port number cannot be parsed.
 */
systemCallMethods.getPortFromEmulatorString = function (emStr) {
  var portPattern = /emulator-(\d+)/;
  if (portPattern.test(emStr)) {
    return parseInt(portPattern.exec(emStr)[1], 10);
  }
  return false;
};

/**
 * Retrieve the list of currently connected emulators.
 *
 * @return {Array.<Device>} The list of connected devices.
 */
systemCallMethods.getConnectedEmulators = function callee$0$0() {
  var devices, emulators, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, device, port;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug("Getting connected emulators");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 4:
        devices = context$1$0.sent;
        emulators = [];
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 9;

        for (_iterator3 = _getIterator(devices); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          device = _step3.value;
          port = this.getPortFromEmulatorString(device.udid);

          if (port) {
            device.port = port;
            emulators.push(device);
          }
        }
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 17:
        context$1$0.prev = 17;
        context$1$0.prev = 18;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 20:
        context$1$0.prev = 20;

        if (!_didIteratorError3) {
          context$1$0.next = 23;
          break;
        }

        throw _iteratorError3;

      case 23:
        return context$1$0.finish(20);

      case 24:
        return context$1$0.finish(17);

      case 25:
        _loggerJs2['default'].debug(emulators.length + ' emulator(s) connected');
        return context$1$0.abrupt('return', emulators);

      case 29:
        context$1$0.prev = 29;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting emulators. Original error: ' + context$1$0.t1.message);

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 29], [9, 13, 17, 25], [18,, 20, 24]]);
};

/**
 * Set _emulatorPort_ property of the current class.
 *
 * @param {number} emPort - The emulator port to be set.
 */
systemCallMethods.setEmulatorPort = function (emPort) {
  this.emulatorPort = emPort;
};

/**
 * Set the identifier of the current device (_this.curDeviceId_).
 *
 * @param {string} - The device identifier.
 */
systemCallMethods.setDeviceId = function (deviceId) {
  _loggerJs2['default'].debug('Setting device id to ' + deviceId);
  this.curDeviceId = deviceId;
  var argsHasDevice = this.executable.defaultArgs.indexOf('-s');
  if (argsHasDevice !== -1) {
    // remove the old device id from the arguments
    this.executable.defaultArgs.splice(argsHasDevice, 2);
  }
  this.executable.defaultArgs.push('-s', deviceId);
};

/**
 * Set the the current device object.
 *
 * @param {Device} deviceObj - The device object to be set.
 */
systemCallMethods.setDevice = function (deviceObj) {
  var deviceId = deviceObj.udid;
  var emPort = this.getPortFromEmulatorString(deviceId);
  this.setEmulatorPort(emPort);
  this.setDeviceId(deviceId);
};

/**
 * Get the object for the currently running emulator.
 *
 * @param {string} avdName - Emulator name.
 * @return {?Device} Currently running emulator or _null_.
 */
systemCallMethods.getRunningAVD = function callee$0$0(avdName) {
  var emulators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, emulator, runningAVDName;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Trying to find ' + avdName + ' emulator');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedEmulators());

      case 4:
        emulators = context$1$0.sent;
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 8;
        _iterator4 = _getIterator(emulators);

      case 10:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 23;
          break;
        }

        emulator = _step4.value;

        this.setEmulatorPort(emulator.port);
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.sendTelnetCommand("avd name"));

      case 15:
        runningAVDName = context$1$0.sent;

        if (!(avdName === runningAVDName)) {
          context$1$0.next = 20;
          break;
        }

        _loggerJs2['default'].debug('Found emulator ' + avdName + ' in port ' + emulator.port);
        this.setDeviceId(emulator.udid);
        return context$1$0.abrupt('return', emulator);

      case 20:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 10;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError4) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError4;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
        _loggerJs2['default'].debug('Emulator ' + avdName + ' not running');
        return context$1$0.abrupt('return', null);

      case 41:
        context$1$0.prev = 41;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting AVD. Original error: ' + context$1$0.t1.message);

      case 44:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 41], [8, 25, 29, 37], [30,, 32, 36]]);
};

/**
 * Get the object for the currently running emulator.
 *
 * @param {string} avdName - Emulator name.
 * @param {number} timeoutMs [20000] - The maximum number of milliseconds
 *                                     to wait until at least one running AVD object
 *                                     is detected.
 * @return {?Device} Currently running emulator or _null_.
 * @throws {Error} If no device has been detected within the timeout.
 */
systemCallMethods.getRunningAVDWithRetry = function callee$0$0(avdName) {
  var timeoutMs = arguments.length <= 1 || arguments[1] === undefined ? 20000 : arguments[1];
  var start, runningAVD;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        start = Date.now();

      case 2:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getRunningAVD(avdName.replace('@', '')));

      case 6:
        runningAVD = context$1$0.sent;

        if (!runningAVD) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return', runningAVD);

      case 9:
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](3);

        // Do nothing.
        _loggerJs2['default'].info('Couldn\'t get running AVD, will retry. Error was: ' + context$1$0.t0.message);

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

      case 16:
        context$1$0.next = 2;
        break;

      case 18:
        _loggerJs2['default'].errorAndThrow('Could not find ' + avdName + ' emulator.');
        context$1$0.next = 24;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting AVD with retry. Original error: ' + context$1$0.t1.message);

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 21], [3, 11]]);
};

/**
 * Shutdown all running emulators by killing their processes.
 *
 * @throws {Error} If killing tool returned non-zero return code.
 */
systemCallMethods.killAllEmulators = function callee$0$0() {
  var cmd, args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = undefined, args = undefined;

        if (_appiumSupport.system.isWindows()) {
          cmd = 'TASKKILL';
          args = ['TASKKILL', '/IM', 'emulator.exe'];
        } else {
          cmd = '/usr/bin/killall';
          args = ['-m', 'emulator*'];
        }
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, args));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Error killing emulators. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 7]]);
};

/**
 * Kill emulator with the given name. No error
 * is thrown is given avd does not exist/is not running.
 *
 * @param {string} avdName - The name of the emulator to be killed.
 */
systemCallMethods.killEmulator = function callee$0$0(avdName) {
  var device;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('killing avd \'' + avdName + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getRunningAVD(avdName));

      case 3:
        device = context$1$0.sent;

        if (!device) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adbExec(['emu', 'kill']));

      case 7:
        _loggerJs2['default'].info('successfully killed emulator \'' + avdName + '\'');
        context$1$0.next = 11;
        break;

      case 10:
        _loggerJs2['default'].info('no avd with name \'' + avdName + '\' running. skipping kill step.');

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Start an emulator with given parameters and wait until it is full started.
 *
 * @param {string} avdName - The name of an existing emulator.
 * @param {Array.<string>|string} avdArgs - Additional emulator command line argument.
 * @param {?string} language - Emulator system language.
 * @param {?contry} country - Emulator system country.
 * @param {number} avdLaunchTimeout [60000] - Emulator startup timeout in milliseconds.
 * @param {number} retryTimes [1] - The maximum number of startup retries.
 * @throws {Error} If the emulator fails to start within the given timeout.
 */
systemCallMethods.launchAVD = function callee$0$0(avdName, avdArgs, language, country) {
  var avdLaunchTimeout = arguments.length <= 4 || arguments[4] === undefined ? 60000 : arguments[4];
  var avdReadyTimeout = arguments.length <= 5 || arguments[5] === undefined ? 60000 : arguments[5];
  var retryTimes = arguments.length <= 6 || arguments[6] === undefined ? 1 : arguments[6];
  var emulatorBinaryPath, launchArgs, locale, proc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Launching Emulator with AVD ' + avdName + ', launchTimeout ' + (avdLaunchTimeout + 'ms and readyTimeout ' + avdReadyTimeout + 'ms'));
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("emulator"));

      case 3:
        emulatorBinaryPath = context$1$0.sent;

        if (avdName[0] === "@") {
          avdName = avdName.substr(1);
        }
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.checkAvdExist(avdName));

      case 7:
        launchArgs = ["-avd", avdName];

        if (typeof language === "string") {
          _loggerJs2['default'].debug('Setting Android Device Language to ' + language);
          launchArgs.push("-prop", 'persist.sys.language=' + language.toLowerCase());
        }
        if (typeof country === "string") {
          _loggerJs2['default'].debug('Setting Android Device Country to ' + country);
          launchArgs.push("-prop", 'persist.sys.country=' + country.toUpperCase());
        }
        locale = undefined;

        if (typeof language === "string" && typeof country === "string") {
          locale = language.toLowerCase() + "-" + country.toUpperCase();
        } else if (typeof language === "string") {
          locale = language.toLowerCase();
        } else if (typeof country === "string") {
          locale = country;
        }
        if (typeof locale === "string") {
          _loggerJs2['default'].debug('Setting Android Device Locale to ' + locale);
          launchArgs.push("-prop", 'persist.sys.locale=' + locale);
        }
        if (typeof avdArgs === "string") {
          avdArgs = avdArgs.split(" ");
          launchArgs = launchArgs.concat(avdArgs);
        }
        _loggerJs2['default'].debug('Running \'' + emulatorBinaryPath + '\' with args: ' + JSON.stringify(launchArgs));
        proc = new _teen_process.SubProcess(emulatorBinaryPath, launchArgs);
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(proc.start(0));

      case 18:
        proc.on('output', function (stdout, stderr) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = _getIterator((stdout || stderr || '').split('\n').filter(Boolean)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var line = _step5.value;

              _loggerJs2['default'].info('[AVD OUTPUT] ' + line);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                _iterator5['return']();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        });
        proc.on('exit', function (code, signal) {
          if (code !== 0) {
            _loggerJs2['default'].errorAndThrow('Emulator avd ' + avdName + ' exit with code ' + code + ', signal ' + signal);
          }
        });
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(retryTimes, this.getRunningAVDWithRetry.bind(this), avdName, avdLaunchTimeout));

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.waitForEmulatorReady(avdReadyTimeout));

      case 24:
        return context$1$0.abrupt('return', proc);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Object} ADBVersion
 * @property {string} versionString - ADB version as a string.
 * @property {float} versionFloat - Version number as float value (useful for comparison).
 * @property {number} major - Major version number.
 * @property {number} minor - Minor version number.
 * @property {number} patch - Patch version number.
 */

/**
 * Get the adb version. The result of this method is cached.
 *
 * @return {ADBVersion} The current adb version.
 * @throws {Error} If it is not possible to parse adb version.
 */
systemCallMethods.getAdbVersion = _lodash2['default'].memoize(function callee$0$0() {
  var adbVersion, parts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec('version'));

      case 3:
        adbVersion = context$1$0.sent.replace(/Android\sDebug\sBridge\sversion\s([\d\.]*)[\s\w\-]*/, "$1");
        parts = adbVersion.split('.');
        return context$1$0.abrupt('return', {
          versionString: adbVersion,
          versionFloat: parseFloat(adbVersion),
          major: parseInt(parts[0], 10),
          minor: parseInt(parts[1], 10),
          patch: parts[2] ? parseInt(parts[2], 10) : undefined
        });

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting adb version. Original error: \'' + context$1$0.t0.message + '\'; ' + ('Stderr: \'' + (context$1$0.t0.stderr || '').trim() + '\'; Code: \'' + context$1$0.t0.code + '\''));

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
});

/**
 * Check if given emulator exists in the list of available avds.
 *
 * @param {string} avdName - The name of emulator to verify for existence.
 * @throws {Error} If the emulator with given name does not exist.
 */
systemCallMethods.checkAvdExist = function callee$0$0(avdName) {
  var cmd, result, unknownOptionError, sdkVersion, binaryName, existings;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = undefined, result = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath('emulator'));

      case 4:
        cmd = context$1$0.sent;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, ['-list-avds']));

      case 7:
        result = context$1$0.sent;
        context$1$0.next = 25;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](1);
        unknownOptionError = new RegExp("unknown option: -list-avds", "i").test(context$1$0.t0.stderr);

        if (!unknownOptionError) {
          _loggerJs2['default'].errorAndThrow('Error executing checkAvdExist. Original error: \'' + context$1$0.t0.message + '\'; ' + ('Stderr: \'' + (context$1$0.t0.stderr || '').trim() + '\'; Code: \'' + context$1$0.t0.code + '\''));
        }
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap((0, _helpers.getSdkToolsVersion)());

      case 16:
        sdkVersion = context$1$0.sent;
        binaryName = 'android';

        if (sdkVersion) {
          if (sdkVersion.major >= 25) {
            binaryName = 'avdmanager';
          }
        } else {
          _loggerJs2['default'].warn('Defaulting binary name to \'' + binaryName + '\', because SDK version cannot be parsed');
        }
        // If -list-avds option is not available, use android command as an alternative
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath(binaryName));

      case 21:
        cmd = context$1$0.sent;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, ['list', 'avd', '-c']));

      case 24:
        result = context$1$0.sent;

      case 25:
        if (result.stdout.indexOf(avdName) === -1) {
          existings = '(' + result.stdout.trim().replace(/[\n]/g, '), (') + ')';

          _loggerJs2['default'].errorAndThrow('Avd \'' + avdName + '\' is not available. please select your avd name from one of these: \'' + existings + '\'');
        }

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 10]]);
};

/**
 * Check if the current emulator is ready to accept further commands (booting completed).
 *
 * @param {number} timeoutMs [20000] - The maximum number of milliseconds to wait.
 * @throws {Error} If the emulator is not ready within the given timeout.
 */
systemCallMethods.waitForEmulatorReady = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? 20000 : arguments[0];
  var start, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();

        _loggerJs2['default'].debug("Waiting until emulator is ready");

      case 2:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.shell(["getprop", "init.svc.bootanim"]));

      case 6:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf('stopped') > -1)) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return');

      case 9:
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](3);

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(3000));

      case 15:
        context$1$0.next = 2;
        break;

      case 17:
        _loggerJs2['default'].errorAndThrow('Emulator not ready');

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 11]]);
};

/**
 * Check if the current device is ready to accept further commands (booting completed).
 *
 * @param {number} appDeviceReadyTimeout [30] - The maximum number of seconds to wait.
 * @throws {Error} If the device is not ready within the given timeout.
 */
systemCallMethods.waitForDevice = function callee$0$0() {
  var appDeviceReadyTimeout = arguments.length <= 0 || arguments[0] === undefined ? 30 : arguments[0];
  var retries, timeout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.appDeviceReadyTimeout = appDeviceReadyTimeout;
        retries = 3;
        timeout = parseInt(this.appDeviceReadyTimeout, 10) / retries * 1000;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(retries, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.adbExec('wait-for-device', { timeout: timeout }));

              case 3:
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.ping());

              case 5:
                context$2$0.next = 14;
                break;

              case 7:
                context$2$0.prev = 7;
                context$2$0.t0 = context$2$0['catch'](0);
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 13:
                _loggerJs2['default'].errorAndThrow('Error in waiting for device. Original error: \'' + context$2$0.t0.message + '\'. ' + 'Retrying by restarting ADB');

              case 14:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4, [[0, 7]]);
        }));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Reboot the current device and wait until it is completed.
 *
 * @param {number} retries [DEFAULT_ADB_REBOOT_RETRIES] - The maximum number of reboot retries.
 * @throws {Error} If the device failed to reboot and number of retries is exceeded.
 */
systemCallMethods.reboot = function callee$0$0() {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_ADB_REBOOT_RETRIES : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this5 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['stop']));

      case 4:
        context$1$0.next = 15;
        break;

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](1);

        if (!(context$1$0.t0.message.indexOf('must be root') === -1)) {
          context$1$0.next = 10;
          break;
        }

        throw context$1$0.t0;

      case 10:
        // this device needs adb to be running as root to stop.
        // so try to restart the daemon
        _loggerJs2['default'].debug('Device requires adb to be running as root in order to reboot. Restarting daemon');
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.root());

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.shell(['stop']));

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(2000));

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(this.setDeviceProperty('sys.boot_completed', 0));

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.shell(['start']));

      case 21:
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 1000, function callee$1$0() {
          var booted, msg;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.getDeviceProperty('sys.boot_completed'));

              case 2:
                booted = context$2$0.sent;

                if (!(booted === '1')) {
                  context$2$0.next = 7;
                  break;
                }

                return context$2$0.abrupt('return');

              case 7:
                msg = 'Waiting for reboot. This takes time';

                _loggerJs2['default'].debug(msg);
                throw new Error(msg);

              case 10:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this5);
        }));

      case 23:
        context$1$0.prev = 23;

        this.unroot();
        return context$1$0.finish(23);

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0,, 23, 26], [1, 6]]);
};

/**
 * Switch adb server to root mode.
 *
 * @return {boolean} True of the switch was successful or false
 *                   if the switch failed.
 */
systemCallMethods.root = function callee$0$0() {
  var _ref4, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['root']));

      case 3:
        _ref4 = context$1$0.sent;
        stdout = _ref4.stdout;

        if (!(stdout && stdout.indexOf('adbd cannot run as root') !== -1)) {
          context$1$0.next = 7;
          break;
        }

        throw new Error(stdout.trim());

      case 7:
        return context$1$0.abrupt('return', true);

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to root adb daemon: \'' + context$1$0.t0.message + '\'. Continuing');
        return context$1$0.abrupt('return', false);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 10]]);
};

/**
 * Switch adb server to non-root mode.
 *
 * @return {boolean} True of the switch was successful or false
 *                   if the switch failed.
 */
systemCallMethods.unroot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['unroot']));

      case 3:
        return context$1$0.abrupt('return', true);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to unroot adb daemon: \'' + context$1$0.t0.message + '\'. Continuing');
        return context$1$0.abrupt('return', false);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

/**
 * Verify whether a remote path exists on the device under test.
 *
 * @param {string} remotePath - The remote path to verify.
 * @return {boolean} True if the given path exists on the device.
 */
systemCallMethods.fileExists = function callee$0$0(remotePath) {
  var files;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.ls(remotePath));

      case 2:
        files = context$1$0.sent;
        return context$1$0.abrupt('return', files.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the output of _ls_ command on the device under test.
 *
 * @param {string} remotePath - The remote path (the first argument to the _ls_ command).
 * @param {Array.<String>} opts [[]] - Additional _ls_ options.
 * @return {Array.<String>} The _ls_ output as an array of split lines.
 *                          An empty array is returned of the given _remotePath_
 *                          does not exist.
 */
systemCallMethods.ls = function callee$0$0(remotePath) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var args, stdout, lines;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        args = ['ls'].concat(_toConsumableArray(opts), [remotePath]);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 4:
        stdout = context$1$0.sent;
        lines = stdout.split("\n");
        return context$1$0.abrupt('return', lines.map(function (l) {
          return l.trim();
        }).filter(Boolean).filter(function (l) {
          return l.indexOf("No such file") === -1;
        }));

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!(context$1$0.t0.message.indexOf('No such file or directory') === -1)) {
          context$1$0.next = 13;
          break;
        }

        throw context$1$0.t0;

      case 13:
        return context$1$0.abrupt('return', []);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 9]]);
};

/**
 * Get the size of the particular file located on the device under test.
 *
 * @param {string} remotePath - The remote path to the file.
 * @return {number} File size in bytes.
 * @throws {Error} If there was an error while getting the size of the given file.
 */
systemCallMethods.fileSize = function callee$0$0(remotePath) {
  var files, match;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.ls(remotePath, ['-la']));

      case 3:
        files = context$1$0.sent;

        if (!(files.length !== 1)) {
          context$1$0.next = 6;
          break;
        }

        throw new Error('Remote path is not a file');

      case 6:
        match = /\s(\d+)\s+\d{4}-\d{2}-\d{2}/.exec(files[0]);

        if (!(!match || _lodash2['default'].isNaN(parseInt(match[1], 10)))) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unable to parse size from list output: \'' + files[0] + '\'');

      case 9:
        return context$1$0.abrupt('return', parseInt(match[1], 10));

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Unable to get file size for \'' + remotePath + '\': ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 12]]);
};

exports['default'] = systemCallMethods;
module.exports = exports['default'];

// get subpaths for currently installed build tool directories

// expecting adb devices to return output as
// List of devices attached
// emulator-5554	device

// cool down

// cool down

// The methods is used to remove telnet auth token
//

// cool down

// do nothing
// let the emu finish stopping;

// we don't want the stack trace, so no log.errorAndThrow

// on real devices in some situations we get an error in the stdout

// https://regex101.com/r/fOs4P4/3
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9zeXN0ZW0tY2FsbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7d0JBQ1AsY0FBYzs7Ozt3QkFDaEIsVUFBVTs7Ozs2QkFDRyxnQkFBZ0I7O3VCQUNSLFlBQVk7OzRCQUNkLGNBQWM7O3dCQUNILFVBQVU7O3NCQUN4QyxRQUFROzs7O0FBR3RCLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDOztBQUUzQixJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUN2QyxJQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRdEMsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsb0JBQWdCLFVBQVU7Ozs7QUFDN0QsOEJBQUksSUFBSSx1QkFBcUIsVUFBVSxpQkFBYyxDQUFDOzthQUNsRCxJQUFJLENBQUMsT0FBTzs7Ozs7O3lDQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7Ozs7OztBQUVwRCw4QkFBSSxJQUFJLENBQUMsMklBQ2tFLCtDQUN6QixVQUFVLE9BQUcsQ0FBQyxDQUFDOzt5Q0FDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7OztDQUNoRCxDQUFDOzs7Ozs7Ozs7QUFTRixpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsWUFBWTtBQUM5QyxTQUFPLHNCQUFPLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDL0MsQ0FBQzs7Ozs7Ozs7O0FBU0YsaUJBQWlCLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxVQUFVLEVBQUU7QUFDM0QsTUFBSSxDQUFDLHNCQUFPLFNBQVMsRUFBRSxFQUFFO0FBQ3ZCLFdBQU8sVUFBVSxDQUFDO0dBQ25COztBQUVELE1BQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFDakQsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENB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O2NBQ3BELENBQUMsS0FBSyxJQUFJLG9CQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7Ozs7O2NBQ3JDLElBQUksS0FBSywrQ0FBNEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFJOzs7NENBRWxFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7Ozs7QUFFN0IsOEJBQUksYUFBYSxvQ0FBaUMsVUFBVSxZQUFNLGVBQUksT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFcEYsQ0FBQzs7cUJBRWEsaUJBQWlCIiwiZmlsZSI6ImxpYi90b29scy9zeXN0ZW0tY2FsbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IHN5c3RlbSwgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBnZXRTZGtUb29sc1ZlcnNpb24gfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IGV4ZWMsIFN1YlByb2Nlc3MgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgc2xlZXAsIHJldHJ5LCByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG5sZXQgc3lzdGVtQ2FsbE1ldGhvZHMgPSB7fTtcblxuY29uc3QgREVGQVVMVF9BREJfRVhFQ19USU1FT1VUID0gMjAwMDA7IC8vIGluIG1pbGxpc2Vjb25kc1xuY29uc3QgREVGQVVMVF9BREJfUkVCT09UX1JFVFJJRVMgPSA5MDtcblxuLyoqXG4gKiBSZXRyaWV2ZSBmdWxsIHBhdGggdG8gdGhlIGdpdmVuIGJpbmFyeS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluYXJ5TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBiaW5hcnkuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEZ1bGwgcGF0aCB0byB0aGUgZ2l2ZW4gYmluYXJ5IGluY2x1ZGluZyBjdXJyZW50IFNESyByb290LlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRTZGtCaW5hcnlQYXRoID0gYXN5bmMgZnVuY3Rpb24gKGJpbmFyeU5hbWUpIHtcbiAgbG9nLmluZm8oYENoZWNraW5nIHdoZXRoZXIgJHtiaW5hcnlOYW1lfSBpcyBwcmVzZW50YCk7XG4gIGlmICh0aGlzLnNka1Jvb3QpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRCaW5hcnlGcm9tU2RrUm9vdChiaW5hcnlOYW1lKTtcbiAgfVxuICBsb2cud2FybihgVGhlIEFORFJPSURfSE9NRSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3Qgc2V0IHRvIHRoZSBBbmRyb2lkIFNESyBgICtcbiAgICAgICAgICAgYHJvb3QgZGlyZWN0b3J5IHBhdGguIEFORFJPSURfSE9NRSBpcyByZXF1aXJlZCBmb3IgY29tcGF0aWJpbGl0eSBgICtcbiAgICAgICAgICAgYHdpdGggU0RLIDIzKy4gQ2hlY2tpbmcgYWxvbmcgUEFUSCBmb3IgJHtiaW5hcnlOYW1lfS5gKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QmluYXJ5RnJvbVBhdGgoYmluYXJ5TmFtZSk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBuYW1lIG9mIHRoZSB0b29sLFxuICogd2hpY2ggcHJpbnRzIGZ1bGwgcGF0aCB0byB0aGUgZ2l2ZW4gY29tbWFuZCBzaG9ydGN1dC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IERlcGVuZGluZyBvbiB0aGUgY3VycmVudCBwbGF0Zm9ybSB0aGlzIGlzXG4gKiAgICAgICAgICAgICAgICAgIHN1cHBvc2VkIHRvIGJlIGVpdGhlciAnd2hpY2gnIG9yICd3aGVyZScuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmdldENvbW1hbmRGb3JPUyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHN5c3RlbS5pc1dpbmRvd3MoKSA/ICd3aGVyZScgOiAnd2hpY2gnO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBmdWxsIGJpbmFyeSBuYW1lIGZvciB0aGUgY3VycmVudCBvcGVyYXRpbmcgc3lzdGVtLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiaW5hcnlOYW1lIC0gc2ltcGxlIGJpbmFyeSBuYW1lLCBmb3IgZXhhbXBsZSAnYW5kcm9pZCcuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEZvcm1hdHRlZCBiaW5hcnkgbmFtZSBkZXBlbmRpbmcgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0sXG4gKiAgICAgICAgICAgICAgICAgIGZvciBleGFtcGxlLCAnYW5kcm9pZC5iYXQnIG9uIFdpbmRvd3MuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmdldEJpbmFyeU5hbWVGb3JPUyA9IGZ1bmN0aW9uIChiaW5hcnlOYW1lKSB7XG4gIGlmICghc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgcmV0dXJuIGJpbmFyeU5hbWU7XG4gIH1cblxuICBpZiAoWydhbmRyb2lkJywgJ2Fwa3NpZ25lciddLmluZGV4T2YoYmluYXJ5TmFtZSkgPj0gMCAmJlxuICAgICAgIWJpbmFyeU5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnLmJhdCcpKSB7XG4gICAgcmV0dXJuIGAke2JpbmFyeU5hbWV9LmJhdGA7XG4gIH1cbiAgaWYgKCFiaW5hcnlOYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoJy5leGUnKSkge1xuICAgIHJldHVybiBgJHtiaW5hcnlOYW1lfS5leGVgO1xuICB9XG4gIHJldHVybiBiaW5hcnlOYW1lO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBmdWxsIHBhdGggdG8gdGhlIGdpdmVuIGJpbmFyeS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluYXJ5TmFtZSAtIFNpbXBsZSBuYW1lIG9mIGEgYmluYXJ5IGZpbGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEZ1bGwgcGF0aCB0byB0aGUgZ2l2ZW4gYmluYXJ5LiBUaGUgbWV0aG9kIHRyaWVzXG4gKiAgICAgICAgICAgICAgICAgIHRvIGVudW1lcmF0ZSBhbGwgdGhlIGtub3duIGxvY2F0aW9ucyB3aGVyZSB0aGUgYmluYXJ5XG4gKiAgICAgICAgICAgICAgICAgIG1pZ2h0IGJlIGxvY2F0ZWQgYW5kIHN0b3BzIHRoZSBzZWFyY2ggYXMgc29vbiBhcyB0aGUgZmlyc3RcbiAqICAgICAgICAgICAgICAgICAgbWF0Y2ggaXMgZm91bmQgb24gdGhlIGxvY2FsIGZpbGUgc3lzdGVtLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBiaW5hcnkgd2l0aCBnaXZlbiBuYW1lIGlzIG5vdCBwcmVzZW50IGF0IGFueVxuICogICAgICAgICAgICAgICAgIG9mIGtub3duIGxvY2F0aW9ucyBvciBBbmRyb2lkIFNESyBpcyBub3QgaW5zdGFsbGVkIG9uIHRoZVxuICogICAgICAgICAgICAgICAgIGxvY2FsIGZpbGUgc3lzdGVtLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRCaW5hcnlGcm9tU2RrUm9vdCA9IF8ubWVtb2l6ZShhc3luYyBmdW5jdGlvbiAoYmluYXJ5TmFtZSkge1xuICBsZXQgYmluYXJ5TG9jID0gbnVsbDtcbiAgYmluYXJ5TmFtZSA9IHRoaXMuZ2V0QmluYXJ5TmFtZUZvck9TKGJpbmFyeU5hbWUpO1xuICBsZXQgYmluYXJ5TG9jcyA9IFtwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcInBsYXRmb3JtLXRvb2xzXCIsIGJpbmFyeU5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcImVtdWxhdG9yXCIsIGJpbmFyeU5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcInRvb2xzXCIsIGJpbmFyeU5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcInRvb2xzXCIsIFwiYmluXCIsIGJpbmFyeU5hbWUpXTtcbiAgLy8gZ2V0IHN1YnBhdGhzIGZvciBjdXJyZW50bHkgaW5zdGFsbGVkIGJ1aWxkIHRvb2wgZGlyZWN0b3JpZXNcblxuICBsZXQgYnVpbGRUb29sRGlycyA9IGF3YWl0IGZzLmdsb2IocGF0aC5yZXNvbHZlKHRoaXMuc2RrUm9vdCwgJ2J1aWxkLXRvb2xzJywgJyonKSArIHBhdGguc2VwLCB7YWJzb2x1dGU6IHRydWV9KTtcbiAgaWYgKGJ1aWxkVG9vbERpcnMubGVuZ3RoKSB7XG4gICAgY29uc3QgcGFpcnMgPSBhd2FpdCBCLm1hcChidWlsZFRvb2xEaXJzLCBhc3luYyAoZGlyKSA9PiBbKGF3YWl0IGZzLnN0YXQoZGlyKSkubXRpbWVNcywgZGlyXSk7XG4gICAgYnVpbGRUb29sRGlycyA9IHBhaXJzXG4gICAgICAuc29ydCgoYSwgYikgPT4gYVswXSA+IGJbMF0pXG4gICAgICAubWFwKChwYWlyKSA9PiBwYWlyWzFdKTtcbiAgICBsb2cuaW5mbyhgRm91bmQgdGhlIGZvbGxvd2luZyAnYnVpbGQtdG9vbHMnIGZvbGRlcnMgKG5ld2VzdCBmaXJzdCk6YCk7XG4gICAgbG9nLmluZm8oYCAgICAke2J1aWxkVG9vbERpcnMuam9pbignXFxuICAgICcpfWApO1xuICAgIF8uZm9yRWFjaChidWlsZFRvb2xEaXJzLCAoZGlyKSA9PiBiaW5hcnlMb2NzLnB1c2gocGF0aC5yZXNvbHZlKGRpciwgYmluYXJ5TmFtZSkpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2cuaW5mbyhgRm91bmQgemVybyAnYnVpbGQtdG9vbHMnIGZvbGRlcnNgKTtcbiAgfVxuICBmb3IgKGxldCBsb2Mgb2YgYmluYXJ5TG9jcykge1xuICAgIGlmIChhd2FpdCBmcy5leGlzdHMobG9jKSkge1xuICAgICAgYmluYXJ5TG9jID0gbG9jO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChfLmlzTnVsbChiaW5hcnlMb2MpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke2JpbmFyeU5hbWV9IGluICR7YmluYXJ5TG9jc30uIGAgK1xuICAgICAgICAgICAgICAgICAgICBgRG8geW91IGhhdmUgdGhlIEFuZHJvaWQgU0RLIGluc3RhbGxlZCBhdCAnJHt0aGlzLnNka1Jvb3R9Jz9gKTtcbiAgfVxuICBiaW5hcnlMb2MgPSBiaW5hcnlMb2MudHJpbSgpO1xuICBsb2cuaW5mbyhgVXNpbmcgJHtiaW5hcnlOYW1lfSBmcm9tICR7YmluYXJ5TG9jfWApO1xuICByZXR1cm4gYmluYXJ5TG9jO1xufSk7XG5cbi8qKlxuICogUmV0cmlldmUgZnVsbCBwYXRoIHRvIGEgYmluYXJ5IGZpbGUgdXNpbmcgdGhlIHN0YW5kYXJkIHN5c3RlbSBsb29rdXAgdG9vbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluYXJ5TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBiaW5hcnkuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEZ1bGwgcGF0aCB0byB0aGUgYmluYXJ5IHJlY2VpdmVkIGZyb20gJ3doaWNoJy8nd2hlcmUnXG4gKiAgICAgICAgICAgICAgICAgIG91dHB1dC5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBsb29rdXAgdG9vbCByZXR1cm5zIG5vbi16ZXJvIHJldHVybiBjb2RlLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRCaW5hcnlGcm9tUGF0aCA9IGFzeW5jIGZ1bmN0aW9uIChiaW5hcnlOYW1lKSB7XG4gIGxldCBiaW5hcnlMb2MgPSBudWxsO1xuICBsZXQgY21kID0gdGhpcy5nZXRDb21tYW5kRm9yT1MoKTtcbiAgdHJ5IHtcbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKGNtZCwgW2JpbmFyeU5hbWVdKTtcbiAgICBsb2cuaW5mbyhgVXNpbmcgJHtiaW5hcnlOYW1lfSBmcm9tICR7c3Rkb3V0fWApO1xuICAgIC8vIFRPRE8gd3JpdGUgYSB0ZXN0IGZvciBiaW5hcmllcyB3aXRoIHNwYWNlcy5cbiAgICBiaW5hcnlMb2MgPSBzdGRvdXQudHJpbSgpO1xuICAgIHJldHVybiBiaW5hcnlMb2M7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgJHtiaW5hcnlOYW1lfSBQbGVhc2Ugc2V0IHRoZSBBTkRST0lEX0hPTUUgYCArXG4gICAgICAgICAgICAgIGBlbnZpcm9ubWVudCB2YXJpYWJsZSB3aXRoIHRoZSBBbmRyb2lkIFNESyByb290IGRpcmVjdG9yeSBwYXRoLmApO1xuICB9XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IERldmljZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVkaWQgLSBUaGUgZGV2aWNlIHVkaWQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3RhdGUgLSBDdXJyZW50IGRldmljZSBzdGF0ZSwgYXMgaXQgaXMgdmlzaWJsZSBpblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FkYiBkZXZpY2VzIC1sXyBvdXRwdXQuXG4gKi9cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgbGlzdCBvZiBkZXZpY2VzIHZpc2libGUgdG8gYWRiLlxuICpcbiAqIEByZXR1cm4ge0FycmF5LjxEZXZpY2U+fSBUaGUgbGlzdCBvZiBkZXZpY2VzIG9yIGFuIGVtcHR5IGxpc3QgaWZcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBubyBkZXZpY2VzIGFyZSBjb25uZWN0ZWQuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGxpc3RpbmcgZGV2aWNlcy5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0Q29ubmVjdGVkRGV2aWNlcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nLmRlYnVnKFwiR2V0dGluZyBjb25uZWN0ZWQgZGV2aWNlcy4uLlwiKTtcbiAgdHJ5IHtcbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MuY29uY2F0KFsnZGV2aWNlcyddKSk7XG4gICAgLy8gZXhwZWN0aW5nIGFkYiBkZXZpY2VzIHRvIHJldHVybiBvdXRwdXQgYXNcbiAgICAvLyBMaXN0IG9mIGRldmljZXMgYXR0YWNoZWRcbiAgICAvLyBlbXVsYXRvci01NTU0XHRkZXZpY2VcbiAgICBsZXQgc3RhcnRpbmdJbmRleCA9IHN0ZG91dC5pbmRleE9mKFwiTGlzdCBvZiBkZXZpY2VzXCIpO1xuICAgIGlmIChzdGFydGluZ0luZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIG91dHB1dCB3aGlsZSB0cnlpbmcgdG8gZ2V0IGRldmljZXMuIG91dHB1dCB3YXM6ICR7c3Rkb3V0fWApO1xuICAgIH1cbiAgICAvLyBzbGljaW5nIG91cHV0IHdlIGNhcmUgYWJvdXQuXG4gICAgc3Rkb3V0ID0gc3Rkb3V0LnNsaWNlKHN0YXJ0aW5nSW5kZXgpO1xuICAgIGxldCBkZXZpY2VzID0gW107XG4gICAgZm9yIChsZXQgbGluZSBvZiBzdGRvdXQuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgIGlmIChsaW5lLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgIGxpbmUuaW5kZXhPZihcIkxpc3Qgb2YgZGV2aWNlc1wiKSA9PT0gLTEgJiZcbiAgICAgICAgICBsaW5lLmluZGV4T2YoXCJhZGIgc2VydmVyXCIpID09PSAtMSAmJlxuICAgICAgICAgIGxpbmUuaW5kZXhPZihcIiogZGFlbW9uXCIpID09PSAtMSAmJlxuICAgICAgICAgIGxpbmUuaW5kZXhPZihcIm9mZmxpbmVcIikgPT09IC0xKSB7XG4gICAgICAgIGxldCBsaW5lSW5mbyA9IGxpbmUuc3BsaXQoXCJcXHRcIik7XG4gICAgICAgIC8vIHN0YXRlIGlzIGVpdGhlciBcImRldmljZVwiIG9yIFwib2ZmbGluZVwiLCBhZmFpY3RcbiAgICAgICAgZGV2aWNlcy5wdXNoKHt1ZGlkOiBsaW5lSW5mb1swXSwgc3RhdGU6IGxpbmVJbmZvWzFdfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhgJHtkZXZpY2VzLmxlbmd0aH0gZGV2aWNlKHMpIGNvbm5lY3RlZGApO1xuICAgIHJldHVybiBkZXZpY2VzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIHdoaWxlIGdldHRpbmcgY29ubmVjdGVkIGRldmljZXMuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgbGlzdCBvZiBkZXZpY2VzIHZpc2libGUgdG8gYWRiIHdpdGhpbiB0aGUgZ2l2ZW4gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dE1zIC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBnZXQgYXQgbGVhc3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmUgbGlzdCBpdGVtLlxuICogQHJldHVybiB7QXJyYXkuPERldmljZT59IFRoZSBsaXN0IG9mIGNvbm5lY3RlZCBkZXZpY2VzLlxuICogQHRocm93cyB7RXJyb3J9IElmIG5vIGNvbm5lY3RlZCBkZXZpY2VzIGNhbiBiZSBkZXRlY3RlZCB3aXRoaW4gdGhlIGdpdmVuIHRpbWVvdXQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmdldERldmljZXNXaXRoUmV0cnkgPSBhc3luYyBmdW5jdGlvbiAodGltZW91dE1zID0gMjAwMDApIHtcbiAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgbG9nLmRlYnVnKFwiVHJ5aW5nIHRvIGZpbmQgYSBjb25uZWN0ZWQgYW5kcm9pZCBkZXZpY2VcIik7XG4gIGxldCBnZXREZXZpY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICgoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+IHRpbWVvdXRNcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYSBjb25uZWN0ZWQgQW5kcm9pZCBkZXZpY2UuXCIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbGV0IGRldmljZXMgPSBhd2FpdCB0aGlzLmdldENvbm5lY3RlZERldmljZXMoKTtcbiAgICAgIGlmIChkZXZpY2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgbG9nLmRlYnVnKFwiQ291bGQgbm90IGZpbmQgZGV2aWNlcywgcmVzdGFydGluZyBhZGIgc2VydmVyLi4uXCIpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlc3RhcnRBZGIoKTtcbiAgICAgICAgLy8gY29vbCBkb3duXG4gICAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG4gICAgICAgIHJldHVybiBhd2FpdCBnZXREZXZpY2VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGV2aWNlcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuZGVidWcoXCJDb3VsZCBub3QgZmluZCBkZXZpY2VzLCByZXN0YXJ0aW5nIGFkYiBzZXJ2ZXIuLi5cIik7XG4gICAgICBhd2FpdCB0aGlzLnJlc3RhcnRBZGIoKTtcbiAgICAgIC8vIGNvb2wgZG93blxuICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcbiAgICAgIHJldHVybiBhd2FpdCBnZXREZXZpY2VzKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gYXdhaXQgZ2V0RGV2aWNlcygpO1xufTtcblxuLyoqXG4gKiBSZXN0YXJ0IGFkYiBzZXJ2ZXIgaWYgX3RoaXMuc3VwcHJlc3NLaWxsU2VydmVyXyBwcm9wZXJ0eSBpcyB0cnVlLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5yZXN0YXJ0QWRiID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdXBwcmVzc0tpbGxTZXJ2ZXIpIHtcbiAgICBsb2cuZGVidWcoYE5vdCByZXN0YXJ0aW5nIGFiZCBzaW5jZSAnc3VwcHJlc3NLaWxsU2VydmVyJyBpcyBvbmApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZy5kZWJ1ZygnUmVzdGFydGluZyBhZGInKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0aGlzLmtpbGxTZXJ2ZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvcihcIkVycm9yIGtpbGxpbmcgQURCIHNlcnZlciwgZ29pbmcgdG8gc2VlIGlmIGl0J3Mgb25saW5lIGFueXdheVwiKTtcbiAgfVxufTtcblxuLyoqXG4gKiBLaWxsIGFkYiBzZXJ2ZXIuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmtpbGxTZXJ2ZXIgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5kZWJ1ZyhgS2lsbGluZyBhZGIgc2VydmVyIG9uIHBvcnQgJHt0aGlzLmFkYlBvcnR9YCk7XG4gIGF3YWl0IGV4ZWModGhpcy5leGVjdXRhYmxlLnBhdGgsIFsuLi50aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MsICdraWxsLXNlcnZlciddKTtcbn07XG5cbi8qKlxuICogUmVzZXQgVGVsbmV0IGF1dGhlbnRpY2F0aW9uIHRva2VuLlxuICogQHNlZSB7QGxpbmsgaHR0cDovL3Rvb2xzLmFuZHJvaWQuY29tL3JlY2VudC9lbXVsYXRvcjI1MTZyZWxlYXNlbm90ZXN9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IElmIHRva2VuIHJlc2V0IHdhcyBzdWNjZXNzZnVsLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5yZXNldFRlbG5ldEF1dGhUb2tlbiA9IF8ubWVtb2l6ZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8vIFRoZSBtZXRob2RzIGlzIHVzZWQgdG8gcmVtb3ZlIHRlbG5ldCBhdXRoIHRva2VuXG4gIC8vXG4gIGNvbnN0IGhvbWVGb2xkZXJQYXRoID0gcHJvY2Vzcy5lbnZbKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpID8gJ1VTRVJQUk9GSUxFJyA6ICdIT01FJ107XG4gIGlmICghaG9tZUZvbGRlclBhdGgpIHtcbiAgICBsb2cud2FybignQ2Fubm90IGZpbmQgdGhlIHBhdGggdG8gdXNlciBob21lIGZvbGRlci4gSWdub3JpbmcgcmVzZXR0aW5nIG9mIGVtdWxhdG9yXFwncyB0ZWxuZXQgYXV0aGVudGljYXRpb24gdG9rZW4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgZHN0UGF0aCA9IHBhdGgucmVzb2x2ZShob21lRm9sZGVyUGF0aCwgJy5lbXVsYXRvcl9jb25zb2xlX2F1dGhfdG9rZW4nKTtcbiAgbG9nLmRlYnVnKGBPdmVycmlkaW5nICR7ZHN0UGF0aH0gd2l0aCBhbiBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgdGVsbmV0IGF1dGhlbnRpY2F0aW9uIGZvciBlbXVsYXRvciBjb21tYW5kc2ApO1xuICB0cnkge1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShkc3RQYXRoLCAnJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cud2FybihgRXJyb3IgJHtlLm1lc3NhZ2V9IHdoaWxlIHJlc2V0dGluZyB0aGUgY29udGVudCBvZiAke2RzdFBhdGh9LiBJZ25vcmluZyByZXNldHRpbmcgb2YgZW11bGF0b3JcXCdzIHRlbG5ldCBhdXRoZW50aWNhdGlvbiB0b2tlbmApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG4vKipcbiAqIEV4ZWN1dGUgdGhlIGdpdmVuIGVtdWxhdG9yIGNvbW1hbmQgdXNpbmcgX2FkYiBlbXVfIHRvb2wuXG4gKlxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY21kIC0gVGhlIGFycmF5IG9mIHJlc3QgY29tbWFuZCBsaW5lIHBhcmFtZXRlcnMuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmFkYkV4ZWNFbXUgPSBhc3luYyBmdW5jdGlvbiAoY21kKSB7XG4gIGF3YWl0IHRoaXMudmVyaWZ5RW11bGF0b3JDb25uZWN0ZWQoKTtcbiAgYXdhaXQgdGhpcy5yZXNldFRlbG5ldEF1dGhUb2tlbigpO1xuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydlbXUnLCAuLi5jbWRdKTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZSB0aGUgZ2l2ZW4gYWRiIGNvbW1hbmQuXG4gKlxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY21kIC0gVGhlIGFycmF5IG9mIHJlc3QgY29tbWFuZCBsaW5lIHBhcmFtZXRlcnNcbiAqICAgICAgICAgICAgICAgICAgICAgIG9yIGEgc2luZ2xlIHN0cmluZyBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIEFkZGl0aW9uYWwgb3B0aW9ucyBtYXBwaW5nLiBTZWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hcHBpdW0vbm9kZS10ZWVuX3Byb2Nlc3N9XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gQ29tbWFuZCdzIHN0ZG91dC5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY29tbWFuZCByZXR1cm5lZCBub24temVybyBleGl0IGNvZGUuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmFkYkV4ZWMgPSBhc3luYyBmdW5jdGlvbiAoY21kLCBvcHRzID0ge30pIHtcbiAgaWYgKCFjbWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbmVlZCB0byBwYXNzIGluIGEgY29tbWFuZCB0byBhZGJFeGVjKClcIik7XG4gIH1cbiAgLy8gc2V0dGluZyBkZWZhdWx0IHRpbWVvdXQgZm9yIGVhY2ggY29tbWFuZCB0byBwcmV2ZW50IGluZmluaXRlIHdhaXQuXG4gIG9wdHMudGltZW91dCA9IG9wdHMudGltZW91dCB8fCBERUZBVUxUX0FEQl9FWEVDX1RJTUVPVVQ7XG4gIGxldCBleGVjRnVuYyA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgbGlua2VyV2FybmluZ1JlID0gL15XQVJOSU5HOiBsaW5rZXIuKyQvbTtcbiAgICB0cnkge1xuICAgICAgaWYgKCEoY21kIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIGNtZCA9IFtjbWRdO1xuICAgICAgfVxuICAgICAgbGV0IGFyZ3MgPSB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MuY29uY2F0KGNtZCk7XG4gICAgICBsb2cuZGVidWcoYFJ1bm5pbmcgJyR7dGhpcy5leGVjdXRhYmxlLnBhdGh9JyB3aXRoIGFyZ3M6IGAgK1xuICAgICAgICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KGFyZ3MpfWApO1xuICAgICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgYXJncywgb3B0cyk7XG4gICAgICAvLyBzb21ldGltZXMgQURCIHByaW50cyBvdXQgd2VpcmQgc3Rkb3V0IHdhcm5pbmdzIHRoYXQgd2UgZG9uJ3Qgd2FudFxuICAgICAgLy8gdG8gaW5jbHVkZSBpbiBhbnkgb2YgdGhlIHJlc3BvbnNlIGRhdGEsIHNvIGxldCdzIHN0cmlwIGl0IG91dFxuICAgICAgc3Rkb3V0ID0gc3Rkb3V0LnJlcGxhY2UobGlua2VyV2FybmluZ1JlLCAnJykudHJpbSgpO1xuICAgICAgcmV0dXJuIHN0ZG91dDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsZXQgcHJvdG9jb2xGYXVsdEVycm9yID0gbmV3IFJlZ0V4cChcInByb3RvY29sIGZhdWx0IFxcXFwobm8gc3RhdHVzXFxcXClcIiwgXCJpXCIpLnRlc3QoZSk7XG4gICAgICBsZXQgZGV2aWNlTm90Rm91bmRFcnJvciA9IG5ldyBSZWdFeHAoXCJlcnJvcjogZGV2aWNlICgnLisnICk/bm90IGZvdW5kXCIsIFwiaVwiKS50ZXN0KGUpO1xuICAgICAgaWYgKHByb3RvY29sRmF1bHRFcnJvciB8fCBkZXZpY2VOb3RGb3VuZEVycm9yKSB7XG4gICAgICAgIGxvZy5pbmZvKGBFcnJvciBzZW5kaW5nIGNvbW1hbmQsIHJlY29ubmVjdGluZyBkZXZpY2UgYW5kIHJldHJ5aW5nOiAke2NtZH1gKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0RGV2aWNlc1dpdGhSZXRyeSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS5jb2RlID09PSAwICYmIGUuc3Rkb3V0KSB7XG4gICAgICAgIGxldCBzdGRvdXQgPSBlLnN0ZG91dDtcbiAgICAgICAgc3Rkb3V0ID0gc3Rkb3V0LnJlcGxhY2UobGlua2VyV2FybmluZ1JlLCAnJykudHJpbSgpO1xuICAgICAgICByZXR1cm4gc3Rkb3V0O1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGV4ZWN1dGluZyBhZGJFeGVjLiBPcmlnaW5hbCBlcnJvcjogJyR7ZS5tZXNzYWdlfSc7IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFN0ZGVycjogJyR7KGUuc3RkZXJyIHx8ICcnKS50cmltKCl9JzsgQ29kZTogJyR7ZS5jb2RlfSdgKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhd2FpdCByZXRyeSgyLCBleGVjRnVuYyk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGUgdGhlIGdpdmVuIGNvbW1hbmQgdXNpbmcgX2FkYiBzaGVsbF8gcHJlZml4LlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz58c3RyaW5nfSBjbWQgLSBUaGUgYXJyYXkgb2YgcmVzdCBjb21tYW5kIGxpbmUgcGFyYW1ldGVycyBvciBhIHNpbmdsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIEFkZGl0aW9uYWwgb3B0aW9ucyBtYXBwaW5nLiBTZWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hcHBpdW0vbm9kZS10ZWVuX3Byb2Nlc3N9XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gQ29tbWFuZCdzIHN0ZG91dC5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY29tbWFuZCByZXR1cm5lZCBub24temVybyBleGl0IGNvZGUuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLnNoZWxsID0gYXN5bmMgZnVuY3Rpb24gKGNtZCwgb3B0cyA9IHt9KSB7XG4gIGlmICghYXdhaXQgdGhpcy5pc0RldmljZUNvbm5lY3RlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBkZXZpY2UgY29ubmVjdGVkLCBjYW5ub3QgcnVuIGFkYiBzaGVsbCBjb21tYW5kICcke2NtZC5qb2luKCcgJyl9J2ApO1xuICB9XG4gIGxldCBleGVjQ21kID0gWydzaGVsbCddO1xuICBpZiAoY21kIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBleGVjQ21kID0gZXhlY0NtZC5jb25jYXQoY21kKTtcbiAgfSBlbHNlIHtcbiAgICBleGVjQ21kLnB1c2goY21kKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpcy5hZGJFeGVjKGV4ZWNDbWQsIG9wdHMpO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuY3JlYXRlU3ViUHJvY2VzcyA9IGZ1bmN0aW9uIChhcmdzID0gW10pIHtcbiAgLy8gYWRkIHRoZSBkZWZhdWx0IGFyZ3VtZW50c1xuICBhcmdzID0gdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLmNvbmNhdChhcmdzKTtcbiAgbG9nLmRlYnVnKGBDcmVhdGluZyBBREIgc3VicHJvY2VzcyB3aXRoIGFyZ3M6ICR7SlNPTi5zdHJpbmdpZnkoYXJncyl9YCk7XG4gIHJldHVybiBuZXcgU3ViUHJvY2Vzcyh0aGlzLmdldEFkYlBhdGgoKSwgYXJncyk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBjdXJyZW50IGFkYiBwb3J0LlxuICogQHRvZG8gY2FuIHByb2JhYmx5IGRlcHJlY2F0ZSB0aGlzIG5vdyB0aGF0IHRoZSBsb2dpYyBpcyBqdXN0IHRvIHJlYWQgdGhpcy5hZGJQb3J0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjdXJyZW50IGFkYiBwb3J0IG51bWJlci5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0QWRiU2VydmVyUG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYWRiUG9ydDtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGN1cnJlbnQgZW11bGF0b3IgcG9ydCBmcm9tIF9hZGIgZGV2aXZlc18gb3V0cHV0LlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGN1cnJlbnQgZW11bGF0b3IgcG9ydC5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGVyZSBhcmUgbm8gY29ubmVjdGVkIGRldmljZXMuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmdldEVtdWxhdG9yUG9ydCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nLmRlYnVnKFwiR2V0dGluZyBydW5uaW5nIGVtdWxhdG9yIHBvcnRcIik7XG4gIGlmICh0aGlzLmVtdWxhdG9yUG9ydCAhPT0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmVtdWxhdG9yUG9ydDtcbiAgfVxuICB0cnkge1xuICAgIGxldCBkZXZpY2VzID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XG4gICAgbGV0IHBvcnQgPSB0aGlzLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcoZGV2aWNlc1swXS51ZGlkKTtcbiAgICBpZiAocG9ydCkge1xuICAgICAgcmV0dXJuIHBvcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRW11bGF0b3IgcG9ydCBub3QgZm91bmRgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgTm8gZGV2aWNlcyBjb25uZWN0ZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgY3VycmVudCBlbXVsYXRvciBwb3J0IGJ5IHBhcnNpbmcgZW11bGF0b3IgbmFtZSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVtU3RyIC0gRW11bGF0b3IgbmFtZSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ8Ym9vbGVhbn0gRWl0aGVyIHRoZSBjdXJyZW50IGVtdWxhdG9yIHBvcnQgb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBfZmFsc2VfIGlmIHBvcnQgbnVtYmVyIGNhbm5vdCBiZSBwYXJzZWQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcgPSBmdW5jdGlvbiAoZW1TdHIpIHtcbiAgbGV0IHBvcnRQYXR0ZXJuID0gL2VtdWxhdG9yLShcXGQrKS87XG4gIGlmIChwb3J0UGF0dGVybi50ZXN0KGVtU3RyKSkge1xuICAgIHJldHVybiBwYXJzZUludChwb3J0UGF0dGVybi5leGVjKGVtU3RyKVsxXSwgMTApO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgY3VycmVudGx5IGNvbm5lY3RlZCBlbXVsYXRvcnMuXG4gKlxuICogQHJldHVybiB7QXJyYXkuPERldmljZT59IFRoZSBsaXN0IG9mIGNvbm5lY3RlZCBkZXZpY2VzLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRDb25uZWN0ZWRFbXVsYXRvcnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgbG9nLmRlYnVnKFwiR2V0dGluZyBjb25uZWN0ZWQgZW11bGF0b3JzXCIpO1xuICAgIGxldCBkZXZpY2VzID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XG4gICAgbGV0IGVtdWxhdG9ycyA9IFtdO1xuICAgIGZvciAobGV0IGRldmljZSBvZiBkZXZpY2VzKSB7XG4gICAgICBsZXQgcG9ydCA9IHRoaXMuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyhkZXZpY2UudWRpZCk7XG4gICAgICBpZiAocG9ydCkge1xuICAgICAgICBkZXZpY2UucG9ydCA9IHBvcnQ7XG4gICAgICAgIGVtdWxhdG9ycy5wdXNoKGRldmljZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhgJHtlbXVsYXRvcnMubGVuZ3RofSBlbXVsYXRvcihzKSBjb25uZWN0ZWRgKTtcbiAgICByZXR1cm4gZW11bGF0b3JzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZW11bGF0b3JzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0IF9lbXVsYXRvclBvcnRfIHByb3BlcnR5IG9mIHRoZSBjdXJyZW50IGNsYXNzLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbVBvcnQgLSBUaGUgZW11bGF0b3IgcG9ydCB0byBiZSBzZXQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLnNldEVtdWxhdG9yUG9ydCA9IGZ1bmN0aW9uIChlbVBvcnQpIHtcbiAgdGhpcy5lbXVsYXRvclBvcnQgPSBlbVBvcnQ7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgaWRlbnRpZmllciBvZiB0aGUgY3VycmVudCBkZXZpY2UgKF90aGlzLmN1ckRldmljZUlkXykuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IC0gVGhlIGRldmljZSBpZGVudGlmaWVyLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5zZXREZXZpY2VJZCA9IGZ1bmN0aW9uIChkZXZpY2VJZCkge1xuICBsb2cuZGVidWcoYFNldHRpbmcgZGV2aWNlIGlkIHRvICR7ZGV2aWNlSWR9YCk7XG4gIHRoaXMuY3VyRGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgbGV0IGFyZ3NIYXNEZXZpY2UgPSB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MuaW5kZXhPZignLXMnKTtcbiAgaWYgKGFyZ3NIYXNEZXZpY2UgIT09IC0xKSB7XG4gICAgLy8gcmVtb3ZlIHRoZSBvbGQgZGV2aWNlIGlkIGZyb20gdGhlIGFyZ3VtZW50c1xuICAgIHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5zcGxpY2UoYXJnc0hhc0RldmljZSwgMik7XG4gIH1cbiAgdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLnB1c2goJy1zJywgZGV2aWNlSWQpO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIHRoZSBjdXJyZW50IGRldmljZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtEZXZpY2V9IGRldmljZU9iaiAtIFRoZSBkZXZpY2Ugb2JqZWN0IHRvIGJlIHNldC5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuc2V0RGV2aWNlID0gZnVuY3Rpb24gKGRldmljZU9iaikge1xuICBsZXQgZGV2aWNlSWQgPSBkZXZpY2VPYmoudWRpZDtcbiAgbGV0IGVtUG9ydCA9IHRoaXMuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyhkZXZpY2VJZCk7XG4gIHRoaXMuc2V0RW11bGF0b3JQb3J0KGVtUG9ydCk7XG4gIHRoaXMuc2V0RGV2aWNlSWQoZGV2aWNlSWQpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIG9iamVjdCBmb3IgdGhlIGN1cnJlbnRseSBydW5uaW5nIGVtdWxhdG9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gRW11bGF0b3IgbmFtZS5cbiAqIEByZXR1cm4gez9EZXZpY2V9IEN1cnJlbnRseSBydW5uaW5nIGVtdWxhdG9yIG9yIF9udWxsXy5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UnVubmluZ0FWRCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lKSB7XG4gIHRyeSB7XG4gICAgbG9nLmRlYnVnKGBUcnlpbmcgdG8gZmluZCAke2F2ZE5hbWV9IGVtdWxhdG9yYCk7XG4gICAgbGV0IGVtdWxhdG9ycyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRW11bGF0b3JzKCk7XG4gICAgZm9yIChsZXQgZW11bGF0b3Igb2YgZW11bGF0b3JzKSB7XG4gICAgICB0aGlzLnNldEVtdWxhdG9yUG9ydChlbXVsYXRvci5wb3J0KTtcbiAgICAgIGxldCBydW5uaW5nQVZETmFtZSA9IGF3YWl0IHRoaXMuc2VuZFRlbG5ldENvbW1hbmQoXCJhdmQgbmFtZVwiKTtcbiAgICAgIGlmIChhdmROYW1lID09PSBydW5uaW5nQVZETmFtZSkge1xuICAgICAgICBsb2cuZGVidWcoYEZvdW5kIGVtdWxhdG9yICR7YXZkTmFtZX0gaW4gcG9ydCAke2VtdWxhdG9yLnBvcnR9YCk7XG4gICAgICAgIHRoaXMuc2V0RGV2aWNlSWQoZW11bGF0b3IudWRpZCk7XG4gICAgICAgIHJldHVybiBlbXVsYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nLmRlYnVnKGBFbXVsYXRvciAke2F2ZE5hbWV9IG5vdCBydW5uaW5nYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZ2V0dGluZyBBVkQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgdGhlIG9iamVjdCBmb3IgdGhlIGN1cnJlbnRseSBydW5uaW5nIGVtdWxhdG9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gRW11bGF0b3IgbmFtZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0TXMgWzIwMDAwXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBtaWxsaXNlY29uZHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHdhaXQgdW50aWwgYXQgbGVhc3Qgb25lIHJ1bm5pbmcgQVZEIG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGV0ZWN0ZWQuXG4gKiBAcmV0dXJuIHs/RGV2aWNlfSBDdXJyZW50bHkgcnVubmluZyBlbXVsYXRvciBvciBfbnVsbF8uXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgbm8gZGV2aWNlIGhhcyBiZWVuIGRldGVjdGVkIHdpdGhpbiB0aGUgdGltZW91dC5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UnVubmluZ0FWRFdpdGhSZXRyeSA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lLCB0aW1lb3V0TXMgPSAyMDAwMCkge1xuICB0cnkge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgd2hpbGUgKChEYXRlLm5vdygpIC0gc3RhcnQpIDwgdGltZW91dE1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgcnVubmluZ0FWRCA9IGF3YWl0IHRoaXMuZ2V0UnVubmluZ0FWRChhdmROYW1lLnJlcGxhY2UoJ0AnLCAnJykpO1xuICAgICAgICBpZiAocnVubmluZ0FWRCkge1xuICAgICAgICAgIHJldHVybiBydW5uaW5nQVZEO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcuXG4gICAgICAgIGxvZy5pbmZvKGBDb3VsZG4ndCBnZXQgcnVubmluZyBBVkQsIHdpbGwgcmV0cnkuIEVycm9yIHdhczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICAvLyBjb29sIGRvd25cbiAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG4gICAgfVxuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCAke2F2ZE5hbWV9IGVtdWxhdG9yLmApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgQVZEIHdpdGggcmV0cnkuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTaHV0ZG93biBhbGwgcnVubmluZyBlbXVsYXRvcnMgYnkga2lsbGluZyB0aGVpciBwcm9jZXNzZXMuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IElmIGtpbGxpbmcgdG9vbCByZXR1cm5lZCBub24temVybyByZXR1cm4gY29kZS5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMua2lsbEFsbEVtdWxhdG9ycyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNtZCwgYXJncztcbiAgaWYgKHN5c3RlbS5pc1dpbmRvd3MoKSkge1xuICAgIGNtZCA9ICdUQVNLS0lMTCc7XG4gICAgYXJncyA9IFsnVEFTS0tJTEwnLCAnL0lNJywgJ2VtdWxhdG9yLmV4ZSddO1xuICB9IGVsc2Uge1xuICAgIGNtZCA9ICcvdXNyL2Jpbi9raWxsYWxsJztcbiAgICBhcmdzID0gWyctbScsICdlbXVsYXRvcionXTtcbiAgfVxuICB0cnkge1xuICAgIGF3YWl0IGV4ZWMoY21kLCBhcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBraWxsaW5nIGVtdWxhdG9ycy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG4vKipcbiAqIEtpbGwgZW11bGF0b3Igd2l0aCB0aGUgZ2l2ZW4gbmFtZS4gTm8gZXJyb3JcbiAqIGlzIHRocm93biBpcyBnaXZlbiBhdmQgZG9lcyBub3QgZXhpc3QvaXMgbm90IHJ1bm5pbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGF2ZE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZW11bGF0b3IgdG8gYmUga2lsbGVkLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5raWxsRW11bGF0b3IgPSBhc3luYyBmdW5jdGlvbiAoYXZkTmFtZSkge1xuICBsb2cuZGVidWcoYGtpbGxpbmcgYXZkICcke2F2ZE5hbWV9J2ApO1xuICBsZXQgZGV2aWNlID0gYXdhaXQgdGhpcy5nZXRSdW5uaW5nQVZEKGF2ZE5hbWUpO1xuICBpZiAoZGV2aWNlKSB7XG4gICAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnZW11JywgJ2tpbGwnXSk7XG4gICAgbG9nLmluZm8oYHN1Y2Nlc3NmdWxseSBraWxsZWQgZW11bGF0b3IgJyR7YXZkTmFtZX0nYCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oYG5vIGF2ZCB3aXRoIG5hbWUgJyR7YXZkTmFtZX0nIHJ1bm5pbmcuIHNraXBwaW5nIGtpbGwgc3RlcC5gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydCBhbiBlbXVsYXRvciB3aXRoIGdpdmVuIHBhcmFtZXRlcnMgYW5kIHdhaXQgdW50aWwgaXQgaXMgZnVsbCBzdGFydGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gVGhlIG5hbWUgb2YgYW4gZXhpc3RpbmcgZW11bGF0b3IuXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fHN0cmluZ30gYXZkQXJncyAtIEFkZGl0aW9uYWwgZW11bGF0b3IgY29tbWFuZCBsaW5lIGFyZ3VtZW50LlxuICogQHBhcmFtIHs/c3RyaW5nfSBsYW5ndWFnZSAtIEVtdWxhdG9yIHN5c3RlbSBsYW5ndWFnZS5cbiAqIEBwYXJhbSB7P2NvbnRyeX0gY291bnRyeSAtIEVtdWxhdG9yIHN5c3RlbSBjb3VudHJ5LlxuICogQHBhcmFtIHtudW1iZXJ9IGF2ZExhdW5jaFRpbWVvdXQgWzYwMDAwXSAtIEVtdWxhdG9yIHN0YXJ0dXAgdGltZW91dCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0ge251bWJlcn0gcmV0cnlUaW1lcyBbMV0gLSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc3RhcnR1cCByZXRyaWVzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBlbXVsYXRvciBmYWlscyB0byBzdGFydCB3aXRoaW4gdGhlIGdpdmVuIHRpbWVvdXQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmxhdW5jaEFWRCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lLCBhdmRBcmdzLCBsYW5ndWFnZSwgY291bnRyeSxcbiAgYXZkTGF1bmNoVGltZW91dCA9IDYwMDAwLCBhdmRSZWFkeVRpbWVvdXQgPSA2MDAwMCwgcmV0cnlUaW1lcyA9IDEpIHtcbiAgbG9nLmRlYnVnKGBMYXVuY2hpbmcgRW11bGF0b3Igd2l0aCBBVkQgJHthdmROYW1lfSwgbGF1bmNoVGltZW91dCBgICtcbiAgICAgICAgICAgIGAke2F2ZExhdW5jaFRpbWVvdXR9bXMgYW5kIHJlYWR5VGltZW91dCAke2F2ZFJlYWR5VGltZW91dH1tc2ApO1xuICBsZXQgZW11bGF0b3JCaW5hcnlQYXRoID0gYXdhaXQgdGhpcy5nZXRTZGtCaW5hcnlQYXRoKFwiZW11bGF0b3JcIik7XG4gIGlmIChhdmROYW1lWzBdID09PSBcIkBcIikge1xuICAgIGF2ZE5hbWUgPSBhdmROYW1lLnN1YnN0cigxKTtcbiAgfVxuICBhd2FpdCB0aGlzLmNoZWNrQXZkRXhpc3QoYXZkTmFtZSk7XG4gIGxldCBsYXVuY2hBcmdzID0gW1wiLWF2ZFwiLCBhdmROYW1lXTtcbiAgaWYgKHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGxvZy5kZWJ1ZyhgU2V0dGluZyBBbmRyb2lkIERldmljZSBMYW5ndWFnZSB0byAke2xhbmd1YWdlfWApO1xuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5sYW5ndWFnZT0ke2xhbmd1YWdlLnRvTG93ZXJDYXNlKCl9YCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb3VudHJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgbG9nLmRlYnVnKGBTZXR0aW5nIEFuZHJvaWQgRGV2aWNlIENvdW50cnkgdG8gJHtjb3VudHJ5fWApO1xuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5jb3VudHJ5PSR7Y291bnRyeS50b1VwcGVyQ2FzZSgpfWApO1xuICB9XG4gIGxldCBsb2NhbGU7XG4gIGlmICh0eXBlb2YgbGFuZ3VhZ2UgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGNvdW50cnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsb2NhbGUgPSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpICsgXCItXCIgKyBjb3VudHJ5LnRvVXBwZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGxhbmd1YWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbG9jYWxlID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY291bnRyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGxvY2FsZSA9IGNvdW50cnk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsb2NhbGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsb2cuZGVidWcoYFNldHRpbmcgQW5kcm9pZCBEZXZpY2UgTG9jYWxlIHRvICR7bG9jYWxlfWApO1xuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5sb2NhbGU9JHtsb2NhbGV9YCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBhdmRBcmdzID09PSBcInN0cmluZ1wiKSB7XG4gICAgYXZkQXJncyA9IGF2ZEFyZ3Muc3BsaXQoXCIgXCIpO1xuICAgIGxhdW5jaEFyZ3MgPSBsYXVuY2hBcmdzLmNvbmNhdChhdmRBcmdzKTtcbiAgfVxuICBsb2cuZGVidWcoYFJ1bm5pbmcgJyR7ZW11bGF0b3JCaW5hcnlQYXRofScgd2l0aCBhcmdzOiAke0pTT04uc3RyaW5naWZ5KGxhdW5jaEFyZ3MpfWApO1xuICBsZXQgcHJvYyA9IG5ldyBTdWJQcm9jZXNzKGVtdWxhdG9yQmluYXJ5UGF0aCwgbGF1bmNoQXJncyk7XG4gIGF3YWl0IHByb2Muc3RhcnQoMCk7XG4gIHByb2Mub24oJ291dHB1dCcsIChzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGZvciAobGV0IGxpbmUgb2YgKHN0ZG91dCB8fCBzdGRlcnIgfHwgJycpLnNwbGl0KCdcXG4nKS5maWx0ZXIoQm9vbGVhbikpIHtcbiAgICAgIGxvZy5pbmZvKGBbQVZEIE9VVFBVVF0gJHtsaW5lfWApO1xuICAgIH1cbiAgfSk7XG4gIHByb2Mub24oJ2V4aXQnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgaWYgKGNvZGUgIT09IDApIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBFbXVsYXRvciBhdmQgJHthdmROYW1lfSBleGl0IHdpdGggY29kZSAke2NvZGV9LCBzaWduYWwgJHtzaWduYWx9YCk7XG4gICAgfVxuICB9KTtcbiAgYXdhaXQgcmV0cnkocmV0cnlUaW1lcywgdGhpcy5nZXRSdW5uaW5nQVZEV2l0aFJldHJ5LmJpbmQodGhpcyksIGF2ZE5hbWUsIGF2ZExhdW5jaFRpbWVvdXQpO1xuICBhd2FpdCB0aGlzLndhaXRGb3JFbXVsYXRvclJlYWR5KGF2ZFJlYWR5VGltZW91dCk7XG4gIHJldHVybiBwcm9jO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBBREJWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdmVyc2lvblN0cmluZyAtIEFEQiB2ZXJzaW9uIGFzIGEgc3RyaW5nLlxuICogQHByb3BlcnR5IHtmbG9hdH0gdmVyc2lvbkZsb2F0IC0gVmVyc2lvbiBudW1iZXIgYXMgZmxvYXQgdmFsdWUgKHVzZWZ1bCBmb3IgY29tcGFyaXNvbikuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWFqb3IgLSBNYWpvciB2ZXJzaW9uIG51bWJlci5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtaW5vciAtIE1pbm9yIHZlcnNpb24gbnVtYmVyLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHBhdGNoIC0gUGF0Y2ggdmVyc2lvbiBudW1iZXIuXG4gKi9cblxuLyoqXG4gKiBHZXQgdGhlIGFkYiB2ZXJzaW9uLiBUaGUgcmVzdWx0IG9mIHRoaXMgbWV0aG9kIGlzIGNhY2hlZC5cbiAqXG4gKiBAcmV0dXJuIHtBREJWZXJzaW9ufSBUaGUgY3VycmVudCBhZGIgdmVyc2lvbi5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBpdCBpcyBub3QgcG9zc2libGUgdG8gcGFyc2UgYWRiIHZlcnNpb24uXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmdldEFkYlZlcnNpb24gPSBfLm1lbW9pemUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGxldCBhZGJWZXJzaW9uID0gKGF3YWl0IHRoaXMuYWRiRXhlYygndmVyc2lvbicpKVxuICAgICAgLnJlcGxhY2UoL0FuZHJvaWRcXHNEZWJ1Z1xcc0JyaWRnZVxcc3ZlcnNpb25cXHMoW1xcZFxcLl0qKVtcXHNcXHdcXC1dKi8sIFwiJDFcIik7XG4gICAgbGV0IHBhcnRzID0gYWRiVmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIHJldHVybiB7XG4gICAgICB2ZXJzaW9uU3RyaW5nOiBhZGJWZXJzaW9uLFxuICAgICAgdmVyc2lvbkZsb2F0OiBwYXJzZUZsb2F0KGFkYlZlcnNpb24pLFxuICAgICAgbWFqb3I6IHBhcnNlSW50KHBhcnRzWzBdLCAxMCksXG4gICAgICBtaW5vcjogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICAgIHBhdGNoOiBwYXJ0c1syXSA/IHBhcnNlSW50KHBhcnRzWzJdLCAxMCkgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBnZXR0aW5nIGFkYiB2ZXJzaW9uLiBPcmlnaW5hbCBlcnJvcjogJyR7ZS5tZXNzYWdlfSc7IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFN0ZGVycjogJyR7KGUuc3RkZXJyIHx8ICcnKS50cmltKCl9JzsgQ29kZTogJyR7ZS5jb2RlfSdgKTtcbiAgfVxufSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZ2l2ZW4gZW11bGF0b3IgZXhpc3RzIGluIHRoZSBsaXN0IG9mIGF2YWlsYWJsZSBhdmRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gVGhlIG5hbWUgb2YgZW11bGF0b3IgdG8gdmVyaWZ5IGZvciBleGlzdGVuY2UuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGVtdWxhdG9yIHdpdGggZ2l2ZW4gbmFtZSBkb2VzIG5vdCBleGlzdC5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuY2hlY2tBdmRFeGlzdCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lKSB7XG4gIGxldCBjbWQsIHJlc3VsdDtcbiAgdHJ5IHtcbiAgICBjbWQgPSBhd2FpdCB0aGlzLmdldFNka0JpbmFyeVBhdGgoJ2VtdWxhdG9yJyk7XG4gICAgcmVzdWx0ID0gYXdhaXQgZXhlYyhjbWQsIFsnLWxpc3QtYXZkcyddKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxldCB1bmtub3duT3B0aW9uRXJyb3IgPSBuZXcgUmVnRXhwKFwidW5rbm93biBvcHRpb246IC1saXN0LWF2ZHNcIiwgXCJpXCIpLnRlc3QoZS5zdGRlcnIpO1xuICAgIGlmICghdW5rbm93bk9wdGlvbkVycm9yKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZXhlY3V0aW5nIGNoZWNrQXZkRXhpc3QuIE9yaWdpbmFsIGVycm9yOiAnJHtlLm1lc3NhZ2V9JzsgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgU3RkZXJyOiAnJHsoZS5zdGRlcnIgfHwgJycpLnRyaW0oKX0nOyBDb2RlOiAnJHtlLmNvZGV9J2ApO1xuXG4gICAgfVxuICAgIGNvbnN0IHNka1ZlcnNpb24gPSBhd2FpdCBnZXRTZGtUb29sc1ZlcnNpb24oKTtcbiAgICBsZXQgYmluYXJ5TmFtZSA9ICdhbmRyb2lkJztcbiAgICBpZiAoc2RrVmVyc2lvbikge1xuICAgICAgaWYgKHNka1ZlcnNpb24ubWFqb3IgPj0gMjUpIHtcbiAgICAgICAgYmluYXJ5TmFtZSA9ICdhdmRtYW5hZ2VyJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLndhcm4oYERlZmF1bHRpbmcgYmluYXJ5IG5hbWUgdG8gJyR7YmluYXJ5TmFtZX0nLCBiZWNhdXNlIFNESyB2ZXJzaW9uIGNhbm5vdCBiZSBwYXJzZWRgKTtcbiAgICB9XG4gICAgLy8gSWYgLWxpc3QtYXZkcyBvcHRpb24gaXMgbm90IGF2YWlsYWJsZSwgdXNlIGFuZHJvaWQgY29tbWFuZCBhcyBhbiBhbHRlcm5hdGl2ZVxuICAgIGNtZCA9IGF3YWl0IHRoaXMuZ2V0U2RrQmluYXJ5UGF0aChiaW5hcnlOYW1lKTtcbiAgICByZXN1bHQgPSBhd2FpdCBleGVjKGNtZCwgWydsaXN0JywgJ2F2ZCcsICctYyddKTtcbiAgfVxuICBpZiAocmVzdWx0LnN0ZG91dC5pbmRleE9mKGF2ZE5hbWUpID09PSAtMSkge1xuICAgIGxldCBleGlzdGluZ3MgPSBgKCR7cmVzdWx0LnN0ZG91dC50cmltKCkucmVwbGFjZSgvW1xcbl0vZywgJyksICgnKX0pYDtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQXZkICcke2F2ZE5hbWV9JyBpcyBub3QgYXZhaWxhYmxlLiBwbGVhc2Ugc2VsZWN0IHlvdXIgYXZkIG5hbWUgZnJvbSBvbmUgb2YgdGhlc2U6ICcke2V4aXN0aW5nc30nYCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGN1cnJlbnQgZW11bGF0b3IgaXMgcmVhZHkgdG8gYWNjZXB0IGZ1cnRoZXIgY29tbWFuZHMgKGJvb3RpbmcgY29tcGxldGVkKS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dE1zIFsyMDAwMF0gLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGVtdWxhdG9yIGlzIG5vdCByZWFkeSB3aXRoaW4gdGhlIGdpdmVuIHRpbWVvdXQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLndhaXRGb3JFbXVsYXRvclJlYWR5ID0gYXN5bmMgZnVuY3Rpb24gKHRpbWVvdXRNcyA9IDIwMDAwKSB7XG4gIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gIGxvZy5kZWJ1ZyhcIldhaXRpbmcgdW50aWwgZW11bGF0b3IgaXMgcmVhZHlcIik7XG4gIHdoaWxlICgoRGF0ZS5ub3coKSAtIHN0YXJ0KSA8IHRpbWVvdXRNcykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbXCJnZXRwcm9wXCIsIFwiaW5pdC5zdmMuYm9vdGFuaW1cIl0pO1xuICAgICAgaWYgKHN0ZG91dC5pbmRleE9mKCdzdG9wcGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgICBhd2FpdCBzbGVlcCgzMDAwKTtcbiAgfVxuICBsb2cuZXJyb3JBbmRUaHJvdygnRW11bGF0b3Igbm90IHJlYWR5Jyk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGRldmljZSBpcyByZWFkeSB0byBhY2NlcHQgZnVydGhlciBjb21tYW5kcyAoYm9vdGluZyBjb21wbGV0ZWQpLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBhcHBEZXZpY2VSZWFkeVRpbWVvdXQgWzMwXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGRldmljZSBpcyBub3QgcmVhZHkgd2l0aGluIHRoZSBnaXZlbiB0aW1lb3V0LlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy53YWl0Rm9yRGV2aWNlID0gYXN5bmMgZnVuY3Rpb24gKGFwcERldmljZVJlYWR5VGltZW91dCA9IDMwKSB7XG4gIHRoaXMuYXBwRGV2aWNlUmVhZHlUaW1lb3V0ID0gYXBwRGV2aWNlUmVhZHlUaW1lb3V0O1xuICBjb25zdCByZXRyaWVzID0gMztcbiAgY29uc3QgdGltZW91dCA9IHBhcnNlSW50KHRoaXMuYXBwRGV2aWNlUmVhZHlUaW1lb3V0LCAxMCkgLyByZXRyaWVzICogMTAwMDtcbiAgYXdhaXQgcmV0cnkocmV0cmllcywgYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYkV4ZWMoJ3dhaXQtZm9yLWRldmljZScsIHt0aW1lb3V0fSk7XG4gICAgICBhd2FpdCB0aGlzLnBpbmcoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlc3RhcnRBZGIoKTtcbiAgICAgIGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRGV2aWNlcygpO1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGluIHdhaXRpbmcgZm9yIGRldmljZS4gT3JpZ2luYWwgZXJyb3I6ICcke2UubWVzc2FnZX0nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBgUmV0cnlpbmcgYnkgcmVzdGFydGluZyBBREJgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZWJvb3QgdGhlIGN1cnJlbnQgZGV2aWNlIGFuZCB3YWl0IHVudGlsIGl0IGlzIGNvbXBsZXRlZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gcmV0cmllcyBbREVGQVVMVF9BREJfUkVCT09UX1JFVFJJRVNdIC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlYm9vdCByZXRyaWVzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBkZXZpY2UgZmFpbGVkIHRvIHJlYm9vdCBhbmQgbnVtYmVyIG9mIHJldHJpZXMgaXMgZXhjZWVkZWQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLnJlYm9vdCA9IGFzeW5jIGZ1bmN0aW9uIChyZXRyaWVzID0gREVGQVVMVF9BREJfUkVCT09UX1JFVFJJRVMpIHtcbiAgdHJ5IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5zaGVsbChbJ3N0b3AnXSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyLm1lc3NhZ2UuaW5kZXhPZignbXVzdCBiZSByb290JykgPT09IC0xKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgZGV2aWNlIG5lZWRzIGFkYiB0byBiZSBydW5uaW5nIGFzIHJvb3QgdG8gc3RvcC5cbiAgICAgIC8vIHNvIHRyeSB0byByZXN0YXJ0IHRoZSBkYWVtb25cbiAgICAgIGxvZy5kZWJ1ZygnRGV2aWNlIHJlcXVpcmVzIGFkYiB0byBiZSBydW5uaW5nIGFzIHJvb3QgaW4gb3JkZXIgdG8gcmVib290LiBSZXN0YXJ0aW5nIGRhZW1vbicpO1xuICAgICAgYXdhaXQgdGhpcy5yb290KCk7XG4gICAgICBhd2FpdCB0aGlzLnNoZWxsKFsnc3RvcCddKTtcbiAgICB9XG4gICAgYXdhaXQgQi5kZWxheSgyMDAwKTsgLy8gbGV0IHRoZSBlbXUgZmluaXNoIHN0b3BwaW5nO1xuICAgIGF3YWl0IHRoaXMuc2V0RGV2aWNlUHJvcGVydHkoJ3N5cy5ib290X2NvbXBsZXRlZCcsIDApO1xuICAgIGF3YWl0IHRoaXMuc2hlbGwoWydzdGFydCddKTtcbiAgICBhd2FpdCByZXRyeUludGVydmFsKHJldHJpZXMsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBib290ZWQgPSBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KCdzeXMuYm9vdF9jb21wbGV0ZWQnKTtcbiAgICAgIGlmIChib290ZWQgPT09ICcxJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRoZSBzdGFjayB0cmFjZSwgc28gbm8gbG9nLmVycm9yQW5kVGhyb3dcbiAgICAgICAgbGV0IG1zZyA9ICdXYWl0aW5nIGZvciByZWJvb3QuIFRoaXMgdGFrZXMgdGltZSc7XG4gICAgICAgIGxvZy5kZWJ1Zyhtc2cpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICB0aGlzLnVucm9vdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFN3aXRjaCBhZGIgc2VydmVyIHRvIHJvb3QgbW9kZS5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG9mIHRoZSBzd2l0Y2ggd2FzIHN1Y2Nlc3NmdWwgb3IgZmFsc2VcbiAqICAgICAgICAgICAgICAgICAgIGlmIHRoZSBzd2l0Y2ggZmFpbGVkLlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5yb290ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWModGhpcy5leGVjdXRhYmxlLnBhdGgsIFsncm9vdCddKTtcblxuICAgIC8vIG9uIHJlYWwgZGV2aWNlcyBpbiBzb21lIHNpdHVhdGlvbnMgd2UgZ2V0IGFuIGVycm9yIGluIHRoZSBzdGRvdXRcbiAgICBpZiAoc3Rkb3V0ICYmIHN0ZG91dC5pbmRleE9mKCdhZGJkIGNhbm5vdCBydW4gYXMgcm9vdCcpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHN0ZG91dC50cmltKCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cud2FybihgVW5hYmxlIHRvIHJvb3QgYWRiIGRhZW1vbjogJyR7ZXJyLm1lc3NhZ2V9Jy4gQ29udGludWluZ2ApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBTd2l0Y2ggYWRiIHNlcnZlciB0byBub24tcm9vdCBtb2RlLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgb2YgdGhlIHN3aXRjaCB3YXMgc3VjY2Vzc2Z1bCBvciBmYWxzZVxuICogICAgICAgICAgICAgICAgICAgaWYgdGhlIHN3aXRjaCBmYWlsZWQuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLnVucm9vdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBbJ3Vucm9vdCddKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLndhcm4oYFVuYWJsZSB0byB1bnJvb3QgYWRiIGRhZW1vbjogJyR7ZXJyLm1lc3NhZ2V9Jy4gQ29udGludWluZ2ApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBWZXJpZnkgd2hldGhlciBhIHJlbW90ZSBwYXRoIGV4aXN0cyBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlbW90ZVBhdGggLSBUaGUgcmVtb3RlIHBhdGggdG8gdmVyaWZ5LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZ2l2ZW4gcGF0aCBleGlzdHMgb24gdGhlIGRldmljZS5cbiAqL1xuc3lzdGVtQ2FsbE1ldGhvZHMuZmlsZUV4aXN0cyA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XG4gIGxldCBmaWxlcyA9IGF3YWl0IHRoaXMubHMocmVtb3RlUGF0aCk7XG4gIHJldHVybiBmaWxlcy5sZW5ndGggPiAwO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIG91dHB1dCBvZiBfbHNfIGNvbW1hbmQgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZW1vdGVQYXRoIC0gVGhlIHJlbW90ZSBwYXRoICh0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIF9sc18gY29tbWFuZCkuXG4gKiBAcGFyYW0ge0FycmF5LjxTdHJpbmc+fSBvcHRzIFtbXV0gLSBBZGRpdGlvbmFsIF9sc18gb3B0aW9ucy5cbiAqIEByZXR1cm4ge0FycmF5LjxTdHJpbmc+fSBUaGUgX2xzXyBvdXRwdXQgYXMgYW4gYXJyYXkgb2Ygc3BsaXQgbGluZXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgQW4gZW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQgb2YgdGhlIGdpdmVuIF9yZW1vdGVQYXRoX1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXMgbm90IGV4aXN0LlxuICovXG5zeXN0ZW1DYWxsTWV0aG9kcy5scyA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoLCBvcHRzID0gW10pIHtcbiAgdHJ5IHtcbiAgICBsZXQgYXJncyA9IFsnbHMnLCAuLi5vcHRzLCByZW1vdGVQYXRoXTtcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChhcmdzKTtcbiAgICBsZXQgbGluZXMgPSBzdGRvdXQuc3BsaXQoXCJcXG5cIik7XG4gICAgcmV0dXJuIGxpbmVzLm1hcCgobCkgPT4gbC50cmltKCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuZmlsdGVyKChsKSA9PiBsLmluZGV4T2YoXCJObyBzdWNoIGZpbGVcIikgPT09IC0xKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ05vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnknKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG4vKipcbiAqIEdldCB0aGUgc2l6ZSBvZiB0aGUgcGFydGljdWxhciBmaWxlIGxvY2F0ZWQgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZW1vdGVQYXRoIC0gVGhlIHJlbW90ZSBwYXRoIHRvIHRoZSBmaWxlLlxuICogQHJldHVybiB7bnVtYmVyfSBGaWxlIHNpemUgaW4gYnl0ZXMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGdldHRpbmcgdGhlIHNpemUgb2YgdGhlIGdpdmVuIGZpbGUuXG4gKi9cbnN5c3RlbUNhbGxNZXRob2RzLmZpbGVTaXplID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgdHJ5IHtcbiAgICBsZXQgZmlsZXMgPSBhd2FpdCB0aGlzLmxzKHJlbW90ZVBhdGgsIFsnLWxhJ10pO1xuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVtb3RlIHBhdGggaXMgbm90IGEgZmlsZWApO1xuICAgIH1cbiAgICAvLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL2ZPczRQNC8zXG4gICAgbGV0IG1hdGNoID0gL1xccyhcXGQrKVxccytcXGR7NH0tXFxkezJ9LVxcZHsyfS8uZXhlYyhmaWxlc1swXSk7XG4gICAgaWYgKCFtYXRjaCB8fCBfLmlzTmFOKHBhcnNlSW50KG1hdGNoWzFdLCAxMCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBwYXJzZSBzaXplIGZyb20gbGlzdCBvdXRwdXQ6ICcke2ZpbGVzWzBdfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gZ2V0IGZpbGUgc2l6ZSBmb3IgJyR7cmVtb3RlUGF0aH0nOiAke2Vyci5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzeXN0ZW1DYWxsTWV0aG9kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==

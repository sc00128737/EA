'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersJs = require('../helpers.js');

var _teen_process = require('teen_process');

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _appiumSupport = require('appium-support');

var apkUtilsMethods = {};

/**
 * Check whether the particular package is present on the device under test.
 *
 * @param {string} pkg - The name of the package to check.
 * @return {boolean} True if the package is installed.
 */
apkUtilsMethods.isAppInstalled = function callee$0$0(pkg) {
  var installed, stdout, apkInstalledRgx;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        installed = false;

        _loggerJs2['default'].debug('Getting install status for ' + pkg);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'list', 'packages', pkg]));

      case 5:
        stdout = context$1$0.sent;
        apkInstalledRgx = new RegExp('^package:' + pkg.replace(/(\.)/g, "\\$1") + '$', 'm');

        installed = apkInstalledRgx.test(stdout);
        _loggerJs2['default'].debug('App is' + (!installed ? ' not' : '') + ' installed');
        return context$1$0.abrupt('return', installed);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding if app is installed. Original error: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 12]]);
};

/**
 * Start the particular URI on the device under test.
 *
 * @param {string} uri - The name of URI to start.
 * @param {string} pkg - The name of the package to start the URI with.
 */
apkUtilsMethods.startUri = function callee$0$0(uri, pkg) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!uri || !pkg) {
          _loggerJs2['default'].errorAndThrow("URI and package arguments are required");
        }
        context$1$0.prev = 1;
        args = ["am", "start", "-W", "-a", "android.intent.action.VIEW", "-d", uri.replace(/&/g, '\\&'), pkg];
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error attempting to start URI. Original error: ' + context$1$0.t0);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

/**
 * Start the particular package on the device under test.
 *
 * @param {object} startAppOptions [{}] - Startup options mapping.
 *                                        It is mandatory that 'activity' and 'pkg' properties are set.
 *                                        Additional supported properties are: 'retry', 'stopApp', 'waitPkg'
 *                                        and 'waitActivity'.
 * @return {string} The output of the corresponding adb command.
 */
apkUtilsMethods.startApp = function callee$0$0() {
  var startAppOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var apiLevel, cmd, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        if (!startAppOptions.activity || !startAppOptions.pkg) {
          _loggerJs2['default'].errorAndThrow("activity and pkg is required for launching application");
        }
        startAppOptions = _lodash2['default'].clone(startAppOptions);
        startAppOptions.activity = startAppOptions.activity.replace('$', '\\$');

        // initializing defaults
        _lodash2['default'].defaults(startAppOptions, {
          waitPkg: startAppOptions.pkg,
          waitActivity: false,
          retry: true,
          stopApp: true
        });
        // preventing null waitpkg
        startAppOptions.waitPkg = startAppOptions.waitPkg || startAppOptions.pkg;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 8:
        apiLevel = context$1$0.sent;
        cmd = (0, _helpersJs.buildStartCmd)(startAppOptions, apiLevel);
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.shell(cmd));

      case 12:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("Error: Activity class") !== -1 && stdout.indexOf("does not exist") !== -1)) {
          context$1$0.next = 24;
          break;
        }

        if (!(startAppOptions.retry && startAppOptions.activity[0] !== ".")) {
          context$1$0.next = 21;
          break;
        }

        _loggerJs2['default'].debug("We tried to start an activity that doesn't exist, " + "retrying with . prepended to activity");
        startAppOptions.activity = '.' + startAppOptions.activity;
        startAppOptions.retry = false;
        return context$1$0.abrupt('return', this.startApp(startAppOptions));

      case 21:
        _loggerJs2['default'].errorAndThrow("Activity used to start app doesn't exist or cannot be " + "launched! Make sure it exists and is a launchable activity");

      case 22:
        context$1$0.next = 25;
        break;

      case 24:
        if (stdout.indexOf("java.lang.SecurityException") !== -1) {
          // if the app is disabled on a real device it will throw a security exception
          _loggerJs2['default'].errorAndThrow("Permission to start activity denied.");
        }

      case 25:
        if (!startAppOptions.waitActivity) {
          context$1$0.next = 28;
          break;
        }

        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(this.waitForActivity(startAppOptions.waitPkg, startAppOptions.waitActivity, startAppOptions.waitDuration));

      case 28:
        context$1$0.next = 33;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error occured while starting App. Original error: ' + context$1$0.t0.message);

      case 33:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 30]]);
};

/**
 * @typedef {Object} PackageActivityInfo
 * @property {?string} appPackage - The name of application package,
 *                                  for example 'com.acme.app'.
 * @property {?string} appActivity - The name of main application activity.
 */

/**
 * Get the name of currently focused package and activity.
 *
 * @return {PackageActivityInfo} The mapping, where property names are 'appPackage' and 'appActivity'.
 * @throws {Error} If there is an error while parsing the data.
 */
apkUtilsMethods.getFocusedPackageAndActivity = function callee$0$0() {
  var cmd, nullRe, searchRe, stdout, foundNullMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, foundMatch;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting focused package and activity");
        cmd = ['dumpsys', 'window', 'windows'];
        nullRe = new RegExp(/mFocusedApp=null/);
        searchRe = new RegExp('mFocusedApp.+Record\\{.*\\s([^\\s\\/\\}]+)' + '\\/([^\\s\\/\\}\\,]+)\\,?(\\s[^\\s\\/\\}]+)*\\}');
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.shell(cmd));

      case 7:
        stdout = context$1$0.sent;
        foundNullMatch = false;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 12;
        _iterator = _getIterator(stdout.split("\n"));

      case 14:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 25;
          break;
        }

        line = _step.value;
        foundMatch = searchRe.exec(line);

        if (!foundMatch) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('return', { appPackage: foundMatch[1].trim(), appActivity: foundMatch[2].trim() });

      case 21:
        if (nullRe.test(line)) {
          foundNullMatch = true;
        }

      case 22:
        _iteratorNormalCompletion = true;
        context$1$0.next = 14;
        break;

      case 25:
        context$1$0.next = 31;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 31:
        context$1$0.prev = 31;
        context$1$0.prev = 32;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 34:
        context$1$0.prev = 34;

        if (!_didIteratorError) {
          context$1$0.next = 37;
          break;
        }

        throw _iteratorError;

      case 37:
        return context$1$0.finish(34);

      case 38:
        return context$1$0.finish(31);

      case 39:
        if (!foundNullMatch) {
          context$1$0.next = 43;
          break;
        }

        return context$1$0.abrupt('return', { appPackage: null, appActivity: null });

      case 43:
        _loggerJs2['default'].errorAndThrow("Could not parse activity from dumpsys");

      case 44:
        context$1$0.next = 49;
        break;

      case 46:
        context$1$0.prev = 46;
        context$1$0.t1 = context$1$0['catch'](4);

        _loggerJs2['default'].errorAndThrow('Could not get focusPackageAndActivity. Original error: ' + context$1$0.t1.message);

      case 49:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 46], [12, 27, 31, 39], [32,, 34, 38]]);
};

/**
 * Wait for the given activity to be focused/non-focused.
 *
 * @param {string} pkg - The name of the package to wait for.
 * @param {string} activity - The name of the activity, belonging to that package,
 *                            to wait for.
 * @param {boolean} waitForStop - Whether to wait until the activity is focused (true)
 *                                or is not focused (false).
 * @param {number} waitMs [20000] - Number of milliseconds to wait before timeout occurs.
 * @throws {error} If timeout happens.
 */
apkUtilsMethods.waitForActivityOrNot = function callee$0$0(pkg, activity, waitForStop) {
  var waitMs = arguments.length <= 3 || arguments[3] === undefined ? 20000 : arguments[3];

  var splitNames, allPackages, allActivities, possibleActivityNames, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, oneActivity, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, currentPkg, possibleActivityPatterns, retries;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(!pkg || !activity)) {
          context$1$0.next = 2;
          break;
        }

        throw new Error('Package and activity required.');

      case 2:
        _loggerJs2['default'].debug('Waiting up to ' + waitMs + 'ms for activity matching pkg: \'' + pkg + '\' and ' + ('activity: \'' + activity + '\' to' + (waitForStop ? ' not' : '') + ' be focused'));

        splitNames = function splitNames(names) {
          return names.split(',').map(function (name) {
            return name.trim();
          });
        };

        allPackages = splitNames(pkg);
        allActivities = splitNames(activity);
        possibleActivityNames = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 10;
        _iterator2 = _getIterator(allActivities);

      case 12:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 40;
          break;
        }

        oneActivity = _step2.value;

        if (!oneActivity.startsWith('.')) {
          context$1$0.next = 36;
          break;
        }

        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 18;

        // add the package name if activity is not full qualified
        for (_iterator3 = _getIterator(allPackages); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          currentPkg = _step3.value;

          possibleActivityNames.push(('' + currentPkg + oneActivity).replace(/\.+/g, '.'));
        }
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](18);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError3) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError3;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 37;
        break;

      case 36:
        // accept fully qualified activity name.
        possibleActivityNames.push(oneActivity);

      case 37:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 12;
        break;

      case 40:
        context$1$0.next = 46;
        break;

      case 42:
        context$1$0.prev = 42;
        context$1$0.t1 = context$1$0['catch'](10);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 46:
        context$1$0.prev = 46;
        context$1$0.prev = 47;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 49:
        context$1$0.prev = 49;

        if (!_didIteratorError2) {
          context$1$0.next = 52;
          break;
        }

        throw _iteratorError2;

      case 52:
        return context$1$0.finish(49);

      case 53:
        return context$1$0.finish(46);

      case 54:
        /* jshint ignore:start */
        _loggerJs2['default'].debug('Possible activities, to be checked: ' + possibleActivityNames.map(function (name) {
          return '\'' + name + '\'';
        }).join(', '));
        /* jshint ignore:end */
        possibleActivityPatterns = possibleActivityNames.map(function (possibleActivityName) {
          return new RegExp('^' + possibleActivityName.replace(/\./g, '\\.').replace(/\*/g, '.*?').replace(/\$/g, '\\$') + '$');
        });
        retries = parseInt(waitMs / 750, 10) || 1;

        retries = isNaN(retries) ? 30 : retries;
        context$1$0.next = 60;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 750, function callee$1$0() {
          var _ref, appPackage, appActivity, _ret;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.getFocusedPackageAndActivity());

              case 2:
                _ref = context$2$0.sent;
                appPackage = _ref.appPackage;
                appActivity = _ref.appActivity;

                if (!(appActivity && appPackage)) {
                  context$2$0.next = 9;
                  break;
                }

                _ret = (function () {
                  var fullyQualifiedActivity = appActivity.startsWith('.') ? '' + appPackage + appActivity : appActivity;
                  _loggerJs2['default'].debug('Found package: \'' + appPackage + '\' and fully qualified activity name : \'' + fullyQualifiedActivity + '\'');
                  var foundAct = _lodash2['default'].includes(allPackages, appPackage) && _lodash2['default'].findIndex(possibleActivityPatterns, function (possiblePattern) {
                    return possiblePattern.test(fullyQualifiedActivity);
                  }) !== -1;
                  if (!waitForStop && foundAct || waitForStop && !foundAct) {
                    return {
                      v: undefined
                    };
                  }
                })();

                if (!(typeof _ret === 'object')) {
                  context$2$0.next = 9;
                  break;
                }

                return context$2$0.abrupt('return', _ret.v);

              case 9:
                _loggerJs2['default'].debug('Incorrect package and activity. Retrying.');
                /* jshint ignore:start */
                throw new Error(possibleActivityNames.map(function (name) {
                  return '\'' + name + '\'';
                }).join(' or ') + ' never ' + (waitForStop ? 'stopped' : 'started'));

              case 11:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 60:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 42, 46, 54], [18, 22, 26, 34], [27,, 29, 33], [47,, 49, 53]]);
};

/**
 * Wait for the given activity to be focused
 *
 * @param {string} pkg - The name of the package to wait for.
 * @param {string} activity - The name of the activity, belonging to that package,
 *                            to wait for.
 * @param {number} waitMs [20000] - Number of milliseconds to wait before timeout occurs.
 * @throws {error} If timeout happens.
 */

/* jshint ignore:end */
apkUtilsMethods.waitForActivity = function callee$0$0(pkg, act) {
  var waitMs = arguments.length <= 2 || arguments[2] === undefined ? 20000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.waitForActivityOrNot(pkg, act, false, waitMs));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Wait for the given activity to be non-focused.
 *
 * @param {string} pkg - The name of the package to wait for.
 * @param {string} activity - The name of the activity, belonging to that package,
 *                            to wait for.
 * @param {number} waitMs [20000] - Number of milliseconds to wait before timeout occurs.
 * @throws {error} If timeout happens.
 */
apkUtilsMethods.waitForNotActivity = function callee$0$0(pkg, act) {
  var waitMs = arguments.length <= 2 || arguments[2] === undefined ? 20000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.waitForActivityOrNot(pkg, act, true, waitMs));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Uninstall the given package from the device under test.
 *
 * @param {string} pkg - The name of the package to be uninstalled.
 * @return {boolean} True if the package was found on the device and
 *                   successfully uninstalled.
 */
apkUtilsMethods.uninstallApk = function callee$0$0(pkg) {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Uninstalling ' + pkg);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.isAppInstalled(pkg));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _loggerJs2['default'].info(pkg + ' was not uninstalled, because it was not present on the device');
        return context$1$0.abrupt('return', false);

      case 6:
        stdout = undefined;
        context$1$0.prev = 7;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.forceStop(pkg));

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adbExec(['uninstall', pkg], { timeout: 20000 }));

      case 12:
        stdout = context$1$0.sent;
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](7);

        _loggerJs2['default'].errorAndThrow('Unable to uninstall APK. Original error: ' + context$1$0.t0.message);

      case 18:
        stdout = stdout.trim();
        _loggerJs2['default'].debug('ADB command output: ' + stdout);

        if (!(stdout.indexOf("Success") !== -1)) {
          context$1$0.next = 23;
          break;
        }

        _loggerJs2['default'].info(pkg + ' was successfully uninstalled');
        return context$1$0.abrupt('return', true);

      case 23:
        _loggerJs2['default'].info(pkg + ' was not uninstalled');
        return context$1$0.abrupt('return', false);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 15]]);
};

/**
 * Install the package after it was pushed to the device under test.
 *
 * @param {string} apkPathOnDevice - The full path to the package on the device file system.
 * @param {object} opts [{}] - Additional exec options. See {@link https://github.com/appium/node-teen_process}
 *                             for more details on this parameter.
 * @throws {error} If there was a failure during application install.
 */
apkUtilsMethods.installFromDevicePath = function callee$0$0(apkPathOnDevice) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'install', '-r', apkPathOnDevice], opts));

      case 2:
        stdout = context$1$0.sent;

        if (stdout.indexOf("Failure") !== -1) {
          _loggerJs2['default'].errorAndThrow('Remote install failed: ' + stdout);
        }

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Install the package from the local file system.
 *
 * @param {string} apk - The full path to the local package.
 * @param {boolean} repalce [true] - Whether to replace the package if it
 *                                   already installed. True by default.
 * @param {number} timeout [60000] - The number of milliseconds to wait until
 *                                   installation is completed.
 * @throws {error} If an unexpected error happens during install.
 */
apkUtilsMethods.install = function callee$0$0(apk) {
  var replace = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  var timeout = arguments.length <= 2 || arguments[2] === undefined ? 60000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!replace) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['install', '-r', apk], { timeout: timeout }));

      case 3:
        context$1$0.next = 15;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adbExec(['install', apk], { timeout: timeout }));

      case 8:
        context$1$0.next = 15;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](5);

        if (!(context$1$0.t0.message.indexOf('INSTALL_FAILED_ALREADY_EXISTS') === -1)) {
          context$1$0.next = 14;
          break;
        }

        throw context$1$0.t0;

      case 14:
        _loggerJs2['default'].debug('Application \'' + apk + '\' already installed. Continuing.');

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 10]]);
};

/**
 * Install the package from the local file system of upgrade it if an older
 * version of the same package is already installed.
 *
 * @param {string} apk - The full path to the local package.
 * @param {?string} pkg - The name of the installed package. The method will
 *                        perform faster if it is set.
 * @param {?number} timeout [60000] - The number of milliseconds to wait until
 *                                   installation is completed.
 * @throws {error} If an unexpected error happens during install.
 */
apkUtilsMethods.installOrUpgrade = function callee$0$0(apk) {
  var pkg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var timeout = arguments.length <= 2 || arguments[2] === undefined ? 60000 : arguments[2];
  var apkInfo, pkgInfo, pkgVersionCode, apkVersionCode;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        apkInfo = null;

        if (pkg) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getApkInfo(apk));

      case 4:
        apkInfo = context$1$0.sent;

        pkg = apkInfo.name;

      case 6:
        if (pkg) {
          context$1$0.next = 9;
          break;
        }

        _loggerJs2['default'].warn('Cannot read the package name of ' + apk + '. Assuming correct app version is already installed');
        return context$1$0.abrupt('return');

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.isAppInstalled(pkg));

      case 11:
        if (context$1$0.sent) {
          context$1$0.next = 16;
          break;
        }

        _loggerJs2['default'].debug('App \'' + apk + '\' not installed. Installing');
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.install(apk, false, timeout));

      case 15:
        return context$1$0.abrupt('return');

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getPackageInfo(pkg));

      case 18:
        pkgInfo = context$1$0.sent;
        pkgVersionCode = pkgInfo.versionCode;

        if (apkInfo) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.getApkInfo(apk));

      case 23:
        apkInfo = context$1$0.sent;

      case 24:
        apkVersionCode = apkInfo.versionCode;

        if (!(_lodash2['default'].isUndefined(apkVersionCode) || _lodash2['default'].isUndefined(pkgVersionCode))) {
          context$1$0.next = 28;
          break;
        }

        _loggerJs2['default'].warn('Cannot read version codes of \'' + apk + '\' and/or \'' + pkg + '\'. Assuming correct app version is already installed');
        return context$1$0.abrupt('return');

      case 28:
        if (!(pkgVersionCode >= apkVersionCode)) {
          context$1$0.next = 31;
          break;
        }

        _loggerJs2['default'].debug('The installed \'' + pkg + '\' package does not require upgrade (' + pkgVersionCode + ' >= ' + apkVersionCode + ')');
        return context$1$0.abrupt('return');

      case 31:
        _loggerJs2['default'].debug('The installed \'' + pkg + '\' package is older than \'' + apk + '\' (' + pkgVersionCode + ' < ' + apkVersionCode + '). ' + 'Executing upgrade');
        context$1$0.prev = 32;
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(this.install(apk, true, timeout));

      case 35:
        context$1$0.next = 46;
        break;

      case 37:
        context$1$0.prev = 37;
        context$1$0.t0 = context$1$0['catch'](32);

        _loggerJs2['default'].warn('Cannot upgrade \'' + pkg + '\' because of \'' + context$1$0.t0.message + '\'. Trying full reinstall');
        context$1$0.next = 42;
        return _regeneratorRuntime.awrap(this.uninstallApk(pkg));

      case 42:
        if (context$1$0.sent) {
          context$1$0.next = 44;
          break;
        }

        _loggerJs2['default'].errorAndThrow('\'' + pkg + '\' package cannot be uninstalled');

      case 44:
        context$1$0.next = 46;
        return _regeneratorRuntime.awrap(this.install(apk, false, timeout));

      case 46:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[32, 37]]);
};

/**
 * Extract string resources from the given package on local file system.
 *
 * @param {string} apk - The full path to the local package.
 * @param {string} language - The name of the language to extract the resources for.
 * @param {string} out - The name of the destination folder on the local file system to
 *                       store the extracted file to.
 * @return {object} A mapping object, where properties are: 'apkStrings', containing
 *                  parsed resource file represented as JSON object, and 'localPath',
 *                  containing the path to the extracted file on the local file system.
 */
apkUtilsMethods.extractStringsFromApk = function callee$0$0(apk, language, out) {
  var stringsJson, localPath, apkTools, args, fileData, apkStrings, msg;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Extracting strings for language: ' + (language || "default"));
        stringsJson = 'strings.json';
        localPath = undefined;

        if (language) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceLanguage());

      case 6:
        language = context$1$0.sent;

      case 7:
        apkTools = this.jars['appium_apk_tools.jar'];
        args = ['-jar', apkTools, 'stringsFromApk', apk, out, language];
        fileData = undefined, apkStrings = undefined;
        context$1$0.prev = 10;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', args));

      case 13:
        context$1$0.next = 21;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](10);

        _loggerJs2['default'].debug('No strings.xml for language \'' + language + '\', getting default ' + 'strings.xml');
        args.pop();
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', args));

      case 21:
        context$1$0.prev = 21;

        _loggerJs2['default'].debug("Reading strings from converted strings.json");
        localPath = _path2['default'].join(out, stringsJson);
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localPath, 'utf8'));

      case 26:
        fileData = context$1$0.sent;

        apkStrings = JSON.parse(fileData);
        context$1$0.next = 35;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t1 = context$1$0['catch'](21);

        if (fileData) {
          _loggerJs2['default'].debug('Content started with: ' + fileData.slice(0, 300));
        }
        msg = 'Could not parse strings from strings.json. Original ' + ('error: ' + context$1$0.t1.message);

        _loggerJs2['default'].errorAndThrow(msg);

      case 35:
        return context$1$0.abrupt('return', { apkStrings: apkStrings, localPath: localPath });

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 15], [21, 30]]);
};

/**
 * Get the language name of the device under test.
 *
 * @return {string} The name of device language.
 */
apkUtilsMethods.getDeviceLanguage = function callee$0$0() {
  var language;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        language = undefined;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 3:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.getDeviceSysLanguage());

      case 7:
        language = context$1$0.sent;

        if (language) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.getDeviceProductLanguage());

      case 11:
        language = context$1$0.sent;

      case 12:
        context$1$0.next = 17;
        break;

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.getDeviceLocale());

      case 16:
        language = context$1$0.sent.split("-")[0];

      case 17:
        return context$1$0.abrupt('return', language);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the language name of the device under test.
 *
 * @param {string} language - The name of the new device language.
 */
apkUtilsMethods.setDeviceLanguage = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysLanguage(language));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the country name of the device under test.
 *
 * @return {string} The name of device country.
 */
apkUtilsMethods.getDeviceCountry = function callee$0$0() {
  var country;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceSysCountry());

      case 2:
        country = context$1$0.sent;

        if (country) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceProductCountry());

      case 6:
        country = context$1$0.sent;

      case 7:
        return context$1$0.abrupt('return', country);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the country name of the device under test.
 *
 * @param {string} country - The name of the new device country.
 */
apkUtilsMethods.setDeviceCountry = function callee$0$0(country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysCountry(country));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the locale name of the device under test.
 *
 * @return {string} The name of device locale.
 */
apkUtilsMethods.getDeviceLocale = function callee$0$0() {
  var locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceSysLocale());

      case 2:
        locale = context$1$0.sent;

        if (locale) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceProductLocale());

      case 6:
        locale = context$1$0.sent;

      case 7:
        return context$1$0.abrupt('return', locale);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the locale name of the device under test and the format of the locale is en-US, for example.
 * This method call setDeviceLanguageCountry, so, please use setDeviceLanguageCountry as possible.
 *
 * @param {string} locale - Names of the device language and the country connected with `-`. e.g. en-US.
 */
apkUtilsMethods.setDeviceLocale = function callee$0$0(locale) {
  var validateLocale, split_locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        validateLocale = new RegExp(/[a-zA-Z]+-[a-zA-Z0-9]+/);

        if (validateLocale.test(locale)) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].warn('setDeviceLocale requires the following format: en-US or ja-JP');
        return context$1$0.abrupt('return');

      case 4:
        split_locale = locale.split("-");
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.setDeviceLanguageCountry(split_locale[0], split_locale[1]));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Make sure current device locale is expected or not.
 *
 * @param {string} language - Language. The language field is case insensitive, but Locale always canonicalizes to lower case.
 * @param {string} country - Country. The language field is case insensitive, but Locale always canonicalizes to lower case.
 *
 * @return {boolean} If current locale is language and country as arguments, return true.
 */
apkUtilsMethods.ensureCurrentLocale = function callee$0$0(language, country) {
  var hasLanguage, hasCountry, apiLevel;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        hasLanguage = _lodash2['default'].isString(language);
        hasCountry = _lodash2['default'].isString(country);

        if (!(!hasLanguage && !hasCountry)) {
          context$1$0.next = 5;
          break;
        }

        _loggerJs2['default'].warn('ensureCurrentLocale requires language or country');
        return context$1$0.abrupt('return', false);

      case 5:

        // get lower case versions of the strings
        language = (language || '').toLowerCase();
        country = (country || '').toLowerCase();

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 9:
        apiLevel = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(5, 1000, function callee$1$0() {
          var curLanguage, curCountry, curLocale;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;

                if (!(apiLevel < 23)) {
                  context$2$0.next = 19;
                  break;
                }

                curLanguage = undefined, curCountry = undefined;

                if (!hasLanguage) {
                  context$2$0.next = 9;
                  break;
                }

                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(this.getDeviceLanguage());

              case 6:
                curLanguage = context$2$0.sent.toLowerCase();

                if (!(!hasCountry && language === curLanguage)) {
                  context$2$0.next = 9;
                  break;
                }

                return context$2$0.abrupt('return', true);

              case 9:
                if (!hasCountry) {
                  context$2$0.next = 15;
                  break;
                }

                context$2$0.next = 12;
                return _regeneratorRuntime.awrap(this.getDeviceCountry());

              case 12:
                curCountry = context$2$0.sent.toLowerCase();

                if (!(!hasLanguage && country === curCountry)) {
                  context$2$0.next = 15;
                  break;
                }

                return context$2$0.abrupt('return', true);

              case 15:
                if (!(language === curLanguage && country === curCountry)) {
                  context$2$0.next = 17;
                  break;
                }

                return context$2$0.abrupt('return', true);

              case 17:
                context$2$0.next = 24;
                break;

              case 19:
                context$2$0.next = 21;
                return _regeneratorRuntime.awrap(this.getDeviceLocale());

              case 21:
                curLocale = context$2$0.sent.toLowerCase();

                if (!(language + '-' + country === curLocale)) {
                  context$2$0.next = 24;
                  break;
                }

                return context$2$0.abrupt('return', true);

              case 24:
                return context$2$0.abrupt('return', false);

              case 27:
                context$2$0.prev = 27;
                context$2$0.t0 = context$2$0['catch'](0);

                // if there has been an error, restart adb and retry
                _loggerJs2['default'].error('Unable to check device localization: ' + context$2$0.t0.message);
                _loggerJs2['default'].debug('Restarting ADB and retrying...');
                context$2$0.next = 33;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 33:
                throw context$2$0.t0;

              case 34:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[0, 27]]);
        }));

      case 12:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the locale name of the device under test.
 *
 * @param {string} language - Language. The language field is case insensitive, but Locale always canonicalizes to lower case.
 *                            format: [a-zA-Z]{2,8}. e.g. en, ja : https://developer.android.com/reference/java/util/Locale.html
 * @param {string} country - Country. The country (region) field is case insensitive, but Locale always canonicalizes to upper case.
 *                            format: [a-zA-Z]{2} | [0-9]{3}. e.g. US, JP : https://developer.android.com/reference/java/util/Locale.html
 */
apkUtilsMethods.setDeviceLanguageCountry = function callee$0$0(language, country) {
  var hasLanguage, hasCountry, wasSettingChanged, apiLevel, curLanguage, curCountry, curLocale, locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        hasLanguage = language && _lodash2['default'].isString(language);
        hasCountry = country && _lodash2['default'].isString(country);

        if (!(!hasLanguage && !hasCountry)) {
          context$1$0.next = 6;
          break;
        }

        _loggerJs2['default'].warn('setDeviceLanguageCountry requires language or country.');
        _loggerJs2['default'].warn('Got language: \'' + language + '\' and country: \'' + country + '\'');
        return context$1$0.abrupt('return');

      case 6:
        wasSettingChanged = false;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 9:
        apiLevel = context$1$0.sent;

        language = (language || '').toLowerCase();
        country = (country || '').toUpperCase();

        if (!(apiLevel < 23)) {
          context$1$0.next = 29;
          break;
        }

        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.getDeviceLanguage());

      case 15:
        curLanguage = context$1$0.sent.toLowerCase();
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getDeviceCountry());

      case 18:
        curCountry = context$1$0.sent.toUpperCase();

        if (!(hasLanguage && language !== curLanguage)) {
          context$1$0.next = 23;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(this.setDeviceLanguage(language));

      case 22:
        wasSettingChanged = true;

      case 23:
        if (!(hasCountry && country !== curCountry)) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(this.setDeviceCountry(country));

      case 26:
        wasSettingChanged = true;

      case 27:
        context$1$0.next = 50;
        break;

      case 29:
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(this.getDeviceLocale());

      case 31:
        curLocale = context$1$0.sent;

        if (!(apiLevel === 23)) {
          context$1$0.next = 42;
          break;
        }

        locale = undefined;

        if (!hasCountry) {
          locale = language;
        } else if (!hasLanguage) {
          locale = country;
        } else {
          locale = language + '-' + country;
        }

        _loggerJs2['default'].debug('Current locale: \'' + curLocale + '\'; requested locale: \'' + locale + '\'');

        if (!(locale.toLowerCase() !== curLocale.toLowerCase())) {
          context$1$0.next = 40;
          break;
        }

        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(this.setDeviceSysLocale(locale));

      case 39:
        wasSettingChanged = true;

      case 40:
        context$1$0.next = 50;
        break;

      case 42:
        if (!(!hasCountry || !hasLanguage)) {
          context$1$0.next = 46;
          break;
        }

        _loggerJs2['default'].warn('setDeviceLanguageCountry requires both language and country to be set for API 24+');
        _loggerJs2['default'].warn('Got language: \'' + language + '\' and country: \'' + country + '\'');
        return context$1$0.abrupt('return');

      case 46:

        _loggerJs2['default'].debug('Current locale: \'' + curLocale + '\'; requested locale: \'' + language + '-' + country + '\'');

        if (!((language + '-' + country).toLowerCase() !== curLocale.toLowerCase())) {
          context$1$0.next = 50;
          break;
        }

        context$1$0.next = 50;
        return _regeneratorRuntime.awrap(this.setDeviceSysLocaleViaSettingApp(language, country));

      case 50:
        if (!wasSettingChanged) {
          context$1$0.next = 54;
          break;
        }

        _loggerJs2['default'].info("Rebooting the device in order to apply new locale via 'setting persist.sys.locale' command.");
        context$1$0.next = 54;
        return _regeneratorRuntime.awrap(this.reboot());

      case 54:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the package name from local apk file.
 *
 * @param {string} apk - The full path to existing .apk package on the local
 *                       file system.
 * @return {string} The parsed package name or _null_ if it cannot be parsed.
 */
apkUtilsMethods.getPackageName = function callee$0$0(apk) {
  var args, _ref2, stdout, apkPackage;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        args = ['dump', 'badging', apk];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 5:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        apkPackage = new RegExp(/package: name='([^']+)'/g).exec(stdout);

        if (apkPackage && apkPackage.length >= 2) {
          apkPackage = apkPackage[1];
        } else {
          apkPackage = null;
        }
        return context$1$0.abrupt('return', apkPackage);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Objcet} AppInfo
 * @property {string} name - Package name, for example 'com.acme.app'.
 * @property {number} versionCode - Version code.
 * @property {string} versionName - Version name, for example '1.0'.
 */

/**
 * Get the package info from local apk file.
 *
 * @param {string} apkPath - The full path to existing .apk package on the local
 *                           file system.
 * @return {?AppInfo} The parsed application information.
 */
apkUtilsMethods.getApkInfo = function callee$0$0(apkPath) {
  var _ref3, stdout, matches;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apkPath));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].errorAndThrow('The file at path ' + apkPath + ' does not exist or is not accessible');

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 6:
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, ['d', 'badging', apkPath]));

      case 9:
        _ref3 = context$1$0.sent;
        stdout = _ref3.stdout;
        matches = new RegExp(/package: name='([^']+)' versionCode='(\d+)' versionName='([^']+)'/).exec(stdout);

        if (!matches) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt('return', {
          name: matches[1],
          versionCode: parseInt(matches[2], 10),
          versionName: matches[3]
        });

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](6);

        _loggerJs2['default'].warn('Error "' + context$1$0.t0.message + '" while getting badging info');

      case 19:
        return context$1$0.abrupt('return', {});

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 16]]);
};

/**
 * Get the package info from the installed application.
 *
 * @param {string} pkg - The name of the installed package.
 * @return {?AppInfo} The parsed application information.
 */
apkUtilsMethods.getPackageInfo = function callee$0$0(pkg) {
  var result, stdout, versionNameMatch, versionCodeMatch;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Getting package info for ' + pkg);
        result = { name: pkg };
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'package', pkg]));

      case 5:
        stdout = context$1$0.sent;
        versionNameMatch = new RegExp(/versionName=([\d+\.]+)/).exec(stdout);

        if (versionNameMatch) {
          result.versionName = versionNameMatch[1];
        }
        versionCodeMatch = new RegExp(/versionCode=(\d+)/).exec(stdout);

        if (versionCodeMatch) {
          result.versionCode = parseInt(versionCodeMatch[1], 10);
        }
        return context$1$0.abrupt('return', result);

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].warn('Error "' + context$1$0.t0.message + '" while dumping package info');

      case 16:
        return context$1$0.abrupt('return', result);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 13]]);
};

exports['default'] = apkUtilsMethods;
module.exports = exports['default'];
// https://regex101.com/r/xZ8vF7/1

// figure out the number of retries. Try once if waitMs is less that 750
// 30 times if parsing is not possible

// on some systems this will throw an error if the app already
// exists

// this method is only used in API < 23

// this method is only used in API < 23

// this method is only used in API < 23

// this method is only used in API >= 23
// API >= 24
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hcGstdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3lCQUE4QixlQUFlOzs0QkFDeEIsY0FBYzs7d0JBQ25CLGNBQWM7Ozs7b0JBQ2IsTUFBTTs7OztzQkFDVCxRQUFROzs7O3dCQUNRLFVBQVU7OzZCQUNyQixnQkFBZ0I7O0FBR25DLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRekIsZUFBZSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsR0FBRztNQUU1QyxTQUFTLEVBRVQsTUFBTSxFQUNOLGVBQWU7Ozs7O0FBSGYsaUJBQVMsR0FBRyxLQUFLOztBQUNyQiw4QkFBSSxLQUFLLGlDQUErQixHQUFHLENBQUcsQ0FBQzs7eUNBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBQTFELGNBQU07QUFDTix1QkFBZSxHQUFHLElBQUksTUFBTSxlQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFLLEdBQUcsQ0FBQzs7QUFDbEYsaUJBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLDhCQUFJLEtBQUssYUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFBLGdCQUFhLENBQUM7NENBQ2xELFNBQVM7Ozs7OztBQUVoQiw4QkFBSSxhQUFhLHlEQUF1RCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRXhGLENBQUM7Ozs7Ozs7O0FBUUYsZUFBZSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsR0FBRyxFQUFFLEdBQUc7TUFLM0MsSUFBSTs7OztBQUpWLFlBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDaEIsZ0NBQUksYUFBYSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDN0Q7O0FBRUssWUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFLElBQUksRUFDN0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDOzt5Q0FDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUFFdEIsOEJBQUksYUFBYSxvRUFBdUQsQ0FBQzs7Ozs7OztDQUU1RSxDQUFDOzs7Ozs7Ozs7OztBQVdGLGVBQWUsQ0FBQyxRQUFRLEdBQUc7TUFBZ0IsZUFBZSx5REFBRyxFQUFFO01BaUJ2RCxRQUFRLEVBQ1IsR0FBRyxFQUNILE1BQU07Ozs7OztBQWpCVixZQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7QUFDckQsZ0NBQUksYUFBYSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7U0FDN0U7QUFDRCx1QkFBZSxHQUFHLG9CQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMzQyx1QkFBZSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7OztBQUd4RSw0QkFBRSxRQUFRLENBQUMsZUFBZSxFQUFFO0FBQzFCLGlCQUFPLEVBQUUsZUFBZSxDQUFDLEdBQUc7QUFDNUIsc0JBQVksRUFBRSxLQUFLO0FBQ25CLGVBQUssRUFBRSxJQUFJO0FBQ1gsaUJBQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDOztBQUVILHVCQUFlLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQzs7eUNBQ3BELElBQUksQ0FBQyxXQUFXLEVBQUU7OztBQUFuQyxnQkFBUTtBQUNSLFdBQUcsR0FBRyw4QkFBYyxlQUFlLEVBQUUsUUFBUSxDQUFDOzt5Q0FDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7OztBQUE5QixjQUFNOztjQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBOzs7OztjQUNyQyxlQUFlLENBQUMsS0FBSyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFBOzs7OztBQUM5RCw4QkFBSSxLQUFLLENBQUMsb0RBQW9ELEdBQ3BELHVDQUF1QyxDQUFDLENBQUM7QUFDbkQsdUJBQWUsQ0FBQyxRQUFRLFNBQU8sZUFBZSxDQUFDLFFBQVEsQUFBRSxDQUFDO0FBQzFELHVCQUFlLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs0Q0FDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7OztBQUVyQyw4QkFBSSxhQUFhLENBQUMsd0RBQXdELEdBQ3hELDREQUE0RCxDQUFDLENBQUM7Ozs7Ozs7QUFFN0UsWUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7O0FBRS9ELGdDQUFJLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQzNEOzs7YUFDRyxlQUFlLENBQUMsWUFBWTs7Ozs7O3lDQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFlBQVksRUFDckQsZUFBZSxDQUFDLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUcxRCw4QkFBSSxhQUFhLHdEQUFzRCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRXZGLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQWVGLGVBQWUsQ0FBQyw0QkFBNEIsR0FBRztNQUV6QyxHQUFHLEVBQ0gsTUFBTSxFQUNOLFFBQVEsRUFHTixNQUFNLEVBQ04sY0FBYyxrRkFDVCxJQUFJLEVBQ1AsVUFBVTs7Ozs7QUFUbEIsOEJBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFDOUMsV0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7QUFDdEMsY0FBTSxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQ3ZDLGdCQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsNENBQTRDLEdBQzVDLGlEQUFpRCxDQUFDOzs7eUNBRXZELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzs7QUFBOUIsY0FBTTtBQUNOLHNCQUFjLEdBQUcsS0FBSzs7Ozs7aUNBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O0FBQTFCLFlBQUk7QUFDUCxrQkFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUNoQyxVQUFVOzs7Ozs0Q0FDTCxFQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQzs7O0FBQ3ZFLFlBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM1Qix3QkFBYyxHQUFHLElBQUksQ0FBQztTQUN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBRUMsY0FBYzs7Ozs7NENBQ1QsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUM7OztBQUU1Qyw4QkFBSSxhQUFhLENBQUMsdUNBQXVDLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQUc3RCw4QkFBSSxhQUFhLDZEQUEyRCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRTVGLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRixlQUFlLENBQUMsb0JBQW9CLEdBQUcsb0JBQWdCLEdBQUcsRUFBRSxRQUFRLEVBQUUsV0FBVztNQUFFLE1BQU0seURBQUcsS0FBSzs7TUFPekYsVUFBVSxFQUVWLFdBQVcsRUFDWCxhQUFhLEVBRWYscUJBQXFCLHVGQUNoQixXQUFXLHVGQUdQLFVBQVUsRUFXbkIsd0JBQXdCLEVBTXhCLE9BQU87Ozs7Ozs7Y0FoQ1AsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7Ozs7O2NBQ2IsSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUM7OztBQUVuRCw4QkFBSSxLQUFLLENBQUMsbUJBQWlCLE1BQU0sd0NBQWtDLEdBQUcsaUNBQzlDLFFBQVEsY0FBTyxXQUFXLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQSxpQkFBYSxDQUFDLENBQUM7O0FBRXpFLGtCQUFVLEdBQUcsU0FBYixVQUFVLENBQUksS0FBSztpQkFBSyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7bUJBQUssSUFBSSxDQUFDLElBQUksRUFBRTtXQUFBLENBQUM7U0FBQTs7QUFFbkUsbUJBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO0FBQzdCLHFCQUFhLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztBQUV0Qyw2QkFBcUIsR0FBRyxFQUFFOzs7OztrQ0FDTixhQUFhOzs7Ozs7OztBQUE1QixtQkFBVzs7YUFDZCxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7QUFFN0IsdUNBQXVCLFdBQVcseUdBQUU7QUFBM0Isb0JBQVU7O0FBQ2pCLCtCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFHLFVBQVUsR0FBRyxXQUFXLEVBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0QsNkJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTVDLDhCQUFJLEtBQUssMENBQXdDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7d0JBQVMsSUFBSTtTQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUcsQ0FBQzs7QUFFNUcsZ0NBQXdCLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLFVBQUMsb0JBQW9CO2lCQUM1RSxJQUFJLE1BQU0sT0FBSyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBSTtTQUFBLENBQzFHO0FBSUcsZUFBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7O0FBQzdDLGVBQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQzs7eUNBQ2xDLDZCQUFjLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQzNCLFVBQVUsRUFBRSxXQUFXOzs7Ozs7aURBQVUsSUFBSSxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQXBFLDBCQUFVLFFBQVYsVUFBVTtBQUFFLDJCQUFXLFFBQVgsV0FBVzs7c0JBQ3hCLFdBQVcsSUFBSSxVQUFVLENBQUE7Ozs7OztBQUMzQixzQkFBSSxzQkFBc0IsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFNLFVBQVUsR0FBRyxXQUFXLEdBQUssV0FBVyxDQUFDO0FBQ3ZHLHdDQUFJLEtBQUssdUJBQW9CLFVBQVUsaURBQTBDLHNCQUFzQixRQUFJLENBQUM7QUFDNUcsc0JBQUksUUFBUSxHQUFJLG9CQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLElBQ25DLG9CQUFFLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLGVBQWU7MkJBQUssZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQzttQkFBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLEFBQUMsQ0FBQztBQUNqSSxzQkFBSSxBQUFDLENBQUMsV0FBVyxJQUFJLFFBQVEsSUFBTSxXQUFXLElBQUksQ0FBQyxRQUFRLEFBQUMsRUFBRTtBQUM1RDs7c0JBQU87bUJBQ1I7Ozs7Ozs7Ozs7O0FBRUgsc0NBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7O3NCQUVqRCxJQUFJLEtBQUssQ0FBSSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO2dDQUFTLElBQUk7aUJBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQVUsV0FBVyxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUEsQ0FBRzs7Ozs7OztTQUVqSSxDQUFDOzs7Ozs7O0NBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7OztBQVdGLGVBQWUsQ0FBQyxlQUFlLEdBQUcsb0JBQWdCLEdBQUcsRUFBRSxHQUFHO01BQUUsTUFBTSx5REFBRyxLQUFLOzs7Ozt5Q0FDbEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7Ozs7OztDQUN6RCxDQUFDOzs7Ozs7Ozs7OztBQVdGLGVBQWUsQ0FBQyxrQkFBa0IsR0FBRyxvQkFBZ0IsR0FBRyxFQUFFLEdBQUc7TUFBRSxNQUFNLHlEQUFHLEtBQUs7Ozs7O3lDQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDOzs7Ozs7O0NBQ3hELENBQUM7Ozs7Ozs7OztBQVNGLGVBQWUsQ0FBQyxZQUFZLEdBQUcsb0JBQWdCLEdBQUc7TUFNNUMsTUFBTTs7OztBQUxWLDhCQUFJLEtBQUssbUJBQWlCLEdBQUcsQ0FBRyxDQUFDOzt5Q0FDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7O0FBQ2pDLDhCQUFJLElBQUksQ0FBSSxHQUFHLG9FQUFpRSxDQUFDOzRDQUMxRSxLQUFLOzs7QUFFVixjQUFNOzs7eUNBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Ozs7eUNBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQzs7O0FBQWpFLGNBQU07Ozs7Ozs7O0FBRU4sOEJBQUksYUFBYSwrQ0FBNkMsZUFBRSxPQUFPLENBQUcsQ0FBQzs7O0FBRTdFLGNBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsOEJBQUksS0FBSywwQkFBd0IsTUFBTSxDQUFHLENBQUM7O2NBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Ozs7O0FBQ2xDLDhCQUFJLElBQUksQ0FBSSxHQUFHLG1DQUFnQyxDQUFDOzRDQUN6QyxJQUFJOzs7QUFFYiw4QkFBSSxJQUFJLENBQUksR0FBRywwQkFBdUIsQ0FBQzs0Q0FDaEMsS0FBSzs7Ozs7OztDQUNiLENBQUM7Ozs7Ozs7Ozs7QUFVRixlQUFlLENBQUMscUJBQXFCLEdBQUcsb0JBQWdCLGVBQWU7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFDNUUsTUFBTTs7Ozs7eUNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQzs7O0FBQXpFLGNBQU07O0FBQ1YsWUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLGdDQUFJLGFBQWEsNkJBQTJCLE1BQU0sQ0FBRyxDQUFDO1NBQ3ZEOzs7Ozs7O0NBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7O0FBWUYsZUFBZSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsR0FBRztNQUFFLE9BQU8seURBQUcsSUFBSTtNQUFFLE9BQU8seURBQUcsS0FBSzs7OzthQUN4RSxPQUFPOzs7Ozs7eUNBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFDLENBQUM7Ozs7Ozs7Ozt5Q0FHN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUMsQ0FBQzs7Ozs7Ozs7OztjQUkzQyxlQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTs7Ozs7Ozs7QUFHL0QsOEJBQUksS0FBSyxvQkFBaUIsR0FBRyx1Q0FBbUMsQ0FBQzs7Ozs7OztDQUd0RSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBYUYsZUFBZSxDQUFDLGdCQUFnQixHQUFHLG9CQUFnQixHQUFHO01BQUUsR0FBRyx5REFBRyxJQUFJO01BQUUsT0FBTyx5REFBRyxLQUFLO01BQzdFLE9BQU8sRUFnQkwsT0FBTyxFQUNQLGNBQWMsRUFJZCxjQUFjOzs7O0FBckJoQixlQUFPLEdBQUcsSUFBSTs7WUFDYixHQUFHOzs7Ozs7eUNBQ1UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7OztBQUFwQyxlQUFPOztBQUNQLFdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOzs7WUFFaEIsR0FBRzs7Ozs7QUFDTiw4QkFBSSxJQUFJLHNDQUFvQyxHQUFHLHlEQUFzRCxDQUFDOzs7Ozt5Q0FJN0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7O0FBQ2pDLDhCQUFJLEtBQUssWUFBUyxHQUFHLGtDQUE4QixDQUFDOzt5Q0FDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQzs7Ozs7Ozt5Q0FJbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7OztBQUF4QyxlQUFPO0FBQ1Asc0JBQWMsR0FBRyxPQUFPLENBQUMsV0FBVzs7WUFDckMsT0FBTzs7Ozs7O3lDQUNNLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDOzs7QUFBcEMsZUFBTzs7O0FBRUgsc0JBQWMsR0FBRyxPQUFPLENBQUMsV0FBVzs7Y0FFdEMsb0JBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLG9CQUFFLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTs7Ozs7QUFDaEUsOEJBQUksSUFBSSxxQ0FBa0MsR0FBRyxvQkFBYSxHQUFHLDJEQUF1RCxDQUFDOzs7O2NBR25ILGNBQWMsSUFBSSxjQUFjLENBQUE7Ozs7O0FBQ2xDLDhCQUFJLEtBQUssc0JBQW1CLEdBQUcsNkNBQXVDLGNBQWMsWUFBTyxjQUFjLE9BQUksQ0FBQzs7OztBQUdoSCw4QkFBSSxLQUFLLENBQUMscUJBQWtCLEdBQUcsbUNBQTRCLEdBQUcsWUFBTSxjQUFjLFdBQU0sY0FBYyw4QkFDekUsQ0FBQyxDQUFDOzs7eUNBRXZCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7Ozs7Ozs7Ozs7QUFFdEMsOEJBQUksSUFBSSx1QkFBb0IsR0FBRyx3QkFBaUIsZUFBSSxPQUFPLCtCQUEyQixDQUFDOzt5Q0FDNUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7O0FBQy9CLDhCQUFJLGFBQWEsUUFBSyxHQUFHLHNDQUFrQyxDQUFDOzs7O3lDQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDOzs7Ozs7O0NBRTFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRixlQUFlLENBQUMscUJBQXFCLEdBQUcsb0JBQWdCLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRztNQUVwRSxXQUFXLEVBQ1gsU0FBUyxFQUlULFFBQVEsRUFDUixJQUFJLEVBQ0osUUFBUSxFQUFFLFVBQVUsRUFtQmxCLEdBQUc7Ozs7QUEzQlQsOEJBQUksS0FBSyx3Q0FBcUMsUUFBUSxJQUFJLFNBQVMsQ0FBQSxDQUFHLENBQUM7QUFDbkUsbUJBQVcsR0FBRyxjQUFjO0FBQzVCLGlCQUFTOztZQUNSLFFBQVE7Ozs7Ozt5Q0FDTSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7OztBQUF6QyxnQkFBUTs7O0FBRU4sZ0JBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0FBQzVDLFlBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUM7QUFDL0QsZ0JBQVEsY0FBRSxVQUFVOzs7eUNBRWhCLHdCQUFLLE1BQU0sRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUFFeEIsOEJBQUksS0FBSyxDQUFDLG1DQUFnQyxRQUFRLHlDQUMzQixDQUFDLENBQUM7QUFDekIsWUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzt5Q0FDTCx3QkFBSyxNQUFNLEVBQUUsSUFBSSxDQUFDOzs7OztBQUl4Qiw4QkFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztBQUN6RCxpQkFBUyxHQUFHLGtCQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7O3lDQUN2QixrQkFBRyxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQzs7O0FBQS9DLGdCQUFROztBQUNSLGtCQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7QUFFbEMsWUFBSSxRQUFRLEVBQUU7QUFDWixnQ0FBSSxLQUFLLDRCQUEwQixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBRyxDQUFDO1NBQzlEO0FBQ0csV0FBRyxHQUFHLHNFQUNVLGVBQUUsT0FBTyxDQUFFOztBQUMvQiw4QkFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs0Q0FFbEIsRUFBQyxVQUFVLEVBQVYsVUFBVSxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUM7Ozs7Ozs7Q0FDL0IsQ0FBQzs7Ozs7OztBQU9GLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRztNQUM5QixRQUFROzs7O0FBQVIsZ0JBQVE7O3lDQUNGLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7OytCQUFHLEVBQUU7Ozs7Ozt5Q0FDZCxJQUFJLENBQUMsb0JBQW9CLEVBQUU7OztBQUE1QyxnQkFBUTs7WUFDSCxRQUFROzs7Ozs7eUNBQ00sSUFBSSxDQUFDLHdCQUF3QixFQUFFOzs7QUFBaEQsZ0JBQVE7Ozs7Ozs7O3lDQUdRLElBQUksQ0FBQyxlQUFlLEVBQUU7OztBQUF4QyxnQkFBUSxvQkFBa0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDOzs7NENBRWpELFFBQVE7Ozs7Ozs7Q0FDaEIsQ0FBQzs7Ozs7OztBQU9GLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxvQkFBZ0IsUUFBUTs7Ozs7eUNBRXBELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Q0FDMUMsQ0FBQzs7Ozs7OztBQU9GLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBRztNQUU3QixPQUFPOzs7Ozt5Q0FBUyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7OztBQUExQyxlQUFPOztZQUNOLE9BQU87Ozs7Ozt5Q0FDTSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7OztBQUE5QyxlQUFPOzs7NENBRUYsT0FBTzs7Ozs7OztDQUNmLENBQUM7Ozs7Ozs7QUFPRixlQUFlLENBQUMsZ0JBQWdCLEdBQUcsb0JBQWdCLE9BQU87Ozs7O3lDQUVsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0NBQ3hDLENBQUM7Ozs7Ozs7QUFPRixlQUFlLENBQUMsZUFBZSxHQUFHO01BRTVCLE1BQU07Ozs7O3lDQUFTLElBQUksQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQXhDLGNBQU07O1lBQ0wsTUFBTTs7Ozs7O3lDQUNNLElBQUksQ0FBQyxzQkFBc0IsRUFBRTs7O0FBQTVDLGNBQU07Ozs0Q0FFRCxNQUFNOzs7Ozs7O0NBQ2QsQ0FBQzs7Ozs7Ozs7QUFRRixlQUFlLENBQUMsZUFBZSxHQUFHLG9CQUFnQixNQUFNO01BQ2hELGNBQWMsRUFNaEIsWUFBWTs7OztBQU5WLHNCQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUM7O1lBQ3RELGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7OztBQUM5Qiw4QkFBSSxJQUFJLGlFQUFpRSxDQUFDOzs7O0FBSXhFLG9CQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O3lDQUM5QixJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztDQUN0RSxDQUFDOzs7Ozs7Ozs7O0FBVUYsZUFBZSxDQUFDLG1CQUFtQixHQUFHLG9CQUFnQixRQUFRLEVBQUUsT0FBTztNQUMvRCxXQUFXLEVBQ1gsVUFBVSxFQVdWLFFBQVE7Ozs7OztBQVpSLG1CQUFXLEdBQUcsb0JBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUNsQyxrQkFBVSxHQUFHLG9CQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7O2NBRWxDLENBQUMsV0FBVyxJQUFJLENBQUMsVUFBVSxDQUFBOzs7OztBQUM3Qiw4QkFBSSxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQzs0Q0FDdEQsS0FBSzs7Ozs7QUFJZCxnQkFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQSxDQUFFLFdBQVcsRUFBRSxDQUFDO0FBQzFDLGVBQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUEsQ0FBRSxXQUFXLEVBQUUsQ0FBQzs7O3lDQUVqQixJQUFJLENBQUMsV0FBVyxFQUFFOzs7QUFBbkMsZ0JBQVE7O3lDQUVELDZCQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7Y0FHMUIsV0FBVyxFQUFFLFVBQVUsRUFpQnJCLFNBQVM7Ozs7OztzQkFsQmIsUUFBUSxHQUFHLEVBQUUsQ0FBQTs7Ozs7QUFDWCwyQkFBVyxjQUFFLFVBQVU7O3FCQUN2QixXQUFXOzs7Ozs7aURBQ1EsSUFBSSxDQUFDLGlCQUFpQixFQUFFOzs7QUFBN0MsMkJBQVcsb0JBQW9DLFdBQVc7O3NCQUN0RCxDQUFDLFVBQVUsSUFBSSxRQUFRLEtBQUssV0FBVyxDQUFBOzs7OztvREFDbEMsSUFBSTs7O3FCQUdYLFVBQVU7Ozs7OztpREFDUSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7OztBQUEzQywwQkFBVSxvQkFBbUMsV0FBVzs7c0JBQ3BELENBQUMsV0FBVyxJQUFJLE9BQU8sS0FBSyxVQUFVLENBQUE7Ozs7O29EQUNqQyxJQUFJOzs7c0JBR1gsUUFBUSxLQUFLLFdBQVcsSUFBSSxPQUFPLEtBQUssVUFBVSxDQUFBOzs7OztvREFDN0MsSUFBSTs7Ozs7Ozs7aURBR1ksSUFBSSxDQUFDLGVBQWUsRUFBRTs7O0FBQXpDLHlCQUFTLG9CQUFrQyxXQUFXOztzQkFDeEQsQUFBRyxRQUFRLFNBQUksT0FBTyxLQUFPLFNBQVMsQ0FBQTs7Ozs7b0RBQ2pDLElBQUk7OztvREFHUixLQUFLOzs7Ozs7O0FBR1osc0NBQUksS0FBSywyQ0FBeUMsZUFBSSxPQUFPLENBQUcsQ0FBQztBQUNqRSxzQ0FBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzs7aURBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUU7Ozs7Ozs7Ozs7U0FHMUIsQ0FBQzs7Ozs7Ozs7OztDQUNILENBQUM7Ozs7Ozs7Ozs7QUFVRixlQUFlLENBQUMsd0JBQXdCLEdBQUcsb0JBQWdCLFFBQVEsRUFBRSxPQUFPO01BQ3RFLFdBQVcsRUFDWCxVQUFVLEVBTVYsaUJBQWlCLEVBQ2pCLFFBQVEsRUFNTixXQUFXLEVBQ1gsVUFBVSxFQVVWLFNBQVMsRUFHUCxNQUFNOzs7O0FBNUJWLG1CQUFXLEdBQUcsUUFBUSxJQUFJLG9CQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDOUMsa0JBQVUsR0FBRyxPQUFPLElBQUksb0JBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7Y0FDM0MsQ0FBQyxXQUFXLElBQUksQ0FBQyxVQUFVLENBQUE7Ozs7O0FBQzdCLDhCQUFJLElBQUksMERBQTBELENBQUM7QUFDbkUsOEJBQUksSUFBSSxzQkFBbUIsUUFBUSwwQkFBbUIsT0FBTyxRQUFJLENBQUM7Ozs7QUFHaEUseUJBQWlCLEdBQUcsS0FBSzs7eUNBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBRTs7O0FBQW5DLGdCQUFROztBQUVaLGdCQUFRLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBLENBQUUsV0FBVyxFQUFFLENBQUM7QUFDMUMsZUFBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQSxDQUFFLFdBQVcsRUFBRSxDQUFDOztjQUVwQyxRQUFRLEdBQUcsRUFBRSxDQUFBOzs7Ozs7eUNBQ1UsSUFBSSxDQUFDLGlCQUFpQixFQUFFOzs7QUFBN0MsbUJBQVcsb0JBQW9DLFdBQVc7O3lDQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7OztBQUEzQyxrQkFBVSxvQkFBbUMsV0FBVzs7Y0FDeEQsV0FBVyxJQUFJLFFBQVEsS0FBSyxXQUFXLENBQUE7Ozs7Ozt5Q0FDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQzs7O0FBQ3RDLHlCQUFpQixHQUFHLElBQUksQ0FBQzs7O2NBRXZCLFVBQVUsSUFBSSxPQUFPLEtBQUssVUFBVSxDQUFBOzs7Ozs7eUNBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7OztBQUNwQyx5QkFBaUIsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7O3lDQUdMLElBQUksQ0FBQyxlQUFlLEVBQUU7OztBQUF4QyxpQkFBUzs7Y0FFVCxRQUFRLEtBQUssRUFBRSxDQUFBOzs7OztBQUNiLGNBQU07O0FBQ1YsWUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNmLGdCQUFNLEdBQUcsUUFBUSxDQUFDO1NBQ25CLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUN2QixnQkFBTSxHQUFHLE9BQU8sQ0FBQztTQUNsQixNQUFNO0FBQ0wsZ0JBQU0sR0FBTSxRQUFRLFNBQUksT0FBTyxBQUFFLENBQUM7U0FDbkM7O0FBRUQsOEJBQUksS0FBSyx3QkFBcUIsU0FBUyxnQ0FBeUIsTUFBTSxRQUFJLENBQUM7O2NBQ3ZFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7Ozs7Ozt5Q0FDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQzs7O0FBQ3JDLHlCQUFpQixHQUFHLElBQUksQ0FBQzs7Ozs7OztjQUd2QixDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQTs7Ozs7QUFDN0IsOEJBQUksSUFBSSxxRkFBcUYsQ0FBQztBQUM5Riw4QkFBSSxJQUFJLHNCQUFtQixRQUFRLDBCQUFtQixPQUFPLFFBQUksQ0FBQzs7Ozs7QUFJcEUsOEJBQUksS0FBSyx3QkFBcUIsU0FBUyxnQ0FBeUIsUUFBUSxTQUFJLE9BQU8sUUFBSSxDQUFDOztjQUNwRixDQUFHLFFBQVEsU0FBSSxPQUFPLEVBQUcsV0FBVyxFQUFFLEtBQUssU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7Ozs7eUNBQzlELElBQUksQ0FBQywrQkFBK0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDOzs7YUFLL0QsaUJBQWlCOzs7OztBQUNuQiw4QkFBSSxJQUFJLENBQUMsNkZBQTZGLENBQUMsQ0FBQzs7eUNBQ2xHLElBQUksQ0FBQyxNQUFNLEVBQUU7Ozs7Ozs7Q0FFdEIsQ0FBQzs7Ozs7Ozs7O0FBU0YsZUFBZSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsR0FBRztNQUM5QyxJQUFJLFNBRUgsTUFBTSxFQUNQLFVBQVU7Ozs7O0FBSFYsWUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUM7O3lDQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFOzs7O3lDQUNBLHdCQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzs7OztBQUE5QyxjQUFNLFNBQU4sTUFBTTtBQUNQLGtCQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUNwRSxZQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUN4QyxvQkFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QixNQUFNO0FBQ0wsb0JBQVUsR0FBRyxJQUFJLENBQUM7U0FDbkI7NENBQ00sVUFBVTs7Ozs7OztDQUNsQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JGLGVBQWUsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLE9BQU87YUFNekMsTUFBTSxFQUNQLE9BQU87Ozs7Ozt5Q0FOSixrQkFBRyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7OztBQUMzQiw4QkFBSSxhQUFhLHVCQUFxQixPQUFPLDBDQUF1QyxDQUFDOzs7O3lDQUVqRixJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozt5Q0FFSSx3QkFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7QUFBbkUsY0FBTSxTQUFOLE1BQU07QUFDUCxlQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsbUVBQW1FLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzthQUN4RyxPQUFPOzs7Ozs0Q0FDRjtBQUNMLGNBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLHFCQUFXLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDckMscUJBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3hCOzs7Ozs7Ozs7O0FBR0gsOEJBQUksSUFBSSxhQUFXLGVBQUksT0FBTyxrQ0FBK0IsQ0FBQzs7OzRDQUV6RCxFQUFFOzs7Ozs7O0NBQ1YsQ0FBQzs7Ozs7Ozs7QUFRRixlQUFlLENBQUMsY0FBYyxHQUFHLG9CQUFnQixHQUFHO01BRTlDLE1BQU0sRUFFRixNQUFNLEVBQ04sZ0JBQWdCLEVBSWhCLGdCQUFnQjs7OztBQVJ4Qiw4QkFBSSxLQUFLLCtCQUE2QixHQUFHLENBQUcsQ0FBQztBQUN6QyxjQUFNLEdBQUcsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFDOzs7eUNBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7OztBQUF0RCxjQUFNO0FBQ04sd0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUMxRSxZQUFJLGdCQUFnQixFQUFFO0FBQ3BCLGdCQUFNLENBQUMsV0FBVyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO0FBQ0ssd0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUNyRSxZQUFJLGdCQUFnQixFQUFFO0FBQ3BCLGdCQUFNLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN4RDs0Q0FDTSxNQUFNOzs7Ozs7QUFFYiw4QkFBSSxJQUFJLGFBQVcsZUFBSSxPQUFPLGtDQUErQixDQUFDOzs7NENBRXpELE1BQU07Ozs7Ozs7Q0FDZCxDQUFDOztxQkFFYSxlQUFlIiwiZmlsZSI6ImxpYi90b29scy9hcGstdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBidWlsZFN0YXJ0Q21kIH0gZnJvbSAnLi4vaGVscGVycy5qcyc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcblxuXG5sZXQgYXBrVXRpbHNNZXRob2RzID0ge307XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgcGFydGljdWxhciBwYWNrYWdlIGlzIHByZXNlbnQgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgbmFtZSBvZiB0aGUgcGFja2FnZSB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBhY2thZ2UgaXMgaW5zdGFsbGVkLlxuICovXG5hcGtVdGlsc01ldGhvZHMuaXNBcHBJbnN0YWxsZWQgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XG4gIHRyeSB7XG4gICAgbGV0IGluc3RhbGxlZCA9IGZhbHNlO1xuICAgIGxvZy5kZWJ1ZyhgR2V0dGluZyBpbnN0YWxsIHN0YXR1cyBmb3IgJHtwa2d9YCk7XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydwbScsICdsaXN0JywgJ3BhY2thZ2VzJywgcGtnXSk7XG4gICAgbGV0IGFwa0luc3RhbGxlZFJneCA9IG5ldyBSZWdFeHAoYF5wYWNrYWdlOiR7cGtnLnJlcGxhY2UoLyhcXC4pL2csIFwiXFxcXCQxXCIpfSRgLCAnbScpO1xuICAgIGluc3RhbGxlZCA9IGFwa0luc3RhbGxlZFJneC50ZXN0KHN0ZG91dCk7XG4gICAgbG9nLmRlYnVnKGBBcHAgaXMkeyFpbnN0YWxsZWQgPyAnIG5vdCcgOiAnJ30gaW5zdGFsbGVkYCk7XG4gICAgcmV0dXJuIGluc3RhbGxlZDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBmaW5kaW5nIGlmIGFwcCBpcyBpbnN0YWxsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydCB0aGUgcGFydGljdWxhciBVUkkgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgLSBUaGUgbmFtZSBvZiBVUkkgdG8gc3RhcnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gc3RhcnQgdGhlIFVSSSB3aXRoLlxuICovXG5hcGtVdGlsc01ldGhvZHMuc3RhcnRVcmkgPSBhc3luYyBmdW5jdGlvbiAodXJpLCBwa2cpIHtcbiAgaWYgKCF1cmkgfHwgIXBrZykge1xuICAgIGxvZy5lcnJvckFuZFRocm93KFwiVVJJIGFuZCBwYWNrYWdlIGFyZ3VtZW50cyBhcmUgcmVxdWlyZWRcIik7XG4gIH1cbiAgdHJ5IHtcbiAgICBsZXQgYXJncyA9IFtcImFtXCIsIFwic3RhcnRcIiwgXCItV1wiLCBcIi1hXCIsIFwiYW5kcm9pZC5pbnRlbnQuYWN0aW9uLlZJRVdcIiwgXCItZFwiLFxuICAgICAgICAgICAgICAgIHVyaS5yZXBsYWNlKC8mL2csICdcXFxcJicpLCBwa2ddO1xuICAgIGF3YWl0IHRoaXMuc2hlbGwoYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgYXR0ZW1wdGluZyB0byBzdGFydCBVUkkuIE9yaWdpbmFsIGVycm9yOiAke2V9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnQgdGhlIHBhcnRpY3VsYXIgcGFja2FnZSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXJ0QXBwT3B0aW9ucyBbe31dIC0gU3RhcnR1cCBvcHRpb25zIG1hcHBpbmcuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBtYW5kYXRvcnkgdGhhdCAnYWN0aXZpdHknIGFuZCAncGtnJyBwcm9wZXJ0aWVzIGFyZSBzZXQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRpdGlvbmFsIHN1cHBvcnRlZCBwcm9wZXJ0aWVzIGFyZTogJ3JldHJ5JywgJ3N0b3BBcHAnLCAnd2FpdFBrZydcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCAnd2FpdEFjdGl2aXR5Jy5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG91dHB1dCBvZiB0aGUgY29ycmVzcG9uZGluZyBhZGIgY29tbWFuZC5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLnN0YXJ0QXBwID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0QXBwT3B0aW9ucyA9IHt9KSB7XG4gIHRyeSB7XG4gICAgaWYgKCFzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHkgfHwgIXN0YXJ0QXBwT3B0aW9ucy5wa2cpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KFwiYWN0aXZpdHkgYW5kIHBrZyBpcyByZXF1aXJlZCBmb3IgbGF1bmNoaW5nIGFwcGxpY2F0aW9uXCIpO1xuICAgIH1cbiAgICBzdGFydEFwcE9wdGlvbnMgPSBfLmNsb25lKHN0YXJ0QXBwT3B0aW9ucyk7XG4gICAgc3RhcnRBcHBPcHRpb25zLmFjdGl2aXR5ID0gc3RhcnRBcHBPcHRpb25zLmFjdGl2aXR5LnJlcGxhY2UoJyQnLCAnXFxcXCQnKTtcblxuICAgIC8vIGluaXRpYWxpemluZyBkZWZhdWx0c1xuICAgIF8uZGVmYXVsdHMoc3RhcnRBcHBPcHRpb25zLCB7XG4gICAgICB3YWl0UGtnOiBzdGFydEFwcE9wdGlvbnMucGtnLFxuICAgICAgd2FpdEFjdGl2aXR5OiBmYWxzZSxcbiAgICAgIHJldHJ5OiB0cnVlLFxuICAgICAgc3RvcEFwcDogdHJ1ZVxuICAgIH0pO1xuICAgIC8vIHByZXZlbnRpbmcgbnVsbCB3YWl0cGtnXG4gICAgc3RhcnRBcHBPcHRpb25zLndhaXRQa2cgPSBzdGFydEFwcE9wdGlvbnMud2FpdFBrZyB8fCBzdGFydEFwcE9wdGlvbnMucGtnO1xuICAgIGxldCBhcGlMZXZlbCA9IGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKTtcbiAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChzdGFydEFwcE9wdGlvbnMsIGFwaUxldmVsKTtcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChjbWQpO1xuICAgIGlmIChzdGRvdXQuaW5kZXhPZihcIkVycm9yOiBBY3Rpdml0eSBjbGFzc1wiKSAhPT0gLTEgJiZcbiAgICAgICAgc3Rkb3V0LmluZGV4T2YoXCJkb2VzIG5vdCBleGlzdFwiKSAhPT0gLTEpIHtcbiAgICAgIGlmIChzdGFydEFwcE9wdGlvbnMucmV0cnkgJiYgc3RhcnRBcHBPcHRpb25zLmFjdGl2aXR5WzBdICE9PSBcIi5cIikge1xuICAgICAgICBsb2cuZGVidWcoXCJXZSB0cmllZCB0byBzdGFydCBhbiBhY3Rpdml0eSB0aGF0IGRvZXNuJ3QgZXhpc3QsIFwiICtcbiAgICAgICAgICAgICAgICAgIFwicmV0cnlpbmcgd2l0aCAuIHByZXBlbmRlZCB0byBhY3Rpdml0eVwiKTtcbiAgICAgICAgc3RhcnRBcHBPcHRpb25zLmFjdGl2aXR5ID0gYC4ke3N0YXJ0QXBwT3B0aW9ucy5hY3Rpdml0eX1gO1xuICAgICAgICBzdGFydEFwcE9wdGlvbnMucmV0cnkgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRBcHAoc3RhcnRBcHBPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KFwiQWN0aXZpdHkgdXNlZCB0byBzdGFydCBhcHAgZG9lc24ndCBleGlzdCBvciBjYW5ub3QgYmUgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhdW5jaGVkISBNYWtlIHN1cmUgaXQgZXhpc3RzIGFuZCBpcyBhIGxhdW5jaGFibGUgYWN0aXZpdHlcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGRvdXQuaW5kZXhPZihcImphdmEubGFuZy5TZWN1cml0eUV4Y2VwdGlvblwiKSAhPT0gLTEpIHtcbiAgICAgIC8vIGlmIHRoZSBhcHAgaXMgZGlzYWJsZWQgb24gYSByZWFsIGRldmljZSBpdCB3aWxsIHRocm93IGEgc2VjdXJpdHkgZXhjZXB0aW9uXG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIlBlcm1pc3Npb24gdG8gc3RhcnQgYWN0aXZpdHkgZGVuaWVkLlwiKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0QXBwT3B0aW9ucy53YWl0QWN0aXZpdHkpIHtcbiAgICAgIGF3YWl0IHRoaXMud2FpdEZvckFjdGl2aXR5KHN0YXJ0QXBwT3B0aW9ucy53YWl0UGtnLCBzdGFydEFwcE9wdGlvbnMud2FpdEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBcHBPcHRpb25zLndhaXREdXJhdGlvbik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIG9jY3VyZWQgd2hpbGUgc3RhcnRpbmcgQXBwLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGFja2FnZUFjdGl2aXR5SW5mb1xuICogQHByb3BlcnR5IHs/c3RyaW5nfSBhcHBQYWNrYWdlIC0gVGhlIG5hbWUgb2YgYXBwbGljYXRpb24gcGFja2FnZSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBleGFtcGxlICdjb20uYWNtZS5hcHAnLlxuICogQHByb3BlcnR5IHs/c3RyaW5nfSBhcHBBY3Rpdml0eSAtIFRoZSBuYW1lIG9mIG1haW4gYXBwbGljYXRpb24gYWN0aXZpdHkuXG4gKi9cblxuLyoqXG4gKiBHZXQgdGhlIG5hbWUgb2YgY3VycmVudGx5IGZvY3VzZWQgcGFja2FnZSBhbmQgYWN0aXZpdHkuXG4gKlxuICogQHJldHVybiB7UGFja2FnZUFjdGl2aXR5SW5mb30gVGhlIG1hcHBpbmcsIHdoZXJlIHByb3BlcnR5IG5hbWVzIGFyZSAnYXBwUGFja2FnZScgYW5kICdhcHBBY3Rpdml0eScuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgaXMgYW4gZXJyb3Igd2hpbGUgcGFyc2luZyB0aGUgZGF0YS5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5kZWJ1ZyhcIkdldHRpbmcgZm9jdXNlZCBwYWNrYWdlIGFuZCBhY3Rpdml0eVwiKTtcbiAgbGV0IGNtZCA9IFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddO1xuICBsZXQgbnVsbFJlID0gbmV3IFJlZ0V4cCgvbUZvY3VzZWRBcHA9bnVsbC8pO1xuICBsZXQgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdtRm9jdXNlZEFwcC4rUmVjb3JkXFxcXHsuKlxcXFxzKFteXFxcXHNcXFxcL1xcXFx9XSspJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFwvKFteXFxcXHNcXFxcL1xcXFx9XFxcXCxdKylcXFxcLD8oXFxcXHNbXlxcXFxzXFxcXC9cXFxcfV0rKSpcXFxcfScpOyAvLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL3haOHZGNy8xXG4gIHRyeSB7XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoY21kKTtcbiAgICBsZXQgZm91bmROdWxsTWF0Y2ggPSBmYWxzZTtcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgbGV0IGZvdW5kTWF0Y2ggPSBzZWFyY2hSZS5leGVjKGxpbmUpO1xuICAgICAgaWYgKGZvdW5kTWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHthcHBQYWNrYWdlOiBmb3VuZE1hdGNoWzFdLnRyaW0oKSwgYXBwQWN0aXZpdHk6IGZvdW5kTWF0Y2hbMl0udHJpbSgpfTtcbiAgICAgIH0gZWxzZSBpZiAobnVsbFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgZm91bmROdWxsTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm91bmROdWxsTWF0Y2gpIHtcbiAgICAgIHJldHVybiB7YXBwUGFja2FnZTogbnVsbCwgYXBwQWN0aXZpdHk6IG51bGx9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIkNvdWxkIG5vdCBwYXJzZSBhY3Rpdml0eSBmcm9tIGR1bXBzeXNcIik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBnZXQgZm9jdXNQYWNrYWdlQW5kQWN0aXZpdHkuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXYWl0IGZvciB0aGUgZ2l2ZW4gYWN0aXZpdHkgdG8gYmUgZm9jdXNlZC9ub24tZm9jdXNlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gd2FpdCBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aXZpdHkgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aXZpdHksIGJlbG9uZ2luZyB0byB0aGF0IHBhY2thZ2UsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB3YWl0IGZvci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gd2FpdEZvclN0b3AgLSBXaGV0aGVyIHRvIHdhaXQgdW50aWwgdGhlIGFjdGl2aXR5IGlzIGZvY3VzZWQgKHRydWUpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgaXMgbm90IGZvY3VzZWQgKGZhbHNlKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0TXMgWzIwMDAwXSAtIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgdGltZW91dCBvY2N1cnMuXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgdGltZW91dCBoYXBwZW5zLlxuICovXG5hcGtVdGlsc01ldGhvZHMud2FpdEZvckFjdGl2aXR5T3JOb3QgPSBhc3luYyBmdW5jdGlvbiAocGtnLCBhY3Rpdml0eSwgd2FpdEZvclN0b3AsIHdhaXRNcyA9IDIwMDAwKSB7XG4gIGlmICghcGtnIHx8ICFhY3Rpdml0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGFja2FnZSBhbmQgYWN0aXZpdHkgcmVxdWlyZWQuJyk7XG4gIH1cbiAgbG9nLmRlYnVnKGBXYWl0aW5nIHVwIHRvICR7d2FpdE1zfW1zIGZvciBhY3Rpdml0eSBtYXRjaGluZyBwa2c6ICcke3BrZ30nIGFuZCBgICtcbiAgICAgICAgICAgIGBhY3Rpdml0eTogJyR7YWN0aXZpdHl9JyB0byR7d2FpdEZvclN0b3AgPyAnIG5vdCcgOiAnJ30gYmUgZm9jdXNlZGApO1xuXG4gIGNvbnN0IHNwbGl0TmFtZXMgPSAobmFtZXMpID0+IG5hbWVzLnNwbGl0KCcsJykubWFwKChuYW1lKSA9PiBuYW1lLnRyaW0oKSk7XG5cbiAgY29uc3QgYWxsUGFja2FnZXMgPSBzcGxpdE5hbWVzKHBrZyk7XG4gIGNvbnN0IGFsbEFjdGl2aXRpZXMgPSBzcGxpdE5hbWVzKGFjdGl2aXR5KTtcblxuICBsZXQgcG9zc2libGVBY3Rpdml0eU5hbWVzID0gW107XG4gIGZvciAobGV0IG9uZUFjdGl2aXR5IG9mIGFsbEFjdGl2aXRpZXMpIHtcbiAgICBpZiAob25lQWN0aXZpdHkuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAvLyBhZGQgdGhlIHBhY2thZ2UgbmFtZSBpZiBhY3Rpdml0eSBpcyBub3QgZnVsbCBxdWFsaWZpZWRcbiAgICAgIGZvciAobGV0IGN1cnJlbnRQa2cgb2YgYWxsUGFja2FnZXMpIHtcbiAgICAgICAgcG9zc2libGVBY3Rpdml0eU5hbWVzLnB1c2goYCR7Y3VycmVudFBrZ30ke29uZUFjdGl2aXR5fWAucmVwbGFjZSgvXFwuKy9nLCAnLicpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWNjZXB0IGZ1bGx5IHF1YWxpZmllZCBhY3Rpdml0eSBuYW1lLlxuICAgICAgcG9zc2libGVBY3Rpdml0eU5hbWVzLnB1c2gob25lQWN0aXZpdHkpO1xuICAgIH1cbiAgfVxuICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gIGxvZy5kZWJ1ZyhgUG9zc2libGUgYWN0aXZpdGllcywgdG8gYmUgY2hlY2tlZDogJHtwb3NzaWJsZUFjdGl2aXR5TmFtZXMubWFwKChuYW1lKSA9PiBgJyR7bmFtZX0nYCkuam9pbignLCAnKX1gKTtcbiAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgbGV0IHBvc3NpYmxlQWN0aXZpdHlQYXR0ZXJucyA9IHBvc3NpYmxlQWN0aXZpdHlOYW1lcy5tYXAoKHBvc3NpYmxlQWN0aXZpdHlOYW1lKSA9PlxuICAgIG5ldyBSZWdFeHAoYF4ke3Bvc3NpYmxlQWN0aXZpdHlOYW1lLnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKS5yZXBsYWNlKC9cXCovZywgJy4qPycpLnJlcGxhY2UoL1xcJC9nLCAnXFxcXCQnKX0kYClcbiAgKTtcblxuICAvLyBmaWd1cmUgb3V0IHRoZSBudW1iZXIgb2YgcmV0cmllcy4gVHJ5IG9uY2UgaWYgd2FpdE1zIGlzIGxlc3MgdGhhdCA3NTBcbiAgLy8gMzAgdGltZXMgaWYgcGFyc2luZyBpcyBub3QgcG9zc2libGVcbiAgbGV0IHJldHJpZXMgPSBwYXJzZUludCh3YWl0TXMgLyA3NTAsIDEwKSB8fCAxO1xuICByZXRyaWVzID0gaXNOYU4ocmV0cmllcykgPyAzMCA6IHJldHJpZXM7XG4gIGF3YWl0IHJldHJ5SW50ZXJ2YWwocmV0cmllcywgNzUwLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCB0aGlzLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBpZiAoYXBwQWN0aXZpdHkgJiYgYXBwUGFja2FnZSkge1xuICAgICAgbGV0IGZ1bGx5UXVhbGlmaWVkQWN0aXZpdHkgPSBhcHBBY3Rpdml0eS5zdGFydHNXaXRoKCcuJykgPyBgJHthcHBQYWNrYWdlfSR7YXBwQWN0aXZpdHl9YCA6IGFwcEFjdGl2aXR5O1xuICAgICAgbG9nLmRlYnVnKGBGb3VuZCBwYWNrYWdlOiAnJHthcHBQYWNrYWdlfScgYW5kIGZ1bGx5IHF1YWxpZmllZCBhY3Rpdml0eSBuYW1lIDogJyR7ZnVsbHlRdWFsaWZpZWRBY3Rpdml0eX0nYCk7XG4gICAgICBsZXQgZm91bmRBY3QgPSAoXy5pbmNsdWRlcyhhbGxQYWNrYWdlcywgYXBwUGFja2FnZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICBfLmZpbmRJbmRleChwb3NzaWJsZUFjdGl2aXR5UGF0dGVybnMsIChwb3NzaWJsZVBhdHRlcm4pID0+IHBvc3NpYmxlUGF0dGVybi50ZXN0KGZ1bGx5UXVhbGlmaWVkQWN0aXZpdHkpKSAhPT0gLTEpO1xuICAgICAgaWYgKCghd2FpdEZvclN0b3AgJiYgZm91bmRBY3QpIHx8ICh3YWl0Rm9yU3RvcCAmJiAhZm91bmRBY3QpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nLmRlYnVnKCdJbmNvcnJlY3QgcGFja2FnZSBhbmQgYWN0aXZpdHkuIFJldHJ5aW5nLicpO1xuICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cG9zc2libGVBY3Rpdml0eU5hbWVzLm1hcCgobmFtZSkgPT4gYCcke25hbWV9J2ApLmpvaW4oJyBvciAnKX0gbmV2ZXIgJHt3YWl0Rm9yU3RvcCA/ICdzdG9wcGVkJyA6ICdzdGFydGVkJ31gKTtcbiAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICB9KTtcbn07XG5cbi8qKlxuICogV2FpdCBmb3IgdGhlIGdpdmVuIGFjdGl2aXR5IHRvIGJlIGZvY3VzZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gd2FpdCBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aXZpdHkgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aXZpdHksIGJlbG9uZ2luZyB0byB0aGF0IHBhY2thZ2UsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB3YWl0IGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0TXMgWzIwMDAwXSAtIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgdGltZW91dCBvY2N1cnMuXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgdGltZW91dCBoYXBwZW5zLlxuICovXG5hcGtVdGlsc01ldGhvZHMud2FpdEZvckFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKHBrZywgYWN0LCB3YWl0TXMgPSAyMDAwMCkge1xuICBhd2FpdCB0aGlzLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYWN0LCBmYWxzZSwgd2FpdE1zKTtcbn07XG5cbi8qKlxuICogV2FpdCBmb3IgdGhlIGdpdmVuIGFjdGl2aXR5IHRvIGJlIG5vbi1mb2N1c2VkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgbmFtZSBvZiB0aGUgcGFja2FnZSB0byB3YWl0IGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpdml0eSAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpdml0eSwgYmVsb25naW5nIHRvIHRoYXQgcGFja2FnZSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHdhaXQgZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXRNcyBbMjAwMDBdIC0gTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSB0aW1lb3V0IG9jY3Vycy5cbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiB0aW1lb3V0IGhhcHBlbnMuXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy53YWl0Rm9yTm90QWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAocGtnLCBhY3QsIHdhaXRNcyA9IDIwMDAwKSB7XG4gIGF3YWl0IHRoaXMud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBhY3QsIHRydWUsIHdhaXRNcyk7XG59O1xuXG4vKipcbiAqIFVuaW5zdGFsbCB0aGUgZ2l2ZW4gcGFja2FnZSBmcm9tIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gYmUgdW5pbnN0YWxsZWQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYWNrYWdlIHdhcyBmb3VuZCBvbiB0aGUgZGV2aWNlIGFuZFxuICogICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bGx5IHVuaW5zdGFsbGVkLlxuICovXG5hcGtVdGlsc01ldGhvZHMudW5pbnN0YWxsQXBrID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xuICBsb2cuZGVidWcoYFVuaW5zdGFsbGluZyAke3BrZ31gKTtcbiAgaWYgKCFhd2FpdCB0aGlzLmlzQXBwSW5zdGFsbGVkKHBrZykpIHtcbiAgICBsb2cuaW5mbyhgJHtwa2d9IHdhcyBub3QgdW5pbnN0YWxsZWQsIGJlY2F1c2UgaXQgd2FzIG5vdCBwcmVzZW50IG9uIHRoZSBkZXZpY2VgKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IHN0ZG91dDtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0aGlzLmZvcmNlU3RvcChwa2cpO1xuICAgIHN0ZG91dCA9IGF3YWl0IHRoaXMuYWRiRXhlYyhbJ3VuaW5zdGFsbCcsIHBrZ10sIHt0aW1lb3V0OiAyMDAwMH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byB1bmluc3RhbGwgQVBLLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbiAgc3Rkb3V0ID0gc3Rkb3V0LnRyaW0oKTtcbiAgbG9nLmRlYnVnKGBBREIgY29tbWFuZCBvdXRwdXQ6ICR7c3Rkb3V0fWApO1xuICBpZiAoc3Rkb3V0LmluZGV4T2YoXCJTdWNjZXNzXCIpICE9PSAtMSkge1xuICAgIGxvZy5pbmZvKGAke3BrZ30gd2FzIHN1Y2Nlc3NmdWxseSB1bmluc3RhbGxlZGApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGxvZy5pbmZvKGAke3BrZ30gd2FzIG5vdCB1bmluc3RhbGxlZGApO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIEluc3RhbGwgdGhlIHBhY2thZ2UgYWZ0ZXIgaXQgd2FzIHB1c2hlZCB0byB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwa1BhdGhPbkRldmljZSAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIHBhY2thZ2Ugb24gdGhlIGRldmljZSBmaWxlIHN5c3RlbS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzIFt7fV0gLSBBZGRpdGlvbmFsIGV4ZWMgb3B0aW9ucy4gU2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL25vZGUtdGVlbl9wcm9jZXNzfVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBtb3JlIGRldGFpbHMgb24gdGhpcyBwYXJhbWV0ZXIuXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgdGhlcmUgd2FzIGEgZmFpbHVyZSBkdXJpbmcgYXBwbGljYXRpb24gaW5zdGFsbC5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLmluc3RhbGxGcm9tRGV2aWNlUGF0aCA9IGFzeW5jIGZ1bmN0aW9uIChhcGtQYXRoT25EZXZpY2UsIG9wdHMgPSB7fSkge1xuICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ3BtJywgJ2luc3RhbGwnLCAnLXInLCBhcGtQYXRoT25EZXZpY2VdLCBvcHRzKTtcbiAgaWYgKHN0ZG91dC5pbmRleE9mKFwiRmFpbHVyZVwiKSAhPT0gLTEpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgUmVtb3RlIGluc3RhbGwgZmFpbGVkOiAke3N0ZG91dH1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbnN0YWxsIHRoZSBwYWNrYWdlIGZyb20gdGhlIGxvY2FsIGZpbGUgc3lzdGVtLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGsgLSBUaGUgZnVsbCBwYXRoIHRvIHRoZSBsb2NhbCBwYWNrYWdlLlxuICogQHBhcmFtIHtib29sZWFufSByZXBhbGNlIFt0cnVlXSAtIFdoZXRoZXIgdG8gcmVwbGFjZSB0aGUgcGFja2FnZSBpZiBpdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFscmVhZHkgaW5zdGFsbGVkLiBUcnVlIGJ5IGRlZmF1bHQuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dCBbNjAwMDBdIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCB1bnRpbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxhdGlvbiBpcyBjb21wbGV0ZWQuXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgYW4gdW5leHBlY3RlZCBlcnJvciBoYXBwZW5zIGR1cmluZyBpbnN0YWxsLlxuICovXG5hcGtVdGlsc01ldGhvZHMuaW5zdGFsbCA9IGFzeW5jIGZ1bmN0aW9uIChhcGssIHJlcGxhY2UgPSB0cnVlLCB0aW1lb3V0ID0gNjAwMDApIHtcbiAgaWYgKHJlcGxhY2UpIHtcbiAgICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydpbnN0YWxsJywgJy1yJywgYXBrXSwge3RpbWVvdXR9KTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnaW5zdGFsbCcsIGFwa10sIHt0aW1lb3V0fSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBvbiBzb21lIHN5c3RlbXMgdGhpcyB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBhcHAgYWxyZWFkeVxuICAgICAgLy8gZXhpc3RzXG4gICAgICBpZiAoZXJyLm1lc3NhZ2UuaW5kZXhPZignSU5TVEFMTF9GQUlMRURfQUxSRUFEWV9FWElTVFMnKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nLmRlYnVnKGBBcHBsaWNhdGlvbiAnJHthcGt9JyBhbHJlYWR5IGluc3RhbGxlZC4gQ29udGludWluZy5gKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSW5zdGFsbCB0aGUgcGFja2FnZSBmcm9tIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSBvZiB1cGdyYWRlIGl0IGlmIGFuIG9sZGVyXG4gKiB2ZXJzaW9uIG9mIHRoZSBzYW1lIHBhY2thZ2UgaXMgYWxyZWFkeSBpbnN0YWxsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGxvY2FsIHBhY2thZ2UuXG4gKiBAcGFyYW0gez9zdHJpbmd9IHBrZyAtIFRoZSBuYW1lIG9mIHRoZSBpbnN0YWxsZWQgcGFja2FnZS4gVGhlIG1ldGhvZCB3aWxsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm0gZmFzdGVyIGlmIGl0IGlzIHNldC5cbiAqIEBwYXJhbSB7P251bWJlcn0gdGltZW91dCBbNjAwMDBdIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCB1bnRpbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxhdGlvbiBpcyBjb21wbGV0ZWQuXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgYW4gdW5leHBlY3RlZCBlcnJvciBoYXBwZW5zIGR1cmluZyBpbnN0YWxsLlxuICovXG5hcGtVdGlsc01ldGhvZHMuaW5zdGFsbE9yVXBncmFkZSA9IGFzeW5jIGZ1bmN0aW9uIChhcGssIHBrZyA9IG51bGwsIHRpbWVvdXQgPSA2MDAwMCkge1xuICBsZXQgYXBrSW5mbyA9IG51bGw7XG4gIGlmICghcGtnKSB7XG4gICAgYXBrSW5mbyA9IGF3YWl0IHRoaXMuZ2V0QXBrSW5mbyhhcGspO1xuICAgIHBrZyA9IGFwa0luZm8ubmFtZTtcbiAgfVxuICBpZiAoIXBrZykge1xuICAgIGxvZy53YXJuKGBDYW5ub3QgcmVhZCB0aGUgcGFja2FnZSBuYW1lIG9mICR7YXBrfS4gQXNzdW1pbmcgY29ycmVjdCBhcHAgdmVyc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZGApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghYXdhaXQgdGhpcy5pc0FwcEluc3RhbGxlZChwa2cpKSB7XG4gICAgbG9nLmRlYnVnKGBBcHAgJyR7YXBrfScgbm90IGluc3RhbGxlZC4gSW5zdGFsbGluZ2ApO1xuICAgIGF3YWl0IHRoaXMuaW5zdGFsbChhcGssIGZhbHNlLCB0aW1lb3V0KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwa2dJbmZvID0gYXdhaXQgdGhpcy5nZXRQYWNrYWdlSW5mbyhwa2cpO1xuICBjb25zdCBwa2dWZXJzaW9uQ29kZSA9IHBrZ0luZm8udmVyc2lvbkNvZGU7XG4gIGlmICghYXBrSW5mbykge1xuICAgIGFwa0luZm8gPSBhd2FpdCB0aGlzLmdldEFwa0luZm8oYXBrKTtcbiAgfVxuICBjb25zdCBhcGtWZXJzaW9uQ29kZSA9IGFwa0luZm8udmVyc2lvbkNvZGU7XG5cbiAgaWYgKF8uaXNVbmRlZmluZWQoYXBrVmVyc2lvbkNvZGUpIHx8IF8uaXNVbmRlZmluZWQocGtnVmVyc2lvbkNvZGUpKSB7XG4gICAgbG9nLndhcm4oYENhbm5vdCByZWFkIHZlcnNpb24gY29kZXMgb2YgJyR7YXBrfScgYW5kL29yICcke3BrZ30nLiBBc3N1bWluZyBjb3JyZWN0IGFwcCB2ZXJzaW9uIGlzIGFscmVhZHkgaW5zdGFsbGVkYCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwa2dWZXJzaW9uQ29kZSA+PSBhcGtWZXJzaW9uQ29kZSkge1xuICAgIGxvZy5kZWJ1ZyhgVGhlIGluc3RhbGxlZCAnJHtwa2d9JyBwYWNrYWdlIGRvZXMgbm90IHJlcXVpcmUgdXBncmFkZSAoJHtwa2dWZXJzaW9uQ29kZX0gPj0gJHthcGtWZXJzaW9uQ29kZX0pYCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxvZy5kZWJ1ZyhgVGhlIGluc3RhbGxlZCAnJHtwa2d9JyBwYWNrYWdlIGlzIG9sZGVyIHRoYW4gJyR7YXBrfScgKCR7cGtnVmVyc2lvbkNvZGV9IDwgJHthcGtWZXJzaW9uQ29kZX0pLiBgICtcbiAgICAgICAgICAgIGBFeGVjdXRpbmcgdXBncmFkZWApO1xuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuaW5zdGFsbChhcGssIHRydWUsIHRpbWVvdXQpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cud2FybihgQ2Fubm90IHVwZ3JhZGUgJyR7cGtnfScgYmVjYXVzZSBvZiAnJHtlcnIubWVzc2FnZX0nLiBUcnlpbmcgZnVsbCByZWluc3RhbGxgKTtcbiAgICBpZiAoIWF3YWl0IHRoaXMudW5pbnN0YWxsQXBrKHBrZykpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGAnJHtwa2d9JyBwYWNrYWdlIGNhbm5vdCBiZSB1bmluc3RhbGxlZGApO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLmluc3RhbGwoYXBrLCBmYWxzZSwgdGltZW91dCk7XG4gIH1cbn07XG5cbi8qKlxuICogRXh0cmFjdCBzdHJpbmcgcmVzb3VyY2VzIGZyb20gdGhlIGdpdmVuIHBhY2thZ2Ugb24gbG9jYWwgZmlsZSBzeXN0ZW0uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGxvY2FsIHBhY2thZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgdG8gZXh0cmFjdCB0aGUgcmVzb3VyY2VzIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvdXQgLSBUaGUgbmFtZSBvZiB0aGUgZGVzdGluYXRpb24gZm9sZGVyIG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSB0b1xuICogICAgICAgICAgICAgICAgICAgICAgIHN0b3JlIHRoZSBleHRyYWN0ZWQgZmlsZSB0by5cbiAqIEByZXR1cm4ge29iamVjdH0gQSBtYXBwaW5nIG9iamVjdCwgd2hlcmUgcHJvcGVydGllcyBhcmU6ICdhcGtTdHJpbmdzJywgY29udGFpbmluZ1xuICogICAgICAgICAgICAgICAgICBwYXJzZWQgcmVzb3VyY2UgZmlsZSByZXByZXNlbnRlZCBhcyBKU09OIG9iamVjdCwgYW5kICdsb2NhbFBhdGgnLFxuICogICAgICAgICAgICAgICAgICBjb250YWluaW5nIHRoZSBwYXRoIHRvIHRoZSBleHRyYWN0ZWQgZmlsZSBvbiB0aGUgbG9jYWwgZmlsZSBzeXN0ZW0uXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy5leHRyYWN0U3RyaW5nc0Zyb21BcGsgPSBhc3luYyBmdW5jdGlvbiAoYXBrLCBsYW5ndWFnZSwgb3V0KSB7XG4gIGxvZy5kZWJ1ZyhgRXh0cmFjdGluZyBzdHJpbmdzIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZSB8fCBcImRlZmF1bHRcIn1gKTtcbiAgbGV0IHN0cmluZ3NKc29uID0gJ3N0cmluZ3MuanNvbic7XG4gIGxldCBsb2NhbFBhdGg7XG4gIGlmICghbGFuZ3VhZ2UpIHtcbiAgICBsYW5ndWFnZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlTGFuZ3VhZ2UoKTtcbiAgfVxuICBsZXQgYXBrVG9vbHMgPSB0aGlzLmphcnNbJ2FwcGl1bV9hcGtfdG9vbHMuamFyJ107XG4gIGxldCBhcmdzID0gWyctamFyJywgYXBrVG9vbHMsICdzdHJpbmdzRnJvbUFwaycsIGFwaywgb3V0LCBsYW5ndWFnZV07XG4gIGxldCBmaWxlRGF0YSwgYXBrU3RyaW5ncztcbiAgdHJ5IHtcbiAgICBhd2FpdCBleGVjKCdqYXZhJywgYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZGVidWcoYE5vIHN0cmluZ3MueG1sIGZvciBsYW5ndWFnZSAnJHtsYW5ndWFnZX0nLCBnZXR0aW5nIGRlZmF1bHQgYCArXG4gICAgICAgICAgICAgIGBzdHJpbmdzLnhtbGApO1xuICAgIGFyZ3MucG9wKCk7XG4gICAgYXdhaXQgZXhlYygnamF2YScsIGFyZ3MpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsb2cuZGVidWcoXCJSZWFkaW5nIHN0cmluZ3MgZnJvbSBjb252ZXJ0ZWQgc3RyaW5ncy5qc29uXCIpO1xuICAgIGxvY2FsUGF0aCA9IHBhdGguam9pbihvdXQsIHN0cmluZ3NKc29uKTtcbiAgICBmaWxlRGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKGxvY2FsUGF0aCwgJ3V0ZjgnKTtcbiAgICBhcGtTdHJpbmdzID0gSlNPTi5wYXJzZShmaWxlRGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZmlsZURhdGEpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgQ29udGVudCBzdGFydGVkIHdpdGg6ICR7ZmlsZURhdGEuc2xpY2UoMCwgMzAwKX1gKTtcbiAgICB9XG4gICAgbGV0IG1zZyA9IGBDb3VsZCBub3QgcGFyc2Ugc3RyaW5ncyBmcm9tIHN0cmluZ3MuanNvbi4gT3JpZ2luYWwgYCArXG4gICAgICAgICAgICAgIGBlcnJvcjogJHtlLm1lc3NhZ2V9YDtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhtc2cpO1xuICB9XG4gIHJldHVybiB7YXBrU3RyaW5ncywgbG9jYWxQYXRofTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBsYW5ndWFnZSBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9mIGRldmljZSBsYW5ndWFnZS5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLmdldERldmljZUxhbmd1YWdlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgbGFuZ3VhZ2U7XG4gIGlmIChhd2FpdCB0aGlzLmdldEFwaUxldmVsKCkgPCAyMykge1xuICAgIGxhbmd1YWdlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VTeXNMYW5ndWFnZSgpO1xuICAgIGlmICghbGFuZ3VhZ2UpIHtcbiAgICAgIGxhbmd1YWdlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9kdWN0TGFuZ3VhZ2UoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGFuZ3VhZ2UgPSAoYXdhaXQgdGhpcy5nZXREZXZpY2VMb2NhbGUoKSkuc3BsaXQoXCItXCIpWzBdO1xuICB9XG4gIHJldHVybiBsYW5ndWFnZTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBsYW5ndWFnZSBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBUaGUgbmFtZSBvZiB0aGUgbmV3IGRldmljZSBsYW5ndWFnZS5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLnNldERldmljZUxhbmd1YWdlID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlKSB7XG4gIC8vIHRoaXMgbWV0aG9kIGlzIG9ubHkgdXNlZCBpbiBBUEkgPCAyM1xuICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xhbmd1YWdlKGxhbmd1YWdlKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjb3VudHJ5IG5hbWUgb2YgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG5hbWUgb2YgZGV2aWNlIGNvdW50cnkuXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy5nZXREZXZpY2VDb3VudHJ5ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAvLyB0aGlzIG1ldGhvZCBpcyBvbmx5IHVzZWQgaW4gQVBJIDwgMjNcbiAgbGV0IGNvdW50cnkgPSBhd2FpdCB0aGlzLmdldERldmljZVN5c0NvdW50cnkoKTtcbiAgaWYgKCFjb3VudHJ5KSB7XG4gICAgY291bnRyeSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvZHVjdENvdW50cnkoKTtcbiAgfVxuICByZXR1cm4gY291bnRyeTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb3VudHJ5IG5hbWUgb2YgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudHJ5IC0gVGhlIG5hbWUgb2YgdGhlIG5ldyBkZXZpY2UgY291bnRyeS5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLnNldERldmljZUNvdW50cnkgPSBhc3luYyBmdW5jdGlvbiAoY291bnRyeSkge1xuICAvLyB0aGlzIG1ldGhvZCBpcyBvbmx5IHVzZWQgaW4gQVBJIDwgMjNcbiAgYXdhaXQgdGhpcy5zZXREZXZpY2VTeXNDb3VudHJ5KGNvdW50cnkpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGxvY2FsZSBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9mIGRldmljZSBsb2NhbGUuXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy5nZXREZXZpY2VMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8vIHRoaXMgbWV0aG9kIGlzIG9ubHkgdXNlZCBpbiBBUEkgPj0gMjNcbiAgbGV0IGxvY2FsZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlU3lzTG9jYWxlKCk7XG4gIGlmICghbG9jYWxlKSB7XG4gICAgbG9jYWxlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9kdWN0TG9jYWxlKCk7XG4gIH1cbiAgcmV0dXJuIGxvY2FsZTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBsb2NhbGUgbmFtZSBvZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QgYW5kIHRoZSBmb3JtYXQgb2YgdGhlIGxvY2FsZSBpcyBlbi1VUywgZm9yIGV4YW1wbGUuXG4gKiBUaGlzIG1ldGhvZCBjYWxsIHNldERldmljZUxhbmd1YWdlQ291bnRyeSwgc28sIHBsZWFzZSB1c2Ugc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5IGFzIHBvc3NpYmxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgLSBOYW1lcyBvZiB0aGUgZGV2aWNlIGxhbmd1YWdlIGFuZCB0aGUgY291bnRyeSBjb25uZWN0ZWQgd2l0aCBgLWAuIGUuZy4gZW4tVVMuXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy5zZXREZXZpY2VMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAobG9jYWxlKSB7XG4gIGNvbnN0IHZhbGlkYXRlTG9jYWxlID0gbmV3IFJlZ0V4cCgvW2EtekEtWl0rLVthLXpBLVowLTldKy8pO1xuICBpZiAoIXZhbGlkYXRlTG9jYWxlLnRlc3QobG9jYWxlKSkge1xuICAgIGxvZy53YXJuKGBzZXREZXZpY2VMb2NhbGUgcmVxdWlyZXMgdGhlIGZvbGxvd2luZyBmb3JtYXQ6IGVuLVVTIG9yIGphLUpQYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHNwbGl0X2xvY2FsZSA9IGxvY2FsZS5zcGxpdChcIi1cIik7XG4gIGF3YWl0IHRoaXMuc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5KHNwbGl0X2xvY2FsZVswXSwgc3BsaXRfbG9jYWxlWzFdKTtcbn07XG5cbi8qKlxuICogTWFrZSBzdXJlIGN1cnJlbnQgZGV2aWNlIGxvY2FsZSBpcyBleHBlY3RlZCBvciBub3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIC0gTGFuZ3VhZ2UuIFRoZSBsYW5ndWFnZSBmaWVsZCBpcyBjYXNlIGluc2Vuc2l0aXZlLCBidXQgTG9jYWxlIGFsd2F5cyBjYW5vbmljYWxpemVzIHRvIGxvd2VyIGNhc2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gY291bnRyeSAtIENvdW50cnkuIFRoZSBsYW5ndWFnZSBmaWVsZCBpcyBjYXNlIGluc2Vuc2l0aXZlLCBidXQgTG9jYWxlIGFsd2F5cyBjYW5vbmljYWxpemVzIHRvIGxvd2VyIGNhc2UuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gSWYgY3VycmVudCBsb2NhbGUgaXMgbGFuZ3VhZ2UgYW5kIGNvdW50cnkgYXMgYXJndW1lbnRzLCByZXR1cm4gdHJ1ZS5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLmVuc3VyZUN1cnJlbnRMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UsIGNvdW50cnkpIHtcbiAgY29uc3QgaGFzTGFuZ3VhZ2UgPSBfLmlzU3RyaW5nKGxhbmd1YWdlKTtcbiAgY29uc3QgaGFzQ291bnRyeSA9IF8uaXNTdHJpbmcoY291bnRyeSk7XG5cbiAgaWYgKCFoYXNMYW5ndWFnZSAmJiAhaGFzQ291bnRyeSkge1xuICAgIGxvZy53YXJuKCdlbnN1cmVDdXJyZW50TG9jYWxlIHJlcXVpcmVzIGxhbmd1YWdlIG9yIGNvdW50cnknKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBnZXQgbG93ZXIgY2FzZSB2ZXJzaW9ucyBvZiB0aGUgc3RyaW5nc1xuICBsYW5ndWFnZSA9IChsYW5ndWFnZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgY291bnRyeSA9IChjb3VudHJ5IHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGNvbnN0IGFwaUxldmVsID0gYXdhaXQgdGhpcy5nZXRBcGlMZXZlbCgpO1xuXG4gIHJldHVybiBhd2FpdCByZXRyeUludGVydmFsKDUsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKGFwaUxldmVsIDwgMjMpIHtcbiAgICAgICAgbGV0IGN1ckxhbmd1YWdlLCBjdXJDb3VudHJ5O1xuICAgICAgICBpZiAoaGFzTGFuZ3VhZ2UpIHtcbiAgICAgICAgICBjdXJMYW5ndWFnZSA9IChhd2FpdCB0aGlzLmdldERldmljZUxhbmd1YWdlKCkpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgaWYgKCFoYXNDb3VudHJ5ICYmIGxhbmd1YWdlID09PSBjdXJMYW5ndWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNDb3VudHJ5KSB7XG4gICAgICAgICAgY3VyQ291bnRyeSA9IChhd2FpdCB0aGlzLmdldERldmljZUNvdW50cnkoKSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBpZiAoIWhhc0xhbmd1YWdlICYmIGNvdW50cnkgPT09IGN1ckNvdW50cnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobGFuZ3VhZ2UgPT09IGN1ckxhbmd1YWdlICYmIGNvdW50cnkgPT09IGN1ckNvdW50cnkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3VyTG9jYWxlID0gKGF3YWl0IHRoaXMuZ2V0RGV2aWNlTG9jYWxlKCkpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChgJHtsYW5ndWFnZX0tJHtjb3VudHJ5fWAgPT09IGN1ckxvY2FsZSkgIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaWYgdGhlcmUgaGFzIGJlZW4gYW4gZXJyb3IsIHJlc3RhcnQgYWRiIGFuZCByZXRyeVxuICAgICAgbG9nLmVycm9yKGBVbmFibGUgdG8gY2hlY2sgZGV2aWNlIGxvY2FsaXphdGlvbjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgIGxvZy5kZWJ1ZygnUmVzdGFydGluZyBBREIgYW5kIHJldHJ5aW5nLi4uJyk7XG4gICAgICBhd2FpdCB0aGlzLnJlc3RhcnRBZGIoKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGxvY2FsZSBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBMYW5ndWFnZS4gVGhlIGxhbmd1YWdlIGZpZWxkIGlzIGNhc2UgaW5zZW5zaXRpdmUsIGJ1dCBMb2NhbGUgYWx3YXlzIGNhbm9uaWNhbGl6ZXMgdG8gbG93ZXIgY2FzZS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogW2EtekEtWl17Miw4fS4gZS5nLiBlbiwgamEgOiBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvamF2YS91dGlsL0xvY2FsZS5odG1sXG4gKiBAcGFyYW0ge3N0cmluZ30gY291bnRyeSAtIENvdW50cnkuIFRoZSBjb3VudHJ5IChyZWdpb24pIGZpZWxkIGlzIGNhc2UgaW5zZW5zaXRpdmUsIGJ1dCBMb2NhbGUgYWx3YXlzIGNhbm9uaWNhbGl6ZXMgdG8gdXBwZXIgY2FzZS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogW2EtekEtWl17Mn0gfCBbMC05XXszfS4gZS5nLiBVUywgSlAgOiBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvamF2YS91dGlsL0xvY2FsZS5odG1sXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy5zZXREZXZpY2VMYW5ndWFnZUNvdW50cnkgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UsIGNvdW50cnkpIHtcbiAgbGV0IGhhc0xhbmd1YWdlID0gbGFuZ3VhZ2UgJiYgXy5pc1N0cmluZyhsYW5ndWFnZSk7XG4gIGxldCBoYXNDb3VudHJ5ID0gY291bnRyeSAmJiBfLmlzU3RyaW5nKGNvdW50cnkpO1xuICBpZiAoIWhhc0xhbmd1YWdlICYmICFoYXNDb3VudHJ5KSB7XG4gICAgbG9nLndhcm4oYHNldERldmljZUxhbmd1YWdlQ291bnRyeSByZXF1aXJlcyBsYW5ndWFnZSBvciBjb3VudHJ5LmApO1xuICAgIGxvZy53YXJuKGBHb3QgbGFuZ3VhZ2U6ICcke2xhbmd1YWdlfScgYW5kIGNvdW50cnk6ICcke2NvdW50cnl9J2ApO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgd2FzU2V0dGluZ0NoYW5nZWQgPSBmYWxzZTtcbiAgbGV0IGFwaUxldmVsID0gYXdhaXQgdGhpcy5nZXRBcGlMZXZlbCgpO1xuXG4gIGxhbmd1YWdlID0gKGxhbmd1YWdlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuICBjb3VudHJ5ID0gKGNvdW50cnkgfHwgJycpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKGFwaUxldmVsIDwgMjMpIHtcbiAgICBsZXQgY3VyTGFuZ3VhZ2UgPSAoYXdhaXQgdGhpcy5nZXREZXZpY2VMYW5ndWFnZSgpKS50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCBjdXJDb3VudHJ5ID0gKGF3YWl0IHRoaXMuZ2V0RGV2aWNlQ291bnRyeSgpKS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChoYXNMYW5ndWFnZSAmJiBsYW5ndWFnZSAhPT0gY3VyTGFuZ3VhZ2UpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0RGV2aWNlTGFuZ3VhZ2UobGFuZ3VhZ2UpO1xuICAgICAgd2FzU2V0dGluZ0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaGFzQ291bnRyeSAmJiBjb3VudHJ5ICE9PSBjdXJDb3VudHJ5KSB7XG4gICAgICBhd2FpdCB0aGlzLnNldERldmljZUNvdW50cnkoY291bnRyeSk7XG4gICAgICB3YXNTZXR0aW5nQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBjdXJMb2NhbGUgPSBhd2FpdCB0aGlzLmdldERldmljZUxvY2FsZSgpO1xuXG4gICAgaWYgKGFwaUxldmVsID09PSAyMykge1xuICAgICAgbGV0IGxvY2FsZTtcbiAgICAgIGlmICghaGFzQ291bnRyeSkge1xuICAgICAgICBsb2NhbGUgPSBsYW5ndWFnZTtcbiAgICAgIH0gZWxzZSBpZiAoIWhhc0xhbmd1YWdlKSB7XG4gICAgICAgIGxvY2FsZSA9IGNvdW50cnk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhbGUgPSBgJHtsYW5ndWFnZX0tJHtjb3VudHJ5fWA7XG4gICAgICB9XG5cbiAgICAgIGxvZy5kZWJ1ZyhgQ3VycmVudCBsb2NhbGU6ICcke2N1ckxvY2FsZX0nOyByZXF1ZXN0ZWQgbG9jYWxlOiAnJHtsb2NhbGV9J2ApO1xuICAgICAgaWYgKGxvY2FsZS50b0xvd2VyQ2FzZSgpICE9PSBjdXJMb2NhbGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xvY2FsZShsb2NhbGUpO1xuICAgICAgICB3YXNTZXR0aW5nQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gQVBJID49IDI0XG4gICAgICBpZiAoIWhhc0NvdW50cnkgfHwgIWhhc0xhbmd1YWdlKSB7XG4gICAgICAgIGxvZy53YXJuKGBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnkgcmVxdWlyZXMgYm90aCBsYW5ndWFnZSBhbmQgY291bnRyeSB0byBiZSBzZXQgZm9yIEFQSSAyNCtgKTtcbiAgICAgICAgbG9nLndhcm4oYEdvdCBsYW5ndWFnZTogJyR7bGFuZ3VhZ2V9JyBhbmQgY291bnRyeTogJyR7Y291bnRyeX0nYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nLmRlYnVnKGBDdXJyZW50IGxvY2FsZTogJyR7Y3VyTG9jYWxlfSc7IHJlcXVlc3RlZCBsb2NhbGU6ICcke2xhbmd1YWdlfS0ke2NvdW50cnl9J2ApO1xuICAgICAgaWYgKGAke2xhbmd1YWdlfS0ke2NvdW50cnl9YC50b0xvd2VyQ2FzZSgpICE9PSBjdXJMb2NhbGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xvY2FsZVZpYVNldHRpbmdBcHAobGFuZ3VhZ2UsIGNvdW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh3YXNTZXR0aW5nQ2hhbmdlZCkge1xuICAgIGxvZy5pbmZvKFwiUmVib290aW5nIHRoZSBkZXZpY2UgaW4gb3JkZXIgdG8gYXBwbHkgbmV3IGxvY2FsZSB2aWEgJ3NldHRpbmcgcGVyc2lzdC5zeXMubG9jYWxlJyBjb21tYW5kLlwiKTtcbiAgICBhd2FpdCB0aGlzLnJlYm9vdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEdldCB0aGUgcGFja2FnZSBuYW1lIGZyb20gbG9jYWwgYXBrIGZpbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gZXhpc3RpbmcgLmFwayBwYWNrYWdlIG9uIHRoZSBsb2NhbFxuICogICAgICAgICAgICAgICAgICAgICAgIGZpbGUgc3lzdGVtLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcGFyc2VkIHBhY2thZ2UgbmFtZSBvciBfbnVsbF8gaWYgaXQgY2Fubm90IGJlIHBhcnNlZC5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLmdldFBhY2thZ2VOYW1lID0gYXN5bmMgZnVuY3Rpb24gKGFwaykge1xuICBsZXQgYXJncyA9IFsnZHVtcCcsICdiYWRnaW5nJywgYXBrXTtcbiAgYXdhaXQgdGhpcy5pbml0QWFwdCgpO1xuICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKHRoaXMuYmluYXJpZXMuYWFwdCwgYXJncyk7XG4gIGxldCBhcGtQYWNrYWdlID0gbmV3IFJlZ0V4cCgvcGFja2FnZTogbmFtZT0nKFteJ10rKScvZykuZXhlYyhzdGRvdXQpO1xuICBpZiAoYXBrUGFja2FnZSAmJiBhcGtQYWNrYWdlLmxlbmd0aCA+PSAyKSB7XG4gICAgYXBrUGFja2FnZSA9IGFwa1BhY2thZ2VbMV07XG4gIH0gZWxzZSB7XG4gICAgYXBrUGFja2FnZSA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIGFwa1BhY2thZ2U7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmpjZXR9IEFwcEluZm9cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gUGFja2FnZSBuYW1lLCBmb3IgZXhhbXBsZSAnY29tLmFjbWUuYXBwJy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB2ZXJzaW9uQ29kZSAtIFZlcnNpb24gY29kZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB2ZXJzaW9uTmFtZSAtIFZlcnNpb24gbmFtZSwgZm9yIGV4YW1wbGUgJzEuMCcuXG4gKi9cblxuLyoqXG4gKiBHZXQgdGhlIHBhY2thZ2UgaW5mbyBmcm9tIGxvY2FsIGFwayBmaWxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGtQYXRoIC0gVGhlIGZ1bGwgcGF0aCB0byBleGlzdGluZyAuYXBrIHBhY2thZ2Ugb24gdGhlIGxvY2FsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUgc3lzdGVtLlxuICogQHJldHVybiB7P0FwcEluZm99IFRoZSBwYXJzZWQgYXBwbGljYXRpb24gaW5mb3JtYXRpb24uXG4gKi9cbmFwa1V0aWxzTWV0aG9kcy5nZXRBcGtJbmZvID0gYXN5bmMgZnVuY3Rpb24gKGFwa1BhdGgpIHtcbiAgaWYgKCFhd2FpdCBmcy5leGlzdHMoYXBrUGF0aCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgVGhlIGZpbGUgYXQgcGF0aCAke2Fwa1BhdGh9IGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhY2Nlc3NpYmxlYCk7XG4gIH1cbiAgYXdhaXQgdGhpcy5pbml0QWFwdCgpO1xuICB0cnkge1xuICAgIGNvbnN0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmJpbmFyaWVzLmFhcHQsIFsnZCcsICdiYWRnaW5nJywgYXBrUGF0aF0pO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBuZXcgUmVnRXhwKC9wYWNrYWdlOiBuYW1lPScoW14nXSspJyB2ZXJzaW9uQ29kZT0nKFxcZCspJyB2ZXJzaW9uTmFtZT0nKFteJ10rKScvKS5leGVjKHN0ZG91dCk7XG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG1hdGNoZXNbMV0sXG4gICAgICAgIHZlcnNpb25Db2RlOiBwYXJzZUludChtYXRjaGVzWzJdLCAxMCksXG4gICAgICAgIHZlcnNpb25OYW1lOiBtYXRjaGVzWzNdXG4gICAgICB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLndhcm4oYEVycm9yIFwiJHtlcnIubWVzc2FnZX1cIiB3aGlsZSBnZXR0aW5nIGJhZGdpbmcgaW5mb2ApO1xuICB9XG4gIHJldHVybiB7fTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBwYWNrYWdlIGluZm8gZnJvbSB0aGUgaW5zdGFsbGVkIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgbmFtZSBvZiB0aGUgaW5zdGFsbGVkIHBhY2thZ2UuXG4gKiBAcmV0dXJuIHs/QXBwSW5mb30gVGhlIHBhcnNlZCBhcHBsaWNhdGlvbiBpbmZvcm1hdGlvbi5cbiAqL1xuYXBrVXRpbHNNZXRob2RzLmdldFBhY2thZ2VJbmZvID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xuICBsb2cuZGVidWcoYEdldHRpbmcgcGFja2FnZSBpbmZvIGZvciAke3BrZ31gKTtcbiAgbGV0IHJlc3VsdCA9IHtuYW1lOiBwa2d9O1xuICB0cnkge1xuICAgIGNvbnN0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydkdW1wc3lzJywgJ3BhY2thZ2UnLCBwa2ddKTtcbiAgICBjb25zdCB2ZXJzaW9uTmFtZU1hdGNoID0gbmV3IFJlZ0V4cCgvdmVyc2lvbk5hbWU9KFtcXGQrXFwuXSspLykuZXhlYyhzdGRvdXQpO1xuICAgIGlmICh2ZXJzaW9uTmFtZU1hdGNoKSB7XG4gICAgICByZXN1bHQudmVyc2lvbk5hbWUgPSB2ZXJzaW9uTmFtZU1hdGNoWzFdO1xuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9uQ29kZU1hdGNoID0gbmV3IFJlZ0V4cCgvdmVyc2lvbkNvZGU9KFxcZCspLykuZXhlYyhzdGRvdXQpO1xuICAgIGlmICh2ZXJzaW9uQ29kZU1hdGNoKSB7XG4gICAgICByZXN1bHQudmVyc2lvbkNvZGUgPSBwYXJzZUludCh2ZXJzaW9uQ29kZU1hdGNoWzFdLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy53YXJuKGBFcnJvciBcIiR7ZXJyLm1lc3NhZ2V9XCIgd2hpbGUgZHVtcGluZyBwYWNrYWdlIGluZm9gKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBrVXRpbHNNZXRob2RzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9

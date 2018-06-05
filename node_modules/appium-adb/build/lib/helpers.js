'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _loggerJs = require('./logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _teen_process = require('teen_process');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var rootDir = _path2['default'].resolve(__dirname, process.env.NO_PRECOMPILE ? '..' : '../..');
var androidPlatforms = ['android-4.2', 'android-17', 'android-4.3', 'android-18', 'android-4.4', 'android-19', 'android-L', 'android-20', 'android-5.0', 'android-21', 'android-22', 'android-MNC', 'android-23', 'android-6.0', 'android-N', 'android-24', 'android-25'];

function getAndroidPlatformAndPath() {
  var androidHome, platforms, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, platform, platformPath;

  return _regeneratorRuntime.async(function getAndroidPlatformAndPath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        androidHome = process.env.ANDROID_HOME;

        if (!_lodash2['default'].isString(androidHome)) {
          _loggerJs2['default'].errorAndThrow("ANDROID_HOME environment variable was not exported");
        }

        // get the latest platform and path
        platforms = _path2['default'].resolve(androidHome, 'platforms');
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 6;
        _iterator = _getIterator(_lodash2['default'].clone(androidPlatforms).reverse());

      case 8:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 18;
          break;
        }

        platform = _step.value;
        platformPath = _path2['default'].resolve(platforms, platform);
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(platformPath));

      case 13:
        if (!context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', { platform: platform, platformPath: platformPath });

      case 15:
        _iteratorNormalCompletion = true;
        context$1$0.next = 8;
        break;

      case 18:
        context$1$0.next = 24;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t0 = context$1$0['catch'](6);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 24:
        context$1$0.prev = 24;
        context$1$0.prev = 25;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 27:
        context$1$0.prev = 27;

        if (!_didIteratorError) {
          context$1$0.next = 30;
          break;
        }

        throw _iteratorError;

      case 30:
        return context$1$0.finish(27);

      case 31:
        return context$1$0.finish(24);

      case 32:
        return context$1$0.abrupt('return', { platform: null, platformPath: null });

      case 33:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 20, 24, 32], [25,, 27, 31]]);
}

function unzipFile(zipPath) {
  return _regeneratorRuntime.async(function unzipFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Unzipping ' + zipPath);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(assertZipArchive(zipPath));

      case 4:
        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.zip.extractAllTo(zipPath, _path2['default'].dirname(zipPath)));

      case 7:
        _loggerJs2['default'].debug("Unzip successful");
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-o', zipPath], { cwd: _path2['default'].dirname(zipPath) }));

      case 12:
        _loggerJs2['default'].debug("Unzip successful");

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](1);
        throw new Error('Error occurred while unzipping. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 15]]);
}

function assertZipArchive(zipPath) {
  var execOpts;
  return _regeneratorRuntime.async(function assertZipArchive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Testing zip archive: \'' + zipPath + '\'');

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(zipPath));

      case 4:
        if (!context$1$0.sent) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].debug("Zip archive tested clean");
        context$1$0.next = 9;
        break;

      case 8:
        throw new Error('Zip archive not present at ' + zipPath);

      case 9:
        context$1$0.next = 22;
        break;

      case 11:
        execOpts = { cwd: _path2['default'].dirname(zipPath) };
        context$1$0.prev = 12;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-tqv', zipPath], execOpts));

      case 15:
        context$1$0.next = 22;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](12);

        if (!(context$1$0.t0.message.indexOf('code 2') === -1)) {
          context$1$0.next = 21;
          break;
        }

        throw context$1$0.t0;

      case 21:
        _loggerJs2['default'].warn('Test failed with recoverable error. Continuing.');

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 17]]);
}

function getIMEListFromOutput(stdout) {
  var engines = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(stdout.split('\n')), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var line = _step2.value;

      if (line.length > 0 && line[0] !== ' ') {
        // remove newline and trailing colon, and add to the list
        engines.push(line.trim().replace(/:$/, ''));
      }
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

  return engines;
}

var getJavaForOs = _lodash2['default'].memoize(function () {
  return _path2['default'].resolve(getJavaHome(), 'bin', 'java' + (_appiumSupport.system.isWindows() ? '.exe' : ''));
});

function getJavaHome() {
  if (process.env.JAVA_HOME) {
    return process.env.JAVA_HOME;
  }
  throw new Error("JAVA_HOME is not set currently. Please set JAVA_HOME.");
}

/**
 * Get the absolute path to apksigner tool
 *
 * @param {Object} sysHelpers - An instance containing systemCallMethods helper methods
 * @returns {string} An absolute path to apksigner tool.
 * @throws {Error} If the tool is not present on the local file system.
 */
function getApksignerForOs(sysHelpers) {
  return _regeneratorRuntime.async(function getApksignerForOs$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(sysHelpers.getBinaryFromSdkRoot('apksigner'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Checks mShowingLockscreen or mDreamingLockscreen in dumpsys output to determine
 * if lock screen is showing
 *
 * @param {string} dumpsys - The output of dumpsys window command.
 * @return {boolean} True if lock screen is showing.
 */
function isShowingLockscreen(dumpsys) {
  return (/(mShowingLockscreen=true|mDreamingLockscreen=true)/gi.test(dumpsys)
  );
}

/*
 * Checks mCurrentFocus in dumpsys output to determine if Keyguard is activated
 */
function isCurrentFocusOnKeyguard(dumpsys) {
  var m = /mCurrentFocus.+Keyguard/gi.exec(dumpsys);
  return m && m.length && m[0] ? true : false;
}

/*
 * Reads SurfaceOrientation in dumpsys output
 */
function getSurfaceOrientation(dumpsys) {
  var m = /SurfaceOrientation: \d/gi.exec(dumpsys);
  return m && parseInt(m[0].split(':')[1], 10);
}

/*
 * Checks mScreenOnFully in dumpsys output to determine if screen is showing
 * Default is true
 */
function isScreenOnFully(dumpsys) {
  var m = /mScreenOnFully=\w+/gi.exec(dumpsys);
  return !m || // if information is missing we assume screen is fully on
  m && m.length > 0 && m[0].split('=')[1] === 'true' || false;
}

function buildStartCmd(startAppOptions, apiLevel) {
  var cmd = ['am', 'start', '-W', '-n', startAppOptions.pkg + '/' + startAppOptions.activity];
  if (startAppOptions.stopApp && apiLevel >= 15) {
    cmd.push('-S');
  }
  if (startAppOptions.action) {
    cmd.push('-a', startAppOptions.action);
  }
  if (startAppOptions.category) {
    cmd.push('-c', startAppOptions.category);
  }
  if (startAppOptions.flags) {
    cmd.push('-f', startAppOptions.flags);
  }
  if (startAppOptions.optionalIntentArguments) {
    // expect optionalIntentArguments to be a single string of the form:
    //     "-flag key"
    //     "-flag key value"
    // or a combination of these (e.g., "-flag1 key1 -flag2 key2 value2")

    // take a string and parse out the part before any spaces, and anything after
    // the first space
    var parseKeyValue = function parseKeyValue(str) {
      str = str.trim();
      var space = str.indexOf(' ');
      if (space === -1) {
        return str.length ? [str] : [];
      } else {
        return [str.substring(0, space).trim(), str.substring(space + 1).trim()];
      }
    };

    // cycle through the optionalIntentArguments and pull out the arguments
    // add a space initially so flags can be distinguished from arguments that
    // have internal hyphens
    var optionalIntentArguments = ' ' + startAppOptions.optionalIntentArguments;
    var re = / (-[^\s]+) (.+)/;
    while (true) {
      // eslint-disable-line no-constant-condition
      var args = re.exec(optionalIntentArguments);
      if (!args) {
        if (optionalIntentArguments.length) {
          // no more flags, so the remainder can be treated as 'key' or 'key value'
          cmd.push.apply(cmd, parseKeyValue(optionalIntentArguments));
        }
        // we are done
        break;
      }

      // take the flag and see if it is at the beginning of the string
      // if it is not, then it means we have been through already, and
      // what is before the flag is the argument for the previous flag
      var flag = args[1];
      var flagPos = optionalIntentArguments.indexOf(flag);
      if (flagPos !== 0) {
        var prevArgs = optionalIntentArguments.substring(0, flagPos);
        cmd.push.apply(cmd, parseKeyValue(prevArgs));
      }

      // add the flag, as there are no more earlier arguments
      cmd.push(flag);

      // make optionalIntentArguments hold the remainder
      optionalIntentArguments = args[2];
    }
  }
  return cmd;
}

var getSdkToolsVersion = _lodash2['default'].memoize(function getSdkToolsVersion() {
  var androidHome, propertiesPath, propertiesContent, versionMatcher, match;
  return _regeneratorRuntime.async(function getSdkToolsVersion$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        androidHome = process.env.ANDROID_HOME;

        if (!androidHome) {
          _loggerJs2['default'].errorAndThrow('ANDROID_HOME environment varibale is expected to be set');
        }
        propertiesPath = _path2['default'].resolve(androidHome, 'tools', 'source.properties');
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(propertiesPath));

      case 5:
        if (context$1$0.sent) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].warn('Cannot find ' + propertiesPath + ' file to read SDK version from');
        return context$1$0.abrupt('return');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(propertiesPath, 'utf8'));

      case 10:
        propertiesContent = context$1$0.sent;
        versionMatcher = new RegExp(/Pkg\.Revision=(\d+)\.?(\d+)?\.?(\d+)?/);
        match = versionMatcher.exec(propertiesContent);

        if (!match) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', { major: parseInt(match[1], 10),
          minor: match[2] ? parseInt(match[2], 10) : 0,
          build: match[3] ? parseInt(match[3], 10) : 0 });

      case 15:
        _loggerJs2['default'].warn('Cannot parse "Pkg.Revision" value from ' + propertiesPath);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

exports.getAndroidPlatformAndPath = getAndroidPlatformAndPath;
exports.unzipFile = unzipFile;
exports.assertZipArchive = assertZipArchive;
exports.getIMEListFromOutput = getIMEListFromOutput;
exports.getJavaForOs = getJavaForOs;
exports.isShowingLockscreen = isShowingLockscreen;
exports.isCurrentFocusOnKeyguard = isCurrentFocusOnKeyguard;
exports.getSurfaceOrientation = getSurfaceOrientation;
exports.isScreenOnFully = isScreenOnFully;
exports.buildStartCmd = buildStartCmd;
exports.getJavaHome = getJavaHome;
exports.rootDir = rootDir;
exports.androidPlatforms = androidPlatforms;
exports.getSdkToolsVersion = getSdkToolsVersion;
exports.getApksignerForOs = getApksignerForOs;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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RSxPQUFPLEdBQVAsT0FBTztRQUFFLGdCQUFnQixHQUFoQixnQkFBZ0I7UUFBRSxrQkFBa0IsR0FBbEIsa0JBQWtCO1FBQUUsaUJBQWlCLEdBQWpCLGlCQUFpQiIsImZpbGUiOiJsaWIvaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgc3lzdGVtLCBmcywgemlwIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cblxuY29uc3Qgcm9vdERpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHByb2Nlc3MuZW52Lk5PX1BSRUNPTVBJTEUgPyAnLi4nIDogJy4uLy4uJyk7XG5jb25zdCBhbmRyb2lkUGxhdGZvcm1zID0gWydhbmRyb2lkLTQuMicsICdhbmRyb2lkLTE3JywgJ2FuZHJvaWQtNC4zJywgJ2FuZHJvaWQtMTgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC00LjQnLCAnYW5kcm9pZC0xOScsICdhbmRyb2lkLUwnLCAnYW5kcm9pZC0yMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLTUuMCcsICdhbmRyb2lkLTIxJywgJ2FuZHJvaWQtMjInLCAnYW5kcm9pZC1NTkMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC0yMycsICdhbmRyb2lkLTYuMCcsICdhbmRyb2lkLU4nLCAnYW5kcm9pZC0yNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLTI1J107XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGggKCkge1xuICBjb25zdCBhbmRyb2lkSG9tZSA9IHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcbiAgaWYgKCFfLmlzU3RyaW5nKGFuZHJvaWRIb21lKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KFwiQU5EUk9JRF9IT01FIGVudmlyb25tZW50IHZhcmlhYmxlIHdhcyBub3QgZXhwb3J0ZWRcIik7XG4gIH1cblxuICAvLyBnZXQgdGhlIGxhdGVzdCBwbGF0Zm9ybSBhbmQgcGF0aFxuICBsZXQgcGxhdGZvcm1zID0gcGF0aC5yZXNvbHZlKGFuZHJvaWRIb21lLCAncGxhdGZvcm1zJyk7XG4gIGZvciAobGV0IHBsYXRmb3JtIG9mIF8uY2xvbmUoYW5kcm9pZFBsYXRmb3JtcykucmV2ZXJzZSgpKSB7XG4gICAgbGV0IHBsYXRmb3JtUGF0aCA9IHBhdGgucmVzb2x2ZShwbGF0Zm9ybXMsIHBsYXRmb3JtKTtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKHBsYXRmb3JtUGF0aCkpIHtcbiAgICAgIHJldHVybiB7cGxhdGZvcm0sIHBsYXRmb3JtUGF0aH07XG4gICAgfVxuICB9XG4gIHJldHVybiB7cGxhdGZvcm06IG51bGwsIHBsYXRmb3JtUGF0aDogbnVsbH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVuemlwRmlsZSAoemlwUGF0aCkge1xuICBsb2cuZGVidWcoYFVuemlwcGluZyAke3ppcFBhdGh9YCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgYXNzZXJ0WmlwQXJjaGl2ZSh6aXBQYXRoKTtcbiAgICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgICBhd2FpdCB6aXAuZXh0cmFjdEFsbFRvKHppcFBhdGgsIHBhdGguZGlybmFtZSh6aXBQYXRoKSk7XG4gICAgICBsb2cuZGVidWcoXCJVbnppcCBzdWNjZXNzZnVsXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBleGVjKCd1bnppcCcsIFsnLW8nLCB6aXBQYXRoXSwge2N3ZDogcGF0aC5kaXJuYW1lKHppcFBhdGgpfSk7XG4gICAgICBsb2cuZGVidWcoXCJVbnppcCBzdWNjZXNzZnVsXCIpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igb2NjdXJyZWQgd2hpbGUgdW56aXBwaW5nLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYXNzZXJ0WmlwQXJjaGl2ZSAoemlwUGF0aCkge1xuICBsb2cuZGVidWcoYFRlc3RpbmcgemlwIGFyY2hpdmU6ICcke3ppcFBhdGh9J2ApO1xuICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyh6aXBQYXRoKSkge1xuICAgICAgbG9nLmRlYnVnKFwiWmlwIGFyY2hpdmUgdGVzdGVkIGNsZWFuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFppcCBhcmNoaXZlIG5vdCBwcmVzZW50IGF0ICR7emlwUGF0aH1gKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGV4ZWNPcHRzID0ge2N3ZDogcGF0aC5kaXJuYW1lKHppcFBhdGgpfTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZXhlYygndW56aXAnLCBbJy10cXYnLCB6aXBQYXRoXSwgZXhlY09wdHMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NvZGUgMicpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2cud2FybihgVGVzdCBmYWlsZWQgd2l0aCByZWNvdmVyYWJsZSBlcnJvci4gQ29udGludWluZy5gKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SU1FTGlzdEZyb21PdXRwdXQgKHN0ZG91dCkge1xuICBsZXQgZW5naW5lcyA9IFtdO1xuICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdCgnXFxuJykpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPiAwICYmIGxpbmVbMF0gIT09ICcgJykge1xuICAgICAgLy8gcmVtb3ZlIG5ld2xpbmUgYW5kIHRyYWlsaW5nIGNvbG9uLCBhbmQgYWRkIHRvIHRoZSBsaXN0XG4gICAgICBlbmdpbmVzLnB1c2gobGluZS50cmltKCkucmVwbGFjZSgvOiQvLCAnJykpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW5naW5lcztcbn1cblxuY29uc3QgZ2V0SmF2YUZvck9zID0gXy5tZW1vaXplKCgpID0+IHtcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShnZXRKYXZhSG9tZSgpLCAnYmluJywgYGphdmEke3N5c3RlbS5pc1dpbmRvd3MoKSA/ICcuZXhlJyA6ICcnfWApO1xufSk7XG5cbmZ1bmN0aW9uIGdldEphdmFIb21lICgpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkpBVkFfSE9NRSkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5KQVZBX0hPTUU7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiSkFWQV9IT01FIGlzIG5vdCBzZXQgY3VycmVudGx5LiBQbGVhc2Ugc2V0IEpBVkFfSE9NRS5cIik7XG59XG5cbi8qKlxuICogR2V0IHRoZSBhYnNvbHV0ZSBwYXRoIHRvIGFwa3NpZ25lciB0b29sXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN5c0hlbHBlcnMgLSBBbiBpbnN0YW5jZSBjb250YWluaW5nIHN5c3RlbUNhbGxNZXRob2RzIGhlbHBlciBtZXRob2RzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBhYnNvbHV0ZSBwYXRoIHRvIGFwa3NpZ25lciB0b29sLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB0b29sIGlzIG5vdCBwcmVzZW50IG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0QXBrc2lnbmVyRm9yT3MgKHN5c0hlbHBlcnMpIHtcbiAgcmV0dXJuIGF3YWl0IHN5c0hlbHBlcnMuZ2V0QmluYXJ5RnJvbVNka1Jvb3QoJ2Fwa3NpZ25lcicpO1xufVxuXG4gLyoqXG4gICogQ2hlY2tzIG1TaG93aW5nTG9ja3NjcmVlbiBvciBtRHJlYW1pbmdMb2Nrc2NyZWVuIGluIGR1bXBzeXMgb3V0cHV0IHRvIGRldGVybWluZVxuICAqIGlmIGxvY2sgc2NyZWVuIGlzIHNob3dpbmdcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBkdW1wc3lzIC0gVGhlIG91dHB1dCBvZiBkdW1wc3lzIHdpbmRvdyBjb21tYW5kLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbG9jayBzY3JlZW4gaXMgc2hvd2luZy5cbiAgKi9cbmZ1bmN0aW9uIGlzU2hvd2luZ0xvY2tzY3JlZW4gKGR1bXBzeXMpIHtcbiAgcmV0dXJuIC8obVNob3dpbmdMb2Nrc2NyZWVuPXRydWV8bURyZWFtaW5nTG9ja3NjcmVlbj10cnVlKS9naS50ZXN0KGR1bXBzeXMpO1xufVxuXG4vKlxuICogQ2hlY2tzIG1DdXJyZW50Rm9jdXMgaW4gZHVtcHN5cyBvdXRwdXQgdG8gZGV0ZXJtaW5lIGlmIEtleWd1YXJkIGlzIGFjdGl2YXRlZFxuICovXG5mdW5jdGlvbiBpc0N1cnJlbnRGb2N1c09uS2V5Z3VhcmQgKGR1bXBzeXMpIHtcbiAgbGV0IG0gPSAvbUN1cnJlbnRGb2N1cy4rS2V5Z3VhcmQvZ2kuZXhlYyhkdW1wc3lzKTtcbiAgcmV0dXJuIChtICYmIG0ubGVuZ3RoICYmIG1bMF0pID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vKlxuICogUmVhZHMgU3VyZmFjZU9yaWVudGF0aW9uIGluIGR1bXBzeXMgb3V0cHV0XG4gKi9cbmZ1bmN0aW9uIGdldFN1cmZhY2VPcmllbnRhdGlvbiAoZHVtcHN5cykge1xuICBsZXQgbSA9IC9TdXJmYWNlT3JpZW50YXRpb246IFxcZC9naS5leGVjKGR1bXBzeXMpO1xuICByZXR1cm4gbSAmJiBwYXJzZUludChtWzBdLnNwbGl0KCc6JylbMV0sIDEwKTtcbn1cblxuLypcbiAqIENoZWNrcyBtU2NyZWVuT25GdWxseSBpbiBkdW1wc3lzIG91dHB1dCB0byBkZXRlcm1pbmUgaWYgc2NyZWVuIGlzIHNob3dpbmdcbiAqIERlZmF1bHQgaXMgdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1NjcmVlbk9uRnVsbHkgKGR1bXBzeXMpIHtcbiAgbGV0IG0gPSAvbVNjcmVlbk9uRnVsbHk9XFx3Ky9naS5leGVjKGR1bXBzeXMpO1xuICByZXR1cm4gIW0gfHwgLy8gaWYgaW5mb3JtYXRpb24gaXMgbWlzc2luZyB3ZSBhc3N1bWUgc2NyZWVuIGlzIGZ1bGx5IG9uXG4gICAgICAgICAobSAmJiBtLmxlbmd0aCA+IDAgJiYgbVswXS5zcGxpdCgnPScpWzFdID09PSAndHJ1ZScpIHx8IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBidWlsZFN0YXJ0Q21kIChzdGFydEFwcE9wdGlvbnMsIGFwaUxldmVsKSB7XG4gIGxldCBjbWQgPSBbJ2FtJywgJ3N0YXJ0JywgJy1XJywgJy1uJywgYCR7c3RhcnRBcHBPcHRpb25zLnBrZ30vJHtzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHl9YF07XG4gIGlmIChzdGFydEFwcE9wdGlvbnMuc3RvcEFwcCAmJiBhcGlMZXZlbCA+PSAxNSkge1xuICAgIGNtZC5wdXNoKCctUycpO1xuICB9XG4gIGlmIChzdGFydEFwcE9wdGlvbnMuYWN0aW9uKSB7XG4gICAgY21kLnB1c2goJy1hJywgc3RhcnRBcHBPcHRpb25zLmFjdGlvbik7XG4gIH1cbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5jYXRlZ29yeSkge1xuICAgIGNtZC5wdXNoKCctYycsIHN0YXJ0QXBwT3B0aW9ucy5jYXRlZ29yeSk7XG4gIH1cbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5mbGFncykge1xuICAgIGNtZC5wdXNoKCctZicsIHN0YXJ0QXBwT3B0aW9ucy5mbGFncyk7XG4gIH1cbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5vcHRpb25hbEludGVudEFyZ3VtZW50cykge1xuICAgIC8vIGV4cGVjdCBvcHRpb25hbEludGVudEFyZ3VtZW50cyB0byBiZSBhIHNpbmdsZSBzdHJpbmcgb2YgdGhlIGZvcm06XG4gICAgLy8gICAgIFwiLWZsYWcga2V5XCJcbiAgICAvLyAgICAgXCItZmxhZyBrZXkgdmFsdWVcIlxuICAgIC8vIG9yIGEgY29tYmluYXRpb24gb2YgdGhlc2UgKGUuZy4sIFwiLWZsYWcxIGtleTEgLWZsYWcyIGtleTIgdmFsdWUyXCIpXG5cbiAgICAvLyB0YWtlIGEgc3RyaW5nIGFuZCBwYXJzZSBvdXQgdGhlIHBhcnQgYmVmb3JlIGFueSBzcGFjZXMsIGFuZCBhbnl0aGluZyBhZnRlclxuICAgIC8vIHRoZSBmaXJzdCBzcGFjZVxuICAgIGxldCBwYXJzZUtleVZhbHVlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICAgIGxldCBzcGFjZSA9IHN0ci5pbmRleE9mKCcgJyk7XG4gICAgICBpZiAoc3BhY2UgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBzdHIubGVuZ3RoID8gW3N0cl0gOiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbc3RyLnN1YnN0cmluZygwLCBzcGFjZSkudHJpbSgpLCBzdHIuc3Vic3RyaW5nKHNwYWNlICsgMSkudHJpbSgpXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gY3ljbGUgdGhyb3VnaCB0aGUgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgYW5kIHB1bGwgb3V0IHRoZSBhcmd1bWVudHNcbiAgICAvLyBhZGQgYSBzcGFjZSBpbml0aWFsbHkgc28gZmxhZ3MgY2FuIGJlIGRpc3Rpbmd1aXNoZWQgZnJvbSBhcmd1bWVudHMgdGhhdFxuICAgIC8vIGhhdmUgaW50ZXJuYWwgaHlwaGVuc1xuICAgIGxldCBvcHRpb25hbEludGVudEFyZ3VtZW50cyA9IGAgJHtzdGFydEFwcE9wdGlvbnMub3B0aW9uYWxJbnRlbnRBcmd1bWVudHN9YDtcbiAgICBsZXQgcmUgPSAvICgtW15cXHNdKykgKC4rKS87XG4gICAgd2hpbGUgKHRydWUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIGxldCBhcmdzID0gcmUuZXhlYyhvcHRpb25hbEludGVudEFyZ3VtZW50cyk7XG4gICAgICBpZiAoIWFyZ3MpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsSW50ZW50QXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIC8vIG5vIG1vcmUgZmxhZ3MsIHNvIHRoZSByZW1haW5kZXIgY2FuIGJlIHRyZWF0ZWQgYXMgJ2tleScgb3IgJ2tleSB2YWx1ZSdcbiAgICAgICAgICBjbWQucHVzaC5hcHBseShjbWQsIHBhcnNlS2V5VmFsdWUob3B0aW9uYWxJbnRlbnRBcmd1bWVudHMpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBhcmUgZG9uZVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gdGFrZSB0aGUgZmxhZyBhbmQgc2VlIGlmIGl0IGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZ1xuICAgICAgLy8gaWYgaXQgaXMgbm90LCB0aGVuIGl0IG1lYW5zIHdlIGhhdmUgYmVlbiB0aHJvdWdoIGFscmVhZHksIGFuZFxuICAgICAgLy8gd2hhdCBpcyBiZWZvcmUgdGhlIGZsYWcgaXMgdGhlIGFyZ3VtZW50IGZvciB0aGUgcHJldmlvdXMgZmxhZ1xuICAgICAgbGV0IGZsYWcgPSBhcmdzWzFdO1xuICAgICAgbGV0IGZsYWdQb3MgPSBvcHRpb25hbEludGVudEFyZ3VtZW50cy5pbmRleE9mKGZsYWcpO1xuICAgICAgaWYgKGZsYWdQb3MgIT09IDApIHtcbiAgICAgICAgbGV0IHByZXZBcmdzID0gb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMuc3Vic3RyaW5nKDAsIGZsYWdQb3MpO1xuICAgICAgICBjbWQucHVzaC5hcHBseShjbWQsIHBhcnNlS2V5VmFsdWUocHJldkFyZ3MpKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHRoZSBmbGFnLCBhcyB0aGVyZSBhcmUgbm8gbW9yZSBlYXJsaWVyIGFyZ3VtZW50c1xuICAgICAgY21kLnB1c2goZmxhZyk7XG5cbiAgICAgIC8vIG1ha2Ugb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgaG9sZCB0aGUgcmVtYWluZGVyXG4gICAgICBvcHRpb25hbEludGVudEFyZ3VtZW50cyA9IGFyZ3NbMl07XG4gICAgfVxuICB9XG4gIHJldHVybiBjbWQ7XG59XG5cbmNvbnN0IGdldFNka1Rvb2xzVmVyc2lvbiA9IF8ubWVtb2l6ZShhc3luYyBmdW5jdGlvbiBnZXRTZGtUb29sc1ZlcnNpb24gKCkge1xuICBjb25zdCBhbmRyb2lkSG9tZSA9IHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcbiAgaWYgKCFhbmRyb2lkSG9tZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KCdBTkRST0lEX0hPTUUgZW52aXJvbm1lbnQgdmFyaWJhbGUgaXMgZXhwZWN0ZWQgdG8gYmUgc2V0Jyk7XG4gIH1cbiAgY29uc3QgcHJvcGVydGllc1BhdGggPSBwYXRoLnJlc29sdmUoYW5kcm9pZEhvbWUsICd0b29scycsICdzb3VyY2UucHJvcGVydGllcycpO1xuICBpZiAoIWF3YWl0IGZzLmV4aXN0cyhwcm9wZXJ0aWVzUGF0aCkpIHtcbiAgICBsb2cud2FybihgQ2Fubm90IGZpbmQgJHtwcm9wZXJ0aWVzUGF0aH0gZmlsZSB0byByZWFkIFNESyB2ZXJzaW9uIGZyb21gKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcHJvcGVydGllc0NvbnRlbnQgPSBhd2FpdCBmcy5yZWFkRmlsZShwcm9wZXJ0aWVzUGF0aCwgJ3V0ZjgnKTtcbiAgY29uc3QgdmVyc2lvbk1hdGNoZXIgPSBuZXcgUmVnRXhwKC9Qa2dcXC5SZXZpc2lvbj0oXFxkKylcXC4/KFxcZCspP1xcLj8oXFxkKyk/Lyk7XG4gIGNvbnN0IG1hdGNoID0gdmVyc2lvbk1hdGNoZXIuZXhlYyhwcm9wZXJ0aWVzQ29udGVudCk7XG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiB7bWFqb3I6IHBhcnNlSW50KG1hdGNoWzFdLCAxMCksXG4gICAgICAgICAgICBtaW5vcjogbWF0Y2hbMl0gPyBwYXJzZUludChtYXRjaFsyXSwgMTApIDogMCxcbiAgICAgICAgICAgIGJ1aWxkOiBtYXRjaFszXSA/IHBhcnNlSW50KG1hdGNoWzNdLCAxMCkgOiAwfTtcbiAgfVxuICBsb2cud2FybihgQ2Fubm90IHBhcnNlIFwiUGtnLlJldmlzaW9uXCIgdmFsdWUgZnJvbSAke3Byb3BlcnRpZXNQYXRofWApO1xufSk7XG5cbmV4cG9ydCB7IGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGgsIHVuemlwRmlsZSwgYXNzZXJ0WmlwQXJjaGl2ZSxcbiAgICAgICAgIGdldElNRUxpc3RGcm9tT3V0cHV0LCBnZXRKYXZhRm9yT3MsIGlzU2hvd2luZ0xvY2tzY3JlZW4sIGlzQ3VycmVudEZvY3VzT25LZXlndWFyZCxcbiAgICAgICAgIGdldFN1cmZhY2VPcmllbnRhdGlvbiwgaXNTY3JlZW5PbkZ1bGx5LCBidWlsZFN0YXJ0Q21kLCBnZXRKYXZhSG9tZSxcbiAgICAgICAgIHJvb3REaXIsIGFuZHJvaWRQbGF0Zm9ybXMsIGdldFNka1Rvb2xzVmVyc2lvbiwgZ2V0QXBrc2lnbmVyRm9yT3MgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==

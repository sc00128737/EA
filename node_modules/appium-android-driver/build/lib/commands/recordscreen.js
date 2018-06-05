'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _asyncbox = require('asyncbox');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var commands = {},
    extensions = {};

var RETRY_PAUSE = 1000;
var MAX_RECORDING_TIME_SEC = 60 * 3;
var DEFAULT_RECORDING_TIME_SEC = MAX_RECORDING_TIME_SEC;
var PROCESS_SHUTDOWN_TIMEOUT_SEC = 5;
var SCREENRECORD_BINARY = 'screenrecord';
var DEFAULT_EXT = '.mp4';

function extractCurrentRecordingPath(adb, pids) {
  var lsofOutput, _ref, output, pattern, matches;

  return _regeneratorRuntime.async(function extractCurrentRecordingPath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        lsofOutput = '';
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.shell(['lsof', '-p', pids.join(',')]));

      case 4:
        _ref = context$1$0.sent;
        output = _ref.output;

        lsofOutput = output;
        context$1$0.next = 13;
        break;

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].warn('Cannot extract the path to the current screen capture. ' + ('Original error: ' + context$1$0.t0.message));
        return context$1$0.abrupt('return', null);

      case 13:
        _logger2['default'].debug('Got the following output from lsof: ' + lsofOutput);
        pattern = new RegExp(/\d+\s+(\/.*\.mp4)/);
        matches = pattern.exec(lsofOutput);
        return context$1$0.abrupt('return', _lodash2['default'].isEmpty(matches) ? null : _lodash2['default'].last(matches));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 9]]);
}

function finishScreenCapture(adb, pids) {
  return _regeneratorRuntime.async(function finishScreenCapture$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.shell(['kill', '-2'].concat(_toConsumableArray(pids))));

      case 3:
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);
        return context$1$0.abrupt('return', true);

      case 8:
        context$1$0.prev = 8;
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap((0, _asyncbox.waitForCondition)(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(adb.shell(['kill', '-0'].concat(_toConsumableArray(pids))));

              case 3:
                context$2$0.next = 8;
                break;

              case 5:
                context$2$0.prev = 5;
                context$2$0.t0 = context$2$0['catch'](0);
                return context$2$0.abrupt('return', true);

              case 8:
                return context$2$0.abrupt('return', false);

              case 9:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 5]]);
        }, { waitMs: PROCESS_SHUTDOWN_TIMEOUT_SEC * 1000, intervalMs: 300 }));

      case 11:
        context$1$0.next = 16;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t1 = context$1$0['catch'](8);
        return context$1$0.abrupt('return', false);

      case 16:
        return context$1$0.abrupt('return', true);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5], [8, 13]]);
}

function uploadRecordedMedia(adb, pathOnDevice) {
  var remotePath = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  var uploadOptions = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var localFile, _ref2, size, memoryUsage, maxMemoryLimit, content, remoteUrl, options, user, pass, method;

  return _regeneratorRuntime.async(function uploadRecordedMedia$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: DEFAULT_EXT });
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.pull(pathOnDevice, localFile));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(localFile));

      case 6:
        _ref2 = context$1$0.sent;
        size = _ref2.size;

        _logger2['default'].debug('The size of the recent screen recording is ' + _appiumSupport.util.toReadableSizeString(size));

        if (!_lodash2['default'].isEmpty(remotePath)) {
          context$1$0.next = 18;
          break;
        }

        memoryUsage = process.memoryUsage();
        maxMemoryLimit = (memoryUsage.heapTotal - memoryUsage.heapUsed) / 2;

        if (!(size >= maxMemoryLimit)) {
          context$1$0.next = 14;
          break;
        }

        throw new Error('Cannot read the recorded media \'' + pathOnDevice + '\' to the memory, ' + 'because the file is too large ' + ('(' + _appiumSupport.util.toReadableSizeString(size) + ' >= ' + _appiumSupport.util.toReadableSizeString(maxMemoryLimit) + '). ') + 'Try to provide a link to a remote writable location instead.');

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localFile));

      case 16:
        content = context$1$0.sent;
        return context$1$0.abrupt('return', content.toString('base64'));

      case 18:
        remoteUrl = _url2['default'].parse(remotePath);
        options = {};
        user = uploadOptions.user;
        pass = uploadOptions.pass;
        method = uploadOptions.method;

        if (remoteUrl.protocol.startsWith('http')) {
          options = {
            url: remoteUrl.href,
            method: method || 'PUT',
            multipart: [{ body: _fs3['default'].createReadStream(localFile) }]
          };
          if (user && pass) {
            options.auth = { user: user, pass: pass };
          }
        } else if (remoteUrl.protocol === 'ftp') {
          options = {
            host: remoteUrl.hostname,
            port: remoteUrl.port || 21
          };
          if (user && pass) {
            options.user = user;
            options.pass = pass;
          }
        }
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(_appiumSupport.net.uploadFile(localFile, remotePath, options));

      case 26:
        return context$1$0.abrupt('return', '');

      case 27:
        context$1$0.prev = 27;
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(localFile));

      case 30:
        context$1$0.prev = 30;
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(adb.rimraf(pathOnDevice));

      case 33:
        context$1$0.next = 38;
        break;

      case 35:
        context$1$0.prev = 35;
        context$1$0.t0 = context$1$0['catch'](30);

        _logger2['default'].warn('Cannot delete the recorded screen media \'' + pathOnDevice + '\' from the device. Continuing anyway');

      case 38:
        return context$1$0.finish(27);

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1,, 27, 39], [30, 35]]);
}

/**
 * @typedef {Object} StartRecordingOptions
 *
 * @property {?string} remotePath - The path to the remote location, where the captured video should be uploaded.
 *                                  The following protocols are supported: http/https, ftp.
 *                                  Null or empty string value (the default setting) means the content of resulting
 *                                  file should be encoded as Base64 and passed as the endpount response value.
 *                                  An exception will be thrown if the generated media file is too big to
 *                                  fit into the available process memory.
 *                                  This option only has an effect if there is screen recording process in progreess
 *                                  and `forceRestart` parameter is not set to `true`.
 * @property {?string} user - The name of the user for the remote authentication. Only works if `remotePath` is provided.
 * @property {?string} pass - The password for the remote authentication. Only works if `remotePath` is provided.
 * @property {?string} method - The http multipart upload method name. The 'PUT' one is used by default.
 *                              Only works if `remotePath` is provided.
 * @property {?string} videoSize - The format is widthxheight.
 *                  The default value is the device's native display resolution (if supported),
 *                  1280x720 if not. For best results,
 *                  use a size supported by your device's Advanced Video Coding (AVC) encoder.
 *                  For example, "1280x720"
 * @property {?string|number} timeLimit - The maximum recording time, in seconds. The default and maximum value is 180 (3 minutes).
 * @property {?string|number} bitRate - The video bit rate for the video, in megabits per second.
 *                The default value is 4. You can increase the bit rate to improve video quality,
 *                but doing so results in larger movie files.
 * @property {?boolean} forceRestart - Whether to try to catch and upload/return the currently running screen recording
 *                                     (`false`, the default setting) or ignore the result of it and start a new recording
 *                                     immediately (`true`).
 */

/**
 * Record the display of devices running Android 4.4 (API level 19) and higher.
 * It records screen activity to an MPEG-4 file. Audio is not recorded with the video file.
 * If screen recording has been already started then the command will stop it forcefully and start a new one.
 * The previously recorded video file will be deleted.
 *
 * @param {?StartRecordingOptions} options - The available options.
 * @returns {string} Base64-encoded content of the recorded media file if
 *                   any screen recording is currently running or an empty string.
 * @throws {Error} If screen recording has failed to start.
 */
commands.startRecordingScreen = function callee$0$0() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var videoSize, _options$timeLimit, timeLimit, bitRate, forceRestart, apiLevel, result, pids, pathOnDevice, cmd;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        videoSize = options.videoSize;
        _options$timeLimit = options.timeLimit;
        timeLimit = _options$timeLimit === undefined ? DEFAULT_RECORDING_TIME_SEC : _options$timeLimit;
        bitRate = options.bitRate;
        forceRestart = options.forceRestart;

        if (!this.isEmulator()) {
          context$1$0.next = 7;
          break;
        }

        throw new Error('Screen recording does not work on emulators');

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 9:
        apiLevel = context$1$0.sent;

        if (!(apiLevel < 19)) {
          context$1$0.next = 12;
          break;
        }

        throw new Error('Screen recording not available on API Level ' + apiLevel + '. Minimum API Level is 19.');

      case 12:
        result = '';

        if (forceRestart) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.stopRecordingScreen(options));

      case 16:
        result = context$1$0.sent;

      case 17:
        context$1$0.prev = 17;
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(this.adb.getPIDsByName(SCREENRECORD_BINARY));

      case 20:
        context$1$0.t0 = function (p) {
          return '' + p;
        };

        pids = context$1$0.sent.map(context$1$0.t0);

        if (_lodash2['default'].isEmpty(pids)) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(this.adb.shell(['kill'].concat(_toConsumableArray(pids))));

      case 25:
        context$1$0.next = 30;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t1 = context$1$0['catch'](17);

        _logger2['default'].errorAndThrow('Unable to stop screen recording: ' + context$1$0.t1.message);

      case 30:
        if (_lodash2['default'].isEmpty(this._recentScreenRecordingPath)) {
          context$1$0.next = 39;
          break;
        }

        context$1$0.prev = 31;
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(this.adb.rimraf(this._recentScreenRecordingPath));

      case 34:
        context$1$0.next = 38;
        break;

      case 36:
        context$1$0.prev = 36;
        context$1$0.t2 = context$1$0['catch'](31);

      case 38:
        this._recentScreenRecordingPath = null;

      case 39:
        pathOnDevice = '/sdcard/' + Math.floor(new Date()) + DEFAULT_EXT;
        cmd = [SCREENRECORD_BINARY];

        if (_appiumSupport.util.hasValue(videoSize)) {
          cmd.push('--size', videoSize);
        }
        if (_appiumSupport.util.hasValue(timeLimit)) {
          cmd.push('--time-limit', '' + timeLimit);
        }
        if (_appiumSupport.util.hasValue(bitRate)) {
          cmd.push('--bit-rate', '' + bitRate);
        }
        cmd.push(pathOnDevice);

        // wrap in a manual Promise so we can handle errors in adb shell operation
        context$1$0.next = 47;
        return _regeneratorRuntime.awrap(new _bluebird2['default'](function callee$1$0(resolve, reject) {
          var err, timeout;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this2 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                err = null;
                timeout = Math.floor(parseFloat(timeLimit) * 1000);

                if (!(timeout > MAX_RECORDING_TIME_SEC * 1000 || timeout <= 0)) {
                  context$2$0.next = 4;
                  break;
                }

                return context$2$0.abrupt('return', reject(new Error('The timeLimit value must be in range (0, ' + MAX_RECORDING_TIME_SEC + '] seconds. ' + ('The value of ' + timeLimit + ' has been passed instead.'))));

              case 4:
                _logger2['default'].debug('Beginning screen recording with command: \'adb shell ' + cmd.join(' ') + '\'' + ('Will timeout in ' + timeout / 1000 + ' s'));
                // screenrecord has its owen timer, so we only use this one as a safety precaution
                timeout += PROCESS_SHUTDOWN_TIMEOUT_SEC * 1000 * 2;
                // do not await here, as the call runs in the background and we check for its product
                this.adb.shell(cmd, { timeout: timeout, killSignal: 'SIGINT' })['catch'](function (e) {
                  err = e;
                });

                // there is the delay time to start recording the screen, so, wait until it is ready.
                // the ready condition is
                //   1. check the movie file is created
                //   2. check it is started to capture the screen
                context$2$0.prev = 7;
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, RETRY_PAUSE, function callee$2$0() {
                  var size;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        if (!err) {
                          context$3$0.next = 2;
                          break;
                        }

                        return context$3$0.abrupt('return');

                      case 2:
                        context$3$0.next = 4;
                        return _regeneratorRuntime.awrap(this.adb.fileSize(pathOnDevice));

                      case 4:
                        size = context$3$0.sent;

                        if (!(size <= 32)) {
                          context$3$0.next = 7;
                          break;
                        }

                        throw new Error('Remote file \'' + pathOnDevice + '\' found but it is still too small: ' + size + ' bytes');

                      case 7:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this2);
                }));

              case 10:
                context$2$0.next = 15;
                break;

              case 12:
                context$2$0.prev = 12;
                context$2$0.t0 = context$2$0['catch'](7);

                err = context$2$0.t0;

              case 15:
                if (!err) {
                  context$2$0.next = 18;
                  break;
                }

                _logger2['default'].error('Error recording screen: ' + err.message);
                return context$2$0.abrupt('return', reject(err));

              case 18:
                this._recentScreenRecordingPath = pathOnDevice;
                resolve(result);

              case 20:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3, [[7, 12]]);
        }));

      case 47:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 48:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[17, 27], [31, 36]]);
};

/**
 * @typedef {Object} StopRecordingOptions
 *
 * @property {?string} remotePath - The path to the remote location, where the resulting video should be uploaded.
 *                                  The following protocols are supported: http/https, ftp.
 *                                  Null or empty string value (the default setting) means the content of resulting
 *                                  file should be encoded as Base64 and passed as the endpount response value.
 *                                  An exception will be thrown if the generated media file is too big to
 *                                  fit into the available process memory.
 * @property {?string} user - The name of the user for the remote authentication.
 * @property {?string} pass - The password for the remote authentication.
 * @property {?string} method - The http multipart upload method name. The 'PUT' one is used by default.
 */

/**
 * Stop recording the screen. If no screen recording process is running then
 * the endpoint will try to get the recently recorded file.
 * If no previously recorded file is found and no active screen recording
 * processes are running then the method returns an empty string.
 *
 * @param {?StopRecordingOptions} options - The available options.
 * @returns {string} Base64-encoded content of the recorded media file if 'remotePath'
 *                   parameter is empty or null or an empty string.
 * @throws {Error} If there was an error while getting the name of a media file
 *                 or the file content cannot be uploaded to the remote location.
 */
commands.stopRecordingScreen = function callee$0$0() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var remotePath, user, pass, method, pids, pathOnDevice, result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remotePath = options.remotePath;
        user = options.user;
        pass = options.pass;
        method = options.method;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.getPIDsByName(SCREENRECORD_BINARY));

      case 6:
        context$1$0.t0 = function (p) {
          return '' + p;
        };

        pids = context$1$0.sent.map(context$1$0.t0);
        pathOnDevice = this._recentScreenRecordingPath;

        if (!_lodash2['default'].isEmpty(pids)) {
          context$1$0.next = 13;
          break;
        }

        _logger2['default'].info('Screen recording is not running. There is nothing to stop.');
        context$1$0.next = 27;
        break;

      case 13:
        context$1$0.t1 = pathOnDevice;

        if (context$1$0.t1) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(extractCurrentRecordingPath(this.adb, pids));

      case 17:
        context$1$0.t1 = context$1$0.sent;

      case 18:
        pathOnDevice = context$1$0.t1;
        context$1$0.prev = 19;

        if (_lodash2['default'].isEmpty(pathOnDevice)) {
          _logger2['default'].errorAndThrow('Cannot parse the path to the file created by ' + 'screen recorder process from \'ps\' output. ' + 'Did you start screen recording before?');
        }

      case 21:
        context$1$0.prev = 21;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(finishScreenCapture(this.adb, pids));

      case 24:
        if (context$1$0.sent) {
          context$1$0.next = 26;
          break;
        }

        _logger2['default'].warn('Unable to stop screen recording. Continuing anyway');

      case 26:
        return context$1$0.finish(21);

      case 27:
        result = '';

        if (_lodash2['default'].isEmpty(pathOnDevice)) {
          context$1$0.next = 36;
          break;
        }

        context$1$0.prev = 29;
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(uploadRecordedMedia(this.adb, pathOnDevice, remotePath, { user: user, pass: pass, method: method }));

      case 32:
        result = context$1$0.sent;

      case 33:
        context$1$0.prev = 33;

        this._recentScreenRecordingPath = null;
        return context$1$0.finish(33);

      case 36:
        return context$1$0.abrupt('return', result);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[19,, 21, 27], [29,, 33, 36]]);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;

// this function is suppported on the device running android 4.4(api level 19)

//make adb command
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9yZWNvcmRzY3JlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OzttQkFDTixJQUFJOzs7O21CQUNKLEtBQUs7Ozs7d0JBQzJCLFVBQVU7O3dCQUM1QyxVQUFVOzs7OzZCQUNNLGdCQUFnQjs7c0JBQzlCLFdBQVc7Ozs7b0JBQ1YsTUFBTTs7OztBQUd2QixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFbkMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLElBQU0sc0JBQXNCLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0QyxJQUFNLDBCQUEwQixHQUFHLHNCQUFzQixDQUFDO0FBQzFELElBQU0sNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDO0FBQzNDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQzs7QUFFM0IsU0FBZSwyQkFBMkIsQ0FBRSxHQUFHLEVBQUUsSUFBSTtNQUMvQyxVQUFVLFFBRUwsTUFBTSxFQVFULE9BQU8sRUFDUCxPQUFPOzs7OztBQVhULGtCQUFVLEdBQUcsRUFBRTs7O3lDQUVNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7OztBQUF6RCxjQUFNLFFBQU4sTUFBTTs7QUFDYixrQkFBVSxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7QUFFcEIsNEJBQUksSUFBSSxDQUFDLGtGQUNtQixlQUFJLE9BQU8sQ0FBRSxDQUFDLENBQUM7NENBQ3BDLElBQUk7OztBQUViLDRCQUFJLEtBQUssMENBQXdDLFVBQVUsQ0FBRyxDQUFDO0FBQ3pELGVBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztBQUN6QyxlQUFPLEdBQUcsT0FBTyxDQUFDLElBQUks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QUMzQiw4QkFBSSxhQUFhLENBQUMsZ0dBQzRDLDJDQUNKLENBQUMsQ0FBQztTQUM3RDs7Ozs7eUNBRVUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7O0FBQzVDLDRCQUFJLElBQUksc0RBQXNELENBQUM7Ozs7OztBQUtqRSxjQUFNLEdBQUcsRUFBRTs7WUFDVixvQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFDOzs7Ozs7O3lDQUVULG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFDLElBQUksRUFBSixJQUFJLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUM7OztBQUE1RixjQUFNOzs7OztBQUVOLFlBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7Ozs7NENBR3BDLE1BQU07Ozs7Ozs7Q0FDZCxDQUFDOztBQUdGLGVBQWMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLFFBQVEsR0FBUixRQUFRO3FCQUNGLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL3JlY29yZHNjcmVlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgX2ZzIGZyb20gJ2ZzJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwsIHdhaXRGb3JDb25kaXRpb24gfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyB1dGlsLCBmcywgbmV0IH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHRlbXAgZnJvbSAndGVtcCc7XG5cblxubGV0IGNvbW1hbmRzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29uc3QgUkVUUllfUEFVU0UgPSAxMDAwO1xuY29uc3QgTUFYX1JFQ09SRElOR19USU1FX1NFQyA9IDYwICogMztcbmNvbnN0IERFRkFVTFRfUkVDT1JESU5HX1RJTUVfU0VDID0gTUFYX1JFQ09SRElOR19USU1FX1NFQztcbmNvbnN0IFBST0NFU1NfU0hVVERPV05fVElNRU9VVF9TRUMgPSA1O1xuY29uc3QgU0NSRUVOUkVDT1JEX0JJTkFSWSA9ICdzY3JlZW5yZWNvcmQnO1xuY29uc3QgREVGQVVMVF9FWFQgPSAnLm1wNCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RDdXJyZW50UmVjb3JkaW5nUGF0aCAoYWRiLCBwaWRzKSB7XG4gIGxldCBsc29mT3V0cHV0ID0gJyc7XG4gIHRyeSB7XG4gICAgY29uc3Qge291dHB1dH0gPSBhd2FpdCBhZGIuc2hlbGwoWydsc29mJywgJy1wJywgcGlkcy5qb2luKCcsJyldKTtcbiAgICBsc29mT3V0cHV0ID0gb3V0cHV0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cud2FybihgQ2Fubm90IGV4dHJhY3QgdGhlIHBhdGggdG8gdGhlIGN1cnJlbnQgc2NyZWVuIGNhcHR1cmUuIGAgK1xuICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBsb2cuZGVidWcoYEdvdCB0aGUgZm9sbG93aW5nIG91dHB1dCBmcm9tIGxzb2Y6ICR7bHNvZk91dHB1dH1gKTtcbiAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoL1xcZCtcXHMrKFxcLy4qXFwubXA0KS8pO1xuICBjb25zdCBtYXRjaGVzID0gcGF0dGVybi5leGVjKGxzb2ZPdXRwdXQpO1xuICByZXR1cm4gXy5pc0VtcHR5KG1hdGNoZXMpID8gbnVsbCA6IF8ubGFzdChtYXRjaGVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmluaXNoU2NyZWVuQ2FwdHVyZSAoYWRiLCBwaWRzKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgYWRiLnNoZWxsKFsna2lsbCcsICctMicsIC4uLnBpZHNdKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgYXdhaXQgd2FpdEZvckNvbmRpdGlvbihhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBhZGIuc2hlbGwoWydraWxsJywgJy0wJywgLi4ucGlkc10pO1xuICAgICAgfSBjYXRjaCAoaWduKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sIHt3YWl0TXM6IFBST0NFU1NfU0hVVERPV05fVElNRU9VVF9TRUMgKiAxMDAwLCBpbnRlcnZhbE1zOiAzMDB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkUmVjb3JkZWRNZWRpYSAoYWRiLCBwYXRoT25EZXZpY2UsIHJlbW90ZVBhdGggPSBudWxsLCB1cGxvYWRPcHRpb25zID0ge30pIHtcbiAgY29uc3QgbG9jYWxGaWxlID0gdGVtcC5wYXRoKHtwcmVmaXg6ICdhcHBpdW0nLCBzdWZmaXg6IERFRkFVTFRfRVhUfSk7XG4gIHRyeSB7XG4gICAgYXdhaXQgYWRiLnB1bGwocGF0aE9uRGV2aWNlLCBsb2NhbEZpbGUpO1xuXG4gICAgY29uc3Qge3NpemV9ID0gYXdhaXQgZnMuc3RhdChsb2NhbEZpbGUpO1xuICAgIGxvZy5kZWJ1ZyhgVGhlIHNpemUgb2YgdGhlIHJlY2VudCBzY3JlZW4gcmVjb3JkaW5nIGlzICR7dXRpbC50b1JlYWRhYmxlU2l6ZVN0cmluZyhzaXplKX1gKTtcbiAgICBpZiAoXy5pc0VtcHR5KHJlbW90ZVBhdGgpKSB7XG4gICAgICBjb25zdCBtZW1vcnlVc2FnZSA9IHByb2Nlc3MubWVtb3J5VXNhZ2UoKTtcbiAgICAgIGNvbnN0IG1heE1lbW9yeUxpbWl0ID0gKG1lbW9yeVVzYWdlLmhlYXBUb3RhbCAtIG1lbW9yeVVzYWdlLmhlYXBVc2VkKSAvIDI7XG4gICAgICBpZiAoc2l6ZSA+PSBtYXhNZW1vcnlMaW1pdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZWFkIHRoZSByZWNvcmRlZCBtZWRpYSAnJHtwYXRoT25EZXZpY2V9JyB0byB0aGUgbWVtb3J5LCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBiZWNhdXNlIHRoZSBmaWxlIGlzIHRvbyBsYXJnZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHt1dGlsLnRvUmVhZGFibGVTaXplU3RyaW5nKHNpemUpfSA+PSAke3V0aWwudG9SZWFkYWJsZVNpemVTdHJpbmcobWF4TWVtb3J5TGltaXQpfSkuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFRyeSB0byBwcm92aWRlIGEgbGluayB0byBhIHJlbW90ZSB3cml0YWJsZSBsb2NhdGlvbiBpbnN0ZWFkLmApO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKGxvY2FsRmlsZSk7XG4gICAgICByZXR1cm4gY29udGVudC50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3RlVXJsID0gdXJsLnBhcnNlKHJlbW90ZVBhdGgpO1xuICAgIGxldCBvcHRpb25zID0ge307XG4gICAgY29uc3Qge3VzZXIsIHBhc3MsIG1ldGhvZH0gPSB1cGxvYWRPcHRpb25zO1xuICAgIGlmIChyZW1vdGVVcmwucHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICB1cmw6IHJlbW90ZVVybC5ocmVmLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCB8fCAnUFVUJyxcbiAgICAgICAgbXVsdGlwYXJ0OiBbeyBib2R5OiBfZnMuY3JlYXRlUmVhZFN0cmVhbShsb2NhbEZpbGUpIH1dLFxuICAgICAgfTtcbiAgICAgIGlmICh1c2VyICYmIHBhc3MpIHtcbiAgICAgICAgb3B0aW9ucy5hdXRoID0ge3VzZXIsIHBhc3N9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVtb3RlVXJsLnByb3RvY29sID09PSAnZnRwJykge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgaG9zdDogcmVtb3RlVXJsLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiByZW1vdGVVcmwucG9ydCB8fCAyMSxcbiAgICAgIH07XG4gICAgICBpZiAodXNlciAmJiBwYXNzKSB7XG4gICAgICAgIG9wdGlvbnMudXNlciA9IHVzZXI7XG4gICAgICAgIG9wdGlvbnMucGFzcyA9IHBhc3M7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IG5ldC51cGxvYWRGaWxlKGxvY2FsRmlsZSwgcmVtb3RlUGF0aCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICcnO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IGZzLnJpbXJhZihsb2NhbEZpbGUpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhZGIucmltcmFmKHBhdGhPbkRldmljZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLndhcm4oYENhbm5vdCBkZWxldGUgdGhlIHJlY29yZGVkIHNjcmVlbiBtZWRpYSAnJHtwYXRoT25EZXZpY2V9JyBmcm9tIHRoZSBkZXZpY2UuIENvbnRpbnVpbmcgYW55d2F5YCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhcnRSZWNvcmRpbmdPcHRpb25zXG4gKlxuICogQHByb3BlcnR5IHs/c3RyaW5nfSByZW1vdGVQYXRoIC0gVGhlIHBhdGggdG8gdGhlIHJlbW90ZSBsb2NhdGlvbiwgd2hlcmUgdGhlIGNhcHR1cmVkIHZpZGVvIHNob3VsZCBiZSB1cGxvYWRlZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmb2xsb3dpbmcgcHJvdG9jb2xzIGFyZSBzdXBwb3J0ZWQ6IGh0dHAvaHR0cHMsIGZ0cC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bGwgb3IgZW1wdHkgc3RyaW5nIHZhbHVlICh0aGUgZGVmYXVsdCBzZXR0aW5nKSBtZWFucyB0aGUgY29udGVudCBvZiByZXN1bHRpbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUgc2hvdWxkIGJlIGVuY29kZWQgYXMgQmFzZTY0IGFuZCBwYXNzZWQgYXMgdGhlIGVuZHBvdW50IHJlc3BvbnNlIHZhbHVlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duIGlmIHRoZSBnZW5lcmF0ZWQgbWVkaWEgZmlsZSBpcyB0b28gYmlnIHRvXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXQgaW50byB0aGUgYXZhaWxhYmxlIHByb2Nlc3MgbWVtb3J5LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBvcHRpb24gb25seSBoYXMgYW4gZWZmZWN0IGlmIHRoZXJlIGlzIHNjcmVlbiByZWNvcmRpbmcgcHJvY2VzcyBpbiBwcm9ncmVlc3NcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBgZm9yY2VSZXN0YXJ0YCBwYXJhbWV0ZXIgaXMgbm90IHNldCB0byBgdHJ1ZWAuXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IHVzZXIgLSBUaGUgbmFtZSBvZiB0aGUgdXNlciBmb3IgdGhlIHJlbW90ZSBhdXRoZW50aWNhdGlvbi4gT25seSB3b3JrcyBpZiBgcmVtb3RlUGF0aGAgaXMgcHJvdmlkZWQuXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IHBhc3MgLSBUaGUgcGFzc3dvcmQgZm9yIHRoZSByZW1vdGUgYXV0aGVudGljYXRpb24uIE9ubHkgd29ya3MgaWYgYHJlbW90ZVBhdGhgIGlzIHByb3ZpZGVkLlxuICogQHByb3BlcnR5IHs/c3RyaW5nfSBtZXRob2QgLSBUaGUgaHR0cCBtdWx0aXBhcnQgdXBsb2FkIG1ldGhvZCBuYW1lLiBUaGUgJ1BVVCcgb25lIGlzIHVzZWQgYnkgZGVmYXVsdC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT25seSB3b3JrcyBpZiBgcmVtb3RlUGF0aGAgaXMgcHJvdmlkZWQuXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IHZpZGVvU2l6ZSAtIFRoZSBmb3JtYXQgaXMgd2lkdGh4aGVpZ2h0LlxuICogICAgICAgICAgICAgICAgICBUaGUgZGVmYXVsdCB2YWx1ZSBpcyB0aGUgZGV2aWNlJ3MgbmF0aXZlIGRpc3BsYXkgcmVzb2x1dGlvbiAoaWYgc3VwcG9ydGVkKSxcbiAqICAgICAgICAgICAgICAgICAgMTI4MHg3MjAgaWYgbm90LiBGb3IgYmVzdCByZXN1bHRzLFxuICogICAgICAgICAgICAgICAgICB1c2UgYSBzaXplIHN1cHBvcnRlZCBieSB5b3VyIGRldmljZSdzIEFkdmFuY2VkIFZpZGVvIENvZGluZyAoQVZDKSBlbmNvZGVyLlxuICogICAgICAgICAgICAgICAgICBGb3IgZXhhbXBsZSwgXCIxMjgweDcyMFwiXG4gKiBAcHJvcGVydHkgez9zdHJpbmd8bnVtYmVyfSB0aW1lTGltaXQgLSBUaGUgbWF4aW11bSByZWNvcmRpbmcgdGltZSwgaW4gc2Vjb25kcy4gVGhlIGRlZmF1bHQgYW5kIG1heGltdW0gdmFsdWUgaXMgMTgwICgzIG1pbnV0ZXMpLlxuICogQHByb3BlcnR5IHs/c3RyaW5nfG51bWJlcn0gYml0UmF0ZSAtIFRoZSB2aWRlbyBiaXQgcmF0ZSBmb3IgdGhlIHZpZGVvLCBpbiBtZWdhYml0cyBwZXIgc2Vjb25kLlxuICogICAgICAgICAgICAgICAgVGhlIGRlZmF1bHQgdmFsdWUgaXMgNC4gWW91IGNhbiBpbmNyZWFzZSB0aGUgYml0IHJhdGUgdG8gaW1wcm92ZSB2aWRlbyBxdWFsaXR5LFxuICogICAgICAgICAgICAgICAgYnV0IGRvaW5nIHNvIHJlc3VsdHMgaW4gbGFyZ2VyIG1vdmllIGZpbGVzLlxuICogQHByb3BlcnR5IHs/Ym9vbGVhbn0gZm9yY2VSZXN0YXJ0IC0gV2hldGhlciB0byB0cnkgdG8gY2F0Y2ggYW5kIHVwbG9hZC9yZXR1cm4gdGhlIGN1cnJlbnRseSBydW5uaW5nIHNjcmVlbiByZWNvcmRpbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChgZmFsc2VgLCB0aGUgZGVmYXVsdCBzZXR0aW5nKSBvciBpZ25vcmUgdGhlIHJlc3VsdCBvZiBpdCBhbmQgc3RhcnQgYSBuZXcgcmVjb3JkaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSAoYHRydWVgKS5cbiAqL1xuXG4vKipcbiAqIFJlY29yZCB0aGUgZGlzcGxheSBvZiBkZXZpY2VzIHJ1bm5pbmcgQW5kcm9pZCA0LjQgKEFQSSBsZXZlbCAxOSkgYW5kIGhpZ2hlci5cbiAqIEl0IHJlY29yZHMgc2NyZWVuIGFjdGl2aXR5IHRvIGFuIE1QRUctNCBmaWxlLiBBdWRpbyBpcyBub3QgcmVjb3JkZWQgd2l0aCB0aGUgdmlkZW8gZmlsZS5cbiAqIElmIHNjcmVlbiByZWNvcmRpbmcgaGFzIGJlZW4gYWxyZWFkeSBzdGFydGVkIHRoZW4gdGhlIGNvbW1hbmQgd2lsbCBzdG9wIGl0IGZvcmNlZnVsbHkgYW5kIHN0YXJ0IGEgbmV3IG9uZS5cbiAqIFRoZSBwcmV2aW91c2x5IHJlY29yZGVkIHZpZGVvIGZpbGUgd2lsbCBiZSBkZWxldGVkLlxuICpcbiAqIEBwYXJhbSB7P1N0YXJ0UmVjb3JkaW5nT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBhdmFpbGFibGUgb3B0aW9ucy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NC1lbmNvZGVkIGNvbnRlbnQgb2YgdGhlIHJlY29yZGVkIG1lZGlhIGZpbGUgaWZcbiAqICAgICAgICAgICAgICAgICAgIGFueSBzY3JlZW4gcmVjb3JkaW5nIGlzIGN1cnJlbnRseSBydW5uaW5nIG9yIGFuIGVtcHR5IHN0cmluZy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBzY3JlZW4gcmVjb3JkaW5nIGhhcyBmYWlsZWQgdG8gc3RhcnQuXG4gKi9cbmNvbW1hbmRzLnN0YXJ0UmVjb3JkaW5nU2NyZWVuID0gYXN5bmMgZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7dmlkZW9TaXplLCB0aW1lTGltaXQ9REVGQVVMVF9SRUNPUkRJTkdfVElNRV9TRUMsIGJpdFJhdGUsIGZvcmNlUmVzdGFydH0gPSBvcHRpb25zO1xuICBpZiAodGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjcmVlbiByZWNvcmRpbmcgZG9lcyBub3Qgd29yayBvbiBlbXVsYXRvcnMnKTtcbiAgfVxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gaXMgc3VwcHBvcnRlZCBvbiB0aGUgZGV2aWNlIHJ1bm5pbmcgYW5kcm9pZCA0LjQoYXBpIGxldmVsIDE5KVxuICBjb25zdCBhcGlMZXZlbCA9IGF3YWl0IHRoaXMuYWRiLmdldEFwaUxldmVsKCk7XG4gIGlmIChhcGlMZXZlbCA8IDE5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBTY3JlZW4gcmVjb3JkaW5nIG5vdCBhdmFpbGFibGUgb24gQVBJIExldmVsICR7YXBpTGV2ZWx9LiBNaW5pbXVtIEFQSSBMZXZlbCBpcyAxOS5gKTtcbiAgfVxuXG4gIGxldCByZXN1bHQgPSAnJztcbiAgaWYgKCFmb3JjZVJlc3RhcnQpIHtcbiAgICByZXN1bHQgPSBhd2FpdCB0aGlzLnN0b3BSZWNvcmRpbmdTY3JlZW4ob3B0aW9ucyk7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBwaWRzID0gKGF3YWl0IHRoaXMuYWRiLmdldFBJRHNCeU5hbWUoU0NSRUVOUkVDT1JEX0JJTkFSWSkpLm1hcCgocCkgPT4gYCR7cH1gKTtcbiAgICBpZiAoIV8uaXNFbXB0eShwaWRzKSkge1xuICAgICAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydraWxsJywgLi4ucGlkc10pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byBzdG9wIHNjcmVlbiByZWNvcmRpbmc6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbiAgaWYgKCFfLmlzRW1wdHkodGhpcy5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCkpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5hZGIucmltcmFmKHRoaXMuX3JlY2VudFNjcmVlblJlY29yZGluZ1BhdGgpO1xuICAgIH0gY2F0Y2ggKGlnbikge31cbiAgICB0aGlzLl9yZWNlbnRTY3JlZW5SZWNvcmRpbmdQYXRoID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhdGhPbkRldmljZSA9IGAvc2RjYXJkLyR7TWF0aC5mbG9vcihuZXcgRGF0ZSgpKX0ke0RFRkFVTFRfRVhUfWA7XG5cbiAgLy9tYWtlIGFkYiBjb21tYW5kXG4gIGNvbnN0IGNtZCA9IFtTQ1JFRU5SRUNPUkRfQklOQVJZXTtcbiAgaWYgKHV0aWwuaGFzVmFsdWUodmlkZW9TaXplKSkge1xuICAgIGNtZC5wdXNoKCctLXNpemUnLCB2aWRlb1NpemUpO1xuICB9XG4gIGlmICh1dGlsLmhhc1ZhbHVlKHRpbWVMaW1pdCkpIHtcbiAgICBjbWQucHVzaCgnLS10aW1lLWxpbWl0JywgYCR7dGltZUxpbWl0fWApO1xuICB9XG4gIGlmICh1dGlsLmhhc1ZhbHVlKGJpdFJhdGUpKSB7XG4gICAgY21kLnB1c2goJy0tYml0LXJhdGUnLCBgJHtiaXRSYXRlfWApO1xuICB9XG4gIGNtZC5wdXNoKHBhdGhPbkRldmljZSk7XG5cbiAgLy8gd3JhcCBpbiBhIG1hbnVhbCBQcm9taXNlIHNvIHdlIGNhbiBoYW5kbGUgZXJyb3JzIGluIGFkYiBzaGVsbCBvcGVyYXRpb25cbiAgcmV0dXJuIGF3YWl0IG5ldyBCKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgZXJyID0gbnVsbDtcbiAgICBsZXQgdGltZW91dCA9IE1hdGguZmxvb3IocGFyc2VGbG9hdCh0aW1lTGltaXQpICogMTAwMCk7XG4gICAgaWYgKHRpbWVvdXQgPiBNQVhfUkVDT1JESU5HX1RJTUVfU0VDICogMTAwMCB8fCB0aW1lb3V0IDw9IDApIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKGBUaGUgdGltZUxpbWl0IHZhbHVlIG11c3QgYmUgaW4gcmFuZ2UgKDAsICR7TUFYX1JFQ09SRElOR19USU1FX1NFQ31dIHNlY29uZHMuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFRoZSB2YWx1ZSBvZiAke3RpbWVMaW1pdH0gaGFzIGJlZW4gcGFzc2VkIGluc3RlYWQuYCkpO1xuICAgIH1cbiAgICBsb2cuZGVidWcoYEJlZ2lubmluZyBzY3JlZW4gcmVjb3JkaW5nIHdpdGggY29tbWFuZDogJ2FkYiBzaGVsbCAke2NtZC5qb2luKCcgJyl9J2AgK1xuICAgICAgICAgICAgICBgV2lsbCB0aW1lb3V0IGluICR7dGltZW91dCAvIDEwMDB9IHNgKTtcbiAgICAvLyBzY3JlZW5yZWNvcmQgaGFzIGl0cyBvd2VuIHRpbWVyLCBzbyB3ZSBvbmx5IHVzZSB0aGlzIG9uZSBhcyBhIHNhZmV0eSBwcmVjYXV0aW9uXG4gICAgdGltZW91dCArPSBQUk9DRVNTX1NIVVRET1dOX1RJTUVPVVRfU0VDICogMTAwMCAqIDI7XG4gICAgLy8gZG8gbm90IGF3YWl0IGhlcmUsIGFzIHRoZSBjYWxsIHJ1bnMgaW4gdGhlIGJhY2tncm91bmQgYW5kIHdlIGNoZWNrIGZvciBpdHMgcHJvZHVjdFxuICAgIHRoaXMuYWRiLnNoZWxsKGNtZCwge3RpbWVvdXQsIGtpbGxTaWduYWw6ICdTSUdJTlQnfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgIGVyciA9IGU7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVyZSBpcyB0aGUgZGVsYXkgdGltZSB0byBzdGFydCByZWNvcmRpbmcgdGhlIHNjcmVlbiwgc28sIHdhaXQgdW50aWwgaXQgaXMgcmVhZHkuXG4gICAgLy8gdGhlIHJlYWR5IGNvbmRpdGlvbiBpc1xuICAgIC8vICAgMS4gY2hlY2sgdGhlIG1vdmllIGZpbGUgaXMgY3JlYXRlZFxuICAgIC8vICAgMi4gY2hlY2sgaXQgaXMgc3RhcnRlZCB0byBjYXB0dXJlIHRoZSBzY3JlZW5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgUkVUUllfUEFVU0UsIGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCB0aGlzLmFkYi5maWxlU2l6ZShwYXRoT25EZXZpY2UpO1xuICAgICAgICBpZiAoc2l6ZSA8PSAzMikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVtb3RlIGZpbGUgJyR7cGF0aE9uRGV2aWNlfScgZm91bmQgYnV0IGl0IGlzIHN0aWxsIHRvbyBzbWFsbDogJHtzaXplfSBieXRlc2ApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cblxuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZy5lcnJvcihgRXJyb3IgcmVjb3JkaW5nIHNjcmVlbjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICB9XG4gICAgdGhpcy5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCA9IHBhdGhPbkRldmljZTtcbiAgICByZXNvbHZlKHJlc3VsdCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdG9wUmVjb3JkaW5nT3B0aW9uc1xuICpcbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gcmVtb3RlUGF0aCAtIFRoZSBwYXRoIHRvIHRoZSByZW1vdGUgbG9jYXRpb24sIHdoZXJlIHRoZSByZXN1bHRpbmcgdmlkZW8gc2hvdWxkIGJlIHVwbG9hZGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZvbGxvd2luZyBwcm90b2NvbHMgYXJlIHN1cHBvcnRlZDogaHR0cC9odHRwcywgZnRwLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVsbCBvciBlbXB0eSBzdHJpbmcgdmFsdWUgKHRoZSBkZWZhdWx0IHNldHRpbmcpIG1lYW5zIHRoZSBjb250ZW50IG9mIHJlc3VsdGluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZSBzaG91bGQgYmUgZW5jb2RlZCBhcyBCYXNlNjQgYW5kIHBhc3NlZCBhcyB0aGUgZW5kcG91bnQgcmVzcG9uc2UgdmFsdWUuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24gaWYgdGhlIGdlbmVyYXRlZCBtZWRpYSBmaWxlIGlzIHRvbyBiaWcgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpdCBpbnRvIHRoZSBhdmFpbGFibGUgcHJvY2VzcyBtZW1vcnkuXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IHVzZXIgLSBUaGUgbmFtZSBvZiB0aGUgdXNlciBmb3IgdGhlIHJlbW90ZSBhdXRoZW50aWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gcGFzcyAtIFRoZSBwYXNzd29yZCBmb3IgdGhlIHJlbW90ZSBhdXRoZW50aWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gbWV0aG9kIC0gVGhlIGh0dHAgbXVsdGlwYXJ0IHVwbG9hZCBtZXRob2QgbmFtZS4gVGhlICdQVVQnIG9uZSBpcyB1c2VkIGJ5IGRlZmF1bHQuXG4gKi9cblxuLyoqXG4gKiBTdG9wIHJlY29yZGluZyB0aGUgc2NyZWVuLiBJZiBubyBzY3JlZW4gcmVjb3JkaW5nIHByb2Nlc3MgaXMgcnVubmluZyB0aGVuXG4gKiB0aGUgZW5kcG9pbnQgd2lsbCB0cnkgdG8gZ2V0IHRoZSByZWNlbnRseSByZWNvcmRlZCBmaWxlLlxuICogSWYgbm8gcHJldmlvdXNseSByZWNvcmRlZCBmaWxlIGlzIGZvdW5kIGFuZCBubyBhY3RpdmUgc2NyZWVuIHJlY29yZGluZ1xuICogcHJvY2Vzc2VzIGFyZSBydW5uaW5nIHRoZW4gdGhlIG1ldGhvZCByZXR1cm5zIGFuIGVtcHR5IHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gez9TdG9wUmVjb3JkaW5nT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBhdmFpbGFibGUgb3B0aW9ucy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NC1lbmNvZGVkIGNvbnRlbnQgb2YgdGhlIHJlY29yZGVkIG1lZGlhIGZpbGUgaWYgJ3JlbW90ZVBhdGgnXG4gKiAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgZW1wdHkgb3IgbnVsbCBvciBhbiBlbXB0eSBzdHJpbmcuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGdldHRpbmcgdGhlIG5hbWUgb2YgYSBtZWRpYSBmaWxlXG4gKiAgICAgICAgICAgICAgICAgb3IgdGhlIGZpbGUgY29udGVudCBjYW5ub3QgYmUgdXBsb2FkZWQgdG8gdGhlIHJlbW90ZSBsb2NhdGlvbi5cbiAqL1xuY29tbWFuZHMuc3RvcFJlY29yZGluZ1NjcmVlbiA9IGFzeW5jIGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcbiAgY29uc3Qge3JlbW90ZVBhdGgsIHVzZXIsIHBhc3MsIG1ldGhvZH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHBpZHMgPSAoYXdhaXQgdGhpcy5hZGIuZ2V0UElEc0J5TmFtZShTQ1JFRU5SRUNPUkRfQklOQVJZKSkubWFwKChwKSA9PiBgJHtwfWApO1xuICBsZXQgcGF0aE9uRGV2aWNlID0gdGhpcy5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aDtcbiAgaWYgKF8uaXNFbXB0eShwaWRzKSkge1xuICAgIGxvZy5pbmZvKGBTY3JlZW4gcmVjb3JkaW5nIGlzIG5vdCBydW5uaW5nLiBUaGVyZSBpcyBub3RoaW5nIHRvIHN0b3AuYCk7XG4gIH0gZWxzZSB7XG4gICAgcGF0aE9uRGV2aWNlID0gcGF0aE9uRGV2aWNlIHx8IGF3YWl0IGV4dHJhY3RDdXJyZW50UmVjb3JkaW5nUGF0aCh0aGlzLmFkYiwgcGlkcyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfLmlzRW1wdHkocGF0aE9uRGV2aWNlKSkge1xuICAgICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ2Fubm90IHBhcnNlIHRoZSBwYXRoIHRvIHRoZSBmaWxlIGNyZWF0ZWQgYnkgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGBzY3JlZW4gcmVjb3JkZXIgcHJvY2VzcyBmcm9tICdwcycgb3V0cHV0LiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYERpZCB5b3Ugc3RhcnQgc2NyZWVuIHJlY29yZGluZyBiZWZvcmU/YCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICghYXdhaXQgZmluaXNoU2NyZWVuQ2FwdHVyZSh0aGlzLmFkYiwgcGlkcykpIHtcbiAgICAgICAgbG9nLndhcm4oYFVuYWJsZSB0byBzdG9wIHNjcmVlbiByZWNvcmRpbmcuIENvbnRpbnVpbmcgYW55d2F5YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBpZiAoIV8uaXNFbXB0eShwYXRoT25EZXZpY2UpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHVwbG9hZFJlY29yZGVkTWVkaWEodGhpcy5hZGIsIHBhdGhPbkRldmljZSwgcmVtb3RlUGF0aCwge3VzZXIsIHBhc3MsIG1ldGhvZH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9yZWNlbnRTY3JlZW5SZWNvcmRpbmdQYXRoID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcyk7XG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _teen_process = require('teen_process');

var swipeStepsPerSec = 28;
var dragStepsPerSec = 40;
var CONTAINER_PATH_MARKER = '@';
// https://regex101.com/r/PLdB0G/2
var CONTAINER_PATH_PATTERN = new RegExp('^' + CONTAINER_PATH_MARKER + '([^/]+)/(.+)');

var commands = {},
    helpers = {},
    extensions = {};

commands.keyevent = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // TODO deprecate keyevent; currently wd only implements keyevent
        _logger2['default'].warn("keyevent will be deprecated use pressKeyCode");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.pressKeyCode(keycode, metastate));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("pressKeyCode", { keycode: keycode, metastate: metastate }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.longPressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("longPressKeyCode", { keycode: keycode, metastate: metastate }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getOrientation = function callee$0$0() {
  var params, orientation;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = {
          naturalOrientation: !!this.opts.androidNaturalOrientation
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("orientation", params));

      case 3:
        orientation = context$1$0.sent;
        return context$1$0.abrupt('return', orientation.toUpperCase());

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setOrientation = function callee$0$0(orientation) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        orientation = orientation.toUpperCase();
        params = {
          orientation: orientation,
          naturalOrientation: !!this.opts.androidNaturalOrientation
        };
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("orientation", params));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fakeFlick = function callee$0$0(xSpeed, ySpeed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('flick', { xSpeed: xSpeed, ySpeed: ySpeed }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fakeFlickElement = function callee$0$0(elementId, xoffset, yoffset, speed) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { xoffset: xoffset, yoffset: yoffset, speed: speed, elementId: elementId };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('element:flick', params));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.swipe = function callee$0$0(startX, startY, endX, endY, duration, touchCount, elId) {
  var swipeOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (startX === 'null') {
          startX = 0.5;
        }
        if (startY === 'null') {
          startY = 0.5;
        }
        swipeOpts = { startX: startX, startY: startY, endX: endX, endY: endY,
          steps: Math.round(duration * swipeStepsPerSec) };

        // going the long way and checking for undefined and null since
        // we can't be assured `elId` is a string and not an int
        if (_appiumSupport.util.hasValue(elId)) {
          swipeOpts.elementId = elId;
        }
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.doSwipe(swipeOpts));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doSwipe = function callee$0$0(swipeOpts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_appiumSupport.util.hasValue(swipeOpts.elementId)) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:swipe", swipeOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("swipe", swipeOpts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pinchClose = function callee$0$0(startX, startY, endX, endY, duration, percent, steps, elId) {
  var pinchOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pinchOpts = {
          direction: 'in',
          elementId: elId,
          percent: percent,
          steps: steps
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:pinch", pinchOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pinchOpen = function callee$0$0(startX, startY, endX, endY, duration, percent, steps, elId) {
  var pinchOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pinchOpts = { direction: 'out', elementId: elId, percent: percent, steps: steps };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:pinch", pinchOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.flick = function callee$0$0(element, xSpeed, ySpeed, xOffset, yOffset, speed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!element) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.fakeFlickElement(element, xOffset, yOffset, speed));

      case 3:
        context$1$0.next = 7;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.fakeFlick(xSpeed, ySpeed));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.drag = function callee$0$0(startX, startY, endX, endY, duration, touchCount, elementId, destElId) {
  var dragOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        dragOpts = {
          elementId: elementId, destElId: destElId, startX: startX, startY: startY, endX: endX, endY: endY,
          steps: Math.round(duration * dragStepsPerSec)
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.doDrag(dragOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doDrag = function callee$0$0(dragOpts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_appiumSupport.util.hasValue(dragOpts.elementId)) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:drag", dragOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("drag", dragOpts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.lock = function callee$0$0(seconds) {
  var floatSeconds;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.lock());

      case 2:
        if (!isNaN(seconds)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        floatSeconds = parseFloat(seconds);

        if (!(floatSeconds <= 0)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return');

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000 * floatSeconds));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.unlock());

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.isLocked = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isScreenLocked());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.unlock = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this, this.adb, this.caps));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openNotifications = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("openNotification"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setLocation = function callee$0$0(latitude, longitude) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.sendTelnetCommand('geo fix ' + longitude + ' ' + latitude));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

function parseContainerPath(remotePath) {
  var match = CONTAINER_PATH_PATTERN.exec(remotePath);
  if (!match) {
    _logger2['default'].errorAndThrow('It is expected that package identifier is separated from the relative path with a single slash. ' + ('\'' + remotePath + '\' is given instead'));
  }
  return [match[1], _path2['default'].posix.resolve('/data/data/' + match[1], match[2])];
}

commands.pullFile = function callee$0$0(remotePath) {
  var tmpDestination, _parseContainerPath, _parseContainerPath2, packageId, pathInContainer, localFile, data;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (remotePath.endsWith('/')) {
          _logger2['default'].errorAndThrow('It is expected that remote path points to a file and not to a folder. ' + ('\'' + remotePath + '\' is given instead'));
        }
        tmpDestination = null;

        if (!remotePath.startsWith(CONTAINER_PATH_MARKER)) {
          context$1$0.next = 19;
          break;
        }

        _parseContainerPath = parseContainerPath(remotePath);
        _parseContainerPath2 = _slicedToArray(_parseContainerPath, 2);
        packageId = _parseContainerPath2[0];
        pathInContainer = _parseContainerPath2[1];

        _logger2['default'].info('Parsed package identifier \'' + packageId + '\' from \'' + remotePath + '\'. Will get the data from \'' + pathInContainer + '\'');
        tmpDestination = '/data/local/tmp/' + _path2['default'].posix.basename(pathInContainer);
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'chmod 777 \'' + pathInContainer.replace(/'/g, '\\\'') + '\'']));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.adb.shell(['cp', '-f', pathInContainer, tmpDestination]));

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](9);

        _logger2['default'].errorAndThrow('Cannot access the container of \'' + packageId + '\' application. ' + 'Is the application installed and has \'debuggable\' build option set to true? ' + ('Original error: ' + context$1$0.t0.message));

      case 19:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
        context$1$0.prev = 20;
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.adb.pull(_lodash2['default'].isString(tmpDestination) ? tmpDestination : remotePath, localFile));

      case 23:
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localFile));

      case 25:
        data = context$1$0.sent;
        return context$1$0.abrupt('return', new Buffer(data).toString('base64'));

      case 27:
        context$1$0.prev = 27;
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 30:
        if (!context$1$0.sent) {
          context$1$0.next = 33;
          break;
        }

        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 33:
        if (!_lodash2['default'].isString(tmpDestination)) {
          context$1$0.next = 36;
          break;
        }

        context$1$0.next = 36;
        return _regeneratorRuntime.awrap(this.adb.shell(['rm', '-f', tmpDestination]));

      case 36:
        return context$1$0.finish(27);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 16], [20,, 27, 37]]);
};

commands.pushFile = function callee$0$0(remotePath, base64Data) {
  var localFile, content, tmpDestination, _parseContainerPath3, _parseContainerPath32, packageId, pathInContainer;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (remotePath.endsWith('/')) {
          _logger2['default'].errorAndThrow('It is expected that remote path points to a file and not to a folder. ' + ('\'' + remotePath + '\' is given instead'));
        }
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });

        if (_lodash2['default'].isArray(base64Data)) {
          // some clients (ahem) java, send a byte array encoding utf8 characters
          // instead of a string, which would be infinitely better!
          base64Data = Buffer.from(base64Data).toString('utf8');
        }
        content = Buffer.from(base64Data, 'base64');
        tmpDestination = null;
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(localFile, content.toString('binary'), 'binary'));

      case 8:
        if (!remotePath.startsWith(CONTAINER_PATH_MARKER)) {
          context$1$0.next = 33;
          break;
        }

        _parseContainerPath3 = parseContainerPath(remotePath);
        _parseContainerPath32 = _slicedToArray(_parseContainerPath3, 2);
        packageId = _parseContainerPath32[0];
        pathInContainer = _parseContainerPath32[1];

        _logger2['default'].info('Parsed package identifier \'' + packageId + '\' from \'' + remotePath + '\'. Will put the data into \'' + pathInContainer + '\'');
        tmpDestination = '/data/local/tmp/' + _path2['default'].posix.basename(pathInContainer);
        context$1$0.prev = 15;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'mkdir -p \'' + _path2['default'].posix.dirname(pathInContainer).replace(/'/g, '\\\'') + '\'']));

      case 18:
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'touch \'' + pathInContainer.replace(/'/g, '\\\'') + '\'']));

      case 20:
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'chmod 777 \'' + pathInContainer.replace(/'/g, '\\\'') + '\'']));

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.adb.push(localFile, tmpDestination));

      case 24:
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(this.adb.shell(['cp', '-f', tmpDestination, pathInContainer]));

      case 26:
        context$1$0.next = 31;
        break;

      case 28:
        context$1$0.prev = 28;
        context$1$0.t0 = context$1$0['catch'](15);

        _logger2['default'].errorAndThrow('Cannot access the container of \'' + packageId + '\' application. ' + 'Is the application installed and has \'debuggable\' build option set to true? ' + ('Original error: ' + context$1$0.t0.message));

      case 31:
        context$1$0.next = 35;
        break;

      case 33:
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(this.adb.push(localFile, remotePath));

      case 35:
        context$1$0.prev = 35;
        context$1$0.next = 38;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 38:
        if (!context$1$0.sent) {
          context$1$0.next = 41;
          break;
        }

        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 41:
        if (!_lodash2['default'].isString(tmpDestination)) {
          context$1$0.next = 44;
          break;
        }

        context$1$0.next = 44;
        return _regeneratorRuntime.awrap(this.adb.shell(['rm', '-f', tmpDestination]));

      case 44:
        return context$1$0.finish(35);

      case 45:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5,, 35, 45], [15, 28]]);
};

commands.pullFolder = function callee$0$0(remotePath) {
  var localFolder;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFolder = _temp2['default'].path({ prefix: 'appium' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.pull(remotePath, localFolder));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.zip.toInMemoryZip(localFolder));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent.toString('base64'));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fingerprint = function callee$0$0(fingerprintId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("fingerprint method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.fingerprint(fingerprintId));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.sendSMS = function callee$0$0(phoneNumber, message) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("sendSMS method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.sendSMS(phoneNumber, message));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.gsmCall = function callee$0$0(phoneNumber, action) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("gsmCall method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.gsmCall(phoneNumber, action));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.gsmSignal = function callee$0$0(signalStrengh) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("gsmSignal method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.gsmSignal(signalStrengh));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.gsmVoice = function callee$0$0(state) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("gsmVoice method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.gsmVoice(state));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.powerAC = function callee$0$0(state) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("powerAC method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.powerAC(state));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.powerCapacity = function callee$0$0(batteryPercent) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("powerCapacity method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.powerCapacity(batteryPercent));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.networkSpeed = function callee$0$0(networkSpeed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("networkSpeed method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.networkSpeed(networkSpeed));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getScreenshotDataWithAdbShell = function callee$0$0(adb, opts) {
  var localFile, pngDir, png, cmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.png' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 3:
        if (!context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 6:
        context$1$0.prev = 6;
        pngDir = opts.androidScreenshotPath || '/data/local/tmp/';
        png = _path2['default'].posix.resolve(pngDir, 'screenshot.png');
        cmd = ['/system/bin/rm', png + ';', '/system/bin/screencap', '-p', png];
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.shell(cmd));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(adb.fileSize(png));

      case 14:
        if (context$1$0.sent) {
          context$1$0.next = 16;
          break;
        }

        throw new Error('The size of the taken screenshot equals to zero.');

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(adb.pull(png, localFile));

      case 18:
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(_jimp2['default'].read(localFile));

      case 20:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 21:
        context$1$0.prev = 21;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 24:
        if (!context$1$0.sent) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 27:
        return context$1$0.finish(21);

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6,, 21, 28]]);
};

helpers.getScreenshotDataWithAdbExecOut = function callee$0$0(adb) {
  var _ref, stdout, stderr, code;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(adb.executable.path, adb.executable.defaultArgs.concat(['exec-out', '/system/bin/screencap', '-p']), { encoding: 'binary', isBuffer: true }));

      case 2:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        stderr = _ref.stderr;
        code = _ref.code;

        if (!(code || stderr.length)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('Screenshot returned error, code: \'' + code + '\', stderr: \'' + stderr.toString() + '\'');

      case 8:
        if (stdout.length) {
          context$1$0.next = 10;
          break;
        }

        throw new Error('Screenshot returned no data');

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_jimp2['default'].read(stdout));

      case 12:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getScreenshot = function callee$0$0() {
  var apiLevel, image, err, screenOrientation, getBuffer, imgBuffer;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 2:
        apiLevel = context$1$0.sent;
        image = null;

        if (!(apiLevel > 20)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getScreenshotDataWithAdbExecOut(this.adb));

      case 8:
        image = context$1$0.sent;
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](5);

        _logger2['default'].info('Cannot get screenshot data with \'adb exec-out\' because of \'' + context$1$0.t0.message + '\'. ' + 'Defaulting to \'adb shell\' call');

      case 14:
        if (image) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.prev = 15;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getScreenshotDataWithAdbShell(this.adb, this.opts));

      case 18:
        image = context$1$0.sent;
        context$1$0.next = 25;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t1 = context$1$0['catch'](15);
        err = 'Cannot get screenshot data because of \'' + context$1$0.t1.message + '\'. ' + 'Make sure the \'LayoutParams.FLAG_SECURE\' is not set for ' + 'the current view';

        _logger2['default'].errorAndThrow(err);

      case 25:
        if (!(apiLevel < 23)) {
          context$1$0.next = 38;
          break;
        }

        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(this.adb.getScreenOrientation());

      case 28:
        screenOrientation = context$1$0.sent;
        context$1$0.prev = 29;
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(image.rotate(-90 * screenOrientation));

      case 32:
        image = context$1$0.sent;
        context$1$0.next = 38;
        break;

      case 35:
        context$1$0.prev = 35;
        context$1$0.t2 = context$1$0['catch'](29);

        _logger2['default'].warn('Could not rotate screenshot due to error: ' + context$1$0.t2);

      case 38:
        getBuffer = _bluebird2['default'].promisify(image.getBuffer, { context: image });
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(getBuffer(_jimp2['default'].MIME_PNG));

      case 41:
        imgBuffer = context$1$0.sent;
        return context$1$0.abrupt('return', imgBuffer.toString('base64'));

      case 43:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 11], [15, 21], [29, 35]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// adb push creates folders and overwrites existing files.

// if there is an error, throw

// if we don't get anything at all, throw

// This screenshoting approach is way faster, since it requires less external commands
// to be executed. Unfortunately, exec-out option is only supported by newer Android/SDK versions (5.0 and later)

// Android bug 8433742 - rotate screenshot if screen is rotated
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixvQkFBb0I7Ozs7c0JBQ2pDLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs2QkFDTyxnQkFBZ0I7O29CQUM3QixNQUFNOzs7O3NCQUNQLFdBQVc7Ozs7d0JBQ2IsVUFBVTs7OztvQkFDUCxNQUFNOzs7OzRCQUNGLGNBQWM7O0FBRW5DLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQzs7QUFFbEMsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sT0FBSyxxQkFBcUIsa0JBQWUsQ0FBQzs7QUFFbkYsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLFNBQVMseURBQUcsSUFBSTs7Ozs7QUFFM0QsNEJBQUksSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7O3lDQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Q0FDbkQsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixPQUFPO01BQUUsU0FBUyx5REFBRyxJQUFJOzs7Ozt5Q0FDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDN0UsQ0FBQzs7QUFFRixRQUFRLENBQUMsZ0JBQWdCLEdBQUcsb0JBQWdCLE9BQU87TUFBRSxTQUFTLHlEQUFHLElBQUk7Ozs7O3lDQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFB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QUFRLEdBQUcsRUFBRSxDQUFBOzs7Ozs7eUNBRWUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTs7O0FBQXpELHlCQUFpQjs7O3lDQUVMLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUM7OztBQUFuRCxhQUFLOzs7Ozs7OztBQUVMLDRCQUFJLElBQUksK0RBQW9ELENBQUM7OztBQUczRCxpQkFBUyxHQUFHLHNCQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDOzt5Q0FDeEMsU0FBUyxDQUFDLGtCQUFLLFFBQVEsQ0FBQzs7O0FBQTFDLGlCQUFTOzRDQUNSLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0NBQ3BDLENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87cUJBQ1gsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbmRyb2lkSGVscGVycyBmcm9tICcuLi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0ZW1wIGZyb20gJ3RlbXAnO1xuaW1wb3J0IHsgZnMsIHV0aWwsIHppcCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGppbXAgZnJvbSAnamltcCc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcblxuY29uc3Qgc3dpcGVTdGVwc1BlclNlYyA9IDI4O1xuY29uc3QgZHJhZ1N0ZXBzUGVyU2VjID0gNDA7XG5jb25zdCBDT05UQUlORVJfUEFUSF9NQVJLRVIgPSAnQCc7XG4vLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL1BMZEIwRy8yXG5jb25zdCBDT05UQUlORVJfUEFUSF9QQVRURVJOID0gbmV3IFJlZ0V4cChgXiR7Q09OVEFJTkVSX1BBVEhfTUFSS0VSfShbXi9dKykvKC4rKWApO1xuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbW1hbmRzLmtleWV2ZW50ID0gYXN5bmMgZnVuY3Rpb24gKGtleWNvZGUsIG1ldGFzdGF0ZSA9IG51bGwpIHtcbiAgLy8gVE9ETyBkZXByZWNhdGUga2V5ZXZlbnQ7IGN1cnJlbnRseSB3ZCBvbmx5IGltcGxlbWVudHMga2V5ZXZlbnRcbiAgbG9nLndhcm4oXCJrZXlldmVudCB3aWxsIGJlIGRlcHJlY2F0ZWQgdXNlIHByZXNzS2V5Q29kZVwiKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMucHJlc3NLZXlDb2RlKGtleWNvZGUsIG1ldGFzdGF0ZSk7XG59O1xuXG5jb21tYW5kcy5wcmVzc0tleUNvZGUgPSBhc3luYyBmdW5jdGlvbiAoa2V5Y29kZSwgbWV0YXN0YXRlID0gbnVsbCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcInByZXNzS2V5Q29kZVwiLCB7a2V5Y29kZSwgbWV0YXN0YXRlfSk7XG59O1xuXG5jb21tYW5kcy5sb25nUHJlc3NLZXlDb2RlID0gYXN5bmMgZnVuY3Rpb24gKGtleWNvZGUsIG1ldGFzdGF0ZSA9IG51bGwpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJsb25nUHJlc3NLZXlDb2RlXCIsIHtrZXljb2RlLCBtZXRhc3RhdGV9KTtcbn07XG5cbmNvbW1hbmRzLmdldE9yaWVudGF0aW9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgcGFyYW1zID0ge1xuICAgIG5hdHVyYWxPcmllbnRhdGlvbjogISF0aGlzLm9wdHMuYW5kcm9pZE5hdHVyYWxPcmllbnRhdGlvbixcbiAgfTtcbiAgbGV0IG9yaWVudGF0aW9uID0gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcIm9yaWVudGF0aW9uXCIsIHBhcmFtcyk7XG4gIHJldHVybiBvcmllbnRhdGlvbi50b1VwcGVyQ2FzZSgpO1xufTtcblxuY29tbWFuZHMuc2V0T3JpZW50YXRpb24gPSBhc3luYyBmdW5jdGlvbiAob3JpZW50YXRpb24pIHtcbiAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbi50b1VwcGVyQ2FzZSgpO1xuICBsZXQgcGFyYW1zID0ge1xuICAgIG9yaWVudGF0aW9uLFxuICAgIG5hdHVyYWxPcmllbnRhdGlvbjogISF0aGlzLm9wdHMuYW5kcm9pZE5hdHVyYWxPcmllbnRhdGlvbixcbiAgfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJvcmllbnRhdGlvblwiLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMuZmFrZUZsaWNrID0gYXN5bmMgZnVuY3Rpb24gKHhTcGVlZCwgeVNwZWVkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdmbGljaycsIHt4U3BlZWQsIHlTcGVlZH0pO1xufTtcblxuY29tbWFuZHMuZmFrZUZsaWNrRWxlbWVudCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQsIHhvZmZzZXQsIHlvZmZzZXQsIHNwZWVkKSB7XG4gIGxldCBwYXJhbXMgPSB7eG9mZnNldCwgeW9mZnNldCwgc3BlZWQsIGVsZW1lbnRJZH07XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdlbGVtZW50OmZsaWNrJywgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLnN3aXBlID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgdG91Y2hDb3VudCwgZWxJZCkge1xuICBpZiAoc3RhcnRYID09PSAnbnVsbCcpIHtcbiAgICBzdGFydFggPSAwLjU7XG4gIH1cbiAgaWYgKHN0YXJ0WSA9PT0gJ251bGwnKSB7XG4gICAgc3RhcnRZID0gMC41O1xuICB9XG4gIGxldCBzd2lwZU9wdHMgPSB7c3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksXG4gICAgICAgICAgICAgICAgICAgc3RlcHM6IE1hdGgucm91bmQoZHVyYXRpb24gKiBzd2lwZVN0ZXBzUGVyU2VjKX07XG4gIC8vIGdvaW5nIHRoZSBsb25nIHdheSBhbmQgY2hlY2tpbmcgZm9yIHVuZGVmaW5lZCBhbmQgbnVsbCBzaW5jZVxuICAvLyB3ZSBjYW4ndCBiZSBhc3N1cmVkIGBlbElkYCBpcyBhIHN0cmluZyBhbmQgbm90IGFuIGludFxuICBpZiAodXRpbC5oYXNWYWx1ZShlbElkKSkge1xuICAgIHN3aXBlT3B0cy5lbGVtZW50SWQgPSBlbElkO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzLmRvU3dpcGUoc3dpcGVPcHRzKTtcbn07XG5cbmNvbW1hbmRzLmRvU3dpcGUgPSBhc3luYyBmdW5jdGlvbiAoc3dpcGVPcHRzKSB7XG4gIGlmICh1dGlsLmhhc1ZhbHVlKHN3aXBlT3B0cy5lbGVtZW50SWQpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnN3aXBlXCIsIHN3aXBlT3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJzd2lwZVwiLCBzd2lwZU9wdHMpO1xuICB9XG59O1xuXG5jb21tYW5kcy5waW5jaENsb3NlID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgcGVyY2VudCwgc3RlcHMsIGVsSWQpIHtcbiAgbGV0IHBpbmNoT3B0cyA9IHtcbiAgICBkaXJlY3Rpb246ICdpbicsXG4gICAgZWxlbWVudElkOiBlbElkLFxuICAgIHBlcmNlbnQsXG4gICAgc3RlcHNcbiAgfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnBpbmNoXCIsIHBpbmNoT3B0cyk7XG59O1xuXG5jb21tYW5kcy5waW5jaE9wZW4gPSBhc3luYyBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGR1cmF0aW9uLCBwZXJjZW50LCBzdGVwcywgZWxJZCkge1xuICBsZXQgcGluY2hPcHRzID0ge2RpcmVjdGlvbjogJ291dCcsIGVsZW1lbnRJZDogZWxJZCwgcGVyY2VudCwgc3RlcHN9O1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6cGluY2hcIiwgcGluY2hPcHRzKTtcbn07XG5cbmNvbW1hbmRzLmZsaWNrID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnQsIHhTcGVlZCwgeVNwZWVkLCB4T2Zmc2V0LCB5T2Zmc2V0LCBzcGVlZCkge1xuICBpZiAoZWxlbWVudCkge1xuICAgIGF3YWl0IHRoaXMuZmFrZUZsaWNrRWxlbWVudChlbGVtZW50LCB4T2Zmc2V0LCB5T2Zmc2V0LCBzcGVlZCk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgdGhpcy5mYWtlRmxpY2soeFNwZWVkLCB5U3BlZWQpO1xuICB9XG59O1xuXG5jb21tYW5kcy5kcmFnID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgdG91Y2hDb3VudCwgZWxlbWVudElkLCBkZXN0RWxJZCkge1xuICBsZXQgZHJhZ09wdHMgPSB7XG4gICAgZWxlbWVudElkLCBkZXN0RWxJZCwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksXG4gICAgc3RlcHM6IE1hdGgucm91bmQoZHVyYXRpb24gKiBkcmFnU3RlcHNQZXJTZWMpXG4gIH07XG4gIHJldHVybiBhd2FpdCB0aGlzLmRvRHJhZyhkcmFnT3B0cyk7XG5cbn07XG5cbmNvbW1hbmRzLmRvRHJhZyA9IGFzeW5jIGZ1bmN0aW9uIChkcmFnT3B0cykge1xuICBpZiAodXRpbC5oYXNWYWx1ZShkcmFnT3B0cy5lbGVtZW50SWQpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmRyYWdcIiwgZHJhZ09wdHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZHJhZ1wiLCBkcmFnT3B0cyk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoc2Vjb25kcykge1xuICBhd2FpdCB0aGlzLmFkYi5sb2NrKCk7XG4gIGlmIChpc05hTihzZWNvbmRzKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGZsb2F0U2Vjb25kcyA9IHBhcnNlRmxvYXQoc2Vjb25kcyk7XG4gIGlmIChmbG9hdFNlY29uZHMgPD0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBCLmRlbGF5KDEwMDAgKiBmbG9hdFNlY29uZHMpO1xuICBhd2FpdCB0aGlzLnVubG9jaygpO1xufTtcblxuY29tbWFuZHMuaXNMb2NrZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5pc1NjcmVlbkxvY2tlZCgpO1xufTtcblxuY29tbWFuZHMudW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgYW5kcm9pZEhlbHBlcnMudW5sb2NrKHRoaXMsIHRoaXMuYWRiLCB0aGlzLmNhcHMpO1xufTtcblxuY29tbWFuZHMub3Blbk5vdGlmaWNhdGlvbnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwib3Blbk5vdGlmaWNhdGlvblwiKTtcbn07XG5cbmNvbW1hbmRzLnNldExvY2F0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYWRiLnNlbmRUZWxuZXRDb21tYW5kKGBnZW8gZml4ICR7bG9uZ2l0dWRlfSAke2xhdGl0dWRlfWApO1xufTtcblxuZnVuY3Rpb24gcGFyc2VDb250YWluZXJQYXRoIChyZW1vdGVQYXRoKSB7XG4gIGNvbnN0IG1hdGNoID0gQ09OVEFJTkVSX1BBVEhfUEFUVEVSTi5leGVjKHJlbW90ZVBhdGgpO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEl0IGlzIGV4cGVjdGVkIHRoYXQgcGFja2FnZSBpZGVudGlmaWVyIGlzIHNlcGFyYXRlZCBmcm9tIHRoZSByZWxhdGl2ZSBwYXRoIHdpdGggYSBzaW5nbGUgc2xhc2guIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGAnJHtyZW1vdGVQYXRofScgaXMgZ2l2ZW4gaW5zdGVhZGApO1xuICB9XG4gIHJldHVybiBbbWF0Y2hbMV0sIHBhdGgucG9zaXgucmVzb2x2ZShgL2RhdGEvZGF0YS8ke21hdGNoWzFdfWAsIG1hdGNoWzJdKV07XG59XG5cbmNvbW1hbmRzLnB1bGxGaWxlID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgaWYgKHJlbW90ZVBhdGguZW5kc1dpdGgoJy8nKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBJdCBpcyBleHBlY3RlZCB0aGF0IHJlbW90ZSBwYXRoIHBvaW50cyB0byBhIGZpbGUgYW5kIG5vdCB0byBhIGZvbGRlci4gYCArXG4gICAgICAgICAgICAgICAgICAgICAgYCcke3JlbW90ZVBhdGh9JyBpcyBnaXZlbiBpbnN0ZWFkYCk7XG4gIH1cbiAgbGV0IHRtcERlc3RpbmF0aW9uID0gbnVsbDtcbiAgaWYgKHJlbW90ZVBhdGguc3RhcnRzV2l0aChDT05UQUlORVJfUEFUSF9NQVJLRVIpKSB7XG4gICAgY29uc3QgW3BhY2thZ2VJZCwgcGF0aEluQ29udGFpbmVyXSA9IHBhcnNlQ29udGFpbmVyUGF0aChyZW1vdGVQYXRoKTtcbiAgICBsb2cuaW5mbyhgUGFyc2VkIHBhY2thZ2UgaWRlbnRpZmllciAnJHtwYWNrYWdlSWR9JyBmcm9tICcke3JlbW90ZVBhdGh9Jy4gV2lsbCBnZXQgdGhlIGRhdGEgZnJvbSAnJHtwYXRoSW5Db250YWluZXJ9J2ApO1xuICAgIHRtcERlc3RpbmF0aW9uID0gYC9kYXRhL2xvY2FsL3RtcC8ke3BhdGgucG9zaXguYmFzZW5hbWUocGF0aEluQ29udGFpbmVyKX1gO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ3J1bi1hcycsIHBhY2thZ2VJZCwgYGNobW9kIDc3NyAnJHtwYXRoSW5Db250YWluZXIucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpfSdgXSk7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ2NwJywgJy1mJywgcGF0aEluQ29udGFpbmVyLCB0bXBEZXN0aW5hdGlvbl0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBDYW5ub3QgYWNjZXNzIHRoZSBjb250YWluZXIgb2YgJyR7cGFja2FnZUlkfScgYXBwbGljYXRpb24uIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYElzIHRoZSBhcHBsaWNhdGlvbiBpbnN0YWxsZWQgYW5kIGhhcyAnZGVidWdnYWJsZScgYnVpbGQgb3B0aW9uIHNldCB0byB0cnVlPyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGxvY2FsRmlsZSA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJywgc3VmZml4OiAnLnRtcCd9KTtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0aGlzLmFkYi5wdWxsKF8uaXNTdHJpbmcodG1wRGVzdGluYXRpb24pID8gdG1wRGVzdGluYXRpb24gOiByZW1vdGVQYXRoLCBsb2NhbEZpbGUpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmcy5yZWFkRmlsZShsb2NhbEZpbGUpO1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsRmlsZSkpIHtcbiAgICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xuICAgIH1cbiAgICBpZiAoXy5pc1N0cmluZyh0bXBEZXN0aW5hdGlvbikpIHtcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsncm0nLCAnLWYnLCB0bXBEZXN0aW5hdGlvbl0pO1xuICAgIH1cbiAgfVxufTtcblxuY29tbWFuZHMucHVzaEZpbGUgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCwgYmFzZTY0RGF0YSkge1xuICBpZiAocmVtb3RlUGF0aC5lbmRzV2l0aCgnLycpKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEl0IGlzIGV4cGVjdGVkIHRoYXQgcmVtb3RlIHBhdGggcG9pbnRzIHRvIGEgZmlsZSBhbmQgbm90IHRvIGEgZm9sZGVyLiBgICtcbiAgICAgICAgICAgICAgICAgICAgICBgJyR7cmVtb3RlUGF0aH0nIGlzIGdpdmVuIGluc3RlYWRgKTtcbiAgfVxuICBjb25zdCBsb2NhbEZpbGUgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy50bXAnfSk7XG4gIGlmIChfLmlzQXJyYXkoYmFzZTY0RGF0YSkpIHtcbiAgICAvLyBzb21lIGNsaWVudHMgKGFoZW0pIGphdmEsIHNlbmQgYSBieXRlIGFycmF5IGVuY29kaW5nIHV0ZjggY2hhcmFjdGVyc1xuICAgIC8vIGluc3RlYWQgb2YgYSBzdHJpbmcsIHdoaWNoIHdvdWxkIGJlIGluZmluaXRlbHkgYmV0dGVyIVxuICAgIGJhc2U2NERhdGEgPSBCdWZmZXIuZnJvbShiYXNlNjREYXRhKS50b1N0cmluZygndXRmOCcpO1xuICB9XG4gIGNvbnN0IGNvbnRlbnQgPSBCdWZmZXIuZnJvbShiYXNlNjREYXRhLCAnYmFzZTY0Jyk7XG4gIGxldCB0bXBEZXN0aW5hdGlvbiA9IG51bGw7XG4gIHRyeSB7XG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGxvY2FsRmlsZSwgY29udGVudC50b1N0cmluZygnYmluYXJ5JyksICdiaW5hcnknKTtcbiAgICBpZiAocmVtb3RlUGF0aC5zdGFydHNXaXRoKENPTlRBSU5FUl9QQVRIX01BUktFUikpIHtcbiAgICAgIGNvbnN0IFtwYWNrYWdlSWQsIHBhdGhJbkNvbnRhaW5lcl0gPSBwYXJzZUNvbnRhaW5lclBhdGgocmVtb3RlUGF0aCk7XG4gICAgICBsb2cuaW5mbyhgUGFyc2VkIHBhY2thZ2UgaWRlbnRpZmllciAnJHtwYWNrYWdlSWR9JyBmcm9tICcke3JlbW90ZVBhdGh9Jy4gV2lsbCBwdXQgdGhlIGRhdGEgaW50byAnJHtwYXRoSW5Db250YWluZXJ9J2ApO1xuICAgICAgdG1wRGVzdGluYXRpb24gPSBgL2RhdGEvbG9jYWwvdG1wLyR7cGF0aC5wb3NpeC5iYXNlbmFtZShwYXRoSW5Db250YWluZXIpfWA7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChcbiAgICAgICAgICBbJ3J1bi1hcycsIHBhY2thZ2VJZCwgYG1rZGlyIC1wICcke3BhdGgucG9zaXguZGlybmFtZShwYXRoSW5Db250YWluZXIpLnJlcGxhY2UoLycvZywgJ1xcXFxcXCcnKX0nYF1cbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydydW4tYXMnLCBwYWNrYWdlSWQsIGB0b3VjaCAnJHtwYXRoSW5Db250YWluZXIucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpfSdgXSk7XG4gICAgICAgIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsncnVuLWFzJywgcGFja2FnZUlkLCBgY2htb2QgNzc3ICcke3BhdGhJbkNvbnRhaW5lci5yZXBsYWNlKC8nL2csICdcXFxcXFwnJyl9J2BdKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIucHVzaChsb2NhbEZpbGUsIHRtcERlc3RpbmF0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydjcCcsICctZicsIHRtcERlc3RpbmF0aW9uLCBwYXRoSW5Db250YWluZXJdKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBhY2Nlc3MgdGhlIGNvbnRhaW5lciBvZiAnJHtwYWNrYWdlSWR9JyBhcHBsaWNhdGlvbi4gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGBJcyB0aGUgYXBwbGljYXRpb24gaW5zdGFsbGVkIGFuZCBoYXMgJ2RlYnVnZ2FibGUnIGJ1aWxkIG9wdGlvbiBzZXQgdG8gdHJ1ZT8gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkYiBwdXNoIGNyZWF0ZXMgZm9sZGVycyBhbmQgb3ZlcndyaXRlcyBleGlzdGluZyBmaWxlcy5cbiAgICAgIGF3YWl0IHRoaXMuYWRiLnB1c2gobG9jYWxGaWxlLCByZW1vdGVQYXRoKTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyhsb2NhbEZpbGUpKSB7XG4gICAgICBhd2FpdCBmcy51bmxpbmsobG9jYWxGaWxlKTtcbiAgICB9XG4gICAgaWYgKF8uaXNTdHJpbmcodG1wRGVzdGluYXRpb24pKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ3JtJywgJy1mJywgdG1wRGVzdGluYXRpb25dKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbW1hbmRzLnB1bGxGb2xkZXIgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCkge1xuICBsZXQgbG9jYWxGb2xkZXIgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bSd9KTtcbiAgYXdhaXQgdGhpcy5hZGIucHVsbChyZW1vdGVQYXRoLCBsb2NhbEZvbGRlcik7XG4gIHJldHVybiAoYXdhaXQgemlwLnRvSW5NZW1vcnlaaXAobG9jYWxGb2xkZXIpKS50b1N0cmluZygnYmFzZTY0Jyk7XG59O1xuXG5jb21tYW5kcy5maW5nZXJwcmludCA9IGFzeW5jIGZ1bmN0aW9uIChmaW5nZXJwcmludElkKSB7XG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcImZpbmdlcnByaW50IG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzXCIpO1xuICB9XG4gIGF3YWl0IHRoaXMuYWRiLmZpbmdlcnByaW50KGZpbmdlcnByaW50SWQpO1xufTtcblxuY29tbWFuZHMuc2VuZFNNUyA9IGFzeW5jIGZ1bmN0aW9uIChwaG9uZU51bWJlciwgbWVzc2FnZSkge1xuICBpZiAoIXRoaXMuaXNFbXVsYXRvcigpKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJzZW5kU01TIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzXCIpO1xuICB9XG4gIGF3YWl0IHRoaXMuYWRiLnNlbmRTTVMocGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xufTtcblxuY29tbWFuZHMuZ3NtQ2FsbCA9IGFzeW5jIGZ1bmN0aW9uIChwaG9uZU51bWJlciwgYWN0aW9uKSB7XG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcImdzbUNhbGwgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnNcIik7XG4gIH1cbiAgYXdhaXQgdGhpcy5hZGIuZ3NtQ2FsbChwaG9uZU51bWJlciwgYWN0aW9uKTtcbn07XG5cbmNvbW1hbmRzLmdzbVNpZ25hbCA9IGFzeW5jIGZ1bmN0aW9uIChzaWduYWxTdHJlbmdoKSB7XG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcImdzbVNpZ25hbCBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcbiAgfVxuICBhd2FpdCB0aGlzLmFkYi5nc21TaWduYWwoc2lnbmFsU3RyZW5naCk7XG59O1xuXG5jb21tYW5kcy5nc21Wb2ljZSA9IGFzeW5jIGZ1bmN0aW9uIChzdGF0ZSkge1xuICBpZiAoIXRoaXMuaXNFbXVsYXRvcigpKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJnc21Wb2ljZSBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcbiAgfVxuICBhd2FpdCB0aGlzLmFkYi5nc21Wb2ljZShzdGF0ZSk7XG59O1xuXG5jb21tYW5kcy5wb3dlckFDID0gYXN5bmMgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcInBvd2VyQUMgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnNcIik7XG4gIH1cbiAgYXdhaXQgdGhpcy5hZGIucG93ZXJBQyhzdGF0ZSk7XG59O1xuXG5jb21tYW5kcy5wb3dlckNhcGFjaXR5ID0gYXN5bmMgZnVuY3Rpb24gKGJhdHRlcnlQZXJjZW50KSB7XG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcInBvd2VyQ2FwYWNpdHkgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnNcIik7XG4gIH1cbiAgYXdhaXQgdGhpcy5hZGIucG93ZXJDYXBhY2l0eShiYXR0ZXJ5UGVyY2VudCk7XG59O1xuXG5jb21tYW5kcy5uZXR3b3JrU3BlZWQgPSBhc3luYyBmdW5jdGlvbiAobmV0d29ya1NwZWVkKSB7XG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIm5ldHdvcmtTcGVlZCBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcbiAgfVxuICBhd2FpdCB0aGlzLmFkYi5uZXR3b3JrU3BlZWQobmV0d29ya1NwZWVkKTtcbn07XG5cbmhlbHBlcnMuZ2V0U2NyZWVuc2hvdERhdGFXaXRoQWRiU2hlbGwgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBvcHRzKSB7XG4gIGNvbnN0IGxvY2FsRmlsZSA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJywgc3VmZml4OiAnLnBuZyd9KTtcbiAgaWYgKGF3YWl0IGZzLmV4aXN0cyhsb2NhbEZpbGUpKSB7XG4gICAgYXdhaXQgZnMudW5saW5rKGxvY2FsRmlsZSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBwbmdEaXIgPSBvcHRzLmFuZHJvaWRTY3JlZW5zaG90UGF0aCB8fCAnL2RhdGEvbG9jYWwvdG1wLyc7XG4gICAgY29uc3QgcG5nID0gcGF0aC5wb3NpeC5yZXNvbHZlKHBuZ0RpciwgJ3NjcmVlbnNob3QucG5nJyk7XG4gICAgY29uc3QgY21kID0gWycvc3lzdGVtL2Jpbi9ybScsIGAke3BuZ307YCwgJy9zeXN0ZW0vYmluL3NjcmVlbmNhcCcsICctcCcsIHBuZ107XG4gICAgYXdhaXQgYWRiLnNoZWxsKGNtZCk7XG4gICAgaWYgKCFhd2FpdCBhZGIuZmlsZVNpemUocG5nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc2l6ZSBvZiB0aGUgdGFrZW4gc2NyZWVuc2hvdCBlcXVhbHMgdG8gemVyby4nKTtcbiAgICB9XG4gICAgYXdhaXQgYWRiLnB1bGwocG5nLCBsb2NhbEZpbGUpO1xuICAgIHJldHVybiBhd2FpdCBqaW1wLnJlYWQobG9jYWxGaWxlKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsRmlsZSkpIHtcbiAgICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xuICAgIH1cbiAgfVxufTtcblxuaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0ID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBsZXQge3N0ZG91dCwgc3RkZXJyLCBjb2RlfSA9IGF3YWl0IGV4ZWMoYWRiLmV4ZWN1dGFibGUucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkYi5leGVjdXRhYmxlLmRlZmF1bHRBcmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoWydleGVjLW91dCcsICcvc3lzdGVtL2Jpbi9zY3JlZW5jYXAnLCAnLXAnXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW5jb2Rpbmc6ICdiaW5hcnknLCBpc0J1ZmZlcjogdHJ1ZX0pO1xuICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciwgdGhyb3dcbiAgaWYgKGNvZGUgfHwgc3RkZXJyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgU2NyZWVuc2hvdCByZXR1cm5lZCBlcnJvciwgY29kZTogJyR7Y29kZX0nLCBzdGRlcnI6ICcke3N0ZGVyci50b1N0cmluZygpfSdgKTtcbiAgfVxuICAvLyBpZiB3ZSBkb24ndCBnZXQgYW55dGhpbmcgYXQgYWxsLCB0aHJvd1xuICBpZiAoIXN0ZG91dC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NjcmVlbnNob3QgcmV0dXJuZWQgbm8gZGF0YScpO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IGppbXAucmVhZChzdGRvdXQpO1xufTtcblxuY29tbWFuZHMuZ2V0U2NyZWVuc2hvdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYXBpTGV2ZWwgPSBhd2FpdCB0aGlzLmFkYi5nZXRBcGlMZXZlbCgpO1xuICBsZXQgaW1hZ2UgPSBudWxsO1xuICBpZiAoYXBpTGV2ZWwgPiAyMCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBUaGlzIHNjcmVlbnNob3RpbmcgYXBwcm9hY2ggaXMgd2F5IGZhc3Rlciwgc2luY2UgaXQgcmVxdWlyZXMgbGVzcyBleHRlcm5hbCBjb21tYW5kc1xuICAgICAgLy8gdG8gYmUgZXhlY3V0ZWQuIFVuZm9ydHVuYXRlbHksIGV4ZWMtb3V0IG9wdGlvbiBpcyBvbmx5IHN1cHBvcnRlZCBieSBuZXdlciBBbmRyb2lkL1NESyB2ZXJzaW9ucyAoNS4wIGFuZCBsYXRlcilcbiAgICAgIGltYWdlID0gYXdhaXQgdGhpcy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0KHRoaXMuYWRiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuaW5mbyhgQ2Fubm90IGdldCBzY3JlZW5zaG90IGRhdGEgd2l0aCAnYWRiIGV4ZWMtb3V0JyBiZWNhdXNlIG9mICcke2UubWVzc2FnZX0nLiBgICtcbiAgICAgICAgICAgICAgIGBEZWZhdWx0aW5nIHRvICdhZGIgc2hlbGwnIGNhbGxgKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpbWFnZSkge1xuICAgIHRyeSB7XG4gICAgICBpbWFnZSA9IGF3YWl0IHRoaXMuZ2V0U2NyZWVuc2hvdERhdGFXaXRoQWRiU2hlbGwodGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgZXJyID0gYENhbm5vdCBnZXQgc2NyZWVuc2hvdCBkYXRhIGJlY2F1c2Ugb2YgJyR7ZS5tZXNzYWdlfScuIGAgK1xuICAgICAgICAgICAgICAgICAgYE1ha2Ugc3VyZSB0aGUgJ0xheW91dFBhcmFtcy5GTEFHX1NFQ1VSRScgaXMgbm90IHNldCBmb3IgYCArXG4gICAgICAgICAgICAgICAgICBgdGhlIGN1cnJlbnQgdmlld2A7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhlcnIpO1xuICAgIH1cbiAgfVxuICBpZiAoYXBpTGV2ZWwgPCAyMykge1xuICAgIC8vIEFuZHJvaWQgYnVnIDg0MzM3NDIgLSByb3RhdGUgc2NyZWVuc2hvdCBpZiBzY3JlZW4gaXMgcm90YXRlZFxuICAgIGxldCBzY3JlZW5PcmllbnRhdGlvbiA9IGF3YWl0IHRoaXMuYWRiLmdldFNjcmVlbk9yaWVudGF0aW9uKCk7XG4gICAgdHJ5IHtcbiAgICAgIGltYWdlID0gYXdhaXQgaW1hZ2Uucm90YXRlKC05MCAqIHNjcmVlbk9yaWVudGF0aW9uKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy53YXJuKGBDb3VsZCBub3Qgcm90YXRlIHNjcmVlbnNob3QgZHVlIHRvIGVycm9yOiAke2Vycn1gKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgZ2V0QnVmZmVyID0gQi5wcm9taXNpZnkoaW1hZ2UuZ2V0QnVmZmVyLCB7Y29udGV4dDogaW1hZ2V9KTtcbiAgY29uc3QgaW1nQnVmZmVyID0gYXdhaXQgZ2V0QnVmZmVyKGppbXAuTUlNRV9QTkcpO1xuICByZXR1cm4gaW1nQnVmZmVyLnRvU3RyaW5nKCdiYXNlNjQnKTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

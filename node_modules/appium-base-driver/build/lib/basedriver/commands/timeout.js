'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _asyncbox = require('asyncbox');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _mjsonwp = require('../../mjsonwp');

var _driver = require("../driver");

var _driver2 = _interopRequireDefault(_driver);

var commands = {},
    helpers = {},
    extensions = {};

var MIN_TIMEOUT = 0;

// If we define `commands.timeouts` instead of `commands.timeoutsW3C`, the command `timeouts` will be called
// from other dirver's timeouts. See https://github.com/appium/appium-base-driver/pull/164
// Arguments will be: [{"protocol":"W3C","implicit":30000}, "1dcfe021-8fc8-49bd-8dac-e986d3091b97", ...]
// eslint-disable-next-line no-unused-vars
commands.timeouts = function callee$0$0(timeoutsObj) {
  var script, pageLoad, implicit, type, ms;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(timeoutsObj.protocol === _driver2['default'].DRIVER_PROTOCOL.W3C)) {
          context$1$0.next = 16;
          break;
        }

        script = timeoutsObj.script;
        pageLoad = timeoutsObj.pageLoad;
        implicit = timeoutsObj.implicit;

        _logger2['default'].debug('script: ' + script + ', pageLoad: ' + pageLoad + ', implicit: ' + implicit);

        if (!_appiumSupport.util.hasValue(script)) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.scriptTimeoutW3C(script));

      case 8:
        if (!_appiumSupport.util.hasValue(pageLoad)) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.pageLoadTimeoutW3C(pageLoad));

      case 11:
        if (!_appiumSupport.util.hasValue(implicit)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.implicitWaitW3C(implicit));

      case 14:
        context$1$0.next = 35;
        break;

      case 16:
        type = timeoutsObj.type;
        ms = timeoutsObj.ms;

        _logger2['default'].debug('type: ' + type + ', ms: ' + ms);

        context$1$0.t0 = type;
        context$1$0.next = context$1$0.t0 === 'command' ? 22 : context$1$0.t0 === 'implicit' ? 25 : context$1$0.t0 === 'page load' ? 28 : context$1$0.t0 === 'script' ? 31 : 34;
        break;

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.newCommandTimeout(ms));

      case 24:
        return context$1$0.abrupt('break', 35);

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(this.implicitWaitMJSONWP(ms));

      case 27:
        return context$1$0.abrupt('break', 35);

      case 28:
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(this.pageLoadTimeoutMJSONWP(ms));

      case 30:
        return context$1$0.abrupt('break', 35);

      case 31:
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(this.scriptTimeoutMJSONWP(ms));

      case 33:
        return context$1$0.abrupt('break', 35);

      case 34:
        throw new Error('\'' + type + '\' is not supported');

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getTimeouts = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', {
          command: this.newCommandTimeoutMs,
          implicit: this.implicitWaitMs
        });

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// implicit
commands.implicitWaitW3C = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.implicitWait(ms));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.implicitWaitMJSONWP = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.implicitWait(ms));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.implicitWait = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setImplicitWait(this.parseTimeoutArgument(ms)));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setImplicitWait = function (ms) {
  this.implicitWaitMs = ms;
  _logger2['default'].debug('Set implicit wait to ' + ms + 'ms');
  if (this.managedDrivers && this.managedDrivers.length) {
    _logger2['default'].debug('Setting implicit wait on managed drivers');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(this.managedDrivers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var driver = _step.value;

        if (_lodash2['default'].isFunction(driver.setImplicitWait)) {
          driver.setImplicitWait(ms);
        }
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
};

// pageLoad
// eslint-disable-next-line no-unused-vars
commands.pageLoadTimeoutW3C = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _mjsonwp.errors.NotImplementedError('Not implemented yet for pageLoad.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// eslint-disable-next-line no-unused-vars
commands.pageLoadTimeoutMJSONWP = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _mjsonwp.errors.NotImplementedError('Not implemented yet for pageLoad.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// script
// eslint-disable-next-line no-unused-vars
commands.scriptTimeoutW3C = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _mjsonwp.errors.NotImplementedError('Not implemented yet for script.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// eslint-disable-next-line no-unused-vars
commands.scriptTimeoutMJSONWP = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _mjsonwp.errors.NotImplementedError('Not implemented yet for script.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// command
commands.newCommandTimeout = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.setNewCommandTimeout(this.parseTimeoutArgument(ms));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setNewCommandTimeout = function (ms) {
  this.newCommandTimeoutMs = ms;
  _logger2['default'].debug('Set new command timeout to ' + ms + 'ms');
  if (this.managedDrivers && this.managedDrivers.length) {
    _logger2['default'].debug('Setting new command timeout on managed drivers');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(this.managedDrivers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var driver = _step2.value;

        if (_lodash2['default'].isFunction(driver.setNewCommandTimeout)) {
          driver.setNewCommandTimeout(ms);
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
  }
};

helpers.clearNewCommandTimeout = function () {
  if (this.noCommandTimer) {
    this.noCommandTimer.cancel();
    this.noCommandTimer = null;
  }
};

helpers.startNewCommandTimeout = function () {
  var _this = this;

  // make sure there are no rogue timeouts
  this.clearNewCommandTimeout();

  // if command timeout is 0, it is disabled
  if (!this.newCommandTimeoutMs) return; // eslint-disable-line curly

  this.noCommandTimer = _appiumSupport.util.cancellableDelay(this.newCommandTimeoutMs);
  this.noCommandTimer.then(function callee$1$0() {
    var errorMessage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          // eslint-disable-line promise/prefer-await-to-then
          _logger2['default'].warn('Shutting down because we waited ' + (this.newCommandTimeoutMs / 1000 + ' seconds for a command'));
          errorMessage = 'New Command Timeout of ' + (this.newCommandTimeoutMs / 1000 + ' seconds ') + 'expired. Try customizing the timeout using the ' + '\'newCommandTimeout\' desired capability';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(new Error(errorMessage)));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  })['catch'](_bluebird2['default'].CancellationError, function () /*err*/{
    // ignore
  });
};

helpers.implicitWaitForCondition = function callee$0$0(condFn) {
  var wrappedCondFn;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _arguments = arguments,
        _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Waiting up to ' + this.implicitWaitMs + ' ms for condition');

        wrappedCondFn = function wrappedCondFn() {
          var args$2$0 = _arguments;
          return _regeneratorRuntime.async(function wrappedCondFn$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                // reset command timeout
                this.clearNewCommandTimeout();

                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(condFn.apply(undefined, args$2$0));

              case 3:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        };

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _asyncbox.waitForCondition)(wrappedCondFn, {
          waitMs: this.implicitWaitMs, intervalMs: 500, logger: _logger2['default']
        }));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.parseTimeoutArgument = function (ms) {
  var duration = parseInt(ms, 10);
  if (_lodash2['default'].isNaN(duration) || duration < MIN_TIMEOUT) {
    throw new _mjsonwp.errors.UnknownError('Invalid timeout value \'' + ms + '\'');
  }
  return duration;
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3RpbWVvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWdCLFdBQVc7Ozs7d0JBQ00sVUFBVTs7d0JBQzdCLFVBQVU7Ozs7c0JBQ1YsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O3VCQUNkLGVBQWU7O3NCQUNmLFdBQVc7Ozs7QUFHbEMsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFNdEIsUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsV0FBVztNQUVwQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFlMUIsSUFBSSxFQUFFLEVBQUU7Ozs7Y0FoQmIsV0FBVyxDQUFDLFFBQVEsS0FBSyxvQkFBVyxlQUFlLENBQUMsR0FBRyxDQUFBOzs7OztBQUNsRCxjQUFNLEdBQXdCLFdBQVcsQ0FBekMsTUFBTTtBQUFFLGdCQUFRLEdBQWMsV0FBVyxDQUFqQyxRQUFRO0FBQUUsZ0JBQVEsR0FBSSxXQUFXLENBQXZCLFFBQVE7O0FBQ2pDLDRCQUFJLEtBQUssY0FBWSxNQUFNLG9CQUFlLFFBQVEsb0JBQWUsUUFBUSxDQUFHLENBQUM7O2FBRXpFLG9CQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUM7Ozs7Ozt5Q0FDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQzs7O2FBR2pDLG9CQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUM7Ozs7Ozt5Q0FDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQzs7O2FBR3JDLG9CQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUM7Ozs7Ozt5Q0FDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7QUFHL0IsWUFBSSxHQUFRLFdBQVcsQ0FBdkIsSUFBSTtBQUFFLFVBQUUsR0FBSSxXQUFXLENB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SSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7R0FDNUQsQ0FBQyxTQUNJLENBQUMsc0JBQUUsaUJBQWlCLEVBQUUsbUJBQWE7O0dBRXhDLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBRUYsT0FBTyxDQUFDLHdCQUF3QixHQUFHLG9CQUFnQixNQUFNO01BRW5ELGFBQWE7Ozs7Ozs7QUFEakIsNEJBQUksS0FBSyxvQkFBa0IsSUFBSSxDQUFDLGNBQWMsdUJBQW9CLENBQUM7O0FBQy9ELHFCQUFhLEdBQUcsU0FBaEIsYUFBYTs7Ozs7O0FBRWYsb0JBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOzs7aURBRWpCLE1BQU0sMkJBQVM7Ozs7Ozs7Ozs7U0FDN0I7Ozt5Q0FDWSxnQ0FBaUIsYUFBYSxFQUFFO0FBQzNDLGdCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0scUJBQUs7U0FDMUQsQ0FBQzs7Ozs7Ozs7OztDQUNILENBQUM7O0FBRUYsT0FBTyxDQUFDLG9CQUFvQixHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQzNDLE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDaEMsTUFBSSxvQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxHQUFHLFdBQVcsRUFBRTtBQUMvQyxVQUFNLElBQUksZ0JBQU8sWUFBWSw4QkFBMkIsRUFBRSxRQUFJLENBQUM7R0FDaEU7QUFDRCxTQUFPLFFBQVEsQ0FBQztDQUNqQixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvY29tbWFuZHMvdGltZW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IHdhaXRGb3JDb25kaXRpb24gfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJy4uLy4uL21qc29ud3AnO1xuaW1wb3J0IEJhc2VEcml2ZXIgZnJvbSBcIi4uL2RyaXZlclwiO1xuXG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29uc3QgTUlOX1RJTUVPVVQgPSAwO1xuXG4vLyBJZiB3ZSBkZWZpbmUgYGNvbW1hbmRzLnRpbWVvdXRzYCBpbnN0ZWFkIG9mIGBjb21tYW5kcy50aW1lb3V0c1czQ2AsIHRoZSBjb21tYW5kIGB0aW1lb3V0c2Agd2lsbCBiZSBjYWxsZWRcbi8vIGZyb20gb3RoZXIgZGlydmVyJ3MgdGltZW91dHMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL2FwcGl1bS1iYXNlLWRyaXZlci9wdWxsLzE2NFxuLy8gQXJndW1lbnRzIHdpbGwgYmU6IFt7XCJwcm90b2NvbFwiOlwiVzNDXCIsXCJpbXBsaWNpdFwiOjMwMDAwfSwgXCIxZGNmZTAyMS04ZmM4LTQ5YmQtOGRhYy1lOTg2ZDMwOTFiOTdcIiwgLi4uXVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb21tYW5kcy50aW1lb3V0cyA9IGFzeW5jIGZ1bmN0aW9uICh0aW1lb3V0c09iaikge1xuICBpZiAodGltZW91dHNPYmoucHJvdG9jb2wgPT09IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQykge1xuICAgIGNvbnN0IHtzY3JpcHQsIHBhZ2VMb2FkLCBpbXBsaWNpdH0gPSB0aW1lb3V0c09iajtcbiAgICBsb2cuZGVidWcoYHNjcmlwdDogJHtzY3JpcHR9LCBwYWdlTG9hZDogJHtwYWdlTG9hZH0sIGltcGxpY2l0OiAke2ltcGxpY2l0fWApO1xuXG4gICAgaWYgKHV0aWwuaGFzVmFsdWUoc2NyaXB0KSkge1xuICAgICAgYXdhaXQgdGhpcy5zY3JpcHRUaW1lb3V0VzNDKHNjcmlwdCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWwuaGFzVmFsdWUocGFnZUxvYWQpKSB7XG4gICAgICBhd2FpdCB0aGlzLnBhZ2VMb2FkVGltZW91dFczQyhwYWdlTG9hZCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWwuaGFzVmFsdWUoaW1wbGljaXQpKSB7XG4gICAgICBhd2FpdCB0aGlzLmltcGxpY2l0V2FpdFczQyhpbXBsaWNpdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHt0eXBlLCBtc30gPSB0aW1lb3V0c09iajtcbiAgICBsb2cuZGVidWcoYHR5cGU6ICR7dHlwZX0sIG1zOiAke21zfWApO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdjb21tYW5kJzpcbiAgICAgICAgYXdhaXQgdGhpcy5uZXdDb21tYW5kVGltZW91dChtcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1wbGljaXQnOlxuICAgICAgICBhd2FpdCB0aGlzLmltcGxpY2l0V2FpdE1KU09OV1AobXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BhZ2UgbG9hZCc6XG4gICAgICAgIGF3YWl0IHRoaXMucGFnZUxvYWRUaW1lb3V0TUpTT05XUChtcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2NyaXB0JzpcbiAgICAgICAgYXdhaXQgdGhpcy5zY3JpcHRUaW1lb3V0TUpTT05XUChtcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cbiAgfVxufTtcblxuY29tbWFuZHMuZ2V0VGltZW91dHMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgY29tbWFuZDogdGhpcy5uZXdDb21tYW5kVGltZW91dE1zLFxuICAgIGltcGxpY2l0OiB0aGlzLmltcGxpY2l0V2FpdE1zLFxuICB9O1xufTtcblxuLy8gaW1wbGljaXRcbmNvbW1hbmRzLmltcGxpY2l0V2FpdFczQyA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICBhd2FpdCB0aGlzLmltcGxpY2l0V2FpdChtcyk7XG59O1xuXG5jb21tYW5kcy5pbXBsaWNpdFdhaXRNSlNPTldQID0gYXN5bmMgZnVuY3Rpb24gKG1zKSB7XG4gIGF3YWl0IHRoaXMuaW1wbGljaXRXYWl0KG1zKTtcbn07XG5cbmNvbW1hbmRzLmltcGxpY2l0V2FpdCA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICBhd2FpdCB0aGlzLnNldEltcGxpY2l0V2FpdCh0aGlzLnBhcnNlVGltZW91dEFyZ3VtZW50KG1zKSk7XG59O1xuXG5oZWxwZXJzLnNldEltcGxpY2l0V2FpdCA9IGZ1bmN0aW9uIChtcykge1xuICB0aGlzLmltcGxpY2l0V2FpdE1zID0gbXM7XG4gIGxvZy5kZWJ1ZyhgU2V0IGltcGxpY2l0IHdhaXQgdG8gJHttc31tc2ApO1xuICBpZiAodGhpcy5tYW5hZ2VkRHJpdmVycyAmJiB0aGlzLm1hbmFnZWREcml2ZXJzLmxlbmd0aCkge1xuICAgIGxvZy5kZWJ1ZygnU2V0dGluZyBpbXBsaWNpdCB3YWl0IG9uIG1hbmFnZWQgZHJpdmVycycpO1xuICAgIGZvciAobGV0IGRyaXZlciBvZiB0aGlzLm1hbmFnZWREcml2ZXJzKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKGRyaXZlci5zZXRJbXBsaWNpdFdhaXQpKSB7XG4gICAgICAgIGRyaXZlci5zZXRJbXBsaWNpdFdhaXQobXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLy8gcGFnZUxvYWRcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29tbWFuZHMucGFnZUxvYWRUaW1lb3V0VzNDID0gYXN5bmMgZnVuY3Rpb24gKG1zKSB7XG4gIHRocm93IG5ldyBlcnJvcnMuTm90SW1wbGVtZW50ZWRFcnJvcignTm90IGltcGxlbWVudGVkIHlldCBmb3IgcGFnZUxvYWQuJyk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbW1hbmRzLnBhZ2VMb2FkVGltZW91dE1KU09OV1AgPSBhc3luYyBmdW5jdGlvbiAobXMpIHtcbiAgdGhyb3cgbmV3IGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgeWV0IGZvciBwYWdlTG9hZC4nKTtcbn07XG5cbi8vIHNjcmlwdFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb21tYW5kcy5zY3JpcHRUaW1lb3V0VzNDID0gYXN5bmMgZnVuY3Rpb24gKG1zKSB7XG4gIHRocm93IG5ldyBlcnJvcnMuTm90SW1wbGVtZW50ZWRFcnJvcignTm90IGltcGxlbWVudGVkIHlldCBmb3Igc2NyaXB0LicpO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb21tYW5kcy5zY3JpcHRUaW1lb3V0TUpTT05XUCA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICB0aHJvdyBuZXcgZXJyb3JzLk5vdEltcGxlbWVudGVkRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCB5ZXQgZm9yIHNjcmlwdC4nKTtcbn07XG5cbi8vIGNvbW1hbmRcbmNvbW1hbmRzLm5ld0NvbW1hbmRUaW1lb3V0ID0gYXN5bmMgZnVuY3Rpb24gKG1zKSB7XG4gIHRoaXMuc2V0TmV3Q29tbWFuZFRpbWVvdXQodGhpcy5wYXJzZVRpbWVvdXRBcmd1bWVudChtcykpO1xufTtcblxuaGVscGVycy5zZXROZXdDb21tYW5kVGltZW91dCA9IGZ1bmN0aW9uIChtcykge1xuICB0aGlzLm5ld0NvbW1hbmRUaW1lb3V0TXMgPSBtcztcbiAgbG9nLmRlYnVnKGBTZXQgbmV3IGNvbW1hbmQgdGltZW91dCB0byAke21zfW1zYCk7XG4gIGlmICh0aGlzLm1hbmFnZWREcml2ZXJzICYmIHRoaXMubWFuYWdlZERyaXZlcnMubGVuZ3RoKSB7XG4gICAgbG9nLmRlYnVnKCdTZXR0aW5nIG5ldyBjb21tYW5kIHRpbWVvdXQgb24gbWFuYWdlZCBkcml2ZXJzJyk7XG4gICAgZm9yIChsZXQgZHJpdmVyIG9mIHRoaXMubWFuYWdlZERyaXZlcnMpIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24oZHJpdmVyLnNldE5ld0NvbW1hbmRUaW1lb3V0KSkge1xuICAgICAgICBkcml2ZXIuc2V0TmV3Q29tbWFuZFRpbWVvdXQobXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuaGVscGVycy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5ub0NvbW1hbmRUaW1lcikge1xuICAgIHRoaXMubm9Db21tYW5kVGltZXIuY2FuY2VsKCk7XG4gICAgdGhpcy5ub0NvbW1hbmRUaW1lciA9IG51bGw7XG4gIH1cbn07XG5cbmhlbHBlcnMuc3RhcnROZXdDb21tYW5kVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyByb2d1ZSB0aW1lb3V0c1xuICB0aGlzLmNsZWFyTmV3Q29tbWFuZFRpbWVvdXQoKTtcblxuICAvLyBpZiBjb21tYW5kIHRpbWVvdXQgaXMgMCwgaXQgaXMgZGlzYWJsZWRcbiAgaWYgKCF0aGlzLm5ld0NvbW1hbmRUaW1lb3V0TXMpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxuXG4gIHRoaXMubm9Db21tYW5kVGltZXIgPSB1dGlsLmNhbmNlbGxhYmxlRGVsYXkodGhpcy5uZXdDb21tYW5kVGltZW91dE1zKTtcbiAgdGhpcy5ub0NvbW1hbmRUaW1lclxuICAgIC50aGVuKGFzeW5jICgpID0+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuXG4gICAgICBsb2cud2FybihgU2h1dHRpbmcgZG93biBiZWNhdXNlIHdlIHdhaXRlZCBgICtcbiAgICAgICAgICAgICAgIGAke3RoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyAvIDEwMDB9IHNlY29uZHMgZm9yIGEgY29tbWFuZGApO1xuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBOZXcgQ29tbWFuZCBUaW1lb3V0IG9mIGAgK1xuICAgICAgICAgICAgICAgYCR7dGhpcy5uZXdDb21tYW5kVGltZW91dE1zIC8gMTAwMH0gc2Vjb25kcyBgICtcbiAgICAgICAgICAgICAgIGBleHBpcmVkLiBUcnkgY3VzdG9taXppbmcgdGhlIHRpbWVvdXQgdXNpbmcgdGhlIGAgK1xuICAgICAgICAgICAgICAgYCduZXdDb21tYW5kVGltZW91dCcgZGVzaXJlZCBjYXBhYmlsaXR5YDtcbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24obmV3IEVycm9yKGVycm9yTWVzc2FnZSkpO1xuICAgIH0pXG4gICAgLmNhdGNoKEIuQ2FuY2VsbGF0aW9uRXJyb3IsICgvKmVyciovKSA9PiB7XG4gICAgICAvLyBpZ25vcmVcbiAgICB9KTtcbn07XG5cbmhlbHBlcnMuaW1wbGljaXRXYWl0Rm9yQ29uZGl0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGNvbmRGbikge1xuICBsb2cuZGVidWcoYFdhaXRpbmcgdXAgdG8gJHt0aGlzLmltcGxpY2l0V2FpdE1zfSBtcyBmb3IgY29uZGl0aW9uYCk7XG4gIGxldCB3cmFwcGVkQ29uZEZuID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICAvLyByZXNldCBjb21tYW5kIHRpbWVvdXRcbiAgICB0aGlzLmNsZWFyTmV3Q29tbWFuZFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBjb25kRm4oLi4uYXJncyk7XG4gIH07XG4gIHJldHVybiBhd2FpdCB3YWl0Rm9yQ29uZGl0aW9uKHdyYXBwZWRDb25kRm4sIHtcbiAgICB3YWl0TXM6IHRoaXMuaW1wbGljaXRXYWl0TXMsIGludGVydmFsTXM6IDUwMCwgbG9nZ2VyOiBsb2dcbiAgfSk7XG59O1xuXG5oZWxwZXJzLnBhcnNlVGltZW91dEFyZ3VtZW50ID0gZnVuY3Rpb24gKG1zKSB7XG4gIGxldCBkdXJhdGlvbiA9IHBhcnNlSW50KG1zLCAxMCk7XG4gIGlmIChfLmlzTmFOKGR1cmF0aW9uKSB8fCBkdXJhdGlvbiA8IE1JTl9USU1FT1VUKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoYEludmFsaWQgdGltZW91dCB2YWx1ZSAnJHttc30nYCk7XG4gIH1cbiAgcmV0dXJuIGR1cmF0aW9uO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==

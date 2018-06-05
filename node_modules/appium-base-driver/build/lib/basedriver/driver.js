'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mjsonwp = require('../mjsonwp');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _desiredCaps = require('./desired-caps');

var _capabilities = require('./capabilities');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _automationNames = require('./automation-names');

var NEW_COMMAND_TIMEOUT_MS = 60 * 1000;

var EVENT_SESSION_INIT = 'newSessionRequested';
var EVENT_SESSION_START = 'newSessionStarted';
var EVENT_SESSION_QUIT_START = 'quitSessionRequested';
var EVENT_SESSION_QUIT_DONE = 'quitSessionFinished';

var BaseDriver = (function (_MobileJsonWireProtocol) {
  _inherits(BaseDriver, _MobileJsonWireProtocol);

  function BaseDriver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, BaseDriver);

    _get(Object.getPrototypeOf(BaseDriver.prototype), 'constructor', this).call(this);

    // setup state
    this.sessionId = null;
    this.opts = opts;
    this.caps = null;
    this.helpers = _helpers2['default'];

    // timeout initialization
    this.newCommandTimeoutMs = NEW_COMMAND_TIMEOUT_MS;
    this.implicitWaitMs = 0;

    this._constraints = _lodash2['default'].cloneDeep(_desiredCaps.desiredCapabilityConstraints);
    this.locatorStrategies = [];
    this.webLocatorStrategies = [];

    // use a custom tmp dir to avoid losing data and app when computer is
    // restarted
    this.opts.tmpDir = this.opts.tmpDir || process.env.APPIUM_TMP_DIR || _os2['default'].tmpdir();

    // base-driver internals
    this.curCommand = new _bluebird2['default'](function (r) {
      r();
    }); // see note in execute
    this.curCommandCancellable = new _bluebird2['default'](function (r) {
      r();
    }); // see note in execute
    this.shutdownUnexpectedly = false;
    this.noCommandTimer = null;
    this.shouldValidateCaps = shouldValidateCaps;
    // settings should be instantiated by implementing drivers
    this.settings = null;
    this.resetOnUnexpectedShutdown();

    // keeping track of initial opts
    this.initialOpts = _lodash2['default'].cloneDeep(this.opts);

    // allow subclasses to have internal drivers
    this.managedDrivers = [];

    // store event timings
    this._eventHistory = {
      commands: [] // commands get a special place
    };

    this.protocol = null;
  }

  /**
   * This property is used by AppiumDriver to store the data of the
   * specific driver sessions. This data can be later used to adjust
   * properties for driver instances running in parallel.
   * Override it in inherited driver classes if necessary.
   *
   * @return {object} Driver properties mapping
   */

  _createClass(BaseDriver, [{
    key: 'logEvent',

    /*
     * API method for driver developers to log timings for important events
     */
    value: function logEvent(eventName) {
      if (eventName === "commands") {
        throw new Error("Cannot log commands directly");
      }
      if (typeof eventName !== "string") {
        throw new Error('Invalid eventName ' + eventName);
      }
      if (!this._eventHistory[eventName]) {
        this._eventHistory[eventName] = [];
      }
      var ts = Date.now();
      var logTime = new Date(ts).toTimeString();
      this._eventHistory[eventName].push(ts);
      _logger2['default'].debug('Event \'' + eventName + '\' logged at ' + ts + ' (' + logTime + ')');
    }

    /*
     * Overridden in appium driver, but here so that individual drivers can be
     * tested with clients that poll
     */
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return _regeneratorRuntime.async(function getStatus$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', {});

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /*
     * Initialize a new onUnexpectedShutdown promise, cancelling existing one.
     */
  }, {
    key: 'resetOnUnexpectedShutdown',
    value: function resetOnUnexpectedShutdown() {
      var _this = this;

      if (this.onUnexpectedShutdown && !this.onUnexpectedShutdown.isFulfilled()) {
        this.onUnexpectedShutdown.cancel();
      }
      this.onUnexpectedShutdown = new _bluebird2['default'](function (resolve, reject) {
        _this.unexpectedShutdownDeferred = { resolve: resolve, reject: reject };
      }).cancellable();
      // noop handler to avoid warning.
      this.onUnexpectedShutdown['catch'](function () {});
    }

    // we only want subclasses to ever extend the contraints
  }, {
    key: 'sessionExists',

    // method required by MJSONWP in order to determine whether it should
    // respond with an invalid session response
    value: function sessionExists(sessionId) {
      if (!sessionId) return false; // eslint-disable-line curly
      return sessionId === this.sessionId;
    }

    // method required by MJSONWP in order to determine if the command should
    // be proxied directly to the driver
  }, {
    key: 'driverForSession',
    value: function driverForSession() /*sessionId*/{
      return this;
    }
  }, {
    key: 'logExtraCaps',
    value: function logExtraCaps(caps) {
      var extraCaps = _lodash2['default'].difference(_lodash2['default'].keys(caps), _lodash2['default'].keys(this._constraints));
      if (extraCaps.length) {
        _logger2['default'].warn('The following capabilities were provided, but are not ' + ('recognized by appium: ' + extraCaps.join(', ') + '.'));
      }
    }
  }, {
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      if (!this.shouldValidateCaps) {
        return true;
      }

      try {
        (0, _capabilities.validateCaps)(caps, this._constraints);
      } catch (e) {
        _logger2['default'].errorAndThrow(new _mjsonwp.errors.SessionNotCreatedError('The desiredCapabilities object was not valid for the ' + ('following reason(s): ' + e.message)));
      }

      this.logExtraCaps(caps);

      return true;
    }
  }, {
    key: 'isMjsonwpProtocol',
    value: function isMjsonwpProtocol() {
      return this.protocol === BaseDriver.DRIVER_PROTOCOL.MJSONWP;
    }
  }, {
    key: 'isW3CProtocol',
    value: function isW3CProtocol() {
      return this.protocol === BaseDriver.DRIVER_PROTOCOL.W3C;
    }

    /**
     * Test createSession inputs to see if this is a W3C Session or a MJSONWP Session
     */
  }, {
    key: 'executeCommand',

    // This is the main command handler for the driver. It wraps command
    // execution with timeout logic, checking that we have a valid session,
    // and ensuring that we execute commands one at a time. This method is called
    // by MJSONWP's express router.
    value: function executeCommand(cmd) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var startTime, res, nextCommand, endTime;
      return _regeneratorRuntime.async(function executeCommand$(context$2$0) {
        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            startTime = Date.now();

            if (cmd === 'createSession') {
              // If creating a session determine if W3C or MJSONWP protocol was requested and remember the choice
              this.protocol = BaseDriver.determineProtocol.apply(BaseDriver, args);
              this.logEvent(EVENT_SESSION_INIT);
            } else if (cmd === 'deleteSession') {
              this.logEvent(EVENT_SESSION_QUIT_START);
            }

            // if we had a command timer running, clear it now that we're starting
            // a new command and so don't want to time out
            this.clearNewCommandTimeout();

            // if we don't have this command, it must not be implemented

            if (this[cmd]) {
              context$2$0.next = 5;
              break;
            }

            throw new _mjsonwp.errors.NotYetImplementedError();

          case 5:
            res = undefined;

            if (!this.isCommandsQueueEnabled) {
              context$2$0.next = 14;
              break;
            }

            nextCommand = this.curCommand.then(function () {
              // eslint-disable-line promise/prefer-await-to-then
              // if we unexpectedly shut down, we need to reject every command in
              // the queue before we actually try to run it
              if (_this2.shutdownUnexpectedly) {
                return _bluebird2['default'].reject(new _mjsonwp.errors.NoSuchDriverError('The driver was unexpectedly shut down!'));
              }
              // We also need to turn the command into a cancellable promise so if we
              // have an unexpected shutdown event, for example, we can cancel it from
              // outside, rejecting the current command immediately
              _this2.curCommandCancellable = new _bluebird2['default'](function (r) {
                r();
              }).then(function () {
                // eslint-disable-line promise/prefer-await-to-then
                return _this2[cmd].apply(_this2, args);
              }).cancellable();
              return _this2.curCommandCancellable;
            });

            this.curCommand = nextCommand['catch'](function () {});
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(nextCommand);

          case 11:
            res = context$2$0.sent;
            context$2$0.next = 19;
            break;

          case 14:
            if (!this.shutdownUnexpectedly) {
              context$2$0.next = 16;
              break;
            }

            throw new _mjsonwp.errors.NoSuchDriverError('The driver was unexpectedly shut down!');

          case 16:
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this[cmd].apply(this, args));

          case 18:
            res = context$2$0.sent;

          case 19:

            // if we have set a new command timeout (which is the default), start a
            // timer once we've finished executing this command. If we don't clear
            // the timer (which is done when a new command comes in), we will trigger
            // automatic session deletion in this.onCommandTimeout. Of course we don't
            // want to trigger the timer when the user is shutting down the session
            // intentionally
            if (cmd !== 'deleteSession') {
              // reseting existing timeout
              this.startNewCommandTimeout();
            }

            // log timing information about this command
            endTime = Date.now();

            this._eventHistory.commands.push({ cmd: cmd, startTime: startTime, endTime: endTime });
            if (cmd === 'createSession') {
              this.logEvent(EVENT_SESSION_START);
            } else if (cmd === 'deleteSession') {
              this.logEvent(EVENT_SESSION_QUIT_DONE);
            }

            return context$2$0.abrupt('return', res);

          case 24:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startUnexpectedShutdown',
    value: function startUnexpectedShutdown() {
      var err = arguments.length <= 0 || arguments[0] === undefined ? new _mjsonwp.errors.NoSuchDriverError('The driver was unexpectedly shut down!') : arguments[0];
      return _regeneratorRuntime.async(function startUnexpectedShutdown$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            this.unexpectedShutdownDeferred.reject(err); // allow others to listen for this
            this.shutdownUnexpectedly = true;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.deleteSession(this.sessionId));

          case 4:
            this.shutdownUnexpectedly = false;
            this.curCommandCancellable.cancel(err);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'validateLocatorStrategy',
    value: function validateLocatorStrategy(strategy) {
      var webContext = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var validStrategies = this.locatorStrategies;
      _logger2['default'].debug('Valid locator strategies for this request: ' + validStrategies.join(', '));

      if (webContext) {
        validStrategies = validStrategies.concat(this.webLocatorStrategies);
      }

      if (!_lodash2['default'].includes(validStrategies, strategy)) {
        throw new _mjsonwp.errors.InvalidSelectorError('Locator Strategy \'' + strategy + '\' is not supported for this session');
      }
    }

    /*
     * Restart the session with the original caps,
     * preserving the timeout config.
     */
  }, {
    key: 'reset',
    value: function reset() {
      var currentConfig, _arr, _i, property, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value;

      return _regeneratorRuntime.async(function reset$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Resetting app mid-session');
            _logger2['default'].debug('Running generic full reset');

            // preserving state
            currentConfig = {};
            _arr = ['implicitWaitMs', 'newCommandTimeoutMs', 'sessionId', 'resetOnUnexpectedShutdown'];

            for (_i = 0; _i < _arr.length; _i++) {
              property = _arr[_i];

              currentConfig[property] = this[property];
            }

            // We also need to preserve the unexpected shutdown, and make sure it is not cancelled during reset.
            this.resetOnUnexpectedShutdown = function () {};

            context$2$0.prev = 6;
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(this.deleteSession(this.sessionId));

          case 9:
            _logger2['default'].debug('Restarting app');
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(this.createSession(this.caps));

          case 12:
            context$2$0.prev = 12;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 16;

            // always restore state.
            for (_iterator = _getIterator(_lodash2['default'].toPairs(currentConfig)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _step$value = _slicedToArray(_step.value, 2);
              key = _step$value[0];
              value = _step$value[1];

              this[key] = value;
            }
            context$2$0.next = 24;
            break;

          case 20:
            context$2$0.prev = 20;
            context$2$0.t0 = context$2$0['catch'](16);
            _didIteratorError = true;
            _iteratorError = context$2$0.t0;

          case 24:
            context$2$0.prev = 24;
            context$2$0.prev = 25;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 27:
            context$2$0.prev = 27;

            if (!_didIteratorError) {
              context$2$0.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return context$2$0.finish(27);

          case 31:
            return context$2$0.finish(24);

          case 32:
            return context$2$0.finish(12);

          case 33:
            this.clearNewCommandTimeout();

          case 34:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[6,, 12, 33], [16, 20, 24, 32], [25,, 27, 31]]);
    }
  }, {
    key: 'getSwipeOptions',
    value: function getSwipeOptions(gestures) {
      var touchCount = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
      var startX, startY, endX, endY, duration, element, destElement, locResult, sizeResult, offsetX, offsetY, firstElLocation;
      return _regeneratorRuntime.async(function getSwipeOptions$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            startX = this.helpers.getCoordDefault(gestures[0].options.x), startY = this.helpers.getCoordDefault(gestures[0].options.y), endX = this.helpers.getCoordDefault(gestures[2].options.x), endY = this.helpers.getCoordDefault(gestures[2].options.y), duration = this.helpers.getSwipeTouchDuration(gestures[1]), element = gestures[0].options.element, destElement = gestures[2].options.element || gestures[0].options.element;

            if (!_appiumSupport.util.hasValue(destElement)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.getLocationInView(destElement));

          case 4:
            locResult = context$2$0.sent;
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.getSize(destElement));

          case 7:
            sizeResult = context$2$0.sent;
            offsetX = Math.abs(endX) < 1 && Math.abs(endX) > 0 ? sizeResult.width * endX : endX;
            offsetY = Math.abs(endY) < 1 && Math.abs(endY) > 0 ? sizeResult.height * endY : endY;

            endX = locResult.x + offsetX;
            endY = locResult.y + offsetY;
            // if the target element was provided, the coordinates for the destination need to be relative to it.

            if (!_appiumSupport.util.hasValue(element)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.getLocationInView(element));

          case 15:
            firstElLocation = context$2$0.sent;

            endX -= firstElLocation.x;
            endY -= firstElLocation.y;

          case 18:
            return context$2$0.abrupt('return', { startX:
              // clients are responsible to use these options correctly
              startX, startY: startY, endX: endX, endY: endY, duration: duration, touchCount: touchCount, element: element });

          case 19:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive() /* sessionId */{
      return false;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList() /* sessionId */{
      return [];
    }
  }, {
    key: 'canProxy',
    value: function canProxy() /* sessionId */{
      return false;
    }
  }, {
    key: 'addManagedDriver',
    value: function addManagedDriver(driver) {
      this.managedDrivers.push(driver);
    }
  }, {
    key: 'getManagedDrivers',
    value: function getManagedDrivers() {
      return this.managedDrivers;
    }
  }, {
    key: 'driverData',
    get: function get() {
      return {};
    }

    /**
     * This property controls the way {#executeCommand} method
     * handles new driver commands received from the client.
     * Override it for inherited classes only in special cases.
     *
     * @return {boolean} If the returned value is true (default) then all the commands
     *   received by the particular driver instance are going to be put into the queue,
     *   so each following command will not be executed until the previous command
     *   execution is completed. False value disables that queue, so each driver command
     *   is executed independently and does not wait for anything.
     */
  }, {
    key: 'isCommandsQueueEnabled',
    get: function get() {
      return true;
    }

    /*
     * make eventHistory a property and return a cloned object so a consumer can't
     * inadvertently change data outside of logEvent
     */
  }, {
    key: 'eventHistory',
    get: function get() {
      return _lodash2['default'].cloneDeep(this._eventHistory);
    }
  }, {
    key: 'desiredCapConstraints',
    set: function set(constraints) {
      this._constraints = _Object$assign(this._constraints, constraints);
    },
    get: function get() {
      return this._constraints;
    }
  }, {
    key: 'validAutomations',
    get: function get() {
      return _automationNames.automationNames;
    }
  }], [{
    key: 'determineProtocol',
    value: function determineProtocol(desiredCapabilities, requiredCapabilities, capabilities) {
      return _lodash2['default'].isPlainObject(capabilities) ? BaseDriver.DRIVER_PROTOCOL.W3C : BaseDriver.DRIVER_PROTOCOL.MJSONWP;
    }
  }, {
    key: 'DRIVER_PROTOCOL',
    value: {
      W3C: 'W3C',
      MJSONWP: 'MJSONWP'
    },
    enumerable: true
  }]);

  return BaseDriver;
})(_mjsonwp.MobileJsonWireProtocol);

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {

  for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(_commands2['default'])), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 2);

    var cmd = _step2$value[0];
    var fn = _step2$value[1];

    BaseDriver.prototype[cmd] = fn;
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

exports['default'] = BaseDriver;
module.exports = exports['default'];

// get start time for this command, and log in special cases

// What we're doing here is pretty clever. this.curCommand is always
// a promise representing the command currently being executed by the
// driver, or the last command executed by the driver (it starts off as
// essentially a pre-resolved promise). When a command comes in, we tack it
// to the end of this.curCommand, essentially saying we want to execute it
// whenever this.curCommand is done. We call this new promise nextCommand,
// and its resolution is what we ultimately will return to whomever called
// us. Meanwhile, we reset this.curCommand to _be_ nextCommand (but
// ignoring any rejections), so that if another command comes into the
// server, it gets tacked on to the end of nextCommand. Thus we create
// a chain of promises that acts as a queue with single concurrency.

// there's no destination element handling in bootstrap and since it applies to all platforms, we handle it here
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2RyaXZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQStDLFlBQVk7O2tCQUM1QyxJQUFJOzs7O3dCQUNFLFlBQVk7Ozs7dUJBQ2IsV0FBVzs7OztzQkFDZixVQUFVOzs7OzJCQUNtQixnQkFBZ0I7OzRCQUNoQyxnQkFBZ0I7O3dCQUMvQixVQUFVOzs7O3NCQUNWLFFBQVE7Ozs7NkJBQ0QsZ0JBQWdCOzsrQkFDTCxvQkFBb0I7O0FBR3BELElBQU0sc0JBQXNCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQzs7QUFFekMsSUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQztBQUNqRCxJQUFNLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ2hELElBQU0sd0JBQXdCLEdBQUcsc0JBQXNCLENBQUM7QUFDeEQsSUFBTSx1QkFBdUIsR0FBRyxxQkFBcUIsQ0FBQzs7SUFFaEQsVUFBVTtZQUFWLFVBQVU7O0FBRUYsV0FGUixVQUFVLEdBRXFDO1FBQXRDLElBQUkseURBQUcsRUFBRTtRQUFFLGtCQUFrQix5REFBRyxJQUFJOzswQkFGN0MsVUFBVTs7QUFHWiwrQkFIRSxVQUFVLDZDQUdKOzs7QUFHUixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsT0FBTyx1QkFBVSxDQUFDOzs7QUFHdkIsUUFBSSxDQUFDLG1CQUFtQixHQUFHLHNCQUFzQixDQUFDO0FBQ2xELFFBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDOztBQUV4QixRQUFJLENBQUMsWUFBWSxHQUFHLG9CQUFFLFNBQVMsMkNBQThCLENBQUM7QUFDOUQsUUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUM1QixRQUFJLENBQUMsb0JBQW9CLEdBQUcs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aWxlIjoibGliL2Jhc2Vkcml2ZXIvZHJpdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9iaWxlSnNvbldpcmVQcm90b2NvbCwgZXJyb3JzIH0gZnJvbSAnLi4vbWpzb253cCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZGVzaXJlZENhcGFiaWxpdHlDb25zdHJhaW50cyB9IGZyb20gJy4vZGVzaXJlZC1jYXBzJztcbmltcG9ydCB7IHZhbGlkYXRlQ2FwcyB9IGZyb20gJy4vY2FwYWJpbGl0aWVzJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgYXV0b21hdGlvbk5hbWVzIH0gZnJvbSAnLi9hdXRvbWF0aW9uLW5hbWVzJztcblxuXG5jb25zdCBORVdfQ09NTUFORF9USU1FT1VUX01TID0gNjAgKiAxMDAwO1xuXG5jb25zdCBFVkVOVF9TRVNTSU9OX0lOSVQgPSAnbmV3U2Vzc2lvblJlcXVlc3RlZCc7XG5jb25zdCBFVkVOVF9TRVNTSU9OX1NUQVJUID0gJ25ld1Nlc3Npb25TdGFydGVkJztcbmNvbnN0IEVWRU5UX1NFU1NJT05fUVVJVF9TVEFSVCA9ICdxdWl0U2Vzc2lvblJlcXVlc3RlZCc7XG5jb25zdCBFVkVOVF9TRVNTSU9OX1FVSVRfRE9ORSA9ICdxdWl0U2Vzc2lvbkZpbmlzaGVkJztcblxuY2xhc3MgQmFzZURyaXZlciBleHRlbmRzIE1vYmlsZUpzb25XaXJlUHJvdG9jb2wge1xuXG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gc2V0dXAgc3RhdGVcbiAgICB0aGlzLnNlc3Npb25JZCA9IG51bGw7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLmNhcHMgPSBudWxsO1xuICAgIHRoaXMuaGVscGVycyA9IGhlbHBlcnM7XG5cbiAgICAvLyB0aW1lb3V0IGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5uZXdDb21tYW5kVGltZW91dE1zID0gTkVXX0NPTU1BTkRfVElNRU9VVF9NUztcbiAgICB0aGlzLmltcGxpY2l0V2FpdE1zID0gMDtcblxuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gXy5jbG9uZURlZXAoZGVzaXJlZENhcGFiaWxpdHlDb25zdHJhaW50cyk7XG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFtdO1xuICAgIHRoaXMud2ViTG9jYXRvclN0cmF0ZWdpZXMgPSBbXTtcblxuICAgIC8vIHVzZSBhIGN1c3RvbSB0bXAgZGlyIHRvIGF2b2lkIGxvc2luZyBkYXRhIGFuZCBhcHAgd2hlbiBjb21wdXRlciBpc1xuICAgIC8vIHJlc3RhcnRlZFxuICAgIHRoaXMub3B0cy50bXBEaXIgPSB0aGlzLm9wdHMudG1wRGlyIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkFQUElVTV9UTVBfRElSIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIG9zLnRtcGRpcigpO1xuXG4gICAgLy8gYmFzZS1kcml2ZXIgaW50ZXJuYWxzXG4gICAgdGhpcy5jdXJDb21tYW5kID0gbmV3IEIoKHIpID0+IHsgcigpOyB9KTsgLy8gc2VlIG5vdGUgaW4gZXhlY3V0ZVxuICAgIHRoaXMuY3VyQ29tbWFuZENhbmNlbGxhYmxlID0gbmV3IEIoKHIpID0+IHsgcigpOyB9KTsgLy8gc2VlIG5vdGUgaW4gZXhlY3V0ZVxuICAgIHRoaXMuc2h1dGRvd25VbmV4cGVjdGVkbHkgPSBmYWxzZTtcbiAgICB0aGlzLm5vQ29tbWFuZFRpbWVyID0gbnVsbDtcbiAgICB0aGlzLnNob3VsZFZhbGlkYXRlQ2FwcyA9IHNob3VsZFZhbGlkYXRlQ2FwcztcbiAgICAvLyBzZXR0aW5ncyBzaG91bGQgYmUgaW5zdGFudGlhdGVkIGJ5IGltcGxlbWVudGluZyBkcml2ZXJzXG4gICAgdGhpcy5zZXR0aW5ncyA9IG51bGw7XG4gICAgdGhpcy5yZXNldE9uVW5leHBlY3RlZFNodXRkb3duKCk7XG5cbiAgICAvLyBrZWVwaW5nIHRyYWNrIG9mIGluaXRpYWwgb3B0c1xuICAgIHRoaXMuaW5pdGlhbE9wdHMgPSBfLmNsb25lRGVlcCh0aGlzLm9wdHMpO1xuXG4gICAgLy8gYWxsb3cgc3ViY2xhc3NlcyB0byBoYXZlIGludGVybmFsIGRyaXZlcnNcbiAgICB0aGlzLm1hbmFnZWREcml2ZXJzID0gW107XG5cbiAgICAvLyBzdG9yZSBldmVudCB0aW1pbmdzXG4gICAgdGhpcy5fZXZlbnRIaXN0b3J5ID0ge1xuICAgICAgY29tbWFuZHM6IFtdIC8vIGNvbW1hbmRzIGdldCBhIHNwZWNpYWwgcGxhY2VcbiAgICB9O1xuXG4gICAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIGJ5IEFwcGl1bURyaXZlciB0byBzdG9yZSB0aGUgZGF0YSBvZiB0aGVcbiAgICogc3BlY2lmaWMgZHJpdmVyIHNlc3Npb25zLiBUaGlzIGRhdGEgY2FuIGJlIGxhdGVyIHVzZWQgdG8gYWRqdXN0XG4gICAqIHByb3BlcnRpZXMgZm9yIGRyaXZlciBpbnN0YW5jZXMgcnVubmluZyBpbiBwYXJhbGxlbC5cbiAgICogT3ZlcnJpZGUgaXQgaW4gaW5oZXJpdGVkIGRyaXZlciBjbGFzc2VzIGlmIG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSBEcml2ZXIgcHJvcGVydGllcyBtYXBwaW5nXG4gICAqL1xuICBnZXQgZHJpdmVyRGF0YSAoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgcHJvcGVydHkgY29udHJvbHMgdGhlIHdheSB7I2V4ZWN1dGVDb21tYW5kfSBtZXRob2RcbiAgICogaGFuZGxlcyBuZXcgZHJpdmVyIGNvbW1hbmRzIHJlY2VpdmVkIGZyb20gdGhlIGNsaWVudC5cbiAgICogT3ZlcnJpZGUgaXQgZm9yIGluaGVyaXRlZCBjbGFzc2VzIG9ubHkgaW4gc3BlY2lhbCBjYXNlcy5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdGhlIHJldHVybmVkIHZhbHVlIGlzIHRydWUgKGRlZmF1bHQpIHRoZW4gYWxsIHRoZSBjb21tYW5kc1xuICAgKiAgIHJlY2VpdmVkIGJ5IHRoZSBwYXJ0aWN1bGFyIGRyaXZlciBpbnN0YW5jZSBhcmUgZ29pbmcgdG8gYmUgcHV0IGludG8gdGhlIHF1ZXVlLFxuICAgKiAgIHNvIGVhY2ggZm9sbG93aW5nIGNvbW1hbmQgd2lsbCBub3QgYmUgZXhlY3V0ZWQgdW50aWwgdGhlIHByZXZpb3VzIGNvbW1hbmRcbiAgICogICBleGVjdXRpb24gaXMgY29tcGxldGVkLiBGYWxzZSB2YWx1ZSBkaXNhYmxlcyB0aGF0IHF1ZXVlLCBzbyBlYWNoIGRyaXZlciBjb21tYW5kXG4gICAqICAgaXMgZXhlY3V0ZWQgaW5kZXBlbmRlbnRseSBhbmQgZG9lcyBub3Qgd2FpdCBmb3IgYW55dGhpbmcuXG4gICAqL1xuICBnZXQgaXNDb21tYW5kc1F1ZXVlRW5hYmxlZCAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKlxuICAgKiBtYWtlIGV2ZW50SGlzdG9yeSBhIHByb3BlcnR5IGFuZCByZXR1cm4gYSBjbG9uZWQgb2JqZWN0IHNvIGEgY29uc3VtZXIgY2FuJ3RcbiAgICogaW5hZHZlcnRlbnRseSBjaGFuZ2UgZGF0YSBvdXRzaWRlIG9mIGxvZ0V2ZW50XG4gICAqL1xuICBnZXQgZXZlbnRIaXN0b3J5ICgpIHtcbiAgICByZXR1cm4gXy5jbG9uZURlZXAodGhpcy5fZXZlbnRIaXN0b3J5KTtcbiAgfVxuXG4gIC8qXG4gICAqIEFQSSBtZXRob2QgZm9yIGRyaXZlciBkZXZlbG9wZXJzIHRvIGxvZyB0aW1pbmdzIGZvciBpbXBvcnRhbnQgZXZlbnRzXG4gICAqL1xuICBsb2dFdmVudCAoZXZlbnROYW1lKSB7XG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gXCJjb21tYW5kc1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgbG9nIGNvbW1hbmRzIGRpcmVjdGx5XCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGV2ZW50TmFtZSAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9ldmVudEhpc3RvcnlbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5fZXZlbnRIaXN0b3J5W2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgbGV0IHRzID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgbG9nVGltZSA9IChuZXcgRGF0ZSh0cykpLnRvVGltZVN0cmluZygpO1xuICAgIHRoaXMuX2V2ZW50SGlzdG9yeVtldmVudE5hbWVdLnB1c2godHMpO1xuICAgIGxvZy5kZWJ1ZyhgRXZlbnQgJyR7ZXZlbnROYW1lfScgbG9nZ2VkIGF0ICR7dHN9ICgke2xvZ1RpbWV9KWApO1xuICB9XG5cbiAgLypcbiAgICogT3ZlcnJpZGRlbiBpbiBhcHBpdW0gZHJpdmVyLCBidXQgaGVyZSBzbyB0aGF0IGluZGl2aWR1YWwgZHJpdmVycyBjYW4gYmVcbiAgICogdGVzdGVkIHdpdGggY2xpZW50cyB0aGF0IHBvbGxcbiAgICovXG4gIGFzeW5jIGdldFN0YXR1cyAoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLypcbiAgICogSW5pdGlhbGl6ZSBhIG5ldyBvblVuZXhwZWN0ZWRTaHV0ZG93biBwcm9taXNlLCBjYW5jZWxsaW5nIGV4aXN0aW5nIG9uZS5cbiAgICovXG4gIHJlc2V0T25VbmV4cGVjdGVkU2h1dGRvd24gKCkge1xuICAgIGlmICh0aGlzLm9uVW5leHBlY3RlZFNodXRkb3duICYmICF0aGlzLm9uVW5leHBlY3RlZFNodXRkb3duLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgIHRoaXMub25VbmV4cGVjdGVkU2h1dGRvd24uY2FuY2VsKCk7XG4gICAgfVxuICAgIHRoaXMub25VbmV4cGVjdGVkU2h1dGRvd24gPSBuZXcgQigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnVuZXhwZWN0ZWRTaHV0ZG93bkRlZmVycmVkICA9IHtyZXNvbHZlLCByZWplY3R9O1xuICAgIH0pLmNhbmNlbGxhYmxlKCk7XG4gICAgLy8gbm9vcCBoYW5kbGVyIHRvIGF2b2lkIHdhcm5pbmcuXG4gICAgdGhpcy5vblVuZXhwZWN0ZWRTaHV0ZG93bi5jYXRjaCgoKSA9PiB7fSk7XG4gIH1cblxuICAvLyB3ZSBvbmx5IHdhbnQgc3ViY2xhc3NlcyB0byBldmVyIGV4dGVuZCB0aGUgY29udHJhaW50c1xuICBzZXQgZGVzaXJlZENhcENvbnN0cmFpbnRzIChjb25zdHJhaW50cykge1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gT2JqZWN0LmFzc2lnbih0aGlzLl9jb25zdHJhaW50cywgY29uc3RyYWludHMpO1xuICB9XG5cbiAgZ2V0IGRlc2lyZWRDYXBDb25zdHJhaW50cyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xuICB9XG5cbiAgZ2V0IHZhbGlkQXV0b21hdGlvbnMgKCkge1xuICAgIHJldHVybiBhdXRvbWF0aW9uTmFtZXM7XG4gIH1cblxuICAvLyBtZXRob2QgcmVxdWlyZWQgYnkgTUpTT05XUCBpbiBvcmRlciB0byBkZXRlcm1pbmUgd2hldGhlciBpdCBzaG91bGRcbiAgLy8gcmVzcG9uZCB3aXRoIGFuIGludmFsaWQgc2Vzc2lvbiByZXNwb25zZVxuICBzZXNzaW9uRXhpc3RzIChzZXNzaW9uSWQpIHtcbiAgICBpZiAoIXNlc3Npb25JZCkgcmV0dXJuIGZhbHNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XG4gICAgcmV0dXJuIHNlc3Npb25JZCA9PT0gdGhpcy5zZXNzaW9uSWQ7XG4gIH1cblxuICAvLyBtZXRob2QgcmVxdWlyZWQgYnkgTUpTT05XUCBpbiBvcmRlciB0byBkZXRlcm1pbmUgaWYgdGhlIGNvbW1hbmQgc2hvdWxkXG4gIC8vIGJlIHByb3hpZWQgZGlyZWN0bHkgdG8gdGhlIGRyaXZlclxuICBkcml2ZXJGb3JTZXNzaW9uICgvKnNlc3Npb25JZCovKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsb2dFeHRyYUNhcHMgKGNhcHMpIHtcbiAgICBsZXQgZXh0cmFDYXBzID0gXy5kaWZmZXJlbmNlKF8ua2V5cyhjYXBzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ua2V5cyh0aGlzLl9jb25zdHJhaW50cykpO1xuICAgIGlmIChleHRyYUNhcHMubGVuZ3RoKSB7XG4gICAgICBsb2cud2FybihgVGhlIGZvbGxvd2luZyBjYXBhYmlsaXRpZXMgd2VyZSBwcm92aWRlZCwgYnV0IGFyZSBub3QgYCArXG4gICAgICAgICAgICAgICBgcmVjb2duaXplZCBieSBhcHBpdW06ICR7ZXh0cmFDYXBzLmpvaW4oJywgJyl9LmApO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRGVzaXJlZENhcHMgKGNhcHMpIHtcbiAgICBpZiAoIXRoaXMuc2hvdWxkVmFsaWRhdGVDYXBzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdmFsaWRhdGVDYXBzKGNhcHMsIHRoaXMuX2NvbnN0cmFpbnRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhuZXcgZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IoYFRoZSBkZXNpcmVkQ2FwYWJpbGl0aWVzIG9iamVjdCB3YXMgbm90IHZhbGlkIGZvciB0aGUgYCArXG4gICAgICAgICAgICAgICAgICAgIGBmb2xsb3dpbmcgcmVhc29uKHMpOiAke2UubWVzc2FnZX1gKSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dFeHRyYUNhcHMoY2Fwcyk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBEUklWRVJfUFJPVE9DT0wgPSB7XG4gICAgVzNDOiAnVzNDJyxcbiAgICBNSlNPTldQOiAnTUpTT05XUCcsXG4gIH07XG5cbiAgaXNNanNvbndwUHJvdG9jb2wgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3RvY29sID09PSBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQO1xuICB9XG5cbiAgaXNXM0NQcm90b2NvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9jb2wgPT09IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQztcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGNyZWF0ZVNlc3Npb24gaW5wdXRzIHRvIHNlZSBpZiB0aGlzIGlzIGEgVzNDIFNlc3Npb24gb3IgYSBNSlNPTldQIFNlc3Npb25cbiAgICovXG4gIHN0YXRpYyBkZXRlcm1pbmVQcm90b2NvbCAoZGVzaXJlZENhcGFiaWxpdGllcywgcmVxdWlyZWRDYXBhYmlsaXRpZXMsIGNhcGFiaWxpdGllcykge1xuICAgIHJldHVybiBfLmlzUGxhaW5PYmplY3QoY2FwYWJpbGl0aWVzKSA/XG4gICAgICBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MgOlxuICAgICAgQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuTUpTT05XUDtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgdGhlIG1haW4gY29tbWFuZCBoYW5kbGVyIGZvciB0aGUgZHJpdmVyLiBJdCB3cmFwcyBjb21tYW5kXG4gIC8vIGV4ZWN1dGlvbiB3aXRoIHRpbWVvdXQgbG9naWMsIGNoZWNraW5nIHRoYXQgd2UgaGF2ZSBhIHZhbGlkIHNlc3Npb24sXG4gIC8vIGFuZCBlbnN1cmluZyB0aGF0IHdlIGV4ZWN1dGUgY29tbWFuZHMgb25lIGF0IGEgdGltZS4gVGhpcyBtZXRob2QgaXMgY2FsbGVkXG4gIC8vIGJ5IE1KU09OV1AncyBleHByZXNzIHJvdXRlci5cbiAgYXN5bmMgZXhlY3V0ZUNvbW1hbmQgKGNtZCwgLi4uYXJncykge1xuICAgIC8vIGdldCBzdGFydCB0aW1lIGZvciB0aGlzIGNvbW1hbmQsIGFuZCBsb2cgaW4gc3BlY2lhbCBjYXNlc1xuICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmIChjbWQgPT09ICdjcmVhdGVTZXNzaW9uJykge1xuICAgICAgLy8gSWYgY3JlYXRpbmcgYSBzZXNzaW9uIGRldGVybWluZSBpZiBXM0Mgb3IgTUpTT05XUCBwcm90b2NvbCB3YXMgcmVxdWVzdGVkIGFuZCByZW1lbWJlciB0aGUgY2hvaWNlXG4gICAgICB0aGlzLnByb3RvY29sID0gQmFzZURyaXZlci5kZXRlcm1pbmVQcm90b2NvbCguLi5hcmdzKTtcbiAgICAgIHRoaXMubG9nRXZlbnQoRVZFTlRfU0VTU0lPTl9JTklUKTtcbiAgICB9IGVsc2UgaWYgKGNtZCA9PT0gJ2RlbGV0ZVNlc3Npb24nKSB7XG4gICAgICB0aGlzLmxvZ0V2ZW50KEVWRU5UX1NFU1NJT05fUVVJVF9TVEFSVCk7XG4gICAgfVxuXG4gICAgLy8gaWYgd2UgaGFkIGEgY29tbWFuZCB0aW1lciBydW5uaW5nLCBjbGVhciBpdCBub3cgdGhhdCB3ZSdyZSBzdGFydGluZ1xuICAgIC8vIGEgbmV3IGNvbW1hbmQgYW5kIHNvIGRvbid0IHdhbnQgdG8gdGltZSBvdXRcbiAgICB0aGlzLmNsZWFyTmV3Q29tbWFuZFRpbWVvdXQoKTtcblxuICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgdGhpcyBjb21tYW5kLCBpdCBtdXN0IG5vdCBiZSBpbXBsZW1lbnRlZFxuICAgIGlmICghdGhpc1tjbWRdKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLk5vdFlldEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzO1xuICAgIGlmICh0aGlzLmlzQ29tbWFuZHNRdWV1ZUVuYWJsZWQpIHtcbiAgICAgIC8vIFdoYXQgd2UncmUgZG9pbmcgaGVyZSBpcyBwcmV0dHkgY2xldmVyLiB0aGlzLmN1ckNvbW1hbmQgaXMgYWx3YXlzXG4gICAgICAvLyBhIHByb21pc2UgcmVwcmVzZW50aW5nIHRoZSBjb21tYW5kIGN1cnJlbnRseSBiZWluZyBleGVjdXRlZCBieSB0aGVcbiAgICAgIC8vIGRyaXZlciwgb3IgdGhlIGxhc3QgY29tbWFuZCBleGVjdXRlZCBieSB0aGUgZHJpdmVyIChpdCBzdGFydHMgb2ZmIGFzXG4gICAgICAvLyBlc3NlbnRpYWxseSBhIHByZS1yZXNvbHZlZCBwcm9taXNlKS4gV2hlbiBhIGNvbW1hbmQgY29tZXMgaW4sIHdlIHRhY2sgaXRcbiAgICAgIC8vIHRvIHRoZSBlbmQgb2YgdGhpcy5jdXJDb21tYW5kLCBlc3NlbnRpYWxseSBzYXlpbmcgd2Ugd2FudCB0byBleGVjdXRlIGl0XG4gICAgICAvLyB3aGVuZXZlciB0aGlzLmN1ckNvbW1hbmQgaXMgZG9uZS4gV2UgY2FsbCB0aGlzIG5ldyBwcm9taXNlIG5leHRDb21tYW5kLFxuICAgICAgLy8gYW5kIGl0cyByZXNvbHV0aW9uIGlzIHdoYXQgd2UgdWx0aW1hdGVseSB3aWxsIHJldHVybiB0byB3aG9tZXZlciBjYWxsZWRcbiAgICAgIC8vIHVzLiBNZWFud2hpbGUsIHdlIHJlc2V0IHRoaXMuY3VyQ29tbWFuZCB0byBfYmVfIG5leHRDb21tYW5kIChidXRcbiAgICAgIC8vIGlnbm9yaW5nIGFueSByZWplY3Rpb25zKSwgc28gdGhhdCBpZiBhbm90aGVyIGNvbW1hbmQgY29tZXMgaW50byB0aGVcbiAgICAgIC8vIHNlcnZlciwgaXQgZ2V0cyB0YWNrZWQgb24gdG8gdGhlIGVuZCBvZiBuZXh0Q29tbWFuZC4gVGh1cyB3ZSBjcmVhdGVcbiAgICAgIC8vIGEgY2hhaW4gb2YgcHJvbWlzZXMgdGhhdCBhY3RzIGFzIGEgcXVldWUgd2l0aCBzaW5nbGUgY29uY3VycmVuY3kuXG4gICAgICBsZXQgbmV4dENvbW1hbmQgPSB0aGlzLmN1ckNvbW1hbmQudGhlbigoKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tdGhlblxuICAgICAgICAvLyBpZiB3ZSB1bmV4cGVjdGVkbHkgc2h1dCBkb3duLCB3ZSBuZWVkIHRvIHJlamVjdCBldmVyeSBjb21tYW5kIGluXG4gICAgICAgIC8vIHRoZSBxdWV1ZSBiZWZvcmUgd2UgYWN0dWFsbHkgdHJ5IHRvIHJ1biBpdFxuICAgICAgICBpZiAodGhpcy5zaHV0ZG93blVuZXhwZWN0ZWRseSkge1xuICAgICAgICAgIHJldHVybiBCLnJlamVjdChuZXcgZXJyb3JzLk5vU3VjaERyaXZlckVycm9yKCdUaGUgZHJpdmVyIHdhcyB1bmV4cGVjdGVkbHkgc2h1dCBkb3duIScpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gdHVybiB0aGUgY29tbWFuZCBpbnRvIGEgY2FuY2VsbGFibGUgcHJvbWlzZSBzbyBpZiB3ZVxuICAgICAgICAvLyBoYXZlIGFuIHVuZXhwZWN0ZWQgc2h1dGRvd24gZXZlbnQsIGZvciBleGFtcGxlLCB3ZSBjYW4gY2FuY2VsIGl0IGZyb21cbiAgICAgICAgLy8gb3V0c2lkZSwgcmVqZWN0aW5nIHRoZSBjdXJyZW50IGNvbW1hbmQgaW1tZWRpYXRlbHlcbiAgICAgICAgdGhpcy5jdXJDb21tYW5kQ2FuY2VsbGFibGUgPSBuZXcgQigocikgPT4geyByKCk7IH0pLnRoZW4oKCkgPT4geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLXRoZW5cbiAgICAgICAgICByZXR1cm4gdGhpc1tjbWRdKC4uLmFyZ3MpO1xuICAgICAgICB9KS5jYW5jZWxsYWJsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJDb21tYW5kQ2FuY2VsbGFibGU7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY3VyQ29tbWFuZCA9IG5leHRDb21tYW5kLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIHJlcyA9IGF3YWl0IG5leHRDb21tYW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zaHV0ZG93blVuZXhwZWN0ZWRseSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLk5vU3VjaERyaXZlckVycm9yKCdUaGUgZHJpdmVyIHdhcyB1bmV4cGVjdGVkbHkgc2h1dCBkb3duIScpO1xuICAgICAgfVxuICAgICAgcmVzID0gYXdhaXQgdGhpc1tjbWRdKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGhhdmUgc2V0IGEgbmV3IGNvbW1hbmQgdGltZW91dCAod2hpY2ggaXMgdGhlIGRlZmF1bHQpLCBzdGFydCBhXG4gICAgLy8gdGltZXIgb25jZSB3ZSd2ZSBmaW5pc2hlZCBleGVjdXRpbmcgdGhpcyBjb21tYW5kLiBJZiB3ZSBkb24ndCBjbGVhclxuICAgIC8vIHRoZSB0aW1lciAod2hpY2ggaXMgZG9uZSB3aGVuIGEgbmV3IGNvbW1hbmQgY29tZXMgaW4pLCB3ZSB3aWxsIHRyaWdnZXJcbiAgICAvLyBhdXRvbWF0aWMgc2Vzc2lvbiBkZWxldGlvbiBpbiB0aGlzLm9uQ29tbWFuZFRpbWVvdXQuIE9mIGNvdXJzZSB3ZSBkb24ndFxuICAgIC8vIHdhbnQgdG8gdHJpZ2dlciB0aGUgdGltZXIgd2hlbiB0aGUgdXNlciBpcyBzaHV0dGluZyBkb3duIHRoZSBzZXNzaW9uXG4gICAgLy8gaW50ZW50aW9uYWxseVxuICAgIGlmIChjbWQgIT09ICdkZWxldGVTZXNzaW9uJykge1xuICAgICAgLy8gcmVzZXRpbmcgZXhpc3RpbmcgdGltZW91dFxuICAgICAgdGhpcy5zdGFydE5ld0NvbW1hbmRUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgLy8gbG9nIHRpbWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIGNvbW1hbmRcbiAgICBsZXQgZW5kVGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5fZXZlbnRIaXN0b3J5LmNvbW1hbmRzLnB1c2goe2NtZCwgc3RhcnRUaW1lLCBlbmRUaW1lfSk7XG4gICAgaWYgKGNtZCA9PT0gJ2NyZWF0ZVNlc3Npb24nKSB7XG4gICAgICB0aGlzLmxvZ0V2ZW50KEVWRU5UX1NFU1NJT05fU1RBUlQpO1xuICAgIH0gZWxzZSBpZiAoY21kID09PSAnZGVsZXRlU2Vzc2lvbicpIHtcbiAgICAgIHRoaXMubG9nRXZlbnQoRVZFTlRfU0VTU0lPTl9RVUlUX0RPTkUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBzdGFydFVuZXhwZWN0ZWRTaHV0ZG93biAoZXJyID0gbmV3IGVycm9ycy5Ob1N1Y2hEcml2ZXJFcnJvcignVGhlIGRyaXZlciB3YXMgdW5leHBlY3RlZGx5IHNodXQgZG93biEnKSkge1xuICAgIHRoaXMudW5leHBlY3RlZFNodXRkb3duRGVmZXJyZWQucmVqZWN0KGVycik7IC8vIGFsbG93IG90aGVycyB0byBsaXN0ZW4gZm9yIHRoaXNcbiAgICB0aGlzLnNodXRkb3duVW5leHBlY3RlZGx5ID0gdHJ1ZTtcbiAgICBhd2FpdCB0aGlzLmRlbGV0ZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xuICAgIHRoaXMuc2h1dGRvd25VbmV4cGVjdGVkbHkgPSBmYWxzZTtcbiAgICB0aGlzLmN1ckNvbW1hbmRDYW5jZWxsYWJsZS5jYW5jZWwoZXJyKTtcbiAgfVxuXG4gIHZhbGlkYXRlTG9jYXRvclN0cmF0ZWd5IChzdHJhdGVneSwgd2ViQ29udGV4dCA9IGZhbHNlKSB7XG4gICAgbGV0IHZhbGlkU3RyYXRlZ2llcyA9IHRoaXMubG9jYXRvclN0cmF0ZWdpZXM7XG4gICAgbG9nLmRlYnVnKGBWYWxpZCBsb2NhdG9yIHN0cmF0ZWdpZXMgZm9yIHRoaXMgcmVxdWVzdDogJHt2YWxpZFN0cmF0ZWdpZXMuam9pbignLCAnKX1gKTtcblxuICAgIGlmICh3ZWJDb250ZXh0KSB7XG4gICAgICB2YWxpZFN0cmF0ZWdpZXMgPSB2YWxpZFN0cmF0ZWdpZXMuY29uY2F0KHRoaXMud2ViTG9jYXRvclN0cmF0ZWdpZXMpO1xuICAgIH1cblxuICAgIGlmICghXy5pbmNsdWRlcyh2YWxpZFN0cmF0ZWdpZXMsIHN0cmF0ZWd5KSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5JbnZhbGlkU2VsZWN0b3JFcnJvcihgTG9jYXRvciBTdHJhdGVneSAnJHtzdHJhdGVneX0nIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHRoaXMgc2Vzc2lvbmApO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIFJlc3RhcnQgdGhlIHNlc3Npb24gd2l0aCB0aGUgb3JpZ2luYWwgY2FwcyxcbiAgICogcHJlc2VydmluZyB0aGUgdGltZW91dCBjb25maWcuXG4gICAqL1xuICBhc3luYyByZXNldCAoKSB7XG4gICAgbG9nLmRlYnVnKCdSZXNldHRpbmcgYXBwIG1pZC1zZXNzaW9uJyk7XG4gICAgbG9nLmRlYnVnKCdSdW5uaW5nIGdlbmVyaWMgZnVsbCByZXNldCcpO1xuXG4gICAgLy8gcHJlc2VydmluZyBzdGF0ZVxuICAgIGxldCBjdXJyZW50Q29uZmlnID0ge307XG4gICAgZm9yIChsZXQgcHJvcGVydHkgb2YgWydpbXBsaWNpdFdhaXRNcycsICduZXdDb21tYW5kVGltZW91dE1zJywgJ3Nlc3Npb25JZCcsICdyZXNldE9uVW5leHBlY3RlZFNodXRkb3duJ10pIHtcbiAgICAgIGN1cnJlbnRDb25maWdbcHJvcGVydHldID0gdGhpc1twcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgLy8gV2UgYWxzbyBuZWVkIHRvIHByZXNlcnZlIHRoZSB1bmV4cGVjdGVkIHNodXRkb3duLCBhbmQgbWFrZSBzdXJlIGl0IGlzIG5vdCBjYW5jZWxsZWQgZHVyaW5nIHJlc2V0LlxuICAgIHRoaXMucmVzZXRPblVuZXhwZWN0ZWRTaHV0ZG93biA9ICgpID0+IHt9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XG4gICAgICBsb2cuZGVidWcoJ1Jlc3RhcnRpbmcgYXBwJyk7XG4gICAgICBhd2FpdCB0aGlzLmNyZWF0ZVNlc3Npb24odGhpcy5jYXBzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgLy8gYWx3YXlzIHJlc3RvcmUgc3RhdGUuXG4gICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgXy50b1BhaXJzKGN1cnJlbnRDb25maWcpKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsZWFyTmV3Q29tbWFuZFRpbWVvdXQoKTtcbiAgfVxuXG4gIGFzeW5jIGdldFN3aXBlT3B0aW9ucyAoZ2VzdHVyZXMsIHRvdWNoQ291bnQgPSAxKSB7XG4gICAgbGV0IHN0YXJ0WCA9ICB0aGlzLmhlbHBlcnMuZ2V0Q29vcmREZWZhdWx0KGdlc3R1cmVzWzBdLm9wdGlvbnMueCksXG4gICAgICAgIHN0YXJ0WSA9IHRoaXMuaGVscGVycy5nZXRDb29yZERlZmF1bHQoZ2VzdHVyZXNbMF0ub3B0aW9ucy55KSxcbiAgICAgICAgZW5kWCA9IHRoaXMuaGVscGVycy5nZXRDb29yZERlZmF1bHQoZ2VzdHVyZXNbMl0ub3B0aW9ucy54KSxcbiAgICAgICAgZW5kWSA9IHRoaXMuaGVscGVycy5nZXRDb29yZERlZmF1bHQoZ2VzdHVyZXNbMl0ub3B0aW9ucy55KSxcbiAgICAgICAgZHVyYXRpb24gPSB0aGlzLmhlbHBlcnMuZ2V0U3dpcGVUb3VjaER1cmF0aW9uKGdlc3R1cmVzWzFdKSxcbiAgICAgICAgZWxlbWVudCA9IGdlc3R1cmVzWzBdLm9wdGlvbnMuZWxlbWVudCxcbiAgICAgICAgZGVzdEVsZW1lbnQgPSBnZXN0dXJlc1syXS5vcHRpb25zLmVsZW1lbnQgfHwgZ2VzdHVyZXNbMF0ub3B0aW9ucy5lbGVtZW50O1xuXG4gICAgLy8gdGhlcmUncyBubyBkZXN0aW5hdGlvbiBlbGVtZW50IGhhbmRsaW5nIGluIGJvb3RzdHJhcCBhbmQgc2luY2UgaXQgYXBwbGllcyB0byBhbGwgcGxhdGZvcm1zLCB3ZSBoYW5kbGUgaXQgaGVyZVxuICAgIGlmICh1dGlsLmhhc1ZhbHVlKGRlc3RFbGVtZW50KSkge1xuICAgICAgbGV0IGxvY1Jlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0TG9jYXRpb25JblZpZXcoZGVzdEVsZW1lbnQpO1xuICAgICAgbGV0IHNpemVSZXN1bHQgPSBhd2FpdCB0aGlzLmdldFNpemUoZGVzdEVsZW1lbnQpO1xuICAgICAgbGV0IG9mZnNldFggPSAoTWF0aC5hYnMoZW5kWCkgPCAxICYmIE1hdGguYWJzKGVuZFgpID4gMCkgPyBzaXplUmVzdWx0LndpZHRoICogZW5kWCA6IGVuZFg7XG4gICAgICBsZXQgb2Zmc2V0WSA9IChNYXRoLmFicyhlbmRZKSA8IDEgJiYgTWF0aC5hYnMoZW5kWSkgPiAwKSA/IHNpemVSZXN1bHQuaGVpZ2h0ICogZW5kWSA6IGVuZFk7XG4gICAgICBlbmRYID0gbG9jUmVzdWx0LnggKyBvZmZzZXRYO1xuICAgICAgZW5kWSA9IGxvY1Jlc3VsdC55ICsgb2Zmc2V0WTtcbiAgICAgIC8vIGlmIHRoZSB0YXJnZXQgZWxlbWVudCB3YXMgcHJvdmlkZWQsIHRoZSBjb29yZGluYXRlcyBmb3IgdGhlIGRlc3RpbmF0aW9uIG5lZWQgdG8gYmUgcmVsYXRpdmUgdG8gaXQuXG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZShlbGVtZW50KSkge1xuICAgICAgICBsZXQgZmlyc3RFbExvY2F0aW9uID0gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbkluVmlldyhlbGVtZW50KTtcbiAgICAgICAgZW5kWCAtPSBmaXJzdEVsTG9jYXRpb24ueDtcbiAgICAgICAgZW5kWSAtPSBmaXJzdEVsTG9jYXRpb24ueTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY2xpZW50cyBhcmUgcmVzcG9uc2libGUgdG8gdXNlIHRoZXNlIG9wdGlvbnMgY29ycmVjdGx5XG4gICAgcmV0dXJuIHtzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZHVyYXRpb24sIHRvdWNoQ291bnQsIGVsZW1lbnR9O1xuICB9XG5cbiAgcHJveHlBY3RpdmUgKC8qIHNlc3Npb25JZCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0ICgvKiBzZXNzaW9uSWQgKi8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjYW5Qcm94eSAoLyogc2Vzc2lvbklkICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkTWFuYWdlZERyaXZlciAoZHJpdmVyKSB7XG4gICAgdGhpcy5tYW5hZ2VkRHJpdmVycy5wdXNoKGRyaXZlcik7XG4gIH1cblxuICBnZXRNYW5hZ2VkRHJpdmVycyAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFuYWdlZERyaXZlcnM7XG4gIH1cbn1cblxuZm9yIChsZXQgW2NtZCwgZm5dIG9mIF8udG9QYWlycyhjb21tYW5kcykpIHtcbiAgQmFzZURyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlRHJpdmVyO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9

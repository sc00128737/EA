'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var mjsonwpLog = _appiumSupport.logger.getLogger('MJSONWP');
var w3cLog = _appiumSupport.logger.getLogger('W3C');

// base error class for all of our errors

var ProtocolError = (function (_ES6Error) {
  _inherits(ProtocolError, _ES6Error);

  function ProtocolError(msg, jsonwpCode, w3cStatus, error) {
    _classCallCheck(this, ProtocolError);

    _get(Object.getPrototypeOf(ProtocolError.prototype), 'constructor', this).call(this, msg);
    this.jsonwpCode = jsonwpCode;
    this.error = error || 'An unknown error has occurred';
    if (this.jsonwpCode === null) {
      this.jsonwpCode = 13;
    }
    this.w3cStatus = w3cStatus || _httpStatusCodes2['default'].BAD_REQUEST;
  }

  return ProtocolError;
})(_es6Error2['default']);

var NoSuchDriverError = (function (_ProtocolError) {
  _inherits(NoSuchDriverError, _ProtocolError);

  _createClass(NoSuchDriverError, null, [{
    key: 'code',
    value: function code() {
      return 6;
    }

    // W3C Error is called InvalidSessionID
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].NOT_FOUND;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'invalid session id';
    }
  }]);

  function NoSuchDriverError(err) {
    _classCallCheck(this, NoSuchDriverError);

    _get(Object.getPrototypeOf(NoSuchDriverError.prototype), 'constructor', this).call(this, err || 'A session is either terminated or not started', NoSuchDriverError.code(), NoSuchDriverError.w3cStatus(), NoSuchDriverError.error());
  }

  return NoSuchDriverError;
})(ProtocolError);

var NoSuchElementError = (function (_ProtocolError2) {
  _inherits(NoSuchElementError, _ProtocolError2);

  _createClass(NoSuchElementError, null, [{
    key: 'code',
    value: function code() {
      return 7;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].NOT_FOUND;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'no such element';
    }
  }]);

  function NoSuchElementError(err) {
    _classCallCheck(this, NoSuchElementError);

    _get(Object.getPrototypeOf(NoSuchElementError.prototype), 'constructor', this).call(this, err || 'An element could not be located on the page using the given ' + 'search parameters.', NoSuchElementError.code(), NoSuchElementError.w3cStatus(), NoSuchElementError.error());
  }

  return NoSuchElementError;
})(ProtocolError);

var NoSuchFrameError = (function (_ProtocolError3) {
  _inherits(NoSuchFrameError, _ProtocolError3);

  _createClass(NoSuchFrameError, null, [{
    key: 'code',
    value: function code() {
      return 8;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'no such frame';
    }
  }]);

  function NoSuchFrameError(err) {
    _classCallCheck(this, NoSuchFrameError);

    _get(Object.getPrototypeOf(NoSuchFrameError.prototype), 'constructor', this).call(this, err || 'A request to switch to a frame could not be satisfied because ' + 'the frame could not be found.', NoSuchFrameError.code(), null, NoSuchFrameError.error());
  }

  return NoSuchFrameError;
})(ProtocolError);

var UnknownCommandError = (function (_ProtocolError4) {
  _inherits(UnknownCommandError, _ProtocolError4);

  _createClass(UnknownCommandError, null, [{
    key: 'code',
    value: function code() {
      return 9;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].NOT_FOUND;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unknown command';
    }
  }]);

  function UnknownCommandError(err) {
    _classCallCheck(this, UnknownCommandError);

    _get(Object.getPrototypeOf(UnknownCommandError.prototype), 'constructor', this).call(this, err || 'The requested resource could not be found, or a request was ' + 'received using an HTTP method that is not supported by the mapped ' + 'resource.', UnknownCommandError.code(), UnknownCommandError.w3cStatus(), UnknownCommandError.error());
  }

  return UnknownCommandError;
})(ProtocolError);

var StaleElementReferenceError = (function (_ProtocolError5) {
  _inherits(StaleElementReferenceError, _ProtocolError5);

  _createClass(StaleElementReferenceError, null, [{
    key: 'code',
    value: function code() {
      return 10;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'stale element reference';
    }
  }]);

  function StaleElementReferenceError(err) {
    _classCallCheck(this, StaleElementReferenceError);

    _get(Object.getPrototypeOf(StaleElementReferenceError.prototype), 'constructor', this).call(this, err || 'An element command failed because the referenced element is no ' + 'longer attached to the DOM.', StaleElementReferenceError.code(), null, StaleElementReferenceError.error());
  }

  return StaleElementReferenceError;
})(ProtocolError);

var ElementNotVisibleError = (function (_ProtocolError6) {
  _inherits(ElementNotVisibleError, _ProtocolError6);

  _createClass(ElementNotVisibleError, null, [{
    key: 'code',
    value: function code() {
      return 11;
    }
  }]);

  function ElementNotVisibleError(err) {
    _classCallCheck(this, ElementNotVisibleError);

    _get(Object.getPrototypeOf(ElementNotVisibleError.prototype), 'constructor', this).call(this, err || 'An element command could not be completed because the element is ' + 'not visible on the page.', ElementNotVisibleError.code());
  }

  return ElementNotVisibleError;
})(ProtocolError);

var InvalidElementStateError = (function (_ProtocolError7) {
  _inherits(InvalidElementStateError, _ProtocolError7);

  _createClass(InvalidElementStateError, null, [{
    key: 'code',
    value: function code() {
      return 12;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'invalid element state';
    }
  }]);

  function InvalidElementStateError(err) {
    _classCallCheck(this, InvalidElementStateError);

    _get(Object.getPrototypeOf(InvalidElementStateError.prototype), 'constructor', this).call(this, err || 'An element command could not be completed because the element is ' + 'in an invalid state (e.g. attempting to click a disabled element).', InvalidElementStateError.code(), null, InvalidElementStateError.error());
  }

  return InvalidElementStateError;
})(ProtocolError);

var UnknownError = (function (_ProtocolError8) {
  _inherits(UnknownError, _ProtocolError8);

  _createClass(UnknownError, null, [{
    key: 'code',
    value: function code() {
      return 13;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unknown error';
    }
  }]);

  function UnknownError(originalError) {
    _classCallCheck(this, UnknownError);

    var origMessage = originalError;
    if (originalError instanceof Error) {
      origMessage = originalError.message;
    }
    var message = 'An unknown server-side error occurred while processing ' + 'the command.';
    if (originalError) {
      message = message + ' Original error: ' + origMessage;
    }

    _get(Object.getPrototypeOf(UnknownError.prototype), 'constructor', this).call(this, message, UnknownError.code(), UnknownError.w3cStatus(), UnknownError.error());
  }

  return UnknownError;
})(ProtocolError);

var UnknownMethodError = (function (_ProtocolError9) {
  _inherits(UnknownMethodError, _ProtocolError9);

  _createClass(UnknownMethodError, null, [{
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].METHOD_NOT_ALLOWED;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unknown method';
    }
  }]);

  function UnknownMethodError(err) {
    _classCallCheck(this, UnknownMethodError);

    _get(Object.getPrototypeOf(UnknownMethodError.prototype), 'constructor', this).call(this, err || 'The requested command matched a known URL but did not match an method for that URL', null, UnknownMethodError.w3cStatus(), UnknownMethodError.error());
  }

  return UnknownMethodError;
})(ProtocolError);

var UnsupportedOperationError = (function (_ProtocolError10) {
  _inherits(UnsupportedOperationError, _ProtocolError10);

  _createClass(UnsupportedOperationError, null, [{
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unsupported operation';
    }
  }]);

  function UnsupportedOperationError(err) {
    _classCallCheck(this, UnsupportedOperationError);

    _get(Object.getPrototypeOf(UnsupportedOperationError.prototype), 'constructor', this).call(this, err || 'A server-side error occurred. Command cannot be supported.', null, UnsupportedOperationError.w3cStatus(), UnsupportedOperationError.error());
  }

  return UnsupportedOperationError;
})(ProtocolError);

var ElementIsNotSelectableError = (function (_ProtocolError11) {
  _inherits(ElementIsNotSelectableError, _ProtocolError11);

  _createClass(ElementIsNotSelectableError, null, [{
    key: 'code',
    value: function code() {
      return 15;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'element not selectable';
    }
  }]);

  function ElementIsNotSelectableError(err) {
    _classCallCheck(this, ElementIsNotSelectableError);

    _get(Object.getPrototypeOf(ElementIsNotSelectableError.prototype), 'constructor', this).call(this, err || 'An attempt was made to select an element that cannot be selected.', ElementIsNotSelectableError.code(), null, ElementIsNotSelectableError.error());
  }

  return ElementIsNotSelectableError;
})(ProtocolError);

var ElementClickInterceptedError = (function (_ProtocolError12) {
  _inherits(ElementClickInterceptedError, _ProtocolError12);

  _createClass(ElementClickInterceptedError, null, [{
    key: 'error',
    value: function error() {
      return 'element click intercepted';
    }
  }]);

  function ElementClickInterceptedError(err) {
    _classCallCheck(this, ElementClickInterceptedError);

    _get(Object.getPrototypeOf(ElementClickInterceptedError.prototype), 'constructor', this).call(this, err || 'The Element Click command could not be completed because the element receiving the events is obscuring the element that was requested clicked', ElementIsNotSelectableError.code(), null, ElementClickInterceptedError.error());
  }

  return ElementClickInterceptedError;
})(ProtocolError);

var ElementNotInteractableError = (function (_ProtocolError13) {
  _inherits(ElementNotInteractableError, _ProtocolError13);

  _createClass(ElementNotInteractableError, null, [{
    key: 'error',
    value: function error() {
      return 'element not interactable';
    }
  }]);

  function ElementNotInteractableError(err) {
    _classCallCheck(this, ElementNotInteractableError);

    _get(Object.getPrototypeOf(ElementNotInteractableError.prototype), 'constructor', this).call(this, err || 'A command could not be completed because the element is not pointer- or keyboard interactable', ElementIsNotSelectableError.code(), null, ElementNotInteractableError.error());
  }

  return ElementNotInteractableError;
})(ProtocolError);

var InsecureCertificateError = (function (_ProtocolError14) {
  _inherits(InsecureCertificateError, _ProtocolError14);

  _createClass(InsecureCertificateError, null, [{
    key: 'error',
    value: function error() {
      return 'insecure certificate';
    }
  }]);

  function InsecureCertificateError(err) {
    _classCallCheck(this, InsecureCertificateError);

    _get(Object.getPrototypeOf(InsecureCertificateError.prototype), 'constructor', this).call(this, err || 'Navigation caused the user agent to hit a certificate warning, which is usually the result of an expired or invalid TLS certificate', ElementIsNotSelectableError.code(), null, InsecureCertificateError.error());
  }

  return InsecureCertificateError;
})(ProtocolError);

var JavaScriptError = (function (_ProtocolError15) {
  _inherits(JavaScriptError, _ProtocolError15);

  _createClass(JavaScriptError, null, [{
    key: 'code',
    value: function code() {
      return 17;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'javascript error';
    }
  }]);

  function JavaScriptError(err) {
    _classCallCheck(this, JavaScriptError);

    _get(Object.getPrototypeOf(JavaScriptError.prototype), 'constructor', this).call(this, err || 'An error occurred while executing user supplied JavaScript.', JavaScriptError.code(), JavaScriptError.w3cStatus(), JavaScriptError.error());
  }

  return JavaScriptError;
})(ProtocolError);

var XPathLookupError = (function (_ProtocolError16) {
  _inherits(XPathLookupError, _ProtocolError16);

  _createClass(XPathLookupError, null, [{
    key: 'code',
    value: function code() {
      return 19;
    }
  }]);

  function XPathLookupError(err) {
    _classCallCheck(this, XPathLookupError);

    _get(Object.getPrototypeOf(XPathLookupError.prototype), 'constructor', this).call(this, err || 'An error occurred while searching for an element by XPath.', XPathLookupError.code());
  }

  return XPathLookupError;
})(ProtocolError);

var TimeoutError = (function (_ProtocolError17) {
  _inherits(TimeoutError, _ProtocolError17);

  _createClass(TimeoutError, null, [{
    key: 'code',
    value: function code() {
      return 21;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].REQUEST_TIMEOUT;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'timeout';
    }
  }]);

  function TimeoutError(err) {
    _classCallCheck(this, TimeoutError);

    _get(Object.getPrototypeOf(TimeoutError.prototype), 'constructor', this).call(this, err || 'An operation did not complete before its timeout expired.', TimeoutError.code(), TimeoutError.w3cStatus(), TimeoutError.error());
  }

  return TimeoutError;
})(ProtocolError);

var NoSuchWindowError = (function (_ProtocolError18) {
  _inherits(NoSuchWindowError, _ProtocolError18);

  _createClass(NoSuchWindowError, null, [{
    key: 'code',
    value: function code() {
      return 23;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'no such window';
    }
  }]);

  function NoSuchWindowError(err) {
    _classCallCheck(this, NoSuchWindowError);

    _get(Object.getPrototypeOf(NoSuchWindowError.prototype), 'constructor', this).call(this, err || 'A request to switch to a different window could not be satisfied ' + 'because the window could not be found.', NoSuchWindowError.code(), null, NoSuchWindowError.error());
  }

  return NoSuchWindowError;
})(ProtocolError);

var InvalidArgumentError = (function (_ProtocolError19) {
  _inherits(InvalidArgumentError, _ProtocolError19);

  _createClass(InvalidArgumentError, null, [{
    key: 'error',
    value: function error() {
      return 'invalid argument';
    }
  }]);

  function InvalidArgumentError(err) {
    _classCallCheck(this, InvalidArgumentError);

    _get(Object.getPrototypeOf(InvalidArgumentError.prototype), 'constructor', this).call(this, err || 'The arguments passed to the command are either invalid or malformed', null, null, BadParametersError.error());
  }

  return InvalidArgumentError;
})(ProtocolError);

var InvalidCookieDomainError = (function (_ProtocolError20) {
  _inherits(InvalidCookieDomainError, _ProtocolError20);

  _createClass(InvalidCookieDomainError, null, [{
    key: 'code',
    value: function code() {
      return 24;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'invalid cookie domain';
    }
  }]);

  function InvalidCookieDomainError(err) {
    _classCallCheck(this, InvalidCookieDomainError);

    _get(Object.getPrototypeOf(InvalidCookieDomainError.prototype), 'constructor', this).call(this, err || 'An illegal attempt was made to set a cookie under a different ' + 'domain than the current page.', InvalidCookieDomainError.code(), null, InvalidCookieDomainError.error());
  }

  return InvalidCookieDomainError;
})(ProtocolError);

var InvalidCoordinatesError = (function (_ProtocolError21) {
  _inherits(InvalidCoordinatesError, _ProtocolError21);

  _createClass(InvalidCoordinatesError, null, [{
    key: 'error',
    value: function error() {
      return 'invalid coordinates';
    }
  }]);

  function InvalidCoordinatesError(err) {
    _classCallCheck(this, InvalidCoordinatesError);

    _get(Object.getPrototypeOf(InvalidCoordinatesError.prototype), 'constructor', this).call(this, err || 'The coordinates provided to an interactions operation are invalid', ElementIsNotSelectableError.code(), null, InvalidCoordinatesError.error());
  }

  return InvalidCoordinatesError;
})(ProtocolError);

var NoSuchCookieError = (function (_ProtocolError22) {
  _inherits(NoSuchCookieError, _ProtocolError22);

  _createClass(NoSuchCookieError, null, [{
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].NOT_FOUND;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'no such cookie';
    }
  }]);

  function NoSuchCookieError(err) {
    _classCallCheck(this, NoSuchCookieError);

    _get(Object.getPrototypeOf(NoSuchCookieError.prototype), 'constructor', this).call(this, err || 'No cookie matching the given path name was found amongst the associated cookies of the current browsing context’s active document', null, NoSuchCookieError.w3cStatus(), NoSuchCookieError.error());
  }

  return NoSuchCookieError;
})(ProtocolError);

var UnableToSetCookieError = (function (_ProtocolError23) {
  _inherits(UnableToSetCookieError, _ProtocolError23);

  _createClass(UnableToSetCookieError, null, [{
    key: 'code',
    value: function code() {
      return 25;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unable to set cookie';
    }
  }]);

  function UnableToSetCookieError(err) {
    _classCallCheck(this, UnableToSetCookieError);

    _get(Object.getPrototypeOf(UnableToSetCookieError.prototype), 'constructor', this).call(this, err || 'A request to set a cookie\'s value could not be satisfied.', UnableToSetCookieError.code(), UnableToSetCookieError.w3cStatus(), UnableToSetCookieError.error());
  }

  return UnableToSetCookieError;
})(ProtocolError);

var UnexpectedAlertOpenError = (function (_ProtocolError24) {
  _inherits(UnexpectedAlertOpenError, _ProtocolError24);

  _createClass(UnexpectedAlertOpenError, null, [{
    key: 'code',
    value: function code() {
      return 26;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unexpected alert open';
    }
  }]);

  function UnexpectedAlertOpenError(err) {
    _classCallCheck(this, UnexpectedAlertOpenError);

    _get(Object.getPrototypeOf(UnexpectedAlertOpenError.prototype), 'constructor', this).call(this, err || 'A modal dialog was open, blocking this operation', UnexpectedAlertOpenError.code(), UnexpectedAlertOpenError.w3cStatus(), UnexpectedAlertOpenError.error());
  }

  return UnexpectedAlertOpenError;
})(ProtocolError);

var NoAlertOpenError = (function (_ProtocolError25) {
  _inherits(NoAlertOpenError, _ProtocolError25);

  _createClass(NoAlertOpenError, null, [{
    key: 'code',
    value: function code() {
      return 27;
    }
  }]);

  function NoAlertOpenError(err) {
    _classCallCheck(this, NoAlertOpenError);

    _get(Object.getPrototypeOf(NoAlertOpenError.prototype), 'constructor', this).call(this, err || 'An attempt was made to operate on a modal dialog when one ' + 'was not open.', NoAlertOpenError.code());
  }

  return NoAlertOpenError;
})(ProtocolError);

var ScriptTimeoutError = (function (_ProtocolError26) {
  _inherits(ScriptTimeoutError, _ProtocolError26);

  _createClass(ScriptTimeoutError, null, [{
    key: 'code',
    value: function code() {
      return 28;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].REQUEST_TIMEOUT;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'script timeout';
    }
  }]);

  function ScriptTimeoutError(err) {
    _classCallCheck(this, ScriptTimeoutError);

    _get(Object.getPrototypeOf(ScriptTimeoutError.prototype), 'constructor', this).call(this, err || 'A script did not complete before its timeout expired.', ScriptTimeoutError.code(), ScriptTimeoutError.w3cStatus(), ScriptTimeoutError.error());
  }

  return ScriptTimeoutError;
})(ProtocolError);

var InvalidElementCoordinatesError = (function (_ProtocolError27) {
  _inherits(InvalidElementCoordinatesError, _ProtocolError27);

  _createClass(InvalidElementCoordinatesError, null, [{
    key: 'code',
    value: function code() {
      return 29;
    }
  }]);

  function InvalidElementCoordinatesError(err) {
    _classCallCheck(this, InvalidElementCoordinatesError);

    _get(Object.getPrototypeOf(InvalidElementCoordinatesError.prototype), 'constructor', this).call(this, err || 'The coordinates provided to an interactions operation are invalid.', InvalidElementCoordinatesError.code());
  }

  return InvalidElementCoordinatesError;
})(ProtocolError);

var IMENotAvailableError = (function (_ProtocolError28) {
  _inherits(IMENotAvailableError, _ProtocolError28);

  _createClass(IMENotAvailableError, null, [{
    key: 'code',
    value: function code() {
      return 30;
    }
  }]);

  function IMENotAvailableError(err) {
    _classCallCheck(this, IMENotAvailableError);

    _get(Object.getPrototypeOf(IMENotAvailableError.prototype), 'constructor', this).call(this, err || 'IME was not available.', IMENotAvailableError.code());
  }

  return IMENotAvailableError;
})(ProtocolError);

var IMEEngineActivationFailedError = (function (_ProtocolError29) {
  _inherits(IMEEngineActivationFailedError, _ProtocolError29);

  _createClass(IMEEngineActivationFailedError, null, [{
    key: 'code',
    value: function code() {
      return 31;
    }
  }]);

  function IMEEngineActivationFailedError(err) {
    _classCallCheck(this, IMEEngineActivationFailedError);

    _get(Object.getPrototypeOf(IMEEngineActivationFailedError.prototype), 'constructor', this).call(this, err || 'An IME engine could not be started.', IMEEngineActivationFailedError.code());
  }

  return IMEEngineActivationFailedError;
})(ProtocolError);

var InvalidSelectorError = (function (_ProtocolError30) {
  _inherits(InvalidSelectorError, _ProtocolError30);

  _createClass(InvalidSelectorError, null, [{
    key: 'code',
    value: function code() {
      return 32;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'invalid selector';
    }
  }]);

  function InvalidSelectorError(err) {
    _classCallCheck(this, InvalidSelectorError);

    _get(Object.getPrototypeOf(InvalidSelectorError.prototype), 'constructor', this).call(this, err || 'Argument was an invalid selector (e.g. XPath/CSS).', InvalidSelectorError.code(), null, InvalidSelectorError.error());
  }

  return InvalidSelectorError;
})(ProtocolError);

var SessionNotCreatedError = (function (_ProtocolError31) {
  _inherits(SessionNotCreatedError, _ProtocolError31);

  _createClass(SessionNotCreatedError, null, [{
    key: 'code',
    value: function code() {
      return 33;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'session not created';
    }
  }]);

  function SessionNotCreatedError(details) {
    _classCallCheck(this, SessionNotCreatedError);

    var message = 'A new session could not be created.';
    if (details) {
      message += ' Details: ' + details;
    }

    _get(Object.getPrototypeOf(SessionNotCreatedError.prototype), 'constructor', this).call(this, message, SessionNotCreatedError.code(), SessionNotCreatedError.w3cStatus(), SessionNotCreatedError.error());
  }

  return SessionNotCreatedError;
})(ProtocolError);

var MoveTargetOutOfBoundsError = (function (_ProtocolError32) {
  _inherits(MoveTargetOutOfBoundsError, _ProtocolError32);

  _createClass(MoveTargetOutOfBoundsError, null, [{
    key: 'code',
    value: function code() {
      return 34;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'move target out of bounds';
    }
  }]);

  function MoveTargetOutOfBoundsError(err) {
    _classCallCheck(this, MoveTargetOutOfBoundsError);

    _get(Object.getPrototypeOf(MoveTargetOutOfBoundsError.prototype), 'constructor', this).call(this, err || 'Target provided for a move action is out of bounds.', MoveTargetOutOfBoundsError.code(), MoveTargetOutOfBoundsError.w3cStatus(), MoveTargetOutOfBoundsError.error());
  }

  return MoveTargetOutOfBoundsError;
})(ProtocolError);

var NoSuchAlertError = (function (_ProtocolError33) {
  _inherits(NoSuchAlertError, _ProtocolError33);

  _createClass(NoSuchAlertError, null, [{
    key: 'error',
    value: function error() {
      return 'no such alert';
    }
  }]);

  function NoSuchAlertError(err) {
    _classCallCheck(this, NoSuchAlertError);

    _get(Object.getPrototypeOf(NoSuchAlertError.prototype), 'constructor', this).call(this, err || 'The target for mouse interaction is not in the browser’s viewport and cannot be brought into that viewport', null, null, NoSuchAlertError.error());
  }

  return NoSuchAlertError;
})(ProtocolError);

var NoSuchContextError = (function (_ProtocolError34) {
  _inherits(NoSuchContextError, _ProtocolError34);

  _createClass(NoSuchContextError, null, [{
    key: 'code',
    value: function code() {
      return 35;
    }
  }]);

  function NoSuchContextError(err) {
    _classCallCheck(this, NoSuchContextError);

    _get(Object.getPrototypeOf(NoSuchContextError.prototype), 'constructor', this).call(this, err || 'No such context found.', NoSuchContextError.code());
  }

  return NoSuchContextError;
})(ProtocolError);

var InvalidContextError = (function (_ProtocolError35) {
  _inherits(InvalidContextError, _ProtocolError35);

  _createClass(InvalidContextError, null, [{
    key: 'code',
    value: function code() {
      return 36;
    }
  }]);

  function InvalidContextError(err) {
    _classCallCheck(this, InvalidContextError);

    _get(Object.getPrototypeOf(InvalidContextError.prototype), 'constructor', this).call(this, err || 'That command could not be executed in the current context.', InvalidContextError.code());
  }

  // This is an alias for UnknownMethodError
  return InvalidContextError;
})(ProtocolError);

var NotYetImplementedError = (function (_ProtocolError36) {
  _inherits(NotYetImplementedError, _ProtocolError36);

  _createClass(NotYetImplementedError, null, [{
    key: 'code',
    value: function code() {
      return 13;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].NOT_FOUND; // W3C equivalent is called 'Unknown Command' (A command could not be executed because the remote end is not aware of it)
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unknown method';
    }
  }]);

  function NotYetImplementedError(err) {
    _classCallCheck(this, NotYetImplementedError);

    _get(Object.getPrototypeOf(NotYetImplementedError.prototype), 'constructor', this).call(this, err || 'Method has not yet been implemented', NotYetImplementedError.code(), NotYetImplementedError.w3cStatus(), NotYetImplementedError.error());
  }

  return NotYetImplementedError;
})(ProtocolError);

var NotImplementedError = (function (_ProtocolError37) {
  _inherits(NotImplementedError, _ProtocolError37);

  _createClass(NotImplementedError, null, [{
    key: 'code',
    value: function code() {
      return 13;
    }
  }, {
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].METHOD_NOT_ALLOWED; // W3C equivalent is 'Unknown Method' (The requested command matched a known URL but did not match an method for that URL)
    }
  }]);

  function NotImplementedError(err) {
    _classCallCheck(this, NotImplementedError);

    _get(Object.getPrototypeOf(NotImplementedError.prototype), 'constructor', this).call(this, err || 'Method is not implemented', NotImplementedError.code());
  }

  return NotImplementedError;
})(ProtocolError);

var UnableToCaptureScreen = (function (_ProtocolError38) {
  _inherits(UnableToCaptureScreen, _ProtocolError38);

  _createClass(UnableToCaptureScreen, null, [{
    key: 'w3cStatus',
    value: function w3cStatus() {
      return _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
    }
  }, {
    key: 'error',
    value: function error() {
      return 'unable to capture screen';
    }
  }]);

  function UnableToCaptureScreen(err) {
    _classCallCheck(this, UnableToCaptureScreen);

    _get(Object.getPrototypeOf(UnableToCaptureScreen.prototype), 'constructor', this).call(this, err || 'A screen capture was made impossible', null, UnableToCaptureScreen.w3cStatus(), UnableToCaptureScreen.error());
  }

  // Equivalent to W3C InvalidArgumentError
  return UnableToCaptureScreen;
})(ProtocolError);

var BadParametersError = (function (_ES6Error2) {
  _inherits(BadParametersError, _ES6Error2);

  _createClass(BadParametersError, null, [{
    key: 'error',
    value: function error() {
      return 'invalid argument';
    }
  }]);

  function BadParametersError(requiredParams, actualParams, errMessage) {
    _classCallCheck(this, BadParametersError);

    var message = undefined;
    if (!errMessage) {
      message = 'Parameters were incorrect. We wanted ' + (JSON.stringify(requiredParams) + ' and you ') + ('sent ' + JSON.stringify(actualParams));
    } else {
      message = 'Parameters were incorrect. You sent ' + JSON.stringify(actualParams) + ', ' + errMessage;
    }
    _get(Object.getPrototypeOf(BadParametersError.prototype), 'constructor', this).call(this, message);
    this.w3cStatus = _httpStatusCodes2['default'].BAD_REQUEST;
  }

  /**
   * ProxyRequestError is a custom error and will be thrown up on unsuccessful proxy request and
   * will contain information about the proxy failure.
   * In case of ProxyRequestError should fetch the actual error by calling `getActualError()`
   * for proxy failure to generate the client response.
   */
  return BadParametersError;
})(_es6Error2['default']);

var ProxyRequestError = (function (_ES6Error3) {
  _inherits(ProxyRequestError, _ES6Error3);

  function ProxyRequestError(err, responseError, httpStatus) {
    _classCallCheck(this, ProxyRequestError);

    var origMessage = '';
    if (_appiumSupport.util.hasValue(responseError)) {
      if (_lodash2['default'].isString(responseError.value)) {
        origMessage = responseError.value;
      } else if (_lodash2['default'].isPlainObject(responseError.value) && _lodash2['default'].isString(responseError.value.message)) {
        origMessage = responseError.value.message;
      }
    }
    var message = 'Proxy request unsuccessful. ' + origMessage;
    _get(Object.getPrototypeOf(ProxyRequestError.prototype), 'constructor', this).call(this, err || message);

    this.w3cStatus = _httpStatusCodes2['default'].BAD_REQUEST;

    // If a string was provided, parse the string
    if (_lodash2['default'].isString(responseError)) {
      responseError = JSON.parse(responseError);
    }

    // If the response error is an object and value is an object, it's a W3C error (for JSONWP value is a string)
    if (_lodash2['default'].isPlainObject(responseError) && _lodash2['default'].isPlainObject(responseError.value)) {
      this.w3c = responseError.value;
      this.w3cStatus = httpStatus || _httpStatusCodes2['default'].BAD_REQUEST;
    } else {
      this.jsonwp = responseError;
    }
  }

  // map of error class name to error class

  _createClass(ProxyRequestError, [{
    key: 'getActualError',
    value: function getActualError() {
      // If it's MJSONWP error, returns actual error cause for request failure based on `jsonwp.status`
      if (_appiumSupport.util.hasValue(this.jsonwp) && _appiumSupport.util.hasValue(this.jsonwp.status) && _appiumSupport.util.hasValue(this.jsonwp.value)) {
        return errorFromMJSONWPStatusCode(this.jsonwp.status, this.jsonwp.value);
      } else if (_appiumSupport.util.hasValue(this.w3c) && _lodash2['default'].isNumber(this.w3cStatus) && this.w3cStatus >= 300) {
        return errorFromW3CJsonCode(this.w3c.error, this.message);
      }
      return new UnknownError(this.message);
    }
  }]);

  return ProxyRequestError;
})(_es6Error2['default']);

var errors = { NotYetImplementedError: NotYetImplementedError,
  NotImplementedError: NotImplementedError,
  BadParametersError: BadParametersError,
  InvalidArgumentError: InvalidArgumentError,
  NoSuchDriverError: NoSuchDriverError,
  NoSuchElementError: NoSuchElementError,
  UnknownCommandError: UnknownCommandError,
  StaleElementReferenceError: StaleElementReferenceError,
  ElementNotVisibleError: ElementNotVisibleError,
  InvalidElementStateError: InvalidElementStateError,
  UnknownError: UnknownError,
  ElementIsNotSelectableError: ElementIsNotSelectableError,
  ElementClickInterceptedError: ElementClickInterceptedError,
  ElementNotInteractableError: ElementNotInteractableError,
  InsecureCertificateError: InsecureCertificateError,
  JavaScriptError: JavaScriptError,
  XPathLookupError: XPathLookupError,
  TimeoutError: TimeoutError,
  NoSuchWindowError: NoSuchWindowError,
  NoSuchCookieError: NoSuchCookieError,
  InvalidCookieDomainError: InvalidCookieDomainError,
  InvalidCoordinatesError: InvalidCoordinatesError,
  UnableToSetCookieError: UnableToSetCookieError,
  UnexpectedAlertOpenError: UnexpectedAlertOpenError,
  NoAlertOpenError: NoAlertOpenError,
  ScriptTimeoutError: ScriptTimeoutError,
  InvalidElementCoordinatesError: InvalidElementCoordinatesError,
  IMENotAvailableError: IMENotAvailableError,
  IMEEngineActivationFailedError: IMEEngineActivationFailedError,
  InvalidSelectorError: InvalidSelectorError,
  SessionNotCreatedError: SessionNotCreatedError,
  MoveTargetOutOfBoundsError: MoveTargetOutOfBoundsError,
  NoSuchAlertError: NoSuchAlertError,
  NoSuchContextError: NoSuchContextError,
  InvalidContextError: InvalidContextError,
  NoSuchFrameError: NoSuchFrameError,
  UnableToCaptureScreen: UnableToCaptureScreen,
  UnknownMethodError: UnknownMethodError,
  UnsupportedOperationError: UnsupportedOperationError,
  ProxyRequestError: ProxyRequestError };

// map of error code to error class
var jsonwpErrorCodeMap = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _getIterator(_lodash2['default'].values(errors)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var ErrorClass = _step.value;

    if (ErrorClass.code) {
      jsonwpErrorCodeMap[ErrorClass.code()] = ErrorClass;
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

var w3cErrorCodeMap = {};
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = _getIterator(_lodash2['default'].values(errors)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var ErrorClass = _step2.value;

    if (ErrorClass.error) {
      w3cErrorCodeMap[ErrorClass.error()] = ErrorClass;
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

function isErrorType(err, type) {
  // `name` property is the constructor name
  if (type.name === ProtocolError.name) {
    // `jsonwpCode` is `0` on success
    return !!err.jsonwpCode;
  } else if (type.name === ProxyRequestError.name) {
    // `status` is `0` on success
    if (err.jsonwp) {
      return !!err.jsonwp.status;
    }

    if (_lodash2['default'].isPlainObject(err.w3c)) {
      return _lodash2['default'].isNumber(err.w3cStatus) && err.w3cStatus >= 300;
    }

    return false;
  }
  return err.constructor.name === type.name;
}

/**
 * Retrieve an error derived from MJSONWP status
 * @param {number} code JSONWP status code
 * @param {string} message The error message
 * @return {ProtocolError} The error that is associated with provided JSONWP status code
 */
function errorFromMJSONWPStatusCode(code, message) {
  if (code !== UnknownError.code() && jsonwpErrorCodeMap[code]) {
    return new jsonwpErrorCodeMap[code](message);
  }
  return new UnknownError(message);
}

/**
 * Retrieve an error derived from W3C JSON Code
 * @param {string} code W3C error string (see https://www.w3.org/TR/webdriver/#handling-errors `JSON Error Code` column)
 * @param {string} the error message
 * @return {ProtocolError}  The error that is associated with the W3C error string
 */
function errorFromW3CJsonCode(code, message) {
  if (code && w3cErrorCodeMap[code.toLowerCase()]) {
    return new (w3cErrorCodeMap[code.toLowerCase()])(message);
  }
  return new UnknownError(message);
}

function getResponseForW3CError(err) {
  var httpStatus = undefined;
  var error = undefined;
  if (!err.w3cStatus) {
    w3cLog.error('Encountered internal error running command: ' + err.stack);
    err = new errors.UnknownError(err.message);
  }

  if (isErrorType(err, errors.BadParametersError)) {
    // respond with a 400 if we have bad parameters
    w3cLog.debug('Bad parameters: ' + err);
    error = BadParametersError.error();
  } else {
    error = err.error;
  }

  httpStatus = err.w3cStatus;

  var httpResBody = {
    value: {
      error: error,
      message: err.message,
      stacktrace: err.stack
    }
  };
  return [httpStatus, httpResBody];
}

function getResponseForJsonwpError(err) {
  var httpStatus = _httpStatusCodes2['default'].INTERNAL_SERVER_ERROR;
  var httpResBody = {
    status: err.jsonwpCode,
    value: {
      message: err.message
    }
  };

  if (isErrorType(err, errors.BadParametersError)) {
    // respond with a 400 if we have bad parameters
    mjsonwpLog.debug('Bad parameters: ' + err);
    httpStatus = _httpStatusCodes2['default'].BAD_REQUEST;
    httpResBody = err.message;
  } else if (isErrorType(err, errors.NotYetImplementedError) || isErrorType(err, errors.NotImplementedError)) {
    // respond with a 501 if the method is not implemented
    httpStatus = _httpStatusCodes2['default'].NOT_IMPLEMENTED;
  } else if (isErrorType(err, errors.NoSuchDriverError)) {
    // respond with a 404 if there is no driver for the session
    httpStatus = _httpStatusCodes2['default'].NOT_FOUND;
  }

  return [httpStatus, httpResBody];
}

exports.ProtocolError = ProtocolError;
exports.errors = errors;
exports.isErrorType = isErrorType;
exports.errorFromMJSONWPStatusCode = errorFromMJSONWPStatusCode;
exports.errorFromW3CJsonCode = errorFromW3CJsonCode;
exports.getResponseForW3CError = getResponseForW3CError;
exports.getResponseForJsonwpError = getResponseForJsonwpError;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm90b2NvbC9lcnJvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUFxQixXQUFXOzs7O3NCQUNsQixRQUFROzs7OzZCQUNPLGdCQUFnQjs7K0JBQ2pCLG1CQUFtQjs7OztBQUUvQyxJQUFNLFVBQVUsR0FBRyxzQkFBTyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0MsSUFBTSxNQUFNLEdBQUcsc0JBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O0lBR2pDLGFBQWE7WUFBYixhQUFhOztBQUNMLFdBRFIsYUFBYSxDQUNKLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTswQkFENUMsYUFBYTs7QUFFZiwrQkFGRSxhQUFhLDZDQUVULEdBQUcsRUFBRTtBQUNYLFFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLCtCQUErQixDQUFDO0FBQ3RELFFBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDNUIsVUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDdEI7QUFDRCxRQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSw2QkFBZ0IsV0FBVyxDQUFDO0dBQzNEOztTQVRHLGFBQWE7OztJQVliLGlCQUFpQjtZQUFqQixpQkFBaUI7O2VBQWpCLGlCQUFpQjs7V0FDVCxnQkFBRztBQUNiLGFBQU8sQ0FBQyxDQUFDO0tBQ1Y7Ozs7O1dBRWdCLHFCQUFHO0FBQ2xCLGFBQU8sNkJBQWdCLFNBQVMsQ0FBQztLQUNsQzs7O1dBQ1ksaUJBQUc7QUFDZCxhQUFPLG9CQUFvQixDQUFDO0tBQzdCOzs7QUFDVyxXQVhSLGlCQUFpQixDQVdSLEdBQUcsRUFBRTswQkFYZCxpQkFBaUI7O0FBWW5CLCtCQVpFLGlCQUFpQiw2Q0FZYixHQUFHLElBQUksK0NBQStDLEVBQUUsaUJBQWlCLENBQUMsSUFB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R0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0dBQzNCLE1BQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUMvQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFOztBQUV2RCxjQUFVLEdBQUcsNkJBQWdCLGVBQWUsQ0FBQztHQUM5QyxNQUFNLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRTs7QUFFckQsY0FBVSxHQUFHLDZCQUFnQixTQUFTLENBQUM7R0FDeEM7O0FBR0QsU0FBTyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztDQUNsQzs7UUFFUSxhQUFhLEdBQWIsYUFBYTtRQUFFLE1BQU0sR0FBTixNQUFNO1FBQUUsV0FBVyxHQUFYLFdBQVc7UUFBRSwwQkFBMEIsR0FBMUIsMEJBQTBCO1FBQUUsb0JBQW9CLEdBQXBCLG9CQUFvQjtRQUFFLHNCQUFzQixHQUF0QixzQkFBc0I7UUFBRSx5QkFBeUIsR0FBekIseUJBQXlCIiwiZmlsZSI6ImxpYi9wcm90b2NvbC9lcnJvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRVM2RXJyb3IgZnJvbSAnZXM2LWVycm9yJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1dGlsLCBsb2dnZXIgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgSFRUUFN0YXR1c0NvZGVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY29uc3QgbWpzb253cExvZyA9IGxvZ2dlci5nZXRMb2dnZXIoJ01KU09OV1AnKTtcbmNvbnN0IHczY0xvZyA9IGxvZ2dlci5nZXRMb2dnZXIoJ1czQycpO1xuXG4vLyBiYXNlIGVycm9yIGNsYXNzIGZvciBhbGwgb2Ygb3VyIGVycm9yc1xuY2xhc3MgUHJvdG9jb2xFcnJvciBleHRlbmRzIEVTNkVycm9yIHtcbiAgY29uc3RydWN0b3IgKG1zZywganNvbndwQ29kZSwgdzNjU3RhdHVzLCBlcnJvcikge1xuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy5qc29ud3BDb2RlID0ganNvbndwQ29kZTtcbiAgICB0aGlzLmVycm9yID0gZXJyb3IgfHwgJ0FuIHVua25vd24gZXJyb3IgaGFzIG9jY3VycmVkJztcbiAgICBpZiAodGhpcy5qc29ud3BDb2RlID09PSBudWxsKSB7XG4gICAgICB0aGlzLmpzb253cENvZGUgPSAxMztcbiAgICB9XG4gICAgdGhpcy53M2NTdGF0dXMgPSB3M2NTdGF0dXMgfHwgSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaERyaXZlckVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjtcbiAgfVxuICAvLyBXM0MgRXJyb3IgaXMgY2FsbGVkIEludmFsaWRTZXNzaW9uSURcbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2Vzc2lvbiBpZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBzZXNzaW9uIGlzIGVpdGhlciB0ZXJtaW5hdGVkIG9yIG5vdCBzdGFydGVkJywgTm9TdWNoRHJpdmVyRXJyb3IuY29kZSgpLCBOb1N1Y2hEcml2ZXJFcnJvci53M2NTdGF0dXMoKSwgTm9TdWNoRHJpdmVyRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuXG5jbGFzcyBOb1N1Y2hFbGVtZW50RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGVsZW1lbnQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVsZW1lbnQgY291bGQgbm90IGJlIGxvY2F0ZWQgb24gdGhlIHBhZ2UgdXNpbmcgdGhlIGdpdmVuICcgK1xuICAgICAgICAgICdzZWFyY2ggcGFyYW1ldGVycy4nLCBOb1N1Y2hFbGVtZW50RXJyb3IuY29kZSgpLCBOb1N1Y2hFbGVtZW50RXJyb3IudzNjU3RhdHVzKCksIE5vU3VjaEVsZW1lbnRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hGcmFtZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gODtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnbm8gc3VjaCBmcmFtZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHN3aXRjaCB0byBhIGZyYW1lIGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQgYmVjYXVzZSAnICtcbiAgICAgICAgICAndGhlIGZyYW1lIGNvdWxkIG5vdCBiZSBmb3VuZC4nLCBOb1N1Y2hGcmFtZUVycm9yLmNvZGUoKSwgbnVsbCwgTm9TdWNoRnJhbWVFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmtub3duQ29tbWFuZEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gOTtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5rbm93biBjb21tYW5kJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgcmVxdWVzdGVkIHJlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZCwgb3IgYSByZXF1ZXN0IHdhcyAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgdXNpbmcgYW4gSFRUUCBtZXRob2QgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBtYXBwZWQgJyArXG4gICAgICAgICAgJ3Jlc291cmNlLicsIFVua25vd25Db21tYW5kRXJyb3IuY29kZSgpLCBVbmtub3duQ29tbWFuZEVycm9yLnczY1N0YXR1cygpLCBVbmtub3duQ29tbWFuZEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTA7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ3N0YWxlIGVsZW1lbnQgcmVmZXJlbmNlJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvbW1hbmQgZmFpbGVkIGJlY2F1c2UgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyBubyAnICtcbiAgICAgICAgICAnbG9uZ2VyIGF0dGFjaGVkIHRvIHRoZSBET00uJywgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IuY29kZSgpLCBudWxsLCBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBFbGVtZW50Tm90VmlzaWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTE7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb21tYW5kIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgYmVjYXVzZSB0aGUgZWxlbWVudCBpcyAnICtcbiAgICAgICAgICAnbm90IHZpc2libGUgb24gdGhlIHBhZ2UuJywgRWxlbWVudE5vdFZpc2libGVFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRFbGVtZW50U3RhdGVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEyO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGVsZW1lbnQgc3RhdGUnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVsZW1lbnQgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgaXMgJyArXG4gICAgICAgICAgJ2luIGFuIGludmFsaWQgc3RhdGUgKGUuZy4gYXR0ZW1wdGluZyB0byBjbGljayBhIGRpc2FibGVkIGVsZW1lbnQpLicsXG4gICAgICAgICAgSW52YWxpZEVsZW1lbnRTdGF0ZUVycm9yLmNvZGUoKSwgbnVsbCwgSW52YWxpZEVsZW1lbnRTdGF0ZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFVua25vd25FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEzO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmtub3duIGVycm9yJztcbiAgfVxuICBjb25zdHJ1Y3RvciAob3JpZ2luYWxFcnJvcikge1xuICAgIGxldCBvcmlnTWVzc2FnZSA9IG9yaWdpbmFsRXJyb3I7XG4gICAgaWYgKG9yaWdpbmFsRXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgb3JpZ01lc3NhZ2UgPSBvcmlnaW5hbEVycm9yLm1lc3NhZ2U7XG4gICAgfVxuICAgIGxldCBtZXNzYWdlID0gJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyAnICtcbiAgICAgICAgICAgICAgICAgICd0aGUgY29tbWFuZC4nO1xuICAgIGlmIChvcmlnaW5hbEVycm9yKSB7XG4gICAgICBtZXNzYWdlID0gYCR7bWVzc2FnZX0gT3JpZ2luYWwgZXJyb3I6ICR7b3JpZ01lc3NhZ2V9YDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlLCBVbmtub3duRXJyb3IuY29kZSgpLCBVbmtub3duRXJyb3IudzNjU3RhdHVzKCksIFVua25vd25FcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmtub3duTWV0aG9kRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5NRVRIT0RfTk9UX0FMTE9XRUQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ3Vua25vd24gbWV0aG9kJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgcmVxdWVzdGVkIGNvbW1hbmQgbWF0Y2hlZCBhIGtub3duIFVSTCBidXQgZGlkIG5vdCBtYXRjaCBhbiBtZXRob2QgZm9yIHRoYXQgVVJMJywgbnVsbCwgVW5rbm93bk1ldGhvZEVycm9yLnczY1N0YXR1cygpLCBVbmtub3duTWV0aG9kRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5zdXBwb3J0ZWRPcGVyYXRpb25FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5zdXBwb3J0ZWQgb3BlcmF0aW9uJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkLiBDb21tYW5kIGNhbm5vdCBiZSBzdXBwb3J0ZWQuJyxcbiAgICAgIG51bGwsIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IudzNjU3RhdHVzKCksIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTU7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IHNlbGVjdGFibGUnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGF0dGVtcHQgd2FzIG1hZGUgdG8gc2VsZWN0IGFuIGVsZW1lbnQgdGhhdCBjYW5ub3QgYmUgc2VsZWN0ZWQuJyxcbiAgICAgICAgICBFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3IuY29kZSgpLCBudWxsLCBFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudENsaWNrSW50ZXJjZXB0ZWRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnZWxlbWVudCBjbGljayBpbnRlcmNlcHRlZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhlIEVsZW1lbnQgQ2xpY2sgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgcmVjZWl2aW5nIHRoZSBldmVudHMgaXMgb2JzY3VyaW5nIHRoZSBlbGVtZW50IHRoYXQgd2FzIHJlcXVlc3RlZCBjbGlja2VkJywgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yLmNvZGUoKSwgbnVsbCwgRWxlbWVudENsaWNrSW50ZXJjZXB0ZWRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBFbGVtZW50Tm90SW50ZXJhY3RhYmxlRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IGludGVyYWN0YWJsZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBjb21tYW5kIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgYmVjYXVzZSB0aGUgZWxlbWVudCBpcyBub3QgcG9pbnRlci0gb3Iga2V5Ym9hcmQgaW50ZXJhY3RhYmxlJywgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yLmNvZGUoKSwgbnVsbCwgRWxlbWVudE5vdEludGVyYWN0YWJsZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEluc2VjdXJlQ2VydGlmaWNhdGVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW5zZWN1cmUgY2VydGlmaWNhdGUnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ05hdmlnYXRpb24gY2F1c2VkIHRoZSB1c2VyIGFnZW50IHRvIGhpdCBhIGNlcnRpZmljYXRlIHdhcm5pbmcsIHdoaWNoIGlzIHVzdWFsbHkgdGhlIHJlc3VsdCBvZiBhbiBleHBpcmVkIG9yIGludmFsaWQgVExTIGNlcnRpZmljYXRlJywgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yLmNvZGUoKSwgbnVsbCwgSW5zZWN1cmVDZXJ0aWZpY2F0ZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEphdmFTY3JpcHRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdqYXZhc2NyaXB0IGVycm9yJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBleGVjdXRpbmcgdXNlciBzdXBwbGllZCBKYXZhU2NyaXB0LicsXG4gICAgICAgICAgSmF2YVNjcmlwdEVycm9yLmNvZGUoKSwgSmF2YVNjcmlwdEVycm9yLnczY1N0YXR1cygpLCBKYXZhU2NyaXB0RXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgWFBhdGhMb29rdXBFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE5O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNlYXJjaGluZyBmb3IgYW4gZWxlbWVudCBieSBYUGF0aC4nLFxuICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyMTtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLlJFUVVFU1RfVElNRU9VVDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndGltZW91dCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gb3BlcmF0aW9uIGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgICAgICAgICBUaW1lb3V0RXJyb3IuY29kZSgpLCBUaW1lb3V0RXJyb3IudzNjU3RhdHVzKCksIFRpbWVvdXRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hXaW5kb3dFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDIzO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIHdpbmRvdyc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHN3aXRjaCB0byBhIGRpZmZlcmVudCB3aW5kb3cgY291bGQgbm90IGJlIHNhdGlzZmllZCAnICtcbiAgICAgICAgICAnYmVjYXVzZSB0aGUgd2luZG93IGNvdWxkIG5vdCBiZSBmb3VuZC4nLCBOb1N1Y2hXaW5kb3dFcnJvci5jb2RlKCksIG51bGwsIE5vU3VjaFdpbmRvd0Vycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGFyZ3VtZW50JztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgY29tbWFuZCBhcmUgZWl0aGVyIGludmFsaWQgb3IgbWFsZm9ybWVkJywgbnVsbCwgbnVsbCwgQmFkUGFyYW1ldGVyc0Vycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRDb29raWVEb21haW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI0O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGNvb2tpZSBkb21haW4nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGlsbGVnYWwgYXR0ZW1wdCB3YXMgbWFkZSB0byBzZXQgYSBjb29raWUgdW5kZXIgYSBkaWZmZXJlbnQgJyArXG4gICAgICAgICAgJ2RvbWFpbiB0aGFuIHRoZSBjdXJyZW50IHBhZ2UuJywgSW52YWxpZENvb2tpZURvbWFpbkVycm9yLmNvZGUoKSwgbnVsbCwgSW52YWxpZENvb2tpZURvbWFpbkVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRDb29yZGluYXRlc0Vycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGNvb3JkaW5hdGVzJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgY29vcmRpbmF0ZXMgcHJvdmlkZWQgdG8gYW4gaW50ZXJhY3Rpb25zIG9wZXJhdGlvbiBhcmUgaW52YWxpZCcsIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvci5jb2RlKCksIG51bGwsIEludmFsaWRDb29yZGluYXRlc0Vycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaENvb2tpZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGNvb2tpZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTm8gY29va2llIG1hdGNoaW5nIHRoZSBnaXZlbiBwYXRoIG5hbWUgd2FzIGZvdW5kIGFtb25nc3QgdGhlIGFzc29jaWF0ZWQgY29va2llcyBvZiB0aGUgY3VycmVudCBicm93c2luZyBjb250ZXh04oCZcyBhY3RpdmUgZG9jdW1lbnQnLCBudWxsLCBOb1N1Y2hDb29raWVFcnJvci53M2NTdGF0dXMoKSwgTm9TdWNoQ29va2llRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5hYmxlVG9TZXRDb29raWVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI1O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmFibGUgdG8gc2V0IGNvb2tpZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHNldCBhIGNvb2tpZVxcJ3MgdmFsdWUgY291bGQgbm90IGJlIHNhdGlzZmllZC4nLFxuICAgICAgICAgIFVuYWJsZVRvU2V0Q29va2llRXJyb3IuY29kZSgpLCBVbmFibGVUb1NldENvb2tpZUVycm9yLnczY1N0YXR1cygpLCBVbmFibGVUb1NldENvb2tpZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI2O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmV4cGVjdGVkIGFsZXJ0IG9wZW4nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0EgbW9kYWwgZGlhbG9nIHdhcyBvcGVuLCBibG9ja2luZyB0aGlzIG9wZXJhdGlvbicsXG4gICAgICAgICAgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLmNvZGUoKSwgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLnczY1N0YXR1cygpLCBVbmV4cGVjdGVkQWxlcnRPcGVuRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9BbGVydE9wZW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI3O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGF0dGVtcHQgd2FzIG1hZGUgdG8gb3BlcmF0ZSBvbiBhIG1vZGFsIGRpYWxvZyB3aGVuIG9uZSAnICtcbiAgICAgICAgICAnd2FzIG5vdCBvcGVuLicsIE5vQWxlcnRPcGVuRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBTY3JpcHRUaW1lb3V0RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyODtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLlJFUVVFU1RfVElNRU9VVDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnc2NyaXB0IHRpbWVvdXQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2NyaXB0IGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgICAgICAgICBTY3JpcHRUaW1lb3V0RXJyb3IuY29kZSgpLCBTY3JpcHRUaW1lb3V0RXJyb3IudzNjU3RhdHVzKCksIFNjcmlwdFRpbWVvdXRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyOTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgY29vcmRpbmF0ZXMgcHJvdmlkZWQgdG8gYW4gaW50ZXJhY3Rpb25zIG9wZXJhdGlvbiBhcmUgaW52YWxpZC4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIElNRU5vdEF2YWlsYWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzA7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnSU1FIHdhcyBub3QgYXZhaWxhYmxlLicsIElNRU5vdEF2YWlsYWJsZUVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzE7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gSU1FIGVuZ2luZSBjb3VsZCBub3QgYmUgc3RhcnRlZC4nLFxuICAgICAgICAgIElNRUVuZ2luZUFjdGl2YXRpb25GYWlsZWRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRTZWxlY3RvckVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzI7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2VsZWN0b3InO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FyZ3VtZW50IHdhcyBhbiBpbnZhbGlkIHNlbGVjdG9yIChlLmcuIFhQYXRoL0NTUykuJyxcbiAgICAgICAgICBJbnZhbGlkU2VsZWN0b3JFcnJvci5jb2RlKCksIG51bGwsIEludmFsaWRTZWxlY3RvckVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnc2Vzc2lvbiBub3QgY3JlYXRlZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGRldGFpbHMpIHtcbiAgICBsZXQgbWVzc2FnZSA9ICdBIG5ldyBzZXNzaW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkLic7XG4gICAgaWYgKGRldGFpbHMpIHtcbiAgICAgIG1lc3NhZ2UgKz0gYCBEZXRhaWxzOiAke2RldGFpbHN9YDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlLCBTZXNzaW9uTm90Q3JlYXRlZEVycm9yLmNvZGUoKSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci53M2NTdGF0dXMoKSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM0O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdtb3ZlIHRhcmdldCBvdXQgb2YgYm91bmRzJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUYXJnZXQgcHJvdmlkZWQgZm9yIGEgbW92ZSBhY3Rpb24gaXMgb3V0IG9mIGJvdW5kcy4nLFxuICAgICAgICAgIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmNvZGUoKSwgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IudzNjU3RhdHVzKCksIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaEFsZXJ0RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ25vIHN1Y2ggYWxlcnQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ1RoZSB0YXJnZXQgZm9yIG1vdXNlIGludGVyYWN0aW9uIGlzIG5vdCBpbiB0aGUgYnJvd3NlcuKAmXMgdmlld3BvcnQgYW5kIGNhbm5vdCBiZSBicm91Z2h0IGludG8gdGhhdCB2aWV3cG9ydCcsIG51bGwsIG51bGwsIE5vU3VjaEFsZXJ0RXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9TdWNoQ29udGV4dEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzU7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTm8gc3VjaCBjb250ZXh0IGZvdW5kLicsIE5vU3VjaENvbnRleHRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRDb250ZXh0RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzNjtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGF0IGNvbW1hbmQgY291bGQgbm90IGJlIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IGNvbnRleHQuJyxcbiAgICAgICAgICBJbnZhbGlkQ29udGV4dEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuLy8gVGhpcyBpcyBhbiBhbGlhcyBmb3IgVW5rbm93bk1ldGhvZEVycm9yXG5jbGFzcyBOb3RZZXRJbXBsZW1lbnRlZEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7IC8vIFczQyBlcXVpdmFsZW50IGlzIGNhbGxlZCAnVW5rbm93biBDb21tYW5kJyAoQSBjb21tYW5kIGNvdWxkIG5vdCBiZSBleGVjdXRlZCBiZWNhdXNlIHRoZSByZW1vdGUgZW5kIGlzIG5vdCBhd2FyZSBvZiBpdClcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5rbm93biBtZXRob2QnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ01ldGhvZCBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkJyxcbiAgICAgIE5vdFlldEltcGxlbWVudGVkRXJyb3IuY29kZSgpLCBOb3RZZXRJbXBsZW1lbnRlZEVycm9yLnczY1N0YXR1cygpLCBOb3RZZXRJbXBsZW1lbnRlZEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vdEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAxMztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLk1FVEhPRF9OT1RfQUxMT1dFRDsgLy8gVzNDIGVxdWl2YWxlbnQgaXMgJ1Vua25vd24gTWV0aG9kJyAoVGhlIHJlcXVlc3RlZCBjb21tYW5kIG1hdGNoZWQgYSBrbm93biBVUkwgYnV0IGRpZCBub3QgbWF0Y2ggYW4gbWV0aG9kIGZvciB0aGF0IFVSTClcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdNZXRob2QgaXMgbm90IGltcGxlbWVudGVkJywgTm90SW1wbGVtZW50ZWRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbiBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5hYmxlIHRvIGNhcHR1cmUgc2NyZWVuJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHNjcmVlbiBjYXB0dXJlIHdhcyBtYWRlIGltcG9zc2libGUnLCBudWxsLCBVbmFibGVUb0NhcHR1cmVTY3JlZW4udzNjU3RhdHVzKCksIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbi5lcnJvcigpKTtcbiAgfVxufVxuXG5cbi8vIEVxdWl2YWxlbnQgdG8gVzNDIEludmFsaWRBcmd1bWVudEVycm9yXG5jbGFzcyBCYWRQYXJhbWV0ZXJzRXJyb3IgZXh0ZW5kcyBFUzZFcnJvciB7XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGFyZ3VtZW50JztcbiAgfVxuICBjb25zdHJ1Y3RvciAocmVxdWlyZWRQYXJhbXMsIGFjdHVhbFBhcmFtcywgZXJyTWVzc2FnZSkge1xuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmICghZXJyTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGBQYXJhbWV0ZXJzIHdlcmUgaW5jb3JyZWN0LiBXZSB3YW50ZWQgYCArXG4gICAgICAgICAgYCR7SlNPTi5zdHJpbmdpZnkocmVxdWlyZWRQYXJhbXMpfSBhbmQgeW91IGAgK1xuICAgICAgICAgIGBzZW50ICR7SlNPTi5zdHJpbmdpZnkoYWN0dWFsUGFyYW1zKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlID0gYFBhcmFtZXRlcnMgd2VyZSBpbmNvcnJlY3QuIFlvdSBzZW50ICR7SlNPTi5zdHJpbmdpZnkoYWN0dWFsUGFyYW1zKX0sICR7ZXJyTWVzc2FnZX1gO1xuICAgIH1cbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLnczY1N0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxufVxuXG4vKipcbiAqIFByb3h5UmVxdWVzdEVycm9yIGlzIGEgY3VzdG9tIGVycm9yIGFuZCB3aWxsIGJlIHRocm93biB1cCBvbiB1bnN1Y2Nlc3NmdWwgcHJveHkgcmVxdWVzdCBhbmRcbiAqIHdpbGwgY29udGFpbiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcHJveHkgZmFpbHVyZS5cbiAqIEluIGNhc2Ugb2YgUHJveHlSZXF1ZXN0RXJyb3Igc2hvdWxkIGZldGNoIHRoZSBhY3R1YWwgZXJyb3IgYnkgY2FsbGluZyBgZ2V0QWN0dWFsRXJyb3IoKWBcbiAqIGZvciBwcm94eSBmYWlsdXJlIHRvIGdlbmVyYXRlIHRoZSBjbGllbnQgcmVzcG9uc2UuXG4gKi9cbmNsYXNzIFByb3h5UmVxdWVzdEVycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICBjb25zdHJ1Y3RvciAoZXJyLCByZXNwb25zZUVycm9yLCBodHRwU3RhdHVzKSB7XG4gICAgbGV0IG9yaWdNZXNzYWdlID0gJyc7XG4gICAgaWYgKHV0aWwuaGFzVmFsdWUocmVzcG9uc2VFcnJvcikpIHtcbiAgICAgIGlmIChfLmlzU3RyaW5nKHJlc3BvbnNlRXJyb3IudmFsdWUpKSB7XG4gICAgICAgIG9yaWdNZXNzYWdlID0gcmVzcG9uc2VFcnJvci52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3IudmFsdWUpICYmIF8uaXNTdHJpbmcocmVzcG9uc2VFcnJvci52YWx1ZS5tZXNzYWdlKSkge1xuICAgICAgICBvcmlnTWVzc2FnZSA9IHJlc3BvbnNlRXJyb3IudmFsdWUubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IG1lc3NhZ2UgPSBgUHJveHkgcmVxdWVzdCB1bnN1Y2Nlc3NmdWwuICR7b3JpZ01lc3NhZ2V9YDtcbiAgICBzdXBlcihlcnIgfHwgbWVzc2FnZSk7XG5cbiAgICB0aGlzLnczY1N0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcblxuICAgIC8vIElmIGEgc3RyaW5nIHdhcyBwcm92aWRlZCwgcGFyc2UgdGhlIHN0cmluZ1xuICAgIGlmIChfLmlzU3RyaW5nKHJlc3BvbnNlRXJyb3IpKSB7XG4gICAgICByZXNwb25zZUVycm9yID0gSlNPTi5wYXJzZShyZXNwb25zZUVycm9yKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgcmVzcG9uc2UgZXJyb3IgaXMgYW4gb2JqZWN0IGFuZCB2YWx1ZSBpcyBhbiBvYmplY3QsIGl0J3MgYSBXM0MgZXJyb3IgKGZvciBKU09OV1AgdmFsdWUgaXMgYSBzdHJpbmcpXG4gICAgaWYgKF8uaXNQbGFpbk9iamVjdChyZXNwb25zZUVycm9yKSAmJiBfLmlzUGxhaW5PYmplY3QocmVzcG9uc2VFcnJvci52YWx1ZSkpIHtcbiAgICAgIHRoaXMudzNjID0gcmVzcG9uc2VFcnJvci52YWx1ZTtcbiAgICAgIHRoaXMudzNjU3RhdHVzID0gaHR0cFN0YXR1cyB8fCBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanNvbndwID0gcmVzcG9uc2VFcnJvcjtcbiAgICB9XG4gIH1cblxuICBnZXRBY3R1YWxFcnJvciAoKSB7XG4gICAgLy8gSWYgaXQncyBNSlNPTldQIGVycm9yLCByZXR1cm5zIGFjdHVhbCBlcnJvciBjYXVzZSBmb3IgcmVxdWVzdCBmYWlsdXJlIGJhc2VkIG9uIGBqc29ud3Auc3RhdHVzYFxuICAgIGlmICh1dGlsLmhhc1ZhbHVlKHRoaXMuanNvbndwKSAmJiB1dGlsLmhhc1ZhbHVlKHRoaXMuanNvbndwLnN0YXR1cykgJiYgdXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cC52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZSh0aGlzLmpzb253cC5zdGF0dXMsIHRoaXMuanNvbndwLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWwuaGFzVmFsdWUodGhpcy53M2MpICYmIF8uaXNOdW1iZXIodGhpcy53M2NTdGF0dXMpICYmIHRoaXMudzNjU3RhdHVzID49IDMwMCkge1xuICAgICAgcmV0dXJuIGVycm9yRnJvbVczQ0pzb25Db2RlKHRoaXMudzNjLmVycm9yLCB0aGlzLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVua25vd25FcnJvcih0aGlzLm1lc3NhZ2UpO1xuICB9XG59XG4vLyBtYXAgb2YgZXJyb3IgY2xhc3MgbmFtZSB0byBlcnJvciBjbGFzc1xuY29uc3QgZXJyb3JzID0ge05vdFlldEltcGxlbWVudGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTm90SW1wbGVtZW50ZWRFcnJvcixcbiAgICAgICAgICAgICAgICBCYWRQYXJhbWV0ZXJzRXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZEFyZ3VtZW50RXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRHJpdmVyRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRWxlbWVudEVycm9yLFxuICAgICAgICAgICAgICAgIFVua25vd25Db21tYW5kRXJyb3IsXG4gICAgICAgICAgICAgICAgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IsXG4gICAgICAgICAgICAgICAgRWxlbWVudE5vdFZpc2libGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5rbm93bkVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBFbGVtZW50Q2xpY2tJbnRlcmNlcHRlZEVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnNlY3VyZUNlcnRpZmljYXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgSmF2YVNjcmlwdEVycm9yLFxuICAgICAgICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IsXG4gICAgICAgICAgICAgICAgVGltZW91dEVycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaFdpbmRvd0Vycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRDb29raWVEb21haW5FcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkQ29vcmRpbmF0ZXNFcnJvcixcbiAgICAgICAgICAgICAgICBVbmFibGVUb1NldENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcixcbiAgICAgICAgICAgICAgICBOb0FsZXJ0T3BlbkVycm9yLFxuICAgICAgICAgICAgICAgIFNjcmlwdFRpbWVvdXRFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FTm90QXZhaWxhYmxlRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLFxuICAgICAgICAgICAgICAgIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoQWxlcnRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hDb250ZXh0RXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hGcmFtZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbixcbiAgICAgICAgICAgICAgICBVbmtub3duTWV0aG9kRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5zdXBwb3J0ZWRPcGVyYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICBQcm94eVJlcXVlc3RFcnJvcn07XG5cbi8vIG1hcCBvZiBlcnJvciBjb2RlIHRvIGVycm9yIGNsYXNzXG5jb25zdCBqc29ud3BFcnJvckNvZGVNYXAgPSB7fTtcbmZvciAobGV0IEVycm9yQ2xhc3Mgb2YgXy52YWx1ZXMoZXJyb3JzKSkge1xuICBpZiAoRXJyb3JDbGFzcy5jb2RlKSB7XG4gICAganNvbndwRXJyb3JDb2RlTWFwW0Vycm9yQ2xhc3MuY29kZSgpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuY29uc3QgdzNjRXJyb3JDb2RlTWFwID0ge307XG5mb3IgKGxldCBFcnJvckNsYXNzIG9mIF8udmFsdWVzKGVycm9ycykpIHtcbiAgaWYgKEVycm9yQ2xhc3MuZXJyb3IpIHtcbiAgICB3M2NFcnJvckNvZGVNYXBbRXJyb3JDbGFzcy5lcnJvcigpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGlzRXJyb3JUeXBlIChlcnIsIHR5cGUpIHtcbiAgLy8gYG5hbWVgIHByb3BlcnR5IGlzIHRoZSBjb25zdHJ1Y3RvciBuYW1lXG4gIGlmICh0eXBlLm5hbWUgPT09IFByb3RvY29sRXJyb3IubmFtZSkge1xuICAgIC8vIGBqc29ud3BDb2RlYCBpcyBgMGAgb24gc3VjY2Vzc1xuICAgIHJldHVybiAhIWVyci5qc29ud3BDb2RlO1xuICB9IGVsc2UgaWYgKHR5cGUubmFtZSA9PT0gUHJveHlSZXF1ZXN0RXJyb3IubmFtZSkge1xuICAgIC8vIGBzdGF0dXNgIGlzIGAwYCBvbiBzdWNjZXNzXG4gICAgaWYgKGVyci5qc29ud3ApIHtcbiAgICAgIHJldHVybiAhIWVyci5qc29ud3Auc3RhdHVzO1xuICAgIH1cblxuICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZXJyLnczYykpIHtcbiAgICAgIHJldHVybiBfLmlzTnVtYmVyKGVyci53M2NTdGF0dXMpICYmIGVyci53M2NTdGF0dXMgPj0gMzAwO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZXJyLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhbiBlcnJvciBkZXJpdmVkIGZyb20gTUpTT05XUCBzdGF0dXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlIEpTT05XUCBzdGF0dXMgY29kZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2VcbiAqIEByZXR1cm4ge1Byb3RvY29sRXJyb3J9IFRoZSBlcnJvciB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBKU09OV1Agc3RhdHVzIGNvZGVcbiAqL1xuZnVuY3Rpb24gZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUgKGNvZGUsIG1lc3NhZ2UpIHtcbiAgaWYgKGNvZGUgIT09IFVua25vd25FcnJvci5jb2RlKCkgJiYganNvbndwRXJyb3JDb2RlTWFwW2NvZGVdKSB7XG4gICAgcmV0dXJuIG5ldyBqc29ud3BFcnJvckNvZGVNYXBbY29kZV0obWVzc2FnZSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBVbmtub3duRXJyb3IobWVzc2FnZSk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gZXJyb3IgZGVyaXZlZCBmcm9tIFczQyBKU09OIENvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFczQyBlcnJvciBzdHJpbmcgKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNoYW5kbGluZy1lcnJvcnMgYEpTT04gRXJyb3IgQ29kZWAgY29sdW1uKVxuICogQHBhcmFtIHtzdHJpbmd9IHRoZSBlcnJvciBtZXNzYWdlXG4gKiBAcmV0dXJuIHtQcm90b2NvbEVycm9yfSAgVGhlIGVycm9yIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBXM0MgZXJyb3Igc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGVycm9yRnJvbVczQ0pzb25Db2RlIChjb2RlLCBtZXNzYWdlKSB7XG4gIGlmIChjb2RlICYmIHczY0Vycm9yQ29kZU1hcFtjb2RlLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgcmV0dXJuIG5ldyB3M2NFcnJvckNvZGVNYXBbY29kZS50b0xvd2VyQ2FzZSgpXShtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gbmV3IFVua25vd25FcnJvcihtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVzcG9uc2VGb3JXM0NFcnJvciAoZXJyKSB7XG4gIGxldCBodHRwU3RhdHVzO1xuICBsZXQgZXJyb3I7XG4gIGlmICghZXJyLnczY1N0YXR1cykge1xuICAgIHczY0xvZy5lcnJvcihgRW5jb3VudGVyZWQgaW50ZXJuYWwgZXJyb3IgcnVubmluZyBjb21tYW5kOiAke2Vyci5zdGFja31gKTtcbiAgICBlcnIgPSBuZXcgZXJyb3JzLlVua25vd25FcnJvcihlcnIubWVzc2FnZSk7XG4gIH1cblxuICBpZiAoaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuQmFkUGFyYW1ldGVyc0Vycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDQwMCBpZiB3ZSBoYXZlIGJhZCBwYXJhbWV0ZXJzXG4gICAgdzNjTG9nLmRlYnVnKGBCYWQgcGFyYW1ldGVyczogJHtlcnJ9YCk7XG4gICAgZXJyb3IgPSBCYWRQYXJhbWV0ZXJzRXJyb3IuZXJyb3IoKTtcbiAgfSBlbHNlIHtcbiAgICBlcnJvciA9IGVyci5lcnJvcjtcbiAgfVxuXG4gIGh0dHBTdGF0dXMgPSBlcnIudzNjU3RhdHVzO1xuXG4gIGxldCBodHRwUmVzQm9keSA9IHtcbiAgICB2YWx1ZToge1xuICAgICAgZXJyb3IsXG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgIHN0YWNrdHJhY2U6IGVyci5zdGFjayxcbiAgICB9XG4gIH07XG4gIHJldHVybiBbaHR0cFN0YXR1cywgaHR0cFJlc0JvZHldO1xufVxuXG5mdW5jdGlvbiBnZXRSZXNwb25zZUZvckpzb253cEVycm9yIChlcnIpIHtcbiAgbGV0IGh0dHBTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICBsZXQgaHR0cFJlc0JvZHkgPSB7XG4gICAgc3RhdHVzOiBlcnIuanNvbndwQ29kZSxcbiAgICB2YWx1ZToge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICB9XG4gIH07XG5cbiAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcikpIHtcbiAgICAvLyByZXNwb25kIHdpdGggYSA0MDAgaWYgd2UgaGF2ZSBiYWQgcGFyYW1ldGVyc1xuICAgIG1qc29ud3BMb2cuZGVidWcoYEJhZCBwYXJhbWV0ZXJzOiAke2Vycn1gKTtcbiAgICBodHRwU3RhdHVzID0gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIGh0dHBSZXNCb2R5ID0gZXJyLm1lc3NhZ2U7XG4gIH0gZWxzZSBpZiAoaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcikgfHxcbiAgICAgICAgICAgICBpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDUwMSBpZiB0aGUgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZFxuICAgIGh0dHBTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuTk9UX0lNUExFTUVOVEVEO1xuICB9IGVsc2UgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vU3VjaERyaXZlckVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDQwNCBpZiB0aGVyZSBpcyBubyBkcml2ZXIgZm9yIHRoZSBzZXNzaW9uXG4gICAgaHR0cFN0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cblxuXG4gIHJldHVybiBbaHR0cFN0YXR1cywgaHR0cFJlc0JvZHldO1xufVxuXG5leHBvcnQgeyBQcm90b2NvbEVycm9yLCBlcnJvcnMsIGlzRXJyb3JUeXBlLCBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZSwgZXJyb3JGcm9tVzNDSnNvbkNvZGUsIGdldFJlc3BvbnNlRm9yVzNDRXJyb3IsIGdldFJlc3BvbnNlRm9ySnNvbndwRXJyb3IgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==

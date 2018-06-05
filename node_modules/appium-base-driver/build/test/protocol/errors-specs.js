'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _2 = require('../..');

var _libProtocolErrors = require('../../lib/protocol/errors');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

_chai2['default'].use(_chaiAsPromised2['default']);
_chai2['default'].should();

// Error codes and messages have been added according to JsonWireProtocol see
// https://code.google.com/p/selenium/wiki/JsonWireProtocol#Response_Status_Codes
var errorsList = [{
  errorName: 'NoSuchDriverError',
  errorMsg: 'A session is either terminated or not started',
  error: 'invalid session id',
  errorCode: 6
}, {
  errorName: 'ElementClickInterceptedError',
  errorMsg: 'The Element Click command could not be completed because the element receiving the events is obscuring the element that was requested clicked',
  error: 'element click intercepted'
}, {
  errorName: 'ElementNotInteractableError',
  errorMsg: 'A command could not be completed because the element is not pointer- or keyboard interactable',
  error: 'element not interactable'
}, {
  errorName: 'InsecureCertificateError',
  errorMsg: 'Navigation caused the user agent to hit a certificate warning, which is usually the result of an expired or invalid TLS certificate',
  error: 'insecure certificate'
}, {
  errorName: 'InvalidArgumentError',
  errorMsg: 'The arguments passed to the command are either invalid or malformed',
  error: 'invalid argument'
}, {
  errorName: 'NoSuchElementError',
  errorMsg: 'An element could not be located on the page using the ' + 'given search parameters.',
  error: 'no such element',
  errorCode: 7
}, {
  errorName: 'NoSuchFrameError',
  errorMsg: 'A request to switch to a frame could not be satisfied ' + 'because the frame could not be found.',
  error: 'no such frame',
  errorCode: 8
}, {
  errorName: 'UnknownCommandError',
  errorMsg: 'The requested resource could not be found, or a request ' + 'was received using an HTTP method that is not supported by ' + 'the mapped resource.',
  error: 'unknown command',
  errorCode: 9
}, {
  errorName: 'StaleElementReferenceError',
  errorMsg: 'An element command failed because the referenced element is ' + 'no longer attached to the DOM.',
  error: 'stale element reference',
  errorCode: 10
}, {
  errorName: 'ElementNotVisibleError',
  errorMsg: 'An element command could not be completed because the ' + 'element is not visible on the page.',
  errorCode: 11
}, {
  errorName: 'InvalidElementStateError',
  errorMsg: 'An element command could not be completed because the element ' + 'is in an invalid state (e.g. attempting to click a disabled ' + 'element).',
  error: 'invalid element state',
  errorCode: 12
}, {
  errorName: 'UnknownError',
  errorMsg: 'An unknown server-side error occurred while processing the ' + 'command.',
  error: 'unknown error',
  errorCode: 13
}, {
  errorName: 'ElementIsNotSelectableError',
  errorMsg: 'An attempt was made to select an element that cannot ' + 'be selected.',
  error: 'element not selectable',
  errorCode: 15
}, {
  errorName: 'JavaScriptError',
  errorMsg: 'An error occurred while executing user supplied JavaScript.',
  error: 'javascript error',
  errorCode: 17
}, {
  errorName: 'XPathLookupError',
  errorMsg: 'An error occurred while searching for an element by XPath.',
  errorCode: 19
}, {
  errorName: 'TimeoutError',
  errorMsg: 'An operation did not complete before its timeout expired.',
  error: 'timeout',
  errorCode: 21
}, {
  errorName: 'NoSuchWindowError',
  errorMsg: 'A request to switch to a different window could not be ' + 'satisfied because the window could not be found.',
  error: 'no such window',
  errorCode: 23
}, {
  errorName: 'InvalidCookieDomainError',
  errorMsg: 'An illegal attempt was made to set a cookie under a different ' + 'domain than the current page.',
  error: 'invalid cookie domain',
  errorCode: 24
}, {
  errorName: 'InvalidCoordinatesError',
  errorMsg: 'The coordinates provided to an interactions operation are invalid',
  error: 'invalid coordinates'
}, {
  errorName: 'UnableToSetCookieError',
  errorMsg: 'A request to set a cookie\'s value could not be satisfied.',
  error: 'unable to set cookie',
  errorCode: 25
}, {
  errorName: 'UnexpectedAlertOpenError',
  errorMsg: 'A modal dialog was open, blocking this operation',
  error: 'unexpected alert open',
  errorCode: 26
}, {
  errorName: 'NoAlertOpenError',
  errorMsg: 'An attempt was made to operate on a modal dialog when one was ' + 'not open.',
  errorCode: 27
}, {
  errorName: 'ScriptTimeoutError',
  errorMsg: 'A script did not complete before its timeout expired.',
  error: 'script timeout',
  errorCode: 28
}, {
  errorName: 'InvalidElementCoordinatesError',
  errorMsg: 'The coordinates provided to an interactions operation are ' + 'invalid.',
  errorCode: 29
}, {
  errorName: 'IMENotAvailableError',
  errorMsg: 'IME was not available.',
  errorCode: 30
}, {
  errorName: 'IMEEngineActivationFailedError',
  errorMsg: 'An IME engine could not be started.',
  errorCode: 31
}, {
  errorName: 'InvalidSelectorError',
  errorMsg: 'Argument was an invalid selector (e.g. XPath/CSS).',
  error: 'invalid selector',
  errorCode: 32
}, {
  errorName: 'SessionNotCreatedError',
  errorMsg: 'A new session could not be created.',
  error: 'session not created',
  errorCode: 33
}, {
  errorName: 'MoveTargetOutOfBoundsError',
  errorMsg: 'Target provided for a move action is out of bounds.',
  error: 'move target out of bounds',
  errorCode: 34
}, {
  errorName: 'NoSuchAlertError',
  errorMsg: 'The target for mouse interaction is not in the browser’s viewport and cannot be brought into that viewport',
  error: 'no such alert'
}, {
  errorName: 'NoSuchCookieError',
  errorMsg: 'No cookie matching the given path name was found amongst the associated cookies of the current browsing context’s active document',
  error: 'no such cookie'
}, {
  errorName: 'NotYetImplementedError',
  errorMsg: 'Method has not yet been implemented',
  error: 'unknown method',
  errorCode: 13
}, {
  errorName: 'UnknownCommandError',
  errorMsg: 'The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource.',
  error: 'unknown command'
}, {
  errorName: 'UnknownMethodError',
  errorMsg: 'The requested command matched a known URL but did not match an method for that URL',
  error: 'unknown method'
}, {
  errorName: 'UnsupportedOperationError',
  errorMsg: 'A server-side error occurred. Command cannot be supported.',
  error: 'unsupported operation'
}];

describe('errors', function () {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function () {
      var error = _step.value;

      it(error.errorName + ' should have a JSONWP code or W3C code and messg', function () {
        if (error.errorCode) {
          new _2.errors[error.errorName]().should.have.property('jsonwpCode', error.errorCode);
        } else {
          new _2.errors[error.errorName]().should.have.property('error', error.error);
        }
        new _2.errors[error.errorName]().should.have.property('message', error.errorMsg);
      });
    };

    for (var _iterator = _getIterator(errorsList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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

  it('BadParametersError should not have code and should have messg', function () {
    new _2.errors.BadParametersError().should.not.have.property('jsonwpCode');
    new _2.errors.BadParametersError().should.have.property('message');
  });
  it('ProxyRequestError should have message and jsonwp', function () {
    new _2.errors.ProxyRequestError().should.have.property('jsonwp');
    new _2.errors.ProxyRequestError().should.have.property('message');
  });
});
describe('errorFromMJSONWPStatusCode', function () {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function () {
      var error = _step2.value;

      if (error.errorName !== 'NotYetImplementedError') {
        it(error.errorCode + ' should return correct error', function () {
          if (error.errorCode) {
            (0, _2.errorFromMJSONWPStatusCode)(error.errorCode).should.have.property('jsonwpCode', error.errorCode);
            (0, _2.errorFromMJSONWPStatusCode)(error.errorCode).should.have.property('message', error.errorMsg);
            if (!_lodash2['default'].includes([13, 33], error.errorCode)) {
              (0, _2.errorFromMJSONWPStatusCode)(error.errorCode, 'abcd').should.have.property('jsonwpCode', error.errorCode);
              (0, _2.errorFromMJSONWPStatusCode)(error.errorCode, 'abcd').should.have.property('message', 'abcd');
            }
          } else {
            (0, _2.isErrorType)((0, _2.errorFromMJSONWPStatusCode)(error.errorCode), _2.errors.UnknownError).should.be['true'];
          }
        });
      }
    };

    for (var _iterator2 = _getIterator(errorsList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
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

  it('should throw unknown error for unknown code', function () {
    (0, _2.errorFromMJSONWPStatusCode)(99).should.have.property('jsonwpCode', 13);
    (0, _2.errorFromMJSONWPStatusCode)(99).should.have.property('message', 'An unknown server-side error occurred ' + 'while processing the command.');
  });
});
describe('errorFromW3CJsonCode', function () {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    var _loop3 = function () {
      var error = _step3.value;

      if (error.errorName !== 'NotYetImplementedError') {
        it(error.errorName + ' should return correct error', function () {
          var w3cError = error.error;

          if (w3cError) {
            (0, _2.errorFromW3CJsonCode)(w3cError).error.should.equal(error.error);
            (0, _2.errorFromW3CJsonCode)(w3cError).should.have.property('message', error.errorMsg);
          } else {
            (0, _2.isErrorType)((0, _2.errorFromW3CJsonCode)(w3cError), _2.errors.UnknownError).should.be['true'];
          }
        });
      }
    };

    for (var _iterator3 = _getIterator(errorsList), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      _loop3();
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  it('should parse unknown errors', function () {
    (0, _2.isErrorType)((0, _2.errorFromW3CJsonCode)('not a real error code'), _2.errors.UnknownError).should.be['true'];
    (0, _2.errorFromW3CJsonCode)('not a real error code').message.should.match(/An unknown server-side error occurred/);
    (0, _2.errorFromW3CJsonCode)('not a real error code').error.should.equal('unknown error');
  });
});
describe('w3c Status Codes', function () {
  it('should match the correct error codes', function () {
    var non400Errors = [['NoSuchDriverError', 404], ['JavaScriptError', 500], ['MoveTargetOutOfBoundsError', 500], ['NoSuchCookieError', 404], ['NoSuchElementError', 404], ['ScriptTimeoutError', 408], ['SessionNotCreatedError', 500], ['TimeoutError', 408], ['UnableToSetCookieError', 500], ['UnableToCaptureScreen', 500], ['UnexpectedAlertOpenError', 500], ['UnknownCommandError', 404], ['UnknownError', 500], ['UnknownMethodError', 405], ['UnsupportedOperationError', 500]];

    // Test the errors that we don't expect to return 400 code
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _getIterator(non400Errors), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _step4$value = _slicedToArray(_step4.value, 2);

        var errorName = _step4$value[0];
        var expectedErrorCode = _step4$value[1];

        _2.errors[errorName].should.exist;
        new _2.errors[errorName]().should.have.property('w3cStatus', expectedErrorCode);
      }

      // Test an error that we expect to return 400 code
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    new _2.errors.NoSuchFrameError().should.have.property('w3cStatus', 400);
  });
});
describe('.getResponseForW3CError', function () {
  it('should return an error, message and stacktrace for just a generic exception', function () {
    try {
      throw new Error('Some random error');
    } catch (e) {
      var _getResponseForW3CError = (0, _libProtocolErrors.getResponseForW3CError)(e);

      var _getResponseForW3CError2 = _slicedToArray(_getResponseForW3CError, 2);

      var httpStatus = _getResponseForW3CError2[0];
      var httpResponseBody = _getResponseForW3CError2[1];

      httpStatus.should.equal(500);
      var _httpResponseBody$value = httpResponseBody.value;
      var error = _httpResponseBody$value.error;
      var message = _httpResponseBody$value.message;
      var stacktrace = _httpResponseBody$value.stacktrace;

      message.should.match(/Some random error/);
      error.should.equal('unknown error');
      stacktrace.should.match(/at getResponseForW3CError/);
      stacktrace.should.match(/Some random error/);
      stacktrace.should.match(/errors-specs.js/);
    }
  });
  it('should return an error, message and stacktrace for a NoSuchElementError', function () {
    var noSuchElementError = new _2.errors.NoSuchElementError('specific error message');

    var _getResponseForW3CError3 = (0, _libProtocolErrors.getResponseForW3CError)(noSuchElementError);

    var _getResponseForW3CError32 = _slicedToArray(_getResponseForW3CError3, 2);

    var httpStatus = _getResponseForW3CError32[0];
    var httpResponseBody = _getResponseForW3CError32[1];

    httpStatus.should.equal(404);
    var _httpResponseBody$value2 = httpResponseBody.value;
    var error = _httpResponseBody$value2.error;
    var message = _httpResponseBody$value2.message;
    var stacktrace = _httpResponseBody$value2.stacktrace;

    error.should.equal('no such element');
    message.should.match(/specific error message/);
    stacktrace.should.match(/errors-specs.js/);
  });
  it('should handle BadParametersError', function () {
    var badParamsError = new _2.errors.BadParametersError('__FOO__', '__BAR__', '__HELLO_WORLD__');

    var _getResponseForW3CError4 = (0, _libProtocolErrors.getResponseForW3CError)(badParamsError);

    var _getResponseForW3CError42 = _slicedToArray(_getResponseForW3CError4, 2);

    var httpStatus = _getResponseForW3CError42[0];
    var httpResponseBody = _getResponseForW3CError42[1];

    httpStatus.should.equal(400);
    var _httpResponseBody$value3 = httpResponseBody.value;
    var error = _httpResponseBody$value3.error;
    var message = _httpResponseBody$value3.message;
    var stacktrace = _httpResponseBody$value3.stacktrace;

    error.should.equal('invalid argument');
    message.should.match(/__BAR__/);
    message.should.match(/__HELLO_WORLD__/);
    stacktrace.should.match(/errors-specs.js/);
  });
});
describe('.getActualError', function () {
  describe('MJSONWP', function () {
    it('should map a status code 7 no such element error as a NoSuchElementError', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', {
        value: 'does not matter',
        status: 7
      }).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.NoSuchElementError).should.be['true'];
    });
    it('should map a status code 10, StaleElementReferenceError', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', {
        value: 'Does not matter',
        status: 10
      }).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.StaleElementReferenceError).should.be['true'];
    });
    it('should map an unknown error to UnknownError', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', {
        value: 'Does not matter',
        status: -100
      }).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.UnknownError).should.be['true'];
    });
    it('should parse a JSON string', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', JSON.stringify({
        value: 'Does not matter',
        status: -100
      })).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.UnknownError).should.be['true'];
    });
  });

  describe('W3C', function () {
    it('should map a 404 no such element error as a NoSuchElementError', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', {
        value: {
          error: _2.errors.NoSuchElementError.error()
        }
      }, _httpStatusCodes2['default'].NOT_FOUND).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.NoSuchElementError).should.be['true'];
    });
    it('should map a 400 StaleElementReferenceError', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', {
        value: {
          error: _2.errors.StaleElementReferenceError.error()

        }
      }, _httpStatusCodes2['default'].BAD_REQUEST).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.StaleElementReferenceError).should.be['true'];
    });
    it('should map an unknown error to UnknownError', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', null, {
        value: {
          error: 'Not a valid w3c JSON code'

        }
      }, 456).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.UnknownError).should.be['true'];
    });
    it('should parse a JSON string', function () {
      var actualError = new _2.errors.ProxyRequestError('Error message does not matter', JSON.stringify({
        value: {
          error: _2.errors.StaleElementReferenceError.error()

        }
      }), _httpStatusCodes2['default'].BAD_REQUEST).getActualError();
      (0, _2.isErrorType)(actualError, _2.errors.StaleElementReferenceError).should.be['true'];
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcHJvdG9jb2wvZXJyb3JzLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2lCQUFzRixPQUFPOztpQ0FDdEQsMkJBQTJCOztvQkFDakQsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7K0JBQ00sbUJBQW1COzs7O0FBRS9DLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7Ozs7QUFJZCxJQUFJLFVBQVUsR0FBRyxDQUNmO0FBQ0UsV0FBUyxFQUFFLG1CQUFtQjtBQUM5QixVQUFRLEVBQUUsK0NBQStDO0FBQ3pELE9BQUssRUFBRSxvQkFBb0I7QUFDM0IsV0FBUyxFQUFFLENBQUM7Q0FDYixFQUNEO0FBQ0UsV0FBUyxFQUFFLDhCQUE4QjtBQUN6QyxVQUFRLEVBQUUsK0lBQStJO0FBQ3pKLE9BQUssRUFBRSwyQkFBMkI7Q0FDbkMsRUFDRDtBQUNFLFdBQVMsRUFBRSw2QkFBNkI7QUFDeEMsVUFBUSxFQUFFLCtGQUErRjtBQUN6RyxPQUFLLEVBQUUsMEJBQTBCO0NBQ2xDLEVBQ0Q7QUFDRSxXQUFTLEVBQUUsMEJBQTBCO0FBQ3JDLFVBQVEsRUFBRSxxSUFBcUk7QUFDL0ksT0FBSyxFQUFFLHNCQUFzQjtDQUM5QixFQUNEO0FBQ0UsV0FBUyxFQUFFLHNCQUFzQjtBQUNqQyxVQUFRLEVBQUUscUVBQXFFO0FBQy9FLE9BQUssRUFBRSxrQkFBa0I7Q0FDMUIsRUFDRDtBQUNFLFdBQVMsRUFBRSxvQkFBb0I7QUFDL0IsVUFBUSxFQUFFLHdEQUF3RCxHQUM5RCwwQkFBMEI7QUFDOUIsT0FBSyxFQUFFLGlCQUFpQjtBQUN4QixXQUFTLEVBQUUsQ0FBQztDQUNiLEVBQ0Q7QUFDRSxXQUFTLEVBQUUsa0JBQWtCO0FBQzdCLFVBQVEsRUFBRSx3REFBd0QsR0FDOUQsdUNBQXVDO0FBQzNDLE9BQUssRUFBRSxlQUFlO0FBQ3RCLFdBQVMsRUFBRSxDQUFDO0NBQ2IsRUFDRDtB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Q0FBQywrQkFBK0IsRUFBRSxJQUFJLEVBQUU7QUFDdEYsYUFBSyxFQUFFO0FBQ0wsZUFBSyxFQUFFLDJCQUEyQjs7U0FFbkM7T0FDRixFQUFFLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3pCLDBCQUFZLFdBQVcsRUFBRSxVQUFPLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztLQUM5RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsNEJBQTRCLEVBQUUsWUFBWTtBQUMzQyxVQUFNLFdBQVcsR0FBRyxJQUFJLFVBQU8saUJBQWlCLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMvRixhQUFLLEVBQUU7QUFDTCxlQUFLLEVBQUUsVUFBTywwQkFBMEIsQ0FBQyxLQUFLLEVBQUU7O1NBRWpEO09BQ0YsQ0FBQyxFQUFFLDZCQUFnQixXQUFXLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNsRCwwQkFBWSxXQUFXLEVBQUUsVUFBTywwQkFBMEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztLQUM1RSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9wcm90b2NvbC9lcnJvcnMtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvcnMsIGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlLCBlcnJvckZyb21XM0NKc29uQ29kZSwgaXNFcnJvclR5cGUgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBnZXRSZXNwb25zZUZvclczQ0Vycm9yIH0gZnJvbSAnLi4vLi4vbGliL3Byb3RvY29sL2Vycm9ycyc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgSFRUUFN0YXR1c0NvZGVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuY2hhaS5zaG91bGQoKTtcblxuLy8gRXJyb3IgY29kZXMgYW5kIG1lc3NhZ2VzIGhhdmUgYmVlbiBhZGRlZCBhY2NvcmRpbmcgdG8gSnNvbldpcmVQcm90b2NvbCBzZWVcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avc2VsZW5pdW0vd2lraS9Kc29uV2lyZVByb3RvY29sI1Jlc3BvbnNlX1N0YXR1c19Db2Rlc1xubGV0IGVycm9yc0xpc3QgPSBbXG4gIHtcbiAgICBlcnJvck5hbWU6ICdOb1N1Y2hEcml2ZXJFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdBIHNlc3Npb24gaXMgZWl0aGVyIHRlcm1pbmF0ZWQgb3Igbm90IHN0YXJ0ZWQnLFxuICAgIGVycm9yOiAnaW52YWxpZCBzZXNzaW9uIGlkJyxcbiAgICBlcnJvckNvZGU6IDZcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ0VsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3InLFxuICAgIGVycm9yTXNnOiAnVGhlIEVsZW1lbnQgQ2xpY2sgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgcmVjZWl2aW5nIHRoZSBldmVudHMgaXMgb2JzY3VyaW5nIHRoZSBlbGVtZW50IHRoYXQgd2FzIHJlcXVlc3RlZCBjbGlja2VkJyxcbiAgICBlcnJvcjogJ2VsZW1lbnQgY2xpY2sgaW50ZXJjZXB0ZWQnLFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnRWxlbWVudE5vdEludGVyYWN0YWJsZUVycm9yJyxcbiAgICBlcnJvck1zZzogJ0EgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgaXMgbm90IHBvaW50ZXItIG9yIGtleWJvYXJkIGludGVyYWN0YWJsZScsXG4gICAgZXJyb3I6ICdlbGVtZW50IG5vdCBpbnRlcmFjdGFibGUnLFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnSW5zZWN1cmVDZXJ0aWZpY2F0ZUVycm9yJyxcbiAgICBlcnJvck1zZzogJ05hdmlnYXRpb24gY2F1c2VkIHRoZSB1c2VyIGFnZW50IHRvIGhpdCBhIGNlcnRpZmljYXRlIHdhcm5pbmcsIHdoaWNoIGlzIHVzdWFsbHkgdGhlIHJlc3VsdCBvZiBhbiBleHBpcmVkIG9yIGludmFsaWQgVExTIGNlcnRpZmljYXRlJyxcbiAgICBlcnJvcjogJ2luc2VjdXJlIGNlcnRpZmljYXRlJyxcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ0ludmFsaWRBcmd1bWVudEVycm9yJyxcbiAgICBlcnJvck1zZzogJ1RoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBjb21tYW5kIGFyZSBlaXRoZXIgaW52YWxpZCBvciBtYWxmb3JtZWQnLFxuICAgIGVycm9yOiAnaW52YWxpZCBhcmd1bWVudCcsXG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdOb1N1Y2hFbGVtZW50RXJyb3InLFxuICAgIGVycm9yTXNnOiAnQW4gZWxlbWVudCBjb3VsZCBub3QgYmUgbG9jYXRlZCBvbiB0aGUgcGFnZSB1c2luZyB0aGUgJyArXG4gICAgICAgICdnaXZlbiBzZWFyY2ggcGFyYW1ldGVycy4nLFxuICAgIGVycm9yOiAnbm8gc3VjaCBlbGVtZW50JyxcbiAgICBlcnJvckNvZGU6IDdcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ05vU3VjaEZyYW1lRXJyb3InLFxuICAgIGVycm9yTXNnOiAnQSByZXF1ZXN0IHRvIHN3aXRjaCB0byBhIGZyYW1lIGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQgJyArXG4gICAgICAgICdiZWNhdXNlIHRoZSBmcmFtZSBjb3VsZCBub3QgYmUgZm91bmQuJyxcbiAgICBlcnJvcjogJ25vIHN1Y2ggZnJhbWUnLFxuICAgIGVycm9yQ29kZTogOFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnVW5rbm93bkNvbW1hbmRFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdUaGUgcmVxdWVzdGVkIHJlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZCwgb3IgYSByZXF1ZXN0ICcgK1xuICAgICAgICAnd2FzIHJlY2VpdmVkIHVzaW5nIGFuIEhUVFAgbWV0aG9kIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSAnICtcbiAgICAgICAgJ3RoZSBtYXBwZWQgcmVzb3VyY2UuJyxcbiAgICBlcnJvcjogJ3Vua25vd24gY29tbWFuZCcsXG4gICAgZXJyb3JDb2RlOiA5XG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdBbiBlbGVtZW50IGNvbW1hbmQgZmFpbGVkIGJlY2F1c2UgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyAnICtcbiAgICAgICAgJ25vIGxvbmdlciBhdHRhY2hlZCB0byB0aGUgRE9NLicsXG4gICAgZXJyb3I6ICdzdGFsZSBlbGVtZW50IHJlZmVyZW5jZScsXG4gICAgZXJyb3JDb2RlOiAxMFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnRWxlbWVudE5vdFZpc2libGVFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSAnICtcbiAgICAgICAgJ2VsZW1lbnQgaXMgbm90IHZpc2libGUgb24gdGhlIHBhZ2UuJyxcbiAgICBlcnJvckNvZGU6IDExXG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3InLFxuICAgIGVycm9yTXNnOiAnQW4gZWxlbWVudCBjb21tYW5kIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgYmVjYXVzZSB0aGUgZWxlbWVudCAnICtcbiAgICAgICAgJ2lzIGluIGFuIGludmFsaWQgc3RhdGUgKGUuZy4gYXR0ZW1wdGluZyB0byBjbGljayBhIGRpc2FibGVkICcgK1xuICAgICAgICAnZWxlbWVudCkuJyxcbiAgICBlcnJvcjogJ2ludmFsaWQgZWxlbWVudCBzdGF0ZScsXG4gICAgZXJyb3JDb2RlOiAxMlxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnVW5rbm93bkVycm9yJyxcbiAgICBlcnJvck1zZzogJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgJyArXG4gICAgICAgICdjb21tYW5kLicsXG4gICAgZXJyb3I6ICd1bmtub3duIGVycm9yJyxcbiAgICBlcnJvckNvZGU6IDEzXG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3InLFxuICAgIGVycm9yTXNnOiAnQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBzZWxlY3QgYW4gZWxlbWVudCB0aGF0IGNhbm5vdCAnICtcbiAgICAgICAgJ2JlIHNlbGVjdGVkLicsXG4gICAgZXJyb3I6ICdlbGVtZW50IG5vdCBzZWxlY3RhYmxlJyxcbiAgICBlcnJvckNvZGU6IDE1XG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdKYXZhU2NyaXB0RXJyb3InLFxuICAgIGVycm9yTXNnOiAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZXhlY3V0aW5nIHVzZXIgc3VwcGxpZWQgSmF2YVNjcmlwdC4nLFxuICAgIGVycm9yOiAnamF2YXNjcmlwdCBlcnJvcicsXG4gICAgZXJyb3JDb2RlOiAxN1xuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnWFBhdGhMb29rdXBFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzZWFyY2hpbmcgZm9yIGFuIGVsZW1lbnQgYnkgWFBhdGguJyxcbiAgICBlcnJvckNvZGU6IDE5XG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdUaW1lb3V0RXJyb3InLFxuICAgIGVycm9yTXNnOiAnQW4gb3BlcmF0aW9uIGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgICBlcnJvcjogJ3RpbWVvdXQnLFxuICAgIGVycm9yQ29kZTogMjFcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ05vU3VjaFdpbmRvd0Vycm9yJyxcbiAgICBlcnJvck1zZzogJ0EgcmVxdWVzdCB0byBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgd2luZG93IGNvdWxkIG5vdCBiZSAnICtcbiAgICAgICAgJ3NhdGlzZmllZCBiZWNhdXNlIHRoZSB3aW5kb3cgY291bGQgbm90IGJlIGZvdW5kLicsXG4gICAgZXJyb3I6ICdubyBzdWNoIHdpbmRvdycsXG4gICAgZXJyb3JDb2RlOiAyM1xuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnSW52YWxpZENvb2tpZURvbWFpbkVycm9yJyxcbiAgICBlcnJvck1zZzogJ0FuIGlsbGVnYWwgYXR0ZW1wdCB3YXMgbWFkZSB0byBzZXQgYSBjb29raWUgdW5kZXIgYSBkaWZmZXJlbnQgJyArXG4gICAgICAgICdkb21haW4gdGhhbiB0aGUgY3VycmVudCBwYWdlLicsXG4gICAgZXJyb3I6ICdpbnZhbGlkIGNvb2tpZSBkb21haW4nLFxuICAgIGVycm9yQ29kZTogMjRcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ0ludmFsaWRDb29yZGluYXRlc0Vycm9yJyxcbiAgICBlcnJvck1zZzogJ1RoZSBjb29yZGluYXRlcyBwcm92aWRlZCB0byBhbiBpbnRlcmFjdGlvbnMgb3BlcmF0aW9uIGFyZSBpbnZhbGlkJyxcbiAgICBlcnJvcjogJ2ludmFsaWQgY29vcmRpbmF0ZXMnLFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnVW5hYmxlVG9TZXRDb29raWVFcnJvcicsXG4gICAgZXJyb3JNc2c6IGBBIHJlcXVlc3QgdG8gc2V0IGEgY29va2llJ3MgdmFsdWUgY291bGQgbm90IGJlIHNhdGlzZmllZC5gLFxuICAgIGVycm9yOiAndW5hYmxlIHRvIHNldCBjb29raWUnLFxuICAgIGVycm9yQ29kZTogMjVcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ1VuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcicsXG4gICAgZXJyb3JNc2c6ICdBIG1vZGFsIGRpYWxvZyB3YXMgb3BlbiwgYmxvY2tpbmcgdGhpcyBvcGVyYXRpb24nLFxuICAgIGVycm9yOiAndW5leHBlY3RlZCBhbGVydCBvcGVuJyxcbiAgICBlcnJvckNvZGU6IDI2XG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdOb0FsZXJ0T3BlbkVycm9yJyxcbiAgICBlcnJvck1zZzogJ0FuIGF0dGVtcHQgd2FzIG1hZGUgdG8gb3BlcmF0ZSBvbiBhIG1vZGFsIGRpYWxvZyB3aGVuIG9uZSB3YXMgJyArXG4gICAgICAgICdub3Qgb3Blbi4nLFxuICAgIGVycm9yQ29kZTogMjdcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ1NjcmlwdFRpbWVvdXRFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdBIHNjcmlwdCBkaWQgbm90IGNvbXBsZXRlIGJlZm9yZSBpdHMgdGltZW91dCBleHBpcmVkLicsXG4gICAgZXJyb3I6ICdzY3JpcHQgdGltZW91dCcsXG4gICAgZXJyb3JDb2RlOiAyOFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnSW52YWxpZEVsZW1lbnRDb29yZGluYXRlc0Vycm9yJyxcbiAgICBlcnJvck1zZzogJ1RoZSBjb29yZGluYXRlcyBwcm92aWRlZCB0byBhbiBpbnRlcmFjdGlvbnMgb3BlcmF0aW9uIGFyZSAnICtcbiAgICAgICAgJ2ludmFsaWQuJyxcbiAgICBlcnJvckNvZGU6IDI5XG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdJTUVOb3RBdmFpbGFibGVFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdJTUUgd2FzIG5vdCBhdmFpbGFibGUuJyxcbiAgICBlcnJvckNvZGU6IDMwXG4gIH0sXG4gIHtcbiAgICBlcnJvck5hbWU6ICdJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3InLFxuICAgIGVycm9yTXNnOiAnQW4gSU1FIGVuZ2luZSBjb3VsZCBub3QgYmUgc3RhcnRlZC4nLFxuICAgIGVycm9yQ29kZTogMzFcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ0ludmFsaWRTZWxlY3RvckVycm9yJyxcbiAgICBlcnJvck1zZzogJ0FyZ3VtZW50IHdhcyBhbiBpbnZhbGlkIHNlbGVjdG9yIChlLmcuIFhQYXRoL0NTUykuJyxcbiAgICBlcnJvcjogJ2ludmFsaWQgc2VsZWN0b3InLFxuICAgIGVycm9yQ29kZTogMzJcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ1Nlc3Npb25Ob3RDcmVhdGVkRXJyb3InLFxuICAgIGVycm9yTXNnOiAnQSBuZXcgc2Vzc2lvbiBjb3VsZCBub3QgYmUgY3JlYXRlZC4nLFxuICAgIGVycm9yOiAnc2Vzc2lvbiBub3QgY3JlYXRlZCcsXG4gICAgZXJyb3JDb2RlOiAzM1xuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3InLFxuICAgIGVycm9yTXNnOiAnVGFyZ2V0IHByb3ZpZGVkIGZvciBhIG1vdmUgYWN0aW9uIGlzIG91dCBvZiBib3VuZHMuJyxcbiAgICBlcnJvcjogJ21vdmUgdGFyZ2V0IG91dCBvZiBib3VuZHMnLFxuICAgIGVycm9yQ29kZTogMzRcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ05vU3VjaEFsZXJ0RXJyb3InLFxuICAgIGVycm9yTXNnOiAnVGhlIHRhcmdldCBmb3IgbW91c2UgaW50ZXJhY3Rpb24gaXMgbm90IGluIHRoZSBicm93c2Vy4oCZcyB2aWV3cG9ydCBhbmQgY2Fubm90IGJlIGJyb3VnaHQgaW50byB0aGF0IHZpZXdwb3J0JyxcbiAgICBlcnJvcjogJ25vIHN1Y2ggYWxlcnQnLFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnTm9TdWNoQ29va2llRXJyb3InLFxuICAgIGVycm9yTXNnOiAnTm8gY29va2llIG1hdGNoaW5nIHRoZSBnaXZlbiBwYXRoIG5hbWUgd2FzIGZvdW5kIGFtb25nc3QgdGhlIGFzc29jaWF0ZWQgY29va2llcyBvZiB0aGUgY3VycmVudCBicm93c2luZyBjb250ZXh04oCZcyBhY3RpdmUgZG9jdW1lbnQnLFxuICAgIGVycm9yOiAnbm8gc3VjaCBjb29raWUnLFxuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnTm90WWV0SW1wbGVtZW50ZWRFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdNZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZCcsXG4gICAgZXJyb3I6ICd1bmtub3duIG1ldGhvZCcsXG4gICAgZXJyb3JDb2RlOiAxM1xuICB9LFxuICB7XG4gICAgZXJyb3JOYW1lOiAnVW5rbm93bkNvbW1hbmRFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdUaGUgcmVxdWVzdGVkIHJlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZCwgb3IgYSByZXF1ZXN0IHdhcyByZWNlaXZlZCB1c2luZyBhbiBIVFRQIG1ldGhvZCB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIG1hcHBlZCByZXNvdXJjZS4nLFxuICAgIGVycm9yOiAndW5rbm93biBjb21tYW5kJyxcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ1Vua25vd25NZXRob2RFcnJvcicsXG4gICAgZXJyb3JNc2c6ICdUaGUgcmVxdWVzdGVkIGNvbW1hbmQgbWF0Y2hlZCBhIGtub3duIFVSTCBidXQgZGlkIG5vdCBtYXRjaCBhbiBtZXRob2QgZm9yIHRoYXQgVVJMJyxcbiAgICBlcnJvcjogJ3Vua25vd24gbWV0aG9kJyxcbiAgfSxcbiAge1xuICAgIGVycm9yTmFtZTogJ1Vuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3InLFxuICAgIGVycm9yTXNnOiAnQSBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZC4gQ29tbWFuZCBjYW5ub3QgYmUgc3VwcG9ydGVkLicsXG4gICAgZXJyb3I6ICd1bnN1cHBvcnRlZCBvcGVyYXRpb24nLFxuICB9LFxuXTtcblxuZGVzY3JpYmUoJ2Vycm9ycycsIGZ1bmN0aW9uICgpIHtcbiAgZm9yIChsZXQgZXJyb3Igb2YgZXJyb3JzTGlzdCkge1xuICAgIGl0KGVycm9yLmVycm9yTmFtZSArICcgc2hvdWxkIGhhdmUgYSBKU09OV1AgY29kZSBvciBXM0MgY29kZSBhbmQgbWVzc2cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZXJyb3IuZXJyb3JDb2RlKSB7XG4gICAgICAgIG5ldyBlcnJvcnNbZXJyb3IuZXJyb3JOYW1lXSgpXG4gICAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdqc29ud3BDb2RlJywgZXJyb3IuZXJyb3JDb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBlcnJvcnNbZXJyb3IuZXJyb3JOYW1lXSgpXG4gICAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdlcnJvcicsIGVycm9yLmVycm9yKTtcbiAgICAgIH1cbiAgICAgIG5ldyBlcnJvcnNbZXJyb3IuZXJyb3JOYW1lXSgpXG4gICAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnbWVzc2FnZScsIGVycm9yLmVycm9yTXNnKTtcbiAgICB9KTtcbiAgfVxuICBpdCgnQmFkUGFyYW1ldGVyc0Vycm9yIHNob3VsZCBub3QgaGF2ZSBjb2RlIGFuZCBzaG91bGQgaGF2ZSBtZXNzZycsIGZ1bmN0aW9uICgpIHtcbiAgICBuZXcgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcigpXG4gICAgICAuc2hvdWxkLm5vdC5oYXZlLnByb3BlcnR5KCdqc29ud3BDb2RlJyk7XG4gICAgbmV3IGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IoKVxuICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdtZXNzYWdlJyk7XG4gIH0pO1xuICBpdCgnUHJveHlSZXF1ZXN0RXJyb3Igc2hvdWxkIGhhdmUgbWVzc2FnZSBhbmQganNvbndwJywgZnVuY3Rpb24gKCkge1xuICAgIG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoKVxuICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cCcpO1xuICAgIG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoKVxuICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnKTtcbiAgfSk7XG59KTtcbmRlc2NyaWJlKCdlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZScsIGZ1bmN0aW9uICgpIHtcbiAgZm9yIChsZXQgZXJyb3Igb2YgZXJyb3JzTGlzdCkge1xuICAgIGlmIChlcnJvci5lcnJvck5hbWUgIT09ICdOb3RZZXRJbXBsZW1lbnRlZEVycm9yJykge1xuICAgICAgaXQoZXJyb3IuZXJyb3JDb2RlICsgJyBzaG91bGQgcmV0dXJuIGNvcnJlY3QgZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChlcnJvci5lcnJvckNvZGUpIHtcbiAgICAgICAgICBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZShlcnJvci5lcnJvckNvZGUpXG4gICAgICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cENvZGUnLCBlcnJvci5lcnJvckNvZGUpO1xuICAgICAgICAgIGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlKGVycm9yLmVycm9yQ29kZSlcbiAgICAgICAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnbWVzc2FnZScsIGVycm9yLmVycm9yTXNnKTtcbiAgICAgICAgICBpZiAoIV8uaW5jbHVkZXMoWzEzLCAzM10sIGVycm9yLmVycm9yQ29kZSkpIHtcbiAgICAgICAgICAgIGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlKGVycm9yLmVycm9yQ29kZSwgJ2FiY2QnKVxuICAgICAgICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cENvZGUnLCBlcnJvci5lcnJvckNvZGUpO1xuICAgICAgICAgICAgZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUoZXJyb3IuZXJyb3JDb2RlLCAnYWJjZCcpXG4gICAgICAgICAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnbWVzc2FnZScsICdhYmNkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzRXJyb3JUeXBlKGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlKGVycm9yLmVycm9yQ29kZSksIGVycm9ycy5Vbmtub3duRXJyb3IpLnNob3VsZC5iZS50cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgaXQoJ3Nob3VsZCB0aHJvdyB1bmtub3duIGVycm9yIGZvciB1bmtub3duIGNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUoOTkpXG4gICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cENvZGUnLCAxMyk7XG4gICAgZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUoOTkpXG4gICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnLCAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3aGlsZSBwcm9jZXNzaW5nIHRoZSBjb21tYW5kLicpO1xuICB9KTtcbn0pO1xuZGVzY3JpYmUoJ2Vycm9yRnJvbVczQ0pzb25Db2RlJywgZnVuY3Rpb24gKCkge1xuICBmb3IgKGxldCBlcnJvciBvZiBlcnJvcnNMaXN0KSB7XG4gICAgaWYgKGVycm9yLmVycm9yTmFtZSAhPT0gJ05vdFlldEltcGxlbWVudGVkRXJyb3InKSB7XG4gICAgICBpdChlcnJvci5lcnJvck5hbWUgKyAnIHNob3VsZCByZXR1cm4gY29ycmVjdCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qge2Vycm9yOnczY0Vycm9yfSA9IGVycm9yO1xuICAgICAgICBpZiAodzNjRXJyb3IpIHtcbiAgICAgICAgICBlcnJvckZyb21XM0NKc29uQ29kZSh3M2NFcnJvcikuZXJyb3Iuc2hvdWxkLmVxdWFsKGVycm9yLmVycm9yKTtcbiAgICAgICAgICBlcnJvckZyb21XM0NKc29uQ29kZSh3M2NFcnJvcikuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnLCBlcnJvci5lcnJvck1zZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNFcnJvclR5cGUoZXJyb3JGcm9tVzNDSnNvbkNvZGUodzNjRXJyb3IpLCBlcnJvcnMuVW5rbm93bkVycm9yKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGl0KCdzaG91bGQgcGFyc2UgdW5rbm93biBlcnJvcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXNFcnJvclR5cGUoZXJyb3JGcm9tVzNDSnNvbkNvZGUoJ25vdCBhIHJlYWwgZXJyb3IgY29kZScpLCBlcnJvcnMuVW5rbm93bkVycm9yKS5zaG91bGQuYmUudHJ1ZTtcbiAgICBlcnJvckZyb21XM0NKc29uQ29kZSgnbm90IGEgcmVhbCBlcnJvciBjb2RlJykubWVzc2FnZS5zaG91bGQubWF0Y2goL0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQvKTtcbiAgICBlcnJvckZyb21XM0NKc29uQ29kZSgnbm90IGEgcmVhbCBlcnJvciBjb2RlJykuZXJyb3Iuc2hvdWxkLmVxdWFsKCd1bmtub3duIGVycm9yJyk7XG4gIH0pO1xufSk7XG5kZXNjcmliZSgndzNjIFN0YXR1cyBDb2RlcycsIGZ1bmN0aW9uICgpIHtcbiAgaXQoJ3Nob3VsZCBtYXRjaCB0aGUgY29ycmVjdCBlcnJvciBjb2RlcycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbm9uNDAwRXJyb3JzID0gW1xuICAgICAgWydOb1N1Y2hEcml2ZXJFcnJvcicsIDQwNF0sXG4gICAgICBbJ0phdmFTY3JpcHRFcnJvcicsIDUwMF0sXG4gICAgICBbJ01vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yJywgNTAwXSxcbiAgICAgIFsnTm9TdWNoQ29va2llRXJyb3InLCA0MDRdLFxuICAgICAgWydOb1N1Y2hFbGVtZW50RXJyb3InLCA0MDRdLFxuICAgICAgWydTY3JpcHRUaW1lb3V0RXJyb3InLCA0MDhdLFxuICAgICAgWydTZXNzaW9uTm90Q3JlYXRlZEVycm9yJywgNTAwXSxcbiAgICAgIFsnVGltZW91dEVycm9yJywgNDA4XSxcbiAgICAgIFsnVW5hYmxlVG9TZXRDb29raWVFcnJvcicsIDUwMF0sXG4gICAgICBbJ1VuYWJsZVRvQ2FwdHVyZVNjcmVlbicsIDUwMF0sXG4gICAgICBbJ1VuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcicsIDUwMF0sXG4gICAgICBbJ1Vua25vd25Db21tYW5kRXJyb3InLCA0MDRdLFxuICAgICAgWydVbmtub3duRXJyb3InLCA1MDBdLFxuICAgICAgWydVbmtub3duTWV0aG9kRXJyb3InLCA0MDVdLFxuICAgICAgWydVbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yJywgNTAwXSxcbiAgICBdO1xuXG4gICAgLy8gVGVzdCB0aGUgZXJyb3JzIHRoYXQgd2UgZG9uJ3QgZXhwZWN0IHRvIHJldHVybiA0MDAgY29kZVxuICAgIGZvciAobGV0IFtlcnJvck5hbWUsIGV4cGVjdGVkRXJyb3JDb2RlXSBvZiBub240MDBFcnJvcnMpIHtcbiAgICAgIGVycm9yc1tlcnJvck5hbWVdLnNob3VsZC5leGlzdDtcbiAgICAgIChuZXcgZXJyb3JzW2Vycm9yTmFtZV0oKSkuc2hvdWxkLmhhdmUucHJvcGVydHkoJ3czY1N0YXR1cycsIGV4cGVjdGVkRXJyb3JDb2RlKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGFuIGVycm9yIHRoYXQgd2UgZXhwZWN0IHRvIHJldHVybiA0MDAgY29kZVxuICAgIChuZXcgZXJyb3JzLk5vU3VjaEZyYW1lRXJyb3IoKSkuc2hvdWxkLmhhdmUucHJvcGVydHkoJ3czY1N0YXR1cycsIDQwMCk7XG4gIH0pO1xufSk7XG5kZXNjcmliZSgnLmdldFJlc3BvbnNlRm9yVzNDRXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yLCBtZXNzYWdlIGFuZCBzdGFja3RyYWNlIGZvciBqdXN0IGEgZ2VuZXJpYyBleGNlcHRpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZSByYW5kb20gZXJyb3InKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBbaHR0cFN0YXR1cywgaHR0cFJlc3BvbnNlQm9keV0gPSBnZXRSZXNwb25zZUZvclczQ0Vycm9yKGUpO1xuICAgICAgaHR0cFN0YXR1cy5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIGNvbnN0IHtlcnJvciwgbWVzc2FnZSwgc3RhY2t0cmFjZX0gPSBodHRwUmVzcG9uc2VCb2R5LnZhbHVlO1xuICAgICAgbWVzc2FnZS5zaG91bGQubWF0Y2goL1NvbWUgcmFuZG9tIGVycm9yLyk7XG4gICAgICBlcnJvci5zaG91bGQuZXF1YWwoJ3Vua25vd24gZXJyb3InKTtcbiAgICAgIHN0YWNrdHJhY2Uuc2hvdWxkLm1hdGNoKC9hdCBnZXRSZXNwb25zZUZvclczQ0Vycm9yLyk7XG4gICAgICBzdGFja3RyYWNlLnNob3VsZC5tYXRjaCgvU29tZSByYW5kb20gZXJyb3IvKTtcbiAgICAgIHN0YWNrdHJhY2Uuc2hvdWxkLm1hdGNoKC9lcnJvcnMtc3BlY3MuanMvKTtcbiAgICB9XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciwgbWVzc2FnZSBhbmQgc3RhY2t0cmFjZSBmb3IgYSBOb1N1Y2hFbGVtZW50RXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgbm9TdWNoRWxlbWVudEVycm9yID0gbmV3IGVycm9ycy5Ob1N1Y2hFbGVtZW50RXJyb3IoJ3NwZWNpZmljIGVycm9yIG1lc3NhZ2UnKTtcbiAgICBjb25zdCBbaHR0cFN0YXR1cywgaHR0cFJlc3BvbnNlQm9keV0gPSBnZXRSZXNwb25zZUZvclczQ0Vycm9yKG5vU3VjaEVsZW1lbnRFcnJvcik7XG4gICAgaHR0cFN0YXR1cy5zaG91bGQuZXF1YWwoNDA0KTtcbiAgICBjb25zdCB7ZXJyb3IsIG1lc3NhZ2UsIHN0YWNrdHJhY2V9ID0gaHR0cFJlc3BvbnNlQm9keS52YWx1ZTtcbiAgICBlcnJvci5zaG91bGQuZXF1YWwoJ25vIHN1Y2ggZWxlbWVudCcpO1xuICAgIG1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9zcGVjaWZpYyBlcnJvciBtZXNzYWdlLyk7XG4gICAgc3RhY2t0cmFjZS5zaG91bGQubWF0Y2goL2Vycm9ycy1zcGVjcy5qcy8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBoYW5kbGUgQmFkUGFyYW1ldGVyc0Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGJhZFBhcmFtc0Vycm9yID0gbmV3IGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IoJ19fRk9PX18nLCAnX19CQVJfXycsICdfX0hFTExPX1dPUkxEX18nKTtcbiAgICBjb25zdCBbaHR0cFN0YXR1cywgaHR0cFJlc3BvbnNlQm9keV0gPSBnZXRSZXNwb25zZUZvclczQ0Vycm9yKGJhZFBhcmFtc0Vycm9yKTtcbiAgICBodHRwU3RhdHVzLnNob3VsZC5lcXVhbCg0MDApO1xuICAgIGNvbnN0IHtlcnJvciwgbWVzc2FnZSwgc3RhY2t0cmFjZX0gPSBodHRwUmVzcG9uc2VCb2R5LnZhbHVlO1xuICAgIGVycm9yLnNob3VsZC5lcXVhbCgnaW52YWxpZCBhcmd1bWVudCcpO1xuICAgIG1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9fX0JBUl9fLyk7XG4gICAgbWVzc2FnZS5zaG91bGQubWF0Y2goL19fSEVMTE9fV09STERfXy8pO1xuICAgIHN0YWNrdHJhY2Uuc2hvdWxkLm1hdGNoKC9lcnJvcnMtc3BlY3MuanMvKTtcbiAgfSk7XG59KTtcbmRlc2NyaWJlKCcuZ2V0QWN0dWFsRXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdNSlNPTldQJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgbWFwIGEgc3RhdHVzIGNvZGUgNyBubyBzdWNoIGVsZW1lbnQgZXJyb3IgYXMgYSBOb1N1Y2hFbGVtZW50RXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBhY3R1YWxFcnJvciA9IG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoJ0Vycm9yIG1lc3NhZ2UgZG9lcyBub3QgbWF0dGVyJywge1xuICAgICAgICB2YWx1ZTogJ2RvZXMgbm90IG1hdHRlcicsXG4gICAgICAgIHN0YXR1czogNyxcbiAgICAgIH0pLmdldEFjdHVhbEVycm9yKCk7XG4gICAgICBpc0Vycm9yVHlwZShhY3R1YWxFcnJvciwgZXJyb3JzLk5vU3VjaEVsZW1lbnRFcnJvcikuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBtYXAgYSBzdGF0dXMgY29kZSAxMCwgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBhY3R1YWxFcnJvciA9IG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoJ0Vycm9yIG1lc3NhZ2UgZG9lcyBub3QgbWF0dGVyJywge1xuICAgICAgICB2YWx1ZTogJ0RvZXMgbm90IG1hdHRlcicsXG4gICAgICAgIHN0YXR1czogMTAsXG4gICAgICB9KS5nZXRBY3R1YWxFcnJvcigpO1xuICAgICAgaXNFcnJvclR5cGUoYWN0dWFsRXJyb3IsIGVycm9ycy5TdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvcikuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBtYXAgYW4gdW5rbm93biBlcnJvciB0byBVbmtub3duRXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBhY3R1YWxFcnJvciA9IG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoJ0Vycm9yIG1lc3NhZ2UgZG9lcyBub3QgbWF0dGVyJywge1xuICAgICAgICB2YWx1ZTogJ0RvZXMgbm90IG1hdHRlcicsXG4gICAgICAgIHN0YXR1czogLTEwMFxuICAgICAgfSkuZ2V0QWN0dWFsRXJyb3IoKTtcbiAgICAgIGlzRXJyb3JUeXBlKGFjdHVhbEVycm9yLCBlcnJvcnMuVW5rbm93bkVycm9yKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGEgSlNPTiBzdHJpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBhY3R1YWxFcnJvciA9IG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoJ0Vycm9yIG1lc3NhZ2UgZG9lcyBub3QgbWF0dGVyJywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2YWx1ZTogJ0RvZXMgbm90IG1hdHRlcicsXG4gICAgICAgIHN0YXR1czogLTEwMFxuICAgICAgfSkpLmdldEFjdHVhbEVycm9yKCk7XG4gICAgICBpc0Vycm9yVHlwZShhY3R1YWxFcnJvciwgZXJyb3JzLlVua25vd25FcnJvcikuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdXM0MnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBtYXAgYSA0MDQgbm8gc3VjaCBlbGVtZW50IGVycm9yIGFzIGEgTm9TdWNoRWxlbWVudEVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgYWN0dWFsRXJyb3IgPSBuZXcgZXJyb3JzLlByb3h5UmVxdWVzdEVycm9yKCdFcnJvciBtZXNzYWdlIGRvZXMgbm90IG1hdHRlcicsIHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBlcnJvcjogZXJyb3JzLk5vU3VjaEVsZW1lbnRFcnJvci5lcnJvcigpLFxuICAgICAgICB9LFxuICAgICAgfSwgSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORCkuZ2V0QWN0dWFsRXJyb3IoKTtcbiAgICAgIGlzRXJyb3JUeXBlKGFjdHVhbEVycm9yLCBlcnJvcnMuTm9TdWNoRWxlbWVudEVycm9yKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG1hcCBhIDQwMCBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGFjdHVhbEVycm9yID0gbmV3IGVycm9ycy5Qcm94eVJlcXVlc3RFcnJvcignRXJyb3IgbWVzc2FnZSBkb2VzIG5vdCBtYXR0ZXInLCB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgZXJyb3I6IGVycm9ycy5TdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvci5lcnJvcigpLFxuXG4gICAgICAgIH0sXG4gICAgICB9LCBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1QpLmdldEFjdHVhbEVycm9yKCk7XG4gICAgICBpc0Vycm9yVHlwZShhY3R1YWxFcnJvciwgZXJyb3JzLlN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG1hcCBhbiB1bmtub3duIGVycm9yIHRvIFVua25vd25FcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGFjdHVhbEVycm9yID0gbmV3IGVycm9ycy5Qcm94eVJlcXVlc3RFcnJvcignRXJyb3IgbWVzc2FnZSBkb2VzIG5vdCBtYXR0ZXInLCBudWxsLCB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgZXJyb3I6ICdOb3QgYSB2YWxpZCB3M2MgSlNPTiBjb2RlJ1xuXG4gICAgICAgIH0sXG4gICAgICB9LCA0NTYpLmdldEFjdHVhbEVycm9yKCk7XG4gICAgICBpc0Vycm9yVHlwZShhY3R1YWxFcnJvciwgZXJyb3JzLlVua25vd25FcnJvcikuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBhIEpTT04gc3RyaW5nJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgYWN0dWFsRXJyb3IgPSBuZXcgZXJyb3JzLlByb3h5UmVxdWVzdEVycm9yKCdFcnJvciBtZXNzYWdlIGRvZXMgbm90IG1hdHRlcicsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBlcnJvcjogZXJyb3JzLlN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yLmVycm9yKCksXG5cbiAgICAgICAgfSxcbiAgICAgIH0pLCBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1QpLmdldEFjdHVhbEVycm9yKCk7XG4gICAgICBpc0Vycm9yVHlwZShhY3R1YWxFcnJvciwgZXJyb3JzLlN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

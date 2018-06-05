'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _validators = require('./validators');

var _errors = require('./errors');

var _routes = require('./routes');

var _basedriverHelpers = require('../basedriver/helpers');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var mjsonwpLog = _appiumSupport.logger.getLogger('MJSONWP');
var w3cLog = _appiumSupport.logger.getLogger('W3C');

var JSONWP_SUCCESS_STATUS_CODE = 0;
// TODO: Make this value configurable as a server side capability
var LOG_OBJ_LENGTH = 1024; // MAX LENGTH Logged to file / console

var MJSONWP_ELEMENT_KEY = 'ELEMENT';
var W3C_ELEMENT_KEY = 'element-6066-11e4-a52e-4f735466cecf';

var Protocol = function Protocol() {
  _classCallCheck(this, Protocol);
};

function getLogByProtocol(driver) {
  return driver.isW3CProtocol() ? w3cLog : mjsonwpLog;
}

function isSessionCommand(command) {
  return !_lodash2['default'].includes(_routes.NO_SESSION_ID_COMMANDS, command);
}

function wrapParams(paramSets, jsonObj) {
  /* There are commands like performTouch which take a single parameter (primitive type or array).
   * Some drivers choose to pass this parameter as a value (eg. [action1, action2...]) while others to
   * wrap it within an object(eg' {gesture:  [action1, action2...]}), which makes it hard to validate.
   * The wrap option in the spec enforce wrapping before validation, so that all params are wrapped at
   * the time they are validated and later passed to the commands.
   */
  var res = jsonObj;
  if (_lodash2['default'].isArray(jsonObj) || !_lodash2['default'].isObject(jsonObj)) {
    res = {};
    res[paramSets.wrap] = jsonObj;
  }
  return res;
}

function unwrapParams(paramSets, jsonObj) {
  /* There are commands like setNetworkConnection which send parameters wrapped inside a key such as
   * "parameters". This function unwraps them (eg. {"parameters": {"type": 1}} becomes {"type": 1}).
   */
  var res = jsonObj;
  if (_lodash2['default'].isObject(jsonObj)) {
    // some clients, like ruby, don't wrap
    if (jsonObj[paramSets.unwrap]) {
      res = jsonObj[paramSets.unwrap];
    }
  }
  return res;
}

function checkParams(paramSets, jsonObj, protocol) {
  var requiredParams = [];
  var optionalParams = [];
  var receivedParams = _lodash2['default'].keys(jsonObj);

  if (paramSets) {
    if (paramSets.required) {
      // we might have an array of parameters,
      // or an array of arrays of parameters, so standardize
      if (!_lodash2['default'].isArray(_lodash2['default'].first(paramSets.required))) {
        requiredParams = [paramSets.required];
      } else {
        requiredParams = paramSets.required;
      }
    }
    // optional parameters are just an array
    if (paramSets.optional) {
      optionalParams = paramSets.optional;
    }

    // If a function was provided as the 'validate' key, it will here be called with
    // jsonObj as the param. If it returns something falsy, verification will be
    // considered to have passed. If it returns something else, that will be the
    // argument to an error which is thrown to the user
    if (paramSets.validate) {
      var message = paramSets.validate(jsonObj, protocol);
      if (message) {
        throw new _errors.errors.BadParametersError(message, jsonObj);
      }
    }
  }

  // if we have no required parameters, all is well
  if (requiredParams.length === 0) {
    return;
  }

  // some clients pass in the session id in the params
  if (optionalParams.indexOf('sessionId') === -1) {
    optionalParams.push('sessionId');
  }

  // some clients pass in an element id in the params
  if (optionalParams.indexOf('id') === -1) {
    optionalParams.push('id');
  }

  // go through the required parameters and check against our arguments
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(requiredParams), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var params = _step.value;

      if (_lodash2['default'].difference(receivedParams, params, optionalParams).length === 0 && _lodash2['default'].difference(params, receivedParams).length === 0) {
        // we have a set of parameters that is correct
        // so short-circuit
        return;
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

  throw new _errors.errors.BadParametersError(paramSets, receivedParams);
}

/*
 * This method takes 3 pieces of data: request parameters ('requestParams'),
 * a request JSON body ('jsonObj'), and 'payloadParams', which is the section
 * from the route definition for a particular endpoint which has instructions
 * on handling parameters. This method returns an array of arguments which will
 * be applied to a command.
 */
function makeArgs(requestParams, jsonObj, payloadParams, protocol) {
  // We want to pass the "url" parameters to the commands in reverse order
  // since the command will sometimes want to ignore, say, the sessionId.
  // This has the effect of putting sessionId last, which means in JS we can
  // omit it from the function signature if we're not going to use it.
  var urlParams = _lodash2['default'].keys(requestParams).reverse();

  // In the simple case, the required parameters are a basic array in
  // payloadParams.required, so start there. It's possible that there are
  // multiple optional sets of required params, though, so handle that case
  // too.
  var requiredParams = payloadParams.required;
  if (_lodash2['default'].isArray(_lodash2['default'].first(payloadParams.required))) {
    // If there are optional sets of required params, then we will have an
    // array of arrays in payloadParams.required, so loop through each set and
    // pick the one that matches which JSON params were actually sent. We've
    // already been through validation so we're guaranteed to find a match.
    var keys = _lodash2['default'].keys(jsonObj);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(payloadParams.required), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var params = _step2.value;

        if (_lodash2['default'].without.apply(_lodash2['default'], [params].concat(_toConsumableArray(keys))).length === 0) {
          requiredParams = params;
          break;
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

  // Now we construct our list of arguments which will be passed to the command
  var args = undefined;
  if (_lodash2['default'].isFunction(payloadParams.makeArgs)) {
    // In the route spec, a particular route might define a 'makeArgs' function
    // if it wants full control over how to turn JSON parameters into command
    // arguments. So we pass it the JSON parameters and it returns an array
    // which will be applied to the handling command. For example if it returns
    // [1, 2, 3], we will call `command(1, 2, 3, ...)` (url params are separate
    // from JSON params and get concatenated below).
    args = payloadParams.makeArgs(jsonObj, protocol);
  } else {
    // Otherwise, collect all the required and optional params and flatten them
    // into an argument array
    args = _lodash2['default'].flatten(requiredParams).map(function (p) {
      return jsonObj[p];
    });
    if (payloadParams.optional) {
      args = args.concat(_lodash2['default'].flatten(payloadParams.optional).map(function (p) {
        return jsonObj[p];
      }));
    }
  }
  // Finally, get our url params (session id, element id, etc...) on the end of
  // the list
  args = args.concat(urlParams.map(function (u) {
    return requestParams[u];
  }));
  return args;
}

function routeConfiguringFunction(driver) {
  if (!driver.sessionExists) {
    throw new Error('Drivers used with MJSONWP must implement `sessionExists`');
  }

  if (!(driver.executeCommand || driver.execute)) {
    throw new Error('Drivers used with MJSONWP must implement `executeCommand` or `execute`');
  }

  // return a function which will add all the routes to the driver
  return function (app) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(_routes.METHOD_MAP)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2);

        var path = _step3$value[0];
        var methods = _step3$value[1];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _getIterator(_lodash2['default'].toPairs(methods)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = _slicedToArray(_step4.value, 2);

            var method = _step4$value[0];
            var spec = _step4$value[1];

            // set up the express route handler
            buildHandler(app, method, path, spec, driver, isSessionCommand(spec.command));
          }
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
  };
}

function buildHandler(app, method, path, spec, driver, isSessCmd) {
  var _this = this;

  var asyncHandler = function asyncHandler(req, res) {
    var jsonObj, httpResBody, httpStatus, newSessionId, log, args, driverRes, actualErr, _ref, _ref2;

    return _regeneratorRuntime.async(function asyncHandler$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          jsonObj = req.body;
          httpResBody = {};
          httpStatus = 200;
          newSessionId = undefined;
          log = getLogByProtocol(driver);
          context$2$0.prev = 5;

          if (!(isSessCmd && !driver.sessionExists(req.params.sessionId))) {
            context$2$0.next = 8;
            break;
          }

          throw new _errors.errors.NoSuchDriverError();

        case 8:
          if (!(isSessCmd && driverShouldDoJwpProxy(driver, req, spec.command))) {
            context$2$0.next = 12;
            break;
          }

          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(doJwpProxy(driver, req, res));

        case 11:
          return context$2$0.abrupt('return');

        case 12:
          if (spec.command) {
            context$2$0.next = 14;
            break;
          }

          throw new _errors.errors.NotImplementedError();

        case 14:

          // wrap params if necessary
          if (spec.payloadParams && spec.payloadParams.wrap) {
            jsonObj = wrapParams(spec.payloadParams, jsonObj);
          }

          // unwrap params if necessary
          if (spec.payloadParams && spec.payloadParams.unwrap) {
            jsonObj = unwrapParams(spec.payloadParams, jsonObj);
          }

          // ensure that the json payload conforms to the spec
          checkParams(spec.payloadParams, jsonObj, driver.protocol);
          // ensure the session the user is trying to use is valid

          // turn the command and json payload into an argument list for
          // the driver methods
          args = makeArgs(req.params, jsonObj, spec.payloadParams || [], driver.protocol);
          driverRes = undefined;

          // validate command args according to MJSONWP
          if (_validators.validators[spec.command]) {
            _validators.validators[spec.command].apply(_validators.validators, _toConsumableArray(args));
          }

          // run the driver command wrapped inside the argument validators
          log.debug('Calling ' + driver.constructor.name + '.' + spec.command + '() with args: ' + _lodash2['default'].truncate(JSON.stringify(args), { length: LOG_OBJ_LENGTH }));

          if (!driver.executeCommand) {
            context$2$0.next = 27;
            break;
          }

          context$2$0.next = 24;
          return _regeneratorRuntime.awrap(driver.executeCommand.apply(driver, [spec.command].concat(_toConsumableArray(args))));

        case 24:
          driverRes = context$2$0.sent;
          context$2$0.next = 30;
          break;

        case 27:
          context$2$0.next = 29;
          return _regeneratorRuntime.awrap(driver.execute.apply(driver, [spec.command].concat(_toConsumableArray(args))));

        case 29:
          driverRes = context$2$0.sent;

        case 30:

          // unpack createSession response
          if (spec.command === 'createSession') {
            newSessionId = driverRes[0];
            if (driver.isMjsonwpProtocol()) {
              driverRes = driverRes[1];
            } else if (driver.isW3CProtocol()) {
              driverRes = {
                capabilities: driverRes[1]
              };
            }
          }

          // If the MJSONWP element key format (ELEMENT) was provided translate it to W3C element key format (element-6066-11e4-a52e-4f735466cecf)
          // and vice-versa
          if (driverRes) {
            if (driver.isW3CProtocol()) {
              driverRes = (0, _basedriverHelpers.renameKey)(driverRes, MJSONWP_ELEMENT_KEY, W3C_ELEMENT_KEY);
            } else {
              driverRes = (0, _basedriverHelpers.renameKey)(driverRes, W3C_ELEMENT_KEY, MJSONWP_ELEMENT_KEY);
            }
          }

          // convert undefined to null, but leave all other values the same
          if (_lodash2['default'].isUndefined(driverRes)) {
            driverRes = null;
          }

          // delete should not return anything even if successful
          if (spec.command === 'deleteSession') {
            log.debug('Received response: ' + _lodash2['default'].truncate(JSON.stringify(driverRes), { length: LOG_OBJ_LENGTH }));
            log.debug('But deleting session, so not returning');
            driverRes = null;
          }

          // if the status is not 0,  throw the appropriate error for status code.

          if (!_appiumSupport.util.hasValue(driverRes)) {
            context$2$0.next = 41;
            break;
          }

          if (!(_appiumSupport.util.hasValue(driverRes.status) && !isNaN(driverRes.status) && parseInt(driverRes.status, 10) !== 0)) {
            context$2$0.next = 39;
            break;
          }

          throw (0, _errors.errorFromMJSONWPStatusCode)(driverRes.status, driverRes.value);

        case 39:
          if (!(_lodash2['default'].isPlainObject(driverRes.value) && driverRes.value.error)) {
            context$2$0.next = 41;
            break;
          }

          throw (0, _errors.errorFromW3CJsonCode)(driverRes.value.error, driverRes.value.message);

        case 41:

          // Response status should be the status set by the driver response.
          if (driver.isMjsonwpProtocol()) {
            httpResBody.status = _lodash2['default'].isNil(driverRes) || _lodash2['default'].isUndefined(driverRes.status) ? JSONWP_SUCCESS_STATUS_CODE : driverRes.status;
          }
          httpResBody.value = driverRes;
          log.debug('Responding to client with driver.' + spec.command + '() ' + ('result: ' + _lodash2['default'].truncate(JSON.stringify(driverRes), { length: LOG_OBJ_LENGTH })));
          context$2$0.next = 54;
          break;

        case 46:
          context$2$0.prev = 46;
          context$2$0.t0 = context$2$0['catch'](5);
          actualErr = context$2$0.t0;

          if ((0, _errors.isErrorType)(context$2$0.t0, _errors.errors.ProxyRequestError)) {
            log.error('Encountered internal error running command:  ' + JSON.stringify(context$2$0.t0) + ' ' + context$2$0.t0.stack);
            actualErr = context$2$0.t0.getActualError(driver.protocol);
          } else if (driver.isMjsonwpProtocol() && !((0, _errors.isErrorType)(context$2$0.t0, _errors.ProtocolError) || (0, _errors.isErrorType)(context$2$0.t0, _errors.errors.BadParametersError))) {
            log.error('Encountered internal error running command: ' + context$2$0.t0.stack);
            actualErr = new _errors.errors.UnknownError(context$2$0.t0);
          }

          _ref = driver.isMjsonwpProtocol() ? (0, _errors.getResponseForJsonwpError)(actualErr) : (0, _errors.getResponseForW3CError)(actualErr);
          _ref2 = _slicedToArray(_ref, 2);
          httpStatus = _ref2[0];
          httpResBody = _ref2[1];

        case 54:

          // decode the response, which is either a string or json
          if (_lodash2['default'].isString(httpResBody)) {
            res.status(httpStatus).send(httpResBody);
          } else {
            if (newSessionId) {
              if (driver.isW3CProtocol()) {
                httpResBody.value.sessionId = newSessionId;
              } else {
                httpResBody.sessionId = newSessionId;
              }
            } else {
              httpResBody.sessionId = req.params.sessionId || null;
            }

            // Don't include sessionId in W3C responses
            if (driver.isW3CProtocol()) {
              delete httpResBody.sessionId;
            }

            res.status(httpStatus).json(httpResBody);
          }

        case 55:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[5, 46]]);
  };
  // add the method to the app
  app[method.toLowerCase()](path, function (req, res) {
    _bluebird2['default'].resolve(asyncHandler(req, res)).done();
  });
}

function driverShouldDoJwpProxy(driver, req, command) {
  // drivers need to explicitly say when the proxy is active
  if (!driver.proxyActive(req.params.sessionId)) {
    return false;
  }

  // we should never proxy deleteSession because we need to give the containing
  // driver an opportunity to clean itself up
  if (command === 'deleteSession') {
    return false;
  }

  // validate avoidance schema, and say we shouldn't proxy if anything in the
  // avoid list matches our req
  var proxyAvoidList = driver.getProxyAvoidList(req.params.sessionId);
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(proxyAvoidList), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var avoidSchema = _step5.value;

      if (!_lodash2['default'].isArray(avoidSchema) || avoidSchema.length !== 2) {
        throw new Error('Proxy avoidance must be a list of pairs');
      }

      var _avoidSchema = _slicedToArray(avoidSchema, 2);

      var avoidMethod = _avoidSchema[0];
      var avoidPathRegex = _avoidSchema[1];

      if (!_lodash2['default'].includes(['GET', 'POST', 'DELETE'], avoidMethod)) {
        throw new Error('Unrecognized proxy avoidance method \'' + avoidMethod + '\'');
      }
      if (!(avoidPathRegex instanceof RegExp)) {
        throw new Error('Proxy avoidance path must be a regular expression');
      }
      var normalizedUrl = req.originalUrl.replace(/^\/wd\/hub/, '');
      if (avoidMethod === req.method && avoidPathRegex.test(normalizedUrl)) {
        return false;
      }
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

  return true;
}

function doJwpProxy(driver, req, res) {
  return _regeneratorRuntime.async(function doJwpProxy$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        getLogByProtocol(driver).info('Driver proxy active, passing request on via HTTP proxy');

        // check that the inner driver has a proxy function

        if (driver.canProxy(req.params.sessionId)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error('Trying to proxy to a JSONWP server but driver is unable to proxy');

      case 3:
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(driver.executeCommand('proxyReqRes', req, res, req.params.sessionId));

      case 6:
        context$1$0.next = 15;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](3);

        if (!(0, _errors.isErrorType)(context$1$0.t0, _errors.errors.ProxyRequestError)) {
          context$1$0.next = 14;
          break;
        }

        throw context$1$0.t0;

      case 14:
        throw new Error('Could not proxy. Proxy error: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 8]]);
}

exports.Protocol = Protocol;
exports.routeConfiguringFunction = routeConfiguringFunction;
exports.isSessionCommand = isSessionCommand;
exports.MJSONWP_ELEMENT_KEY = MJSONWP_ELEMENT_KEY;
exports.W3C_ELEMENT_KEY = W3C_ELEMENT_KEY;

// get the appropriate logger depending on the protocol that is being used

// if this is a session command but we don't have a session,
// error out early (especially before proxying)

// if the driver is currently proxying commands to another JSONWP
// server, bypass all our checks and assume the upstream server knows
// what it's doing. But keep this in the try/catch block so if proxying
// itself fails, we give a message to the client. Of course we only
// want to do these when we have a session command; the Appium driver
// must be responsible for start/stop session, etc...

// if a command is not in our method map, it's because we
// have no plans to ever implement it

// if anything goes wrong, figure out what our response should be
// based on the type of error that we encountered
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm90b2NvbC9wcm90b2NvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7Ozs2QkFDTyxnQkFBZ0I7OzBCQUNsQixjQUFjOztzQkFDK0csVUFBVTs7c0JBQy9HLFVBQVU7O2lDQUNuQyx1QkFBdUI7O3dCQUNuQyxVQUFVOzs7O0FBR3hCLElBQU0sVUFBVSxHQUFHLHNCQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQyxJQUFNLE1BQU0sR0FBRyxzQkFBTyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXZDLElBQU0sMEJBQTBCLEdBQUcsQ0FBQyxDQUFDOztBQUVyQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUM7O0FBRTVCLElBQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0FBQ3RDLElBQU0sZUFBZSxHQUFHLHFDQUFxQyxDQUFDOztJQUV4RCxRQUFRLFlBQVIsUUFBUTt3QkFBUixRQUFROzs7QUFFZCxTQUFTLGdCQUFnQixDQUFFLE1BQU0sRUFBRTtBQUNqQyxTQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO0NBQ3JEOztBQUVELFNBQVMsZ0JBQWdCLENBQUUsT0FBTyxFQUFFO0FBQ2xDLFNBQU8sQ0FBQyxvQkFBRSxRQUFRLGlDQUF5QixPQUFPLENBQUMsQ0FBQztDQUNyRDs7QUFFRCxTQUFTLFVBQVUsQ0FBRSxTQUFTLEVBQUUsT0FBTyxFQUFFOzs7Ozs7O0FBT3ZDLE1BQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztBQUNsQixNQUFJLG9CQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM5QyxPQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ1QsT0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7R0FDL0I7QUFDRCxTQUFPLEdBQUcsQ0FB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IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBsb2dnZXIsIHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyB2YWxpZGF0b3JzIH0gZnJvbSAnLi92YWxpZGF0b3JzJztcbmltcG9ydCB7IGVycm9ycywgaXNFcnJvclR5cGUsIFByb3RvY29sRXJyb3IsIGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlLCBlcnJvckZyb21XM0NKc29uQ29kZSwgZ2V0UmVzcG9uc2VGb3JXM0NFcnJvciwgZ2V0UmVzcG9uc2VGb3JKc29ud3BFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IE1FVEhPRF9NQVAsIE5PX1NFU1NJT05fSURfQ09NTUFORFMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgeyByZW5hbWVLZXkgfSBmcm9tICcuLi9iYXNlZHJpdmVyL2hlbHBlcnMnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5cbmNvbnN0IG1qc29ud3BMb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdNSlNPTldQJyk7XG5jb25zdCB3M2NMb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdXM0MnKTtcblxuY29uc3QgSlNPTldQX1NVQ0NFU1NfU1RBVFVTX0NPREUgPSAwO1xuLy8gVE9ETzogTWFrZSB0aGlzIHZhbHVlIGNvbmZpZ3VyYWJsZSBhcyBhIHNlcnZlciBzaWRlIGNhcGFiaWxpdHlcbmNvbnN0IExPR19PQkpfTEVOR1RIID0gMTAyNDsgLy8gTUFYIExFTkdUSCBMb2dnZWQgdG8gZmlsZSAvIGNvbnNvbGVcblxuY29uc3QgTUpTT05XUF9FTEVNRU5UX0tFWSA9ICdFTEVNRU5UJztcbmNvbnN0IFczQ19FTEVNRU5UX0tFWSA9ICdlbGVtZW50LTYwNjYtMTFlNC1hNTJlLTRmNzM1NDY2Y2VjZic7XG5cbmNsYXNzIFByb3RvY29sIHt9XG5cbmZ1bmN0aW9uIGdldExvZ0J5UHJvdG9jb2wgKGRyaXZlcikge1xuICByZXR1cm4gZHJpdmVyLmlzVzNDUHJvdG9jb2woKSA/IHczY0xvZyA6IG1qc29ud3BMb2c7XG59XG5cbmZ1bmN0aW9uIGlzU2Vzc2lvbkNvbW1hbmQgKGNvbW1hbmQpIHtcbiAgcmV0dXJuICFfLmluY2x1ZGVzKE5PX1NFU1NJT05fSURfQ09NTUFORFMsIGNvbW1hbmQpO1xufVxuXG5mdW5jdGlvbiB3cmFwUGFyYW1zIChwYXJhbVNldHMsIGpzb25PYmopIHtcbiAgLyogVGhlcmUgYXJlIGNvbW1hbmRzIGxpa2UgcGVyZm9ybVRvdWNoIHdoaWNoIHRha2UgYSBzaW5nbGUgcGFyYW1ldGVyIChwcmltaXRpdmUgdHlwZSBvciBhcnJheSkuXG4gICAqIFNvbWUgZHJpdmVycyBjaG9vc2UgdG8gcGFzcyB0aGlzIHBhcmFtZXRlciBhcyBhIHZhbHVlIChlZy4gW2FjdGlvbjEsIGFjdGlvbjIuLi5dKSB3aGlsZSBvdGhlcnMgdG9cbiAgICogd3JhcCBpdCB3aXRoaW4gYW4gb2JqZWN0KGVnJyB7Z2VzdHVyZTogIFthY3Rpb24xLCBhY3Rpb24yLi4uXX0pLCB3aGljaCBtYWtlcyBpdCBoYXJkIHRvIHZhbGlkYXRlLlxuICAgKiBUaGUgd3JhcCBvcHRpb24gaW4gdGhlIHNwZWMgZW5mb3JjZSB3cmFwcGluZyBiZWZvcmUgdmFsaWRhdGlvbiwgc28gdGhhdCBhbGwgcGFyYW1zIGFyZSB3cmFwcGVkIGF0XG4gICAqIHRoZSB0aW1lIHRoZXkgYXJlIHZhbGlkYXRlZCBhbmQgbGF0ZXIgcGFzc2VkIHRvIHRoZSBjb21tYW5kcy5cbiAgICovXG4gIGxldCByZXMgPSBqc29uT2JqO1xuICBpZiAoXy5pc0FycmF5KGpzb25PYmopIHx8ICFfLmlzT2JqZWN0KGpzb25PYmopKSB7XG4gICAgcmVzID0ge307XG4gICAgcmVzW3BhcmFtU2V0cy53cmFwXSA9IGpzb25PYmo7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gdW53cmFwUGFyYW1zIChwYXJhbVNldHMsIGpzb25PYmopIHtcbiAgLyogVGhlcmUgYXJlIGNvbW1hbmRzIGxpa2Ugc2V0TmV0d29ya0Nvbm5lY3Rpb24gd2hpY2ggc2VuZCBwYXJhbWV0ZXJzIHdyYXBwZWQgaW5zaWRlIGEga2V5IHN1Y2ggYXNcbiAgICogXCJwYXJhbWV0ZXJzXCIuIFRoaXMgZnVuY3Rpb24gdW53cmFwcyB0aGVtIChlZy4ge1wicGFyYW1ldGVyc1wiOiB7XCJ0eXBlXCI6IDF9fSBiZWNvbWVzIHtcInR5cGVcIjogMX0pLlxuICAgKi9cbiAgbGV0IHJlcyA9IGpzb25PYmo7XG4gIGlmIChfLmlzT2JqZWN0KGpzb25PYmopKSB7XG4gICAgLy8gc29tZSBjbGllbnRzLCBsaWtlIHJ1YnksIGRvbid0IHdyYXBcbiAgICBpZiAoanNvbk9ialtwYXJhbVNldHMudW53cmFwXSkge1xuICAgICAgcmVzID0ganNvbk9ialtwYXJhbVNldHMudW53cmFwXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gY2hlY2tQYXJhbXMgKHBhcmFtU2V0cywganNvbk9iaiwgcHJvdG9jb2wpIHtcbiAgbGV0IHJlcXVpcmVkUGFyYW1zID0gW107XG4gIGxldCBvcHRpb25hbFBhcmFtcyA9IFtdO1xuICBsZXQgcmVjZWl2ZWRQYXJhbXMgPSBfLmtleXMoanNvbk9iaik7XG5cbiAgaWYgKHBhcmFtU2V0cykge1xuICAgIGlmIChwYXJhbVNldHMucmVxdWlyZWQpIHtcbiAgICAgIC8vIHdlIG1pZ2h0IGhhdmUgYW4gYXJyYXkgb2YgcGFyYW1ldGVycyxcbiAgICAgIC8vIG9yIGFuIGFycmF5IG9mIGFycmF5cyBvZiBwYXJhbWV0ZXJzLCBzbyBzdGFuZGFyZGl6ZVxuICAgICAgaWYgKCFfLmlzQXJyYXkoXy5maXJzdChwYXJhbVNldHMucmVxdWlyZWQpKSkge1xuICAgICAgICByZXF1aXJlZFBhcmFtcyA9IFtwYXJhbVNldHMucmVxdWlyZWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWlyZWRQYXJhbXMgPSBwYXJhbVNldHMucmVxdWlyZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnMgYXJlIGp1c3QgYW4gYXJyYXlcbiAgICBpZiAocGFyYW1TZXRzLm9wdGlvbmFsKSB7XG4gICAgICBvcHRpb25hbFBhcmFtcyA9IHBhcmFtU2V0cy5vcHRpb25hbDtcbiAgICB9XG5cbiAgICAvLyBJZiBhIGZ1bmN0aW9uIHdhcyBwcm92aWRlZCBhcyB0aGUgJ3ZhbGlkYXRlJyBrZXksIGl0IHdpbGwgaGVyZSBiZSBjYWxsZWQgd2l0aFxuICAgIC8vIGpzb25PYmogYXMgdGhlIHBhcmFtLiBJZiBpdCByZXR1cm5zIHNvbWV0aGluZyBmYWxzeSwgdmVyaWZpY2F0aW9uIHdpbGwgYmVcbiAgICAvLyBjb25zaWRlcmVkIHRvIGhhdmUgcGFzc2VkLiBJZiBpdCByZXR1cm5zIHNvbWV0aGluZyBlbHNlLCB0aGF0IHdpbGwgYmUgdGhlXG4gICAgLy8gYXJndW1lbnQgdG8gYW4gZXJyb3Igd2hpY2ggaXMgdGhyb3duIHRvIHRoZSB1c2VyXG4gICAgaWYgKHBhcmFtU2V0cy52YWxpZGF0ZSkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBwYXJhbVNldHMudmFsaWRhdGUoanNvbk9iaiwgcHJvdG9jb2wpO1xuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IobWVzc2FnZSwganNvbk9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgd2UgaGF2ZSBubyByZXF1aXJlZCBwYXJhbWV0ZXJzLCBhbGwgaXMgd2VsbFxuICBpZiAocmVxdWlyZWRQYXJhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc29tZSBjbGllbnRzIHBhc3MgaW4gdGhlIHNlc3Npb24gaWQgaW4gdGhlIHBhcmFtc1xuICBpZiAob3B0aW9uYWxQYXJhbXMuaW5kZXhPZignc2Vzc2lvbklkJykgPT09IC0xKSB7XG4gICAgb3B0aW9uYWxQYXJhbXMucHVzaCgnc2Vzc2lvbklkJyk7XG4gIH1cblxuICAvLyBzb21lIGNsaWVudHMgcGFzcyBpbiBhbiBlbGVtZW50IGlkIGluIHRoZSBwYXJhbXNcbiAgaWYgKG9wdGlvbmFsUGFyYW1zLmluZGV4T2YoJ2lkJykgPT09IC0xKSB7XG4gICAgb3B0aW9uYWxQYXJhbXMucHVzaCgnaWQnKTtcbiAgfVxuXG4gIC8vIGdvIHRocm91Z2ggdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgYW5kIGNoZWNrIGFnYWluc3Qgb3VyIGFyZ3VtZW50c1xuICBmb3IgKGxldCBwYXJhbXMgb2YgcmVxdWlyZWRQYXJhbXMpIHtcbiAgICBpZiAoXy5kaWZmZXJlbmNlKHJlY2VpdmVkUGFyYW1zLCBwYXJhbXMsIG9wdGlvbmFsUGFyYW1zKS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgXy5kaWZmZXJlbmNlKHBhcmFtcywgcmVjZWl2ZWRQYXJhbXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gd2UgaGF2ZSBhIHNldCBvZiBwYXJhbWV0ZXJzIHRoYXQgaXMgY29ycmVjdFxuICAgICAgLy8gc28gc2hvcnQtY2lyY3VpdFxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcihwYXJhbVNldHMsIHJlY2VpdmVkUGFyYW1zKTtcbn1cblxuLypcbiAqIFRoaXMgbWV0aG9kIHRha2VzIDMgcGllY2VzIG9mIGRhdGE6IHJlcXVlc3QgcGFyYW1ldGVycyAoJ3JlcXVlc3RQYXJhbXMnKSxcbiAqIGEgcmVxdWVzdCBKU09OIGJvZHkgKCdqc29uT2JqJyksIGFuZCAncGF5bG9hZFBhcmFtcycsIHdoaWNoIGlzIHRoZSBzZWN0aW9uXG4gKiBmcm9tIHRoZSByb3V0ZSBkZWZpbml0aW9uIGZvciBhIHBhcnRpY3VsYXIgZW5kcG9pbnQgd2hpY2ggaGFzIGluc3RydWN0aW9uc1xuICogb24gaGFuZGxpbmcgcGFyYW1ldGVycy4gVGhpcyBtZXRob2QgcmV0dXJucyBhbiBhcnJheSBvZiBhcmd1bWVudHMgd2hpY2ggd2lsbFxuICogYmUgYXBwbGllZCB0byBhIGNvbW1hbmQuXG4gKi9cbmZ1bmN0aW9uIG1ha2VBcmdzIChyZXF1ZXN0UGFyYW1zLCBqc29uT2JqLCBwYXlsb2FkUGFyYW1zLCBwcm90b2NvbCkge1xuICAvLyBXZSB3YW50IHRvIHBhc3MgdGhlIFwidXJsXCIgcGFyYW1ldGVycyB0byB0aGUgY29tbWFuZHMgaW4gcmV2ZXJzZSBvcmRlclxuICAvLyBzaW5jZSB0aGUgY29tbWFuZCB3aWxsIHNvbWV0aW1lcyB3YW50IHRvIGlnbm9yZSwgc2F5LCB0aGUgc2Vzc2lvbklkLlxuICAvLyBUaGlzIGhhcyB0aGUgZWZmZWN0IG9mIHB1dHRpbmcgc2Vzc2lvbklkIGxhc3QsIHdoaWNoIG1lYW5zIGluIEpTIHdlIGNhblxuICAvLyBvbWl0IGl0IGZyb20gdGhlIGZ1bmN0aW9uIHNpZ25hdHVyZSBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdXNlIGl0LlxuICBsZXQgdXJsUGFyYW1zID0gXy5rZXlzKHJlcXVlc3RQYXJhbXMpLnJldmVyc2UoKTtcblxuICAvLyBJbiB0aGUgc2ltcGxlIGNhc2UsIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFyZSBhIGJhc2ljIGFycmF5IGluXG4gIC8vIHBheWxvYWRQYXJhbXMucmVxdWlyZWQsIHNvIHN0YXJ0IHRoZXJlLiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhlcmUgYXJlXG4gIC8vIG11bHRpcGxlIG9wdGlvbmFsIHNldHMgb2YgcmVxdWlyZWQgcGFyYW1zLCB0aG91Z2gsIHNvIGhhbmRsZSB0aGF0IGNhc2VcbiAgLy8gdG9vLlxuICBsZXQgcmVxdWlyZWRQYXJhbXMgPSBwYXlsb2FkUGFyYW1zLnJlcXVpcmVkO1xuICBpZiAoXy5pc0FycmF5KF8uZmlyc3QocGF5bG9hZFBhcmFtcy5yZXF1aXJlZCkpKSB7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG9wdGlvbmFsIHNldHMgb2YgcmVxdWlyZWQgcGFyYW1zLCB0aGVuIHdlIHdpbGwgaGF2ZSBhblxuICAgIC8vIGFycmF5IG9mIGFycmF5cyBpbiBwYXlsb2FkUGFyYW1zLnJlcXVpcmVkLCBzbyBsb29wIHRocm91Z2ggZWFjaCBzZXQgYW5kXG4gICAgLy8gcGljayB0aGUgb25lIHRoYXQgbWF0Y2hlcyB3aGljaCBKU09OIHBhcmFtcyB3ZXJlIGFjdHVhbGx5IHNlbnQuIFdlJ3ZlXG4gICAgLy8gYWxyZWFkeSBiZWVuIHRocm91Z2ggdmFsaWRhdGlvbiBzbyB3ZSdyZSBndWFyYW50ZWVkIHRvIGZpbmQgYSBtYXRjaC5cbiAgICBsZXQga2V5cyA9IF8ua2V5cyhqc29uT2JqKTtcbiAgICBmb3IgKGxldCBwYXJhbXMgb2YgcGF5bG9hZFBhcmFtcy5yZXF1aXJlZCkge1xuICAgICAgaWYgKF8ud2l0aG91dChwYXJhbXMsIC4uLmtleXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXF1aXJlZFBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm93IHdlIGNvbnN0cnVjdCBvdXIgbGlzdCBvZiBhcmd1bWVudHMgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGNvbW1hbmRcbiAgbGV0IGFyZ3M7XG4gIGlmIChfLmlzRnVuY3Rpb24ocGF5bG9hZFBhcmFtcy5tYWtlQXJncykpIHtcbiAgICAvLyBJbiB0aGUgcm91dGUgc3BlYywgYSBwYXJ0aWN1bGFyIHJvdXRlIG1pZ2h0IGRlZmluZSBhICdtYWtlQXJncycgZnVuY3Rpb25cbiAgICAvLyBpZiBpdCB3YW50cyBmdWxsIGNvbnRyb2wgb3ZlciBob3cgdG8gdHVybiBKU09OIHBhcmFtZXRlcnMgaW50byBjb21tYW5kXG4gICAgLy8gYXJndW1lbnRzLiBTbyB3ZSBwYXNzIGl0IHRoZSBKU09OIHBhcmFtZXRlcnMgYW5kIGl0IHJldHVybnMgYW4gYXJyYXlcbiAgICAvLyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGhhbmRsaW5nIGNvbW1hbmQuIEZvciBleGFtcGxlIGlmIGl0IHJldHVybnNcbiAgICAvLyBbMSwgMiwgM10sIHdlIHdpbGwgY2FsbCBgY29tbWFuZCgxLCAyLCAzLCAuLi4pYCAodXJsIHBhcmFtcyBhcmUgc2VwYXJhdGVcbiAgICAvLyBmcm9tIEpTT04gcGFyYW1zIGFuZCBnZXQgY29uY2F0ZW5hdGVkIGJlbG93KS5cbiAgICBhcmdzID0gcGF5bG9hZFBhcmFtcy5tYWtlQXJncyhqc29uT2JqLCBwcm90b2NvbCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlLCBjb2xsZWN0IGFsbCB0aGUgcmVxdWlyZWQgYW5kIG9wdGlvbmFsIHBhcmFtcyBhbmQgZmxhdHRlbiB0aGVtXG4gICAgLy8gaW50byBhbiBhcmd1bWVudCBhcnJheVxuICAgIGFyZ3MgPSBfLmZsYXR0ZW4ocmVxdWlyZWRQYXJhbXMpLm1hcCgocCkgPT4ganNvbk9ialtwXSk7XG4gICAgaWYgKHBheWxvYWRQYXJhbXMub3B0aW9uYWwpIHtcbiAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChfLmZsYXR0ZW4ocGF5bG9hZFBhcmFtcy5vcHRpb25hbCkubWFwKChwKSA9PiBqc29uT2JqW3BdKSk7XG4gICAgfVxuICB9XG4gIC8vIEZpbmFsbHksIGdldCBvdXIgdXJsIHBhcmFtcyAoc2Vzc2lvbiBpZCwgZWxlbWVudCBpZCwgZXRjLi4uKSBvbiB0aGUgZW5kIG9mXG4gIC8vIHRoZSBsaXN0XG4gIGFyZ3MgPSBhcmdzLmNvbmNhdCh1cmxQYXJhbXMubWFwKCh1KSA9PiByZXF1ZXN0UGFyYW1zW3VdKSk7XG4gIHJldHVybiBhcmdzO1xufVxuXG5mdW5jdGlvbiByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24gKGRyaXZlcikge1xuICBpZiAoIWRyaXZlci5zZXNzaW9uRXhpc3RzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEcml2ZXJzIHVzZWQgd2l0aCBNSlNPTldQIG11c3QgaW1wbGVtZW50IGBzZXNzaW9uRXhpc3RzYCcpO1xuICB9XG5cbiAgaWYgKCEoZHJpdmVyLmV4ZWN1dGVDb21tYW5kIHx8IGRyaXZlci5leGVjdXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRHJpdmVycyB1c2VkIHdpdGggTUpTT05XUCBtdXN0IGltcGxlbWVudCBgZXhlY3V0ZUNvbW1hbmRgIG9yIGBleGVjdXRlYCcpO1xuICB9XG5cbiAgLy8gcmV0dXJuIGEgZnVuY3Rpb24gd2hpY2ggd2lsbCBhZGQgYWxsIHRoZSByb3V0ZXMgdG8gdGhlIGRyaXZlclxuICByZXR1cm4gZnVuY3Rpb24gKGFwcCkge1xuICAgIGZvciAobGV0IFtwYXRoLCBtZXRob2RzXSBvZiBfLnRvUGFpcnMoTUVUSE9EX01BUCkpIHtcbiAgICAgIGZvciAobGV0IFttZXRob2QsIHNwZWNdIG9mIF8udG9QYWlycyhtZXRob2RzKSkge1xuICAgICAgICAvLyBzZXQgdXAgdGhlIGV4cHJlc3Mgcm91dGUgaGFuZGxlclxuICAgICAgICBidWlsZEhhbmRsZXIoYXBwLCBtZXRob2QsIHBhdGgsIHNwZWMsIGRyaXZlciwgaXNTZXNzaW9uQ29tbWFuZChzcGVjLmNvbW1hbmQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSGFuZGxlciAoYXBwLCBtZXRob2QsIHBhdGgsIHNwZWMsIGRyaXZlciwgaXNTZXNzQ21kKSB7XG4gIGxldCBhc3luY0hhbmRsZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICBsZXQganNvbk9iaiA9IHJlcS5ib2R5O1xuICAgIGxldCBodHRwUmVzQm9keSA9IHt9O1xuICAgIGxldCBodHRwU3RhdHVzID0gMjAwO1xuICAgIGxldCBuZXdTZXNzaW9uSWQ7XG5cbiAgICAvLyBnZXQgdGhlIGFwcHJvcHJpYXRlIGxvZ2dlciBkZXBlbmRpbmcgb24gdGhlIHByb3RvY29sIHRoYXQgaXMgYmVpbmcgdXNlZFxuICAgIGNvbnN0IGxvZyA9IGdldExvZ0J5UHJvdG9jb2woZHJpdmVyKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBpZiB0aGlzIGlzIGEgc2Vzc2lvbiBjb21tYW5kIGJ1dCB3ZSBkb24ndCBoYXZlIGEgc2Vzc2lvbixcbiAgICAgIC8vIGVycm9yIG91dCBlYXJseSAoZXNwZWNpYWxseSBiZWZvcmUgcHJveHlpbmcpXG4gICAgICBpZiAoaXNTZXNzQ21kICYmICFkcml2ZXIuc2Vzc2lvbkV4aXN0cyhyZXEucGFyYW1zLnNlc3Npb25JZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob1N1Y2hEcml2ZXJFcnJvcigpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgZHJpdmVyIGlzIGN1cnJlbnRseSBwcm94eWluZyBjb21tYW5kcyB0byBhbm90aGVyIEpTT05XUFxuICAgICAgLy8gc2VydmVyLCBieXBhc3MgYWxsIG91ciBjaGVja3MgYW5kIGFzc3VtZSB0aGUgdXBzdHJlYW0gc2VydmVyIGtub3dzXG4gICAgICAvLyB3aGF0IGl0J3MgZG9pbmcuIEJ1dCBrZWVwIHRoaXMgaW4gdGhlIHRyeS9jYXRjaCBibG9jayBzbyBpZiBwcm94eWluZ1xuICAgICAgLy8gaXRzZWxmIGZhaWxzLCB3ZSBnaXZlIGEgbWVzc2FnZSB0byB0aGUgY2xpZW50LiBPZiBjb3Vyc2Ugd2Ugb25seVxuICAgICAgLy8gd2FudCB0byBkbyB0aGVzZSB3aGVuIHdlIGhhdmUgYSBzZXNzaW9uIGNvbW1hbmQ7IHRoZSBBcHBpdW0gZHJpdmVyXG4gICAgICAvLyBtdXN0IGJlIHJlc3BvbnNpYmxlIGZvciBzdGFydC9zdG9wIHNlc3Npb24sIGV0Yy4uLlxuICAgICAgaWYgKGlzU2Vzc0NtZCAmJiBkcml2ZXJTaG91bGREb0p3cFByb3h5KGRyaXZlciwgcmVxLCBzcGVjLmNvbW1hbmQpKSB7XG4gICAgICAgIGF3YWl0IGRvSndwUHJveHkoZHJpdmVyLCByZXEsIHJlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgYSBjb21tYW5kIGlzIG5vdCBpbiBvdXIgbWV0aG9kIG1hcCwgaXQncyBiZWNhdXNlIHdlXG4gICAgICAvLyBoYXZlIG5vIHBsYW5zIHRvIGV2ZXIgaW1wbGVtZW50IGl0XG4gICAgICBpZiAoIXNwZWMuY29tbWFuZCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLk5vdEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICAgIH1cblxuICAgICAgLy8gd3JhcCBwYXJhbXMgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoc3BlYy5wYXlsb2FkUGFyYW1zICYmIHNwZWMucGF5bG9hZFBhcmFtcy53cmFwKSB7XG4gICAgICAgIGpzb25PYmogPSB3cmFwUGFyYW1zKHNwZWMucGF5bG9hZFBhcmFtcywganNvbk9iaik7XG4gICAgICB9XG5cbiAgICAgIC8vIHVud3JhcCBwYXJhbXMgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoc3BlYy5wYXlsb2FkUGFyYW1zICYmIHNwZWMucGF5bG9hZFBhcmFtcy51bndyYXApIHtcbiAgICAgICAganNvbk9iaiA9IHVud3JhcFBhcmFtcyhzcGVjLnBheWxvYWRQYXJhbXMsIGpzb25PYmopO1xuICAgICAgfVxuXG4gICAgICAvLyBlbnN1cmUgdGhhdCB0aGUganNvbiBwYXlsb2FkIGNvbmZvcm1zIHRvIHRoZSBzcGVjXG4gICAgICBjaGVja1BhcmFtcyhzcGVjLnBheWxvYWRQYXJhbXMsIGpzb25PYmosIGRyaXZlci5wcm90b2NvbCk7XG4gICAgICAvLyBlbnN1cmUgdGhlIHNlc3Npb24gdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSBpcyB2YWxpZFxuXG4gICAgICAvLyB0dXJuIHRoZSBjb21tYW5kIGFuZCBqc29uIHBheWxvYWQgaW50byBhbiBhcmd1bWVudCBsaXN0IGZvclxuICAgICAgLy8gdGhlIGRyaXZlciBtZXRob2RzXG4gICAgICBsZXQgYXJncyA9IG1ha2VBcmdzKHJlcS5wYXJhbXMsIGpzb25PYmosIHNwZWMucGF5bG9hZFBhcmFtcyB8fCBbXSwgZHJpdmVyLnByb3RvY29sKTtcbiAgICAgIGxldCBkcml2ZXJSZXM7XG4gICAgICAvLyB2YWxpZGF0ZSBjb21tYW5kIGFyZ3MgYWNjb3JkaW5nIHRvIE1KU09OV1BcbiAgICAgIGlmICh2YWxpZGF0b3JzW3NwZWMuY29tbWFuZF0pIHtcbiAgICAgICAgdmFsaWRhdG9yc1tzcGVjLmNvbW1hbmRdKC4uLmFyZ3MpO1xuICAgICAgfVxuXG4gICAgICAvLyBydW4gdGhlIGRyaXZlciBjb21tYW5kIHdyYXBwZWQgaW5zaWRlIHRoZSBhcmd1bWVudCB2YWxpZGF0b3JzXG4gICAgICBsb2cuZGVidWcoYENhbGxpbmcgJHtkcml2ZXIuY29uc3RydWN0b3IubmFtZX0uJHtzcGVjLmNvbW1hbmR9KCkgd2l0aCBhcmdzOiBgICtcbiAgICAgICAgICAgICAgICBfLnRydW5jYXRlKEpTT04uc3RyaW5naWZ5KGFyZ3MpLCB7bGVuZ3RoOiBMT0dfT0JKX0xFTkdUSH0pKTtcblxuICAgICAgaWYgKGRyaXZlci5leGVjdXRlQ29tbWFuZCkge1xuICAgICAgICBkcml2ZXJSZXMgPSBhd2FpdCBkcml2ZXIuZXhlY3V0ZUNvbW1hbmQoc3BlYy5jb21tYW5kLCAuLi5hcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyaXZlclJlcyA9IGF3YWl0IGRyaXZlci5leGVjdXRlKHNwZWMuY29tbWFuZCwgLi4uYXJncyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVucGFjayBjcmVhdGVTZXNzaW9uIHJlc3BvbnNlXG4gICAgICBpZiAoc3BlYy5jb21tYW5kID09PSAnY3JlYXRlU2Vzc2lvbicpIHtcbiAgICAgICAgbmV3U2Vzc2lvbklkID0gZHJpdmVyUmVzWzBdO1xuICAgICAgICBpZiAoZHJpdmVyLmlzTWpzb253cFByb3RvY29sKCkpIHtcbiAgICAgICAgICBkcml2ZXJSZXMgPSBkcml2ZXJSZXNbMV07XG4gICAgICAgIH0gZWxzZSBpZiAoZHJpdmVyLmlzVzNDUHJvdG9jb2woKSkge1xuICAgICAgICAgIGRyaXZlclJlcyA9IHtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllczogZHJpdmVyUmVzWzFdLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIE1KU09OV1AgZWxlbWVudCBrZXkgZm9ybWF0IChFTEVNRU5UKSB3YXMgcHJvdmlkZWQgdHJhbnNsYXRlIGl0IHRvIFczQyBlbGVtZW50IGtleSBmb3JtYXQgKGVsZW1lbnQtNjA2Ni0xMWU0LWE1MmUtNGY3MzU0NjZjZWNmKVxuICAgICAgLy8gYW5kIHZpY2UtdmVyc2FcbiAgICAgIGlmIChkcml2ZXJSZXMpIHtcbiAgICAgICAgaWYgKGRyaXZlci5pc1czQ1Byb3RvY29sKCkpIHtcbiAgICAgICAgICBkcml2ZXJSZXMgPSByZW5hbWVLZXkoZHJpdmVyUmVzLCBNSlNPTldQX0VMRU1FTlRfS0VZLCBXM0NfRUxFTUVOVF9LRVkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRyaXZlclJlcyA9IHJlbmFtZUtleShkcml2ZXJSZXMsIFczQ19FTEVNRU5UX0tFWSwgTUpTT05XUF9FTEVNRU5UX0tFWSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBjb252ZXJ0IHVuZGVmaW5lZCB0byBudWxsLCBidXQgbGVhdmUgYWxsIG90aGVyIHZhbHVlcyB0aGUgc2FtZVxuICAgICAgaWYgKF8uaXNVbmRlZmluZWQoZHJpdmVyUmVzKSkge1xuICAgICAgICBkcml2ZXJSZXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWxldGUgc2hvdWxkIG5vdCByZXR1cm4gYW55dGhpbmcgZXZlbiBpZiBzdWNjZXNzZnVsXG4gICAgICBpZiAoc3BlYy5jb21tYW5kID09PSAnZGVsZXRlU2Vzc2lvbicpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBSZWNlaXZlZCByZXNwb25zZTogJHtfLnRydW5jYXRlKEpTT04uc3RyaW5naWZ5KGRyaXZlclJlcyksIHtsZW5ndGg6IExPR19PQkpfTEVOR1RIfSl9YCk7XG4gICAgICAgIGxvZy5kZWJ1ZygnQnV0IGRlbGV0aW5nIHNlc3Npb24sIHNvIG5vdCByZXR1cm5pbmcnKTtcbiAgICAgICAgZHJpdmVyUmVzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhlIHN0YXR1cyBpcyBub3QgMCwgIHRocm93IHRoZSBhcHByb3ByaWF0ZSBlcnJvciBmb3Igc3RhdHVzIGNvZGUuXG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZShkcml2ZXJSZXMpKSB7XG4gICAgICAgIGlmICh1dGlsLmhhc1ZhbHVlKGRyaXZlclJlcy5zdGF0dXMpICYmICFpc05hTihkcml2ZXJSZXMuc3RhdHVzKSAmJiBwYXJzZUludChkcml2ZXJSZXMuc3RhdHVzLCAxMCkgIT09IDApIHtcbiAgICAgICAgICB0aHJvdyBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZShkcml2ZXJSZXMuc3RhdHVzLCBkcml2ZXJSZXMudmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNQbGFpbk9iamVjdChkcml2ZXJSZXMudmFsdWUpICYmIGRyaXZlclJlcy52YWx1ZS5lcnJvcikge1xuICAgICAgICAgIHRocm93IGVycm9yRnJvbVczQ0pzb25Db2RlKGRyaXZlclJlcy52YWx1ZS5lcnJvciwgZHJpdmVyUmVzLnZhbHVlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3BvbnNlIHN0YXR1cyBzaG91bGQgYmUgdGhlIHN0YXR1cyBzZXQgYnkgdGhlIGRyaXZlciByZXNwb25zZS5cbiAgICAgIGlmIChkcml2ZXIuaXNNanNvbndwUHJvdG9jb2woKSkge1xuICAgICAgICBodHRwUmVzQm9keS5zdGF0dXMgPSAoXy5pc05pbChkcml2ZXJSZXMpIHx8IF8uaXNVbmRlZmluZWQoZHJpdmVyUmVzLnN0YXR1cykpID8gSlNPTldQX1NVQ0NFU1NfU1RBVFVTX0NPREUgOiBkcml2ZXJSZXMuc3RhdHVzO1xuICAgICAgfVxuICAgICAgaHR0cFJlc0JvZHkudmFsdWUgPSBkcml2ZXJSZXM7XG4gICAgICBsb2cuZGVidWcoYFJlc3BvbmRpbmcgdG8gY2xpZW50IHdpdGggZHJpdmVyLiR7c3BlYy5jb21tYW5kfSgpIGAgK1xuICAgICAgICAgICAgICAgYHJlc3VsdDogJHtfLnRydW5jYXRlKEpTT04uc3RyaW5naWZ5KGRyaXZlclJlcyksIHtsZW5ndGg6IExPR19PQkpfTEVOR1RIfSl9YCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBpZiBhbnl0aGluZyBnb2VzIHdyb25nLCBmaWd1cmUgb3V0IHdoYXQgb3VyIHJlc3BvbnNlIHNob3VsZCBiZVxuICAgICAgLy8gYmFzZWQgb24gdGhlIHR5cGUgb2YgZXJyb3IgdGhhdCB3ZSBlbmNvdW50ZXJlZFxuICAgICAgbGV0IGFjdHVhbEVyciA9IGVycjtcblxuICAgICAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLlByb3h5UmVxdWVzdEVycm9yKSkge1xuICAgICAgICBsb2cuZXJyb3IoYEVuY291bnRlcmVkIGludGVybmFsIGVycm9yIHJ1bm5pbmcgY29tbWFuZDogICR7SlNPTi5zdHJpbmdpZnkoZXJyKX0gJHtlcnIuc3RhY2t9YCk7XG4gICAgICAgIGFjdHVhbEVyciA9IGVyci5nZXRBY3R1YWxFcnJvcihkcml2ZXIucHJvdG9jb2wpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZHJpdmVyLmlzTWpzb253cFByb3RvY29sKCkgJiZcbiAgICAgICAgKCEoaXNFcnJvclR5cGUoZXJyLCBQcm90b2NvbEVycm9yKSB8fCBpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IpKSlcbiAgICAgICkge1xuICAgICAgICBsb2cuZXJyb3IoYEVuY291bnRlcmVkIGludGVybmFsIGVycm9yIHJ1bm5pbmcgY29tbWFuZDogJHtlcnIuc3RhY2t9YCk7XG4gICAgICAgIGFjdHVhbEVyciA9IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGVycik7XG4gICAgICB9XG5cbiAgICAgIFtodHRwU3RhdHVzLCBodHRwUmVzQm9keV0gPSBkcml2ZXIuaXNNanNvbndwUHJvdG9jb2woKSA/IGdldFJlc3BvbnNlRm9ySnNvbndwRXJyb3IoYWN0dWFsRXJyKSA6IGdldFJlc3BvbnNlRm9yVzNDRXJyb3IoYWN0dWFsRXJyKTtcbiAgICB9XG5cbiAgICAvLyBkZWNvZGUgdGhlIHJlc3BvbnNlLCB3aGljaCBpcyBlaXRoZXIgYSBzdHJpbmcgb3IganNvblxuICAgIGlmIChfLmlzU3RyaW5nKGh0dHBSZXNCb2R5KSkge1xuICAgICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzKS5zZW5kKGh0dHBSZXNCb2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5ld1Nlc3Npb25JZCkge1xuICAgICAgICBpZiAoZHJpdmVyLmlzVzNDUHJvdG9jb2woKSkge1xuICAgICAgICAgIGh0dHBSZXNCb2R5LnZhbHVlLnNlc3Npb25JZCA9IG5ld1Nlc3Npb25JZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBodHRwUmVzQm9keS5zZXNzaW9uSWQgPSBuZXdTZXNzaW9uSWQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGh0dHBSZXNCb2R5LnNlc3Npb25JZCA9IHJlcS5wYXJhbXMuc2Vzc2lvbklkIHx8IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIERvbid0IGluY2x1ZGUgc2Vzc2lvbklkIGluIFczQyByZXNwb25zZXNcbiAgICAgIGlmIChkcml2ZXIuaXNXM0NQcm90b2NvbCgpKSB7XG4gICAgICAgIGRlbGV0ZSBodHRwUmVzQm9keS5zZXNzaW9uSWQ7XG4gICAgICB9XG5cbiAgICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1cykuanNvbihodHRwUmVzQm9keSk7XG4gICAgfVxuICB9O1xuICAvLyBhZGQgdGhlIG1ldGhvZCB0byB0aGUgYXBwXG4gIGFwcFttZXRob2QudG9Mb3dlckNhc2UoKV0ocGF0aCwgKHJlcSwgcmVzKSA9PiB7XG4gICAgQi5yZXNvbHZlKGFzeW5jSGFuZGxlcihyZXEsIHJlcykpLmRvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyaXZlclNob3VsZERvSndwUHJveHkgKGRyaXZlciwgcmVxLCBjb21tYW5kKSB7XG4gIC8vIGRyaXZlcnMgbmVlZCB0byBleHBsaWNpdGx5IHNheSB3aGVuIHRoZSBwcm94eSBpcyBhY3RpdmVcbiAgaWYgKCFkcml2ZXIucHJveHlBY3RpdmUocmVxLnBhcmFtcy5zZXNzaW9uSWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gd2Ugc2hvdWxkIG5ldmVyIHByb3h5IGRlbGV0ZVNlc3Npb24gYmVjYXVzZSB3ZSBuZWVkIHRvIGdpdmUgdGhlIGNvbnRhaW5pbmdcbiAgLy8gZHJpdmVyIGFuIG9wcG9ydHVuaXR5IHRvIGNsZWFuIGl0c2VsZiB1cFxuICBpZiAoY29tbWFuZCA9PT0gJ2RlbGV0ZVNlc3Npb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gdmFsaWRhdGUgYXZvaWRhbmNlIHNjaGVtYSwgYW5kIHNheSB3ZSBzaG91bGRuJ3QgcHJveHkgaWYgYW55dGhpbmcgaW4gdGhlXG4gIC8vIGF2b2lkIGxpc3QgbWF0Y2hlcyBvdXIgcmVxXG4gIGxldCBwcm94eUF2b2lkTGlzdCA9IGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdChyZXEucGFyYW1zLnNlc3Npb25JZCk7XG4gIGZvciAobGV0IGF2b2lkU2NoZW1hIG9mIHByb3h5QXZvaWRMaXN0KSB7XG4gICAgaWYgKCFfLmlzQXJyYXkoYXZvaWRTY2hlbWEpIHx8IGF2b2lkU2NoZW1hLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm94eSBhdm9pZGFuY2UgbXVzdCBiZSBhIGxpc3Qgb2YgcGFpcnMnKTtcbiAgICB9XG4gICAgbGV0IFthdm9pZE1ldGhvZCwgYXZvaWRQYXRoUmVnZXhdID0gYXZvaWRTY2hlbWE7XG4gICAgaWYgKCFfLmluY2x1ZGVzKFsnR0VUJywgJ1BPU1QnLCAnREVMRVRFJ10sIGF2b2lkTWV0aG9kKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnJlY29nbml6ZWQgcHJveHkgYXZvaWRhbmNlIG1ldGhvZCAnJHthdm9pZE1ldGhvZH0nYCk7XG4gICAgfVxuICAgIGlmICghKGF2b2lkUGF0aFJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm94eSBhdm9pZGFuY2UgcGF0aCBtdXN0IGJlIGEgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAgfVxuICAgIGxldCBub3JtYWxpemVkVXJsID0gcmVxLm9yaWdpbmFsVXJsLnJlcGxhY2UoL15cXC93ZFxcL2h1Yi8sICcnKTtcbiAgICBpZiAoYXZvaWRNZXRob2QgPT09IHJlcS5tZXRob2QgJiYgYXZvaWRQYXRoUmVnZXgudGVzdChub3JtYWxpemVkVXJsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb0p3cFByb3h5IChkcml2ZXIsIHJlcSwgcmVzKSB7XG4gIGdldExvZ0J5UHJvdG9jb2woZHJpdmVyKS5pbmZvKCdEcml2ZXIgcHJveHkgYWN0aXZlLCBwYXNzaW5nIHJlcXVlc3Qgb24gdmlhIEhUVFAgcHJveHknKTtcblxuICAvLyBjaGVjayB0aGF0IHRoZSBpbm5lciBkcml2ZXIgaGFzIGEgcHJveHkgZnVuY3Rpb25cbiAgaWYgKCFkcml2ZXIuY2FuUHJveHkocmVxLnBhcmFtcy5zZXNzaW9uSWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gcHJveHkgdG8gYSBKU09OV1Agc2VydmVyIGJ1dCBkcml2ZXIgaXMgdW5hYmxlIHRvIHByb3h5Jyk7XG4gIH1cbiAgdHJ5IHtcbiAgICBhd2FpdCBkcml2ZXIuZXhlY3V0ZUNvbW1hbmQoJ3Byb3h5UmVxUmVzJywgcmVxLCByZXMsIHJlcS5wYXJhbXMuc2Vzc2lvbklkKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLlByb3h5UmVxdWVzdEVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBwcm94eS4gUHJveHkgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IHsgUHJvdG9jb2wsIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiwgaXNTZXNzaW9uQ29tbWFuZCwgTUpTT05XUF9FTEVNRU5UX0tFWSwgVzNDX0VMRU1FTlRfS0VZIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

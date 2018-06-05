'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desiredCaps = require('./desired-caps');

var _appiumSupport = require('appium-support');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _mjsonwpErrors = require('../mjsonwp/errors');

// Takes primary caps object and merges it into a secondary caps object.
// (see https://www.w3.org/TR/webdriver/#dfn-merging-capabilities)
function mergeCaps() {
  var primary = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var secondary = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var result = _Object$assign({}, primary);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_lodash2['default'].toPairs(secondary)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var _name = _step$value[0];
      var value = _step$value[1];

      // Overwriting is not allowed. Primary and secondary must have different properties (w3c rule 4.4)
      if (!_lodash2['default'].isUndefined(primary[_name])) {
        throw new _mjsonwpErrors.errors.InvalidArgumentError('property \'' + _name + '\' should not exist on both primary (' + JSON.stringify(primary) + ') and secondary (' + JSON.stringify(secondary) + ') object');
      }
      result[_name] = value;
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

  return result;
}

// Validates caps against a set of constraints
function validateCaps(caps) {
  var constraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var skipPresenceConstraint = opts.skipPresenceConstraint;

  if (!_lodash2['default'].isPlainObject(caps)) {
    throw new _mjsonwpErrors.errors.InvalidArgumentError('must be a JSON object');
  }

  constraints = _lodash2['default'].cloneDeep(constraints); // Defensive copy

  if (skipPresenceConstraint) {
    // Remove the 'presence' constraint if we're not checking for it
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(_lodash2['default'].keys(constraints)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        delete constraints[key].presence;
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

  var validationErrors = _desiredCaps.validator.validate(_lodash2['default'].pickBy(caps, _appiumSupport.util.hasValue), constraints, { fullMessages: false });

  if (validationErrors) {
    var message = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(validationErrors)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2);

        var attribute = _step3$value[0];
        var reasons = _step3$value[1];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _getIterator(reasons), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var reason = _step4.value;

            message.push('\'' + attribute + '\' ' + reason);
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

    throw new _mjsonwpErrors.errors.InvalidArgumentError(message.join('; '));
  }

  // Return caps
  return caps;
}

// Standard, non-prefixed capabilities (see https://www.w3.org/TR/webdriver/#dfn-table-of-standard-capabilities)
var STANDARD_CAPS = ['browserName', 'browserVersion', 'platformName', 'acceptInsecureCerts', 'pageLoadStrategy', 'proxy', 'setWindowRect', 'timeouts', 'unhandledPromptBehavior'];

function isStandardCap(cap) {
  return !!_lodash2['default'].find(STANDARD_CAPS, function (standardCap) {
    return standardCap.toLowerCase() === ('' + cap).toLowerCase();
  });
}

// If the 'appium:' prefix was provided and it's a valid capability, strip out the prefix (see https://www.w3.org/TR/webdriver/#dfn-extension-capabilities)
// (NOTE: Method is destructive and mutates contents of caps)
function stripAppiumPrefixes(caps) {
  var prefix = 'appium:';
  var prefixedCaps = _lodash2['default'].filter(_lodash2['default'].keys(caps), function (cap) {
    return ('' + cap).startsWith(prefix);
  });
  var badPrefixedCaps = [];
  var unprefixedCaps = _lodash2['default'].filter(_lodash2['default'].keys(caps), function (cap) {
    return !cap.includes(':') && !isStandardCap(cap);
  });

  // Strip out the 'appium:' prefix
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(prefixedCaps), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var prefixedCap = _step5.value;

      var strippedCapName = prefixedCap.substr(prefix.length);

      // If it's standard capability that was prefixed, add it to an array of incorrectly prefixed capabilities
      if (isStandardCap(strippedCapName)) {
        badPrefixedCaps.push(strippedCapName);
      }

      // Strip out the prefix
      caps[strippedCapName] = caps[prefixedCap];
      delete caps[prefixedCap];
    }

    // If we found standard caps that were incorrectly prefixed, throw an exception (e.g.: don't accept 'appium:platformName', only accept just 'platformName')
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

  if (badPrefixedCaps.length > 0) {
    throw new _mjsonwpErrors.errors.InvalidArgumentError('The capabilities ' + JSON.stringify(badPrefixedCaps) + ' are standard capabilities and should not have the "appium:" prefix');
  }

  // If client provides non-prefixed, non-standard capabilities, warn them that these should be prefixed
  if (unprefixedCaps.length > 0) {
    _logger2['default'].warn(JSON.stringify(unprefixedCaps) + ' are not standard capabilities and should have an extension prefix');
  }
}

// Parse capabilities (based on https://www.w3.org/TR/webdriver/#processing-capabilities)
function parseCaps(caps) {
  var constraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var shouldValidateCaps = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  // If capabilities request is not an object, return error (#1.1)
  if (!_lodash2['default'].isPlainObject(caps)) {
    throw new _mjsonwpErrors.errors.InvalidArgumentError('The capabilities argument was not valid for the following reason(s): "capabilities" must be a JSON object.');
  }

  // Let 'requiredCaps' be property named 'alwaysMatch' from capabilities request (#2) and 'allFirstMatchCaps' be property named 'firstMatch from capabilities request (#3)
  var _caps$alwaysMatch = // If 'firstMatch' is undefined set it to a singleton list with one empty object (#3.1)
  caps.alwaysMatch;
  var requiredCaps = _caps$alwaysMatch === undefined ? {} : _caps$alwaysMatch;
  var _caps$firstMatch = caps.firstMatch;
  var allFirstMatchCaps = _caps$firstMatch === undefined ? [{}] : _caps$firstMatch;

  // Reject 'firstMatch' argument if it's not an array (#3.2)
  if (!_lodash2['default'].isArray(allFirstMatchCaps)) {
    throw new _mjsonwpErrors.errors.InvalidArgumentError('The capabilities.firstMatch argument was not valid for the following reason(s): "capabilities.firstMatch" must be a JSON array or undefined');
  }

  // If an empty array as provided, we'll be forgiving and make it an array of one empty object
  if (allFirstMatchCaps.length === 0) {
    allFirstMatchCaps.push({});
  }

  // Strip out the 'appium:' prefix from all
  stripAppiumPrefixes(requiredCaps);
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _getIterator(allFirstMatchCaps), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var firstMatchCaps = _step6.value;

      stripAppiumPrefixes(firstMatchCaps);
    }

    // Validate the requiredCaps. But don't validate 'presence' because if that constraint fails on 'alwaysMatch' it could still pass on one of the 'firstMatch' keys
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6['return']) {
        _iterator6['return']();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  if (shouldValidateCaps) {
    requiredCaps = validateCaps(requiredCaps, constraints, { skipPresenceConstraint: true });
  }

  // Remove the 'presence' constraint for any keys that are already present in 'requiredCaps'
  // since we know that this constraint has already passed
  var filteredConstraints = _extends({}, constraints);
  var requiredCapsKeys = _lodash2['default'].keys(requiredCaps);
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _getIterator(_lodash2['default'].keys(filteredConstraints)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var key = _step7.value;

      if (requiredCapsKeys.includes(key)) {
        delete filteredConstraints[key];
      }
    }

    // Validate all of the first match capabilities and return an array with only the valid caps (see spec #5)
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7['return']) {
        _iterator7['return']();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  var validationErrors = [];
  var validatedFirstMatchCaps = allFirstMatchCaps.map(function (firstMatchCaps) {
    try {
      // Validate firstMatch caps
      return shouldValidateCaps ? validateCaps(firstMatchCaps, filteredConstraints) : firstMatchCaps;
    } catch (e) {
      validationErrors.push(e.message);
      return null;
    }
  }).filter(function (caps) {
    return !_lodash2['default'].isNull(caps);
  });

  // Try to merge requiredCaps with first match capabilities, break once it finds its first match (see spec #6)
  var matchedCaps = null;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = _getIterator(validatedFirstMatchCaps), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var firstMatchCaps = _step8.value;

      try {
        matchedCaps = mergeCaps(requiredCaps, firstMatchCaps);
        if (matchedCaps) {
          break;
        }
      } catch (ign) {}
    }

    // Returns variables for testing purposes
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8['return']) {
        _iterator8['return']();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return { requiredCaps: requiredCaps, allFirstMatchCaps: allFirstMatchCaps, validatedFirstMatchCaps: validatedFirstMatchCaps, matchedCaps: matchedCaps, validationErrors: validationErrors };
}

// Calls parseCaps and just returns the matchedCaps variable
function processCapabilities(caps) {
  var constraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var shouldValidateCaps = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var _parseCaps = parseCaps(caps, constraints, shouldValidateCaps);

  var matchedCaps = _parseCaps.matchedCaps;
  var validationErrors = _parseCaps.validationErrors;

  // If we found an error throw an exception
  if (_lodash2['default'].isNull(matchedCaps)) {
    if (_lodash2['default'].isArray(caps.firstMatch) && caps.firstMatch.length > 1) {
      // If there was more than one 'firstMatch' cap, indicate that we couldn't find a matching capabilities set and show all the errors
      throw new _mjsonwpErrors.errors.InvalidArgumentError('Could not find matching capabilities from ' + JSON.stringify(caps) + ':\n ' + validationErrors.join('\n'));
    } else {
      // Otherwise, just show the singular error message
      throw new _mjsonwpErrors.errors.InvalidArgumentError(validationErrors[0]);
    }
  }

  return matchedCaps;
}

exports['default'] = { parseCaps: parseCaps, processCapabilities: processCapabilities, validateCaps: validateCaps, mergeCaps: mergeCaps };
module.exports = exports['default'];
// If 'requiredCaps' is undefined, set it to an empty JSON object (#2.1)
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NhcGFiaWxpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7MkJBQ0ksZ0JBQWdCOzs2QkFDckIsZ0JBQWdCOztzQkFDckIsVUFBVTs7Ozs2QkFDSCxtQkFBbUI7Ozs7QUFJMUMsU0FBUyxTQUFTLEdBQWdDO01BQTlCLE9BQU8seURBQUcsRUFBRTtNQUFFLFNBQVMseURBQUcsRUFBRTs7QUFDOUMsTUFBSSxNQUFNLEdBQUcsZUFBYyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7QUFFeEMsc0NBQTBCLG9CQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsNEdBQUU7OztVQUF0QyxLQUFJO1VBQUUsS0FBSzs7O0FBRW5CLFVBQUksQ0FBQyxvQkFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxDQUFDLEVBQUU7QUFDakMsY0FBTSxJQUFJLHNCQUFPLG9CQUFvQixpQkFBYyxLQUFJLDZDQUF1QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyx5QkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsY0FBVyxDQUFDO09BQy9LO0FBQ0QsWUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN0Qjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELFNBQU8sTUFBTSxDQUFDO0NBQ2Y7OztBQUdELFNBQVMsWUFBWSxDQUFFLElBQUksRUFBK0I7TUFBN0IsV0FBVyx5REFBRyxFQUFFO01BQUUsSUFBSSx5REFBRyxFQUFFO01BRWhELHNCQUFzQixHQUFJLElBQUksQ0FBOUIsc0JBQXNCOztBQUU1QixNQUFJLENBQUMsb0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFCLFVBQU0sSUFBSSxzQkFBTyxvQkFBb0IseUJBQXlCLENBQUM7R0FDaEU7O0FBRUQsYUFBVyxHQUFHLG9CQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFF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Z0IsRUFBaEIsZ0JBQWdCLEVBQUMsQ0FBQztDQUNsRzs7O0FBR0QsU0FBUyxtQkFBbUIsQ0FBRSxJQUFJLEVBQStDO01BQTdDLFdBQVcseURBQUcsRUFBRTtNQUFFLGtCQUFrQix5REFBRyxJQUFJOzttQkFDckMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsa0JBQWtCLENBQUM7O01BQWpGLFdBQVcsY0FBWCxXQUFXO01BQUUsZ0JBQWdCLGNBQWhCLGdCQUFnQjs7O0FBR3BDLE1BQUksb0JBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ3pCLFFBQUksb0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O0FBRTVELFlBQU0sSUFBSSxzQkFBTyxvQkFBb0IsZ0RBQThDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFHLENBQUM7S0FDOUksTUFBTTs7QUFFTCxZQUFNLElBQUksc0JBQU8sb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RDtHQUNGOztBQUVELFNBQU8sV0FBVyxDQUFDO0NBQ3BCOztxQkFHYyxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsbUJBQW1CLEVBQW5CLG1CQUFtQixFQUFFLFlBQVksRUFBWixZQUFZLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSIsImZpbGUiOiJsaWIvYmFzZWRyaXZlci9jYXBhYmlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdmFsaWRhdG9yIH0gZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnLi4vbWpzb253cC9lcnJvcnMnO1xuXG4vLyBUYWtlcyBwcmltYXJ5IGNhcHMgb2JqZWN0IGFuZCBtZXJnZXMgaXQgaW50byBhIHNlY29uZGFyeSBjYXBzIG9iamVjdC5cbi8vIChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jZGZuLW1lcmdpbmctY2FwYWJpbGl0aWVzKVxuZnVuY3Rpb24gbWVyZ2VDYXBzIChwcmltYXJ5ID0ge30sIHNlY29uZGFyeSA9IHt9KSB7XG4gIGxldCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBwcmltYXJ5KTtcblxuICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIF8udG9QYWlycyhzZWNvbmRhcnkpKSB7XG4gICAgLy8gT3ZlcndyaXRpbmcgaXMgbm90IGFsbG93ZWQuIFByaW1hcnkgYW5kIHNlY29uZGFyeSBtdXN0IGhhdmUgZGlmZmVyZW50IHByb3BlcnRpZXMgKHczYyBydWxlIDQuNClcbiAgICBpZiAoIV8uaXNVbmRlZmluZWQocHJpbWFyeVtuYW1lXSkpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuSW52YWxpZEFyZ3VtZW50RXJyb3IoYHByb3BlcnR5ICcke25hbWV9JyBzaG91bGQgbm90IGV4aXN0IG9uIGJvdGggcHJpbWFyeSAoJHtKU09OLnN0cmluZ2lmeShwcmltYXJ5KX0pIGFuZCBzZWNvbmRhcnkgKCR7SlNPTi5zdHJpbmdpZnkoc2Vjb25kYXJ5KX0pIG9iamVjdGApO1xuICAgIH1cbiAgICByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIFZhbGlkYXRlcyBjYXBzIGFnYWluc3QgYSBzZXQgb2YgY29uc3RyYWludHNcbmZ1bmN0aW9uIHZhbGlkYXRlQ2FwcyAoY2FwcywgY29uc3RyYWludHMgPSB7fSwgb3B0cyA9IHt9KSB7XG5cbiAgbGV0ICB7c2tpcFByZXNlbmNlQ29uc3RyYWludH0gPSBvcHRzO1xuXG4gIGlmICghXy5pc1BsYWluT2JqZWN0KGNhcHMpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JbnZhbGlkQXJndW1lbnRFcnJvcihgbXVzdCBiZSBhIEpTT04gb2JqZWN0YCk7XG4gIH1cblxuICBjb25zdHJhaW50cyA9IF8uY2xvbmVEZWVwKGNvbnN0cmFpbnRzKTsgLy8gRGVmZW5zaXZlIGNvcHlcblxuICBpZiAoc2tpcFByZXNlbmNlQ29uc3RyYWludCkge1xuICAgIC8vIFJlbW92ZSB0aGUgJ3ByZXNlbmNlJyBjb25zdHJhaW50IGlmIHdlJ3JlIG5vdCBjaGVja2luZyBmb3IgaXRcbiAgICBmb3IgKGxldCBrZXkgb2YgXy5rZXlzKGNvbnN0cmFpbnRzKSkge1xuICAgICAgZGVsZXRlIGNvbnN0cmFpbnRzW2tleV0ucHJlc2VuY2U7XG4gICAgfVxuICB9XG5cbiAgbGV0IHZhbGlkYXRpb25FcnJvcnMgPSB2YWxpZGF0b3IudmFsaWRhdGUoXy5waWNrQnkoY2FwcywgdXRpbC5oYXNWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Z1bGxNZXNzYWdlczogZmFsc2V9KTtcblxuICBpZiAodmFsaWRhdGlvbkVycm9ycykge1xuICAgIGxldCBtZXNzYWdlID0gW107XG4gICAgZm9yIChsZXQgW2F0dHJpYnV0ZSwgcmVhc29uc10gb2YgXy50b1BhaXJzKHZhbGlkYXRpb25FcnJvcnMpKSB7XG4gICAgICBmb3IgKGxldCByZWFzb24gb2YgcmVhc29ucykge1xuICAgICAgICBtZXNzYWdlLnB1c2goYCcke2F0dHJpYnV0ZX0nICR7cmVhc29ufWApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRBcmd1bWVudEVycm9yKG1lc3NhZ2Uuam9pbignOyAnKSk7XG4gIH1cblxuICAvLyBSZXR1cm4gY2Fwc1xuICByZXR1cm4gY2Fwcztcbn1cblxuLy8gU3RhbmRhcmQsIG5vbi1wcmVmaXhlZCBjYXBhYmlsaXRpZXMgKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tdGFibGUtb2Ytc3RhbmRhcmQtY2FwYWJpbGl0aWVzKVxuY29uc3QgU1RBTkRBUkRfQ0FQUyA9IFtcbiAgJ2Jyb3dzZXJOYW1lJyxcbiAgJ2Jyb3dzZXJWZXJzaW9uJyxcbiAgJ3BsYXRmb3JtTmFtZScsXG4gICdhY2NlcHRJbnNlY3VyZUNlcnRzJyxcbiAgJ3BhZ2VMb2FkU3RyYXRlZ3knLFxuICAncHJveHknLFxuICAnc2V0V2luZG93UmVjdCcsXG4gICd0aW1lb3V0cycsXG4gICd1bmhhbmRsZWRQcm9tcHRCZWhhdmlvcidcbl07XG5cbmZ1bmN0aW9uIGlzU3RhbmRhcmRDYXAgKGNhcCkge1xuICByZXR1cm4gISFfLmZpbmQoU1RBTkRBUkRfQ0FQUywgKHN0YW5kYXJkQ2FwKSA9PiBzdGFuZGFyZENhcC50b0xvd2VyQ2FzZSgpID09PSBgJHtjYXB9YC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuLy8gSWYgdGhlICdhcHBpdW06JyBwcmVmaXggd2FzIHByb3ZpZGVkIGFuZCBpdCdzIGEgdmFsaWQgY2FwYWJpbGl0eSwgc3RyaXAgb3V0IHRoZSBwcmVmaXggKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tZXh0ZW5zaW9uLWNhcGFiaWxpdGllcylcbi8vIChOT1RFOiBNZXRob2QgaXMgZGVzdHJ1Y3RpdmUgYW5kIG11dGF0ZXMgY29udGVudHMgb2YgY2FwcylcbmZ1bmN0aW9uIHN0cmlwQXBwaXVtUHJlZml4ZXMgKGNhcHMpIHtcbiAgY29uc3QgcHJlZml4ID0gJ2FwcGl1bTonO1xuICBjb25zdCBwcmVmaXhlZENhcHMgPSBfLmZpbHRlcihfLmtleXMoY2FwcyksIGNhcCA9PiBgJHtjYXB9YC5zdGFydHNXaXRoKHByZWZpeCkpO1xuICBjb25zdCBiYWRQcmVmaXhlZENhcHMgPSBbXTtcbiAgY29uc3QgdW5wcmVmaXhlZENhcHMgPSBfLmZpbHRlcihfLmtleXMoY2FwcyksIChjYXApID0+IChcbiAgICAhY2FwLmluY2x1ZGVzKCc6JykgJiYgIWlzU3RhbmRhcmRDYXAoY2FwKVxuICApKTtcblxuICAvLyBTdHJpcCBvdXQgdGhlICdhcHBpdW06JyBwcmVmaXhcbiAgZm9yIChsZXQgcHJlZml4ZWRDYXAgb2YgcHJlZml4ZWRDYXBzKSB7XG4gICAgY29uc3Qgc3RyaXBwZWRDYXBOYW1lID0gcHJlZml4ZWRDYXAuc3Vic3RyKHByZWZpeC5sZW5ndGgpO1xuXG4gICAgLy8gSWYgaXQncyBzdGFuZGFyZCBjYXBhYmlsaXR5IHRoYXQgd2FzIHByZWZpeGVkLCBhZGQgaXQgdG8gYW4gYXJyYXkgb2YgaW5jb3JyZWN0bHkgcHJlZml4ZWQgY2FwYWJpbGl0aWVzXG4gICAgaWYgKGlzU3RhbmRhcmRDYXAoc3RyaXBwZWRDYXBOYW1lKSkge1xuICAgICAgYmFkUHJlZml4ZWRDYXBzLnB1c2goc3RyaXBwZWRDYXBOYW1lKTtcbiAgICB9XG5cbiAgICAvLyBTdHJpcCBvdXQgdGhlIHByZWZpeFxuICAgIGNhcHNbc3RyaXBwZWRDYXBOYW1lXSA9IGNhcHNbcHJlZml4ZWRDYXBdO1xuICAgIGRlbGV0ZSBjYXBzW3ByZWZpeGVkQ2FwXTtcbiAgfVxuXG4gIC8vIElmIHdlIGZvdW5kIHN0YW5kYXJkIGNhcHMgdGhhdCB3ZXJlIGluY29ycmVjdGx5IHByZWZpeGVkLCB0aHJvdyBhbiBleGNlcHRpb24gKGUuZy46IGRvbid0IGFjY2VwdCAnYXBwaXVtOnBsYXRmb3JtTmFtZScsIG9ubHkgYWNjZXB0IGp1c3QgJ3BsYXRmb3JtTmFtZScpXG4gIGlmIChiYWRQcmVmaXhlZENhcHMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuSW52YWxpZEFyZ3VtZW50RXJyb3IoYFRoZSBjYXBhYmlsaXRpZXMgJHtKU09OLnN0cmluZ2lmeShiYWRQcmVmaXhlZENhcHMpfSBhcmUgc3RhbmRhcmQgY2FwYWJpbGl0aWVzIGFuZCBzaG91bGQgbm90IGhhdmUgdGhlIFwiYXBwaXVtOlwiIHByZWZpeGApO1xuICB9XG5cbiAgLy8gSWYgY2xpZW50IHByb3ZpZGVzIG5vbi1wcmVmaXhlZCwgbm9uLXN0YW5kYXJkIGNhcGFiaWxpdGllcywgd2FybiB0aGVtIHRoYXQgdGhlc2Ugc2hvdWxkIGJlIHByZWZpeGVkXG4gIGlmICh1bnByZWZpeGVkQ2Fwcy5sZW5ndGggPiAwKSB7XG4gICAgbG9nLndhcm4oYCR7SlNPTi5zdHJpbmdpZnkodW5wcmVmaXhlZENhcHMpfSBhcmUgbm90IHN0YW5kYXJkIGNhcGFiaWxpdGllcyBhbmQgc2hvdWxkIGhhdmUgYW4gZXh0ZW5zaW9uIHByZWZpeGApO1xuICB9XG59XG5cbi8vIFBhcnNlIGNhcGFiaWxpdGllcyAoYmFzZWQgb24gaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jcHJvY2Vzc2luZy1jYXBhYmlsaXRpZXMpXG5mdW5jdGlvbiBwYXJzZUNhcHMgKGNhcHMsIGNvbnN0cmFpbnRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcbiAgLy8gSWYgY2FwYWJpbGl0aWVzIHJlcXVlc3QgaXMgbm90IGFuIG9iamVjdCwgcmV0dXJuIGVycm9yICgjMS4xKVxuICBpZiAoIV8uaXNQbGFpbk9iamVjdChjYXBzKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuSW52YWxpZEFyZ3VtZW50RXJyb3IoJ1RoZSBjYXBhYmlsaXRpZXMgYXJndW1lbnQgd2FzIG5vdCB2YWxpZCBmb3IgdGhlIGZvbGxvd2luZyByZWFzb24ocyk6IFwiY2FwYWJpbGl0aWVzXCIgbXVzdCBiZSBhIEpTT04gb2JqZWN0LicpO1xuICB9XG5cbiAgLy8gTGV0ICdyZXF1aXJlZENhcHMnIGJlIHByb3BlcnR5IG5hbWVkICdhbHdheXNNYXRjaCcgZnJvbSBjYXBhYmlsaXRpZXMgcmVxdWVzdCAoIzIpIGFuZCAnYWxsRmlyc3RNYXRjaENhcHMnIGJlIHByb3BlcnR5IG5hbWVkICdmaXJzdE1hdGNoIGZyb20gY2FwYWJpbGl0aWVzIHJlcXVlc3QgKCMzKVxuICBsZXQge1xuICAgIGFsd2F5c01hdGNoOiByZXF1aXJlZENhcHMgPSB7fSwgLy8gSWYgJ3JlcXVpcmVkQ2FwcycgaXMgdW5kZWZpbmVkLCBzZXQgaXQgdG8gYW4gZW1wdHkgSlNPTiBvYmplY3QgKCMyLjEpXG4gICAgZmlyc3RNYXRjaDogYWxsRmlyc3RNYXRjaENhcHMgPSBbe31dLCAvLyBJZiAnZmlyc3RNYXRjaCcgaXMgdW5kZWZpbmVkIHNldCBpdCB0byBhIHNpbmdsZXRvbiBsaXN0IHdpdGggb25lIGVtcHR5IG9iamVjdCAoIzMuMSlcbiAgfSA9IGNhcHM7XG5cbiAgLy8gUmVqZWN0ICdmaXJzdE1hdGNoJyBhcmd1bWVudCBpZiBpdCdzIG5vdCBhbiBhcnJheSAoIzMuMilcbiAgaWYgKCFfLmlzQXJyYXkoYWxsRmlyc3RNYXRjaENhcHMpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JbnZhbGlkQXJndW1lbnRFcnJvcignVGhlIGNhcGFiaWxpdGllcy5maXJzdE1hdGNoIGFyZ3VtZW50IHdhcyBub3QgdmFsaWQgZm9yIHRoZSBmb2xsb3dpbmcgcmVhc29uKHMpOiBcImNhcGFiaWxpdGllcy5maXJzdE1hdGNoXCIgbXVzdCBiZSBhIEpTT04gYXJyYXkgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICAvLyBJZiBhbiBlbXB0eSBhcnJheSBhcyBwcm92aWRlZCwgd2UnbGwgYmUgZm9yZ2l2aW5nIGFuZCBtYWtlIGl0IGFuIGFycmF5IG9mIG9uZSBlbXB0eSBvYmplY3RcbiAgaWYgKGFsbEZpcnN0TWF0Y2hDYXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIGFsbEZpcnN0TWF0Y2hDYXBzLnB1c2goe30pO1xuICB9XG5cbiAgLy8gU3RyaXAgb3V0IHRoZSAnYXBwaXVtOicgcHJlZml4IGZyb20gYWxsXG4gIHN0cmlwQXBwaXVtUHJlZml4ZXMocmVxdWlyZWRDYXBzKTtcbiAgZm9yIChsZXQgZmlyc3RNYXRjaENhcHMgb2YgYWxsRmlyc3RNYXRjaENhcHMpIHtcbiAgICBzdHJpcEFwcGl1bVByZWZpeGVzKGZpcnN0TWF0Y2hDYXBzKTtcbiAgfVxuXG4gIC8vIFZhbGlkYXRlIHRoZSByZXF1aXJlZENhcHMuIEJ1dCBkb24ndCB2YWxpZGF0ZSAncHJlc2VuY2UnIGJlY2F1c2UgaWYgdGhhdCBjb25zdHJhaW50IGZhaWxzIG9uICdhbHdheXNNYXRjaCcgaXQgY291bGQgc3RpbGwgcGFzcyBvbiBvbmUgb2YgdGhlICdmaXJzdE1hdGNoJyBrZXlzXG4gIGlmIChzaG91bGRWYWxpZGF0ZUNhcHMpIHtcbiAgICByZXF1aXJlZENhcHMgPSB2YWxpZGF0ZUNhcHMocmVxdWlyZWRDYXBzLCBjb25zdHJhaW50cywge3NraXBQcmVzZW5jZUNvbnN0cmFpbnQ6IHRydWV9KTtcbiAgfVxuXG5cbiAgLy8gUmVtb3ZlIHRoZSAncHJlc2VuY2UnIGNvbnN0cmFpbnQgZm9yIGFueSBrZXlzIHRoYXQgYXJlIGFscmVhZHkgcHJlc2VudCBpbiAncmVxdWlyZWRDYXBzJ1xuICAvLyBzaW5jZSB3ZSBrbm93IHRoYXQgdGhpcyBjb25zdHJhaW50IGhhcyBhbHJlYWR5IHBhc3NlZFxuICBsZXQgZmlsdGVyZWRDb25zdHJhaW50cyA9IHsuLi5jb25zdHJhaW50c307XG4gIGxldCByZXF1aXJlZENhcHNLZXlzID0gXy5rZXlzKHJlcXVpcmVkQ2Fwcyk7XG4gIGZvciAobGV0IGtleSBvZiBfLmtleXMoZmlsdGVyZWRDb25zdHJhaW50cykpIHtcbiAgICBpZiAocmVxdWlyZWRDYXBzS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBkZWxldGUgZmlsdGVyZWRDb25zdHJhaW50c1trZXldO1xuICAgIH1cbiAgfVxuXG4gIC8vIFZhbGlkYXRlIGFsbCBvZiB0aGUgZmlyc3QgbWF0Y2ggY2FwYWJpbGl0aWVzIGFuZCByZXR1cm4gYW4gYXJyYXkgd2l0aCBvbmx5IHRoZSB2YWxpZCBjYXBzIChzZWUgc3BlYyAjNSlcbiAgbGV0IHZhbGlkYXRpb25FcnJvcnMgPSBbXTtcbiAgbGV0IHZhbGlkYXRlZEZpcnN0TWF0Y2hDYXBzID0gYWxsRmlyc3RNYXRjaENhcHMubWFwKChmaXJzdE1hdGNoQ2FwcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBWYWxpZGF0ZSBmaXJzdE1hdGNoIGNhcHNcbiAgICAgIHJldHVybiBzaG91bGRWYWxpZGF0ZUNhcHMgPyB2YWxpZGF0ZUNhcHMoZmlyc3RNYXRjaENhcHMsIGZpbHRlcmVkQ29uc3RyYWludHMpIDogZmlyc3RNYXRjaENhcHM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKGUubWVzc2FnZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0pLmZpbHRlcigoY2FwcykgPT4gIV8uaXNOdWxsKGNhcHMpKTtcblxuICAvLyBUcnkgdG8gbWVyZ2UgcmVxdWlyZWRDYXBzIHdpdGggZmlyc3QgbWF0Y2ggY2FwYWJpbGl0aWVzLCBicmVhayBvbmNlIGl0IGZpbmRzIGl0cyBmaXJzdCBtYXRjaCAoc2VlIHNwZWMgIzYpXG4gIGxldCBtYXRjaGVkQ2FwcyA9IG51bGw7XG4gIGZvciAobGV0IGZpcnN0TWF0Y2hDYXBzIG9mIHZhbGlkYXRlZEZpcnN0TWF0Y2hDYXBzKSB7XG4gICAgdHJ5IHtcbiAgICAgIG1hdGNoZWRDYXBzID0gbWVyZ2VDYXBzKHJlcXVpcmVkQ2FwcywgZmlyc3RNYXRjaENhcHMpO1xuICAgICAgaWYgKG1hdGNoZWRDYXBzKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGlnbikgeyB9XG4gIH1cblxuICAvLyBSZXR1cm5zIHZhcmlhYmxlcyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICByZXR1cm4ge3JlcXVpcmVkQ2FwcywgYWxsRmlyc3RNYXRjaENhcHMsIHZhbGlkYXRlZEZpcnN0TWF0Y2hDYXBzLCBtYXRjaGVkQ2FwcywgdmFsaWRhdGlvbkVycm9yc307XG59XG5cbi8vIENhbGxzIHBhcnNlQ2FwcyBhbmQganVzdCByZXR1cm5zIHRoZSBtYXRjaGVkQ2FwcyB2YXJpYWJsZVxuZnVuY3Rpb24gcHJvY2Vzc0NhcGFiaWxpdGllcyAoY2FwcywgY29uc3RyYWludHMgPSB7fSwgc2hvdWxkVmFsaWRhdGVDYXBzID0gdHJ1ZSkge1xuICBjb25zdCB7bWF0Y2hlZENhcHMsIHZhbGlkYXRpb25FcnJvcnN9ID0gcGFyc2VDYXBzKGNhcHMsIGNvbnN0cmFpbnRzLCBzaG91bGRWYWxpZGF0ZUNhcHMpO1xuXG4gIC8vIElmIHdlIGZvdW5kIGFuIGVycm9yIHRocm93IGFuIGV4Y2VwdGlvblxuICBpZiAoXy5pc051bGwobWF0Y2hlZENhcHMpKSB7XG4gICAgaWYgKF8uaXNBcnJheShjYXBzLmZpcnN0TWF0Y2gpICYmIGNhcHMuZmlyc3RNYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBJZiB0aGVyZSB3YXMgbW9yZSB0aGFuIG9uZSAnZmlyc3RNYXRjaCcgY2FwLCBpbmRpY2F0ZSB0aGF0IHdlIGNvdWxkbid0IGZpbmQgYSBtYXRjaGluZyBjYXBhYmlsaXRpZXMgc2V0IGFuZCBzaG93IGFsbCB0aGUgZXJyb3JzXG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRBcmd1bWVudEVycm9yKGBDb3VsZCBub3QgZmluZCBtYXRjaGluZyBjYXBhYmlsaXRpZXMgZnJvbSAke0pTT04uc3RyaW5naWZ5KGNhcHMpfTpcXG4gJHt2YWxpZGF0aW9uRXJyb3JzLmpvaW4oJ1xcbicpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPdGhlcndpc2UsIGp1c3Qgc2hvdyB0aGUgc2luZ3VsYXIgZXJyb3IgbWVzc2FnZVxuICAgICAgdGhyb3cgbmV3IGVycm9ycy5JbnZhbGlkQXJndW1lbnRFcnJvcih2YWxpZGF0aW9uRXJyb3JzWzBdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlZENhcHM7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgeyBwYXJzZUNhcHMsIHByb2Nlc3NDYXBhYmlsaXRpZXMsIHZhbGlkYXRlQ2FwcywgbWVyZ2VDYXBzIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

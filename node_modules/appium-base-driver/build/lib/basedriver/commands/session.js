'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _mjsonwp = require('../../mjsonwp');

var _uuidJs = require('uuid-js');

var _uuidJs2 = _interopRequireDefault(_uuidJs);

var _capabilities = require('../capabilities');

var commands = {};

commands.createSession = function callee$0$0(jsonwpDesiredCapabilities, jsonwpRequiredCaps, w3cCapabilities) {
  var caps;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(this.sessionId !== null)) {
          context$1$0.next = 2;
          break;
        }

        throw new _mjsonwp.errors.SessionNotCreatedError('Cannot create a new session ' + 'while one is in progress');

      case 2:

        _logger2['default'].debug();

        // Determine weather we should use jsonwpDesiredCapabilities or w3cCapabilities to get caps from
        caps = undefined;

        if (w3cCapabilities) {
          if (jsonwpDesiredCapabilities) {
            _logger2['default'].debug('W3C capabilities ' + _lodash2['default'].truncate(JSON.stringify(w3cCapabilities)) + ' and MJSONWP desired capabilities ' + _lodash2['default'].truncate(w3cCapabilities) + ' were provided');
          }

          if (jsonwpDesiredCapabilities && !_lodash2['default'].isPlainObject(w3cCapabilities)) {
            // If W3C Capabilities and MJSONWP Capabilities were provided and W3C caps aren't a plain object,
            // log a warning and fall back to MJSONWP
            _logger2['default'].warn('Expected W3C "capabilities" to be a JSON Object but was provided with: ' + JSON.stringify(w3cCapabilities));
            _logger2['default'].warn('Falling back to MJSONWP desired capabilities');
            caps = jsonwpDesiredCapabilities;
          } else {
            _logger2['default'].debug('Creating session with W3C capabilities: ' + _lodash2['default'].truncate(JSON.stringify(w3cCapabilities)));
            caps = (0, _capabilities.processCapabilities)(w3cCapabilities, this.desiredCapConstraints, this.shouldValidateCaps);
          }
        } else {
          _logger2['default'].debug('Creating session with MJSONWP desired capabilities: ' + _lodash2['default'].truncate(JSON.stringify(jsonwpDesiredCapabilities)));
          caps = jsonwpDesiredCapabilities;
        }

        caps = fixCaps(caps, this.desiredCapConstraints);
        this.validateDesiredCaps(caps);

        this.sessionId = _uuidJs2['default'].create().hex;
        this.caps = caps;
        this.opts = _lodash2['default'].cloneDeep(this.initialOpts);

        // merge caps onto opts so we don't need to worry about what's where
        _Object$assign(this.opts, this.caps);

        // deal with resets
        // some people like to do weird things by setting noReset and fullReset
        // both to true, but this is misguided and strange, so error here instead

        if (!(this.opts.noReset && this.opts.fullReset)) {
          context$1$0.next = 13;
          break;
        }

        throw new Error("The 'noReset' and 'fullReset' capabilities are mutually " + "exclusive and should not both be set to true. You " + "probably meant to just use 'fullReset' on its own");

      case 13:
        if (this.opts.noReset === true) {
          this.opts.fullReset = false;
        }
        if (this.opts.fullReset === true) {
          this.opts.noReset = false;
        }
        this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
        this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

        // Prevents empty string caps so we don't need to test it everywhere
        if (typeof this.opts.app === 'string' && this.opts.app.trim() === '') {
          this.opts.app = null;
        }

        if (!_lodash2['default'].isUndefined(this.caps.newCommandTimeout)) {
          this.newCommandTimeoutMs = this.caps.newCommandTimeout * 1000;
        }

        // We need to ininitialize one onUnexpectedShutdow promise per session
        // to avoid the promise fulfilment being propagated between sessions.
        this.resetOnUnexpectedShutdown();

        _logger2['default'].info('Session created with session id: ' + this.sessionId);

        return context$1$0.abrupt('return', [this.sessionId, caps]);

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSessions = function callee$0$0() {
  var ret;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        ret = [];

        if (this.sessionId) {
          ret.push({
            id: this.sessionId,
            capabilities: this.caps
          });
        }

        return context$1$0.abrupt('return', ret);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSession = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.caps.eventTimings) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return', _Object$assign({}, this.caps, { events: this.eventHistory }));

      case 2:
        return context$1$0.abrupt('return', this.caps);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.deleteSession = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.clearNewCommandTimeout();
        this.sessionId = null;

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

function fixCaps(originalCaps) {
  var desiredCapConstraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var caps = _lodash2['default'].clone(originalCaps);

  // boolean capabilities can be passed in as strings 'false' and 'true'
  // which we want to translate into boolean values
  var booleanCaps = _lodash2['default'].keys(_lodash2['default'].pickBy(desiredCapConstraints, function (k) {
    return k.isBoolean === true;
  }));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(booleanCaps), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cap = _step.value;

      var value = originalCaps[cap];
      if (_lodash2['default'].isString(value)) {
        value = value.toLowerCase();
        if (value === 'true' || value === 'false') {
          _logger2['default'].warn('Capability \'' + cap + '\' changed from string to boolean. This may cause unexpected behavior');
          caps[cap] = value === 'true';
        }
      }
    }

    // int capabilities are often sent in as strings by frameworks
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

  var intCaps = _lodash2['default'].keys(_lodash2['default'].pickBy(desiredCapConstraints, function (k) {
    return k.isNumber === true;
  }));
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(intCaps), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var cap = _step2.value;

      var value = originalCaps[cap];
      if (_lodash2['default'].isString(value)) {
        var newValue = parseInt(value, 10);
        if (value.indexOf('.') !== -1) {
          newValue = parseFloat(value);
        }
        _logger2['default'].warn('Capability \'' + cap + '\' changed from string (\'' + value + '\') to integer (' + newValue + '). This may cause unexpected behavior');
        caps[cap] = newValue;
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

  return caps;
}

exports['default'] = commands;
module.exports = exports['default'];
/* sessionId */
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3Nlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztzQkFDTixXQUFXOzs7O3VCQUNKLGVBQWU7O3NCQUNyQixTQUFTOzs7OzRCQUNVLGlCQUFpQjs7QUFFckQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixRQUFRLENBQUMsYUFBYSxHQUFHLG9CQUFnQix5QkFBeUIsRUFBRSxrQkFBa0IsRUFBRSxlQUFlO01BU2pHLElBQUk7Ozs7Y0FSSixJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTs7Ozs7Y0FDbkIsSUFBSSxnQkFBTyxzQkFBc0IsQ0FBQyw4QkFBOEIsR0FDOUIsMEJBQTBCLENBQUM7Ozs7QUFHckUsNEJBQUksS0FBSyxFQUFFLENBQUM7OztBQUdSLFlBQUk7O0FBQ1IsWUFBSSxlQUFlLEVBQUU7QUFDbkIsY0FBSSx5QkFBeUIsRUFBRTtBQUM3QixnQ0FBSSxLQUFLLHVCQUFxQixvQkFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQywwQ0FBcUMsb0JBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxvQkFBaUIsQ0FBQztXQUM1Sjs7QUFFRCxjQUFJLHlCQUF5QixJQUFJLENBQUMsb0JBQUUsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFOzs7QUFHbEUsZ0NBQUksSUFBSSw2RUFBMkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBRyxDQUFDO0FBQ3RILGdDQUFJLElBQUksZ0RBQWdELENBQUM7QUFDekQsZ0JBQUksR0FBRyx5QkFBeUIsQ0FBQztXQUNsQyxNQUFNO0FBQ0wsZ0NBQUksS0FBSyw4Q0FBNEMsb0JBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBRyxDQUFDO0FBQ3BHLGdCQUFJLEdBQUcsdUNBQW9CLGVBQWUsRUFBRSxJQUFJLENB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SyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUk7R0FBQSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0FBQ2xGLHVDQUFnQixPQUFPLGlIQUFFO1VBQWhCLEdBQUc7O0FBQ1YsVUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFVBQUksb0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3JCLFlBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMsWUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQzdCLGtCQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0FBQ0QsNEJBQUksSUFBSSxtQkFBZ0IsR0FBRyxrQ0FBMkIsS0FBSyx3QkFBa0IsUUFBUSwyQ0FBd0MsQ0FBQztBQUM5SCxZQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO09BQ3RCO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxTQUFPLElBQUksQ0FBQztDQUNiOztxQkFFYyxRQUFRIiwiZmlsZSI6ImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3Nlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnLi4vLi4vbWpzb253cCc7XG5pbXBvcnQgVVVJRCBmcm9tICd1dWlkLWpzJztcbmltcG9ydCB7IHByb2Nlc3NDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi9jYXBhYmlsaXRpZXMnO1xuXG5sZXQgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuY3JlYXRlU2Vzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uIChqc29ud3BEZXNpcmVkQ2FwYWJpbGl0aWVzLCBqc29ud3BSZXF1aXJlZENhcHMsIHczY0NhcGFiaWxpdGllcykge1xuICBpZiAodGhpcy5zZXNzaW9uSWQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgYSBuZXcgc2Vzc2lvbiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlIG9uZSBpcyBpbiBwcm9ncmVzcycpO1xuICB9XG5cbiAgbG9nLmRlYnVnKCk7XG5cbiAgLy8gRGV0ZXJtaW5lIHdlYXRoZXIgd2Ugc2hvdWxkIHVzZSBqc29ud3BEZXNpcmVkQ2FwYWJpbGl0aWVzIG9yIHczY0NhcGFiaWxpdGllcyB0byBnZXQgY2FwcyBmcm9tXG4gIGxldCBjYXBzO1xuICBpZiAodzNjQ2FwYWJpbGl0aWVzKSB7XG4gICAgaWYgKGpzb253cERlc2lyZWRDYXBhYmlsaXRpZXMpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgVzNDIGNhcGFiaWxpdGllcyAke18udHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkodzNjQ2FwYWJpbGl0aWVzKSl9IGFuZCBNSlNPTldQIGRlc2lyZWQgY2FwYWJpbGl0aWVzICR7Xy50cnVuY2F0ZSh3M2NDYXBhYmlsaXRpZXMpfSB3ZXJlIHByb3ZpZGVkYCk7XG4gICAgfVxuXG4gICAgaWYgKGpzb253cERlc2lyZWRDYXBhYmlsaXRpZXMgJiYgIV8uaXNQbGFpbk9iamVjdCh3M2NDYXBhYmlsaXRpZXMpKSB7XG4gICAgICAvLyBJZiBXM0MgQ2FwYWJpbGl0aWVzIGFuZCBNSlNPTldQIENhcGFiaWxpdGllcyB3ZXJlIHByb3ZpZGVkIGFuZCBXM0MgY2FwcyBhcmVuJ3QgYSBwbGFpbiBvYmplY3QsXG4gICAgICAvLyBsb2cgYSB3YXJuaW5nIGFuZCBmYWxsIGJhY2sgdG8gTUpTT05XUFxuICAgICAgbG9nLndhcm4oYEV4cGVjdGVkIFczQyBcImNhcGFiaWxpdGllc1wiIHRvIGJlIGEgSlNPTiBPYmplY3QgYnV0IHdhcyBwcm92aWRlZCB3aXRoOiAke0pTT04uc3RyaW5naWZ5KHczY0NhcGFiaWxpdGllcyl9YCk7XG4gICAgICBsb2cud2FybihgRmFsbGluZyBiYWNrIHRvIE1KU09OV1AgZGVzaXJlZCBjYXBhYmlsaXRpZXNgKTtcbiAgICAgIGNhcHMgPSBqc29ud3BEZXNpcmVkQ2FwYWJpbGl0aWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZGVidWcoYENyZWF0aW5nIHNlc3Npb24gd2l0aCBXM0MgY2FwYWJpbGl0aWVzOiAke18udHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkodzNjQ2FwYWJpbGl0aWVzKSl9YCk7XG4gICAgICBjYXBzID0gcHJvY2Vzc0NhcGFiaWxpdGllcyh3M2NDYXBhYmlsaXRpZXMsIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzLCB0aGlzLnNob3VsZFZhbGlkYXRlQ2Fwcyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxvZy5kZWJ1ZyhgQ3JlYXRpbmcgc2Vzc2lvbiB3aXRoIE1KU09OV1AgZGVzaXJlZCBjYXBhYmlsaXRpZXM6ICR7Xy50cnVuY2F0ZShKU09OLnN0cmluZ2lmeShqc29ud3BEZXNpcmVkQ2FwYWJpbGl0aWVzKSl9YCk7XG4gICAgY2FwcyA9IGpzb253cERlc2lyZWRDYXBhYmlsaXRpZXM7XG4gIH1cblxuICBjYXBzID0gZml4Q2FwcyhjYXBzLCB0aGlzLmRlc2lyZWRDYXBDb25zdHJhaW50cyk7XG4gIHRoaXMudmFsaWRhdGVEZXNpcmVkQ2FwcyhjYXBzKTtcblxuICB0aGlzLnNlc3Npb25JZCA9IFVVSUQuY3JlYXRlKCkuaGV4O1xuICB0aGlzLmNhcHMgPSBjYXBzO1xuICB0aGlzLm9wdHMgPSBfLmNsb25lRGVlcCh0aGlzLmluaXRpYWxPcHRzKTtcblxuICAvLyBtZXJnZSBjYXBzIG9udG8gb3B0cyBzbyB3ZSBkb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IHdoYXQncyB3aGVyZVxuICBPYmplY3QuYXNzaWduKHRoaXMub3B0cywgdGhpcy5jYXBzKTtcblxuICAvLyBkZWFsIHdpdGggcmVzZXRzXG4gIC8vIHNvbWUgcGVvcGxlIGxpa2UgdG8gZG8gd2VpcmQgdGhpbmdzIGJ5IHNldHRpbmcgbm9SZXNldCBhbmQgZnVsbFJlc2V0XG4gIC8vIGJvdGggdG8gdHJ1ZSwgYnV0IHRoaXMgaXMgbWlzZ3VpZGVkIGFuZCBzdHJhbmdlLCBzbyBlcnJvciBoZXJlIGluc3RlYWRcbiAgaWYgKHRoaXMub3B0cy5ub1Jlc2V0ICYmIHRoaXMub3B0cy5mdWxsUmVzZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ25vUmVzZXQnIGFuZCAnZnVsbFJlc2V0JyBjYXBhYmlsaXRpZXMgYXJlIG11dHVhbGx5IFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJleGNsdXNpdmUgYW5kIHNob3VsZCBub3QgYm90aCBiZSBzZXQgdG8gdHJ1ZS4gWW91IFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9iYWJseSBtZWFudCB0byBqdXN0IHVzZSAnZnVsbFJlc2V0JyBvbiBpdHMgb3duXCIpO1xuICB9XG4gIGlmICh0aGlzLm9wdHMubm9SZXNldCA9PT0gdHJ1ZSkge1xuICAgIHRoaXMub3B0cy5mdWxsUmVzZXQgPSBmYWxzZTtcbiAgfVxuICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCA9PT0gdHJ1ZSkge1xuICAgIHRoaXMub3B0cy5ub1Jlc2V0ID0gZmFsc2U7XG4gIH1cbiAgdGhpcy5vcHRzLmZhc3RSZXNldCA9ICF0aGlzLm9wdHMuZnVsbFJlc2V0ICYmICF0aGlzLm9wdHMubm9SZXNldDtcbiAgdGhpcy5vcHRzLnNraXBVbmluc3RhbGwgPSB0aGlzLm9wdHMuZmFzdFJlc2V0IHx8IHRoaXMub3B0cy5ub1Jlc2V0O1xuXG4gIC8vIFByZXZlbnRzIGVtcHR5IHN0cmluZyBjYXBzIHNvIHdlIGRvbid0IG5lZWQgdG8gdGVzdCBpdCBldmVyeXdoZXJlXG4gIGlmICh0eXBlb2YgdGhpcy5vcHRzLmFwcCA9PT0gJ3N0cmluZycgJiYgdGhpcy5vcHRzLmFwcC50cmltKCkgPT09ICcnKSB7XG4gICAgdGhpcy5vcHRzLmFwcCA9IG51bGw7XG4gIH1cblxuICBpZiAoIV8uaXNVbmRlZmluZWQodGhpcy5jYXBzLm5ld0NvbW1hbmRUaW1lb3V0KSkge1xuICAgIHRoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyA9ICh0aGlzLmNhcHMubmV3Q29tbWFuZFRpbWVvdXQgKiAxMDAwKTtcbiAgfVxuXG4gIC8vIFdlIG5lZWQgdG8gaW5pbml0aWFsaXplIG9uZSBvblVuZXhwZWN0ZWRTaHV0ZG93IHByb21pc2UgcGVyIHNlc3Npb25cbiAgLy8gdG8gYXZvaWQgdGhlIHByb21pc2UgZnVsZmlsbWVudCBiZWluZyBwcm9wYWdhdGVkIGJldHdlZW4gc2Vzc2lvbnMuXG4gIHRoaXMucmVzZXRPblVuZXhwZWN0ZWRTaHV0ZG93bigpO1xuXG4gIGxvZy5pbmZvKGBTZXNzaW9uIGNyZWF0ZWQgd2l0aCBzZXNzaW9uIGlkOiAke3RoaXMuc2Vzc2lvbklkfWApO1xuXG4gIHJldHVybiBbdGhpcy5zZXNzaW9uSWQsIGNhcHNdO1xufTtcblxuY29tbWFuZHMuZ2V0U2Vzc2lvbnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCByZXQgPSBbXTtcblxuICBpZiAodGhpcy5zZXNzaW9uSWQpIHtcbiAgICByZXQucHVzaCh7XG4gICAgICBpZDogdGhpcy5zZXNzaW9uSWQsXG4gICAgICBjYXBhYmlsaXRpZXM6IHRoaXMuY2Fwc1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbmNvbW1hbmRzLmdldFNlc3Npb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNhcHMuZXZlbnRUaW1pbmdzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY2Fwcywge2V2ZW50czogdGhpcy5ldmVudEhpc3Rvcnl9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5jYXBzO1xufTtcblxuY29tbWFuZHMuZGVsZXRlU2Vzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgvKiBzZXNzaW9uSWQgKi8pIHtcbiAgdGhpcy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0KCk7XG4gIHRoaXMuc2Vzc2lvbklkID0gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGZpeENhcHMgKG9yaWdpbmFsQ2FwcywgZGVzaXJlZENhcENvbnN0cmFpbnRzID0ge30pIHtcbiAgbGV0IGNhcHMgPSBfLmNsb25lKG9yaWdpbmFsQ2Fwcyk7XG5cbiAgLy8gYm9vbGVhbiBjYXBhYmlsaXRpZXMgY2FuIGJlIHBhc3NlZCBpbiBhcyBzdHJpbmdzICdmYWxzZScgYW5kICd0cnVlJ1xuICAvLyB3aGljaCB3ZSB3YW50IHRvIHRyYW5zbGF0ZSBpbnRvIGJvb2xlYW4gdmFsdWVzXG4gIGxldCBib29sZWFuQ2FwcyA9IF8ua2V5cyhfLnBpY2tCeShkZXNpcmVkQ2FwQ29uc3RyYWludHMsIChrKSA9PiBrLmlzQm9vbGVhbiA9PT0gdHJ1ZSkpO1xuICBmb3IgKGxldCBjYXAgb2YgYm9vbGVhbkNhcHMpIHtcbiAgICBsZXQgdmFsdWUgPSBvcmlnaW5hbENhcHNbY2FwXTtcbiAgICBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGxvZy53YXJuKGBDYXBhYmlsaXR5ICcke2NhcH0nIGNoYW5nZWQgZnJvbSBzdHJpbmcgdG8gYm9vbGVhbi4gVGhpcyBtYXkgY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvcmApO1xuICAgICAgICBjYXBzW2NhcF0gPSAodmFsdWUgPT09ICd0cnVlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaW50IGNhcGFiaWxpdGllcyBhcmUgb2Z0ZW4gc2VudCBpbiBhcyBzdHJpbmdzIGJ5IGZyYW1ld29ya3NcbiAgbGV0IGludENhcHMgPSBfLmtleXMoXy5waWNrQnkoZGVzaXJlZENhcENvbnN0cmFpbnRzLCAoaykgPT4gay5pc051bWJlciA9PT0gdHJ1ZSkpO1xuICBmb3IgKGxldCBjYXAgb2YgaW50Q2Fwcykge1xuICAgIGxldCB2YWx1ZSA9IG9yaWdpbmFsQ2Fwc1tjYXBdO1xuICAgIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgbGV0IG5ld1ZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBsb2cud2FybihgQ2FwYWJpbGl0eSAnJHtjYXB9JyBjaGFuZ2VkIGZyb20gc3RyaW5nICgnJHt2YWx1ZX0nKSB0byBpbnRlZ2VyICgke25ld1ZhbHVlfSkuIFRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3JgKTtcbiAgICAgIGNhcHNbY2FwXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjYXBzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libBasedriverCapabilities = require('../../lib/basedriver/capabilities');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _libBasedriverDesiredCaps = require('../../lib/basedriver/desired-caps');

_chai2['default'].use(_chaiAsPromised2['default']);
var should = _chai2['default'].should();

describe('caps', function () {

  // Tests based on: https://www.w3.org/TR/webdriver/#dfn-validate-caps
  describe('#validateCaps', function () {
    it('returns invalid argument error if "capability" is not a JSON object (1)', function () {
      var _arr = [undefined, null, 1, true, 'string'];

      var _loop = function () {
        var arg = _arr[_i];
        (function () {
          (0, _libBasedriverCapabilities.validateCaps)(arg);
        }).should['throw'](/must be a JSON object/);
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
      }
    });

    it('returns result {} by default if caps is empty object and no constraints provided (2)', function () {
      (0, _libBasedriverCapabilities.validateCaps)({}).should.deep.equal({});
    });

    describe('throws errors if constraints are not met', function () {
      it('returns invalid argument error if "present" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({}, { foo: { presence: true } });
        }).should['throw'](/'foo' can't be blank/);
      });

      it('returns the capability that was passed in if "skipPresenceConstraint" is false', function () {
        (0, _libBasedriverCapabilities.validateCaps)({}, { foo: { presence: true } }, { skipPresenceConstraint: true }).should.deep.equal({});
      });

      it('returns invalid argument error if "isString" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 1 }, { foo: { isString: true } });
        }).should['throw'](/'foo' must be of type string/);
      });

      it('returns invalid argument error if "isNumber" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 'bar' }, { foo: { isNumber: true } });
        }).should['throw'](/'foo' must be of type number/);
      });

      it('returns invalid argument error if "isBoolean" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 'bar' }, { foo: { isBoolean: true } });
        }).should['throw'](/'foo' must be of type boolean/);
      });

      it('returns invalid argument error if "inclusion" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: '3' }, { foo: { inclusionCaseInsensitive: ['1', '2'] } });
        }).should['throw'](/'foo' 3 not part of 1,2/);
      });

      it('returns invalid argument error if "inclusionCaseInsensitive" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 'a' }, { foo: { inclusion: ['A', 'B', 'C'] } });
        }).should['throw'](/'foo' a is not included in the list/);
      });
    });

    it('should not throw errors if constraints are met', function () {
      var caps = {
        number: 1,
        string: 'string',
        present: 'present',
        extra: 'extra'
      };

      var constraints = {
        number: { isNumber: true },
        string: { isString: true },
        present: { presence: true },
        notPresent: { presence: false }
      };

      (0, _libBasedriverCapabilities.validateCaps)(caps, constraints).should.deep.equal(caps);
    });
  });

  // Tests based on: https://www.w3.org/TR/webdriver/#dfn-merging-caps
  describe('#mergeCaps', function () {
    it('returns a result that is {} by default (1)', function () {
      (0, _libBasedriverCapabilities.mergeCaps)().should.deep.equal({});
    });

    it('returns a result that matches primary by default (2, 3)', function () {
      (0, _libBasedriverCapabilities.mergeCaps)({ hello: 'world' }).should.deep.equal({ hello: 'world' });
    });

    it('returns invalid argument error if primary and secondary have matching properties (4)', function () {
      (function () {
        return (0, _libBasedriverCapabilities.mergeCaps)({ hello: 'world' }, { hello: 'whirl' });
      }).should['throw'](/property 'hello' should not exist on both primary [\w\W]* and secondary [\w\W]*/);
    });

    it('returns a result with keys from primary and secondary together', function () {
      var primary = {
        a: 'a',
        b: 'b'
      };
      var secondary = {
        c: 'c',
        d: 'd'
      };
      (0, _libBasedriverCapabilities.mergeCaps)(primary, secondary).should.deep.equal({
        a: 'a', b: 'b', c: 'c', d: 'd'
      });
    });
  });

  // Tests based on: https://www.w3.org/TR/webdriver/#processing-caps
  describe('#parseCaps', function () {
    var caps = undefined;

    beforeEach(function () {
      caps = {};
    });

    it('should return invalid argument if no caps object provided', function () {
      (function () {
        return (0, _libBasedriverCapabilities.parseCaps)();
      }).should['throw'](/must be a JSON object/);
    });

    it('sets "requiredCaps" to property named "alwaysMatch" (2)', function () {
      caps.alwaysMatch = { hello: 'world' };
      (0, _libBasedriverCapabilities.parseCaps)(caps).requiredCaps.should.deep.equal(caps.alwaysMatch);
    });

    it('sets "requiredCaps" to empty JSON object if "alwaysMatch" is not an object (2.1)', function () {
      (0, _libBasedriverCapabilities.parseCaps)(caps).requiredCaps.should.deep.equal({});
    });

    it('returns invalid argument error if "requiredCaps" don\'t match "constraints" (2.2)', function () {
      caps.alwaysMatch = { foo: 1 };
      (function () {
        return (0, _libBasedriverCapabilities.parseCaps)(caps, { foo: { isString: true } });
      }).should['throw'](/'foo' must be of type string/);
    });

    it('sets "allFirstMatchCaps" to property named "firstMatch" (3)', function () {
      (0, _libBasedriverCapabilities.parseCaps)({}, [{}]).allFirstMatchCaps.should.deep.equal([{}]);
    });

    it('sets "allFirstMatchCaps" to [{}] if "firstMatch" is undefined (3.1)', function () {
      (0, _libBasedriverCapabilities.parseCaps)({}).allFirstMatchCaps.should.deep.equal([{}]);
    });

    it('returns invalid argument error if "firstMatch" is not an array and is not undefined (3.2)', function () {
      var _arr2 = [null, 1, true, 'string'];

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var arg = _arr2[_i2];
        caps.firstMatch = arg;
        (function () {
          (0, _libBasedriverCapabilities.parseCaps)(caps);
        }).should['throw'](/must be a JSON array or undefined/);
      }
    });

    it('has "validatedFirstMatchCaps" property that is empty by default if no valid firstMatch caps were found (4)', function () {
      (0, _libBasedriverCapabilities.parseCaps)(caps, { foo: { presence: true } }).validatedFirstMatchCaps.should.deep.equal([]);
    });

    describe('returns a "validatedFirstMatchCaps" array (5)', function () {
      it('that equals "firstMatch" if firstMatch is one empty object and there are no constraints', function () {
        caps.firstMatch = [{}];
        (0, _libBasedriverCapabilities.parseCaps)(caps).validatedFirstMatchCaps.should.deep.equal(caps.firstMatch);
      });

      it('returns "null" matchedCaps if nothing matches', function () {
        caps.firstMatch = [{}];
        should.equal((0, _libBasedriverCapabilities.parseCaps)(caps, { foo: { presence: true } }).matchedCaps, null);
      });

      it('should return capabilities if presence constraint is matched in at least one of the \'firstMatch\' capabilities objects', function () {
        caps.alwaysMatch = {
          foo: 'bar'
        };
        caps.firstMatch = [{
          hello: 'world'
        }, {
          goodbye: 'world'
        }];
        (0, _libBasedriverCapabilities.parseCaps)(caps, { goodbye: { presence: true } }).matchedCaps.should.deep.equal({
          foo: 'bar',
          goodbye: 'world'
        });
      });

      it('throws invalid argument if presence constraint is not met on any capabilities', function () {
        caps.alwaysMatch = {
          foo: 'bar'
        };
        caps.firstMatch = [{
          hello: 'world'
        }, {
          goodbye: 'world'
        }];
        should.equal((0, _libBasedriverCapabilities.parseCaps)(caps, { someAttribute: { presence: true } }).matchedCaps, null);
      });

      it('that equals firstMatch if firstMatch contains two objects that pass the provided constraints', function () {
        caps.alwaysMatch = {
          foo: 'bar'
        };
        caps.firstMatch = [{ foo: 'bar1' }, { foo: 'bar2' }];

        var constraints = {
          foo: {
            presence: true,
            isString: true
          }
        };

        (0, _libBasedriverCapabilities.parseCaps)(caps, constraints).validatedFirstMatchCaps.should.deep.equal(caps.firstMatch);
      });

      it('returns invalid argument error if the firstMatch[2] is not an object', function () {
        caps.alwaysMatch = 'Not an object and not undefined';
        caps.firstMatch = [{ foo: 'bar' }, 'foo'];
        (function () {
          return (0, _libBasedriverCapabilities.parseCaps)(caps, {});
        }).should['throw'](/must be a JSON object/);
      });
    });

    describe('returns a matchedCaps object (6)', function () {
      beforeEach(function () {
        caps.alwaysMatch = { hello: 'world' };
      });

      it('which is same as alwaysMatch if firstMatch array is not provided', function () {
        (0, _libBasedriverCapabilities.parseCaps)(caps).matchedCaps.should.deep.equal({ hello: 'world' });
      });

      it('merges caps together', function () {
        caps.firstMatch = [{ foo: 'bar' }];
        (0, _libBasedriverCapabilities.parseCaps)(caps).matchedCaps.should.deep.equal({ hello: 'world', foo: 'bar' });
      });

      it('with merged caps', function () {
        caps.firstMatch = [{ hello: 'bar', foo: 'foo' }, { foo: 'bar' }];
        (0, _libBasedriverCapabilities.parseCaps)(caps).matchedCaps.should.deep.equal({ hello: 'world', foo: 'bar' });
      });
    });
  });

  describe('#processCaps', function () {
    it('should return "alwaysMatch" if "firstMatch" and "constraints" were not provided', function () {
      (0, _libBasedriverCapabilities.processCapabilities)({}).should.deep.equal({});
    });

    it('should return merged caps', function () {
      (0, _libBasedriverCapabilities.processCapabilities)({
        alwaysMatch: { hello: 'world' },
        firstMatch: [{ foo: 'bar' }]
      }).should.deep.equal({ hello: 'world', foo: 'bar' });
    });

    it('should strip out the "appium:" prefix for non-standard capabilities', function () {
      (0, _libBasedriverCapabilities.processCapabilities)({
        alwaysMatch: { 'appium:hello': 'world' },
        firstMatch: [{ 'appium:foo': 'bar' }]
      }).should.deep.equal({ hello: 'world', foo: 'bar' });
    });

    it('should throw an exception if a standard capability (https://www.w3.org/TR/webdriver/#dfn-table-of-standard-capabilities) is prefixed', function () {
      (function () {
        return (0, _libBasedriverCapabilities.processCapabilities)({
          alwaysMatch: { 'appium:platformName': 'Whatevz' },
          firstMatch: [{ 'appium:browserName': 'Anything' }]
        });
      }).should['throw'](/standard capabilities/);
    });

    it('should not throw an exception if presence constraint is not met on a firstMatch capability', function () {
      var caps = (0, _libBasedriverCapabilities.processCapabilities)({
        alwaysMatch: { 'platformName': 'Fake', 'appium:fakeCap': 'foobar' },
        firstMatch: [{ 'foo': 'bar' }]
      }, {
        platformName: {
          presence: true
        },
        fakeCap: {
          presence: true
        }
      });

      caps.platformName.should.equal('Fake');
      caps.fakeCap.should.equal('foobar');
      caps.foo.should.equal('bar');
    });

    it('should throw an exception if no matching caps were found', function () {
      (function () {
        return (0, _libBasedriverCapabilities.processCapabilities)({
          alwaysMatch: { 'platformName': 'Fake', 'appium:fakeCap': 'foobar' },
          firstMatch: [{ 'foo': 'bar' }]
        }, {
          platformName: {
            presence: true
          },
          fakeCap: {
            presence: true
          },
          missingCap: {
            presence: true
          }
        });
      }).should['throw'](/'missingCap' can't be blank/);
    });

    describe('validate Appium constraints', function () {
      var constraints = _extends({}, _libBasedriverDesiredCaps.desiredCapabilityConstraints);

      var matchingCaps = { 'platformName': 'Fake', 'automationName': 'Fake', 'deviceName': 'Fake' };
      var caps = undefined;

      it('should validate when alwaysMatch has the proper caps', function () {
        caps = {
          alwaysMatch: matchingCaps,
          firstMatch: [{}]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should validate when firstMatch[0] has the proper caps', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [matchingCaps]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should validate when alwaysMatch and firstMatch[0] have the proper caps when merged together', function () {
        caps = {
          alwaysMatch: _lodash2['default'].omit(matchingCaps, ['deviceName']),
          firstMatch: [{ 'appium:deviceName': 'Fake' }]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should validate when automationName is omitted', function () {
        caps = {
          alwaysMatch: _lodash2['default'].omit(matchingCaps, ['automationName'])
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(_lodash2['default'].omit(matchingCaps, 'automationName'));
      });

      it('should pass if first element in "firstMatch" does validate and second element does not', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [matchingCaps, { badCaps: 'badCaps' }]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should pass if first element in "firstMatch" does not validate and second element does', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [{ badCaps: 'badCaps' }, matchingCaps]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should fail when deviceName is blank', function () {
        caps = {
          alwaysMatch: _lodash2['default'].omit(matchingCaps, ['deviceName'])
        };
        (function () {
          return (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints);
        }).should['throw'](/'deviceName' can't be blank/);
      });

      it('should fail when a bad automation name is provided', function () {
        caps = {
          alwaysMatch: _extends({}, matchingCaps, {
            automationName: 'NotAValidAutomationName'
          })
        };
        (function () {
          return (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints);
        }).should['throw'](/'automationName' NotAValidAutomationName not part of/);
      });

      it('should fail when bad parameters are passed in more than one firstMatch capability', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [{
            bad: 'params'
          }, {
            more: 'bad-params'
          }]
        };
        (function () {
          return (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints);
        }).should['throw'](/Could not find matching capabilities/);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9jYXBhYmlsaXRpZXMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3lDQUF3RSxtQ0FBbUM7O29CQUMxRixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7Ozt3Q0FDdUIsbUNBQW1DOztBQUVoRixrQkFBSyxHQUFHLDZCQUFnQixDQUFDO0FBQ3pCLElBQU0sTUFBTSxHQUFHLGtCQUFLLE1BQU0sRUFBRSxDQUFDOztBQUU3QixRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVk7OztBQUczQixVQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsTUFBRSxDQUFDLHlFQUF5RSxFQUFFLFlBQVk7aUJBQ3hFLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQzs7O0FBQS9DLFlBQUksR0FBRyxXQUFBLENBQUE7QUFDVixTQUFDLFlBQVk7QUFBRSx1REFBYSxHQUFHLENBQUMsQ0FBQztTQUFFLENBQUEsQ0FBRSxNQUFNLFNBQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7QUFEN0UsK0NBQXNEOztPQUVyRDtLQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsc0ZBQXNGLEVBQUUsWUFBWTtBQUNyRyxtREFBYSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4QyxDQUFDLENBQUM7O0FBRUgsWUFBUSxDQUFDLDBDQUEwQyxFQUFFLFlBQVk7QUFDL0QsUUFBRSxDQUFDLDRFQUE0RSxFQUFFLFlBQVk7QUFDM0YsU0FBQztpQkFBTSw2Q0FBYSxFQUFFLEVBQUUsRUFBQyxHQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUMsQ0FBQztVQUFBLENBQUUsTUFBTSxTQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztPQUN4RixDQUFDLENBQUM7O0FBRUgsUUFBRSxDQUFDLGdG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ZXN0L2Jhc2Vkcml2ZXIvY2FwYWJpbGl0aWVzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VDYXBzLCB2YWxpZGF0ZUNhcHMsIG1lcmdlQ2FwcywgcHJvY2Vzc0NhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uL2xpYi9iYXNlZHJpdmVyL2NhcGFiaWxpdGllcyc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBkZXNpcmVkQ2FwYWJpbGl0eUNvbnN0cmFpbnRzIH0gZnJvbSAnLi4vLi4vbGliL2Jhc2Vkcml2ZXIvZGVzaXJlZC1jYXBzJztcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcblxuZGVzY3JpYmUoJ2NhcHMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gVGVzdHMgYmFzZWQgb246IGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJkcml2ZXIvI2Rmbi12YWxpZGF0ZS1jYXBzXG4gIGRlc2NyaWJlKCcjdmFsaWRhdGVDYXBzJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgXCJjYXBhYmlsaXR5XCIgaXMgbm90IGEgSlNPTiBvYmplY3QgKDEpJywgZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgYXJnIG9mIFt1bmRlZmluZWQsIG51bGwsIDEsIHRydWUsICdzdHJpbmcnXSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkgeyB2YWxpZGF0ZUNhcHMoYXJnKTsgfSkuc2hvdWxkLnRocm93KC9tdXN0IGJlIGEgSlNPTiBvYmplY3QvKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHJlc3VsdCB7fSBieSBkZWZhdWx0IGlmIGNhcHMgaXMgZW1wdHkgb2JqZWN0IGFuZCBubyBjb25zdHJhaW50cyBwcm92aWRlZCAoMiknLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YWxpZGF0ZUNhcHMoe30pLnNob3VsZC5kZWVwLmVxdWFsKHt9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHJvd3MgZXJyb3JzIGlmIGNvbnN0cmFpbnRzIGFyZSBub3QgbWV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcInByZXNlbnRcIiBjb25zdHJhaW50IG5vdCBtZXQgb24gcHJvcGVydHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB2YWxpZGF0ZUNhcHMoe30sIHtmb286IHtwcmVzZW5jZTogdHJ1ZX19KSkuc2hvdWxkLnRocm93KC8nZm9vJyBjYW4ndCBiZSBibGFuay8pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBjYXBhYmlsaXR5IHRoYXQgd2FzIHBhc3NlZCBpbiBpZiBcInNraXBQcmVzZW5jZUNvbnN0cmFpbnRcIiBpcyBmYWxzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFsaWRhdGVDYXBzKHt9LCB7Zm9vOiB7cHJlc2VuY2U6IHRydWV9fSwge3NraXBQcmVzZW5jZUNvbnN0cmFpbnQ6IHRydWV9KS5zaG91bGQuZGVlcC5lcXVhbCh7fSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcImlzU3RyaW5nXCIgY29uc3RyYWludCBub3QgbWV0IG9uIHByb3BlcnR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4gdmFsaWRhdGVDYXBzKHtmb286IDF9LCB7Zm9vOiB7aXNTdHJpbmc6IHRydWV9fSkpLnNob3VsZC50aHJvdygvJ2ZvbycgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy8pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgXCJpc051bWJlclwiIGNvbnN0cmFpbnQgbm90IG1ldCBvbiBwcm9wZXJ0eScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHZhbGlkYXRlQ2Fwcyh7Zm9vOiAnYmFyJ30sIHtmb286IHtpc051bWJlcjogdHJ1ZX19KSkuc2hvdWxkLnRocm93KC8nZm9vJyBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyLyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcImlzQm9vbGVhblwiIGNvbnN0cmFpbnQgbm90IG1ldCBvbiBwcm9wZXJ0eScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHZhbGlkYXRlQ2Fwcyh7Zm9vOiAnYmFyJ30sIHtmb286IHtpc0Jvb2xlYW46IHRydWV9fSkpLnNob3VsZC50aHJvdygvJ2ZvbycgbXVzdCBiZSBvZiB0eXBlIGJvb2xlYW4vKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBpbnZhbGlkIGFyZ3VtZW50IGVycm9yIGlmIFwiaW5jbHVzaW9uXCIgY29uc3RyYWludCBub3QgbWV0IG9uIHByb3BlcnR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4gdmFsaWRhdGVDYXBzKHtmb286ICczJ30sIHtmb286IHtpbmNsdXNpb25DYXNlSW5zZW5zaXRpdmU6IFsnMScsICcyJ119fSkpLnNob3VsZC50aHJvdygvJ2ZvbycgMyBub3QgcGFydCBvZiAxLDIvKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBpbnZhbGlkIGFyZ3VtZW50IGVycm9yIGlmIFwiaW5jbHVzaW9uQ2FzZUluc2Vuc2l0aXZlXCIgY29uc3RyYWludCBub3QgbWV0IG9uIHByb3BlcnR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4gdmFsaWRhdGVDYXBzKHtmb286ICdhJ30sIHtmb286IHtpbmNsdXNpb246IFsnQScsICdCJywgJ0MnXX19KSkuc2hvdWxkLnRocm93KC8nZm9vJyBhIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgbGlzdC8pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB0aHJvdyBlcnJvcnMgaWYgY29uc3RyYWludHMgYXJlIG1ldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICBudW1iZXI6IDEsXG4gICAgICAgIHN0cmluZzogJ3N0cmluZycsXG4gICAgICAgIHByZXNlbnQ6ICdwcmVzZW50JyxcbiAgICAgICAgZXh0cmE6ICdleHRyYScsXG4gICAgICB9O1xuXG4gICAgICBsZXQgY29uc3RyYWludHMgPSB7XG4gICAgICAgIG51bWJlcjoge2lzTnVtYmVyOiB0cnVlfSxcbiAgICAgICAgc3RyaW5nOiB7aXNTdHJpbmc6IHRydWV9LFxuICAgICAgICBwcmVzZW50OiB7cHJlc2VuY2U6IHRydWV9LFxuICAgICAgICBub3RQcmVzZW50OiB7cHJlc2VuY2U6IGZhbHNlfSxcbiAgICAgIH07XG5cbiAgICAgIHZhbGlkYXRlQ2FwcyhjYXBzLCBjb25zdHJhaW50cykuc2hvdWxkLmRlZXAuZXF1YWwoY2Fwcyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFRlc3RzIGJhc2VkIG9uOiBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tbWVyZ2luZy1jYXBzXG4gIGRlc2NyaWJlKCcjbWVyZ2VDYXBzJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdyZXR1cm5zIGEgcmVzdWx0IHRoYXQgaXMge30gYnkgZGVmYXVsdCAoMSknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtZXJnZUNhcHMoKS5zaG91bGQuZGVlcC5lcXVhbCh7fSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHJlc3VsdCB0aGF0IG1hdGNoZXMgcHJpbWFyeSBieSBkZWZhdWx0ICgyLCAzKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lcmdlQ2Fwcyh7aGVsbG86ICd3b3JsZCd9KS5zaG91bGQuZGVlcC5lcXVhbCh7aGVsbG86ICd3b3JsZCd9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IGhhdmUgbWF0Y2hpbmcgcHJvcGVydGllcyAoNCknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAoKCkgPT4gbWVyZ2VDYXBzKHtoZWxsbzogJ3dvcmxkJ30sIHtoZWxsbzogJ3doaXJsJ30pKS5zaG91bGQudGhyb3coL3Byb3BlcnR5ICdoZWxsbycgc2hvdWxkIG5vdCBleGlzdCBvbiBib3RoIHByaW1hcnkgW1xcd1xcV10qIGFuZCBzZWNvbmRhcnkgW1xcd1xcV10qLyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHJlc3VsdCB3aXRoIGtleXMgZnJvbSBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgdG9nZXRoZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcHJpbWFyeSA9IHtcbiAgICAgICAgYTogJ2EnLFxuICAgICAgICBiOiAnYicsXG4gICAgICB9O1xuICAgICAgbGV0IHNlY29uZGFyeSA9IHtcbiAgICAgICAgYzogJ2MnLFxuICAgICAgICBkOiAnZCcsXG4gICAgICB9O1xuICAgICAgbWVyZ2VDYXBzKHByaW1hcnksIHNlY29uZGFyeSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBhOiAnYScsIGI6ICdiJywgYzogJ2MnLCBkOiAnZCcsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gVGVzdHMgYmFzZWQgb246IGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJkcml2ZXIvI3Byb2Nlc3NpbmctY2Fwc1xuICBkZXNjcmliZSgnI3BhcnNlQ2FwcycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2FwcztcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY2FwcyA9IHt9O1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gaW52YWxpZCBhcmd1bWVudCBpZiBubyBjYXBzIG9iamVjdCBwcm92aWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICgoKSA9PiBwYXJzZUNhcHMoKSkuc2hvdWxkLnRocm93KC9tdXN0IGJlIGEgSlNPTiBvYmplY3QvKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIFwicmVxdWlyZWRDYXBzXCIgdG8gcHJvcGVydHkgbmFtZWQgXCJhbHdheXNNYXRjaFwiICgyKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhcHMuYWx3YXlzTWF0Y2ggPSB7aGVsbG86ICd3b3JsZCd9O1xuICAgICAgcGFyc2VDYXBzKGNhcHMpLnJlcXVpcmVkQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChjYXBzLmFsd2F5c01hdGNoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIFwicmVxdWlyZWRDYXBzXCIgdG8gZW1wdHkgSlNPTiBvYmplY3QgaWYgXCJhbHdheXNNYXRjaFwiIGlzIG5vdCBhbiBvYmplY3QgKDIuMSknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwYXJzZUNhcHMoY2FwcykucmVxdWlyZWRDYXBzLnNob3VsZC5kZWVwLmVxdWFsKHt9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgXCJyZXF1aXJlZENhcHNcIiBkb25cXCd0IG1hdGNoIFwiY29uc3RyYWludHNcIiAoMi4yKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhcHMuYWx3YXlzTWF0Y2ggPSB7Zm9vOiAxfTtcbiAgICAgICgoKSA9PiBwYXJzZUNhcHMoY2Fwcywge2Zvbzoge2lzU3RyaW5nOiB0cnVlfX0pKS5zaG91bGQudGhyb3coLydmb28nIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcvKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIFwiYWxsRmlyc3RNYXRjaENhcHNcIiB0byBwcm9wZXJ0eSBuYW1lZCBcImZpcnN0TWF0Y2hcIiAoMyknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwYXJzZUNhcHMoe30sIFt7fV0pLmFsbEZpcnN0TWF0Y2hDYXBzLnNob3VsZC5kZWVwLmVxdWFsKFt7fV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgXCJhbGxGaXJzdE1hdGNoQ2Fwc1wiIHRvIFt7fV0gaWYgXCJmaXJzdE1hdGNoXCIgaXMgdW5kZWZpbmVkICgzLjEpJywgZnVuY3Rpb24gKCkge1xuICAgICAgcGFyc2VDYXBzKHt9KS5hbGxGaXJzdE1hdGNoQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChbe31dKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgXCJmaXJzdE1hdGNoXCIgaXMgbm90IGFuIGFycmF5IGFuZCBpcyBub3QgdW5kZWZpbmVkICgzLjIpJywgZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgYXJnIG9mIFtudWxsLCAxLCB0cnVlLCAnc3RyaW5nJ10pIHtcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gYXJnO1xuICAgICAgICAoZnVuY3Rpb24gKCkgeyBwYXJzZUNhcHMoY2Fwcyk7IH0pLnNob3VsZC50aHJvdygvbXVzdCBiZSBhIEpTT04gYXJyYXkgb3IgdW5kZWZpbmVkLyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnaGFzIFwidmFsaWRhdGVkRmlyc3RNYXRjaENhcHNcIiBwcm9wZXJ0eSB0aGF0IGlzIGVtcHR5IGJ5IGRlZmF1bHQgaWYgbm8gdmFsaWQgZmlyc3RNYXRjaCBjYXBzIHdlcmUgZm91bmQgKDQpJywgZnVuY3Rpb24gKCkge1xuICAgICAgcGFyc2VDYXBzKGNhcHMsIHtmb286IHtwcmVzZW5jZTogdHJ1ZX19KS52YWxpZGF0ZWRGaXJzdE1hdGNoQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChbXSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmV0dXJucyBhIFwidmFsaWRhdGVkRmlyc3RNYXRjaENhcHNcIiBhcnJheSAoNSknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgndGhhdCBlcXVhbHMgXCJmaXJzdE1hdGNoXCIgaWYgZmlyc3RNYXRjaCBpcyBvbmUgZW1wdHkgb2JqZWN0IGFuZCB0aGVyZSBhcmUgbm8gY29uc3RyYWludHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMuZmlyc3RNYXRjaCA9IFt7fV07XG4gICAgICAgIHBhcnNlQ2FwcyhjYXBzKS52YWxpZGF0ZWRGaXJzdE1hdGNoQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChjYXBzLmZpcnN0TWF0Y2gpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIFwibnVsbFwiIG1hdGNoZWRDYXBzIGlmIG5vdGhpbmcgbWF0Y2hlcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gW3t9XTtcbiAgICAgICAgc2hvdWxkLmVxdWFsKHBhcnNlQ2FwcyhjYXBzLCB7Zm9vOiB7cHJlc2VuY2U6IHRydWV9fSkubWF0Y2hlZENhcHMsIG51bGwpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGBzaG91bGQgcmV0dXJuIGNhcGFiaWxpdGllcyBpZiBwcmVzZW5jZSBjb25zdHJhaW50IGlzIG1hdGNoZWQgaW4gYXQgbGVhc3Qgb25lIG9mIHRoZSAnZmlyc3RNYXRjaCcgY2FwYWJpbGl0aWVzIG9iamVjdHNgLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMuYWx3YXlzTWF0Y2ggPSB7XG4gICAgICAgICAgZm9vOiAnYmFyJyxcbiAgICAgICAgfTtcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gW3tcbiAgICAgICAgICBoZWxsbzogJ3dvcmxkJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgIGdvb2RieWU6ICd3b3JsZCcsXG4gICAgICAgIH1dO1xuICAgICAgICBwYXJzZUNhcHMoY2Fwcywge2dvb2RieWU6IHtwcmVzZW5jZTogdHJ1ZX19KS5tYXRjaGVkQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgICAgZm9vOiAnYmFyJyxcbiAgICAgICAgICBnb29kYnllOiAnd29ybGQnLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChgdGhyb3dzIGludmFsaWQgYXJndW1lbnQgaWYgcHJlc2VuY2UgY29uc3RyYWludCBpcyBub3QgbWV0IG9uIGFueSBjYXBhYmlsaXRpZXNgLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMuYWx3YXlzTWF0Y2ggPSB7XG4gICAgICAgICAgZm9vOiAnYmFyJyxcbiAgICAgICAgfTtcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gW3tcbiAgICAgICAgICBoZWxsbzogJ3dvcmxkJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgIGdvb2RieWU6ICd3b3JsZCcsXG4gICAgICAgIH1dO1xuICAgICAgICBzaG91bGQuZXF1YWwocGFyc2VDYXBzKGNhcHMsIHtzb21lQXR0cmlidXRlOiB7cHJlc2VuY2U6IHRydWV9fSkubWF0Y2hlZENhcHMsIG51bGwpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd0aGF0IGVxdWFscyBmaXJzdE1hdGNoIGlmIGZpcnN0TWF0Y2ggY29udGFpbnMgdHdvIG9iamVjdHMgdGhhdCBwYXNzIHRoZSBwcm92aWRlZCBjb25zdHJhaW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9IHtcbiAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgIH07XG4gICAgICAgIGNhcHMuZmlyc3RNYXRjaCA9IFtcbiAgICAgICAgICB7Zm9vOiAnYmFyMSd9LFxuICAgICAgICAgIHtmb286ICdiYXIyJ30sXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGNvbnN0cmFpbnRzID0ge1xuICAgICAgICAgIGZvbzoge1xuICAgICAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgICAgICBpc1N0cmluZzogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcGFyc2VDYXBzKGNhcHMsIGNvbnN0cmFpbnRzKS52YWxpZGF0ZWRGaXJzdE1hdGNoQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChjYXBzLmZpcnN0TWF0Y2gpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgdGhlIGZpcnN0TWF0Y2hbMl0gaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9ICdOb3QgYW4gb2JqZWN0IGFuZCBub3QgdW5kZWZpbmVkJztcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gW3tmb286ICdiYXInfSwgJ2ZvbyddO1xuICAgICAgICAoKCkgPT4gcGFyc2VDYXBzKGNhcHMsIHt9KSkuc2hvdWxkLnRocm93KC9tdXN0IGJlIGEgSlNPTiBvYmplY3QvKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JldHVybnMgYSBtYXRjaGVkQ2FwcyBvYmplY3QgKDYpJywgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNhcHMuYWx3YXlzTWF0Y2ggPSB7aGVsbG86ICd3b3JsZCd9O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd3aGljaCBpcyBzYW1lIGFzIGFsd2F5c01hdGNoIGlmIGZpcnN0TWF0Y2ggYXJyYXkgaXMgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwYXJzZUNhcHMoY2FwcykubWF0Y2hlZENhcHMuc2hvdWxkLmRlZXAuZXF1YWwoe2hlbGxvOiAnd29ybGQnfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ21lcmdlcyBjYXBzIHRvZ2V0aGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBbe2ZvbzogJ2Jhcid9XTtcbiAgICAgICAgcGFyc2VDYXBzKGNhcHMpLm1hdGNoZWRDYXBzLnNob3VsZC5kZWVwLmVxdWFsKHtoZWxsbzogJ3dvcmxkJywgZm9vOiAnYmFyJ30pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd3aXRoIG1lcmdlZCBjYXBzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBbe2hlbGxvOiAnYmFyJywgZm9vOiAnZm9vJ30sIHtmb286ICdiYXInfV07XG4gICAgICAgIHBhcnNlQ2FwcyhjYXBzKS5tYXRjaGVkQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbCh7aGVsbG86ICd3b3JsZCcsIGZvbzogJ2Jhcid9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI3Byb2Nlc3NDYXBzJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIFwiYWx3YXlzTWF0Y2hcIiBpZiBcImZpcnN0TWF0Y2hcIiBhbmQgXCJjb25zdHJhaW50c1wiIHdlcmUgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzc0NhcGFiaWxpdGllcyh7fSkuc2hvdWxkLmRlZXAuZXF1YWwoe30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbWVyZ2VkIGNhcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzQ2FwYWJpbGl0aWVzKHtcbiAgICAgICAgYWx3YXlzTWF0Y2g6IHtoZWxsbzogJ3dvcmxkJ30sXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7Zm9vOiAnYmFyJ31dXG4gICAgICB9KS5zaG91bGQuZGVlcC5lcXVhbCh7aGVsbG86ICd3b3JsZCcsIGZvbzogJ2Jhcid9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3RyaXAgb3V0IHRoZSBcImFwcGl1bTpcIiBwcmVmaXggZm9yIG5vbi1zdGFuZGFyZCBjYXBhYmlsaXRpZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzQ2FwYWJpbGl0aWVzKHtcbiAgICAgICAgYWx3YXlzTWF0Y2g6IHsnYXBwaXVtOmhlbGxvJzogJ3dvcmxkJ30sXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7J2FwcGl1bTpmb28nOiAnYmFyJ31dXG4gICAgICB9KS5zaG91bGQuZGVlcC5lcXVhbCh7aGVsbG86ICd3b3JsZCcsIGZvbzogJ2Jhcid9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGEgc3RhbmRhcmQgY2FwYWJpbGl0eSAoaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jZGZuLXRhYmxlLW9mLXN0YW5kYXJkLWNhcGFiaWxpdGllcykgaXMgcHJlZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAoKCkgPT4gcHJvY2Vzc0NhcGFiaWxpdGllcyh7XG4gICAgICAgIGFsd2F5c01hdGNoOiB7J2FwcGl1bTpwbGF0Zm9ybU5hbWUnOiAnV2hhdGV2eid9LFxuICAgICAgICBmaXJzdE1hdGNoOiBbeydhcHBpdW06YnJvd3Nlck5hbWUnOiAnQW55dGhpbmcnfV0sXG4gICAgICB9KSkuc2hvdWxkLnRocm93KC9zdGFuZGFyZCBjYXBhYmlsaXRpZXMvKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGV4Y2VwdGlvbiBpZiBwcmVzZW5jZSBjb25zdHJhaW50IGlzIG5vdCBtZXQgb24gYSBmaXJzdE1hdGNoIGNhcGFiaWxpdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjYXBzID0gcHJvY2Vzc0NhcGFiaWxpdGllcyh7XG4gICAgICAgIGFsd2F5c01hdGNoOiB7J3BsYXRmb3JtTmFtZSc6ICdGYWtlJywgJ2FwcGl1bTpmYWtlQ2FwJzogJ2Zvb2Jhcid9LFxuICAgICAgICBmaXJzdE1hdGNoOiBbeydmb28nOiAnYmFyJ31dLFxuICAgICAgfSwge1xuICAgICAgICBwbGF0Zm9ybU5hbWU6IHtcbiAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZmFrZUNhcDoge1xuICAgICAgICAgIHByZXNlbmNlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgY2Fwcy5wbGF0Zm9ybU5hbWUuc2hvdWxkLmVxdWFsKCdGYWtlJyk7XG4gICAgICBjYXBzLmZha2VDYXAuc2hvdWxkLmVxdWFsKCdmb29iYXInKTtcbiAgICAgIGNhcHMuZm9vLnNob3VsZC5lcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBubyBtYXRjaGluZyBjYXBzIHdlcmUgZm91bmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAoKCkgPT4gcHJvY2Vzc0NhcGFiaWxpdGllcyh7XG4gICAgICAgIGFsd2F5c01hdGNoOiB7J3BsYXRmb3JtTmFtZSc6ICdGYWtlJywgJ2FwcGl1bTpmYWtlQ2FwJzogJ2Zvb2Jhcid9LFxuICAgICAgICBmaXJzdE1hdGNoOiBbeydmb28nOiAnYmFyJ31dLFxuICAgICAgfSwge1xuICAgICAgICBwbGF0Zm9ybU5hbWU6IHtcbiAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZmFrZUNhcDoge1xuICAgICAgICAgIHByZXNlbmNlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG1pc3NpbmdDYXA6IHtcbiAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pKS5zaG91bGQudGhyb3coLydtaXNzaW5nQ2FwJyBjYW4ndCBiZSBibGFuay8pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZhbGlkYXRlIEFwcGl1bSBjb25zdHJhaW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjb25zdHJhaW50cyA9IHsuLi5kZXNpcmVkQ2FwYWJpbGl0eUNvbnN0cmFpbnRzfTtcblxuICAgICAgbGV0IG1hdGNoaW5nQ2FwcyA9IHsncGxhdGZvcm1OYW1lJzogJ0Zha2UnLCAnYXV0b21hdGlvbk5hbWUnOiAnRmFrZScsICdkZXZpY2VOYW1lJzogJ0Zha2UnfTtcbiAgICAgIGxldCBjYXBzO1xuXG4gICAgICBpdCgnc2hvdWxkIHZhbGlkYXRlIHdoZW4gYWx3YXlzTWF0Y2ggaGFzIHRoZSBwcm9wZXIgY2FwcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FwcyA9IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDogbWF0Y2hpbmdDYXBzLFxuICAgICAgICAgIGZpcnN0TWF0Y2g6IFt7fV0sXG4gICAgICAgIH07XG4gICAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoY2FwcywgY29uc3RyYWludHMpLnNob3VsZC5kZWVwLmVxdWFsKG1hdGNoaW5nQ2Fwcyk7XG4gICAgICB9KTtcblxuXG4gICAgICBpdCgnc2hvdWxkIHZhbGlkYXRlIHdoZW4gZmlyc3RNYXRjaFswXSBoYXMgdGhlIHByb3BlciBjYXBzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzID0ge1xuICAgICAgICAgIGFsd2F5c01hdGNoOiB7fSxcbiAgICAgICAgICBmaXJzdE1hdGNoOiBbbWF0Y2hpbmdDYXBzXSxcbiAgICAgICAgfTtcbiAgICAgICAgcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykuc2hvdWxkLmRlZXAuZXF1YWwobWF0Y2hpbmdDYXBzKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHZhbGlkYXRlIHdoZW4gYWx3YXlzTWF0Y2ggYW5kIGZpcnN0TWF0Y2hbMF0gaGF2ZSB0aGUgcHJvcGVyIGNhcHMgd2hlbiBtZXJnZWQgdG9nZXRoZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IF8ub21pdChtYXRjaGluZ0NhcHMsIFsnZGV2aWNlTmFtZSddKSxcbiAgICAgICAgICBmaXJzdE1hdGNoOiBbeydhcHBpdW06ZGV2aWNlTmFtZSc6ICdGYWtlJ31dLFxuICAgICAgICB9O1xuICAgICAgICBwcm9jZXNzQ2FwYWJpbGl0aWVzKGNhcHMsIGNvbnN0cmFpbnRzKS5zaG91bGQuZGVlcC5lcXVhbChtYXRjaGluZ0NhcHMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgdmFsaWRhdGUgd2hlbiBhdXRvbWF0aW9uTmFtZSBpcyBvbWl0dGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzID0ge1xuICAgICAgICAgIGFsd2F5c01hdGNoOiBfLm9taXQobWF0Y2hpbmdDYXBzLCBbJ2F1dG9tYXRpb25OYW1lJ10pLFxuICAgICAgICB9O1xuICAgICAgICBwcm9jZXNzQ2FwYWJpbGl0aWVzKGNhcHMsIGNvbnN0cmFpbnRzKS5zaG91bGQuZGVlcC5lcXVhbChfLm9taXQobWF0Y2hpbmdDYXBzLCAnYXV0b21hdGlvbk5hbWUnKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBwYXNzIGlmIGZpcnN0IGVsZW1lbnQgaW4gXCJmaXJzdE1hdGNoXCIgZG9lcyB2YWxpZGF0ZSBhbmQgc2Vjb25kIGVsZW1lbnQgZG9lcyBub3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHt9LFxuICAgICAgICAgIGZpcnN0TWF0Y2g6IFtcbiAgICAgICAgICAgIG1hdGNoaW5nQ2FwcyxcbiAgICAgICAgICAgIHtiYWRDYXBzOiAnYmFkQ2Fwcyd9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoY2FwcywgY29uc3RyYWludHMpLnNob3VsZC5kZWVwLmVxdWFsKG1hdGNoaW5nQ2Fwcyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBwYXNzIGlmIGZpcnN0IGVsZW1lbnQgaW4gXCJmaXJzdE1hdGNoXCIgZG9lcyBub3QgdmFsaWRhdGUgYW5kIHNlY29uZCBlbGVtZW50IGRvZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHt9LFxuICAgICAgICAgIGZpcnN0TWF0Y2g6IFtcbiAgICAgICAgICAgIHtiYWRDYXBzOiAnYmFkQ2Fwcyd9LFxuICAgICAgICAgICAgbWF0Y2hpbmdDYXBzLFxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoY2FwcywgY29uc3RyYWludHMpLnNob3VsZC5kZWVwLmVxdWFsKG1hdGNoaW5nQ2Fwcyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZGV2aWNlTmFtZSBpcyBibGFuaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FwcyA9IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDogXy5vbWl0KG1hdGNoaW5nQ2FwcywgWydkZXZpY2VOYW1lJ10pLFxuICAgICAgICB9O1xuICAgICAgICAoKCkgPT4gcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykpLnNob3VsZC50aHJvdygvJ2RldmljZU5hbWUnIGNhbid0IGJlIGJsYW5rLyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gYSBiYWQgYXV0b21hdGlvbiBuYW1lIGlzIHByb3ZpZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzID0ge1xuICAgICAgICAgIGFsd2F5c01hdGNoOiB7XG4gICAgICAgICAgICAuLi5tYXRjaGluZ0NhcHMsXG4gICAgICAgICAgICBhdXRvbWF0aW9uTmFtZTogJ05vdEFWYWxpZEF1dG9tYXRpb25OYW1lJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICAoKCkgPT4gcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykpLnNob3VsZC50aHJvdygvJ2F1dG9tYXRpb25OYW1lJyBOb3RBVmFsaWRBdXRvbWF0aW9uTmFtZSBub3QgcGFydCBvZi8pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGJhZCBwYXJhbWV0ZXJzIGFyZSBwYXNzZWQgaW4gbW9yZSB0aGFuIG9uZSBmaXJzdE1hdGNoIGNhcGFiaWxpdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHt9LFxuICAgICAgICAgIGZpcnN0TWF0Y2g6IFt7XG4gICAgICAgICAgICBiYWQ6ICdwYXJhbXMnLFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1vcmU6ICdiYWQtcGFyYW1zJyxcbiAgICAgICAgICB9XSxcbiAgICAgICAgfTtcbiAgICAgICAgKCgpID0+IHByb2Nlc3NDYXBhYmlsaXRpZXMoY2FwcywgY29uc3RyYWludHMpKS5zaG91bGQudGhyb3coL0NvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGNhcGFiaWxpdGllcy8pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

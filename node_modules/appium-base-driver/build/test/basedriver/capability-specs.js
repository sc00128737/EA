'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libBasedriverLogger = require('../../lib/basedriver/logger');

var _libBasedriverLogger2 = _interopRequireDefault(_libBasedriverLogger);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Desired Capabilities', function () {

  var d = undefined;

  beforeEach(function () {
    d = new _2['default']();
    _sinon2['default'].spy(_libBasedriverLogger2['default'], 'warn');
  });

  afterEach(function () {
    _libBasedriverLogger2['default'].warn.restore();
  });

  it('should require platformName and deviceName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({}));

        case 3:
          context$2$0.next = 11;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          context$2$0.t0.message.should.contain('deviceName');
          return context$2$0.abrupt('return');

        case 11:

          should.fail('error should have been thrown');

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  it('should require platformName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({ 'platformName': 'iOS' }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('deviceName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  it('should require deviceName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({ 'deviceName': 'Delorean' }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  it('should not care about cap order', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(d.createSession({
            deviceName: 'Delorean',
            platformName: 'iOS'
          }));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should check required caps which are added to driver', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            necessary: {
              presence: true
            },
            proper: {
              presence: true,
              isString: true,
              inclusion: ['Delorean', 'Reventon']
            }
          };

          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean'
          }));

        case 4:
          context$2$0.next = 12;
          break;

        case 6:
          context$2$0.prev = 6;
          context$2$0.t0 = context$2$0['catch'](1);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('necessary');
          context$2$0.t0.message.should.contain('proper');
          return context$2$0.abrupt('return');

        case 12:

          should.fail('error should have been thrown');

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[1, 6]]);
  });

  it('should check added required caps in addition to base', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            necessary: {
              presence: true
            },
            proper: {
              presence: true,
              isString: true,
              inclusion: ['Delorean', 'Reventon']
            }
          };

          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            necessary: 'yup',
            proper: 'yup, your highness'
          }));

        case 4:
          context$2$0.next = 12;
          break;

        case 6:
          context$2$0.prev = 6;
          context$2$0.t0 = context$2$0['catch'](1);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          context$2$0.t0.message.should.contain('deviceName');
          return context$2$0.abrupt('return');

        case 12:

          should.fail('error should have been thrown');

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[1, 6]]);
  });

  it('should accept extra capabilities', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'extra': 'cheese',
            'hold the': 'sauce'
          }));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should log the use of extra caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(500);

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'extra': 'cheese',
            'hold the': 'sauce'
          }));

        case 3:

          _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should be sensitive to the case of caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformname': 'iOS',
            'deviceName': 'Delorean'
          }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  describe('boolean capabilities', function () {
    it('should allow a string "false"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'noReset': 'false'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.noReset.should.eql(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "true"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'noReset': 'true'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.noReset.should.eql(true);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "true" in string capabilities', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'language': 'true'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.equal(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.language.should.eql('true');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('number capabilities', function () {
    it('should allow a string "1"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'newCommandTimeout': '1'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.newCommandTimeout.should.eql(1);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "1.1"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'newCommandTimeout': '1.1'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.newCommandTimeout.should.eql(1.1);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "1" in string capabilities', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'language': '1'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.equal(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.language.should.eql('1');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  it('should error if objects in caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': { a: 'iOS' },
            'deviceName': 'Delorean'
          }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[0, 5]]);
  });

  it('should check for deprecated caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(500);

          d.desiredCapConstraints = {
            'lynx-version': {
              deprecated: true
            }
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'lynx-version': 5
          }));

        case 4:

          _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should not warn if deprecated=false', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(500);

          d.desiredCapConstraints = {
            'lynx-version': {
              deprecated: false
            }
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'lynx-version': 5
          }));

        case 4:

          _libBasedriverLogger2['default'].warn.callCount.should.equal(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should not validate against null/undefined caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            'foo': {
              isString: true
            }
          };

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: null
          }));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(d.deleteSession());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: 1
          }).should.eventually.be.rejectedWith(/was not valid/));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: undefined
          }));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(d.deleteSession());

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: ''
          }));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(d.deleteSession());

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should still validate null/undefined caps whose presence is required', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            foo: {
              presence: true
            }
          };

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: null
          }).should.eventually.be.rejectedWith(/blank/));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: ''
          }).should.eventually.be.rejectedWith(/blank/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('w3c', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should accept w3c capabilities', function callee$2$0() {
            var _ref, _ref2, sessionId, caps;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(d.createSession(null, null, {
                    alwaysMatch: {
                      platformName: 'iOS',
                      deviceName: 'Delorean'
                    }, firstMatch: [{}]
                  }));

                case 2:
                  _ref = context$3$0.sent;
                  _ref2 = _slicedToArray(_ref, 2);
                  sessionId = _ref2[0];
                  caps = _ref2[1];

                  sessionId.should.exist;
                  caps.should.eql({
                    platformName: 'iOS',
                    deviceName: 'Delorean'
                  });
                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(d.deleteSession());

                case 10:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

          it('should ignore w3c capabilities if it is not a plain JSON object', function callee$2$0() {
            var _arr, _i, val, _ref3, _ref32, sessionId, caps;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  _arr = [true, "string", [], 100];
                  _i = 0;

                case 2:
                  if (!(_i < _arr.length)) {
                    context$3$0.next = 17;
                    break;
                  }

                  val = _arr[_i];
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(d.createSession({
                    platformName: 'iOS',
                    deviceName: 'Delorean'
                  }, null, val));

                case 6:
                  _ref3 = context$3$0.sent;
                  _ref32 = _slicedToArray(_ref3, 2);
                  sessionId = _ref32[0];
                  caps = _ref32[1];

                  sessionId.should.exist;
                  caps.should.eql({
                    platformName: 'iOS',
                    deviceName: 'Delorean'
                  });
                  context$3$0.next = 14;
                  return _regeneratorRuntime.awrap(d.deleteSession());

                case 14:
                  _i++;
                  context$3$0.next = 2;
                  break;

                case 17:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9jYXBhYmlsaXR5LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Z0JBQThDLE9BQU87Ozs7b0JBQ3BDLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O21DQUMxQiw2QkFBNkI7Ozs7cUJBQzlCLE9BQU87Ozs7QUFFekIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLHNCQUFzQixFQUFFLFlBQU07O0FBRXJDLE1BQUksQ0FBQyxZQUFBLENBQUM7O0FBRU4sWUFBVSxDQUFDLFlBQU07QUFDZixLQUFDLEdBQUcsbUJBQWdCLENBQUM7QUFDckIsdUJBQU0sR0FBRyxtQ0FBUyxNQUFNLENBQUMsQ0FBQztHQUMzQixDQUFDLENBQUM7O0FBRUgsV0FBUyxDQUFDLFlBQU07QUFDZCxxQ0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDdkIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyw0Q0FBNEMsRUFBRTs7Ozs7OzJDQUV2QyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7Ozs7Ozs7OztBQUV6Qix5QkFBRSxNQUFNLENBQUMsRUFBRSxjQUFXLENBQUMsU0FBTyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3RELHlCQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3pDLHlCQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7OztBQUl6QyxnQkFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOzs7Ozs7O0dBQzlDLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsNkJBQTZCLEVBQUU7Ozs7OzsyQ0FFeEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7Ozs7Ozs7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LGdDQUFVLEVBQUUsVUFBVTtxQkFDdkIsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUM7bUJBQ3BCLENBQUM7Ozs7O0FBTEssMkJBQVM7QUFBRSxzQkFBSTs7QUFNdEIsMkJBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLHNCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNkLGdDQUFZLEVBQUUsS0FBSztBQUNuQiw4QkFBVSxFQUFFLFVBQVU7bUJBQ3ZCLENBQUMsQ0FBQzs7bURBQ0csQ0FBQyxDQUFDLGFBQWEsRUFBRTs7Ozs7OztXQUN4QixDQUFDLENBQUM7O0FBRUgsWUFBRSxDQUFDLGlFQUFpRSxFQUFFOzBCQUMzRCxHQUFHLGlCQUNILFNBQVMsRUFBRSxJQUFJOzs7Ozt5QkFEUixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQzs7Ozs7Ozs7O0FBQWhDLHFCQUFHOzttREFDc0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUM5QyxnQ0FBWSxFQUFFLEtBQUs7QUFDbkIsOEJBQVUsRUFBRSxVQUFVO21CQUN2QixFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7Ozs7O0FBSE4sMkJBQVM7QUFBRSxzQkFBSTs7QUFJdEIsMkJBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLHNCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNkLGdDQUFZLEVBQUUsS0FBSztBQUNuQiw4QkFBVSxFQUFFLFVBQVU7bUJBQ3ZCLENBQUMsQ0FBQzs7bURBQ0csQ0FBQyxDQUFDLGFBQWEsRUFBRTs7Ozs7Ozs7Ozs7O1dBRTFCLENBQUMsQ0FBQzs7Ozs7OztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Jhc2Vkcml2ZXIvY2FwYWJpbGl0eS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmF1bHQgYXMgQmFzZURyaXZlciwgZXJyb3JzIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uLy4uL2xpYi9iYXNlZHJpdmVyL2xvZ2dlcic7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnRGVzaXJlZCBDYXBhYmlsaXRpZXMnLCAoKSA9PiB7XG5cbiAgbGV0IGQ7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZCA9IG5ldyBCYXNlRHJpdmVyKCk7XG4gICAgc2lub24uc3B5KGxvZ2dlciwgJ3dhcm4nKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBsb2dnZXIud2Fybi5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmVxdWlyZSBwbGF0Zm9ybU5hbWUgYW5kIGRldmljZU5hbWUnLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7fSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zaG91bGQuYmUuaW5zdGFuY2VvZihlcnJvcnMuU2Vzc2lvbk5vdENyZWF0ZWRFcnJvcik7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3BsYXRmb3JtTmFtZScpO1xuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdkZXZpY2VOYW1lJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvdWxkLmZhaWwoJ2Vycm9yIHNob3VsZCBoYXZlIGJlZW4gdGhyb3duJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmVxdWlyZSBwbGF0Zm9ybU5hbWUnLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7J3BsYXRmb3JtTmFtZSc6ICdpT1MnfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zaG91bGQuYmUuaW5zdGFuY2VvZihlcnJvcnMuU2Vzc2lvbk5vdENyZWF0ZWRFcnJvcik7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ2RldmljZU5hbWUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG91bGQuZmFpbCgnZXJyb3Igc2hvdWxkIGhhdmUgYmVlbiB0aHJvd24nKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXF1aXJlIGRldmljZU5hbWUnLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7J2RldmljZU5hbWUnOiAnRGVsb3JlYW4nfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zaG91bGQuYmUuaW5zdGFuY2VvZihlcnJvcnMuU2Vzc2lvbk5vdENyZWF0ZWRFcnJvcik7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3BsYXRmb3JtTmFtZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZC5mYWlsKCdlcnJvciBzaG91bGQgaGF2ZSBiZWVuIHRocm93bicpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIG5vdCBjYXJlIGFib3V0IGNhcCBvcmRlcicsIGFzeW5jICgpID0+IHtcblxuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICBkZXZpY2VOYW1lOiAnRGVsb3JlYW4nLFxuICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJ1xuICAgIH0pO1xuXG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2hlY2sgcmVxdWlyZWQgY2FwcyB3aGljaCBhcmUgYWRkZWQgdG8gZHJpdmVyJywgYXN5bmMgKCkgPT4ge1xuICAgIGQuZGVzaXJlZENhcENvbnN0cmFpbnRzID0ge1xuICAgICAgbmVjZXNzYXJ5OiB7XG4gICAgICAgIHByZXNlbmNlOiB0cnVlXG4gICAgICB9LFxuICAgICAgcHJvcGVyOiB7XG4gICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICBpc1N0cmluZzogdHJ1ZSxcbiAgICAgICAgaW5jbHVzaW9uOiBbJ0RlbG9yZWFuJywgJ1JldmVudG9uJ11cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNob3VsZC5iZS5pbnN0YW5jZW9mKGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbignbmVjZXNzYXJ5Jyk7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3Byb3BlcicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZC5mYWlsKCdlcnJvciBzaG91bGQgaGF2ZSBiZWVuIHRocm93bicpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNoZWNrIGFkZGVkIHJlcXVpcmVkIGNhcHMgaW4gYWRkaXRpb24gdG8gYmFzZScsIGFzeW5jICgpID0+IHtcbiAgICBkLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IHtcbiAgICAgIG5lY2Vzc2FyeToge1xuICAgICAgICBwcmVzZW5jZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHByb3Blcjoge1xuICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgaXNTdHJpbmc6IHRydWUsXG4gICAgICAgIGluY2x1c2lvbjogWydEZWxvcmVhbicsICdSZXZlbnRvbiddXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICBuZWNlc3Nhcnk6ICd5dXAnLFxuICAgICAgICBwcm9wZXI6ICd5dXAsIHlvdXIgaGlnaG5lc3MnXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNob3VsZC5iZS5pbnN0YW5jZW9mKGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbigncGxhdGZvcm1OYW1lJyk7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ2RldmljZU5hbWUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG91bGQuZmFpbCgnZXJyb3Igc2hvdWxkIGhhdmUgYmVlbiB0aHJvd24nKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBhY2NlcHQgZXh0cmEgY2FwYWJpbGl0aWVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAncGxhdGZvcm1OYW1lJzogJ2lPUycsXG4gICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbicsXG4gICAgICAnZXh0cmEnOiAnY2hlZXNlJyxcbiAgICAgICdob2xkIHRoZSc6ICdzYXVjZSdcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBsb2cgdGhlIHVzZSBvZiBleHRyYSBjYXBzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudGltZW91dCg1MDApO1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJyxcbiAgICAgICdleHRyYSc6ICdjaGVlc2UnLFxuICAgICAgJ2hvbGQgdGhlJzogJ3NhdWNlJ1xuICAgIH0pO1xuXG4gICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBiZSBzZW5zaXRpdmUgdG8gdGhlIGNhc2Ugb2YgY2FwcycsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICAgJ3BsYXRmb3JtbmFtZSc6ICdpT1MnLFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbidcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc2hvdWxkLmJlLmluc3RhbmNlb2YoZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IpO1xuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdwbGF0Zm9ybU5hbWUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG91bGQuZmFpbCgnZXJyb3Igc2hvdWxkIGhhdmUgYmVlbiB0aHJvd24nKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2Jvb2xlYW4gY2FwYWJpbGl0aWVzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgYWxsb3cgYSBzdHJpbmcgXCJmYWxzZVwiJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbicsXG4gICAgICAgICdub1Jlc2V0JzogJ2ZhbHNlJ1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmJlLmFib3ZlKDApO1xuXG4gICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBkLmdldFNlc3Npb25zKCk7XG4gICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMubm9SZXNldC5zaG91bGQuZXFsKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgYSBzdHJpbmcgXCJ0cnVlXCInLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICAncGxhdGZvcm1OYW1lJzogJ2lPUycsXG4gICAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJyxcbiAgICAgICAgJ25vUmVzZXQnOiAndHJ1ZSdcbiAgICAgIH0pO1xuICAgICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5iZS5hYm92ZSgwKTtcblxuICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgZC5nZXRTZXNzaW9ucygpO1xuICAgICAgc2Vzc2lvbnNbMF0uY2FwYWJpbGl0aWVzLm5vUmVzZXQuc2hvdWxkLmVxbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgYSBzdHJpbmcgXCJ0cnVlXCIgaW4gc3RyaW5nIGNhcGFiaWxpdGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgICAnbGFuZ3VhZ2UnOiAndHJ1ZSdcbiAgICAgIH0pO1xuICAgICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5lcXVhbCgwKTtcblxuICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgZC5nZXRTZXNzaW9ucygpO1xuICAgICAgc2Vzc2lvbnNbMF0uY2FwYWJpbGl0aWVzLmxhbmd1YWdlLnNob3VsZC5lcWwoJ3RydWUnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ251bWJlciBjYXBhYmlsaXRpZXMnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBhIHN0cmluZyBcIjFcIicsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgICAnbmV3Q29tbWFuZFRpbWVvdXQnOiAnMSdcbiAgICAgIH0pO1xuICAgICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5iZS5hYm92ZSgwKTtcblxuICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgZC5nZXRTZXNzaW9ucygpO1xuICAgICAgc2Vzc2lvbnNbMF0uY2FwYWJpbGl0aWVzLm5ld0NvbW1hbmRUaW1lb3V0LnNob3VsZC5lcWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFsbG93IGEgc3RyaW5nIFwiMS4xXCInLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICAncGxhdGZvcm1OYW1lJzogJ2lPUycsXG4gICAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJyxcbiAgICAgICAgJ25ld0NvbW1hbmRUaW1lb3V0JzogJzEuMSdcbiAgICAgIH0pO1xuICAgICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5iZS5hYm92ZSgwKTtcblxuICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgZC5nZXRTZXNzaW9ucygpO1xuICAgICAgc2Vzc2lvbnNbMF0uY2FwYWJpbGl0aWVzLm5ld0NvbW1hbmRUaW1lb3V0LnNob3VsZC5lcWwoMS4xKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgYSBzdHJpbmcgXCIxXCIgaW4gc3RyaW5nIGNhcGFiaWxpdGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgICAnbGFuZ3VhZ2UnOiAnMSdcbiAgICAgIH0pO1xuICAgICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5lcXVhbCgwKTtcblxuICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgZC5nZXRTZXNzaW9ucygpO1xuICAgICAgc2Vzc2lvbnNbMF0uY2FwYWJpbGl0aWVzLmxhbmd1YWdlLnNob3VsZC5lcWwoJzEnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQgKCdzaG91bGQgZXJyb3IgaWYgb2JqZWN0cyBpbiBjYXBzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICAncGxhdGZvcm1OYW1lJzoge2E6ICdpT1MnfSxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNob3VsZC5iZS5pbnN0YW5jZW9mKGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbigncGxhdGZvcm1OYW1lJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvdWxkLmZhaWwoJ2Vycm9yIHNob3VsZCBoYXZlIGJlZW4gdGhyb3duJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2hlY2sgZm9yIGRlcHJlY2F0ZWQgY2FwcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRpbWVvdXQoNTAwKTtcblxuICAgIGQuZGVzaXJlZENhcENvbnN0cmFpbnRzID0ge1xuICAgICAgJ2x5bngtdmVyc2lvbic6IHtcbiAgICAgICAgZGVwcmVjYXRlZDogdHJ1ZVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgJ2x5bngtdmVyc2lvbic6IDVcbiAgICB9KTtcblxuICAgIGxvZ2dlci53YXJuLmNhbGxDb3VudC5zaG91bGQuYmUuYWJvdmUoMCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbm90IHdhcm4gaWYgZGVwcmVjYXRlZD1mYWxzZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRpbWVvdXQoNTAwKTtcblxuICAgIGQuZGVzaXJlZENhcENvbnN0cmFpbnRzID0ge1xuICAgICAgJ2x5bngtdmVyc2lvbic6IHtcbiAgICAgICAgZGVwcmVjYXRlZDogZmFsc2VcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJyxcbiAgICAgICdseW54LXZlcnNpb24nOiA1XG4gICAgfSk7XG5cbiAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIG5vdCB2YWxpZGF0ZSBhZ2FpbnN0IG51bGwvdW5kZWZpbmVkIGNhcHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZC5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSB7XG4gICAgICAnZm9vJzoge1xuICAgICAgICBpc1N0cmluZzogdHJ1ZVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgIGRldmljZU5hbWU6ICdEdW1iJyxcbiAgICAgIGZvbzogbnVsbFxuICAgIH0pO1xuICAgIGF3YWl0IGQuZGVsZXRlU2Vzc2lvbigpO1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgIHBsYXRmb3JtTmFtZTogJ2lPUycsXG4gICAgICBkZXZpY2VOYW1lOiAnRHVtYicsXG4gICAgICBmb286IDFcbiAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3dhcyBub3QgdmFsaWQvKTtcblxuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnLFxuICAgICAgZGV2aWNlTmFtZTogJ0R1bWInLFxuICAgICAgZm9vOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgICBhd2FpdCBkLmRlbGV0ZVNlc3Npb24oKTtcblxuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnLFxuICAgICAgZGV2aWNlTmFtZTogJ0R1bWInLFxuICAgICAgZm9vOiAnJ1xuICAgIH0pO1xuICAgIGF3YWl0IGQuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHN0aWxsIHZhbGlkYXRlIG51bGwvdW5kZWZpbmVkIGNhcHMgd2hvc2UgcHJlc2VuY2UgaXMgcmVxdWlyZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgZC5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSB7XG4gICAgICBmb286IHtcbiAgICAgICAgcHJlc2VuY2U6IHRydWVcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgIHBsYXRmb3JtTmFtZTogJ2lPUycsXG4gICAgICBkZXZpY2VOYW1lOiAnRHVtYicsXG4gICAgICBmb286IG51bGxcbiAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2JsYW5rLyk7XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgIGRldmljZU5hbWU6ICdEdW1iJyxcbiAgICAgIGZvbzogJydcbiAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2JsYW5rLyk7XG5cbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3czYycsIGFzeW5jICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGFjY2VwdCB3M2MgY2FwYWJpbGl0aWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBkLmNyZWF0ZVNlc3Npb24obnVsbCwgbnVsbCwge1xuICAgICAgICBhbHdheXNNYXRjaDoge1xuICAgICAgICAgIHBsYXRmb3JtTmFtZTogJ2lPUycsXG4gICAgICAgICAgZGV2aWNlTmFtZTogJ0RlbG9yZWFuJ1xuICAgICAgICB9LCBmaXJzdE1hdGNoOiBbe31dLFxuICAgICAgfSk7XG4gICAgICBzZXNzaW9uSWQuc2hvdWxkLmV4aXN0O1xuICAgICAgY2Fwcy5zaG91bGQuZXFsKHtcbiAgICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgICAgZGV2aWNlTmFtZTogJ0RlbG9yZWFuJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgZC5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGlnbm9yZSB3M2MgY2FwYWJpbGl0aWVzIGlmIGl0IGlzIG5vdCBhIHBsYWluIEpTT04gb2JqZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgZm9yIChsZXQgdmFsIG9mIFt0cnVlLCBcInN0cmluZ1wiLCBbXSwgMTAwXSkge1xuICAgICAgICBjb25zdCBbc2Vzc2lvbklkLCBjYXBzXSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgICAgICBkZXZpY2VOYW1lOiAnRGVsb3JlYW4nXG4gICAgICAgIH0sIG51bGwsIHZhbCk7XG4gICAgICAgIHNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICAgIGNhcHMuc2hvdWxkLmVxbCh7XG4gICAgICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgICAgICBkZXZpY2VOYW1lOiAnRGVsb3JlYW4nLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgZC5kZWxldGVTZXNzaW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

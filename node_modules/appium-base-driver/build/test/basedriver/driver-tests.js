'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _2 = require('../..');

var _libBasedriverDriver = require("../../lib/basedriver/driver");

var _libBasedriverDriver2 = _interopRequireDefault(_libBasedriverDriver);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

// wrap these tests in a function so we can export the tests and re-use them
// for actual driver implementations
function baseDriverUnitTests(DriverClass) {
  var _this = this;

  var defaultCaps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var w3cCaps = {
    alwaysMatch: _Object$assign({}, defaultCaps, {
      platformName: 'Fake',
      deviceName: 'Commodore 64'
    }),
    firstMatch: [{}]
  };

  describe('BaseDriver', function () {

    var d = undefined;
    beforeEach(function () {
      d = new DriverClass();
    });

    it('should return an empty status object', function callee$2$0() {
      var status;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.getStatus());

          case 2:
            status = context$3$0.sent;

            status.should.eql({});

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return a sessionId from createSession', function callee$2$0() {
      var _ref, _ref2, sessId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            _ref = context$3$0.sent;
            _ref2 = _slicedToArray(_ref, 1);
            sessId = _ref2[0];

            should.exist(sessId);
            sessId.should.be.a('string');
            sessId.length.should.be.above(5);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should not be able to start two sessions without closing the first', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps).should.eventually.be.rejectedWith('session'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should be able to delete a session', function callee$2$0() {
      var sessionId1, sessionId2;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            sessionId1 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.deleteSession());

          case 5:
            should.equal(d.sessionId, null);
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 8:
            sessionId2 = context$3$0.sent;

            sessionId1.should.not.eql(sessionId2);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should get the current session', function callee$2$0() {
      var _ref3, _ref32, caps;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            _ref3 = context$3$0.sent;
            _ref32 = _slicedToArray(_ref3, 2);
            caps = _ref32[1];
            context$3$0.t0 = caps.should;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.getSession());

          case 8:
            context$3$0.t1 = context$3$0.sent;
            context$3$0.t0.equal.call(context$3$0.t0, context$3$0.t1);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return sessions if no session exists', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 2:
            sessions = context$3$0.sent;

            sessions.length.should.equal(0);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return sessions', function callee$2$0() {
      var caps, sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].clone(defaultCaps);

            caps.a = 'cap';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(d.createSession(caps));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 6:
            sessions = context$3$0.sent;

            sessions.length.should.equal(1);
            sessions[0].should.eql({
              id: d.sessionId,
              capabilities: caps
            });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should fulfill an unexpected driver quit promise', function callee$2$0() {
      var cmdPromise;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // make a command that will wait a bit so we can crash while it's running
            d.getStatus = (function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

                  case 2:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }).bind(d);
            cmdPromise = d.executeCommand('getStatus');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(0));

          case 4:
            d.startUnexpectedShutdown(new Error('We crashed'));
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(cmdPromise.should.be.rejectedWith(/We crashed/));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith(/We crashed/));

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should not allow commands in middle of unexpected shutdown', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // make a command that will wait a bit so we can crash while it's running
            d.oldDeleteSession = d.deleteSession;
            d.deleteSession = (function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(this.oldDeleteSession());

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }).bind(d);
            caps = _lodash2['default'].clone(defaultCaps);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.createSession(caps));

          case 5:
            d.startUnexpectedShutdown(new Error('We crashed'));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith(/We crashed/));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(d.executeCommand('getSession').should.be.rejectedWith(/shut down/));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow new commands after done shutting down', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // make a command that will wait a bit so we can crash while it's running
            d.oldDeleteSession = d.deleteSession;
            d.deleteSession = (function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(this.oldDeleteSession());

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }).bind(d);
            caps = _lodash2['default'].clone(defaultCaps);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.createSession(caps));

          case 5:
            d.startUnexpectedShutdown(new Error('We crashed'));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith(/We crashed/));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(d.executeCommand('getSession').should.be.rejectedWith(/shut down/));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(d.executeCommand('createSession', caps));

          case 14:
            context$3$0.next = 16;
            return _regeneratorRuntime.awrap(d.deleteSession());

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should distinguish between W3C and JSONWP session', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.executeCommand('createSession', _Object$assign({}, defaultCaps, {
              platformName: 'Fake',
              deviceName: 'Commodore 64'
            })));

          case 2:

            d.protocol.should.equal('MJSONWP');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.executeCommand('deleteSession'));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(d.executeCommand('createSession', null, null, {
              alwaysMatch: _Object$assign({}, defaultCaps, {
                platformName: 'Fake',
                deviceName: 'Commodore 64'
              }),
              firstMatch: [{}]
            }));

          case 7:

            d.protocol.should.equal('W3C');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should have a method to get driver for a session', function callee$2$0() {
      var _ref4, _ref42, sessId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 1);
            sessId = _ref42[0];

            d.driverForSession(sessId).should.eql(d);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    describe('command queue', function () {
      var d = new DriverClass();

      var waitMs = 10;
      d.getStatus = (function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(waitMs));

            case 2:
              return context$4$0.abrupt('return', Date.now());

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      }).bind(d);

      d.getSessions = (function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(waitMs));

            case 2:
              throw new Error('multipass');

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      }).bind(d);

      afterEach(function () {
        d.clearNewCommandTimeout();
      });

      it('should queue commands and.executeCommand/respond in the order received', function callee$3$0() {
        var numCmds, cmds, i, results;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              numCmds = 10;
              cmds = [];

              for (i = 0; i < numCmds; i++) {
                cmds.push(d.executeCommand('getStatus'));
              }
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].all(cmds));

            case 5:
              results = context$4$0.sent;
              i = 1;

            case 7:
              if (!(i < numCmds)) {
                context$4$0.next = 13;
                break;
              }

              if (!(results[i] <= results[i - 1])) {
                context$4$0.next = 10;
                break;
              }

              throw new Error('Got result out of order');

            case 10:
              i++;
              context$4$0.next = 7;
              break;

            case 13:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should handle errors correctly when queuing', function callee$3$0() {
        var numCmds, cmds, i, results;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              numCmds = 10;
              cmds = [];

              for (i = 0; i < numCmds; i++) {
                if (i === 5) {
                  cmds.push(d.executeCommand('getSessions'));
                } else {
                  cmds.push(d.executeCommand('getStatus'));
                }
              }
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].settle(cmds));

            case 5:
              results = context$4$0.sent;
              i = 1;

            case 7:
              if (!(i < 5)) {
                context$4$0.next = 13;
                break;
              }

              if (!(results[i].value() <= results[i - 1].value())) {
                context$4$0.next = 10;
                break;
              }

              throw new Error('Got result out of order');

            case 10:
              i++;
              context$4$0.next = 7;
              break;

            case 13:
              results[5].reason().message.should.contain('multipass');
              i = 7;

            case 15:
              if (!(i < numCmds)) {
                context$4$0.next = 21;
                break;
              }

              if (!(results[i].value() <= results[i - 1].value())) {
                context$4$0.next = 18;
                break;
              }

              throw new Error('Got result out of order');

            case 18:
              i++;
              context$4$0.next = 15;
              break;

            case 21:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should not care if queue empties for a bit', function callee$3$0() {
        var numCmds, cmds, i, results;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              numCmds = 10;
              cmds = [];

              for (i = 0; i < numCmds; i++) {
                cmds.push(d.executeCommand('getStatus'));
              }
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].all(cmds));

            case 5:
              results = context$4$0.sent;

              cmds = [];
              for (i = 0; i < numCmds; i++) {
                cmds.push(d.executeCommand('getStatus'));
              }
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap(_bluebird2['default'].all(cmds));

            case 10:
              results = context$4$0.sent;
              i = 1;

            case 12:
              if (!(i < numCmds)) {
                context$4$0.next = 18;
                break;
              }

              if (!(results[i] <= results[i - 1])) {
                context$4$0.next = 15;
                break;
              }

              throw new Error('Got result out of order');

            case 15:
              i++;
              context$4$0.next = 12;
              break;

            case 18:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('timeouts', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      describe('command', function () {
        it('should exist by default', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                d.newCommandTimeoutMs.should.equal(60000);

              case 1:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
        it('should be settable through `timeouts`', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(d.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'command', ms: 20 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

              case 2:
                d.newCommandTimeoutMs.should.equal(20);

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
      describe('implicit', function () {
        it('should not exist by default', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                d.implicitWaitMs.should.equal(0);

              case 1:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
        it('should be settable through `timeouts`', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(d.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'implicit', ms: 20 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

              case 2:
                d.implicitWaitMs.should.equal(20);

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
    });

    describe('timeouts (W3C)', function () {
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.createSession(null, null, w3cCaps));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      afterEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.deleteSession());

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should get timeouts that we set', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: 1000 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(d.getTimeouts().should.eventually.have.property('implicit', 1000));

            case 4:
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(d.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'command', ms: 2000 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 6:
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(d.getTimeouts().should.eventually.deep.equal({
                implicit: 1000,
                command: 2000
              }));

            case 8:
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap(d.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: 3000 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 10:
              context$4$0.next = 12;
              return _regeneratorRuntime.awrap(d.getTimeouts().should.eventually.deep.equal({
                implicit: 3000,
                command: 2000
              }));

            case 12:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('reset compatibility', function () {
      it('should not allow both fullReset and noReset to be true', function callee$3$0() {
        var newCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              newCaps = _Object$assign({}, defaultCaps, {
                fullReset: true,
                noReset: true
              });
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(d.createSession(newCaps).should.eventually.be.rejectedWith(/noReset.+fullReset/));

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('proxying', function () {
      var sessId = undefined;
      beforeEach(function callee$3$0() {
        var _ref5, _ref52;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

            case 2:
              _ref5 = context$4$0.sent;
              _ref52 = _slicedToArray(_ref5, 1);
              sessId = _ref52[0];

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      describe('#proxyActive', function () {
        it('should exist', function () {
          d.proxyActive.should.be.an['instanceof'](Function);
        });
        it('should return false', function () {
          d.proxyActive(sessId).should.be['false'];
        });
        it('should throw an error when sessionId is wrong', function () {
          (function () {
            d.proxyActive('aaa');
          }).should['throw'];
        });
      });

      describe('#getProxyAvoidList', function () {
        it('should exist', function () {
          d.getProxyAvoidList.should.be.an['instanceof'](Function);
        });
        it('should return an array', function () {
          d.getProxyAvoidList(sessId).should.be.an['instanceof'](Array);
        });
        it('should throw an error when sessionId is wrong', function () {
          (function () {
            d.getProxyAvoidList('aaa');
          }).should['throw'];
        });
      });

      describe('#canProxy', function () {
        it('should have a #canProxy method', function () {
          d.canProxy.should.be.an['instanceof'](Function);
        });
        it('should return false from #canProxy', function () {
          d.canProxy(sessId).should.be['false'];
        });
        it('should throw an error when sessionId is wrong', function () {
          (function () {
            d.canProxy();
          }).should['throw'];
        });
      });
    });

    describe('event timing framework', function () {
      var beforeStartTime = undefined;
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              beforeStartTime = Date.now();
              d.shouldValidateCaps = false;
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(d.executeCommand('createSession', defaultCaps));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      describe('#eventHistory', function () {
        it('should have an eventHistory property', function () {
          should.exist(d.eventHistory);
          should.exist(d.eventHistory.commands);
        });

        it('should have a session start timing after session start', function () {
          var _d$eventHistory = d.eventHistory;
          var newSessionRequested = _d$eventHistory.newSessionRequested;
          var newSessionStarted = _d$eventHistory.newSessionStarted;

          newSessionRequested.should.have.length(1);
          newSessionStarted.should.have.length(1);
          newSessionRequested[0].should.be.a('number');
          newSessionStarted[0].should.be.a('number');
          (newSessionRequested[0] >= beforeStartTime).should.be['true'];
          (newSessionStarted[0] >= newSessionRequested[0]).should.be['true'];
        });

        it('should include a commands list', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(d.executeCommand('getStatus', []));

              case 2:
                d.eventHistory.commands.length.should.equal(2);
                d.eventHistory.commands[1].cmd.should.equal('getStatus');
                d.eventHistory.commands[1].startTime.should.be.a('number');
                d.eventHistory.commands[1].endTime.should.be.a('number');

              case 6:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
      describe('#logEvent', function () {
        it('should allow logging arbitrary events', function () {
          d.logEvent('foo');
          d.eventHistory.foo[0].should.be.a('number');
          (d.eventHistory.foo[0] >= beforeStartTime).should.be['true'];
        });
        it('should not allow reserved or oddly formed event names', function () {
          (function () {
            d.logEvent('commands');
          }).should['throw']();
          (function () {
            d.logEvent(1);
          }).should['throw']();
          (function () {
            d.logEvent({});
          }).should['throw']();
        });
      });
      it('should allow logging the same event multiple times', function () {
        d.logEvent('bar');
        d.logEvent('bar');
        d.eventHistory.bar.should.have.length(2);
        d.eventHistory.bar[1].should.be.a('number');
        (d.eventHistory.bar[1] >= d.eventHistory.bar[0]).should.be['true'];
      });
      describe('getSession decoration', function () {
        it('should decorate getSession response if opt-in cap is provided', function callee$4$0() {
          var res;
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(d.getSession());

              case 2:
                res = context$5$0.sent;

                should.not.exist(res.events);

                d.caps.eventTimings = true;
                context$5$0.next = 7;
                return _regeneratorRuntime.awrap(d.getSession());

              case 7:
                res = context$5$0.sent;

                should.exist(res.events);
                should.exist(res.events.newSessionRequested);
                res.events.newSessionRequested[0].should.be.a('number');

              case 11:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
    });
  });

  describe('DeviceSettings', function () {
    it('should not hold on to reference of defaults in constructor', function () {
      var obj = { foo: 'bar' };
      var d1 = new _2.DeviceSettings(obj);
      var d2 = new _2.DeviceSettings(obj);
      d1._settings.foo = 'baz';
      d1._settings.should.not.eql(d2._settings);
    });
  });
}

exports['default'] = baseDriverUnitTests;
module.exports = exports['default'];

// Test JSONWP

// Test W3C (leave first 2 args null because those are the JSONWP args)
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9kcml2ZXItdGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztvQkFDTCxNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt3QkFDL0IsVUFBVTs7OztpQkFDTyxPQUFPOzttQ0FDZiw2QkFBNkI7Ozs7QUFFcEQsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7OztBQUl6QixTQUFTLG1CQUFtQixDQUFFLFdBQVcsRUFBb0I7OztNQUFsQixXQUFXLHlEQUFHLEVBQUU7O0FBQ3pELE1BQU0sT0FBTyxHQUFHO0FBQ2QsZUFBVyxFQUFFLGVBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRTtBQUMxQyxrQkFBWSxFQUFFLE1BQU07QUFDcEIsZ0JBQVUsRUFBRSxjQUFjO0tBQzNCLENBQUM7QUFDRixjQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUM7R0FDakIsQ0FBQzs7QUFFRixVQUFRLENBQUMsWUFBWSxFQUFFLFlBQU07O0FBRTNCLFFBQUksQ0FBQyxZQUFBLENBQUM7QUFDTixjQUFVLENBQUMsWUFBTTtBQUNmLE9BQUMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0tBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsc0NBQXNDLEVBQUU7VUFDckMsTUFBTTs7Ozs7NkNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRTs7O0FBQTVCLGtCQUFNOztBQUNWLGtCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7OztLQUN2QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLDhDQUE4QyxFQUFFO3VCQUM1QyxNQUFNOzs7Ozs7NkNBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7O0FBQTVDLGtCQUFNOztBQUNYLGtCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FB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RSxHQUFHLHNCQUFtQixHQUFHLENBQUMsQ0FBQztBQUNqQyxRQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDekIsUUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDM0MsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0o7O3FCQUVjLG1CQUFtQiIsImZpbGUiOiJ0ZXN0L2Jhc2Vkcml2ZXIvZHJpdmVyLXRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgQmFzZURyaXZlciBmcm9tIFwiLi4vLi4vbGliL2Jhc2Vkcml2ZXIvZHJpdmVyXCI7XG5cbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbi8vIHdyYXAgdGhlc2UgdGVzdHMgaW4gYSBmdW5jdGlvbiBzbyB3ZSBjYW4gZXhwb3J0IHRoZSB0ZXN0cyBhbmQgcmUtdXNlIHRoZW1cbi8vIGZvciBhY3R1YWwgZHJpdmVyIGltcGxlbWVudGF0aW9uc1xuZnVuY3Rpb24gYmFzZURyaXZlclVuaXRUZXN0cyAoRHJpdmVyQ2xhc3MsIGRlZmF1bHRDYXBzID0ge30pIHtcbiAgY29uc3QgdzNjQ2FwcyA9IHtcbiAgICBhbHdheXNNYXRjaDogT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMsIHtcbiAgICAgIHBsYXRmb3JtTmFtZTogJ0Zha2UnLFxuICAgICAgZGV2aWNlTmFtZTogJ0NvbW1vZG9yZSA2NCcsXG4gICAgfSksXG4gICAgZmlyc3RNYXRjaDogW3t9XSxcbiAgfTtcblxuICBkZXNjcmliZSgnQmFzZURyaXZlcicsICgpID0+IHtcblxuICAgIGxldCBkO1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgZCA9IG5ldyBEcml2ZXJDbGFzcygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RhdHVzIG9iamVjdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzdGF0dXMgPSBhd2FpdCBkLmdldFN0YXR1cygpO1xuICAgICAgc3RhdHVzLnNob3VsZC5lcWwoe30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBzZXNzaW9uSWQgZnJvbSBjcmVhdGVTZXNzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IFtzZXNzSWRdID0gYXdhaXQgZC5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICAgIHNob3VsZC5leGlzdChzZXNzSWQpO1xuICAgICAgc2Vzc0lkLnNob3VsZC5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIHNlc3NJZC5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYmUgYWJsZSB0byBzdGFydCB0d28gc2Vzc2lvbnMgd2l0aG91dCBjbG9zaW5nIHRoZSBmaXJzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnc2Vzc2lvbicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGRlbGV0ZSBhIHNlc3Npb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2Vzc2lvbklkMSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBhd2FpdCBkLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIHNob3VsZC5lcXVhbChkLnNlc3Npb25JZCwgbnVsbCk7XG4gICAgICBsZXQgc2Vzc2lvbklkMiA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBzZXNzaW9uSWQxLnNob3VsZC5ub3QuZXFsKHNlc3Npb25JZDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGN1cnJlbnQgc2Vzc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBbLCBjYXBzXSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBjYXBzLnNob3VsZC5lcXVhbChhd2FpdCBkLmdldFNlc3Npb24oKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBzZXNzaW9ucyBpZiBubyBzZXNzaW9uIGV4aXN0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXNzaW9ucyA9IGF3YWl0IGQuZ2V0U2Vzc2lvbnMoKTtcbiAgICAgIHNlc3Npb25zLmxlbmd0aC5zaG91bGQuZXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBzZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0gXy5jbG9uZShkZWZhdWx0Q2Fwcyk7XG4gICAgICBjYXBzLmEgPSAnY2FwJztcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICAgIGxldCBzZXNzaW9ucyA9IGF3YWl0IGQuZ2V0U2Vzc2lvbnMoKTtcblxuICAgICAgc2Vzc2lvbnMubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICAgIHNlc3Npb25zWzBdLnNob3VsZC5lcWwoe1xuICAgICAgICBpZDogZC5zZXNzaW9uSWQsXG4gICAgICAgIGNhcGFiaWxpdGllczogY2Fwc1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZ1bGZpbGwgYW4gdW5leHBlY3RlZCBkcml2ZXIgcXVpdCBwcm9taXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gbWFrZSBhIGNvbW1hbmQgdGhhdCB3aWxsIHdhaXQgYSBiaXQgc28gd2UgY2FuIGNyYXNoIHdoaWxlIGl0J3MgcnVubmluZ1xuICAgICAgZC5nZXRTdGF0dXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoMTAwKTtcbiAgICAgIH0uYmluZChkKTtcbiAgICAgIGxldCBjbWRQcm9taXNlID0gZC5leGVjdXRlQ29tbWFuZCgnZ2V0U3RhdHVzJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDApO1xuICAgICAgZC5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihuZXcgRXJyb3IoJ1dlIGNyYXNoZWQnKSk7XG4gICAgICBhd2FpdCBjbWRQcm9taXNlLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL1dlIGNyYXNoZWQvKTtcbiAgICAgIGF3YWl0IGQub25VbmV4cGVjdGVkU2h1dGRvd24uc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvV2UgY3Jhc2hlZC8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgY29tbWFuZHMgaW4gbWlkZGxlIG9mIHVuZXhwZWN0ZWQgc2h1dGRvd24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBtYWtlIGEgY29tbWFuZCB0aGF0IHdpbGwgd2FpdCBhIGJpdCBzbyB3ZSBjYW4gY3Jhc2ggd2hpbGUgaXQncyBydW5uaW5nXG4gICAgICBkLm9sZERlbGV0ZVNlc3Npb24gPSBkLmRlbGV0ZVNlc3Npb247XG4gICAgICBkLmRlbGV0ZVNlc3Npb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoMTAwKTtcbiAgICAgICAgYXdhaXQgdGhpcy5vbGREZWxldGVTZXNzaW9uKCk7XG4gICAgICB9LmJpbmQoZCk7XG4gICAgICBsZXQgY2FwcyA9IF8uY2xvbmUoZGVmYXVsdENhcHMpO1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgICAgZC5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihuZXcgRXJyb3IoJ1dlIGNyYXNoZWQnKSk7XG4gICAgICBhd2FpdCBkLm9uVW5leHBlY3RlZFNodXRkb3duLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL1dlIGNyYXNoZWQvKTtcbiAgICAgIGF3YWl0IGQuZXhlY3V0ZUNvbW1hbmQoJ2dldFNlc3Npb24nKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9zaHV0IGRvd24vKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgbmV3IGNvbW1hbmRzIGFmdGVyIGRvbmUgc2h1dHRpbmcgZG93bicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIG1ha2UgYSBjb21tYW5kIHRoYXQgd2lsbCB3YWl0IGEgYml0IHNvIHdlIGNhbiBjcmFzaCB3aGlsZSBpdCdzIHJ1bm5pbmdcbiAgICAgIGQub2xkRGVsZXRlU2Vzc2lvbiA9IGQuZGVsZXRlU2Vzc2lvbjtcbiAgICAgIGQuZGVsZXRlU2Vzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgQi5kZWxheSgxMDApO1xuICAgICAgICBhd2FpdCB0aGlzLm9sZERlbGV0ZVNlc3Npb24oKTtcbiAgICAgIH0uYmluZChkKTtcbiAgICAgIGxldCBjYXBzID0gXy5jbG9uZShkZWZhdWx0Q2Fwcyk7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgICBkLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKG5ldyBFcnJvcignV2UgY3Jhc2hlZCcpKTtcbiAgICAgIGF3YWl0IGQub25VbmV4cGVjdGVkU2h1dGRvd24uc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvV2UgY3Jhc2hlZC8pO1xuICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnZ2V0U2Vzc2lvbicpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL3NodXQgZG93bi8pO1xuICAgICAgYXdhaXQgQi5kZWxheSgxMDApO1xuICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnY3JlYXRlU2Vzc2lvbicsIGNhcHMpO1xuICAgICAgYXdhaXQgZC5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRpc3Rpbmd1aXNoIGJldHdlZW4gVzNDIGFuZCBKU09OV1Agc2Vzc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIFRlc3QgSlNPTldQXG4gICAgICBhd2FpdCBkLmV4ZWN1dGVDb21tYW5kKCdjcmVhdGVTZXNzaW9uJywgT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMsIHtcbiAgICAgICAgcGxhdGZvcm1OYW1lOiAnRmFrZScsXG4gICAgICAgIGRldmljZU5hbWU6ICdDb21tb2RvcmUgNjQnLFxuICAgICAgfSkpO1xuXG4gICAgICBkLnByb3RvY29sLnNob3VsZC5lcXVhbCgnTUpTT05XUCcpO1xuICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnZGVsZXRlU2Vzc2lvbicpO1xuXG4gICAgICAvLyBUZXN0IFczQyAobGVhdmUgZmlyc3QgMiBhcmdzIG51bGwgYmVjYXVzZSB0aG9zZSBhcmUgdGhlIEpTT05XUCBhcmdzKVxuICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnY3JlYXRlU2Vzc2lvbicsIG51bGwsIG51bGwsIHtcbiAgICAgICAgYWx3YXlzTWF0Y2g6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzLCB7XG4gICAgICAgICAgcGxhdGZvcm1OYW1lOiAnRmFrZScsXG4gICAgICAgICAgZGV2aWNlTmFtZTogJ0NvbW1vZG9yZSA2NCcsXG4gICAgICAgIH0pLFxuICAgICAgICBmaXJzdE1hdGNoOiBbe31dLFxuICAgICAgfSk7XG5cbiAgICAgIGQucHJvdG9jb2wuc2hvdWxkLmVxdWFsKCdXM0MnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBhIG1ldGhvZCB0byBnZXQgZHJpdmVyIGZvciBhIHNlc3Npb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgW3Nlc3NJZF0gPSBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICAgICAgZC5kcml2ZXJGb3JTZXNzaW9uKHNlc3NJZCkuc2hvdWxkLmVxbChkKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21tYW5kIHF1ZXVlJywgKCkgPT4ge1xuICAgICAgbGV0IGQgPSBuZXcgRHJpdmVyQ2xhc3MoKTtcblxuICAgICAgbGV0IHdhaXRNcyA9IDEwO1xuICAgICAgZC5nZXRTdGF0dXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkod2FpdE1zKTtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgICB9LmJpbmQoZCk7XG5cbiAgICAgIGQuZ2V0U2Vzc2lvbnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkod2FpdE1zKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtdWx0aXBhc3MnKTtcbiAgICAgIH0uYmluZChkKTtcblxuICAgICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgZC5jbGVhck5ld0NvbW1hbmRUaW1lb3V0KCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBxdWV1ZSBjb21tYW5kcyBhbmQuZXhlY3V0ZUNvbW1hbmQvcmVzcG9uZCBpbiB0aGUgb3JkZXIgcmVjZWl2ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBudW1DbWRzID0gMTA7XG4gICAgICAgIGxldCBjbWRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ21kczsgaSsrKSB7XG4gICAgICAgICAgY21kcy5wdXNoKGQuZXhlY3V0ZUNvbW1hbmQoJ2dldFN0YXR1cycpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IEIuYWxsKGNtZHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51bUNtZHM7IGkrKykge1xuICAgICAgICAgIGlmIChyZXN1bHRzW2ldIDw9IHJlc3VsdHNbaSAtIDFdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCByZXN1bHQgb3V0IG9mIG9yZGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgZXJyb3JzIGNvcnJlY3RseSB3aGVuIHF1ZXVpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBudW1DbWRzID0gMTA7XG4gICAgICAgIGxldCBjbWRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ21kczsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgPT09IDUpIHtcbiAgICAgICAgICAgIGNtZHMucHVzaChkLmV4ZWN1dGVDb21tYW5kKCdnZXRTZXNzaW9ucycpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY21kcy5wdXNoKGQuZXhlY3V0ZUNvbW1hbmQoJ2dldFN0YXR1cycpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCBCLnNldHRsZShjbWRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICBpZiAocmVzdWx0c1tpXS52YWx1ZSgpIDw9IHJlc3VsdHNbaSAtIDFdLnZhbHVlKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR290IHJlc3VsdCBvdXQgb2Ygb3JkZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0c1s1XS5yZWFzb24oKS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdtdWx0aXBhc3MnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDc7IGkgPCBudW1DbWRzOyBpKyspIHtcbiAgICAgICAgICBpZiAocmVzdWx0c1tpXS52YWx1ZSgpIDw9IHJlc3VsdHNbaSAtIDFdLnZhbHVlKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR290IHJlc3VsdCBvdXQgb2Ygb3JkZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCBjYXJlIGlmIHF1ZXVlIGVtcHRpZXMgZm9yIGEgYml0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgbnVtQ21kcyA9IDEwO1xuICAgICAgICBsZXQgY21kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNtZHM7IGkrKykge1xuICAgICAgICAgIGNtZHMucHVzaChkLmV4ZWN1dGVDb21tYW5kKCdnZXRTdGF0dXMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCBCLmFsbChjbWRzKTtcbiAgICAgICAgY21kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNtZHM7IGkrKykge1xuICAgICAgICAgIGNtZHMucHVzaChkLmV4ZWN1dGVDb21tYW5kKCdnZXRTdGF0dXMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0cyA9IGF3YWl0IEIuYWxsKGNtZHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51bUNtZHM7IGkrKykge1xuICAgICAgICAgIGlmIChyZXN1bHRzW2ldIDw9IHJlc3VsdHNbaSAtIDFdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCByZXN1bHQgb3V0IG9mIG9yZGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aW1lb3V0cycsICgpID0+IHtcbiAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdjb21tYW5kJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGV4aXN0IGJ5IGRlZmF1bHQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgZC5uZXdDb21tYW5kVGltZW91dE1zLnNob3VsZC5lcXVhbCg2MDAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGJlIHNldHRhYmxlIHRocm91Z2ggYHRpbWVvdXRzYCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBkLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuTUpTT05XUCwgdHlwZTogJ2NvbW1hbmQnLCBtczogMjB9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgICBkLm5ld0NvbW1hbmRUaW1lb3V0TXMuc2hvdWxkLmVxdWFsKDIwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdpbXBsaWNpdCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZXhpc3QgYnkgZGVmYXVsdCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBkLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgc2V0dGFibGUgdGhyb3VnaCBgdGltZW91dHNgJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IGQudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQLCB0eXBlOiAnaW1wbGljaXQnLCBtczogMjB9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgICBkLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcXVhbCgyMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGltZW91dHMgKFczQyknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKG51bGwsIG51bGwsIHczY0NhcHMpO1xuICAgICAgfSk7XG4gICAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBnZXQgdGltZW91dHMgdGhhdCB3ZSBzZXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGQudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MsIHNjcmlwdDogdW5kZWZpbmVkLCBwYWdlTG9hZDogdW5kZWZpbmVkLCBpbXBsaWNpdDogMTAwMH0sIFwiMWRjZmUwMjEtOGZjOC00OWJkLThkYWMtZTk4NmQzMDkxYjk3XCIpO1xuICAgICAgICBhd2FpdCBkLmdldFRpbWVvdXRzKCkuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5wcm9wZXJ0eSgnaW1wbGljaXQnLCAxMDAwKTtcbiAgICAgICAgYXdhaXQgZC50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLk1KU09OV1AsIHR5cGU6ICdjb21tYW5kJywgbXM6IDIwMDB9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgYXdhaXQgZC5nZXRUaW1lb3V0cygpLnNob3VsZC5ldmVudHVhbGx5LmRlZXAuZXF1YWwoe1xuICAgICAgICAgIGltcGxpY2l0OiAxMDAwLFxuICAgICAgICAgIGNvbW1hbmQ6IDIwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBkLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IHVuZGVmaW5lZCwgaW1wbGljaXQ6IDMwMDB9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgYXdhaXQgZC5nZXRUaW1lb3V0cygpLnNob3VsZC5ldmVudHVhbGx5LmRlZXAuZXF1YWwoe1xuICAgICAgICAgIGltcGxpY2l0OiAzMDAwLFxuICAgICAgICAgIGNvbW1hbmQ6IDIwMDAsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzZXQgY29tcGF0aWJpbGl0eScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgbm90IGFsbG93IGJvdGggZnVsbFJlc2V0IGFuZCBub1Jlc2V0IHRvIGJlIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBuZXdDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMsIHtcbiAgICAgICAgICBmdWxsUmVzZXQ6IHRydWUsXG4gICAgICAgICAgbm9SZXNldDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKG5ld0NhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcbiAgICAgICAgICAgIC9ub1Jlc2V0LitmdWxsUmVzZXQvKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Byb3h5aW5nJywgKCkgPT4ge1xuICAgICAgbGV0IHNlc3NJZDtcbiAgICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgICBbc2Vzc0lkXSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCcjcHJveHlBY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgZC5wcm94eUFjdGl2ZS5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICBkLnByb3h5QWN0aXZlKHNlc3NJZCkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciB3aGVuIHNlc3Npb25JZCBpcyB3cm9uZycsICgpID0+IHtcbiAgICAgICAgICAoKCkgPT4geyBkLnByb3h5QWN0aXZlKCdhYWEnKTsgfSkuc2hvdWxkLnRocm93O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnI2dldFByb3h5QXZvaWRMaXN0JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgIGQuZ2V0UHJveHlBdm9pZExpc3Quc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoRnVuY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgZC5nZXRQcm94eUF2b2lkTGlzdChzZXNzSWQpLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBzZXNzaW9uSWQgaXMgd3JvbmcnLCAoKSA9PiB7XG4gICAgICAgICAgKCgpID0+IHsgZC5nZXRQcm94eUF2b2lkTGlzdCgnYWFhJyk7IH0pLnNob3VsZC50aHJvdztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJyNjYW5Qcm94eScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGEgI2NhblByb3h5IG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgICBkLmNhblByb3h5LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZyb20gI2NhblByb3h5JywgKCkgPT4ge1xuICAgICAgICAgIGQuY2FuUHJveHkoc2Vzc0lkKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gc2Vzc2lvbklkIGlzIHdyb25nJywgKCkgPT4ge1xuICAgICAgICAgICgoKSA9PiB7IGQuY2FuUHJveHkoKTsgfSkuc2hvdWxkLnRocm93O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2V2ZW50IHRpbWluZyBmcmFtZXdvcmsnLCAoKSA9PiB7XG4gICAgICBsZXQgYmVmb3JlU3RhcnRUaW1lO1xuICAgICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICAgIGJlZm9yZVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGQuc2hvdWxkVmFsaWRhdGVDYXBzID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IGQuZXhlY3V0ZUNvbW1hbmQoJ2NyZWF0ZVNlc3Npb24nLCBkZWZhdWx0Q2Fwcyk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCcjZXZlbnRIaXN0b3J5JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgYW4gZXZlbnRIaXN0b3J5IHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICAgIHNob3VsZC5leGlzdChkLmV2ZW50SGlzdG9yeSk7XG4gICAgICAgICAgc2hvdWxkLmV4aXN0KGQuZXZlbnRIaXN0b3J5LmNvbW1hbmRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGEgc2Vzc2lvbiBzdGFydCB0aW1pbmcgYWZ0ZXIgc2Vzc2lvbiBzdGFydCcsICgpID0+IHtcbiAgICAgICAgICBsZXQge25ld1Nlc3Npb25SZXF1ZXN0ZWQsIG5ld1Nlc3Npb25TdGFydGVkfSA9IGQuZXZlbnRIaXN0b3J5O1xuICAgICAgICAgIG5ld1Nlc3Npb25SZXF1ZXN0ZWQuc2hvdWxkLmhhdmUubGVuZ3RoKDEpO1xuICAgICAgICAgIG5ld1Nlc3Npb25TdGFydGVkLnNob3VsZC5oYXZlLmxlbmd0aCgxKTtcbiAgICAgICAgICBuZXdTZXNzaW9uUmVxdWVzdGVkWzBdLnNob3VsZC5iZS5hKCdudW1iZXInKTtcbiAgICAgICAgICBuZXdTZXNzaW9uU3RhcnRlZFswXS5zaG91bGQuYmUuYSgnbnVtYmVyJyk7XG4gICAgICAgICAgKG5ld1Nlc3Npb25SZXF1ZXN0ZWRbMF0gPj0gYmVmb3JlU3RhcnRUaW1lKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgICAgICAobmV3U2Vzc2lvblN0YXJ0ZWRbMF0gPj0gbmV3U2Vzc2lvblJlcXVlc3RlZFswXSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5jbHVkZSBhIGNvbW1hbmRzIGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnZ2V0U3RhdHVzJywgW10pO1xuICAgICAgICAgIGQuZXZlbnRIaXN0b3J5LmNvbW1hbmRzLmxlbmd0aC5zaG91bGQuZXF1YWwoMik7XG4gICAgICAgICAgZC5ldmVudEhpc3RvcnkuY29tbWFuZHNbMV0uY21kLnNob3VsZC5lcXVhbCgnZ2V0U3RhdHVzJyk7XG4gICAgICAgICAgZC5ldmVudEhpc3RvcnkuY29tbWFuZHNbMV0uc3RhcnRUaW1lLnNob3VsZC5iZS5hKCdudW1iZXInKTtcbiAgICAgICAgICBkLmV2ZW50SGlzdG9yeS5jb21tYW5kc1sxXS5lbmRUaW1lLnNob3VsZC5iZS5hKCdudW1iZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCcjbG9nRXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgbG9nZ2luZyBhcmJpdHJhcnkgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICAgIGQubG9nRXZlbnQoJ2ZvbycpO1xuICAgICAgICAgIGQuZXZlbnRIaXN0b3J5LmZvb1swXS5zaG91bGQuYmUuYSgnbnVtYmVyJyk7XG4gICAgICAgICAgKGQuZXZlbnRIaXN0b3J5LmZvb1swXSA+PSBiZWZvcmVTdGFydFRpbWUpLnNob3VsZC5iZS50cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgcmVzZXJ2ZWQgb3Igb2RkbHkgZm9ybWVkIGV2ZW50IG5hbWVzJywgKCkgPT4ge1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBkLmxvZ0V2ZW50KCdjb21tYW5kcycpO1xuICAgICAgICAgIH0pLnNob3VsZC50aHJvdygpO1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBkLmxvZ0V2ZW50KDEpO1xuICAgICAgICAgIH0pLnNob3VsZC50aHJvdygpO1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBkLmxvZ0V2ZW50KHt9KTtcbiAgICAgICAgICB9KS5zaG91bGQudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYWxsb3cgbG9nZ2luZyB0aGUgc2FtZSBldmVudCBtdWx0aXBsZSB0aW1lcycsICgpID0+IHtcbiAgICAgICAgZC5sb2dFdmVudCgnYmFyJyk7XG4gICAgICAgIGQubG9nRXZlbnQoJ2JhcicpO1xuICAgICAgICBkLmV2ZW50SGlzdG9yeS5iYXIuc2hvdWxkLmhhdmUubGVuZ3RoKDIpO1xuICAgICAgICBkLmV2ZW50SGlzdG9yeS5iYXJbMV0uc2hvdWxkLmJlLmEoJ251bWJlcicpO1xuICAgICAgICAoZC5ldmVudEhpc3RvcnkuYmFyWzFdID49IGQuZXZlbnRIaXN0b3J5LmJhclswXSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdnZXRTZXNzaW9uIGRlY29yYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgZGVjb3JhdGUgZ2V0U2Vzc2lvbiByZXNwb25zZSBpZiBvcHQtaW4gY2FwIGlzIHByb3ZpZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCBkLmdldFNlc3Npb24oKTtcbiAgICAgICAgICBzaG91bGQubm90LmV4aXN0KHJlcy5ldmVudHMpO1xuXG4gICAgICAgICAgZC5jYXBzLmV2ZW50VGltaW5ncyA9IHRydWU7XG4gICAgICAgICAgcmVzID0gYXdhaXQgZC5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgc2hvdWxkLmV4aXN0KHJlcy5ldmVudHMpO1xuICAgICAgICAgIHNob3VsZC5leGlzdChyZXMuZXZlbnRzLm5ld1Nlc3Npb25SZXF1ZXN0ZWQpO1xuICAgICAgICAgIHJlcy5ldmVudHMubmV3U2Vzc2lvblJlcXVlc3RlZFswXS5zaG91bGQuYmUuYSgnbnVtYmVyJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdEZXZpY2VTZXR0aW5ncycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIG5vdCBob2xkIG9uIHRvIHJlZmVyZW5jZSBvZiBkZWZhdWx0cyBpbiBjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgIGxldCBvYmogPSB7Zm9vOiAnYmFyJ307XG4gICAgICBsZXQgZDEgPSBuZXcgRGV2aWNlU2V0dGluZ3Mob2JqKTtcbiAgICAgIGxldCBkMiA9IG5ldyBEZXZpY2VTZXR0aW5ncyhvYmopO1xuICAgICAgZDEuX3NldHRpbmdzLmZvbyA9ICdiYXonO1xuICAgICAgZDEuX3NldHRpbmdzLnNob3VsZC5ub3QuZXFsKGQyLl9zZXR0aW5ncyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlRHJpdmVyVW5pdFRlc3RzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9

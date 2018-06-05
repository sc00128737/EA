require('source-map-support').install();

'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _2 = require('../..');

var _fakeDriver = require('./fake-driver');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _helpers = require('./helpers');

var _libProtocolProtocol = require('../../lib/protocol/protocol');

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Protocol', function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:

        //TODO: more tests!:
        // Unknown commands should return 404

        describe('direct to driver', function () {
          var d = new _fakeDriver.FakeDriver();
          it('should return response values directly from the driver', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(d.setUrl("http://google.com"));

                case 2:
                  context$3$0.sent.should.contain("google");

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });
        });

        describe('via express router', function () {
          var mjsonwpServer = undefined;
          var driver = undefined;

          before(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver = new _fakeDriver.FakeDriver();
                  driver.sessionId = 'foo';
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(driver), 8181));

                case 4:
                  mjsonwpServer = context$3$0.sent;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          after(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  mjsonwpServer.close();

                case 1:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should proxy to driver and return valid jsonwp response', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: { url: 'http://google.com' }
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should assume requests without a Content-Type are json requests', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    body: JSON.stringify({ url: 'http://google.com' })
                  }));

                case 2:
                  res = context$3$0.sent;

                  JSON.parse(res).should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should respond to x-www-form-urlencoded as well as json requests', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    form: { url: 'http://google.com' }
                  }));

                case 2:
                  res = context$3$0.sent;

                  JSON.parse(res).should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should include url request parameters for methods to use - sessionid', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/back',
                    method: 'POST',
                    json: {},
                    simple: false,
                    resolveWithFullResponse: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.body.should.eql({
                    status: 0,
                    value: "foo",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should include url request parameters for methods to use - elementid', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/click',
                    method: 'POST',
                    json: {}
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.status.should.equal(0);
                  res.value.should.eql(["bar", "foo"]);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should include url req params in the order: custom, element, session', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/attribute/baz',
                    method: 'GET',
                    json: {}
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.status.should.equal(0);
                  res.value.should.eql(["baz", "bar", "foo"]);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should respond with 400 Bad Request if parameters missing', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: {},
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(400);
                  res.body.should.contain("url");

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should reject requests with a badly formatted body and not crash', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: "oh hello"
                  }).should.eventually.be.rejected);

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: { url: 'http://google.com' }
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should get 404 for bad routes', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/blargimarg',
                    method: 'GET'
                  }).should.eventually.be.rejectedWith("404"));

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          // TODO pass this test
          // https://github.com/appium/node-mobile-json-wire-protocol/issues/3
          it('4xx responses should have content-type of text/plain', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/blargimargarita',
                    method: 'GET',
                    resolveWithFullResponse: true,
                    simple: false // 404 errors fulfill the promise, rather than rejecting
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.headers['content-type'].should.include('text/plain');

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should throw not yet implemented for unfilledout commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/location',
                    method: 'GET',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(501);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'Method has not yet been implemented'
                    },
                    sessionId: 'foo'
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should throw not implemented for ignored commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/buttonup',
                    method: 'POST',
                    json: {},
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(501);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'Method is not implemented'
                    },
                    sessionId: 'foo'
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should get 400 for bad parameters', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: {}
                  }).should.eventually.be.rejectedWith("400"));

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should ignore special extra payload params in the right contexts', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                    method: 'POST',
                    json: { id: 'baz', sessionId: 'lol', value: ['a'] }
                  }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                    method: 'POST',
                    json: { id: 'baz' }
                  }).should.eventually.be.rejectedWith("400"));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/frame',
                    method: 'POST',
                    json: { id: 'baz' }
                  }));

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should return the correct error even if driver does not throw', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/appium/receive_async_response',
                    method: 'POST',
                    json: { response: 'baz' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Mishandled Driver Error'
                    },
                    sessionId: "foo"
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          describe('w3c sendkeys migration', function () {
            it('should accept value for sendkeys', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                      method: 'POST',
                      json: { value: "text to type" }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.status.should.equal(0);
                    res.value.should.eql(["text to type", "bar"]);

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should accept text for sendkeys', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                      method: 'POST',
                      json: { text: "text to type" }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.status.should.equal(0);
                    res.value.should.eql(["text to type", "bar"]);

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should accept value and text for sendkeys, and use value', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                      method: 'POST',
                      json: { value: "text to type", text: "text to ignore" }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.status.should.equal(0);
                    res.value.should.eql(["text to type", "bar"]);

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
          });

          describe('multiple sets of arguments', function () {
            describe('optional', function () {
              it('should allow moveto with element', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/moveto',
                        method: 'POST',
                        json: { element: '3' }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql(['3', null, null]);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              });
              it('should allow moveto with xoffset/yoffset', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/moveto',
                        method: 'POST',
                        json: { xoffset: 42, yoffset: 17 }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql([null, 42, 17]);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              });
            });
            describe('required', function () {
              it('should allow removeApp with appId', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/appium/device/remove_app',
                        method: 'POST',
                        json: { appId: 42 }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql(42);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              });
              it('should allow removeApp with bundleId', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/appium/device/remove_app',
                        method: 'POST',
                        json: { bundleId: 42 }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql(42);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              });
            });
          });

          describe('default param wrap', function () {

            it('should wrap', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/touch/perform',
                      method: 'POST',
                      json: [{ "action": "tap", "options": { "element": "3" } }]
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.value.should.deep.equal([[{ "action": "tap", "options": { "element": "3" } }], 'foo']);

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });

            it('should not wrap twice', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/touch/perform',
                      method: 'POST',
                      json: { actions: [{ "action": "tap", "options": { "element": "3" } }] }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.value.should.deep.equal([[{ "action": "tap", "options": { "element": "3" } }], 'foo']);

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
          });

          describe('create sessions via HTTP endpoint', function () {
            var desiredCapabilities = { a: 'b' };
            var requiredCapabilities = { c: 'd' };
            var capabilities = { e: 'f' };
            var baseUrl = 'http://localhost:8181/wd/hub/session';

            it('should allow create session with desired caps (MJSONWP)', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: baseUrl,
                      method: 'POST',
                      json: { desiredCapabilities: desiredCapabilities }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.status.should.equal(0);
                    res.value.should.eql(desiredCapabilities);

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should allow create session with desired and required caps', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: baseUrl,
                      method: 'POST',
                      json: {
                        desiredCapabilities: desiredCapabilities,
                        requiredCapabilities: requiredCapabilities
                      }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.status.should.equal(0);
                    res.value.should.eql(_lodash2['default'].extend({}, desiredCapabilities, requiredCapabilities));

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should fail to create session without capabilities or desiredCapabilities', function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: baseUrl,
                      method: 'POST',
                      json: {}
                    }).should.eventually.be.rejectedWith('400'));

                  case 2:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should allow create session with capabilities (W3C)', function callee$3$0() {
              var _ref3, status, value, sessionId;

              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: baseUrl,
                      method: 'POST',
                      json: {
                        capabilities: capabilities
                      }
                    }));

                  case 2:
                    _ref3 = context$4$0.sent;
                    status = _ref3.status;
                    value = _ref3.value;
                    sessionId = _ref3.sessionId;

                    should.not.exist(status);
                    should.not.exist(sessionId);
                    value.capabilities.should.eql(capabilities);
                    value.sessionId.should.exist;

                  case 10:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });

            describe('w3c endpoints', function callee$3$0() {
              var w3cCaps, sessionUrl, sessionId;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    w3cCaps = {
                      alwaysMatch: {
                        platformName: 'Fake',
                        deviceName: 'Commodore 64'
                      },
                      firstMatch: [{}]
                    };
                    sessionUrl = undefined;
                    sessionId = undefined;

                    beforeEach(function callee$4$0() {
                      var _ref4,
                      // Start a session
                      value;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            context$5$0.next = 2;
                            return _regeneratorRuntime.awrap(_requestPromise2['default'].post(baseUrl, {
                              json: {
                                capabilities: w3cCaps
                              }
                            }));

                          case 2:
                            _ref4 = context$5$0.sent;
                            value = _ref4.value;

                            sessionId = value.sessionId;
                            sessionUrl = baseUrl + '/' + sessionId;

                          case 6:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    afterEach(function callee$4$0() {
                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            context$5$0.next = 2;
                            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete'](sessionUrl));

                          case 2:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    it('should throw 400 Bad Parameters exception if the parameters are bad', function callee$4$0() {
                      var _ref5, statusCode, error, _error$value, w3cError, message, stacktrace;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            context$5$0.next = 2;
                            return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                              json: {
                                bad: 'params'
                              }
                            }).should.eventually.be.rejected);

                          case 2:
                            _ref5 = context$5$0.sent;
                            statusCode = _ref5.statusCode;
                            error = _ref5.error;

                            statusCode.should.equal(400);

                            _error$value = error.value;
                            w3cError = _error$value.error;
                            message = _error$value.message;
                            stacktrace = _error$value.stacktrace;

                            message.should.match(/Parameters were incorrect/);
                            stacktrace.should.match(/protocol.js/);
                            w3cError.should.be.a.string;
                            w3cError.should.equal(_2.errors.InvalidArgumentError.error());

                          case 14:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    it('should throw 404 Not Found exception if the command hasn\'t been implemented yet', function callee$4$0() {
                      var _ref6, statusCode, error, _error$value2, w3cError, message, stacktrace;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            context$5$0.next = 2;
                            return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                              json: {
                                actions: []
                              }
                            }).should.eventually.be.rejected);

                          case 2:
                            _ref6 = context$5$0.sent;
                            statusCode = _ref6.statusCode;
                            error = _ref6.error;

                            statusCode.should.equal(404);

                            _error$value2 = error.value;
                            w3cError = _error$value2.error;
                            message = _error$value2.message;
                            stacktrace = _error$value2.stacktrace;

                            message.should.match(/Method has not yet been implemented/);
                            stacktrace.should.match(/protocol.js/);
                            w3cError.should.be.a.string;
                            w3cError.should.equal(_2.errors.NotYetImplementedError.error());
                            message.should.match(/Method has not yet been implemented/);

                          case 15:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    it('should throw 500 Unknown Error if the command throws an unexpected exception', function callee$4$0() {
                      var _ref7, statusCode, error, _error$value3, w3cError, message, stacktrace;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            driver.performActions = function () {
                              throw new Error('Didn\'t work');
                            };
                            context$5$0.next = 3;
                            return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                              json: {
                                actions: []
                              }
                            }).should.eventually.be.rejected);

                          case 3:
                            _ref7 = context$5$0.sent;
                            statusCode = _ref7.statusCode;
                            error = _ref7.error;

                            statusCode.should.equal(500);

                            _error$value3 = error.value;
                            w3cError = _error$value3.error;
                            message = _error$value3.message;
                            stacktrace = _error$value3.stacktrace;

                            stacktrace.should.match(/protocol.js/);
                            w3cError.should.be.a.string;
                            w3cError.should.equal(_2.errors.UnknownError.error());
                            message.should.match(/Didn't work/);

                            delete driver.performActions;

                          case 16:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    it('should translate element format from MJSONWP to W3C', function callee$4$0() {
                      var _something, _something2;

                      var retValue, expectedValue, findElementsBackup, _ref8, value;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            retValue = [{
                              something: (_something = {}, _defineProperty(_something, _libProtocolProtocol.MJSONWP_ELEMENT_KEY, 'fooo'), _defineProperty(_something, 'other', 'bar'), _something)
                            }, _defineProperty({}, _libProtocolProtocol.MJSONWP_ELEMENT_KEY, 'bar'), 'ignore'];
                            expectedValue = [{
                              something: (_something2 = {}, _defineProperty(_something2, _libProtocolProtocol.W3C_ELEMENT_KEY, 'fooo'), _defineProperty(_something2, 'other', 'bar'), _something2)
                            }, _defineProperty({}, _libProtocolProtocol.W3C_ELEMENT_KEY, 'bar'), 'ignore'];
                            findElementsBackup = driver.findElements;

                            driver.findElements = function () {
                              return retValue;
                            };
                            context$5$0.next = 6;
                            return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/elements', {
                              json: {
                                using: 'whatever',
                                value: 'whatever'
                              }
                            }));

                          case 6:
                            _ref8 = context$5$0.sent;
                            value = _ref8.value;

                            value.should.deep.equal(expectedValue);
                            driver.findElements = findElementsBackup;

                          case 10:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    it('should fail with a 408 error if it throws a TimeoutError exception', function callee$4$0() {
                      var _ref9, statusCode, error, _error$value4, w3cError, message, stacktrace;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            _sinon2['default'].stub(driver, 'setUrl', function () {
                              throw new _2.errors.TimeoutError();
                            });
                            context$5$0.next = 3;
                            return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                              url: sessionUrl + '/url',
                              method: 'POST',
                              json: {
                                url: 'https://example.com/'
                              }
                            }).should.eventually.be.rejected);

                          case 3:
                            _ref9 = context$5$0.sent;
                            statusCode = _ref9.statusCode;
                            error = _ref9.error;

                            statusCode.should.equal(408);

                            _error$value4 = error.value;
                            w3cError = _error$value4.error;
                            message = _error$value4.message;
                            stacktrace = _error$value4.stacktrace;

                            stacktrace.should.match(/protocol.js/);
                            w3cError.should.be.a.string;
                            w3cError.should.equal(_2.errors.TimeoutError.error());
                            message.should.match(/An operation did not complete before its timeout expired/);

                            _sinon2['default'].restore(driver, 'setUrl');

                          case 16:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    it('should pass with 200 HTTP status code if the command returns a value', function callee$4$0() {
                      var _ref10, status, value, sessionId;

                      return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                        while (1) switch (context$5$0.prev = context$5$0.next) {
                          case 0:
                            driver.performActions = function (actions) {
                              return 'It works ' + actions.join('');
                            };
                            context$5$0.next = 3;
                            return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                              json: {
                                actions: ['a', 'b', 'c']
                              }
                            }));

                          case 3:
                            _ref10 = context$5$0.sent;
                            status = _ref10.status;
                            value = _ref10.value;
                            sessionId = _ref10.sessionId;

                            should.not.exist(sessionId);
                            should.not.exist(status);
                            value.should.equal('It works abc');
                            delete driver.performActions;

                          case 11:
                          case 'end':
                            return context$5$0.stop();
                        }
                      }, null, this);
                    });

                    describe('jwproxy', function () {
                      var port = 56562;
                      var server = undefined,
                          jwproxy = undefined,
                          app = undefined;
                      beforeEach(function () {
                        var _this = this;

                        var res = (0, _helpers.createProxyServer)(sessionId, port);
                        server = res.server;
                        app = res.app;
                        jwproxy = new _2.JWProxy({ host: 'localhost', port: port });
                        jwproxy.sessionId = sessionId;
                        driver.performActions = function callee$6$0(actions) {
                          return _regeneratorRuntime.async(function callee$6$0$(context$7$0) {
                            while (1) switch (context$7$0.prev = context$7$0.next) {
                              case 0:
                                context$7$0.next = 2;
                                return _regeneratorRuntime.awrap(jwproxy.command('/perform-actions', 'POST', actions));

                              case 2:
                                return context$7$0.abrupt('return', context$7$0.sent);

                              case 3:
                              case 'end':
                                return context$7$0.stop();
                            }
                          }, null, _this);
                        };
                      });

                      afterEach(function () {
                        server.close();
                        delete driver.performActions;
                      });

                      it('should work if a proxied request returns a response with status 200', function callee$5$0() {
                        var _ref11, status, value, sessionId;

                        return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                          while (1) switch (context$6$0.prev = context$6$0.next) {
                            case 0:
                              (0, _helpers.addHandler)(app, 'post', '/wd/hub/session/:sessionId/perform-actions', function (req, res) {
                                res.json({
                                  sessionId: req.params.sessionId,
                                  value: req.body,
                                  status: 0
                                });
                              });

                              context$6$0.next = 3;
                              return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                                json: {
                                  actions: [1, 2, 3]
                                }
                              }));

                            case 3:
                              _ref11 = context$6$0.sent;
                              status = _ref11.status;
                              value = _ref11.value;
                              sessionId = _ref11.sessionId;

                              value.should.eql([1, 2, 3]);
                              should.not.exist(status);
                              should.not.exist(sessionId);

                            case 10:
                            case 'end':
                              return context$6$0.stop();
                          }
                        }, null, this);
                      });

                      it('should work if a proxied request returns a MJSONWP error response', function callee$5$0() {
                        var _ref12, statusCode, message;

                        return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                          while (1) switch (context$6$0.prev = context$6$0.next) {
                            case 0:
                              (0, _helpers.addHandler)(app, 'post', '/wd/hub/session/:sessionId/perform-actions', function (req, res) {
                                res.status(500).json({
                                  sessionId: sessionId,
                                  status: 6,
                                  value: 'A problem occurred'
                                });
                              });
                              context$6$0.next = 3;
                              return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                                json: {
                                  actions: [1, 2, 3]
                                }
                              }).should.eventually.be.rejected);

                            case 3:
                              _ref12 = context$6$0.sent;
                              statusCode = _ref12.statusCode;
                              message = _ref12.message;

                              statusCode.should.equal(_httpStatusCodes2['default'].NOT_FOUND);
                              message.should.match(/A problem occurred/);

                            case 8:
                            case 'end':
                              return context$6$0.stop();
                          }
                        }, null, this);
                      });

                      it('should work if a proxied request returns a W3C error response', function callee$5$0() {
                        var _ref13, statusCode, message, error, _error$value5, w3cError, stacktrace;

                        return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                          while (1) switch (context$6$0.prev = context$6$0.next) {
                            case 0:
                              (0, _helpers.addHandler)(app, 'post', '/wd/hub/session/:sessionId/perform-actions', function (req, res) {
                                res.status(404).json({
                                  value: {
                                    error: 'no such element',
                                    message: 'does not make a difference',
                                    stacktrace: 'arbitrary stacktrace'
                                  }
                                });
                              });
                              context$6$0.next = 3;
                              return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                                json: {
                                  actions: [1, 2, 3]
                                }
                              }).should.eventually.be.rejected);

                            case 3:
                              _ref13 = context$6$0.sent;
                              statusCode = _ref13.statusCode;
                              message = _ref13.message;
                              error = _ref13.error;

                              statusCode.should.equal(_httpStatusCodes2['default'].NOT_FOUND);
                              message.should.match(/does not make a difference/);
                              _error$value5 = error.value;
                              w3cError = _error$value5.error;
                              stacktrace = _error$value5.stacktrace;

                              w3cError.should.equal('no such element');
                              stacktrace.should.match(/arbitrary stacktrace/);

                            case 14:
                            case 'end':
                              return context$6$0.stop();
                          }
                        }, null, this);
                      });

                      it('should work if a proxied request returns a W3C error response', function callee$5$0() {
                        var _ref14, statusCode, message, error, _error$value6, w3cError, stacktrace;

                        return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                          while (1) switch (context$6$0.prev = context$6$0.next) {
                            case 0:
                              (0, _helpers.addHandler)(app, 'post', '/wd/hub/session/:sessionId/perform-actions', function (req, res) {
                                res.status(444).json({
                                  value: {
                                    error: 'bogus error code',
                                    message: 'does not make a difference',
                                    stacktrace: 'arbitrary stacktrace'
                                  }
                                });
                              });
                              context$6$0.next = 3;
                              return _regeneratorRuntime.awrap(_requestPromise2['default'].post(sessionUrl + '/actions', {
                                json: {
                                  actions: [1, 2, 3]
                                }
                              }).should.eventually.be.rejected);

                            case 3:
                              _ref14 = context$6$0.sent;
                              statusCode = _ref14.statusCode;
                              message = _ref14.message;
                              error = _ref14.error;

                              statusCode.should.equal(_httpStatusCodes2['default'].INTERNAL_SERVER_ERROR);
                              message.should.match(/does not make a difference/);
                              _error$value6 = error.value;
                              w3cError = _error$value6.error;
                              stacktrace = _error$value6.stacktrace;

                              w3cError.should.equal('unknown error');
                              stacktrace.should.match(/arbitrary stacktrace/);

                            case 14:
                            case 'end':
                              return context$6$0.stop();
                          }
                        }, null, this);
                      });
                    });

                  case 12:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
          });

          it('should handle commands with no response values', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/forward',
                    method: 'POST',
                    json: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: null,
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should allow empty string response values', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/text',
                    method: 'GET',
                    json: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: "",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should send 500 response and an Unknown object for rejected commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/refresh',
                    method: 'POST',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Too Fresh!'
                    },
                    sessionId: "foo"
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should not throw UnknownError when known', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo',
                    method: 'GET',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(404);
                  res.body.should.eql({
                    status: 6,
                    value: {
                      message: 'A session is either terminated or not started'
                    },
                    sessionId: "foo"
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });
        });

        describe('session Ids', function () {
          var driver = new _fakeDriver.FakeDriver();
          var mjsonwpServer = undefined;

          before(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(driver), 8181));

                case 2:
                  mjsonwpServer = context$3$0.sent;

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          after(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  mjsonwpServer.close();

                case 1:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          afterEach(function () {
            driver.sessionId = null;
          });

          it('returns null SessionId for commands without sessionIds', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/status',
                    method: 'GET',
                    json: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  should.equal(res.sessionId, null);

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('responds with the same session ID in the request', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';

                  driver.sessionId = sessionId;

                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' }
                  }));

                case 4:
                  res = context$3$0.sent;

                  should.exist(res.sessionId);
                  res.sessionId.should.eql(sessionId);

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('yells if no session exists', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(404);
                  res.body.status.should.equal(6);
                  res.body.value.message.should.contain('session');

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('yells if invalid session is sent', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';

                  driver.sessionId = 'recession';

                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(404);
                  res.body.status.should.equal(6);
                  res.body.value.message.should.contain('session');

                case 8:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should have session IDs in error responses', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';

                  driver.sessionId = sessionId;

                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/refresh',
                    method: 'POST',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Too Fresh!'
                    },
                    sessionId: sessionId
                  });

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should return a new session ID on create', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session',
                    method: 'POST',
                    json: { desiredCapabilities: { greeting: 'hello' }, requiredCapabilities: { valediction: 'bye' } }
                  }));

                case 2:
                  res = context$3$0.sent;

                  should.exist(res.sessionId);
                  res.sessionId.should.equal('1234');
                  res.value.should.eql({ greeting: 'hello', valediction: 'bye' });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });
        });

        describe('via drivers jsonwp proxy', function () {
          var driver = undefined;
          var sessionId = 'foo';
          var mjsonwpServer = undefined;

          beforeEach(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver = new _fakeDriver.FakeDriver();
                  driver.sessionId = sessionId;
                  driver.proxyActive = function () {
                    return true;
                  };
                  driver.canProxy = function () {
                    return true;
                  };

                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(driver), 8181));

                case 6:
                  mjsonwpServer = context$3$0.sent;

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          afterEach(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  mjsonwpServer.close();

                case 1:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should give a nice error if proxying is set but no proxy function exists', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.canProxy = function () {
                    return false;
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Trying to proxy to a JSONWP ' + 'server but driver is unable to proxy'
                    },
                    sessionId: sessionId
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should pass on any errors in proxying', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.proxyReqRes = function callee$3$0() {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          throw new Error("foo");

                        case 1:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Could not proxy. Proxy ' + 'error: foo'
                    },
                    sessionId: sessionId
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should able to throw ProxyRequestError in proxying', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.proxyReqRes = function callee$3$0() {
                    var jsonwp;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          jsonwp = { status: 35, value: "No such context found.", sessionId: "foo" };
                          throw new _2.errors.ProxyRequestError('Could not proxy command to remote server. ', jsonwp);

                        case 2:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 35,
                    "value": { "message": "No such context found." },
                    sessionId: "foo"
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should let the proxy handle req/res', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.proxyReqRes = function callee$3$0(req, res) {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          res.status(200).json({ custom: 'data' });

                        case 1:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  res.body.should.eql({ custom: 'data' });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should avoid jsonwp proxying when path matches avoidance list', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.getProxyAvoidList = function () {
                    return [['POST', new RegExp('^/session/[^/]+/url$')]];
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  res.body.should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: sessionId
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should fail if avoid proxy list is malformed in some way', function callee$2$0() {
            var badProxyAvoidanceList, lists, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, list;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  badProxyAvoidanceList = function badProxyAvoidanceList(list) {
                    var res;
                    return _regeneratorRuntime.async(function badProxyAvoidanceList$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          driver.getProxyAvoidList = function () {
                            return list;
                          };
                          context$4$0.next = 3;
                          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                            url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                            method: 'POST',
                            json: { url: 'http://google.com' },
                            resolveWithFullResponse: true,
                            simple: false
                          }));

                        case 3:
                          res = context$4$0.sent;

                          res.statusCode.should.equal(500);
                          res.body.status.should.equal(13);
                          res.body.value.message.should.contain("roxy");

                        case 7:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };

                  lists = ['foo', [['foo']], [['BAR', /lol/]], [['GET', 'foo']]];
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 5;
                  _iterator = _getIterator(lists);

                case 7:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 14;
                    break;
                  }

                  list = _step.value;
                  context$3$0.next = 11;
                  return _regeneratorRuntime.awrap(badProxyAvoidanceList(list));

                case 11:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 7;
                  break;

                case 14:
                  context$3$0.next = 20;
                  break;

                case 16:
                  context$3$0.prev = 16;
                  context$3$0.t0 = context$3$0['catch'](5);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t0;

                case 20:
                  context$3$0.prev = 20;
                  context$3$0.prev = 21;

                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }

                case 23:
                  context$3$0.prev = 23;

                  if (!_didIteratorError) {
                    context$3$0.next = 26;
                    break;
                  }

                  throw _iteratorError;

                case 26:
                  return context$3$0.finish(23);

                case 27:
                  return context$3$0.finish(20);

                case 28:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this, [[5, 16, 20, 28], [21,, 23, 27]]);
          });

          it('should avoid proxying non-session commands even if not in the list', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.getProxyAvoidList = function () {
                    return [['POST', new RegExp('')]];
                  };

                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/status',
                    method: 'GET',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  res.body.should.eql({
                    status: 0,
                    value: "I'm fine",
                    sessionId: null
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should avoid proxying deleteSession commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.getProxyAvoidList = function () {
                    return [['POST', new RegExp('')]];
                  };

                  driver.sessionId.should.equal(sessionId);
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId,
                    method: 'DELETE',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  should.not.exist(driver.sessionId);
                  driver.jwpProxyActive.should.be['false'];

                case 8:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });
        });

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

// make sure adding the optional 'id' doesn't clobber a route where we
// have an actual required 'id'

// Delete the session
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcHJvdG9jb2wvcHJvdG9jb2wtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztpQkFFa0UsT0FBTzs7MEJBQzlDLGVBQWU7O3NCQUM1QixRQUFROzs7OzhCQUNGLGlCQUFpQjs7OztvQkFDcEIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7K0JBQ0csbUJBQW1COzs7O3VCQUNELFdBQVc7O21DQUNKLDZCQUE2Qjs7QUFFbEYsSUFBSSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDM0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFVBQVUsRUFBRTs7Ozs7Ozs7QUFLbkIsZ0JBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0FBQ3ZDLGNBQUksQ0FBQyxHQUFHLDRCQUFnQixDQUFDO0FBQ3pCLFlBQUUsQ0FBQyx3REFBd0QsRUFBRTs7Ozs7bURBQ3BELENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7OzttQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVE7Ozs7Ozs7V0FDOUQsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDOztBQUVILGdCQUFRLENBQUMsb0JBQW9CLEVBQUUsWUFBWTtBQUN6QyxjQUFJLGFBQWEsWUFBQSxDQUFDO0FBQ2xCLGNBQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsZ0JBQU0sQ0FBQzs7OztBQUNMLHdCQUFNLEdBQUcsNEJBQWdCLENBQUM7QUFDMUIsd0JBQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOzttREFDSCxlQUFPLGlDQUF5QixNQUFNLENBQUMsRUFBRSxJQUFJLENBQUM7OztBQUFwRSwrQkFBYTs7Ozs7OztXQUNkLENBQUMsQ0FBQzs7QUFFSCxlQUFLLENBQUM7Ozs7QUFDSiwrQkFBYSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Ozs7O1dBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxZQUFFLENBQUMseURBQXlE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QUMsQ0FBQzs7bURBQ3pCLGlDQUFRO0FBQ3RCLHVCQUFHLDRDQUEwQyxTQUFTLEFBQUU7QUFDeEQsMEJBQU0sRUFBRSxRQUFRO0FBQ2hCLHdCQUFJLEVBQUUsSUFBSTtBQUNWLDJDQUF1QixFQUFFLElBQUk7QUFDN0IsMEJBQU0sRUFBRSxLQUFLO21CQUNkLENBQUM7OztBQU5FLHFCQUFHOztBQVFQLHFCQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsd0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyx3QkFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7Ozs7Ozs7V0FDdkMsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7O0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcHJvdG9jb2wvcHJvdG9jb2wtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IHNlcnZlciwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uLCBlcnJvcnMsIEpXUHJveHkgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBGYWtlRHJpdmVyIH0gZnJvbSAnLi9mYWtlLWRyaXZlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBIVFRQU3RhdHVzQ29kZXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgY3JlYXRlUHJveHlTZXJ2ZXIsIGFkZEhhbmRsZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgTUpTT05XUF9FTEVNRU5UX0tFWSwgVzNDX0VMRU1FTlRfS0VZIH0gZnJvbSAnLi4vLi4vbGliL3Byb3RvY29sL3Byb3RvY29sJztcblxubGV0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdQcm90b2NvbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcblxuICAvL1RPRE86IG1vcmUgdGVzdHMhOlxuICAvLyBVbmtub3duIGNvbW1hbmRzIHNob3VsZCByZXR1cm4gNDA0XG5cbiAgZGVzY3JpYmUoJ2RpcmVjdCB0byBkcml2ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGQgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlc3BvbnNlIHZhbHVlcyBkaXJlY3RseSBmcm9tIHRoZSBkcml2ZXInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAoYXdhaXQgZC5zZXRVcmwoXCJodHRwOi8vZ29vZ2xlLmNvbVwiKSkuc2hvdWxkLmNvbnRhaW4oXCJnb29nbGVcIik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2aWEgZXhwcmVzcyByb3V0ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG1qc29ud3BTZXJ2ZXI7XG4gICAgbGV0IGRyaXZlcjtcblxuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9ICdmb28nO1xuICAgICAgbWpzb253cFNlcnZlciA9IGF3YWl0IHNlcnZlcihyb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZHJpdmVyKSwgODE4MSk7XG4gICAgfSk7XG5cbiAgICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtanNvbndwU2VydmVyLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHByb3h5IHRvIGRyaXZlciBhbmQgcmV0dXJuIHZhbGlkIGpzb253cCByZXNwb25zZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby91cmwnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ31cbiAgICAgIH0pO1xuICAgICAgcmVzLnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcIk5hdmlnYXRlZCB0bzogaHR0cDovL2dvb2dsZS5jb21cIixcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYXNzdW1lIHJlcXVlc3RzIHdpdGhvdXQgYSBDb250ZW50LVR5cGUgYXJlIGpzb24gcmVxdWVzdHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vdXJsJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9KSxcbiAgICAgIH0pO1xuICAgICAgSlNPTi5wYXJzZShyZXMpLnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcIk5hdmlnYXRlZCB0bzogaHR0cDovL2dvb2dsZS5jb21cIixcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVzcG9uZCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWQgYXMgd2VsbCBhcyBqc29uIHJlcXVlc3RzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBmb3JtOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfVxuICAgICAgfSk7XG4gICAgICBKU09OLnBhcnNlKHJlcykuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpbmNsdWRlIHVybCByZXF1ZXN0IHBhcmFtZXRlcnMgZm9yIG1ldGhvZHMgdG8gdXNlIC0gc2Vzc2lvbmlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2JhY2snLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge30sXG4gICAgICAgIHNpbXBsZTogZmFsc2UsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcImZvb1wiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpbmNsdWRlIHVybCByZXF1ZXN0IHBhcmFtZXRlcnMgZm9yIG1ldGhvZHMgdG8gdXNlIC0gZWxlbWVudGlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2VsZW1lbnQvYmFyL2NsaWNrJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt9XG4gICAgICB9KTtcbiAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoW1wiYmFyXCIsIFwiZm9vXCJdKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW5jbHVkZSB1cmwgcmVxIHBhcmFtcyBpbiB0aGUgb3JkZXI6IGN1c3RvbSwgZWxlbWVudCwgc2Vzc2lvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci9hdHRyaWJ1dGUvYmF6JyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAganNvbjoge31cbiAgICAgIH0pO1xuICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChbXCJiYXpcIiwgXCJiYXJcIiwgXCJmb29cIl0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlc3BvbmQgd2l0aCA0MDAgQmFkIFJlcXVlc3QgaWYgcGFyYW1ldGVycyBtaXNzaW5nJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7fSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNDAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5jb250YWluKFwidXJsXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWplY3QgcmVxdWVzdHMgd2l0aCBhIGJhZGx5IGZvcm1hdHRlZCBib2R5IGFuZCBub3QgY3Jhc2gnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby91cmwnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjogXCJvaCBoZWxsb1wiXG4gICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfVxuICAgICAgfSk7XG4gICAgICByZXMuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGdldCA0MDQgZm9yIGJhZCByb3V0ZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9ibGFyZ2ltYXJnJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwiNDA0XCIpO1xuICAgIH0pO1xuXG4gICAgLy8gVE9ETyBwYXNzIHRoaXMgdGVzdFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hcHBpdW0vbm9kZS1tb2JpbGUtanNvbi13aXJlLXByb3RvY29sL2lzc3Vlcy8zXG4gICAgaXQoJzR4eCByZXNwb25zZXMgc2hvdWxkIGhhdmUgY29udGVudC10eXBlIG9mIHRleHQvcGxhaW4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvYmxhcmdpbWFyZ2FyaXRhJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2UgLy8gNDA0IGVycm9ycyBmdWxmaWxsIHRoZSBwcm9taXNlLCByYXRoZXIgdGhhbiByZWplY3RpbmdcbiAgICAgIH0pO1xuXG4gICAgICByZXMuaGVhZGVyc1snY29udGVudC10eXBlJ10uc2hvdWxkLmluY2x1ZGUoJ3RleHQvcGxhaW4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgbm90IHlldCBpbXBsZW1lbnRlZCBmb3IgdW5maWxsZWRvdXQgY29tbWFuZHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvbG9jYXRpb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDEpO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ01ldGhvZCBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkJ1xuICAgICAgICB9LFxuICAgICAgICBzZXNzaW9uSWQ6ICdmb28nXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgbm90IGltcGxlbWVudGVkIGZvciBpZ25vcmVkIGNvbW1hbmRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2J1dHRvbnVwJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDEpO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ01ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogJ2ZvbydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnZXQgNDAwIGZvciBiYWQgcGFyYW1ldGVycycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7fVxuICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwiNDAwXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgc3BlY2lhbCBleHRyYSBwYXlsb2FkIHBhcmFtcyBpbiB0aGUgcmlnaHQgY29udGV4dHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci92YWx1ZScsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7aWQ6ICdiYXonLCBzZXNzaW9uSWQ6ICdsb2wnLCB2YWx1ZTogWydhJ119XG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvdmFsdWUnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge2lkOiAnYmF6J31cbiAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcIjQwMFwiKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIGFkZGluZyB0aGUgb3B0aW9uYWwgJ2lkJyBkb2Vzbid0IGNsb2JiZXIgYSByb3V0ZSB3aGVyZSB3ZVxuICAgICAgLy8gaGF2ZSBhbiBhY3R1YWwgcmVxdWlyZWQgJ2lkJ1xuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZnJhbWUnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge2lkOiAnYmF6J31cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGNvcnJlY3QgZXJyb3IgZXZlbiBpZiBkcml2ZXIgZG9lcyBub3QgdGhyb3cnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcmVzID0gIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2FwcGl1bS9yZWNlaXZlX2FzeW5jX3Jlc3BvbnNlJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHtyZXNwb25zZTogJ2Jheid9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogTWlzaGFuZGxlZCBEcml2ZXIgRXJyb3InXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndzNjIHNlbmRrZXlzIG1pZ3JhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgYWNjZXB0IHZhbHVlIGZvciBzZW5ka2V5cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvdmFsdWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt2YWx1ZTogXCJ0ZXh0IHRvIHR5cGVcIn1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChbXCJ0ZXh0IHRvIHR5cGVcIiwgXCJiYXJcIl0pO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGFjY2VwdCB0ZXh0IGZvciBzZW5ka2V5cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvdmFsdWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt0ZXh0OiBcInRleHQgdG8gdHlwZVwifVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZXFsKFtcInRleHQgdG8gdHlwZVwiLCBcImJhclwiXSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYWNjZXB0IHZhbHVlIGFuZCB0ZXh0IGZvciBzZW5ka2V5cywgYW5kIHVzZSB2YWx1ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvdmFsdWUnLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt2YWx1ZTogXCJ0ZXh0IHRvIHR5cGVcIiwgdGV4dDogXCJ0ZXh0IHRvIGlnbm9yZVwifVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZXFsKFtcInRleHQgdG8gdHlwZVwiLCBcImJhclwiXSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtdWx0aXBsZSBzZXRzIG9mIGFyZ3VtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlc2NyaWJlKCdvcHRpb25hbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBtb3ZldG8gd2l0aCBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vbW92ZXRvJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAganNvbjoge2VsZW1lbnQ6ICczJ31cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChbJzMnLCBudWxsLCBudWxsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IG1vdmV0byB3aXRoIHhvZmZzZXQveW9mZnNldCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL21vdmV0bycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGpzb246IHt4b2Zmc2V0OiA0MiwgeW9mZnNldDogMTd9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoW251bGwsIDQyLCAxN10pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ3JlcXVpcmVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IHJlbW92ZUFwcCB3aXRoIGFwcElkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYXBwaXVtL2RldmljZS9yZW1vdmVfYXBwJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAganNvbjoge2FwcElkOiA0Mn1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbCg0Mik7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IHJlbW92ZUFwcCB3aXRoIGJ1bmRsZUlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYXBwaXVtL2RldmljZS9yZW1vdmVfYXBwJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAganNvbjoge2J1bmRsZUlkOiA0Mn1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbCg0Mik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVmYXVsdCBwYXJhbSB3cmFwJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICBpdCgnc2hvdWxkIHdyYXAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3RvdWNoL3BlcmZvcm0nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IFt7XCJhY3Rpb25cIjpcInRhcFwiLCBcIm9wdGlvbnNcIjp7XCJlbGVtZW50XCI6XCIzXCJ9fV1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZGVlcC5lcXVhbChbW3tcImFjdGlvblwiOlwidGFwXCIsIFwib3B0aW9uc1wiOntcImVsZW1lbnRcIjpcIjNcIn19XSwgJ2ZvbyddKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCB3cmFwIHR3aWNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby90b3VjaC9wZXJmb3JtJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7YWN0aW9uczogW3tcImFjdGlvblwiOlwidGFwXCIsIFwib3B0aW9uc1wiOntcImVsZW1lbnRcIjpcIjNcIn19XX1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZGVlcC5lcXVhbChbW3tcImFjdGlvblwiOlwidGFwXCIsIFwib3B0aW9uc1wiOntcImVsZW1lbnRcIjpcIjNcIn19XSwgJ2ZvbyddKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlIHNlc3Npb25zIHZpYSBIVFRQIGVuZHBvaW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRlc2lyZWRDYXBhYmlsaXRpZXMgPSB7YTogJ2InfTtcbiAgICAgIGxldCByZXF1aXJlZENhcGFiaWxpdGllcyA9IHtjOiAnZCd9O1xuICAgICAgbGV0IGNhcGFiaWxpdGllcyA9IHtlOiAnZid9O1xuICAgICAgbGV0IGJhc2VVcmwgPSBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uYDtcblxuICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBjcmVhdGUgc2Vzc2lvbiB3aXRoIGRlc2lyZWQgY2FwcyAoTUpTT05XUCknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGJhc2VVcmwsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAganNvbjoge2Rlc2lyZWRDYXBhYmlsaXRpZXN9XG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoZGVzaXJlZENhcGFiaWxpdGllcyk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYWxsb3cgY3JlYXRlIHNlc3Npb24gd2l0aCBkZXNpcmVkIGFuZCByZXF1aXJlZCBjYXBzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBiYXNlVXJsLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgIGRlc2lyZWRDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICByZXF1aXJlZENhcGFiaWxpdGllc1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChfLmV4dGVuZCh7fSwgZGVzaXJlZENhcGFiaWxpdGllcywgcmVxdWlyZWRDYXBhYmlsaXRpZXMpKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHRvIGNyZWF0ZSBzZXNzaW9uIHdpdGhvdXQgY2FwYWJpbGl0aWVzIG9yIGRlc2lyZWRDYXBhYmlsaXRpZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYmFzZVVybCxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7fSxcbiAgICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKCc0MDAnKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBjcmVhdGUgc2Vzc2lvbiB3aXRoIGNhcGFiaWxpdGllcyAoVzNDKScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHtzdGF0dXMsIHZhbHVlLCBzZXNzaW9uSWR9ID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBiYXNlVXJsLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllcyxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzaG91bGQubm90LmV4aXN0KHN0YXR1cyk7XG4gICAgICAgIHNob3VsZC5ub3QuZXhpc3Qoc2Vzc2lvbklkKTtcbiAgICAgICAgdmFsdWUuY2FwYWJpbGl0aWVzLnNob3VsZC5lcWwoY2FwYWJpbGl0aWVzKTtcbiAgICAgICAgdmFsdWUuc2Vzc2lvbklkLnNob3VsZC5leGlzdDtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgndzNjIGVuZHBvaW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHczY0NhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHtcbiAgICAgICAgICAgIHBsYXRmb3JtTmFtZTogJ0Zha2UnLFxuICAgICAgICAgICAgZGV2aWNlTmFtZTogJ0NvbW1vZG9yZSA2NCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmaXJzdE1hdGNoOiBbe31dLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgc2Vzc2lvblVybDtcbiAgICAgICAgbGV0IHNlc3Npb25JZDtcblxuICAgICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBTdGFydCBhIHNlc3Npb25cbiAgICAgICAgICBsZXQge3ZhbHVlfSA9IGF3YWl0IHJlcXVlc3QucG9zdChiYXNlVXJsLCB7XG4gICAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICAgIGNhcGFiaWxpdGllczogdzNjQ2FwcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXNzaW9uSWQgPSB2YWx1ZS5zZXNzaW9uSWQ7XG4gICAgICAgICAgc2Vzc2lvblVybCA9IGAke2Jhc2VVcmx9LyR7c2Vzc2lvbklkfWA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFmdGVyRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRGVsZXRlIHRoZSBzZXNzaW9uXG4gICAgICAgICAgYXdhaXQgcmVxdWVzdC5kZWxldGUoc2Vzc2lvblVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KGBzaG91bGQgdGhyb3cgNDAwIEJhZCBQYXJhbWV0ZXJzIGV4Y2VwdGlvbiBpZiB0aGUgcGFyYW1ldGVycyBhcmUgYmFkYCwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnN0IHtzdGF0dXNDb2RlLCBlcnJvcn0gPSBhd2FpdCByZXF1ZXN0LnBvc3QoYCR7c2Vzc2lvblVybH0vYWN0aW9uc2AsIHtcbiAgICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgICAgYmFkOiAncGFyYW1zJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgICAgICBzdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDApO1xuXG4gICAgICAgICAgY29uc3Qge2Vycm9yOnczY0Vycm9yLCBtZXNzYWdlLCBzdGFja3RyYWNlfSA9IGVycm9yLnZhbHVlO1xuICAgICAgICAgIG1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9QYXJhbWV0ZXJzIHdlcmUgaW5jb3JyZWN0Lyk7XG4gICAgICAgICAgc3RhY2t0cmFjZS5zaG91bGQubWF0Y2goL3Byb3RvY29sLmpzLyk7XG4gICAgICAgICAgdzNjRXJyb3Iuc2hvdWxkLmJlLmEuc3RyaW5nO1xuICAgICAgICAgIHczY0Vycm9yLnNob3VsZC5lcXVhbChlcnJvcnMuSW52YWxpZEFyZ3VtZW50RXJyb3IuZXJyb3IoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KGBzaG91bGQgdGhyb3cgNDA0IE5vdCBGb3VuZCBleGNlcHRpb24gaWYgdGhlIGNvbW1hbmQgaGFzbid0IGJlZW4gaW1wbGVtZW50ZWQgeWV0YCwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnN0IHtzdGF0dXNDb2RlLCBlcnJvcn0gPSBhd2FpdCByZXF1ZXN0LnBvc3QoYCR7c2Vzc2lvblVybH0vYWN0aW9uc2AsIHtcbiAgICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgICAgYWN0aW9uczogW10sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICAgICAgc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNDA0KTtcblxuICAgICAgICAgIGNvbnN0IHtlcnJvcjp3M2NFcnJvciwgbWVzc2FnZSwgc3RhY2t0cmFjZX0gPSBlcnJvci52YWx1ZTtcbiAgICAgICAgICBtZXNzYWdlLnNob3VsZC5tYXRjaCgvTWV0aG9kIGhhcyBub3QgeWV0IGJlZW4gaW1wbGVtZW50ZWQvKTtcbiAgICAgICAgICBzdGFja3RyYWNlLnNob3VsZC5tYXRjaCgvcHJvdG9jb2wuanMvKTtcbiAgICAgICAgICB3M2NFcnJvci5zaG91bGQuYmUuYS5zdHJpbmc7XG4gICAgICAgICAgdzNjRXJyb3Iuc2hvdWxkLmVxdWFsKGVycm9ycy5Ob3RZZXRJbXBsZW1lbnRlZEVycm9yLmVycm9yKCkpO1xuICAgICAgICAgIG1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9NZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZC8pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChgc2hvdWxkIHRocm93IDUwMCBVbmtub3duIEVycm9yIGlmIHRoZSBjb21tYW5kIHRocm93cyBhbiB1bmV4cGVjdGVkIGV4Y2VwdGlvbmAsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkcml2ZXIucGVyZm9ybUFjdGlvbnMgPSAoKSA9PiB7IHRocm93IG5ldyBFcnJvcihgRGlkbid0IHdvcmtgKTsgfTtcbiAgICAgICAgICBjb25zdCB7c3RhdHVzQ29kZSwgZXJyb3J9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KGAke3Nlc3Npb25Vcmx9L2FjdGlvbnNgLCB7XG4gICAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICAgIGFjdGlvbnM6IFtdLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgICAgIHN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG5cbiAgICAgICAgICBjb25zdCB7ZXJyb3I6dzNjRXJyb3IsIG1lc3NhZ2UsIHN0YWNrdHJhY2V9ID0gZXJyb3IudmFsdWU7XG4gICAgICAgICAgc3RhY2t0cmFjZS5zaG91bGQubWF0Y2goL3Byb3RvY29sLmpzLyk7XG4gICAgICAgICAgdzNjRXJyb3Iuc2hvdWxkLmJlLmEuc3RyaW5nO1xuICAgICAgICAgIHczY0Vycm9yLnNob3VsZC5lcXVhbChlcnJvcnMuVW5rbm93bkVycm9yLmVycm9yKCkpO1xuICAgICAgICAgIG1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9EaWRuJ3Qgd29yay8pO1xuXG4gICAgICAgICAgZGVsZXRlIGRyaXZlci5wZXJmb3JtQWN0aW9ucztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoYHNob3VsZCB0cmFuc2xhdGUgZWxlbWVudCBmb3JtYXQgZnJvbSBNSlNPTldQIHRvIFczQ2AsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCByZXRWYWx1ZSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc29tZXRoaW5nOiB7XG4gICAgICAgICAgICAgICAgW01KU09OV1BfRUxFTUVOVF9LRVldOiAnZm9vbycsXG4gICAgICAgICAgICAgICAgb3RoZXI6ICdiYXInXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgW01KU09OV1BfRUxFTUVOVF9LRVldOiAnYmFyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpZ25vcmUnLFxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzb21ldGhpbmc6IHtcbiAgICAgICAgICAgICAgICBbVzNDX0VMRU1FTlRfS0VZXTogJ2Zvb28nLFxuICAgICAgICAgICAgICAgIG90aGVyOiAnYmFyJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIFtXM0NfRUxFTUVOVF9LRVldOiAnYmFyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpZ25vcmUnLFxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBjb25zdCBmaW5kRWxlbWVudHNCYWNrdXAgPSBkcml2ZXIuZmluZEVsZW1lbnRzO1xuICAgICAgICAgIGRyaXZlci5maW5kRWxlbWVudHMgPSAoKSA9PiByZXRWYWx1ZTtcbiAgICAgICAgICBjb25zdCB7dmFsdWV9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KGAke3Nlc3Npb25Vcmx9L2VsZW1lbnRzYCwge1xuICAgICAgICAgICAganNvbjoge1xuICAgICAgICAgICAgICB1c2luZzogJ3doYXRldmVyJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICd3aGF0ZXZlcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbHVlLnNob3VsZC5kZWVwLmVxdWFsKGV4cGVjdGVkVmFsdWUpO1xuICAgICAgICAgIGRyaXZlci5maW5kRWxlbWVudHMgPSBmaW5kRWxlbWVudHNCYWNrdXA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KGBzaG91bGQgZmFpbCB3aXRoIGEgNDA4IGVycm9yIGlmIGl0IHRocm93cyBhIFRpbWVvdXRFcnJvciBleGNlcHRpb25gLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2lub24uc3R1Yihkcml2ZXIsICdzZXRVcmwnLCAoKSA9PiB7IHRocm93IG5ldyBlcnJvcnMuVGltZW91dEVycm9yOyB9KTtcbiAgICAgICAgICBsZXQge3N0YXR1c0NvZGUsIGVycm9yfSA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBgJHtzZXNzaW9uVXJsfS91cmxgLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgICAgICBzdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDgpO1xuXG4gICAgICAgICAgY29uc3Qge2Vycm9yOnczY0Vycm9yLCBtZXNzYWdlLCBzdGFja3RyYWNlfSA9IGVycm9yLnZhbHVlO1xuICAgICAgICAgIHN0YWNrdHJhY2Uuc2hvdWxkLm1hdGNoKC9wcm90b2NvbC5qcy8pO1xuICAgICAgICAgIHczY0Vycm9yLnNob3VsZC5iZS5hLnN0cmluZztcbiAgICAgICAgICB3M2NFcnJvci5zaG91bGQuZXF1YWwoZXJyb3JzLlRpbWVvdXRFcnJvci5lcnJvcigpKTtcbiAgICAgICAgICBtZXNzYWdlLnNob3VsZC5tYXRjaCgvQW4gb3BlcmF0aW9uIGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQvKTtcblxuICAgICAgICAgIHNpbm9uLnJlc3RvcmUoZHJpdmVyLCAnc2V0VXJsJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KGBzaG91bGQgcGFzcyB3aXRoIDIwMCBIVFRQIHN0YXR1cyBjb2RlIGlmIHRoZSBjb21tYW5kIHJldHVybnMgYSB2YWx1ZWAsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkcml2ZXIucGVyZm9ybUFjdGlvbnMgPSAoYWN0aW9ucykgPT4gJ0l0IHdvcmtzICcgKyBhY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICAgIGNvbnN0IHtzdGF0dXMsIHZhbHVlLCBzZXNzaW9uSWR9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KGAke3Nlc3Npb25Vcmx9L2FjdGlvbnNgLCB7XG4gICAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICAgIGFjdGlvbnM6IFsnYScsICdiJywgJ2MnXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzaG91bGQubm90LmV4aXN0KHNlc3Npb25JZCk7XG4gICAgICAgICAgc2hvdWxkLm5vdC5leGlzdChzdGF0dXMpO1xuICAgICAgICAgIHZhbHVlLnNob3VsZC5lcXVhbCgnSXQgd29ya3MgYWJjJyk7XG4gICAgICAgICAgZGVsZXRlIGRyaXZlci5wZXJmb3JtQWN0aW9ucztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2p3cHJveHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGV0IHBvcnQgPSA1NjU2MjtcbiAgICAgICAgICBsZXQgc2VydmVyLCBqd3Byb3h5LCBhcHA7XG4gICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gY3JlYXRlUHJveHlTZXJ2ZXIoc2Vzc2lvbklkLCBwb3J0KTtcbiAgICAgICAgICAgIHNlcnZlciA9IHJlcy5zZXJ2ZXI7XG4gICAgICAgICAgICBhcHAgPSByZXMuYXBwO1xuICAgICAgICAgICAgandwcm94eSA9IG5ldyBKV1Byb3h5KHtob3N0OiAnbG9jYWxob3N0JywgcG9ydH0pO1xuICAgICAgICAgICAgandwcm94eS5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICBkcml2ZXIucGVyZm9ybUFjdGlvbnMgPSBhc3luYyAoYWN0aW9ucykgPT4gYXdhaXQgandwcm94eS5jb21tYW5kKCcvcGVyZm9ybS1hY3Rpb25zJywgJ1BPU1QnLCBhY3Rpb25zKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgICAgIGRlbGV0ZSBkcml2ZXIucGVyZm9ybUFjdGlvbnM7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgaWYgYSBwcm94aWVkIHJlcXVlc3QgcmV0dXJucyBhIHJlc3BvbnNlIHdpdGggc3RhdHVzIDIwMCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFkZEhhbmRsZXIoYXBwLCAncG9zdCcsICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9wZXJmb3JtLWFjdGlvbnMnLCAocmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgIHNlc3Npb25JZDogcmVxLnBhcmFtcy5zZXNzaW9uSWQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJlcS5ib2R5LFxuICAgICAgICAgICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qge3N0YXR1cywgdmFsdWUsIHNlc3Npb25JZH0gPSBhd2FpdCByZXF1ZXN0LnBvc3QoYCR7c2Vzc2lvblVybH0vYWN0aW9uc2AsIHtcbiAgICAgICAgICAgICAganNvbjoge1xuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsxLCAyLCAzXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFsdWUuc2hvdWxkLmVxbChbMSwgMiwgM10pO1xuICAgICAgICAgICAgc2hvdWxkLm5vdC5leGlzdChzdGF0dXMpO1xuICAgICAgICAgICAgc2hvdWxkLm5vdC5leGlzdChzZXNzaW9uSWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3Nob3VsZCB3b3JrIGlmIGEgcHJveGllZCByZXF1ZXN0IHJldHVybnMgYSBNSlNPTldQIGVycm9yIHJlc3BvbnNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWRkSGFuZGxlcihhcHAsICdwb3N0JywgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3BlcmZvcm0tYWN0aW9ucycsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogNixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ0EgcHJvYmxlbSBvY2N1cnJlZCcsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7c3RhdHVzQ29kZSwgbWVzc2FnZX0gPSBhd2FpdCByZXF1ZXN0LnBvc3QoYCR7c2Vzc2lvblVybH0vYWN0aW9uc2AsIHtcbiAgICAgICAgICAgICAganNvbjoge1xuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsxLCAyLCAzXSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICAgICAgICBzdGF0dXNDb2RlLnNob3VsZC5lcXVhbChIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EKTtcbiAgICAgICAgICAgIG1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9BIHByb2JsZW0gb2NjdXJyZWQvKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdzaG91bGQgd29yayBpZiBhIHByb3hpZWQgcmVxdWVzdCByZXR1cm5zIGEgVzNDIGVycm9yIHJlc3BvbnNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWRkSGFuZGxlcihhcHAsICdwb3N0JywgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3BlcmZvcm0tYWN0aW9ucycsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiAnbm8gc3VjaCBlbGVtZW50JyxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdkb2VzIG5vdCBtYWtlIGEgZGlmZmVyZW5jZScsXG4gICAgICAgICAgICAgICAgICBzdGFja3RyYWNlOiAnYXJiaXRyYXJ5IHN0YWNrdHJhY2UnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7c3RhdHVzQ29kZSwgbWVzc2FnZSwgZXJyb3J9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KGAke3Nlc3Npb25Vcmx9L2FjdGlvbnNgLCB7XG4gICAgICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBbMSwgMiwgM10sXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgICAgICAgc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORCk7XG4gICAgICAgICAgICBtZXNzYWdlLnNob3VsZC5tYXRjaCgvZG9lcyBub3QgbWFrZSBhIGRpZmZlcmVuY2UvKTtcbiAgICAgICAgICAgIGNvbnN0IHtlcnJvcjp3M2NFcnJvciwgc3RhY2t0cmFjZX0gPSBlcnJvci52YWx1ZTtcbiAgICAgICAgICAgIHczY0Vycm9yLnNob3VsZC5lcXVhbCgnbm8gc3VjaCBlbGVtZW50Jyk7XG4gICAgICAgICAgICBzdGFja3RyYWNlLnNob3VsZC5tYXRjaCgvYXJiaXRyYXJ5IHN0YWNrdHJhY2UvKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdzaG91bGQgd29yayBpZiBhIHByb3hpZWQgcmVxdWVzdCByZXR1cm5zIGEgVzNDIGVycm9yIHJlc3BvbnNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWRkSGFuZGxlcihhcHAsICdwb3N0JywgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3BlcmZvcm0tYWN0aW9ucycsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgICByZXMuc3RhdHVzKDQ0NCkuanNvbih7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiAnYm9ndXMgZXJyb3IgY29kZScsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnZG9lcyBub3QgbWFrZSBhIGRpZmZlcmVuY2UnLFxuICAgICAgICAgICAgICAgICAgc3RhY2t0cmFjZTogJ2FyYml0cmFyeSBzdGFja3RyYWNlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qge3N0YXR1c0NvZGUsIG1lc3NhZ2UsIGVycm9yfSA9IGF3YWl0IHJlcXVlc3QucG9zdChgJHtzZXNzaW9uVXJsfS9hY3Rpb25zYCwge1xuICAgICAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uczogWzEsIDIsIDNdLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgICAgICAgIHN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKEhUVFBTdGF0dXNDb2Rlcy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgICAgICAgICAgbWVzc2FnZS5zaG91bGQubWF0Y2goL2RvZXMgbm90IG1ha2UgYSBkaWZmZXJlbmNlLyk7XG4gICAgICAgICAgICBjb25zdCB7ZXJyb3I6dzNjRXJyb3IsIHN0YWNrdHJhY2V9ID0gZXJyb3IudmFsdWU7XG4gICAgICAgICAgICB3M2NFcnJvci5zaG91bGQuZXF1YWwoJ3Vua25vd24gZXJyb3InKTtcbiAgICAgICAgICAgIHN0YWNrdHJhY2Uuc2hvdWxkLm1hdGNoKC9hcmJpdHJhcnkgc3RhY2t0cmFjZS8pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhbmRsZSBjb21tYW5kcyB3aXRoIG5vIHJlc3BvbnNlIHZhbHVlcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9mb3J3YXJkJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJlcy5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgZW1wdHkgc3RyaW5nIHJlc3BvbnNlIHZhbHVlcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci90ZXh0JyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmVzLnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZW5kIDUwMCByZXNwb25zZSBhbmQgYW4gVW5rbm93biBvYmplY3QgZm9yIHJlamVjdGVkIGNvbW1hbmRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3JlZnJlc2gnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogVG9vIEZyZXNoISdcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IFVua25vd25FcnJvciB3aGVuIGtub3duJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNDA0KTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDYsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ0Egc2Vzc2lvbiBpcyBlaXRoZXIgdGVybWluYXRlZCBvciBub3Qgc3RhcnRlZCdcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Nlc3Npb24gSWRzJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBkcml2ZXIgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgIGxldCBtanNvbndwU2VydmVyO1xuXG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1qc29ud3BTZXJ2ZXIgPSBhd2FpdCBzZXJ2ZXIocm91dGVDb25maWd1cmluZ0Z1bmN0aW9uKGRyaXZlciksIDgxODEpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbWpzb253cFNlcnZlci5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBTZXNzaW9uSWQgZm9yIGNvbW1hbmRzIHdpdGhvdXQgc2Vzc2lvbklkcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zdGF0dXMnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIHNob3VsZC5lcXVhbChyZXMuc2Vzc2lvbklkLCBudWxsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXNwb25kcyB3aXRoIHRoZSBzYW1lIHNlc3Npb24gSUQgaW4gdGhlIHJlcXVlc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgc2Vzc2lvbklkID0gJ1ZhZGVyIFNlc3Npb25zJztcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ31cbiAgICAgIH0pO1xuXG4gICAgICBzaG91bGQuZXhpc3QocmVzLnNlc3Npb25JZCk7XG4gICAgICByZXMuc2Vzc2lvbklkLnNob3VsZC5lcWwoc2Vzc2lvbklkKTtcbiAgICB9KTtcblxuICAgIGl0KCd5ZWxscyBpZiBubyBzZXNzaW9uIGV4aXN0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSAnVmFkZXIgU2Vzc2lvbnMnO1xuXG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDQpO1xuICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCg2KTtcbiAgICAgIHJlcy5ib2R5LnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3Nlc3Npb24nKTtcbiAgICB9KTtcblxuICAgIGl0KCd5ZWxscyBpZiBpbnZhbGlkIHNlc3Npb24gaXMgc2VudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSAnVmFkZXIgU2Vzc2lvbnMnO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9ICdyZWNlc3Npb24nO1xuXG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDQpO1xuICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCg2KTtcbiAgICAgIHJlcy5ib2R5LnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3Nlc3Npb24nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBzZXNzaW9uIElEcyBpbiBlcnJvciByZXNwb25zZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgc2Vzc2lvbklkID0gJ1ZhZGVyIFNlc3Npb25zJztcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS9yZWZyZXNoYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICd0aGUgY29tbWFuZC4gT3JpZ2luYWwgZXJyb3I6IFRvbyBGcmVzaCEnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIG5ldyBzZXNzaW9uIElEIG9uIGNyZWF0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge2Rlc2lyZWRDYXBhYmlsaXRpZXM6IHtncmVldGluZzogJ2hlbGxvJ30sIHJlcXVpcmVkQ2FwYWJpbGl0aWVzOiB7dmFsZWRpY3Rpb246ICdieWUnfX1cbiAgICAgIH0pO1xuXG4gICAgICBzaG91bGQuZXhpc3QocmVzLnNlc3Npb25JZCk7XG4gICAgICByZXMuc2Vzc2lvbklkLnNob3VsZC5lcXVhbCgnMTIzNCcpO1xuICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoe2dyZWV0aW5nOiAnaGVsbG8nLCB2YWxlZGljdGlvbjogJ2J5ZSd9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZpYSBkcml2ZXJzIGpzb253cCBwcm94eScsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGxldCBzZXNzaW9uSWQgPSAnZm9vJztcbiAgICBsZXQgbWpzb253cFNlcnZlcjtcblxuICAgIGJlZm9yZUVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gbmV3IEZha2VEcml2ZXIoKTtcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG4gICAgICBkcml2ZXIucHJveHlBY3RpdmUgPSAoKSA9PiB7IHJldHVybiB0cnVlOyB9O1xuICAgICAgZHJpdmVyLmNhblByb3h5ID0gKCkgPT4geyByZXR1cm4gdHJ1ZTsgfTtcblxuICAgICAgbWpzb253cFNlcnZlciA9IGF3YWl0IHNlcnZlcihyb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZHJpdmVyKSwgODE4MSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbWpzb253cFNlcnZlci5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnaXZlIGEgbmljZSBlcnJvciBpZiBwcm94eWluZyBpcyBzZXQgYnV0IG5vIHByb3h5IGZ1bmN0aW9uIGV4aXN0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5jYW5Qcm94eSA9ICgpID0+IHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogVHJ5aW5nIHRvIHByb3h5IHRvIGEgSlNPTldQICcgK1xuICAgICAgICAgICAgICAgICAgICdzZXJ2ZXIgYnV0IGRyaXZlciBpcyB1bmFibGUgdG8gcHJveHknXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHBhc3Mgb24gYW55IGVycm9ycyBpbiBwcm94eWluZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5wcm94eVJlcVJlcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZm9vXCIpO1xuICAgICAgfTtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICd0aGUgY29tbWFuZC4gT3JpZ2luYWwgZXJyb3I6IENvdWxkIG5vdCBwcm94eS4gUHJveHkgJyArXG4gICAgICAgICAgICAgICAgICAgJ2Vycm9yOiBmb28nXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFibGUgdG8gdGhyb3cgUHJveHlSZXF1ZXN0RXJyb3IgaW4gcHJveHlpbmcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIucHJveHlSZXFSZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBqc29ud3AgPSB7c3RhdHVzOiAzNSwgdmFsdWU6IFwiTm8gc3VjaCBjb250ZXh0IGZvdW5kLlwiLCBzZXNzaW9uSWQ6IFwiZm9vXCJ9O1xuICAgICAgICB0aHJvdyAgbmV3IGVycm9ycy5Qcm94eVJlcXVlc3RFcnJvcihgQ291bGQgbm90IHByb3h5IGNvbW1hbmQgdG8gcmVtb3RlIHNlcnZlci4gYCwganNvbndwKTtcbiAgICAgIH07XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMzUsXG4gICAgICAgIFwidmFsdWVcIjogeyBcIm1lc3NhZ2VcIjogXCJObyBzdWNoIGNvbnRleHQgZm91bmQuXCJ9LFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBsZXQgdGhlIHByb3h5IGhhbmRsZSByZXEvcmVzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLnByb3h5UmVxUmVzID0gYXN5bmMgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtjdXN0b206ICdkYXRhJ30pO1xuICAgICAgfTtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDIwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtjdXN0b206ICdkYXRhJ30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhdm9pZCBqc29ud3AgcHJveHlpbmcgd2hlbiBwYXRoIG1hdGNoZXMgYXZvaWRhbmNlIGxpc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QgPSAoKSA9PiB7IHJldHVybiBbWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3VybCQnKV1dOyB9O1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcIk5hdmlnYXRlZCB0bzogaHR0cDovL2dvb2dsZS5jb21cIixcbiAgICAgICAgc2Vzc2lvbklkXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBpZiBhdm9pZCBwcm94eSBsaXN0IGlzIG1hbGZvcm1lZCBpbiBzb21lIHdheScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFzeW5jIGZ1bmN0aW9uIGJhZFByb3h5QXZvaWRhbmNlTGlzdCAobGlzdCkge1xuICAgICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QgPSAoKSA9PiB7IHJldHVybiBsaXN0OyB9O1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICAgIHJlcy5ib2R5LnN0YXR1cy5zaG91bGQuZXF1YWwoMTMpO1xuICAgICAgICByZXMuYm9keS52YWx1ZS5tZXNzYWdlLnNob3VsZC5jb250YWluKFwicm94eVwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxpc3RzID0gW1xuICAgICAgICAnZm9vJyxcbiAgICAgICAgW1snZm9vJ11dLFxuICAgICAgICBbWydCQVInLCAvbG9sL11dLFxuICAgICAgICBbWydHRVQnLCAnZm9vJ11dXG4gICAgICBdO1xuICAgICAgZm9yIChsZXQgbGlzdCBvZiBsaXN0cykge1xuICAgICAgICBhd2FpdCBiYWRQcm94eUF2b2lkYW5jZUxpc3QobGlzdCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGF2b2lkIHByb3h5aW5nIG5vbi1zZXNzaW9uIGNvbW1hbmRzIGV2ZW4gaWYgbm90IGluIHRoZSBsaXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0ID0gKCkgPT4geyByZXR1cm4gW1snUE9TVCcsIG5ldyBSZWdFeHAoJycpXV07IH07XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zdGF0dXNgLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiSSdtIGZpbmVcIixcbiAgICAgICAgc2Vzc2lvbklkOiBudWxsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYXZvaWQgcHJveHlpbmcgZGVsZXRlU2Vzc2lvbiBjb21tYW5kcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCA9ICgpID0+IHsgcmV0dXJuIFtbJ1BPU1QnLCBuZXcgUmVnRXhwKCcnKV1dOyB9O1xuXG4gICAgICBkcml2ZXIuc2Vzc2lvbklkLnNob3VsZC5lcXVhbChzZXNzaW9uSWQpO1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9YCxcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QoZHJpdmVyLnNlc3Npb25JZCk7XG4gICAgICBkcml2ZXIuandwUHJveHlBY3RpdmUuc2hvdWxkLmJlLmZhbHNlO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9

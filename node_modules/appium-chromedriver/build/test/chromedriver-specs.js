require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libChromedriver = require('../lib/chromedriver');

var _libChromedriver2 = _interopRequireDefault(_libChromedriver);

var _libInstall = require('../lib/install');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _teen_process = require('teen_process');

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function nextState(cd) {
  return new _bluebird2['default'](function (resolve) {
    cd.on(_libChromedriver2['default'].EVENT_CHANGED, function (msg) {
      resolve(msg.state);
    });
  });
}

function nextError(cd) {
  return new _bluebird2['default'](function (resolve) {
    cd.on(_libChromedriver2['default'].EVENT_ERROR, function (err) {
      // eslint-disable-line promise/prefer-await-to-callbacks
      resolve(err);
    });
  });
}

function assertNoRunningChromedrivers() {
  var _ref, stdout, count, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line;

  return _regeneratorRuntime.async(function assertNoRunningChromedrivers$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('ps', ['aux']));

      case 2:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        count = 0;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 8;

        for (_iterator = _getIterator(stdout.split('\n')); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          line = _step.value;

          if (line.indexOf(/chromedriver/i) !== -1) {
            count++;
          }
        }

        context$1$0.next = 16;
        break;

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 16:
        context$1$0.prev = 16;
        context$1$0.prev = 17;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 19:
        context$1$0.prev = 19;

        if (!_didIteratorError) {
          context$1$0.next = 22;
          break;
        }

        throw _iteratorError;

      case 22:
        return context$1$0.finish(19);

      case 23:
        return context$1$0.finish(16);

      case 24:
        count.should.eql(0);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[8, 12, 16, 24], [17,, 19, 23]]);
}

function buildReqRes(url, method, body) {
  var req = { originalUrl: url, method: method, body: body };
  var res = {};
  res.headers = {};
  res.set = function (k, v) {
    res[k] = v;
  };
  res.status = function (code) {
    res.sentCode = code;
    return {
      send: function send(body) {
        try {
          body = JSON.parse(body);
        } catch (e) {}
        res.sentBody = body;
      }
    };
  };
  return [req, res];
}

describe('chromedriver binary setup', function () {
  this.timeout(20000);
  before(function callee$1$0() {
    var cd;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd = new _libChromedriver2['default']({});
          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(cd.initChromedriverPath());

        case 4:
          context$2$0.next = 11;
          break;

        case 6:
          context$2$0.prev = 6;
          context$2$0.t0 = context$2$0['catch'](1);

          if (!(context$2$0.t0.message.indexOf("Trying to use") !== -1)) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.next = 11;
          return _regeneratorRuntime.awrap((0, _libInstall.install)());

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1, 6]]);
  });

  it('should start with a binary that exists', function callee$1$0() {
    var cd;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd = new _libChromedriver2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(cd.initChromedriverPath());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

describe('chromedriver with EventEmitter', function () {
  var _this = this;

  this.timeout(120000);
  var cd = null;
  var caps = { browserName: 'chrome' };
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd = new _libChromedriver2['default']({});

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should start a session', function callee$1$0() {
    var nextStatePromise;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd.state.should.eql('stopped');
          nextStatePromise = nextState(cd);

          cd.start(caps);
          cd.capabilities.should.eql(caps);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(nextStatePromise.should.become(_libChromedriver2['default'].STATE_STARTING));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(nextState(cd).should.become(_libChromedriver2['default'].STATE_ONLINE));

        case 8:
          should.exist(cd.jwproxy.sessionId);
          should.exist(cd.sessionId());

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should run some commands', function callee$1$0() {
    var res;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(cd.sendCommand('/url', 'POST', { url: 'http://google.com' }));

        case 2:
          res = context$2$0.sent;

          should.not.exist(res);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(cd.sendCommand('/url', 'GET'));

        case 6:
          res = context$2$0.sent;

          res.should.contain('google');

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should proxy commands', function callee$1$0() {
    var initSessId, _buildReqRes, _buildReqRes2, req, res;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          initSessId = cd.sessionId();
          _buildReqRes = buildReqRes('/url', 'GET');
          _buildReqRes2 = _slicedToArray(_buildReqRes, 2);
          req = _buildReqRes2[0];
          res = _buildReqRes2[1];
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(cd.proxyReq(req, res));

        case 7:
          res.headers['content-type'].should.contain('application/json');
          res.sentCode.should.equal(200);
          res.sentBody.status.should.equal(0);
          res.sentBody.value.should.contain('google');
          res.sentBody.sessionId.should.equal(initSessId);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should say whether there is a working webview', function callee$1$0() {
    var res;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(cd.hasWorkingWebview());

        case 2:
          res = context$2$0.sent;

          res.should.equal(true);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should restart a session', function callee$1$0() {
    var p1, restartPromise;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          p1 = nextState(cd);
          restartPromise = cd.restart();
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(p1.should.become(_libChromedriver2['default'].STATE_RESTARTING));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(nextState(cd).should.become(_libChromedriver2['default'].STATE_ONLINE));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(restartPromise);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should stop a session', function callee$1$0() {
    var nextStatePromise;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          nextStatePromise = nextState(cd);

          cd.stop();
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(nextStatePromise.should.become(_libChromedriver2['default'].STATE_STOPPING));

        case 4:
          should.not.exist(cd.sessionId());
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(nextState(cd).should.become(_libChromedriver2['default'].STATE_STOPPED));

        case 7:
          should.not.exist(cd.sessionId());
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(assertNoRunningChromedrivers());

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it.skip('should change state to stopped if chromedriver crashes', function callee$1$0() {
    var nextStatePromise;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          // test works but is skipped because it leaves a chrome window orphaned
          // and I can't figure out a way to safely kill only that one
          cd.state.should.eql(_libChromedriver2['default'].STATE_STOPPED);
          nextStatePromise = nextState(cd);

          cd.start(caps);
          cd.capabilities.should.eql(caps);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(nextStatePromise.should.become(_libChromedriver2['default'].STATE_STARTING));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(nextState(cd).should.become(_libChromedriver2['default'].STATE_ONLINE));

        case 8:
          should.exist(cd.jwproxy.sessionId);
          should.exist(cd.sessionId());
          nextStatePromise = nextState(cd);
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(cd.killAll());

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(nextStatePromise.should.become(_libChromedriver2['default'].STATE_STOPPED));

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should throw an error when chromedriver doesnt exist', function callee$1$0() {
    var cd2, nextErrP, err;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd2 = new _libChromedriver2['default']({
            executable: '/does/not/exist'
          });
          nextErrP = nextError(cd2);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(cd2.start({}).should.eventually.be.rejectedWith(/Trying to use/));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(nextErrP);

        case 6:
          err = context$2$0.sent;

          err.message.should.contain('Trying to use');

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

describe('chromedriver with async/await', function () {
  this.timeout(120000);
  var cd = null;
  var caps = { browserName: 'chrome' };
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd = new _libChromedriver2['default']({});

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should start a session', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd.state.should.eql('stopped');
          should.not.exist(cd.sessionId());
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(cd.start(caps));

        case 4:
          cd.capabilities.should.eql(caps);
          cd.state.should.eql(_libChromedriver2['default'].STATE_ONLINE);
          should.exist(cd.jwproxy.sessionId);
          should.exist(cd.sessionId());

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should restart a session', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd.state.should.eql(_libChromedriver2['default'].STATE_ONLINE);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(cd.restart());

        case 3:
          cd.state.should.eql(_libChromedriver2['default'].STATE_ONLINE);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should stop a session', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cd.state.should.eql(_libChromedriver2['default'].STATE_ONLINE);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(cd.stop());

        case 3:
          cd.state.should.eql(_libChromedriver2['default'].STATE_STOPPED);
          should.not.exist(cd.sessionId());
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(assertNoRunningChromedrivers());

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should throw an error during start if spawn does not work', function callee$1$0() {
    var badCd;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          badCd = new _libChromedriver2['default']({
            port: 1
          });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(badCd.start(caps).should.eventually.be.rejectedWith('ChromeDriver crashed during startup'));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(assertNoRunningChromedrivers());

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should throw an error during start if session does not work', function callee$1$0() {
    var badCd;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          badCd = new _libChromedriver2['default']({});
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(badCd.start({ chromeOptions: { badCap: 'foo' } }).should.eventually.be.rejectedWith('cannot parse capability'));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(assertNoRunningChromedrivers());

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// we miss the opportunity to listen for the 'starting' state
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvY2hyb21lZHJpdmVyLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzsrQkFFeUIscUJBQXFCOzs7OzBCQUN0QixnQkFBZ0I7O29CQUN2QixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt3QkFDL0IsVUFBVTs7Ozs0QkFDSCxjQUFjOztBQUduQyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUMzQixrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixTQUFTLFNBQVMsQ0FBRSxFQUFFLEVBQUU7QUFDdEIsU0FBTywwQkFBTSxVQUFDLE9BQU8sRUFBSztBQUN4QixNQUFFLENBQUMsRUFBRSxDQUFDLDZCQUFhLGFBQWEsRUFBRSxVQUFDLEdBQUcsRUFBSztBQUN6QyxhQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKOztBQUVELFNBQVMsU0FBUyxDQUFFLEVBQUUsRUFBRTtBQUN0QixTQUFPLDBCQUFNLFVBQUMsT0FBTyxFQUFLO0FBQ3hCLE1BQUUsQ0FBQyxFQUFFLENBQUMsNkJBQWEsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFLOztBQUN2QyxhQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDZCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSjs7QUFFRCxTQUFlLDRCQUE0QjtZQUNwQyxNQUFNLEVBQ1AsS0FBSyxrRkFDQSxJQUFJOzs7Ozs7eUNBRlEsd0JBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7QUFBbkMsY0FBTSxRQUFOLE1BQU07QUFDUCxhQUFLLEdBQUcsQ0FBQzs7Ozs7O0FBQ2Isc0NBQWlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHFHQUFFO0FBQTVCLGNBQUk7O0FBQ1gsY0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFF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Q0FBQyxDQUN2QyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUM7Ozs7MkNBQ2xFLDRCQUE0QixFQUFFOzs7Ozs7O0dBQ3JDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Nocm9tZWRyaXZlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgQ2hyb21lZHJpdmVyIGZyb20gJy4uL2xpYi9jaHJvbWVkcml2ZXInO1xuaW1wb3J0IHsgaW5zdGFsbCB9IGZyb20gJy4uL2xpYi9pbnN0YWxsJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5cblxubGV0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmZ1bmN0aW9uIG5leHRTdGF0ZSAoY2QpIHtcbiAgcmV0dXJuIG5ldyBCKChyZXNvbHZlKSA9PiB7XG4gICAgY2Qub24oQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQsIChtc2cpID0+IHtcbiAgICAgIHJlc29sdmUobXNnLnN0YXRlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG5leHRFcnJvciAoY2QpIHtcbiAgcmV0dXJuIG5ldyBCKChyZXNvbHZlKSA9PiB7XG4gICAgY2Qub24oQ2hyb21lZHJpdmVyLkVWRU5UX0VSUk9SLCAoZXJyKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tY2FsbGJhY2tzXG4gICAgICByZXNvbHZlKGVycik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhc3NlcnROb1J1bm5pbmdDaHJvbWVkcml2ZXJzICgpIHtcbiAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYygncHMnLCBbJ2F1eCddKTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgbGluZSBvZiBzdGRvdXQuc3BsaXQoJ1xcbicpKSB7XG4gICAgaWYgKGxpbmUuaW5kZXhPZigvY2hyb21lZHJpdmVyL2kpICE9PSAtMSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cblxuICBjb3VudC5zaG91bGQuZXFsKDApO1xufVxuXG5mdW5jdGlvbiBidWlsZFJlcVJlcyAodXJsLCBtZXRob2QsIGJvZHkpIHtcbiAgbGV0IHJlcSA9IHtvcmlnaW5hbFVybDogdXJsLCBtZXRob2QsIGJvZHl9O1xuICBsZXQgcmVzID0ge307XG4gIHJlcy5oZWFkZXJzID0ge307XG4gIHJlcy5zZXQgPSAoaywgdikgPT4geyByZXNba10gPSB2OyB9O1xuICByZXMuc3RhdHVzID0gKGNvZGUpID0+IHtcbiAgICByZXMuc2VudENvZGUgPSBjb2RlO1xuICAgIHJldHVybiB7XG4gICAgICBzZW5kOiAoYm9keSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICByZXMuc2VudEJvZHkgPSBib2R5O1xuICAgICAgfVxuICAgIH07XG4gIH07XG4gIHJldHVybiBbcmVxLCByZXNdO1xufVxuXG5kZXNjcmliZSgnY2hyb21lZHJpdmVyIGJpbmFyeSBzZXR1cCcsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aW1lb3V0KDIwMDAwKTtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2QgPSBuZXcgQ2hyb21lZHJpdmVyKHt9KTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2QuaW5pdENocm9tZWRyaXZlclBhdGgoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKFwiVHJ5aW5nIHRvIHVzZVwiKSAhPT0gLTEpIHtcbiAgICAgICAgYXdhaXQgaW5zdGFsbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzdGFydCB3aXRoIGEgYmluYXJ5IHRoYXQgZXhpc3RzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjZCA9IG5ldyBDaHJvbWVkcml2ZXIoKTtcbiAgICBhd2FpdCBjZC5pbml0Q2hyb21lZHJpdmVyUGF0aCgpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY2hyb21lZHJpdmVyIHdpdGggRXZlbnRFbWl0dGVyJywgZnVuY3Rpb24gKCkge1xuICB0aGlzLnRpbWVvdXQoMTIwMDAwKTtcbiAgbGV0IGNkID0gbnVsbDtcbiAgY29uc3QgY2FwcyA9IHticm93c2VyTmFtZTogJ2Nocm9tZSd9O1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNkID0gbmV3IENocm9tZWRyaXZlcih7fSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0YXJ0IGEgc2Vzc2lvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjZC5zdGF0ZS5zaG91bGQuZXFsKCdzdG9wcGVkJyk7XG4gICAgbGV0IG5leHRTdGF0ZVByb21pc2UgPSBuZXh0U3RhdGUoY2QpO1xuICAgIGNkLnN0YXJ0KGNhcHMpO1xuICAgIGNkLmNhcGFiaWxpdGllcy5zaG91bGQuZXFsKGNhcHMpO1xuICAgIGF3YWl0IG5leHRTdGF0ZVByb21pc2Uuc2hvdWxkLmJlY29tZShDaHJvbWVkcml2ZXIuU1RBVEVfU1RBUlRJTkcpO1xuICAgIGF3YWl0IG5leHRTdGF0ZShjZCkuc2hvdWxkLmJlY29tZShDaHJvbWVkcml2ZXIuU1RBVEVfT05MSU5FKTtcbiAgICBzaG91bGQuZXhpc3QoY2Quandwcm94eS5zZXNzaW9uSWQpO1xuICAgIHNob3VsZC5leGlzdChjZC5zZXNzaW9uSWQoKSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJ1biBzb21lIGNvbW1hbmRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCByZXMgPSBhd2FpdCBjZC5zZW5kQ29tbWFuZCgnL3VybCcsICdQT1NUJywge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30pO1xuICAgIHNob3VsZC5ub3QuZXhpc3QocmVzKTtcbiAgICByZXMgPSBhd2FpdCBjZC5zZW5kQ29tbWFuZCgnL3VybCcsICdHRVQnKTtcbiAgICByZXMuc2hvdWxkLmNvbnRhaW4oJ2dvb2dsZScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBwcm94eSBjb21tYW5kcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaW5pdFNlc3NJZCA9IGNkLnNlc3Npb25JZCgpO1xuICAgIGxldCBbcmVxLCByZXNdID0gYnVpbGRSZXFSZXMoJy91cmwnLCAnR0VUJyk7XG4gICAgYXdhaXQgY2QucHJveHlSZXEocmVxLCByZXMpO1xuICAgIHJlcy5oZWFkZXJzWydjb250ZW50LXR5cGUnXS5zaG91bGQuY29udGFpbignYXBwbGljYXRpb24vanNvbicpO1xuICAgIHJlcy5zZW50Q29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICByZXMuc2VudEJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICByZXMuc2VudEJvZHkudmFsdWUuc2hvdWxkLmNvbnRhaW4oJ2dvb2dsZScpO1xuICAgIHJlcy5zZW50Qm9keS5zZXNzaW9uSWQuc2hvdWxkLmVxdWFsKGluaXRTZXNzSWQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzYXkgd2hldGhlciB0aGVyZSBpcyBhIHdvcmtpbmcgd2VidmlldycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcmVzID0gYXdhaXQgY2QuaGFzV29ya2luZ1dlYnZpZXcoKTtcbiAgICByZXMuc2hvdWxkLmVxdWFsKHRydWUpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCByZXN0YXJ0IGEgc2Vzc2lvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcDEgPSBuZXh0U3RhdGUoY2QpO1xuICAgIGxldCByZXN0YXJ0UHJvbWlzZSA9IGNkLnJlc3RhcnQoKTtcbiAgICBhd2FpdCBwMS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9SRVNUQVJUSU5HKTtcbiAgICAvLyB3ZSBtaXNzIHRoZSBvcHBvcnR1bml0eSB0byBsaXN0ZW4gZm9yIHRoZSAnc3RhcnRpbmcnIHN0YXRlXG4gICAgYXdhaXQgbmV4dFN0YXRlKGNkKS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9PTkxJTkUpO1xuXG4gICAgYXdhaXQgcmVzdGFydFByb21pc2U7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0b3AgYSBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBuZXh0U3RhdGVQcm9taXNlID0gbmV4dFN0YXRlKGNkKTtcbiAgICBjZC5zdG9wKCk7XG4gICAgYXdhaXQgbmV4dFN0YXRlUHJvbWlzZS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9TVE9QUElORyk7XG4gICAgc2hvdWxkLm5vdC5leGlzdChjZC5zZXNzaW9uSWQoKSk7XG4gICAgYXdhaXQgbmV4dFN0YXRlKGNkKS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEKTtcbiAgICBzaG91bGQubm90LmV4aXN0KGNkLnNlc3Npb25JZCgpKTtcbiAgICBhd2FpdCBhc3NlcnROb1J1bm5pbmdDaHJvbWVkcml2ZXJzKCk7XG4gIH0pO1xuICBpdC5za2lwKCdzaG91bGQgY2hhbmdlIHN0YXRlIHRvIHN0b3BwZWQgaWYgY2hyb21lZHJpdmVyIGNyYXNoZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgLy8gdGVzdCB3b3JrcyBidXQgaXMgc2tpcHBlZCBiZWNhdXNlIGl0IGxlYXZlcyBhIGNocm9tZSB3aW5kb3cgb3JwaGFuZWRcbiAgICAvLyBhbmQgSSBjYW4ndCBmaWd1cmUgb3V0IGEgd2F5IHRvIHNhZmVseSBraWxsIG9ubHkgdGhhdCBvbmVcbiAgICBjZC5zdGF0ZS5zaG91bGQuZXFsKENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEKTtcbiAgICBsZXQgbmV4dFN0YXRlUHJvbWlzZSA9IG5leHRTdGF0ZShjZCk7XG4gICAgY2Quc3RhcnQoY2Fwcyk7XG4gICAgY2QuY2FwYWJpbGl0aWVzLnNob3VsZC5lcWwoY2Fwcyk7XG4gICAgYXdhaXQgbmV4dFN0YXRlUHJvbWlzZS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9TVEFSVElORyk7XG4gICAgYXdhaXQgbmV4dFN0YXRlKGNkKS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9PTkxJTkUpO1xuICAgIHNob3VsZC5leGlzdChjZC5qd3Byb3h5LnNlc3Npb25JZCk7XG4gICAgc2hvdWxkLmV4aXN0KGNkLnNlc3Npb25JZCgpKTtcbiAgICBuZXh0U3RhdGVQcm9taXNlID0gbmV4dFN0YXRlKGNkKTtcbiAgICBhd2FpdCBjZC5raWxsQWxsKCk7XG4gICAgYXdhaXQgbmV4dFN0YXRlUHJvbWlzZS5zaG91bGQuYmVjb21lKENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBjaHJvbWVkcml2ZXIgZG9lc250IGV4aXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjZDIgPSBuZXcgQ2hyb21lZHJpdmVyKHtcbiAgICAgIGV4ZWN1dGFibGU6ICcvZG9lcy9ub3QvZXhpc3QnLFxuICAgIH0pO1xuICAgIGxldCBuZXh0RXJyUCA9IG5leHRFcnJvcihjZDIpO1xuICAgIGF3YWl0IGNkMi5zdGFydCh7fSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9UcnlpbmcgdG8gdXNlLyk7XG4gICAgbGV0IGVyciA9IGF3YWl0IG5leHRFcnJQO1xuICAgIGVyci5tZXNzYWdlLnNob3VsZC5jb250YWluKCdUcnlpbmcgdG8gdXNlJyk7XG4gIH0pO1xufSk7XG5cblxuZGVzY3JpYmUoJ2Nocm9tZWRyaXZlciB3aXRoIGFzeW5jL2F3YWl0JywgZnVuY3Rpb24gKCkge1xuICB0aGlzLnRpbWVvdXQoMTIwMDAwKTtcbiAgbGV0IGNkID0gbnVsbDtcbiAgY29uc3QgY2FwcyA9IHticm93c2VyTmFtZTogJ2Nocm9tZSd9O1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNkID0gbmV3IENocm9tZWRyaXZlcih7fSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0YXJ0IGEgc2Vzc2lvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjZC5zdGF0ZS5zaG91bGQuZXFsKCdzdG9wcGVkJyk7XG4gICAgc2hvdWxkLm5vdC5leGlzdChjZC5zZXNzaW9uSWQoKSk7XG4gICAgYXdhaXQgY2Quc3RhcnQoY2Fwcyk7XG4gICAgY2QuY2FwYWJpbGl0aWVzLnNob3VsZC5lcWwoY2Fwcyk7XG4gICAgY2Quc3RhdGUuc2hvdWxkLmVxbChDaHJvbWVkcml2ZXIuU1RBVEVfT05MSU5FKTtcbiAgICBzaG91bGQuZXhpc3QoY2Quandwcm94eS5zZXNzaW9uSWQpO1xuICAgIHNob3VsZC5leGlzdChjZC5zZXNzaW9uSWQoKSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJlc3RhcnQgYSBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNkLnN0YXRlLnNob3VsZC5lcWwoQ2hyb21lZHJpdmVyLlNUQVRFX09OTElORSk7XG4gICAgYXdhaXQgY2QucmVzdGFydCgpO1xuICAgIGNkLnN0YXRlLnNob3VsZC5lcWwoQ2hyb21lZHJpdmVyLlNUQVRFX09OTElORSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0b3AgYSBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNkLnN0YXRlLnNob3VsZC5lcWwoQ2hyb21lZHJpdmVyLlNUQVRFX09OTElORSk7XG4gICAgYXdhaXQgY2Quc3RvcCgpO1xuICAgIGNkLnN0YXRlLnNob3VsZC5lcWwoQ2hyb21lZHJpdmVyLlNUQVRFX1NUT1BQRUQpO1xuICAgIHNob3VsZC5ub3QuZXhpc3QoY2Quc2Vzc2lvbklkKCkpO1xuICAgIGF3YWl0IGFzc2VydE5vUnVubmluZ0Nocm9tZWRyaXZlcnMoKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgZHVyaW5nIHN0YXJ0IGlmIHNwYXduIGRvZXMgbm90IHdvcmsnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGJhZENkID0gbmV3IENocm9tZWRyaXZlcih7XG4gICAgICBwb3J0OiAxLFxuICAgIH0pO1xuICAgIGF3YWl0IGJhZENkLnN0YXJ0KGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnQ2hyb21lRHJpdmVyIGNyYXNoZWQgZHVyaW5nIHN0YXJ0dXAnKTtcbiAgICBhd2FpdCBhc3NlcnROb1J1bm5pbmdDaHJvbWVkcml2ZXJzKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGR1cmluZyBzdGFydCBpZiBzZXNzaW9uIGRvZXMgbm90IHdvcmsnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGJhZENkID0gbmV3IENocm9tZWRyaXZlcih7fSk7XG4gICAgYXdhaXQgYmFkQ2Quc3RhcnQoe2Nocm9tZU9wdGlvbnM6IHtiYWRDYXA6ICdmb28nfX0pXG4gICAgICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKCdjYW5ub3QgcGFyc2UgY2FwYWJpbGl0eScpO1xuICAgIGF3YWl0IGFzc2VydE5vUnVubmluZ0Nocm9tZWRyaXZlcnMoKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==

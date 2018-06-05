'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('timeout', function () {
  var driver = new _2['default']();
  var implicitWaitSpy = undefined,
      newCommandTimeoutSpy = undefined;
  before(function () {
    implicitWaitSpy = _sinon2['default'].spy(driver, 'setImplicitWait');
    newCommandTimeoutSpy = _sinon2['default'].spy(driver, 'setNewCommandTimeout');
  });
  beforeEach(function () {
    driver.implicitWaitMs = 0;
  });
  afterEach(function () {
    implicitWaitSpy.reset();
    newCommandTimeoutSpy.reset();
  });
  describe('timeouts', function () {
    describe('errors', function () {
      it('should throw an error if something random is sent', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'random timeout', ms: 'howdy' }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97").should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw an error if timeout is negative', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'random timeout', ms: -42 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97").should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw an errors if timeout type is unknown', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'random timeout', ms: 42 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97").should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw an error if something random is sent to scriptDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.W3C, script: 123, pageLoad: undefined, implicit: undefined }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97").should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw an error if something random is sent to pageLoadDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: 123, implicit: undefined }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97").should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('implicit wait', function () {
      it('should call setImplicitWait when given an integer', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'implicit', ms: 42 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 2:
              implicitWaitSpy.calledOnce.should.be['true'];
              implicitWaitSpy.firstCall.args[0].should.equal(42);
              driver.implicitWaitMs.should.eql(42);

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call setImplicitWait when given a string', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'implicit', ms: '42' }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 2:
              implicitWaitSpy.calledOnce.should.be['true'];
              implicitWaitSpy.firstCall.args[0].should.equal(42);
              driver.implicitWaitMs.should.eql(42);

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should call setImplicitWait when given an integer to implicitDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: 42 }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 2:
              implicitWaitSpy.calledOnce.should.be['true'];
              implicitWaitSpy.firstCall.args[0].should.equal(42);
              driver.implicitWaitMs.should.eql(42);

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call setImplicitWait when given a string to implicitDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts({ protocol: _2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: '42' }, "1dcfe021-8fc8-49bd-8dac-e986d3091b97"));

            case 2:
              implicitWaitSpy.calledOnce.should.be['true'];
              implicitWaitSpy.firstCall.args[0].should.equal(42);
              driver.implicitWaitMs.should.eql(42);

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
  });
  describe('implicitWait', function () {
    it('should call setImplicitWait when given an integer', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.setImplicitWait(42);
            implicitWaitSpy.calledOnce.should.be['true'];
            implicitWaitSpy.firstCall.args[0].should.equal(42);
            driver.implicitWaitMs.should.eql(42);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call setImplicitWait when given a string', function () {
      driver.implicitWait('42');
      implicitWaitSpy.calledOnce.should.be['true'];
      implicitWaitSpy.firstCall.args[0].should.equal(42);
      driver.implicitWaitMs.should.eql(42);
    });
    it('should throw an error if something random is sent', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait('howdy').should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if timeout is negative', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait(-42).should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('set implicit wait', function () {
    it('should set the implicit wait with an integer', function () {
      driver.setImplicitWait(42);
      driver.implicitWaitMs.should.eql(42);
    });
    describe('with managed driver', function () {
      var managedDriver1 = new _2['default']();
      var managedDriver2 = new _2['default']();
      before(function () {
        driver.addManagedDriver(managedDriver1);
        driver.addManagedDriver(managedDriver2);
      });
      after(function () {
        driver.managedDrivers = [];
      });
      it('should set the implicit wait on managed drivers', function () {
        driver.setImplicitWait(42);
        driver.implicitWaitMs.should.eql(42);
        managedDriver1.implicitWaitMs.should.eql(42);
        managedDriver2.implicitWaitMs.should.eql(42);
      });
    });
  });
  describe('set new command timeout', function () {
    it('should set the new command timeout with an integer', function () {
      driver.setNewCommandTimeout(42);
      driver.newCommandTimeoutMs.should.eql(42);
    });
    describe('with managed driver', function () {
      var managedDriver1 = new _2['default']();
      var managedDriver2 = new _2['default']();
      before(function () {
        driver.addManagedDriver(managedDriver1);
        driver.addManagedDriver(managedDriver2);
      });
      after(function () {
        driver.managedDrivers = [];
      });
      it('should set the new command timeout on managed drivers', function () {
        driver.setNewCommandTimeout(42);
        driver.newCommandTimeoutMs.should.eql(42);
        managedDriver1.newCommandTimeoutMs.should.eql(42);
        managedDriver2.newCommandTimeoutMs.should.eql(42);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci90aW1lb3V0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDdEIsT0FBTzs7OztxQkFDWixPQUFPOzs7O0FBR3pCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFHekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLE1BQUksTUFBTSxHQUFHLG1CQUFnQixDQUFDO0FBQzlCLE1BQUksZUFBZSxZQUFBO01BQUUsb0JBQW9CLFlBQUEsQ0FBQztBQUMxQyxRQUFNLENBQUMsWUFBTTtBQUNYLG1CQUFlLEdBQUcsbUJBQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZELHdCQUFvQixHQUFHLG1CQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztHQUNsRSxDQUFDLENBQUM7QUFDSCxZQUFVLENBQUMsWUFBTTtBQUNmLFVBQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0dBQzNCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFNO0FBQ2QsbUJBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4Qix3QkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUM5QixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsVUFBVSxFQUFFLFlBQU07QUFDekIsWUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQ3ZCLFFBQUUsQ0FBQyxtREFBbUQsRUFBRTs7Ozs7K0NBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsY0FBVyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFDLEVBQUUsc0NBQXNDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFR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QUM7QUFDdEMsVUFBSSxjQUFjLEdBQUcsbUJBQWdCLENBQUM7QUFDdEMsWUFBTSxDQUFDLFlBQU07QUFDWCxjQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEMsY0FBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO09BQ3pDLENBQUMsQ0FBQztBQUNILFdBQUssQ0FBQyxZQUFNO0FBQ1YsY0FBTSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7T0FDNUIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLHVEQUF1RCxFQUFFLFlBQU07QUFDaEUsY0FBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLGNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLHNCQUFjLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsRCxzQkFBYyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDbkQsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvYmFzZWRyaXZlci90aW1lb3V0LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQmFzZURyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cblxuZGVzY3JpYmUoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gIGxldCBkcml2ZXIgPSBuZXcgQmFzZURyaXZlcigpO1xuICBsZXQgaW1wbGljaXRXYWl0U3B5LCBuZXdDb21tYW5kVGltZW91dFNweTtcbiAgYmVmb3JlKCgpID0+IHtcbiAgICBpbXBsaWNpdFdhaXRTcHkgPSBzaW5vbi5zcHkoZHJpdmVyLCAnc2V0SW1wbGljaXRXYWl0Jyk7XG4gICAgbmV3Q29tbWFuZFRpbWVvdXRTcHkgPSBzaW5vbi5zcHkoZHJpdmVyLCAnc2V0TmV3Q29tbWFuZFRpbWVvdXQnKTtcbiAgfSk7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGRyaXZlci5pbXBsaWNpdFdhaXRNcyA9IDA7XG4gIH0pO1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGltcGxpY2l0V2FpdFNweS5yZXNldCgpO1xuICAgIG5ld0NvbW1hbmRUaW1lb3V0U3B5LnJlc2V0KCk7XG4gIH0pO1xuICBkZXNjcmliZSgndGltZW91dHMnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2Vycm9ycycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgc29tZXRoaW5nIHJhbmRvbSBpcyBzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQLCB0eXBlOiAncmFuZG9tIHRpbWVvdXQnLCBtczogJ2hvd2R5J30sIFwiMWRjZmUwMjEtOGZjOC00OWJkLThkYWMtZTk4NmQzMDkxYjk3XCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHRpbWVvdXQgaXMgbmVnYXRpdmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLk1KU09OV1AsIHR5cGU6ICdyYW5kb20gdGltZW91dCcsIG1zOiAtNDJ9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvcnMgaWYgdGltZW91dCB0eXBlIGlzIHVua25vd24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLk1KU09OV1AsIHR5cGU6ICdyYW5kb20gdGltZW91dCcsIG1zOiA0Mn0sIFwiMWRjZmUwMjEtOGZjOC00OWJkLThkYWMtZTk4NmQzMDkxYjk3XCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNvbWV0aGluZyByYW5kb20gaXMgc2VudCB0byBzY3JpcHREdXJhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IDEyMywgcGFnZUxvYWQ6IHVuZGVmaW5lZCwgaW1wbGljaXQ6IHVuZGVmaW5lZH0sIFwiMWRjZmUwMjEtOGZjOC00OWJkLThkYWMtZTk4NmQzMDkxYjk3XCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNvbWV0aGluZyByYW5kb20gaXMgc2VudCB0byBwYWdlTG9hZER1cmF0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MsIHNjcmlwdDogdW5kZWZpbmVkLCBwYWdlTG9hZDogMTIzLCBpbXBsaWNpdDogdW5kZWZpbmVkfSwgXCIxZGNmZTAyMS04ZmM4LTQ5YmQtOGRhYy1lOTg2ZDMwOTFiOTdcIikuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnaW1wbGljaXQgd2FpdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzZXRJbXBsaWNpdFdhaXQgd2hlbiBnaXZlbiBhbiBpbnRlZ2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQLCB0eXBlOiAnaW1wbGljaXQnLCBtczogNDJ9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgaW1wbGljaXRXYWl0U3B5LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgICAgIGltcGxpY2l0V2FpdFNweS5maXJzdENhbGwuYXJnc1swXS5zaG91bGQuZXF1YWwoNDIpO1xuICAgICAgICBkcml2ZXIuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzZXRJbXBsaWNpdFdhaXQgd2hlbiBnaXZlbiBhIHN0cmluZycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuTUpTT05XUCwgdHlwZTogJ2ltcGxpY2l0JywgbXM6ICc0Mid9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgaW1wbGljaXRXYWl0U3B5LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgICAgIGltcGxpY2l0V2FpdFNweS5maXJzdENhbGwuYXJnc1swXS5zaG91bGQuZXF1YWwoNDIpO1xuICAgICAgICBkcml2ZXIuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNldEltcGxpY2l0V2FpdCB3aGVuIGdpdmVuIGFuIGludGVnZXIgdG8gaW1wbGljaXREdXJhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IHVuZGVmaW5lZCwgaW1wbGljaXQ6IDQyfSwgXCIxZGNmZTAyMS04ZmM4LTQ5YmQtOGRhYy1lOTg2ZDMwOTFiOTdcIik7XG4gICAgICAgIGltcGxpY2l0V2FpdFNweS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBpbXBsaWNpdFdhaXRTcHkuZmlyc3RDYWxsLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDQyKTtcbiAgICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2V0SW1wbGljaXRXYWl0IHdoZW4gZ2l2ZW4gYSBzdHJpbmcgdG8gaW1wbGljaXREdXJhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IHVuZGVmaW5lZCwgaW1wbGljaXQ6ICc0Mid9LCBcIjFkY2ZlMDIxLThmYzgtNDliZC04ZGFjLWU5ODZkMzA5MWI5N1wiKTtcbiAgICAgICAgaW1wbGljaXRXYWl0U3B5LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgICAgIGltcGxpY2l0V2FpdFNweS5maXJzdENhbGwuYXJnc1swXS5zaG91bGQuZXF1YWwoNDIpO1xuICAgICAgICBkcml2ZXIuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdpbXBsaWNpdFdhaXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldEltcGxpY2l0V2FpdCB3aGVuIGdpdmVuIGFuIGludGVnZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIuc2V0SW1wbGljaXRXYWl0KDQyKTtcbiAgICAgIGltcGxpY2l0V2FpdFNweS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgaW1wbGljaXRXYWl0U3B5LmZpcnN0Q2FsbC5hcmdzWzBdLnNob3VsZC5lcXVhbCg0Mik7XG4gICAgICBkcml2ZXIuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldEltcGxpY2l0V2FpdCB3aGVuIGdpdmVuIGEgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdCgnNDInKTtcbiAgICAgIGltcGxpY2l0V2FpdFNweS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgaW1wbGljaXRXYWl0U3B5LmZpcnN0Q2FsbC5hcmdzWzBdLnNob3VsZC5lcXVhbCg0Mik7XG4gICAgICBkcml2ZXIuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBzb21ldGhpbmcgcmFuZG9tIGlzIHNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuaW1wbGljaXRXYWl0KCdob3dkeScpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgdGltZW91dCBpcyBuZWdhdGl2ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5pbXBsaWNpdFdhaXQoLTQyKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3NldCBpbXBsaWNpdCB3YWl0JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc2V0IHRoZSBpbXBsaWNpdCB3YWl0IHdpdGggYW4gaW50ZWdlcicsICgpID0+IHtcbiAgICAgIGRyaXZlci5zZXRJbXBsaWNpdFdhaXQoNDIpO1xuICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCd3aXRoIG1hbmFnZWQgZHJpdmVyJywgKCkgPT4ge1xuICAgICAgbGV0IG1hbmFnZWREcml2ZXIxID0gbmV3IEJhc2VEcml2ZXIoKTtcbiAgICAgIGxldCBtYW5hZ2VkRHJpdmVyMiA9IG5ldyBCYXNlRHJpdmVyKCk7XG4gICAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgICBkcml2ZXIuYWRkTWFuYWdlZERyaXZlcihtYW5hZ2VkRHJpdmVyMSk7XG4gICAgICAgIGRyaXZlci5hZGRNYW5hZ2VkRHJpdmVyKG1hbmFnZWREcml2ZXIyKTtcbiAgICAgIH0pO1xuICAgICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgICBkcml2ZXIubWFuYWdlZERyaXZlcnMgPSBbXTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGltcGxpY2l0IHdhaXQgb24gbWFuYWdlZCBkcml2ZXJzJywgKCkgPT4ge1xuICAgICAgICBkcml2ZXIuc2V0SW1wbGljaXRXYWl0KDQyKTtcbiAgICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgICBtYW5hZ2VkRHJpdmVyMS5pbXBsaWNpdFdhaXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICAgICAgbWFuYWdlZERyaXZlcjIuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXQgbmV3IGNvbW1hbmQgdGltZW91dCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgbmV3IGNvbW1hbmQgdGltZW91dCB3aXRoIGFuIGludGVnZXInLCAoKSA9PiB7XG4gICAgICBkcml2ZXIuc2V0TmV3Q29tbWFuZFRpbWVvdXQoNDIpO1xuICAgICAgZHJpdmVyLm5ld0NvbW1hbmRUaW1lb3V0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3dpdGggbWFuYWdlZCBkcml2ZXInLCAoKSA9PiB7XG4gICAgICBsZXQgbWFuYWdlZERyaXZlcjEgPSBuZXcgQmFzZURyaXZlcigpO1xuICAgICAgbGV0IG1hbmFnZWREcml2ZXIyID0gbmV3IEJhc2VEcml2ZXIoKTtcbiAgICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICAgIGRyaXZlci5hZGRNYW5hZ2VkRHJpdmVyKG1hbmFnZWREcml2ZXIxKTtcbiAgICAgICAgZHJpdmVyLmFkZE1hbmFnZWREcml2ZXIobWFuYWdlZERyaXZlcjIpO1xuICAgICAgfSk7XG4gICAgICBhZnRlcigoKSA9PiB7XG4gICAgICAgIGRyaXZlci5tYW5hZ2VkRHJpdmVycyA9IFtdO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHNldCB0aGUgbmV3IGNvbW1hbmQgdGltZW91dCBvbiBtYW5hZ2VkIGRyaXZlcnMnLCAoKSA9PiB7XG4gICAgICAgIGRyaXZlci5zZXROZXdDb21tYW5kVGltZW91dCg0Mik7XG4gICAgICAgIGRyaXZlci5uZXdDb21tYW5kVGltZW91dE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgICBtYW5hZ2VkRHJpdmVyMS5uZXdDb21tYW5kVGltZW91dE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgICBtYW5hZ2VkRHJpdmVyMi5uZXdDb21tYW5kVGltZW91dE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

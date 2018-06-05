'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('wifi @skip-ci', function () {
  var _this = this;

  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, { appActivity: '.view.TextFields' })));

        case 2:
          driver = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it.skip('should enable WIFI', function callee$1$0() {
    var WIFI;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          WIFI = 2;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.setNetworkConnection(WIFI));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.isWifiOn().should.eventually.equal(true));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// TODO: This is returning Permission Denial: not allowed to send broadcast android.intent.action.AIRPLANE_MODE from pid=25928, uid=2000; also isWifiOn is not a method
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL25ldHdvcmstZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt1QkFDZixlQUFlOzs4QkFDbEIsdUJBQXVCOztBQUdsRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTs7O0FBQ3BDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7OzJDQUNVLGdDQUFXLGVBQWMsRUFBRSwwQkFBaUIsRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDOzs7QUFBOUYsZ0JBQU07Ozs7Ozs7R0FDUCxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtRQUV4QixJQUFJOzs7O0FBQUosY0FBSSxHQUFHLENBQUM7OzJDQUNOLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ2pDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDdEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL25ldHdvcmstZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnd2lmaSBAc2tpcC1jaScsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKE9iamVjdC5hc3NpZ24oe30sIEFQSURFTU9TX0NBUFMsIHthcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnfSkpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBpdC5za2lwKCdzaG91bGQgZW5hYmxlIFdJRkknLCBhc3luYyAoKSA9PiB7XG4gICAgLy8gVE9ETzogVGhpcyBpcyByZXR1cm5pbmcgUGVybWlzc2lvbiBEZW5pYWw6IG5vdCBhbGxvd2VkIHRvIHNlbmQgYnJvYWRjYXN0IGFuZHJvaWQuaW50ZW50LmFjdGlvbi5BSVJQTEFORV9NT0RFIGZyb20gcGlkPTI1OTI4LCB1aWQ9MjAwMDsgYWxzbyBpc1dpZmlPbiBpcyBub3QgYSBtZXRob2RcbiAgICBsZXQgV0lGSSA9IDI7XG4gICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKFdJRkkpO1xuICAgIGF3YWl0IGRyaXZlci5pc1dpZmlPbigpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKHRydWUpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9

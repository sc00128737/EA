'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _helpers = require('./helpers');

var _desired = require('./desired');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var AVD_ANDROID_24_WITHOUT_GMS = process.env.ANDROID_24_NO_GMS_AVD || 'Nexus_5_API_24';
var CHROMEDRIVER_2_20_EXECUTABLE = process.env.CHROME_2_20_EXECUTABLE;

// for reasons that remain unclear, this particular webview-based browser
// will not connect to localhost/loopback, even on emulators
var HOST = _appiumSupport.util.localIp();
var PORT = 4723;

describe('Android 7 Webview Browser tester', function () {
  var driver = undefined;
  var server = undefined;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.REAL_DEVICE) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _helpers.ensureAVDExists)(this, AVD_ANDROID_24_WITHOUT_GMS));

        case 4:
          if (context$2$0.sent) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  beforeEach(function callee$1$0() {
    var capabilities;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = _lodash2['default'];
          context$2$0.t1 = AVD_ANDROID_24_WITHOUT_GMS;
          context$2$0.t2 = CHROMEDRIVER_2_20_EXECUTABLE;

          if (context$2$0.t2) {
            context$2$0.next = 7;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _helpers.getChromedriver220Asset)());

        case 6:
          context$2$0.t2 = context$2$0.sent;

        case 7:
          context$2$0.t3 = context$2$0.t2;
          context$2$0.t4 = {
            browserName: 'chromium-webview',
            avd: context$2$0.t1,
            platformVersion: '7.0',
            chromedriverExecutable: context$2$0.t3
          };
          context$2$0.t5 = _desired.CHROME_CAPS;
          capabilities = context$2$0.t0.defaults.call(context$2$0.t0, context$2$0.t4, context$2$0.t5);

          driver = new _2.AndroidDriver();
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(driver.createSession(capabilities));

        case 14:
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap((0, _2.startServer)(PORT, HOST));

        case 16:
          server = context$2$0.sent;

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 3:
          if (!server) {
            context$2$0.next = 6;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(server.close());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should start android session using webview browser tester', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setUrl('http://' + HOST + ':' + PORT + '/test/guinea-pig'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getCurrentContext().should.eventually.eql("CHROMIUM"));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'i am a link', false));

        case 6:
          el = context$2$0.sent;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'I am another page title', false));

        case 11:
          el = context$2$0.sent;

          el.should.exist;

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// await driver.setUrl('http://google.com');

// make sure we are in the right context
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC93ZWJ2aWV3LWJyb3dzZXItdGVzdGVyLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNGLE9BQU87O3VCQUNPLFdBQVc7O3VCQUN4QyxXQUFXOztzQkFDekIsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSwwQkFBMEIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLGdCQUFnQixDQUFDO0FBQ3pGLElBQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7OztBQUl4RSxJQUFNLElBQUksR0FBRyxvQkFBSyxPQUFPLEVBQUUsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWxCLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxZQUFZO0FBQ3ZELE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFFBQU0sQ0FBQzs7OztlQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVzs7Ozs7OENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7MkNBRVQsOEJBQWdCLElBQUksRUFBRSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0dBRzdELENBQUMsQ0FBQztBQUNILFlBQVUsQ0FBQztRQUNILFlBQVk7Ozs7OzJCQUVYLDBCQUEwQjsyQkFFUCw0QkFBNEI7Ozs7Ozs7OzJDQUFVLHVDQUF5Qjs7Ozs7Ozs7QUFIdkYsdUJBQVcsRUFBRSxrQkFBa0I7QUFDL0IsZUFBRztBQUNILDJCQUFlLEVBQUUsS0FBSztBQUN0QixrQ0FBc0I7OztBQUpsQixzQkFBWSxrQkFBSyxRQUFROztBQU8vQixnQkFBTSxHQUFHLHNCQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7Ozs7MkNBQ3pCLG9CQUFZLElBQUksRUFBRSxJQUFJLENBQUM7OztBQUF0QyxnQkFBTTs7Ozs7OztHQUNQLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7OztlQUNKLE1BQU07Ozs7OzsyQ0FDRixNQUFNLENBQUMsYUFBYSxFQUFFOzs7ZUFFMUIsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Ozs7Ozs7R0FFdkIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQywyREFBMkQsRUFBRTtRQU8xRCxFQUFFOzs7OzsyQ0FMQSxNQUFNLENBQUMsTUFBTSxhQUFXLElBQUksU0FBSSxJQUFJLHNCQUFtQjs7OzsyQ0FHdkQsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzs7OzJDQUVuRCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDOzs7QUFBekQsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzJDQUVuQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLENBQUM7OztBQUFyRSxZQUFFOztBQUNGLFlBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQ2pCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvd2Vidmlldy1icm93c2VyLXRlc3Rlci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IEFuZHJvaWREcml2ZXIsIHN0YXJ0U2VydmVyIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgZW5zdXJlQVZERXhpc3RzLCBnZXRDaHJvbWVkcml2ZXIyMjBBc3NldCB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBDSFJPTUVfQ0FQUyB9IGZyb20gJy4vZGVzaXJlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBBVkRfQU5EUk9JRF8yNF9XSVRIT1VUX0dNUyA9IHByb2Nlc3MuZW52LkFORFJPSURfMjRfTk9fR01TX0FWRCB8fCAnTmV4dXNfNV9BUElfMjQnO1xuY29uc3QgQ0hST01FRFJJVkVSXzJfMjBfRVhFQ1VUQUJMRSA9IHByb2Nlc3MuZW52LkNIUk9NRV8yXzIwX0VYRUNVVEFCTEU7XG5cbi8vIGZvciByZWFzb25zIHRoYXQgcmVtYWluIHVuY2xlYXIsIHRoaXMgcGFydGljdWxhciB3ZWJ2aWV3LWJhc2VkIGJyb3dzZXJcbi8vIHdpbGwgbm90IGNvbm5lY3QgdG8gbG9jYWxob3N0L2xvb3BiYWNrLCBldmVuIG9uIGVtdWxhdG9yc1xuY29uc3QgSE9TVCA9IHV0aWwubG9jYWxJcCgpO1xuY29uc3QgUE9SVCA9IDQ3MjM7XG5cbmRlc2NyaWJlKCdBbmRyb2lkIDcgV2VidmlldyBCcm93c2VyIHRlc3RlcicsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgbGV0IHNlcnZlcjtcblxuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5SRUFMX0RFVklDRSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xuICAgIH1cbiAgICBpZiAoIWF3YWl0IGVuc3VyZUFWREV4aXN0cyh0aGlzLCBBVkRfQU5EUk9JRF8yNF9XSVRIT1VUX0dNUykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBfLmRlZmF1bHRzKHtcbiAgICAgIGJyb3dzZXJOYW1lOiAnY2hyb21pdW0td2VidmlldycsXG4gICAgICBhdmQ6IEFWRF9BTkRST0lEXzI0X1dJVEhPVVRfR01TLFxuICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnNy4wJyxcbiAgICAgIGNocm9tZWRyaXZlckV4ZWN1dGFibGU6IENIUk9NRURSSVZFUl8yXzIwX0VYRUNVVEFCTEUgfHwgYXdhaXQgZ2V0Q2hyb21lZHJpdmVyMjIwQXNzZXQoKSxcbiAgICB9LCBDSFJPTUVfQ0FQUyk7XG5cbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcGFiaWxpdGllcyk7XG4gICAgc2VydmVyID0gYXdhaXQgc3RhcnRTZXJ2ZXIoUE9SVCwgSE9TVCk7XG4gIH0pO1xuICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChkcml2ZXIpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfVxuICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgIGF3YWl0IHNlcnZlci5jbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmRyb2lkIHNlc3Npb24gdXNpbmcgd2VidmlldyBicm93c2VyIHRlc3RlcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBhd2FpdCBkcml2ZXIuc2V0VXJsKCdodHRwOi8vZ29vZ2xlLmNvbScpO1xuICAgIGF3YWl0IGRyaXZlci5zZXRVcmwoYGh0dHA6Ly8ke0hPU1R9OiR7UE9SVH0vdGVzdC9ndWluZWEtcGlnYCk7XG5cbiAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIGluIHRoZSByaWdodCBjb250ZXh0XG4gICAgYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRDb250ZXh0KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXFsKFwiQ0hST01JVU1cIik7XG5cbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2kgYW0gYSBsaW5rJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5jbGljayhlbC5FTEVNRU5UKTtcblxuICAgIGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdJIGFtIGFub3RoZXIgcGFnZSB0aXRsZScsIGZhbHNlKTtcbiAgICBlbC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

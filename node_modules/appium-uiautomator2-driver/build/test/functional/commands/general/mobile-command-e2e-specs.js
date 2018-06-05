'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('mobile: shell', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

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
  it('should call execute command without proxy error, but require relaxed security flag', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { command: 'echo', args: ['hello'] }));

        case 3:
          context$2$0.next = 8;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.message.should.match(/Original error: Appium server must have relaxed security flag set in order to run any shell commands/);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[0, 5]]);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL21vYmlsZS1jb21tYW5kLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3VCQUNmLGVBQWU7OzhCQUNsQix1QkFBdUI7O0FBRWxELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7OzJDQUNVLHVEQUF5Qjs7O0FBQXhDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0dBQ3BCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvRkFBb0YsRUFBRTs7Ozs7OzJDQUUvRSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQzs7Ozs7Ozs7OztBQUV6RSx5QkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzR0FBc0csQ0FBQyxDQUFDOzs7Ozs7O0dBRWxJLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9tb2JpbGUtY29tbWFuZC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnbW9iaWxlOiBzaGVsbCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKEFQSURFTU9TX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGNhbGwgZXhlY3V0ZSBjb21tYW5kIHdpdGhvdXQgcHJveHkgZXJyb3IsIGJ1dCByZXF1aXJlIHJlbGF4ZWQgc2VjdXJpdHkgZmxhZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZHJpdmVyLmV4ZWN1dGUoJ21vYmlsZTogc2hlbGwnLCB7Y29tbWFuZDogJ2VjaG8nLCBhcmdzOiBbJ2hlbGxvJ119KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9PcmlnaW5hbCBlcnJvcjogQXBwaXVtIHNlcnZlciBtdXN0IGhhdmUgcmVsYXhlZCBzZWN1cml0eSBmbGFnIHNldCBpbiBvcmRlciB0byBydW4gYW55IHNoZWxsIGNvbW1hbmRzLyk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9

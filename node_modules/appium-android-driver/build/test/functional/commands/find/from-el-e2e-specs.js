'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var atv = 'android.widget.TextView';
var alv = 'android.widget.ListView';

describe('Find - from element', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

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
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by tag name', function callee$1$0() {
    var el, innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', atv, false, el.ELEMENT));

        case 5:
          innerEl = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(innerEl.ELEMENT).should.eventually.equal("Access'ibility"));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by tag name', function callee$1$0() {
    var el, innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', atv, true, el.ELEMENT));

        case 5:
          innerEl = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(innerEl[0].ELEMENT).should.eventually.have.length.above(10));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false, el.ELEMENT).should.be.rejectedWith(/could not be located/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find multiple elements that dont exist', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, true));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false, el.ELEMENT).should.be.rejectedWith(/could not be located/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2Zyb20tZWwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO0FBQ3RDLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDOztBQUV0QyxRQUFRLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUMxQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMENBQTBDLEVBQUU7UUFDekMsRUFBRSxFQUNGLE9BQU87Ozs7OzJDQURJLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7OztBQUF2RCxZQUFFOzsyQ0FDYyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7OztBQUF4RSxpQkFBTzs7MkNBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Ozs7Ozs7R0FDaEYsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDJDQUEyQyxFQUFFO1FBQzFDLEVBQUUsRUFDRixPQUFPOzs7OzsyQ0FESSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDOzs7QUFBdkQsWUFBRTs7MkNBQ2MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7QUFBdkUsaUJBQU87OzJDQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDOzs7Ozs7O0dBQ2pGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtRQUM3QyxFQUFFOzs7OzsyQ0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDOzs7QUFBdkQsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQ3BFLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7O0dBQ2xELENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxtREFBbUQsRUFBRTtRQUNsRCxFQUFFOzs7OzsyQ0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDOzs7QUFBdEQsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQ3BFLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7O0dBQ2xELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9mcm9tLWVsLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBhdHYgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xuY29uc3QgYWx2ID0gJ2FuZHJvaWQud2lkZ2V0Lkxpc3RWaWV3JztcblxuZGVzY3JpYmUoJ0ZpbmQgLSBmcm9tIGVsZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSB0YWcgbmFtZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBhbHYsIGZhbHNlKTtcbiAgICBsZXQgaW5uZXJFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGF0diwgZmFsc2UsIGVsLkVMRU1FTlQpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGlubmVyRWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoXCJBY2Nlc3MnaWJpbGl0eVwiKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSB0YWcgbmFtZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBhbHYsIGZhbHNlKTtcbiAgICBsZXQgaW5uZXJFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGF0diwgdHJ1ZSwgZWwuRUxFTUVOVCk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoaW5uZXJFbFswXS5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hYm92ZSgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgdGhhdCBkb2VzbnQgZXhpc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgYWx2LCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2JsYXJnaW1hcmcnLCBmYWxzZSwgZWwuRUxFTUVOVClcbiAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgYmUgbG9jYXRlZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGRvbnQgZXhpc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgYWx2LCB0cnVlKTtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYmxhcmdpbWFyZycsIGZhbHNlLCBlbC5FTEVNRU5UKVxuICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL2NvdWxkIG5vdCBiZSBsb2NhdGVkLyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=

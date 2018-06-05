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

describe('apidemo - attributes', function () {
  var driver = undefined;
  var animationEl = undefined;

  before(function callee$1$0() {
    var animation;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false));

        case 5:
          animation = context$2$0.sent;

          animationEl = animation.ELEMENT;

        case 7:
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
  it('should be able to find resourceId attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('resourceId', animationEl).should.eventually.become('android:id/text1'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find text attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('text', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find name attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find name attribute, falling back to text', function callee$1$0() {
    var textView, textViewEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.click(animationEl));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

        case 4:
          textView = context$2$0.sent;
          textViewEl = textView[1].ELEMENT;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', textViewEl).should.eventually.become('Bouncing Balls'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.back());

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find content description attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('contentDescription', animationEl).should.eventually.become("Animation"));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find displayed attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('displayed', animationEl).should.eventually.become('true'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find displayed attribute through normal func', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementDisplayed(animationEl).should.eventually.become(true));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to get element location using getLocation', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getLocation(animationEl));

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to get element location using getLocationInView', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getLocationInView(animationEl));

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to get element size', function callee$1$0() {
    var size;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getSize(animationEl));

        case 2:
          size = context$2$0.sent;

          size.width.should.be.at.least(0);
          size.height.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9hdHRyaWJ1dGUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZO0FBQzNDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFNLENBQUM7UUFHRCxTQUFTOzs7O0FBRmIsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7OzJDQUNsQixNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUM7OztBQUE1RSxtQkFBUzs7QUFDYixxQkFBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7R0FDakMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw2Q0FBNkMsRUFBRTs7Ozs7MkNBQzFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDOzs7Ozs7O0dBQ2xHLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx1Q0FBdUMsRUFBRTs7Ozs7MkNBQ3BDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUNyRixDQUFDLENBQUM7QUFDSCxJQUFF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ZHMvYmFzaWMvYXR0cmlidXRlLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIGF0dHJpYnV0ZXMnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGxldCBhbmltYXRpb25FbDtcblxuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcbiAgICBsZXQgYW5pbWF0aW9uID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdhY2Nlc3NpYmlsaXR5IGlkJywgJ0FuaW1hdGlvbicsIGZhbHNlKTtcbiAgICBhbmltYXRpb25FbCA9IGFuaW1hdGlvbi5FTEVNRU5UO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCByZXNvdXJjZUlkIGF0dHJpYnV0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdyZXNvdXJjZUlkJywgYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnYW5kcm9pZDppZC90ZXh0MScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgdGV4dCBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgndGV4dCcsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0FuaW1hdGlvbicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgbmFtZSBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgnbmFtZScsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0FuaW1hdGlvbicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgbmFtZSBhdHRyaWJ1dGUsIGZhbGxpbmcgYmFjayB0byB0ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5jbGljayhhbmltYXRpb25FbCk7XG4gICAgbGV0IHRleHRWaWV3ID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgdHJ1ZSk7XG4gICAgbGV0IHRleHRWaWV3RWwgPSB0ZXh0Vmlld1sxXS5FTEVNRU5UO1xuICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ25hbWUnLCB0ZXh0Vmlld0VsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0JvdW5jaW5nIEJhbGxzJyk7XG4gICAgYXdhaXQgZHJpdmVyLmJhY2soKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIGNvbnRlbnQgZGVzY3JpcHRpb24gYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnREZXNjcmlwdGlvbicsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoXCJBbmltYXRpb25cIik7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBkaXNwbGF5ZWQgYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ2Rpc3BsYXllZCcsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ3RydWUnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIGRpc3BsYXllZCBhdHRyaWJ1dGUgdGhyb3VnaCBub3JtYWwgZnVuYycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudERpc3BsYXllZChhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKHRydWUpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IGxvY2F0aW9uIHVzaW5nIGdldExvY2F0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBsb2NhdGlvbiA9IGF3YWl0IGRyaXZlci5nZXRMb2NhdGlvbihhbmltYXRpb25FbCk7XG4gICAgbG9jYXRpb24ueC5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gICAgbG9jYXRpb24ueS5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGVsZW1lbnQgbG9jYXRpb24gdXNpbmcgZ2V0TG9jYXRpb25JblZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGxvY2F0aW9uID0gYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uSW5WaWV3KGFuaW1hdGlvbkVsKTtcbiAgICBsb2NhdGlvbi54LnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgICBsb2NhdGlvbi55LnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgZWxlbWVudCBzaXplJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzaXplID0gYXdhaXQgZHJpdmVyLmdldFNpemUoYW5pbWF0aW9uRWwpO1xuICAgIHNpemUud2lkdGguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xuICAgIHNpemUuaGVpZ2h0LnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==

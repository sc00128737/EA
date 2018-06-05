'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Find - basic', function () {
  var driver = undefined;
  var singleResourceId = undefined;
  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          adb = new _appiumAdb2['default']({});
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 6:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 >= 21)) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.t1 = 'decor_content_parent';
          context$2$0.next = 12;
          break;

        case 11:
          context$2$0.t1 = 'home';

        case 12:
          singleResourceId = context$2$0.t1;

        case 13:
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
  it('should find a single element by content-description', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Animation'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element by class name', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by class name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false).should.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find multiple elements that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', true).should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should fail on empty locator', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', '', true).should.be.rejectedWith(/selector/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by string id @skip-android-all', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'activity_sample_code', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/' + singleResourceId, false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/text1', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/' + singleResourceId, true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', singleResourceId, false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'text1', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id with implicit package even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', singleResourceId, true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('implicit wait', function () {
    var implicitWait = 5000;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait(implicitWait));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should respect implicit wait with multiple elements', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'there_is_nothing_called_this', true).should.eventually.have.length(0));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should respect implicit wait with a single element', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'there_is_nothing_called_this', false).should.eventually.be.rejectedWith(/could not be located/));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// the app behaves differently on different api levels when it comes to
// which resource ids are available for testing, so we switch here to make
// sure we're using the right resource id below
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtYmFzaWMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7eUJBQ3ZCLFlBQVk7Ozs7dUJBQ0gsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTtBQUNuQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxnQkFBZ0IsWUFBQSxDQUFDO0FBQ3JCLFFBQU0sQ0FBQztRQUdELEdBQUc7Ozs7QUFGUCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7OztBQUNwQyxhQUFHLEdBQUcsMkJBQVEsRUFBRSxDQUFDOzsyQ0FJSSxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OztrQ0FBSSxFQUFFOzs7OzsyQkFBRyxzQkFBc0I7Ozs7OzJCQUFHLE1BQU07OztBQUFsRiwwQkFBZ0I7Ozs7Ozs7R0FDakIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxxREFBcUQsRUFBRTtRQUNwRCxFQUFFOzs7OzsyQ0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUM7OztBQUFyRSxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7R0FDdEUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3JDLEVBQUU7Ozs7OzJDQUFTLE1B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SFAsb0JBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOzs2Q0FDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQ2xFLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7O0FBQ3hELG1CQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7QUFDeEIsYUFBQyxPQUFPLEdBQUcsUUFBUSxDQUFBLENBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzFELGFBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7Ozs7O0tBQ3BELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9maW5kLWJhc2ljLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ0ZpbmQgLSBiYXNpYycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgbGV0IHNpbmdsZVJlc291cmNlSWQ7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xuICAgIGxldCBhZGIgPSBuZXcgQURCKHt9KTtcbiAgICAvLyB0aGUgYXBwIGJlaGF2ZXMgZGlmZmVyZW50bHkgb24gZGlmZmVyZW50IGFwaSBsZXZlbHMgd2hlbiBpdCBjb21lcyB0b1xuICAgIC8vIHdoaWNoIHJlc291cmNlIGlkcyBhcmUgYXZhaWxhYmxlIGZvciB0ZXN0aW5nLCBzbyB3ZSBzd2l0Y2ggaGVyZSB0byBtYWtlXG4gICAgLy8gc3VyZSB3ZSdyZSB1c2luZyB0aGUgcmlnaHQgcmVzb3VyY2UgaWQgYmVsb3dcbiAgICBzaW5nbGVSZXNvdXJjZUlkID0gYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPj0gMjEgPyAnZGVjb3JfY29udGVudF9wYXJlbnQnIDogJ2hvbWUnO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSBjb250ZW50LWRlc2NyaXB0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nLCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0FuaW1hdGlvbicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgYnkgY2xhc3MgbmFtZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnLCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0FQSSBEZW1vcycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIG11bHRpcGxlIGVsZW1lbnRzIGJ5IGNsYXNzIG5hbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgdGhhdCBkb2VzbnQgZXhpc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2JsYXJnaW1hcmcnLCBmYWxzZSlcbiAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgYmUgbG9jYXRlZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGRvZXNudCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYmxhcmdpbWFyZycsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZhaWwgb24gZW1wdHkgbG9jYXRvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnJywgdHJ1ZSkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvc2VsZWN0b3IvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHN0cmluZyBpZCBAc2tpcC1hbmRyb2lkLWFsbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2FjdGl2aXR5X3NhbXBsZV9jb2RlJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBUEkgRGVtb3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHJlc291cmNlLWlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCBgYW5kcm9pZDppZC8ke3NpbmdsZVJlc291cmNlSWR9YCwgZmFsc2UpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgcmVzb3VyY2UtaWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdhbmRyb2lkOmlkL3RleHQxJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgcmVzb3VyY2UtaWQgZXZlbiB3aGVuIHRoZXJlcyBqdXN0IG9uZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgYGFuZHJvaWQ6aWQvJHtzaW5nbGVSZXNvdXJjZUlkfWAsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSByZXNvdXJjZS1pZCB3aXRoIGltcGxpY2l0IHBhY2thZ2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsIHNpbmdsZVJlc291cmNlSWQsIGZhbHNlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgcmVzb3VyY2UtaWQgd2l0aCBpbXBsaWNpdCBwYWNrYWdlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAndGV4dDEnLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSByZXNvdXJjZS1pZCB3aXRoIGltcGxpY2l0IHBhY2thZ2UgZXZlbiB3aGVuIHRoZXJlcyBqdXN0IG9uZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgc2luZ2xlUmVzb3VyY2VJZCwgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgxKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdpbXBsaWNpdCB3YWl0JywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBpbXBsaWNpdFdhaXQgPSA1MDAwO1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuaW1wbGljaXRXYWl0KGltcGxpY2l0V2FpdCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXNwZWN0IGltcGxpY2l0IHdhaXQgd2l0aCBtdWx0aXBsZSBlbGVtZW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBiZWZvcmVNcyA9IERhdGUubm93KCk7XG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ3RoZXJlX2lzX25vdGhpbmdfY2FsbGVkX3RoaXMnLCB0cnVlKVxuICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMCk7XG4gICAgICBsZXQgYWZ0ZXJNcyA9IERhdGUubm93KCk7XG4gICAgICAoYWZ0ZXJNcyAtIGJlZm9yZU1zKS5zaG91bGQuYmUuYmVsb3coaW1wbGljaXRXYWl0ICsgNTAwMCk7XG4gICAgICAoYWZ0ZXJNcyAtIGJlZm9yZU1zKS5zaG91bGQuYmUuYWJvdmUoaW1wbGljaXRXYWl0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlc3BlY3QgaW1wbGljaXQgd2FpdCB3aXRoIGEgc2luZ2xlIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYmVmb3JlTXMgPSBEYXRlLm5vdygpO1xuICAgICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICd0aGVyZV9pc19ub3RoaW5nX2NhbGxlZF90aGlzJywgZmFsc2UpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2NvdWxkIG5vdCBiZSBsb2NhdGVkLyk7XG4gICAgICBsZXQgYWZ0ZXJNcyA9IERhdGUubm93KCk7XG4gICAgICAoYWZ0ZXJNcyAtIGJlZm9yZU1zKS5zaG91bGQuYmUuYmVsb3coaW1wbGljaXRXYWl0ICsgNTAwMCk7XG4gICAgICAoYWZ0ZXJNcyAtIGJlZm9yZU1zKS5zaG91bGQuYmUuYWJvdmUoaW1wbGljaXRXYWl0KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==

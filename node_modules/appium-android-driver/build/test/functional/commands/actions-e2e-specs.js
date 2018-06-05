'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var PNG_MAGIC = '89504e47';
var PNG_MAGIC_LENGTH = 4;

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('actions', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

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

  describe('replaceValue', function () {
    it('should replace existing value in a text field', function callee$2$0() {
      var el;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.t0 = _lodash2['default'];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', true));

          case 3:
            context$3$0.t1 = context$3$0.sent;
            el = context$3$0.t0.last.call(context$3$0.t0, context$3$0.t1);

            el.should.exist;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.setValue('original value', el.ELEMENT));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.replaceValue('replaced value', el.ELEMENT));

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('replaced value'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('key codes', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startActivity(caps.appPackage, caps.appActivity));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should press key code 3 without metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode(3).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should press key code 3 with metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode(3, 193).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should long press key code 3 without metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode(3).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should long press key code 3 with metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode(3, 193).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('getScreenshot', function () {
    it('should return valid base64-encoded screenshot', function callee$2$0() {
      var base64screenshot, imageMagic;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getScreenshot());

          case 2:
            base64screenshot = context$3$0.sent;
            imageMagic = new Buffer(base64screenshot, 'base64').toString('hex', 0, PNG_MAGIC_LENGTH);

            imageMagic.should.be.equal(PNG_MAGIC);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hY3Rpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixVQUFVOzs7O3NCQUN0QixRQUFROzs7O3VCQUNHLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUM7QUFDN0IsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7O0FBRTNCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLElBQUksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDcEIsWUFBVSxFQUFFLHdCQUF3QjtBQUNwQyxhQUFXLEVBQUUsa0JBQWtCO0NBQ2hDLHVCQUFlLENBQUM7O0FBR2pCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWTtBQUM5QixRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDakMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7QUFDbkMsTUFBRSxDQUFDLCtDQUErQyxFQUFFO1VBQzlDLEVBQUU7Ozs7Ozs2Q0FBZ0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFDOzs7O0FBQW5GLGNBQUUsa0JBQUssSUFBSTs7QUFDZixjQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7NkNBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzZDQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs2Q0FFcEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzZDQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZO0FBQ2hDLGNBQVUsQ0FBQzs7Ozs7NkNBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7S0FDOUQsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQywyQ0FBMkMsRUFBRTs7Ozs7NkNBQ3hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztLQUNwRCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsd0NBQXdDLEVBQUU7Ozs7OzZDQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3pELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnREFBZ0QsRUFBRTs7Ozs7NkNBQzdDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3hELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyw2Q0FBNkMsRUFBRTs7Ozs7NkNBQzFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztLQUM3RCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTtVQUM1QyxnQkFBZ0IsRUFDaEIsVUFBVTs7Ozs7NkNBRGUsTUFBTSxDQUFDLGFBQWEsRUFBRTs7O0FBQS9DLDRCQUFnQjtBQUNoQixzQkFBVSxHQUFHLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixDQUFDOztBQUM5RixzQkFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7O0tBQ3ZDLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvYWN0aW9ucy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IFBOR19NQUdJQyA9ICc4OTUwNGU0Nyc7XG5jb25zdCBQTkdfTUFHSUNfTEVOR1RIID0gNDtcblxubGV0IGRyaXZlcjtcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XG4gIGFwcFBhY2thZ2U6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyxcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xufSwgREVGQVVMVF9DQVBTKTtcblxuXG5kZXNjcmliZSgnYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXBsYWNlVmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZXBsYWNlIGV4aXN0aW5nIHZhbHVlIGluIGEgdGV4dCBmaWVsZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnLCB0cnVlKSk7XG4gICAgICBlbC5zaG91bGQuZXhpc3Q7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUoJ29yaWdpbmFsIHZhbHVlJywgZWwuRUxFTUVOVCk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnb3JpZ2luYWwgdmFsdWUnKTtcblxuICAgICAgYXdhaXQgZHJpdmVyLnJlcGxhY2VWYWx1ZSgncmVwbGFjZWQgdmFsdWUnLCBlbC5FTEVNRU5UKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdyZXBsYWNlZCB2YWx1ZScpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgna2V5IGNvZGVzJywgZnVuY3Rpb24gKCkge1xuICAgIGJlZm9yZUVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoY2Fwcy5hcHBQYWNrYWdlLCBjYXBzLmFwcEFjdGl2aXR5KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcHJlc3Mga2V5IGNvZGUgMyB3aXRob3V0IG1ldGFzdGF0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5wcmVzc0tleUNvZGUoMykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHByZXNzIGtleSBjb2RlIDMgd2l0aCBtZXRhc3RhdGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDMsIDE5Mykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGxvbmcgcHJlc3Mga2V5IGNvZGUgMyB3aXRob3V0IG1ldGFzdGF0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5sb25nUHJlc3NLZXlDb2RlKDMpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBsb25nIHByZXNzIGtleSBjb2RlIDMgd2l0aCBtZXRhc3RhdGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIubG9uZ1ByZXNzS2V5Q29kZSgzLCAxOTMpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRTY3JlZW5zaG90JywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHZhbGlkIGJhc2U2NC1lbmNvZGVkIHNjcmVlbnNob3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBiYXNlNjRzY3JlZW5zaG90ID0gYXdhaXQgZHJpdmVyLmdldFNjcmVlbnNob3QoKTtcbiAgICAgIGNvbnN0IGltYWdlTWFnaWMgPSBuZXcgQnVmZmVyKGJhc2U2NHNjcmVlbnNob3QsICdiYXNlNjQnKS50b1N0cmluZygnaGV4JywgMCwgUE5HX01BR0lDX0xFTkdUSCk7XG4gICAgICBpbWFnZU1hZ2ljLnNob3VsZC5iZS5lcXVhbChQTkdfTUFHSUMpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9

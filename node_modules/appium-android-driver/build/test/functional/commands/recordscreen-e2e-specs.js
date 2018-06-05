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

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('recording the screen', function () {
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

  it('should start and stop recording the screen', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.isEmulator());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (context$2$0.t0) {
            context$2$0.next = 8;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

        case 6:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0 = context$2$0.t1 < 19;

        case 8:
          if (!context$2$0.t0) {
            context$2$0.next = 10;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.startRecordingScreen());

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', false));

        case 14:
          el = context$2$0.sent;

          el = el.ELEMENT;
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(driver.setValue('Recording the screen!', el));

        case 18:
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(driver.getText(el));

        case 20:
          text = context$2$0.sent;

          text.should.eql('Recording the screen!');

          context$2$0.next = 24;
          return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

        case 24:
          context$2$0.sent.should.not.be.empty;

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// do some interacting, to take some time
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7c0JBQ3RCLFFBQVE7Ozs7dUJBQ0csWUFBWTs7OztBQUdyQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLElBQUksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDcEIsWUFBVSxFQUFFLHdCQUF3QjtBQUNwQyxhQUFXLEVBQUUsa0JBQWtCO0NBQ2hDLHVCQUFlLENBQUM7O0FBRWpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZO0FBQzNDLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7O0FBRUgsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsNENBQTRDLEVBQUU7UUFRM0MsRUFBRSxFQUdGLElBQUk7Ozs7OzJDQVZFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Ozs7Ozs7Ozs7OzJDQUFVLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OzRDQUFHLEVBQUU7Ozs7Ozs7OzhDQUMzRCxJQUFJLENBQUMsSUFBSSxFQUFFOzs7OzJDQUdkLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTs7OzsyQ0FHcEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxDQUFDOzs7QUFBN0UsWUFBRTs7QUFDTixZQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7MkNBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUM7Ozs7MkNBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7QUFBL0IsY0FBSTs7QUFDUixjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7MkNBRWxDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTs7OzJCQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUs7Ozs7Ozs7R0FDekQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGNhcHMgPSBfLmRlZmF1bHRzKHtcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxuICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnXG59LCBERUZBVUxUX0NBUFMpO1xuXG5kZXNjcmliZSgncmVjb3JkaW5nIHRoZSBzY3JlZW4nLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgfSk7XG5cbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc3RhcnQgYW5kIHN0b3AgcmVjb3JkaW5nIHRoZSBzY3JlZW4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGF3YWl0IGRyaXZlci5pc0VtdWxhdG9yKCkgfHwgYXdhaXQgZHJpdmVyLmFkYi5nZXRBcGlMZXZlbCgpIDwgMTkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcbiAgICB9XG5cbiAgICBhd2FpdCBkcml2ZXIuc3RhcnRSZWNvcmRpbmdTY3JlZW4oKTtcblxuICAgIC8vIGRvIHNvbWUgaW50ZXJhY3RpbmcsIHRvIHRha2Ugc29tZSB0aW1lXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JywgZmFsc2UpO1xuICAgIGVsID0gZWwuRUxFTUVOVDtcbiAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUoJ1JlY29yZGluZyB0aGUgc2NyZWVuIScsIGVsKTtcbiAgICBsZXQgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsKTtcbiAgICB0ZXh0LnNob3VsZC5lcWwoJ1JlY29yZGluZyB0aGUgc2NyZWVuIScpO1xuXG4gICAgKGF3YWl0IGRyaXZlci5zdG9wUmVjb3JkaW5nU2NyZWVuKCkpLnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=

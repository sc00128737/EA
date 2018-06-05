'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe.skip("geo-location", function () {
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

  it('should set geo location @skip-ci', function callee$1$0() {
    var getText, latitude, longitude, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getText = function getText() {
            var els;
            return _regeneratorRuntime.async(function getText$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

                case 2:
                  els = context$3$0.sent;
                  context$3$0.next = 5;
                  return _regeneratorRuntime.awrap(driver.getText(els[1].ELEMENT));

                case 5:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          };

          latitude = '27.17';
          longitude = '78.04';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getText());

        case 5:
          text = context$2$0.sent;

          text.should.not.include('Latitude: ' + latitude);
          text.should.not.include('Longitude: ' + longitude);

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.setGeoLocation({ latitude: latitude, longitude: longitude }));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(6, 1000, function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(getText());

                case 2:
                  context$3$0.t0 = context$3$0.sent;

                  if (!(context$3$0.t0 === 'GPS Tutorial')) {
                    context$3$0.next = 5;
                    break;
                  }

                  throw new Error('Location not set yet. Retry.');

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          }));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(getText());

        case 14:
          text = context$2$0.sent;

          text.should.include('Latitude: ' + latitude);
          text.should.include('Longitude: ' + longitude);

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// wait for the text to change
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQ2YsVUFBVTs7Z0JBQ2QsVUFBVTs7Ozt1QkFDWCxZQUFZOzs7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWTtBQUN4QyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLGtDQUFrQyxFQUFFO1FBQ2pDLE9BQU8sRUFLUCxRQUFRLEVBQ1IsU0FBUyxFQUVULElBQUk7Ozs7OztBQVJKLGlCQUFPLEdBQUcsU0FBVixPQUFPO2dCQUNMLEdBQUc7Ozs7O21EQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQzs7O0FBQTdFLHFCQUFHOzttREFDTSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7Ozs7V0FDNUM7O0FBRUcsa0JBQVEsR0FBRyxPQUFPO0FBQ2xCLG1CQUFTLEdBQUcsT0FBTzs7MkNBRU4sT0FBTyxFQUFFOzs7QUFBdEIsY0FBSTs7QUFDUixjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLGdCQUFjLFFBQVEsQ0FBRyxDQUFDO0FBQ2pELGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8saUJBQWUsU0FBUyxDQUFHLENBQUM7OzsyQ0FFN0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLFFBQVEsRUFBUixRQUFRLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDOzs7OzJDQUc1Qyw2QkFBYyxDQUFDLEVBQUUsSUFBSSxFQUFFOzs7OzttREFDakIsT0FBTyxFQUFFOzs7OzsyQ0FBSyxjQUFjOzs7Ozt3QkFDOUIsSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUM7Ozs7Ozs7V0FFbEQsQ0FBQzs7OzsyQ0FFVyxPQUFPLEVBQUU7OztBQUF0QixjQUFJOztBQUNKLGNBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxnQkFBYyxRQUFRLENBQUcsQ0FBQztBQUM3QyxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8saUJBQWUsU0FBUyxDQUFHLENBQUM7Ozs7Ozs7R0FDaEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZS5za2lwKFwiZ2VvLWxvY2F0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzZXQgZ2VvIGxvY2F0aW9uIEBza2lwLWNpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBnZXRUZXh0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIHRydWUpO1xuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsc1sxXS5FTEVNRU5UKTtcbiAgICB9O1xuXG4gICAgbGV0IGxhdGl0dWRlID0gJzI3LjE3JztcbiAgICBsZXQgbG9uZ2l0dWRlID0gJzc4LjA0JztcblxuICAgIGxldCB0ZXh0ID0gYXdhaXQgZ2V0VGV4dCgpO1xuICAgIHRleHQuc2hvdWxkLm5vdC5pbmNsdWRlKGBMYXRpdHVkZTogJHtsYXRpdHVkZX1gKTtcbiAgICB0ZXh0LnNob3VsZC5ub3QuaW5jbHVkZShgTG9uZ2l0dWRlOiAke2xvbmdpdHVkZX1gKTtcblxuICAgIGF3YWl0IGRyaXZlci5zZXRHZW9Mb2NhdGlvbih7bGF0aXR1ZGUsIGxvbmdpdHVkZX0pO1xuXG4gICAgLy8gd2FpdCBmb3IgdGhlIHRleHQgdG8gY2hhbmdlXG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbCg2LCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoYXdhaXQgZ2V0VGV4dCgpID09PSAnR1BTIFR1dG9yaWFsJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2F0aW9uIG5vdCBzZXQgeWV0LiBSZXRyeS4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRleHQgPSBhd2FpdCBnZXRUZXh0KCk7XG4gICAgdGV4dC5zaG91bGQuaW5jbHVkZShgTGF0aXR1ZGU6ICR7bGF0aXR1ZGV9YCk7XG4gICAgdGV4dC5zaG91bGQuaW5jbHVkZShgTG9uZ2l0dWRlOiAke2xvbmdpdHVkZX1gKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==

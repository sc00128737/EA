'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe("geo-location", function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.GPS_DEMO_CAPS));

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

  it('should set geo location', function callee$1$0() {
    var getText, latitude, longitude, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getText = function getText() {
            var textViews;
            return _regeneratorRuntime.async(function getText$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.elementsByClassName('android.widget.TextView'));

                case 2:
                  textViews = context$3$0.sent;
                  context$3$0.next = 5;
                  return _regeneratorRuntime.awrap(textViews[1].text());

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
          return _regeneratorRuntime.awrap(driver.setGeoLocation(latitude, longitude));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQ2YsVUFBVTs7dUJBQ1YsWUFBWTs7OEJBQ2Ysb0JBQW9COztBQUcvQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTtBQUNuQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7OzsyQ0FDVSx1REFBeUI7OztBQUF4QyxnQkFBTTs7Ozs7OztHQUNQLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHlCQUF5QixFQUFFO1FBQ3hCLE9BQU8sRUFLUCxRQUFRLEVBQ1IsU0FBUyxFQUVULElBQUk7Ozs7OztBQVJKLGlCQUFPLEdBQUcsU0FBVixPQUFPO2dCQUNILFNBQVM7Ozs7O21EQUFTLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQzs7O0FBQXZFLDJCQUFTOzttREFDRixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7O1dBQ2pDOztBQUVHLGtCQUFRLEdBQUcsT0FBTztBQUNsQixtQkFBUyxHQUFHLE9BQU87OzJDQUVOLE9BQU8sRUFBRTs7O0FBQXRCLGNBQUk7O0FBQ1IsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxnQkFBYyxRQUFRLENBQUcsQ0FBQztBQUNqRCxjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLGlCQUFlLFNBQVMsQ0FBRyxDQUFDOzs7MkNBRTdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7OzsyQ0FHMUMsNkJBQWMsQ0FBQyxFQUFFLElBQUksRUFBRTs7Ozs7bURBQ2pCLE9BQU8sRUFBRTs7Ozs7MkNBQUssY0FBYzs7Ozs7d0JBQzlCLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDOzs7Ozs7O1dBRWxELENBQUM7Ozs7MkNBRVcsT0FBTyxFQUFFOzs7QUFBdEIsY0FBSTs7QUFDSixjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sZ0JBQWMsUUFBUSxDQUFHLENBQUM7QUFDN0MsY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGlCQUFlLFNBQVMsQ0FBRyxDQUFDOzs7Ozs7O0dBQ2hELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VvLWxvY2F0aW9uLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCB7IEdQU19ERU1PX0NBUFMgfSBmcm9tICcuLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKFwiZ2VvLWxvY2F0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKEdQU19ERU1PX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc2V0IGdlbyBsb2NhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZ2V0VGV4dCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRleHRWaWV3cyA9IGF3YWl0IGRyaXZlci5lbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmRyb2lkLndpZGdldC5UZXh0VmlldycpO1xuICAgICAgcmV0dXJuIGF3YWl0IHRleHRWaWV3c1sxXS50ZXh0KCk7XG4gICAgfTtcblxuICAgIGxldCBsYXRpdHVkZSA9ICcyNy4xNyc7XG4gICAgbGV0IGxvbmdpdHVkZSA9ICc3OC4wNCc7XG5cbiAgICBsZXQgdGV4dCA9IGF3YWl0IGdldFRleHQoKTtcbiAgICB0ZXh0LnNob3VsZC5ub3QuaW5jbHVkZShgTGF0aXR1ZGU6ICR7bGF0aXR1ZGV9YCk7XG4gICAgdGV4dC5zaG91bGQubm90LmluY2x1ZGUoYExvbmdpdHVkZTogJHtsb25naXR1ZGV9YCk7XG5cbiAgICBhd2FpdCBkcml2ZXIuc2V0R2VvTG9jYXRpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG5cbiAgICAvLyB3YWl0IGZvciB0aGUgdGV4dCB0byBjaGFuZ2VcbiAgICBhd2FpdCByZXRyeUludGVydmFsKDYsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChhd2FpdCBnZXRUZXh0KCkgPT09ICdHUFMgVHV0b3JpYWwnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTG9jYXRpb24gbm90IHNldCB5ZXQuIFJldHJ5LicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGV4dCA9IGF3YWl0IGdldFRleHQoKTtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGBMYXRpdHVkZTogJHtsYXRpdHVkZX1gKTtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGBMb25naXR1ZGU6ICR7bG9uZ2l0dWRlfWApO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9

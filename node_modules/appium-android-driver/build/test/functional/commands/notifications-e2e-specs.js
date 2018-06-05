'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _asyncbox = require('asyncbox');

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = _lodash2['default'].defaults({
  appActivity: '.app.StatusBarNotifications'
}, _desired2['default']);

describe('apidemo - notifications', function () {
  before(function callee$1$0() {
    var adb, apiLevel;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 3:
          apiLevel = context$2$0.sent;

          if (!([21, 22].indexOf(apiLevel) >= 0)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 6:
          driver = new _3['default']();
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
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
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should open the notification shade @skip-ci', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', ':-|', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.openNotifications());

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap((0, _asyncbox.retry)(4, function callee$2$0() {
            var textViews, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, view;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

                case 2:
                  textViews = context$3$0.sent;
                  text = [];
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 7;
                  _iterator = _getIterator(textViews);

                case 9:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 19;
                    break;
                  }

                  view = _step.value;
                  context$3$0.t0 = text;
                  context$3$0.next = 14;
                  return _regeneratorRuntime.awrap(driver.getText(view.ELEMENT));

                case 14:
                  context$3$0.t1 = context$3$0.sent;
                  context$3$0.t0.push.call(context$3$0.t0, context$3$0.t1);

                case 16:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 9;
                  break;

                case 19:
                  context$3$0.next = 25;
                  break;

                case 21:
                  context$3$0.prev = 21;
                  context$3$0.t2 = context$3$0['catch'](7);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t2;

                case 25:
                  context$3$0.prev = 25;
                  context$3$0.prev = 26;

                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }

                case 28:
                  context$3$0.prev = 28;

                  if (!_didIteratorError) {
                    context$3$0.next = 31;
                    break;
                  }

                  throw _iteratorError;

                case 31:
                  return context$3$0.finish(28);

                case 32:
                  return context$3$0.finish(25);

                case 33:
                  text.should.include('Mood ring');

                case 34:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this, [[7, 21, 25, 33], [26,, 28, 32]]);
          }));

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.keyevent(4));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.become(':-|'));

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: why does this fail?

// give the app a second to catch up before opening notifications

// go back to the app
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9ub3RpZmljYXRpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7d0JBQ3RCLFVBQVU7Ozs7c0JBQ1YsUUFBUTs7Ozt5QkFDTixZQUFZOzs7O3dCQUNOLFVBQVU7O3VCQUNQLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQzNCLGFBQVcsRUFBRSw2QkFBNkI7Q0FDM0MsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLHlCQUF5QixFQUFFLFlBQVk7QUFDOUMsUUFBTSxDQUFDO1FBRUQsR0FBRyxFQUNILFFBQVE7Ozs7QUFEUixhQUFHLEdBQUcsNEJBQVM7OzJDQUNFLEdBQUcsQ0FBQyxXQUFXLEVBQUU7OztBQUFsQyxrQkFBUTs7Z0JBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs7OENBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUU7OztBQUVwQixnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7R0FDeEMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FFL0IsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUM1QyxFQUFFOzs7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQzs7O0FBQS9ELFlBQUU7OzJDQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7OzsyQ0FHeEIsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7OzsyQ0FDYixNQUFNLENBQUMsaUJBQWlCLEVBQUU7Ozs7MkNBRTFCLHFCQUFNLENBQUMsRUFBRTtnQkFDVCxTQUFTLEVBQ1QsSUFBSSxrRkFDQyxJQUFJOzs7Ozs7bURBRlMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFDOzs7QUFBbkYsMkJBQVM7QUFDVCxzQkFBSSxHQUFHLEVBQUU7Ozs7OzJDQUNJLFNBQVM7Ozs7Ozs7O0FBQWpCLHNCQUFJO21DQUNYLElBQUk7O21EQUFZLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7OztpQ0FBdkMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRVgsc0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7O1dBQ2xDLENBQUM7Ozs7MkNBR0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7MkNBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQ3RELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvbm90aWZpY2F0aW9ucy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgcmV0cnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSBfLmRlZmF1bHRzKHtcbiAgYXBwQWN0aXZpdHk6ICcuYXBwLlN0YXR1c0Jhck5vdGlmaWNhdGlvbnMnXG59LCBERUZBVUxUX0NBUFMpO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIG5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogd2h5IGRvZXMgdGhpcyBmYWlsP1xuICAgIGxldCBhZGIgPSBuZXcgQURCKCk7XG4gICAgbGV0IGFwaUxldmVsID0gYXdhaXQgYWRiLmdldEFwaUxldmVsKCk7XG4gICAgaWYgKFsyMSwgMjJdLmluZGV4T2YoYXBpTGV2ZWwpID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcbiAgICB9XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgb3BlbiB0aGUgbm90aWZpY2F0aW9uIHNoYWRlIEBza2lwLWNpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICc6LXwnLCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmNsaWNrKGVsLkVMRU1FTlQpO1xuXG4gICAgLy8gZ2l2ZSB0aGUgYXBwIGEgc2Vjb25kIHRvIGNhdGNoIHVwIGJlZm9yZSBvcGVuaW5nIG5vdGlmaWNhdGlvbnNcbiAgICBhd2FpdCBCLmRlbGF5KDEwMDApO1xuICAgIGF3YWl0IGRyaXZlci5vcGVuTm90aWZpY2F0aW9ucygpO1xuXG4gICAgYXdhaXQgcmV0cnkoNCwgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHRleHRWaWV3cyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIHRydWUpO1xuICAgICAgbGV0IHRleHQgPSBbXTtcbiAgICAgIGZvciAobGV0IHZpZXcgb2YgdGV4dFZpZXdzKSB7XG4gICAgICAgIHRleHQucHVzaChhd2FpdCBkcml2ZXIuZ2V0VGV4dCh2aWV3LkVMRU1FTlQpKTtcbiAgICAgIH1cbiAgICAgIHRleHQuc2hvdWxkLmluY2x1ZGUoJ01vb2QgcmluZycpO1xuICAgIH0pO1xuXG4gICAgLy8gZ28gYmFjayB0byB0aGUgYXBwXG4gICAgYXdhaXQgZHJpdmVyLmtleWV2ZW50KDQpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5iZWNvbWUoJzotfCcpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9

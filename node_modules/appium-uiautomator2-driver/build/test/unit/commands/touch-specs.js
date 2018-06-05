'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Touch', function () {
  var adb = new _appiumAdb2['default']();
  var driver = new _2['default']();
  driver.adb = adb;

  describe('#parseTouch', function () {
    describe('given a touch sequence with absolute coordinates', function () {
      it('should use offsets for moveTo', function callee$3$0() {
        var actions, touchStates, parsedActions, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, state;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              actions = [{ action: 'press', options: { x: 100, y: 101 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'wait', options: { ms: 5000 } }, { action: 'moveTo', options: { x: -40, y: -41 } }, { action: 'release', options: {} }];
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(driver.parseTouch(actions, false));

            case 3:
              touchStates = context$4$0.sent;

              touchStates.length.should.equal(5);
              parsedActions = [{ action: 'press', x: 100, y: 101 }, { action: 'moveTo', x: 150, y: 152 }, { action: 'wait', x: 150, y: 152 }, { action: 'moveTo', x: 110, y: 111 }, { action: 'release' }];
              index = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$4$0.prev = 10;

              for (_iterator = _getIterator(touchStates); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                state = _step.value;

                state.action.should.equal(parsedActions[index].action);
                if (actions[index].action !== 'release') {
                  state.options.x.should.equal(parsedActions[index].x);
                  state.options.y.should.equal(parsedActions[index].y);
                }
                index++;
              }
              context$4$0.next = 18;
              break;

            case 14:
              context$4$0.prev = 14;
              context$4$0.t0 = context$4$0['catch'](10);
              _didIteratorError = true;
              _iteratorError = context$4$0.t0;

            case 18:
              context$4$0.prev = 18;
              context$4$0.prev = 19;

              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }

            case 21:
              context$4$0.prev = 21;

              if (!_didIteratorError) {
                context$4$0.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return context$4$0.finish(21);

            case 25:
              return context$4$0.finish(18);

            case 26:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[10, 14, 18, 26], [19,, 21, 25]]);
      });
    });
  });
});

// let driver = new AndroidDriver({foo: 'bar'});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy90b3VjaC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ1AsVUFBVTs7Ozt5QkFDaEMsWUFBWTs7OztBQUc1QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUM1QixNQUFJLEdBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ3BCLE1BQUksTUFBTSxHQUFHLG1CQUErQixDQUFDO0FBQzdDLFFBQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztBQUVqQixVQUFRLENBQUMsYUFBYSxFQUFFLFlBQVk7QUFDbEMsWUFBUSxDQUFDLGtEQUFrRCxFQUFFLFlBQVk7QUFDdkUsUUFBRSxDQUFDLCtCQUErQixFQUFFO1lBRTlCLE9BQU8sRUFPUCxXQUFXLEVBRVgsYUFBYSxFQU9iLEtBQUssa0ZBQ0EsS0FBSzs7Ozs7QUFqQlYscUJBQU8sR0FBRyxDQUNaLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBQyxFQUM1QyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFDLEVBQUMsRUFDM0MsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsRUFBQyxFQUNyQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEVBQzdDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDLENBQ2pDOzsrQ0FDdUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDOzs7QUFBckQseUJBQVc7O0FBQ2YseUJBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQiwyQkFBYSxHQUFHLENBQ2xCLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFDakMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQyxFQUNsQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQ2hDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFDbEMsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLENBQ3BCO0FBQ0csbUJBQUssR0FBRyxDQUFDOzs7Ozs7QUFDYiw0Q0FBa0IsV0FBVyxxR0FBRTtBQUF0QixxQkFBSzs7QUFDWixxQkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2RCxvQkFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUN2Qyx1QkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsdUJBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0RDtBQUNELHFCQUFLLEVBQUUsQ0FBQztlQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FDRixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL3RvdWNoLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdUb3VjaCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcbiAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyKCk7XG4gIGRyaXZlci5hZGIgPSBhZGI7XG5cbiAgZGVzY3JpYmUoJyNwYXJzZVRvdWNoJywgZnVuY3Rpb24gKCkge1xuICAgIGRlc2NyaWJlKCdnaXZlbiBhIHRvdWNoIHNlcXVlbmNlIHdpdGggYWJzb2x1dGUgY29vcmRpbmF0ZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgnc2hvdWxkIHVzZSBvZmZzZXRzIGZvciBtb3ZlVG8nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcih7Zm9vOiAnYmFyJ30pO1xuICAgICAgICBsZXQgYWN0aW9ucyA9IFtcbiAgICAgICAgICB7YWN0aW9uOiAncHJlc3MnLCBvcHRpb25zOiB7eDogMTAwLCB5OiAxMDF9fSxcbiAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IDUwLCB5OiA1MX19LFxuICAgICAgICAgIHthY3Rpb246ICd3YWl0Jywgb3B0aW9uczoge21zOiA1MDAwfX0sXG4gICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHt4OiAtNDAsIHk6IC00MX19LFxuICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJywgb3B0aW9uczoge319XG4gICAgICAgIF07XG4gICAgICAgIGxldCB0b3VjaFN0YXRlcyA9IGF3YWl0IGRyaXZlci5wYXJzZVRvdWNoKGFjdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgdG91Y2hTdGF0ZXMubGVuZ3RoLnNob3VsZC5lcXVhbCg1KTtcbiAgICAgICAgbGV0IHBhcnNlZEFjdGlvbnMgPSBbXG4gICAgICAgICAge2FjdGlvbjogJ3ByZXNzJywgeDogMTAwLCB5OiAxMDF9LFxuICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCB4OiAxNTAsIHk6IDE1Mn0sXG4gICAgICAgICAge2FjdGlvbjogJ3dhaXQnLCB4OiAxNTAsIHk6IDE1Mn0sXG4gICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIHg6IDExMCwgeTogMTExfSxcbiAgICAgICAgICB7YWN0aW9uOiAncmVsZWFzZSd9XG4gICAgICAgIF07XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGZvciAobGV0IHN0YXRlIG9mIHRvdWNoU3RhdGVzKSB7XG4gICAgICAgICAgc3RhdGUuYWN0aW9uLnNob3VsZC5lcXVhbChwYXJzZWRBY3Rpb25zW2luZGV4XS5hY3Rpb24pO1xuICAgICAgICAgIGlmIChhY3Rpb25zW2luZGV4XS5hY3Rpb24gIT09ICdyZWxlYXNlJykge1xuICAgICAgICAgICAgc3RhdGUub3B0aW9ucy54LnNob3VsZC5lcXVhbChwYXJzZWRBY3Rpb25zW2luZGV4XS54KTtcbiAgICAgICAgICAgIHN0YXRlLm9wdGlvbnMueS5zaG91bGQuZXF1YWwocGFyc2VkQWN0aW9uc1tpbmRleF0ueSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9

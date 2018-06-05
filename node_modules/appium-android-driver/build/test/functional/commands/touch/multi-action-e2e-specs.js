'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var caps = _lodash2['default'].defaults({
  appActivity: '.view.SplitTouchView'
}, _desired2['default']);

describe('apidemo - touch - multi-actions', function () {
  var driver = undefined;
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
  it('should scroll two different lists', function callee$1$0() {
    var lists, leftList, rightList, leftGestures, rightGestures;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.ListView', true));

        case 2:
          lists = context$2$0.sent;
          leftList = lists[0].ELEMENT;
          rightList = lists[1].ELEMENT;
          leftGestures = [{ action: 'press', options: { element: leftList } }, { action: 'moveTo', options: { element: leftList, x: 10, y: 0 } }, { action: 'moveTo', options: { element: leftList, x: 10, y: -75 } }, { action: 'moveTo', options: { element: leftList, x: 10, y: -150 } }];
          rightGestures = [{ action: 'press', options: { element: rightList } }, { action: 'moveTo', options: { element: rightList, x: 10, y: 0 } }, { action: 'moveTo', options: { element: rightList, x: 10, y: -75 } }, { action: 'moveTo', options: { element: rightList, x: 10, y: -150 } }];
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.performMultiAction([leftGestures, rightGestures]));

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9tdWx0aS1hY3Rpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7aUJBQ0ksYUFBYTs7Ozt1QkFDZCxlQUFlOzs7O0FBR3hDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLGFBQVcsRUFBRSxzQkFBc0I7Q0FDcEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLGlDQUFpQyxFQUFFLFlBQVk7QUFDdEQsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG1DQUFtQyxFQUFFO1FBQ2xDLEtBQUssRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUNULFlBQVksRUFNWixhQUFhOzs7OzsyQ0FUQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUM7OztBQUEvRSxlQUFLO0FBQ0wsa0JBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztBQUMzQixtQkFBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0FBQzVCLHNCQUFZLEdBQUcsQ0FDakIsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsRUFBQyxFQUMvQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUM3RCxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEVBQy9ELEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsQ0FDakU7QUFDRyx1QkFBYSxHQUFHLENBQ2xCLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFDaEQsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFDOUQsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxFQUNoRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLENBQ2xFOzsyQ0FDSyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7R0FDL0QsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9tdWx0aS1hY3Rpb24tZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgY2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhcHBBY3Rpdml0eTogJy52aWV3LlNwbGl0VG91Y2hWaWV3J1xufSwgREVGQVVMVF9DQVBTKTtcblxuZGVzY3JpYmUoJ2FwaWRlbW8gLSB0b3VjaCAtIG11bHRpLWFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzY3JvbGwgdHdvIGRpZmZlcmVudCBsaXN0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbGlzdHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuTGlzdFZpZXcnLCB0cnVlKTtcbiAgICBsZXQgbGVmdExpc3QgPSBsaXN0c1swXS5FTEVNRU5UO1xuICAgIGxldCByaWdodExpc3QgPSBsaXN0c1sxXS5FTEVNRU5UO1xuICAgIGxldCBsZWZ0R2VzdHVyZXMgPSBbXG4gICAgICB7YWN0aW9uOiAncHJlc3MnLCBvcHRpb25zOiB7ZWxlbWVudDogbGVmdExpc3R9fSxcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbGVmdExpc3QsIHg6IDEwLCB5OiAwfX0sXG4gICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IGxlZnRMaXN0LCB4OiAxMCwgeTogLTc1fX0sXG4gICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IGxlZnRMaXN0LCB4OiAxMCwgeTogLTE1MH19XG4gICAgXTtcbiAgICBsZXQgcmlnaHRHZXN0dXJlcyA9IFtcbiAgICAgIHthY3Rpb246ICdwcmVzcycsIG9wdGlvbnM6IHtlbGVtZW50OiByaWdodExpc3R9fSxcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogcmlnaHRMaXN0LCB4OiAxMCwgeTogMH19LFxuICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiByaWdodExpc3QsIHg6IDEwLCB5OiAtNzV9fSxcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogcmlnaHRMaXN0LCB4OiAxMCwgeTogLTE1MH19XG4gICAgXTtcbiAgICBhd2FpdCBkcml2ZXIucGVyZm9ybU11bHRpQWN0aW9uKFtsZWZ0R2VzdHVyZXMsIHJpZ2h0R2VzdHVyZXNdKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==

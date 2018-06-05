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

describe('Find - accessibility ID', function () {
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
  it('should find an element by name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should return an array of one element if the `multi` param is true', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', true));

        case 2:
          els = context$2$0.sent;

          els.should.be.an['instanceof'](Array);
          els.should.have.length(1);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a content-desc property containing an apostrophe', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', "Access'ibility", false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LWFjY2Vzc2liaWxpdHktaWQtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxZQUFZO0FBQzlDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7Ozs7R0FDekMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTs7Ozs7MkNBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSzs7Ozs7OztHQUN6RixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0VBQW9FLEVBQUU7UUFDbkUsR0FBRzs7Ozs7MkNBQVMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDOzs7QUFBckUsYUFBRzs7QUFDUCxhQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxhQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7R0FDM0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDhFQUE4RSxFQUFFOzs7OzsyQ0FDM0UsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUs7Ozs7Ozs7R0FDOUYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LWFjY2Vzc2liaWxpdHktaWQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdGaW5kIC0gYWNjZXNzaWJpbGl0eSBJRCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IGJ5IG5hbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdhY2Nlc3NpYmlsaXR5IGlkJywgJ0FuaW1hdGlvbicsIGZhbHNlKS5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIG9uZSBlbGVtZW50IGlmIHRoZSBgbXVsdGlgIHBhcmFtIGlzIHRydWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nLCB0cnVlKTtcbiAgICBlbHMuc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoQXJyYXkpO1xuICAgIGVscy5zaG91bGQuaGF2ZS5sZW5ndGgoMSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIGEgY29udGVudC1kZXNjIHByb3BlcnR5IGNvbnRhaW5pbmcgYW4gYXBvc3Ryb3BoZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2FjY2Vzc2liaWxpdHkgaWQnLCBcIkFjY2VzcydpYmlsaXR5XCIsIGZhbHNlKS5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==

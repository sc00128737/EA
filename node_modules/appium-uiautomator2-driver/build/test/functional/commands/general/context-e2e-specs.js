'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.WebView1',
  showChromedriverLog: true
}, _desired.APIDEMOS_CAPS);

describe('apidemo - context', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

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
  it('should find webview context', function callee$1$0() {
    var contexts;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.contexts());

        case 2:
          contexts = context$2$0.sent;

          contexts.length.should.be.at.least(2);

          // make sure the process was found, otherwise it comes out as "undefined"
          contexts.join('').should.not.include('undefined');
          contexts.join('').should.include('WEBVIEW_io.appium.android.apis');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should go into the webview', function callee$1$0() {
    var contexts;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          // TODO: Fix this on TestObject. Chromedriver does not exist error
          if (process.env.TESTOBJECT_E2E_TESTS) {
            this.skip();
          }
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.contexts());

        case 3:
          contexts = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.context(contexts[1]));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2NvbnRleHQtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7dUJBQ2YsZUFBZTs7OEJBQ2xCLHVCQUF1Qjs7c0JBQ3BDLFFBQVE7Ozs7QUFHdEIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLElBQUksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDdEIsWUFBVSxFQUFFLHdCQUF3QjtBQUNwQyxhQUFXLEVBQUUsZ0JBQWdCO0FBQzdCLHFCQUFtQixFQUFFLElBQUk7Q0FDMUIseUJBQWdCLENBQUM7O0FBRWxCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZO0FBQ3hDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7OzJDQUNVLGdDQUFXLElBQUksQ0FBQzs7O0FBQS9CLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0dBQ3BCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUM1QixRQUFROzs7OzsyQ0FBUyxNQUFNLENBQUMsUUFBUSxFQUFFOzs7QUFBbEMsa0JBQVE7O0FBQ1osa0JBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHdEMsa0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEQsa0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3BFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw0QkFBNEIsRUFBRTtRQUszQixRQUFROzs7OztBQUhaLGNBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtBQUNwQyxnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ2I7OzJDQUNvQixNQUFNLENBQUMsUUFBUSxFQUFFOzs7QUFBbEMsa0JBQVE7OzJDQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0dBQ2xDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9jb250ZXh0LWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IGNhcHMgPSBfLmRlZmF1bHRzKHtcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxuICBhcHBBY3Rpdml0eTogJy52aWV3LldlYlZpZXcxJyxcbiAgc2hvd0Nocm9tZWRyaXZlckxvZzogdHJ1ZSxcbn0sIEFQSURFTU9TX0NBUFMpO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIGNvbnRleHQnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihjYXBzKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIHdlYnZpZXcgY29udGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY29udGV4dHMgPSBhd2FpdCBkcml2ZXIuY29udGV4dHMoKTtcbiAgICBjb250ZXh0cy5sZW5ndGguc2hvdWxkLmJlLmF0LmxlYXN0KDIpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBwcm9jZXNzIHdhcyBmb3VuZCwgb3RoZXJ3aXNlIGl0IGNvbWVzIG91dCBhcyBcInVuZGVmaW5lZFwiXG4gICAgY29udGV4dHMuam9pbignJykuc2hvdWxkLm5vdC5pbmNsdWRlKCd1bmRlZmluZWQnKTtcbiAgICBjb250ZXh0cy5qb2luKCcnKS5zaG91bGQuaW5jbHVkZSgnV0VCVklFV19pby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdvIGludG8gdGhlIHdlYnZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogRml4IHRoaXMgb24gVGVzdE9iamVjdC4gQ2hyb21lZHJpdmVyIGRvZXMgbm90IGV4aXN0IGVycm9yXG4gICAgaWYgKHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgICB0aGlzLnNraXAoKTtcbiAgICB9XG4gICAgbGV0IGNvbnRleHRzID0gYXdhaXQgZHJpdmVyLmNvbnRleHRzKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNvbnRleHQoY29udGV4dHNbMV0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9

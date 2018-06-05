require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumSupport = require('appium-support');

var _libInstall = require('../lib/install');

var _libChromedriver = require('../lib/chromedriver');

var _libChromedriver2 = _interopRequireDefault(_libChromedriver);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function assertNoPreviousDirs() {
  var err;
  return _regeneratorRuntime.async(function assertNoPreviousDirs$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        err = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(_libInstall.CD_BASE_DIR));

      case 4:
        context$1$0.next = 9;
        break;

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](1);

        err = context$1$0.t0;

      case 9:
        should.exist(err);
        err.code.should.eql("ENOENT");

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 6]]);
}

describe('install scripts', function () {
  this.timeout(2000000);
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(_libInstall.CD_BASE_DIR));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should install for this platform', function callee$1$0() {
    var cdPath, cdStat, cd;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(assertNoPreviousDirs());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libInstall.install)());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _libInstall.getChromedriverBinaryPath)());

        case 6:
          cdPath = context$2$0.sent;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(cdPath));

        case 9:
          cdStat = context$2$0.sent;

          cdStat.size.should.be.above(500000);
          cdPath.should.contain((0, _libInstall.getCurPlatform)());
          cd = new _libChromedriver2['default']();
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(cd.initChromedriverPath());

        case 15:
          cd.chromedriver.should.equal(cdPath);

        case 16:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should install for all platforms', function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, platform, arch, cdPath, cdStat;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(120000);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(assertNoPreviousDirs());

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _libInstall.installAll)());

        case 5:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 8;
          _iterator = _getIterator((0, _libInstall.getPlatforms)());

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 26;
            break;
          }

          _step$value = _slicedToArray(_step.value, 2);
          platform = _step$value[0];
          arch = _step$value[1];
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap((0, _libInstall.getChromedriverBinaryPath)(platform, arch));

        case 16:
          cdPath = context$2$0.sent;
          context$2$0.next = 19;
          return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(cdPath));

        case 19:
          cdStat = context$2$0.sent;

          cdStat.size.should.be.above(500000);
          cdPath.should.contain(platform);
          if (platform === "linux") {
            cdPath.should.contain(arch);
          } else {
            cdPath.should.not.contain(arch);
          }

        case 23:
          _iteratorNormalCompletion = true;
          context$2$0.next = 10;
          break;

        case 26:
          context$2$0.next = 32;
          break;

        case 28:
          context$2$0.prev = 28;
          context$2$0.t0 = context$2$0['catch'](8);
          _didIteratorError = true;
          _iteratorError = context$2$0.t0;

        case 32:
          context$2$0.prev = 32;
          context$2$0.prev = 33;

          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }

        case 35:
          context$2$0.prev = 35;

          if (!_didIteratorError) {
            context$2$0.next = 38;
            break;
          }

          throw _iteratorError;

        case 38:
          return context$2$0.finish(35);

        case 39:
          return context$2$0.finish(32);

        case 40:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[8, 28, 32, 40], [33,, 35, 39]]);
  });
  it('should throw an error in chromedriver if nothing is installed', function callee$1$0() {
    var cd, err;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(assertNoPreviousDirs());

        case 2:
          cd = new _libChromedriver2['default']();
          err = undefined;
          context$2$0.prev = 4;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(cd.initChromedriverPath());

        case 7:
          context$2$0.next = 12;
          break;

        case 9:
          context$2$0.prev = 9;
          context$2$0.t0 = context$2$0['catch'](4);

          err = context$2$0.t0;

        case 12:
          should.exist(err);
          err.message.should.contain("path");

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[4, 9]]);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaW5zdGFsbC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBRWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7OzZCQUMxQixnQkFBZ0I7OzBCQUVVLGdCQUFnQjs7K0JBQ3BDLHFCQUFxQjs7OztBQUc5QyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUMzQixrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixTQUFlLG9CQUFvQjtNQUM3QixHQUFHOzs7O0FBQUgsV0FBRzs7O3lDQUVDLGtCQUFHLElBQUkseUJBQWE7Ozs7Ozs7Ozs7QUFFMUIsV0FBRyxpQkFBSSxDQUFDOzs7QUFFVixjQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7OztDQUMvQjs7QUFFRCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBWTtBQUN0QyxNQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLFlBQVUsQ0FBQzs7Ozs7MkNBQ0gsa0JBQUcsTUFBTSx5QkFBYTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsa0NBQWtDLEVBQUU7UUFHakMsTUFBTSxFQUNOLE1BQU0sRUFHTixFQUFFOzs7OzsyQ0FOQSxvQkFBb0IsRUFBRTs7OzsyQ0FDdEIsMEJBQVM7Ozs7MkNBQ0ksNENBQTJCOzs7QUFBMUMsZ0JBQU07OzJDQUNTLGtCQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7OztBQUE5QixnQkFBTTs7QUFDVixnQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUNBQWdCLENBQUMsQ0FBQztBQUNwQyxZQUFFLEdBQUcsa0NBQWtCOzsyQ0FDckIsRUFBRSxDQUFDLG9CQUFvQixFQUFFOzs7QUFDL0IsWUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0dBQ3RDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtxR0FLM0IsUUFBUSxFQUFFLElBQUksRUFDbEIsTUFBTSxFQUNOLE1BQU07Ozs7O0FBTlosY0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7MkNBQ2Ysb0JBQW9CLEVBQUU7Ozs7MkNBQ3RCLDZCQUFZOzs7Ozs7O21DQUVXLCtCQUFjOzs7Ozs7Ozs7QUFBakMsa0JBQVE7QUFBRSxjQUFJOzsyQ0FDSCwyQ0FBMEIsUUFBUSxFQUFFLElBQUksQ0FBQzs7O0FBQXhELGdCQUFNOzsyQ0FDUyxrQkFBRyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7QUFBOUIsZ0JBQU07O0FBQ1YsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLGNBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUN4QixrQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDN0IsTUFBTTtBQUNMLGtCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FFSixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsK0RBQStELEVBQUU7UUFFOUQsRUFBRSxFQUNGLEdBQUc7Ozs7OzJDQUZELG9CQUFvQixFQUFFOzs7QUFDeEIsWUFBRSxHQUFHLGtDQUFrQjtBQUN2QixhQUFHOzs7MkNBRUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFOzs7Ozs7Ozs7O0FBRS9CLGFBQUcsaUJBQUksQ0FBQzs7O0FBRVYsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsYUFBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0dBQ3BDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2luc3RhbGwtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcblxuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IENEX0JBU0VfRElSLCBpbnN0YWxsLCBpbnN0YWxsQWxsLCBnZXRDaHJvbWVkcml2ZXJCaW5hcnlQYXRoLFxuICAgICAgICAgZ2V0Q3VyUGxhdGZvcm0sIGdldFBsYXRmb3JtcyB9IGZyb20gJy4uL2xpYi9pbnN0YWxsJztcbmltcG9ydCBDaHJvbWVkcml2ZXIgZnJvbSAnLi4vbGliL2Nocm9tZWRyaXZlcic7XG5cblxubGV0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VydE5vUHJldmlvdXNEaXJzICgpIHtcbiAgbGV0IGVycjtcbiAgdHJ5IHtcbiAgICBhd2FpdCBmcy5zdGF0KENEX0JBU0VfRElSKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGVyciA9IGU7XG4gIH1cbiAgc2hvdWxkLmV4aXN0KGVycik7XG4gIGVyci5jb2RlLnNob3VsZC5lcWwoXCJFTk9FTlRcIik7XG59XG5cbmRlc2NyaWJlKCdpbnN0YWxsIHNjcmlwdHMnLCBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZW91dCgyMDAwMDAwKTtcbiAgYmVmb3JlRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZnMucmltcmFmKENEX0JBU0VfRElSKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgaW5zdGFsbCBmb3IgdGhpcyBwbGF0Zm9ybScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBhc3NlcnROb1ByZXZpb3VzRGlycygpO1xuICAgIGF3YWl0IGluc3RhbGwoKTtcbiAgICBsZXQgY2RQYXRoID0gYXdhaXQgZ2V0Q2hyb21lZHJpdmVyQmluYXJ5UGF0aCgpO1xuICAgIGxldCBjZFN0YXQgPSBhd2FpdCBmcy5zdGF0KGNkUGF0aCk7XG4gICAgY2RTdGF0LnNpemUuc2hvdWxkLmJlLmFib3ZlKDUwMDAwMCk7XG4gICAgY2RQYXRoLnNob3VsZC5jb250YWluKGdldEN1clBsYXRmb3JtKCkpO1xuICAgIGxldCBjZCA9IG5ldyBDaHJvbWVkcml2ZXIoKTtcbiAgICBhd2FpdCBjZC5pbml0Q2hyb21lZHJpdmVyUGF0aCgpO1xuICAgIGNkLmNocm9tZWRyaXZlci5zaG91bGQuZXF1YWwoY2RQYXRoKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgaW5zdGFsbCBmb3IgYWxsIHBsYXRmb3JtcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRpbWVvdXQoMTIwMDAwKTtcbiAgICBhd2FpdCBhc3NlcnROb1ByZXZpb3VzRGlycygpO1xuICAgIGF3YWl0IGluc3RhbGxBbGwoKTtcblxuICAgIGZvciAobGV0IFtwbGF0Zm9ybSwgYXJjaF0gb2YgZ2V0UGxhdGZvcm1zKCkpIHtcbiAgICAgIGxldCBjZFBhdGggPSBhd2FpdCBnZXRDaHJvbWVkcml2ZXJCaW5hcnlQYXRoKHBsYXRmb3JtLCBhcmNoKTtcbiAgICAgIGxldCBjZFN0YXQgPSBhd2FpdCBmcy5zdGF0KGNkUGF0aCk7XG4gICAgICBjZFN0YXQuc2l6ZS5zaG91bGQuYmUuYWJvdmUoNTAwMDAwKTtcbiAgICAgIGNkUGF0aC5zaG91bGQuY29udGFpbihwbGF0Zm9ybSk7XG4gICAgICBpZiAocGxhdGZvcm0gPT09IFwibGludXhcIikge1xuICAgICAgICBjZFBhdGguc2hvdWxkLmNvbnRhaW4oYXJjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZFBhdGguc2hvdWxkLm5vdC5jb250YWluKGFyY2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaW4gY2hyb21lZHJpdmVyIGlmIG5vdGhpbmcgaXMgaW5zdGFsbGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGFzc2VydE5vUHJldmlvdXNEaXJzKCk7XG4gICAgbGV0IGNkID0gbmV3IENocm9tZWRyaXZlcigpO1xuICAgIGxldCBlcnI7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNkLmluaXRDaHJvbWVkcml2ZXJQYXRoKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgc2hvdWxkLmV4aXN0KGVycik7XG4gICAgZXJyLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oXCJwYXRoXCIpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9

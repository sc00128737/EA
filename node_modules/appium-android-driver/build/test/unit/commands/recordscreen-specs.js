'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumTestSupport = require('appium-test-support');

var _appiumSupport = require('appium-support');

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = new _2['default']();
var adb = new _appiumAdb2['default']();
driver.adb = adb;
describe('recording the screen', function () {
  this.timeout(60000);

  describe('basic', (0, _appiumTestSupport.withMocks)({ adb: adb, driver: driver, fs: _appiumSupport.fs, temp: _temp2['default'] }, function (mocks) {
    var localFile = '/path/to/local.mp4';
    var mediaContent = new Buffer('appium');

    it('should fail to recording the screen on an emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isEmulator').returns(true);

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startRecordingScreen().should.eventually.be.rejectedWith(/Screen recording does not work on emulators/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should fail to recording the screen on a device with API level 18', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isEmulator').returns(false);
            mocks.adb.expects('getApiLevel').returns(18);

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startRecordingScreen().should.eventually.be.rejectedWith(/Screen recording not available on API Level 18. Minimum API Level is 19/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('beginning the recording', function () {
      beforeEach(function () {
        driver._recentScreenRecordingPath = null;
        mocks.driver.expects('isEmulator').returns(false);
        mocks.adb.expects('getApiLevel').returns(19);
        mocks.adb.expects('getPIDsByName').atLeast(1).withExactArgs('screenrecord').returns([]);
      });
      afterEach(function () {
        mocks.driver.verify();
        mocks.adb.verify();
        mocks.fs.verify();
        mocks.temp.verify();
      });

      it('should call adb to start screen recording', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().returns(new _bluebird2['default'](function () {}));
              mocks.adb.expects('fileSize').once().returns(39571);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen());

            case 4:
              driver._recentScreenRecordingPath.should.not.be.empty;

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should return previous capture before starting a new recording', function callee$3$0() {
        var remotePath;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              remotePath = '/sdcard/video.mp4';

              mocks.adb.expects('shell').returns(new _bluebird2['default'](function () {}));
              mocks.adb.expects('fileSize').once().returns(39571);
              mocks.adb.expects('pull').once().withExactArgs(remotePath, localFile);
              mocks.fs.expects('readFile').once().withExactArgs(localFile).returns(mediaContent);
              mocks.adb.expects('rimraf').once().withExactArgs(remotePath);
              mocks.fs.expects('rimraf').withExactArgs(localFile).once();
              mocks.fs.expects('stat').once().withExactArgs(localFile).returns({ size: 100 });
              mocks.temp.expects('path').once().returns(localFile);

              driver._recentScreenRecordingPath = remotePath;
              context$4$0.next = 12;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen());

            case 12:
              context$4$0.t0 = mediaContent.toString('base64');
              context$4$0.sent.should.be.eql(context$4$0.t0);

              driver._recentScreenRecordingPath.should.not.be.empty;
              driver._recentScreenRecordingPath.should.not.be.eql(localFile);

            case 16:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should fail if adb screen recording errors out', function callee$3$0() {
        var shellStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('fileSize').returns(31);
              shellStub = _sinon2['default'].stub(adb, 'shell');
              context$4$0.prev = 2;

              shellStub.returns(_bluebird2['default'].reject(new Error('shell command failed')));

              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen().should.eventually.be.rejectedWith(/shell command failed/));

            case 6:
              context$4$0.prev = 6;

              shellStub.restore();
              return context$4$0.finish(6);

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[2,, 6, 9]]);
      });

      it('should call ls multiple times until size is big enough', function callee$3$0() {
        var fileSizeStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().returns(new _bluebird2['default'](function () {}));
              fileSizeStub = _sinon2['default'].stub(adb, 'fileSize');
              context$4$0.prev = 2;

              fileSizeStub.onCall(0).returns(31).onCall(1).returns(42);

              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen());

            case 6:
              context$4$0.prev = 6;

              fileSizeStub.restore();
              return context$4$0.finish(6);

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[2,, 6, 9]]);
      });

      it('should call ls multiple times and fail if size never gets big enough', function callee$3$0() {
        var fileSizeStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().returns(new _bluebird2['default'](function () {}));
              fileSizeStub = _sinon2['default'].stub(adb, 'fileSize');
              context$4$0.prev = 2;

              fileSizeStub.withArgs().returns(31);

              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen().should.eventually.be.rejectedWith(/is still too small: 31 bytes/));

            case 6:
              context$4$0.prev = 6;

              fileSizeStub.restore();
              return context$4$0.finish(6);

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[2,, 6, 9]]);
      });
    });

    describe('stopRecordingScreen', function () {
      afterEach(function () {
        mocks.driver.verify();
        mocks.adb.verify();
        mocks.fs.verify();
        mocks.temp.verify();
      });

      it('should kill the process and get the content of the created mp4 file using lsof', function callee$3$0() {
        var pids, remotePath;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              pids = ['1'];

              driver._recentScreenRecordingPath = null;
              remotePath = '/sdcard/file.mp4';

              mocks.adb.expects('getPIDsByName').withExactArgs('screenrecord').atLeast(1).returns(pids);
              mocks.adb.expects('shell').withExactArgs(['lsof', '-p', pids.join(',')]).returns({ output: '\n          screenrec 11328      shell  mem       REG              253,0   1330160        554 /system/bin/linker64\n          screenrec 11328      shell    0u     unix                          0t0      99935 socket\n          screenrec 11328      shell    1u     unix                          0t0      99935 socket\n          screenrec 11328      shell    2u     unix                          0t0      99937 socket\n          screenrec 11328      shell    3u      CHR              10,64       0t0      12300 /dev/binder\n          screenrec 11328      shell    4u     unix                          0t0     101825 socket\n          screenrec 11328      shell    5w      CHR              254,0       0t0       2923 /dev/pmsg0\n          screenrec 11328      shell    6u      CHR              10,62       0t0      11690 /dev/ashmem\n          screenrec 11328      shell    7u      CHR              10,62       0t0      11690 /dev/ashmem\n          screenrec 11328      shell    8w      REG                0,5         0       6706 /sys/kernel/debug/tracing/trace_marker\n          screenrec 11328      shell    9u      REG               0,19     11521     294673 ' + remotePath + '\n        ' });
              mocks.adb.expects('shell').withExactArgs(['kill', '-2'].concat(pids));
              mocks.adb.expects('shell').withExactArgs(['kill', '-0'].concat(pids)).throws();
              mocks.adb.expects('pull').once().withExactArgs(remotePath, localFile);
              mocks.fs.expects('readFile').once().withExactArgs(localFile).returns(mediaContent);
              mocks.adb.expects('rimraf').once().withExactArgs(remotePath);
              mocks.fs.expects('rimraf').once().withExactArgs(localFile);
              mocks.fs.expects('stat').once().withExactArgs(localFile).returns({ size: 100 });
              mocks.temp.expects('path').once().returns(localFile);

              context$4$0.next = 15;
              return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

            case 15:
              context$4$0.t0 = mediaContent.toString('base64');
              context$4$0.sent.should.eql(context$4$0.t0);

            case 17:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should use the remembered file path if present', function callee$3$0() {
        var pids;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              pids = ['1'];

              driver._recentScreenRecordingPath = '/sdcard/file.mp4';
              mocks.adb.expects('getPIDsByName').withExactArgs('screenrecord').atLeast(1).returns(pids);
              mocks.adb.expects('shell').withExactArgs(['kill', '-2'].concat(pids));
              mocks.adb.expects('shell').withExactArgs(['kill', '-0'].concat(pids)).throws();
              mocks.adb.expects('pull').once().withExactArgs(driver._recentScreenRecordingPath, localFile);
              mocks.fs.expects('readFile').once().withExactArgs(localFile).returns(mediaContent);
              mocks.adb.expects('rimraf').once().withExactArgs(driver._recentScreenRecordingPath);
              mocks.fs.expects('rimraf').withExactArgs(localFile).once();
              mocks.fs.expects('stat').once().withExactArgs(localFile).returns({ size: 100 });
              mocks.temp.expects('path').once().returns(localFile);

              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

            case 13:
              context$4$0.t0 = mediaContent.toString('base64');
              context$4$0.sent.should.eql(context$4$0.t0);

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should fail if the recorded file is too large', function callee$3$0() {
        var pids;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              pids = ['1'];

              driver._recentScreenRecordingPath = '/sdcard/file.mp4';
              mocks.adb.expects('getPIDsByName').withExactArgs('screenrecord').atLeast(1).returns(pids);
              mocks.adb.expects('shell').withExactArgs(['kill', '-2'].concat(pids));
              mocks.adb.expects('shell').withExactArgs(['kill', '-0'].concat(pids)).throws();
              mocks.adb.expects('pull').once().withExactArgs(driver._recentScreenRecordingPath, localFile);
              mocks.adb.expects('rimraf').once().withExactArgs(driver._recentScreenRecordingPath);
              mocks.fs.expects('rimraf').withExactArgs(localFile).once();
              mocks.fs.expects('stat').once().withExactArgs(localFile).returns({ size: process.memoryUsage().heapTotal });
              mocks.temp.expects('path').once().returns(localFile);

              context$4$0.next = 12;
              return _regeneratorRuntime.awrap(driver.stopRecordingScreen().should.eventually.be.rejectedWith(/is too large/));

            case 12:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should return empty string if no recording processes are running', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              driver._recentScreenRecordingPath = null;
              mocks.adb.expects('getPIDsByName').atLeast(1).withExactArgs('screenrecord').returns([]);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

            case 4:
              context$4$0.sent.should.eql('');

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsVUFBVTs7OztpQ0FDVixxQkFBcUI7OzZCQUM1QixnQkFBZ0I7O29CQUNsQixNQUFNOzs7O3lCQUNQLFlBQVk7Ozs7cUJBQ1YsT0FBTzs7Ozt3QkFDWCxVQUFVOzs7O0FBR3hCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDakMsSUFBSSxHQUFHLEdBQUcsNEJBQVMsQ0FBQztBQUNwQixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNqQixRQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWTtBQUMzQyxNQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVwQixVQUFRLENBQUMsT0FBTyxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLEVBQUUsbUJBQUEsRUFBRSxJQUFJLG1CQUFBLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM5RCxRQUFNLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUN2QyxRQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFMUMsTUFBRSxDQUFDLG9EQUFvRCxFQUFFOzs7O0FBQ3ZELGlCQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs2Q0FFM0MsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLDZDQUE2QyxDQUFDOzs7Ozs7O0tBQ3JILENBQUMsQ0FBQzs7QUFFSCxN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Q0FBQyxDQUFDO0FBQ3BGLG1CQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDM0QsbUJBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FDckQsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ3BELG1CQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7OzsrQ0FFL0MsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQzs7Ozs7OztPQUNyRixDQUFDLENBQUM7O0FBRUgsUUFBRSxDQUFDLGtFQUFrRSxFQUFFOzs7O0FBQ3JFLG9CQUFNLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FDL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OzsrQ0FFakQsTUFBTSxDQUFDLG1CQUFtQixFQUFFOzs7K0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7Ozs7O09BQ25ELENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgdGVtcCBmcm9tICd0ZW1wJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xubGV0IGFkYiA9IG5ldyBBREIoKTtcbmRyaXZlci5hZGIgPSBhZGI7XG5kZXNjcmliZSgncmVjb3JkaW5nIHRoZSBzY3JlZW4nLCBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZW91dCg2MDAwMCk7XG5cbiAgZGVzY3JpYmUoJ2Jhc2ljJywgd2l0aE1vY2tzKHthZGIsIGRyaXZlciwgZnMsIHRlbXB9LCAobW9ja3MpID0+IHtcbiAgICBjb25zdCBsb2NhbEZpbGUgPSAnL3BhdGgvdG8vbG9jYWwubXA0JztcbiAgICBjb25zdCBtZWRpYUNvbnRlbnQgPSBuZXcgQnVmZmVyKCdhcHBpdW0nKTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCB0byByZWNvcmRpbmcgdGhlIHNjcmVlbiBvbiBhbiBlbXVsYXRvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdpc0VtdWxhdG9yJykucmV0dXJucyh0cnVlKTtcblxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9TY3JlZW4gcmVjb3JkaW5nIGRvZXMgbm90IHdvcmsgb24gZW11bGF0b3JzLyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgdG8gcmVjb3JkaW5nIHRoZSBzY3JlZW4gb24gYSBkZXZpY2Ugd2l0aCBBUEkgbGV2ZWwgMTgnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnaXNFbXVsYXRvcicpLnJldHVybnMoZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygxOCk7XG5cbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbigpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvU2NyZWVuIHJlY29yZGluZyBub3QgYXZhaWxhYmxlIG9uIEFQSSBMZXZlbCAxOC4gTWluaW11bSBBUEkgTGV2ZWwgaXMgMTkvKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdiZWdpbm5pbmcgdGhlIHJlY29yZGluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBkcml2ZXIuX3JlY2VudFNjcmVlblJlY29yZGluZ1BhdGggPSBudWxsO1xuICAgICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnaXNFbXVsYXRvcicpLnJldHVybnMoZmFsc2UpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDE5KTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldFBJRHNCeU5hbWUnKVxuICAgICAgICAgIC5hdExlYXN0KDEpLndpdGhFeGFjdEFyZ3MoJ3NjcmVlbnJlY29yZCcpLnJldHVybnMoW10pO1xuICAgICAgfSk7XG4gICAgICBhZnRlckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgICAgIG1vY2tzLnRlbXAudmVyaWZ5KCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGFkYiB0byBzdGFydCBzY3JlZW4gcmVjb3JkaW5nJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5vbmNlKCkucmV0dXJucyhuZXcgQigoKSA9PiB7fSkpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZVNpemUnKS5vbmNlKCkucmV0dXJucygzOTU3MSk7XG5cbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKCk7XG4gICAgICAgIGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aC5zaG91bGQubm90LmJlLmVtcHR5O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHByZXZpb3VzIGNhcHR1cmUgYmVmb3JlIHN0YXJ0aW5nIGEgbmV3IHJlY29yZGluZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcmVtb3RlUGF0aCA9ICcvc2RjYXJkL3ZpZGVvLm1wNCc7XG5cbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykucmV0dXJucyhuZXcgQigoKSA9PiB7fSkpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZVNpemUnKS5vbmNlKCkucmV0dXJucygzOTU3MSk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwdWxsJykub25jZSgpLndpdGhFeGFjdEFyZ3MocmVtb3RlUGF0aCwgbG9jYWxGaWxlKTtcbiAgICAgICAgbW9ja3MuZnMuZXhwZWN0cygncmVhZEZpbGUnKS5vbmNlKCkud2l0aEV4YWN0QXJncyhsb2NhbEZpbGUpLnJldHVybnMobWVkaWFDb250ZW50KTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JpbXJhZicpLm9uY2UoKS53aXRoRXhhY3RBcmdzKHJlbW90ZVBhdGgpO1xuICAgICAgICBtb2Nrcy5mcy5leHBlY3RzKCdyaW1yYWYnKS53aXRoRXhhY3RBcmdzKGxvY2FsRmlsZSkub25jZSgpO1xuICAgICAgICBtb2Nrcy5mcy5leHBlY3RzKCdzdGF0Jykub25jZSgpLndpdGhFeGFjdEFyZ3MobG9jYWxGaWxlKS5yZXR1cm5zKHtzaXplOiAxMDB9KTtcbiAgICAgICAgbW9ja3MudGVtcC5leHBlY3RzKCdwYXRoJykub25jZSgpLnJldHVybnMobG9jYWxGaWxlKTtcblxuICAgICAgICBkcml2ZXIuX3JlY2VudFNjcmVlblJlY29yZGluZ1BhdGggPSByZW1vdGVQYXRoO1xuICAgICAgICAoYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKCkpXG4gICAgICAgICAgLnNob3VsZC5iZS5lcWwobWVkaWFDb250ZW50LnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aC5zaG91bGQubm90LmJlLmVtcHR5O1xuICAgICAgICBkcml2ZXIuX3JlY2VudFNjcmVlblJlY29yZGluZ1BhdGguc2hvdWxkLm5vdC5iZS5lcWwobG9jYWxGaWxlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgYWRiIHNjcmVlbiByZWNvcmRpbmcgZXJyb3JzIG91dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbGVTaXplJykucmV0dXJucygzMSk7XG4gICAgICAgIGxldCBzaGVsbFN0dWIgPSBzaW5vbi5zdHViKGFkYiwgJ3NoZWxsJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2hlbGxTdHViXG4gICAgICAgICAgICAucmV0dXJucyhCLnJlamVjdChuZXcgRXJyb3IoJ3NoZWxsIGNvbW1hbmQgZmFpbGVkJykpKTtcblxuICAgICAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbigpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvc2hlbGwgY29tbWFuZCBmYWlsZWQvKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBzaGVsbFN0dWIucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGxzIG11bHRpcGxlIHRpbWVzIHVudGlsIHNpemUgaXMgYmlnIGVub3VnaCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpLnJldHVybnMobmV3IEIoKCkgPT4ge30pKTtcbiAgICAgICAgbGV0IGZpbGVTaXplU3R1YiA9IHNpbm9uLnN0dWIoYWRiLCAnZmlsZVNpemUnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaWxlU2l6ZVN0dWJcbiAgICAgICAgICAgICAgLm9uQ2FsbCgwKVxuICAgICAgICAgICAgICAgIC5yZXR1cm5zKDMxKVxuICAgICAgICAgICAgICAub25DYWxsKDEpXG4gICAgICAgICAgICAgICAgLnJldHVybnMoNDIpO1xuXG4gICAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgZmlsZVNpemVTdHViLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgY2FsbCBscyBtdWx0aXBsZSB0aW1lcyBhbmQgZmFpbCBpZiBzaXplIG5ldmVyIGdldHMgYmlnIGVub3VnaCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpLnJldHVybnMobmV3IEIoKCkgPT4ge30pKTtcbiAgICAgICAgbGV0IGZpbGVTaXplU3R1YiA9IHNpbm9uLnN0dWIoYWRiLCAnZmlsZVNpemUnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaWxlU2l6ZVN0dWIud2l0aEFyZ3MoKS5yZXR1cm5zKDMxKTtcblxuICAgICAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbigpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaXMgc3RpbGwgdG9vIHNtYWxsOiAzMSBieXRlcy8pO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGZpbGVTaXplU3R1Yi5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N0b3BSZWNvcmRpbmdTY3JlZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhZnRlckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgICAgIG1vY2tzLnRlbXAudmVyaWZ5KCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBraWxsIHRoZSBwcm9jZXNzIGFuZCBnZXQgdGhlIGNvbnRlbnQgb2YgdGhlIGNyZWF0ZWQgbXA0IGZpbGUgdXNpbmcgbHNvZicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcGlkcyA9IFsnMSddO1xuICAgICAgICBkcml2ZXIuX3JlY2VudFNjcmVlblJlY29yZGluZ1BhdGggPSBudWxsO1xuICAgICAgICBjb25zdCByZW1vdGVQYXRoID0gJy9zZGNhcmQvZmlsZS5tcDQnO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UElEc0J5TmFtZScpLndpdGhFeGFjdEFyZ3MoJ3NjcmVlbnJlY29yZCcpXG4gICAgICAgICAgLmF0TGVhc3QoMSkucmV0dXJucyhwaWRzKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykud2l0aEV4YWN0QXJncyhbJ2xzb2YnLCAnLXAnLCBwaWRzLmpvaW4oJywnKV0pLnJldHVybnMoe291dHB1dDogYFxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICBtZW0gICAgICAgUkVHICAgICAgICAgICAgICAyNTMsMCAgIDEzMzAxNjAgICAgICAgIDU1NCAvc3lzdGVtL2Jpbi9saW5rZXI2NFxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDB1ICAgICB1bml4ICAgICAgICAgICAgICAgICAgICAgICAgICAwdDAgICAgICA5OTkzNSBzb2NrZXRcbiAgICAgICAgICBzY3JlZW5yZWMgMTEzMjggICAgICBzaGVsbCAgICAxdSAgICAgdW5peCAgICAgICAgICAgICAgICAgICAgICAgICAgMHQwICAgICAgOTk5MzUgc29ja2V0XG4gICAgICAgICAgc2NyZWVucmVjIDExMzI4ICAgICAgc2hlbGwgICAgMnUgICAgIHVuaXggICAgICAgICAgICAgICAgICAgICAgICAgIDB0MCAgICAgIDk5OTM3IHNvY2tldFxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDN1ICAgICAgQ0hSICAgICAgICAgICAgICAxMCw2NCAgICAgICAwdDAgICAgICAxMjMwMCAvZGV2L2JpbmRlclxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDR1ICAgICB1bml4ICAgICAgICAgICAgICAgICAgICAgICAgICAwdDAgICAgIDEwMTgyNSBzb2NrZXRcbiAgICAgICAgICBzY3JlZW5yZWMgMTEzMjggICAgICBzaGVsbCAgICA1dyAgICAgIENIUiAgICAgICAgICAgICAgMjU0LDAgICAgICAgMHQwICAgICAgIDI5MjMgL2Rldi9wbXNnMFxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDZ1ICAgICAgQ0hSICAgICAgICAgICAgICAxMCw2MiAgICAgICAwdDAgICAgICAxMTY5MCAvZGV2L2FzaG1lbVxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDd1ICAgICAgQ0hSICAgICAgICAgICAgICAxMCw2MiAgICAgICAwdDAgICAgICAxMTY5MCAvZGV2L2FzaG1lbVxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDh3ICAgICAgUkVHICAgICAgICAgICAgICAgIDAsNSAgICAgICAgIDAgICAgICAgNjcwNiAvc3lzL2tlcm5lbC9kZWJ1Zy90cmFjaW5nL3RyYWNlX21hcmtlclxuICAgICAgICAgIHNjcmVlbnJlYyAxMTMyOCAgICAgIHNoZWxsICAgIDl1ICAgICAgUkVHICAgICAgICAgICAgICAgMCwxOSAgICAgMTE1MjEgICAgIDI5NDY3MyAke3JlbW90ZVBhdGh9XG4gICAgICAgIGB9KTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykud2l0aEV4YWN0QXJncyhbJ2tpbGwnLCAnLTInLCAuLi5waWRzXSk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoWydraWxsJywgJy0wJywgLi4ucGlkc10pLnRocm93cygpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncHVsbCcpLm9uY2UoKS53aXRoRXhhY3RBcmdzKHJlbW90ZVBhdGgsIGxvY2FsRmlsZSk7XG4gICAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JlYWRGaWxlJykub25jZSgpLndpdGhFeGFjdEFyZ3MobG9jYWxGaWxlKS5yZXR1cm5zKG1lZGlhQ29udGVudCk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyaW1yYWYnKS5vbmNlKCkud2l0aEV4YWN0QXJncyhyZW1vdGVQYXRoKTtcbiAgICAgICAgbW9ja3MuZnMuZXhwZWN0cygncmltcmFmJykub25jZSgpLndpdGhFeGFjdEFyZ3MobG9jYWxGaWxlKTtcbiAgICAgICAgbW9ja3MuZnMuZXhwZWN0cygnc3RhdCcpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGxvY2FsRmlsZSkucmV0dXJucyh7c2l6ZTogMTAwfSk7XG4gICAgICAgIG1vY2tzLnRlbXAuZXhwZWN0cygncGF0aCcpLm9uY2UoKS5yZXR1cm5zKGxvY2FsRmlsZSk7XG5cbiAgICAgICAgKGF3YWl0IGRyaXZlci5zdG9wUmVjb3JkaW5nU2NyZWVuKCkpLnNob3VsZC5lcWwobWVkaWFDb250ZW50LnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCB1c2UgdGhlIHJlbWVtYmVyZWQgZmlsZSBwYXRoIGlmIHByZXNlbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBpZHMgPSBbJzEnXTtcbiAgICAgICAgZHJpdmVyLl9yZWNlbnRTY3JlZW5SZWNvcmRpbmdQYXRoID0gJy9zZGNhcmQvZmlsZS5tcDQnO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UElEc0J5TmFtZScpLndpdGhFeGFjdEFyZ3MoJ3NjcmVlbnJlY29yZCcpXG4gICAgICAgICAgLmF0TGVhc3QoMSkucmV0dXJucyhwaWRzKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykud2l0aEV4YWN0QXJncyhbJ2tpbGwnLCAnLTInLCAuLi5waWRzXSk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoWydraWxsJywgJy0wJywgLi4ucGlkc10pLnRocm93cygpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncHVsbCcpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCwgbG9jYWxGaWxlKTtcbiAgICAgICAgbW9ja3MuZnMuZXhwZWN0cygncmVhZEZpbGUnKS5vbmNlKCkud2l0aEV4YWN0QXJncyhsb2NhbEZpbGUpLnJldHVybnMobWVkaWFDb250ZW50KTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JpbXJhZicpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCk7XG4gICAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JpbXJhZicpLndpdGhFeGFjdEFyZ3MobG9jYWxGaWxlKS5vbmNlKCk7XG4gICAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3N0YXQnKS5vbmNlKCkud2l0aEV4YWN0QXJncyhsb2NhbEZpbGUpLnJldHVybnMoe3NpemU6IDEwMH0pO1xuICAgICAgICBtb2Nrcy50ZW1wLmV4cGVjdHMoJ3BhdGgnKS5vbmNlKCkucmV0dXJucyhsb2NhbEZpbGUpO1xuXG4gICAgICAgIChhd2FpdCBkcml2ZXIuc3RvcFJlY29yZGluZ1NjcmVlbigpKS5zaG91bGQuZXFsKG1lZGlhQ29udGVudC50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB0aGUgcmVjb3JkZWQgZmlsZSBpcyB0b28gbGFyZ2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBpZHMgPSBbJzEnXTtcbiAgICAgICAgZHJpdmVyLl9yZWNlbnRTY3JlZW5SZWNvcmRpbmdQYXRoID0gJy9zZGNhcmQvZmlsZS5tcDQnO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UElEc0J5TmFtZScpLndpdGhFeGFjdEFyZ3MoJ3NjcmVlbnJlY29yZCcpXG4gICAgICAgICAgLmF0TGVhc3QoMSkucmV0dXJucyhwaWRzKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykud2l0aEV4YWN0QXJncyhbJ2tpbGwnLCAnLTInLCAuLi5waWRzXSk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoWydraWxsJywgJy0wJywgLi4ucGlkc10pLnRocm93cygpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncHVsbCcpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCwgbG9jYWxGaWxlKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JpbXJhZicpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCk7XG4gICAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JpbXJhZicpLndpdGhFeGFjdEFyZ3MobG9jYWxGaWxlKS5vbmNlKCk7XG4gICAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3N0YXQnKS5vbmNlKCkud2l0aEV4YWN0QXJncyhsb2NhbEZpbGUpXG4gICAgICAgICAgLnJldHVybnMoe3NpemU6IHByb2Nlc3MubWVtb3J5VXNhZ2UoKS5oZWFwVG90YWx9KTtcbiAgICAgICAgbW9ja3MudGVtcC5leHBlY3RzKCdwYXRoJykub25jZSgpLnJldHVybnMobG9jYWxGaWxlKTtcblxuICAgICAgICBhd2FpdCBkcml2ZXIuc3RvcFJlY29yZGluZ1NjcmVlbigpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaXMgdG9vIGxhcmdlLyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIG5vIHJlY29yZGluZyBwcm9jZXNzZXMgYXJlIHJ1bm5pbmcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRyaXZlci5fcmVjZW50U2NyZWVuUmVjb3JkaW5nUGF0aCA9IG51bGw7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRQSURzQnlOYW1lJylcbiAgICAgICAgICAuYXRMZWFzdCgxKS53aXRoRXhhY3RBcmdzKCdzY3JlZW5yZWNvcmQnKS5yZXR1cm5zKFtdKTtcblxuICAgICAgICAoYXdhaXQgZHJpdmVyLnN0b3BSZWNvcmRpbmdTY3JlZW4oKSkuc2hvdWxkLmVxbCgnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=

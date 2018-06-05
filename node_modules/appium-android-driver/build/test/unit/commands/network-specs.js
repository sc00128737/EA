'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var driver = undefined;
var adb = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Network', function () {
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          adb = new _appiumAdb2['default']();
          driver.adb = adb;
          sandbox.stub(adb);
          sandbox.stub(driver, 'isEmulator');
          sandbox.stub(driver, 'wrapBootstrapDisconnect', function callee$2$0(fn) {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(fn());

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
          sandbox.stub(_bluebird2['default'], 'delay');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('getNetworkConnection', function () {
    beforeEach(function () {
      adb.isAirplaneModeOn.returns(false);
      adb.isDataOn.returns(false);
      sandbox.stub(driver, 'isWifiOn').returns(false);
    });
    it('should determine nothing enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(0));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should determine airplane mode is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isAirplaneModeOn.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(1));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should determine wifi is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isWifiOn.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(2));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should determine data is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isDataOn.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(4));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should determine wifi and data are on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isWifiOn.returns(true);
            adb.isDataOn.returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(6));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('isWifiOn', function () {
    it('should return wifi state', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isWifiOn.returns('wifi_state');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isWifiOn().should.become('wifi_state'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setNetworkConnection', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getNetworkConnection').returns('res');
            sandbox.stub(driver, 'setWifiState');
            driver.isEmulator.returns(false);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should turn off wifi and data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(0).should.become('res'));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(0).should.be['true'];
            adb.setDataState.calledWithExactly(0, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should turn on and broadcast airplane mode', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(1));

          case 2:
            adb.setAirplaneMode.calledWithExactly(1).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(1).should.be['true'];
            driver.setWifiState.called.should.be['false'];
            adb.setDataState.called.should.be['false'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should turn on wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(2));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(1).should.be['true'];
            adb.setDataState.calledWithExactly(0, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should turn on data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(4));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(0).should.be['true'];
            adb.setDataState.calledWithExactly(1, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should turn on data and wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(6));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(1).should.be['true'];
            adb.setDataState.calledWithExactly(1, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setWifiState', function () {
    it('should set wifi state', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isEmulator.returns('is_emu');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setWifiState('wifi_state'));

          case 3:
            adb.setWifiState.calledWithExactly('wifi_state', 'is_emu').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('toggleData', function () {
    it('should toggle data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isDataOn.returns(false);
            driver.isEmulator.returns('is_emu');
            adb.setWifiAndData.returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleData());

          case 5:
            adb.setWifiAndData.calledWithExactly({ data: true }, 'is_emu').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('toggleWiFi', function () {
    it('should toggle wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isWifiOn.returns(false);
            driver.isEmulator.returns('is_emu');
            adb.setWifiAndData.returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleWiFi());

          case 5:
            adb.setWifiAndData.calledWithExactly({ wifi: true }, 'is_emu').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('toggleFlightMode', function () {
    it('should toggle flight mode', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isAirplaneModeOn.returns(false);
            adb.setAirplaneMode.returns('');
            adb.broadcastAirplaneMode.returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleFlightMode());

          case 5:
            adb.setAirplaneMode.calledWithExactly(true).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(true).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setGeoLocation', function () {
    it('should set location', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.setGeoLocation.withArgs('location', 'is_emu').returns('res');
            driver.isEmulator.returns('is_emu');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setGeoLocation('location').should.become('res'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('toggleLocationSettings', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'toggleSetting');

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw an error for API<16', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.getApiLevel.returns(15);
            driver.isEmulator.returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices().should.eventually.be.rejectedWith(/implemented/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should generate the correct sequence of keys for API 16', function callee$2$0() {
      var sequence;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sequence = [19, 19, 20];

            adb.getApiLevel.returns(16);
            driver.isEmulator.returns(false);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            driver.toggleSetting.calledWith('LOCATION_SOURCE_SETTINGS', sequence).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should generate the correct sequence of keys for API >= 19', function callee$2$0() {
      var sequence;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sequence = [22, 22, 19];

            adb.getApiLevel.returns(19);
            driver.isEmulator.returns(false);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            adb.keyevent.calledWithExactly(19).should.be['true'];
            driver.toggleSetting.calledWith('LOCATION_SOURCE_SETTINGS', sequence).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should set gps for emulators', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.getApiLevel.returns(19);
            driver.isEmulator.returns(true);
            adb.getLocationProviders.returns(['wifi']);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            adb.toggleGPSLocationProvider.calledWithExactly(true).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('toggleSetting', function () {
    beforeEach(function () {
      sandbox.stub(driver, 'doKey').returns('');
      sandbox.stub(driver, 'openSettingsActivity').returns('');
      adb.getFocusedPackageAndActivity.returns({ appPackage: 'fpkg', appActivity: 'fact' });
    });
    it('should toggle setting', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.toggleSetting('set', [61, 72]));

          case 2:
            driver.doKey.getCall(0).args[0].should.be.equal(61);
            driver.doKey.getCall(1).args[0].should.be.equal(72);
            driver.doKey.getCall(2).args[0].should.be.equal(23);
            driver.doKey.getCall(3).args[0].should.be.equal(22);
            driver.doKey.getCall(4).args[0].should.be.equal(23);
            driver.openSettingsActivity.calledWithExactly('set').should.be['true'];
            adb.waitForNotActivity.calledTwice.should.be['true'];
            adb.waitForNotActivity.alwaysCalledWith('fpkg', 'fact').should.be['true'];
            adb.back.calledOnce.should.be['true'];

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should use default key sequence', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.toggleSetting('set', null));

          case 2:
            driver.doKey.getCall(0).args[0].should.be.equal(19);
            driver.doKey.getCall(1).args[0].should.be.equal(19);
            driver.doKey.getCall(2).args[0].should.be.equal(20);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should skip errors from adb.waitForNotActivity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.waitForNotActivity.throws();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.toggleSetting('set', null).should.be.fulfilled);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('doKey', function () {
    it('should send key event', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.doKey(55));

          case 2:
            adb.keyevent.calledWithExactly(55).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('wrapBootstrapDisconnect', function () {
    it('should restart adb and start bootstrap', function callee$2$0() {
      var fn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.wrapBootstrapDisconnect.restore();
            fn = sandbox.stub();

            driver.bootstrap = sandbox.stub();
            driver.bootstrap.start = sandbox.stub();
            driver.opts = { appPackage: 'pkg', disableAndroidWatchers: 'daw', acceptSslCerts: 'acert' };
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.wrapBootstrapDisconnect(fn));

          case 7:
            _sinon2['default'].assert.callOrder(fn, adb.restart, driver.bootstrap.start);
            driver.bootstrap.calledWithExactly('pkg', 'daw', 'acert');
            driver.bootstrap.ignoreUnexpectedShutdown.should.be['false'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9uZXR3b3JrLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7eUJBQ1QsWUFBWTs7OztnQkFDRixVQUFVOzs7O3dCQUN0QixVQUFVOzs7O0FBRXhCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsSUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLFlBQVUsQ0FBQzs7Ozs7O0FBQ1QsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixhQUFHLEdBQUcsNEJBQVMsQ0FBQztBQUNoQixnQkFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDakIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ25DLGlCQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxvQkFBTyxFQUFFOzs7OzttREFDakQsRUFBRSxFQUFFOzs7Ozs7O1dBQ1gsQ0FBQyxDQUFDO0FBQ0gsaUJBQU8sQ0FBQyxJQUFJLHdCQUFJLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0dBQzFCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFZO0FBQ3BCLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWTtBQUMzQyxjQUFVLENBQUMsWUFBWTtBQUNyQixTQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFD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SyxDQUFDLEVBQUUsQ0FBQzs7O0FBQ3RCLGVBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDOzs7Ozs7O0tBQ25ELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyx5QkFBeUIsRUFBRSxZQUFZO0FBQzlDLE1BQUUsQ0FBQyx3Q0FBd0MsRUFBRTtVQUV2QyxFQUFFOzs7O0FBRE4sa0JBQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQyxjQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRTs7QUFDdkIsa0JBQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xDLGtCQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDeEMsa0JBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFDLENBQUM7OzZDQUNwRixNQUFNLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDOzs7QUFDeEMsK0JBQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hFLGtCQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQsa0JBQU0sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDOzs7Ozs7O0tBQzNELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvbmV0d29yay1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5cbmxldCBkcml2ZXI7XG5sZXQgYWRiO1xubGV0IHNhbmRib3ggPSBzaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ05ldHdvcmsnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZUVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYWRiID0gbmV3IEFEQigpO1xuICAgIGRyaXZlci5hZGIgPSBhZGI7XG4gICAgc2FuZGJveC5zdHViKGFkYik7XG4gICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKTtcbiAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnd3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QnLCBhc3luYyAoZm4pID0+IHtcbiAgICAgIGF3YWl0IGZuKCk7XG4gICAgfSk7XG4gICAgc2FuZGJveC5zdHViKEIsICdkZWxheScpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXROZXR3b3JrQ29ubmVjdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGFkYi5pc0FpcnBsYW5lTW9kZU9uLnJldHVybnMoZmFsc2UpO1xuICAgICAgYWRiLmlzRGF0YU9uLnJldHVybnMoZmFsc2UpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzV2lmaU9uJykucmV0dXJucyhmYWxzZSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkZXRlcm1pbmUgbm90aGluZyBlbmFibGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtDb25uZWN0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoMCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkZXRlcm1pbmUgYWlycGxhbmUgbW9kZSBpcyBvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFkYi5pc0FpcnBsYW5lTW9kZU9uLnJldHVybnModHJ1ZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgxKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRldGVybWluZSB3aWZpIGlzIG9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmlzV2lmaU9uLnJldHVybnModHJ1ZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgyKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRldGVybWluZSBkYXRhIGlzIG9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYWRiLmlzRGF0YU9uLnJldHVybnModHJ1ZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCg0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRldGVybWluZSB3aWZpIGFuZCBkYXRhIGFyZSBvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5pc1dpZmlPbi5yZXR1cm5zKHRydWUpO1xuICAgICAgYWRiLmlzRGF0YU9uLnJldHVybnModHJ1ZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCg2KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdpc1dpZmlPbicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aWZpIHN0YXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYWRiLmlzV2lmaU9uLnJldHVybnMoJ3dpZmlfc3RhdGUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5pc1dpZmlPbigpLnNob3VsZC5iZWNvbWUoJ3dpZmlfc3RhdGUnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXROZXR3b3JrQ29ubmVjdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXROZXR3b3JrQ29ubmVjdGlvbicpLnJldHVybnMoJ3JlcycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3NldFdpZmlTdGF0ZScpO1xuICAgICAgZHJpdmVyLmlzRW11bGF0b3IucmV0dXJucyhmYWxzZSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9mZiB3aWZpIGFuZCBkYXRhJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDApLnNob3VsZC5iZWNvbWUoJ3JlcycpO1xuICAgICAgYWRiLnNldEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuc2V0V2lmaVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xuICAgICAgYWRiLnNldERhdGFTdGF0ZS5jYWxsZWRXaXRoRXhhY3RseSgwLCBmYWxzZSkuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9uIGFuZCBicm9hZGNhc3QgYWlycGxhbmUgbW9kZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXROZXR3b3JrQ29ubmVjdGlvbigxKTtcbiAgICAgIGFkYi5zZXRBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBhZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDEpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLnNldFdpZmlTdGF0ZS5jYWxsZWQuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgYWRiLnNldERhdGFTdGF0ZS5jYWxsZWQuc2hvdWxkLmJlLmZhbHNlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdHVybiBvbiB3aWZpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDIpO1xuICAgICAgYWRiLnNldEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuc2V0V2lmaVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDEpLnNob3VsZC5iZS50cnVlO1xuICAgICAgYWRiLnNldERhdGFTdGF0ZS5jYWxsZWRXaXRoRXhhY3RseSgwLCBmYWxzZSkuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9uIGRhdGEnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0TmV0d29ya0Nvbm5lY3Rpb24oNCk7XG4gICAgICBhZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xuICAgICAgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5zZXRXaWZpU3RhdGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBhZGIuc2V0RGF0YVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDEsIGZhbHNlKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHR1cm4gb24gZGF0YSBhbmQgd2lmaScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXROZXR3b3JrQ29ubmVjdGlvbig2KTtcbiAgICAgIGFkYi5zZXRBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBhZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLnNldFdpZmlTdGF0ZS5jYWxsZWRXaXRoRXhhY3RseSgxKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGFkYi5zZXREYXRhU3RhdGUuY2FsbGVkV2l0aEV4YWN0bHkoMSwgZmFsc2UpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3NldFdpZmlTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHNldCB3aWZpIHN0YXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmlzRW11bGF0b3IucmV0dXJucygnaXNfZW11Jyk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0V2lmaVN0YXRlKCd3aWZpX3N0YXRlJyk7XG4gICAgICBhZGIuc2V0V2lmaVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KCd3aWZpX3N0YXRlJywgJ2lzX2VtdScpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3RvZ2dsZURhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCB0b2dnbGUgZGF0YScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFkYi5pc0RhdGFPbi5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIGRyaXZlci5pc0VtdWxhdG9yLnJldHVybnMoJ2lzX2VtdScpO1xuICAgICAgYWRiLnNldFdpZmlBbmREYXRhLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZURhdGEoKTtcbiAgICAgIGFkYi5zZXRXaWZpQW5kRGF0YS5jYWxsZWRXaXRoRXhhY3RseSh7ZGF0YTogdHJ1ZX0sICdpc19lbXUnKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgndG9nZ2xlV2lGaScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHRvZ2dsZSB3aWZpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYWRiLmlzV2lmaU9uLnJldHVybnMoZmFsc2UpO1xuICAgICAgZHJpdmVyLmlzRW11bGF0b3IucmV0dXJucygnaXNfZW11Jyk7XG4gICAgICBhZGIuc2V0V2lmaUFuZERhdGEucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlV2lGaSgpO1xuICAgICAgYWRiLnNldFdpZmlBbmREYXRhLmNhbGxlZFdpdGhFeGFjdGx5KHt3aWZpOiB0cnVlfSwgJ2lzX2VtdScpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0b2dnbGVGbGlnaHRNb2RlJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgdG9nZ2xlIGZsaWdodCBtb2RlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYWRiLmlzQWlycGxhbmVNb2RlT24ucmV0dXJucyhmYWxzZSk7XG4gICAgICBhZGIuc2V0QWlycGxhbmVNb2RlLnJldHVybnMoJycpO1xuICAgICAgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGRyaXZlci50b2dnbGVGbGlnaHRNb2RlKCk7XG4gICAgICBhZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KHRydWUpLnNob3VsZC5iZS50cnVlO1xuICAgICAgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSh0cnVlKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRHZW9Mb2NhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHNldCBsb2NhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFkYi5zZXRHZW9Mb2NhdGlvbi53aXRoQXJncygnbG9jYXRpb24nLCAnaXNfZW11JykucmV0dXJucygncmVzJyk7XG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKCdpc19lbXUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRHZW9Mb2NhdGlvbignbG9jYXRpb24nKS5zaG91bGQuYmVjb21lKCdyZXMnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0b2dnbGVMb2NhdGlvblNldHRpbmdzJywgZnVuY3Rpb24gKCkge1xuICAgIGJlZm9yZUVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3RvZ2dsZVNldHRpbmcnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGZvciBBUEk8MTYnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygxNSk7XG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIGF3YWl0IGRyaXZlci50b2dnbGVMb2NhdGlvblNlcnZpY2VzKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9pbXBsZW1lbnRlZC8pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgdGhlIGNvcnJlY3Qgc2VxdWVuY2Ugb2Yga2V5cyBmb3IgQVBJIDE2JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHNlcXVlbmNlID0gWzE5LCAxOSwgMjBdO1xuICAgICAgYWRiLmdldEFwaUxldmVsLnJldHVybnMoMTYpO1xuICAgICAgZHJpdmVyLmlzRW11bGF0b3IucmV0dXJucyhmYWxzZSk7XG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlTG9jYXRpb25TZXJ2aWNlcygpO1xuICAgICAgZHJpdmVyLnRvZ2dsZVNldHRpbmcuY2FsbGVkV2l0aCgnTE9DQVRJT05fU09VUkNFX1NFVFRJTkdTJywgc2VxdWVuY2UpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgdGhlIGNvcnJlY3Qgc2VxdWVuY2Ugb2Yga2V5cyBmb3IgQVBJID49IDE5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHNlcXVlbmNlID0gWzIyLCAyMiwgMTldO1xuICAgICAgYWRiLmdldEFwaUxldmVsLnJldHVybnMoMTkpO1xuICAgICAgZHJpdmVyLmlzRW11bGF0b3IucmV0dXJucyhmYWxzZSk7XG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlTG9jYXRpb25TZXJ2aWNlcygpO1xuICAgICAgYWRiLmtleWV2ZW50LmNhbGxlZFdpdGhFeGFjdGx5KDE5KS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci50b2dnbGVTZXR0aW5nLmNhbGxlZFdpdGgoJ0xPQ0FUSU9OX1NPVVJDRV9TRVRUSU5HUycsIHNlcXVlbmNlKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgZ3BzIGZvciBlbXVsYXRvcnMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygxOSk7XG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKHRydWUpO1xuICAgICAgYWRiLmdldExvY2F0aW9uUHJvdmlkZXJzLnJldHVybnMoWyd3aWZpJ10pO1xuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMoKTtcbiAgICAgIGFkYi50b2dnbGVHUFNMb2NhdGlvblByb3ZpZGVyLmNhbGxlZFdpdGhFeGFjdGx5KHRydWUpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3RvZ2dsZVNldHRpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9LZXknKS5yZXR1cm5zKCcnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdvcGVuU2V0dGluZ3NBY3Rpdml0eScpLnJldHVybnMoJycpO1xuICAgICAgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHlcbiAgICAgICAgLnJldHVybnMoe2FwcFBhY2thZ2U6ICdmcGtnJywgYXBwQWN0aXZpdHk6J2ZhY3QnfSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0b2dnbGUgc2V0dGluZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci50b2dnbGVTZXR0aW5nKCdzZXQnLCBbNjEsIDcyXSk7XG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg2MSk7XG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg3Mik7XG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCgyKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCgyMyk7XG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCgzKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCgyMik7XG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCg0KS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCgyMyk7XG4gICAgICBkcml2ZXIub3BlblNldHRpbmdzQWN0aXZpdHkuY2FsbGVkV2l0aEV4YWN0bHkoJ3NldCcpLnNob3VsZC5iZS50cnVlO1xuICAgICAgYWRiLndhaXRGb3JOb3RBY3Rpdml0eS5jYWxsZWRUd2ljZS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGFkYi53YWl0Rm9yTm90QWN0aXZpdHkuYWx3YXlzQ2FsbGVkV2l0aCgnZnBrZycsICdmYWN0Jykuc2hvdWxkLmJlLnRydWU7XG4gICAgICBhZGIuYmFjay5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdXNlIGRlZmF1bHQga2V5IHNlcXVlbmNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZVNldHRpbmcoJ3NldCcsIG51bGwpO1xuICAgICAgZHJpdmVyLmRvS2V5LmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoMTkpO1xuICAgICAgZHJpdmVyLmRvS2V5LmdldENhbGwoMSkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoMTkpO1xuICAgICAgZHJpdmVyLmRvS2V5LmdldENhbGwoMikuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoMjApO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc2tpcCBlcnJvcnMgZnJvbSBhZGIud2FpdEZvck5vdEFjdGl2aXR5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYWRiLndhaXRGb3JOb3RBY3Rpdml0eS50aHJvd3MoKTtcbiAgICAgIGF3YWl0IGRyaXZlci50b2dnbGVTZXR0aW5nKCdzZXQnLCBudWxsKS5zaG91bGQuYmUuZnVsZmlsbGVkO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2RvS2V5JywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgc2VuZCBrZXkgZXZlbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuZG9LZXkoNTUpO1xuICAgICAgYWRiLmtleWV2ZW50LmNhbGxlZFdpdGhFeGFjdGx5KDU1KS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd3cmFwQm9vdHN0cmFwRGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJlc3RhcnQgYWRiIGFuZCBzdGFydCBib290c3RyYXAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QucmVzdG9yZSgpO1xuICAgICAgbGV0IGZuID0gc2FuZGJveC5zdHViKCk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwID0gc2FuZGJveC5zdHViKCk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnN0YXJ0ID0gc2FuZGJveC5zdHViKCk7XG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiAncGtnJywgZGlzYWJsZUFuZHJvaWRXYXRjaGVyczogJ2RhdycsIGFjY2VwdFNzbENlcnRzOiAnYWNlcnQnfTtcbiAgICAgIGF3YWl0IGRyaXZlci53cmFwQm9vdHN0cmFwRGlzY29ubmVjdChmbik7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbE9yZGVyKGZuLCBhZGIucmVzdGFydCwgZHJpdmVyLmJvb3RzdHJhcC5zdGFydCk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLmNhbGxlZFdpdGhFeGFjdGx5KCdwa2cnLCAnZGF3JywgJ2FjZXJ0Jyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLmlnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93bi5zaG91bGQuYmUuZmFsc2U7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=

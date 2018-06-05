'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _libAndroidHelpers = require('../../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Element', function () {
  beforeEach(function () {
    driver = new _2['default']();
    driver.adb = new _appiumAdb2['default']();
    driver.bootstrap = new _appiumAndroidBootstrap2['default']();
    sandbox.stub(driver.bootstrap, 'sendAction');
    sandbox.stub(_libAndroidHelpers2['default'], 'removeNullProperties');
    driver.opts = { unicodeKeyboard: true };
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('getAttribute', function () {
    it('should get element attribute', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getAttribute').returns('attr_value');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getAttribute('attr', 'el1').should.become('attr_value'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getAttribute', { attribute: 'attr', elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getName', function () {
    it('should get element name', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('el_name');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getName('el1').should.become('el_name'));

          case 4:
            driver.getAttribute.calledWithExactly('className', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('elementDisplayed', function () {
    it('should return true if element displayed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementDisplayed('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('displayed', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return false if element not displayed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementDisplayed('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('displayed', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('elementEnabled', function () {
    it('should return true if element enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementEnabled('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('enabled', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return false if element not enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementEnabled('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('enabled', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('elementSelected', function () {
    it('should return true if element selected', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementSelected('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('selected', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return false if element not selected', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementSelected('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('selected', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setElementValue', function () {
    var params = { elementId: 'el0', text: 'text to set', replace: true,
      unicodeKeyboard: true };
    it('should call doSetElementValue', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setElementValue('text to set', 'el0', true));

          case 3:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should join keys parameter if keys is instance of Array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setElementValue(['t', 'ext', ' to ', 'se', 't'], 'el0', true));

          case 3:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should set replace to false by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params.replace = false;
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setElementValue(['t', 'ext', ' to ', 'se', 't'], 'el0'));

          case 4:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('doSetElementValue', function () {
    it('should call setText to set element value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.doSetElementValue('params'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:setText', 'params').should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setValue', function () {
    it('should call setElementValue to set value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'setElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setValue('keys', 'el1'));

          case 3:
            driver.setElementValue.calledWithExactly('keys', 'el1', false).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('replaceValue', function () {
    it('should call setElementValue to replace value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'setElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.replaceValue('keys', 'el1'));

          case 3:
            driver.setElementValue.calledWithExactly('keys', 'el1', true).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setValueImmediate', function () {
    it('should set value via adb inputText command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'inputText');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setValueImmediate('keys', 'el1'));

          case 4:
            driver.click.calledWithExactly('el1').should.be['true'];
            driver.adb.inputText.calledWithExactly('keys').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should join keys parameter if keys is instance of Array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'inputText');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setValueImmediate(['k', 'ey', 's'], 'el1'));

          case 4:
            driver.adb.inputText.calledWithExactly('keys').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getText', function () {
    it('should get element text', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getText').returns('el_text');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getText('el1').should.become('el_text'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getText', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('clear', function () {
    it('should clear text of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.getText.withArgs('el1').returns('#'.repeat(110));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.clear('el1'));

          case 6:
            driver.getText.calledWithExactly('el1').should.be['true'];
            driver.click.calledWithExactly('el1').should.be['true'];
            driver.adb.clearTextField.getCall(0).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(1).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(2).args[0].should.be.equal(10);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should do five retries and then fail if clearTextField throws error', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(10000);

            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.adb.clearTextField.throws();
            driver.getText.withArgs('el1').returns('#'.repeat(1));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.clear('el1').should.be.rejected);

          case 8:
            driver.adb.clearTextField.alwaysCalledWith(1).should.be['true'];
            driver.adb.clearTextField.callCount.should.be.equal(5);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('it should assume that the text have 100 chars if getText returns empty string', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.getText.withArgs('el1').returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.clear('el1'));

          case 6:
            driver.adb.clearTextField.getCall(0).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(1).args[0].should.be.equal(50);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('click', function () {
    it('should click an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.click('el1'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:click', { elementId: 'el1' }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getLocation', function () {
    it('should get location of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getLocation').returns('loc_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getLocation('el1').should.become('loc_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getLocation', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getLocationInView', function () {
    it('should get location of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getLocation');
            driver.getLocation.returns('loc_info');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getLocationInView('el1').should.become('loc_info'));

          case 4:
            driver.getLocation.calledWithExactly('el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getSize', function () {
    it('should get size of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getSize').returns('size_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getSize('el1').should.become('size_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getSize', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchLongClick', function () {
    it('should do touch long click on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34, duration: 5 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchLongClick('el1', 12, 34, 5));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchLongClick', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchDown', function () {
    it('should do touch down on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchDown('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchDown', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchUp', function () {
    it('should do touch up on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchUp('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchUp', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchMove', function () {
    it('should get element attribute', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchMove('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchMove', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('complexTap', function () {
    it('should tap an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.complexTap(null, null, null, 12, 34));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('click', { x: 12, y: 34 }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('tap', function () {
    it('shoulde tap an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap('el1', 12, 34, 3));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('element:click', { elementId: 'el1', x: 12, y: 34 }).should.be['true'];
            driver.bootstrap.sendAction.calledThrice.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should tap without an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap(null, 12, 34, 3));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('click', { x: 12, y: 34 }).should.be['true'];
            driver.bootstrap.sendAction.calledThrice.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should perform single tap on element if x, y and count are not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap('el1'));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('element:click').should.be['true'];
            driver.bootstrap.sendAction.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9lbGVtZW50LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7c0NBQ0gsMEJBQTBCOzs7O2dCQUN0QixVQUFVOzs7O3lCQUNwQixZQUFZOzs7O2lDQUNELDhCQUE4Qjs7OztBQUV6RCxJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLFlBQVUsQ0FBQyxZQUFZO0FBQ3JCLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixVQUFNLENBQUMsR0FBRyxHQUFHLDRCQUFTLENBQUM7QUFDdkIsVUFBTSxDQUFDLFNBQVMsR0FBRyx5Q0FBZSxDQUFDO0FBQ25DLFdBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM3QyxXQUFPLENBQUMsSUFBSSxpQ0FBaUIsc0JBQXNCLENBQUMsQ0FBQztBQUNyRCxVQUFNLENBQUMsSUFBSSxHQUFHLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBQyxDQUFDO0dBQ3ZDLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFZO0FBQ3BCLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7QUFDbkMsTUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7O0FBQ2pDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7OzZDQUM3RSxNQUFNLENBQUMs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TSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUN6RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0JBQStCLEVBQUU7Ozs7OzZDQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FBQ2pDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUNsRSxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDbEIsa0JBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDekQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHVFQUF1RSxFQUFFOzs7Ozs2Q0FDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7OztBQUN2QixrQkFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDO0FBQzdFLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDOzs7Ozs7O0tBQ3ZELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvZWxlbWVudC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBCb290c3RyYXAgZnJvbSAnYXBwaXVtLWFuZHJvaWQtYm9vdHN0cmFwJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XG5cbmxldCBkcml2ZXI7XG5sZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnRWxlbWVudCcsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBkcml2ZXIuYWRiID0gbmV3IEFEQigpO1xuICAgIGRyaXZlci5ib290c3RyYXAgPSBuZXcgQm9vdHN0cmFwKCk7XG4gICAgc2FuZGJveC5zdHViKGRyaXZlci5ib290c3RyYXAsICdzZW5kQWN0aW9uJyk7XG4gICAgc2FuZGJveC5zdHViKGFuZHJvaWRIZWxwZXJzLCAncmVtb3ZlTnVsbFByb3BlcnRpZXMnKTtcbiAgICBkcml2ZXIub3B0cyA9IHt1bmljb2RlS2V5Ym9hcmQ6IHRydWV9O1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXRBdHRyaWJ1dGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZWxlbWVudCBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24ud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0QXR0cmlidXRlJykucmV0dXJucygnYXR0cl92YWx1ZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgnYXR0cicsICdlbDEnKS5zaG91bGQuYmVjb21lKCdhdHRyX3ZhbHVlJyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmdldEF0dHJpYnV0ZScsIHthdHRyaWJ1dGU6ICdhdHRyJywgZWxlbWVudElkOiAnZWwxJ30pXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXROYW1lJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IGVsZW1lbnQgbmFtZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygnZWxfbmFtZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE5hbWUoJ2VsMScpLnNob3VsZC5iZWNvbWUoJ2VsX25hbWUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2NsYXNzTmFtZScsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdlbGVtZW50RGlzcGxheWVkJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZWxlbWVudCBkaXNwbGF5ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ3RydWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50RGlzcGxheWVkKCdlbDEnKS5zaG91bGQuYmVjb21lKHRydWUpO1xuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5jYWxsZWRXaXRoRXhhY3RseSgnZGlzcGxheWVkJywgJ2VsMScpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGVsZW1lbnQgbm90IGRpc3BsYXllZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygnZmFsc2UnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50RGlzcGxheWVkKCdlbDEnKS5zaG91bGQuYmVjb21lKGZhbHNlKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2Rpc3BsYXllZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdlbGVtZW50RW5hYmxlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGVsZW1lbnQgZW5hYmxlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygndHJ1ZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRFbmFibGVkKCdlbDEnKS5zaG91bGQuYmVjb21lKHRydWUpO1xuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5jYWxsZWRXaXRoRXhhY3RseSgnZW5hYmxlZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBlbGVtZW50IG5vdCBlbmFibGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEF0dHJpYnV0ZScpO1xuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5yZXR1cm5zKCdmYWxzZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRFbmFibGVkKCdlbDEnKS5zaG91bGQuYmVjb21lKGZhbHNlKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2VuYWJsZWQnLCAnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZWxlbWVudFNlbGVjdGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZWxlbWVudCBzZWxlY3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygndHJ1ZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRTZWxlY3RlZCgnZWwxJykuc2hvdWxkLmJlY29tZSh0cnVlKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ3NlbGVjdGVkJywgJ2VsMScpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGVsZW1lbnQgbm90IHNlbGVjdGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEF0dHJpYnV0ZScpO1xuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5yZXR1cm5zKCdmYWxzZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRTZWxlY3RlZCgnZWwxJykuc2hvdWxkLmJlY29tZShmYWxzZSk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdzZWxlY3RlZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRFbGVtZW50VmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMCcsIHRleHQ6ICd0ZXh0IHRvIHNldCcsICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgdW5pY29kZUtleWJvYXJkOiB0cnVlfTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZG9TZXRFbGVtZW50VmFsdWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9TZXRFbGVtZW50VmFsdWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRFbGVtZW50VmFsdWUoJ3RleHQgdG8gc2V0JywgJ2VsMCcsIHRydWUpO1xuICAgICAgZHJpdmVyLmRvU2V0RWxlbWVudFZhbHVlLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBqb2luIGtleXMgcGFyYW1ldGVyIGlmIGtleXMgaXMgaW5zdGFuY2Ugb2YgQXJyYXknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9TZXRFbGVtZW50VmFsdWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRFbGVtZW50VmFsdWUoWyd0JywgJ2V4dCcsICcgdG8gJywgJ3NlJywgJ3QnXSwgJ2VsMCcsIHRydWUpO1xuICAgICAgZHJpdmVyLmRvU2V0RWxlbWVudFZhbHVlLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgcmVwbGFjZSB0byBmYWxzZSBieSBkZWZhdWx0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgcGFyYW1zLnJlcGxhY2UgPSBmYWxzZTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkb1NldEVsZW1lbnRWYWx1ZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLnNldEVsZW1lbnRWYWx1ZShbJ3QnLCAnZXh0JywgJyB0byAnLCAnc2UnLCAndCddLCAnZWwwJyk7XG4gICAgICBkcml2ZXIuZG9TZXRFbGVtZW50VmFsdWUuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdkb1NldEVsZW1lbnRWYWx1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2V0VGV4dCB0byBzZXQgZWxlbWVudCB2YWx1ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5kb1NldEVsZW1lbnRWYWx1ZSgncGFyYW1zJyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6c2V0VGV4dCcsXG4gICAgICAgICdwYXJhbXMnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRWYWx1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2V0RWxlbWVudFZhbHVlIHRvIHNldCB2YWx1ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzZXRFbGVtZW50VmFsdWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgna2V5cycsICdlbDEnKTtcbiAgICAgIGRyaXZlci5zZXRFbGVtZW50VmFsdWUuY2FsbGVkV2l0aEV4YWN0bHkoJ2tleXMnLCAnZWwxJywgZmFsc2UpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3JlcGxhY2VWYWx1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2V0RWxlbWVudFZhbHVlIHRvIHJlcGxhY2UgdmFsdWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc2V0RWxlbWVudFZhbHVlJyk7XG4gICAgICBhd2FpdCBkcml2ZXIucmVwbGFjZVZhbHVlKCdrZXlzJywgJ2VsMScpO1xuICAgICAgZHJpdmVyLnNldEVsZW1lbnRWYWx1ZS5jYWxsZWRXaXRoRXhhY3RseSgna2V5cycsICdlbDEnLCB0cnVlKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRWYWx1ZUltbWVkaWF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHNldCB2YWx1ZSB2aWEgYWRiIGlucHV0VGV4dCBjb21tYW5kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NsaWNrJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2lucHV0VGV4dCcpO1xuICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlSW1tZWRpYXRlKCdrZXlzJywgJ2VsMScpO1xuICAgICAgZHJpdmVyLmNsaWNrLmNhbGxlZFdpdGhFeGFjdGx5KCdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5hZGIuaW5wdXRUZXh0LmNhbGxlZFdpdGhFeGFjdGx5KCdrZXlzJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBqb2luIGtleXMgcGFyYW1ldGVyIGlmIGtleXMgaXMgaW5zdGFuY2Ugb2YgQXJyYXknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaW5wdXRUZXh0Jyk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWVJbW1lZGlhdGUoWydrJywgJ2V5JywgJ3MnXSwgJ2VsMScpO1xuICAgICAgZHJpdmVyLmFkYi5pbnB1dFRleHQuY2FsbGVkV2l0aEV4YWN0bHkoJ2tleXMnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXRUZXh0JywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IGVsZW1lbnQgdGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi53aXRoQXJncygnZWxlbWVudDpnZXRUZXh0JykucmV0dXJucygnZWxfdGV4dCcpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQoJ2VsMScpLnNob3VsZC5iZWNvbWUoJ2VsX3RleHQnKTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxuICAgICAgICAuY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6Z2V0VGV4dCcsIHtlbGVtZW50SWQ6ICdlbDEnfSlcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2NsZWFyJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgY2xlYXIgdGV4dCBvZiBhbiBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldFRleHQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjbGljaycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdjbGVhclRleHRGaWVsZCcpO1xuICAgICAgZHJpdmVyLmdldFRleHQud2l0aEFyZ3MoJ2VsMScpLnJldHVybnMoJyMnLnJlcGVhdCgxMTApKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jbGVhcignZWwxJyk7XG4gICAgICBkcml2ZXIuZ2V0VGV4dC5jYWxsZWRXaXRoRXhhY3RseSgnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuY2xpY2suY2FsbGVkV2l0aEV4YWN0bHkoJ2VsMScpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC5nZXRDYWxsKDApLmFyZ3NbMF0uc2hvdWxkLmJlLmVxdWFsKDUwKTtcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmdldENhbGwoMikuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoMTApO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZG8gZml2ZSByZXRyaWVzIGFuZCB0aGVuIGZhaWwgaWYgY2xlYXJUZXh0RmllbGQgdGhyb3dzIGVycm9yJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50aW1lb3V0KDEwMDAwKTtcblxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldFRleHQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjbGljaycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdjbGVhclRleHRGaWVsZCcpO1xuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC50aHJvd3MoKTtcbiAgICAgIGRyaXZlci5nZXRUZXh0LndpdGhBcmdzKCdlbDEnKS5yZXR1cm5zKCcjJy5yZXBlYXQoMSkpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNsZWFyKCdlbDEnKS5zaG91bGQuYmUucmVqZWN0ZWQ7XG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmFsd2F5c0NhbGxlZFdpdGgoMSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmNhbGxDb3VudC5zaG91bGQuYmUuZXF1YWwoNSk7XG4gICAgfSk7XG4gICAgaXQoJ2l0IHNob3VsZCBhc3N1bWUgdGhhdCB0aGUgdGV4dCBoYXZlIDEwMCBjaGFycyBpZiBnZXRUZXh0IHJldHVybnMgZW1wdHkgc3RyaW5nJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldFRleHQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjbGljaycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdjbGVhclRleHRGaWVsZCcpO1xuICAgICAgZHJpdmVyLmdldFRleHQud2l0aEFyZ3MoJ2VsMScpLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNsZWFyKCdlbDEnKTtcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmdldENhbGwoMSkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoNTApO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgY2xpY2sgYW4gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5jbGljaygnZWwxJyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6Y2xpY2snLCB7ZWxlbWVudElkOiAnZWwxJ30pXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXRMb2NhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGdldCBsb2NhdGlvbiBvZiBhbiBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC53aXRoQXJncygnZWxlbWVudDpnZXRMb2NhdGlvbicpLnJldHVybnMoJ2xvY19pbmZvJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb24oJ2VsMScpLnNob3VsZC5iZWNvbWUoJ2xvY19pbmZvJyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmdldExvY2F0aW9uJywge2VsZW1lbnRJZDogJ2VsMSd9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0TG9jYXRpb25JblZpZXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgbG9jYXRpb24gb2YgYW4gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRMb2NhdGlvbicpO1xuICAgICAgZHJpdmVyLmdldExvY2F0aW9uLnJldHVybnMoJ2xvY19pbmZvJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb25JblZpZXcoJ2VsMScpLnNob3VsZC5iZWNvbWUoJ2xvY19pbmZvJyk7XG4gICAgICBkcml2ZXIuZ2V0TG9jYXRpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsMScpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2dldFNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgc2l6ZSBvZiBhbiBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC53aXRoQXJncygnZWxlbWVudDpnZXRTaXplJykucmV0dXJucygnc2l6ZV9pbmZvJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0U2l6ZSgnZWwxJykuc2hvdWxkLmJlY29tZSgnc2l6ZV9pbmZvJyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmdldFNpemUnLCB7ZWxlbWVudElkOiAnZWwxJ30pXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0b3VjaExvbmdDbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRvIHRvdWNoIGxvbmcgY2xpY2sgb24gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0LCBkdXJhdGlvbjogNX07XG4gICAgICBhd2FpdCBkcml2ZXIudG91Y2hMb25nQ2xpY2soJ2VsMScsIDEyLCAzNCwgNSk7XG4gICAgICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcy5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDp0b3VjaExvbmdDbGljaycsIHBhcmFtcylcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3RvdWNoRG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRvIHRvdWNoIGRvd24gb24gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0fTtcbiAgICAgIGF3YWl0IGRyaXZlci50b3VjaERvd24oJ2VsMScsIDEyLCAzNCk7XG4gICAgICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcy5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDp0b3VjaERvd24nLCBwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0b3VjaFVwJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZG8gdG91Y2ggdXAgb24gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0fTtcbiAgICAgIGF3YWl0IGRyaXZlci50b3VjaFVwKCdlbDEnLCAxMiwgMzQpO1xuICAgICAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6dG91Y2hVcCcsIHBhcmFtcylcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3RvdWNoTW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGdldCBlbGVtZW50IGF0dHJpYnV0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0fTtcbiAgICAgIGF3YWl0IGRyaXZlci50b3VjaE1vdmUoJ2VsMScsIDEyLCAzNCk7XG4gICAgICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcy5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDp0b3VjaE1vdmUnLCBwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdjb21wbGV4VGFwJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgdGFwIGFuIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuY29tcGxleFRhcChudWxsLCBudWxsLCBudWxsLCAxMiwgMzQpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdjbGljaycsIHt4OiAxMiwgeTozNH0pXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0YXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZGUgdGFwIGFuIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIudGFwKCdlbDEnLCAxMiwgMzQsIDMpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmFsd2F5c0NhbGxlZFdpdGgoJ2VsZW1lbnQ6Y2xpY2snLFxuICAgICAgICB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0fSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkVGhyaWNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGFwIHdpdGhvdXQgYW4gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci50YXAobnVsbCwgMTIsIDM0LCAzKTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5hbHdheXNDYWxsZWRXaXRoKCdjbGljaycsIHt4OiAxMiwgeTogMzR9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkVGhyaWNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcGVyZm9ybSBzaW5nbGUgdGFwIG9uIGVsZW1lbnQgaWYgeCwgeSBhbmQgY291bnQgYXJlIG5vdCBwYXNzZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIudGFwKCdlbDEnKTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5hbHdheXNDYWxsZWRXaXRoKCdlbGVtZW50OmNsaWNrJykuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==

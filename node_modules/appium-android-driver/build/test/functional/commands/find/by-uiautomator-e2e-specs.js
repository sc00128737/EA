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

describe('Find - uiautomator', function () {
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
  it('should find elements with a boolean argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements within the context of another element', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className("android.widget.TextView")', true));

        case 2:
          els = context$2$0.sent;

          els.length.should.be.above(8);
          els.length.should.be.below(14);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', '.clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', '.clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new "', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'UiSelector().clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should ignore trailing semicolons', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true);', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with an int argument', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().index(0)', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getName(el.ELEMENT).should.eventually.equal('android.widget.FrameLayout'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a string argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().description("Animation")', false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with an overloaded method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className("android.widget.TextView")', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a Class<T> method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className(android.widget.TextView)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a long chain of methods', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true).className(android.widget.TextView).index(1)', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with recursive UiSelectors', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 >= 24)) {
            context$2$0.next = 5;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().childSelector(new UiSelector().clickable(true)).clickable(true)', true).should.eventually.have.length(1));

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element with bad syntax', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable((true)', true).should.eventually.be.rejectedWith(/resource could not be found/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element with bad syntax', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().drinkable(true)', true).should.eventually.be.rejectedWith(/resource could not be found/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element which does not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().description("chuckwudi")', true).should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickable, notClickable, both;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true));

        case 2:
          clickable = context$2$0.sent;

          clickable.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(false)', true));

        case 6:
          notClickable = context$2$0.sent;

          notClickable.length.should.be.above(0);
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true); new UiSelector().clickable(false);', true));

        case 10:
          both = context$2$0.sent;

          both.should.have.length(clickable.length + notClickable.length);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickable, clickableClickable;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true));

        case 2:
          clickable = context$2$0.sent;

          clickable.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true); new UiSelector().clickable(true);', true));

        case 6:
          clickableClickable = context$2$0.sent;

          clickableClickable.length.should.be.above(0);
          clickableClickable.should.have.length(clickable.length);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element in the second selector if the first finds no elements', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiSelector().className("not.a.class"); new UiSelector().className("android.widget.TextView")';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, true).should.eventually.exist);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should scroll to, and return elements using UiScrollable', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Views").instance(0))';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow chaining UiScrollable methods', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(10).scrollIntoView(new UiSelector().text("Views").instance(0))';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow UiScrollable scrollIntoView', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Views").instance(0));';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error reasonably if a UiScrollable does not return a UiObject', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(10)';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false).should.eventually.be.rejectedWith(/resource could not be found/));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow UiScrollable with unicode string', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.text.Unicode'));

        case 2:
          selector = 'new UiSelector().text("عربي").instance(0);';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('عربي'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: figure out why this fails with 7.1.1
//eslint-disable-line curly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXVpYXV0b21hdG9yLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3VCQUNkLGVBQWU7Ozs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsWUFBWTtBQUN6QyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OzJDQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxDQUN2RixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7R0FDOUMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDREQUE0RCxFQUFFO1FBQzNELEdBQUc7Ozs7OzJDQUFTLE1BQU0sQ0FDbkIsV0FBVyxDQUFDLHNCQUFzQixFQUFFLHVEQUF1RCxFQUFFLElBQUksQ0FBQzs7O0FBRGpHLGFBQUc7O0FBRVAsYUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixhQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFD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TSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDOzs7QUFBdEUsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0dBQ2xFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxzRUFBc0UsRUFBRTtRQUNyRSxRQUFROzs7O0FBQVIsa0JBQVEsR0FBRyx3RkFBd0Y7OzJDQUNqRyxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FDOUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLDZCQUE2QixDQUFDOzs7Ozs7O0dBQ3BFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywrQ0FBK0MsRUFBRTtRQUU5QyxRQUFRLEVBQ1IsRUFBRTs7Ozs7MkNBRkEsTUFBTSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxlQUFlLENBQUM7OztBQUNqRSxrQkFBUSxHQUFHLDRDQUE0Qzs7MkNBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQzs7O0FBQXRFLFlBQUU7OzJDQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztHQUNqRSxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2ZpbmQvYnktdWlhdXRvbWF0b3ItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdGaW5kIC0gdWlhdXRvbWF0b3InLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgY29udGV4dCBvZiBhbm90aGVyIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlclxuICAgICAgLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShcImFuZHJvaWQud2lkZ2V0LlRleHRWaWV3XCIpJywgdHJ1ZSk7XG4gICAgZWxzLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoOCk7XG4gICAgZWxzLmxlbmd0aC5zaG91bGQuYmUuYmVsb3coMTQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnRzIHdpdGhvdXQgcHJlcGVuZGluZyBcIm5ldyBVaVNlbGVjdG9yKClcIicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJy5jbGlja2FibGUodHJ1ZSknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICcuY2xpY2thYmxlKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aG91dCBwcmVwZW5kaW5nIFwibmV3IFVpU2VsZWN0b3IoKVwiJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnY2xpY2thYmxlKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aG91dCBwcmVwZW5kaW5nIFwibmV3IFwiJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBpZ25vcmUgdHJhaWxpbmcgc2VtaWNvbG9ucycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOycsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhbiBpbnQgYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmluZGV4KDApJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXROYW1lKGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dCcpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhIHN0cmluZyBhcmd1bWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXJcbiAgICAgIC5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5kZXNjcmlwdGlvbihcIkFuaW1hdGlvblwiKScsIGZhbHNlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhbiBvdmVybG9hZGVkIG1ldGhvZCBhcmd1bWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwiYW5kcm9pZC53aWRnZXQuVGV4dFZpZXdcIiknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBDbGFzczxUPiBtZXRob2QgYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShhbmRyb2lkLndpZGdldC5UZXh0VmlldyknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBsb25nIGNoYWluIG9mIG1ldGhvZHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKS5jbGFzc05hbWUoYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcpLmluZGV4KDEpJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBY2Nlc3NpYmlsaXR5Jyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIHJlY3Vyc2l2ZSBVaVNlbGVjdG9ycycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IHdoeSB0aGlzIGZhaWxzIHdpdGggNy4xLjFcbiAgICBpZiAoYXdhaXQgZHJpdmVyLmFkYi5nZXRBcGlMZXZlbCgpID49IDI0KSByZXR1cm4gdGhpcy5za2lwKCk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxuXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNoaWxkU2VsZWN0b3IobmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSkpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBiYWQgc3ludGF4JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUoKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3Jlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHdpdGggYmFkIHN5bnRheCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuZHJpbmthYmxlKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3Jlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHdoaWNoIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5kZXNjcmlwdGlvbihcImNodWNrd3VkaVwiKScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFsbG93IG11bHRpcGxlIHNlbGVjdG9yIHN0YXRlbWVudHMgYW5kIHJldHVybiB0aGUgVW5pb24gb2YgdGhlIHR3byBzZXRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjbGlja2FibGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpJywgdHJ1ZSk7XG4gICAgY2xpY2thYmxlLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XG4gICAgbGV0IG5vdENsaWNrYWJsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUoZmFsc2UpJywgdHJ1ZSk7XG4gICAgbm90Q2xpY2thYmxlLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XG4gICAgbGV0IGJvdGggPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOyBuZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZShmYWxzZSk7JywgdHJ1ZSk7XG4gICAgYm90aC5zaG91bGQuaGF2ZS5sZW5ndGgoY2xpY2thYmxlLmxlbmd0aCArIG5vdENsaWNrYWJsZS5sZW5ndGgpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhbGxvdyBtdWx0aXBsZSBzZWxlY3RvciBzdGF0ZW1lbnRzIGFuZCByZXR1cm4gdGhlIFVuaW9uIG9mIHRoZSB0d28gc2V0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2xpY2thYmxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpO1xuICAgIGNsaWNrYWJsZS5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDApO1xuICAgIGxldCBjbGlja2FibGVDbGlja2FibGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOyBuZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKTsnLCB0cnVlKTtcbiAgICBjbGlja2FibGVDbGlja2FibGUubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgICBjbGlja2FibGVDbGlja2FibGUuc2hvdWxkLmhhdmUubGVuZ3RoKGNsaWNrYWJsZS5sZW5ndGgpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgaW4gdGhlIHNlY29uZCBzZWxlY3RvciBpZiB0aGUgZmlyc3QgZmluZHMgbm8gZWxlbWVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwibm90LmEuY2xhc3NcIik7IG5ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwiYW5kcm9pZC53aWRnZXQuVGV4dFZpZXdcIiknO1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2Nyb2xsIHRvLCBhbmQgcmV0dXJuIGVsZW1lbnRzIHVzaW5nIFVpU2Nyb2xsYWJsZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2Nyb2xsYWJsZShuZXcgVWlTZWxlY3RvcigpLnNjcm9sbGFibGUodHJ1ZSkuaW5zdGFuY2UoMCkpLnNjcm9sbEludG9WaWV3KG5ldyBVaVNlbGVjdG9yKCkudGV4dChcIlZpZXdzXCIpLmluc3RhbmNlKDApKSc7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ1ZpZXdzJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFsbG93IGNoYWluaW5nIFVpU2Nyb2xsYWJsZSBtZXRob2RzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzZWxlY3RvciA9ICduZXcgVWlTY3JvbGxhYmxlKG5ldyBVaVNlbGVjdG9yKCkuc2Nyb2xsYWJsZSh0cnVlKS5pbnN0YW5jZSgwKSkuc2V0TWF4U2VhcmNoU3dpcGVzKDEwKS5zY3JvbGxJbnRvVmlldyhuZXcgVWlTZWxlY3RvcigpLnRleHQoXCJWaWV3c1wiKS5pbnN0YW5jZSgwKSknO1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdWaWV3cycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhbGxvdyBVaVNjcm9sbGFibGUgc2Nyb2xsSW50b1ZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zY3JvbGxJbnRvVmlldyhuZXcgVWlTZWxlY3RvcigpLnRleHQoXCJWaWV3c1wiKS5pbnN0YW5jZSgwKSk7JztcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgc2VsZWN0b3IsIGZhbHNlKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnVmlld3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3IgcmVhc29uYWJseSBpZiBhIFVpU2Nyb2xsYWJsZSBkb2VzIG5vdCByZXR1cm4gYSBVaU9iamVjdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2Nyb2xsYWJsZShuZXcgVWlTZWxlY3RvcigpLnNjcm9sbGFibGUodHJ1ZSkuaW5zdGFuY2UoMCkpLnNldE1heFNlYXJjaFN3aXBlcygxMCknO1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9yZXNvdXJjZSBjb3VsZCBub3QgYmUgZm91bmQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYWxsb3cgVWlTY3JvbGxhYmxlIHdpdGggdW5pY29kZSBzdHJpbmcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLCAnLnRleHQuVW5pY29kZScpO1xuICAgIGxldCBzZWxlY3RvciA9ICduZXcgVWlTZWxlY3RvcigpLnRleHQoXCLYudix2KjZilwiKS5pbnN0YW5jZSgwKTsnO1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCfYudix2KjZiicpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9

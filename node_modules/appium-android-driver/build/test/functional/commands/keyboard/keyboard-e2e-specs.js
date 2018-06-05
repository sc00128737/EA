'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var BUTTON_CLASS = 'android.widget.Button';
var EDITTEXT_CLASS = 'android.widget.EditText';
var TEXTVIEW_CLASS = 'android.widget.TextView';

var PACKAGE = 'io.appium.android.apis';
var TEXTFIELD_ACTIVITY = '.view.TextFields';
var KEYEVENT_ACTIVITY = '.text.KeyEventText';

var defaultAsciiCaps = _lodash2['default'].defaults({
  newCommandTimeout: 90,
  appPackage: PACKAGE,
  appActivity: TEXTFIELD_ACTIVITY
}, _desired2['default']);

var defaultUnicodeCaps = _lodash2['default'].defaults({
  unicodeKeyboard: true,
  resetKeyboard: true
}, defaultAsciiCaps);

function deSamsungify(text) {
  // For samsung S5 text is appended with ". Editing."
  return text.replace(". Editing.", "");
}

function getElement(driver, className) {
  return _regeneratorRuntime.async(function getElement$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 1000, function callee$1$0() {
          var el;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.t0 = _lodash2['default'];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(driver.findElOrEls('class name', className, true));

              case 3:
                context$2$0.t1 = context$2$0.sent;
                el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);
                return context$2$0.abrupt('return', el.ELEMENT);

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runTextEditTest(driver, testText) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var el, text;
  return _regeneratorRuntime.async(function runTextEditTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, EDITTEXT_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(driver.clear(el));

      case 5:
        if (!keys) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(driver.keys([testText]));

      case 8:
        context$1$0.next = 12;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(driver.setValue(testText, el));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(driver.getText(el));

      case 14:
        text = context$1$0.sent;

        deSamsungify(text).should.be.equal(testText);

        return context$1$0.abrupt('return', el);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * The key event page needs to be cleared between runs, or else we get false
 * positives from previously run tests. The page has a single button that
 * removes all text from within the main TextView.
 */
function clearKeyEvents(driver) {
  var el;
  return _regeneratorRuntime.async(function clearKeyEvents$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, BUTTON_CLASS));

      case 2:
        el = context$1$0.sent;

        driver.click(el);

        // wait a moment for the clearing to occur, lest we too quickly try to enter more text
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runCombinationKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runCombinationKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(29, 193));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getElement(driver, TEXTVIEW_CLASS));

              case 4:
                el = context$2$0.sent;
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 7:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('keyCode=KEYCODE_A');
        text.should.include('metaState=META_SHIFT_ON');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(82));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getElement(driver, TEXTVIEW_CLASS));

              case 4:
                el = context$2$0.sent;
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 7:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('[keycode=82]');
        text.should.include('keyCode=KEYCODE_MENU');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }];

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Arabic', text: 'تجريب' }, { label: 'should be able to send Hebrew', text: 'בדיקות' }];

describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines, selectedEngine, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, engine;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultAsciiCaps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines());

          case 5:
            engines = context$3$0.sent;
            selectedEngine = _lodash2['default'].head(engines);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 10;

            for (_iterator = _getIterator(engines); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              engine = _step.value;

              // it seems that the latin ime has `android.inputmethod` in its package name
              if (engine.indexOf('android.inputmethod') !== -1) {
                selectedEngine = engine;
              }
            }
            context$3$0.next = 18;
            break;

          case 14:
            context$3$0.prev = 14;
            context$3$0.t0 = context$3$0['catch'](10);
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 18:
            context$3$0.prev = 18;
            context$3$0.prev = 19;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 21:
            context$3$0.prev = 21;

            if (!_didIteratorError) {
              context$3$0.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return context$3$0.finish(21);

          case 25:
            return context$3$0.finish(18);

          case 26:
            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine(selectedEngine));

          case 28:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[10, 14, 18, 26], [19,, 21, 25]]);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function () {
          var test = _step2.value;

          describe(test.label, function () {
            it('should work with setValue: \'' + test.text + '\'', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, this);
            });
            it('should work with keys: \'' + test.text + '\'', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, this);
            });
          });
        };

        for (var _iterator2 = _getIterator(tests), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      it('should be able to clear a password field', function callee$3$0() {
        var els, el, textEl, text;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.findElOrEls('class name', EDITTEXT_CLASS, true));

            case 2:
              els = context$4$0.sent;
              el = els[1].ELEMENT;
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.setValue('super-duper password', el));

            case 6:
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'edit1Text', false));

            case 8:
              textEl = context$4$0.sent;
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(driver.getText(textEl.ELEMENT));

            case 11:
              text = context$4$0.sent;

              text.should.eql('super-duper password');

              context$4$0.next = 15;
              return _regeneratorRuntime.awrap(driver.clear(el));

            case 15:
              context$4$0.next = 17;
              return _regeneratorRuntime.awrap(driver.getText(textEl.ELEMENT));

            case 17:
              text = context$4$0.sent;

              text.should.eql('');

            case 19:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });

  describe('unicode', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultUnicodeCaps));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      var _arr = [tests, unicodeTests, languageTests];
      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function () {
            var test = _step3.value;

            describe(test.label, function () {
              it('should work with setValue: \'' + test.text + '\'', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, this);
              });
              it('should work with keys: \'' + test.text + '\'', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, this);
              });
            });
          };

          for (var _iterator3 = _getIterator(testSet), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });
});

// the test is flakey... try again

// the test is flakey... try again

// sometimes the default ime is not what we are using

// the text is printed into a text field, so we can retrieve and assert
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O3dCQUNRLFVBQVU7O2lCQUNkLGFBQWE7Ozs7d0JBQ3pCLFVBQVU7Ozs7dUJBQ0MsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDO0FBQzdDLElBQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDO0FBQ2pELElBQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDOztBQUVqRCxJQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztBQUN6QyxJQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzlDLElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7O0FBRS9DLElBQUksZ0JBQWdCLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ2hDLG1CQUFpQixFQUFFLEVBQUU7QUFDckIsWUFBVSxFQUFFLE9BQU87QUFDbkIsYUFBVyxFQUFFLGtCQUFrQjtDQUNoQyx1QkFBZSxDQUFDOztBQUVqQixJQUFJLGtCQUFrQixHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNsQyxpQkFBZSxFQUFFLElBQUk7QUFDckIsZUFBYSxFQUFFLElBQUk7Q0FDcEIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixTQUFTLFlBQVksQ0FBRSxJQUFJLEVBQUU7O0FBRTNCLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDdkM7O0FBRUQsU0FBZSxVQUFVLENBQUUsTUFBTSxFQUFFLFNBQVM7Ozs7Ozs7eUNBQzdCLDZCQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUU7Y0FDL0IsRUFBRTs7Ozs7O2lEQUFnQixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDOzs7O0FBQW5FLGtCQUFFLGtCQUFLLElBQUk7b0RBQ1IsRUFBRSxDQUFDLE9BQU87Ozs7Ozs7U0FDbEIsQ0FBQzs7Ozs7Ozs7OztDQUNIOztBQUVELFNBQWUsZUFBZSxDQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsSUFBSSx5REFBRyxLQUFLO01BQ3hELEVBQUUsRUFTRixJQUFJOzs7Ozt5Q0FUTyxVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQzs7O0FBQTdDLFVBQUU7O3lDQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDOzs7YUFFbEIsSUFBSTs7Ozs7O3lDQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7eUNBRXZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQzs7Ozt5Q0FHcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7OztBQUEvQixZQUFJOztBQUNSLG9CQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7OzRDQUV0QyxFQUFFOzs7Ozs7O0NBQ1Y7Ozs7Ozs7QUFPRCxTQUFlLGNBQWMsQ0FBRSxNQUFNO01BQy9CLEVBQUU7Ozs7O3lDQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDOzs7QUFBM0MsVUFBRTs7QUFDTixjQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O3lDQUdYLHNCQUFFLEtBQUssQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Q0FDbkI7O0FBRUQsU0FBZSwwQkFBMEIsQ0FBRSxNQUFNO01BQzNDLE9BQU8sRUFRUCxJQUFJOzs7O0FBUkosZUFBTyxHQUFHLFNBQVYsT0FBTztjQUVMLEVBQUU7Ozs7O2lEQURBLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQzs7OztpREFDbkIsVUFBVSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUM7OztBQUE3QyxrQkFBRTs7aURBQ08sTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7U0FDaEM7Ozt5Q0FFSyxjQUFjLENBQUMsTUFBTSxDQUFDOzs7O3lDQUVYLE9BQU8sRUFBRTs7O0FBQXRCLFlBQUk7O2NBQ0osSUFBSSxLQUFLLEVBQUUsQ0FBQTs7Ozs7O3lDQUVBLE9BQU8sRUFBRTs7O0FBQXRCLFlBQUk7OztBQUVOLFlBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDekMsWUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7Ozs7OztDQUNoRDs7QUFFRCxTQUFlLGVBQWUsQ0FBRSxNQUFNO01BQ2hDLE9BQU8sRUFRUCxJQUFJOzs7O0FBUkosZUFBTyxHQUFHLFNBQVYsT0FBTztjQUVMLEVBQUU7Ozs7O2lEQURBLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDOzs7O2lEQUNkLFVBQVUsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDOzs7QUFBN0Msa0JBQUU7O2lEQUNPLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7O1NBQ2hDOzs7eUNBRUssY0FBYyxDQUFDLE1BQU0sQ0FBQzs7Ozt5Q0FFWCxPQUFPLEVBQUU7OztBQUF0QixZQUFJOztjQUNKLElBQUksS0FBSyxFQUFFLENBQUE7Ozs7Ozt5Q0FFQSxPQUFPLEVBQUU7OztBQUF0QixZQUFJOzs7QUFFTixZQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxZQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzs7Ozs7O0NBQzdDOztBQUVELElBQUksS0FBSyxHQUFHLENBQ1YsRUFBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFDLEVBQzNFLEVBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFDckMsRUFBQyxLQUFLLEVBQUUsdUNBQXVDLEVBQUUsSUFBSSxFQUFFLHNEQUFzRCxFQUFDLEVBQzlHLEVBQUMsS0FBSyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUMsRUFDckQsRUFBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxDQUMvQyxDQUFDOztBQUVGLElBQUksWUFBWSxHQUFHLENBQ2pCLEVBQUMsS0FBSyxFQUFFLDhDQUE4QyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBQyxFQUNoRixFQUFDLEtBQUssRUFBRSxzQ0FBc0MsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLEVBQ3JFLEVBQUMsS0FBSyxFQUFFLDhDQUE4QyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsRUFDN0UsRUFBQyxLQUFLLEVBQUUseURBQXlELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxFQUNwRixFQUFDLEtBQUssRUFBRSwrQ0FBK0MsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQ3BFLENBQUM7O0FBRUYsSUFBSSxhQUFhLEdBQUcsQ0FDbEIsRUFBQyxLQUFLLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUN2RCxFQUFDLEtBQUssRUFBRSxnQ0FBZ0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQ3JELEVBQUMsS0FBSyxFQUFFLCtCQUErQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsRUFDdkQsRUFBQyxLQUFLLEVBQUUsK0JBQStCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUN6RCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxVQUFVLEVBQUUsWUFBWTtBQUMvQixVQUFRLENBQUMsT0FBTyxFQUFFLFlBQVk7QUFDNUIsUUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFVBQU0sQ0FBQztVQUtELE9BQU8sRUFDUCxjQUFjLGtGQUNULE1BQU07Ozs7O0FBTmYsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7NkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7Ozs7NkNBR3hCLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTs7O0FBQTVDLG1CQUFPO0FBQ1AsMEJBQWMsR0FBRyxvQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7QUFDcEMsMENBQW1CLE9BQU8scUdBQUU7QUFBbkIsb0JBQU07OztBQUViLGtCQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNoRCw4QkFBYyxHQUFHLE1BQU0sQ0FBQztlQUN6QjthQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkNBQ0ssTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQzs7Ozs7OztLQUMvQyxDQUFDLENBQUM7QUFDSCxTQUFLLENBQUM7Ozs7OzZDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7S0FDN0IsQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZO0FBQzNDLFlBQU0sQ0FBQzs7Ozs7K0NBQ0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUM7Ozs7Ozs7T0FDeEQsQ0FBQyxDQUFDOzs7Ozs7OztjQUVNLElBQUk7O0FBQ1gsa0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVk7QUFDL0IsY0FBRSxtQ0FBZ0MsSUFBSSxDQUFDLElBQUksU0FBSzs7Ozs7cURBQ3hDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzthQUN6QyxDQUFDLENBQUM7QUFDSCxjQUFFLCtCQUE0QixJQUFJLENBQUMsSUFBSSxTQUFLOzs7OztxREFDcEMsZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzs7Ozs7OzthQUMvQyxDQUFDLENBQUM7V0FDSixDQUFDLENBQUM7OztBQVJMLDJDQUFpQixLQUFLLGlIQUFFOztTQVN2Qjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELFFBQUUsQ0FBQywwQ0FBMEMsRUFBRTtZQUN6QyxHQUFHLEVBQ0gsRUFBRSxFQUtGLE1BQU0sRUFDTixJQUFJOzs7OzsrQ0FQUSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDOzs7QUFBbEUsaUJBQUc7QUFDSCxnQkFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPOzsrQ0FFakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUM7Ozs7K0NBRzlCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUM7OztBQUEzRCxvQkFBTTs7K0NBQ08sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7QUFBM0Msa0JBQUk7O0FBQ1Isa0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7OzsrQ0FFbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Ozs7K0NBRVQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7QUFBM0Msa0JBQUk7O0FBQ0osa0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7O09BQ3JCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQzs7QUFFSCxZQUFRLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUMxQyxZQUFNLENBQUM7Ozs7OytDQUNDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDOzs7OytDQUNoRCxzQkFBRSxLQUFLLENBQUMsR0FBRyxDQUFDOzs7Ozs7O09BQ25CLENBQUMsQ0FBQzs7QUFFSCxRQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OytDQUMzQywwQkFBMEIsQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7T0FDekMsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGtDQUFrQyxFQUFFOzs7OzsrQ0FDL0IsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztPQUM5QixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLFFBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxVQUFNLENBQUM7Ozs7QUFDTCxrQkFBTSxHQUFHLG1CQUFtQixDQUFDOzs2Q0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQzs7Ozs7OztLQUMvQyxDQUFDLENBQUM7QUFDSCxTQUFLLENBQUM7Ozs7OzZDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7S0FDN0IsQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZO0FBQzNDLFlBQU0sQ0FBQzs7Ozs7K0NBQ0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUM7Ozs7Ozs7T0FDeEQsQ0FBQyxDQUFDOztpQkFFaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQztBQUF4RCwrQ0FBMEQ7QUFBckQsWUFBSSxPQUFPLFdBQUEsQ0FBQTs7Ozs7O2dCQUNMLElBQUk7O0FBQ1gsb0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVk7QUFDL0IsZ0JBQUUsbUNBQWdDLElBQUksQ0FBQyxJQUFJLFNBQUs7Ozs7O3VEQUN4QyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7ZUFDekMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQUUsK0JBQTRCLElBQUksQ0FBQyxJQUFJLFNBQUs7Ozs7O3VEQUNwQyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O2VBQy9DLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQzs7O0FBUkwsNkNBQWlCLE9BQU8saUhBQUU7O1dBU3pCOzs7Ozs7Ozs7Ozs7Ozs7T0FDRjtLQUNGLENBQUMsQ0FBQzs7QUFFSCxZQUFRLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUMxQyxZQUFNLENBQUM7Ozs7OytDQUNDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDOzs7Ozs7O09BQ3ZELENBQUMsQ0FBQzs7QUFFSCxRQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OytDQUMzQywwQkFBMEIsQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7T0FDekMsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGtDQUFrQyxFQUFFOzs7OzsrQ0FDL0IsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztPQUM5QixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2tleWJvYXJkL2tleWJvYXJkLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IEJVVFRPTl9DTEFTUyA9ICdhbmRyb2lkLndpZGdldC5CdXR0b24nO1xuY29uc3QgRURJVFRFWFRfQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnO1xuY29uc3QgVEVYVFZJRVdfQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xuXG5jb25zdCBQQUNLQUdFID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuY29uc3QgVEVYVEZJRUxEX0FDVElWSVRZID0gJy52aWV3LlRleHRGaWVsZHMnO1xuY29uc3QgS0VZRVZFTlRfQUNUSVZJVFkgPSAnLnRleHQuS2V5RXZlbnRUZXh0JztcblxubGV0IGRlZmF1bHRBc2NpaUNhcHMgPSBfLmRlZmF1bHRzKHtcbiAgbmV3Q29tbWFuZFRpbWVvdXQ6IDkwLFxuICBhcHBQYWNrYWdlOiBQQUNLQUdFLFxuICBhcHBBY3Rpdml0eTogVEVYVEZJRUxEX0FDVElWSVRZLFxufSwgREVGQVVMVF9DQVBTKTtcblxubGV0IGRlZmF1bHRVbmljb2RlQ2FwcyA9IF8uZGVmYXVsdHMoe1xuICB1bmljb2RlS2V5Ym9hcmQ6IHRydWUsXG4gIHJlc2V0S2V5Ym9hcmQ6IHRydWVcbn0sIGRlZmF1bHRBc2NpaUNhcHMpO1xuXG5mdW5jdGlvbiBkZVNhbXN1bmdpZnkgKHRleHQpIHtcbiAgLy8gRm9yIHNhbXN1bmcgUzUgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIFwiLiBFZGl0aW5nLlwiXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoXCIuIEVkaXRpbmcuXCIsIFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFbGVtZW50IChkcml2ZXIsIGNsYXNzTmFtZSkge1xuICByZXR1cm4gYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgMTAwMCwgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBjbGFzc05hbWUsIHRydWUpKTtcbiAgICByZXR1cm4gZWwuRUxFTUVOVDtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1blRleHRFZGl0VGVzdCAoZHJpdmVyLCB0ZXN0VGV4dCwga2V5cyA9IGZhbHNlKSB7XG4gIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBFRElUVEVYVF9DTEFTUyk7XG4gIGF3YWl0IGRyaXZlci5jbGVhcihlbCk7XG5cbiAgaWYgKGtleXMpIHtcbiAgICBhd2FpdCBkcml2ZXIua2V5cyhbdGVzdFRleHRdKTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUodGVzdFRleHQsIGVsKTtcbiAgfVxuXG4gIGxldCB0ZXh0ID0gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xuICBkZVNhbXN1bmdpZnkodGV4dCkuc2hvdWxkLmJlLmVxdWFsKHRlc3RUZXh0KTtcblxuICByZXR1cm4gZWw7XG59XG5cbi8qXG4gKiBUaGUga2V5IGV2ZW50IHBhZ2UgbmVlZHMgdG8gYmUgY2xlYXJlZCBiZXR3ZWVuIHJ1bnMsIG9yIGVsc2Ugd2UgZ2V0IGZhbHNlXG4gKiBwb3NpdGl2ZXMgZnJvbSBwcmV2aW91c2x5IHJ1biB0ZXN0cy4gVGhlIHBhZ2UgaGFzIGEgc2luZ2xlIGJ1dHRvbiB0aGF0XG4gKiByZW1vdmVzIGFsbCB0ZXh0IGZyb20gd2l0aGluIHRoZSBtYWluIFRleHRWaWV3LlxuICovXG5hc3luYyBmdW5jdGlvbiBjbGVhcktleUV2ZW50cyAoZHJpdmVyKSB7XG4gIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBCVVRUT05fQ0xBU1MpO1xuICBkcml2ZXIuY2xpY2soZWwpO1xuXG4gIC8vIHdhaXQgYSBtb21lbnQgZm9yIHRoZSBjbGVhcmluZyB0byBvY2N1ciwgbGVzdCB3ZSB0b28gcXVpY2tseSB0cnkgdG8gZW50ZXIgbW9yZSB0ZXh0XG4gIGF3YWl0IEIuZGVsYXkoNTAwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuQ29tYmluYXRpb25LZXlFdmVudFRlc3QgKGRyaXZlcikge1xuICBsZXQgcnVuVGVzdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDI5LCAxOTMpO1xuICAgIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBURVhUVklFV19DTEFTUyk7XG4gICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsKTtcbiAgfTtcblxuICBhd2FpdCBjbGVhcktleUV2ZW50cyhkcml2ZXIpO1xuXG4gIGxldCB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xuICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAvLyB0aGUgdGVzdCBpcyBmbGFrZXkuLi4gdHJ5IGFnYWluXG4gICAgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgfVxuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdrZXlDb2RlPUtFWUNPREVfQScpO1xuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdtZXRhU3RhdGU9TUVUQV9TSElGVF9PTicpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5LZXlFdmVudFRlc3QgKGRyaXZlcikge1xuICBsZXQgcnVuVGVzdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDgyKTtcbiAgICBsZXQgZWwgPSBhd2FpdCBnZXRFbGVtZW50KGRyaXZlciwgVEVYVFZJRVdfQ0xBU1MpO1xuICAgIHJldHVybiBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbCk7XG4gIH07XG5cbiAgYXdhaXQgY2xlYXJLZXlFdmVudHMoZHJpdmVyKTtcblxuICBsZXQgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgaWYgKHRleHQgPT09ICcnKSB7XG4gICAgLy8gdGhlIHRlc3QgaXMgZmxha2V5Li4uIHRyeSBhZ2FpblxuICAgIHRleHQgPSBhd2FpdCBydW5UZXN0KCk7XG4gIH1cbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgnW2tleWNvZGU9ODJdJyk7XG4gIHRleHQuc2hvdWxkLmluY2x1ZGUoJ2tleUNvZGU9S0VZQ09ERV9NRU5VJyk7XG59XG5cbmxldCB0ZXN0cyA9IFtcbiAge2xhYmVsOiAnZWRpdGluZyBhIHRleHQgZmllbGQnLCB0ZXh0OiAnTGlmZSwgdGhlIFVuaXZlcnNlIGFuZCBFdmVyeXRoaW5nLid9LFxuICB7bGFiZWw6ICdzZW5kaW5nIFxcJyYtXFwnJywgdGV4dDogJyYtJ30sXG4gIHtsYWJlbDogJ3NlbmRpbmcgXFwnJlxcJyBhbmQgXFwnLVxcJyBpbiBvdGhlciB0ZXh0JywgdGV4dDogJ0luIHRoZSBtaWQtMTk5MHMgaGUgYXRlIGZpc2ggJiBjaGlwcyBhcyBtYXlvci1lbGVjdC4nfSxcbiAge2xhYmVsOiAnc2VuZGluZyBcXCctXFwnIGluIHRleHQnLCB0ZXh0OiAnU3VwZXItdGVzdC4nfSxcbiAge2xhYmVsOiAnc2VuZGluZyBudW1iZXJzJywgdGV4dDogJzAxMjM0NTY3ODknfSxcbl07XG5cbmxldCB1bmljb2RlVGVzdHMgPSBbXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnLVxcJyBpbiB1bmljb2RlIHRleHQnLCB0ZXh0OiAn4KSq4KSw4KWA4KSV4KWN4KS34KS+LeCkquCksOClgOCkleCljeCkt+Ckoyd9LFxuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJyZcXCcgaW4gdGV4dCcsIHRleHQ6ICdGaXNoICYgY2hpcHMnfSxcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBcXCcmXFwnIGluIHVuaWNvZGUgdGV4dCcsIHRleHQ6ICdNxKtuYSAmIGNoaXBzJ30sXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgcm9tYW4gY2hhcmFjdGVycyB3aXRoIGRpYWNyaXRpY3MnLCB0ZXh0OiAnw4HDqSDFkiDDuSDhuI0nfSxcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBhIFxcJ3VcXCcgd2l0aCBhbiB1bWxhdXQnLCB0ZXh0OiAnw7wnfSxcbl07XG5cbmxldCBsYW5ndWFnZVRlc3RzID0gW1xuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFRhbWlsJywgdGV4dDogJ+CumuCvh+CuvuCupOCuqeCviCd9LFxuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIENoaW5lc2UnLCB0ZXh0OiAn5rWL6K+VJ30sXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgQXJhYmljJywgdGV4dDogJ9iq2KzYsdmK2KgnfSxcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBIZWJyZXcnLCB0ZXh0OiAn15HXk9eZ16fXldeqJ30sXG5dO1xuXG5kZXNjcmliZSgna2V5Ym9hcmQnLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdhc2NpaScsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdEFzY2lpQ2Fwcyk7XG5cbiAgICAgIC8vIHNvbWV0aW1lcyB0aGUgZGVmYXVsdCBpbWUgaXMgbm90IHdoYXQgd2UgYXJlIHVzaW5nXG4gICAgICBsZXQgZW5naW5lcyA9IGF3YWl0IGRyaXZlci5hdmFpbGFibGVJTUVFbmdpbmVzKCk7XG4gICAgICBsZXQgc2VsZWN0ZWRFbmdpbmUgPSBfLmhlYWQoZW5naW5lcyk7XG4gICAgICBmb3IgKGxldCBlbmdpbmUgb2YgZW5naW5lcykge1xuICAgICAgICAvLyBpdCBzZWVtcyB0aGF0IHRoZSBsYXRpbiBpbWUgaGFzIGBhbmRyb2lkLmlucHV0bWV0aG9kYCBpbiBpdHMgcGFja2FnZSBuYW1lXG4gICAgICAgIGlmIChlbmdpbmUuaW5kZXhPZignYW5kcm9pZC5pbnB1dG1ldGhvZCcpICE9PSAtMSkge1xuICAgICAgICAgIHNlbGVjdGVkRW5naW5lID0gZW5naW5lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUoc2VsZWN0ZWRFbmdpbmUpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdGluZyBhIHRleHQgZmllbGQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBURVhURklFTERfQUNUSVZJVFkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgZGVzY3JpYmUodGVzdC5sYWJlbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGl0KGBzaG91bGQgd29yayB3aXRoIHNldFZhbHVlOiAnJHt0ZXN0LnRleHR9J2AsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaXQoYHNob3VsZCB3b3JrIHdpdGgga2V5czogJyR7dGVzdC50ZXh0fSdgLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQsIHRydWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGNsZWFyIGEgcGFzc3dvcmQgZmllbGQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBlbHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBFRElUVEVYVF9DTEFTUywgdHJ1ZSk7XG4gICAgICAgIGxldCBlbCA9IGVsc1sxXS5FTEVNRU5UO1xuXG4gICAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgnc3VwZXItZHVwZXIgcGFzc3dvcmQnLCBlbCk7XG5cbiAgICAgICAgLy8gdGhlIHRleHQgaXMgcHJpbnRlZCBpbnRvIGEgdGV4dCBmaWVsZCwgc28gd2UgY2FuIHJldHJpZXZlIGFuZCBhc3NlcnRcbiAgICAgICAgbGV0IHRleHRFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnZWRpdDFUZXh0JywgZmFsc2UpO1xuICAgICAgICBsZXQgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KHRleHRFbC5FTEVNRU5UKTtcbiAgICAgICAgdGV4dC5zaG91bGQuZXFsKCdzdXBlci1kdXBlciBwYXNzd29yZCcpO1xuXG4gICAgICAgIGF3YWl0IGRyaXZlci5jbGVhcihlbCk7XG5cbiAgICAgICAgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KHRleHRFbC5FTEVNRU5UKTtcbiAgICAgICAgdGV4dC5zaG91bGQuZXFsKCcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBLRVlFVkVOVF9BQ1RJVklUWSk7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoNTAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBjb21iaW5hdGlvbiBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGtleWV2ZW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgcnVuS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3VuaWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGRyaXZlcjtcbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRVbmljb2RlQ2Fwcyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0aW5nIGEgdGV4dCBmaWVsZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KFBBQ0tBR0UsIFRFWFRGSUVMRF9BQ1RJVklUWSk7XG4gICAgICB9KTtcblxuICAgICAgZm9yIChsZXQgdGVzdFNldCBvZiBbdGVzdHMsIHVuaWNvZGVUZXN0cywgbGFuZ3VhZ2VUZXN0c10pIHtcbiAgICAgICAgZm9yIChsZXQgdGVzdCBvZiB0ZXN0U2V0KSB7XG4gICAgICAgICAgZGVzY3JpYmUodGVzdC5sYWJlbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoYHNob3VsZCB3b3JrIHdpdGggc2V0VmFsdWU6ICcke3Rlc3QudGV4dH0nYCwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChgc2hvdWxkIHdvcmsgd2l0aCBrZXlzOiAnJHt0ZXN0LnRleHR9J2AsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0LCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VuZGluZyBhIGtleSBldmVudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KFBBQ0tBR0UsIEtFWUVWRU5UX0FDVElWSVRZKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBjb21iaW5hdGlvbiBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGtleWV2ZW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgcnVuS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _appiumBaseDriver = require('appium-base-driver');

var extensions = {},
    commands = {},
    helpers = {};

commands.getPageSource = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/source', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Need to override this for correct unicode support
commands.doSendKeys = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/keys', 'POST', params));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// uiautomator2 doesn't support metastate for keyevents
commands.keyevent = function callee$0$0(keycode, metastate) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Ignoring metastate ' + metastate);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.keyevent(keycode));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Use ADB since we don't have UiAutomator
commands.back = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.keyevent(4));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getStrings = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (language) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getDeviceLanguage());

      case 3:
        language = context$1$0.sent;

        _logger2['default'].info('No language specified, returning strings for: ' + language);

      case 5:
        if (!this.apkStrings[language]) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(language, this.adb, this.opts));

      case 9:
        this.apkStrings[language] = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/app/strings', 'POST', {}));

      case 12:
        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getWindowSize = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/window/current/size', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// For W3C
commands.getWindowRect = function callee$0$0() {
  var _ref, width, height;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getWindowSize());

      case 2:
        _ref = context$1$0.sent;
        width = _ref.width;
        height = _ref.height;
        return context$1$0.abrupt('return', {
          width: width,
          height: height,
          x: 0,
          y: 0
        });

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

extensions.executeMobile = function callee$0$0(mobileCommand) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var mobileCommandsMapping;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        mobileCommandsMapping = {
          shell: function shell(x) {
            return _regeneratorRuntime.async(function shell$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.next = 2;
                  return _regeneratorRuntime.awrap(this.mobileShell(x));

                case 2:
                  return context$2$0.abrupt('return', context$2$0.sent);

                case 3:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          },
          scrollBackTo: function scrollBackTo(x) {
            return _regeneratorRuntime.async(function scrollBackTo$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.next = 2;
                  return _regeneratorRuntime.awrap(this.mobileScrollBackTo(x));

                case 2:
                  return context$2$0.abrupt('return', context$2$0.sent);

                case 3:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          },
          viewportScreenshot: function viewportScreenshot(x) {
            return _regeneratorRuntime.async(function viewportScreenshot$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.next = 2;
                  return _regeneratorRuntime.awrap(this.mobileViewportScreenshot(x));

                case 2:
                  return context$2$0.abrupt('return', context$2$0.sent);

                case 3:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          }
        };

        if (_lodash2['default'].has(mobileCommandsMapping, mobileCommand)) {
          context$1$0.next = 3;
          break;
        }

        throw new _appiumBaseDriver.errors.UnknownCommandError('Unknown mobile command "' + mobileCommand + '". ' + ('Only ' + _lodash2['default'].keys(mobileCommandsMapping) + ' commands are supported.'));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(mobileCommandsMapping[mobileCommand](opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileScrollBackTo = function callee$0$0(opts) {
  var elementId, elementToId;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        elementId = opts.elementId;
        elementToId = opts.elementToId;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/element/' + elementId + '/scroll_to/' + elementToId, 'POST', {}));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileViewportScreenshot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getViewportScreenshot());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setUrl = function callee$0$0(url) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startUri(url, this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Overriding appium-android-driver's wrapBootstrapDisconnect,
 * unlike in appium-android-driver avoiding adb restarting as it intern
 * kills UiAutomator2 server running in the device.
 **/
helpers.wrapBootstrapDisconnect = function callee$0$0(wrapped) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(wrapped());

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Stop proxying to any Chromedriver and redirect to uiautomator2
helpers.suspendChromedriverProxy = function () {
  this.chromedriver = null;
  this.proxyReqRes = this.uiautomator2.proxyReqRes.bind(this.uiautomator2);
  this.jwpProxyActive = true;
};

_Object$assign(extensions, commands, helpers);

exports['default'] = extensions;
module.exports = exports['default'];

// Return cached strings

// TODO: This is mutating the current language, but it's how appium currently works
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O3NCQUNOLFdBQVc7Ozs7OEJBQ0Esb0JBQW9COzs7O2dDQUN4QixvQkFBb0I7O0FBRTNDLElBQUksVUFBVSxHQUFHLEVBQUU7SUFDZixRQUFRLEdBQUcsRUFBRTtJQUNiLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLFFBQVEsQ0FBQyxhQUFhLEdBQUc7Ozs7O3lDQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQzs7Ozs7Ozs7OztDQUNyRSxDQUFDOzs7QUFHRixRQUFRLENBQUMsVUFBVSxHQUFHLG9CQUFnQixNQUFNOzs7Ozt5Q0FDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDOzs7Ozs7O0NBQ2pFLENBQUM7OztBQUdGLFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQWdCLE9BQU8sRUFBRSxTQUFTOzs7O0FBQ3BELDRCQUFJLEtBQUsseUJBQXVCLFNBQVMsQ0FBRyxDQUFDOzt5Q0FDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0NBQ2pDLENBQUM7OztBQUdGLFFBQVEsQ0FBQyxJQUFJLEdBQUc7Ozs7O3lDQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztDQUMzQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLFFBQVE7Ozs7WUFDdkMsUUFBUTs7Ozs7O3lDQUNNLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUU7OztBQUE3QyxnQkFBUTs7QUFDUiw0QkFBSSxJQUFJLG9EQUFrRCxRQUFRLENBQUcsQ0FBQzs7O2FBR3BFLElBQUksQ0FBQyxVQUFV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QUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLE1BQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6RSxNQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztDQUM1QixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7cUJBRTlCLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2dlbmVyYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuXG5sZXQgZXh0ZW5zaW9ucyA9IHt9LFxuICAgIGNvbW1hbmRzID0ge30sXG4gICAgaGVscGVycyA9IHt9O1xuXG5jb21tYW5kcy5nZXRQYWdlU291cmNlID0gYXN5bmMgZnVuY3Rpb24gICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnL3NvdXJjZScsICdHRVQnLCB7fSk7XG59O1xuXG4vLyBOZWVkIHRvIG92ZXJyaWRlIHRoaXMgZm9yIGNvcnJlY3QgdW5pY29kZSBzdXBwb3J0XG5jb21tYW5kcy5kb1NlbmRLZXlzID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcykge1xuICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9rZXlzJywgJ1BPU1QnLCBwYXJhbXMpO1xufTtcblxuLy8gdWlhdXRvbWF0b3IyIGRvZXNuJ3Qgc3VwcG9ydCBtZXRhc3RhdGUgZm9yIGtleWV2ZW50c1xuY29tbWFuZHMua2V5ZXZlbnQgPSBhc3luYyBmdW5jdGlvbiAoa2V5Y29kZSwgbWV0YXN0YXRlKSB7XG4gIGxvZy5kZWJ1ZyhgSWdub3JpbmcgbWV0YXN0YXRlICR7bWV0YXN0YXRlfWApO1xuICBhd2FpdCB0aGlzLmFkYi5rZXlldmVudChrZXljb2RlKTtcbn07XG5cbi8vIFVzZSBBREIgc2luY2Ugd2UgZG9uJ3QgaGF2ZSBVaUF1dG9tYXRvclxuY29tbWFuZHMuYmFjayA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgdGhpcy5hZGIua2V5ZXZlbnQoNCk7XG59O1xuXG5jb21tYW5kcy5nZXRTdHJpbmdzID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlKSB7XG4gIGlmICghbGFuZ3VhZ2UpIHtcbiAgICBsYW5ndWFnZSA9IGF3YWl0IHRoaXMuYWRiLmdldERldmljZUxhbmd1YWdlKCk7XG4gICAgbG9nLmluZm8oYE5vIGxhbmd1YWdlIHNwZWNpZmllZCwgcmV0dXJuaW5nIHN0cmluZ3MgZm9yOiAke2xhbmd1YWdlfWApO1xuICB9XG5cbiAgaWYgKHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV0pIHtcbiAgICAvLyBSZXR1cm4gY2FjaGVkIHN0cmluZ3NcbiAgICByZXR1cm4gdGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXTtcbiAgfVxuXG4gIC8vIFRPRE86IFRoaXMgaXMgbXV0YXRpbmcgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UsIGJ1dCBpdCdzIGhvdyBhcHBpdW0gY3VycmVudGx5IHdvcmtzXG4gIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV0gPSBhd2FpdCBhbmRyb2lkSGVscGVycy5wdXNoU3RyaW5ncyhsYW5ndWFnZSwgdGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2FwcGl1bS9hcHAvc3RyaW5nc2AsICdQT1NUJywge30pO1xuXG4gIHJldHVybiB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdO1xufTtcblxuY29tbWFuZHMuZ2V0V2luZG93U2l6ZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnL3dpbmRvdy9jdXJyZW50L3NpemUnLCAnR0VUJywge30pO1xufTtcblxuLy8gRm9yIFczQ1xuY29tbWFuZHMuZ2V0V2luZG93UmVjdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTaXplKCk7XG4gIHJldHVybiB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgfTtcbn07XG5cbmV4dGVuc2lvbnMuZXhlY3V0ZU1vYmlsZSA9IGFzeW5jIGZ1bmN0aW9uIChtb2JpbGVDb21tYW5kLCBvcHRzID0ge30pIHtcbiAgY29uc3QgbW9iaWxlQ29tbWFuZHNNYXBwaW5nID0ge1xuICAgIHNoZWxsOiBhc3luYyAoeCkgPT4gYXdhaXQgdGhpcy5tb2JpbGVTaGVsbCh4KSxcbiAgICBzY3JvbGxCYWNrVG86IGFzeW5jICh4KSA9PiBhd2FpdCB0aGlzLm1vYmlsZVNjcm9sbEJhY2tUbyh4KSxcbiAgICB2aWV3cG9ydFNjcmVlbnNob3Q6IGFzeW5jICh4KSA9PiBhd2FpdCB0aGlzLm1vYmlsZVZpZXdwb3J0U2NyZWVuc2hvdCh4KSxcbiAgfTtcblxuICBpZiAoIV8uaGFzKG1vYmlsZUNvbW1hbmRzTWFwcGluZywgbW9iaWxlQ29tbWFuZCkpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25Db21tYW5kRXJyb3IoYFVua25vd24gbW9iaWxlIGNvbW1hbmQgXCIke21vYmlsZUNvbW1hbmR9XCIuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgT25seSAke18ua2V5cyhtb2JpbGVDb21tYW5kc01hcHBpbmcpfSBjb21tYW5kcyBhcmUgc3VwcG9ydGVkLmApO1xuICB9XG4gIHJldHVybiBhd2FpdCBtb2JpbGVDb21tYW5kc01hcHBpbmdbbW9iaWxlQ29tbWFuZF0ob3B0cyk7XG59O1xuXG5jb21tYW5kcy5tb2JpbGVTY3JvbGxCYWNrVG8gPSBhc3luYyBmdW5jdGlvbiAob3B0cykge1xuICBjb25zdCB7ZWxlbWVudElkLCBlbGVtZW50VG9JZH0gPSBvcHRzO1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvYXBwaXVtL2VsZW1lbnQvJHtlbGVtZW50SWR9L3Njcm9sbF90by8ke2VsZW1lbnRUb0lkfWAsICdQT1NUJywge30pO1xufTtcblxuY29tbWFuZHMubW9iaWxlVmlld3BvcnRTY3JlZW5zaG90ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRWaWV3cG9ydFNjcmVlbnNob3QoKTtcbn07XG5cbmNvbW1hbmRzLnNldFVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRVcmkodXJsLCB0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRpbmcgYXBwaXVtLWFuZHJvaWQtZHJpdmVyJ3Mgd3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QsXG4gKiB1bmxpa2UgaW4gYXBwaXVtLWFuZHJvaWQtZHJpdmVyIGF2b2lkaW5nIGFkYiByZXN0YXJ0aW5nIGFzIGl0IGludGVyblxuICoga2lsbHMgVWlBdXRvbWF0b3IyIHNlcnZlciBydW5uaW5nIGluIHRoZSBkZXZpY2UuXG4gKiovXG5oZWxwZXJzLndyYXBCb290c3RyYXBEaXNjb25uZWN0ID0gYXN5bmMgZnVuY3Rpb24gKHdyYXBwZWQpICB7XG4gIGF3YWl0IHdyYXBwZWQoKTtcbn07XG5cbi8vIFN0b3AgcHJveHlpbmcgdG8gYW55IENocm9tZWRyaXZlciBhbmQgcmVkaXJlY3QgdG8gdWlhdXRvbWF0b3IyXG5oZWxwZXJzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jaHJvbWVkcml2ZXIgPSBudWxsO1xuICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy51aWF1dG9tYXRvcjIucHJveHlSZXFSZXMuYmluZCh0aGlzLnVpYXV0b21hdG9yMik7XG4gIHRoaXMuandwUHJveHlBY3RpdmUgPSB0cnVlO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=

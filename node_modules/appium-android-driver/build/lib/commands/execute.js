'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var extensions = {};

extensions.execute = function callee$0$0(script, args) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!script.match(/^mobile\:/)) {
          context$1$0.next = 5;
          break;
        }

        script = script.replace(/^mobile\:/, '').trim();
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.executeMobile(script, _lodash2['default'].isArray(args) ? args[0] : args));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
        throw new _appiumBaseDriver.errors.NotImplementedError();

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
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        mobileCommandsMapping = {
          shell: 'mobileShell'
        };

        if (_lodash2['default'].has(mobileCommandsMapping, mobileCommand)) {
          context$1$0.next = 3;
          break;
        }

        throw new _appiumBaseDriver.errors.UnknownCommandError('Unknown mobile command "' + mobileCommand + '". ' + ('Only ' + _lodash2['default'].keys(mobileCommandsMapping) + ' commands are supported.'));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this[mobileCommandsMapping[mobileCommand]](opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = extensions;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9leGVjdXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztnQ0FDQyxvQkFBb0I7O0FBRTNDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsTUFBTSxFQUFFLElBQUk7Ozs7YUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7O0FBQzNCLGNBQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7eUNBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLG9CQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Y0FHckUsSUFBSSx5QkFBTyxtQkFBbUIsRUFBRTs7Ozs7OztDQUN2QyxDQUFDOztBQUVGLFVBQVUsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLGFBQWE7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFDM0QscUJBQXFCOzs7O0FBQXJCLDZCQUFxQixHQUFHO0FBQzVCLGVBQUssRUFBRSxhQUFhO1NBQ3JCOztZQUVJLG9CQUFFLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxhQUFhLENBQUM7Ozs7O2NBQ3hDLElBQUkseUJBQU8sbUJBQW1CLENBQUMsNkJBQTJCLGFBQWEsc0JBQ2hDLG9CQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyw4QkFBMEIsQ0FBQzs7Ozt5Q0FFMUYsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O0NBQzlELENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2V4ZWN1dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcblxubGV0IGV4dGVuc2lvbnMgPSB7fTtcblxuZXh0ZW5zaW9ucy5leGVjdXRlID0gYXN5bmMgZnVuY3Rpb24gKHNjcmlwdCwgYXJncykge1xuICBpZiAoc2NyaXB0Lm1hdGNoKC9ebW9iaWxlXFw6LykpIHtcbiAgICBzY3JpcHQgPSBzY3JpcHQucmVwbGFjZSgvXm1vYmlsZVxcOi8sICcnKS50cmltKCk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZXhlY3V0ZU1vYmlsZShzY3JpcHQsIF8uaXNBcnJheShhcmdzKSA/IGFyZ3NbMF0gOiBhcmdzKTtcbiAgfVxuXG4gIHRocm93IG5ldyBlcnJvcnMuTm90SW1wbGVtZW50ZWRFcnJvcigpO1xufTtcblxuZXh0ZW5zaW9ucy5leGVjdXRlTW9iaWxlID0gYXN5bmMgZnVuY3Rpb24gKG1vYmlsZUNvbW1hbmQsIG9wdHMgPSB7fSkge1xuICBjb25zdCBtb2JpbGVDb21tYW5kc01hcHBpbmcgPSB7XG4gICAgc2hlbGw6ICdtb2JpbGVTaGVsbCcsXG4gIH07XG5cbiAgaWYgKCFfLmhhcyhtb2JpbGVDb21tYW5kc01hcHBpbmcsIG1vYmlsZUNvbW1hbmQpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duQ29tbWFuZEVycm9yKGBVbmtub3duIG1vYmlsZSBjb21tYW5kIFwiJHttb2JpbGVDb21tYW5kfVwiLiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE9ubHkgJHtfLmtleXMobW9iaWxlQ29tbWFuZHNNYXBwaW5nKX0gY29tbWFuZHMgYXJlIHN1cHBvcnRlZC5gKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpc1ttb2JpbGVDb21tYW5kc01hcHBpbmdbbW9iaWxlQ29tbWFuZF1dKG9wdHMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = require('./fs');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _util = require('./util');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _jsftp = require('jsftp');

var _jsftp2 = _interopRequireDefault(_jsftp);

function uploadFileToHttp(remoteUrl) {
  var uploadOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var response, responseDebugMsg;
  return _regeneratorRuntime.async(function uploadFileToHttp$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug(remoteUrl.protocol + ' upload options: ' + JSON.stringify(uploadOptions));
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _requestPromise2['default'])(uploadOptions));

      case 3:
        response = context$1$0.sent;
        responseDebugMsg = 'Response code: ' + response.statusCode + '. ' + ('Response body: ' + JSON.stringify(response.body));

        _logger2['default'].debug(responseDebugMsg);

        if (!(response.statusCode >= 400)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('Cannot upload the recorded media to \'' + remoteUrl.href + '\'. ' + responseDebugMsg);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function uploadFileToFtp(localFileStream, remoteUrl) {
  var uploadOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  return _regeneratorRuntime.async(function uploadFileToFtp$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug(remoteUrl.protocol + ' upload options: ' + JSON.stringify(uploadOptions));
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(new _bluebird2['default'](function (resolve, reject) {
          new _jsftp2['default'](uploadOptions).put(localFileStream, remoteUrl.pathname, function (err) {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Uploads the given file to a remote location. HTTP(S) and FTP
 * protocols are supported.
 *
 * @param {string} localPath - The path to a file on the local storage.
 * @param {string} remotePath - The remote URL to upload the file to.
 * @param {Object} uploadOptions - The options set, which depends on the protocol set for remotePath.
 *                                 See https://www.npmjs.com/package/request-promise and
 *                                 https://www.npmjs.com/package/jsftp for more details.
 */
function uploadFile(localPath, remotePath) {
  var uploadOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var remoteUrl, _ref, size, timeStarted, timeElapsed;

  return _regeneratorRuntime.async(function uploadFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _fs2.exists)(localPath));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('\'' + localPath + '\' does not exists or is not accessible');

      case 4:
        remoteUrl = _url2['default'].parse(remotePath);
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _fs2.stat)(localPath));

      case 7:
        _ref = context$1$0.sent;
        size = _ref.size;

        _logger2['default'].info('Uploading \'' + localPath + '\' of ' + (0, _util.toReadableSizeString)(size) + ' size to \'' + remotePath + '\'...');
        timeStarted = process.hrtime();

        if (!remoteUrl.protocol.startsWith('http')) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(uploadFileToHttp(remoteUrl, uploadOptions));

      case 14:
        context$1$0.next = 22;
        break;

      case 16:
        if (!(remoteUrl.protocol === 'ftp')) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(uploadFileToFtp((0, _fs.createReadStream)(localPath), remoteUrl, uploadOptions));

      case 19:
        context$1$0.next = 22;
        break;

      case 21:
        throw new Error('Cannot upload the file at \'' + localPath + '\' to \'' + remotePath + '\'. ' + ('Unsupported remote protocol \'' + remoteUrl.protocol + '\'. ') + 'Only http/https and ftp protocols are supported.');

      case 22:
        timeElapsed = process.hrtime(timeStarted)[0];

        _logger2['default'].info('Uploaded \'' + localPath + '\' of ' + (0, _util.toReadableSizeString)(size) + ' size in ' + timeElapsed + ' second' + (timeElapsed === 1 ? '' : 's'));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.uploadFile = uploadFile;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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VSxXQUFXLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUEsQ0FBRyxDQUFDOzs7Ozs7O0NBQ25JOztRQUVRLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6ImxpYi9uZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgc3RhdCwgZXhpc3RzIH0gZnJvbSAnLi9mcyc7XG5pbXBvcnQgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyB0b1JlYWRhYmxlU2l6ZVN0cmluZyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSc7XG5pbXBvcnQgRnRwIGZyb20gJ2pzZnRwJztcblxuXG5hc3luYyBmdW5jdGlvbiB1cGxvYWRGaWxlVG9IdHRwIChyZW1vdGVVcmwsIHVwbG9hZE9wdGlvbnMgPSB7fSkge1xuICBsb2cuZGVidWcoYCR7cmVtb3RlVXJsLnByb3RvY29sfSB1cGxvYWQgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeSh1cGxvYWRPcHRpb25zKX1gKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KHVwbG9hZE9wdGlvbnMpO1xuICBjb25zdCByZXNwb25zZURlYnVnTXNnID0gYFJlc3BvbnNlIGNvZGU6ICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX0uIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgYFJlc3BvbnNlIGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuYm9keSl9YDtcbiAgbG9nLmRlYnVnKHJlc3BvbnNlRGVidWdNc2cpO1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCB1cGxvYWQgdGhlIHJlY29yZGVkIG1lZGlhIHRvICcke3JlbW90ZVVybC5ocmVmfScuICR7cmVzcG9uc2VEZWJ1Z01zZ31gKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB1cGxvYWRGaWxlVG9GdHAgKGxvY2FsRmlsZVN0cmVhbSwgcmVtb3RlVXJsLCB1cGxvYWRPcHRpb25zID0ge30pIHtcbiAgbG9nLmRlYnVnKGAke3JlbW90ZVVybC5wcm90b2NvbH0gdXBsb2FkIG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkodXBsb2FkT3B0aW9ucyl9YCk7XG4gIHJldHVybiBhd2FpdCBuZXcgQigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbmV3IEZ0cCh1cGxvYWRPcHRpb25zKS5wdXQobG9jYWxGaWxlU3RyZWFtLCByZW1vdGVVcmwucGF0aG5hbWUsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBVcGxvYWRzIHRoZSBnaXZlbiBmaWxlIHRvIGEgcmVtb3RlIGxvY2F0aW9uLiBIVFRQKFMpIGFuZCBGVFBcbiAqIHByb3RvY29scyBhcmUgc3VwcG9ydGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbFBhdGggLSBUaGUgcGF0aCB0byBhIGZpbGUgb24gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlUGF0aCAtIFRoZSByZW1vdGUgVVJMIHRvIHVwbG9hZCB0aGUgZmlsZSB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSB1cGxvYWRPcHRpb25zIC0gVGhlIG9wdGlvbnMgc2V0LCB3aGljaCBkZXBlbmRzIG9uIHRoZSBwcm90b2NvbCBzZXQgZm9yIHJlbW90ZVBhdGguXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlZSBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9yZXF1ZXN0LXByb21pc2UgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2pzZnRwIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEZpbGUgKGxvY2FsUGF0aCwgcmVtb3RlUGF0aCwgdXBsb2FkT3B0aW9ucyA9IHt9KSB7XG4gIGlmICghYXdhaXQgZXhpc3RzKGxvY2FsUGF0aCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IgKGAnJHtsb2NhbFBhdGh9JyBkb2VzIG5vdCBleGlzdHMgb3IgaXMgbm90IGFjY2Vzc2libGVgKTtcbiAgfVxuICBjb25zdCByZW1vdGVVcmwgPSB1cmwucGFyc2UocmVtb3RlUGF0aCk7XG4gIGNvbnN0IHtzaXplfSA9IGF3YWl0IHN0YXQobG9jYWxQYXRoKTtcbiAgbG9nLmluZm8oYFVwbG9hZGluZyAnJHtsb2NhbFBhdGh9JyBvZiAke3RvUmVhZGFibGVTaXplU3RyaW5nKHNpemUpfSBzaXplIHRvICcke3JlbW90ZVBhdGh9Jy4uLmApO1xuICBjb25zdCB0aW1lU3RhcnRlZCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gIGlmIChyZW1vdGVVcmwucHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgYXdhaXQgdXBsb2FkRmlsZVRvSHR0cChyZW1vdGVVcmwsIHVwbG9hZE9wdGlvbnMpO1xuICB9IGVsc2UgaWYgKHJlbW90ZVVybC5wcm90b2NvbCA9PT0gJ2Z0cCcpIHtcbiAgICBhd2FpdCB1cGxvYWRGaWxlVG9GdHAoY3JlYXRlUmVhZFN0cmVhbShsb2NhbFBhdGgpLCByZW1vdGVVcmwsIHVwbG9hZE9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHVwbG9hZCB0aGUgZmlsZSBhdCAnJHtsb2NhbFBhdGh9JyB0byAnJHtyZW1vdGVQYXRofScuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgVW5zdXBwb3J0ZWQgcmVtb3RlIHByb3RvY29sICcke3JlbW90ZVVybC5wcm90b2NvbH0nLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYE9ubHkgaHR0cC9odHRwcyBhbmQgZnRwIHByb3RvY29scyBhcmUgc3VwcG9ydGVkLmApO1xuICB9XG4gIGNvbnN0IHRpbWVFbGFwc2VkID0gcHJvY2Vzcy5ocnRpbWUodGltZVN0YXJ0ZWQpWzBdO1xuICBsb2cuaW5mbyhgVXBsb2FkZWQgJyR7bG9jYWxQYXRofScgb2YgJHt0b1JlYWRhYmxlU2l6ZVN0cmluZyhzaXplKX0gc2l6ZSBpbiAke3RpbWVFbGFwc2VkfSBzZWNvbmQke3RpbWVFbGFwc2VkID09PSAxID8gJycgOiAncyd9YCk7XG59XG5cbmV4cG9ydCB7IHVwbG9hZEZpbGUgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==

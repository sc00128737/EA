'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _buffer = require('buffer');

var _pngjs = require('pngjs');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * @typedef {Object} Region
 * @property {number} left - The offset from the left side
 * @property {number} top - The offset from the top
 * @property {number} width - The width
 * @property {number} height - The height
 */

var BYTES_IN_PIXEL_BLOCK = 4;
var SCANLINE_FILTER_METHOD = 4;

/**
 * Crop the image by given rectangle (use base64 string as input and output)
 *
 * @param {string} base64Image The string with base64 encoded image
 * @param {Region} rect The selected region of image
 * @return {string} base64 encoded string of cropped image
 */
function cropBase64Image(base64Image, rect) {
  var image;
  return _regeneratorRuntime.async(function cropBase64Image$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(base64ToImage(base64Image));

      case 2:
        image = context$1$0.sent;

        cropImage(image, rect);
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(imageToBase64(image));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Create a pngjs image from given base64 image
 *
 * @param {string} base64Image The string with base64 encoded image
 * @return {PNG} The image object
 */
function base64ToImage(base64Image) {
  var imageBuffer;
  return _regeneratorRuntime.async(function base64ToImage$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        imageBuffer = new _buffer.Buffer(base64Image, 'base64');
        return context$1$0.abrupt('return', new _bluebird2['default'](function (resolve, reject) {
          var image = new _pngjs.PNG({ filterType: SCANLINE_FILTER_METHOD });
          image.parse(imageBuffer, function (err, image) {
            // eslint-disable-line promise/prefer-await-to-callbacks
            if (err) {
              return reject(err);
            }
            resolve(image);
          });
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Create a base64 string for given image object
 *
 * @param {PNG} image The image object
 * @return {string} The string with base64 encoded image
 */
function imageToBase64(image) {
  return _regeneratorRuntime.async(function imageToBase64$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _bluebird2['default'](function (resolve, reject) {
          var chunks = [];
          image.pack().on('data', function (chunk) {
            return chunks.push(chunk);
          }).on('end', function () {
            resolve(_buffer.Buffer.concat(chunks).toString('base64'));
          }).on('error', function (err) {
            // eslint-disable-line promise/prefer-await-to-callbacks
            reject(err);
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Crop the image by given rectangle
 *
 * @param {PNG} image The image to mutate by cropping
 * @param {Region} rect The selected region of image
 */
function cropImage(image, rect) {
  var imageRect = { width: image.width, height: image.height };
  var interRect = getRectIntersection(rect, imageRect);
  if (interRect.width < rect.width || interRect.height < rect.height) {
    throw new Error('Cannot crop ' + JSON.stringify(rect) + ' from ' + JSON.stringify(imageRect) + ' because the intersection between them was not the size of the rect');
  }

  var firstVerticalPixel = interRect.top;
  var lastVerticalPixel = interRect.top + interRect.height;

  var firstHorizontalPixel = interRect.left;
  var lastHorizontalPixel = interRect.left + interRect.width;

  var croppedArray = [];
  for (var y = firstVerticalPixel; y < lastVerticalPixel; y++) {
    for (var x = firstHorizontalPixel; x < lastHorizontalPixel; x++) {
      var firstByteIdxInPixelBlock = imageRect.width * y + x << 2;
      for (var byteIdx = 0; byteIdx < BYTES_IN_PIXEL_BLOCK; byteIdx++) {
        croppedArray.push(image.data[firstByteIdxInPixelBlock + byteIdx]);
      }
    }
  }

  image.data = new _buffer.Buffer(croppedArray);
  image.width = interRect.width;
  image.height = interRect.height;
  return image;
}

function getRectIntersection(rect, imageSize) {
  var left = rect.left >= imageSize.width ? imageSize.width : rect.left;
  var top = rect.top >= imageSize.height ? imageSize.height : rect.top;
  var width = imageSize.width >= left + rect.width ? rect.width : imageSize.width - left;
  var height = imageSize.height >= top + rect.height ? rect.height : imageSize.height - top;
  return { left: left, top: top, width: width, height: height };
}

exports.cropBase64Image = cropBase64Image;
exports.base64ToImage = base64ToImage;
exports.imageToBase64 = imageToBase64;
exports.cropImage = cropImage;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLEtBQUssQUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUksU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLEFBQUMsQ0FBQztBQUM3RixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxBQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSSxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQUFBQyxDQUFDO0FBQ2hHLFNBQU8sRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFFLEdBQUcsRUFBSCxHQUFHLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUM7Q0FDbkM7O1FBRU8sZUFBZSxHQUFmLGVBQWU7UUFBRSxhQUFhLEdBQWIsYUFBYTtRQUFFLGFBQWEsR0FBYixhQUFhO1FBQUUsU0FBUyxHQUFULFNBQVMiLCJmaWxlIjoibGliL2ltYWdlLXV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0J1ZmZlcn0gZnJvbSAnYnVmZmVyJztcbmltcG9ydCB7UE5HfSBmcm9tICdwbmdqcyc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUmVnaW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGVmdCAtIFRoZSBvZmZzZXQgZnJvbSB0aGUgbGVmdCBzaWRlXG4gKiBAcHJvcGVydHkge251bWJlcn0gdG9wIC0gVGhlIG9mZnNldCBmcm9tIHRoZSB0b3BcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHRcbiAqL1xuXG5jb25zdCBCWVRFU19JTl9QSVhFTF9CTE9DSyA9IDQ7XG5jb25zdCBTQ0FOTElORV9GSUxURVJfTUVUSE9EID0gNDtcblxuLyoqXG4gKiBDcm9wIHRoZSBpbWFnZSBieSBnaXZlbiByZWN0YW5nbGUgKHVzZSBiYXNlNjQgc3RyaW5nIGFzIGlucHV0IGFuZCBvdXRwdXQpXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NEltYWdlIFRoZSBzdHJpbmcgd2l0aCBiYXNlNjQgZW5jb2RlZCBpbWFnZVxuICogQHBhcmFtIHtSZWdpb259IHJlY3QgVGhlIHNlbGVjdGVkIHJlZ2lvbiBvZiBpbWFnZVxuICogQHJldHVybiB7c3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgb2YgY3JvcHBlZCBpbWFnZVxuICovXG5hc3luYyBmdW5jdGlvbiBjcm9wQmFzZTY0SW1hZ2UgKGJhc2U2NEltYWdlLCByZWN0KSB7XG4gIGNvbnN0IGltYWdlID0gYXdhaXQgYmFzZTY0VG9JbWFnZShiYXNlNjRJbWFnZSk7XG4gIGNyb3BJbWFnZShpbWFnZSwgcmVjdCk7XG4gIHJldHVybiBhd2FpdCBpbWFnZVRvQmFzZTY0KGltYWdlKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwbmdqcyBpbWFnZSBmcm9tIGdpdmVuIGJhc2U2NCBpbWFnZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlNjRJbWFnZSBUaGUgc3RyaW5nIHdpdGggYmFzZTY0IGVuY29kZWQgaW1hZ2VcbiAqIEByZXR1cm4ge1BOR30gVGhlIGltYWdlIG9iamVjdFxuICovXG5hc3luYyBmdW5jdGlvbiBiYXNlNjRUb0ltYWdlIChiYXNlNjRJbWFnZSkge1xuICBjb25zdCBpbWFnZUJ1ZmZlciA9IG5ldyBCdWZmZXIoYmFzZTY0SW1hZ2UsICdiYXNlNjQnKTtcbiAgcmV0dXJuIG5ldyBCKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBQTkcoe2ZpbHRlclR5cGU6IFNDQU5MSU5FX0ZJTFRFUl9NRVRIT0R9KTtcbiAgICBpbWFnZS5wYXJzZShpbWFnZUJ1ZmZlciwgKGVyciwgaW1hZ2UpID0+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by1jYWxsYmFja3NcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGJhc2U2NCBzdHJpbmcgZm9yIGdpdmVuIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7UE5HfSBpbWFnZSBUaGUgaW1hZ2Ugb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgd2l0aCBiYXNlNjQgZW5jb2RlZCBpbWFnZVxuICovXG5hc3luYyBmdW5jdGlvbiBpbWFnZVRvQmFzZTY0IChpbWFnZSkge1xuICByZXR1cm4gbmV3IEIoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNodW5rcyA9IFtdO1xuICAgIGltYWdlLnBhY2soKVxuICAgIC5vbignZGF0YScsIChjaHVuaykgPT4gY2h1bmtzLnB1c2goY2h1bmspKS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICB9KVxuICAgIC5vbignZXJyb3InLCAoZXJyKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tY2FsbGJhY2tzXG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JvcCB0aGUgaW1hZ2UgYnkgZ2l2ZW4gcmVjdGFuZ2xlXG4gKlxuICogQHBhcmFtIHtQTkd9IGltYWdlIFRoZSBpbWFnZSB0byBtdXRhdGUgYnkgY3JvcHBpbmdcbiAqIEBwYXJhbSB7UmVnaW9ufSByZWN0IFRoZSBzZWxlY3RlZCByZWdpb24gb2YgaW1hZ2VcbiAqL1xuZnVuY3Rpb24gY3JvcEltYWdlIChpbWFnZSwgcmVjdCkge1xuICBjb25zdCBpbWFnZVJlY3QgPSB7d2lkdGg6IGltYWdlLndpZHRoLCBoZWlnaHQ6IGltYWdlLmhlaWdodH07XG4gIGNvbnN0IGludGVyUmVjdCA9IGdldFJlY3RJbnRlcnNlY3Rpb24ocmVjdCwgaW1hZ2VSZWN0KTtcbiAgaWYgKGludGVyUmVjdC53aWR0aCA8IHJlY3Qud2lkdGggfHwgaW50ZXJSZWN0LmhlaWdodCA8IHJlY3QuaGVpZ2h0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgY3JvcCAke0pTT04uc3RyaW5naWZ5KHJlY3QpfSBmcm9tICR7SlNPTi5zdHJpbmdpZnkoaW1hZ2VSZWN0KX0gYmVjYXVzZSB0aGUgaW50ZXJzZWN0aW9uIGJldHdlZW4gdGhlbSB3YXMgbm90IHRoZSBzaXplIG9mIHRoZSByZWN0YCk7XG4gIH1cblxuICBjb25zdCBmaXJzdFZlcnRpY2FsUGl4ZWwgPSBpbnRlclJlY3QudG9wO1xuICBjb25zdCBsYXN0VmVydGljYWxQaXhlbCA9IGludGVyUmVjdC50b3AgKyBpbnRlclJlY3QuaGVpZ2h0O1xuXG4gIGNvbnN0IGZpcnN0SG9yaXpvbnRhbFBpeGVsID0gaW50ZXJSZWN0LmxlZnQ7XG4gIGNvbnN0IGxhc3RIb3Jpem9udGFsUGl4ZWwgPSBpbnRlclJlY3QubGVmdCArIGludGVyUmVjdC53aWR0aDtcblxuICBjb25zdCBjcm9wcGVkQXJyYXkgPSBbXTtcbiAgZm9yIChsZXQgeSA9IGZpcnN0VmVydGljYWxQaXhlbDsgeSA8IGxhc3RWZXJ0aWNhbFBpeGVsOyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gZmlyc3RIb3Jpem9udGFsUGl4ZWw7IHggPCBsYXN0SG9yaXpvbnRhbFBpeGVsOyB4KyspIHtcbiAgICAgIGNvbnN0IGZpcnN0Qnl0ZUlkeEluUGl4ZWxCbG9jayA9IChpbWFnZVJlY3Qud2lkdGggKiB5ICsgeCkgPDwgMjtcbiAgICAgIGZvciAobGV0IGJ5dGVJZHggPSAwOyBieXRlSWR4IDwgQllURVNfSU5fUElYRUxfQkxPQ0s7IGJ5dGVJZHgrKykge1xuICAgICAgICBjcm9wcGVkQXJyYXkucHVzaChpbWFnZS5kYXRhW2ZpcnN0Qnl0ZUlkeEluUGl4ZWxCbG9jayArIGJ5dGVJZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbWFnZS5kYXRhID0gbmV3IEJ1ZmZlcihjcm9wcGVkQXJyYXkpO1xuICBpbWFnZS53aWR0aCA9IGludGVyUmVjdC53aWR0aDtcbiAgaW1hZ2UuaGVpZ2h0ID0gaW50ZXJSZWN0LmhlaWdodDtcbiAgcmV0dXJuIGltYWdlO1xufVxuXG5mdW5jdGlvbiBnZXRSZWN0SW50ZXJzZWN0aW9uIChyZWN0LCBpbWFnZVNpemUpIHtcbiAgY29uc3QgbGVmdCA9IHJlY3QubGVmdCA+PSBpbWFnZVNpemUud2lkdGggPyBpbWFnZVNpemUud2lkdGggOiByZWN0LmxlZnQ7XG4gIGNvbnN0IHRvcCA9IHJlY3QudG9wID49IGltYWdlU2l6ZS5oZWlnaHQgPyBpbWFnZVNpemUuaGVpZ2h0IDogcmVjdC50b3A7XG4gIGNvbnN0IHdpZHRoID0gaW1hZ2VTaXplLndpZHRoID49IChsZWZ0ICsgcmVjdC53aWR0aCkgPyByZWN0LndpZHRoIDogKGltYWdlU2l6ZS53aWR0aCAtIGxlZnQpO1xuICBjb25zdCBoZWlnaHQgPSBpbWFnZVNpemUuaGVpZ2h0ID49ICh0b3AgKyByZWN0LmhlaWdodCkgPyByZWN0LmhlaWdodCA6IChpbWFnZVNpemUuaGVpZ2h0IC0gdG9wKTtcbiAgcmV0dXJuIHtsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHR9O1xufVxuXG5leHBvcnQge2Nyb3BCYXNlNjRJbWFnZSwgYmFzZTY0VG9JbWFnZSwgaW1hZ2VUb0Jhc2U2NCwgY3JvcEltYWdlfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==

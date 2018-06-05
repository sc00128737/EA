'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _asyncbox = require('asyncbox');

var _appiumSupport = require('appium-support');

var log = _appiumSupport.logger.getLogger('Chromedriver Install');

var CD_VER = process.env.npm_config_chromedriver_version || process.env.CHROMEDRIVER_VERSION || '2.35';
var CD_CDN = process.env.npm_config_chromedriver_cdnurl || process.env.CHROMEDRIVER_CDNURL || 'https://chromedriver.storage.googleapis.com';
var CD_BASE_DIR = _path2['default'].resolve(__dirname, "..", "..", "chromedriver");
var CD_PLATS = ["linux", "win", "mac"];
var CD_ARCHS = ["32", "64"];

function getCurPlatform() {
  return _appiumSupport.system.isWindows() ? "win" : _appiumSupport.system.isMac() ? "mac" : "linux";
}

function getChromedriverDir() {
  var platform = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!platform) {
    platform = getCurPlatform();
  }
  return _path2['default'].resolve(CD_BASE_DIR, platform);
}

function getArchAndPlatform() {
  var arch, platform;
  return _regeneratorRuntime.async(function getArchAndPlatform$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.system.arch());

      case 2:
        arch = context$1$0.sent;
        platform = getCurPlatform();

        if (platform !== 'linux' && platform !== 'mac' && arch === '64') {
          arch = '32';
        }
        if (platform === 'mac' && parseFloat(CD_VER) < 2.23) {
          arch = '32';
        }
        return context$1$0.abrupt('return', { arch: arch, platform: platform });

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getChromedriverBinaryPath() {
  var platform = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var arch = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var baseDir, ext;
  return _regeneratorRuntime.async(function getChromedriverBinaryPath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!platform) {
          platform = getCurPlatform();
        }
        baseDir = getChromedriverDir(platform);
        ext = "";

        if (!(platform === "win")) {
          context$1$0.next = 7;
          break;
        }

        ext = ".exe";
        context$1$0.next = 13;
        break;

      case 7:
        if (!(platform === "linux")) {
          context$1$0.next = 13;
          break;
        }

        if (arch) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(_appiumSupport.system.arch());

      case 11:
        arch = context$1$0.sent;

      case 12:
        ext = "_" + arch;

      case 13:
        return context$1$0.abrupt('return', _path2['default'].resolve(baseDir, 'chromedriver' + ext));

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getDownloadUrl(version, platform, arch) {
  return CD_CDN + '/' + version + '/chromedriver_' + platform + arch + '.zip';
}

function validatePlatform(platform, arch) {
  if (!_lodash2['default'].includes(CD_PLATS, platform)) {
    throw new Error('Invalid platform: ' + platform);
  }
  if (!_lodash2['default'].includes(CD_ARCHS, arch)) {
    throw new Error('Invalid arch: ' + arch);
  }
  if (arch === "64" && platform !== "linux" && platform !== 'mac') {
    throw new Error("Only linux has a 64-bit version of Chromedriver");
  }
}

function installForPlatform(version, platform, arch) {
  var url, binarySpec, tempFile, body, tempUnzipped, extractedBin, newBin, binContents;
  return _regeneratorRuntime.async(function installForPlatform$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(version === 'LATEST')) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_requestPromise2['default'].get({ uri: CD_CDN + '/LATEST_RELEASE' }));

      case 3:
        version = context$1$0.sent.trim();

      case 4:
        validatePlatform(platform, arch);

        url = getDownloadUrl(version, platform, arch);

        log.info('Installing Chromedriver version \'' + version + '\' for platform \'' + platform + '\' and architecture \'' + arch + '\'');

        // set up a temp file to download the chromedriver zipfile to
        binarySpec = 'chromedriver_' + platform + arch;

        log.info('Opening temp file to write ' + binarySpec + ' to...');
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.open({
          prefix: binarySpec,
          suffix: '.zip'
        }));

      case 11:
        tempFile = context$1$0.sent;

        // actually download the zipfile and write it with appropriate perms
        log.info('Downloading ' + url + '...');
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(_requestPromise2['default'].get({ url: url, encoding: 'binary' }));

      case 15:
        body = context$1$0.sent;

        log.info('Writing binary content to ' + tempFile.path + '...');
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(tempFile.path, body, { encoding: 'binary' }));

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.chmod(tempFile.path, 420));

      case 21:
        tempUnzipped = _path2['default'].resolve(_path2['default'].dirname(tempFile.path), binarySpec);

        log.info('Extracting ' + tempFile.path + ' to ' + tempUnzipped);
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(tempUnzipped));

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(_appiumSupport.zip.extractAllTo(tempFile.path, tempUnzipped));

      case 27:
        extractedBin = _path2['default'].resolve(tempUnzipped, "chromedriver");

        if (platform === "win") {
          extractedBin += ".exe";
        }

        // make build dirs that will hold the chromedriver binary
        log.info('Creating ' + _path2['default'].resolve(CD_BASE_DIR, platform) + '...');
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(_path2['default'].resolve(CD_BASE_DIR, platform)));

      case 32:
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(getChromedriverBinaryPath(platform, arch));

      case 34:
        newBin = context$1$0.sent;

        log.info('Copying unzipped binary, reading from ' + extractedBin + '...');
        context$1$0.next = 38;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(extractedBin, { encoding: 'binary' }));

      case 38:
        binContents = context$1$0.sent;

        log.info('Writing to ' + newBin + '...');
        context$1$0.next = 42;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(newBin, binContents, { encoding: 'binary', mode: 493 }));

      case 42:
        log.info(newBin + ' successfully put in place');

      case 43:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function install() {
  var _ref, arch, platform;

  return _regeneratorRuntime.async(function install$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getArchAndPlatform());

      case 2:
        _ref = context$1$0.sent;
        arch = _ref.arch;
        platform = _ref.platform;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(installForPlatform(CD_VER, platform, arch));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function conditionalInstall() {
  var _ref2, arch, platform, binPath;

  return _regeneratorRuntime.async(function conditionalInstall$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getArchAndPlatform());

      case 2:
        _ref2 = context$1$0.sent;
        arch = _ref2.arch;
        platform = _ref2.platform;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(getChromedriverBinaryPath(platform, arch));

      case 7:
        binPath = context$1$0.sent;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(binPath));

      case 10:
        if (context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(installForPlatform(CD_VER, platform, arch));

      case 13:
        context$1$0.next = 16;
        break;

      case 15:
        log.info('No need to install chromedriver, ' + binPath + ' exists');

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getPlatforms() {
  var plats = [['win', '32'], ['linux', '64']];
  var cdVer = parseFloat(CD_VER);
  // before 2.23 Mac version was 32 bit. After it is 64.
  plats.push(cdVer < 2.23 ? ['mac', '32'] : ['mac', '64']);
  // 2.34 and above linux is only supporting 64 bit
  if (cdVer < 2.34) {
    plats.push(['linux', '32']);
  }
  return plats;
}

function installAll() {
  var downloads, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, platform, arch;

  return _regeneratorRuntime.async(function installAll$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        downloads = [];
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;

        for (_iterator = _getIterator(getPlatforms()); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _step$value = _slicedToArray(_step.value, 2);
          platform = _step$value[0];
          arch = _step$value[1];

          downloads.push(installForPlatform(CD_VER, platform, arch));
        }
        context$1$0.next = 12;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 12:
        context$1$0.prev = 12;
        context$1$0.prev = 13;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 15:
        context$1$0.prev = 15;

        if (!_didIteratorError) {
          context$1$0.next = 18;
          break;
        }

        throw _iteratorError;

      case 18:
        return context$1$0.finish(15);

      case 19:
        return context$1$0.finish(12);

      case 20:
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap((0, _asyncbox.parallel)(downloads));

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 8, 12, 20], [13,, 15, 19]]);
}

function doInstall() {
  return _regeneratorRuntime.async(function doInstall$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(_lodash2['default'].includes(process.argv, '--all') || process.env.npm_config_chromedriver_install_all)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(installAll());

      case 3:
        context$1$0.next = 12;
        break;

      case 5:
        if (!_lodash2['default'].includes(process.argv, '--conditional')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(conditionalInstall());

      case 8:
        context$1$0.next = 12;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(install());

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.getChromedriverBinaryPath = getChromedriverBinaryPath;
exports.install = install;
exports.installAll = installAll;
exports.CD_BASE_DIR = CD_BASE_DIR;
exports.getCurPlatform = getCurPlatform;
exports.conditionalInstall = conditionalInstall;
exports.doInstall = doInstall;
exports.getPlatforms = getPlatforms;

// extract downloaded zipfile to tempdir

// copy the extracted binary to the correct build dir
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEdBQVYsVUFBVTtRQUFFLFdBQVcsR0FBWCxXQUFXO1FBQzNELGNBQWMsR0FBZCxjQUFjO1FBQUUsa0JBQWtCLEdBQWxCLGtCQUFrQjtRQUFFLFNBQVMsR0FBVCxTQUFTO1FBQUUsWUFBWSxHQUFaLFlBQVkiLCJmaWxlIjoibGliL2luc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IHsgcGFyYWxsZWwgYXMgbGwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgeyBzeXN0ZW0sIHRlbXBEaXIsIGZzLCBsb2dnZXIsIHppcCwgbWtkaXJwIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuXG5cbmNvbnN0IGxvZyA9IGxvZ2dlci5nZXRMb2dnZXIoJ0Nocm9tZWRyaXZlciBJbnN0YWxsJyk7XG5cbmNvbnN0IENEX1ZFUiA9IHByb2Nlc3MuZW52Lm5wbV9jb25maWdfY2hyb21lZHJpdmVyX3ZlcnNpb24gfHwgcHJvY2Vzcy5lbnYuQ0hST01FRFJJVkVSX1ZFUlNJT04gfHwgJzIuMzUnO1xuY29uc3QgQ0RfQ0ROID0gcHJvY2Vzcy5lbnYubnBtX2NvbmZpZ19jaHJvbWVkcml2ZXJfY2RudXJsIHx8XG4gICAgICAgICAgICAgICBwcm9jZXNzLmVudi5DSFJPTUVEUklWRVJfQ0ROVVJMIHx8XG4gICAgICAgICAgICAgICAnaHR0cHM6Ly9jaHJvbWVkcml2ZXIuc3RvcmFnZS5nb29nbGVhcGlzLmNvbSc7XG5jb25zdCBDRF9CQVNFX0RJUiA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcImNocm9tZWRyaXZlclwiKTtcbmNvbnN0IENEX1BMQVRTID0gW1wibGludXhcIiwgXCJ3aW5cIiwgXCJtYWNcIl07XG5jb25zdCBDRF9BUkNIUyA9IFtcIjMyXCIsIFwiNjRcIl07XG5cbmZ1bmN0aW9uIGdldEN1clBsYXRmb3JtICgpIHtcbiAgcmV0dXJuIHN5c3RlbS5pc1dpbmRvd3MoKSA/IFwid2luXCIgOiAoc3lzdGVtLmlzTWFjKCkgPyBcIm1hY1wiIDogXCJsaW51eFwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hyb21lZHJpdmVyRGlyIChwbGF0Zm9ybSA9IG51bGwpIHtcbiAgaWYgKCFwbGF0Zm9ybSkge1xuICAgIHBsYXRmb3JtID0gZ2V0Q3VyUGxhdGZvcm0oKTtcbiAgfVxuICByZXR1cm4gcGF0aC5yZXNvbHZlKENEX0JBU0VfRElSLCBwbGF0Zm9ybSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFyY2hBbmRQbGF0Zm9ybSAoKSB7XG4gIGxldCBhcmNoID0gYXdhaXQgc3lzdGVtLmFyY2goKTtcbiAgbGV0IHBsYXRmb3JtID0gZ2V0Q3VyUGxhdGZvcm0oKTtcbiAgaWYgKHBsYXRmb3JtICE9PSAnbGludXgnICYmIHBsYXRmb3JtICE9PSAnbWFjJyAmJiBhcmNoID09PSAnNjQnKSB7XG4gICAgYXJjaCA9ICczMic7XG4gIH1cbiAgaWYgKHBsYXRmb3JtID09PSAnbWFjJyAmJiBwYXJzZUZsb2F0KENEX1ZFUikgPCAyLjIzKSB7XG4gICAgYXJjaCA9ICczMic7XG4gIH1cbiAgcmV0dXJuIHthcmNoLCBwbGF0Zm9ybX07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENocm9tZWRyaXZlckJpbmFyeVBhdGggKHBsYXRmb3JtID0gbnVsbCwgYXJjaCA9IG51bGwpIHtcbiAgaWYgKCFwbGF0Zm9ybSkge1xuICAgIHBsYXRmb3JtID0gZ2V0Q3VyUGxhdGZvcm0oKTtcbiAgfVxuICBjb25zdCBiYXNlRGlyID0gZ2V0Q2hyb21lZHJpdmVyRGlyKHBsYXRmb3JtKTtcbiAgbGV0IGV4dCA9IFwiXCI7XG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3aW5cIikge1xuICAgIGV4dCA9IFwiLmV4ZVwiO1xuICB9IGVsc2UgaWYgKHBsYXRmb3JtID09PSBcImxpbnV4XCIpIHtcbiAgICBpZiAoIWFyY2gpIHtcbiAgICAgIGFyY2ggPSBhd2FpdCBzeXN0ZW0uYXJjaCgpO1xuICAgIH1cbiAgICBleHQgPSBcIl9cIiArIGFyY2g7XG4gIH1cbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShiYXNlRGlyLCBgY2hyb21lZHJpdmVyJHtleHR9YCk7XG59XG5cbmZ1bmN0aW9uIGdldERvd25sb2FkVXJsICh2ZXJzaW9uLCBwbGF0Zm9ybSwgYXJjaCkge1xuICByZXR1cm4gYCR7Q0RfQ0ROfS8ke3ZlcnNpb259L2Nocm9tZWRyaXZlcl8ke3BsYXRmb3JtfSR7YXJjaH0uemlwYDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQbGF0Zm9ybSAocGxhdGZvcm0sIGFyY2gpIHtcbiAgaWYgKCFfLmluY2x1ZGVzKENEX1BMQVRTLCBwbGF0Zm9ybSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGxhdGZvcm06ICR7cGxhdGZvcm19YCk7XG4gIH1cbiAgaWYgKCFfLmluY2x1ZGVzKENEX0FSQ0hTLCBhcmNoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhcmNoOiAke2FyY2h9YCk7XG4gIH1cbiAgaWYgKGFyY2ggPT09IFwiNjRcIiAmJiBwbGF0Zm9ybSAhPT0gXCJsaW51eFwiICYmIHBsYXRmb3JtICE9PSAnbWFjJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgbGludXggaGFzIGEgNjQtYml0IHZlcnNpb24gb2YgQ2hyb21lZHJpdmVyXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGxGb3JQbGF0Zm9ybSAodmVyc2lvbiwgcGxhdGZvcm0sIGFyY2gpIHtcbiAgaWYgKHZlcnNpb24gPT09ICdMQVRFU1QnKSB7XG4gICAgdmVyc2lvbiA9IChhd2FpdCByZXF1ZXN0LmdldCh7dXJpOiBDRF9DRE4gKyAnL0xBVEVTVF9SRUxFQVNFJ30pKS50cmltKCk7XG4gIH1cbiAgdmFsaWRhdGVQbGF0Zm9ybShwbGF0Zm9ybSwgYXJjaCk7XG5cbiAgY29uc3QgdXJsID0gZ2V0RG93bmxvYWRVcmwodmVyc2lvbiwgcGxhdGZvcm0sIGFyY2gpO1xuXG4gIGxvZy5pbmZvKGBJbnN0YWxsaW5nIENocm9tZWRyaXZlciB2ZXJzaW9uICcke3ZlcnNpb259JyBmb3IgcGxhdGZvcm0gJyR7cGxhdGZvcm19JyBhbmQgYXJjaGl0ZWN0dXJlICcke2FyY2h9J2ApO1xuXG4gIC8vIHNldCB1cCBhIHRlbXAgZmlsZSB0byBkb3dubG9hZCB0aGUgY2hyb21lZHJpdmVyIHppcGZpbGUgdG9cbiAgbGV0IGJpbmFyeVNwZWMgPSBgY2hyb21lZHJpdmVyXyR7cGxhdGZvcm19JHthcmNofWA7XG4gIGxvZy5pbmZvKGBPcGVuaW5nIHRlbXAgZmlsZSB0byB3cml0ZSAke2JpbmFyeVNwZWN9IHRvLi4uYCk7XG4gIGxldCB0ZW1wRmlsZSA9IGF3YWl0IHRlbXBEaXIub3Blbih7XG4gICAgcHJlZml4OiBiaW5hcnlTcGVjLFxuICAgIHN1ZmZpeDogJy56aXAnXG4gIH0pO1xuXG4gIC8vIGFjdHVhbGx5IGRvd25sb2FkIHRoZSB6aXBmaWxlIGFuZCB3cml0ZSBpdCB3aXRoIGFwcHJvcHJpYXRlIHBlcm1zXG4gIGxvZy5pbmZvKGBEb3dubG9hZGluZyAke3VybH0uLi5gKTtcbiAgbGV0IGJvZHkgPSBhd2FpdCByZXF1ZXN0LmdldCh7dXJsLCBlbmNvZGluZzogJ2JpbmFyeSd9KTtcbiAgbG9nLmluZm8oYFdyaXRpbmcgYmluYXJ5IGNvbnRlbnQgdG8gJHt0ZW1wRmlsZS5wYXRofS4uLmApO1xuICBhd2FpdCBmcy53cml0ZUZpbGUodGVtcEZpbGUucGF0aCwgYm9keSwge2VuY29kaW5nOiAnYmluYXJ5J30pO1xuICBhd2FpdCBmcy5jaG1vZCh0ZW1wRmlsZS5wYXRoLCAwbzA2NDQpO1xuXG4gIC8vIGV4dHJhY3QgZG93bmxvYWRlZCB6aXBmaWxlIHRvIHRlbXBkaXJcbiAgbGV0IHRlbXBVbnppcHBlZCA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUodGVtcEZpbGUucGF0aCksIGJpbmFyeVNwZWMpO1xuICBsb2cuaW5mbyhgRXh0cmFjdGluZyAke3RlbXBGaWxlLnBhdGh9IHRvICR7dGVtcFVuemlwcGVkfWApO1xuICBhd2FpdCBta2RpcnAodGVtcFVuemlwcGVkKTtcbiAgYXdhaXQgemlwLmV4dHJhY3RBbGxUbyh0ZW1wRmlsZS5wYXRoLCB0ZW1wVW56aXBwZWQpO1xuICBsZXQgZXh0cmFjdGVkQmluID0gcGF0aC5yZXNvbHZlKHRlbXBVbnppcHBlZCwgXCJjaHJvbWVkcml2ZXJcIik7XG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3aW5cIikge1xuICAgIGV4dHJhY3RlZEJpbiArPSBcIi5leGVcIjtcbiAgfVxuXG4gIC8vIG1ha2UgYnVpbGQgZGlycyB0aGF0IHdpbGwgaG9sZCB0aGUgY2hyb21lZHJpdmVyIGJpbmFyeVxuICBsb2cuaW5mbyhgQ3JlYXRpbmcgJHtwYXRoLnJlc29sdmUoQ0RfQkFTRV9ESVIsIHBsYXRmb3JtKX0uLi5gKTtcbiAgYXdhaXQgbWtkaXJwKHBhdGgucmVzb2x2ZShDRF9CQVNFX0RJUiwgcGxhdGZvcm0pKTtcblxuICAvLyBjb3B5IHRoZSBleHRyYWN0ZWQgYmluYXJ5IHRvIHRoZSBjb3JyZWN0IGJ1aWxkIGRpclxuICBsZXQgbmV3QmluID0gYXdhaXQgZ2V0Q2hyb21lZHJpdmVyQmluYXJ5UGF0aChwbGF0Zm9ybSwgYXJjaCk7XG4gIGxvZy5pbmZvKGBDb3B5aW5nIHVuemlwcGVkIGJpbmFyeSwgcmVhZGluZyBmcm9tICR7ZXh0cmFjdGVkQmlufS4uLmApO1xuICBsZXQgYmluQ29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShleHRyYWN0ZWRCaW4sIHtlbmNvZGluZzogJ2JpbmFyeSd9KTtcbiAgbG9nLmluZm8oYFdyaXRpbmcgdG8gJHtuZXdCaW59Li4uYCk7XG4gIGF3YWl0IGZzLndyaXRlRmlsZShuZXdCaW4sIGJpbkNvbnRlbnRzLCB7ZW5jb2Rpbmc6ICdiaW5hcnknLCBtb2RlOiAwbzc1NX0pO1xuICBsb2cuaW5mbyhgJHtuZXdCaW59IHN1Y2Nlc3NmdWxseSBwdXQgaW4gcGxhY2VgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5zdGFsbCAoKSB7XG4gIGxldCB7YXJjaCwgcGxhdGZvcm19ID0gYXdhaXQgZ2V0QXJjaEFuZFBsYXRmb3JtKCk7XG4gIGF3YWl0IGluc3RhbGxGb3JQbGF0Zm9ybShDRF9WRVIsIHBsYXRmb3JtLCBhcmNoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29uZGl0aW9uYWxJbnN0YWxsICgpIHtcbiAgbGV0IHthcmNoLCBwbGF0Zm9ybX0gPSBhd2FpdCBnZXRBcmNoQW5kUGxhdGZvcm0oKTtcbiAgbGV0IGJpblBhdGggPSBhd2FpdCBnZXRDaHJvbWVkcml2ZXJCaW5hcnlQYXRoKHBsYXRmb3JtLCBhcmNoKTtcbiAgaWYgKCFhd2FpdCBmcy5leGlzdHMoYmluUGF0aCkpIHtcbiAgICBhd2FpdCBpbnN0YWxsRm9yUGxhdGZvcm0oQ0RfVkVSLCBwbGF0Zm9ybSwgYXJjaCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oYE5vIG5lZWQgdG8gaW5zdGFsbCBjaHJvbWVkcml2ZXIsICR7YmluUGF0aH0gZXhpc3RzYCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UGxhdGZvcm1zICgpIHtcbiAgbGV0IHBsYXRzID0gW1xuICAgIFsnd2luJywgJzMyJ10sXG4gICAgWydsaW51eCcsICc2NCddLFxuICBdO1xuICBjb25zdCBjZFZlciA9IHBhcnNlRmxvYXQoQ0RfVkVSKTtcbiAgLy8gYmVmb3JlIDIuMjMgTWFjIHZlcnNpb24gd2FzIDMyIGJpdC4gQWZ0ZXIgaXQgaXMgNjQuXG4gIHBsYXRzLnB1c2goY2RWZXIgPCAyLjIzID8gWydtYWMnLCAnMzInXSA6IFsnbWFjJywgJzY0J10pO1xuICAvLyAyLjM0IGFuZCBhYm92ZSBsaW51eCBpcyBvbmx5IHN1cHBvcnRpbmcgNjQgYml0XG4gIGlmIChjZFZlciA8IDIuMzQpIHtcbiAgICBwbGF0cy5wdXNoKFsnbGludXgnLCAnMzInXSk7XG4gIH1cbiAgcmV0dXJuIHBsYXRzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbnN0YWxsQWxsICgpIHtcbiAgbGV0IGRvd25sb2FkcyA9IFtdO1xuICBmb3IgKGxldCBbcGxhdGZvcm0sIGFyY2hdIG9mIGdldFBsYXRmb3JtcygpKSB7XG4gICAgZG93bmxvYWRzLnB1c2goaW5zdGFsbEZvclBsYXRmb3JtKENEX1ZFUiwgcGxhdGZvcm0sIGFyY2gpKTtcbiAgfVxuICBhd2FpdCBsbChkb3dubG9hZHMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb0luc3RhbGwgKCkge1xuICBpZiAoXy5pbmNsdWRlcyhwcm9jZXNzLmFyZ3YsICctLWFsbCcpIHx8XG4gICAgICBwcm9jZXNzLmVudi5ucG1fY29uZmlnX2Nocm9tZWRyaXZlcl9pbnN0YWxsX2FsbCkge1xuICAgIGF3YWl0IGluc3RhbGxBbGwoKTtcbiAgfSBlbHNlIGlmIChfLmluY2x1ZGVzKHByb2Nlc3MuYXJndiwgJy0tY29uZGl0aW9uYWwnKSkge1xuICAgIGF3YWl0IGNvbmRpdGlvbmFsSW5zdGFsbCgpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGluc3RhbGwoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBnZXRDaHJvbWVkcml2ZXJCaW5hcnlQYXRoLCBpbnN0YWxsLCBpbnN0YWxsQWxsLCBDRF9CQVNFX0RJUixcbiAgICAgICAgIGdldEN1clBsYXRmb3JtLCBjb25kaXRpb25hbEluc3RhbGwsIGRvSW5zdGFsbCwgZ2V0UGxhdGZvcm1zIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=

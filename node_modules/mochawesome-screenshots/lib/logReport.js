const chalk = require('chalk');
const stringify = require('json-stringify-safe');

var logReport = function logReport() {

    if ((!arguments[0].test && !arguments[0].ctx) || !arguments[1]) {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Invalid log report arguments.');
        return;
    }

    var test = arguments[0].test ? arguments[0].test: arguments[0];
    var data = arguments[1];

    if (!test.logr) {
        test.logr = eval(stringify(data,null,2));
    } else {
        test.logr += '<br>'+eval(stringify(data,null,2));
    }
};
var setReportName = function setReportName() {

    if ((!arguments[0].test && !arguments[0].ctx) || !arguments[1] || typeof arguments[1] !== 'string') {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Invalid arguments.');
        return;
    }

    var test = arguments[0].test ? arguments[0].test: arguments[0];
    test.reportName = arguments[1];
};

var setScreenshot = function setScreenshot() {

    if ((!arguments[0].test && !arguments[0].ctx) || !arguments[1] || typeof arguments[1] !== 'string') {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Invalid arguments.');
        return;
    }

    var test = arguments[0].test ? arguments[0].test: arguments[0];
    test.customScrFileName = arguments[1];
};

module.exports = {
    log:logReport,
    setReportName:setReportName,
    setScreenshot:setScreenshot
};
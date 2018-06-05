# mochawesome-screenshots
This is a fork of Mochawesome(MochawesomePlusPlus) reporter with added screenshots functionality for Protractor.
A reporter takes a screenshot after each failed Protractor test.

Installation of the module:
```
$ npm install mochawesome-screenshots --save-dev
```

Usage remains the same as the Mocahwesome.

In your Protractor configuration file:
```
  framework: 'mocha',

  mochaOpts: {
      reporter: 'mochawesome-screenshots',
      reporterOptions: {
          reportDir: 'customReportDir',
          reportName: 'customReportName',
          reportTitle: 'customReportTitle',
          reportPageTitle: 'customReportPageTitle',
          takePassedScreenshot: false,
          clearOldScreenshots: true,
          shortScrFileNames: false,
          jsonReport: false,
          multiReport: false
      },
      timeout: 600000
  },
```

Use 'multiReport = true' for parallel test execution (adding timestamp in report file name),
 or change report name in tests or hooks for shardTestFiles option:

    const logReport = require('mochawesome-screenshots/logReport');
        
    it('Change report name', function() {
        logReport.setReportName(this, 'customReportName');
    });

Log data to report:

    const logReport = require('mochawesome-screenshots/logReport');

    it('Log build number', function() {
        logReport.log(this, 'build number:' + buildNumber);
    });

Add custom screenshot from mochawesome-reports/screenshots folder to report:

    it('Custom screenshot', function() {
        ..
        save screenshot to ('./mochawesome-reports/screenshots/'+imageFileName);
        ..
        logReport.setScreenshot(this, imageFileName);
    });
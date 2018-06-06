var modules = require('../config/requiredModules.js');
var config = require('../config/desiredCapabilities').mEasyAndroid;
var driver = modules.webdriverio.remote(config);

describe("mEasy Application", function () {

    it("Booking Audio Conference", function () {
      this.timeout(900000);
      //Launching applicaition on specified platform/Emulator
       return modules.appSpecificFunctions.launchAndLoginmEasy(modules, driver)
       .then(function () {
        return modules.appSpecificFunctions.searchItemAndOpen(modules,driver,"Audio Conference");
      })
      .then(function () {
        return modules.appSpecificFunctions.bookAudioConference(modules, driver);
      })
      .then(function () {
        return modules.appSpecificFunctions.logOut(modules, driver);
      })
               
    })
  
    afterEach("take screenshot on failure", function () {
      this.timeout(900000);
      // Capturing screenshot for failed step
      if (this.currentTest.state !== "passed") {
        return modules.helperFunctions.screenshot(driver);
      }
    })
  }) 
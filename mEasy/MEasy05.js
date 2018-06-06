var modules = require('../config/requiredModules.js');
var config = require('../config/desiredCapabilities').mEasyAndroid;
var driver = modules.webdriverio.remote(config);

describe("mEasy Application", function () {

    it("Verify Home Page Logo", function () {
      this.timeout(900000);
      //Launching applicaition on specified platform/Emulator
       return modules.appSpecificFunctions.VerifyHomePage(modules, driver)
           })
  
    afterEach("take screenshot on failure", function () {
      this.timeout(900000);
      // Capturing screenshot for failed step
      if (this.currentTest.state !== "passed") {
        return modules.helperFunctions.screenshot(driver);
      }
    })
  }) 
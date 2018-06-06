var modules = require('../config/requiredModules.js');
var config = require('../config/desiredCapabilities').Android;
var driver = modules.webdriverio.remote(config);

describe("Launch Nemo Application", function () {

    it("Search", function () {
      this.timeout(900000);
      //Launching applicaition on specified platform/Emulator
       return modules.appSpecificFunctions.launchAppNemo(modules, driver)
               
    })
  
    afterEach("take screenshot on failure", function () {
      this.timeout(900000);
      // Capturing screenshot for failed step
      if (this.currentTest.state !== "passed") {
        return modules.helperFunctions.screenshot(driver);
      }
    })
  }) 
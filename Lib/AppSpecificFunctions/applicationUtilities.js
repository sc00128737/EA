function launchAppNemo(modules, driver) {
  return driver
    .pause(2000)
        .then(function () {
      return modules.mobileActions.init("Launching Application", driver);
    })
    .then(function () {
      return modules.mobileActions.setValue("Entering Email ID", driver,modules.androidOR.Username,modules.testData.Login.Email);
    })
    .then(function () {
      return modules.mobileActions.setValue("Entering Password", driver,modules.androidOR.Password,modules.testData.Login.Password);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Login Button", driver, modules.androidOR.Login);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button1);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button2);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button3);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button4);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button1);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button2);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button3);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.button4);
    })
    .then(function () {
      return modules.mobileActions.touchActionTapCoordinate("Tap on Search", driver,1233,200);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on People", driver, modules.androidOR.People);
    })
    .then(function () {
      return modules.mobileActions.setValue("Sending Name", driver, modules.androidOR.TextID,modules.testData.Login.Name);
     })
     .then(function () {
      return modules.mobileActions.touchActionTap("Tap on List", driver, modules.androidOR.List);
    })
    .then(function () {
      return modules.mobileActions.touchActionTapCoordinate("Tap on Menu", driver,1356,207);
    })
    .then(function () {
      return modules.mobileActions.touchActionTapCoordinate("Tap on LogOut", driver,667,2000);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Confirm", driver, modules.androidOR.Confirm);
    })
    
}

function launchAndLoginmEasy(modules, driver) {
  return driver
    .pause(2000)
        .then(function () {
      return modules.mobileActions.init("Launching Application", driver);
    })
    .then(function () {
      return modules.mobileActions.setValue("Entering Email ID", driver,modules.androidOR.LanId,modules.testData.Login.LanID);
    })
    .then(function () {
      return modules.mobileActions.setValue("Entering Password", driver,modules.androidOR.mEasyPassword,modules.testData.Login.Password);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Login Button", driver, modules.androidOR.mEasyLogin);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton1);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton2);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton3);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton4);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton1);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton2);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton3);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on Button", driver, modules.androidOR.mbutton4);
    }) 
}

function searchItemAndOpen(modules, driver, searchTerm) {
  return driver
    .pause(2000)
        .then(function () {
          return modules.mobileActions.setValue("Entering search term", driver,modules.androidOR.mSearchTb,searchTerm);
    })
    .then(function () {
      return modules.mobileActions.touchActionTap("Tap on search Button", driver, modules.androidOR.mSearchItem);
    })
  }

  function openHolidayList(modules, driver) {
    return driver
      .pause(2000)
      .then(function () {
        return modules.mobileActions.touchActionTap("Tap on Americas", driver, modules.androidOR.Americas);
      })
      .then(function () {
        return modules.mobileActions.touchActionTap("Tap on US", driver, modules.androidOR.US);
      })
      .then(function () {
        return modules.mobileActions.getText("Verify Holiday is displayed ", driver, modules.androidOR.HeaderVerification);
      })
      .then(function () {
        return modules.mobileActions.touchActionTap("Tap on  Home Button", driver, modules.androidOR.HomeIcon);
      })
    }

    function bookAudioConference(modules, driver) {
      return driver
        .pause(2000)
        .then(function () {
          return modules.mobileActions.setValue("Entering Conference Name", driver,modules.androidOR.confNameTb,modules.testData.Login.ConfName);
        })
        .then(function () {
          return modules.mobileActions.getText("Verify Audio Conference  is displayed ", driver, modules.androidOR.HeaderVerification);
        })
        .then(function () {
          return modules.mobileActions.touchActionTap("Tap on Home Button", driver, modules.androidOR.HomeIcon);
        })
      }

      function openLocations(modules, driver) {
        return driver
          .pause(2000)
          .then(function () {
            return modules.mobileActions.touchActionTap("Tap on Asia Pacific", driver, modules.androidOR.AsiaPacific);
          })
          .then(function () {
            return modules.mobileActions.touchActionTap("Tap on India", driver, modules.androidOR.India);
          })
          .then(function () {
            return modules.mobileActions.touchActionTap("Tap on Pune", driver, modules.androidOR.Pune);
          })
          .then(function () {
            return modules.mobileActions.getText("Verify Locations are displayed ", driver, modules.androidOR.LocationsID);
          })
          .then(function () {
            return modules.mobileActions.touchActionTap("Tap on Home Button", driver, modules.androidOR.HomeIcon);
          })
        }

        function checkLeaves(modules, driver) {
          return driver
            .pause(2000)
            .then(function () {
              return modules.mobileActions.touchActionTap("Tap on Leave button", driver, modules.androidOR.LeavesId);
            })
            .then(function () {
              return modules.mobileActions.getText("Verify My Benefits Page is displayed ", driver, modules.androidOR.MyBenefitsID);
            })
            .then(function () {
              return modules.mobileActions.back("Tap on back", driver);
            })
            .then(function () {
              return modules.mobileActions.back("Tap on back", driver);
            })
          }

          function logOut(modules, driver) {
            return driver
            .pause(2000)
            .then(function () {
              return modules.mobileActions.touchActionTap("Tap on logout button", driver, modules.androidOR.LogoutButton);
            })
            .then(function () {
              return modules.mobileActions.touchActionTap("Tap on ok button", driver, modules.androidOR.okButton);
            })
            .then(function () {
              return modules.mobileActions.closeApp("Closing Application",driver);
            })
          }

          function VerifyHomePage(modules, driver) {
            return driver
            .pause(2000)
            .then(function () {
              return modules.mobileActions.init("Launching Application", driver);
            })
            .then(function () {
              return modules.mobileActions.isDisplayed("VErifying Measy Logo", driver,modules.androidOR.MEasyLogo);
            })
            .then(function () {
              return modules.mobileActions.isDisplayed("VErifying LanID Input field is displayed ", driver,modules.androidOR.LanId);
            })
            .then(function () {
              return modules.mobileActions.isDisplayed("VErifying Password Input field is displayed ", driver,modules.androidOR.mEasyPassword);
            })
            .then(function () {
              return modules.mobileActions.isDisplayed("VErifying Login button field is displayed ", driver,modules.androidOR.mEasyLogin);
            })

            
          }


exports.launchAppNemo = launchAppNemo;
exports.launchAndLoginmEasy = launchAndLoginmEasy;
exports.searchItemAndOpen = searchItemAndOpen;
exports.openHolidayList = openHolidayList;
exports.bookAudioConference = bookAudioConference;
exports.openLocations = openLocations;
exports.checkLeaves = checkLeaves;
exports.logOut = logOut;
exports.VerifyHomePage = VerifyHomePage;



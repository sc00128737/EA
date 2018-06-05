var screenshot = function(driver)
{
    var failScreenshot = allure.createStep("Attached Screenshot", function () {
       return driver
      .screenshot()
      .then(function (png) {
        return allure.createAttachment('Screenshot', new Buffer(png.value, 'base64'), 'image/jpeg');
      }) 
   })  
    return failScreenshot();
}

exports.screenshot = screenshot;
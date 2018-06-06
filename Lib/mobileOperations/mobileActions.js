var init = function (message, driver) {

	var initialize = allure.createStep(message, function () {

		return driver
			.init()
			.pause(5000);
	})

	return initialize();
}

var touchActionTap = function (message, driver, element) {

	var mainTap = allure.createStep(message, function () {
		return driver
		//.pause(2000)				
		.waitForExist(element, 40000)
			.touchAction(element, 'tap');
	});
	return mainTap();
}

var touchActionTapCoordinate = function (message, driver, xco, yco) {

	var mainTapco = allure.createStep(message, function () {
		return driver
		//	.pause(2000)
			.touchAction({
				action: 'tap', x: xco, y: yco
			});
	});
	return mainTapco();
}


var setValue = function (message, driver, element, value) {

	var setVal = allure.createStep(message, function () {
		return driver
			//.pause(2000)
			.waitForExist(element, 30000)
			.setValue(element, value);
	});
	return setVal();
}
var swipeUp = function (message, driver, element, offset, speed) {

	var scroll = allure.createStep(message, function () {
		return driver
			
			.swipeUp(element, offset, speed);
	})
	return scroll();
}

var closeApp = function (message, driver) {

	var closeApplication = allure.createStep(message, function () {

		return driver
			
			.closeApp();
		/* 	.reset(); */
	})
	return closeApplication();
}


var keys = function (message, driver) {

	var key = allure.createStep(message, function () {

		return driver
			//.pause(2000)
			.pressKeycode(84);
	})
	return key();
}

var getText = function (message, driver, element) {

	var get = allure.createStep(message, function () {

		return driver
		//	.pause(2000)
			.then(function () {
				return console.log(driver.getText(element));
			  })
			
	})
	return get();
}

var back = function (message, driver) {

	var navigate = allure.createStep(message, function () {
		
		return driver
		.pause(6000)
			.back();
	})
	return navigate();
}

var closeApp = function (message, driver) {

	var closeApplication = allure.createStep(message, function () {
		
		return driver
	//	.pause(2000)
			.closeApp();
					})
	return closeApplication();
}

exports.init = init;
exports.touchActionTap = touchActionTap;
exports.swipeUp = swipeUp;
exports.closeApp = closeApp;
exports.setValue = setValue;
exports.keys = keys;
exports.getText = getText;
exports.touchActionTapCoordinate = touchActionTapCoordinate;
exports.back = back;

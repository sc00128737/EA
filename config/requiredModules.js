// These are required packages needed for the scripts . Add your packages and import this file.

module.exports = {
	webdriverio: require('../node_modules/webdriverio'),
	config: require('./desiredCapabilities').Android,
	androidOR: require('../ObjectMap/androidOR.js').NemoAppOR,
	testData: require('../testData/testData'),
	helperFunctions: require('../Lib/Helpers/HelperFunctions.js'),
	appSpecificFunctions: require('../Lib/AppSpecificFunctions/applicationUtilities.js'),
	mobileActions: require('../Lib/mobileOperations/mobileActions.js'),
}
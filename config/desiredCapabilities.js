//These are desired capabilities for Android and iOS

exports.Android = {
    desiredCapabilities: {
        platformName: 'Android',
        platformVersion: '6.0.1',
        appPackage: 'com.techmahindra.mybeatplusapp',
        appActivity: 'com.techmahindra.mybeatplusapp.MainActivity',
        deviceName: 'LG G5',
        udid: 'LGH8605b04963d',
        unicodeKeyboard: true,
        resetKeyboard: true,
        clearSystemFiles: true,
        noReset: false
    },
    host: 'localhost',
    port: 4723,
    bp: 100
};


exports.mEasyAndroid = {
    desiredCapabilities: {
        platformName: 'Android',
        platformVersion: '6.0.1',
        appPackage: 'com.techmahindra.measy',
        appActivity: 'com.android.cioapp.activity.SplashScreen',
        deviceName: 'LG G5',
        udid: 'LGH8605b04963d',
        unicodeKeyboard: true,
        resetKeyboard: true,
        clearSystemFiles: true,
        noReset: false
    },
    host: 'localhost',
    port: 4723,
    bp: 100
};


exports.Android1 = {
    desiredCapabilities: {
        platformName: 'Android',
        platformVersion: '6.0.1',
        appPackage: 'com.techmahindra.measy',
        appActivity: 'com.android.cioapp.activity.SplashScreen',
        deviceName: 'LG G5',
        udid: 'LGH8605b04963d',
        unicodeKeyboard: true,
        resetKeyboard: true,
        clearSystemFiles: true,
        noReset: false
    },
    host: 'localhost',
    port: 4723,
    bp: 100
};

const createTestCafe = require('testcafe');
let testcafe         = null;
const utils = require('./getNetworkIp');

const pullRequest = process.env.TRAVIS_PULL_REQUEST || false;
const branch = pullRequest
    ? process.env.TRAVIS_PULL_REQUEST_BRANCH
    : process.env.TRAVIS_BRANCH || 'Local';

utils.getNetworkIp().then(ip => {
    process.env.BROWSERSTACK_PROJECT_NAME = 'arbeidssokerregistrering';
    process.env.BROWSERSTACK_BUILD_ID = branch;
    console.log("Starter testcafe");
    createTestCafe(ip, 1337, 1338)
        .then(tc => {
            testcafe     = tc;
            const runner = testcafe.createRunner();

            return runner
                .src(['integration/registrering.test.ts'])
                .browsers(['browserstack:iPhone XS@12.0', 'browserstack:chrome:Windows 10', 'browserstack:ie@11.0:Windows 8.1', "browserstack:Samsung Galaxy S9@8.0"])
                .screenshots('./integration/screenshots/', true, '${BROWSER}_${TEST}.png')
                .run();
        })
        .then(failedCount => {
            console.log('Tests failed: ' + failedCount);
            testcafe.close();
        });

});

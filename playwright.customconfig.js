// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');
const { on } = require('node:cluster');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({

  //Test Directory
  testDir: './tests',

  workers:5, 
  // By Default playwright can run 5 test file in parralel but we can edit this

  // No of Retries 
  retries:1,

  //By Default Playwright wait for 30 secs if we want to overright that then we use this time out
  timeout: 40 * 1000,

  //This time out is used for assertions in project level. 
  expect: {
    timeout: 50 * 1000
  },

  reporter: 'html',

  // To make custom allure report first convert the repor in a line report then feed that to allure 
  // step 1 # npx playwright test --config playwright.customconfig.js --grep '@Sanity' --project chrome --reporter='line,allure-playwright'
  // step 2 # Then run the command npx allure generate ./allure-results --clean
  // step3 # open the report npx allure open ./allure-report


  // Projects can be used to run the tests iin multiple config. to run the project on 
  // a specific project config we need to define the project name
  //  
  // ex: : npx playwright test tests/ClientAppEndToEndPOWithFixture.spec.js 
  // --config playwright.customconfig.js --project chrome
  // 
  // **** If no Project option is given then it will run on all the projects 


  projects: [{
    name: 'webkit',
    use: {
      browserName: 'webkit',
      headless: true,
      screenshot: 'off',
      trace: 'off', //trace:'retain-on-failure'
    }
  },
  {
    name: 'chrome',
    use: {
      browserName: 'chromium',
      headless: true,
      screenshot: 'on',
      trace: 'on', //trace:'retain-on-failure'
    }
  },
    {
    name: 'chrome with custom browser size',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'off',
      trace: 'on', //trace:'retain-on-failure'
      viewport:{width:500, height:500} //Browser width and height 
    }
  },
  {
    name: 'Device',
    use: {
      browserName: 'webkit',
      headless: false,
      screenshot: 'off',
      trace: 'off', //trace:'retain-on-failure'
      ...devices['iPhone 15 Pro Max landscape'] // You can choose from avilable mobile device dimention 
    }
  },
    {
    name: 'Browser Permissions',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'off',
      permissions:['geolocation'], // to enable geo location 
      ignoreHTTPSErrors:true, // to handle ssl error
      trace: 'off', //trace:'retain-on-failure'
      // video:'retain-on-failure' // to get the vodeo of the execeution only failure 
      
  }
}
]

//Run the test from scrits in package.json
/* npm run Sanity */

  // This is to select which browser we will run our test againsts . 
  // use:{
  //   browserName:'webkit',
  //   headless:true,
  //   screenshot:'on',
  //   trace:'on',
  //   // trace:'retain-on-failure'
  // },

  // TO RUN on Custom Configuration we need to specifically tell playwright to use this config file 
  // else it will run on default configuration 
  // ex: : npx playwright test tests/ClientAppEndToEndPOWithFixture.spec.js --config playwright.customconfig.js








  // /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Base URL to use in actions like `await page.goto('/')`. */
  //   // baseURL: 'http://127.0.0.1:3000',

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry',
  // },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title application', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Fullstack-Users');
  });

  it('should display create new user button', async () => {
    page.navigateTo();
    expect(await page.getNewUserButton().isDisplayed()).toEqual(true);
  });

  it('should display create new user modal', async () => {
    page.navigateTo();
    await page.getNewUserButton().click();
    expect(await page.getNewUserModal().isDisplayed()).toEqual(true);
  });

  it('should create new user', async () => {
    page.navigateTo();
    await page.getNewUserButton().click();
    await page.getNewUserModalInput('email').sendKeys('john.doe@test.com');
    await page.getNewUserModalInput('firstname').sendKeys('John');
    await page.getNewUserModalInput('lastname').sendKeys('Doe');
    await page.getNewUserModalInput('password').sendKeys('Test123456!');
    await page.getNewUserModalSaveButton().click();
    expect(await page.getSnackbarText()).toEqual('User John Doe successfully created');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

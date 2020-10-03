import { browser, by, element, ElementFinder, WebElementPromise } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root mat-toolbar span')).getText() as Promise<string>;
  }

  getNewUserButton(): ElementFinder {
    return element(by.css('app-root mat-toolbar button'));
  }

  getNewUserModal(): ElementFinder {
    return element(by.css('app-user-create-modal'));
  }

  getNewUserModalInput(inputName: string): ElementFinder {
    return element(by.css(`app-user-create-modal input[name="${inputName}"]`));
  }

  getNewUserModalSaveButton(): ElementFinder {
    return element(by.css('app-user-create-modal button[color="primary"]'));
  }

  getSnackbarText(): Promise<string> {
    return element(by.css('simple-snack-bar')).getText() as Promise<string>;
  }
}

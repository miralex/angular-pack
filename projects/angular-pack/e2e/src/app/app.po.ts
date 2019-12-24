import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAllMenus() {
    return element
      .all(by.css('mat-toolbar button.nav-button'))
      .map(elm => elm.getText());
  }
}

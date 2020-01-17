import { browser, By, element } from 'protractor';

export class TodosPage {
  navigateTo() {
    return browser.get('/examples/todos');
  }

  getInput() {
    return element(By.name('todos'));
  }

  getAddTodoButton() {
    return element(By.css('.btn-add'));
  }

  getResults() {
    return element.all(By.css('mat-card.todo'));
  }
}

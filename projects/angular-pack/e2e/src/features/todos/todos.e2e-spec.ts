import { TodosPage } from './todos.po';

describe('Todos Page', () => {
  let page: TodosPage;

  beforeEach(() => (page = new TodosPage()));

  it('adds todo', () => {
    page.navigateTo();
    page.getInput().sendKeys('Run e2e tests!');
    page.getAddTodoButton().click();

    expect(page.getResults().count()).toBe(4);
    expect(
      page
        .getResults()
        .get(0)
        .getText()
        .then(text => text.trim())
    ).toBe('Run e2e tests!');
  });
});

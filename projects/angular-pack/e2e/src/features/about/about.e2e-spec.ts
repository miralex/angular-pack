import { AboutPage } from './about.po';

describe('About Page', () => {
  let page: AboutPage;

  beforeEach(() => (page = new AboutPage()));

  it('should display main heading', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ANGULAR PACK');
  });
});

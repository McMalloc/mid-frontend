import { MidFrontendPage } from './app.po';

describe('mid-frontend App', () => {
  let page: MidFrontendPage;

  beforeEach(() => {
    page = new MidFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

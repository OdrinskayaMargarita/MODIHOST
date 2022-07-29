import homePage from './pages/home-page';
import registerPage from './pages/register-page';
import contactPage from './pages/contact-page';
import articlePage from './pages/article-page';

export default function() {
  const pageName = document.body.getAttribute('data-page-name');
  if (!pageName) return;

  const pageList = {
    homePage,
    registerPage,
    contactPage,
    articlePage,
  };

  if (pageName && pageList[pageName]) pageList[pageName]();
}

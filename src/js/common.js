import Header from './components/Header';

export default () => {
  let header = new Header();

  let preloader = document.querySelector('.preloader');
  preloader.style.opacity = 0;
  setTimeout(() => {
      preloader.style.display = 'none';
  }, 300);
}

import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './../helpers/scroll-to';

import Parallax from 'parallax-js/dist/parallax.min';

export default () => {
  let moveTo = new scrollTo();

  let anchorsLeft;
  toggleAnchorsMenuScrollEvent();
  window.addEventListener('resize', toggleAnchorsMenuScrollEvent);

  function toggleAnchorsMenuScrollEvent() {
    if (document.documentElement.clientWidth >= 768) {
      anchorsLeft = document.querySelector('.article__container').offsetLeft + parseFloat(getComputedStyle(document.querySelector('.article__container')).paddingLeft);
      window.addEventListener('scroll', handleAnchorsMenu)
    } else {
      window.removeEventListener('scroll', handleAnchorsMenu)
      document.querySelector('.article__anchors').style.position = '';
    }
  }

  function handleAnchorsMenu() {
    let article = document.querySelector('.article__content');
    let top = article.getBoundingClientRect().top;
    let bottom = article.getBoundingClientRect().bottom;
    let anchors = document.querySelector('.article__anchors');

    // fixed anchors menu
    if (top <= 40) {
      anchors.style.position = 'fixed';
      anchors.style.top = '40px';
      anchors.style.left = anchorsLeft + 'px';
      anchors.classList.remove('to-bottom');
    } else {
      anchors.style.position = '';
      anchors.style.top = '';
      anchors.style.left = '';
      anchors.classList.remove('to-bottom');
    }

    if (bottom <= document.querySelector('.article__anchors').getBoundingClientRect().bottom) {
      anchors.style.position = '';
      anchors.style.top = '';
      anchors.style.left = '';
      anchors.classList.add('to-bottom');
    }

    // toggle active anchor
    let anchorsList = [];
    anchors.querySelectorAll('[data-scroll-to]').forEach(item => {
      anchorsList.push(item.getAttribute('data-scroll-to').slice(1))
    })
    anchorsList.forEach(item => {
      if (document.getElementById(item).getBoundingClientRect().top <= 40) {
        anchors.querySelector('[data-scroll-to].is-active').classList.remove('is-active')
        anchors.querySelector(`[data-scroll-to="#${item}"]`).classList.add('is-active')
      }
    })
  }

  window.addEventListener('resize', () => {
    anchorsLeft = document.querySelector('.article__container').offsetLeft + parseFloat(getComputedStyle(document.querySelector('.article__container')).paddingLeft);
    if (getComputedStyle(document.querySelector('.article__anchors')).position == 'fixed') {
      document.querySelector('.article__anchors').style.left = anchorsLeft + 'px';
    }
  })

  const articleBgContainer = document.querySelector(".article-bg__wrapper");
  let articleParallaxBg;
  let isParallaxBg = false;

  function initParallax() {
    let windowWidth = document.documentElement.clientWidth;

    if ( windowWidth > 1024 ) {
      isParallaxBg = true;
      articleBgContainer.style.height = document.querySelector(".article__container").clientHeight + 'px';
      articleParallaxBg = new Parallax(articleBgContainer, {
          selector: ".article__parallax",
      });
    } else {
      if (isParallaxBg) {
        isParallaxBg = false;
        articleParallaxBg.destroy();
      }
    }
  }

  initParallax();
  window.addEventListener('resize', () => {
    initParallax();
  });
}

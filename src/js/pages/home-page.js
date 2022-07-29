import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
// import TimelineLite from 'gsap';
import throttle from 'lodash/throttle';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import scrollTo from './../helpers/scroll-to';
// import LazyImages from './helpers/Lazy-images';

import styleSelect from '../libs/style-select';
import Swiper from './../imports/import-swiper';
import Parallax from 'parallax-js/dist/parallax.min';
import Form from './../components/Form';
import initDollar from './../components/initDollar';
import axios from 'axios';
import {CountUp} from 'countup.js';

export default () => {

    initDollar()
    const moveTo = new scrollTo();

    document.querySelectorAll('.select-menu').forEach(item => {
        styleSelect(item);
    })



    //-- Intro Section

    function setIntroHeight() {
        const windowHeight = document.documentElement.clientHeight;
        const introContainer = document.querySelector('.intro__container');
        introContainer.style.height = "";
        const defaultIntroHeight = introContainer.clientHeight + 60;

        if (windowHeight > defaultIntroHeight) {
            introContainer.style.height = windowHeight + 'px';
        } else {
            introContainer.style.height = defaultIntroHeight + 'px';
        }
    }

    setIntroHeight();

    document.querySelector(".intro__title h1").classList.add('is-visible');
    document.querySelectorAll(".intro__title ul li").forEach((item, index) => {
        item.classList.add('is-moved-in');
    });
    document.querySelector(".intro__title__img-link").classList.add('is-visible');
    document.querySelector(".header").classList.add('is-moved-in');
    document.querySelector(".intro__extra").classList.add('is-moved-in');

    document.querySelector('.intro__play-video').addEventListener('click', () => {
        document.querySelector('.modal__wrapper').classList.remove('is-hidden');
        document.querySelector('.modal__video').src += "?autoplay=1";
    })

    document.querySelector('.modal__close').addEventListener('click', () => {
        document.querySelector('.modal__wrapper').classList.add('is-hidden');
        const videoSrc = document.querySelector('.modal__video').src;
        const autoplaySubstr = videoSrc.indexOf("?autoplay=1");
        document.querySelector('.modal__video').src = videoSrc.slice(0, autoplaySubstr);
    })

    //-- Counters Section

    //-- Problems Section

    const problemsImgCarousel = new Swiper('.problems__images', {
        speed: 600,
        effect: "fade",
    });

    const problemsDescriptionCarousel = new Swiper('.problems__description', {
        speed: 600,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.problems__navigation .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.problems__navigation .swiper-button-next',
            prevEl: '.problems__navigation .swiper-button-prev',
        },
        controller: {
            control: problemsImgCarousel,
        },
    });

    problemsDescriptionCarousel.on('slideChange', () => {
        if (!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            const currentIndex = problemsDescriptionCarousel.activeIndex;
            const prevIndex = problemsDescriptionCarousel.previousIndex;
            const wrapper = document.querySelector('.problems__description');
            const currentSlideItems = wrapper.querySelectorAll('.swiper-slide')[currentIndex].querySelectorAll('.problems__item');
            const prevSlideItems = wrapper.querySelectorAll('.swiper-slide')[prevIndex].querySelectorAll('.problems__item');

            if (currentIndex > prevIndex) {
                prevSlideItems.forEach(prevSlide => {
                    TweenLite.fromTo(prevSlide, 0.4, {
                        transform: 'translateX(0)',
                        opacity: '1'
                    }, {transform: 'translateX(100px)', opacity: '0'});
                })
                currentSlideItems.forEach((currentSlide, slideIndex) => {
                    let delay = slideIndex * 0.3;
                    TweenLite.fromTo(currentSlide, 0.4, {
                        transform: 'translateX(-100px)',
                        opacity: '0'
                    }, {transform: 'translateX(0)', opacity: '1', delay: delay});
                })
            } else {
                prevSlideItems.forEach(prevSlide => {
                    TweenLite.fromTo(prevSlide, 0.4, {
                        transform: 'translateX(0)',
                        opacity: '1'
                    }, {transform: 'translateX(-100px)', opacity: '0'});
                })
                currentSlideItems.forEach((currentSlide, slideIndex) => {
                    let delay = slideIndex * 0.3;
                    TweenLite.fromTo(currentSlide, 0.4, {
                        transform: 'translateX(100px)',
                        opacity: '0'
                    }, {transform: 'translateX(0)', opacity: '1', delay: delay});
                })
            }
        }
    })

    problemsDescriptionCarousel.on('slideChange', () => {
        if (problemsDescriptionCarousel.isEnd) {
            document.querySelector('.problems__navigation .swiper-button-next').classList.remove("main-moving-btn");
            document.querySelector('.problems__navigation .swiper-button-prev').classList.add("main-moving-btn");
        } else {
            document.querySelector('.problems__navigation .swiper-button-prev').classList.remove("main-moving-btn");
            document.querySelector('.problems__navigation .swiper-button-next').classList.add("main-moving-btn");
        }
    });

    //-- Solutions Section

    //-- How It Works Section

    const howItWorksCarousel = new Swiper('.how-it-works__cards', {
        slidesPerView: 3,
        spaceBetween: 10,
        speed: 600,
        pagination: {
            el: '.how-it-works__cards .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.how-it-works__cards .swiper-button-next',
            prevEl: '.how-it-works__cards .swiper-button-prev',
        },
        allowTouchMove: false,
        breakpoints: {
            1023: {
                spaceBetween: 20
            },
            639: {
                slidesPerView: 1,
                spaceBetween: 10,
                allowTouchMove: true,
            }
        }
    });

    howItWorksCarousel.on('slideChange', () => {
        if (howItWorksCarousel.isEnd) {
            document.querySelector('.how-it-works__cards .swiper-button-next').classList.remove("main-moving-btn");
            document.querySelector('.how-it-works__cards .swiper-button-prev').classList.add("main-moving-btn");
        } else {
            document.querySelector('.how-it-works__cards .swiper-button-prev').classList.remove("main-moving-btn");
            document.querySelector('.how-it-works__cards .swiper-button-next').classList.add("main-moving-btn");
        }
    });

    //-- Whitepaper Section

    //-- Opportunity Section

    const opportunityCarouselPhotos = new Swiper('.opportunity__images', {
        speed: 600,
        effect: "fade",
    });
    const opportunityCarouselText = new Swiper('.opportunity__descriptions', {
        speed: 600,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.opportunity__descriptions .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.opportunity__descriptions .swiper-button-next',
            prevEl: '.opportunity__descriptions .swiper-button-prev',
        },
        controller: {
            control: opportunityCarouselPhotos,
        },
    });

    opportunityCarouselText.on('slideChange', () => {
        const currentIndex = opportunityCarouselText.activeIndex;
        const prevIndex = opportunityCarouselText.previousIndex;
        const wrapper = document.querySelector('.opportunity__descriptions');
        const currentSlide = wrapper.querySelectorAll('.swiper-slide')[currentIndex].querySelector('.opportunity__text');
        const prevSlide = wrapper.querySelectorAll('.swiper-slide')[prevIndex].querySelector('.opportunity__text');

        if (currentIndex > prevIndex && !/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            TweenLite.fromTo(prevSlide, 0.4, {
                transform: 'translateX(0)',
                opacity: '1'
            }, {transform: 'translateX(100px)', opacity: '0'});
            TweenLite.fromTo(currentSlide, 0.4, {
                transform: 'translateX(-100px)',
                opacity: '0'
            }, {transform: 'translateX(0)', opacity: '1'});
        } else {
            TweenLite.fromTo(prevSlide, 0.4, {
                transform: 'translateX(0)',
                opacity: '1'
            }, {transform: 'translateX(-100px)', opacity: '0'});
            TweenLite.fromTo(currentSlide, 0.4, {
                transform: 'translateX(100px)',
                opacity: '0'
            }, {transform: 'translateX(0)', opacity: '1'});
        }
    })

    opportunityCarouselText.on('slideChange', () => {
        if (opportunityCarouselText.isEnd) {
            document.querySelector('.opportunity__descriptions .swiper-button-next').classList.remove("main-moving-btn");
            document.querySelector('.opportunity__descriptions .swiper-button-prev').classList.add("main-moving-btn");
        } else {
            document.querySelector('.opportunity__descriptions .swiper-button-prev').classList.remove("main-moving-btn");
            document.querySelector('.opportunity__descriptions .swiper-button-next').classList.add("main-moving-btn");
        }
    });

    //-- Video Section

    document.querySelectorAll('.video__cover').forEach(item => {
        item.addEventListener('click', () => {
            const wrapper = item.closest('.video__container');
            item.classList.add('video__cover--hidden');
            wrapper.querySelector('.video__player').src += "?autoplay=1";
        });
    });

    //-- Tokensale Section

    if (document.querySelector('[data-open-form]')) {
        document.querySelector('[data-open-form]').addEventListener('click', () => {
            const modalWrapper = document.querySelector('[data-tokensale-form]');
            modalWrapper.classList.remove('is-hidden');
            setTimeout(() => {
                modalWrapper.querySelector('.tokensale-form__container').classList.add('is-visible');
            }, 10)
            if (document.documentElement.clientWidth < 1024) {
                document.querySelector('.tokensale__wrapper').style.zIndex = 500;
                document.querySelector('body').style.overflow = 'hidden';
            }
        });

        document.querySelector('[data-form-close]').addEventListener('click', () => {
            document.querySelector('.tokensale-form__container').classList.remove('is-visible');
            setTimeout(() => {
                document.querySelector('[data-tokensale-form]').classList.add('is-hidden');
                document.getElementById('tokensale-form').classList.remove('success');
                document.getElementById('tokensale-form').classList.remove('error');
                document.querySelector('.tokensale__wrapper').style.zIndex = '';
                document.querySelector('body').style.overflow = '';
            }, 300);
        });

        document.addEventListener('click', event => {
            if (!event.target.closest('[data-open-form]') && !event.target.closest('.tokensale-form__container')) {
                const openModalWrapper = document.querySelector('[data-tokensale-form]:not(.is-hidden)');
                if (openModalWrapper) {
                    const openModalVisible = openModalWrapper.querySelector('.tokensale-form__container');
                    openModalVisible.classList.remove('is-visible');
                    setTimeout(() => {
                        openModalWrapper.classList.add('is-hidden');
                        document.getElementById('tokensale-form').classList.remove('success');
                        document.getElementById('tokensale-form').classList.remove('error');
                    }, 300)
                }
            }
        })

        const tokensaleForm = new Form({
            $form: document.getElementById('tokensale-form'),
        });

        tokensaleForm.init();
    }

    //-- Token Numbers Section

    document.querySelectorAll('[data-chart-section]').forEach(item => {
        item.addEventListener('mouseover', () => {
            const id = item.getAttribute('data-chart-section');
            if (id == 'default') {
                return;
            }
            const data = document.querySelector(`[data-chart-data="${id}"]`);
            const tooltip = document.querySelector('#token-distribution-tooltips');

            document.querySelector('[data-chart-section="default"]').classList.remove('is-active');
            item.classList.add('is-active');
            tooltip.querySelector('h5').innerHTML = data.querySelector('.number').innerHTML;
            tooltip.querySelector('span').innerHTML = data.querySelector('span:not(.number)').innerHTML;
        })
    })

    document.querySelectorAll('[data-chart-section]').forEach(item => {
        item.addEventListener('mouseout', () => {
            const id = item.getAttribute('data-chart-section');
            if (id == 'default') {
                return;
            }
            const data = document.querySelector(`[data-chart-data="default"]`);
            const tooltip = document.querySelector('#token-distribution-tooltips');

            item.classList.remove('is-active');
            document.querySelector('[data-chart-section="default"]').classList.add('is-active');
            tooltip.querySelector('h5').innerHTML = data.querySelector('.number').innerHTML;
            tooltip.querySelector('span').innerHTML = data.querySelector('span:not(.number)').innerHTML;
        })
    })

    //-- Github Section

    //-- Roadmap Section

    document.querySelectorAll('[data-load-image]').forEach(item => {
        const url = item.getAttribute('data-load-image');
        axios.get(url)
            .then(response => {
                item.insertAdjacentHTML("beforeend", response.data)
            })
    })

    const roadmapCarousel = new Swiper('.roadmap__carousel', {
        speed: 600,
        pagination: {
            el: '.roadmap__navigation .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.roadmap__navigation .swiper-button-next',
            prevEl: '.roadmap__navigation .swiper-button-prev',
        }
    })

    roadmapCarousel.on('slideChange', () => {
        if (roadmapCarousel.isEnd) {
            document.querySelector('.roadmap__navigation .swiper-button-next').classList.remove("main-moving-btn");
            document.querySelector('.roadmap__navigation .swiper-button-prev').classList.add("main-moving-btn");
        } else {
            document.querySelector('.roadmap__navigation .swiper-button-prev').classList.remove("main-moving-btn");
            document.querySelector('.roadmap__navigation .swiper-button-next').classList.add("main-moving-btn");
        }
        document.querySelector('.select-slide__button').innerHTML = document.querySelectorAll('.select-slide__dropdown li')[roadmapCarousel.activeIndex].innerHTML;
    });

    document.querySelector('.select-slide__button').addEventListener('click', () => {
        const isInvisible = getComputedStyle(document.querySelector('.select-slide__dropdown')).display == 'none';
        if (isInvisible) {
            document.querySelector('.select-slide__dropdown').style.display = 'block';
            document.querySelector('.select-slide__button').classList.add('is-opened');
        } else {
            document.querySelector('.select-slide__dropdown').style.display = 'none';
            document.querySelector('.select-slide__button').classList.remove('is-opened');
        }
    })

    document.querySelectorAll('.select-slide__dropdown li').forEach((item, index) => {
        item.addEventListener('click', () => {
            document.querySelector('.select-slide__button').innerHTML = item.innerHTML;
            document.querySelector('.select-slide__dropdown').style.display = 'none';
            document.querySelector('.select-slide__button').classList.remove('is-opened');
            roadmapCarousel.slideTo(index)
        })
    })

    //-- Penetration Section

    const penetrationYearsLineCarousel = new Swiper('.map-toggle-line__carousel', {
        freeMode: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        breakpoints: {
            767: {
                centeredSlides: false,
            }
        }
    });

    const mapYearBtns = document.querySelectorAll('.map-toggle-line__button');
    const mapYearNumbers = document.querySelectorAll('.map-numbers__list');
    const mapYearMarkers = document.querySelectorAll('.map-graphic__year-points');
    mapYearBtns.forEach((item, index) => {
        const wrapper = item.closest('.map-toggle-line__item');
        item.addEventListener('click', () => {
            document.querySelectorAll('.map-toggle-line__item').forEach(item => {
                item.classList.remove('map-toggle-line__item--active');
            });
            wrapper.classList.add('map-toggle-line__item--active');

            mapYearNumbers.forEach(item => {
                item.classList.add('is-hidden');
            });
            mapYearNumbers[index].classList.remove('is-hidden');
            mapYearNumbers[index].querySelectorAll('.map-numbers__number').forEach(item => {
                const countUp = new CountUp(item, item.getAttribute('data-number'), {
                    separator: ' ',
                    duration: 1,
                    useEasing: false,
                })
                countUp.start()
            })

            mapYearMarkers.forEach(item => {
                item.classList.remove('map-graphic__year-points--active');
            });
            mapYearMarkers[index].classList.add('map-graphic__year-points--active');
        });
    });

    //-- Subscribe Section

    const subscribeForm = new Form({
        $form: document.getElementById('subscribe-form'),
        resetSuccess: true
    });

    subscribeForm.init();

    //-- Team Section

    document.querySelectorAll('[data-open-bio]').forEach(item => {
        item.addEventListener('click', () => {
            const modalWrapper = document.querySelector(`[data-bio-modal=${item.getAttribute('data-open-bio')}]`);
            modalWrapper.classList.remove('is-hidden');
            setTimeout(() => {
                modalWrapper.querySelector('.advisor-info__container').classList.add('is-visible')
            }, 10)
            if (document.documentElement.clientWidth < 768) {
                item.closest('.team__wrapper').style.zIndex = 500;
                document.querySelector('body').style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('[data-bio-close]').forEach(item => {
        item.addEventListener('click', () => {
            item.closest('.advisor-info__container').classList.remove('is-visible');
            setTimeout(() => {
                item.closest('[data-bio-modal]').classList.add('is-hidden');
                item.closest('.team__wrapper').style.zIndex = '';
                document.querySelector('body').style.overflow = '';
            }, 300);
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('[data-open-bio]') && !event.target.closest('.advisor-info__container')) {
            const openModalWrapper = document.querySelector('[data-bio-modal]:not(.is-hidden)');
            if (openModalWrapper) {
                openModalWrapper.querySelector('.advisor-info__container').classList.remove('is-visible');
                setTimeout(() => {
                    openModalWrapper.classList.add('is-hidden');
                }, 300)
            }
        }
    })

    //-- Partners Section

    //-- Media Section

    const mediaLogosCarousel = new Swiper('.media__logos', {
        speed: 600,
        spaceBetween: 12,
        slidesPerView: 4,
        slidesPerColumnFill: 'row',
        slidesPerColumn: 3,
        pagination: {
            el: '.media__logos .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.media__logos .swiper-button-next',
            prevEl: '.media__logos .swiper-button-prev',
        },
        allowTouchMove: false,
        breakpoints: {
            1023: {
                slidesPerView: 3,
                slidesPerColumn: 3,
                allowTouchMove: true,
            },
            639: {
                slidesPerView: 2,
                slidesPerColumn: 4,
                allowTouchMove: true,
            }
        }
    });

    mediaLogosCarousel.on('slideChange', () => {
        if (mediaLogosCarousel.isEnd) {
            document.querySelector('.media__logos .swiper-button-next').classList.remove("main-moving-btn");
            document.querySelector('.media__logos .swiper-button-prev').classList.add("main-moving-btn");
        } else {
            document.querySelector('.media__logos .swiper-button-prev').classList.remove("main-moving-btn");
            document.querySelector('.media__logos .swiper-button-next').classList.add("main-moving-btn");
        }
    });

    //-- Full Page Parallax Elements

    const numbersBgContainer = document.querySelector(".numbers-bg__wrapper");
    const solutionsBgContainers = document.querySelectorAll(".solutions__text-decoration");
    const solutionsBgOuterContainer = document.querySelector(".solutions__item-decoration");
    // const downloadAppBgContainer = document.querySelector(".download-app-bg__wrapper");
    const whitepaperBgContainer = document.querySelector(".whitepaper-bg__wrapper");
    const opportunityBgContainer = document.querySelector(".opportunity-bg__wrapper");
    const tokensaleBgContainer = document.querySelector(".tokensale-bg__wrapper");
    const onePagerBgContainer = document.querySelector(".one-pager__decoration");
    // const video2BgContainer = document.querySelector(".video-bg__wrapper");
    const subscribeBgContainer = document.querySelector(".subscribe-bg__wrapper");
    const teamContainer = document.querySelectorAll(".team__wrapper");
    const partnersBgContainer = document.querySelector(".partners-bg__wrapper");
    const mediaBgContainer = document.querySelector(".media-bg__wrapper");
    let numbersParallaxBg;
    let solutionsParallaxBg = [];
    let solutionsOuterParallaxBg;
    // let downloadAppParallaxBg;
    let whitepaperParallaxBg;
    let opportunityParallaxBg;
    let tokensaleParallaxBg;
    let onePagerParallaxBg;
    // let video2ParallaxBg;
    let subscribeParallaxBg;
    let teamParallaxBg;
    let advisorsParallaxBg;
    let developersParallaxBg;
    let partnersParallaxBg;
    let mediaParallaxBg;
    let isParallaxBg = false;

    function initParallax() {
        let windowWidth = document.documentElement.clientWidth;

        if (windowWidth > 1024) {
            isParallaxBg = true;

            numbersBgContainer.style.height = document.querySelector(".numbers__container").clientHeight + 'px';
            numbersParallaxBg = new Parallax(numbersBgContainer, {
                selector: ".numbers__parallax",
                hoverOnly: true
            });

            solutionsBgContainers.forEach(item => {
                item.style.height = item.nextElementSibling.clientHeight + 'px';
                solutionsParallaxBg.push(new Parallax(item, {
                    selector: ".solutions__bg-elem-parallax",
                    hoverOnly: true
                }));
            });
            solutionsBgOuterContainer.style.height = solutionsBgOuterContainer.nextElementSibling.clientHeight + 'px';
            solutionsOuterParallaxBg = new Parallax(solutionsBgOuterContainer, {
                selector: ".solutions__bg-elem-parallax",
                hoverOnly: true
            });

            // downloadAppBgContainer.style.height = document.querySelector(".download-app__container").clientHeight + 'px';
            // downloadAppParallaxBg = new Parallax(downloadAppBgContainer, {
            //     selector: ".download-app__parallax",
            // });

            whitepaperBgContainer.style.height = document.querySelector(".whitepaper__container").clientHeight + 'px';
            whitepaperParallaxBg = new Parallax(whitepaperBgContainer, {
                selector: ".whitepaper__parallax",
                hoverOnly: true
            });

            opportunityBgContainer.style.height = document.querySelector(".opportunity__container").clientHeight + 'px';
            opportunityParallaxBg = new Parallax(opportunityBgContainer, {
                selector: ".opportunity__parallax",
                hoverOnly: true
            });

            tokensaleBgContainer.style.height = document.querySelector(".tokensale__container").clientHeight + 'px';
            tokensaleParallaxBg = new Parallax(tokensaleBgContainer, {
                selector: ".tokensale__parallax",
                hoverOnly: true
            });

            // onePagerBgContainer.style.height = document.querySelector(".one-pager__content").clientHeight + 'px';
            // onePagerParallaxBg = new Parallax(onePagerBgContainer, {
            //     selector: ".one-pager__decoration-parallax",
            //     hoverOnly: true
            // });

            // video2BgContainer.style.height = document.querySelector(".video__container--decorated").clientHeight + 'px';
            // video2ParallaxBg = new Parallax(video2BgContainer, {
            //     selector: ".video__parallax",
            // hoverOnly: true
            // });

            subscribeBgContainer.style.height = document.querySelector(".subscribe__container").clientHeight + 'px';
            subscribeParallaxBg = new Parallax(subscribeBgContainer, {
                selector: ".subscribe__parallax",
                hoverOnly: true
            });

            teamContainer.forEach(item => {
                let bgContainer = item.querySelector(".team-bg__wrapper");
                bgContainer.style.height = item.querySelector(".team__container").clientHeight + 'px';
            });
            teamParallaxBg = new Parallax(document.querySelector(".team-bg__wrapper--team"), {
                selector: ".team__parallax",
                hoverOnly: true
            });
            advisorsParallaxBg = new Parallax(document.querySelector(".team-bg__wrapper--advisors"), {
                selector: ".team__parallax",
                hoverOnly: true
            });
            developersParallaxBg = new Parallax(document.querySelector(".team-bg__wrapper--developers"), {
                selector: ".team__parallax",
                hoverOnly: true
            });

            partnersBgContainer.style.height = document.querySelector(".partners__container").clientHeight + 'px';
            partnersParallaxBg = new Parallax(partnersBgContainer, {
                selector: ".partners__parallax",
                hoverOnly: true
            });

            mediaBgContainer.style.height = document.querySelector(".media__container").clientHeight + 'px';
            mediaParallaxBg = new Parallax(mediaBgContainer, {
                selector: ".media__parallax",
                hoverOnly: true
            });
        } else {
            if (isParallaxBg) {
                numbersParallaxBg.destroy();
                solutionsParallaxBg.forEach(item => {
                    item.destroy();
                });
                solutionsOuterParallaxBg.destroy();
                opportunityParallaxBg.destroy();
                subscribeParallaxBg.destroy();
                // downloadAppParallaxBg.destroy();
                whitepaperParallaxBg.destroy();
                tokensaleParallaxBg.destroy();
                onePagerParallaxBg.destroy();
                // video2ParallaxBg.destroy();
                teamParallaxBg.destroy();
                developersParallaxBg.destroy();
                advisorsParallaxBg.destroy();
                partnersParallaxBg.destroy();
                mediaParallaxBg.destroy();
                isParallaxBg = false;
            }
        }
    }

    initParallax();

    //-- Full Page Scroll Animations

    let numberCounterAnimationComplete = false;
    let penetrationCountersAnimationComplete = false;

    if (!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        window.addEventListener('scroll', throttle(scrollEvents, 100));
    }

    let windowHeight = document.documentElement.clientHeight;
    let windowHeightFiveSixth = windowHeight * 5 / 6;
    let windowHeightThreeQuarters = windowHeight * 3 / 4;

    function scrollEvents() {

        document.querySelectorAll('.title-section__title').forEach(item => {
            const wrapperTop = item.closest('.container').getBoundingClientRect().top;
            if (wrapperTop <= windowHeightFiveSixth) {
                item.classList.add('is-visible')
            }
        })

        document.querySelectorAll('.title-section__uppertitle span').forEach(item => {
            const wrapperTop = item.closest('.container').getBoundingClientRect().top;
            if (wrapperTop <= windowHeightFiveSixth) {
                item.classList.add('is-visible')
            }
        })

        //-- Numbers Section

        const numbersTop = document.querySelector('.numbers__wrapper').getBoundingClientRect().top;
        if (numbersTop < windowHeightThreeQuarters && !numberCounterAnimationComplete) {
            document.querySelectorAll('.number__counter').forEach(item => {
                const countUp = new CountUp(item, parseFloat(item.getAttribute('data-number')), {
                    decimalPlaces: item.getAttribute('data-decimal') || 0,
                    prefix: item.getAttribute('data-prefix') || '',
                    suffix: item.getAttribute('data-suffix') || '',
                    useEasing: false,
                    duration: 1
                })
                countUp.start()
            })

            numberCounterAnimationComplete = true;
        }

        //-- Video 1 Section

        const videoOne = document.querySelector('.video__wrapper--first');
        const videoOneTop = videoOne.getBoundingClientRect().top;
        if (videoOneTop <= windowHeightFiveSixth) {
            videoOne.querySelector('.video__cover-title').classList.add('is-visible');
            videoOne.querySelector('.video__play-btn').classList.add('is-visible');
        }

        //-- Problems Section

        const problemsTop = document.querySelector('.problems__wrapper').getBoundingClientRect().top;
        const problemsBottom = document.querySelector('.problems__wrapper').getBoundingClientRect().bottom;
        if (problemsTop < windowHeightFiveSixth) {
            document.querySelector('.problems-anim-bg__fill').classList.add('is-moved');
            document.querySelector('.problems-anim-bg__edge-1').classList.add('is-moved');
            document.querySelector('.problems-anim-bg__edge-3').classList.add('is-moved');
            document.querySelector('.problems-anim-bg__edge-4').classList.add('is-moved');
        }
        if (problemsBottom < windowHeightFiveSixth) {
            document.querySelector('.problems-anim-bg__edge-5').classList.add('is-moved');
            document.querySelector('.problems-anim-bg__edge-6').classList.add('is-moved');
            document.querySelector('.problems-anim-bg__edge-7').classList.add('is-moved');
        }

        const problemsCarouselBottom = document.querySelector('.problems__carousel').getBoundingClientRect().bottom;
        if (problemsCarouselBottom <= windowHeight) {
            document.querySelector('.problems__list').querySelectorAll('.problems__item').forEach((item, index) => {
                const delay = index * 0.3;
                TweenLite.to(item, 0.4, {transform: 'translateX(0)', opacity: '1', delay: delay});
                // item.classList.add('is-moved-in');
                // setTimeout(() => {
                //   item.classList.remove('is-moved-in');
                //   item.classList.add('is-visible');
                // },delay)
            })

        }

        //-- Solutions Section

        document.querySelectorAll('.solutions__img, .github__img').forEach(item => {
            const itemBottom = item.getBoundingClientRect().bottom;
            if (itemBottom <= windowHeight) {
                item.classList.add('is-visible')
            }
        })

        //-- Variants Section

        //-- How It Works Section

        const howItWorksTop = document.querySelector('.how-it-works__wrapper').getBoundingClientRect().top;
        const howItWorksBottom = document.querySelector('.how-it-works__wrapper').getBoundingClientRect().bottom;
        if (howItWorksTop < windowHeightFiveSixth) {
            document.querySelector('.how-it-works-anim-bg__fill').classList.add('is-moved');
            document.querySelector('.how-it-works-anim-bg__edge-1').classList.add('is-moved');
            document.querySelector('.how-it-works-anim-bg__edge-3').classList.add('is-moved');
            document.querySelector('.how-it-works-anim-bg__edge-5').classList.add('is-moved');
        }
        if (howItWorksBottom < windowHeightFiveSixth) {
            document.querySelector('.how-it-works-anim-bg__edge-6').classList.add('is-moved');
            document.querySelector('.how-it-works-anim-bg__edge-7').classList.add('is-moved');
        }

        //-- Whitepaper Section

        //-- Opportunity Section

        const opportunityCarouselBottom = document.querySelector('.opportunity__carousel').getBoundingClientRect().bottom;
        if (opportunityCarouselBottom <= windowHeight) {
            document.querySelector('.opportunity__photo').classList.add('is-visible');
            TweenLite.to('.opportunity__text', 0.4, {transform: 'translateX(0)', opacity: '1', delay: 0.4});
        }

        //-- Video 1 Section

        const videoTwo = document.querySelector('.video__wrapper--second');
        const videoTwoTop = videoTwo.getBoundingClientRect().top;
        if (videoOneTop <= windowHeightFiveSixth) {
            videoTwo.querySelector('.video__cover-title').classList.add('is-visible');
            videoTwo.querySelector('.video__play-btn').classList.add('is-visible');
        }

        //-- Tokensale Section

        const tokensaleTop = document.querySelector('.tokensale__wrapper').getBoundingClientRect().top;
        const tokensaleBottom = document.querySelector('.tokensale__wrapper').getBoundingClientRect().bottom;
        if (tokensaleTop < windowHeightFiveSixth) {
            document.querySelector('.tokensale-anim-bg__fill').classList.add('is-moved');
            document.querySelector('.tokensale-anim-bg__edge-6').classList.add('is-moved');
            document.querySelector('.tokensale-anim-bg__edge-8').classList.add('is-moved');
        }
        if (tokensaleBottom < windowHeightFiveSixth) {
            document.querySelector('.tokensale-anim-bg__edge-1').classList.add('is-moved');
            document.querySelector('.tokensale-anim-bg__edge-3').classList.add('is-moved');
        }

        //-- Token Numbers Section

        //-- Github Section

        //-- Roadmap Section

        //-- Penetration Section

        const penetrationTop = document.querySelector('.penetration__wrapper').getBoundingClientRect().top;
        if (penetrationTop < windowHeightFiveSixth) {
            document.querySelector('.penetration-anim-bg__fill').classList.add('is-moved');
            document.querySelector('.penetration-anim-bg__edge-1').classList.add('is-moved');
            document.querySelector('.penetration-anim-bg__edge-3').classList.add('is-moved');
            document.querySelector('.penetration-anim-bg__edge-5').classList.add('is-moved');
        }

        const penetrationToggleLineBottom = document.querySelector('.map-toggle-line__carousel').getBoundingClientRect().top;
        if (penetrationToggleLineBottom < windowHeightFiveSixth) {
            document.querySelectorAll('.map-toggle-line__item').forEach((item, index) => {
                item.classList.add('is-moved-in');
            })
        }

        const penetrationNumbersBottom = document.querySelector('.map-numbers__lists').getBoundingClientRect().bottom;
        if (penetrationNumbersBottom <= windowHeight && !penetrationCountersAnimationComplete) {
            document.querySelectorAll('.map-numbers__list')[0].querySelectorAll('.map-numbers__number').forEach(item => {
                const countUp = new CountUp(item, item.getAttribute('data-number'), {
                    separator: ' ',
                    duration: 1,
                    useEasing: false,
                })
                countUp.start()
            })

            penetrationCountersAnimationComplete = true;
        }

        //-- Subscribe Section

        //-- Team Section

        const advisorsBottom = document.querySelector('.team__wrapper--advisors').getBoundingClientRect().bottom;
        if (advisorsBottom < windowHeightFiveSixth) {
            document.querySelector('.team-anim-bg__fill--bottom').classList.add('is-moved');
            document.querySelector('.team-anim-bg__edge-1').classList.add('is-moved');
            document.querySelector('.team-anim-bg__edge-3').classList.add('is-moved');
            document.querySelector('.team-anim-bg__edge-5').classList.add('is-moved');
        }

        //-- Partners Section

        //-- Media Section
    }

    //-- Window Events

    window.addEventListener('resize', () => {
        setIntroHeight();
        initParallax();

        windowHeight = document.documentElement.clientHeight;
        windowHeightFiveSixth = windowHeight * 5 / 6;
        windowHeightThreeQuarters = windowHeight * 3 / 4;
    });
}

import 'regenerator-runtime';
//import 'core-js'
import objectFitImages from 'object-fit-images';

import pageLoader from './page-loader';
import commonScripts from './common';

window.addEventListener('load', () => {
  objectFitImages('img', {watchMQ: true});

  pageLoader(); // fire scripts for loaded page
  commonScripts(); // fore common scripts

});

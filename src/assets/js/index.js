// console.log('Hello world from /js/index.js!');
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

import { faCheeseburger } from '@fortawesome/pro-light-svg-icons/faCheeseburger';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons/faEnvelope';
// import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';

library.add(
  faGithub,
  faInstagram,
  faSpotify,
  faTwitter,
  faCheeseburger,
  faEnvelope,
  // faEye,
  faLongArrowLeft,
  faTimes,
);

dom.watch();

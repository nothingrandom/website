// console.log('Hello world from /js/index.js!');
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons/faEnvelope';
import { faCheeseburger } from '@fortawesome/pro-light-svg-icons/faCheeseburger';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';

library.add(faGithub, faInstagram, faSpotify, faEnvelope, faCheeseburger, faTimes, faLongArrowLeft, faEye);

dom.watch();

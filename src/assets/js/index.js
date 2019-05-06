// console.log('Hello world from /js/index.js!');
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { faCheeseburger } from '@fortawesome/pro-light-svg-icons/faCheeseburger';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faLongArrowDown } from '@fortawesome/pro-light-svg-icons/faLongArrowDown';

library.add(faGithub, faInstagram, faSpotify, faCheeseburger, faTimes, faLongArrowDown);

dom.watch();

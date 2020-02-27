// console.log('Hello world from /js/index.js!');
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';

import { faHatChef as fasHatChef } from '@fortawesome/pro-solid-svg-icons/faHatChef';

import { faCoffeeTogo } from '@fortawesome/pro-duotone-svg-icons/faCoffeeTogo';
import { faHandHoldingHeart } from '@fortawesome/pro-duotone-svg-icons/faHandHoldingHeart';

import { faCheeseburger } from '@fortawesome/pro-light-svg-icons/faCheeseburger';
import { faCode } from '@fortawesome/pro-light-svg-icons/faCode';
import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { faHatChef as falHatChef } from '@fortawesome/pro-light-svg-icons/faHatChef';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';

library.add(
  faGithub,
  faInstagram,
  faSpotify,
  faTwitter,
  faSearch,
  faCheeseburger,
  faCoffeeTogo,
  faCode,
  faEye,
  faHandHoldingHeart,
  fasHatChef,
  falHatChef,
  faLongArrowLeft,
  faTimes,
);

dom.watch();

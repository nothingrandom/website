// console.log('Hello world from /js/index.js!');
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';

import { faCoffeeTogo } from '@fortawesome/pro-duotone-svg-icons/faCoffeeTogo';
import { faHandHoldingHeart } from '@fortawesome/pro-duotone-svg-icons/faHandHoldingHeart';
import { faUtensilsAlt as fadUtensilsAlt } from '@fortawesome/pro-duotone-svg-icons/faUtensilsAlt';

import { faCheeseburger } from '@fortawesome/pro-light-svg-icons/faCheeseburger';
import { faCode } from '@fortawesome/pro-light-svg-icons/faCode';
import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { faUtensilsAlt as falUtensilsAlt } from '@fortawesome/pro-light-svg-icons/faUtensilsAlt';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';
import { faMusic } from '@fortawesome/pro-solid-svg-icons/faMusic';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';

library.add(
  faGithub,
  faInstagram,
  faTwitter,
  faSearch,
  faCheeseburger,
  faCoffeeTogo,
  faCode,
  faEye,
  faHandHoldingHeart,
  fadUtensilsAlt,
  falUtensilsAlt,
  faLongArrowLeft,
  faMusic,
  faTimes,
);

dom.watch();

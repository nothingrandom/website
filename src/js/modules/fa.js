// console.log('Hello world from /js/index.js!');
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import {
  faGithub,
  faInstagram,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import {
  faAt,
  faIdCard,
  faMusic,
  faSearch,
  faBurgerCheese,
  faXmark,
  faEyes,
  faCode,
  faHandsHoldingHeart,
  faCoffeePot,
  faLongArrowLeft,
  faForkKnife as fatForkKnife,
} from '@fortawesome/pro-thin-svg-icons';

import { faForkKnife as fadForkKnife } from '@fortawesome/pro-duotone-svg-icons';

library.add(
  faGithub,
  faInstagram,
  faTwitter,
  faLinkedin,
  faAt,
  faIdCard,
  faMusic,
  faSearch,
  faBurgerCheese,
  faXmark,
  faEyes,
  faCode,
  faHandsHoldingHeart,
  faCoffeePot,
  faLongArrowLeft,
  fatForkKnife,
  fadForkKnife,
);

dom.watch();

import duskmoon-dark from './object.js';
import { addPrefix } from '../../functions/addPrefix.js';

export default ({ addBase, prefix = '' }) => {
  const prefixedduskmoon-dark = addPrefix(duskmoon-dark, prefix);
  addBase({ ...prefixedduskmoon-dark });
};

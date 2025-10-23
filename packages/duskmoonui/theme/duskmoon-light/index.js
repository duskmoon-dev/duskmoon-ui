import duskmoon-light from './object.js';
import { addPrefix } from '../../functions/addPrefix.js';

export default ({ addBase, prefix = '' }) => {
  const prefixedduskmoon-light = addPrefix(duskmoon-light, prefix);
  addBase({ ...prefixedduskmoon-light });
};

import type { StyleMap } from '../../../dist/types.js';
import { allTags } from '../node_modules/cardboard-js/dist/cardboard.js';
import { Link } from '../node_modules/cardboard-js/dist/routing.js';

const { nav, span, h4 } = allTags;
const linkStyle: StyleMap = { color: 'white', textDecoration: 'none' };

export const Header = () => {
  console.debug('Header');
  return nav(
    Link(h4('Page Title'), '/').setStyle(linkStyle),
    Link('Home', '/').setStyle(linkStyle),
    Link('About', '/about').setStyle(linkStyle),
  ).setStyle({
    backgroundColor: 'cadetblue',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
  });
};

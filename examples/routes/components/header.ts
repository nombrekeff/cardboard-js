import {
  allTags,
  type StyleMap,
} from '../../../dist/cardboard.js';
import { Link, router } from '../../../dist/ext/routing';

const { nav, button, h4 } = allTags;
const linkStyle: StyleMap = { color: 'white', textDecoration: 'none' };

export const Header = () => {
  return nav(
    Link(h4('Page Title'), '/').setStyle(linkStyle),
    Link('Home', '/').setStyle(linkStyle),
    Link('About', '/about').setStyle(linkStyle),
    Link('User', '/user/123', { q: 'test' }).setStyle(linkStyle),
    button('add q').clicked(() =>
      router.navigate(router.currentRoute, { p: 'test' }),
    ),
  ).setStyle({
    backgroundColor: 'cadetblue',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
  });
};

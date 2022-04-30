import { HiBookOpen, HiHeart, HiLocationMarker } from 'react-icons/hi';
import { MdExplore, MdLibraryBooks, MdLocationOn } from 'react-icons/md';

type LinkType = {
  label: string;
  href: string;
  icon?: JSX.Element;
};

export const links: LinkType[] = [
  {
    label: 'Explore',
    href: '/events',
    icon: <MdExplore />,
  },
  {
    label: 'About',
    href: '/about',
    icon: <MdLibraryBooks />,
  },
];

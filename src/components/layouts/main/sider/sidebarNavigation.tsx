import React from 'react';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'common.dashboard',
    key: 'dashboard',
    url: '/',
    icon: <NftIcon />,
  },
  {
    title: 'common.participants',
    key: 'participants',
    url: '/participants',
    icon: <NftIcon />,
  },
];

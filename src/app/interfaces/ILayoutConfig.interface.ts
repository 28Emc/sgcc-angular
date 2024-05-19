export interface ILayoutConfig {
  darkMode: boolean;
  sidebar: ISidebar;
  navbar: INavbar;
}

export interface ISidebar {
  title: string;
  imgSrc: string;
  search: boolean;
  collapsed: boolean;
  userInfo: IUserInfo;
  links: ILink[];
}

export interface INavbar {
  visibleDarkModeBtn: boolean;
  notification?: INotification;
  userInfo?: IUserInfo;
}

export interface IUserInfo {
  visible: boolean;
  avatar: string;
  username: string;
  role: string;
}

export interface INotification {
  visible: boolean;
}

export interface INotificationItem {
  id?: number;
  type: 'success' | 'info' | 'warning' | 'error';
  icon: string;
  title: string;
  description: string;
  read: boolean;
}

export class UserInfo implements IUserInfo {
  visible: boolean = true;
  avatar: string = 'admin@email.com';
  username: string = '';
  role: string = '';
}

export class Sidebar implements ISidebar {
  title: string = '';
  imgSrc: string = '';
  search: boolean = false;
  collapsed: boolean = false;
  userInfo: UserInfo = {
    visible: false,
    avatar: '',
    username: '',
    role: ''
  };
  links: Link[] = [];
}

export interface ILink {
  id?: number;
  parentId?: number;
  type: LinkType;
  name: string;
  icon?: string;
  url?: string;
  children?: Link[];
}

export type LinkType = 'title' | 'dropdown' | 'link';

export class Link implements ILink {
  id?: number;
  parentId?: number;
  type: LinkType = 'link';
  name: string = '';
  displayName: string = '';
  icon?: string = '';
  url?: string = '';
  isOpen?: boolean = false;
  deep?: number = 0;
  children?: Link[] = [];
}

export class TitleLink implements ILink {
  id?: number;
  parentId?: number;
  type: LinkType = 'title';
  name: string = '';
  displayName: string = '';
  children?: DropdownLink[] | DefaultLink[] = [];
}

export class DropdownLink implements ILink {
  id?: number;
  parentId?: number;
  type: LinkType = 'dropdown';
  name: string = '';
  displayName: string = '';
  icon: string = '';
  isOpen: boolean = false;
  deep: number = 0;
  children?: DefaultLink[];
}

export class DefaultLink implements ILink {
  id?: number;
  parentId?: number;
  type: LinkType = 'link';
  name: string = '';
  displayName: string = '';
  url: string = '';
}

export class Navbar implements INavbar {
  visibleDarkModeBtn: boolean = false;
  notification: Notification = {
    visible: false,
  };
  userInfo: UserInfo = {
    visible: false,
    avatar: '',
    username: '',
    role: ''
  };
}

export class Notification implements INotification {
  visible: boolean = false;
}

export class NotificationItem implements INotificationItem {
  id: number = 0;
  type: 'success' | 'info' | 'warning' | 'error' = 'info';
  icon: string = '';
  title: string = '';
  description: string = '';
  read: boolean = false;
}

export class LayoutConfig implements ILayoutConfig {
  darkMode: boolean = false;
  sidebar: Sidebar = {
    title: '',
    imgSrc: '',
    search: false,
    collapsed: false,
    userInfo: {
      visible: false,
      avatar: '',
      username: '',
      role: ''
    },
    links: []
  };
  navbar: Navbar = {
    visibleDarkModeBtn: true,
    notification: {
      visible: false
    },
    userInfo: {
      visible: false,
      avatar: "",
      username: "",
      role: ""
    }
  };
}

export const defaultConfig: LayoutConfig = {
  darkMode: false,
  sidebar: {
    title: 'SGCC',
    imgSrc: 'assets/img/logo_1.webp',
    search: false,
    collapsed: false,
    userInfo: {
      visible: true,
      avatar: 'https://picsum.photos/200',
      username: 'admin@email.com',
      role: 'Admin'
    },
    links: [
      {
        id: 1,
        parentId: 0,
        type: 'link',
        name: 'Dashboard',
        displayName: 'Dashboard',
        icon: 'layout-dashboard',
        url: '/dashboard'
      },
      {
        id: 2,
        parentId: 0,
        type: 'title',
        name: 'Catalog',
        displayName: 'Catalog',
        children: [
          {
            id: 3,
            parentId: 2,
            type: 'link',
            name: 'Housings',
            displayName: 'Housings',
            icon: 'building',
            url: '/housings'
          },
          {
            id: 4,
            parentId: 2,
            type: 'link',
            name: 'Rooms',
            displayName: 'Rooms',
            icon: 'door',
            url: '/rooms'
          },
          {
            id: 5,
            parentId: 2,
            type: 'link',
            name: 'Tenants',
            displayName: 'Tenants',
            icon: 'users-group',
            url: '/tenants'
          },
          {
            id: 6,
            parentId: 2,
            type: 'link',
            name: 'Receipts',
            displayName: 'Receipts',
            icon: 'receipt-2',
            url: '/receipts'
          },
          {
            id: 7,
            parentId: 2,
            type: 'link',
            name: 'Measuring Devices',
            displayName: 'Measuring Devices',
            icon: 'devices-search',
            url: '/measuring-devices'
          },
          {
            id: 8,
            parentId: 2,
            type: 'link',
            name: 'Measuring Device Readings',
            displayName: 'Readings',
            icon: 'number-123',
            url: '/measuring-device-readings'
          }
        ]
      },
      {
        id: 9,
        parentId: 0,
        type: 'title',
        name: 'Operations',
        displayName: 'Operations',
        children: [
          {
            id: 10,
            parentId: 9,
            type: 'link',
            name: 'Tenant Calculations',
            displayName: 'Calculations',
            icon: 'calculator',
            url: '/calculations'
          }
        ]
      }
    ]
  },
  navbar: {
    visibleDarkModeBtn: true,
    notification: {
      visible: true
    },
    userInfo: {
      visible: true,
      avatar: "https://picsum.photos/200",
      username: "admin@email.com",
      role: "Admin"
    }
  }
};

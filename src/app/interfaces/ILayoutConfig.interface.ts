export interface ILayoutConfig {
  sidebar: ISidebar;
}

interface ISidebar {
  imgSrc: string;
  collapsed: boolean;
  darkMode: boolean;
  userInfo: IUserInfo;
  links: ILink[];
}

interface IUserInfo {
  visible: boolean;
  username: string;
  role: string;
}

class UserInfo implements IUserInfo {
  visible: boolean = true;
  username: string = '';
  role: string = '';
}

class Sidebar implements ISidebar {
  imgSrc: string = '';
  collapsed: boolean = false;
  darkMode: boolean = false;
  userInfo: UserInfo = {
    visible: false,
    username: '',
    role: ''
  };
  links: Link[] = [];
}

interface ILink {
  name: string;
  icon: string;
  url: string;
}

class Link implements ILink {
  name: string = '';
  icon: string = '';
  url: string = '';
}

export class LayoutConfig implements ILayoutConfig {
  sidebar: Sidebar = {
    imgSrc: '',
    collapsed: false,
    darkMode: false,
    userInfo: {
      visible: false,
      username: '',
      role: ''
    },
    links: []
  };
}

export const defaultConfig: LayoutConfig = {
  sidebar: {
    imgSrc: 'assets/img/logo_1.webp',
    collapsed: false,
    userInfo: {
      visible: true,
      username: 'admin@email.com',
      role: 'Admin'
    },
    darkMode: false,
    links: [
      {
        name: 'Dashboard',
        icon: 'layout-dashboard',
        url: '/dashboard'
      }
    ]
  }
};

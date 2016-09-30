
import {handleActions} from 'redux-actions';
import {NavigationExperimental} from 'react-native';

const {
  StateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [{
    key: 'walkthrough',
  }],

  tabKey: 'home',
  tabs: {
    home: {
      index: 0,
      routes: [{
        key: 'home',
      }],
    },
    manage: {
      index: 0,
      routes: [{
        key: 'manage',
      }],
    },
    myEvents: {
      index: 0,
      routes: [{
        key: 'myEvents',
      }],
    },
    calendar: {
      index: 0,
      routes: [{
        key: 'calendar',
      }],
    },
    invitations: {
      index: 0,
      routes: [{
        key: 'invitations',
      }],
    },
    settings: {
      index: 0,
      routes: [{
        key: 'preferences',
      }],
    },
    notifications: {
      index: 0,
      routes: [{
        key: 'notifications',
      }],
    },
    friends: {
      index: 0,
      routes: [{
        key: 'friends',
      }],
    },
  },

  showMenu: false,
};

export default handleActions({
  NAV_PUSH: (state, action) => {
    //if the current route is 'tabs' and we want to stay in tabs, alter the tab's state
    let currentRoute = state.routes[state.index];
    if(currentRoute.key === 'tabs' && action.subTab){
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [state.tabKey]: StateUtils.push(state.tabs[state.tabKey], action.route),
        },
      };
    }else{
      return StateUtils.push(state, action.route);
    }
  },

  NAV_POP: (state, action) => {
    let currentRoute = state.routes[state.index];
    if(currentRoute.key === 'tabs'){
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [state.tabKey]: StateUtils.pop(state.tabs[state.tabKey]),
        },
      };
    }else{
      return StateUtils.pop(state);
    }
  },

  NAV_RESET: (state, action) => {
    return StateUtils.reset(state, [action.route], 0);
  },

  NAV_CHANGE_TAB: (state, action) => {
    //if the tab is already selected, reset it's route stack
    if(state.tabKey === action.key) {
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [action.key]: initialState.tabs[action.key],
        },
      };
    }else{
      return {
        ...state,
        tabKey: action.key
      };
    }
  },

  NAV_SHOW_MENU: (state, action) => {
    return {
      ...state,
      showMenu: true,
    };
  },

  NAV_HIDE_MENU: (state, action) => {
    return {
      ...state,
      showMenu: false,
    };
  },

  USER_LOGGED_OUT: (state, action) => {
    return initialState;
  },

  SET_UI_MODE: (state, action) => {
    //Reset tabs nav state when the UI mode is changed
    return {
      ...state,
      tabKey: 'home',
      tabs: initialState.tabs,
    };
  },

  DEEP_LINK_TAB: (state, action) => {

    let subNav = {
      ...initialState.tabs[action.tabKey]
    };

    if(action.route) {
      //Don't use .push() due to a need for pure functions
      subNav.routes = subNav.routes.concat(action.route);
      subNav.index = 1;
    }

    return {
      ...state,
      index: 0,
      routes: [{
        key: 'tabs',
      }],
      tabKey: action.tabKey,
      tabs: {
        ...state.tabs,
        [action.tabKey]: subNav,
      },
    };
  },

}, initialState);
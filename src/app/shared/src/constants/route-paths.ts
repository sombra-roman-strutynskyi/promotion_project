export const ROUTES_DATA = {
  HOME: {
    title: 'Home',
    url: '',
  },
  AUTH: {
    title: 'Auth',
    url: 'auth',
    children: {
      SIGN_IN: {
        url: 'login',
        title: 'Sign In',
      },
    },
  },
};

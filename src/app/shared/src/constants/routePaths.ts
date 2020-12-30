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
        url: 'auth/login',
        path: 'login',
        title: 'Sign In',
      },
    },
  },
};

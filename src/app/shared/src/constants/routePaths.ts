export const ROUTES_DATA = {
  DASHBOARD: {
    title: 'Dashboard',
    url: '/',
  },
  EDIT_USER: {
    title: 'User Info',
    url: 'user',
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
      SIGN_UP: {
        url: 'auth/register',
        path: 'register',
        title: 'Sign Up',
      },
      RESET_PASSWORD: {
        url: 'auth/reset-password',
        path: 'reset-password',
        title: 'Reset Password',
      },
      FORGOT_PASSWORD: {
        url: 'auth/forgot-password',
        path: 'forgot-password',
        title: 'Forgot Password',
      },
    },
  },
};

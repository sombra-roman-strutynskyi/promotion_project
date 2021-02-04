export const ROUTES_DATA = {
  ARTICLES: {
    title: 'Articles',
    url: 'articles',
    path: 'articles',
    children: {
      EDIT: {
        url: 'articles/edit',
        path: 'edit/:id',
        title: 'Edit Article',
      },
      ADD: {
        url: 'articles/add',
        path: 'add',
        title: 'Create Article',
      },
    },
  },
  USERS: {
    path: 'users',
    children: {
      CURRENT: {
        title: 'User Info',
        url: 'users/current',
        path: 'current',
      },
    },
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

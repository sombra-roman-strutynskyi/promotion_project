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
  PROFILE: {
    path: 'profile',
    url: 'profile',
  },
  AUTH: {
    title: 'Auth',
    url: 'auth',
    path: 'auth',
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
      USER_MANAGEMENT: {
        url: 'auth/user-management',
        path: 'user-management',
        title: 'User Management',
      },
      FORGOT_PASSWORD: {
        url: 'auth/forgot-password',
        path: 'forgot-password',
        title: 'Forgot Password',
      },
    },
  },
};

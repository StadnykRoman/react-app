import { Theme } from '../types';

export const API_ENDPOINTS = {
  USERS: 'https://jsonplaceholder.typicode.com/users',
  TODOS: 'https://jsonplaceholder.typicode.com/todos',
  GOOGLE_USER_INFO: 'https://www.googleapis.com/oauth2/v2/userinfo',
  GOOGLE_AUTH: 'https://accounts.google.com/o/oauth2/v2/auth',
  GOOGLE_TOKEN: 'https://oauth2.googleapis.com/token',
} as const;

export const GOOGLE_OAUTH_CONFIG = {
  CLIENT_ID: '744072275843-lpm0tmva09ke4avm665iq2bmp3vfds8f.apps.googleusercontent.com',
  CLIENT_SECRET: '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',
  SCOPES: ['openid', 'profile', 'email'],
  REDIRECT_SCHEME: 'exp',
  REDIRECT_PATH: '127.0.0.1:19000',
} as const;

export const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  AUTH_TOKEN: '@auth_token',
  RECOVERY_DATA: '@recovery_data',
} as const;

export const APP_CONFIG = {
  BUNDLE_ID: 'com.miniapp.app',
  SCHEME: 'mini-app',
} as const;

export const AUTH = {
  ALLOWED_EMAIL: 'test@test.com',
  ALLOWED_PASSWORD: 'password',
} as const;

export const theme: Theme = {
  colors: {
    primary: '#0D9488', // teal-600
    secondary: '#059669', // emerald-600
    background: '#F5F5F5', // light gray
    surface: '#FFFFFF',
    text: '#374151', // gray-700
    textSecondary: '#6B7280', // gray-500
    border: '#E5E7EB', // gray-200
    error: '#DC2626', // red-600
    success: '#059669', // emerald-600
    warning: '#D97706', // amber-600
    accent: '#10B981', // emerald-500
    medical: '#0F766E', // teal-700
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
  },
};

import { ParamListBase } from '@react-navigation/native';
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  avatar?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'email' | 'google';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export type NavigationParamList = ParamListBase & {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  Appointments: undefined;
  Treatments: undefined;
  Profile: undefined;
  Settings: undefined;
  Recovery?: undefined;
  Support?: undefined;
};

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: 'consultation' | 'treatment' | 'follow-up';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: 'hair-transplant' | 'prp' | 'mesotherapy' | 'consultation';
}

export interface RecoveryMilestone {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  tasks: RecoveryTask[];
  isCompleted: boolean;
  completedAt?: string;
}

export interface RecoveryTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
  category: 'medication' | 'care' | 'photo' | 'checkup' | 'lifestyle';
}

export interface BottomTabParamList {
  Dashboard: undefined;
  Recovery: undefined;
  Treatments: undefined;
  Profile: undefined;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    accent: string;
    medical: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    h1: object;
    h2: object;
    h3: object;
    body: object;
    caption: object;
  };
}

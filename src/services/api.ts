import { User, ApiResponse, AuthUser } from '../types';
import { API_ENDPOINTS } from '../constants';

class ApiService {
  private baseURL = '';

  async request<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(API_ENDPOINTS.USERS);
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`${API_ENDPOINTS.USERS}/${id}`);
  }
}

export const apiService = new ApiService();

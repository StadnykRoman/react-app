import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { AuthUser, LoginCredentials } from '../types';
import { GOOGLE_OAUTH_CONFIG, API_ENDPOINTS, AUTH } from '../constants';

WebBrowser.maybeCompleteAuthSession();

class AuthService {
  async loginWithCredentials(credentials: LoginCredentials): Promise<AuthUser | null> {
    const isAllowedEmail = credentials.email.trim().toLowerCase() === AUTH.ALLOWED_EMAIL;
    const isAllowedPassword = credentials.password === AUTH.ALLOWED_PASSWORD;
    if (!isAllowedEmail || !isAllowedPassword) return null;
    return {
      id: '1',
      name: 'User',
      email: AUTH.ALLOWED_EMAIL,
      provider: 'email',
    };
  }

  async loginWithGoogle(): Promise<AuthUser | null> {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
        scopes: [...GOOGLE_OAUTH_CONFIG.SCOPES],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        extraParams: {},
        prompt: AuthSession.Prompt.SelectAccount,
        usePKCE: true,
      });
      const result = await request.promptAsync({
        authorizationEndpoint: API_ENDPOINTS.GOOGLE_AUTH,
      });
      if (result.type !== 'success') return null;
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
          clientSecret: GOOGLE_OAUTH_CONFIG.CLIENT_SECRET,
          code: (result as any).params.code,
          redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier || '',
          },
        },
        {
          tokenEndpoint: API_ENDPOINTS.GOOGLE_TOKEN,
        }
      );
      const userInfoResponse = await fetch(
        `${API_ENDPOINTS.GOOGLE_USER_INFO}?access_token=${tokenResponse.accessToken}`
      );
      const userInfo = await userInfoResponse.json();
      return {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
        provider: 'google',
      };
    } catch (_) {
      return null;
    }
  }

  async logout(): Promise<void> {
    return Promise.resolve();
  }
}

export const authService = new AuthService();

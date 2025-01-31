import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const loggedIn = this.getToken() ? true : false;
    return loggedIn;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) {
      return false;
    } else {
      return decoded.exp < Date.now() / 1000;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    const token = idToken;
    localStorage.setItem('id_token', token);
    // TODO: redirect to the home page
    
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    
  }
}

export default new AuthService();

import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (!token) {
      return null; // Return null if there is no token
    }
    return jwtDecode<JwtPayload>(token); // Return the decoded token
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
      return false; // Return false if there is no expiration date
    } else {
      return decoded.exp < Date.now() / 1000; // Return true if the token is expired
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    const token = idToken;
    localStorage.setItem("id_token", token);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("id_token");
    // TODO: redirect to the login page
    // Check if the application is running in production or development
    const isProduction =
      window.location.hostname === "peterkanbanboard.onrender.com";

    // Redirect to the appropriate login page based on the environment
    if (isProduction) {
      window.location.assign("https://peterkanbanboard.onrender.com/auth/login");
    } else {
      window.location.assign("/login"); // Local redirection
    }
  }
}

export default new AuthService();

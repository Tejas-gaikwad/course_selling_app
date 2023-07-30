const AuthService = {
    isAuthenticated: () => {
      // Check the user's authentication status (e.g., by checking the token)
      const token = localStorage.getItem('isUserLogin');
      return !!token; // Return true if the user is authenticated, otherwise false
    },
  };
  
  export default AuthService;
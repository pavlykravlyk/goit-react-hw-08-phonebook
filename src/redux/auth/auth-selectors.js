export const getIsLoggedIn = state => state.authSlice.isLoggedIn;
export const getUserName = state => state.authSlice.user.name;
export const getToken = state => state.authSlice.token;
export const getIsRefreshing = state => state.authSlice.isRefreshing;

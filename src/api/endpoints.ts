const ENDPOINTS = {
  AUTH: {
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
    REFRESH_TOKEN: `/auth/refresh`,
    LOGOUT: `/auth/logout`,
  },
  USER: {
    PROFILE: `/user/profile`,
    UPDATE_PROFILE: `/user/update`,
    DELETE_ACCOUNT: `/user/delete`,
  },
  POSTS: {
    GET_ALL: `/posts`,
    GET_ONE: (id: string) => `/posts/${id}`,
    CREATE: `/posts/create`,
    UPDATE: (id: string) => `/posts/update/${id}`,
    DELETE: (id: string) => `/posts/delete/${id}`,
  },
};

export default ENDPOINTS;

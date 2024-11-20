// auth
const pathnameAuthRoutePrefix = '/auth';
const pathnamesAuthRoutes = {
  register: '/register',
  login: '/login',
  refresh: '/refresh',
  logout: '/logout',
};
type IAuthControllerName = keyof typeof pathnamesAuthRoutes;

// game
const pathnameGameRoutePrefix = '/game';
const pathnamesGameRoutes = {
  create: '/create',
};
type IGameControllerName = keyof typeof pathnamesGameRoutes;

export type { IAuthControllerName, IGameControllerName };
export {
  pathnameAuthRoutePrefix,
  pathnameGameRoutePrefix,
  pathnamesAuthRoutes,
  pathnamesGameRoutes,
};

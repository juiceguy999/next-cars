export {default} from 'next-auth/middleware';

export const config = {
  matcher: ['/cars/add', '/profile', '/cars/favorites', '/messages']
};
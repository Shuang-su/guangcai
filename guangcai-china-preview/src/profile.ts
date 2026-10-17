export type AppProfile='consumer'|'dev';
export const profile:AppProfile=location.pathname.startsWith('/dev')?'dev':'consumer';
document.documentElement.dataset.profile=profile;

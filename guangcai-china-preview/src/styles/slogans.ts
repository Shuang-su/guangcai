export const slogans={open:'开放包容',innovation:'创新驱动',cooperation:'合作共赢',sharing:'共建共享',together:'携手同心',ocean:'拥抱瀚海'} as const;
import additions from './new-slogans.json';
export const consumerSlogans={'love-city':'我爱城市',...additions,...slogans} as const;
export type Slogan=keyof typeof consumerSlogans;
export const sloganText=(id:Slogan,cityName:string)=>id==='love-city'?`我爱${cityName}`:consumerSlogans[id];

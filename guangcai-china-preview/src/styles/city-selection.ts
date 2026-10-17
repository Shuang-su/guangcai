import catalog from './city-catalog.json';
import v5 from './city-catalog-v5.json';
import v6 from './city-catalog-v6.json';
import {slogans,type Slogan} from './slogans';
import {palettes,presetAppearance,normalizeAppearance,type Appearance,type Palette} from './city-appearance';
import type {CityArtworkPack} from './city-artwork';

type PilotTheme=keyof typeof v5.cities;
const pilotThemes=Object.fromEntries(Object.entries(v5.cities).map(([id,c])=>[id,{name:c.name,defaultVariant:`${id}-gold`,label:id,slogans:id==='shenzhen'}])) as Record<PilotTheme,{name:string;defaultVariant:string;label:string;slogans:boolean}>;
type V6Theme=`v6-${keyof typeof v6.cities}`;
export const v6Themes=Object.fromEntries(Object.entries(v6.cities).map(([id,c])=>[`v6-${id}`,{name:c.name,defaultVariant:`v6-${id}-gold`,label:id,slogans:true}])) as Record<V6Theme,{name:string;defaultVariant:string;label:string;slogans:boolean}>;
export const isV6=(theme:string):theme is V6Theme=>Object.hasOwn(v6Themes,theme);
export const themes={china:{name:'中国',defaultVariant:'china-gold',label:'china',slogans:false},...pilotThemes,...v6Themes} as const;
export type Theme=keyof typeof themes;
export type Finish='enamel'|'metal'|'paint'; // old paint requests normalize to enamel
export type Lettering='auto'|'name'|'he'|'create'|'none'|Slogan;
export interface Selection {variant:string;finish:Finish;text:Lettering;appearance?:Appearance}
export const defaultSelection:Selection={variant:'china-gold',finish:'enamel',text:'auto'};
export const v6DefaultSelection:Selection={variant:'v6-shenzhen-gold',finish:'metal',text:'open',appearance:presetAppearance('gold')};
export const finishes={enamel:'彩釉金线',metal:'彩色金属'};
export const isPilot=(theme:string):theme is PilotTheme|V6Theme=>Object.hasOwn(v5.cities,theme)||isV6(theme);
export const variants=[{id:'china-gold',name:'中国 · 原版纯金',theme:'china',thumbnail:'',fixedGold:true},
 ...catalog.variants.filter(v=>v.theme==='china'),
 ...([...Object.keys(v5.cities),...Object.keys(v6Themes)] as (PilotTheme|V6Theme)[]).flatMap(theme=>(Object.keys(palettes) as Palette[]).map(p=>({id:`${theme}-${p}`,name:`${themes[theme].name} · ${palettes[p].name}`,theme,thumbnail:isV6(theme)?v6.cities[theme.slice(3) as keyof typeof v6.cities].thumbnail:v5.cities[theme].thumbnail,fixedGold:false})))];
export const isFixedGold=(v:{id:string;fixedGold?:boolean})=>v.id==='china-gold'||v.fixedGold===true;
export const themeFor=(v:{theme:string})=>themes[v.theme as Theme];
const alias=(id:string)=>id==='shenzhen-teal'?'shenzhen-blue':id;
export const variantFor=(id:string)=>{const v=variants.find(v=>v.id===alias(id));if(!v)throw new Error('未知图样款式');return v;};
export function normalizeSelection(previous:Selection,patch:Partial<Selection>):Selection {
 const next={...previous,...patch};next.variant=alias(next.variant);const v=variantFor(next.variant);
 if(next.finish==='paint')next.finish='enamel';
 if(!(next.finish in finishes)||!['auto','name','he','create','none',...Object.keys(slogans)].includes(next.text))throw new Error('不支持的材质或文字选项');
 if(isFixedGold(v))next.finish='enamel';
 if(isV6(v.theme)&&!Object.hasOwn(slogans,next.text))next.text='open';
 if(!isV6(v.theme)&&Object.hasOwn(slogans,next.text))next.text='auto';
 if(!themeFor(v).slogans&&['he','create'].includes(next.text))next.text='auto';
 if(isPilot(v.theme)){
  const p=next.variant.slice(v.theme.length+1) as Palette;
  next.appearance=normalizeAppearance(patch.appearance??(patch.variant?presetAppearance(p):previous.appearance??presetAppearance(p)));
  if(patch.finish&&!patch.appearance)next.appearance={...next.appearance,material:next.finish==='metal'?1:0,materialX:.5};
  next.finish=next.appearance.material===1?'metal':'enamel';
 }else if(next.appearance)next.appearance=normalizeAppearance(next.appearance);
 return next;
}
export function selectTheme(previous:Selection,theme:Theme):Selection {
 if(!Object.hasOwn(themes,theme))throw new Error('未知主题');
 if(isPilot(theme)){
  const appearance=previous.appearance??presetAppearance('gold');
  return normalizeSelection(previous,{variant:`${theme}-${appearance.preset}`,appearance});
 }
 return normalizeSelection(previous,{variant:themes[theme].defaultVariant,finish:'enamel'});
}
export function artworkPack(selection:Selection,gold:CityArtworkPack,base='/'):CityArtworkPack {
 const s=normalizeSelection(selection,{}),v=variantFor(s.variant);
 if(s.variant==='china-gold')return s.text==='none'?{...gold,label:{hidden:true}}:{...gold};
 if(isV6(v.theme)){
  const maps=v6.cities[v.theme.slice(3) as keyof typeof v6.cities],url=(file:string)=>`${base}cities/v6/${file}`;
  return {id:s.variant,version:6,name:v.name,layout:'blank-300deg-v1',baseColor:url(maps.mask),metalness:url(maps.mask),roughness:url(maps.mask),normal:url(maps.normal),coverage:url(maps.mask),normalEncoding:'rgba16f',finish:s.finish==='metal'?'metal':'enamel',parametric:{mask:url(maps.mask),appearance:s.appearance!},label:{source:url(`slogan-${s.text}.webp`),fixedGold:true}};
 }
 if(isPilot(v.theme)){
  const maps=v5.cities[v.theme as PilotTheme],url=(file:string)=>`${base}cities/v5/${file}`;
  const labelSource=(s.text==='he'||s.text==='create')?`${base}cities/v4/${catalog.labels[s.text]}`:url(maps.label);
  return {id:s.variant,version:5,name:v.name,layout:'blank-300deg-v1',baseColor:url(maps.mask),metalness:url(maps.mask),roughness:url(maps.mask),normal:url(maps.normal),coverage:url(maps.mask),normalEncoding:'rgba16f',finish:s.finish==='metal'?'metal':'enamel',parametric:{mask:url(maps.mask),appearance:s.appearance!},label:{source:labelSource,hidden:s.text==='none'}};
 }
 const entry=catalog.variants.find(x=>x.id===s.variant)!;const url=(file:string)=>`${base}cities/v4/${file}`;
 return {id:entry.id,version:4,name:entry.name,layout:'blank-300deg-v1',...Object.fromEntries(Object.entries(entry.maps).map(([k,v])=>[k,url(v)])),normalEncoding:'rgba16f',finish:s.finish==='metal'?'metal':'enamel',label:{source:url(catalog.labels.china),color:entry.textColor,hidden:s.text==='none',metalness:s.finish==='metal'?1:0}} as CityArtworkPack;
}
/** Only a complete successful transaction is exposed as current; sliders use the same revision guard. */
export class SelectionController {
 current:Selection;desired:Selection;busy=false;error='';private revision=0;
 constructor(private apply:(selection:Selection)=>Promise<boolean>,private changed:()=>void,private initial:Selection=defaultSelection){this.current=normalizeSelection(initial,{});this.desired={...this.current};}
 async select(patch:Partial<Selection>){
  const next=normalizeSelection(this.desired,patch),revision=++this.revision;
  this.desired=next;this.busy=true;this.error='';this.changed();
  try{const success=await this.apply(next);if(revision!==this.revision)return false;if(!success)throw new Error('图样未完整应用，已保留当前款式');this.current={...next};return true;}
  catch(e){if(revision!==this.revision)return false;this.error=(e as Error).message;this.desired={...this.current};return false;}
  finally{if(revision===this.revision){this.busy=false;this.changed();}}
 }
 restore(){return this.select({...this.initial});}
}

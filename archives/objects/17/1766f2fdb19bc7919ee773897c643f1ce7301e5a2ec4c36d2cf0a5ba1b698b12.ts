import catalog from './city-catalog.json';
import type {CityArtworkPack} from './city-artwork';

export const themes={
 china:{name:'中国',defaultVariant:'china-gold',label:'china',slogans:false},
 shenzhen:{name:'深圳',defaultVariant:'shenzhen-red',label:'shenzhen',slogans:true},
 beijing:{name:'北京',defaultVariant:'beijing-gold',label:'beijing',slogans:false},
} as const;
export type Theme=keyof typeof themes;
export type Finish='enamel'|'metal'|'paint';
export type Lettering='auto'|'name'|'he'|'create'|'none';
export interface Selection {variant:string;finish:Finish;text:Lettering}
export const defaultSelection:Selection={variant:'china-gold',finish:'enamel',text:'auto'};
export const finishes={enamel:'彩釉金线',metal:'彩色金属',paint:'轻浮雕彩绘'};
export const variants=[{id:'china-gold',name:'中国 · 原版纯金',theme:'china',thumbnail:'',fixedGold:true},...catalog.variants];
export const isFixedGold=(v:{id:string;fixedGold?:boolean})=>v.id==='china-gold'||v.fixedGold===true;
export const themeFor=(v:{theme:string})=>themes[v.theme as Theme];
export const variantFor=(id:string)=>{const v=variants.find(v=>v.id===id);if(!v)throw new Error('未知图样款式');return v;};
export function normalizeSelection(previous:Selection,patch:Partial<Selection>):Selection {
 const next={...previous,...patch},v=variantFor(next.variant);
 if(!(next.finish in finishes)||!['auto','name','he','create','none'].includes(next.text))throw new Error('不支持的材质或文字选项');
 if(isFixedGold(v))next.finish='enamel';
 if(!themeFor(v).slogans&&['he','create'].includes(next.text))next.text='auto';
 return next;
}
export function selectTheme(previous:Selection,theme:Theme):Selection {
 if(!Object.hasOwn(themes,theme))throw new Error('未知主题');
 return normalizeSelection(previous,{variant:themes[theme].defaultVariant,finish:'enamel'});
}
export function artworkPack(selection:Selection,gold:CityArtworkPack,base='/'):CityArtworkPack {
 const s=normalizeSelection(selection,{}),v=variantFor(s.variant);
 if(s.variant==='china-gold')return s.text==='none'?{...gold,label:{hidden:true}}:{...gold};
 const entry=catalog.variants.find(x=>x.id===s.variant)!;
 const url=(file:string)=>`${base}cities/v4/${file}`;
 const labelKey=s.text==='he'||s.text==='create'?s.text:!themeFor(v).slogans||s.text==='name'?themeFor(v).label:s.variant==='shenzhen-red'?'he':'create';
 return {id:entry.id,version:4,name:entry.name,layout:'blank-300deg-v1',
  ...Object.fromEntries(Object.entries(entry.maps).map(([k,v])=>[k,url(v)])),
  normalEncoding:'rgba16f',...(isFixedGold(v)?{}:{finish:s.finish}),
  label:{source:url(catalog.labels[labelKey]),color:entry.textColor,hidden:s.text==='none',metalness:isFixedGold(v)||s.finish==='metal'?1:0},
 } as CityArtworkPack;
}

/** Only a complete successful transaction is exposed as the current selection. */
export class SelectionController {
 current:Selection={...defaultSelection};desired:Selection={...defaultSelection};busy=false;error='';private revision=0;
 constructor(private apply:(selection:Selection)=>Promise<boolean>,private changed:()=>void){}
 async select(patch:Partial<Selection>){
  const next=normalizeSelection(this.desired,patch),revision=++this.revision;
  this.desired=next;this.busy=true;this.error='';this.changed();
  try{const success=await this.apply(next);if(revision!==this.revision)return false;
   if(!success)throw new Error('图样未完整应用，已保留当前款式');
   this.current={...next};return true;
  }catch(e){if(revision!==this.revision)return false;this.error=(e as Error).message;this.desired={...this.current};return false;
  }finally{if(revision===this.revision){this.busy=false;this.changed();}}
 }
 restore(){return this.select({...defaultSelection});}
}

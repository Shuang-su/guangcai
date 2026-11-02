import type {Region,Tier} from './types';
import type {View} from '../interaction/views';

export interface FixedQuality {tiers:Record<Region,Tier>;colors:Record<Region,Tier>}
const light=():Record<Region,Tier>=>({body:'light',handle:'light',saucer:'light'});
export function fixedQualityCandidates(view:View,zoomed:boolean):FixedQuality[]{
 const visible:Region[]=view==='lid'?[]:view==='cup'?['body','handle']:view==='saucer'?['saucer']:['body','handle','saucer'];
 const focus:Region=view==='cup'?'body':view==='handle'?'handle':'saucer';
 const close=zoomed||view==='flowers'||view==='saucer'||view==='handle';
 const tiers=light();for(const region of visible)tiers[region]='standard';
 if(close&&visible.includes(focus))tiers[focus]='detail';
 const first:FixedQuality={tiers,colors:{...tiers}},result=[first];
 const mixed:FixedQuality={tiers:{...tiers},colors:{...tiers}};
 if(mixed.tiers[focus]==='detail')mixed.tiers[focus]='standard';
 result.push(mixed);
 // Color sharpness has priority over upgrading every relief/ORM channel.
 const compact:FixedQuality={tiers:{...mixed.tiers},colors:{...mixed.colors}};
 for(const region of visible)if(region!==focus&&region!=='saucer')compact.tiers[region]='light';
 result.push(compact);
 if(focus!=='saucer')result.push({tiers:{...compact.tiers,[focus]:'light'},colors:{...compact.colors}});
 const focused:FixedQuality={tiers:light(),colors:light()};
 if(visible.includes(focus)){focused.tiers[focus]=mixed.tiers[focus];focused.colors[focus]=mixed.colors[focus];}
 result.push(focused);
 if(focus!=='saucer')result.push({tiers:{...focused.tiers,[focus]:'light'},colors:{...focused.colors}});
 result.push({tiers:{...focused.tiers},colors:{...focused.tiers}},{tiers:light(),colors:light()});
 return [...new Map(result.map(candidate=>[JSON.stringify(candidate),candidate])).values()];
}

// A material shares one atlas transform across channels. Mixed resolutions must
// have identical normalized content/gutters, not merely the same aspect ratio.
export function compatibleAtlas(a?:{rows:number;contentWidth:number;contentHeight:number;gutter:number},b?:{rows:number;contentWidth:number;contentHeight:number;gutter:number}){
 if(!a||!b)return a===b;
 return a.rows===b.rows&&Math.abs(a.contentWidth/b.contentWidth-a.gutter/b.gutter)<1e-9&&Math.abs(a.contentHeight/b.contentHeight-a.gutter/b.gutter)<1e-9;
}

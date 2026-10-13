import {writeFileSync} from 'node:fs';
import {defaults} from '../src/geometry/parameters';
import {handlePath} from '../src/geometry/handle';
import {ribbon} from '../src/geometry/ribbon';
const p=defaults,g=ribbon(handlePath(p).path,p.handleWidth,p.handleThickness);
const m={body:{width:p.radius*p.bandAngle,length:p.height-5.3},handle:g.userData.surfaceMetrics,saucer:{width:(p.saucerRadius-3.3)*2*Math.PI/4,length:Math.hypot(4.0,10.4)}};
writeFileSync('assets/surface-metrics.json',JSON.stringify(m,null,2));g.dispose();

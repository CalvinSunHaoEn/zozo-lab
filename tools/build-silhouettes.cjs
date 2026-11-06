const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..')+path.sep;
const files={cutout:'cheese-cutout-front-clean.webp',cutoutBack:'cheese-cutout-back-clean.webp',cutoutSide:'cheese-cutout-side.webp',metal:'fluid-metal-front-clean.webp',metalBack:'fluid-metal-back.webp',metalSide:'fluid-metal-side.webp',cheese:'cheese-character-front.webp',cheeseSide:'cheese-character-side.webp',cheeseBack:'cheese-character-back.webp',crystal:'crystal-inlay-front.webp',crystalSide:'crystal-inlay-side.webp',crystalBack:'crystal-inlay-back.webp',cherry:'cherry-jelly-front.webp',cherrySide:'cherry-jelly-side.webp',cherryBack:'cherry-jelly-back.webp',blue:'blue-jelly-front.webp',blueSide:'blue-jelly-side.webp',blueBack:'blue-jelly-back.webp'};
// Only these verified, empty openings are seeded. White case surfaces and phones remain opaque.
const openings={cutoutBack:[[.5,.2],[.23,.76]],metalBack:[[.5,.15],[.48,.52]]};
function simplify(points,tolerance=1){
 if(points.length<=2)return points;
 const a=points[0],b=points[points.length-1],dx=b[0]-a[0],dy=b[1]-a[1],len=dx*dx+dy*dy;
 let max=0,index=0;
 for(let i=1;i<points.length-1;i++){const p=points[i],t=len?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/len)):0;const dist=(p[0]-a[0]-t*dx)**2+(p[1]-a[1]-t*dy)**2;if(dist>max){max=dist;index=i;}}
 if(max<=tolerance*tolerance)return [a,b];
 return [...simplify(points.slice(0,index+1),tolerance).slice(0,-1),...simplify(points.slice(index),tolerance)];
}
(async()=>{const paths={},report=[];for(const [key,file] of Object.entries(files)){
 const {data,info:{width:w,height:h,channels:c}}=await sharp(root+'assets/products/'+file).raw().toBuffer({resolveWithObject:true});
 const removed=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
 const white=i=>data[i*c]>=239&&data[i*c+1]>=239&&data[i*c+2]>=239;
 const visit=i=>{if(!removed[i]&&white(i)){removed[i]=1;queue[tail++]=i;}};
 for(let x=0;x<w;x++){visit(x);visit((h-1)*w+x)}for(let y=0;y<h;y++){visit(y*w);visit(y*w+w-1)}
 for(const [x,y] of openings[key]||[]){const i=Math.floor(y*h)*w+Math.floor(x*w);if(!white(i))throw Error('Opening seed is not background: '+key);visit(i);}
 while(head<tail){const i=queue[head++],x=i%w;if(x>0)visit(i-1);if(x<w-1)visit(i+1);if(i>=w)visit(i-w);if(i<w*(h-1))visit(i+w);}
 // Trace the actual pixel boundary, including holes and bottom notches, rather than its row-wise hull.
 const edges=new Map(),stride=w+1,solid=(x,y)=>x>=0&&x<w&&y>=0&&y<h&&!removed[y*w+x];
 function edge(x1,y1,x2,y2){const start=y1*stride+x1,end=y2*stride+x2;const next=edges.get(start)||[];next.push(end);edges.set(start,next);}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(solid(x,y)){
 if(!solid(x,y-1))edge(x,y,x+1,y);if(!solid(x+1,y))edge(x+1,y,x+1,y+1);if(!solid(x,y+1))edge(x+1,y+1,x,y+1);if(!solid(x-1,y))edge(x,y+1,x,y);
 }
 const loops=[];
 while(edges.size){const start=edges.keys().next().value;let cursor=start;const points=[];
 do{points.push([cursor%stride,Math.floor(cursor/stride)]);const list=edges.get(cursor);if(!list)throw Error('Open contour '+key);const end=list.pop();if(!list.length)edges.delete(cursor);cursor=end;}while(cursor!==start);
 let area=0;for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];area+=a[0]*b[1]-b[0]*a[1];}
 if(Math.abs(area)<60)continue;
 points.push(points[0]);const simple=simplify(points);loops.push('M'+simple.map(p=>p.join(',')).join(' L')+' Z');
 }
 paths[key]=loops.join(' ');report.push({key,contours:loops.length,removedPixels:tail,pathBytes:paths[key].length});
 }fs.writeFileSync(root+'silhouettes.js','/* Full vector contours: original artwork stays unchanged; empty openings remain transparent. */\nconst productSilhouettes = '+JSON.stringify(paths,null,2)+';\n');console.log(JSON.stringify(report,null,2));})();

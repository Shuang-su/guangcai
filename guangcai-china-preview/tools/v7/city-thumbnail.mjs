import sharp from 'sharp';

// Resize the complete R plane first, then assemble RGBA at that exact size.
// Joining an unscaled alpha plane after sharp.resize() crops/misaligns it.
export async function cityThumbnail(mask) {
 const {data,info}=await sharp(mask).extractChannel(0).resize(560,244,{fit:'inside'}).raw().toBuffer({resolveWithObject:true});
 const rgba=Buffer.alloc(info.width*info.height*4);
 for(let i=0;i<info.width*info.height;i++){
  rgba[i*4]=191;rgba[i*4+1]=141;rgba[i*4+2]=48;
  rgba[i*4+3]=data[i]; // R is the complete architectural linework.
 }
 return sharp(rgba,{raw:{width:info.width,height:info.height,channels:4}})
  .webp({lossless:true}).toBuffer();
}

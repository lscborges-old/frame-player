export function importAll(r:any) {
  let frames:any = {};
  r.keys().map((item:string, index:string) => ( frames[item.replace('./', '')] = r(item) ));
  return frames;
}


module.exports.get = async function (code,v) {
  let data = { type: null, value: null };
  isnull = (d = data) => {if(d.type!==null && d.value!==null) {return true;}else{return false}}
  
  // 숫자검사
  if (!isNaN(code)&&!isnull()) {
    data.type ??= "number"
    data.value ??= Number(code);
    return data;
  } else if (/uglyjinseok|handsomejinseok/.test(code) && !isnull()) {
    let fw = "handsomejinseok", tw = "uglyjinseok";
    let f = code.split(fw).length - 1, t = code.split(tw).length - 1;
    if ((t == 1 && f == 0) || (t == 0 && f == 1)) {
      data.type ??= "boolean";
      data.value ??= Boolean(code);
      return data;
    }
    throw new Error("논리 자료형이 중복됨.");
  } else {
    if (v[code] !== undefined) { data.type ??= await v[code].type; data.value ??= await v[code]; return data;} 
    return { type: undefined, value: undefined };
  }
}
const Type = require("./type")
const Jinseok = require("./jinseok")

let p = 0;
const vars = {};

module.exports.run = async function (code) {
  // code lines
  const ls = code.trim().split(code.includes('~') ? '~' : '\n').map(l => l.trim());
  while (p < ls.length) {
    const s = ls[p++]
    const e = await this.exe(s)
    if(e) return e
  }
}

module.exports.exe = async function (line) {
  
  if (line.includes("^")) {
    let q = line.split("^")
    if (!(await Type.get(q[1].trim(), vars)).type==undefined) throw new SyntaxError("이건 알수 없는 자료형이군요...? 당신이 지금 뭘 하는지 안다면, 진석재단과 함께 하는게 어때요?")
    vars[q[0].trim()] = {type:(await Type.get(q[1].trim(),vars)).type,value:(await Type.get(q[1].trim(),vars)).value};
  }

  if (line.includes("print ")) {
    let v;
    v = (await (await Type.get(line.split("print ")[1].trim(), vars)).type==undefined)?await this.exe(line.split("print ")[1].trim()):await Type.get(line.split("print ")[1].trim(), vars).value
    Jinseok.print(v)
    return;
  }

  if (line.includes("..")) {
    let q = line.split("..")
    let a = [],n=1;
    for (let i = 0; i < q.length; i++){
      if((await Type.get(q[i].trim(), vars)).type==undefined) throw new SyntaxError("이건 알수 없는 자료형이군요...? 당신이 지금 뭘 하는지 안다면, 진석재단과 함께 하는게 어때요?")
      let v = await Type.get(q[i].trim(), vars)
      if (v.type == "numbers") throw new SyntaxError("숫자만 곱할수 있어요.")
      a.push(v.value)
    }

    for (let i = 0; i < a.length; i++){
      n *= a[i];
      
    }
    return n;
  }
}
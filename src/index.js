const fs = require("fs")
Interpreter = require("./interpreter")

module.exports.file = async function (filename) {
  if(!filename.endsWith(".jinseok")) throw new Error("진석이가 파일을 읽지 못함: 진석이가 알아먹지 못하는 확장자입니다.")
  try {
    let file = await fs.readFileSync(filename);
    Interpreter.run(file.toString());
  } catch (e) {
    console.log(e)
    throw new Error("진석이가 파일을 읽지 못함: 파일이 존재하지 않거나 읽을수 없습니다.")
  }
}
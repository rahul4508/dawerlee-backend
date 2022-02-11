const path =require("path");
const  fs = require("fs");
// import  fileType from "file-type"
var fileType = require('detect-file-type');
async function base64ToFile(
  base64,
  userId,
  folderName,
  fileNameWithOutExtension
) { 
  const audioBuffer = new Buffer.from(base64.split(',')[1], "base64");
  // console.log("buffer", audioBuffer);
  let extention; 
   await fileType.fromBuffer(audioBuffer,function(err, result) {
 
    if (err) {
      return console.log(err);
    }
    extention=result;
    console.log('ext===',result); // { ext: 'jpg', mime: 'image/jpeg' }
  });
  // console.log("extension", extention);
  const filePath = path.resolve(`./public/media/${folderName}/${userId}`);
  const fileName = fileNameWithOutExtension
    ? `${fileNameWithOutExtension}.${extention.ext}`
    : `${userId}-${Date.now()}.${extention.ext}`;

  const localPath = `${filePath}`;
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath, { recursive: true });
  }

  fs.writeFileSync(`${localPath}/${fileName}`, audioBuffer, "utf8");

  const url = `${process.env.BASEURL}/media/${folderName}/${userId}/${fileName}`;
  return url;
}

module.exports = base64ToFile;
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

export const qrGenerator = async(uuid: string)=>{
  
  const token = jwt.sign({uuid: uuid}, process.env.QR_SECRET!)
  const qrUrl = `https://tcsummit-back.onrender.com/api/tickets/validate?token=${token}`;
  const qrImage = await QRCode.toDataURL(qrUrl);

  console.log("LINK QR: ", qrUrl)

  return qrImage;
}
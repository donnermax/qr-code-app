import React from "react";
import QRCode from "react-qr-code";

const QRCodeCanvas = ({ value, size = 256 }) => {
  return <QRCode value={value} size={size} />;
};

export default QRCodeCanvas;

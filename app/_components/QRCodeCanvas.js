import React from "react";
import QRCode from "react-qr-code";

const QRCodeCanvas = ({ value, size = 256 }) => {
  return <QRCode className="mx-auto" value={value} size={size} />;
};

export default QRCodeCanvas;

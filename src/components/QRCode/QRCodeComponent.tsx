import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeComponentProps {
  value: string;
  size?: number; // Optional size for the QR code
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ value, size = 128 }) => {
  return (
    <div style={{ padding: '16px', backgroundColor: 'white' }}>
      <QRCode value={value} size={size} />
    </div>
  );
};

export default QRCodeComponent;

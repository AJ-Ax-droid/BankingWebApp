import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useUser } from '../UserContext'; // Assuming you have a UserContext for user data

export default function QRGenerator() {
  // Example data: UPI payment link
  const { user, currentAccount } = useUser();
  const upiData = `upi://pay?isBMBPayment=true&pa=${currentAccount.accountNo}&pn=${user?.firstName + " " + user?.lastName}&cu=INR&tn=TestPayment`;

  return (
    <div className="p-4 text-center">
      <QRCodeCanvas
        value={upiData}      // yaha apna data ya UPI link do
        size={256}           // QR size
        level={"H"}          // error correction level
        includeMargin={true} // margin add karega
      />
      <p className="mt-4">Scan this QR to pay</p>
    </div>
  );
}

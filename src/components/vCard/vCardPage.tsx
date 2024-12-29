import React from 'react';
import { saveAs } from 'file-saver';
import { generateVCard } from './generateVCard';
import './vCardPage.module.css'; // Import your CSS file

const VCardPage: React.FC = () => {
  const handleDownload = () => {
    const vCardString = generateVCard();
    const blob = new Blob([vCardString], { type: 'text/vcard' });
    saveAs(blob, 'contact.vcf');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body text-center">
                  {/* <img src="../../images/quantumhub.svg" alt="Logo" className="img-fluid mb-3" style={{ maxWidth: '150px' }} /> */}
          <h1 className="card-title">Denise James, CEO</h1>
          <h2 className="card-subtitle mb-3">Quantum Computer Learning</h2>
          <p>Email: <a href="mailto:denisetoo@gmail.com">denisetoo@gmail.com</a></p>
          <p>Phone: <a href="tel:+15102489518">510-248-9518</a></p>
          <p>Address: 1623 W Fulton St, Chicago, IL 60612</p>
          <button className="btn btn-primary mt-3" onClick={handleDownload}>Download vCard</button>
        </div>
      </div>
    </div>
  );
};

export default VCardPage;

import React from 'react';
import '../../styles/ViewMoreModal.css';

const ViewMoreModal = ({ photos, onClose }) => {
  // Split photos into groups of 3 for the layout
  const rows = [];
  for (let i = 0; i < photos.length; i += 3) {
    rows.push(photos.slice(i, i + 3));
  }

  return (
    <div className="view-more-modal-overlay" onClick={onClose}>
      <div className="view-more-modal" onClick={(e) => e.stopPropagation()}>
        <span className="view-more-modal-close" onClick={onClose}>&times;</span>
        <div className="title"><strong>Photos</strong> <strong>Listing ID: <span>BRSABCDEFGH</span></strong></div>
        <div className="view-more-photos">
          {rows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.length > 0 && (
                <div className="fcol">
                  <img src={row[0]} alt={`Photo ${rowIndex * 3 + 1}`} className="bigimage" />
                </div>
              )}
              <div className="scol">
                {row.length > 1 && (
                  <div className="fimage">
                    <img src={row[1]} alt={`Photo ${rowIndex * 3 + 2}`} />
                  </div>
                )}
                {row.length > 2 && (
                  <div className="secImage">
                    <img src={row[2]} alt={`Photo ${rowIndex * 3 + 3}`} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMoreModal;

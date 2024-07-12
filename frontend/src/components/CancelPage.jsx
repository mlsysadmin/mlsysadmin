import React, { useState } from 'react';
import ConfirmCancelApplication from './ConfirmCancelApplication';
import CancelApplicationModal from './CancelApplicationModal';
import ConfirmationSuccess from './ConfirmationSuccess';

const ApplicationCancellation = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const handleCancelOpen = () => setIsCancelModalOpen(true);
  const handleCancelClose = () => setIsCancelModalOpen(false);

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    setIsCancelModalOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => setIsConfirmOpen(false);

  const handleConfirm = () => {
    console.log(`Cancellation confirmed for reason: ${selectedReason}`);
    setIsConfirmOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessClose = () => setIsSuccessModalOpen(false);

  return (
    <div>
      <button onClick={handleCancelOpen}>Cancel Application</button>

      <CancelApplicationModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelClose}
        onReasonSelect={handleReasonSelect}
      />

      <ConfirmCancelApplication
        isOpen={isConfirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleConfirmClose}
      />

      {isSuccessModalOpen && (
        <ConfirmationSuccess setIsSuccessModalOpen={setIsSuccessModalOpen} />
      )}
    </div>
  );
};

export default ApplicationCancellation;


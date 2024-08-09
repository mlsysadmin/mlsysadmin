import React, { useContext, useEffect, useState } from "react";
import "../../styles/support/approvalSection.css";

import SemiRoundBtn from "../custom/buttons/SemiRoundBtn.custom";
import TextArea from "antd/es/input/TextArea";

const ApprovalSectionComponent = () => {

    const [listingLevel, setLevel] = useState(1);

    useEffect(() => {

    }, [])

    const approvalList = [
        {
            noted_by: '',
            date_approved: '',
            remarks: 'asdsfg',
            level: 1,
            status: 'Pending'
        },
        {
            noted_by: '',
            date_approved: '',
            remarks: '',
            level: 2,
            status: 'Pending'
        },
        {
            noted_by: '',
            date_approved: '',
            remarks: '',
            level: 3,
            status: 'Pending'
        },
    ]

    const ApprovalListItems = () => approvalList.map((item, index) => {

        const enableApproval = item.status === 'Pending' && listingLevel === item.level;

        return (
            <div className="support-approval--content-item" key={index}>
                <div className="support-approval--content-item-header">
                    <h3>Level {index + 1} Approval</h3>
                </div>
                <div className="support-approval--content-item-body">
                    <div className="support-approval--item-noted">
                        <p>
                            {
                                index === 0 ? 'Noted by: ' : 'Approver: '
                            }
                        </p>
                        <p>{item.noted_by}</p>
                    </div>
                    <div className="support-approval--item-date">
                        <p>Date Approved:</p>
                        <p>{item.date_approved}</p>
                    </div>
                </div>
                <div className="support-approval--content-item-actions">
                    <div className="support-approval--content-item-input">
                        <TextArea 
                        placeholder="Enter Remarks" 
                        rows={4} 
                        defaultValue={item.remarks} 
                        readOnly={!enableApproval}
                        />
                    </div>
                    {
                        enableApproval ? (
                            <div className="support-approval--content-item-buttons">
                                <SemiRoundBtn
                                    type={'primary'}
                                    label={'Approve'}
                                    className={'approve-btn'} />
                                <SemiRoundBtn
                                    type={'primary'}
                                    label={'Denied'}
                                    className={'denied-btn'} />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        )
    });

    return (
        <div className="support-approval--wrapper">
            <div className="support-approval--header">
                <h2>Approval Section</h2>
            </div>
            <div className="support-approval--content">
                <ApprovalListItems />
            </div>
        </div>
    );
};

export default ApprovalSectionComponent;

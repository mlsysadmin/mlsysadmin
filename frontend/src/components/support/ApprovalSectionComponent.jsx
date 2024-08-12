import React, { useContext, useEffect, useState } from "react";
import "../../styles/support/approvalSection.css";

import SemiRoundBtn from "../custom/buttons/SemiRoundBtn.custom";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../Context/AuthContext";
import DayJS from "dayjs";

const ApprovalSectionComponent = (props) => {
    const { approvals, level, isEditListing, isShowDetails } = props;
    const { userDetails } = useAuth();

    const [listingLevel, setLevel] = useState(0);

    useEffect(() => {
        setLevel(level);
        console.log("approvals", approvals);

    }, [level])
    function fullName(approver) {
        return `${approver.first_name} ${approver.middle_name} ${approver.last_name}`;
    }

    function dateApproved(date) {
        if (!date) {
            return date
        }
        return DayJS('2024-07-16 08:52:37').format('MM/DD/YYYY hh:mm A');
    }

    const ApprovalListItems = () => approvals.slice(0, 3).map((approval, index) => {

        const approver = approval.approver;
        const enableApproval = approval.approval_status === 'PENDING' && listingLevel === approver.level;

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
                        <p>{fullName(approver)}</p>
                    </div>
                    <div className="support-approval--item-date">
                        <p>Date Approved:</p>
                        <p>{dateApproved(approval.approval_date)}</p>
                    </div>
                </div>
                <div className="support-approval--content-item-actions">
                    <div className="support-approval--content-item-input">
                        <TextArea
                            placeholder="Enter Remarks"
                            rows={4}
                            defaultValue={approval.remarks}
                            readOnly={!enableApproval}
                            disabled={isShowDetails && isEditListing}
                        />
                    </div>
                    {
                        enableApproval ? <div className="support-approval--content-item-buttons">
                            <SemiRoundBtn
                                type={'primary'}
                                label={'Approve'}
                                className={'approve-btn'}
                                disabled={isShowDetails && isEditListing} />
                            <SemiRoundBtn
                                type={'primary'}
                                label={'Denied'}
                                className={'denied-btn'} 
                                disabled={isShowDetails && isEditListing}/>
                        </div> : null
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

import React, { useState } from "react";
import { getFeatureItems } from "../../../utils/CertainFeature.utils";
import "../../../styles/custom.css"

const CertainFeatureMenu = () => {
    const { itemsA, itemsB, itemsC, itemsD, itemsE, itemsF, itemsG, itemsJ, itemsL, itemsM, itemsO, itemsP, itemsR, itemsS, itemsT, itemsW, items09 } = getFeatureItems();
    const [checkedStateA, setCheckedStateA] = useState(new Array(itemsA.length).fill(false));
    const [checkedStateB, setCheckedStateB] = useState(new Array(itemsB.length).fill(false));
    const [checkedStateC, setCheckedStateC] = useState(new Array(itemsC.length).fill(false));
    const [checkedStateD, setCheckedStateD] = useState(new Array(itemsD.length).fill(false));
    const [checkedStateE, setCheckedStateE] = useState(new Array(itemsE.length).fill(false));
    const [checkedStateF, setCheckedStateF] = useState(new Array(itemsF.length).fill(false));
    const [checkedStateG, setCheckedStateG] = useState(new Array(itemsG.length).fill(false));
    const [checkedStateJ, setCheckedStateJ] = useState(new Array(itemsJ.length).fill(false));
    const [checkedStateL, setCheckedStateL] = useState(new Array(itemsL.length).fill(false));
    const [checkedStateM, setCheckedStateM] = useState(new Array(itemsM.length).fill(false));
    const [checkedStateO, setCheckedStateO] = useState(new Array(itemsO.length).fill(false));
    const [checkedStateP, setCheckedStateP] = useState(new Array(itemsP.length).fill(false));
    const [checkedStateR, setCheckedStateR] = useState(new Array(itemsR.length).fill(false));
    const [checkedStateS, setCheckedStateS] = useState(new Array(itemsS.length).fill(false));
    const [checkedStateT, setCheckedStateT] = useState(new Array(itemsT.length).fill(false));
    const [checkedStateW, setCheckedStateW] = useState(new Array(itemsW.length).fill(false));
    const [checkedState09, setCheckedState09] = useState(new Array(items09.length).fill(false));

    const handleCheckboxChange = (index, setCheckedState, items) => {
        setCheckedState((prevState) =>
            prevState.map((checked, i) => (i === index ? !checked : checked))
        );
    };

    const labeledItems = [
        { label: 'A', items: itemsA },
        { label: 'B', items: itemsB },
        { label: 'C', items: itemsC },
        { label: 'D', items: itemsD },
        { label: 'E', items: itemsE },
        { label: 'F', items: itemsF },
        { label: 'G', items: itemsG },
        { label: 'J', items: itemsJ },
        { label: 'L', items: itemsL },
        { label: 'M', items: itemsM },
        { label: 'O', items: itemsO },
        { label: 'P', items: itemsP },
        { label: 'R', items: itemsR },
        { label: 'S', items: itemsS },
        { label: 'T', items: itemsT },
        { label: 'W', items: itemsW },
        { label: '0-9', items: items09 }
    ];

    return (
        <div className="certain-feature-menu-container">
            {labeledItems.map(({ label, items }, index) => (
                <div className="search-certain-features" key={index}>
                    <span className="certain-feature-label">{label}:</span>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
                        {items.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                style={{
                                    margin: '8px',
                                    borderRadius: '4px',
                                    color: 'black'
                                }}
                            > &nbsp; &nbsp; &nbsp;
                                <input
                                    type="checkbox"
                                    checked={
                                        label === 'A'
                                            ? checkedStateA[itemIndex]
                                            : label === 'B'
                                                ? checkedStateB[itemIndex]
                                                : label === 'C'
                                                    ? checkedStateC[itemIndex]
                                                    : label === 'D'
                                                        ? checkedStateD[itemIndex]
                                                        : label === 'E'
                                                            ? checkedStateE[itemIndex]
                                                            : label === 'F'
                                                                ? checkedStateF[itemIndex]
                                                                : label === 'G'
                                                                    ? checkedStateG[itemIndex]
                                                                    : label === 'J'
                                                                        ? checkedStateJ[itemIndex]
                                                                        : label === 'L'
                                                                            ? checkedStateL[itemIndex]
                                                                            : label === 'M'
                                                                                ? checkedStateM[itemIndex]
                                                                                : label === 'O'
                                                                                    ? checkedStateO[itemIndex]
                                                                                    : label === 'P'
                                                                                        ? checkedStateP[itemIndex]
                                                                                        : label === 'R'
                                                                                            ? checkedStateR[itemIndex]
                                                                                            : label === 'S'
                                                                                                ? checkedStateS[itemIndex]
                                                                                                : label === 'T'
                                                                                                    ? checkedStateT[itemIndex]
                                                                                                    : label === 'W'
                                                                                                        ? checkedStateW[itemIndex]
                                                                                                        : label === '0-9'
                                                                                                            ? checkedState09[itemIndex]
                                                                                                            : false
                                    }
                                    onChange={() =>
                                        handleCheckboxChange(
                                            itemIndex,
                                            label === 'A'
                                                ? setCheckedStateA
                                                : label === 'B'
                                                    ? setCheckedStateB
                                                    : label === 'C'
                                                        ? setCheckedStateC
                                                        : label === 'D'
                                                            ? setCheckedStateD
                                                            : label === 'E'
                                                                ? setCheckedStateE
                                                                : label === 'F'
                                                                    ? setCheckedStateF
                                                                    : label === 'G'
                                                                        ? setCheckedStateG
                                                                        : label === 'J'
                                                                            ? setCheckedStateJ
                                                                            : label === 'L'
                                                                                ? setCheckedStateL
                                                                                : label === 'M'
                                                                                    ? setCheckedStateM
                                                                                    : label === 'O'
                                                                                        ? setCheckedStateO[itemIndex]
                                                                                        : label === 'P'
                                                                                            ? setCheckedStateP[itemIndex]
                                                                                            : label === 'R'
                                                                                                ? setCheckedStateR[itemIndex]
                                                                                                : label === 'S'
                                                                                                    ? setCheckedStateS[itemIndex]
                                                                                                    : label === 'T'
                                                                                                        ? setCheckedStateT[itemIndex]
                                                                                                        : label === 'W'
                                                                                                            ? setCheckedStateW[itemIndex]
                                                                                                            : label === '0-9'
                                                                                                                ? setCheckedState09[itemIndex]

                                                                                                                : () => { }
                                            , items)
                                    }
                                />
                                <span className="feature-name">{item.feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CertainFeatureMenu;
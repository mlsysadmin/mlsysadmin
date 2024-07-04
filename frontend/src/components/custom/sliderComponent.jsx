import React, { useState } from 'react';
import { Slider } from 'antd';
import Ellipse1 from '../../asset/icons/Ellipse 148.png';
import Ellipse2 from '../../asset/icons/Ellipse 149.png';
import Ellipse3 from '../../asset/icons/Ellipse 151.png';

function App() {
  const [sliderValue, setSliderValue] = useState(0);

  // Handle slider change
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  // Example calculations based on slider value (replace with your logic)
  const principalAndInterest = 8256.10 + sliderValue * 10; // Example calculation
  const propertyTaxes = 2548.79 + sliderValue * 5; // Example calculation
  const homeownersInsurance = 350 + sliderValue * 1; // Example calculation

  return (
    <div>
      <Slider
        defaultValue={0}
        max={100}
        onChange={handleSliderChange}
        style={{ width: '50%', margin: '20px auto' }}
      />

      <div className="interest-values">
        <div className="interest-description">
          <div className="interest">
            <p>
              <img src={Ellipse1} alt="" /> Principal and Interest
            </p>
          </div>
          <div className="interest">
            <p>
              <img src={Ellipse2} alt="" /> Property Taxes
            </p>
          </div>
          <div className="interest">
            <p>
              <img src={Ellipse3} alt="" /> Homeowners Insurance
            </p>
          </div>
        </div>
        <div className="value-percentage">
          <div className="interest">
            <p>PHP {principalAndInterest.toFixed(2)} ({((principalAndInterest / (principalAndInterest + propertyTaxes + homeownersInsurance)) * 100).toFixed(0)}%)</p>
          </div>
          <div className="interest">
            <p>PHP {propertyTaxes.toFixed(2)} ({((propertyTaxes / (principalAndInterest + propertyTaxes + homeownersInsurance)) * 100).toFixed(0)}%)</p>
          </div>
          <div className="interest">
            <p>PHP {homeownersInsurance.toFixed(2)} ({((homeownersInsurance / (principalAndInterest + propertyTaxes + homeownersInsurance)) * 100).toFixed(0)}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react';

// Components
import { Header, Input, MultiInput } from "../index"
import { API_ENDPOINT } from '../../constant/constant'
import { successToastify, errorToastify } from "../../helper/toast"
import { config } from "../../utils/bankRole"
import { criteriaSchema } from "../../utils/validationSchema"
import { useStateContext } from '../../contexts/ContextProvider';

// Library
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// CSS
import "./Criteria.css"

const CriteriaForm = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate()
  const [step, setStep] = useState(1);

  const [muleHigher, setMuleHigher] = useState('');
  const [muleLower, setMuleLower] = useState('');
  const [moneyMule, setMoneyMule] = useState('');
  const [aCriteria, setACriteria] = useState('');
  const [bCriteria, setBCriteria] = useState('');
  const [cCriteria, setCCriteria] = useState('');
  const [dCriteriaUpper, setDCriteriaUpper] = useState('');
  const [dCriteriaLower, setDCriteriaLower] = useState('');
  const [eCriteria, setECriteria] = useState('');
  const [fCriteria, setFCriteria] = useState('');
  const [gCriteria, setGCriteria] = useState('');
  const [jCriteria, setJCriteria] = useState('');
  const [kCriteria, setKCriteria] = useState('');
  const [lCriteria, setLCriteria] = useState('');
  const [mCriteria, setMCriteria] = useState('');
  const [oCriteria, setOCriteria] = useState('');
  const [pCriteria, setPCriteria] = useState('');
  const [qCriteria, setQCriteria] = useState('');
  const [yCriteria, setYCriteria] = useState('');
  const [zCriteria, setZCriteria] = useState('');

  const [residencyCountries, setResidencyCountries] = useState([]);
  const [codeNotToUse, setCodeNotToUse] = useState([]);
  const [onlineDC, setOnlineDC] = useState([]);
  const [debitCardList, setDebitCardList] = useState([]);
  const [subOfficeList, setSubOfficeList] = useState([]);
  const [highRiskJurisidctionCountries, setHighRiskJurisidctionCountries] = useState([]);

  const [isCriteria, setIsCriteria] = useState(false)
  const [criteriaId, SetCriteriaId] = useState("")


  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const checkCriteria = useCallback(async () => {
    let bank = localStorage.getItem("bankId");
    
    try {
      const response = await axios.get(`${API_ENDPOINT}/check-criteria/${bank}`);
      setIsCriteria(response.data?.checkCriteria[0]?.isCriteria)
      SetCriteriaId(response.data?.checkCriteria[0]?.id)
    } catch (error) {
      console.error(error); // Log any errors
    }
  }, []); // Add any dependencies if needed

  // useEffect to call checkCriteria on component mount
  useEffect(() => {
    checkCriteria();
  }, [checkCriteria]); 
 
  const handleSubmit = async (e) => {
  e.preventDefault(); 
  const bank = localStorage.getItem("bankId");

  // Define the request body to avoid repetition
  const requestBody = {
    muleHigher, muleLower, moneyMule, aCriteria, bCriteria,
    cCriteria, dCriteriaUpper, dCriteriaLower, eCriteria,
    fCriteria, gCriteria, jCriteria, kCriteria, lCriteria,
    mCriteria, oCriteria, pCriteria, qCriteria, yCriteria,
    zCriteria, onlineDC, debitCardList, subOfficeList, highRiskJurisidctionCountries,
    bank, residencyCountries, codeNotToUse
  };

  try {
    if (!isCriteria) {
      // If isCriteria is false, perform a POST request (to create criteria)
      const result = await axios.post(`${API_ENDPOINT}/set-aml-criteria`, requestBody, config);
      successToastify(result?.data?.message); // Show success toast
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      // If isCriteria is true, perform a PUT request (to update existing criteria)
      const result = await axios.put(`${API_ENDPOINT}/update-aml-criteria/${criteriaId}`, requestBody, config);
      successToastify(result?.data?.message); // Show success toast
      navigate("/dashboard"); // Navigate to dashboard
    }
  } catch (error) {
    console.error(error);
    errorToastify(error?.response?.data?.message); // Show error toast
  }
};



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
      <Header category="Report Setting" title="Set Criteria" />
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <> 
           <Input
              label="Mule Higher"
              name="muleHigher"
              value={muleHigher}
              onChange={(e) => setMuleHigher(e.target.value)}
              type="number"
              required
            />
            <Input
              label="Mule Lower"
              name="muleLower"
              value={muleLower}
              onChange={(e) => setMuleLower(e.target.value)}
              type="number"
              required
            />
            <Input
              label="Money Mule"
              name="moneyMule"
              value={moneyMule}
              onChange={(e) => setMoneyMule(e.target.value)}
              type="number"
              step="0.01"
              required
            />
            <button
              type="button"
              style={{ backgroundColor: currentColor, color: "white" }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={nextStep}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="criteria-step2">
              <Input
                label="High Risk Transaction Amount"
                name="aCriteria"
                value={aCriteria}
                onChange={(e) => setACriteria(e.target.value)}
                type="number"
                step="0.01"
                required
              />
              <Input
                label="National from a high-risk jurisdiction Amount"
                name="bCriteria"
                value={bCriteria}
                onChange={(e) => setBCriteria(e.target.value)}
                type="number"
                step="0.01"
                required
              />
              <Input
                label="Cash Lodgements Amount"
                name="cCriteria"
                value={cCriteria}
                onChange={(e) => setCCriteria(e.target.value)}
                type="number"
                step="0.01"
                required
              />
              <Input
                label="EFT Lodgements Maximum Amount"
                name="dCriteriaUpper"
                value={dCriteriaUpper}
                onChange={(e) => setDCriteriaUpper(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="EFT Lodgements Minimum Amount"
                name="dCriteriaLower"
                value={dCriteriaLower}
                onChange={(e) => setDCriteriaLower(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Minor Account Lodgements Amount"
                name="eCriteria"
                value={eCriteria}
                onChange={(e) => setECriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Sub-office Lodgements Value"
                name="fCriteria"
                value={fCriteria}
                onChange={(e) => setFCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Counter New Member Lodgements Value"
                name="gCriteria"
                value={gCriteria}
                onChange={(e) => setGCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Unemployed Lodgements"
                name="jCriteria"
                value={jCriteria}
                onChange={(e) => setJCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Large Cash Withdrawals"
                name="kCriteria"
                value={kCriteria}
                onChange={(e) => setKCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Multiple Large Cash Transactions"
                name="lCriteria"
                value={lCriteria}
                onChange={(e) => setLCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="High-Value Wire Transfers"
                name="mCriteria"
                value={mCriteria}
                onChange={(e) => setMCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Foreign Exchange Transactions"
                name="oCriteria"
                value={oCriteria}
                onChange={(e) => setOCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="High-Frequency Trading Activity"
                name="pCriteria"
                value={pCriteria}
                onChange={(e) => setPCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Large Inbound Transactions"
                name="qCriteria"
                value={qCriteria}
                onChange={(e) => setQCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Large Cash Transactions with No Apparent Purpose"
                name="yCriteria"
                value={yCriteria}
                onChange={(e) => setYCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
              <Input
                label="Suspicious Activity Patterns"
                name="zCriteria"
                value={zCriteria}
                onChange={(e) => setZCriteria(e.target.value)}
                type="number"
                step="0.01"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                style={{ backgroundColor: currentColor, color: "white" }}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                style={{ backgroundColor: currentColor, color: "white" }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <MultiInput
              label="Debit Card Lists"
              placeholder="Enter a debit card and press Enter"
              name="debitCardList"
              arrayData={debitCardList}
              setArrayData={setDebitCardList}
            />
            <MultiInput
              label="Online DC"
              placeholder="Enter a value and press Enter"
              name="onlineDC"
              arrayData={onlineDC}
              setArrayData={setOnlineDC}
            />
            <MultiInput
              label="Sub Office List"
              placeholder="Enter a sub office list and press Enter"
              name="subOfficeList"
              arrayData={subOfficeList}
              setArrayData={setSubOfficeList}
            />
            <MultiInput
              label="High Risk Jurisidction Countries"
              placeholder="Enter a country and press Enter"
              name="highRiskJurisidctionCountries"
              arrayData={highRiskJurisidctionCountries}
              setArrayData={setHighRiskJurisidctionCountries}
            />
            <MultiInput
              label="Residency Countries"
              placeholder="Enter a value and press Enter"
              name="residencyCountries"
              arrayData={residencyCountries}
              setArrayData={setResidencyCountries}
            />


            <MultiInput
              type="number"
              label="Codes Not To Use"
              placeholder="Enter a value and press Enter"
              name="codeNotToUse"
              arrayData={codeNotToUse}
              setArrayData={setCodeNotToUse}
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="submit"
                style={{ backgroundColor: currentColor, color: "white" }}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CriteriaForm;
import React, { useState } from 'react';
import axios from 'axios';

const EmploymentVerificationForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/verify-employment', {
        employeeId: Number(employeeId),
        companyName,
        verificationCode,
      });

      setVerificationResult(response.data.verified ? 'Verified' : 'Not Verified');
    } catch (error) {
      console.error('Error verifying employment:', error);
      setVerificationResult('Error occurred during verification');
    }
  };

  return (
    <div>
      <h1>Employment Verification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
};

export default EmploymentVerificationForm;

import React, { useState, useEffect } from 'react';

const ScoreSheet = ({ memberInfo, results, setCategoryScores, setScoreSheetModalOpen }) => {
  const [finalMessage, setFinalMessage] = useState({
    memberInfoText: '',
    membersUnit: '',
    categoryText: [],
    overallText: '',
    status: ''
  });
  const [status, setStatus] = useState('Passed');
  
  useEffect(() => {
    // Process category counts and correct answers
    const categoryCounts = results.reduce((acc, curr) => {
      const { categoty: category, result } = curr;  // Assuming typo is intentional
      if (!acc[category]) {
        acc[category] = { total: 0, correct: 0 };
      }
      acc[category].total += 1;
      if (result === 'correct') {
        acc[category].correct += 1;
      }
      return acc;
    }, {});

    // Calculate percentages for each category
    const categoryPercentages = Object.entries(categoryCounts).map(([category, { total, correct }]) => {
      const percentage = (correct / total) * 100;
      return {
        category,
        percentage: percentage.toFixed(2) // Round to 2 decimal places
      };
    });

    // Calculate overall percentage of correct answers
    const totalQuestions = results.length;
    const totalCorrect = results.filter(r => r.result === 'correct').length;
    const overallPercentage = ((totalCorrect / totalQuestions) * 100).toFixed(2);

    // Map category names to readable labels
    const categoryLabels = {
      'general': 'General Knowledge',
      'map/diagram': 'Map Knowledge',
      'incursion': 'Incursion Knowledge',
      'communication': 'Communication Knowledge'
    };

    // Build category messages as array of objects for table rows
    const categoryMessage = categoryPercentages.map(({ category, percentage }) => {
      const label = categoryLabels[category] || category;
      return { label, percentage };
    });

    // Check pass/fail logic
    let currentStatus = "Passed";
    categoryPercentages.forEach(({ category, percentage }) => {
      const parsedPercentage = parseFloat(percentage);
      if (
        (category !== 'general' && parsedPercentage < 100) ||
        (category === 'general' && parsedPercentage < 80)
      ) {
        currentStatus = "Failed";
      }
    });

    // Set final message
    setFinalMessage({
      memberInfoText: `${memberInfo.rank} ${memberInfo.name}`,
      categoryText: categoryMessage,
      overallText: `Overall Correct Answers: `,
      overallScore: overallPercentage, // Save just the score for styling
      status: `${currentStatus}`
    });
    setStatus(currentStatus);

    // Set category scores
    setCategoryScores(categoryCounts);
  }, [memberInfo, results, setCategoryScores]);

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h6 style={{margin: '0 0 30px 0'}} >Air Field Driving Score</h6>
        <div className='score-sheet'>
          <div className='member-info'>
            <p className='member-name'>{finalMessage.memberInfoText}</p>
            <p className='member-unit'>{memberInfo.unit}</p>
          </div>
          
          {/* Display Categories and Scores in a Table */}
          <table className="score-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {finalMessage.categoryText.map(({ label, percentage }, index) => (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Display Overall and Status */}
          <p className='finalScoreTxt'>
            <span style={{ color: 'black' }}>Overall Correct Answers: </span>
            <span style={{ color: finalMessage.status === 'Failed' ? 'red' : 'blue' }}>
              {finalMessage.overallScore}%
            </span>
          </p>
          <p className='finalScoreTxt'>
            <span style={{ color: 'black' }}>Status: </span>
            <span style={{ color: finalMessage.status === 'Failed' ? 'red' : 'blue' }}>
              {finalMessage.status}
            </span>
          </p>
        </div>
        <button className='modal-button' onClick={() => {
          window.location.reload();
          setScoreSheetModalOpen(false);
        }}>Restart</button>
      </div>
    </div>
  );
};

export default ScoreSheet;

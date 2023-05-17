import React, { useState } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleButtonClick = state => {
    setFeedback(prevState => ({
      ...prevState,
      [state]: prevState[state] + 1,
    }));
  };

  const countPositiveFeedbackPercentage = () => {
    return parseInt((feedback.good / countTotalFeedback()) * 100);
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((acc, val) => acc + val, 0);
  };
  const { good, neutral, bad } = feedback;

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          handleButtonClick={handleButtonClick}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

export default App;

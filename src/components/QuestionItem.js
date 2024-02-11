import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteQuestion(id);
    });
  };

  const handleCorrectAnswerChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        onUpdateCorrectAnswer(id, newCorrectIndex);
      });
  };

  return (
    <div>
      <h3>{prompt}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <button onClick={handleDeleteClick}>Delete</button>
      <select
        value={correctIndex}
        onChange={handleCorrectAnswerChange}
      >
        {answers.map((_, index) => (
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default QuestionItem;

// HabitForm.js

import React, { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim() !== "") {
      const newHabit = {
        id: Date.now(),
        name: habitName
      };
      addHabit(newHabit);
      setHabitName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Enter habit name"
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;

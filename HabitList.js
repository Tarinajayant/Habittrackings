import React, { useEffect } from "react";
const HabitList = ({
  habits,
  deleteHabit,
  updateHabit,
  toggleHabitStatus,
  selectedDate,
  habitData,
  setHabitData
}) => {
  const habitDate = selectedDate.toISOString().split("T")[0];
  const habitRecords = habitData[habitDate] || {};

  useEffect(() => {
    const savedHabitData = localStorage.getItem("habitData");
    if (savedHabitData) {
      setHabitData(JSON.parse(savedHabitData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(habitData));
  }, [habitData]);

  useEffect(() => {
    const savedHabitData = localStorage.getItem("habitData");
    if (savedHabitData) {
      setHabitData(JSON.parse(savedHabitData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(habitData));
  }, [habitData]);

  return (
    <div>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input
              type="text"
              value={habit.name}
              onChange={(e) =>
                updateHabit(habit.id, { ...habit, name: e.target.value })
              }
            />
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Habit Data on {habitDate}</h3>
      <ul>
        {habits.map((habit) => {
          const habitKey = `${habit.id}_${habitDate}`;
          const habitCompleted = habitRecords[habitKey] || false;

          return (
            <li key={habitKey}>
              <label>
                <input
                  type="checkbox"
                  checked={habitCompleted}
                  onChange={() => toggleHabitStatus(habit.id)}
                />
                {habit.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitList;

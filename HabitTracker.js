import React, { useState, useEffect } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./habitTracker.css";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habitData, setHabitData] = useState({});

  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }

    const savedHabitData = localStorage.getItem("habitData");
    if (savedHabitData) {
      setHabitData(JSON.parse(savedHabitData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(habitData));
  }, [habitData]);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
  };

  const updateHabit = (habitId, updatedHabit) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? updatedHabit : habit
    );
    setHabits(updatedHabits);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleHabitStatus = (habitId) => {
    const habitDate = selectedDate.toISOString().split("T")[0];
    const habitKey = `${habitId}_${habitDate}`;

    setHabitData((prevData) => {
      const updatedData = { ...prevData };

      if (updatedData[habitDate]) {
        updatedData[habitDate][habitKey] = !updatedData[habitDate][habitKey];
      } else {
        updatedData[habitDate] = { [habitKey]: true };
      }

      return updatedData;
    });
  };

  return (
    <div className="habit-tracker-container">
      <h1 className="habit-tracker-title">Habit Tracker</h1>
      <div className="habit-form-container">
        <HabitForm addHabit={addHabit} />
      </div>
      <div className="habit-list-container">
        <HabitList
          habits={habits}
          deleteHabit={deleteHabit}
          updateHabit={updateHabit}
          toggleHabitStatus={toggleHabitStatus}
          selectedDate={selectedDate}
          habitData={habitData}
          setHabitData={setHabitData}
        />
      </div>
      <div className="calendar-container">
        <h2 className="calendar-title">Calendar</h2>
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default HabitTracker;

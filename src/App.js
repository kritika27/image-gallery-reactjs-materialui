import "./App.css";
import React, { useState } from "react";
import Title from "./Title";
import UpdateForm from "./UpdateForm";

function App() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterTodos = list.filter((todo) => {
    return todo.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Title onSearchChange={handleSearch} search={search} />

      <UpdateForm list={list} filterTodos={filterTodos} setList={setList} />
    </div>
  );
}

export default App;

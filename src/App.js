import "./App.css";
import React, { useState } from "react";
import Title from "./Title";
import UpdateForm from "./UpdateForm";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

function App() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const debounced = useDebouncedCallback((search) => {
    setSearch(search);
  }, 1000);

  const filterTodos = list.filter((todo) => {
    return todo.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Title
        onSearchChange={(e) => debounced.callback(e.target.value)}
        search={search}
      />

      <UpdateForm list={list} filterTodos={filterTodos} setList={setList} />
    </div>
  );
}

export default App;

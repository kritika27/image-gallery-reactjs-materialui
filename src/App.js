import React, { useState } from "react";
import Title from "./components/Title";
import UpdateForm from "./components/UpdateForm";
import Navbar from "./components/Navbar";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

const App = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const debounced = useDebouncedCallback((search) => {
    setSearch(search);
  }, 1000);

  const filterTodos = list.filter((todo) => {
    return todo.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Navbar
        onSearchChange={(e) => debounced.callback(e.target.value)}
        search={search}
      />
      <Title />
      <UpdateForm list={list} filterTodos={filterTodos} setList={setList} />
    </>
  );
};

export default App;

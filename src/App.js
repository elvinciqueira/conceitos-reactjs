import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepository] = useState([]);

  const loadRepository = async () => {
    const response = await api.get("repositories");

    const { data } = response;

    setRepository(data);
  };

  useEffect(() => {
    loadRepository();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const { data } = response;

    setRepository([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepository(repositories.filter((repository) => repository.id !== id));
    } catch (error) {
      alert("Erro ao deletar um repositório");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

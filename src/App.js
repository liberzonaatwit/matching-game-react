import React from "react";
import CountryCapitalGame from "./CountryCapitalGame";

const App = () => {
  // Sample data for testing
  const data = {
    France: "Paris",
    Japan: "Tokyo",
  };

  return (
    <div className="App">
      <CountryCapitalGame data={data} />
    </div>
  );
};

export default App;

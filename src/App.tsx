import { Routes, Route } from "react-router-dom";
import '@mantine/core/styles.css';
import Home from "./Components/Home";
import Movie from "./Components/Movie";
import People from "./Components/People";
import Layout from "./Components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/people" element={<People />} />
      </Route>
    </Routes>
  );
}

export default App;

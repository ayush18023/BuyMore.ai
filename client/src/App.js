import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Box } from '@mui/material'
import DataProvider, { DataContext } from "./context/DataProvider";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Filters from "./components/Filters/Filters";
function App() {
  return (
    <DataProvider className="App">
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: '55px', background: 'rgb(242, 242, 242)' }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:id' element={<Details />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/:name' element={<Filters />}></Route>
            <Route path='/:name/product/:id' element={<Details />}></Route>
          </Routes>
        </Box>
      </BrowserRouter>

    </DataProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <main className='px-5 pb-5 pt-2'>
          <Routes>
            <Route path='/home'>
              <Route
                path='discover'
                element={<Home />}
              />
            </Route>
            <Route
              path='/dashboard'
              element={<DashboardPage />}
            />
          </Routes>
        </main>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

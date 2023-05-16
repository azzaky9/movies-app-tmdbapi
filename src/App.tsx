import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/'
          element={
            <Layout>
              <main className='px-5 pb-5 pt-2'>
                <Routes>
                  <Route
                    path='/'
                    element={<Home />}>
                    <Route
                      path='dashboard'
                      element={<DashboardPage />}
                    />
                  </Route>
                </Routes>
              </main>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

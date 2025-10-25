import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "../layouts/PageNotFound";
import ThemeProvider from "../providers/ThemeProvider";
import MainLayout from "../layouts/MainLayout";

export default function MainRoutes() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>                            
          <Route path="/" element={
            <MainLayout maxWidth={false}>
              <Home/>
            </MainLayout>
          }/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

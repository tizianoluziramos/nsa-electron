import { CursorifyProvider } from "@cursorify/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CursorComponent } from "./components/CursorComponent.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Layout } from "./layouts/Layout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { PublicRoute } from "./routes/PublicRoute.tsx";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute.tsx";

export function App() {
  return (
    <CursorifyProvider
      enabled
      cursor={<CursorComponent />}
      opacity={1}
      delay={1}
      defaultCursorVisible={false}
      breakpoint={1000}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
              </Route>
              <Route element={<AuthenticatedRoute />}>
                <Route index element={<HomePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CursorifyProvider>
  );
}

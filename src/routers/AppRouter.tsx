import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../views/examples/Main";
import { AuthStoreProvider } from "../store/AuthStoreProvider";

const AppRouter = (props: any) => {
  return (
    <AuthStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </AuthStoreProvider>
  );
};

export { AppRouter };

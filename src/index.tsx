
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";


import { createRoot } from 'react-dom/client';
import Index from "./views/Index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/examples/Login";
import Register from "./views/examples/Register";

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login-page" element={<Login />} />
      <Route path="/register-page" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>

);
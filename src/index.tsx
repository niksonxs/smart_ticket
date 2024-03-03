import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss";

import "./config/interceptor";

import "./index.css";

import { createRoot } from "react-dom/client";
import { AppRouter } from "./routers/AppRouter";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(<AppRouter />);

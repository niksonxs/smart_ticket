import { Routes, Route, Navigate } from "react-router-dom";
import Index from "../views/Index";
import Login from "../views/examples/Login";
import Register from "../views/examples/Register";
import BuyTicket from "../views/examples/BuyTicket";
import Tickets from "../views/examples/Tickets";
import { TicketView } from "../views/examples";
import { ValidateTicket } from "../views/examples/ValidateTicket";
import { GoogleMap } from "views/examples/Map";
import { TicketScanner } from "views/examples/TicketScanner";

const HomeRouter = (props: any) => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/map" element={<GoogleMap />} />
      <Route path="/buy" element={<BuyTicket />} />

      <Route path="/scan" element={<TicketScanner />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/tickets/:id" element={<TicketView />} />
      <Route path="/validate/:validationCode" element={<ValidateTicket />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { HomeRouter };

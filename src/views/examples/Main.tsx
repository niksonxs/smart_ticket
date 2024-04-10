import { useState } from "react";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import { HomeRouter } from "../../routers/HomeRouter";
import { Scanner } from "@yudiel/react-qr-scanner";
import eruda from "eruda";
import { GoogleMap } from "./Map";
eruda.init();

const Main = () => {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");

  const handleScan = (data: any) => {
    setResult(data);
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div>
      <DemoNavbar />
      <HomeRouter />
    </div>
  );
};

export { Main };

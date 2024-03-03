// import eruda from "eruda";
// eruda.init();

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import { HomeRouter } from "../../routers/HomeRouter";

const Main = () => {
  return (
    <div>
      <DemoNavbar />
      <HomeRouter />
    </div>
  );
};

export { Main };

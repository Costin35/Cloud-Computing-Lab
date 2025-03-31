import { Outlet } from "react-router-dom";
import Header from "../../componenets/Header/Header";
import Footer from "../../componenets/Footer/Footer";
import './styles.css';

function NoNavLayout() {
  return (
    <div className="layout-no-nav">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default NoNavLayout;
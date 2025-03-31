import { Outlet } from "react-router-dom";
import Header from "../../componenets/Header/Header";
import Nav from "../../componenets/Nav/Nav";
import Footer from "../../componenets/Footer/Footer";
import './styles.css';

function MainLayout() {
  return (
    <main className="layout">
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </main>
  );
}

export default MainLayout;
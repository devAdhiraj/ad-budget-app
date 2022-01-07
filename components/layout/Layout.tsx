import MainNavigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({children}:any) => {
  return (
    <div>
      <MainNavigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
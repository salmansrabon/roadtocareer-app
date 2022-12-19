import { Header, Footer } from "./";

const Layout = ({ children, showHeader = true, showFooter = true }) => (
  <main className="flex min-h-[90vh] flex-col">
    {showHeader && <Header />}
    {children}
    <footer className="mt-auto">{showFooter && <Footer />}</footer>
  </main>
);

export default Layout;

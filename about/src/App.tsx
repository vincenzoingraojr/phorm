import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/404";
import AboutUs from "./pages/about-phorm/AboutUs";
import BrandToolkit from "./pages/about-phorm/BrandToolkit";
import ContactPage from "./pages/resources/ContactPage";
import CookiePolicy from "./pages/policies/CookiePolicy";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsOfService from "./pages/policies/TermsOfService";
import ProductPage from "./pages/product/ProductPage";
import AppsPage from "./pages/product/AppsPage";
import LicensesPage from "./pages/policies/LicensesPage";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <IndexPage />
                    }
                />
                <Route
                    path="/about-us"
                    element={
                        <AboutUs />
                    }
                />
                <Route
                    path="/brand-toolkit"
                    element={
                        <BrandToolkit />
                    }
                />
                <Route 
                    path="/product"
                    element={
                        <ProductPage />
                    }
                />
                <Route 
                    path="/apps"
                    element={
                        <AppsPage />
                    }
                />
                <Route
                    path="/contact-us"
                    element={
                        <ContactPage />
                    }
                />
                <Route
                    path="/cookies"
                    element={
                        <CookiePolicy />
                    }
                />
                <Route
                    path="/privacy"
                    element={
                        <PrivacyPolicy />
                    }
                />
                <Route
                    path="/tos"
                    element={
                        <TermsOfService />
                    }
                />
                <Route
                    path="/licenses"
                    element={
                        <LicensesPage />
                    }
                />
                <Route
                    path="*"
                    element={
                        <NotFoundPage />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
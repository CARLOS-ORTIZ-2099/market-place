import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { Home } from "./pages/home/Home";
import { ProductDetails } from "./pages/product-details/ProductDetails";
import { Cart } from "./pages/cart/Cart";
import { ProtectedRoutes } from "./components/protected-routes/ProtectedRoutes";
import { MyProfile } from "./pages/my-profile/MyProfile";
import { MyFavourites } from "./pages/my-favourites/MyFavourites";
import { MyPosts } from "./pages/my-posts/MyPosts";
import { FormPost } from "./pages/form-post/FormPost";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { PublicRoutes } from "./components/public-routes/PublicRoutes";
import { FavouritesProvider } from "./context/FavouritesProvider";
import { Navbar } from "./components/navbar/Navbar";
import { FormPay } from "./pages/form-pay/FormPay";
import { NotFound } from "./pages/not-found/NotFound";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route
              path="/*"
              element={
                <CartProvider>
                  <FavouritesProvider>
                    <Routes>
                      {/* Rutas públicas */}
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/product-details/:id"
                        element={<ProductDetails />}
                      />
                      <Route path="/cart" element={<Cart />} />

                      {/* Rutas protegidas */}
                      <Route path="/profile" element={<ProtectedRoutes />}>
                        <Route index element={<MyProfile />} />

                        <Route path="/profile/cart" element={<Cart />} />

                        <Route path="/profile/myPosts" element={<MyPosts />} />
                        <Route
                          path="/profile/formPage"
                          element={<FormPost />}
                        />
                        <Route
                          path="/profile/formPage/:id"
                          element={<FormPost />}
                        />

                        <Route
                          path="/profile/editProfile/:id"
                          element={<Register />}
                        />

                        <Route
                          path="/profile/myFavourites"
                          element={<MyFavourites />}
                        />

                        <Route path="/profile/pay/:id" element={<FormPay />} />
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </FavouritesProvider>
                </CartProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

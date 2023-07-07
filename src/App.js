import { Container } from "@mui/material";
import NavBar from "./Components/NavBar"
import {Route, Routes} from "react-router-dom"
import MyProfile from "./Pages/MyProfile/MyProfile";
import EditProfile from "./Pages/MyProfile/EditProfile";
import MyProducts from "./Pages/MyProducts/MyProducts";
import MyOrders from "./Pages/MyOrders/MyOrders"
import AddProduct from "./Pages/MyProducts/AddProduct"
import Analytics from "./Pages/Analytics/Analytics";
import Signup from "./AuthPages/Signup";
import Verification from "./AuthPages/Verification";
import Login from "./AuthPages/Login";
import BuyerFeed from "./BuyerPages/BuyerFeed/BuyerFeed";
import ProductDetails from "./BuyerPages/BuyerFeed/ProductDetails";
import BuyerProfile from "./BuyerPages/BuyerProfile/MyProfile";
import BuyerEditProfile from "./BuyerPages/BuyerProfile/BuyerEditProfile";
import SellerProductDetails from "./Pages/MyProducts/SellerProductDetails";
function App() {
  return (
    <>
    <NavBar />
    <Container>
      <Routes>
        
      <Route exact path="/signup" element={<Signup/>}></Route>
      <Route exact path="/verification" element={<Verification/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>

      <Route exact path="/buyer/feed" element={<BuyerFeed/>}></Route>
      <Route exact path="/buyer/feed/product-details/:productID" element={<ProductDetails/>}></Route>
      <Route exact path="/buyer/profile" element={<BuyerProfile/>}></Route>
      
       
      <Route exact path="/my-profile" element={<MyProfile/>}></Route>
      <Route exact path="/my-profile/edit" element={<EditProfile/>}></Route>
      <Route exact path="/my-orders" element={<MyOrders/>}></Route>
      <Route exact path="/my-products" element={<MyProducts />}></Route>
      <Route exact path="/my-products/add" element={<AddProduct />}></Route>
      <Route exact path="/my-products/details" element={<SellerProductDetails />}></Route>
      
      <Route exact path="/analytics" element={<Analytics />} ></Route>
      </Routes>
    </Container>
    </>
  );
}

export default App;

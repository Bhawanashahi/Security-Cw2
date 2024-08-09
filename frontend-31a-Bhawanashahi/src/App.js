import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Product from './pages/product';
import Service from './pages/Service';
import PhotographyPage from './pages/photography';
import BookingForm from './pages/book';
import Review from './pages/review';




// for showing toast messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import HomeBar from './components/HomeBar'

// import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditProduct from './pages/Admin/AdminEditProduct'
import AdminEditBlog from './pages/Admin/AdminEditBlog';
import AddBlogPage from './pages/Admin/AddBlog';
import AdminRoutes from './protected/AdminRoutes';

import UserRoutes from './protected/UserRoutes';
import AdminDashboard from './pages/Admin/AdminDashboad';
import AdminContact from './pages/Admin/AdminContact';
import AddProduct from './pages/Admin/AddProduct';
import AdminBlog from './pages/Admin/AdminBlog';
import Blog from './pages/blog';
import VendorRoutes from './protected/VendorRoutes';
import AdminProduct from './pages/Admin/AdminProduct';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import AdminPetProduct from './pages/Admin/AdminPetProduct';
import AddPetProduct from './pages/Admin/AddPetProducts';
import PlaceorderPage from './pages/PlaceOrder';
import AdminOrderPage from './pages/Admin/AdminOrder';
import OrderPage from './pages/order';
import MakeupDetail from './pages/mDetail';
import VenueDetail from './pages/vDetail';
import Venue from './pages/Venue';
import Makeup from './pages/Makeup';


//Vendor
import AddPhotoVendorPage from './pages/vendor/AddPhotoVendor';
import AddMakeupVendorPage from './pages/vendor/AddMakeupVendor';
import AddVenueVendorPage from './pages/vendor/AddVenueVendor';
import PhotographyDetail from './pages/Pdetail';
import ChangePassword from './pages/changePassword';
import VendorRegister from './pages/vendor/vendorRegister';
import VendorLogin from './pages/vendor/vendorLogin';
import VendorHomePage from './pages/vendor/vendorHomepage';
import VendorDashboard from './pages/vendor/VendorDashbord';
import Gallery from './pages/gallery';
import Bookings from './pages/bookings';
import Home from './pages/home'
import AdminHome from './pages/Admin/adminHome';
import AdminBooking from './pages/Admin/AdminBooking';
import VendorReview from './pages/vendor/VendorReview';
import BookingHistory from './pages/BookingHistory';




function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path='/home' element={<HomeBar/>} /> 
      <Route path='/profile' element={<Profile/>} /> 
      <Route path='/cpw' element={<ChangePassword/>} /> 
      <Route path='/booking' element={<Bookings/>} /> 
      <Route path='/service' element={<Service/>} /> 
      <Route path='/photo' element={<PhotographyPage/>} /> 
      <Route path='/pdetail/:id' element={<PhotographyDetail/>} /> 
      <Route path='/mdetail/:id' element={<MakeupDetail/>} /> 
      <Route path='/vdetail/:id' element={<VenueDetail/>} /> 
      <Route path='/makeup' element={<Makeup/>} /> 
        <Route path='/contact' element={<Contact />} />
        <Route path='/review' element={<Review/>} />
        <Route path='/about-us' element={<AboutUs/>} /> 
         <Route path='/dash' element={<Dashboard />} /> 
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path = '/products' element ={<Product/>} />
        <Route path = '/blog' element ={<Blog/>} />
        <Route path = '/book' element ={<BookingForm/>} />
        <Route path = '/Photo' element ={<PhotographyPage/>} />
        <Route path = '/venue' element ={<Venue/>} />
        <Route path = '/makeup' element ={<Makeup/>} />
        <Route path = '/reset' element ={<ResetPassword/>} />
        {/* <Route path = '/addtocart' element ={<AddToCart/>} />
        <Route path = '/wishlist' element ={<Wishlist/>} /> */}
        <Route path = '/placeorder' element ={<PlaceorderPage/>} />
        {/* <Route path = '/payment' element ={<PaymentPage/>} /> */}
        <Route path = '/orders' element ={<OrderPage/>} />
        <Route path = '/gallery' element ={<Gallery/>} />
        <Route path = '/home' element ={<Home/>} />
        <Route path = '/home' element ={<Home/>} />
        <Route path = '/bookinghistory' element ={<BookingHistory/>} />
        
        
    
        

      
       <Route element ={<UserRoutes/>}>
    
       </Route>
     
       <Route path = '/admin/product' element ={<AdminProduct/>} /> 
       <Route path = '/admin/addproduct' element ={<AddProduct/>} /> 
       
       <Route path = '/admin/petproduct' element ={<AdminPetProduct/>} /> 
       <Route path = '/admin/addpetproduct' element ={<AddPetProduct/>} /> 
       <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
       <Route path ='/admin/contact' element ={<AdminContact/>} />
       {/* <Route path ='/admin/product' element ={<AdminProductDashboard/>} /> */}
       <Route path = '/admin/up/:id' element ={<AdminEditBlog/>} />
       <Route path = '/admin/adminblog' element ={<AdminBlog/>} />
       <Route path = '/admin/addblog' element ={<AddBlogPage/>} />
       <Route path = '/admin/edit/:id' element ={<AdminEditProduct/>} />
       <Route path = '/admin/order' element ={<AdminOrderPage/>} /> 
       <Route path = '/admin/home' element ={<AdminHome/>} /> 
       <Route path = '/admin/booking' element ={<AdminBooking/>} /> 
       <Route element={<AdminRoutes/>}>
        </Route>
        <Route path = '/vendor/addphoto' element ={<AddPhotoVendorPage/>} />
        <Route path = '/vendor/addmakeup' element ={<AddMakeupVendorPage/>} />
        <Route path = '/vendor/addvenue' element ={<AddVenueVendorPage/>} />
        <Route path = '/vendor/register' element ={<VendorRegister/>} />
        <Route path = '/vendor/login' element ={<VendorLogin/>} />
        <Route path = '/vendor/dash' element ={<VendorDashboard/>} />
        <Route path = '/vendor/home' element ={<VendorHomePage/>} />
        <Route path = '/vendor/review' element ={<VendorReview/>} />

      <Route element={<VendorRoutes/>}></Route>
      </Routes>
           
      
     
    </Router>
  );
}

export default App;


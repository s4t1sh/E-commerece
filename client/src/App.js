import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnav/Newnav';
import Maincomponent from './components/home/Maincomponent';
import Footer from './components/footer/footer';
import Sign_up from './components/signup_signin/Sign_up';
import Sign_in from './components/signup_signin/Sign_in';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <div>
      {
        
          <>
          <Navbar/>
          <Newnav/>
          <Routes>
              <Route path='/' element={<Maincomponent/>}/>
              <Route path='/login' element={<Sign_in/>}/>
              <Route path='/register' element={<Sign_up/>}/>
              <Route path='/getproductsone/:id' element={<Cart/>}/>
              <Route path='/buynow' element={<Buynow/>}/>
          </Routes>
          
          <Footer/>
          </>
        
      }
      
    </div>
  );
}

export default App;

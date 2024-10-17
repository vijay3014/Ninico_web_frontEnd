import React from 'react'
import Product1 from "../../Asset/product-1.jpg"
import Propsheading from '../../Propsheading/Propsheading';
import { useSelector ,useDispatch } from 'react-redux';
import {ADD, WISHLIST_REMOVE} from "../../../Redux/Action/Action";


import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function showAlerts_Success() {
  toast.success('Your item has been added to the cart list!',{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  });    
}

function showAlerts_Error() {
  toast.error('a quick reminder that you have an item that removed from the list',
  {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  });
}

function Wishlist() {
  const wishlists = useSelector((state)=>state.wishlistreducer.wishlist)
  // console.log(data);

  const dispatchs = useDispatch();
  const  wishlistremove = (id) => {
    // console.log("id",id);
    dispatchs(WISHLIST_REMOVE(id));
    showAlerts_Error();
  };
  const wishlistsend = (e,id)=>{
    // console.log(e,"eeeee");
    dispatchs(ADD(e));
    dispatchs(WISHLIST_REMOVE(id));
    showAlerts_Success() ;
}

  return (
    <div>
      <div className=''>
        <Propsheading title="Wishlist" />
        <ToastContainer/>

        <div>
          <div className='p-20'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='border p-2'>Images</th>
                  <th className='border'>Courses</th>
                  <th className='border'>Unit Price</th>
                  <th className='border'>Quantity</th>
                  <th className='border'>Total</th>
                  <th className='border'>Add To Cart</th>
                  <th className='border'>Remove</th>
                </tr>
              </thead>
              <tbody>
            {wishlists.length ? 
              wishlists.map((product, index) => {
                const { FirstImg, price, name, id } = product;
                
                return (
                  <tr key={id} className='text-center'>
                    <td className='border'>
                      <div className='flex justify-center'>
                        <img src={FirstImg} className='w-[150px] h-[180px]' />
                      </div>
                    </td>
                    <td className='border hover:text-rose-600 font-semibold'>{name}</td>
                    <td className='border'>{price}</td>
                    <td className='border'><input min="1" type="number" defaultValue="1" name="qty" className="border p-3 font-bold" /></td>
                    <td className='border'>{price}</td>
                    <td className='border'><button className='bg-rose-600 text-white text-xs ps-5 pe-5 pt-3 pb-3 rounded-md font-bold' onClick={()=>wishlistsend(product,id)}>Add To Cart</button></td>
                    <td className='border'>
                        <button onClick={() => wishlistremove(id)}>Remove</button>
                    </td>
                  </tr>
                );
              })
            : <tr><td colSpan="7" className='text-center text-2xl font-bold'>Wishlist is empty....!</td></tr>}
          </tbody> 

            </table>
            <div className='grid grid-cols-1 grid-rows-1 gap-2 mt-10'>
              <div className='grid grid-rows-1 '>
                <div className='flex justify-between my-auto'>
                  <div className='flex gap-2'>
                    <input type="text" placeholder='Coupon Code' className='border p-2 rounded-lg' />
                    <button className='bg-rose-600 rounded-lg text-white text-sm font-bold pt-3 pb-3 ps-5 pe-5'>Apply Coupon</button>
                  </div>
                  <button className='bg-rose-600 rounded-lg text-white block text-sm font-bold pt-3 pb-3 ps-7 pe-7'>Update Cart</button>
                </div>
              </div>
              <div className='grid-cols-1 grid-rows-1 grid '>
                <div className=' flex justify-end'>
                  <div className='w-[50%]'>
                    <h1 className='text-2xl font-semibold'>Cart Totals</h1>
                    <div className='border flex justify-between p-3 mt-3 text-sm'>
                      <span>Subtotal</span>
                      <span>$0.00</span>
                    </div>
                    <div className='border flex justify-between p-3 text-sm'>
                      <span>Total</span>
                      <span>$0.00</span>
                    </div>
                    <div className='mt-5'>
                      <button className='bg-rose-600 rounded-lg text-white p-4 text-sm font-bold'>Proceed to Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist

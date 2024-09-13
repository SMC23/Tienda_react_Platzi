import React from 'react'
import './stylesCSM.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../Utils/index'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext) //lee el estado global

  const handleDelete = (id) => {
    const filteredProducts = context.carProducts.filter(product => product.id != id)
    context.setCarProducts(filteredProducts)//solo deja los anteriores sin el ide que le colocó
    context.setCount(context.count - 1)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      product: context.carProducts,
      totalProducts: context.carProducts.length,
      totalPrice: totalPrice(context.carProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCarProducts([])
    context.setCount(0)

  // eliminar en el input de busqueda por titulo
  context.setSearchByCategory(null)
    
  }

  return (
    <aside className={`${context.isChekoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div>
          <XMarkIcon className="h-6 text-black-500 cursor-pointer" onClick={() => context.closeChekoutSideMenu()}></XMarkIcon>
        </div>
      </div>


      <div className='px-6 overflow-y-scroll flex-1'>
        {
          context.carProducts.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imgeUrl={product.images}
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>

      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total: </span>
          <span className='font-medium text-2xl'>${totalPrice(context.carProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button className='w-full bg-black py-3 text-white rounded-lg' onClick={() => handleCheckout()}> checkout</button>
        </Link>
      </div>


    </aside>
  )
}

export default CheckoutSideMenu
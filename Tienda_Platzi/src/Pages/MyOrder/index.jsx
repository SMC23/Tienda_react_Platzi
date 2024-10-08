import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1 



  return (
    <Layout>
       <h1>MyOrder</h1>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <Link to={'/my-orders'} className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
       

      </div>
      <div className='flex flex-col w-80'>
        {
          context.order && context.order.length > 0 ?
            context.order?.[index]?.product.map(product => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images}
                price={product.price}

              />

            ))
            : <p>No hay productos en la orden.</p>
        }
      </div>
    </Layout>
  )
}

export default MyOrder
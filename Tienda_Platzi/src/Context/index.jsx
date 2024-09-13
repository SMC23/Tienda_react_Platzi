import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
  //Shopping Cart Increment quantity
  const [count, setCount] = useState(0)

  //Product Detail open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openPruductDetail = () => setIsProductDetailOpen(true)//encargar de modificar el valr del isProduct
  const closePruductDetail = () => setIsProductDetailOpen(false)

  //Product Detail open/close
  const [isChekoutSideMenuOpen, setIsChekoutSideMenuOpen] = useState(false)
  const openChekoutSideMenu = () => setIsChekoutSideMenuOpen(true)//encargar de modificar el valr del isProduct
  const closeChekoutSideMenu = () => setIsChekoutSideMenuOpen(false)

  //Product Detail Show Product
  const [productToShow, setProductToShow] = useState({})

  //Shopping Cart add produts to cart
  const [carProducts, setCarProducts] = useState([])

  const [filteredItems, setfilteredItems] = useState(null)

  //Shopping Cart order
  const [order, setOrder] = useState([])

  //Get products by tittle
  const [searchByTittle, setSearchByTittle] = useState(null)

  //Get products by Category
  const [searchByCategory, setSearchByCategory] = useState(null)


  //consumo del API
  const [items, setItems] = useState(null)
  useEffect(() => {
    fetch(" https://api.escuelajs.co/api/v1/products") //valor en tipo promesa
      .then(response => response.json())
      .then(data => setItems(data))

  }, [])

  //filtrado por titulo
  const filteredItemsByTittle = (items, searchByTittle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTittle.toLowerCase()))
  }

  //filtrado por Categoria
  const filteredItemsByCategory = (items, searchByCategory) => {
   
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTittle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTittle(items, searchByTittle)
    } if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTittle.toLowerCase()))
    }
    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    if (searchByTittle && searchByCategory) setfilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items,  searchByTittle, searchByCategory))
    if (searchByTittle && !searchByCategory) setfilteredItems(filterBy('BY_TITLE',  items,  searchByTittle, searchByCategory))
    if (searchByCategory && !searchByTittle) setfilteredItems(filterBy('BY_CATEGORY', items,  searchByTittle, searchByCategory))
    if (!searchByCategory && !searchByTittle) setfilteredItems(filterBy(null, items,  searchByTittle, searchByCategory))
  }, [items, searchByTittle, searchByCategory])

  





  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openPruductDetail,
      closePruductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      carProducts,
      setCarProducts,
      isChekoutSideMenuOpen,
      setIsProductDetailOpen,
      openChekoutSideMenu,
      closeChekoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTittle,
      setSearchByTittle,
      filteredItems,
      setfilteredItems,
      searchByCategory,
      setSearchByCategory,
      filteredItemsByCategory
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}


// import React, { useEffect, useState, useMemo } from "react";
// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import Title from "./Title";
// import ProductItem from "./ProductItem";

// function Collection() {
//   const { products,search, showSearch,searchQuery,loading,error } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortOption, setSortOption] = useState("relevant");
  
//   // Get all unique categories from products
//   const categories = useMemo(() => {
//     if (!products) return [];
//     const uniqueCategories = new Set();
//     products.forEach(product => uniqueCategories.add(product.category));
//     return Array.from(uniqueCategories);
//   }, [products]);

//   // Filter and sort products
//   const filteredProducts = useMemo(() => {
//     if (!products) return [];
    
//     // First filter by category
//     let result = products;
//     if (selectedCategories.length > 0) {
//       result = products.filter(product => selectedCategories.includes(product.category));
//     }

//     // Then apply sorting
//     switch(sortOption) {
//       case "low-high":
//         return [...result].sort((a, b) => a.price - b.price);
//       case "high-low":
//         return [...result].sort((a, b) => b.price - a.price);
//       case "relevant":
//       default:
//         return result;
//     }
//   }, [products, selectedCategories, sortOption]);

//   const toggleCategory = (e) => {
//     const category = e.target.value;
//     setSelectedCategories(prev => 
//       prev.includes(category) 
//         ? prev.filter(item => item !== category) 
//         : [...prev, category]
//     );
//   };

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t-gray-900">
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           Filters
//         </p>

//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm text-gray-900">
//             {categories.map(category => (
//               <label key={category} className="flex gap-2 items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="w-3"
//                   value={category}
//                   checked={selectedCategories.includes(category)}
//                   onChange={toggleCategory}
//                 />
//                 {category}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={"ALL"} text2={"COLLECTIONS"} />
//           <select 
//             className="border-2 border-gray-300 text-sm px-2"
//             value={sortOption}
//             onChange={handleSortChange}
//           >
//             <option value="relevant">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

        
// <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 pb-5">
//   {filteredProducts.length > 0 ? (
//     filteredProducts.map((item) => (
//       <ProductItem
//         key={item.id}
//         name={item.name}
//         id={item.id}
//         price={item.price}
//         img={item.img}
//         category={item.category}
//       />
//     ))
//   ) : (
//     <div className="col-span-full text-center py-10">
//       {searchQuery ? (
//         <p>No products found matching "{searchQuery}"</p>
//       ) : state.loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <p>No products available</p>
//       )}
//     </div>
//   )}
// </div>
//       </div>
//     </div>
//   );
// }

// export default Collection;

import React, { useEffect, useState, useMemo } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function Collection() {
  const { 
    products,
    searchQuery,
    loading,
    error,
    filteredProducts: contextFilteredProducts 
  } = useContext(ShopContext);
  
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  
  // Get all unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set();
    products.forEach(product => uniqueCategories.add(product.category));
    return Array.from(uniqueCategories);
  }, [products]);

  // Combine search filtering with category filtering and sorting
  const finalFilteredProducts = useMemo(() => {
    // Start with the search-filtered products from context
    let result = contextFilteredProducts || [];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Apply sorting
    switch(sortOption) {
      case "low-high":
        return [...result].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...result].sort((a, b) => b.price - a.price);
      case "relevant":
      default:
        return result;
    }
  }, [contextFilteredProducts, selectedCategories, sortOption]);

  const toggleCategory = (e) => {
    const category = e.target.value;
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category) 
        : [...prev, category]
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t-gray-900">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-900">
            {categories.map(category => (
              <label key={category} className="flex gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={toggleCategory}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select 
            className="border-2 border-gray-300 text-sm px-2"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 pb-5">
          {loading ? (
            <div className="col-span-full text-center py-10">Loading products...</div>
          ) : error ? (
            <div className="col-span-full text-center py-10">Error: {error}</div>
          ) : finalFilteredProducts.length > 0 ? (
            finalFilteredProducts.map((item) => (
              <ProductItem
                key={item.id}
                name={item.name}
                id={item.id}
                price={item.price}
                img={item.img}
                category={item.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              {searchQuery ? (
                <p>No products found matching "{searchQuery}"</p>
              ) : (
                <p>No products available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
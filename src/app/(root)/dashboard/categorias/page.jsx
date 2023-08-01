import Categories from "@/components/Categories";

// const categories = [
//   {
//     "id": 1,
//     "categoryName": "Stationery",
//     "imageCategory": "/images/logos/gruporegio_isotipo.png",
//     "createdAt": "2023-07-27T21:46:56.595Z",
//     "updatedAt": "2023-07-27T21:46:56.595Z"
//   },
//   {
//     "id": 2,
//     "categoryName": "F&B",
//     "imageCategory": "/images/logos/gruporegio_isotipo.png",
//     "createdAt": "2023-07-27T21:47:18.492Z",
//     "updatedAt": "2023-07-28T21:58:43.051Z"
//   }
// ]
// const URL = process.env.NEXT_PUBLIC_API_URL;
// export async function fetchCategories() {
//   const res = await fetch(`${URL}/categories`);
//   const data = await res.json();
//   // console.log(data.enterprises);
//   return data.categories;
// }
export default async function CategoriesPage() {
  // const categories = await fetchCategories();
  // console.log(categories);
  return (
    <div className="w-3/5 px-2 m-auto py-16 sm:px-0">
      <p>Hola mundo</p>
      {/* <Categories categories={categories}></Categories> */}
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";

const AdminProducts = () => {

  const API = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("token");

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(
          `${API}/api/admin/products`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchProducts();

  }, [API, token]);


  useEffect(() => {

    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }

  }, [toast]);


  /* CREATE FORM OPEN */

  const handleCreate = () => {

    setFormData({
      name: "",
      price: "",
      discountPrice: "",
      countInStock: "",
      sku: "",
      mainCategory: "",
      subCategory: "",
      brand: "",
      sizes: "",
      colors: "",
      collections: "",
      material: "",
      gender: "Men",
      description: "",
    });

    setIsCreating(true);
    setEditId(null);
    setImageFile(null);

    window.scrollTo({ top: 0, behavior: "smooth" });

  };


  /* EDIT PRODUCT */

  const handleEdit = (product) => {

    setFormData({
      ...product,
      sizes: product.sizes ? product.sizes.join(",") : "",
      colors: product.colors ? product.colors.join(",") : "",
    });

    setEditId(product._id);
    setIsCreating(false);
    setImageFile(null);

    window.scrollTo({ top: 0, behavior: "smooth" });

  };


  /* DELETE PRODUCT */

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `${API}/api/admin/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(products.filter((p) => p._id !== id));

      setToast("Product Deleted");

    } catch (error) {
      console.error(error);
    }

  };


  /* FORM CHANGE */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleImageChange = (e) => {

    setImageFile(e.target.files[0]);

  };


  /* CREATE PRODUCT */

  const handleCreateSubmit = async (e) => {

    e.preventDefault();

    try {

      const productData = new FormData();

      Object.keys(formData).forEach((key) => {

        if (key === "sizes") {

          const sizesArray = formData.sizes
            ? formData.sizes.split(",").map((s) => s.trim())
            : [];

          productData.append("sizes", JSON.stringify(sizesArray));

        }

        else if (key === "colors") {

          const colorsArray = formData.colors
            ? formData.colors.split(",").map((c) => c.trim())
            : [];

          productData.append("colors", JSON.stringify(colorsArray));

        }

        else {

          productData.append(key, formData[key]);

        }

      });

      if (imageFile) {
        productData.append("image", imageFile);
      }

      const { data } = await axios.post(
        `${API}/api/admin/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts([...products, data]);

      setFormData(null);
      setImageFile(null);
      setIsCreating(false);

      setToast("Product Created Successfully");

    } catch (error) {
      console.error(error);
    }

  };


  /* UPDATE PRODUCT */

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("price", formData.price);
      productData.append("discountPrice", formData.discountPrice);
      productData.append("countInStock", formData.countInStock);
      productData.append("sku", formData.sku);

      productData.append("mainCategory", formData.mainCategory);
      productData.append("subCategory", formData.subCategory);

      productData.append("brand", formData.brand);

      const sizesArray = formData.sizes
        ? formData.sizes.split(",").map((s) => s.trim())
        : [];

      const colorsArray = formData.colors
        ? formData.colors.split(",").map((c) => c.trim())
        : [];

      productData.append("sizes", JSON.stringify(sizesArray));
      productData.append("colors", JSON.stringify(colorsArray));

      productData.append("collections", formData.collections);
      productData.append("material", formData.material);
      productData.append("gender", formData.gender);
      productData.append("description", formData.description);

      if (imageFile) {
        productData.append("image", imageFile);
      }

      const { data } = await axios.put(
        `${API}/api/admin/products/${editId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts(
        products.map((p) => (p._id === editId ? data : p))
      );

      setFormData(null);
      setEditId(null);
      setImageFile(null);

      setToast("Product Updated Successfully");

    } catch (error) {
      console.error(error);
    }

  };


  return (

    <div className="p-6 relative">

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold text-[#4E342E]">
          Product Management
        </h1>

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold"
        >
          + Add Product
        </button>

      </div>

      {formData && (

        <div className="bg-white p-6 rounded-xl shadow-md border mb-6">

          <form
            onSubmit={isCreating ? handleCreateSubmit : handleUpdate}
            className="grid grid-cols-3 gap-4 text-sm"
          >

            <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
            <Input label="Discount Price" name="discountPrice" type="number" value={formData.discountPrice} onChange={handleChange} />
            <Input label="Stock" name="countInStock" type="number" value={formData.countInStock} onChange={handleChange} />
            <Input label="SKU" name="sku" value={formData.sku} onChange={handleChange} />

            <Input label="Main Category (Men/Women/Kids)" name="mainCategory" value={formData.mainCategory} onChange={handleChange} />
            <Input label="Sub Category (Shirts/Jeans etc)" name="subCategory" value={formData.subCategory} onChange={handleChange} />

            <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
            <Input label="Sizes (S,M,L)" name="sizes" value={formData.sizes} onChange={handleChange} />
            <Input label="Colors (Red,Blue)" name="colors" value={formData.colors} onChange={handleChange} />
            <Input label="Collection" name="collections" value={formData.collections} onChange={handleChange} />
            <Input label="Material" name="material" value={formData.material} onChange={handleChange} />

            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option>Men</option>
                <option>Women</option>
                <option>Unisex</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>

            <div className="col-span-3">
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
              />
            </div>

            <div className="col-span-3 flex justify-end mt-4">
              <button className="bg-[#A47149] text-white px-6 py-2 rounded-lg font-semibold">
                {isCreating ? "Create Product" : "Update Product"}
              </button>
            </div>

          </form>

        </div>

      )}

      <div className="bg-white rounded-xl shadow-md border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#f3ede7] text-[#5D4037]">

            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="px-4">Price</th>
              <th className="px-4">Stock</th>
              <th className="px-4">Main Category</th>
              <th className="px-4">Sub Category</th>
              <th className="px-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product._id} className="border-b">

                <td className="py-2 px-4">{product.name}</td>
                <td className="px-4">${product.price}</td>
                <td className="px-4">{product.countInStock}</td>
                <td className="px-4">{product.mainCategory}</td>
                <td className="px-4">{product.subCategory}</td>

                <td className="px-4 text-center space-x-2">

                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {toast && (

        <div className="fixed bottom-6 right-6 bg-[#4E342E] text-white px-6 py-3 rounded-xl">
          {toast}
        </div>

      )}

    </div>

  );
};


const Input = ({ label, ...props }) => (

  <div>

    <label className="block mb-1 font-semibold">{label}</label>

    <input {...props} className="w-full px-3 py-2 border rounded-lg" />

  </div>

);

export default AdminProducts;
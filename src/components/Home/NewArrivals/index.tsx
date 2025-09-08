"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";

import { Product } from "@/types/product";

const NewArrival = () => {
  const [products, setProducts] = useState<Product[]>([]);

  function mapWooProductToProduct(apiProduct: any): Product {
    return {
      id: apiProduct.id,
      title: apiProduct.name, // 👈 should map correctly
      reviews: apiProduct.rating_count,
      price: Number(apiProduct.regular_price),
      discountedPrice: apiProduct.sale_price
        ? Number(apiProduct.sale_price)
        : Number(apiProduct.regular_price),
      images: apiProduct.images,
    };
  }

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const username = "admin";
        const appPassword = "SA0Y2M849pllyAxOYRuuyQyU";

        const auth = "Basic " + btoa(`${username}:${appPassword}`);

        const response = await fetch(
          "http://localhost/next-woo-backend/wp-json/wc/v3/products?tag=30",
          {
            headers: {
              Authorization: auth,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.map(mapWooProductToProduct));
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section title */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              This Week’s
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              New Arrivals
            </h2>
          </div>

          <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {products.length > 0 ? (
            products.map((item) => <ProductItem key={item.id} item={item} />)
          ) : (
            <p className="text-red-500">⚠️ No new arrivals found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;

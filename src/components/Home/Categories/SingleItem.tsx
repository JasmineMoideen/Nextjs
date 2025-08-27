import React from "react";
import Image from "next/image";

type Category = {
  id: number;
  name: string;
  slug: string;
  image?: {
    id: number;
    src: string;
  } | null;
};

const SingleItem = ({ item }: { item: Category }) => {
  return (
    <a href={`/category/${item.slug}`} className="group flex flex-col items-center">
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 overflow-hidden">
        {item.image?.src ? (
          <Image
            src={item.image.src}
            alt={item.name}
            width={82}
            height={62}
            className="object-contain"
          />
        ) : (
          <span className="text-sm text-gray-500">No Image</span>
        )}
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark 
          bg-gradient-to-r from-blue to-blue 
          bg-[length:0px_1px] bg-left-bottom bg-no-repeat 
          transition-[background-size] duration-500 
          hover:bg-[length:100%_3px] 
          group-hover:bg-[length:100%_1px] 
          group-hover:text-blue"
        >
          {item.name}
        </h3>
      </div>
    </a>
  );
};

export default SingleItem;

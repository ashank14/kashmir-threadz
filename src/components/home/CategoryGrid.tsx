import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useCategories } from "@/context/CategoriesContext";

const CategoryCarousel = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          Loading collections...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Each piece is handcrafted by skilled artisans using techniques passed down through generations.
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/category/${category.slug}`}
                className="group relative block overflow-hidden rounded-sm aspect-[4/5]"
              >
                <img
                  src={category.image_path}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-2xl text-card mb-1">
                    {category.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm font-medium text-card opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Explore Collection</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;

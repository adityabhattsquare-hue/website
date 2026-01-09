'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SHOP_ORG_ID = process.env.NEXT_PUBLIC_ORG_ID;

export default function CategoryShowcase({ title, subtitle }) {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -400 : 400,
      behavior: 'smooth',
    });
  };

  const fetchCategory = async () => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      headers: { 'x-org-id': SHOP_ORG_ID },
    });
    const data = await res.json();
    if (data.success) setCategories(data.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-accent/20 to-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-gray-500 mt-1">{subtitle}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white border shadow hover:bg-gray-50"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white border shadow hover:bg-gray-50"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth py-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex-none w-80 bg-white rounded-2xl shadow-lg overflow-hidden relative group"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image_url}
                  alt={category.category_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* TEXT */}
              <div className="absolute bottom-0 p-6 text-white z-10">
                <h3 className="text-xl font-semibold mb-1">
                  {category.category_name}
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  {category.description}
                </p>

                <div className="flex items-center gap-1 text-sm font-medium">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* BADGE */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {category.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

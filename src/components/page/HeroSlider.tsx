'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

interface HeroSliderProps {
  articles: Article[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
    
  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className="group relative w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {articles.map((article, index) => (
          <CarouselItem key={article.title + index}>
            <div className="relative h-64 w-full md:h-96">
              {article.urlToImage && (
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <CardTitle className="font-headline text-2xl text-white md:text-4xl">
                  <Link href={`/article/${encodeURIComponent(article.title)}`} className="hover:underline">
                    {article.title}
                  </Link>
                </CardTitle>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2 md:text-base">
                  {article.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-8 right-8 hidden md:flex">
        <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0 opacity-100 group-hover:opacity-100" />
        <CarouselNext className="relative translate-x-0 translate-y-0 left-0 top-0 opacity-100 group-hover:opacity-100" />
      </div>
    </Carousel>
  );
}

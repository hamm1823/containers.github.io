import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;
  category: string;
  featured?: boolean;
}

const ProductCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Productos con imágenes reales de las marcas
  const products: Product[] = [
    // Nike Products
    {
      id: '1',
      brand: 'Nike',
      name: 'Air Max Premiere',
      price: '$180',
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
      category: 'running',
      featured: true
    },
    {
      id: '2',
      brand: 'Nike',
      name: 'Air Force 1',
      price: '$110',
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png',
      category: 'lifestyle'
    },
    // Adidas Products
    {
      id: '3',
      brand: 'Adidas',
      name: 'Ultraboost 5',
      price: '$190',
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a8bce4deabd0faf8d00ee14b0_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg',
      category: 'running',
      featured: true
    },
    {
      id: '4',
      brand: 'Adidas',
      name: 'Stan Smith',
      price: '$90',
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a615b4d55da14ff18dfbad2100fa2406_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg',
      category: 'lifestyle'
    },
    // Asics Products
    {
      id: '5',
      brand: 'Asics',
      name: 'Gel-Kayano 31',
      price: '$160',
      image: 'https://images.asics.com/is/image/asics/1011B440_400_SR_RT_GLB?$zoom$',
      category: 'running'
    },
    {
      id: '6',
      brand: 'Asics',
      name: 'Gel-Lyte III',
      price: '$120',
      image: 'https://images.asics.com/is/image/asics/1191A201_020_SR_RT_GLB?$zoom$',
      category: 'lifestyle',
      featured: true
    },
    // On Running Products
    {
      id: '7',
      brand: 'On',
      name: 'Cloud 5',
      price: '$140',
      image: 'https://cdn.shopify.com/s/files/1/0510/7809/files/31_99739_ALLWHITEMen_s-Cloud-5-Sneakers1.jpg?v=1692316191',
      category: 'running'
    },
    {
      id: '8',
      brand: 'On',
      name: 'Cloudnova',
      price: '$170',
      image: 'https://cdn.shopify.com/s/files/1/0510/7809/products/3ME30730903-ALLWHITEMen_sCloudnovaAllWhiteSneakers1.jpg?v=1655982739',
      category: 'lifestyle'
    },
    // New Balance Products
    {
      id: '9',
      brand: 'New Balance',
      name: '990v6',
      price: '$200',
      image: 'https://nb.scene7.com/is/image/NB/m990gr6_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600',
      category: 'lifestyle',
      featured: true
    },
    {
      id: '10',
      brand: 'New Balance',
      name: 'Fresh Foam X',
      price: '$150',
      image: 'https://nb.scene7.com/is/image/NB/mroav5-48217-24-10?$dw_detail_main_lg$',
      category: 'running'
    }
  ];

  const brands = ['all', 'Nike', 'Adidas', 'Asics', 'On', 'New Balance'];

  const filteredProducts = selectedBrand === 'all' 
    ? products 
    : products.filter(product => product.brand === selectedBrand);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, filteredProducts.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  // Reset index when brand changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedBrand]);

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent animate-slide-up">
            Nuestros Productos Destacados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-left">
            Descubre la mejor selección de zapatos deportivos de las marcas más reconocidas del mundo
          </p>
        </div>

        {/* Brand Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in-right">
          {brands.map((brand, index) => (
            <Button
              key={brand}
              variant={selectedBrand === brand ? "default" : "outline"}
              onClick={() => setSelectedBrand(brand)}
              className="capitalize transition-all duration-300 hover:scale-105 hover:shadow-brand animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={`Filtrar por marca ${brand}`}
            >
              {brand === 'all' ? 'Todas las Marcas' : brand}
            </Button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-1/3 flex-shrink-0 px-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Card className="card-brand group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 hover:rotate-1 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <img
                          src={product.image}
                          alt={`${product.brand} ${product.name} - Zapatos deportivos`}
                          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {product.featured && (
                          <Badge className="absolute top-2 left-2 bg-containers-red text-white animate-pulse-glow">
                            Destacado
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white transition-all duration-300 hover:scale-110 hover:rotate-12"
                          aria-label={`Agregar ${product.name} a favoritos`}
                        >
                          <Heart className="h-4 w-4 transition-colors hover:text-containers-red" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs transition-all duration-300 group-hover:bg-containers-red group-hover:text-white">
                          {product.brand}
                        </Badge>
                        <h3 className="font-semibold text-lg group-hover:text-containers-red transition-all duration-300 group-hover:scale-105">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground capitalize text-sm transition-opacity group-hover:opacity-80">
                          {product.category}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-containers-red transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse">
                            {product.price}
                          </span>
                          <Button 
                            size="sm" 
                            className="btn-brand transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            aria-label={`Agregar ${product.name} al carrito`}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover:animate-bounce" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-brand animate-float"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Producto anterior"
          >
            <ChevronLeft className="h-5 w-5 transition-transform hover:-translate-x-1" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-brand animate-float"
            style={{ animationDelay: '1s' }}
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Siguiente producto"
          >
            <ChevronRight className="h-5 w-5 transition-transform hover:translate-x-1" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2 animate-fade-in">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  currentIndex === index 
                    ? 'bg-containers-red animate-pulse-glow scale-110' 
                    : 'bg-muted hover:bg-containers-red/50 hover:scale-110'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a la página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
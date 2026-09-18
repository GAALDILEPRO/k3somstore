import { Hero } from '../components/home/Hero';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromoBanner } from '../components/home/PromoBanner';
import { NewArrivals } from '../components/home/NewArrivals';
import { WhyK3Som } from '../components/home/WhyK3Som';
import { Testimonials } from '../components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <WhyK3Som />
      <Testimonials />
    </div>
  );
}

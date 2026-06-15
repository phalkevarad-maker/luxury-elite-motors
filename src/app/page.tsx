import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturedCollections, BrandsCarousel, WhyChooseUs, CustomerReviews } from "@/components/landing/FeaturedCollections"
import { FinanceOptions, HomeDeliveryBanner, NewsLetter } from "@/components/landing/AdditionalSections"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BrandsCarousel />
      <WhyChooseUs />
      <CustomerReviews />
      <FinanceOptions />
      <HomeDeliveryBanner />
      <NewsLetter />
    </>
  )
}

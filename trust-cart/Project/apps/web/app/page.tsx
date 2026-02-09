import { FeaturesView } from "@/modules/features/UI/views/features-view";
import { HeroSectionView } from "@/modules/HeroSection/UI/View/hero-section-view";
import { CategoryView } from "@/modules/Home-Category/category-view";

export default function Page() {
    return(
     <>   
        <HeroSectionView/>
        <CategoryView/>
        <FeaturesView/>
     </>
    ) 
}
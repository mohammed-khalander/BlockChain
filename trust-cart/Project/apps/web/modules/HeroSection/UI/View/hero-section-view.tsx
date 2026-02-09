import { HeroSection } from "../Components/hero-section";

const menudata = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    imgAlt: 'laptop',
    userComment:
      'Amazing performance and sleek design. Perfect for work, coding, and everyday use.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
    imgAlt: 'smartphone',
    userComment:
      'Super fast phone with excellent camera quality. Battery easily lasts all day.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
    imgAlt: 'gaming-keyboard',
    userComment:
      'Solid build quality and smooth key response. Great for both gaming and typing.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    imgAlt: 'headphones',
    userComment:
      'Excellent sound clarity and noise cancellation. Totally worth the price.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png'
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    imgAlt: 'groceries',
    userComment:
      'Fresh groceries delivered in perfect condition. Quality packaging and fast delivery.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
  }
];


export const HeroSectionView = () => {
  return (
      <main className='flex flex-col'>
        <HeroSection menudata={menudata} />
      </main>
  )
}


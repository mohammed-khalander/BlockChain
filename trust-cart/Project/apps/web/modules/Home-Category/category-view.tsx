import { Blog } from './category'

const blogPosts = [
  {
    title: 'Electronics',
    description:
      'Explore cutting-edge gadgetsand smart devices powered by secure blockchain transactions.',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    imageAlt: 'electronics',
    date: ' ',
    category: 'Shop Category',
    author: ' ',
    authorLink: '/shop',
    blogLink: '#',
    categoryLink: '#'
  },
  {
    title: 'Groceries',
    description:
      'Buy fresh groceries with full supply-chain transparency and verified sourcing on the blockchain.',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    imageAlt: 'groceries',
    date: ' ',
    category: 'Shop Category',
    author: ' ',
    authorLink: '/shop',
    blogLink: '#',
    categoryLink: '#'
  },
  {
    title: 'Gaming',
    description:
      'Discover gaming gear and accessories with provable authenticity and secure decentralized payments.',
    imageUrl:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
    imageAlt: 'gaming',
    date: ' ',
    category: 'Shop Category',
    author: ' ',
    authorLink: '/shop',
    blogLink: '#',
    categoryLink: '#'
  }
]

export const CategoryView = () => {
  return <Blog blogPosts={blogPosts} />
}

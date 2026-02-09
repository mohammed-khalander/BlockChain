import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import { Logo } from './logo'

export const Footer = () => {
  return (
    <footer>
      <Separator />
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <a href='/'>
          <div className='flex items-center gap-3'>
            <Logo className='gap-3' />
          </div>
        </a>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          <a href='/' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Home
          </a>
          <a href='/shop' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Shop
          </a>
          <a href='/file-upload' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Admin
          </a>
          <a href='/order' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
            Orders
          </a>
        </div>

        <div className='flex items-center gap-4'>
          <a href='#'>
            <FacebookIcon className='size-5' />
          </a>
          <a href='#'>
            <InstagramIcon className='size-5' />
          </a>
          <a href='#'>
            <TwitterIcon className='size-5' />
          </a>
          <a href='#'>
            <YoutubeIcon className='size-5' />
          </a>
        </div>
      </div>


      <div className='mx-auto flex max-w-7xl justify-center px-4 pt-2 pb-10 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <a href='#' className='hover:underline'>
            TrustCart
          </a>
          , Made with ❤️ for better web3.
        </p>
      </div>
    </footer>
  )
}


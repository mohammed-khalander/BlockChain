import {
  SwatchBookIcon,
  SearchIcon,
  StarIcon,
  SmartphoneIcon,
  LockKeyholeIcon,
  ShieldBanIcon
} from 'lucide-react'

import Features from '../components/features'

const featuresList = [
  {
    icon: SwatchBookIcon,
    title: 'Decentralized User Experience',
    description:
      'Interact seamlessly with a blockchain-powered interface designed for transparency, speed, and consistency across all devices.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  },
  {
    icon: ShieldBanIcon,
    title: 'Blockchain-Secured Payments',
description:
  'Complete purchases through smart contracts that ensure transparent, verifiable, and secure transactions without relying on intermediaries.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10'
  },
  {
    icon: SearchIcon,
    title: 'On-Chain Product Discovery',
    description:
      'Search and filter products with blockchain-backed metadata, ensuring authenticity, provenance, and real-time availability.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10'
  },
  {
    icon: StarIcon,
    title: 'Verified Reviews & Ratings',
    description:
      'Access tamper-proof reviews recorded on the blockchain, guaranteeing genuine feedback from verified purchasers.',
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10'
  },
  {
    icon: SmartphoneIcon,
    title: 'Web3 Mobile Access',
    description:
      'Connect your wallet and manage purchases on the go with full blockchain functionality through mobile-ready Web3 experiences.',
    cardBorderColor: 'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10'
  },
  {
    icon: LockKeyholeIcon,
    title: 'On-Chain Security & Identity',
    description:
      'Protect assets and identities with cryptographic security, wallet-based authentication, and decentralized fraud prevention.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  }
]

export const FeaturesView = () => {
  return <Features featuresList={featuresList} />
}

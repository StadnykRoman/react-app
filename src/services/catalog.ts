import { Treatment } from '../types';

class CatalogService {
  getTreatments(): Treatment[] {
    return [
      {
        id: '1',
        name: 'FUE Hair Transplant',
        description: 'Modern hair transplant method without scars. Perfect for hair restoration on the head.',
        duration: '4-6 hours',
        price: 50000,
        category: 'hair-transplant',
      },
      {
        id: '2',
        name: 'PRP Therapy',
        description: 'Platelet-rich plasma injections to stimulate hair growth.',
        duration: '1 hour',
        price: 3000,
        category: 'prp',
      },
      {
        id: '3',
        name: 'Hair Mesotherapy',
        description: 'Vitamin and mineral injections to improve hair and scalp condition.',
        duration: '45 minutes',
        price: 2500,
        category: 'mesotherapy',
      },
      {
        id: '4',
        name: 'Trichologist Consultation',
        description: 'Detailed hair condition examination and individual treatment plan development.',
        duration: '1 hour',
        price: 1500,
        category: 'consultation',
      },
      {
        id: '5',
        name: 'Sapphire FUE',
        description: 'Premium transplant method using sapphire needles for maximum precision.',
        duration: '6-8 hours',
        price: 75000,
        category: 'hair-transplant',
      },
      {
        id: '6',
        name: 'Comprehensive Examination',
        description: 'Complete hair condition examination including tests and trichoscopy.',
        duration: '2 hours',
        price: 2000,
        category: 'consultation',
      },
    ];
  }
}

export const catalogService = new CatalogService();


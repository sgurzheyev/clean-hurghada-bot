export type Language = 'en' | 'ar';

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  image?: string; // base64
  isWidget?: boolean;
  widgetType?: 'calculator' | 'booking' | 'payment';
}

export interface PricingConfig {
  basePrice: number;
  extras: number;
  total: number;
  currency: string;
}

export enum PropertyType {
  STUDIO = 'Studio',
  ONE_BED = '1 Bedroom',
  TWO_BED = '2 Bedrooms',
  VILLA = 'Villa / 3+ Beds'
}

export enum CleaningType {
  STANDARD = 'Standard',
  DEEP = 'Deep Clean',
  AIRBNB = 'Airbnb Turnover',
  RENOVATION = 'After Renovation'
}

export interface BookingData {
  name: string;
  phone: string;
  area: string;
  date: string;
  details: string;
  price: number;
  cleanerPreference: string;
}
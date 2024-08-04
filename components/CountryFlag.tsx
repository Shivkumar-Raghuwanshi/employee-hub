import React from 'react';
import Image from 'next/image';

const countryCodeMap: { [key: string]: string } = {
  'Afghanistan': 'AF',
  'Albania': 'AL',
  'Algeria': 'DZ',
  'Argentina': 'AR',
  'Australia': 'AU',
  'Austria': 'AT',
  'Bangladesh': 'BD',
  'Belgium': 'BE',
  'Brazil': 'BR',
  'Canada': 'CA',
  'China': 'CN',
  'Colombia': 'CO',
  'Denmark': 'DK',
  'Egypt': 'EG',
  'Finland': 'FI',
  'France': 'FR',
  'Germany': 'DE',
  'Greece': 'GR',
  'India': 'IN',
  'Indonesia': 'ID',
  'Iran': 'IR',
  'Iraq': 'IQ',
  'Ireland': 'IE',
  'Israel': 'IL',
  'Italy': 'IT',
  'Japan': 'JP',
  'Mexico': 'MX',
  'Netherlands': 'NL',
  'New Zealand': 'NZ',
  'Nigeria': 'NG',
  'Norway': 'NO',
  'Pakistan': 'PK',
  'Poland': 'PL',
  'Portugal': 'PT',
  'Russia': 'RU',
  'Saudi Arabia': 'SA',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  'Spain': 'ES',
  'Sweden': 'SE',
  'Switzerland': 'CH',
  'Turkey': 'TR',
  'Ukraine': 'UA',
  'United Arab Emirates': 'AE',
  'United Kingdom': 'GB',
  'United States': 'US',
  'Vietnam': 'VN'
};

interface CountryFlagProps {
  country: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CountryFlag({ country, size = 'md', className = '' }: CountryFlagProps) {
  const countryCode = countryCodeMap[country] || 'UN';
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shadow-lg ${className}`}>
      <Image
        src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
        alt={`${country} flag`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
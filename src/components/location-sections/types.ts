import type { Location } from '../../types/entities';

export interface SectionProps {
  draft: Partial<Location>;
  onChange: <K extends keyof Location>(field: K, value: Location[K]) => void;
  locationId: string | null;
  worldId: string;
}
export interface ViewSectionProps {
  draft: Partial<Location>;
  locationId: string | null;
  worldId: string;
}



export const FANTASY_LOCATION_TYPES = [
  { value: 'city', label: 'City / Settlement', icon: 'IconBuilding', description: 'Capitals, towns, villages' },
  { value: 'wilderness', label: 'Wilderness', icon: 'IconTrees', description: 'Forests, moors, mountains' },
  { value: 'ruin', label: 'Ruin', icon: 'IconBuildingCastle', description: 'Fallen structures, relics' },
  { value: 'stronghold', label: 'Stronghold', icon: 'IconShield', description: 'Fortresses, watchtowers' },
  { value: 'port', label: 'Port / Coast', icon: 'IconAnchor', description: 'Harbours, sea routes' },
  { value: 'sacred', label: 'Sacred Site', icon: 'IconFlame', description: 'Shrines, holy ground' },
  { value: 'underground', label: 'Underground', icon: 'IconArrowDown', description: 'Caves, tunnels, vaults' },
  { value: 'crossing', label: 'Crossing / Road', icon: 'IconRoute', description: 'Trade routes, bridges' },
  { value: 'other', label: 'Other', icon: 'IconDots', description: 'Define your own' },
];

export const ROMANCE_LOCATION_TYPES = [
  { value: 'home', label: 'Home / Residence', icon: 'IconHome', description: 'Houses, flats, estates' },
  { value: 'business', label: 'Business / Shop', icon: 'IconBuildingStore', description: 'Cafés, offices, boutiques' },
  { value: 'social', label: 'Social Venue', icon: 'IconGlass', description: 'Restaurants, bars, galas' },
  { value: 'outdoor', label: 'Outdoor Space', icon: 'IconTrees', description: 'Gardens, parks, beaches' },
  { value: 'transit', label: 'Travel / Transit', icon: 'IconCar', description: 'Trains, airports, roads' },
  { value: 'town', label: 'Town / City', icon: 'IconMapPin', description: 'The wider setting' },
  { value: 'retreat', label: 'Private Retreat', icon: 'IconHeart', description: 'Cabins, hideaways' },
  { value: 'workplace', label: 'Workplace', icon: 'IconBriefcase', description: 'Studios, labs, firms' },
  { value: 'other', label: 'Other', icon: 'IconDots', description: 'Define your own' },
];

export const HISTORICAL_LOCATION_TYPES = [
  { value: 'residence', label: 'Residence', icon: 'IconHome', description: 'Houses, estates, lodgings' },
  { value: 'institution', label: 'Institution', icon: 'IconBuilding', description: 'Clubs, courts, offices' },
  { value: 'public', label: 'Public Space', icon: 'IconUsers', description: 'Parks, markets, squares' },
  { value: 'commercial', label: 'Commercial', icon: 'IconCoin', description: 'Shops, exchanges, banks' },
  { value: 'religious', label: 'Religious', icon: 'IconBuildingChurch', description: 'Churches, abbeys, shrines' },
  { value: 'underworld', label: 'Underworld', icon: 'IconLock', description: 'Illicit, hidden, dangerous' },
  { value: 'district', label: 'District / Quarter', icon: 'IconMap', description: 'Neighbourhoods, wards' },
  { value: 'rural', label: 'Rural / Country', icon: 'IconTrees', description: 'Villages, estates, moors' },
  { value: 'other', label: 'Other', icon: 'IconDots', description: 'Define your own' },
];
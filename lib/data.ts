// Mock data types
export interface Order {
  id: string;
  customerName: string;
  phone: string;
  called: number;
  agent: string;
  referrer: string;
  orderDate: string;
  updatedDate: string;
  recallTime?: string;
  reason?: string;
  product: string;
  sku: string;
  quantity: number;
  price: number;
  currency: string;
  country: string;
  address: string;
  status: 'new' | 'approved' | 'cancelled' | 'shipped' | 'unreachable' | 'call_later' | 'trash';
}

export interface ShipmentList {
  id: string;
  name: string;
  orderQuantity: number;
  productQuantity: number;
  totalValue: number;
  createdDate: string;
}

export interface Product {
  id: number;
  name: string;
  country: string;
  currency: string;
  price: number;
  quantity: number;
  sku: string;
  status: 'active' | 'passive';
}

export interface LandingKey {
  key: string;
  connectedSites: number;
}

export interface User {
  email: string;
  role: string;
  country: string;
  product: string;
  status: 'active' | 'passive';
}

export interface Country {
  name: string;
  code: string;
  currency: string;
  status: 'active' | 'passive';
}

export interface City {
  name: string;
  country: string;
  status: 'active';
}

export interface StatusItem {
  firstStatus: string;
  secondStatus: string;
  description: string;
}

export interface AgentOrder {
  orderNo: string;
  customerName: string;
  phone: string;
  called: number;
  orderDate: string;
  product: string;
  price: number;
  updatedAt: string;
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: 15,
    name: "Dufort Perfume",
    country: "SA",
    currency: "SAR",
    price: 339,
    quantity: 1,
    sku: "DF001",
    status: "active"
  },
  {
    id: 22,
    name: "Royal Amber",
    country: "SA",
    currency: "SAR",
    price: 445,
    quantity: 3,
    sku: "RA002",
    status: "active"
  },
  {
    id: 31,
    name: "Desert Rose",
    country: "SA",
    currency: "SAR",
    price: 289,
    quantity: 0,
    sku: "DR003",
    status: "passive"
  },
  {
    id: 44,
    name: "Midnight Oud",
    country: "SA",
    currency: "SAR",
    price: 519,
    quantity: 5,
    sku: "MO004",
    status: "active"
  },
  {
    id: 28,
    name: "Golden Sands",
    country: "SA",
    currency: "SAR",
    price: 399,
    quantity: 2,
    sku: "GS005",
    status: "active"
  }
];

// Mock landing keys
export const mockLandingKeys: LandingKey[] = Array.from({ length: 5 }, () => ({
  key: Array.from({ length: 35 }, () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  }).join(''),
  connectedSites: Math.floor(Math.random() * 10) + 1
}));

// Mock users
export const mockUsers: User[] = [
  {
    email: "agent1@example.com",
    role: "Agent",
    country: "SA",
    product: "Dufort Perfume",
    status: "active"
  },
  {
    email: "agent2@example.com",
    role: "Agent",
    country: "SA",
    product: "Royal Amber",
    status: "active"
  },
  {
    email: "agent3@example.com",
    role: "Agent",
    country: "SA",
    product: "Desert Rose",
    status: "passive"
  }
];

// Mock countries
export const mockCountries: Country[] = [
  {
    name: "Saudi Arabia",
    code: "SA",
    currency: "SAR",
    status: "active"
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    currency: "AED",
    status: "active"
  },
  {
    name: "Kuwait",
    code: "KW",
    currency: "KWD",
    status: "passive"
  }
];

// Mock cities
export const mockCities: City[] = [
  {
    name: "Riyadh",
    country: "Saudi Arabia",
    status: "active"
  },
  {
    name: "Jeddah",
    country: "Saudi Arabia",
    status: "active"
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    status: "active"
  }
];

// Mock status list
export const mockStatusList: StatusItem[] = [
  {
    firstStatus: "Approved",
    secondStatus: "-",
    description: "-"
  },
  {
    firstStatus: "Canceled",
    secondStatus: "expensive",
    description: "client said expensive product"
  },
  {
    firstStatus: "Pending",
    secondStatus: "callback",
    description: "customer requested callback"
  }
];

// Mock orders data
export const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => {
  const statuses: Order['status'][] = ['new', 'approved', 'cancelled', 'shipped', 'unreachable', 'call_later', 'trash'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomDay = Math.floor(Math.random() * 28) + 1;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  
  return {
    id: `ORD${(i + 1).toString().padStart(3, '0')}`,
    customerName: `Customer ${i + 1}`,
    phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    called: Math.floor(Math.random() * 5),
    agent: `Agent ${Math.floor(Math.random() * 10) + 1}`,
    referrer: ['Facebook', 'Instagram', 'Google', 'Direct'][Math.floor(Math.random() * 4)],
    orderDate: `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/2025`,
    updatedDate: `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/2025`,
    recallTime: randomStatus === 'call_later' ? `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/2025 ${Math.floor(Math.random() * 12) + 9}:00` : undefined,
    reason: randomStatus === 'trash' ? ['Wrong number', 'Duplicate order'][Math.floor(Math.random() * 2)] : undefined,
    product: `Product ${Math.floor(Math.random() * 20) + 1}`,
    sku: `SKU${Math.floor(Math.random() * 1000)}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    price: Math.floor(Math.random() * 500) + 50,
    currency: 'USD',
    country: ['USA', 'Canada', 'UK', 'Australia'][Math.floor(Math.random() * 4)],
    address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State, Country`,
    status: randomStatus
  };
});

// Generate mock shipment lists
export const mockShipmentLists: ShipmentList[] = Array.from({ length: 15 }, (_, i) => {
  const randomDay = Math.floor(Math.random() * 28) + 1;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  return {
    id: `SL${(i + 1).toString().padStart(3, '0')}`,
    name: `List${Math.floor(Math.random() * 10) + 1} ${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/2025`,
    orderQuantity: Math.floor(Math.random() * 41) + 10,
    productQuantity: Math.floor(Math.random() * 51) + 50,
    totalValue: Math.floor(Math.random() * 4182) + 1055,
    createdDate: `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/2025`
  };
});

// Mock weekly sales data
export const mockWeeklySales = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`,
    sales: Math.floor(Math.random() * 5000) + 1000,
    orders: Math.floor(Math.random() * 50) + 10,
    approved: Math.floor(Math.random() * 40) + 5,
    cancelled: Math.floor(Math.random() * 10) + 1,
    conversion: Math.floor(Math.random() * 30) + 60
  };
});

// Mock stats data
export const mockStats = {
  todayOrders: {
    current: Math.floor(Math.random() * 50) + 20,
    previous: Math.floor(Math.random() * 50) + 20,
    trend: 'increase' as const
  },
  todaySales: {
    current: Math.floor(Math.random() * 5000) + 1000,
    previous: Math.floor(Math.random() * 5000) + 1000,
    trend: 'increase' as const
  },
  todayApproved: {
    current: Math.floor(Math.random() * 40) + 10,
    previous: Math.floor(Math.random() * 40) + 10,
    trend: 'increase' as const
  },
  todayCancelled: {
    current: Math.floor(Math.random() * 10) + 1,
    previous: Math.floor(Math.random() * 10) + 1,
    trend: 'decrease' as const
  }
};

// Mock agent stats
export const mockAgentStats = {
  todayApproved: 15,
  todayCancelled: 5,
  totalWaiting: 25,
};

// Mock agent orders
export const mockAgentOrders: AgentOrder[] = Array.from({ length: 50 }, (_, i) => ({
  orderNo: `ORD${(i + 1).toString().padStart(3, '0')}`,
  customerName: `Customer ${i + 1}`,
  phone: `+1${(4013274436 + i).toString().padStart(10, '0')}`,
  called: i % 5,
  orderDate: `${((i % 28) + 1).toString().padStart(2, '0')}/${((i % 12) + 1).toString().padStart(2, '0')}/2025`,
  product: `Product ${(i % 20) + 1}`,
  price: 50 + (i * 10),
  updatedAt: `${((i % 28) + 1).toString().padStart(2, '0')}/${((i % 12) + 1).toString().padStart(2, '0')}/2025`,
}));
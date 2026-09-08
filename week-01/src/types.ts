export interface Instrument {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
}

export interface InstrumentSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: Instrument;
  cheapest: Instrument;
  categories: string[];
}

export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: InstrumentSummary;
  items: Instrument[];
}

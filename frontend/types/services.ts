export interface ServiceItem {
    id: string;
    subtitle: string;
    description: string;
  }
  
  export interface ServiceCategory {
    id: string;
    title: string;
    items?: ServiceItem[];
    description?: string;
  }
  
  export interface ServicesData {
    services: ServiceCategory[];
  }
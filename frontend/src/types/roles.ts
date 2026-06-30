export type UserRole = 'farmer' | 'officer' | 'admin';

export interface RolePermissions {
  scanCrops: boolean;
  viewReports: boolean;
  marketPrices: boolean;
  community: boolean;
  verifyDiseases: boolean;
  publishAlerts: boolean;
  manageUsers: boolean;
  manageSchemes: boolean;
  manageMarketData: boolean;
  manageAIModel: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  farmer: {
    scanCrops: true,
    viewReports: true,
    marketPrices: true,
    community: true,
    verifyDiseases: false,
    publishAlerts: false,
    manageUsers: false,
    manageSchemes: false,
    manageMarketData: false,
    manageAIModel: false,
  },
  officer: {
    scanCrops: true,
    viewReports: true,
    marketPrices: true,
    community: true,
    verifyDiseases: true,
    publishAlerts: true,
    manageUsers: false,
    manageSchemes: false,
    manageMarketData: false,
    manageAIModel: false,
  },
  admin: {
    scanCrops: true,
    viewReports: true,
    marketPrices: true,
    community: true,
    verifyDiseases: true,
    publishAlerts: true,
    manageUsers: true,
    manageSchemes: true,
    manageMarketData: true,
    manageAIModel: true,
  },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  farmer: 'Farmer',
  officer: 'Agricultural Officer',
  admin: 'Administrator',
};

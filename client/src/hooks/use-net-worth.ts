import { useState, useMemo } from 'react';

export type AgeGroup = '<35' | '35-44' | '45-54' | '55-64' | '65+';
export type Province = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'ON' | 'PEI' | 'QC' | 'SK';

const MEDIAN_NET_WORTH: Record<AgeGroup | 'default', number> = {
  '<35': 159100,
  '35-44': 409300,
  '45-54': 675800,
  '55-64': 873000,
  '65+': 739000,
  'default': 519700
};

export function useNetWorth() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | ''>('');
  const [province, setProvince] = useState<Province | ''>('');
  
  const [inputType, setInputType] = useState<'direct' | 'calculate'>('calculate');
  
  // Direct Input State
  const [directNetWorth, setDirectNetWorth] = useState<number>(0);
  
  // Calculated Input States
  const [assets, setAssets] = useState({
    banks: 0,
    investments: 0,
    home: 0,
    vehicles: 0
  });
  
  const [liabilities, setLiabilities] = useState({
    mortgage: 0,
    creditCards: 0,
    carLoan: 0,
    studentLoan: 0
  });

  const updateAsset = (key: keyof typeof assets, value: number) => {
    setAssets(prev => ({ ...prev, [key]: value }));
  };

  const updateLiability = (key: keyof typeof liabilities, value: number) => {
    setLiabilities(prev => ({ ...prev, [key]: value }));
  };

  const totalAssets = useMemo(() => 
    Object.values(assets).reduce((sum, val) => sum + (val || 0), 0)
  , [assets]);

  const totalLiabilities = useMemo(() => 
    Object.values(liabilities).reduce((sum, val) => sum + (val || 0), 0)
  , [liabilities]);

  const calculatedNetWorth = totalAssets - totalLiabilities;
  
  const netWorth = inputType === 'direct' ? directNetWorth : calculatedNetWorth;
  
  const targetMedian = ageGroup ? MEDIAN_NET_WORTH[ageGroup] : MEDIAN_NET_WORTH.default;
  const difference = netWorth - targetMedian;
  const isAboveMedian = difference >= 0;

  return {
    // Personal Info
    ageGroup,
    setAgeGroup,
    province,
    setProvince,
    
    // Modes
    inputType,
    setInputType,
    
    // Direct
    directNetWorth,
    setDirectNetWorth,
    
    // Calculated
    assets,
    updateAsset,
    liabilities,
    updateLiability,
    
    // Results
    totalAssets,
    totalLiabilities,
    netWorth,
    targetMedian,
    difference,
    isAboveMedian
  };
}

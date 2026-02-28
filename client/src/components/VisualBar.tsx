import React from 'react';
import { motion } from 'framer-motion';

interface VisualBarProps {
  userValue: number;
  medianValue: number;
}

export function VisualBar({ userValue, medianValue }: VisualBarProps) {
  const maxValue = Math.max(Math.abs(userValue), medianValue) * 1.3 || 100000;
  
  const formatCompact = (val: number) => {
    return new Intl.NumberFormat('en-CA', { 
      notation: "compact", 
      compactDisplay: "short",
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 1
    }).format(val);
  };

  // Handle negative values safely in visualization
  const displayUserValue = Math.max(0, userValue);
  const userPercent = (displayUserValue / maxValue) * 100;
  const medianPercent = (medianValue / maxValue) * 100;

  const isAbove = userValue >= medianValue;

  return (
    <div className="relative w-full pt-8 pb-4">
      {/* Track */}
      <div className="h-4 bg-secondary rounded-full overflow-hidden relative">
        {/* User Fill */}
        <motion.div 
          className={`absolute top-0 left-0 h-full rounded-full ${isAbove ? 'bg-primary' : 'bg-muted-foreground'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, userPercent)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Median Marker */}
      <motion.div 
        className="absolute top-2 bottom-0 w-0.5 bg-foreground/30 z-10"
        initial={{ left: 0 }}
        animate={{ left: `${medianPercent}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-muted-foreground">
          Median ({formatCompact(medianValue)})
        </div>
      </motion.div>
      
      {/* Legend / Axis Hints */}
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
        <span>$0</span>
        <span>{formatCompact(maxValue)}</span>
      </div>
    </div>
  );
}

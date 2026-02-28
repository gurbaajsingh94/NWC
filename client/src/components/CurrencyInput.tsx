import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CurrencyInputProps extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  id?: string;
}

export function CurrencyInput({ label, value, onValueChange, id, ...props }: CurrencyInputProps) {
  const generatedId = id || label.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <div className="space-y-2">
      <Label htmlFor={generatedId} className="text-sm font-medium text-foreground/80">
        {label}
      </Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <span className="text-muted-foreground font-medium">$</span>
        </div>
        <NumericFormat
          id={generatedId}
          value={value === 0 ? '' : value}
          onValueChange={(values) => {
            onValueChange(values.floatValue || 0);
          }}
          thousandSeparator={true}
          decimalScale={0}
          allowNegative={true}
          customInput={Input}
          className="pl-8 bg-background border-border/60 hover:border-border focus-visible:ring-primary/20 transition-colors h-12 rounded-xl"
          placeholder="0"
          {...props}
        />
      </div>
    </div>
  );
}

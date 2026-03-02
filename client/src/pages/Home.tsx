import React, { useState } from 'react';
import { useNetWorth } from '@/hooks/use-net-worth';
import { CurrencyInput } from '@/components/CurrencyInput';
import { VisualBar } from '@/components/VisualBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  const [showAdvice, setShowAdvice] = useState(false);
  const {
    ageGroup, setAgeGroup,
    province, setProvince,
    inputType, setInputType,
    directNetWorth, setDirectNetWorth,
    assets, updateAsset,
    liabilities, updateLiability,
    totalAssets, totalLiabilities,
    netWorth, targetMedian, difference, isAboveMedian
  } = useNetWorth();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Minimal Header */}
      <header className="pt-16 pb-12 px-6 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm mb-4">
            Privacy First • Local Calculation
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-4">
            <span className="text-muted-foreground/60 font-medium block text-2xl md:text-3xl mb-2">You know where you are going.</span>
            We help you find where you are.
          </h1>
          <p className="text-lg text-muted-foreground text-balance mx-auto">
            Benchmark your financial standing against Canadian medians. Your data never leaves your device.
          </p>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Demographic Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <CardTitle className="text-lg">About You</CardTitle>
                  <CardDescription>This helps us find the right benchmark for you.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground/80">Age Group (Optional)</Label>
                    <Select value={ageGroup} onValueChange={(val: any) => setAgeGroup(val)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select Age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<35">Under 35</SelectItem>
                        <SelectItem value="35-44">35 - 44</SelectItem>
                        <SelectItem value="45-54">45 - 54</SelectItem>
                        <SelectItem value="55-64">55 - 64</SelectItem>
                        <SelectItem value="65+">65 and older</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground/80">Location (Optional)</Label>
                    <Select value={province} onValueChange={(val: any) => setProvince(val)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PEI', 'QC', 'SK'].map(prov => (
                          <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Financial Inputs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="border-border/50 shadow-sm rounded-2xl">
                <CardHeader className="bg-muted/30 pb-4">
                  <CardTitle className="text-lg flex justify-between items-center">
                    Financial Profile
                    <Tabs value={inputType} onValueChange={(v: any) => setInputType(v)} className="w-[240px]">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="calculate" className="text-xs">Calculate</TabsTrigger>
                        <TabsTrigger value="direct" className="text-xs">Direct Input</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  
                  <AnimatePresence mode="wait">
                    {inputType === 'direct' ? (
                      <motion.div
                        key="direct"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="py-4"
                      >
                        <CurrencyInput
                          label="Total Net Worth"
                          value={directNetWorth}
                          onValueChange={setDirectNetWorth}
                        />
                        <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <p>Enter your total net worth if you already know it. Otherwise, switch to Calculate to estimate it.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="calculate"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="space-y-8">
                          {/* Assets */}
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <h3 className="font-semibold text-foreground">Assets</h3>
                              <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">Things you own</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <CurrencyInput label="Money in Banks" value={assets.banks} onValueChange={(v) => updateAsset('banks', v)} />
                              <CurrencyInput label="Investments" value={assets.investments} onValueChange={(v) => updateAsset('investments', v)} />
                              <CurrencyInput label="Home / Property Value" value={assets.home} onValueChange={(v) => updateAsset('home', v)} />
                              <CurrencyInput label="Vehicles" value={assets.vehicles} onValueChange={(v) => updateAsset('vehicles', v)} />
                            </div>
                          </div>

                          <Separator />

                          {/* Liabilities */}
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <h3 className="font-semibold text-foreground">Liabilities</h3>
                              <span className="text-xs font-medium px-2 py-0.5 bg-destructive/10 text-destructive rounded-full">Things you owe</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <CurrencyInput label="Mortgage" value={liabilities.mortgage} onValueChange={(v) => updateLiability('mortgage', v)} />
                              <CurrencyInput label="Credit Cards" value={liabilities.creditCards} onValueChange={(v) => updateLiability('creditCards', v)} />
                              <CurrencyInput label="Car Loans" value={liabilities.carLoan} onValueChange={(v) => updateLiability('carLoan', v)} />
                              <CurrencyInput label="Student Loans" value={liabilities.studentLoan} onValueChange={(v) => updateLiability('studentLoan', v)} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Results (Sticky) */}
          <div className="lg:col-span-5">
            <motion.div 
              className="sticky top-8 space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-panel rounded-3xl overflow-hidden border-border/40">
                <div className="p-8 pb-4">
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Estimated Net Worth</p>
                    <h2 className="text-5xl font-display font-bold text-foreground tracking-tight">
                      {formatCurrency(netWorth)}
                    </h2>
                  </div>

                  <VisualBar userValue={netWorth} medianValue={targetMedian} />

                  <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                    <p className="text-lg font-medium leading-relaxed text-foreground/90">
                      Your net worth is <span className={`font-bold ${isAboveMedian ? 'text-primary' : difference < 0 ? 'text-destructive' : ''}`}>{formatCurrency(Math.abs(difference))}</span>{' '}
                      {difference === 0 ? 'equal to' : isAboveMedian ? 'higher than' : 'lower than'}{' '}
                      the Canadian median
                      {ageGroup ? ` for ages ${ageGroup}` : ''}.
                    </p>

                    {!isAboveMedian && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          If you’re not where you want to be financially,{' '}
                          <button 
                            onClick={() => setShowAdvice(!showAdvice)}
                            className="text-primary font-semibold hover:underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
                          >
                            here’s
                            {showAdvice ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>{' '}
                          how to move forward.
                        </p>
                        
                        <AnimatePresence>
                          {showAdvice && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl text-sm leading-relaxed text-foreground/80 italic">
                                “If you’re not where you want to be financially, this is your reset — not your verdict. Breathe. Start where you are. Save a little. Invest a little. The goal isn’t catching up. It’s moving forward.”
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>

                {/* Breakdown Summary for Calculated Mode */}
                <AnimatePresence>
                  {inputType === 'calculate' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-muted/20 border-t border-border/50"
                    >
                      <div className="p-6 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                          <p className="text-xl font-semibold text-foreground">{formatCurrency(totalAssets)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Liabilities</p>
                          <p className="text-xl font-semibold text-destructive">{formatCurrency(totalLiabilities)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Context Note */}
              <p className="text-xs text-center text-muted-foreground/80 px-4">
                Median data based on the latest available Canadian economic surveys. Net worth calculations do not constitute financial advice.
              </p>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}

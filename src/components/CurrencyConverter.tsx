import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, TrendingUp, History, Info } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const mockRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.25,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.45,
  };

  const mockTrends = {
    EUR: '+0.2%',
    GBP: '-0.1%',
    JPY: '+0.3%',
    AUD: '-0.4%',
    CAD: '+0.1%',
    CHF: '-0.2%',
    CNY: '+0.5%',
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    const baseAmount = parseFloat(amount) || 0;
    const rate = (mockRates[toCurrency as keyof typeof mockRates] / 
                 mockRates[fromCurrency as keyof typeof mockRates]);
    setConvertedAmount(baseAmount * rate);
  }, [amount, fromCurrency, toCurrency]);

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600';
  };

  console.log(mockRates);

  console.log(mockTrends);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-neutral-900">Currency Converter</h3>
        <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Update Rates</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,auto,2fr] gap-4 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                min="0"
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              >
                {Object.keys(mockRates).map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSwapCurrencies}
            className="self-end p-3 text-neutral-600 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-50"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>

          <div className="space-y-4">
            <div className="opacity-0 pointer-events-none">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Amount</label>
              <input className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg" disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              >
                {Object.keys(mockRates).map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <div className="space-y-1">
              <p className="text-sm text-neutral-600">
                {amount} {fromCurrency}
              </p>
              <p className="text-2xl font-medium text-neutral-900">
                {convertedAmount.toFixed(2)} {toCurrency}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-600">Exchange Rate</p>
              <p className="text-lg font-medium text-neutral-900">
                1 {fromCurrency} = {(mockRates[toCurrency as keyof typeof mockRates] / 
                                   mockRates[fromCurrency as keyof typeof mockRates]).toFixed(4)} {toCurrency}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-500 pt-2 border-t border-neutral-200">
            <div className="flex items-center gap-1">
              <History className="w-4 h-4" />
              <span>Last updated: 5 minutes ago</span>
            </div>
            {toCurrency !== 'USD' && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className={getTrendColor(mockTrends[toCurrency as keyof typeof mockTrends])}>
                  {mockTrends[toCurrency as keyof typeof mockTrends]}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg">
          <Info className="w-5 h-5 mt-0.5" />
          <p className="text-sm">
            Exchange rates are for informational purposes only. Actual rates may vary at the time of transaction.
          </p>
        </div>
      </div>
    </div>
  );
}
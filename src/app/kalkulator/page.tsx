'use client';

import React, { useState } from 'react';
import CalculatorInput from '@/components/CalculatorInput';

// Metadata must be exported from a separate file or layout for client components.
// We set it via generateMetadata in a co-located layout or head.

type Tab = 'margin' | 'lotSize' | 'profitLoss';

interface PairInfo {
  contractSize: number;
  pipValue: number; // per standard lot per pip in USD (approx)
}

const PAIRS: Record<string, PairInfo> = {
  'EUR/USD': { contractSize: 100000, pipValue: 10 },
  'GBP/USD': { contractSize: 100000, pipValue: 10 },
  'USD/JPY': { contractSize: 100000, pipValue: 6.7 },
  'AUD/USD': { contractSize: 100000, pipValue: 10 },
  'USD/CHF': { contractSize: 100000, pipValue: 9.2 },
  'NZD/USD': { contractSize: 100000, pipValue: 10 },
  'USD/CAD': { contractSize: 100000, pipValue: 7.5 },
  'XAU/USD': { contractSize: 100, pipValue: 1 },
};

const pairOptions = Object.keys(PAIRS).map((p) => ({ label: p, value: p }));

const leverageOptions = [
  { label: '1:50', value: '50' },
  { label: '1:100', value: '100' },
  { label: '1:200', value: '200' },
  { label: '1:500', value: '500' },
  { label: '1:1000', value: '1000' },
];

const tabs: { key: Tab; label: string }[] = [
  { key: 'margin', label: 'Margin Calculator' },
  { key: 'lotSize', label: 'Lot Size Calculator' },
  { key: 'profitLoss', label: 'Profit/Loss Calculator' },
];

// ---------- Margin Calculator ----------

function MarginCalculator() {
  const [pair, setPair] = useState('EUR/USD');
  const [lotSize, setLotSize] = useState('1');
  const [leverage, setLeverage] = useState('100');
  const [price, setPrice] = useState('1.1000');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const info = PAIRS[pair];
    if (!info) return;
    const lots = parseFloat(lotSize);
    const lev = parseFloat(leverage);
    const p = parseFloat(price);
    if (isNaN(lots) || isNaN(lev) || isNaN(p) || lev === 0) return;
    const margin = (lots * info.contractSize * p) / lev;
    setResult(margin);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorInput
          label="Account Currency"
          id="margin-currency"
          type="select"
          value="USD"
          onChange={() => {}}
          options={[{ label: 'USD', value: 'USD' }]}
        />
        <CalculatorInput
          label="Pair"
          id="margin-pair"
          type="select"
          value={pair}
          onChange={setPair}
          options={pairOptions}
        />
        <CalculatorInput
          label="Lot Size"
          id="margin-lot"
          value={lotSize}
          onChange={setLotSize}
          placeholder="e.g. 1"
          min={0.01}
          step={0.01}
        />
        <CalculatorInput
          label="Leverage"
          id="margin-leverage"
          type="select"
          value={leverage}
          onChange={setLeverage}
          options={leverageOptions}
        />
        <CalculatorInput
          label="Price"
          id="margin-price"
          value={price}
          onChange={setPrice}
          placeholder="e.g. 1.1000"
          step={0.0001}
        />
      </div>
      <button
        onClick={calculate}
        className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Calculate Margin
      </button>
      {result !== null && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Required Margin</p>
          <p className="text-2xl font-bold text-blue-600">
            ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------- Lot Size Calculator ----------

function LotSizeCalculator() {
  const [balance, setBalance] = useState('10000');
  const [risk, setRisk] = useState('2');
  const [stopLoss, setStopLoss] = useState('50');
  const [pair, setPair] = useState('EUR/USD');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const bal = parseFloat(balance);
    const r = parseFloat(risk);
    const sl = parseFloat(stopLoss);
    const info = PAIRS[pair];
    if (!info || isNaN(bal) || isNaN(r) || isNaN(sl) || sl === 0) return;
    const riskAmount = bal * (r / 100);
    const lots = riskAmount / (sl * info.pipValue);
    setResult(Math.round(lots * 100) / 100);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorInput
          label="Account Balance (USD)"
          id="lot-balance"
          value={balance}
          onChange={setBalance}
          placeholder="e.g. 10000"
          min={0}
        />
        <CalculatorInput
          label="Risk %"
          id="lot-risk"
          value={risk}
          onChange={setRisk}
          placeholder="1-5"
          min={1}
          max={5}
          step={0.5}
        />
        <CalculatorInput
          label="Stop Loss (pips)"
          id="lot-sl"
          value={stopLoss}
          onChange={setStopLoss}
          placeholder="e.g. 50"
          min={1}
        />
        <CalculatorInput
          label="Pair"
          id="lot-pair"
          type="select"
          value={pair}
          onChange={setPair}
          options={pairOptions}
        />
      </div>
      <button
        onClick={calculate}
        className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Calculate Lot Size
      </button>
      {result !== null && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Recommended Lot Size</p>
          <p className="text-2xl font-bold text-blue-600">{result} lots</p>
        </div>
      )}
    </div>
  );
}

// ---------- Profit/Loss Calculator ----------

function ProfitLossCalculator() {
  const [pair, setPair] = useState('EUR/USD');
  const [lotSize, setLotSize] = useState('1');
  const [entryPrice, setEntryPrice] = useState('1.1000');
  const [exitPrice, setExitPrice] = useState('1.1050');
  const [direction, setDirection] = useState('buy');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const info = PAIRS[pair];
    if (!info) return;
    const lots = parseFloat(lotSize);
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    if (isNaN(lots) || isNaN(entry) || isNaN(exit)) return;
    const diff = exit - entry;
    const multiplier = direction === 'buy' ? 1 : -1;
    const pnl = diff * multiplier * lots * info.contractSize;
    setResult(Math.round(pnl * 100) / 100);
  };

  const resultColor =
    result === null
      ? ''
      : result > 0
        ? 'border-green-200 bg-green-50'
        : result < 0
          ? 'border-red-200 bg-red-50'
          : 'border-blue-200 bg-blue-50';

  const textColor =
    result === null
      ? ''
      : result > 0
        ? 'text-green-600'
        : result < 0
          ? 'text-red-600'
          : 'text-blue-600';

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorInput
          label="Pair"
          id="pnl-pair"
          type="select"
          value={pair}
          onChange={setPair}
          options={pairOptions}
        />
        <CalculatorInput
          label="Lot Size"
          id="pnl-lot"
          value={lotSize}
          onChange={setLotSize}
          placeholder="e.g. 1"
          min={0.01}
          step={0.01}
        />
        <CalculatorInput
          label="Entry Price"
          id="pnl-entry"
          value={entryPrice}
          onChange={setEntryPrice}
          placeholder="e.g. 1.1000"
          step={0.0001}
        />
        <CalculatorInput
          label="Exit Price"
          id="pnl-exit"
          value={exitPrice}
          onChange={setExitPrice}
          placeholder="e.g. 1.1050"
          step={0.0001}
        />
        <CalculatorInput
          label="Direction"
          id="pnl-direction"
          type="select"
          value={direction}
          onChange={setDirection}
          options={[
            { label: 'Buy (Long)', value: 'buy' },
            { label: 'Sell (Short)', value: 'sell' },
          ]}
        />
      </div>
      <button
        onClick={calculate}
        className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Calculate Profit/Loss
      </button>
      {result !== null && (
        <div className={`rounded-lg border p-4 ${resultColor}`}>
          <p className="text-sm text-slate-600">Profit / Loss</p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {result >= 0 ? '+' : ''}
            ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------- Main Page ----------

export default function KalkulatorPage() {
  const [activeTab, setActiveTab] = useState<Tab>('margin');

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        Trading Calculator
      </h1>
      <p className="mb-8 text-slate-500">
        Calculate margin requirements, position sizes, and potential profit or loss.
      </p>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculator Content */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {activeTab === 'margin' && <MarginCalculator />}
        {activeTab === 'lotSize' && <LotSizeCalculator />}
        {activeTab === 'profitLoss' && <ProfitLossCalculator />}
      </div>
    </main>
  );
}

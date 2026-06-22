import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trading Calculator - Margin, Lot Size & Profit/Loss',
  description:
    'Free trading calculator for forex and gold. Calculate required margin, recommended lot size based on risk, and potential profit or loss for your trades.',
  keywords: [
    'trading calculator',
    'margin calculator',
    'lot size calculator',
    'profit loss calculator',
    'forex calculator',
    'kalkulator trading',
  ],
  openGraph: {
    title: 'Trading Calculator - Margin, Lot Size & Profit/Loss',
    description:
      'Free trading calculator for forex and gold. Calculate required margin, recommended lot size, and potential profit or loss.',
    type: 'website',
  },
};

export default function KalkulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

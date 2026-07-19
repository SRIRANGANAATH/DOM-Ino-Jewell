import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch live Gold Spot Price (USD per Troy Ounce)
    const goldRes = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/GC=F', { cache: 'no-store' });
    const goldData = await goldRes.json();
    const goldUsdPerOz = goldData.chart.result[0].meta.regularMarketPrice;

    // Fetch live USD to INR exchange rate
    const inrRes = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/INR=X', { cache: 'no-store' });
    const inrData = await inrRes.json();
    const usdToInr = inrData.chart.result[0].meta.regularMarketPrice;

    // 1 Troy Ounce = 31.1034768 grams
    const goldInrPerOz = goldUsdPerOz * usdToInr;
    let trueGoldInrPerGram = goldInrPerOz / 31.1034768;

    // Add Indian Import Duty & GST (approx 15% + 3%)
    trueGoldInrPerGram = trueGoldInrPerGram * 1.18;

    // 24K is 99.9% pure, 22K is 91.6% pure
    const price24k = Math.round(trueGoldInrPerGram);
    const price22k = Math.round(trueGoldInrPerGram * 0.916);

    return NextResponse.json({
      gold: {
        '24K': price24k,
        '22K': price22k
      },
      diamond: {
        'GIA_TRIPLE_EXCELLENT': 250000 // Fixed average for 1ct high quality
      },
      emerald: {
        'ZAMBIAN_NATURAL': 35000 // Fixed average for 1ct
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Failed to fetch live rates", error);
    return NextResponse.json({ error: 'Failed to fetch live rates' }, { status: 500 });
  }
}

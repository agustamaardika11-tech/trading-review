export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: 'edukasi' | 'strategi' | 'review' | 'berita';
  date: string;
  author: string;
  readTime: string;
  content: string;
  image?: string;
}

export const articles: Article[] = [
  {
    slug: 'tips-pengembangan-ea-lanjutan-mql5',
    image: '/images/ea-robot.svg',
    title: 'Tips Pengembangan EA Lanjutan: Dari EA Sederhana ke EA Profesional',
    excerpt:
      'Tingkatkan EA Anda dengan teknik lanjutan: trailing stop otomatis, risk management dinamis, multi-timeframe analysis, dan optimasi performa.',
    category: 'strategi',
    date: '2026-06-22',
    author: 'Tim TradingReview',
    readTime: '10 menit',
    content: `<h2>Mengapa EA Sederhana Belum Cukup?</h2>
<p>EA dengan strategi dasar seperti MA crossover memang bisa menghasilkan profit di kondisi market tertentu. Namun, pasar forex sangat dinamis — strategi yang bekerja di trending market bisa menghasilkan kerugian besar saat market sideways. Artikel ini membahas teknik lanjutan untuk membuat EA Anda lebih robust dan adaptif.</p>

<h2>1. Trailing Stop Otomatis</h2>
<p>Trailing stop menggeser stop loss mengikuti harga untuk mengamankan profit yang sudah berjalan. Ini jauh lebih efektif dibanding take profit statis.</p>
<pre><code>void ManageTrailingStop(int trailPoints)
{
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(PositionGetSymbol(i) != _Symbol) continue;
      if(PositionGetInteger(POSITION_MAGIC) != MagicNumber) continue;

      double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
      double currentSL = PositionGetDouble(POSITION_SL);
      double currentTP = PositionGetDouble(POSITION_TP);
      ulong ticket = PositionGetInteger(POSITION_TICKET);

      if(PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY)
      {
         double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
         double newSL = bid - trailPoints * point;
         if(newSL > currentSL && newSL > openPrice)
            trade.PositionModify(ticket, newSL, currentTP);
      }
      else
      {
         double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
         double newSL = ask + trailPoints * point;
         if(newSL < currentSL && newSL < openPrice)
            trade.PositionModify(ticket, newSL, currentTP);
      }
   }
}</code></pre>
<p>Panggil fungsi ini di <strong>OnTick()</strong> setelah logika entry. Trailing stop akan otomatis mengunci profit saat harga bergerak sesuai arah posisi Anda.</p>

<h2>2. Risk Management Dinamis</h2>
<p>Daripada menggunakan lot size tetap, hitung lot berdasarkan persentase risiko dari balance akun. Ini membuat EA Anda scale up saat profit dan scale down saat loss.</p>
<pre><code>double CalculateLotSize(double riskPercent, int slPoints)
{
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskAmount = balance * riskPercent / 100.0;

   double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   double tickSize = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   double pipValue = tickValue * (point / tickSize);
   double lots = riskAmount / (slPoints * pipValue);

   double minLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double maxLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
   double stepLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);

   lots = MathFloor(lots / stepLot) * stepLot;
   lots = MathMax(minLot, MathMin(maxLot, lots));

   return lots;
}</code></pre>
<p>Contoh penggunaan: <code>double lot = CalculateLotSize(1.0, 100);</code> artinya risiko 1% dari balance dengan stop loss 100 points.</p>

<h2>3. Multi-Timeframe Confirmation</h2>
<p>Sinyal dari satu timeframe saja sering menghasilkan false signal. Konfirmasi dari timeframe yang lebih besar meningkatkan akurasi secara signifikan.</p>
<pre><code>bool IsTrendUp(ENUM_TIMEFRAMES tf)
{
   int maHandle = iMA(_Symbol, tf, 200, 0, MODE_EMA, PRICE_CLOSE);
   double maValue[];
   ArraySetAsSeries(maValue, true);
   CopyBuffer(maHandle, 0, 0, 1, maValue);
   IndicatorRelease(maHandle);

   double price = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   return price > maValue[0];
}

// Di OnTick():
// Hanya ambil sinyal BUY jika tren H4 juga bullish
if(bullishCross && IsTrendUp(PERIOD_H4) && !hasPosition)
{
   // Entry buy...
}</code></pre>
<p>Prinsipnya: <strong>entry di timeframe kecil, konfirmasi di timeframe besar</strong>. Misalnya entry di M15, konfirmasi tren di H4.</p>

<h2>4. Time Filter</h2>
<p>Tidak semua jam trading menguntungkan. Spread melebar dan likuiditas rendah di luar sesi utama bisa merusak performa EA.</p>
<pre><code>bool IsTradeTime()
{
   MqlDateTime dt;
   TimeCurrent(dt);
   int hour = dt.hour;

   // Hanya trading di sesi London dan New York (08:00 - 20:00 GMT)
   return (hour >= 8 && hour < 20);
}

// Di OnTick():
if(!IsTradeTime()) return;  // Skip jika di luar jam trading</code></pre>
<p>Anda juga bisa menambahkan filter untuk menghindari hari Jumat sore (menjelang penutupan market) dan hari Senin pagi (saat market baru buka dan spread masih lebar).</p>

<h2>5. News Filter</h2>
<p>EA sering mengalami kerugian saat ada rilis berita besar karena pergerakan harga yang sangat volatil dan spread yang melebar. Cara sederhana mengatasinya:</p>
<ul>
<li>Gunakan library <strong>MQL5 Calendar</strong> bawaan untuk mendeteksi jadwal berita</li>
<li>Stop trading 30 menit sebelum dan sesudah berita high-impact</li>
<li>Atau tutup semua posisi terbuka sebelum berita besar seperti NFP atau FOMC</li>
</ul>

<h2>6. Logging dan Monitoring</h2>
<p>EA profesional selalu mencatat setiap aksi untuk debugging dan analisis:</p>
<pre><code>void LogTrade(string action, double price, double lot, double sl, double tp)
{
   string msg = StringFormat("[%s] %s %.2f lots @ %.5f | SL: %.5f | TP: %.5f",
                              TimeToString(TimeCurrent()), action, lot, price, sl, tp);
   Print(msg);

   // Optional: tulis ke file
   int fileHandle = FileOpen("EA_Log.txt", FILE_WRITE|FILE_READ|FILE_TXT|FILE_ANSI);
   if(fileHandle != INVALID_HANDLE)
   {
      FileSeek(fileHandle, 0, SEEK_END);
      FileWriteString(fileHandle, msg + "\\n");
      FileClose(fileHandle);
   }
}</code></pre>

<h2>7. Walk-Forward Optimization</h2>
<p>Backtest biasa rentan terhadap over-optimization. Gunakan metode <strong>walk-forward</strong>:</p>
<ol>
<li>Bagi data historis menjadi segmen (misalnya per 3 bulan)</li>
<li>Optimasi parameter di segmen pertama (in-sample)</li>
<li>Test parameter tersebut di segmen berikutnya (out-of-sample)</li>
<li>Ulangi untuk semua segmen</li>
<li>Jika EA konsisten profit di semua segmen out-of-sample, strateginya robust</li>
</ol>
<p>MT5 Strategy Tester mendukung walk-forward optimization secara built-in.</p>

<h2>Checklist EA Profesional</h2>
<ul>
<li>✅ Risk management dinamis (lot berdasarkan % balance)</li>
<li>✅ Trailing stop untuk mengamankan profit</li>
<li>✅ Multi-timeframe confirmation</li>
<li>✅ Time filter (hindari jam spread tinggi)</li>
<li>✅ News filter (hindari volatilitas berita)</li>
<li>✅ Logging lengkap untuk debugging</li>
<li>✅ Walk-forward optimization (bukan hanya backtest biasa)</li>
<li>✅ Test di akun demo minimal 3 bulan sebelum live</li>
</ul>

<p><em><strong>Disclaimer:</strong> Artikel ini bersifat edukatif. Tidak ada EA yang bisa menjamin profit. Selalu test secara menyeluruh dan gunakan risk management yang ketat.</em></p>`,
  },
  {
    slug: 'kesalahan-umum-pemula-trading-forex',
    image: '/images/blog-edukasi.svg',
    title: '10 Kesalahan Umum Pemula dalam Trading Forex (Dan Cara Menghindarinya)',
    excerpt:
      'Pelajari kesalahan fatal yang sering dilakukan trader pemula dan bagaimana cara menghindarinya agar tidak kehilangan modal di awal perjalanan trading.',
    category: 'edukasi',
    date: '2026-06-22',
    author: 'Tim TradingReview',
    readTime: '9 menit',
    content: `<h2>Mengapa 90% Trader Pemula Gagal?</h2>
<p>Statistik menunjukkan bahwa sekitar 90% trader retail kehilangan uang. Bukan karena forex itu scam, melainkan karena kebanyakan pemula melakukan kesalahan yang sebenarnya bisa dihindari. Berikut adalah 10 kesalahan paling umum dan cara mengatasinya.</p>

<h2>1. Trading Tanpa Rencana</h2>
<p><strong>Kesalahan:</strong> Membuka posisi berdasarkan feeling, rumor, atau sinyal dari grup Telegram tanpa memahami alasannya.</p>
<p><strong>Solusi:</strong> Buat trading plan tertulis yang mencakup:</p>
<ul>
<li>Pair yang ditradingkan dan alasannya</li>
<li>Kriteria entry dan exit yang spesifik</li>
<li>Risk per trade (1-2% dari modal)</li>
<li>Target harian/mingguan yang realistis</li>
</ul>
<p>Jika setup tidak sesuai dengan plan, <strong>jangan trading</strong>. Disiplin mengikuti plan jauh lebih penting daripada mencari "peluang" baru setiap saat.</p>

<h2>2. Tidak Menggunakan Stop Loss</h2>
<p><strong>Kesalahan:</strong> Membiarkan posisi floating minus tanpa batas, berharap harga akan kembali. Ini adalah cara tercepat untuk menghapus seluruh akun.</p>
<p><strong>Solusi:</strong> Selalu pasang stop loss di <strong>setiap</strong> posisi. Tentukan stop loss sebelum entry, bukan sesudahnya. Stop loss bukan tanda kelemahan — ini adalah alat proteksi modal yang digunakan oleh semua trader profesional.</p>

<h2>3. Overtrading</h2>
<p><strong>Kesalahan:</strong> Membuka terlalu banyak posisi dalam sehari, terutama setelah mengalami kerugian (revenge trading).</p>
<p><strong>Solusi:</strong> Batasi jumlah trade per hari (misalnya maksimal 3 trade). Jika sudah loss 2x berturut-turut, berhenti trading untuk hari itu. Kualitas trade jauh lebih penting daripada kuantitas.</p>

<h2>4. Leverage Terlalu Tinggi</h2>
<p><strong>Kesalahan:</strong> Menggunakan leverage 1:1000 atau lebih dengan modal kecil, sehingga pergerakan kecil saja bisa menghabiskan seluruh modal.</p>
<p><strong>Solusi:</strong> Untuk pemula, gunakan leverage efektif tidak lebih dari <strong>1:10 sampai 1:20</strong>. Meskipun broker menawarkan leverage 1:1000, bukan berarti Anda harus menggunakannya. Leverage tinggi memperbesar profit DAN loss.</p>
<p>Contoh: Modal $100 dengan leverage 1:1000, Anda bisa buka posisi $100,000. Pergerakan 0.1% saja sudah menyebabkan loss $100 — seluruh modal Anda.</p>

<h2>5. Tidak Belajar Analisis</h2>
<p><strong>Kesalahan:</strong> Langsung trading real tanpa memahami analisis teknikal maupun fundamental. Mengandalkan sinyal orang lain tanpa mengerti alasannya.</p>
<p><strong>Solusi:</strong> Investasikan waktu minimal 3 bulan untuk belajar:</p>
<ul>
<li>Cara membaca candlestick dan chart pattern</li>
<li>Support dan resistance</li>
<li>Minimal 2-3 indikator (MA, RSI, MACD)</li>
<li>Dasar analisis fundamental (dampak berita ekonomi)</li>
</ul>
<p>Gunakan akun demo selama proses belajar. Uang yang Anda "hemat" dengan tidak belajar, akan Anda "bayar" lewat kerugian trading.</p>

<h2>6. Mengabaikan Money Management</h2>
<p><strong>Kesalahan:</strong> Menggunakan lot size terlalu besar relatif terhadap modal. Misalnya buka 0.1 lot dengan modal $100.</p>
<p><strong>Solusi:</strong> Terapkan aturan 1-2% risk per trade. Dengan modal $100:</p>
<ul>
<li>Risiko per trade: $1-$2</li>
<li>Lot size: 0.01 (micro lot)</li>
<li>Stop loss: sesuaikan dengan analisis, bukan dengan sisa margin</li>
</ul>
<p>Gunakan <strong>kalkulator lot size</strong> di halaman <a href="/kalkulator">Kalkulator Trading</a> kami untuk menghitung ukuran posisi yang tepat.</p>

<h2>7. Trading di Semua Pair</h2>
<p><strong>Kesalahan:</strong> Trading di 10-15 pair sekaligus tanpa memahami karakter masing-masing pair.</p>
<p><strong>Solusi:</strong> Fokus pada <strong>2-3 pair</strong> di awal. Pelajari karakteristiknya:</p>
<ul>
<li>Rata-rata range harian</li>
<li>Jam-jam paling aktif</li>
<li>Korelasi antar pair</li>
<li>Spread dan biaya trading</li>
</ul>
<p>Pair yang direkomendasikan untuk pemula: <strong>EURUSD</strong>, <strong>GBPUSD</strong>, dan <strong>USDJPY</strong> karena spread rendah dan likuiditas tinggi.</p>

<h2>8. Tidak Memiliki Trading Journal</h2>
<p><strong>Kesalahan:</strong> Tidak mencatat trade yang dilakukan, sehingga tidak bisa mengevaluasi kesalahan dan kekuatan strategi.</p>
<p><strong>Solusi:</strong> Catat setiap trade dengan detail:</p>
<ul>
<li>Tanggal dan jam entry/exit</li>
<li>Pair, lot size, arah (buy/sell)</li>
<li>Alasan entry (setup apa yang muncul)</li>
<li>Hasil (profit/loss dalam $ dan pips)</li>
<li>Screenshot chart saat entry</li>
<li>Evaluasi: apa yang bisa diperbaiki</li>
</ul>
<p>Review journal Anda setiap minggu. Anda akan terkejut menemukan pola kesalahan yang berulang.</p>

<h2>9. Ekspektasi Tidak Realistis</h2>
<p><strong>Kesalahan:</strong> Mengharapkan profit 100% per bulan atau ingin "cepat kaya" dari trading. Ini mendorong pengambilan risiko berlebihan.</p>
<p><strong>Solusi:</strong> Target yang realistis untuk trader berpengalaman adalah <strong>3-10% per bulan</strong>. Untuk pemula, target utama bukan profit — melainkan <strong>tidak kehilangan modal</strong> selama 6 bulan pertama.</p>
<p>Jika seseorang menjanjikan profit konsisten 50%+ per bulan, itu hampir pasti scam. Bahkan hedge fund terbaik di dunia rata-rata menghasilkan 15-25% per tahun.</p>

<h2>10. Trading dengan Emosi</h2>
<p><strong>Kesalahan:</strong> Keputusan trading didorong oleh ketakutan (fear) atau keserakahan (greed):</p>
<ul>
<li><strong>Fear:</strong> Cut profit terlalu cepat, takut loss bertambah padahal analisis masih valid</li>
<li><strong>Greed:</strong> Memindahkan take profit terus-menerus, menambah posisi saat sudah profit tanpa analisis</li>
<li><strong>Revenge trading:</strong> Setelah loss, langsung buka posisi besar untuk "balas dendam"</li>
</ul>
<p><strong>Solusi:</strong></p>
<ul>
<li>Ikuti trading plan — jangan ubah di tengah jalan karena emosi</li>
<li>Setelah loss besar, istirahat minimal 1 hari</li>
<li>Jangan trading saat kondisi emosional (marah, sedih, euforia)</li>
<li>Ingat: satu trade tidak menentukan karir trading Anda</li>
</ul>

<h2>Rangkuman</h2>
<p>Kesalahan-kesalahan di atas bukan berarti Anda tidak cocok trading. Hampir semua trader sukses pernah melakukan kesalahan yang sama di awal. Bedanya, mereka <strong>belajar dari kesalahan</strong> dan <strong>memperbaiki prosesnya</strong>.</p>
<p>Fokus pada proses, bukan pada hasil. Jika prosesnya benar (analisis matang, risk management ketat, disiplin), profit akan datang sebagai konsekuensi natural.</p>

<p><em><strong>Disclaimer:</strong> Artikel ini bersifat edukatif dan bukan merupakan saran investasi. Trading forex melibatkan risiko tinggi kehilangan modal.</em></p>`,
  },
  {
    slug: 'tutorial-membuat-ea-expert-advisor-sendiri-mql5',
    image: '/images/ea-robot.svg',
    title: 'Tutorial Membuat EA (Expert Advisor) Sendiri dengan MQL5',
    excerpt:
      'Panduan lengkap step-by-step membuat Expert Advisor pertama Anda di MetaTrader 5 menggunakan bahasa MQL5, dari nol hingga siap backtest.',
    category: 'edukasi',
    date: '2026-06-22',
    author: 'Tim TradingReview',
    readTime: '12 menit',
    content: `<h2>Apa Itu Expert Advisor (EA)?</h2>
<p>Expert Advisor (EA) adalah program otomatis yang berjalan di platform MetaTrader untuk mengeksekusi trading tanpa intervensi manual. EA bekerja berdasarkan aturan (rules) yang Anda tentukan — mulai dari kapan entry, exit, berapa lot, sampai stop loss dan take profit.</p>
<p>Dengan EA, Anda bisa:</p>
<ul>
<li>Trading 24 jam tanpa harus duduk di depan layar</li>
<li>Menghilangkan emosi dari keputusan trading</li>
<li>Backtest strategi pada data historis</li>
<li>Eksekusi order dengan kecepatan milidetik</li>
</ul>

<h2>Persiapan yang Dibutuhkan</h2>
<ul>
<li><strong>MetaTrader 5 (MT5):</strong> Download dan install dari broker Anda</li>
<li><strong>MetaEditor:</strong> Sudah termasuk dalam instalasi MT5 (tekan F4 untuk membuka)</li>
<li><strong>Akun Demo:</strong> Untuk testing tanpa risiko</li>
<li><strong>Pemahaman dasar trading:</strong> Mengerti konsep buy, sell, lot, stop loss, take profit</li>
</ul>
<p>Anda <strong>tidak perlu</strong> pengalaman programming sebelumnya — tutorial ini dimulai dari nol.</p>

<h2>Step 1: Membuka MetaEditor</h2>
<p>Buka MetaTrader 5, lalu tekan <strong>F4</strong> atau klik menu <strong>Tools → MetaQuotes Language Editor</strong>. MetaEditor adalah IDE (Integrated Development Environment) khusus untuk menulis kode MQL5.</p>
<p>Klik <strong>File → New → Expert Advisor (template)</strong>, beri nama file misalnya <strong>SimpleEA</strong>, lalu klik Next dan Finish.</p>

<h2>Step 2: Memahami Struktur Dasar EA</h2>
<p>Setiap EA MQL5 memiliki 3 fungsi utama:</p>
<pre><code>// Fungsi yang dijalankan saat EA pertama kali dipasang di chart
int OnInit()
{
   Print("EA dimulai!");
   return(INIT_SUCCEEDED);
}

// Fungsi yang dijalankan setiap ada tick harga baru
void OnTick()
{
   // Logika trading Anda di sini
}

// Fungsi yang dijalankan saat EA dilepas dari chart
void OnDeinit(const int reason)
{
   Print("EA dihentikan.");
}</code></pre>
<ul>
<li><strong>OnInit():</strong> Inisialisasi — setup indikator, variabel awal</li>
<li><strong>OnTick():</strong> Jantung EA — dipanggil setiap ada pergerakan harga baru</li>
<li><strong>OnDeinit():</strong> Cleanup — membersihkan resource saat EA dimatikan</li>
</ul>

<h2>Step 3: Membuat EA Moving Average Crossover</h2>
<p>Kita akan membuat EA sederhana dengan strategi <strong>MA Crossover</strong>: Buy ketika MA cepat (periode 10) memotong ke atas MA lambat (periode 50), dan Sell sebaliknya.</p>
<pre><code>// Input parameters — bisa diubah tanpa edit kode
input int FastMA_Period = 10;       // Periode MA Cepat
input int SlowMA_Period = 50;       // Periode MA Lambat
input double LotSize = 0.01;        // Ukuran Lot
input int StopLoss = 100;           // Stop Loss (points)
input int TakeProfit = 200;         // Take Profit (points)
input int MagicNumber = 12345;      // ID unik EA

#include &lt;Trade/Trade.mqh&gt;
CTrade trade;

int handleFast, handleSlow;

int OnInit()
{
   handleFast = iMA(_Symbol, PERIOD_CURRENT, FastMA_Period, 0, MODE_EMA, PRICE_CLOSE);
   handleSlow = iMA(_Symbol, PERIOD_CURRENT, SlowMA_Period, 0, MODE_EMA, PRICE_CLOSE);

   if(handleFast == INVALID_HANDLE || handleSlow == INVALID_HANDLE)
   {
      Print("Error membuat indikator MA!");
      return(INIT_FAILED);
   }

   trade.SetExpertMagicNumber(MagicNumber);
   return(INIT_SUCCEEDED);
}</code></pre>

<h3>Logika Trading di OnTick()</h3>
<pre><code>void OnTick()
{
   // Ambil nilai MA
   double fastMA[], slowMA[];
   ArraySetAsSeries(fastMA, true);
   ArraySetAsSeries(slowMA, true);

   CopyBuffer(handleFast, 0, 0, 3, fastMA);
   CopyBuffer(handleSlow, 0, 0, 3, slowMA);

   // Cek crossover
   bool bullishCross = fastMA[1] &gt; slowMA[1] &amp;&amp; fastMA[2] &lt;= slowMA[2];
   bool bearishCross = fastMA[1] &lt; slowMA[1] &amp;&amp; fastMA[2] &gt;= slowMA[2];

   // Cek apakah sudah ada posisi terbuka
   bool hasPosition = false;
   for(int i = PositionsTotal() - 1; i &gt;= 0; i--)
   {
      if(PositionGetSymbol(i) == _Symbol &amp;&amp;
         PositionGetInteger(POSITION_MAGIC) == MagicNumber)
      {
         hasPosition = true;
         break;
      }
   }

   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   // Entry Buy
   if(bullishCross &amp;&amp; !hasPosition)
   {
      double sl = ask - StopLoss * point;
      double tp = ask + TakeProfit * point;
      trade.Buy(LotSize, _Symbol, ask, sl, tp, "MA Cross Buy");
   }

   // Entry Sell
   if(bearishCross &amp;&amp; !hasPosition)
   {
      double sl = bid + StopLoss * point;
      double tp = bid - TakeProfit * point;
      trade.Sell(LotSize, _Symbol, bid, sl, tp, "MA Cross Sell");
   }
}</code></pre>

<h2>Step 4: Compile dan Pasang EA</h2>
<ol>
<li>Di MetaEditor, tekan <strong>F7</strong> atau klik <strong>Compile</strong></li>
<li>Pastikan tidak ada error (warning boleh diabaikan)</li>
<li>Kembali ke MetaTrader 5 (tekan F4)</li>
<li>Di panel <strong>Navigator</strong>, buka folder <strong>Expert Advisors</strong></li>
<li><strong>Drag &amp; drop</strong> EA ke chart yang diinginkan</li>
<li>Centang <strong>"Allow Algo Trading"</strong> di pengaturan</li>
<li>Klik <strong>OK</strong></li>
</ol>
<p>Pastikan tombol <strong>"Algo Trading"</strong> di toolbar MetaTrader dalam keadaan aktif (hijau).</p>

<h2>Step 5: Backtest EA Anda</h2>
<p>Sebelum trading real, selalu backtest dulu:</p>
<ol>
<li>Buka <strong>Strategy Tester</strong> (Ctrl+R)</li>
<li>Pilih EA Anda dari dropdown</li>
<li>Pilih symbol (misalnya EURUSD)</li>
<li>Set periode backtest (misalnya 1 tahun)</li>
<li>Pilih model: <strong>"Every tick based on real ticks"</strong> untuk akurasi terbaik</li>
<li>Klik <strong>Start</strong></li>
</ol>
<p>Perhatikan metrik penting dari hasil backtest:</p>
<ul>
<li><strong>Profit Factor:</strong> Harus di atas 1.5 untuk strategi yang layak</li>
<li><strong>Maximum Drawdown:</strong> Idealnya di bawah 20%</li>
<li><strong>Total Trades:</strong> Minimal 100 trade untuk hasil yang signifikan</li>
<li><strong>Win Rate:</strong> Dikombinasikan dengan risk-reward ratio</li>
</ul>

<h2>Tips Pengembangan EA Selanjutnya</h2>
<ul>
<li><strong>Tambahkan filter tren:</strong> Gunakan indikator tambahan (RSI, ADX) untuk menghindari sinyal palsu</li>
<li><strong>Trailing Stop:</strong> Geser stop loss mengikuti harga untuk mengamankan profit</li>
<li><strong>Time Filter:</strong> Batasi jam trading untuk menghindari sesi dengan spread tinggi</li>
<li><strong>Risk Management:</strong> Hitung lot otomatis berdasarkan persentase risiko dari balance</li>
<li><strong>Multi-timeframe:</strong> Konfirmasi sinyal dari timeframe yang lebih besar</li>
</ul>

<h2>Kesalahan Umum Pemula</h2>
<ul>
<li><strong>Tidak backtest:</strong> Langsung trading real tanpa testing</li>
<li><strong>Over-optimization:</strong> Terlalu banyak parameter yang di-optimasi sehingga hanya cocok untuk data historis</li>
<li><strong>Mengabaikan spread:</strong> EA yang profitable di backtest bisa rugi karena spread tidak diperhitungkan</li>
<li><strong>Tanpa stop loss:</strong> EA tanpa proteksi bisa menghapus seluruh akun</li>
</ul>

<p><em><strong>Disclaimer:</strong> Tutorial ini bersifat edukatif. Selalu test EA di akun demo terlebih dahulu sebelum digunakan di akun real. Past performance tidak menjamin hasil di masa depan.</em></p>`,
  },
  {
    slug: 'forecast-xauusd-minggu-ini-23-27-juni-2026',
    image: '/images/xauusd.svg',
    title: 'Forecast XAUUSD Minggu Ini (23–27 Juni 2026): Emas Berpotensi Lanjutkan Rally',
    excerpt:
      'Analisis teknikal dan fundamental XAUUSD untuk minggu 23–27 Juni 2026. Level support, resistance, dan skenario trading yang perlu diperhatikan.',
    category: 'strategi',
    date: '2026-06-22',
    author: 'Tim TradingReview',
    readTime: '7 menit',
    content: `<h2>Recap Minggu Lalu</h2>
<p>Harga emas (XAUUSD) ditutup menguat di minggu sebelumnya, dipicu oleh melemahnya Dolar AS dan ekspektasi pasar terhadap kebijakan dovish The Fed. Harga sempat menyentuh area $3,350 sebelum terkoreksi ringan ke $3,310 di penutupan Jumat.</p>

<h2>Faktor Fundamental</h2>
<h3>Kebijakan The Fed</h3>
<p>Pasar saat ini memperkirakan kemungkinan pemangkasan suku bunga di Q3 2026 semakin besar. Data inflasi AS yang menurun dan pasar tenaga kerja yang mulai melambat memberikan ruang bagi The Fed untuk melonggarkan kebijakan moneter. Hal ini positif untuk emas sebagai aset safe haven.</p>

<h3>Ketegangan Geopolitik</h3>
<p>Ketidakpastian geopolitik global masih menjadi katalis utama penguatan emas. Investor cenderung mengalihkan dana ke aset safe haven di tengah kondisi global yang belum stabil.</p>

<h3>Data Ekonomi Penting Minggu Ini</h3>
<ul>
<li><strong>Selasa (24 Juni):</strong> Flash PMI Manufacturing & Services AS</li>
<li><strong>Rabu (25 Juni):</strong> CB Consumer Confidence</li>
<li><strong>Kamis (26 Juni):</strong> GDP Final Q1, Durable Goods Orders, Initial Jobless Claims</li>
<li><strong>Jumat (27 Juni):</strong> Core PCE Price Index (indikator inflasi favorit The Fed)</li>
</ul>
<p>Data <strong>Core PCE</strong> di hari Jumat akan menjadi data paling krusial minggu ini. Jika angka inflasi turun di bawah ekspektasi, emas berpotensi rally lebih lanjut.</p>

<h2>Analisis Teknikal XAUUSD</h2>
<h3>Timeframe Daily</h3>
<p>Harga emas saat ini bergerak di atas MA 50 dan MA 200, mengkonfirmasi tren bullish yang masih kuat. RSI berada di level 62, menunjukkan momentum bullish tanpa kondisi overbought.</p>

<h3>Level-Level Penting</h3>
<ul>
<li><strong>Resistance 1:</strong> $3,350 — level tertinggi minggu lalu</li>
<li><strong>Resistance 2:</strong> $3,385 — target jika breakout</li>
<li><strong>Resistance 3:</strong> $3,420 — resistance psikologis</li>
<li><strong>Support 1:</strong> $3,290 — area demand terdekat</li>
<li><strong>Support 2:</strong> $3,250 — support kuat (MA 50 daily)</li>
<li><strong>Support 3:</strong> $3,200 — level psikologis dan support mayor</li>
</ul>

<h2>Skenario Trading</h2>
<h3>Skenario Bullish (Probabilitas 60%)</h3>
<p>Jika harga mampu breakout di atas $3,350 dengan volume kuat, target selanjutnya berada di area $3,385–$3,420. Entry buy bisa dilakukan saat pullback ke area $3,310–$3,320 dengan stop loss di bawah $3,280.</p>

<h3>Skenario Bearish (Probabilitas 40%)</h3>
<p>Jika data ekonomi AS keluar lebih kuat dari ekspektasi dan memperkuat Dolar, emas bisa terkoreksi ke area $3,250–$3,200. Entry sell bisa dipertimbangkan jika harga breakdown di bawah $3,280 dengan target $3,250.</p>

<h2>Kesimpulan</h2>
<p>Bias XAUUSD minggu ini cenderung <strong>bullish</strong> selama harga bertahan di atas support $3,290. Perhatikan rilis data Core PCE di hari Jumat sebagai katalis utama pergerakan harga. Selalu gunakan stop loss dan manajemen risiko yang ketat.</p>

<p><em><strong>Disclaimer:</strong> Analisis ini bersifat edukatif dan bukan merupakan saran investasi. Selalu lakukan riset mandiri sebelum mengambil keputusan trading.</em></p>`,
  },
  {
    slug: 'apa-itu-forex-trading-panduan-lengkap-pemula',
    image: '/images/hero-trading.svg',
    title: 'Apa Itu Forex Trading? Panduan Lengkap untuk Pemula',
    excerpt:
      'Pelajari dasar-dasar forex trading, cara kerja pasar valuta asing, dan langkah awal untuk memulai trading forex dengan aman.',
    category: 'edukasi',
    date: '2026-06-15',
    author: 'Tim Edukasi',
    readTime: '8 min',
    content: `
      <h2>Pengertian Forex Trading</h2>
      <p>Forex (Foreign Exchange) adalah pasar keuangan terbesar di dunia dengan volume transaksi harian mencapai lebih dari $7 triliun. Forex trading adalah aktivitas jual beli mata uang asing dengan tujuan mendapatkan keuntungan dari selisih harga.</p>

      <h2>Cara Kerja Pasar Forex</h2>
      <p>Pasar forex beroperasi 24 jam sehari, 5 hari seminggu, melibatkan bank sentral, institusi keuangan, perusahaan multinasional, dan trader ritel. Mata uang diperdagangkan dalam pasangan (pair), misalnya EUR/USD, GBP/JPY, atau USD/IDR.</p>

      <h3>Pasangan Mata Uang Utama</h3>
      <ul>
        <li><strong>EUR/USD</strong> - Euro vs Dolar AS</li>
        <li><strong>GBP/USD</strong> - Pound Sterling vs Dolar AS</li>
        <li><strong>USD/JPY</strong> - Dolar AS vs Yen Jepang</li>
        <li><strong>USD/CHF</strong> - Dolar AS vs Franc Swiss</li>
      </ul>

      <h2>Istilah Penting dalam Forex</h2>
      <p><strong>Pip:</strong> Satuan pergerakan harga terkecil, biasanya digit keempat di belakang koma.</p>
      <p><strong>Lot:</strong> Ukuran standar transaksi. 1 lot standar = 100.000 unit mata uang dasar.</p>
      <p><strong>Leverage:</strong> Fasilitas yang memungkinkan trader mengendalikan posisi lebih besar dari modal yang dimiliki.</p>
      <p><strong>Spread:</strong> Selisih antara harga beli (ask) dan harga jual (bid).</p>

      <h2>Langkah Memulai Trading Forex</h2>
      <ol>
        <li>Pelajari dasar-dasar forex trading melalui kursus atau buku.</li>
        <li>Pilih broker forex yang teregulasi dan terpercaya.</li>
        <li>Buka akun demo untuk berlatih tanpa risiko.</li>
        <li>Kembangkan strategi trading yang sesuai.</li>
        <li>Mulai dengan modal kecil saat beralih ke akun real.</li>
      </ol>

      <h2>Risiko Trading Forex</h2>
      <p>Trading forex memiliki risiko tinggi. Penggunaan leverage dapat memperbesar keuntungan maupun kerugian. Pastikan Anda memahami risiko sebelum memulai dan jangan pernah menginvestasikan uang yang tidak siap Anda kehilangan.</p>
    `,
  },
  {
    slug: 'cara-memilih-broker-aman-terpercaya',
    image: '/images/compare.svg',
    title: 'Cara Memilih Broker yang Aman dan Terpercaya',
    excerpt:
      'Panduan lengkap memilih broker forex yang teregulasi, aman, dan sesuai kebutuhan trading Anda.',
    category: 'review',
    date: '2026-06-12',
    author: 'Tim Review',
    readTime: '6 min',
    content: `
      <h2>Mengapa Memilih Broker yang Tepat Itu Penting?</h2>
      <p>Broker adalah perantara antara trader dan pasar. Memilih broker yang salah bisa berakibat fatal, mulai dari eksekusi order yang lambat hingga kehilangan seluruh dana.</p>

      <h2>Kriteria Broker yang Aman</h2>

      <h3>1. Regulasi</h3>
      <p>Pastikan broker teregulasi oleh badan pengawas resmi seperti:</p>
      <ul>
        <li><strong>Bappebti</strong> - Badan Pengawas Perdagangan Berjangka Komoditi (Indonesia)</li>
        <li><strong>ASIC</strong> - Australian Securities and Investments Commission</li>
        <li><strong>FCA</strong> - Financial Conduct Authority (UK)</li>
        <li><strong>CySEC</strong> - Cyprus Securities and Exchange Commission</li>
      </ul>

      <h3>2. Reputasi dan Track Record</h3>
      <p>Cari tahu berapa lama broker beroperasi, baca ulasan dari trader lain, dan periksa apakah ada riwayat masalah hukum.</p>

      <h3>3. Kondisi Trading</h3>
      <p>Perhatikan spread, komisi, leverage yang ditawarkan, jenis akun, dan minimum deposit. Bandingkan dengan broker lain untuk mendapatkan kondisi terbaik.</p>

      <h3>4. Platform Trading</h3>
      <p>Platform yang baik harus stabil, mudah digunakan, dan menyediakan tools analisis yang memadai. MetaTrader 4 dan MetaTrader 5 adalah platform yang paling populer.</p>

      <h3>5. Layanan Pelanggan</h3>
      <p>Broker yang baik menyediakan customer support dalam bahasa Indonesia, tersedia 24/5, dan responsif terhadap keluhan.</p>

      <h2>Red Flags yang Harus Diwaspadai</h2>
      <ul>
        <li>Menjanjikan keuntungan pasti atau tanpa risiko</li>
        <li>Tidak memiliki regulasi yang jelas</li>
        <li>Kesulitan dalam proses penarikan dana</li>
        <li>Spread yang terlalu rendah tanpa penjelasan model bisnis</li>
      </ul>
    `,
  },
  {
    slug: 'manajemen-risiko-kunci-sukses-trading',
    image: '/images/calculator.svg',
    title: 'Manajemen Risiko: Kunci Sukses Trading',
    excerpt:
      'Pelajari teknik manajemen risiko yang efektif untuk melindungi modal dan memaksimalkan profit dalam trading.',
    category: 'strategi',
    date: '2026-06-10',
    author: 'Tim Strategi',
    readTime: '7 min',
    content: `
      <h2>Pentingnya Manajemen Risiko</h2>
      <p>Manajemen risiko adalah aspek terpenting dalam trading yang sering diabaikan oleh pemula. Tanpa manajemen risiko yang baik, bahkan strategi trading terbaik pun bisa menghasilkan kerugian besar.</p>

      <h2>Aturan Dasar Manajemen Risiko</h2>

      <h3>1. Risiko Per Trade (1-2% Rule)</h3>
      <p>Jangan pernah merisikokan lebih dari 1-2% dari total modal pada satu transaksi. Dengan aturan ini, Anda membutuhkan serangkaian kerugian berturut-turut untuk kehilangan sebagian besar modal.</p>

      <h3>2. Gunakan Stop Loss</h3>
      <p>Selalu pasang stop loss pada setiap posisi. Stop loss membatasi kerugian maksimal pada level yang telah ditentukan sebelumnya.</p>

      <h3>3. Risk-Reward Ratio</h3>
      <p>Targetkan risk-reward ratio minimal 1:2. Artinya, potensi keuntungan harus minimal dua kali lipat dari potensi kerugian.</p>

      <h2>Teknik Manajemen Risiko Lanjutan</h2>

      <h3>Position Sizing</h3>
      <p>Hitung ukuran posisi berdasarkan jarak stop loss dan persentase risiko yang diinginkan. Formula: Ukuran Lot = (Modal x %Risiko) / (Stop Loss dalam Pip x Nilai Pip).</p>

      <h3>Diversifikasi</h3>
      <p>Jangan menaruh semua modal pada satu pasangan mata uang atau satu arah. Diversifikasi membantu mengurangi risiko keseluruhan portofolio.</p>

      <h3>Trailing Stop</h3>
      <p>Gunakan trailing stop untuk mengunci keuntungan saat harga bergerak sesuai prediksi. Trailing stop bergerak mengikuti harga dan melindungi profit yang sudah didapat.</p>

      <h2>Kesalahan Umum dalam Manajemen Risiko</h2>
      <ul>
        <li>Tidak menggunakan stop loss</li>
        <li>Memindahkan stop loss ke arah kerugian</li>
        <li>Overtrading atau membuka terlalu banyak posisi</li>
        <li>Revenge trading setelah mengalami kerugian</li>
        <li>Menggunakan leverage yang terlalu tinggi</li>
      </ul>
    `,
  },
  {
    slug: 'memahami-analisis-teknikal-dasar',
    image: '/images/hero-trading.svg',
    title: 'Memahami Analisis Teknikal Dasar',
    excerpt:
      'Kenali indikator teknikal populer, pola chart, dan cara membaca grafik harga untuk pengambilan keputusan trading.',
    category: 'edukasi',
    date: '2026-06-08',
    author: 'Tim Edukasi',
    readTime: '10 min',
    content: `
      <h2>Apa Itu Analisis Teknikal?</h2>
      <p>Analisis teknikal adalah metode analisis yang menggunakan data historis harga dan volume untuk memprediksi pergerakan harga di masa depan. Prinsip dasarnya adalah bahwa semua informasi sudah tercermin dalam harga.</p>

      <h2>Jenis-Jenis Grafik</h2>
      <ul>
        <li><strong>Line Chart:</strong> Grafik sederhana yang menghubungkan harga penutupan.</li>
        <li><strong>Bar Chart:</strong> Menampilkan harga open, high, low, dan close.</li>
        <li><strong>Candlestick Chart:</strong> Paling populer, menampilkan OHLC dengan visual yang mudah dibaca.</li>
      </ul>

      <h2>Indikator Teknikal Populer</h2>

      <h3>Moving Average (MA)</h3>
      <p>Menghitung rata-rata harga dalam periode tertentu. SMA (Simple) dan EMA (Exponential) adalah yang paling umum. Golden cross (MA pendek memotong MA panjang ke atas) sering dianggap sinyal beli.</p>

      <h3>RSI (Relative Strength Index)</h3>
      <p>Mengukur kekuatan momentum harga pada skala 0-100. RSI di atas 70 menandakan overbought, di bawah 30 menandakan oversold.</p>

      <h3>MACD (Moving Average Convergence Divergence)</h3>
      <p>Indikator tren yang menunjukkan hubungan antara dua moving average. Sinyal beli muncul saat garis MACD memotong signal line ke atas.</p>

      <h3>Bollinger Bands</h3>
      <p>Terdiri dari tiga garis: SMA dan dua band deviasi standar. Harga cenderung bergerak di antara band atas dan bawah.</p>

      <h2>Pola Chart Penting</h2>
      <ul>
        <li><strong>Head and Shoulders:</strong> Pola pembalikan tren bearish.</li>
        <li><strong>Double Top/Bottom:</strong> Sinyal pembalikan tren.</li>
        <li><strong>Triangle:</strong> Pola kelanjutan tren (ascending, descending, symmetrical).</li>
        <li><strong>Support dan Resistance:</strong> Level harga kunci di mana harga cenderung berbalik arah.</li>
      </ul>

      <h2>Tips Menggunakan Analisis Teknikal</h2>
      <p>Jangan bergantung pada satu indikator saja. Gunakan kombinasi indikator untuk konfirmasi sinyal. Selalu perhatikan timeframe yang lebih besar untuk melihat gambaran keseluruhan tren.</p>
    `,
  },
  {
    slug: 'perbedaan-akun-standard-micro-ecn',
    image: '/images/compare.svg',
    title: 'Perbedaan Akun Standard, Micro, dan ECN',
    excerpt:
      'Pahami perbedaan jenis akun trading untuk memilih yang paling sesuai dengan gaya dan modal trading Anda.',
    category: 'review',
    date: '2026-06-05',
    author: 'Tim Review',
    readTime: '5 min',
    content: `
      <h2>Jenis-Jenis Akun Trading</h2>
      <p>Broker forex biasanya menawarkan beberapa jenis akun untuk mengakomodasi kebutuhan trader yang berbeda. Memahami perbedaannya akan membantu Anda memilih akun yang tepat.</p>

      <h2>Akun Standard</h2>
      <p>Akun standard adalah jenis akun paling umum dengan karakteristik:</p>
      <ul>
        <li>1 lot = 100.000 unit mata uang</li>
        <li>Spread mulai dari 1-3 pip</li>
        <li>Minimum deposit biasanya $100-$500</li>
        <li>Cocok untuk trader dengan modal menengah</li>
      </ul>

      <h2>Akun Micro</h2>
      <p>Akun micro dirancang untuk pemula dan trader dengan modal kecil:</p>
      <ul>
        <li>1 lot = 1.000 unit mata uang</li>
        <li>Spread serupa dengan akun standard</li>
        <li>Minimum deposit mulai dari $1-$10</li>
        <li>Risiko per transaksi jauh lebih kecil</li>
        <li>Ideal untuk belajar dan menguji strategi</li>
      </ul>

      <h2>Akun ECN (Electronic Communication Network)</h2>
      <p>Akun ECN menyediakan akses langsung ke likuiditas pasar:</p>
      <ul>
        <li>Spread sangat rendah (mulai dari 0 pip)</li>
        <li>Dikenakan komisi per lot</li>
        <li>Eksekusi order lebih cepat</li>
        <li>Minimum deposit biasanya lebih tinggi ($500-$1.000)</li>
        <li>Cocok untuk scalper dan trader berpengalaman</li>
      </ul>

      <h2>Perbandingan Ringkas</h2>
      <table>
        <tr><th>Fitur</th><th>Standard</th><th>Micro</th><th>ECN</th></tr>
        <tr><td>Ukuran Lot</td><td>100.000</td><td>1.000</td><td>100.000</td></tr>
        <tr><td>Spread</td><td>1-3 pip</td><td>1-3 pip</td><td>0+ pip</td></tr>
        <tr><td>Komisi</td><td>Tidak</td><td>Tidak</td><td>Ya</td></tr>
        <tr><td>Min. Deposit</td><td>$100-$500</td><td>$1-$10</td><td>$500-$1.000</td></tr>
      </table>

      <h2>Mana yang Harus Dipilih?</h2>
      <p>Jika Anda pemula, mulailah dengan akun micro untuk meminimalkan risiko. Setelah konsisten profitable, pertimbangkan upgrade ke akun standard. Untuk trader aktif yang mengutamakan spread rendah, akun ECN bisa menjadi pilihan terbaik.</p>
    `,
  },
  {
    slug: 'tips-money-management-trader-pemula',
    image: '/images/calculator.svg',
    title: 'Tips Money Management untuk Trader Pemula',
    excerpt:
      'Strategi pengelolaan modal yang wajib dipahami setiap trader pemula agar bisa bertahan dan berkembang di pasar.',
    category: 'strategi',
    date: '2026-06-01',
    author: 'Tim Strategi',
    readTime: '6 min',
    content: `
      <h2>Apa Itu Money Management?</h2>
      <p>Money management adalah seni mengelola modal trading secara disiplin untuk memaksimalkan keuntungan dan meminimalkan kerugian. Ini mencakup penentuan ukuran posisi, alokasi modal, dan pengelolaan profit.</p>

      <h2>Tips Money Management untuk Pemula</h2>

      <h3>1. Tentukan Modal yang Siap Dirisikokan</h3>
      <p>Gunakan hanya uang yang tidak akan mempengaruhi kehidupan sehari-hari jika hilang. Jangan pernah menggunakan dana darurat atau uang pinjaman untuk trading.</p>

      <h3>2. Mulai dengan Modal Kecil</h3>
      <p>Tidak perlu memulai dengan modal besar. Mulailah dengan jumlah yang nyaman dan tingkatkan secara bertahap seiring bertambahnya pengalaman dan konsistensi profit.</p>

      <h3>3. Terapkan Aturan Persentase</h3>
      <p>Batasi risiko maksimal 1-2% dari total modal per transaksi. Contoh: dengan modal $1.000, risiko maksimal per trade adalah $10-$20.</p>

      <h3>4. Catat Setiap Transaksi</h3>
      <p>Buat jurnal trading yang mencatat setiap posisi: entry, exit, alasan masuk, hasil, dan pelajaran yang didapat. Jurnal membantu mengidentifikasi pola keberhasilan dan kesalahan.</p>

      <h3>5. Pisahkan Profit</h3>
      <p>Setelah mencapai target profit tertentu, tarik sebagian keuntungan. Ini melindungi profit dari risiko dikembalikan ke pasar.</p>

      <h3>6. Hindari Overtrading</h3>
      <p>Kualitas lebih penting daripada kuantitas. Tunggu setup trading yang benar-benar sesuai dengan strategi Anda sebelum membuka posisi.</p>

      <h3>7. Jangan Serakah</h3>
      <p>Tetapkan target profit harian atau mingguan. Saat target tercapai, berhenti trading. Keserakahan adalah musuh terbesar trader.</p>

      <h2>Contoh Perhitungan Money Management</h2>
      <p>Modal: $1.000 | Risiko per trade: 2% = $20 | Stop loss: 20 pip | Nilai pip akun micro: $0.10 | Ukuran posisi: $20 / (20 x $0.10) = 10 micro lot.</p>

      <h2>Kesimpulan</h2>
      <p>Money management bukan tentang menghasilkan profit besar dalam waktu singkat, melainkan tentang konsistensi dan kelangsungan jangka panjang. Trader yang sukses adalah trader yang bisa bertahan di pasar.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return articles.filter((a) => a.category === category);
}

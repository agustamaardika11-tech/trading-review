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
    slug: 'apa-itu-forex-trading-panduan-lengkap-pemula',
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

function RankingItem() {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl shadow-sm">
      
      {/* posición */}
      <div className="w-8 text-center text-slate-400 font-bold text-lg">
        4
      </div>

      {/* avatar */}
      <div
        className="w-12 h-12 rounded-full overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgIEv7K_YSWXFCeK0IgUcmAsoRMvh9kzMBm2g73UuLoDPuYPAQha2ZpwwQQ4R0cXvafd9xlNcWINKyNglP58zUfzVlpqKYEhR_ba8Yhd2avNSFlsv6P9m5Lm07CftehPEf_cyzGVeNuprnZgyJm58I2WBuHoTJkMcULGJ_njeBBTdnl59i-hE44uWorq5-GwolA1bNMrRKLqOFzEGfhLLEuU11Xj_zpZhZ_mraFAo7W-hfCagYMbNjWadoqXaZjeJk4QmOlJRMJIb5')"
        }}
      />

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold truncate">Carlos Rivera</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          12 Victorias • 2 Derrotas
        </p>
      </div>

      {/* puntos */}
      <div className="text-right">
        <p className="font-bold text-primary">1,820 pts</p>
        <p className="text-[10px] text-green-500 font-bold flex items-center justify-end">
          <span className="material-symbols-outlined text-[12px]">
            trending_up
          </span>
          +15
        </p>
      </div>

    </div>
  );
}

export default RankingItem;
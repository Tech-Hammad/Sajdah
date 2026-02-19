import React, { useEffect, useState } from "react";

const PRESET_DHIKR = [
  "Subhanallah",
  "Alhamdulillah",
  "Allahu Akbar",
  "La ilaha illallah",
];

const PRESET_TARGETS = [33, 100, 300];

const TasbeehCounter = () => {
  const [selectedDhikr, setSelectedDhikr] = useState(PRESET_DHIKR[0]);
  const [customDhikr, setCustomDhikr] = useState("");
  const [useCustomDhikr, setUseCustomDhikr] = useState(false);

  const [targetCount, setTargetCount] = useState(PRESET_TARGETS[0]);
  const [customTarget, setCustomTarget] = useState("");
  const [useCustomTarget, setUseCustomTarget] = useState(false);

  const [currentCount, setCurrentCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [roundsHistory, setRoundsHistory] = useState([]);

  const activeDhikr = useCustomDhikr && customDhikr.trim() ? customDhikr : selectedDhikr;
  const activeTarget =
    useCustomTarget && Number(customTarget) > 0 ? Number(customTarget) : targetCount;

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sajdah_tasbeeh_history");
      if (saved) {
        setRoundsHistory(JSON.parse(saved));
      }
      const savedTotal = localStorage.getItem("sajdah_tasbeeh_total");
      if (savedTotal) {
        setTotalCount(Number(savedTotal));
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sajdah_tasbeeh_history", JSON.stringify(roundsHistory));
      localStorage.setItem("sajdah_tasbeeh_total", String(totalCount));
    } catch {
    }
  }, [roundsHistory, totalCount]);

  const saveRound = (countToSave) => {
    if (!countToSave) return;

    const now = new Date();
    const entry = {
      id: now.getTime(),
      dhikr: activeDhikr,
      target: activeTarget,
      count: countToSave,
      completedAt: now.toISOString(),
    };

    setRoundsHistory((prev) => [entry, ...prev].slice(0, 20));
  };

  const handleIncrement = () => {
    setCurrentCount((prev) => {
      const next = prev + 1;
      setTotalCount((t) => t + 1);
      
      // Auto Save
      if (activeTarget > 0 && next >= activeTarget) {
        saveRound(next);
        return 0; 
      }

      return next;
    });
  };

  const handleDecrement = () => {
    setCurrentCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleResetRound = () => {
    setCurrentCount(0);
  };

  const handleCompleteRound = () => {
    if (currentCount === 0) return;
    saveRound(currentCount);
    setCurrentCount(0);
  };

  const completionRatio =
    activeTarget > 0 ? Math.min(currentCount / activeTarget, 1) : 0;
  const completionPercent = Math.round(completionRatio * 100);

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-white to-secondary/5 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-24 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Tasbeeh Counter
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A focused digital tasbeeh to help you complete your rounds of dhikr
            with clarity and history.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-1">
                    Dhikr
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {activeDhikr || "Select Dhikr"}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Target per round
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {activeTarget || "—"}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Preset dhikr */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-[0.15em] mb-2">
                    Quick presets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_DHIKR.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setUseCustomDhikr(false);
                          setSelectedDhikr(item);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-all ${
                          !useCustomDhikr && selectedDhikr === item
                            ? "bg-primary text-dark border-primary shadow-sm"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom dhikr */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-[0.15em] mb-2">
                    Custom dhikr
                  </p>
                  <input
                    type="text"
                    value={customDhikr}
                    onChange={(e) => {
                      setCustomDhikr(e.target.value);
                      setUseCustomDhikr(true);
                    }}
                    placeholder="e.g. Astaghfirullah"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="useCustomDhikr"
                      type="checkbox"
                      checked={useCustomDhikr}
                      onChange={(e) => setUseCustomDhikr(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label
                      htmlFor="useCustomDhikr"
                      className="text-xs text-gray-600 dark:text-gray-400"
                    >
                      Use custom dhikr text
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Target selection card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  Rounds & target
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total counted:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {totalCount}
                  </span>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Preset targets */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-[0.15em] mb-2">
                    Common targets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_TARGETS.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setUseCustomTarget(false);
                          setTargetCount(value);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-all ${
                          !useCustomTarget && targetCount === value
                            ? "bg-primary text-dark border-primary shadow-sm"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom target */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-[0.15em] mb-2">
                    Custom target
                  </p>
                  <input
                    type="number"
                    min="1"
                    value={customTarget}
                    onChange={(e) => {
                      setCustomTarget(e.target.value);
                      setUseCustomTarget(true);
                    }}
                    placeholder="e.g. 100"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="useCustomTarget"
                      type="checkbox"
                      checked={useCustomTarget}
                      onChange={(e) => setUseCustomTarget(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label
                      htmlFor="useCustomTarget"
                      className="text-xs text-gray-600 dark:text-gray-400"
                    >
                      Use custom target per round
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main counter card */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:via-primary/10 dark:to-gray-900 rounded-3xl border border-primary/20 dark:border-primary/40 shadow-xl p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Circular counter */}
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-white/90 via-white/70 to-primary/20 flex flex-col items-center justify-center shadow-[0_20px_45px_rgba(15,23,42,0.35)] border border-white/80 dark:border-gray-700 hover:scale-105 active:scale-100 transition-transform cursor-pointer"
                >
                  <div className="absolute inset-5 rounded-full border-2 border-dashed border-primary/40" />
                  <div className="relative text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">
                      Tap to count
                    </p>
                    <p className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {currentCount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      of {activeTarget || "—"}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 max-w-[180px] mx-auto">
                      Focus your heart on the dhikr and simply tap for each count.
                    </p>
                  </div>
                </button>

                {/* Progress bar */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Round progress</span>
                    <span>{completionPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/60 dark:bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all"
                      style={{ width: `${completionPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm border border-gray-300 bg-gray-600 text-gray-100 cursor-pointer"
                  >
                    -1
                  </button>
                  <button
                    type="button"
                    onClick={handleResetRound}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm border border-gray-300 bg-primary text-black hover:bg-secondary/80 hover:text-white cursor-pointer transition-colors"
                  >
                    Reset round
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteRound}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm border border-gray-300 text-white bg-secondary/80 hover:bg-primary hover:text-black cursor-pointer transition-colors"
                  >
                    Save round
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  Completed rounds
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last {roundsHistory.length} sessions
                </p>
              </div>

              {roundsHistory.length === 0 ? (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  No rounds saved yet. Complete a round and tap{" "}
                  <span className="font-semibold">Save round</span> to keep a
                  record of your dhikr.
                </p>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                  {roundsHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/70 px-3 py-2.5 text-xs sm:text-sm"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {entry.dhikr}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {formatDateTime(entry.completedAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {entry.count}{" "}
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">
                            / {entry.target}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-secondary/10 dark:bg-gray-900 rounded-2xl border border-gray-200/70 dark:border-gray-800 px-4 py-3 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
              <p>
                Your tasbeeh history is stored locally in this browser only. You
                can safely refresh the page without losing your saved rounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasbeehCounter;
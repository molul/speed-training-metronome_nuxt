import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type {
  MetronomeConfig,
  MetronomePreset,
  TempoPoint,
  TempoStep,
} from "../assets/types";

export type BeatType = "high" | "low" | "mute";

export const useMetronomeStore = defineStore("metronome", () => {
  // 1. NON-PERSISTED STATE (Reset on page refresh)
  const isRunning = ref(false);
  const currentBar = ref(0);
  const visualBar = ref(0);
  const currentBpm = ref(0);
  const beatInBar = ref(0);
  const dragging = ref<number | null>(null);
  const temposColumnWidth = ref(26);
  const metronomeSectionPadding = ref(16);
  const rows = 37;

  // 2. PERSISTED CONFIG (The "furniture" that stays)
  // useStorage handles the initial 'getItem' and every future 'setItem' automatically.
  const config = useStorage<MetronomeConfig>("metronomeConfig", {
    startBpm: 100,
    peakBpm: 160,
    endBpm: 130,
    stopAtEnd: false,
    barsPerCell: 2,
    beatsPerBar: 4,
    beatPattern: ["high", "low", "low", "low"] as BeatType[],
    tempoStep: "bar" as TempoStep,
    points: [
      { bar: 1, bpm: 100 },
      { bar: 8, bpm: 160 },
      { bar: 12, bpm: 130 },
    ] as [TempoPoint, TempoPoint, TempoPoint],
  });

  // 3. LOGIC HELPERS (Keep these exactly as they were)
  const bpmToRow = (bpm: number) => Math.round(rows - (bpm - 40) / 5);
  const rowToBpm = (row: number) => 40 + (rows - row) * 5;

  const gridPoints = computed(() =>
    config.value.points.map((p) => ({
      col: p.bar,
      row: bpmToRow(p.bpm),
    }))
  );

  // 4. ACTIONS (Updated slightly to use .value because useStorage is a Ref)
  function updatePoints(p: [TempoPoint, TempoPoint, TempoPoint]) {
    config.value.points = p;
    config.value.startBpm = p[0].bpm;
    config.value.peakBpm = p[1].bpm;
    config.value.endBpm = p[2].bpm;
  }

  function loadPreset(p: MetronomePreset | MetronomeConfig) {
    if (!p) return;

    // We deep copy to break references, just like before
    if (p.points) config.value.points = JSON.parse(JSON.stringify(p.points));

    config.value.startBpm = p.startBpm;
    config.value.peakBpm = p.peakBpm;
    config.value.endBpm = p.endBpm;
    config.value.stopAtEnd = p.stopAtEnd;
    config.value.barsPerCell = p.barsPerCell;
    config.value.beatsPerBar = p.beatsPerBar || 4;
    config.value.tempoStep = p.tempoStep || "cell";

    if (p.beatPattern) {
      config.value.beatPattern = JSON.parse(JSON.stringify(p.beatPattern));
    } else {
      config.value.beatPattern = Array(config.value.beatsPerBar)
        .fill("low")
        .map((_, i) => (i === 0 ? "high" : "low"));
    }
  }

  function toggleBeat(index: number) {
    const cycle: BeatType[] = ["high", "low", "mute"];
    const current = config.value.beatPattern[index];
    if (!current) return;
    const currentIndex = cycle.indexOf(current);
    const next = cycle[(currentIndex + 1) % cycle.length];
    if (next) config.value.beatPattern[index] = next;
  }

  function reset() {
    Object.assign(config.value, {
      startBpm: 100,
      peakBpm: 160,
      endBpm: 130,
      stopAtEnd: false,
      barsPerCell: 2,
      beatsPerBar: 4,
      tempoStep: "bar",
      points: [
        { bar: 1, bpm: 100 },
        { bar: 8, bpm: 160 },
        { bar: 12, bpm: 130 },
      ],
      beatPattern: ["high", "low", "low", "low"],
    });
  }

  // 5. WATCHERS (Note the config.value change)
  watch(
    [
      () => config.value.startBpm,
      () => config.value.peakBpm,
      () => config.value.endBpm,
    ],
    ([s, m, e]) => {
      config.value.points[0].bpm = s;
      config.value.points[1].bpm = m;
      config.value.points[2].bpm = e;
    }
  );

  watch(
    () => config.value.beatsPerBar,
    (newCount) => {
      while (config.value.beatPattern.length < newCount) {
        config.value.beatPattern.push("low");
      }
      if (config.value.beatPattern.length > newCount) {
        config.value.beatPattern = config.value.beatPattern.slice(0, newCount);
      }
    }
  );

  return {
    dragging,
    beatInBar,
    config, // This is now a Ref! In your components, use store.config.startBpm (Pinia unwraps it)
    isRunning,
    currentBar,
    visualBar,
    currentBpm,
    temposColumnWidth,
    rows,
    metronomeSectionPadding,
    gridPoints,
    updatePoints,
    reset,
    toggleBeat,
    loadPreset,
    bpmToRow,
    rowToBpm,
  };
});

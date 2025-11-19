// GateSymbolLine.tsx
import React from "react";

type GateSymbolLineProps = {
  label: string;      // X, H, T, etc.
  qubits?: number;    // 1 o 2
};

export const GateSymbolLine: React.FC<GateSymbolLineProps> = ({
  label,
  qubits = 1,
}) => {
  if (qubits === 1) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-800">
        <span className="font-mono text-xs text-slate-500">|ψ⟩</span>
        <div className="flex-1 h-px bg-slate-300" />
        <div className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 text-white text-xs font-semibold">
          {label}
        </div>
        <div className="flex-1 h-px bg-slate-300" />
      </div>
    );
  }

  // CNOT: 2 qubits
  return (
    <div className="inline-flex flex-col gap-2 text-sm text-slate-800">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-slate-500">control</span>
        <div className="flex-1 h-px bg-slate-300 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 rounded-full border border-slate-900 bg-slate-900" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-slate-500">target</span>
        <div className="flex-1 h-px bg-slate-300 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 w-4 h-4 rounded-full border-[1.5px] border-slate-900 flex items-center justify-center bg-slate-900 text-white text-[10px] font-bold">
            ⊕
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 top-[-18px] bottom-[-2px] w-px bg-slate-900" />
        </div>
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-500 text-center">
        CNOT
      </div>
    </div>
  );
};

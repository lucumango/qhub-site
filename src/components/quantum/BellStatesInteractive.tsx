import { useState } from 'react';

const BellStatesInteractive = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const bellStates = [
    { id: 'phi+', label: '|Φ⁺⟩', description: '(|00⟩ + |11⟩)/√2' },
    { id: 'phi-', label: '|Φ⁻⟩', description: '(|00⟩ - |11⟩)/√2' },
    { id: 'psi+', label: '|Ψ⁺⟩', description: '(|01⟩ + |10⟩)/√2' },
    { id: 'psi-', label: '|Ψ⁻⟩', description: '(|01⟩ - |10⟩)/√2' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {bellStates.map((state) => (
          <div
            key={state.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedState === state.id
                ? 'border-quantum-blue bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedState(state.id)}
          >
            <div className="text-xl font-mono text-center">{state.label}</div>
            <div className="text-sm text-center mt-1 text-gray-600">
              {state.description}
            </div>
          </div>
        ))}
      </div>

      {selectedState && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-bold mb-2">Explicación del estado {bellStates.find(s => s.id === selectedState)?.label}:</h4>
          <p className="text-gray-700">
            {getStateExplanation(selectedState)}
          </p>
        </div>
      )}
    </div>
  );
};

function getStateExplanation(stateId: string): string {
  switch (stateId) {
    case 'phi+':
      return 'Este estado está máximamente entrelazado y es simétrico bajo rotaciones. Si mides un qubit en |0⟩, el otro también estará en |0⟩, y lo mismo para |1⟩.';
    case 'phi-':
      return 'Similar a |Φ⁺⟩ pero con una diferencia de fase global. Si mides un qubit, el otro tendrá el mismo valor, pero con una fase relativa diferente.';
    case 'psi+':
      return 'Estado de Bell con correlación anti-simétrica. Si mides un qubit en |0⟩, el otro estará en |1⟩, y viceversa.';
    case 'psi-':
      return 'Conocido como el estado singlete o estado EPR. Es invariante bajo rotaciones y tiene propiedades de entrelazamiento únicas.';
    default:
      return 'Selecciona un estado para ver su explicación.';
  }
}

export default BellStatesInteractive;
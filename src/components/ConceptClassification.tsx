import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Binary, Atom } from "lucide-react";
import { dragItems, DragItemType, TargetBox } from "@/data/quantumData";
import conceptDragDrop from "@/hooks/conceptDragDrop";

interface ConceptClassificationProps {}

const ConceptClassification: React.FC<ConceptClassificationProps> = () => {
  const {
    draggedItems,
    feedback,
    dragOverBox,
    isDragging,
    availableItems,
    allItemsPlaced,
    setDragOverBox,
    handleDrop,
    handleDragStart,
    handleDragEnd,
    handleRemoveItem,
    resetPuzzle,
  } = conceptDragDrop({ dragItems });

  return (
    <div className="relative">

      <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
        <h2 className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
          ¡Hora de Jugar! Clasifica los Conceptos
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-4xl mx-auto font-arimo">
          Arrastra y suelta cada concepto en la caja correcta: ¿Clásico o
          Cuántico? ¡Vamos a ver cuánto has aprendido!
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna de Conceptos Disponibles */}
          <div className="lg:col-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-2xl max-h-[500px] overflow-y-auto">
            <h3 className="text-2xl font-staatliches text-foreground mb-6 text-center">
              Conceptos
            </h3>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {availableItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    layoutId={`item-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-grab hover:bg-gray-800/70 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        isDragging === item.id ? "opacity-30 scale-95" : ""
                      }`}
                      draggable
                      onDragStart={(e: React.DragEvent) => {
                        handleDragStart(item.id);
                        e.dataTransfer.setData("text/plain", item.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragEnd={() => handleDragEnd()}
                    >
                      {item.icon}
                      <span className="text-white select-none">
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {availableItems.length === 0 && (
                <motion.p
                  className="text-sm text-gray-400 italic text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ¡Has colocado todos los conceptos!
                </motion.p>
              )}
            </div>
          </div>

          {/* Boxes */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {["classical", "quantum"].map((boxType) => (
              <motion.div
                key={boxType}
                className={`flex-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border-2 transition-all duration-300 shadow-2xl min-h-[220px] ${
                  dragOverBox === boxType
                    ? boxType === "classical"
                      ? "border-quantum-dark-blue bg-quantum-dark-blue/20 shadow-quantum-dark-blue/30"
                      : "border-quantum-purple bg-quantum-purple/20 shadow-quantum-purple/30"
                    : isDragging
                    ? "border-white/40 bg-white/10"
                    : "border-white/20"
                }`}
                animate={{
                  scale: dragOverBox === boxType ? 1.02 : 1,
                  boxShadow:
                    dragOverBox === boxType
                      ? boxType === "classical"
                        ? "0 0 20px rgba(30, 58, 138, 0.3)"
                        : "0 0 20px rgba(107, 33, 168, 0.3)"
                      : "0 0 0px rgba(0,0,0,0)",
                }}
                onDragOver={(e: React.DragEvent) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  setDragOverBox(boxType as TargetBox);
                }}
                onDragLeave={(e: React.DragEvent) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX;
                  const y = e.clientY;
                  if (
                    x < rect.left ||
                    x > rect.right ||
                    y < rect.top ||
                    y > rect.bottom
                  ) {
                    setDragOverBox(null);
                  }
                }}
                onDrop={(e: React.DragEvent) => {
                  e.preventDefault();
                  const itemId = e.dataTransfer.getData("text/plain");
                  if (itemId) {
                    handleDrop(itemId, boxType as TargetBox);
                  }
                  setDragOverBox(null);
                }}
              >
                <h3
                  className={`text-xl font-bold mb-4 text-center transition-colors ${
                    boxType === "classical"
                      ? dragOverBox === boxType
                        ? "text-quantum-dark-blue"
                        : "text-foreground"
                      : dragOverBox === boxType
                      ? "text-quantum-purple"
                      : "text-foreground"
                  }`}
                >
                  {boxType === "classical" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Binary className="w-6 h-6" />
                      Clásico
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Atom className="w-6 h-6" />
                      Cuántico
                    </span>
                  )}
                </h3>
                <div className="space-y-3 min-h-[80px]">
                  <AnimatePresence mode="popLayout">
                    {Object.entries(draggedItems)
                      .filter(([_, target]) => target === boxType)
                      .map(([itemId]) => {
                        const item = dragItems.find((i) => i.id === itemId);
                        if (!item) return null;
                        const isCorrect = feedback[itemId];
                        return (
                          <motion.div
                            key={itemId}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              isCorrect === undefined
                                ? "border-gray-700 bg-gray-800/50"
                                : isCorrect
                                ? "border-green-500 bg-green-500/20"
                                : "border-red-500 bg-red-500/20"
                            }`}
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            layout
                            layoutId={`item-${item.id}`}
                            transition={{ duration: 0.2 }}
                          >
                            {item.icon}
                            <span className="text-white flex-1 select-none">
                              {item.text}
                            </span>
                            {isCorrect !== undefined && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {isCorrect ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-400" />
                                )}
                              </motion.div>
                            )}
                            <motion.button
                              onClick={() => handleRemoveItem(itemId)}
                              className="text-gray-400 hover:text-gray-200 p-1 rounded"
                              aria-label="Remove item"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                  {Object.values(draggedItems).filter((t) => t === boxType)
                    .length === 0 && (
                    <motion.div
                      className={`text-sm italic text-center p-8 border-2 border-dashed rounded-lg transition-all ${
                        dragOverBox === boxType
                          ? boxType === "classical"
                            ? "border-quantum-dark-blue text-quantum-dark-blue bg-quantum-dark-blue/10 shadow-lg"
                            : "border-quantum-purple text-quantum-purple bg-quantum-purple/10 shadow-lg"
                          : isDragging
                          ? "border-gray-400 text-gray-300 bg-gray-500/5"
                          : "border-gray-600 text-gray-400"
                      }`}
                      animate={{
                        scale: dragOverBox === boxType ? 1.05 : 1,
                        borderWidth: dragOverBox === boxType ? "3px" : "2px",
                      }}
                    >
                      {dragOverBox === boxType
                        ? "¡Suelta aquí!"
                        : isDragging
                        ? "Arrastra aquí"
                        : "Arrastra los conceptos aquí"}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* mensaje de exito */}
        {allItemsPlaced && (
          <motion.div
            className="mt-8 p-6 bg-green-500/20 border-l-4 border-green-500 rounded-lg text-center"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.h3
              className="text-2xl font-bold text-green-400 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ¡Felicidades! 🎉
            </motion.h3>
            <p className="text-green-200 mb-4">
              Has clasificado todos los conceptos. ¡Eres un verdadero
              explorador cuántico!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={resetPuzzle}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Jugar de Nuevo
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConceptClassification;
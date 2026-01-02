import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Binary, Atom } from "lucide-react";
import { dragItems, DragItemType, TargetBox } from "@/data/quantumData";
import conceptDragDrop from "@/hooks/conceptDragDrop";

interface ConceptClassificationProps {}

const schrodiMessages = {
  correct: [
    "¡Excelente! Estás entendiendo la diferencia entre lo clásico y lo cuántico. 🎉",
    "¡Miau-ravilloso! Eso es correcto. ¡Sigue así! ✨",
    "¡Perfecto! En mi caja cuántica, eso definitivamente está en el lugar correcto. 😺",
    "¡Bravo! Has capturado la esencia cuántica correctamente. 🌟",
    "¡Increíble! Parece que estás en superposición de ser un experto.",
    "¡Exacto! Tu comprensión está colapsando hacia la respuesta correcta.",
  ],
  incorrect: [ 
    "¡Ups! Ese concepto pertenece al otro lado. ¡Inténtalo de nuevo! 😸",
    "Hmm... no exactamente. Piensa en las características que acabamos de ver.",
    "¡Casi! Pero ese concepto tiene propiedades diferentes. ¡Vuelve a intentar! 💭",
    "¡Miau! Creo que te confundiste. Recuerda: lo clásico es definitivo, lo cuántico es misterioso.",
    "No te preocupes, hasta yo a veces me confundo entre estar vivo y... bueno, ya sabes. 😅",
    "¡Oops! Ese no es su hogar natural. ¡Dale otra oportunidad! 🔄",
  ],
};

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

  const [schrodiMessage, setSchrodiMessage] = useState<{
    text: string;
    type: "correct" | "incorrect";
  } | null>(null);

  useEffect(() => {
    const feedbackEntries = Object.entries(feedback);
    if (feedbackEntries.length > 0) {
      const lastFeedback = feedbackEntries[feedbackEntries.length - 1];
      const [_, isCorrect] = lastFeedback;
      
      const messages = isCorrect ? schrodiMessages.correct : schrodiMessages.incorrect;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      setSchrodiMessage({
        text: randomMessage,
        type: isCorrect ? "correct" : "incorrect",
      });

      const timer = setTimeout(() => {
        setSchrodiMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="relative">

      <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
        <h2 className="text-3xl md:text-5xl font-staatliches text-foreground mb-8 text-center">
          ¡Hora de Jugar! Clasifica los conceptos
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-4xl mx-auto font-arimo">
          Arrastra y suelta cada concepto en la caja correcta: ¿Clásico o
          Cuántico? ¡Vamos a ver cuánto has aprendido!
        </p>

        <AnimatePresence>
          {schrodiMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div
                className={`flex items-center gap-4 p-6 rounded-2xl border-2 shadow-2xl ${
                  schrodiMessage.type === "correct"
                    ? "bg-gradient-to-r from-green-500/20 to-quantum-purple/20 border-green-500/50"
                    : "bg-gradient-to-r from-red-500/20 to-quantum-orange/20 border-red-500/50"
                }`}
              >
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img
                      src={
                        schrodiMessage.type === "correct"
                          ? "/mascota/schrodi-flying.png"
                          : "/mascota/schrodi-reading.png"
                      }
                      alt="Schrödi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="font-staatliches text-xl md:text-2xl text-black mb-2 flex items-center gap-2">
                      {schrodiMessage.type === "correct" ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          ¡Schrödi te felicita!
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-red-400" />
                          Schrödi te anima a intentarlo de nuevo
                        </>
                      )}
                    </h4>
                    <p
                      className={`font-arimo text-base md:text-lg font-medium ${
                        schrodiMessage.type === "correct"
                          ? "text-black"
                          : "text-black"
                      }`}
                    >
                      {schrodiMessage.text}
                    </p>
                  </motion.div>
                </div>

                {schrodiMessage.type === "correct" && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-green-400 rounded-full"
                        initial={{
                          opacity: 0,
                          x: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
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
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border-2 transition-all duration-300 shadow-2xl min-h-[180px] ${
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
                <div className="space-y-3 min-h-[80px] max-h-[300px] overflow-y-auto">
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
                            <span className="text-black flex-1 select-none">
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

        {/* mensaje de resultado final */}
        {allItemsPlaced && (() => {
          const feedbackValues = Object.values(feedback);
          const allCorrect = feedbackValues.length > 0 && feedbackValues.every(v => v === true);
          const correctCount = feedbackValues.filter(v => v === true).length;
          const totalCount = feedbackValues.length;
          
          return (
            <motion.div
              className={`mt-8 p-8 border-2 rounded-2xl shadow-2xl ${
                allCorrect 
                  ? "bg-gradient-to-r from-green-500/20 to-quantum-purple/20 border-green-500/50"
                  : "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/50"
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  animate={allCorrect ? {
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                  } : {
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0"
                >
                  <div className={`w-32 h-32 rounded-full overflow-hidden border-4 shadow-2xl ${
                    allCorrect ? "border-quantum-orange" : "border-orange-400"
                  }`}>
                    <img
                      src={allCorrect ? "/mascota/schrodi-flying.png" : "/mascota/schrodi-reading.png"}
                      alt={allCorrect ? "Schrödi celebrando" : "Schrödi pensando"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  {allCorrect ? (
                    <>
                      <motion.h3
                        className="text-3xl md:text-4xl font-staatliches text-green-400 mb-3"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 2 }}
                      >
                        ¡Felicidades, Explorador cuántico! 🎉
                      </motion.h3>
                      <p className="text-lg text-black font-arimo font-medium mb-4">
                        ¡Miau-ravilloso! Has clasificado todos los conceptos correctamente.
                        Estás listo para seguir explorando los misterios del universo cuántico.
                        ¡Sigue así! ✨
                      </p>
                    </>
                  ) : (
                    <>
                      <motion.h3
                        className="text-3xl md:text-4xl font-staatliches text-orange-400 mb-3"
                      >
                        ¡Casi lo logras!  
                      </motion.h3>
                      <p className="text-lg text-black font-arimo font-medium mb-4">
                        Acertaste {correctCount} de {totalCount} conceptos. 
                        ¡No te preocupes! Revisa los conceptos marcados en rojo y vuelve a intentarlo.
                        Puedes usar el botón de reinicio en cada concepto para moverlo de nuevo. 💪
                      </p>
                    </>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={resetPuzzle}
                      className={`${
                        allCorrect 
                          ? "bg-quantum-purple hover:bg-quantum-purple/80" 
                          : "bg-orange-500 hover:bg-orange-600"
                      } text-white font-staatliches text-lg px-6 py-3`}
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      {allCorrect ? "Jugar de Nuevo" : "Intentar de Nuevo"}
                    </Button>
                  </motion.div>
                </div>

                {allCorrect && [...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-quantum-orange rounded-full pointer-events-none"
                    initial={{
                      opacity: 0,
                      x: "50%",
                      y: "50%",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: `${50 + Math.random() * 100 - 50}%`,
                      y: `${50 + Math.random() * 100 - 50}%`,
                      scale: [0, 2, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
};

export default ConceptClassification;
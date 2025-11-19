import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle, XCircle, RotateCcw } from "lucide-react";

// Definición de los estados del postre
const POSTRES = [
    { 
        id: 0, 
        nombre: "pancake",  
        color: "bg-orange-500",
        imagen: "/img/pancake.avif" // Asegúrate de tener esta imagen en tu carpeta public
    },
    { 
        id: 1, 
        nombre: "cake", 
        color: "bg-purple-600",
        imagen: "/img/cake.jpg" // Asegúrate de tener esta imagen en tu carpeta public
    },
];

const schrodiMessages = {
    correct: [
        "¡Miau-ravilloso! ¡Confiaste en el Entrelazamiento! La conexión es total. ⚡",
        "¡Perfecto! Viste una y al instante supiste el estado de la otra. ¡El vínculo cuántico es real! 🔗",
        "¡Bravo! Eso demuestra que las partículas son una sola entidad. ¡Felicidades! 🎉",
        "¡Excelente! Tu intuición cuántica está en sintonía. ✨",
        "¡Increíble! Parece que estás en superposición de ser un experto. 😺",
        "¡Exacto! Tu comprensión está colapsando hacia la respuesta correcta. 🌟",
    ],
    incorrect: [
        "¡Ups! Parece que pensaste en el mundo clásico. ¡Recuerda, la correlación es total en el entrelazamiento! 🔄",
        "Hmm... no exactamente. Piensa en la conexión instantánea. 💭",
        "¡Casi! Pero en el entrelazamiento, el estado es complementario. ¡Vuelve a intentar! 🐾",
        "¡Miau! Creo que te confundiste. Recuerda: en mi universo, las cosas no son tan independientes. 😅",
        "No te preocupes, hasta yo a veces me confundo con mis propios estados. ¡Dale otra oportunidad! 🐈",
        "¡Oops! Esa no es la correlación esperada. ¡Concéntrate en el vínculo cuántico! 😵‍💫",
    ],
};

const getRandomMessage = (type: "correct" | "incorrect") => {
    const messages = type === "correct" ? schrodiMessages.correct : schrodiMessages.incorrect;
    return messages[Math.floor(Math.random() * messages.length)];
};

const initializeAssignment = () => (Math.random() > 0.5 ? [0, 1] : [1, 0]);

const ElDesafíoDeLasCajasCuanticas = () => {
    const [assignment, setAssignment] = useState(initializeAssignment);
    const [isOpened, setIsOpened] = useState<[boolean, boolean]>([false, false]);
    const [prediction, setPrediction] = useState<number | null>(null);
    const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | null>(null);
    const [schrodiMessage, setSchrodiMessage] = useState<string | null>(null);
    const [schrodiAnimationTrigger, setSchrodiAnimationTrigger] = useState(0);

    // **********************************************
    // LÓGICA DE FEEDBACK Y MENSAJES (CORREGIDA)
    // **********************************************
    useEffect(() => {
        if (feedbackType) {
            const messageText = getRandomMessage(feedbackType);
            setSchrodiMessage(messageText);
            setSchrodiAnimationTrigger(prev => prev + 1); // Dispara la animación
            
            // Retrasa el reset del mensaje para que el usuario pueda leerlo
            const timer = setTimeout(() => {
                // Solo limpia el texto, mantiene el feedbackType para el botón de reinicio
                setSchrodiMessage(null); 
            }, 5000); 

            return () => clearTimeout(timer);
        }
    }, [feedbackType]);


    const handleOpenBox = (idx: 0 | 1) => {
        if (isOpened[0] || isOpened[1] || feedbackType) return;

        setIsOpened(prev => {
            const newState = [...prev];
            newState[idx] = true;
            return newState as [boolean, boolean];
        });
        setSchrodiMessage(`¡Ya abriste la Caja ${idx === 0 ? 'A' : 'B'}! Ahora, ¿qué crees que hay en la otra?`);
        setSchrodiAnimationTrigger(prev => prev + 1);
    };

    const handlePredict = (predictedId: number) => {
        if (feedbackType !== null) return;

        const openIndex = isOpened[0] ? 0 : 1;
        const unopenedIndex = 1 - openIndex;
        
        const realUnopenedPostreId = assignment[unopenedIndex];
        
        const isCorrect = predictedId === realUnopenedPostreId;

        if (isCorrect) {
            setFeedbackType("correct");
        } else {
            setFeedbackType("incorrect");
        }
        setPrediction(predictedId);
        setIsOpened([true, true]); // Revelar la segunda caja al hacer la predicción
    };

    const resetGame = () => {
        setAssignment(initializeAssignment());
        setIsOpened([false, false]);
        setPrediction(null);
        setFeedbackType(null);
        setSchrodiMessage("¡Bienvenido! Haz clic en una caja para empezar el Desafío Cuántico.");
        setSchrodiAnimationTrigger(prev => prev + 1);
    };

    // Mensaje y estado inicial
    useEffect(() => {
        resetGame();
    }, []);

    const isAnyBoxOpen = isOpened[0] || isOpened[1];

    const getSchrodiTitle = () => {
        if (feedbackType === "correct") return "¡Schrödi te felicita!";
        if (feedbackType === "incorrect") return "Schrödi te anima a intentarlo de nuevo";
        return "¡Desafío cuántico!";
    };

    return (
        <div className="    relative mt-8">
            <h2 className="text-3xl font-staatliches mb-4 text-left">
                Desafío: El Entrelazamiento de Schrödi
            </h2>
            <div className="space-y-6 font-arimo text-muted-foreground leading-relaxed mb-12">
                  <p className="text-xl text-justify">
                    Schrödi ha preparado dos cajas cuánticas para sus amigas, Ariana y Camila, con una torta y unos panqueques. 
                    Lo esencial es que las <strong>cajas están entrelazadas.</strong>
                  </p>
                  <p className="text-xl text-justify">
                    Hasta que no abren, ninguna sabe qué le tocó. 
                    Pero en cuanto Ariana abre su caja y ve el contenido, Camila aunque esté muy lejos sabe automáticamente que le tocó el postre opuesto. 
                    ¡Su destino está unido al instante!
                  </p>

                  
            </div>
            
            {/* Mensaje de Schrödi (Feedback) con imagen */}
            <AnimatePresence mode="wait">
                {(schrodiMessage || feedbackType) && (
                    <motion.div
                        key={schrodiAnimationTrigger}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.2, ease: 'easeOut' }
                        }}
                        exit={{ 
                            opacity: 0, 
                            y: -5,
                            transition: { duration: 0.15 }
                        }}
                        className={`p-4 mb-6 rounded-xl border-l-4 flex items-start gap-4 transition-colors duration-300 ${
                            feedbackType === 'correct' 
                                ? 'bg-green-50/90 border-green-500' 
                                : feedbackType === 'incorrect' 
                                ? 'bg-red-50/90 border-red-500' 
                                : 'bg-purple-50/90 border-purple-500'
                        }`}
                    >
                        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img 
                                src={
                                    feedbackType === 'correct' 
                                        ? '/mascota/schrodi-flying.png' 
                                        : feedbackType === 'incorrect' 
                                        ? '/mascota/schrodi-standing.png' 
                                        : '/mascota/schrodi-pointing-R.png'
                                } 
                                alt="Schrödi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-staatliches text-xl text-gray-800 mb-1 flex items-center gap-2">
                                {feedbackType === 'correct' ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : feedbackType === 'incorrect' ? (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                ) : (
                                    <Zap className="w-5 h-5 text-purple-500" />
                                )}
                                {getSchrodiTitle()}
                            </h4>
                            <p className="font-arimo text-gray-700">
                                {schrodiMessage || "Haz clic en una caja para empezar el Desafío Cuántico."}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Visualización de las Cajas */}
            <div className="flex justify-around items-start my-8">
                
                {[0, 1].map((idx) => {
                    const postre = POSTRES[assignment[idx]];
                    const status = isOpened[idx] ? (
                        <img 
                            src={postre.imagen} 
                            alt={postre.nombre}
                            className="w-40 h-40 object-cover"
                        />
                    ) : (
                    <img 
                        src="/learning-path-icons/modulo1.png" 
                        alt="Caja cerrada" 
                        className="w-40 h-40 object-cover"
                    />
                    );
                    
                    // Estilo de la caja
                    const boxStyleClasses = `w-40 h-40 flex flex-col items-center justify-center transition-all duration-200 transform 
                        ${isOpened[idx] ? 'bg-transparent rounded-xl border-4 border-white/80' : 'hover:scale-[1.03] hover:-translate-y-1 cursor-pointer'}
                    `;

                    return (
                        <motion.div
                            key={idx}
                            className={boxStyleClasses}
                            onClick={() => handleOpenBox(idx as 0 | 1)}
                            whileHover={{ 
                                scale: isOpened[idx] ? 1.02 : 1.03, 
                                y: isOpened[idx] ? 0 : -2,
                                transition: { duration: 0.15 }
                            }}
                            whileTap={{ 
                                scale: 0.98,
                                transition: { duration: 0.1 }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                                opacity: 1, 
                                y: 0,
                                transition: { 
                                    duration: 0.4, 
                                    delay: idx * 0.1,
                                    ease: 'easeOut'
                                }
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
                                    {status}
                                </div>
                                <span className="text-quantum-purple font-bold text-lg mt-2">Caja {String.fromCharCode(65 + idx)}</span>
                            </div>
                            {isOpened[idx] && <span className="text-xs text-white/80 z-10">{postre.nombre}</span>}
                        </motion.div>
                    );
                })}
            </div>

            {/* Instrucciones y Predicción */}
            {isAnyBoxOpen && feedbackType === null && (
                <>
                    <p className="text-center font-semibold text-gray-700 mb-4">¡La magia del Entrelazamiento! ¿Cuál es el contenido de la caja que NO abriste?</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                        {POSTRES.map(postre => (
                            <motion.button
                                key={postre.id}
                                onClick={() => handlePredict(postre.id)}
                                disabled={feedbackType !== null}
                                className={`flex items-center justify-center p-4 rounded-xl shadow-lg font-bold transition-all duration-200 
                                    ${postre.id === prediction && feedbackType === 'correct' ? 'bg-green-500 text-white' : 
                                      postre.id === prediction && feedbackType === 'incorrect' ? 'bg-red-500 text-white' :
                                      'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'} 
                                    disabled:opacity-50 disabled:cursor-not-allowed`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {postre.nombre}
                            </motion.button>
                        ))}
                    </div>
                </>
            )}

            {/* Botón de reinicio al finalizar */}
            {(feedbackType !== null || (isAnyBoxOpen && schrodiMessage === null)) && (
                <div className="text-center mt-8">
                    <motion.button
                        onClick={resetGame}
                        className="bg-quantum-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 flex items-center justify-center mx-auto shadow-lg"
                        whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(107, 33, 168, 0.4)" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <RotateCcw className="w-5 h-5 mr-3" /> ¡Jugar de Nuevo!
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default ElDesafíoDeLasCajasCuanticas;
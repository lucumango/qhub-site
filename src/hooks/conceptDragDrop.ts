import { useState, useCallback } from "react";
import { DragItemType, TargetBox } from "@/data/quantumData";

interface UseDragDropProps {
  dragItems: DragItemType[];
}

const conceptDragDrop = ({ dragItems }: UseDragDropProps) => {
  const [draggedItems, setDraggedItems] = useState<
    Record<string, TargetBox>
  >({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [dragOverBox, setDragOverBox] = useState<TargetBox | null>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  const handleDrop = useCallback(
    (itemId: string, targetBox: TargetBox) => {
      const item = dragItems.find((i) => i.id === itemId);
      if (!item) return;

      setDraggedItems((prev) => ({
        ...prev,
        [itemId]: targetBox,
      }));

      const isCorrect = item.target === targetBox;
      setFeedback((prev) => ({
        ...prev,
        [itemId]: isCorrect,
      }));

      setDragOverBox(null);
      setIsDragging(null);
    },
    [dragItems]
  );

  const handleDragStart = useCallback((itemId: string) => {
    setIsDragging(itemId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(null);
    setDragOverBox(null);
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    setDraggedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[itemId];
      return newItems;
    });
    setFeedback((prev) => {
      const newFeedback = { ...prev };
      delete newFeedback[itemId];
      return newFeedback;
    });
  }, []);

  const resetPuzzle = useCallback(() => {
    setDraggedItems({});
    setFeedback({});
    setDragOverBox(null);
    setIsDragging(null);
  }, []);

  const availableItems = dragItems.filter((item) => !draggedItems[item.id]);
  const allItemsPlaced = availableItems.length === 0;

  return {
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
  };
};

export default conceptDragDrop;
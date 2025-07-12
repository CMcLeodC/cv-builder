import { useSortable } from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { SortableItem } from "./SortableItem";

export function SortableSection({ section, onItemChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: section.id,
    });

  const [collapsed, setCollapsed] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = section.items.findIndex((item) => item.id === active.id);
    const newIndex = section.items.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(section.items, oldIndex, newIndex);
    onItemChange("reorder", reordered);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border p-3 rounded bg-white mb-4 shadow-sm"
    >
      <div
        className="flex items-center justify-between mb-2"
      >
        <input
          className="text-lg font-bold w-full mr-2 bg-transparent outline-none"
          value={section.title}
          onChange={(e) => onItemChange("title", e.target.value)}
        />
        <span {...listeners} className="cursor-move px-2 text-gray-500">
          ☰
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-gray-500 ml-2"
        >
          {collapsed ? "🔽 Show Section" : "🔼 Hide Section"}
        </button>
      </div>

      {!collapsed && (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={section.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {section.items.map((item, idx) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  idx={idx}
                  onChange={(field, value) =>
                    onItemChange("edit", { index: idx, field, value })
                  }
                  onRemove={() => onItemChange("remove", { index: idx })}
                />
              ))}
            </SortableContext>
          </DndContext>

          <button
            onClick={() => onItemChange("add")}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            ➕ Add Item
          </button>
        </>
      )}
    </div>
  );
}

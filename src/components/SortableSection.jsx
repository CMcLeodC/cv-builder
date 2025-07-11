import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export function SortableSection({ section, onItemChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border p-3 rounded bg-white mb-4 shadow-sm cursor-move"
    >
      <div className="flex items-center justify-between mb-2">
        <h3
          className="font-bold cursor-move"
          {...listeners} // Only here!
        >
          {section.title}
        </h3>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-gray-500"
        >
          {collapsed ? "🔽 Show Section" : "🔼 Hide Section"}
        </button>
      </div>

      {!collapsed && (
        <>
          {section.items.map((item, idx) => (
            <div key={idx} className="space-y-2 border p-2 rounded mb-4">
              {item.role !== undefined && (
                <>
                  <input
                    className="w-full p-1 border rounded"
                    placeholder="Role"
                    value={item.role}
                    onChange={(e) => onItemChange(idx, "role", e.target.value)}
                  />
                  <input
                    className="w-full p-1 border rounded"
                    placeholder="Company"
                    value={item.company}
                    onChange={(e) => onItemChange(idx, "company", e.target.value)}
                  />
                </>
              )}

              {item.degree !== undefined && (
                <>
                  <input
                    className="w-full p-1 border rounded"
                    placeholder="Degree"
                    value={item.degree}
                    onChange={(e) => onItemChange(idx, "degree", e.target.value)}
                  />
                  <input
                    className="w-full p-1 border rounded"
                    placeholder="Institution"
                    value={item.institution}
                    onChange={(e) => onItemChange(idx, "institution", e.target.value)}
                  />
                </>
              )}

              <input
                className="w-full p-1 border rounded"
                placeholder="Date"
                value={item.date}
                onChange={(e) => onItemChange(idx, "date", e.target.value)}
              />

              {item.description !== undefined && (
                <textarea
                  className="w-full p-1 border rounded"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => onItemChange(idx, "description", e.target.value)}
                />
              )}

              <button
                onClick={() => onItemChange(idx, "removeItem", null)}
                className="text-xs text-red-500 mt-1 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => onItemChange(null, "addItem", null)}
            className="text-sm text-blue-600 hover:underline"
          >
            ➕ Add Item
          </button>
        </>
      )}
    </div>
  );
}

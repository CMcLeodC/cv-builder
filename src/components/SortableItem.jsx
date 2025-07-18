// components/SortableItem.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ item, idx, onChange, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="space-y-2 border p-2 rounded mb-4 bg-gray-50">
      <div className="flex justify-between">
        <span {...listeners} className="text-xs cursor-move text-gray-500">☰</span>
        <button onClick={onRemove} className="text-xs text-red-500 hover:underline">Remove</button>
      </div>

      {item.role !== undefined && (
        <>
          <input
            className="w-full p-1 border rounded"
            placeholder="Role"
            value={item.role}
            onChange={(e) => onChange("role", e.target.value)}
          />
          <input
            className="w-full p-1 border rounded"
            placeholder="Company"
            value={item.company}
            onChange={(e) => onChange("company", e.target.value)}
          />
        </>
      )}

      {item.degree !== undefined && (
        <>
          <input
            className="w-full p-1 border rounded"
            placeholder="Degree"
            value={item.degree}
            onChange={(e) => onChange("degree", e.target.value)}
          />
          <input
            className="w-full p-1 border rounded"
            placeholder="Institution"
            value={item.institution}
            onChange={(e) => onChange("institution", e.target.value)}
          />
        </>
      )}

      <input
        className="w-full p-1 border rounded"
        placeholder="Date"
        value={item.date}
        onChange={(e) => onChange("date", e.target.value)}
      />

      {item.description !== undefined && (
        <>
          <textarea
            className="w-full p-1 border rounded"
            placeholder="Description"
            value={item.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
          <small className="text-xs text-gray-500">
            Tip: Use line breaks to create bullet points
          </small>
        </>
      )}
    </div>
  );
}

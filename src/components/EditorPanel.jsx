import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSection } from "./SortableSection";


function EditorPanel({ cvData, setCVData }) {
  const handleChange = (field, value) => {
    setCVData(prev => ({ ...prev, [field]: value }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cvData.sections.findIndex(sec => sec.id === active.id);
    const newIndex = cvData.sections.findIndex(sec => sec.id === over.id);
    const reordered = arrayMove(cvData.sections, oldIndex, newIndex);

    setCVData(prev => ({ ...prev, sections: reordered }));
  };

  const onItemChange = (sectionIndex, itemIndex, field, value) => {
    console.log("onItemChange called", { sectionIndex, itemIndex, field, value });
    setCVData(prev => {
      const updated = prev.sections.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, items: [...section.items] }
          : section
      );

      if (field === "addItem") {
  const template = updated[sectionIndex].items[0] || {};
  const emptyItem = Object.fromEntries(Object.keys(template).map(k => [k, ""]));
  updated[sectionIndex].items.push(emptyItem);
} else if (field === "removeItem") {
  updated[sectionIndex].items.splice(itemIndex, 1);
} else if (field === "title") {
  updated[sectionIndex].title = value;
} else {
  updated[sectionIndex].items[itemIndex][field] = value;
}



      return { ...prev, sections: updated };
    });
  };

  return (
    <div className="space-y-6">
      {/* Name, Title, Summary */}
      <div>
        <label className="block font-semibold">Full Name</label>
        <input
          className="w-full p-2 border rounded"
          value={cvData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold">Job Title</label>
        <input
          className="w-full p-2 border rounded"
          value={cvData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold">Summary</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={cvData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </div>

      {/* Draggable Sections */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={cvData.sections.map(sec => sec.id)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.sections.map((section, i) => (
            <SortableSection
              key={section.id}
              section={section}
              onItemChange={(itemIndex, field, value) =>
                onItemChange(i, itemIndex, field, value)
              }
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={() => {
          const newSection = {
            id: crypto.randomUUID(),
            title: "New Section",
            items: [
              {
                role: "",
                company: "",
                date: "",
                description: "",
              },
            ],
          };
          setCVData(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
        }}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➕ Add Section
      </button>

    </div>
  );
}

export default EditorPanel;

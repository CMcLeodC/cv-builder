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
              index={i}
              onItemChange={(itemIndex, field, value) => {
                const updated = [...cvData.sections];
                updated[i].items[itemIndex][field] = value;
                setCVData({ ...cvData, sections: updated });
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default EditorPanel;

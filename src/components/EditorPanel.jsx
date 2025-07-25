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

  const newSectionId = `section-${crypto.randomUUID()}`;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const [activeType, activeId] = active.id.split("-");
    const [overType, overId] = over.id.split("-");

    if (activeType === "section" && overType === "section") {
      const oldIndex = cvData.sections.findIndex(s => s.id === active.id);
      const newIndex = cvData.sections.findIndex(s => s.id === over.id);
      const reordered = arrayMove(cvData.sections, oldIndex, newIndex);
      setCVData(prev => ({ ...prev, sections: reordered }));
    }

    if (activeType === "item" && overType === "item") {
      // Loop through sections to find which contains the item
      const sectionIndex = cvData.sections.findIndex(s =>
        s.items.some(i => i.id === active.id)
      );
      const section = cvData.sections[sectionIndex];
      const oldIndex = section.items.findIndex(i => i.id === active.id);
      const newIndex = section.items.findIndex(i => i.id === over.id);

      const reorderedItems = arrayMove(section.items, oldIndex, newIndex);

      const updatedSections = [...cvData.sections];
      updatedSections[sectionIndex] = { ...section, items: reorderedItems };
      setCVData(prev => ({ ...prev, sections: updatedSections }));
    }
  };



  const onItemChange = (sectionIndex, action, payload) => {
    setCVData(prev => {
      const updated = [...prev.sections];
      const section = { ...updated[sectionIndex] };

      if (action === "title") {
        section.title = payload;
      } else if (action === "edit") {
        section.items[payload.index][payload.field] = payload.value;
      } else if (action === "remove") {
        section.items.splice(payload.index, 1);
      } else if (action === "add") {
        const template = section.items[0] || {};
        const emptyItem = {
          ...Object.fromEntries(Object.keys(template).map(k => [k, ""])),
          id: `item-${crypto.randomUUID()}`,
        };
        section.items.push(emptyItem);
      } else if (action === "reorder") {
        section.items = payload;
      }

      updated[sectionIndex] = section;
      return { ...prev, sections: updated };
    });
  };


  return (
    <div className="space-y-6">
      <div className="space-y-2 mt-4">
        <h3 className="font-semibold">Font Sizes</h3>

        <label className="block">Name Font Size</label>
        <select
          value={cvData.styles.nameFontSize}
          onChange={(e) =>
            setCVData(prev => ({
              ...prev,
              styles: { ...prev.styles, nameFontSize: e.target.value },
            }))
          }
          className="border rounded p-1"
        >
          <option value="text-2xl">2xl</option>
          <option value="text-3xl">3xl</option>
          <option value="text-4xl">4xl</option>
        </select>

        <label className="block">Section Title Font Size</label>
        <select
          value={cvData.styles.sectionTitleFontSize}
          onChange={(e) =>
            setCVData(prev => ({
              ...prev,
              styles: { ...prev.styles, sectionTitleFontSize: e.target.value },
            }))
          }
          className="border rounded p-1"
        >
          <option value="text-base">Base</option>
          <option value="text-lg">Large</option>
          <option value="text-xl">XL</option>
        </select>

        {/* Add similar controls for titleFontSize, roleFontSize, bodyFontSize if you want */}
        <label className="block">Font Family</label>
        <select
          value={cvData.styles.fontFamily}
          onChange={(e) =>
            setCVData(prev => ({
              ...prev,
              styles: { ...prev.styles, fontFamily: e.target.value },
            }))
          }
          className="border rounded p-1"
        >
          <option value="font-sans">Sans</option>
          <option value="font-serif">Serif</option>
          <option value="font-mono">Mono</option>
        </select>

        <label className="block mt-2">Body Font Size</label>
        <select
          value={cvData.styles.bodyFontSize}
          onChange={(e) =>
            setCVData(prev => ({
              ...prev,
              styles: { ...prev.styles, bodyFontSize: e.target.value },
            }))
          }
          className="border rounded p-1"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Base</option>
          <option value="text-lg">Large</option>
        </select>

      </div>
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
        <label className="block font-semibold">Email</label>
        <input
          className="w-full p-2 border rounded"
          value={cvData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold">Phone</label>
        <input
          className="w-full p-2 border rounded"
          value={cvData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold">Location</label>
        <input
          className="w-full p-2 border rounded"
          value={cvData.location}
          onChange={(e) => handleChange('location', e.target.value)}
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
              // sectionIndex={i}
              // onSectionDragEnd={handleDragEnd}
              onItemChange={(action, payload) => onItemChange(i, action, payload)}
            />
          ))}
        </SortableContext>

      </DndContext>
      <button
        onClick={() => {
          const newSection = {
            id: newSectionId,
            title: "New Section",
            items: [
              {
                id: `item-${crypto.randomUUID()}`,
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

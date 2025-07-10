function ResumePreview({ cvData }) {
  return (
    <div className="p-4 border shadow-sm max-w-[800px] mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{cvData.name}</h1>
        <h2 className="text-xl text-gray-600">{cvData.title}</h2>
        <p className="mt-4">{cvData.summary}</p>
      </header>

      {cvData.sections.map(section => (
        <div key={section.id}>
          <h3 className="text-lg font-semibold border-b mb-2">{section.title}</h3>
          {section.items.map((item, index) => (
            <div key={index} className="mb-2">
              {item.role && <p className="font-medium">{item.role} @ {item.company}</p>}
              {item.degree && <p className="font-medium">{item.degree}, {item.institution}</p>}
              <p className="text-sm italic text-gray-600">{item.date}</p>
              {item.description && <p>{item.description}</p>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResumePreview;

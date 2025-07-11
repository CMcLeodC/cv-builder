function ModernTemplate({ cvData }) {
  return (
    <div className="font-sans space-y-4 text-gray-800">
      <h1 className="text-3xl font-bold">{cvData.name}</h1>
      <h2 className="text-xl text-gray-500">{cvData.title}</h2>
      <p className="mt-2">{cvData.summary}</p>

      {cvData.sections.map(section => (
        <div key={section.id}>
          <h3 className="text-lg font-semibold border-b border-gray-300">{section.title}</h3>
          {section.items.map((item, i) => (
            <div key={i} className="mb-2">
              {item.role && <p className="font-medium">{item.role} @ {item.company}</p>}
              {item.degree && <p>{item.degree}, {item.institution}</p>}
              <p className="text-sm text-gray-600 italic">{item.date}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ModernTemplate;

function ClassicTemplate({ cvData }) {
  return (
    <div className="font-serif text-black space-y-5">
      <h1 className="text-4xl font-extrabold">{cvData.name}</h1>
      <h2 className="text-xl">{cvData.title}</h2>
      <hr />
      <p>{cvData.summary}</p>

      {cvData.sections.map(section => (
        <div key={section.id}>
          <h3 className="text-xl font-bold underline">{section.title}</h3>
          {section.items.map((item, i) => (
            <div key={i} className="mb-2">
              {item.role && <p><strong>{item.role}</strong> at {item.company}</p>}
              {item.degree && <p>{item.degree}, {item.institution}</p>}
              <p><em>{item.date}</em></p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ClassicTemplate;

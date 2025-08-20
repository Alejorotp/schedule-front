interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface Content {
  title: string;
  nrc: number;
  desc: string;
  cred: number;
  dept: string;
  sch?: Schedule[]; // <-- opcional
}

function Card({ title, nrc, desc, cred, dept, sch = [] }: Content) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {title + " - " + nrc}
      </h3>
      <ul className="text-slate-900 gap-4">
        <li>
          <p className="text-sm text-gray-800 leading-relaxed">{desc}</p>
        </li>
        <li className="mt-5">{"Créditos: " + cred}</li>
        <li>{"Departamento: " + dept}</li>
      </ul>

      {sch.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-1">Horarios:</h4>
          <div className="flex flex-wrap gap-2">
            {sch.map((schx, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {schx.day} - {schx.startTime} : {schx.endTime}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

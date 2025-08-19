interface content{
    title: string;
    nrc: number;
    desc: string;
    cred: number;
    dept: string;

}


function Card({ title, nrc, desc, cred, dept }: content) {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {title+" - "+nrc}
        </h3>
        <ul className="text-slate-900 gap-4">
            <li>
                <h1 className="text-sm text-gray-800 leading-relaxed">{desc}</h1>
            </li>
            <li className="mt-5">
                {"Créditos: " +cred}
            </li>
            <li>
                {"Departamento: " +dept}
            </li>
        </ul>


      </div>
    </>
  );
}

export default Card;

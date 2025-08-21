import Card from "./card";

interface CardProps {
  nrc?: number;
  dept: string;
  cred: number;
  title: string;
  desc: string;
  tch?: string;
  sch?: [];
  room?: string;
  selected: boolean;
  onToggle: (id: string, nrc: number) => void;
}

const SelectableCard: React.FC<CardProps> = ({ nrc, title, desc, cred, dept, tch, sch, room, selected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(title, nrc? nrc : 0)}
      className={`cursor-pointer border rounded-xl transition 
        ${selected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white"}
      `}
    >
      <Card title ={title} nrc={nrc? nrc : 0} desc={desc} cred={cred} dept={dept} tch={tch} sch={sch} room={room}></Card>
    </div>
  );
};

export default SelectableCard

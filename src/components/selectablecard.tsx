import Card from "./card";

interface CardProps {
  nrc: number;
  dept: string;
  cred: number;
  title: string;
  desc: string;
  selected: boolean;
  onToggle: (id: number) => void;
}

const SelectableCard: React.FC<CardProps> = ({ nrc, title, desc, cred, dept, selected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(nrc)}
      className={`cursor-pointer border rounded-xl transition 
        ${selected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white"}
      `}
    >
      <Card title ={title} nrc={nrc} desc={desc} cred={cred} dept={dept}></Card>
    </div>
  );
};

export default SelectableCard

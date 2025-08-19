import Card from "./card";
import { useState } from "react";
import Button from "./button";
import Modal from "./modal";
function Dashboard() {
  const [Content, setContent] = useState([
    { cardTitle: "Card1"},
    { cardTitle: "card2" },
  ]);
  const [Templates, setTemplates] = useState([{cardTitle:"Template"},{cardTitle:"Template"},{cardTitle:"Template"}])
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 flex-1">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Plantillas</h2>
        <div className="grid grid-cols-3 gap-4">
          {Templates.map((card)=>(
            <Card title={card.cardTitle}></Card>
          ))}
        </div>
      </Modal>
      <h1 className="text-2xl font-bold mb-4">Panel principal</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {Content.map((card) => (
          <Card title={card.cardTitle} />
        ))}
      </div>
      <Button
        onAction={() => setIsModalOpen(true)}
        label={"Crear Clases"}
      ></Button>
    </div>
  );
}

export default Dashboard;

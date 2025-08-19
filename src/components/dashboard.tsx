import Card from "./card";
import { useState } from "react";
import Button from "./button";
import Modal from "./modal";
import SelectableCard from "./selectablecard";


function Dashboard() {
  const [Content, setContent] = useState([
    {
      cardTitle: "Card1",
      nrc: 2105,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
    },
    {
      cardTitle: "card2",
      nrc: 2105,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
    },
  ]);
  const [Templates, setTemplates] = useState([
    {
      cardTitle: "Template",
      nrc: 2105,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
    },
    {
      cardTitle: "Template",
      nrc: 2195,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const toggleCard = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="p-6 flex-1">
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStep(1);
        }}
      >
        {step == 1 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Plantillas</h2>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {Templates.map((card) => (
                  <SelectableCard
                    title={card.cardTitle}
                    nrc={card.nrc}
                    cred={card.cred}
                    desc={card.desc}
                    dept={card.dept}
                    onToggle={toggleCard}
                    selected={selectedId == card.nrc}
                  />
                ))}
              </div>
            <Button
              onAction={() => {
                setStep(2);
              }}
              label="siguiente paso"
            ></Button>
          </div>
        )}

        {step == 2 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Edite su plantilla</h2>
          </div>
          
        )}
      </Modal>
      <h1 className="text-2xl font-bold mb-4">Panel principal</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {Content.map((card) => (
          <Card
            title={card.cardTitle}
            nrc={card.nrc}
            cred={card.cred}
            desc={card.desc}
            dept={card.dept}
          />
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

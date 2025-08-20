import Card from "./card";
import { useState } from "react";
import Button from "./button";
import Modal from "./modal";
import SelectableCard from "./selectablecard";
import SchedulePicker from "./schedulepicker";

type CardType = {
  cardTitle: string;
  nrc: number;
  desc: string;
  cred: number;
  dept: string;
  sch: Schedule[];
};

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}


function Dashboard() {
  const [Content, setContent] = useState<CardType[]>([
    {
      cardTitle: "Card1",
      nrc: 2105,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
      sch: [],
    },
    {
      cardTitle: "card2",
      nrc: 2105,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
      sch: [],
    },
  ]);
  const [Templates, setTemplates] = useState<CardType[]>([
    {
      cardTitle: "Template",
      nrc: 2105,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
      sch: [],
    },
    {
      cardTitle: "Template",
      nrc: 2195,
      desc: "descripcion descriptiva",
      cred: 45,
      dept: "crazy",
      sch: [],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<CardType>();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleSchedule = (e: Schedule[]) =>{
    setSchedules(e)
    setSelectedCard((prev) => ({
      cardTitle: prev?.cardTitle ?? "",
      nrc: prev?.nrc ?? 0,
      desc: prev?.desc ?? '',
      cred: prev?.cred ?? 0,
      dept: prev?.dept ?? '',
      sch: e,
    }));
    
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSelectedCard((prev) => ({
      cardTitle: name === "cardTitle" ? value : prev?.cardTitle ?? "",
      nrc: name === "nrc" ? Number(value) : prev?.nrc ?? 0,
      desc: name === "desc" ? value : prev?.desc ?? "",
      cred: name === "cred" ? Number(value) : prev?.cred ?? 0,
      dept: name === "dept" ? value : prev?.dept ?? "",
      sch: prev?.sch ?? [],
    }));
  };

  const onConfirm = (e: number) => {
    if (e == 1) {
      selectedCard ? setTemplates([...Templates, selectedCard]) : "";
    } else if (e == 2) {
      selectedCard ? setContent([...Content, selectedCard]) : "";
      selectedCard ? setTemplates([...Templates, selectedCard]) : "";
    }
  };

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
                for (const card of Templates) {
                  if (card.nrc == selectedId) {
                    setSelectedCard(card);
                    break;
                  }
                }
              }}
              label="siguiente paso"
            ></Button>
          </div>
        )}

        {step == 2 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Editar plantilla</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Título</label>
                <input
                  type="text"
                  name="cardTitle"
                  value={selectedCard?.cardTitle ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Descripción
                </label>
                <textarea
                  name="desc"
                  value={selectedCard?.desc ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">NRC</label>
                <textarea
                  name="nrc"
                  value={selectedCard?.nrc ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Creditos</label>
                <textarea
                  name="cred"
                  value={selectedCard?.cred ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <h1 className="text-xl font-bold mb-4">
                Selecciona tus horarios
              </h1>
              <SchedulePicker schedules={schedules} onChange={handleSchedule} />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        )}

        {step == 3 && (
          <>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Verifique la información
              </h2>
              <Card
                title={selectedCard?.cardTitle ?? ""}
                nrc={selectedCard?.nrc ?? 0}
                cred={selectedCard?.cred ?? 0}
                desc={selectedCard?.desc ?? ""}
                dept={selectedCard?.dept ?? ""}
                sch={selectedCard?.sch}
              />
              <div className="grid grid-cols-3 gap-4 mt-5">
                <Button
                  label="Crear plantilla"
                  onAction={() => {
                    onConfirm(1);
                    setStep(1);
                    setIsModalOpen(false);
                  }}
                />
                <Button
                  label="Crear clase"
                  onAction={() => {
                    onConfirm(2);
                    setStep(1);
                    setIsModalOpen(false);
                  }}
                />
                <Button label="Corregir" onAction={() => setStep(2)} />
              </div>
            </div>
          </>
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
            sch ={card.sch}
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

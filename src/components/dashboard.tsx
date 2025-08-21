import Card from "./card";
import { useState, useEffect, useCallback } from "react";
import Button from "./button";
import Modal from "./modal";
import SelectableCard from "./selectablecard";
import SchedulePicker from "./schedulepicker";
import useApi from "../useApi";

type Curso = {
  cardTitle: string;
  nrc?: number;
  desc: string;
  cred: number;
  dept: string;
  sch?: Schedule[];
  tch?: string;
  room?: string;
  id_asign?: number;
  id?: number;
};

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

function Dashboard() {
  const [Content, setContent] = useState<Curso[]>([]);
  const [Templates, setTemplates] = useState<Curso[]>([]);
  const { getCurso, getAsignatura, postAsignatura, postCurso, patchCurso } =
    useApi();

  const fetchData = useCallback(async () => {
    try {
      const cursos = await getCurso();
      setContent(cursos);

      const asignaturas = await getAsignatura();
      setTemplates(asignaturas);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }, []); // 👈 no depende de nada → estable

  useEffect(() => {
    user ? setTeacher(user) : "";
    console.log("usefe");
    fetchData();
  }, [fetchData]);

  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");
  const [teacher, setTeacher] = useState("Usuario autenticado");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<Curso>();
  const [id_asign, setIdAsign] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setSelectedCard((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "nrc" || name === "cred" ? Number(value) : value,
            tch: teacher,
          }
        : undefined
    );
  };

  const onConfirm = (e: number) => {
    if (e == 1) {
      if (selectedCard) {
        setTemplates([...Templates, selectedCard]);
        postAsignatura(selectedCard);
      }
    } else if (e == 2) {
      if (selectedCard) {
        setContent([...Content, selectedCard]);
        postCurso(selectedCard, "2025-30", id_asign);
      }
    } else if (e == 3) {
      if (selectedCard) {
        patchCurso(
          selectedCard.id ?? 0,
          selectedCard,
          "2025-30",
          selectedCard?.id_asign ?? 0
        );
      }
    }
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const toggleCard = (id: string, nrc: number) => {
    setSelectedId(id);
    setIdAsign(nrc);
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
                  nrc={card.nrc ?? 0}
                  cred={card.cred}
                  desc={card.desc}
                  dept={card.dept}
                  onToggle={toggleCard}
                  selected={selectedId == card.cardTitle}
                />
              ))}
            </div>
            <Button
              onAction={() => {
                setStep(2);
                for (const card of Templates) {
                  if (card.cardTitle == selectedId) {
                    setSelectedCard(card);
                    break;
                  }
                }
              }}
              label="siguiente paso"
            ></Button>
          </div>
        )}

        {step == 4 && (
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
                  selected={selectedId == card.cardTitle}
                />
              ))}
            </div>
            <Button
              onAction={() => {
                setStep(5);
                for (const card of Templates) {
                  if (card.cardTitle == selectedId) {
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
                <label>{selectedCard?.cardTitle ?? ""}</label>
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
                <label className="block text-sm font-semibold">Salón</label>
                <textarea
                  name="room"
                  value={selectedCard?.room ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <h1 className="text-xl font-bold mb-4">
                Selecciona tus horarios
              </h1>
              <SchedulePicker
                schedules={selectedCard?.sch ?? []}
                onChange={(newSchedules) =>
                  setSelectedCard((prev) =>
                    prev ? { ...prev, sch: newSchedules } : prev
                  )
                }
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        )}

        {step == 7 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Editar plantilla</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Título</label>
                <label>{selectedCard?.cardTitle ?? ""}</label>
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
                <label className="block text-sm font-semibold">Salón</label>
                <textarea
                  name="room"
                  value={selectedCard?.room ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <h1 className="text-xl font-bold mb-4">
                Selecciona tus horarios
              </h1>
              <SchedulePicker
                schedules={selectedCard?.sch ?? []}
                onChange={(newSchedules) =>
                  setSelectedCard((prev) =>
                    prev ? { ...prev, sch: newSchedules } : prev
                  )
                }
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  onClick={() => {
                    onConfirm(3);
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        )}

        {step == 5 && (
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
                <label className="block text-sm font-semibold">Creditos</label>
                <textarea
                  name="cred"
                  value={selectedCard?.cred ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  onClick={() => setStep(6)}
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
                tch={selectedCard?.tch}
                room={selectedCard?.room}
              />
              <div className="grid grid-cols-3 gap-4 mt-5">
                <Button
                  label="Crear curso"
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

        {step == 6 && (
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
                room={selectedCard?.room}
                tch={selectedCard?.tch}
              />
              <div className="grid grid-cols-3 gap-4 mt-5">
                <Button
                  label="Crear asignatura"
                  onAction={() => {
                    onConfirm(1);
                    setStep(1);
                    setIsModalOpen(false);
                  }}
                />
                <Button label="Corregir" onAction={() => setStep(5)} />
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
            nrc={card.nrc ?? 0}
            cred={card.cred}
            desc={card.desc}
            dept={card.dept}
            sch={card.sch}
            tch={card.tch}
            room={card.room}
          >
            <Button
              label="Editar"
              onAction={() => {
                setStep(7);
                setIsModalOpen(true);
                setSelectedCard(card);
              }}
            ></Button>
          </Card>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          onAction={() => {
            setIsModalOpen(true);
            setStep(1);
            fetchData();
          }}
          label={"Crear Curso"}
        ></Button>
        <Button
          onAction={() => {
            setIsModalOpen(true);
            setStep(4);
            fetchData();
          }}
          label={"Crear Asignaturas"}
        ></Button>
      </div>
    </div>
  );
}

export default Dashboard;

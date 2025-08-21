interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface SchedulePickerProps {
  schedules: Schedule[];
  onChange: (schedules: Schedule[]) => void;
}

const SchedulePicker: React.FC<SchedulePickerProps> = ({ schedules, onChange }) => {
  const handleChange = (index: number, field: keyof Schedule, value: string) => {
    const updated = [...schedules];
    updated[index][field] = value;
    onChange(updated); // 🚀 notifica inmediatamente al padre
  };

  const addSchedule = () => {
    onChange([...schedules, { day: "", startTime: "", endTime: "" }]);
  };

  const removeSchedule = (index: number) => {
    onChange(schedules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {schedules.map((schedule, index) => (
        <div key={index} className="flex items-center space-x-2">
          {/* Día */}
          <select
            value={schedule.day}
            onChange={(e) => handleChange(index, "day", e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Día</option>
            <option value="lun">Lun</option>
            <option value="mar">Mar</option>
            <option value="mie">Mié</option>
            <option value="jue">Jue</option>
            <option value="vie">Vie</option>
            <option value="sab">Sáb</option>
            <option value="dom">Dom</option>
          </select>

          {/* Hora inicio */}
          <input
            type="text"
            placeholder="Inicio"
            value={schedule.startTime}
            onChange={(e) => handleChange(index, "startTime", e.target.value)}
            className="border rounded p-2 w-24"
          />

          <span>-</span>

          {/* Hora fin */}
          <input
            type="text"
            placeholder="Fin"
            value={schedule.endTime}
            onChange={(e) => handleChange(index, "endTime", e.target.value)}
            className="border rounded p-2 w-24"
          />

          {/* Botón eliminar */}
          <button
            type="button"
            onClick={() => removeSchedule(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            X
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSchedule}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Añadir horario
      </button>
    </div>
  );
};

export default SchedulePicker

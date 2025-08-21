import { useCallback } from "react";

type Curso = {
  cardTitle: string;
  nrc?: number;
  desc: string;
  cred: number;
  dept: string;
  sch?: Schedule[];
  tch?: string;
  room?: string;
};

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

// --- Fetch de Asignaturas ---
const useApi = () => {
  const getAsignatura = useCallback(async (): Promise<Curso[]> => {
    const res = await fetch(
      "https://schedule-back-production.up.railway.app/asignaturas"
    );
    if (!res.ok) throw new Error("Error al obtener asignaturas");
    const data = await res.json();
    return data.map((a: any) => ({
      cardTitle: a.nombre,
      nrc: a.id, // API no lo trae
      desc: a.descripcion,
      cred: a.creditos,
      dept: a.departamento,
    }));
  }, []);

  // --- Fetch de Cursos ---
  const getCurso = useCallback(async (): Promise<Curso[]> => {
    const res = await fetch(
      "https://schedule-back-production.up.railway.app/cursos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Error al obtener cursos");

    const data = await res.json();

    return data.map((c: any) => ({
      cardTitle: c.asignatura.nombre,
      nrc: Number(c.nrc),
      desc: c.asignatura.descripcion,
      cred: c.asignatura.creditos,
      dept: c.asignatura.departamento,
      tch: c.profesor,
      room: c.salon,
      id: c.id,
      id_asign: c.asignatura.id,
      sch: c.horarios.map((h: any) => ({
        day: h.day,
        startTime: h.hora_de_inicio,
        endTime: h.hora_final,
      })),
    }));
  }, []);

  const patchCurso = useCallback(
    async (id: number, curso: Curso, periodo: string, id_asign: number) => {
        console.log("Patching curso with ID:", id);
        console.log("Curso data:", curso);
        console.log("Periodo:", periodo);
        console.log("Asignatura ID:", id_asign);
      const body = {
        nrc: curso.nrc?.toString() ?? "",
        periodo,
        profesor: curso.tch ?? "",
        salon: curso.room ?? "",
        asignatura_id: id_asign ?? 0,
        horarios:
          curso.sch?.map((s) => ({
            day: s.day,
            hora_de_inicio: s.startTime,
            hora_final: s.endTime,
          })) ?? [],
      };

      const res = await fetch(
        `https://schedule-back-production.up.railway.app/cursos/${id}`, // 👈 ID va en la URL
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        throw new Error("Error al actualizar curso");
      }

      return await res.json();
    },
    []
  );

  // --- Post de Asignatura ---
  const postAsignatura = useCallback(async (curso: Curso) => {
    const body = {
      nombre: curso.cardTitle,
      descripcion: curso.desc,
      creditos: curso.cred,
      departamento: curso.dept,
    };

    const res = await fetch(
      "https://schedule-back-production.up.railway.app/asignaturas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Error al crear asignatura");
    }

    return await res.json();
  }, []);

  // --- Post de Curso ---
  const postCurso = useCallback(
    async (curso: Curso, periodo: string, id_asign: number) => {
      console.log(id_asign);
      const body = {
        nrc: curso.nrc?.toString() ?? "",
        periodo,
        profesor: curso.tch ?? "",
        salon: curso.room ?? "",
        asignatura_id: id_asign ?? 0,
        horarios:
          curso.sch?.map((s) => ({
            day: s.day,
            hora_de_inicio: s.startTime,
            hora_final: s.endTime,
          })) ?? [],
      };

      const res = await fetch(
        "https://schedule-back-production.up.railway.app/cursos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        throw new Error("Error al crear curso");
      }

      return await res.json();
    },
    []
  );

  return { getCurso, getAsignatura, postCurso, postAsignatura, patchCurso};
};

export default useApi;

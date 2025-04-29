"use client"
import { useState, useEffect } from "react"
import CompetitorRegister from "@/components/competitorRegister"
import GuardianRegister from "@/components/guardientRegister"
import Modal from "@/components/modal/modal"
import { usePostIncriptionCompetitorMutation } from "@/app/redux/services/register"
import { usePostIncriptionGuardianMutation } from "@/app/redux/services/guardiansApi"
import { useGetOlympicsQuery } from "@/app/redux/services/olympicsApi"
import { useSelector, useDispatch } from "react-redux"
import { format } from "date-fns"
import Title from "@/common/title"
import OlympicsList from "@/components/olympicList"

const Incription = () => {
  const [step, setStep] = useState(1)
  const [competitorData, setCompetitorData] = useState({})
  const [guardiansData, setGuardiansData] = useState([]);
  const [guardianDataReverse, setGuardianDataReverse] = useState({})
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" })
  const [animationDirection, setAnimationDirection] = useState("forward")

  const { guardian } = useSelector((state) => state.guardian)
  const dispatch = useDispatch()
  const [postIncriptionGuardian] = usePostIncriptionGuardianMutation()
  const [postIncriptionCompetitor] = usePostIncriptionCompetitorMutation()

//   useEffect(() => {
//     console.log("Cambios en guardian:", guardian)
//   }, [guardian])

const handleGuardianSubmit = async (data) => {
    setAnimationDirection("forward");
    
    // Manejar tutores seleccionados
    if (data.selectedGuardians && data.selectedGuardians.length > 0) {
      const selectedGuardians = data.selectedGuardians;
      setGuardiansData(selectedGuardians); // Guardar todos los tutores seleccionados
      setStep(2);
      return;
    }
  
    // Crear nuevo tutor
    try {
      const guardianPayload = {
        name: data.nombres || "",
        last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`.trim(),
        email: data.email || "",
        phone: data.celular || "",
        type: data.tipo || "Padre",
        ci: data.ci || "",
      };
  
      const createGuardianResponse = await postIncriptionGuardian(guardianPayload).unwrap();
      
      // Agregar el nuevo tutor a la lista de guardiansData
      setGuardiansData([createGuardianResponse]); 
      
      console.log("Tutor creado:", createGuardianResponse);
      setStep(2);
    } catch (error) {
      console.error("Error creando tutor:", error);
      setModal({
        isOpen: true,
        title: "Error en registro",
        message: error.data?.message || "Error al crear tutor",
        type: "error"
      });
    }
  };
  
  const handleCompetitorSubmit = async (data) => {
    try {
      // Obtener IDs de guardians
      const guardianIds = guardiansData.map(g => g.id);
      const areaLevelGradeIds = data.area_level_grades.map(g => g.id);
      console.log("IDs de tutores:", guardianIds);
      
      const competitorPayload = {
        name: data.nombres,
        last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`,
        ci: String(data.cedula),
        birthday: format(new Date(data.fechaNacimiento), "yyyy-MM-dd"),
        phone: "78952345", // Esto deberías obtenerlo del formulario
        email: data.email,
        school_id: 2,     // Esto deberías obtenerlo del formulario
        curso: data.curso,
        guardian_ids: guardianIds, // Usar los IDs de los tutores
        olympic_id: 1,
        area_level_grade_ids: areaLevelGradeIds,
      };
  
      console.log("Datos a registrar del competidor:", competitorPayload);
      console.log("Tutores asociados:", guardiansData);
  
      setModal({
        isOpen: true,
        title: "Registro exitoso",
        message: "El registro se completó correctamente.",
        type: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      setModal({
        isOpen: true,
        title: "Error en el registro",
        message: error.data?.message || "Ocurrió un error durante el registro.",
        type: "error",
      });
    }
  };

  const handleBack = () => {
    setAnimationDirection("backward")
    setStep(1)
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  return (
    <>
    <OlympicsList />
    <div className="min-h-screen max-w-[1400px] mx-auto lg:px-16">
      <Title
        title="Inscripción a las Olimpiadas"
        className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
      />

      <div className="relative overflow-hidden">
        <div
          className={`transition-all duration-700 ease-in-out ${
            step === 1
              ? "translate-x-0 opacity-100"
              : animationDirection === "backward"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
          } ${step !== 1 && "absolute top-0 left-0 w-full"}`}
        >
          <GuardianRegister onSubmit={handleGuardianSubmit} initialData={guardianDataReverse} />
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${
            step === 2
              ? "translate-x-0 opacity-100"
              : animationDirection === "forward"
                ? "translate-x-full opacity-0"
                : "translate-x-full opacity-0"
          } ${step !== 2 && "absolute top-0 left-0 w-full"}`}
        >
          <CompetitorRegister onSubmit={handleCompetitorSubmit} onBack={handleBack} initialData={competitorData} />
        </div>
      </div>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        iconType={modal.type}
        primaryButtonText="Cerrar"
        onPrimaryClick={closeModal}
      >
        <p>{modal.message}</p>
      </Modal>
    </div>
    </>
  )

}

export default Incription

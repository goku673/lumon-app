"use client"
import { useState } from "react"
import CompetitorRegister from "@/components/competitorRegister"
import GuardianRegister from "@/components/guardientRegister"
import Modal from "@/components/modal/modal"
import { usePostInscriptionCompetitorMutation } from "@/app/redux/services/competitorsApi"
import { usePostIncriptionGuardianMutation, useGetGuardiansQuery } from "@/app/redux/services/guardiansApi"
import { useSelector } from "react-redux"
import Title from "@/common/title"
import OlympicsList from "@/components/olympicList"
import CircularProgress from '@mui/material/CircularProgress'
import { useExcelProcessor } from "@/app/services/exel/ExcelProcessor"
import BatchProcessingUI from "@/app/services/exel/BatchProcessingUI"

const Incription = () => {
  const selectedOlympic = useSelector((state) => state.olympic.selectedOlympic);
  const [step, setStep] = useState(1);
  const { data: guardians, refetch: refetchGuardians } = useGetGuardiansQuery()
  const [competitorData, setCompetitorData] = useState({})
  const [guardiansData, setGuardiansData] = useState([]);
  const [guardianDataReverse, setGuardianDataReverse] = useState({})
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" })
  const [loadingModal, setLoadingModal] = useState({ isOpen: false, title: "Procesando", message: "Registrando competidor..." })
  const [animationDirection, setAnimationDirection] = useState("forward")
  const [postIncriptionGuardian] = usePostIncriptionGuardianMutation()
  const [postIncriptionCompetitor] = usePostInscriptionCompetitorMutation()
  const templateHeaders = ["nombre", "apellido", "ci", "fecha_nacimiento", "telefono", "email", "colegio_id", "curso", "tutor_ids", "olimpiada_id", "area_level_grade_ids"];
  const templateExample = ["Juan", "Pérez López", "12345678", "2005-10-12", "77123456", "juan@example.com", "361", "1ro de primaria", "1", selectedOlympic?.id || "4", "84"];

  const excelProcessor = useExcelProcessor({
    processRecord: async (record) => {
      const competitorPayload = {
        name: record.nombre,
        last_name: record.apellido,
        ci: record.ci,
        birthday: record.fecha_nacimiento,
        phone: record.telefono,
        email: record.email,
        school_id: parseInt(record.colegio_id) || "",
        curso: record.curso,
        guardian_ids: record.tutor_ids.toString().split(',').map(id => parseInt(id.trim())),
        olympic_id: parseInt(record.olimpiada_id) || selectedOlympic?.id,
        area_level_grade_ids: record.area_level_grade_ids.toString().split(',').map(id => parseInt(id.trim()))
      };
      
      const response = await postIncriptionCompetitor(competitorPayload).unwrap();
      return response;
    }
  });
  
  const handleProcessRecords = (records, callbacks) => {
    excelProcessor.processRecords(records);

    if (callbacks && callbacks.onProgress) {
      const progressInterval = setInterval(() => {
        if (excelProcessor.isProcessing) {
          callbacks.onProgress({
            current: excelProcessor.processedRecords,
            total: excelProcessor.totalRecords,
            percentage: excelProcessor.progress
          });
        } else {
          clearInterval(progressInterval);
          
          if (callbacks.onComplete) {
            callbacks.onComplete({
              total: excelProcessor.totalRecords,
              success: excelProcessor.successList.length,
              failed: excelProcessor.failedList.length,
              successList: excelProcessor.successList,
              failedList: excelProcessor.failedList
            });
          }
        }
      }, 500);
    }
  };
  
  const handleExportResults = () => {
    excelProcessor.exportResults("inscripciones_competidores");
  };

  const handleGuardianSubmit = async (data) => {
    try {
      if (data.selectedGuardians.length > 0 && 
          !(data.apellidoPaterno && data.apellidoMaterno && data.nombres && data.email && data.celular && data.comprobantePago && data.tipo)) {
        setGuardiansData(data.selectedGuardians)
        setStep(2)
        setAnimationDirection("forward")
        return
      }
      
      setLoadingModal(prev => ({ ...prev, isOpen: true }))
      const response = await postIncriptionGuardian(data).unwrap()
      setGuardiansData(prev => [...prev, response])
      setLoadingModal(prev => ({ ...prev, isOpen: false }))
      setModal({
        isOpen: true,
        title: "Tutor registrado",
        message: "El tutor ha sido registrado exitosamente",
        type: "success"
      })
      refetchGuardians()
      setStep(2)
      setAnimationDirection("forward")
    } catch (error) {
      setLoadingModal(prev => ({ ...prev, isOpen: false }))
      setModal({
        isOpen: true,
        title: "Error",
        message: error?.data?.message || "Ha ocurrido un error al registrar el tutor",
        type: "error"
      })
    }
  }
  
  const handleCompetitorSubmit = async (data) => {
    try {
      setLoadingModal(prev => ({ ...prev, isOpen: true }))
      const response = await postIncriptionCompetitor(data).unwrap()
      setLoadingModal(prev => ({ ...prev, isOpen: false }))
      setModal({
        isOpen: true,
        title: "Competidor registrado",
        message: "El competidor ha sido registrado exitosamente",
        type: "success"
      })
      setCompetitorData({})
      setGuardiansData([])
      setGuardianDataReverse({})
      setStep(1)
      setAnimationDirection("backward")
    } catch (error) {
      setLoadingModal(prev => ({ ...prev, isOpen: false }))
      setModal({
        isOpen: true,
        title: "Error",
        message: error?.data?.message || "Ha ocurrido un error al registrar el competidor",
        type: "error"
      })
    }
  }

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
        title={`Inscripción a las Olimpiadas ${selectedOlympic?.name ? `- ${selectedOlympic.name}` : ""}`}
        className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
      />

      <BatchProcessingUI
        title="Carga Masiva de Competidores"
        onProcessRecords={handleProcessRecords}
        onExportResults={handleExportResults}
        templateHeaders={templateHeaders}
        templateExample={templateExample}
        processor={excelProcessor}
        className="mb-8"
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
          <CompetitorRegister 
            onSubmit={handleCompetitorSubmit} 
            onBack={handleBack} 
            initialData={competitorData} 
            guardians={guardiansData} 
          />
        </div>
      </div>
      
      <Modal
        isOpen={loadingModal.isOpen}
        title={loadingModal.title}
        showCloseButton={false}
        showButtons={false}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <CircularProgress color="error" className="mb-4" />
          <p>{loadingModal.message}</p>
        </div>
      </Modal>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        iconType={modal.type}
        primaryButtonText="Ok"
        onPrimaryClick={closeModal}
      >
        <p>{modal.message}</p>
      </Modal>
    </div>
    </>
  )
}

export default Incription;
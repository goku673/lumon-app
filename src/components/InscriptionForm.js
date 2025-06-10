"use client";
import OlympicsList from "@/components/olympicList";
import Title from "@/common/title";
import BatchProcessingUI from "@/app/services/exel/BatchProcessingUI";
import GuardianRegister from "@/components/guardientRegister";
import CompetitorRegister from "@/components/competitorRegister";
import Modal from "@/components/modal/modal";
import CircularProgress from '@mui/material/CircularProgress';
// Componente principal del formulario de inscripción
export default function InscriptionForm({
  selectedOlympic,              // Objeto con la olimpiada seleccionada
  step,                         // Paso actual del formulario (1 o 2)
  animationDirection,           // Dirección de la animación (forward o backward)
  guardiansData,                // Lista de apoderados registrados
  guardianDataReverse,          // Datos iniciales para el formulario de apoderado
  competitorData,               // Datos iniciales para el formulario de competidor
  loadingModal,                 // Estado del modal de carga
  modal,                        // Estado del modal de resultado
  templateHeaders,              // Encabezados del template Excel
  templateExample,              // Ejemplo de datos para la carga masiva
  excelProcessor,               // Función para procesar datos del Excel
  handleProcessRecords,         // Función para procesar registros del Excel
  handleExportResults,          // Función para exportar resultados
  handleGuardianSubmit,         // Función para guardar datos del apoderado
  handleCompetitorSubmit,       // Función para guardar datos del competidor
  handleBack,                   // Función para regresar al paso anterior
  closeModal,                   // Función para cerrar modal 
  setStep,                      // Función para cambiar de paso    
  setAnimationDirection,        // Función para cambiar dirección de animación
}) {
  return (
    <>
      {/* Lista de olimpiadas disponibles */}
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
  );
}
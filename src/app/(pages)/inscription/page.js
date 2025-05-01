"use client"
import { useState, useEffect, useRef } from "react"
import CompetitorRegister from "@/components/competitorRegister"
import GuardianRegister from "@/components/guardientRegister"
import Modal from "@/components/modal/modal"
import { usePostInscriptionCompetitorMutation } from "@/app/redux/services/competitorsApi"
import { usePostIncriptionGuardianMutation, useGetGuardiansQuery } from "@/app/redux/services/guardiansApi"
import { useGetOlympicsQuery } from "@/app/redux/services/olympicsApi"
import { useSelector, useDispatch } from "react-redux"
import { format } from "date-fns"
import Title from "@/common/title"
import OlympicsList from "@/components/olympicList"
import CircularProgress from '@mui/material/CircularProgress'
import Button from "@/common/button"
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'

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
  
  // Estados para el procesamiento masivo
  const [successList, setSuccessList] = useState([]);
  const [failedList, setFailedList] = useState([]);
  const [processingStatus, setProcessingStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [processedRecords, setProcessedRecords] = useState(0);
  
  // Referencia para el input de archivo
  const fileInputRef = useRef(null);

  // Función para descargar la plantilla Excel
  const downloadTemplate = () => {
    // Crear datos de ejemplo
    const templateData = [
      ["nombre", "apellido", "ci", "fecha_nacimiento", "telefono", "email", "colegio_id", "curso", "tutor_ids", "olimpiada_id", "area_level_grade_ids"],
      ["Juan", "Pérez López", "12345678", "2005-10-12", "77123456", "juan@example.com", "361", "1ro de primaria", "1", "4", "84"]
    ];
    
    // Crear libro y hoja
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    
    // Añadir hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    
    // Guardar archivo
    XLSX.writeFile(wb, "plantilla_competidores.xlsx");
  };
  
  // Función para procesar el archivo Excel
  const processExcelFile = async (file) => {
    try {
      // Leer el archivo
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Obtener la primera hoja
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          
          // Convertir a JSON
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          
          // Iniciar procesamiento
          setIsProcessing(true);
          setSuccessList([]);
          setFailedList([]);
          setTotalRecords(jsonData.length);
          setProcessedRecords(0);
          setLoadingModal(prev => ({ 
            ...prev, 
            isOpen: true, 
            title: "Procesando registros", 
            message: `Procesando 0 de ${jsonData.length} registros...` 
          }));
          
          // Procesar cada registro
          for (let i = 0; i < jsonData.length; i++) {
            const record = jsonData[i];
            setProcessingStatus(`Procesando registro ${i+1} de ${jsonData.length}`);
            setLoadingModal(prev => ({ 
              ...prev, 
              message: `Procesando ${i+1} de ${jsonData.length} registros...` 
            }));
            
            try {
              // Preparar payload
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
              
              // Enviar solicitud
              const response = await postIncriptionCompetitor(competitorPayload).unwrap();
              
              // Añadir a lista de éxitos
              setSuccessList(prev => [...prev, {
                id: response.id,
                name: competitorPayload.name,
                last_name: competitorPayload.last_name,
                ci: competitorPayload.ci,
                email: competitorPayload.email
              }]);
              
            } catch (error) {
              // Determinar mensaje de error
              let errorMessage = "Error desconocido";
              
              if (error.data?.message) {
                errorMessage = error.data.message;
              } else if (error.status) {
                switch(error.status) {
                  case 400: errorMessage = "Datos inválidos"; break;
                  case 401: errorMessage = "No autorizado"; break;
                  case 409: errorMessage = "Competidor ya registrado"; break;
                  case 500: errorMessage = "Error del servidor"; break;
                  default: errorMessage = `Error (${error.status})`;
                }
              }
              
              // Añadir a lista de fallos
              setFailedList(prev => [...prev, {
                name: record.nombre,
                last_name: record.apellido,
                ci: record.ci,
                error: errorMessage
              }]);
            }
            
            // Actualizar contador
            setProcessedRecords(i + 1);
          }
          
          // Finalizar procesamiento
          setIsProcessing(false);
          setLoadingModal(prev => ({ ...prev, isOpen: false }));
          
          // Mostrar resultados
          setModal({
            isOpen: true,
            title: "Procesamiento completado",
            message: `Se procesaron ${jsonData.length} registros. ${successList.length} exitosos, ${failedList.length} fallidos.`,
            type: successList.length > 0 ? "success" : "warning"
          });
          
          // Exportar resultados
          exportResults();
          
        } catch (error) {
          console.error("Error procesando archivo:", error);
          setLoadingModal(prev => ({ ...prev, isOpen: false }));
          setIsProcessing(false);
          
          setModal({
            isOpen: true,
            title: "Error en el procesamiento",
            message: "Ocurrió un error al procesar el archivo Excel. Verifique el formato.",
            type: "error"
          });
        }
      };
      
      reader.readAsArrayBuffer(file);
      
    } catch (error) {
      console.error("Error leyendo archivo:", error);
      setModal({
        isOpen: true,
        title: "Error en la lectura",
        message: "No se pudo leer el archivo seleccionado.",
        type: "error"
      });
    }
  };
  
  // Función para exportar resultados
  const exportResults = () => {
    // Crear libro
    const workbook = XLSX.utils.book_new();
    
    // Crear hoja de éxitos
    if (successList.length > 0) {
      const successData = [
        ["ID", "Nombre", "Apellido", "CI", "Email", "Estado"],
        ...successList.map(item => [
          item.id,
          item.name,
          item.last_name,
          item.ci,
          item.email,
          "REGISTRADO"
        ])
      ];
      
      const successSheet = XLSX.utils.aoa_to_sheet(successData);
      XLSX.utils.book_append_sheet(workbook, successSheet, "Registros Exitosos");
    }
    
    // Crear hoja de fallos
    if (failedList.length > 0) {
      const failedData = [
        ["Nombre", "Apellido", "CI", "Error"],
        ...failedList.map(item => [
          item.name,
          item.last_name,
          item.ci,
          item.error
        ])
      ];
      
      const failedSheet = XLSX.utils.aoa_to_sheet(failedData);
      XLSX.utils.book_append_sheet(workbook, failedSheet, "Registros Fallidos");
    }
    
    // Guardar archivo
    const date = new Date();
    const fileName = `resultados_registro_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };
  
  // Manejador para el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processExcelFile(file);
    }
  };
  
  // Manejador para el clic en el botón de carga
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

const handleGuardianSubmit = async (data) => {
    setAnimationDirection("forward");
    if (data.selectedGuardians && data.selectedGuardians.length > 0) {
      const selectedGuardians = data.selectedGuardians;
      setGuardiansData(selectedGuardians);
      setStep(2);
      return;
    }

    if (!selectedOlympic) {
        setModal({
          isOpen: true,
          title: "Olimpiada requerida",
          message: "Seleccione una olimpiada antes de continuar",
          type: "error"
        });
        return;
      }
    try {
      // Mostrar modal de carga
      setLoadingModal(prev => ({ ...prev, isOpen: true, message: "Registrando tutor..." }));
      
      const guardianPayload = {
        name: data.nombres || "",
        last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`.trim(),
        email: data.email || "",
        phone: data.celular || "",
        type: data.tipo || "Padre",
        ci: data.ci || "",
      };
  
      const createGuardianResponse = await postIncriptionGuardian(guardianPayload).unwrap();
      
      // Cerrar modal de carga
      setLoadingModal(prev => ({ ...prev, isOpen: false }));
      
      refetchGuardians();
      setGuardiansData([createGuardianResponse]); 
      
      // Mostrar modal de éxito
      setModal({
        isOpen: true,
        title: "Tutor registrado",
        message: "El tutor se ha registrado correctamente.",
        type: "success"
      });
      
      setStep(2);
    } catch (error) {
      // Cerrar modal de carga
      setLoadingModal(prev => ({ ...prev, isOpen: false }));
      
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
        if (!selectedOlympic) {
            setModal({
              isOpen: true,
              title: "Olimpiada requerida",
              message: "Seleccione una olimpiada antes de continuar",
              type: "error"
            });
            return;
          } 
      
      // Mostrar modal de carga
      setLoadingModal(prev => ({ ...prev, isOpen: true, message: "Registrando competidor..." }));
      
      const guardianIds = guardiansData.map(g => Number(g.id));
      const areaLevelGradeIds = data.area_level_grades.map(g => g.id); 
      
      const competitorPayload = {
        name: data.nombres,
        last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`.trim(),
        ci: data?.cedula,
        birthday: format(new Date(data.fechaNacimiento), "yyyy-MM-dd"),
        phone: data?.celular, 
        email: data?.email,
        school_id: data.colegio?.id || "",     
        curso: data?.curso,
        guardian_ids: guardianIds,
        olympic_id: selectedOlympic?.id,
        area_level_grade_ids: areaLevelGradeIds,
      };
  
      const response = await postIncriptionCompetitor(competitorPayload).unwrap();
      console.log("Respuesta del registro de competidor:", response);
      
      // Cerrar modal de carga
      setLoadingModal(prev => ({ ...prev, isOpen: false }));
      
      // Mostrar modal de éxito
      setModal({
        isOpen: true,
        title: "Registro exitoso",
        message: `El competidor ${data.nombres} ${data.apellidoPaterno} ha sido registrado correctamente.`,
        type: "success",
      });
      
      // Opcional: Resetear el formulario o redirigir a otra página
      // resetForm();
      
    } catch (error) {
      // Cerrar modal de carga
      setLoadingModal(prev => ({ ...prev, isOpen: false }));
      
      let errorMessage = "Ocurrió un error durante el registro.";
      
      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.status) {
        switch(error.status) {
          case 400:
            errorMessage = "Datos de registro inválidos. Por favor revise la información.";
            break;
          case 401:
            errorMessage = "No autorizado. Por favor inicie sesión nuevamente.";
            break;
          case 409:
            errorMessage = "El competidor ya está registrado en esta olimpiada.";
            break;
          case 500:
            errorMessage = "Error en el servidor. Por favor intente más tarde.";
            break;
          default:
            errorMessage = `Error (${error.status}): ${errorMessage}`;
        }
      }
      
      console.error("Error al registrar competidor:", error);
      
      setModal({
        isOpen: true,
        title: "Error en el registro",
        message: errorMessage,
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
        title={`Inscripción a las Olimpiadas ${selectedOlympic?.name ? `- ${selectedOlympic.name}` : ""}`}
        className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
      />
      
      {/* Sección de carga masiva */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Carga Masiva de Competidores</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={downloadTemplate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
          >
            <DownloadIcon className="mr-2" />
            Descargar Plantilla
          </Button>
          
          <Button
            onClick={handleUploadClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
          >
            <UploadFileIcon className="mr-2" />
            Cargar Archivo Excel
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="hidden"
          />
        </div>
        
        {isProcessing && (
          <div className="mt-4 p-2 bg-gray-700 rounded text-white">
            <p>{processingStatus}</p>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${(processedRecords / totalRecords) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
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
      
      {/* Modal de éxito/error */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        iconType={modal.type}
        primaryButtonText="Ok"
        onPrimaryClick={closeModal}
      >
        <p>{modal.message}</p>
        
        {/* Mostrar resumen de registros si hay resultados */}
        {(successList.length > 0 || failedList.length > 0) && (
          <div className="mt-4">
            {successList.length > 0 && (
              <div className="mb-2">
                <p className="font-bold text-green-500">Registros exitosos ({successList.length}):</p>
                <ul className="max-h-40 overflow-y-auto">
                  {successList.map((item, index) => (
                    <li key={`success-${index}`} className="text-sm">
                      {item.name} {item.last_name} - {item.ci}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {failedList.length > 0 && (
              <div>
                <p className="font-bold text-red-500">Registros fallidos ({failedList.length}):</p>
                <ul className="max-h-40 overflow-y-auto">
                  {failedList.map((item, index) => (
                    <li key={`failed-${index}`} className="text-sm">
                      {item.name} {item.last_name} - {item.ci}: {item.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
      
      {/* Modal de carga */}
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
    </div>
    </>
  )
}

export default Incription;

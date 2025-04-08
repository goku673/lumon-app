'use client'
import { useState } from "react";
import CompetitorRegister from "@/components/competitorRegister";
import GuardianRegister from "@/components/guardientRegister";
import { usePostIncriptionCompetitorMutation, usePostIncriptionGuardianMutation } from "@/app/redux/services/register";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setGuardian, setCompetitor } from "@/app/redux/slice/guardianSlice";
import { format } from 'date-fns';
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const Incription = () => {
    const [step, setStep] = useState(1);
    const [competitorData, setCompetitorData] = useState({});
    const [guardianData, setGuardianData] = useState({});
    const [guardianDataReverse, setGuardianDataReverse] = useState({});
 
    const { guardian } = useSelector((state) => state.guardian);
    const dispatch = useDispatch();
    const [postIncriptionGuardian] = usePostIncriptionGuardianMutation();
    const [postIncriptionCompetitor] = usePostIncriptionCompetitorMutation();
    const { enqueueSnackbar } = useSnackbar(); 
    
    useEffect(() => {
       console.log("cambios en guardina",guardian);
    }, [postIncriptionGuardian, guardian]);

    const handleCompetitorSubmit = async (data) => {
      try {
         
          const guardianFormData = new FormData();
          guardianFormData.append('name', guardianDataReverse.nombres);
          guardianFormData.append('last_name', `${guardianDataReverse.apellidoPaterno} ${guardianDataReverse.apellidoMaterno}`);
          guardianFormData.append('email', guardianDataReverse.email);
          guardianFormData.append('phone', guardianDataReverse.celular);
          guardianFormData.append('type', guardianDataReverse.tipo || 'Padre');
         
  
          const guardianResponse = await postIncriptionGuardian(guardianFormData).unwrap();
          
          
          const competitorPayload = {
              name: data.nombres,
              last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`,
              ci: String(data.cedula),
              birthday: format(new Date(data.fechaNacimiento), 'yyyy-MM-dd'),
              phone: "78952345" ,
              email: data.email,
              school_id: 2,
              curso: data.curso,
              guardian_ids: [guardianResponse.id],
              olympic_id: 1,
              area_level_grade_ids: [ 5, 21, 36]
          };
  
          
          console.log("Datos del competidor:", competitorPayload);
          
          enqueueSnackbar("Registro exitoso!", { variant: "success" });
  
      } catch (error) {
          console.error('Error detallado:', error.data?.errors);
          enqueueSnackbar(error.data?.message || "Error en registro", { variant: "error" });
      }
  };

    const handleGuardianSubmit = async (data) => {
        setGuardianDataReverse(data);
        const lastName = `${data.apellidoPaterno} ${data.apellidoMaterno}`.trim();
        const payload = {
            name: data.nombres,
            last_name: lastName,
            email: data.email,
            type: "Padre",
            phone: data.celular,
        };
        
        setGuardianData(payload);
        
        setStep(2);
    };

    return (
        <div className="min-h-screen max-w-[1400px] mx-auto lg:px-16 ">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
                Inscripción a las Olimpiadas
            </h1>
            {step === 1 ? (
                <GuardianRegister onSubmit={handleGuardianSubmit} initialData={guardianDataReverse} />
            ) : (
                <CompetitorRegister onSubmit={handleCompetitorSubmit} onBack={() => setStep(1)} initialData={competitorData} />
            )}
        </div>
    );
};

export default Incription;
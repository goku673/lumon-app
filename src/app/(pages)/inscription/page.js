'use client'
import { useState } from "react";
import CompetitorRegister from "@/components/competitorRegister";
import GuardianRegister from "@/components/guardientRegister";
const Incription = () => {
    const [step, setStep] = useState(1);
    const [competitorData, setCompetitorData] = useState({});


    const handleCompetitorSubmit = (data) => {
      setCompetitorData(data)
      setStep(2)
    }
    const handleGuardianSubmit = (data) => {
      const formData = {
        competitor: competitorData,
        tutor: data,
      }
  
    }

    return (
      <div className="min-h-screen max-w-[1400px] mx-auto lg:px-16 ">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Inscripción a las Olimpiadas</h1>
  
        {step === 1 ? <CompetitorRegister onSubmit={handleCompetitorSubmit} /> : <GuardianRegister onSubmit={handleGuardianSubmit} />}
      </div>
    )
  }
  




export default Incription;
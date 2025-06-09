// Este componente está diseñado para mostrar detalles de una inscripción,
// asegurando que solo los usuarios autenticados puedan acceder a la información.
// Se utiliza "use client" para indicar que debe ejecutarse en el lado del cliente.

"use client";
import React from "react";
import DetailInscriptionComponent from "@/components/detailIncription";
import AuthGuard from "@/components/AuthGuard";

const DetailInscription = () => (
  <AuthGuard>
    <DetailInscriptionComponent />
  </AuthGuard>
);

export default DetailInscription;
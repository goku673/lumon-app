import DetailField from "./form/DetailField";
import NameFields from "./form/nameFields";
import { useState } from "react";
import { useGetCompetitorQuery } from "@/app/redux/services/competitorsApi";
import Input from "@/common/input";
import Button from "@/common/button";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import DetailSection from "./form/detailSection";
import { Card, CardContent, CardHeader } from "./cards";

const DetailInscription = () => {
  const [competitorId, setCompetitorId] = useState("");
  const [searchId, setSearchId] = useState(null);
  
  // Consulta condicional que solo se ejecuta cuando searchId tiene un valor
  const { data: competitor, isLoading, isError, error } = useGetCompetitorQuery(
    searchId, 
    { skip: !searchId }
  );

  const handleSearch = () => {
    if (competitorId && !isNaN(competitorId)) {
      setSearchId(parseInt(competitorId));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Formatear fecha si existe
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Detalle de Inscripción</h1>
        
        {/* Barra de búsqueda */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-medium text-center">Buscar Inscripción</h2>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="flex w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Buscar por ID del competidor"
                  className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 bg-white"
                  value={competitorId}
                  onChange={(e) => setCompetitorId(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <SearchIcon />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="mb-8">
            <CardContent>
              <div className="text-center text-lg">
                Cargando datos del competidor...
              </div>
            </CardContent>
          </Card>
        )}

        {isError && (
          <Card className="mb-8 border-red-500">
            <CardContent>
              <div className="text-center text-red-500 text-lg">
                Error al buscar el competidor: {error?.data?.message || "No se encontró el competidor"}
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && competitor && (
          <>
            <DetailSection title="DATOS DEL COMPETIDOR">
              <NameFields 
                title="Nombre del Competidor:" 
                lastName={competitor.last_name || "-"} 
                middleName="" 
                firstName={competitor.name || "-"} 
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <DetailField label="Correo Electrónico:" value={competitor.email || "-"} />
                <DetailField label="Cédula Identidad:" value={competitor.ci || "-"} />
                <DetailField label="Fecha de nacimiento:" value={formatDate(competitor.birthday)} />
              </div>

              <DetailField label="Colegio:" value={competitor.school?.name || "Sin colegio asignado"} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <DetailField label="Curso:" value={competitor.curso || "-"} />
                <DetailField label="Departamento:" value={competitor.department?.name || "-"} />
                <DetailField label="Provincia:" value={competitor.province?.name || "-"} />
              </div>

              <DetailField 
                label="Área a la que se Inscribe:" 
                value={competitor?.inscriptions?.[0]?.olympic?.name || "Sin inscripción"} 
              />
            </DetailSection>

            {competitor?.guardians && competitor.guardians.length > 0 && (
              <DetailSection title="DATOS DE PROFESOR O TUTOR">
                {competitor?.guardians?.map((guardian, index) => (
                  <div key={guardian.id || index} className={index > 0 ? "mt-6 pt-6 border-t" : ""}>
                    <NameFields
                      title={`Nombre del ${guardian.type || "Tutor"}:`}
                      lastName={guardian.last_name || "-"}
                      middleName=""
                      firstName={guardian.name || "-"}
                    />
                    <DetailField label="Correo electrónico:" value={guardian.email || "-"} />
                    <DetailField label="Celular:" value={guardian.phone || "-"} />
                  </div>
                ))}
              </DetailSection>
            )}

            {competitor.inscriptions && competitor.inscriptions.length > 0 && (
              <DetailSection title="INFORMACIÓN DE INSCRIPCIÓN">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <DetailField 
                    label="Fecha de inscripción:" 
                    value={formatDate(competitor.inscriptions[0].created_at)} 
                  />
                  <DetailField 
                    label="Estado Inscripción:" 
                    value={competitor.inscriptions[0].status === "pending" ? "Pendiente" : 
                           competitor.inscriptions[0].status === "completed" ? "Completa" : 
                           competitor.inscriptions[0].status || "Desconocido"} 
                  />
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Comprobante de pago</label>
                    <button 
                      className="w-full px-3 py-2 bg-white border rounded-md text-left text-gray-500"
                      disabled={!competitor.inscriptions[0].payment_order_id}
                    >
                      {competitor.inscriptions[0].payment_order_id ? "Ver Comprobante" : "Sin comprobante"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DetailField 
                    label="Número Comprobante:" 
                    value={competitor.inscriptions[0].payment_order_id || "-"} 
                  />
                  <DetailField 
                    label="Nombre del Pagador:" 
                    value={competitor.guardians?.[0] ? 
                           `${competitor.guardians[0].name} ${competitor.guardians[0].last_name}` : 
                           "-"} 
                  />
                  <DetailField 
                    label="Cod de Inscripción:" 
                    value={competitor.inscriptions[0].id || "-"} 
                  />
                </div>
              </DetailSection>
            )}
          </>
        )}

        {!isLoading && !isError && !competitor && searchId && (
          <Card className="mb-8 border-red-500">
            <CardContent>
              <div className="text-center text-red-500 text-lg">
                No se encontró ningún competidor con el ID: {searchId}
              </div>
            </CardContent>
          </Card>
        )}

        {!searchId && (
          <Card className="mb-8">
            <CardContent>
              <div className="text-center text-lg">
                Ingrese un ID de competidor para ver sus detalles
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailInscription;
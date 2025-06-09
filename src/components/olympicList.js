"use client";

// Importaciones de React y hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importaciones de servicios y acciones de Redux
import { useGetOlympicsQuery } from "@/app/redux/services/olympicsApi";
import {
  setSelectedOlympic,
  clearSelectedOlympic,
} from "@/app/redux/slice/olympicsSlice";

// Importaciones de componentes UI
import { Badge } from "@/common/badge";
import { Skeleton } from "@/common/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FilterListIcon from "@mui/icons-material/FilterList";
import ButtonSE from "@/common/ButtonSE";
import Title from "@/common/title";

/**
 * Componente OlympicsList
 *
 * Muestra una lista de olimpiadas con opciones para filtrar por estado (activas/inactivas).
 * Permite seleccionar una olimpiada para realizar acciones posteriores.
 *
 * @returns {JSX.Element} Componente de lista de olimpiadas con filtros
 */
export default function OlympicsList() {
  // Hooks
  // Hooks de Redux para manejar el estado global
  const dispatch = useDispatch();
  const selectedOlympic = useSelector((state) => state.olympic.selectedOlympic);

  // Estado local para la olimpiada seleccionada
  const [selected, setSelected] = useState(null);

  // Consulta para obtener la lista de olimpiadas
  const { data: olympics = [], isLoading, error } = useGetOlympicsQuery();

  /**
   * Formatea una fecha en un string legible
   * @param {string} date - Fecha a formatear
   * @returns {string} Fecha formateada (ej: "15 de junio de 2023")
   */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <h3 className="text-lg font-medium text-red-800">
          Error al cargar las olimpiadas
        </h3>
        <p className="mt-2 text-red-700">
          Por favor, intente nuevamente más tarde.
        </p>
      </div>
    );
  }

  /**
   * Renderiza la cuadrícula de tarjetas de olimpiadas
   * @param {Array} list - Lista de olimpiadas a mostrar
   * @returns {JSX.Element} Componente de cuadrícula con las tarjetas de olimpiadas
   */


  const renderGrid = (list) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border border-gray-200">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }


    if (!list.length) {
      return (
        <div className="text-center py-16">
          <FilterListIcon
            className="mx-auto  mb-4 text-white"
            fontSize="large"
          />
          <h3 className="text-xl font-medium text-white">No hay olimpiadas</h3>
        </div>
      );
    }


    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((o) => (
          <Card
            key={o.id}
            className={`border border-gray-200 group ${
              selected?.id === o.id ? "ring-2 ring-[#0f2e5a]" : ""
            }`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{o.name}</CardTitle>
                <Badge
                  variant={o.status === "active" ? "default" : "secondary"}
                >
                  {o.status === "active" ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <CardDescription>{o.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-3 rounded-md space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarTodayIcon
                    className="text-gray-500"
                    fontSize="small"
                  />
                  <span>Inicio: {formatDate(o.date_ini)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarTodayIcon
                    className="text-gray-500"
                    fontSize="small"
                  />
                  <span>Fin: {formatDate(o.date_fin)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <ButtonSE
                className="w-full"
                style={{
                  backgroundColor:
                    selected?.id === o.id ? "#0f2e5a" : undefined,
                }}
                variant={selected?.id === o.id ? undefined : "outline"}
                onClick={() => {
                  if (selected?.id === o.id) {
                    dispatch(clearSelectedOlympic());
                    setSelected(null);
                  } else {
                    dispatch(setSelectedOlympic(o));
                    setSelected(o);
                  }
                }}
              > 
                {selected?.id === o.id ? "Seleccionada" : "Seleccionar"}
              </ButtonSE>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="py-8 px-4 space-y-8">
      {/* Contenedor principal con padding vertical y horizontal */}

      {/* Título de la sección centrado */}
      <div className="flex justify-center">
        <Title className="text-white" title="Lista de Olimpiadas" />
      </div>

      {/* Componente de pestañas para filtrar las olimpiadas */}
      <Tabs defaultValue="all" className="w-auto mx-auto justify-center">

        {/* Contenedor de los botones de pestañas (filtro) */}
        <div className="flex justify-center mb-4">
          <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">

              {/* Iteración sobre las opciones de filtro: todas, activas, inactivas */}
            {["all", "active", "inactive"].map(
              (
                tab // Opciones de filtrado
              ) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`px-4 py-2 rounded-md`}
                >
                  {tab === "all"
                    ? "Todas"
                    : tab === "active"
                    ? "Activas"
                    : "Inactivas"}
                </TabsTrigger>
              )
            )}
          </TabsList>
        </div>

          {/* Contenido mostrado para la pestaña "Todas" */}
        <TabsContent value="all">{renderGrid(olympics)}</TabsContent>

        {/* Contenido mostrado para la pestaña "Activas" */}
        <TabsContent value="active">
          {renderGrid(olympics.filter((o) => o.status === "active"))}
        </TabsContent>

         {/* Contenido mostrado para la pestaña "Inactivas" */}
        <TabsContent value="inactive">
          {renderGrid(olympics.filter((o) => o.status === "inactive"))}
        </TabsContent>
      </Tabs>

    </div>

  );

}








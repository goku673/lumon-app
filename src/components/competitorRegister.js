"use client";
import { useState } from "react";
import { useGetGradesQuery } from "@/app/redux/services/register";
import { useGetAreasQuery, useGetProvincesQuery} from "@/app/redux/services/areaApi";
import { useGetAreaLevelsGradesQuery } from "@/app/redux/services/areaLevelsGrades";
import { useGetDepartmentsQuery } from "@/app/redux/services/areaApi";
import { useGetSchoolsQuery } from "@/app/redux/services/schoolApi";
import SaveIcon from "@mui/icons-material/Save";
import { ArrowBack } from "@mui/icons-material";
import Button from "@/common/button";
import Input from "@/common/input";
import Select from "@/common/select";
import FormGroup from "@/components/formGroup";
import FormContainer from "@/common/formContainer";
import FormContent from "@/common/formContent";
import Title from "@/common/title";
import Selector from "./selector";
import { inputFieldsCompetitor } from "@/utils/inputFieldsCompetitor";

const CompetitorRegister = ({ onSubmit, onBack, initialData = {} }) => {
  const { data: grades, isLoading: isGradesLoading, isError: isGradesError } = useGetGradesQuery();
  const { data: areaLevelGrades, isLoading: isAreaLevelGradesLoading, isError: isAreaLevelGradesError } = useGetAreaLevelsGradesQuery();
  const { data: schools, isLoading: isSchoolsLoading, isError: isSchoolsError } = useGetSchoolsQuery();
  const { data: departments, isLoading: isDepartmentsLoading, isError: isDepartmentsError } = useGetDepartmentsQuery();
  const { data: provinces, isLoading: isProvincesLoading, isError: isProvincesError } = useGetProvincesQuery();
  
  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    cedula: "",
    fechaNacimiento: "",
    celular: "",
    colegio: null,
    curso: "",
    departamento: "",
    provincia: "",
    area_level_grades: [],
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSchoolSelect = school => setFormData(prev => ({ ...prev, colegio: school }));
  const handleSchoolRemove = ()    => setFormData(prev => ({ ...prev, colegio: null }));

  const flattenedGrades = areaLevelGrades?.flatMap((area) => 
    area.levels.flatMap((level) => 
      level.grades.map((grade) => ({
        id: grade.area_level_grade_id,
        name: `${area.name} - ${level.name} - ${grade.name}`,
      }))
    )
  ) || [];

  const handleGradeSelect = grade => setFormData(prev => ({
    ...prev,
    area_level_grades: [...prev.area_level_grades, grade]
  }));

  const handleGradeRemove = grade => setFormData(prev => ({
    ...prev,
    area_level_grades: prev.area_level_grades.filter(g => g.id !== grade.id)
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title title="DATOS DEL COMPETIDOR" />

      <FormContent onSubmit={handleSubmit}>
        {inputFieldsCompetitor.map((group, idx) => (
          <FormGroup key={idx} label={group.groupLabel}>
            <div className={group.layout}>
              {group.fields.map(field => (
                <Input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  pattern={field.pattern}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              ))}
            </div>
          </FormGroup>
        ))}

        <FormGroup label="Seleccione su Colegio:">
          {isSchoolsLoading ? (
            <p>Cargando colegios...</p>
          ) : isSchoolsError ? (
            <p>Error al cargar colegios.</p>
          ) : (
            <Selector
              
              items={schools}
              selectedItems={formData.colegio ? [formData.colegio] : []}
              onSelect={handleSchoolSelect}
              onRemove={handleSchoolRemove}
              isMultiSelect={false}
              placeholder="Buscar colegio..."
              labelKey="name"
            />
          )}
        </FormGroup>
        <FormGroup label="Información Académica:">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
              name="curso"
              options={
                isGradesLoading 
                  ? [{ value: "", label: "Cargando cursos..." }] 
                  : isGradesError 
                      ? [{ value: "", label: "Error al cargar cursos" }] 
                      : grades?.map(g => ({ value: g.description, label: g.description })) || []
              }
              value={formData.curso}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <Select
              name="departamento"
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              options={
                isDepartmentsLoading ? [{ value: "", label: "Cargando departamentos..." }] :
                isDepartmentsError   ? [{ value: "", label: "Error al cargar departamentos" }] :
                departments?.map(d => ({ value: d.id, label: d.name })) || []
              }
              value={formData.departamento}
              onChange={handleChange}
              required
            />

            <Select
              name="provincia"
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              options={
                isProvincesLoading ? [{ value: "", label: "Cargando provincias..." }] :
                isProvincesError   ? [{ value: "", label: "Error al cargar provincias" }] :
                provinces?.map(p => ({ value: p.name, label: p.name })) || []
              }
              value={formData.provincia}
              onChange={handleChange}
              required
            />
          </div>
        </FormGroup>

        <FormGroup label="Área:">
          {isAreaLevelGradesLoading ? (
            <p>Cargando niveles...</p>
          ) : isAreaLevelGradesError ? (
            <p>Error al cargar niveles</p>
          ) : (
            <Selector
              items={flattenedGrades}
              selectedItems={formData.area_level_grades}
              onSelect={handleGradeSelect}
              onRemove={handleGradeRemove}
              isMultiSelect
              placeholder="Buscar nivel o grado..."
              labelKey="name"
            />
          )}
        </FormGroup>

        <div className="flex justify-between mt-6 border-t border-gray-300 pt-4">
            <Button 
              type="button" 
              onClick={onBack} 
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center mr-4"
            >
              <ArrowBack className="mr-2" />
              Volver
            </Button>
            <Button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
            >
              <SaveIcon className="mr-2" />
              Guardar los datos de inscripción
            </Button>
        </div>
      </FormContent>
    </FormContainer>
  );
};

export default CompetitorRegister;

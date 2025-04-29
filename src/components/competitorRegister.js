"use client";
import { useState } from "react";
import { useGetGradesQuery } from "@/app/redux/services/register";
import { useGetAreasQuery, useGetProvincesQuery, useGetAreaLevelGradesQuery} from "@/app/redux/services/areaApi";
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

const CompetitorRegister = ({ onSubmit, onBack, initialData }) => {
  const { data: grades, isError: isGradesError, isLoading: isGradesLoading } = useGetGradesQuery();
  const { data: areas, isError: isAreasError, isLoading: isAreasLoading } = useGetAreasQuery();
  const { data: provinces, isError: isProvincesError, isLoading: isProvincesLoading } = useGetProvincesQuery();
  const { data: departments, isError: isDepartmentsError, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery();
  const { data: schools, isError: isSchoolsError, isLoading: isSchoolsLoading } = useGetSchoolsQuery();
  const { data: areaLevelGrades, isError: isAreaLevelGradesError, isLoading: isAreaLevelGradesLoading } = useGetAreaLevelGradesQuery();
  
  console.log(areaLevelGrades, "areaLevelGrades");
  console.log(areas, "areas");
  const [formData, setFormData] = useState({
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    email: "",
    cedula: "",
    fechaNacimiento: "",
    colegio: null,
    curso: "",
    departamento: "",
    provincia: "",
    area_level_grades: [],
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSchoolSelect = (school) => {
    setFormData((prev) => ({
      ...prev,
      colegio: school,
    }));
  };

  const handleSchoolRemove = () => {
    setFormData((prev) => ({
      ...prev,
      colegio: null,
    }));
  };
  const flattenedGrades = areaLevelGrades?.reduce((acc, area) => {
    area.levels.forEach(level => {
      level.grades.forEach(grade => {
        acc.push({
          id: grade.area_level_grade_id,
          name: `${area.name} - ${level.name} - ${grade.name}`,
          originalData: grade
        });
      });
    });
    return acc;
  }, []) || [];

  const handleGradeSelect = (grade) => {
    setFormData(prev => ({
      ...prev,
      area_level_grades: [...prev.area_level_grades, grade]
    }));
  };

  const handleGradeRemove = (grade) => {
    setFormData(prev => ({
      ...prev,
      area_level_grades: prev.area_level_grades.filter(g => g.id !== grade.id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title title="DATOS DEL COMPETIDOR" className="" />
      <FormContent onSubmit={handleSubmit}>
        <FormGroup label="Nombre del Competidor:">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="apellidoMaterno"
              placeholder="Apellido Materno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="nombres"
              placeholder="Nombre(s)"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </div>
        </FormGroup>
        <FormGroup label="Información de Contacto:">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="email"
              name="email"
              placeholder="Ingrese un correo válido"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="cedula"
              placeholder="Ingrese CI"
              value={formData.cedula}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="fechaNacimiento"
              placeholder="Ejemplo: 10/02/2024"
              pattern="\d{2}/\d{2}/\d{4}"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
        </FormGroup>
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
                  : grades?.map((grade) => ({ value: grade.name, label: grade.name })) || []
              }
              value={formData.curso}
              className="w-full px-3 py-2"
              onChange={handleChange}
              required
            />
            <Select
              name="departamento"
              options={
                isDepartmentsLoading
                  ? [{ value: "", label: "Cargando departamentos..." }]
                  : isDepartmentsError
                  ? [{ value: "", label: "Error al cargar departamentos" }]
                  : departments?.map((department) => ({
                      value: department.id,
                      label: department.name,
                    })) || []
              }
              value={formData.departamento}
              onChange={handleChange}
              required
            />
            <Select
              name="provincia"
              options={
                isProvincesLoading
                  ? [{ value: "", label: "Cargando provincias..." }]
                  : isProvincesError
                  ? [{ value: "", label: "Error al cargar provincias" }]
                  : provinces?.map((province) => ({ value: province.name, label: province.name })) || []
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
              isMultiSelect={true}
              placeholder="Buscar nivel o grado..."
              labelKey="name"
              />
          )}
        </FormGroup>
        <div className="flex justify-between">
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center"
            onClick={onBack}
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
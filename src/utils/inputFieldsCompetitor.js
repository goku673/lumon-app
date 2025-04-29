export const inputFieldsCompetitor = [
    {
      groupLabel: "Nombre del Competidor:",
      layout: "grid grid-cols-1 md:grid-cols-3 gap-4",
      fields: [
        {
          name: "apellidoPaterno",
          type: "text",
          placeholder: "Apellido Paterno",
        },
        {
          name: "apellidoMaterno",
          type: "text",
          placeholder: "Apellido Materno",
        },
        {
          name: "nombres",
          type: "text",
          placeholder: "Nombre(s)",
        },
      ],
    },
    {
      groupLabel: "Información de Contacto:",
      layout: "grid grid-cols-1 md:grid-cols-3 gap-4",
      fields: [
        {
          name: "email",
          type: "email",
          placeholder: "Ingrese un correo válido",
        },
        {
          name: "cedula",
          type: "text",
          placeholder: "Ingrese CI",
        },
        {
          name: "fechaNacimiento",
          type: "text",
          placeholder: "Ejemplo: 10/02/2024",
          pattern: "\\d{2}/\\d{2}/\\d{4}",
        },
      ],
    },
    {
      groupLabel: "Información Académica:",
      fields: [
        {
          name: "colegio",
          type: "text",
          placeholder: "Ingrese el Nombre de Su Colegio",
        },
      ],
    },
  ];
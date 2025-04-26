export const inputFieldsGuardians = [
    {
      groupLabel: "Nombre del Profesor o Tutor:",
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
      groupLabel: "Correo electrónico:",
      fields: [
        {
          name: "email",
          type: "email",
          placeholder: "Ingrese un correo válido",
        },
      ],
    },
    {
      groupLabel: "Celular:",
      fields: [
        {
          name: "celular",
          type: "tel",
          placeholder: "Ingrese un número válido",
        },
      ],
    },
  ];
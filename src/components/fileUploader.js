// Importa el ícono de subir archivo desde la librería de Material UI
import UploadFileIcon from "@mui/icons-material/UploadFile";

// Componente reutilizable para subir archivos
// name: Nombre del input de archivo
// onChange: Función que se ejecuta cuando se selecciona un archivo
// accept: Tipos de archivos aceptados (por ejemplo, ".csv, .xlsx")
// label: Texto que se muestra en el botón de carga
// className: Clases adicionales para personalizar el contenedor
const FileUploader = ({ name, onChange, accept, label, className }) => (
    <div className={`p-4 border border-dashed border-gray-300 rounded-md bg-gray-100 ${className}`}>
      <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center">
        <UploadFileIcon className="mr-2" />
        {label}
        <input
          type="file"
          name={name}
          className="hidden"
          onChange={onChange}
          accept={accept}
        />
      </label>
      <p className="text-sm text-gray-500">Formatos aceptados: {accept}</p>
    </div>
  );
  // Exporta el componente para poder usarlo en otras partes del proyecto
  export default FileUploader;
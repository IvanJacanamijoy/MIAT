import { Upload } from "lucide-react";

const FotosSection = ({ fotos, setFotos, editable = true }) => {
  const handleUpload = (key, file) => {
    setFotos({ ...fotos, [key]: file });
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Registro Fotográfico</h3>
      <div className="grid grid-cols-2 gap-6">
        {["foto1", "foto2"].map((key) => (
          <div key={key} className="relative border rounded flex items-center justify-center h-40 bg-gray-700">
            <input
              type="file"
              accept="image/*"
              disabled={!editable}
              className="hidden"
              id={key}
              onChange={(e) => handleUpload(key, e.target.files[0])}
            />
            <label htmlFor={key} className="cursor-pointer flex flex-col items-center justify-center h-full w-full">
              {fotos[key] ? (
                <span className="text-gray-300">Imagen cargada</span>
              ) : (
                <>
                  <Upload size={32} className="text-red-500 mb-2" />
                  <span className="text-gray-400">Subir foto</span>
                </>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FotosSection;

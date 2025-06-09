
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Upload, Download, Trash2, FileText } from 'lucide-react';
import { ValidationFile } from '@/types/validation';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/dateUtils';

interface ValidationFilesProps {
  validationId: string;
  files: ValidationFile[];
  onFileUpload: (validationId: string, file: File) => void;
  onFileDelete: (fileId: string) => void;
}

const ValidationFiles = ({ validationId, files, onFileUpload, onFileDelete }: ValidationFilesProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Solo se permiten archivos PDF",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Error",
        description: "El archivo es demasiado grande (máximo 10MB)",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      onFileUpload(validationId, file);
      toast({
        title: "Archivo subido",
        description: `${file.name} se ha subido correctamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir el archivo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = (file: ValidationFile) => {
    onFileDelete(file.id);
    toast({
      title: "Archivo eliminado",
      description: `${file.file_name} ha sido eliminado`,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Archivos de Validación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${validationId}`}
              disabled={uploading}
            />
            <label
              htmlFor={`file-upload-${validationId}`}
              className="cursor-pointer"
            >
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {uploading ? 'Subiendo archivo...' : 'Haz clic para subir un PDF o arrastra aquí'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Solo archivos PDF, máximo 10MB
              </p>
            </label>
          </div>

          {/* Files List */}
          {files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">{file.file_name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.file_size)} • {formatDate(file.uploaded_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(file.file_url, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar archivo?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. El archivo "{file.file_name}" será eliminado permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleFileDelete(file)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No hay archivos adjuntos
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationFiles;

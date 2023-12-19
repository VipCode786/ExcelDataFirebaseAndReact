import React, { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX library for Excel operations
import { uploadDataToFirebase } from './firebaseService';

const ExcelUploader: React.FC = () => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          setExcelData(jsonData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpload = async () => {
    if (excelData.length > 0) {
        setUploadProgress(0); // Reset progress
    const uploadResult = await uploadDataToFirebase(excelData, (progress: number) => {
      setUploadProgress(progress); // Update progress state
    });
        //   const uploadResult = await uploadDataToFirebase(excelData);
      if (uploadResult) {
        // Show alert for successful upload
        // console.log("successfull Uploded")
        window.alert('Data uploaded successfully!');
        // Perform other actions after successful upload if needed
      } else {
        // Show alert for upload failure
        window.alert('Upload failed. Please try again.');
        // Perform other actions for handling failure if needed
      }
    } else {
      // Show alert when there's no data to upload
      window.alert('No data to upload.');
      // Perform other actions for handling no data scenario if needed
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload to Firebase</button>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div>
          <p>Uploading: {uploadProgress}%</p>
          <progress value={uploadProgress} max={100} />
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;

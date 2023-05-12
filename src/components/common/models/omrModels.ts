export interface IOmrBatchDetails {
  batchId: string;
  batchName: string;
  batchStatus: string;
}
export interface IOmrFile {
  fileId: string;
  filePath: string;
  fileName: string;
  processingStatus: string;
  batchId: string;
  batchName: string;
  createdOn: Date;
  createBy: string;
}
export interface IBatchListFormProps {
  batchList: IOmrBatchDetails[];
}
export interface IOmrListFormProps {
  omrs: IOmrFile[];
  handleDeleteOmr:(omrFile: IOmrFile) => any; 
}

import { FunctionComponent, useEffect, useState } from "react";
import { Inistitution } from "../institution";
import { IOmrBatchDetails } from "../../common/models/omrModels";
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import InstitutionSessionService from "../institution-services/institutionSessionService";
import { IAutoCompleteOption } from "../../common/models/formModels";
import { TextField } from "@mui/material";
export const InistituteOMRList: FunctionComponent = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [batchId, setBatchId] = useState<string>(params.batchId ?? "");
  const [allBatchDetails, setAllBatchDetails] = useState<IOmrBatchDetails[]>();
  const [batchOptions, setBatchOptions] = useState<IAutoCompleteOption[]>([]);
  const [activeBatchDetails, setActiveBatchDetails] =
    useState<IOmrBatchDetails>();
  const [selectedBatch, setSelectedBatch] = useState<IAutoCompleteOption>();
  useEffect(() => {
    let allBatches = InstitutionSessionService.getBatchDetails();
    let batch = allBatches.find((b) => b.batchId === batchId);
    setAllBatchDetails(allBatches);
    setActiveBatchDetails(batch);
    let batchOptions = allBatches.map(
      (batch) =>
        ({
          id: batch.batchId,
          label: batch.batchName,
        } as IAutoCompleteOption)
    );
    setBatchOptions(batchOptions);
    let sbatch = batchOptions.find((i) => i.id === batchId);
    setSelectedBatch(sbatch);
  }, [batchId]);
  const handleBatchChange = (newValue: IAutoCompleteOption | null) => {
    setSelectedBatch(newValue ?? undefined);
    navigate(`/institute/batch/${newValue?.id}/omrlist`, { replace: true });
    setBatchId(newValue?.id ?? '');
  };
  return (
    <Inistitution>
      <div>
        <Autocomplete
          disableClearable
          value={selectedBatch}
          inputValue={selectedBatch?.label}
          onChange={(event, newInputValue) => {
            handleBatchChange(newInputValue);
          }}
          id="controllable-states-demo"
          options={batchOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Batches" />}
        />
      </div>

      <div>{selectedBatch?.label}</div>
    </Inistitution>
  );
};

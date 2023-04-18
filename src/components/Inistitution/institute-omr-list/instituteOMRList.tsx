import { FunctionComponent } from "react";
import { Inistitution } from "../institution";
import { IOmrBatchDetails } from "../../common/models/omrModels";

export const InistituteOMRList: FunctionComponent<IOmrBatchDetails> = (props : IOmrBatchDetails) => {
  return (
    <Inistitution>
      <div>OMR List</div>
    </Inistitution>
  );
};

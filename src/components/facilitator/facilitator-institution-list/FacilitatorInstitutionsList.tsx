import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { toast } from "react-toastify";
import FacilitatorService from "../facilitator-services/facilitatorService";
import { IInstitutionResponse } from "../models/IInstitutionResponse";
import { Facilitator } from "../facilitator";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import DownloadIcon from "@mui/icons-material/Download";
import { GridApi } from "ag-grid-community";
import moment from 'moment';

export const FacilitatorInstitutionsList: FunctionComponent = (props) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [institutionList, setInstitutionList] = useState<
    IInstitutionResponse[]
  >([]);
  useEffect(() => {
    FacilitatorService.getInstitutions()
      .then((res: IHTTPResponse<IAPIResponse<IInstitutionResponse>>) => {
        if (res?.data?.errors?.length > 0) {
          let errorMessage = "";
          res?.data?.errors.forEach((i) => {
            if (errorMessage !== "") {
              errorMessage += "\n";
            }
            errorMessage += i.field + " : " + i.message;
          });
          toast.error(errorMessage);
        }
        if (res.data !== null || res.data !== undefined) {
          setInstitutionList(res.data.list);
        }
      })
      .catch(() => {
        toast.error("Error in Fetching Student Count");
      });
  }, []);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", filter: true },
    { field: "coOrdinatorName", filter: true },
    // { field: "district", filter: true },
    // { field: "address", filter: true },
    { field: "email", filter: true },
    { field: "mobile", filter: true },

    // { field: "coOrdinatorEmail", filter: true },
    { field: "state", filter: true },
    // { field: "coOrdinatorMobile", filter: true },
     { field: "code", filter: true },
    // { field: "userName", filter: true },
      { field: "createdOn", filter: true, cellRenderer: (data: any) => { return moment(data.value).format('d MMM yyyy HH:mm'); } },
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  const handleGridReady = (gridParams : any) => {   
    setGridApi(gridParams.api);   
    gridParams.api.sizeColumnsToFit();
  };
  const getValue = (inputSelector : any) => {
    var text = document.querySelector(inputSelector).value;
    debugger;
    switch (text) {
      case 'none':
        return;
      case 'tab':
        return '\t';
      default:
        return text;
    }
  };
  const getParams = () => {
    return {
      fileName: 'Institutions.csv',
      allColumns: true,
      processCellCallback : function(cellParams : any) {
        if(cellParams && cellParams.column.colId === 'createdOn') {
          return moment(cellParams.value).format('d MMM yyyy HH:mm');     
        } else 
               return cellParams.value // no formatting
     }
    };
  };
  const handleDownloadClick = () => {
    gridApi?.exportDataAsCsv(getParams());
  };

  return (
    <Facilitator>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid container justifyContent="flex-end">
                <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownloadClick}>
                  Download Institutions
                </Button>
              </Grid>

              <div
                className="ag-theme-alpine"
                style={{
                  height: "500px",
                  width: "100%",
                  marginTop: "5px",
                }}
              >
                <AgGridReact
                 onGridReady={handleGridReady}               
                  gridOptions={{
                    pagination: true,
                    paginationPageSize: 10,
                    defaultColDef: {
                      filter: true,
                      flex: 1,
                      floatingFilter: false,
                      resizable: true,
                      sortable: true,
                    },
                  }}
                  rowData={institutionList} // Row Data for Rows
                  columnDefs={columnDefs} // Column Defs for Columns
                  animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                  rowSelection="multiple" // Options - allows click selection of rows
                  onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Facilitator>
  );
};

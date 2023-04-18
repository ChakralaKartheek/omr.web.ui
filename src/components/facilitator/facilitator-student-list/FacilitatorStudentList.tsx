import {
    Autocomplete,
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
  TextField,
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
import moment from "moment";
import { IListItem } from "../../common/interfaces/list-item";
import { IStudentListResponse } from "../models/IStudentsListResponse";

export const FacilitatorStudentList: FunctionComponent = (props) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [InstitutionListItems,setInstitutionListItems] = useState<IListItem[]>([]);
  const [studentsList,setStudentList]= useState<IStudentListResponse[]>([]);
  const [institutionValue, setInstitutionValue] = useState<IListItem | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [institutionList, setInstitutionList] = useState<
    IInstitutionResponse[]
  >([]);
  useEffect(() => {
    FacilitatorService.getInstitutionsList()
      .then((res: IHTTPResponse<IAPIResponse<IListItem>>) => {
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
            setInstitutionListItems(res.data.list);
        }
      })
      .catch(() => {
        toast.error("Error in Fetching Institution List Items");
      });
  }, []);

  useEffect(() => { 
    if(institutionValue !== null){
        FacilitatorService.getStudentList(institutionValue.id)
        .then((res: IHTTPResponse<IAPIResponse<IStudentListResponse>>) => {
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
            setStudentList(res.data.list);
          }
        })
        .catch(() => {
          toast.error("Error in Fetching Student List");
        });
    }else{
      setStudentList([]);
    }

  }, [institutionValue]);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "firstName", filter: true },
    { field: "lastName", filter: true },
   
    { field: "studentClass", filter: true },
    { field: "mobileNumber", filter: true },

    { field: "section", filter: true },
    { field: "userName", filter: true },
     { field: "rollNumber", filter: true },
     { field: "classCode", filter: true },
     { field: "institutionCode", filter: true },
    // {
    //   field: "createdOn",
    //   filter: true,
    //   cellRenderer: (data: any) => {
    //     return moment(data.value).format("d MMM yyyy HH:mm");
    //   },
    // },
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  const handleGridReady = (gridParams: any) => {
    setGridApi(gridParams.api);
    gridParams.api.sizeColumnsToFit();
  };
 
  const getParams = () => {
    return {
      fileName: "Institutions.csv",
      allColumns: true,
      processCellCallback: function (cellParams: any) {
        if (cellParams && cellParams.column.colId === "createdOn") {
          return moment(cellParams.value).format("d MMM yyyy HH:mm");
        } else return cellParams.value; // no formatting
      },
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
              <Grid container >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={InstitutionListItems}
                  sx={{ width: 300 }}
                  onChange={(event, newValue) => {
                    setInstitutionValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Institutions" />
                  )}
                />
              </Grid>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadClick}
                >
                  Download Students
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
                  rowData={studentsList} // Row Data for Rows
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

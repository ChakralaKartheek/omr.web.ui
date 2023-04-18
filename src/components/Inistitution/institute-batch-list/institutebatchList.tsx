import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Inistitution } from "../institution";
import InstitutionService from "../institution-services/institutionService";
import { TokenUserHelper } from "../../common/services/token-user-service";
import { IOmrBatchDetails } from "../../common/models/omrModels";
import { toast } from "react-toastify";

export const InistituteBatchList: FunctionComponent = (props) => {
  const tokenUser = TokenUserHelper.Get();
  const [batchList, setBatchList] = useState<IOmrBatchDetails[]>([]);

  const loadBatchList = () => {
    debugger;
    InstitutionService.getBatchList(tokenUser.UserId)
    .then((res) => {
      if (res.status !== 200) {
        toast.error("Error in retriving batch list");
      }

      setBatchList(res.data);
    })
    .catch(() => {
      toast.error("Error in retriving batch list");
    });
  };

    useEffect(()=>{
      loadBatchList();
    },[]);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
    
  return (
    <Inistitution>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Batch Name</StyledTableCell>
                <StyledTableCell >Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batchList.map((batch) => (
                <StyledTableRow key={batch.BatchId}>
                  <StyledTableCell component="th" scope="row">
                    {batch.BatchName}
                  </StyledTableCell>
                  <StyledTableCell >
                    {batch.BatchStatus}
                  </StyledTableCell>
              
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Inistitution>
  );
};

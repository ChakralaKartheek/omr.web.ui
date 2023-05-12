import {
  Avatar,
  Box,
  Button,
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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import { Inistitution } from "../institution";
import InstitutionService from "../institution-services/institutionService";
import { TokenUserHelper } from "../../common/services/token-user-service";
import { IOmrBatchDetails } from "../../common/models/omrModels";
import { toast } from "react-toastify";
import { TabPanel } from "@mui/lab";
import { InistituteBatchListTabView } from "./batchListTabView";


export const InistituteBatchList: FunctionComponent = (props) => {
  const tokenUser = TokenUserHelper.Get();
  const [batchList, setBatchList] = useState<IOmrBatchDetails[]>([]);

  const loadBatchList = () => {
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

  useEffect(() => {
    loadBatchList();
  }, []);

  return (
    <Inistitution>
      <InistituteBatchListTabView batchList={batchList}></InistituteBatchListTabView>
    </Inistitution>
  );
};

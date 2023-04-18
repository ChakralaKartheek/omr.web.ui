import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { toast } from "react-toastify";
import { AccountCircle } from "@mui/icons-material";
import InstitutionStudentService from "../Inistitution/institution-services/institutionService";
import { IAPIResponse, IHTTPResponse } from "../common/models/httpModels";

export const StudentInfo: FunctionComponent = (props) => {

    const [studentName, setStudentName] = useState<string>('');
    const [section, setSection] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');


    useEffect(() => {
        InstitutionStudentService.getStudentInfo()
            .then((res: IHTTPResponse<IAPIResponse<any>>) => {
                const student = res.data.data;
                setStudentName(student.firstName + ' ' + student.lastName)
                setSection(student.section + ' :' + student.classCode);
                setMobileNumber(student.mobileNumber);
            })
            .catch(() => {
                toast.error("Error in Fetching Student Count");
            });
    }, []);


    return (
        <Card sx={{ height: "100%", width: "98%" , py: 4}}>
            <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom variant="overline">
                            Welcome,
                        </Typography>
                        <Typography color="textPrimary" variant="h4">{studentName}</Typography>
                        <Typography color="textSecondary" gutterBottom variant="overline">Section:</Typography>

                        <Typography color="textPrimary" variant="h4">{section}</Typography>

                        <Typography color="textSecondary" gutterBottom variant="overline">Mobile:</Typography>
                        <Typography color="textPrimary" variant="h4">{mobileNumber}</Typography>

                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: "primary.main",
                                height: 56,
                                width: 56,
                            }}
                        ><AccountCircle />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

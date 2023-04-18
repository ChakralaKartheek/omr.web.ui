import * as React from "react";
import { FunctionComponent } from "react";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Box from "@mui/material/Box";
import { Home } from "./components/home/home";
import { InistitutionProfile } from "./components/Inistitution/institute-profile/instituteProfile";
import { InistitutionRegistration } from "./components/Inistitution/institute-registration/instituteRegistration";
import { InstituteLogin } from "./components/login/instituteLogin";
import { InistitutionHome } from "./components/Inistitution/institute-home/inistituteHome";
import { InistituteOMRResults } from "./components/Inistitution/institution-omr-results/institutionOmrResults";
import { InistituteStudentUpload } from "./components/Inistitution/institution-students-upload/institutionStudentUpload";
import { InistituteBatchList } from "./components/Inistitution/institute-batch-list/institutebatchList";
import { StudentHome } from "./components/Student/StudentHome";
import { StudentExam } from "./components/Student/StudentExam";
import { FacilitatorHome } from "./components/facilitator/facilitator-home/FacilitatorHome";
import { FacilitatorInstitutionsList } from "./components/facilitator/facilitator-institution-list/FacilitatorInstitutionsList";
import { FacilitatorStudentList } from "./components/facilitator/facilitator-student-list/FacilitatorStudentList";
import { InistituteOMRList } from "./components/Inistitution/institute-omr-list/instituteOMRList";

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<InstituteLogin />} />
          <Route path="/User/Login" element={<InstituteLogin />} />
          <Route
            path="/institute/Registration"
            element={<InistitutionRegistration />}
          />
          <Route path="/institute/Home" element={<InistitutionHome />} />
          <Route path="/institute/Profile" element={<InistitutionProfile />} />
          <Route path="/institute/UploadStudents" element={<InistituteStudentUpload />} />
          <Route path="/institute/OMRResults" element={<InistituteOMRResults />} />
          <Route path="/institute/OMRList" element={<InistituteOMRList BatchId={""} BatchName={""} BatchStatus={""} />} />
          <Route path="/Student/Home" element={<StudentHome />} />
          <Route path="/Student/Exam" element={<StudentExam />} />
          <Route path="/institute/BatchList" element={<InistituteBatchList />} />
          <Route path="/Facilitator/Home" element={<FacilitatorHome />} />
          <Route path="/Facilitator/Institutions" element={<FacilitatorInstitutionsList />} />
          <Route path="/Facilitator/Students" element={<FacilitatorStudentList />} />
 
        </Routes>
      </Router>
    </Box>
  );
};

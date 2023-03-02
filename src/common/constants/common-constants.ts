import * as React from "react";

export class CommonConstants {
    public static readonly BaseAddress =  "/WebApi";

    public static readonly Routes = class {
        public static readonly InstituteDashboard = '/institute/Home';
        public static readonly Home = '/home';
        public static readonly Login = '/';
        public static readonly InstituteProfile = '/institute/Profile';
    }

    public static readonly ApiConstants = class {
        public static readonly Login = '/User/Login';
        public static readonly Register = '/Institution/Register';
        public static readonly InstituteProfile = '/Institution/Profile';
        public static readonly InstitutionsCount = '/Institution/Count';
        public static readonly StudentsCount = '/Student/Count';
        public static readonly InstitutionsAll = '/Institution/All';
        public static readonly StudentsUpload = '/Institution/UploadStudents';
        public static readonly SaveUploadedStudents = '/Institution/SaveStudents';
        public static readonly InstituteStudentCount = '/Institution/StudentsCount';
        public static readonly InstituteGetStudentInfo = '/Institution/GetStudentInfo';
        public static readonly InstitutionListItem = '/Institution/ListItems';
        public static readonly StudentList = '/Student/List';
        public static readonly InstitutionAllStudents = '/Institution/AllStudents';
    }

    public static readonly Constants = class {
        public static readonly cookieKey = "authenticate_user";
        public static readonly cookieExpiry = 5;
        public static readonly Program = "APPUSMA"

    }
}
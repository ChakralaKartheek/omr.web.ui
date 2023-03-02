import { CommonConstants } from "../constants/common-constants";
import { useNavigate } from "react-router-dom";

//

const save = (key: string, value: string): void => {
    var cookieValue = key + "=" + value + ";path=/";
    document.cookie = cookieValue;
};
const remove = (key: string): void => {
    document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const get = (key: string): string => {
    if (key) {
        var match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
        if (match)
            return match[2];
    } else {
        let cookies = document.cookie.split(';');

        let name = key + "=";
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);;
            }
        }
    }
    return "";
}

const saveLogonSession = (logonTokenValue: string): void => {
    try {
        const d = new Date();
        const cookieName = "authenticate_user";
        d.setTime(d.getTime() + (5 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        var cookieValue = cookieName + "=" + logonTokenValue + ";" + expires + ";path=/";
        document.cookie = cookieValue;
    }
    catch (error) {
        console.log(error);
    }

};

const deleteLogonSession = (cookieName?: string): void => {
    if (cookieName) {
        document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } else {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
};
const logOut = () => {
    deleteLogonSession();
    window.location.href = CommonConstants.Routes.Login;
}

const getCookie = (cookieName?: string): string => {
    if (cookieName) {
        var match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
        if (match)
            return match[2];
    } else {
        let cookies = document.cookie.split(';');

        let name = CommonConstants.Constants.cookieKey + "=";
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);;
            }
        }
    }
    return "";
}

const checkLogOnSession = (value: string, cookieName?: string): void => {
    //const navigate = useNavigate();
    saveLogonSession(value);
    //if (!getCookie(cookieName)) {
    //    let url = `${CommonConstants.Routes.Login}`;
    //    //navigate(url);
    //} else {
    //    saveLogonSession(value);
    //}
}


const CookieHelper = {
    saveLogonSession,
    deleteLogonSession,
    logOut,
    getCookie,
    checkLogOnSession,
    save,
    remove,
    get
}

export default CookieHelper;
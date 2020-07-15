import axios, { AxiosError } from "axios";

export const setAxiosDefaultToken = () => {
    const token = localStorage.getItem("Token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const configureAxiosInterceptors = (): void => {
    axios.interceptors.response.use(
        (r) => r,
        (error: AxiosError) => {
            console.log(`%cStart of error message`, "color: orange");
            console.log(error.response!);
            console.log(`%cEnd of error`, "color: orange");
            handleAxiosError(error);
            return Promise.reject(error);
        }
    );
};

const handleAxiosError = (error: AxiosError): void => {
    const message = {
        body: "Internal Server Error",
        request: "",
        status: 500,
    };
    if (typeof error !== "undefined") {
        console.log("typeof error !== undefined");
        if (error.hasOwnProperty("message")) {
            console.log("Has property message");
            message.body = error.message;
        }
    }
    if (typeof error.response !== "undefined") {
        console.log("typeof error.response !== undefined");
        switch (error.response.status) {
            case 401:
                console.log("Status is 401");
                message.body = "Unauthorized";
                break;
            case 404:
                console.log("Status is 404");
                message.body = "API Route is Missing or Undefined";
                break;
            case 405:
                console.log("Status is 405");
                message.body = "Api Route Method Not Allowed";
                break;
            case 422:
                console.log("Status is 422");
                message.body = "NEEDS API MESSAGE";
                break;
            default:
                message.body = "Internal Server Error";
        }
        if (error.response.status > 0) {
            message.status = error.response.status;
        }
        if (
            error.hasOwnProperty("response") &&
            error.response.hasOwnProperty("data")
        ) {
            if (
                error.response.data.hasOwnProperty("message") &&
                error.response.data.message.length > 0
            ) {
                message.body = error.response.data.message;
            }
        }
    }
    console.log(
        `%cXHR Error - ${message.status} (${message.body})`,
        "color: red;"
    );
};

import { errorMsgApi, successfully } from "../../../../Core/tosts";
import { API } from "../../../../Core/url";

export const payrollCreateApi = async ({ token, payroll }) => {
  try {
    await API.post(`/hr/payroll`, payroll, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successfully("Updated...!");
    return {
      status: true,
    };
  } catch (error) {
    console.log("error", error);

    let errMsg = error?.response?.data?.message || "Failed to Add Employees";
    errorMsgApi(errMsg);
    return {
      status: false,
      errMsg,
    };
  }
};

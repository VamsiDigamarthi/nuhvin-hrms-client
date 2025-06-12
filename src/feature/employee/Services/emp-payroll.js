import { errorMsgApi } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getPayrollApi = async ({ page, limit, month, token, status }) => {
  try {
    const query = `/employee/payroll?page=${page}&limit=${limit}&month=${month}&status=${status}`;

    const res = await API.get(query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: true, res: res?.data ?? [] };
  } catch (error) {
    console.log("error".error);

    let mes = error?.response?.data?.message || "Something went wrong";
    errorMsgApi(mes);
    return {
      status: false,
      error: mes,
    };
  }
};

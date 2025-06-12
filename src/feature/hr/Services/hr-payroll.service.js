import { errorMsgApi } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getPayrollEveryMonth = async ({
  token,
  month,
  page,
  limit = 10,
  search,
}) => {
  try {
    const query = `/hr/payroll?page=${page}&limit=${limit}&month=${month}${
      search ? `&search=${search}` : ""
    }`;

    const res = await API.get(query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: true, res: res?.data ?? [] };
  } catch (error) {
    let mes = error?.response?.data?.message || "Something went wrong";
    errorMsgApi(mes);
    return {
      status: false,
      error: mes,
    };
  }
};

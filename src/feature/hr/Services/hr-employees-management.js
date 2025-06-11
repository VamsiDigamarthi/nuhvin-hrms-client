import { errorMsgApi } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const getEmployees = async ({
  token,
  page,
  limit,
  department,
  status,
  search,
}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (status) queryParams.append("status", status);
  if (department) queryParams.append("department", department);
  if (search) queryParams.append("search", search);

  try {
    const res = await API.get(`/hr/employees?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: true,
      apiRes: res?.data,
    };
  } catch (error) {
    let errMsg = error?.response?.data?.message || "Failed to Fetch Employees";
    errorMsgApi(errMsg);
    return {
      status: false,
      errMsg,
    };
  }
};

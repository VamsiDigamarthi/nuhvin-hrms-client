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

export const addNewEmployeeApi = async ({ token, apiData }) => {
  try {
    await API.post(`/hr/employees`, apiData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: true,
    };
  } catch (error) {
    let errMsg = error?.response?.data?.message || "Failed to Add Employees";
    errorMsgApi(errMsg);
    return {
      status: false,
      errMsg,
    };
  }
};

export const updateEmployeeProfile = async (id, payload, token) => {
  try {
    const { data } = await API.put(
      `/hr/employees/${id}`, // or your actual endpoint
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, apiRes: data };
  } catch (error) {
    errorMsgApi(error.response?.data?.message || "Failed to Update");

    return {
      status: false,
      errMsg: error.response?.data?.message || error.message,
    };
  }
};

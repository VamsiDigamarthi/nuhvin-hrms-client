import { errorMsgApi } from "../../../Core/tosts";
import { API } from "../../../Core/url";

export const hrLeavesGetApi = async ({
  token,
  page,
  limit,
  status,
  leaveType,
}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (status) queryParams.append("status", status);
  if (leaveType) queryParams.append("leaveType", leaveType);

  try {
    const res = await API.get(`/hr/leaves?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: true,
      apiRes: res?.data,
    };
  } catch (error) {
    let errMsg = error?.response?.data?.message || "Something went Wrong";
    errorMsgApi(errMsg);
    return {
      status: false,
      errMsg,
    };
  }
};

export const leaveStatusChange = async ({ token, id, status, hrNote }) => {
  try {
    await API.patch(
      `/hr/leave-status/${id}`,
      { status, hrNote },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: true,
    };
  } catch (error) {
    let errMsg = error?.response?.data?.message || "Something went Wrong";
    errorMsgApi(errMsg);
    return {
      status: false,
      errMsg,
    };
  }
};

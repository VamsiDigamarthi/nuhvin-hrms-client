import { API } from "../../../Core/url";
import { errorMsgApi, successfully } from "../../../Core/tosts";

export const postLeaveApi = async ({ token, data }) => {
  try {
    const formData = new FormData();

    // Append form data fields
    formData.append("leaveType", data.leaveType);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("numberOfDays", data.numberOfDays);
    formData.append("reason", data.reason);

    if (data.document && data.document[0]) {
      formData.append("image", data.document[0]); // backend expects 'image'
    }

    await API.post("/employee/apply-leaves", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    successfully("Apply Leaves successfully");
    return { status: true };
  } catch (error) {
    let errMsg = error?.response?.data?.message || "Something went Wrong";
    errorMsgApi(errMsg);
    return {
      status: false,
    };
  }
};

export const getLeavesApi = async ({ token, date }) => {
  try {
    const res = await API.get(`/employee/apply-leaves?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, apiRes: res.data };
  } catch (error) {
    let errMsg = error?.response?.data?.message || "Something went Wrong";
    errorMsgApi(errMsg);
    return {
      status: false,
      errMsg,
    };
  }
};

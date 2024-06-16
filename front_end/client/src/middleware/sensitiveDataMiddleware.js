/**
 * Middleware để loại bỏ thông tin nhạy cảm khỏi payload của actions.
 */
const sensitiveDataMiddleware = (store) => (next) => (action) => {
  // Danh sách các action types cần lọc thông tin nhạy cảm
  const sensitiveActions = [
    "user/login/fulfilled",
    "user/register/fulfilled",
    "user/sendOTP/fulfilled",
    "user/resetPassword/fulfilled",
  ];

  if (sensitiveActions.includes(action.type)) {
    // Tạo một bản sao của action để không thay đổi trực tiếp vào action gốc
    const newAction = { ...action, payload: { ...action.payload } };

    // Loại bỏ thông tin nhạy cảm khỏi payload
    delete newAction.payload.password;
    delete newAction.payload.otp;

    // Chuyển modified action đến middleware hoặc reducer tiếp theo
    return next(newAction);
  }

  // Đối với các action khác, không thay đổi gì
  return next(action);
};

export default sensitiveDataMiddleware;

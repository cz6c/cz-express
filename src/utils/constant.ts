const CODE_ERROR = 400; // 请求响应失败c
const CODE_SUCCESS = 200; // 请求响应成功
const CODE_TOKEN_EXPIRED = 401; // 授权失败
const PRIVATE_KEY = "cz6"; // 自定义jwt加密的私钥
const JWT_EXPIRED = 60 * 60 * 6; // 过期时间6小时

export {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKEN_EXPIRED,
  PRIVATE_KEY,
  JWT_EXPIRED,
};

export enum ConstantEnum {
  CODE_ERROR = 400, // 请求响应失败c
  CODE_SUCCESS = 200, // 请求响应成功
  CODE_TOKEN_EXPIRED = 401, // 授权失败
  JWT_PRIVATE_KEY = "cz6", // 自定义jwt加密的私钥
  JWT_EXPIRED = "6d", // 过期时间6小时
  JWT_TOKEN_KEY = "ctoken", // 请求头携带token的键名
}

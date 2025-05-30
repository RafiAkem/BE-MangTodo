class BaseResponse {
  constructor(param) {
    if (param?.message) {
      // For register response
      this.message = param.message;
    } else {
      // For other responses
      this.status = param?.status;
      this.message = param?.message;
      this.data = param?.data;
    }
  }
}

module.exports = BaseResponse;

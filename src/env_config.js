const serverUrl = require("./config.json");
// Determines the host and redirects traffic respective from production to test /staging
function env_config() {
  if (
    window.location.hostname === serverUrl.PRODUCTION_URL ||
    window.location.hostname === serverUrl.ALT_PRODUCTION_URL
  ) {
    return serverUrl.BASE_URL;
  } else if (window.location.hostname === serverUrl.TEST_URL) {
    return serverUrl.BASE_URL_TEST;
  } else if (window.location.hostname === serverUrl.LOCAL_URL) {
    return serverUrl.BASE_URL_TEST;
  } else {
    return serverUrl.BASE_URL_TEST;
  }
}
let addr = env_config();
export default addr;

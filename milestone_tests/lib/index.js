// A file is required to be in the root of the /src directory by the TypeScript compiler
// DÉCLARATION CONSTANTES ICI
import axios from 'axios';
import qs from 'qs';
var APP_ID = '129b1ec7-ae76-49d6-92a4-0a91e4365ff6';
var APP_SECRET = 'DZg[SP_@N1[YXWddxVuYj24R3bjhExZh';
var TOKEN_ENDPOINT = 'https://login.microsoftonline.com/1e5f0022-7501-41fd-9207-0d6dc8077daf/oauth2/v2.0/token';
var MS_GRAPH_SCOPE = 'https://graph.microsoft.com/.default';
var postData = {
    client_id: APP_ID,
    scope: MS_GRAPH_SCOPE,
    client_secret: APP_SECRET,
    grant_type: 'client_credentials'
};
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
axios
    .post(TOKEN_ENDPOINT, qs.stringify(postData))
    .then(function (response) {
    console.log(response.data);
})
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map
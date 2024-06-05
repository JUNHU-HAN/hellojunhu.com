const axios = require('axios');
const qs = require('querystring');

exports.handler = async (event, context) => {
    const code = event.queryStringParameters.code;
    const KAKAO_CLIENT_ID = '5c0e307ebac944c8a06184eff739a881';
    const KAKAO_REDIRECT_URI = 'https://hellojunhu.com/.netlify/functions/kakao-callback';
    const KAKAO_CLIENT_SECRET = 'Qu9oEsJR3ruoU2Bsw44ttHcqBwdiiwZI';

    try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', qs.stringify({
            grant_type: 'authorization_code',
            client_id: 5c0e307ebac944c8a06184eff739a881,
            redirect_uri: https://hellojunhu.com,
            code,
            client_secret: Qu9oEsJR3ruoU2Bsw44ttHcqBwdiiwZI
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = response.data;
        const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(userInfo.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};


import http from 'k6/http';
import { check } from 'k6';
import { formHeaders } from './headers.js';


export function login(usuario) {
    const baseUrl = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';
    //console.log('BASE_URL recebida pelo k6:', baseUrl);
    const loginPageUrl = `${baseUrl}/minha-conta/`;

    // 1️⃣ GET da página de login (para obter nonce)
    const loginPageRes = http.get(loginPageUrl);

    const pageOk = check(loginPageRes, {
        'Login page carregou': (r) => r.status === 200 && r.body,
    });

    if (!pageOk) {
        return null;
    }

    // 2️⃣ Extrair nonce do WooCommerce
    const nonceMatch = loginPageRes.body.match(
        /name="woocommerce-login-nonce"\s*value="([^"]+)"/
    );

    if (!nonceMatch) {
        return null;
    }

    const nonce = nonceMatch[1];

    // 3️⃣ POST de login (form-urlencoded)
    const payload = {
        username: usuario.username,
        password: usuario.password,
        login: 'Login',
        'woocommerce-login-nonce': nonce,
        _wp_http_referer: '/minha-conta/',
    };

    const loginRes = http.post(loginPageUrl, payload, {
        headers: formHeaders(),
        redirects: 0,
    });

    const loginOk = check(loginRes, {
        'Login POST status válido': (r) =>
            r.status === 200 || r.status === 302,
    });

    if (!loginOk) {
        return null;
    }

    // 4️⃣ Retorna cookies de sessão (WordPress)
    return loginRes.cookies;
}

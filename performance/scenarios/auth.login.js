import { usuarios } from '../payloads/login.payload.js';
import { login } from '../utils/auth.js';

export default function () {
    const usuario =
        usuarios[Math.floor(Math.random() * usuarios.length)];

    login(usuario);
}

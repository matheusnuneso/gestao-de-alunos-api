import { api } from './api.js';
import app from '../../src/app.js';

import 'dotenv/config';

export async function comTokenDeAdmin() {
    return `Bearer ${await getToken(process.env.ADMIN_EMAIL, process.env.ADMIN_SENHA)}`
}

export async function comTokenDeAluno() {
    return `Bearer ${await getToken(process.env.ALUNO_EMAIL, process.env.ALUNO_SENHA)}`
}

export async function getToken(emailUser, passUser) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({ 
            email: emailUser, 
            senha: passUser
        });
    return loginResposta.body.token;
}
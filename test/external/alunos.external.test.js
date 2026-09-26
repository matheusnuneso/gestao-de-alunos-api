import { expect } from 'chai';
import { comTokenDeAdmin } from '../helper/login.js';
import { api } from '../helper/api.js';
import Aluno from '../../src/models/aluno.model.js';
import alunos from '../fixtures/alunos.json' with { type: 'json' };

let token;

beforeEach(async () => {
    token = await comTokenDeAdmin();

    await Aluno.deleteOne({
        $or: [
            { email: 'matheus.nunes@example.com' },
            { matricula: '2026-0009' },
        ],
    });
});

describe('Alunos External', () => {
    for (const caso of alunos) {
        it(caso.testTitle, async () => {
            
            const cadastroAlunoResposta = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', token)
                .send({
                    nome: caso.nome,
                    email: caso.email,
                    matricula: caso.matricula,
                    senha: caso.senha,
                });

            expect(cadastroAlunoResposta.status).to.equal(caso.statusCodeEsperado);

            if (caso.statusCodeEsperado === 201) {
                expect(cadastroAlunoResposta.body.nome).to.equal(caso.nome);
                expect(cadastroAlunoResposta.body.email).to.equal(caso.email);
                expect(cadastroAlunoResposta.body.matricula).to.equal(caso.matricula);
            }
        });
    }
});
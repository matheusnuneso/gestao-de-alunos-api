import { expect } from 'chai';
import { comTokenDeAluno } from '../helper/login.js';
import { api } from '../helper/api.js';
import trabalhos from '../fixtures/trabalhos.json' with { type: 'json' };

let token;

beforeEach(async () => {
    token = await comTokenDeAluno();
});

describe('Trabalhos External', () => {
    for (const caso of trabalhos) {

        it(caso.testTitle, async () => {
            const resposta = await api()
                .post(`/api/alunos/${caso.alunoId}/trabalhos`)
                .set('Content-Type', 'application/json')
                .set('Authorization', token)
                .send({
                    disciplinaId: caso.disciplinaId,
                    titulo: caso.titulo,
                    descricao: caso.descricao,
                });

            expect(resposta.status).to.equal(caso.statusCodeEsperado);
            expect(resposta.body.alunoId).to.equal(caso.alunoId);
            expect(resposta.body.disciplinaId).to.equal(caso.disciplinaId);
            expect(resposta.body.titulo).to.equal(caso.titulo);
            expect(resposta.body.descricao).to.equal(caso.descricao);
            expect(resposta.body.status).to.equal('entregue');
        })

    }
})
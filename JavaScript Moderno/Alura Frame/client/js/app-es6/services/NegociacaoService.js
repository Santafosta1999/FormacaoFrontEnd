import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

//Classe para obter irformações do aquivo JSON
export class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }
    obterNegociacoesDaSemana(url, semana = '') {
        //Recebe o retorno de uma Promise e retorna ela novamente
        return this._http
            //Passar endereço do arquivo JSON
            .get(url)
            .then(negociacoes => {
                /*Recebe as negociações do resolve
                da Promisse, e para cada uma cria
                uma negociação baseada no modelo e
                faz o retorno do modelo*/
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            //Trata os erros retornados pelo reject da Promisse
            .catch(erro => {
                console.log(erro);
                throw new Error(`Não foi possível obter as negociações da semana ${semana}`);
            });
    }
    //Junta todas as negociações obtidas e retorna uma Promisse completa
    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(
                'http://localhost:3000/negociacoes/semana'),
            this.obterNegociacoesDaSemana(
                'http://localhost:3000/negociacoes/anterior', ' anterior'),
            this.obterNegociacoesDaSemana(
                'http://localhost:3000/negociacoes/retrasada', 'retrasada') 
        ])
        //Percorre os 3 arrays gerados nas semanas, concatena e retorna em 1 só array
        .then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        })
        //Tratamento de erros
        .catch(erro => {
            throw new Error(erro);
        });
    }
    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a Negociação');
            });
    }
    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as Negociações')
            });
    }
    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as Negociações')
            });
    }
    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)
                    ) 
                )
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar')
            });
    }
}
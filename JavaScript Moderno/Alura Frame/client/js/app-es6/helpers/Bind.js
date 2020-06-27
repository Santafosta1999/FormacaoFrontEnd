import { ProxyFactory } from '../services/ProxyFactory';

//Classe para realizar o Data Binding entre Modelo e View que retorna um Proxy
export class Bind {
    /*Construtor recebe Modelo, View,
    e os argumentos posteriores são 
    passados para o parâmetro "props"
    pelo spread operator*/
    constructor(model, view, ...props) {
        //Criacao de Proxy para o modelo
        let proxy = ProxyFactory.create(model, props, model =>
            //Armadilha para atualizar a view automaticamente
            view.update(model)
        );
        /*Atualizar a view pela primeira vez para a tabela
        já aparecer desde o carregamento da página*/
        view.update(model);
        return proxy;
    }
}
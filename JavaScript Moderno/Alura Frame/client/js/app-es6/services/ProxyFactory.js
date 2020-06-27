//Classe para realizar a criação de Proxy
export class ProxyFactory {
    //Recebe o objeto, as propriedades e as acões e retorna um Proxy
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver); 
            },
            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    acao(target);
                }
                return retorno;
            }
        });
        
    }
    //Verifica se a propriedade é função
    static _ehFuncao(func) {
        return typeof(func) == typeof(Function);        
    }
}
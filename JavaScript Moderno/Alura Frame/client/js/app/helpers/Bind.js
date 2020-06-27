'use strict';

System.register(['../services/ProxyFactory'], function (_export, _context) {
    "use strict";

    var ProxyFactory, Bind;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesProxyFactory) {
            ProxyFactory = _servicesProxyFactory.ProxyFactory;
        }],
        execute: function () {
            _export('Bind', Bind =
            /*Construtor recebe Modelo, View,
            e os argumentos posteriores são 
            passados para o parâmetro "props"
            pelo spread operator*/
            function Bind(model, view) {
                _classCallCheck(this, Bind);

                for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    props[_key - 2] = arguments[_key];
                }

                //Criacao de Proxy para o modelo
                var proxy = ProxyFactory.create(model, props, function (model) {
                    return (
                        //Armadilha para atualizar a view automaticamente
                        view.update(model)
                    );
                });
                /*Atualizar a view pela primeira vez para a tabela
                já aparecer desde o carregamento da página*/
                view.update(model);
                return proxy;
            });

            _export('Bind', Bind);
        }
    };
});
//# sourceMappingURL=Bind.js.map
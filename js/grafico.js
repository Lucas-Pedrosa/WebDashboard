export class Grafico{

    constructor(acao, investigacao, policial, romance, terror){
        this.acao = acao;
        this.investigacao = investigacao;
        this.policial = policial;
        this.romance = romance;
        this.terror = terror;
    }

    getAcao(){
        return this.acao;
    }
}
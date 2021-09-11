import { Cnh } from "./cnh";
import { Endereco } from "./endereco";


export class Condutor {
    constructor(
        public id: number,
        public nome: string,
        public cpf: string,
        public dt_nasc: string,
        public genero: string,
        public cnh: Cnh,
        public enderco: Endereco,
    ) { }

}
import { Cnh } from "./cnh";
import { Endereco } from "./endereco";
import { OrdtrafegoC } from "./ordtrafegoC";

export class CondutorFull {
    constructor(
        public id: number,
        public nome: string,
        public cpf: string,
        public dt_nasc: string,
        public genero: string,
        public cnh: Cnh,
        public enderco: Endereco,
        public ord_traf: OrdtrafegoC
    ) { }

}
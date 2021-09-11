import { Marca } from "./marca";
import { Modelo } from "./modelo";

export class Veiculo {
    constructor(
        public id: number,
        public num_placa: string,
        public ano_fab: string,
        public descricao: string,
        public qtd_km: number,
        public est_conserv: string,
        public caegoria: string,
        public marca: Marca,
        public modelo: Modelo
    ) { }

}
import { CondutorOt } from "./condutorOT";
import { Veiculo } from "./veiculo";

export class Ordtrafego {
    constructor(
        public id: number,
        public origem: string,
        public destino: string,
        public dt_viagem: string,
        public distancia: number,
        public status: string,
        public veiculo: { id: number },
        public condutor: { id: number }
    ) { }

}
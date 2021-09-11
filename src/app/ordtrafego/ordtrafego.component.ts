import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Condutor } from 'src/model/condutor';
import { Ordtrafego } from 'src/model/ordtrafego';
import { OrdtrafegoFull } from 'src/model/ordtrafegoFull';
import { Veiculo } from 'src/model/veiculo';
import { CondutorService } from '../service/condutor.service';
import { OrdtrafegoService } from '../service/ordtrafego.service';
import { VeiculoService } from '../service/veiculo.service';
import { Table } from 'primeng/table';


interface Status {
  name: string,
  value: string
}

interface Veiculos {
  name: string,
  value: object
}

interface Condutores {
  name: string,
  value: object
}

@Component({
  selector: 'app-ordtrafego',
  templateUrl: './ordtrafego.component.html',
  styleUrls: ['./ordtrafego.component.scss']
})
export class OrdtrafegoComponent implements OnInit {

  ordtrafegos: OrdtrafegoFull[] = [];
  //ordtrafegos: Ordtrafego[] = [];
  veiculos: Veiculo[] = [];
  condutores: Condutor[] = [];
  items: MenuItem[] = [];
  status: Status[] = [];
  listaVeiculos: Veiculos[] = [];
  listaCondutores: Condutores[] = [];
  selectedOrdtrafego: Ordtrafego[] = [];
  displaySaveDialog: boolean = false;


  ordtrafego!: OrdtrafegoFull;
  ordtrafegoSave!: Ordtrafego;
  origem: string = "";
  destino: string = "";
  filtro: boolean = false;

  constructor(private ordtrafegoService: OrdtrafegoService, private veiculoService: VeiculoService, private condutorService: CondutorService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {

    this.status = [
      { name: 'Iniciado', value: 'INICIADO' },
      { name: 'Transito', value: 'TRANSITO' },
      { name: 'Concluido', value: 'CONCLUIDO' },
      { name: 'Cancelado', value: 'CANCELADO' },
    ]

    this.listaVeiculos;
    this.listaCondutores;
  }

  getAll() {
    this.ordtrafegoService.getAll().subscribe(
      (result: any) => {
        let ordtrafegos: OrdtrafegoFull[] = [];
        for (let i = 0; i < result.length; i++) {
          let ordtrafego = result[i] as OrdtrafegoFull;
          ordtrafegos.push(ordtrafego);
        }
        this.ordtrafegos = ordtrafegos;
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  getTrajeto() {
    this.filtro = true;
    this.ordtrafegoService.getTrajeto(this.origem, this.destino).subscribe(
      (result: any) => {
        let ordtrafegos: OrdtrafegoFull[] = [];
        for (let i = 0; i < result.length; i++) {
          let ordtrafego = result[i] as OrdtrafegoFull;
          ordtrafegos.push(ordtrafego);
        }
        this.ordtrafegos = ordtrafegos;
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  resetOrdtrafego() {
    this.ordtrafego = {
      id: 0,
      origem: "",
      destino: "",
      dt_viagem: "",
      distancia: 0,
      status: "",
      veiculo: {
        id: 0,
        num_placa: "",
        ano_fab: "",
        descricao: "",
        qtd_km: 0,
        est_conserv: "",
        caegoria: "",
        marca: { nomeMarca: "" },
        modelo: { nomeModelo: "" }
      },
      condutor: {
        id: 0,
        nome: "",
        cpf: "",
        dt_nasc: "",
        genero: "",
        cnh: {
          numCnh: 0,
          categoria: "",
          validade: "",
          obs: ""
        },
        enderco: {
          end: "",
          bairro: "",
          cep: "",
          estado: "",
          uf: ""
        }
      }
    }
  }

  resetOrdtrafegoSave() {
    this.ordtrafegoSave = {
      id: 0,
      origem: "",
      destino: "",
      dt_viagem: "",
      distancia: 0,
      status: "",
      veiculo: {
        id: 0,
      },
      condutor: {
        id: 0,
      }
    }
  }

  showSaveDialog(ordtrafego: OrdtrafegoFull, editar: boolean) {
    if (editar) {
      this.ordtrafego = ordtrafego;
    } else {
      this.resetOrdtrafego();
      this.resetOrdtrafegoSave();
    }
    this.displaySaveDialog = true;
  }

  save() {
    if (this.ordtrafego.id == 0) {
      
      this.ordtrafegoService.save(this.ordtrafego).subscribe(
        (result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Registro salvo com sucesso!' });
          this.resetOrdtrafego();
          this.resetOrdtrafegoSave();
          this.getAll();
          this.displaySaveDialog = false;
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao salvar registro!' });
        }
      )
    } else {
      this.ordtrafegoService.put(this.ordtrafego).subscribe(
        (result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Registro editado com sucesso!' });
          this.resetOrdtrafego();
          this.getAll();
          this.displaySaveDialog = false;

        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao editar registro!' });
        }
      )
    }
  }

  editOrdtrafego(ordtrafego: OrdtrafegoFull) {
    this.showSaveDialog(ordtrafego, true);
  }

  deleteOrdtrafego(ordtrafego: OrdtrafegoFull) {
    this.confirmationService.confirm({
      message: "Deseja realmente deletar um registro?",
      accept: () => {
        this.ordtrafegoService.delete(ordtrafego).subscribe(
          (result: any) => {
            this.messageService.add({ severity: 'info', summary: 'Resultado', detail: 'Registro deletado com sucesso!' });
            this.getAll();
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao deletar registro!' });
          }
        )
      }
    })
  }

  getAllVeiculos() {
    this.veiculoService.getAll().subscribe(
      (result: any) => {
        let veiculos: Veiculo[] = [];
        for (let i = 0; i < result.length; i++) {
          let veiculo = result[i] as Veiculo;
          veiculos.push(veiculo);
        }
        this.veiculos = veiculos;

        for (let i = 0; i < this.veiculos.length; i++) {
          let obj: Veiculos = { name: veiculos[i].num_placa, value: veiculos[i] };
          this.listaVeiculos.push(obj);
        }
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  getAllCondutores() {
    this.condutorService.getAll().subscribe(
      (result: any) => {
        let condutores: Condutor[] = [];
        for (let i = 0; i < result.length; i++) {
          let condutor = result[i] as Condutor;
          condutores.push(condutor);
        }
        this.condutores = condutores;

        for (let i = 0; i < this.condutores.length; i++) {
          let obj: Condutores = { name: condutores[i].nome, value: condutores[i] };
          this.listaCondutores.push(obj);
        }
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  clear(table: Table) {
    if (this.filtro == true) {
      this.getAll();
    } else {
      table.clear();
    }
    this.filtro = false;
  }

  ngOnInit() {

    this.getAll();
    this.primengConfig.ripple = true;
    this.resetOrdtrafego();
    this.getAllVeiculos();
    this.getAllCondutores();

    this.items = [
      {
        label: "Novo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(this.ordtrafego, false)
      },
      {
        label: "Excluir",
        icon: 'pi pi-fw pi-trash',
      }
    ]

  }

}

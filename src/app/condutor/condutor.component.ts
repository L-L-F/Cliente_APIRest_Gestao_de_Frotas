import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cnh } from 'src/model/cnh';
import { Condutor } from 'src/model/condutor';
import { Endereco } from 'src/model/endereco';
import { OrdtrafegoFull } from 'src/model/ordtrafegoFull';
import { CondutorService } from '../service/condutor.service';
import { OrdtrafegoService } from '../service/ordtrafego.service';

interface Genero {
  name: string,
  value: string
}

@Component({
  selector: 'app-condutor',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.scss']
})
export class CondutorComponent implements OnInit {

  condutores: Condutor[] = [];
  ordtrafegos: OrdtrafegoFull[] = [];
  enderecos: Endereco[] = [];
  cnhs: Cnh[] = [];
  items: MenuItem[] = [];
  genero: Genero[] = [];
  selectedCondutor: Condutor[] = [];
  displaySaveDialog: boolean = false;
  displayOrdTrafegoDialog: boolean = false;
  displayEndDialog: boolean = false;
  displayCnhDialog: boolean = false;

  condutor!: Condutor;

  constructor(private condutorService: CondutorService, private ordtrafegoService: OrdtrafegoService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {

    this.genero = [
      { name: 'Feminino', value: 'FEMININO' },
      { name: 'Masculino', value: 'MASCULINO' },
      { name: 'Outros', value: 'OUTROS' },
    ]

  }
  getAll() {
    this.condutorService.getAll().subscribe(
      (result: any) => {
        let condutores: Condutor[] = [];
        for (let i = 0; i < result.length; i++) {
          let condutor = result[i] as Condutor;
          condutores.push(condutor);
        }
        this.condutores = condutores;
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  getOrdTrafego(condutor: Condutor) {
    this.ordtrafegoService.getAll().subscribe(
      (result: any) => {
        let ordtrafegos: OrdtrafegoFull[] = [];
        for (let i = 0; i < result.length; i++) {
          let ordtrafego = result[i] as OrdtrafegoFull;
          if (ordtrafego.condutor.id == condutor.id) {
            ordtrafegos.push(ordtrafego);
          }
        }
        this.ordtrafegos = ordtrafegos;
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar mais informações!' });
      }
    )
    this.showTable1Dialog();
  }

  getEnd(condutor: Condutor) {
    this.enderecos = [];
    this.enderecos.push(condutor.enderco);

    this.showTable2Dialog();
  }

  getCnh(condutor: Condutor) {
    this.cnhs = [];
    this.cnhs.push(condutor.cnh);

    this.showTable3Dialog();
  }

  resetCondutor() {
    this.condutor = {
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
      },
      /*ord_traf: {
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
        }
      }*/

    }
  }

  showSaveDialog(condutor: Condutor, editar: boolean) {
    if (editar) {
      this.condutor = condutor;
    } else {
      this.resetCondutor();
    }
    this.displaySaveDialog = true;
  }

  showTable1Dialog() {
    this.displayOrdTrafegoDialog = true;
  }

  showTable2Dialog() {
    this.displayEndDialog = true;
  }

  showTable3Dialog() {
    this.displayCnhDialog = true;
  }

  save() {
    if (this.condutor.id == 0) {
      this.condutorService.save(this.condutor).subscribe(
        (result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Registro salvo com sucesso!' });
          this.resetCondutor();
          this.getAll();
          this.displaySaveDialog = false;
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao salvar registro!' });
        }
      )
    } else {
      this.condutorService.put(this.condutor).subscribe(
        (result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Registro editado com sucesso!' });
          this.resetCondutor();
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

  editCondutor(condutor: Condutor) {
    this.showSaveDialog(condutor, true);
  }

  deleteCondutor(condutor: Condutor) {
    this.confirmationService.confirm({
      message: "Deseja realmente deletar um registro?",
      accept: () => {
        this.condutorService.delete(condutor).subscribe(
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

  clear(table: Table) {
    table.clear();
  }

  ngOnInit() {

    this.getAll();
    this.primengConfig.ripple = true;
    this.resetCondutor();

    this.items = [
      {
        label: "Novo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(this.condutor, false)
      },
      {
        label: "Excluir",
        icon: 'pi pi-fw pi-trash',
      }
    ]

  }

}

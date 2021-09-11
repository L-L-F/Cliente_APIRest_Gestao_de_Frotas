import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrdtrafegoFull } from 'src/model/ordtrafegoFull';
import { Veiculo } from 'src/model/veiculo';
import { OrdtrafegoService } from '../service/ordtrafego.service';
import { VeiculoService } from '../service/veiculo.service';

interface Categoria {
  name: string,
  value: string
}
interface Est_conserv {
  name: string,
  value: string
}

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss']
})

export class VeiculoComponent implements OnInit {

  veiculos: Veiculo[] = [];
  ordtrafegos: OrdtrafegoFull[] = [];
  items: MenuItem[] = [];
  categorias: Categoria[] = [];
  est_conservs: Est_conserv[] = [];
  selectedVeiculos: Veiculo[] = [];
  displaySaveDialog: boolean = false;
  displayTableDialog: boolean = false;

  veiculo!: Veiculo;
  kmInicial: number = 0;
  kmFinal: number = 0;
  filtro: boolean = false;

  constructor(private veiculoService: VeiculoService,private ordtrafegoService: OrdtrafegoService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {

    this.categorias = [
      { name: 'Hatch', value: 'HATCH' },
      { name: 'Sedan', value: 'SEDAN' },
      { name: 'Picape', value: 'PICAPE' },
      { name: 'SUV', value: 'SUV' },
      { name: 'Mini Vans', value: 'MINIVANS' },
      { name: 'Van', value: 'VAN' },
      { name: 'Caminhão', value: 'CAMINHAO' },
      { name: 'Carreta', value: 'CARRETA' },
      { name: 'Onibus', value: 'ONIBUS' },
    ]
    this.est_conservs = [
      { name: 'Ótimo', value: 'OTIMO' },
      { name: 'Bom', value: 'BOM' },
      { name: 'Regular', value: 'REGULAR' },
      { name: 'Ruim', value: 'RUIM' },
    ]
  }

  getAll() {
    this.veiculoService.getAll().subscribe(
      (result: any) => {
        let veiculos: Veiculo[] = [];
        for (let i = 0; i < result.length; i++) {
          let veiculo = result[i] as Veiculo;
          veiculos.push(veiculo);
        }
        this.veiculos = veiculos;
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  getKm() {
    this.filtro = true;
    this.veiculoService.getkm(this.kmInicial, this.kmFinal).subscribe(
      (result: any) => {
        let veiculos: Veiculo[] = [];
        for (let i = 0; i < result.length; i++) {
          let veiculo = result[i] as Veiculo;
          veiculos.push(veiculo);
        }
        this.veiculos = veiculos;
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao listar todos os registros!' });
      }
    )
  }

  getOrdTrafego(veiculo: Veiculo){
    this.ordtrafegoService.getAll().subscribe(
      (result: any) => {
        let ordtrafegos: OrdtrafegoFull[] = [];
        for (let i = 0; i < result.length; i++) {
          let ordtrafego = result[i] as OrdtrafegoFull;
          if (ordtrafego.veiculo.id == veiculo.id) {
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
    this.showTableDialog();
  }

  
  resetVeiculo() {
    this.veiculo = {
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
  }

  showSaveDialog(veiculo: Veiculo, editar: boolean) {
    if (editar) {
      this.veiculo = veiculo;
    } else {
      this.resetVeiculo();
    }
    this.displaySaveDialog = true;
  }

  showTableDialog() {
    this.displayTableDialog = true;
  }

  save() {
    if (this.veiculo.id == 0) {
      this.veiculoService.save(this.veiculo).subscribe(
        (result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Registro salvo com sucesso!' });
          this.resetVeiculo();
          this.getAll();
          this.displaySaveDialog = false;
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Resultado', detail: 'Erro ao salvar registro!' });
        }
      )
    } else {
      this.veiculoService.put(this.veiculo).subscribe(
        (result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Registro editado com sucesso!' });
          this.resetVeiculo();
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

  editVeiculo(veiculo: Veiculo) {
    this.showSaveDialog(veiculo, true);
  }

  deleteVeiculo(veiculo: Veiculo) {
    this.confirmationService.confirm({
      message: "Deseja realmente deletar um registro?",
      accept: () => {
        this.veiculoService.delete(veiculo).subscribe(
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
    this.resetVeiculo();

    this.items = [
      {
        label: "Novo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(this.veiculo, false)
      },
      {
        label: "Excluir",
        icon: 'pi pi-fw pi-trash',
      }
    ]

  }

}
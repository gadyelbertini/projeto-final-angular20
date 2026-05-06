import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiPessoas } from '../service/api-pessoas';
import { Pessoa } from '../module/Pessoa';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-crud',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {

  // Visibilidade dos botões
  btnCadastrar:boolean = true;

  // Colunas da tabela
  colunas:String[] = ['id', 'nome', 'cidade', 'selecionar'];

  // Vetor para armazenar as pessoas
  vetor:Pessoa[] = [];

  constructor(private servico:ApiPessoas){}

  // ngOnInit - Executa este mÃ©todo apÃ³s o componente ser montado
  ngOnInit():void{
    this.listar();
  }

  // MÃ©todo para selecionar todas as pessoas da API
  listar():void{
    this.servico.listar().subscribe(pessoas => this.vetor = pessoas);
  }
}

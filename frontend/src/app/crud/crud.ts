import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiPessoas } from '../service/api-pessoas';
import { Pessoa } from '../module/Pessoa';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, ReactiveFormsModule],
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

  // Objeto - FormulÃ¡rio Reativo
  formularioPessoa = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    cidade: new FormControl()
  });

  constructor(private servico:ApiPessoas){}

  // ngOnInit - Executa este mÃ©todo apÃ³s o componente ser montado
  ngOnInit():void{
    this.listar();
  }

  // MÃ©todo para selecionar todas as pessoas da API
  listar():void{
    this.servico.listar().subscribe(pessoas => this.vetor = pessoas);
  }

  // MÃ©todo para cadastrar pessoas
  cadastrar():void{
    // Criar um novo objeto
    let obj = {...this.formularioPessoa.value}; // Copia todas as caracterÃ­sticas do nosso formulÃ¡rio reativo (via spred operator).
    delete obj.id; // Remove o id, para que nossa API receba um objeto contendo apenas o nome e a cidade.

    // Realizar a requisiÃ§Ã£o de cadastro (POST) e atualizar o vetor
    this.servico.cadastrar(obj).subscribe(pessoa => this.vetor = [...this.vetor, pessoa]);

    // Limpar o formulÃ¡rio
    this.formularioPessoa.reset();
  }

  // MÃ©todo para selecionar uma pessoa especÃ­fica
  selecionarPessoa(id:string):void{
    this.servico.selecionarPessoa(id).subscribe(pessoa => {

      // Disponibiliza um objeto com as caracterÃ­sticas: id, nome e cidade para o nosso formulÃ¡rio reativo
      this.formularioPessoa.patchValue(pessoa);

      // Visibilidade dos botÃµes
      this.btnCadastrar = false;
    });
  }

  // MÃ©todo para cancelar as aÃ§Ãµes de alteraÃ§Ã£o e remoÃ§Ã£o
  cancelar():void{
    this.formularioPessoa.reset();
    this.btnCadastrar = true;
  }
}

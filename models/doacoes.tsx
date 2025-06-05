import { RowDataPacket } from "mysql2";
import db from "../db";
import bcrypt from 'bcryptjs'

class DoacoesModel {
  // Criar uma nova doação)
  async criarDoacao(doacao:any) {

    console.log("doacao " + doacao.Descricao, doacao.status, doacao.categoria, doacao.doador, doacao.Data_Cadastro);
    
    const insereDoacao = await db.execute(
      `INSERT INTO tbldoacao (Descricao, Status, Doador, Categoria, Data_Cadastro)
       
         VALUES 
        (?, ?, ?, ?, ?)`,
      [
        doacao.Descricao,
        doacao.Status,
        doacao.Doador,
        doacao.Categoria,
        doacao.Data_Cadastro
        
      ]
    );
    if (Array.isArray(insereDoacao) && insereDoacao.length > 0) {
      // Fodoacaorçando a declaração do tipo como RowDataPacket
      const doacao = insereDoacao[0] as RowDataPacket;  // 'RowDataPacket' é o tipo correto do MySQL2
      return doacao;
    }
  }

  // Buscar o usuário pelo e-mail
  async buscarDoacoesId(id: number) {
    const [rows] = await db.execute(
      `SELECT * FROM tblDoacoes WHERE id = ?`,
      [id]
    );
  
    // Verifique se rows é um array e tem pelo menos 1 item (usuário encontrado)
    if (Array.isArray(rows) && rows.length > 0) {
      // Forçando a declaração do tipo como RowDataPacket
      const doacoes = rows[0] as RowDataPacket;  // 'RowDataPacket' é o tipo correto do MySQL2
      return doacoes;
    }
    return null;  // Se não encontrar o usuário
  }
  
}

export default new DoacoesModel(); // Exporta uma instância única


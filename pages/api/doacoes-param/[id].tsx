import DoacoesModel from "../../../models/doacoes";
import { NextApiRequest, NextApiResponse } from 'next';

const DoacoesId = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const codigoID = Number(id);

    if (!codigoID || isNaN(codigoID)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    if (req.method === 'GET') {
        try {
            let dados = await DoacoesModel.buscarDoacoesId(codigoID);
            return res.status(200).json(dados);

        } catch (error) {
            console.error('Erro ao buscar doações por ID:', error);
            return res.status(400).json({ message: 'Erro ao buscar doações por ID' });
        }
    } else if (req.method === 'PATCH') {
        const doacaoStatus = await DoacoesModel.buscarDoacaoStatusId(codigoID);

        if (doacaoStatus === 'disponivel') {
            try {
                if (!id) {
                    return res.status(400).json({ message: 'ID não enviado' });
                }
                const resultado = await DoacoesModel.alterarDoacaoPendente(codigoID);
                if (resultado?.sucesso) {
                    return res.status(200).json({ message: 'Doação Alterada com sucesso' });
                } else {
                    return res.status(404).json({ message: resultado?.mensagem || 'Erro ao atualizar doação' });
                }
            } catch (error) {
                console.error('Erro ao atualizar doação:', error);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }

        } else if (doacaoStatus === 'Em Analise') {
            try {
                if (!id) {
                    console.error('Erro na requisição');
                    return res.status(400).json({ message: 'ID não enviado' });
                }
                const resultado = await DoacoesModel.alterarDoacaoConcluido(codigoID);
                if (resultado?.sucesso) {
                    return res.status(200).json({ message: 'Doação Alterada com sucesso' });
                } else {
                    return res.status(404).json({ message: resultado?.mensagem || 'Erro ao atualizar doação' });
                }
            } catch (error) {
                console.error('Erro ao atualizar doação:', error);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }
};

export default DoacoesId;
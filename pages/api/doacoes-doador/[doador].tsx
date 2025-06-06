import DoacoesModel from "../../../models/doacoes";
import { NextApiRequest, NextApiResponse } from 'next';

const doacoesDoador = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { doador } = req.query;
        let codigoDoador = Number(doador);
        
        let dados = await DoacoesModel.buscarDoacoesPoDoador(codigoDoador);
        return res.status(200).json(dados);

    } catch (error) {
        console.error('Erro ao Buscar doações por doador:', error);
        return res.status(400).json({ message: 'Erro no buscar doações por doador' });

    }

};

export default doacoesDoador;
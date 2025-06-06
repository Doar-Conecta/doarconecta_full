import DoacoesModel from "../../../models/doacoes";
import { NextApiRequest, NextApiResponse } from 'next';

const DoacoesId = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { id } = req.query;
        let codigoID = Number(id);
        
        let dados = await DoacoesModel.buscarDoacoesId(codigoID);
        return res.status(200).json(dados);

    } catch (error) {
        console.error('Erro ao buscar doações por ID:', error);
        return res.status(400).json({ message: 'Erro ao buscar doações por ID' });
    }

};

export default DoacoesId;
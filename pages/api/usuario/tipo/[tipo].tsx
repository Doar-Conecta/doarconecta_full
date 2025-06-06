import UsuarioModel from "../../../../models/Usuario";
import { NextApiRequest, NextApiResponse } from 'next';

const Usuarios = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { tipo } = req.query;
        const codigoTipo = Number(tipo)
        
        let dados = await UsuarioModel.buscarUsuarioPorTipo(codigoTipo);
        return res.status(200).json(dados);

    } catch (error) {
        console.error('Erro ao buscar usuários po id:', error);
        return res.status(400).json({ message: 'Erro ao buscar usuários por id' });
    }

};

export default Usuarios;
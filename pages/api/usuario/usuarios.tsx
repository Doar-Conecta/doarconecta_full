import UsuarioModel from "../../../models/Usuario";
import { NextApiRequest, NextApiResponse } from 'next';

const Usuarios = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        
        let dados = await UsuarioModel.buscarUsuarios();
        return res.status(200).json(dados);

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(400).json({ message: 'Erro ao buscar usuários' });
    }

};

export default Usuarios;
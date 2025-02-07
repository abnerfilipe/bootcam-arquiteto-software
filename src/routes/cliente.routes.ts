import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';
import { ClienteService } from '../services/cliente.service';
import { FactoryRegistry } from '../core/factoryRegistry';
import { ICliente } from '../models/cliente.model';
import { IRepository } from '../interfaces/repository.interface';
import { RequestHandler } from 'express';
import '../models/cliente.model';

const router = Router();

const clienteRepository = FactoryRegistry.getRepository('Cliente') as IRepository<ICliente>;
const clienteService = new ClienteService(clienteRepository);
const clienteController = new ClienteController(clienteService);

// Handlers tipados
const criarCliente: RequestHandler = async (req, res) => {
    await clienteController.criarCliente(req, res);
};

const atualizarCliente: RequestHandler = async (req, res) => {
    await clienteController.atualizarCliente(req, res);
};

const deletarCliente: RequestHandler = async (req, res) => {
    await clienteController.deletarCliente(req, res);
};

const listarClientes: RequestHandler = async (req, res) => {
    await clienteController.listarClientes(req, res);
};

const buscarPorId: RequestHandler = async (req, res) => {
    await clienteController.buscarPorId(req, res);
};

const buscarPorNome: RequestHandler = async (req, res) => {
    await clienteController.buscarPorNome(req, res);
};

const contarClientes: RequestHandler = async (req, res) => {
    await clienteController.contarClientes(req, res);
};

// Rotas
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);
router.get('/', listarClientes);
router.get('/count', contarClientes);
router.get('/busca', buscarPorNome);
router.get('/:id', buscarPorId);

export default router;
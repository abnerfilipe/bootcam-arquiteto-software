import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';
import { PedidoService } from '../services/pedido.service';
import { ItemPedidoService } from '../services/itemPedido.service';
import { ProdutoService } from '../services/produto.service';
import { FactoryRegistry } from '../core/factoryRegistry';
import { IPedido } from '../models/pedido.model';
import { IItemPedido } from '../models/itemPedido.model';
import { IProduto } from '../models/produto.model';
import { IRepository } from '../interfaces/repository.interface';
import { RequestHandler } from 'express';
import '../models/pedido.model';
import '../models/itemPedido.model';
import '../models/produto.model';

const router = Router();

// Repositories
const pedidoRepository = FactoryRegistry.getRepository('Pedido') as IRepository<IPedido>;
const itemPedidoRepository = FactoryRegistry.getRepository('ItemPedido') as IRepository<IItemPedido>;
const produtoRepository = FactoryRegistry.getRepository('Produto') as IRepository<IProduto>;

// Services
const produtoService = new ProdutoService(produtoRepository);
const itemPedidoService = new ItemPedidoService(itemPedidoRepository, produtoService);
const pedidoService = new PedidoService(pedidoRepository, itemPedidoService,produtoService);

// Controller
const pedidoController = new PedidoController(pedidoService);

// Handlers tipados
const criarPedido: RequestHandler = async (req, res) => {
    await pedidoController.criarPedido(req, res);
};

const atualizarPedido: RequestHandler = async (req, res) => {
    await pedidoController.atualizarPedido(req, res);
};

const deletarPedido: RequestHandler = async (req, res) => {
    await pedidoController.deletarPedido(req, res);
};

const listarPedidos: RequestHandler = async (req, res) => {
    await pedidoController.listarPedidos(req, res);
};

const buscarPorId: RequestHandler = async (req, res) => {
    await pedidoController.buscarPorId(req, res);
};

const buscarPorClienteId: RequestHandler = async (req, res) => {
    await pedidoController.buscarPorClienteId(req, res);
};

const contarPedidos: RequestHandler = async (req, res) => {
    await pedidoController.contarPedidos(req, res);
};

// Rotas
router.post('/', criarPedido);
router.put('/:id', atualizarPedido);
router.delete('/:id', deletarPedido);
router.get('/', listarPedidos);
router.get('/count', contarPedidos);
router.get('/cliente', buscarPorClienteId);
router.get('/:id', buscarPorId);

export default router;
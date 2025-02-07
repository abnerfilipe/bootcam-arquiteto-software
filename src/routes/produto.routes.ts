import { Router } from 'express';
import { ProdutoController } from '../controllers/produto.controller';
import { ProdutoService } from '../services/produto.service';
import { FactoryRegistry } from '../core/factoryRegistry';
import { IProduto } from '../models/produto.model';
import { IRepository } from '../interfaces/repository.interface';
import { RequestHandler } from 'express';
import '../models/produto.model';

const router = Router();

const produtoRepository = FactoryRegistry.getRepository('Produto') as IRepository<IProduto>;
const produtoService = new ProdutoService(produtoRepository);
const produtoController = new ProdutoController(produtoService);

// Handlers tipados
const criarProduto: RequestHandler = async (req, res) => {
    await produtoController.criarProduto(req, res);
};

const listarProdutos: RequestHandler = async (req, res) => {
    await produtoController.listarProdutos(req, res);
};

const buscarPorId: RequestHandler = async (req, res) => {
    await produtoController.buscarPorId(req, res);
};

const buscarPorNome: RequestHandler = async (req, res) => {
    await produtoController.buscarPorNome(req, res);
};

const atualizarProduto: RequestHandler = async (req, res) => {
    await produtoController.atualizarProduto(req, res);
};

const deletarProduto: RequestHandler = async (req, res) => {
    await produtoController.deletarProduto(req, res);
};

const contarProdutos: RequestHandler = async (req, res) => {
    await produtoController.contarProdutos(req, res);
};

// Rotas
router.post('/', criarProduto);
router.get('/', listarProdutos);
router.get('/count', contarProdutos);
router.get('/busca', buscarPorNome);
router.get('/:id', buscarPorId);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

export default router;
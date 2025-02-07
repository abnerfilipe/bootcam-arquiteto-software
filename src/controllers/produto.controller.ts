import { Request, Response } from 'express';
import { ProdutoService } from '../services/produto.service';
import { successResponse, errorResponse } from '../utils/response';

export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // CREATE
  async criarProduto(req: Request, res: Response) {
    try {
      const produto = await this.produtoService.create(req.body);
      return res.status(201).json(successResponse(produto, 'Produto criado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao criar produto'));
    }
  }

  // READ (Find All)
  async listarProdutos(req: Request, res: Response) {
    try {
      const produtos = await this.produtoService.findAll();
      return res.json(successResponse(produtos, 'Produtos listados com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao listar produtos'));
    }
  }

  // READ (Find By ID)
  async buscarPorId(req: Request, res: Response) {
    try {
      const produto = await this.produtoService.findById(req.params.id);
      if (!produto) {
        return res.status(404).json(errorResponse(null,'Produto não encontrado'));
      }
      return res.json(successResponse(produto, 'Produto encontrado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse('Erro ao buscar produto'));
    }
  }

  // READ (Find By Name)
  async buscarPorNome(req: Request, res: Response) {
    try {
      const { nome } = req.query;
      const produtos = await this.produtoService.buscarPorNome(nome as string);
      return res.json(successResponse(produtos, 'Produtos encontrados com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao buscar produtos'));
    }
  }

  // UPDATE
  async atualizarProduto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await this.produtoService.update(id, req.body);
      if (!produto) {
        return res.status(404).json(errorResponse(null,'Produto não encontrado'));
      }
      return res.json(successResponse(produto, 'Produto atualizado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao atualizar produto'));
    }
  }

  // DELETE
  async deletarProduto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletado = await this.produtoService.delete(id);
      if (!deletado) {
        return res.status(404).json(errorResponse(null,'Produto não encontrado'));
      }
      return res.json(successResponse(null, 'Produto deletado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao deletar produto'));
    }
  }

  // COUNT
  async contarProdutos(req: Request, res: Response) {
    try {
      const total = await this.produtoService.contarProdutos();
      return res.json(successResponse({ total }, 'Total de produtos contabilizado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao contar produtos'));
    }
  }
}
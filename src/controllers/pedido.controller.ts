import { Request, Response } from 'express';
import { PedidoService } from '../services/pedido.service';
import { successResponse, errorResponse } from '../utils/response';

export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  // CREATE
  async criarPedido(req: Request, res: Response) {
    try {
      const { clienteId, itens } = req.body;
      const pedido = await this.pedidoService.criarPedido(clienteId, itens);
      return res.status(201).json(
        successResponse(pedido, 'Pedido criado com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao criar pedido'));
    }
  }

  // READ (Find All)
  async listarPedidos(req: Request, res: Response) {
    try {
      const pedidos = await this.pedidoService.findAll();
      return res.json(
        successResponse(pedidos, 'Pedidos listados com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao listar pedidos'));
    }
  }

  // READ (Find By ID) 
  async buscarPorId(req: Request, res: Response) {
    try {
      const pedido = await this.pedidoService.findById(req.params.id);
      if (!pedido) {
        return res.status(404).json(errorResponse(null,'Pedido não encontrado'));
      }
      return res.json(
        successResponse(pedido, 'Pedido encontrado com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao buscar pedido'));
    }
  }

  // READ (Find By Cliente ID)
  async buscarPorClienteId(req: Request, res: Response) {
    try {
      const { clienteId } = req.query;
      const pedidos = await this.pedidoService.buscarPorClienteId(clienteId as string);
      return res.json(
        successResponse(pedidos, 'Pedidos encontrados com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao buscar pedidos'));
    }
  }

  // UPDATE
  async atualizarPedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pedido = await this.pedidoService.update(id, req.body);
      if (!pedido) {
        return res.status(404).json(errorResponse(null,'Pedido não encontrado'));
      }
      return res.json(
        successResponse(pedido, 'Pedido atualizado com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao atualizar pedido'));
    }
  }

  // DELETE
  async deletarPedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletado = await this.pedidoService.delete(id);
      if (!deletado) {
        return res.status(404).json(errorResponse(null,'Pedido não encontrado'));
      }
      return res.json(
        successResponse(null, 'Pedido deletado com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao deletar pedido'));
    }
  }

  // COUNT
  async contarPedidos(req: Request, res: Response) {
    try {
      const total = await this.pedidoService.contarPedidos();
      return res.json(
        successResponse({ total }, 'Total de pedidos contabilizado com sucesso')
      );
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao contar pedidos'));
    }
  }
}
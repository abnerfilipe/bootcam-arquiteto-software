import { Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service';
import { successResponse, errorResponse } from '../utils/response';

export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  async criarCliente(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.create(req.body);
      return res.status(201).json(successResponse(cliente, 'Cliente criado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao criar cliente'));
    }
  }

  async atualizarCliente(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await this.clienteService.update(id, req.body);
      if (!cliente) {
        return res.status(404).json(errorResponse(null,'Cliente não encontrado'));
      }
      return res.json(successResponse(cliente, 'Cliente atualizado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao atualizar cliente'));
    }
  }

  async deletarCliente(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletado = await this.clienteService.delete(id);
      if (!deletado) {
        return res.status(404).json(errorResponse(null,'Cliente não encontrado'));
      }
      return res.json(successResponse(null, 'Cliente deletado com sucesso'));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao deletar cliente'));
    }
  }

  async listarClientes(req: Request, res: Response) {
    try {
      const clientes = await this.clienteService.findAll();
      return res.json(successResponse(clientes));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao listar clientes'));
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.findById(req.params.id);
      if (!cliente) {
        return res.status(404).json(errorResponse(null,'Cliente não encontrado'));
      }
      return res.json(successResponse(cliente));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao buscar cliente'));
    }
  }

  async buscarPorNome(req: Request, res: Response) {
    try {
      const { nome } = req.query;
      const clientes = await this.clienteService.buscarPorNome(nome as string);
      return res.json(successResponse(clientes));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao buscar clientes'));
    }
  }

  async contarClientes(req: Request, res: Response) {
    try {
      const total = await this.clienteService.contarClientes();
      return res.json(successResponse({ total }));
    } catch (error) {
      return res.status(400).json(errorResponse(error,'Erro ao contar clientes'));
    }
  }
}
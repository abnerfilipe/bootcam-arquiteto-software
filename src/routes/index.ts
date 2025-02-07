import { Router } from 'express';
import clienteRoutes from './cliente.routes';
import pedidosRoutes from './pedido.routes';
import produtosRoutes from './produto.routes';

const router = Router();
router.use('/clientes', clienteRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/produtos', produtosRoutes);

export default router;

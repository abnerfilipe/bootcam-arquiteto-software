import { IProduto } from '../models/produto.model';

export class ProdutoBuilder {
  private produto: Partial<IProduto> = {};

  setName(name: string): ProdutoBuilder {
    this.produto.name = name;
    return this;
  }

  setPrice(price: number): ProdutoBuilder {
    this.produto.price = price;
    return this;
  }

  setDescription(description: string): ProdutoBuilder {
    this.produto.description = description;
    return this;
  }

  setImage(image: string): ProdutoBuilder {
    this.produto.image = image;
    return this;
  }

  setSku(sku: string): ProdutoBuilder {
    this.produto.sku = sku;
    return this;
  }

  build(): IProduto {
    return this.produto as IProduto;
  }
}
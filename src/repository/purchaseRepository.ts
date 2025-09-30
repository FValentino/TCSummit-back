import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { Purchase } from "../entity";

export class PurchaseRepository{

  private repository: Repository<Purchase>;
  
  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Purchase) : AppDataSource.getRepository(Purchase);
  }

  findAllPurchases(){
    return this.repository.find();
  }

  createPurchase(purchaseData: Partial<Purchase>){
    const purchase = this.repository.create(purchaseData)
    return this.repository.save(purchase);
  }

  updatePurchase(id:number, purchaseData: Partial<Purchase>){
    return this.repository.update(id, purchaseData);
  }
}
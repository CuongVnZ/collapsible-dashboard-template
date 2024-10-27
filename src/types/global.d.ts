declare global {
  namespace PrismaJson {
    type MobEquipment = {
      head: string;
      body: string;
      legs: string;
      feet: string;
    };

    type MobDrops = {
      rpgItemId: string;
      quantityMin: number;
      quantityMax: number;
      chance: number;
    };
  }
}

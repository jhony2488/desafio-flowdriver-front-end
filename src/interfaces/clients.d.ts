export interface PropsClientsLog {
  id?: number;
  prohibited: string;
  exit: string | null;
  price: number | null;
  paidOut: boolean;
  changeValue: number | null;
  paidOutPrice: number | null;
  priceVehicle: number;
  idUser: number | null;
  userId?: number | null;
}

export interface PropsClients {
  plate: string;
  VehicleTypeId: number;
  LogClients?: [PropsClientsLog];
}

export type LogisticsRow = {
  requestWagon: string;
  psType: string;
  client: string;
  manager: string;
  shipper: string;
  cargoClass: string;
  weight: number;
  wagonsRequested: number;

  phase1_requestWagon: string;
  phase1_psType: string;
  phase1_client: string;
  phase1_manager: string;
  phase1_shipper: string;
  phase1_cargoClass: string;
  phase1_weight: number;
  phase1_wagonsRequested: number;

  phase2_requestWagon: string;
  phase2_plannedWagons: number;
  phase2_ownedWagons: number;
  phase2_hiredWagons: number;

  phase3_requestWagon: string;
  phase3_source: string;
  phase3_psType: string;
  phase3_client: string;

  phase4_requestWagon: string;
  phase4_psType: string;
  phase4_client: string;

  phase5_requestWagon: string;
  phase5_invoice: string;
  phase5_psType: string;
  phase5_client: string;

  subRows?: LogisticsRow[];
};

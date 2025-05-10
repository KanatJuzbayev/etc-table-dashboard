export type LogisticsRow = {
  // Global fields
  requestWagon: string;
  psType: string;
  client: string;
  manager: string;
  shipper: string;
  cargoClass: string;
  weight: number;
  wagonsRequested: number;

  // Phase_1 fields
  phase1_requestWagon: string;
  phase1_psType: string;
  phase1_client: string;
  phase1_manager: string;
  phase1_shipper: string;
  phase1_cargoClass: string;
  phase1_weight: number;
  phase1_wagonsRequested: number;

  // Phase_2 fields
  phase2_requestWagon: string;
  phase2_plannedWagons: number;
  phase2_ownedWagons: number;
  phase2_hiredWagons: number;

  // Phase_3 fields
  phase3_requestWagon: string;
  phase3_source: string;
  phase3_psType: string;
  phase3_client: string;

  // Phase_4 fields
  phase4_requestWagon: string;
  phase4_psType: string;
  phase4_client: string;

  // Phase_5 fields
  phase5_requestWagon: string;
  phase5_invoice: string;
  phase5_psType: string;
  phase5_client: string;

  // (Plus any row-nesting key, e.g. `subRows?: LogisticsRow[]` if you want nested rows)
  subRows?: LogisticsRow[];
};

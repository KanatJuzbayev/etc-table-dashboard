import { LogisticsRow } from "@/shared/types/supply.types.ts";

export const mockData: LogisticsRow[] = [
  {
    requestWagon: "Z-100",
    psType: "Тип А",
    client: "ООО Ромашка",
    manager: "Иванов И.И.",
    shipper: "Петров П.П.",
    cargoClass: "Класс 1",
    weight: 25,
    wagonsRequested: 2,

    phase1_requestWagon: "Z-100",
    phase1_psType: "Тип А",
    phase1_client: "ООО Ромашка",
    phase1_manager: "Иванов И.И.",
    phase1_shipper: "Петров П.П.",
    phase1_cargoClass: "Класс 1",
    phase1_weight: 25,
    phase1_wagonsRequested: 2,

    phase2_requestWagon: "Z-100",
    phase2_plannedWagons: 2,
    phase2_ownedWagons: 1,
    phase2_hiredWagons: 1,

    phase3_requestWagon: "Z-100",
    phase3_source: "Станция A",
    phase3_psType: "Тип А",
    phase3_client: "ООО Ромашка",

    phase4_requestWagon: "Z-100",
    phase4_psType: "Тип А",
    phase4_client: "ООО Ромашка",

    phase5_requestWagon: "Z-100",
    phase5_invoice: "Накладная-123",
    phase5_psType: "Тип А",
    phase5_client: "ООО Ромашка",

    subRows: [
      {
        requestWagon: "Z-100-sub",
        psType: "Тип A1",
        client: "ООО Ромашка",
        manager: "Сидоров С.С.",
        shipper: "Лебедев Л.Л.",
        cargoClass: "Класс 1",
        weight: 12.5,
        wagonsRequested: 1,

        phase1_requestWagon: "Z-100-sub",
        phase1_psType: "Тип A1",
        phase1_client: "ООО Ромашка",
        phase1_manager: "Сидоров С.С.",
        phase1_shipper: "Лебедев Л.Л.",
        phase1_cargoClass: "Класс 1",
        phase1_weight: 12.5,
        phase1_wagonsRequested: 1,

        phase2_requestWagon: "Z-100-sub",
        phase2_plannedWagons: 1,
        phase2_ownedWagons: 1,
        phase2_hiredWagons: 0,

        phase3_requestWagon: "Z-100-sub",
        phase3_source: "Станция B",
        phase3_psType: "Тип A1",
        phase3_client: "ООО Ромашка",

        phase4_requestWagon: "Z-100-sub",
        phase4_psType: "Тип A1",
        phase4_client: "ООО Ромашка",

        phase5_requestWagon: "Z-100-sub",
        phase5_invoice: "Накладная-124",
        phase5_psType: "Тип A1",
        phase5_client: "ООО Ромашка",
      },
    ],
  },
  {
    requestWagon: "Z-200",
    psType: "Тип B",
    client: "ЗАО Лилия",
    manager: "Павлов П.П.",
    shipper: "Орлов О.О.",
    cargoClass: "Класс 2",
    weight: 40,
    wagonsRequested: 3,

    phase1_requestWagon: "Z-200",
    phase1_psType: "Тип B",
    phase1_client: "ЗАО Лилия",
    phase1_manager: "Павлов П.П.",
    phase1_shipper: "Орлов О.О.",
    phase1_cargoClass: "Класс 2",
    phase1_weight: 40,
    phase1_wagonsRequested: 3,

    phase2_requestWagon: "Z-200",
    phase2_plannedWagons: 3,
    phase2_ownedWagons: 2,
    phase2_hiredWagons: 1,

    phase3_requestWagon: "Z-200",
    phase3_source: "Станция C",
    phase3_psType: "Тип B",
    phase3_client: "ЗАО Лилия",

    phase4_requestWagon: "Z-200",
    phase4_psType: "Тип B",
    phase4_client: "ЗАО Лилия",

    phase5_requestWagon: "Z-200",
    phase5_invoice: "Накладная-200",
    phase5_psType: "Тип B",
    phase5_client: "ЗАО Лилия",
  },
];

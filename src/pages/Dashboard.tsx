import { FC, ReactNode, useState } from "react";
import { mockData } from "@/config/mockData.ts";
import GroupedTable from "@/widgets/Table/GroupedTable.tsx";
import PhaseComparisonChart from "@/components/Charts/PhaseComparisonChart";
import WeightDistributionChart from "@/components/Charts/WeightDistributionChart";
import ComparisonModal from "@/components/Modal/ComparisonModal";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

function TabPanel({
  children,
  value,
  index,
}: {
  children: ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div
      role="tabpanel"
      className={`h-full ${value === index ? "block" : "hidden"}`}
    >
      {value === index && <div className="p-4">{children}</div>}
    </div>
  );
}

const phaseLabels = [
  "Спрос",
  "План оптимизатора",
  "Проект плана",
  "Согласованный план",
  "Факт",
];

const phaseColors = {
  phase1: "#3b82f6", // blue-500
  phase2: "#10b981", // emerald-500
  phase3: "#f59e0b", // amber-500
  phase4: "#6366f1", // indigo-500
  phase5: "#ec4899", // pink-500
};

const Dashboard: FC = () => {
  const [paramTab, setParamTab] = useState(0);
  const [tab, setTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);

  const openComparisonModal = (phases: string[]) => {
    setSelectedPhases(phases);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* ─── Параметры вкладок ─────────────────────────────── */}
      <div className="bg-yellow-100 rounded-lg shadow-sm m-4 mb-2">
        <div className="flex border-b">
          {phaseLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => setParamTab(i)}
              className={`flex-1 px-4 py-2 font-medium text-xs text-center transition-all cursor-pointer ${
                paramTab === i
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Parameter content for each phase */}
        {phaseLabels.map((_, i) => (
          <TabPanel key={i} value={paramTab} index={i}>
            {/* Replace these with your real inputs per phase */}
            <div className="flex  border-b">
              <div className="w-1/2 p-2 border-r">
                <div className="font-medium text-sm mb-2">
                  Параметры сбора данных
                </div>
                <div className="text-xs">
                  <div className="flex justify-between">
                    <span>Срочность спроса от:</span>
                    <span>Предварительная</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Вероятность заявки от:</span>
                    <span>50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Стоимость вагоносуток от:</span>
                    <span>13,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Фрахта от:</span>
                    <span>10-1000</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="font-medium text-sm mb-2">
                  Параметры прогнозирования
                </div>
                <div className="text-xs">
                  <div className="flex justify-between gap-4">
                    <div className="text-nowrap">
                      Условия отбора в статистике:
                    </div>
                    <span className="max-w-40">
                      Регулярные, сезонные, новые по статистике, оптимизация по
                      статистике, вероятность по воронке, другие условия из
                      деманда SAP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-between p-4">
              <div className="space-x-3">
                <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                  СОХРАНИТЬ
                </button>
                <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                  ОТМЕНИТЬ
                </button>
                <button className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                  ОТПРАВИТЬ НА ОПТИМИЗАЦИЮ
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-red-100 px-3 py-1 text-xs font-medium text-red-700 rounded">
                  НЕ АКТУАЛЬНЫЙ
                </div>
                <div className="text-xs text-blue-600">СТАТУС: сбор</div>
              </div>
            </div>
          </TabPanel>
        ))}
      </div>

      {/* ─── Вкладки ───────────────────────────────────────────── */}
      <div className="flex px-4 border-b">
        <div className="flex-1 flex">
          {["Таблица", "Графики", "Карта"].map((tabName, index) => (
            <button
              key={index}
              onClick={() => setTab(index)}
              className={`px-4 py-2 font-medium text-xs transition-all relative cursor-pointer ${
                tab === index
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {tabName}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pr-2">
          <button
            onClick={() => openComparisonModal(["phase1", "phase2"])}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <ArrowsRightLeftIcon className="w-3.5 h-3.5" />
            <span>Сравнить фазы</span>
          </button>
        </div>
      </div>

      {/* ─── Вкладки ─────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden px-4 py-2">
        <TabPanel value={tab} index={0}>
          {/* The table lives here */}
          <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden">
            <GroupedTable data={mockData} />
          </div>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {/* Charts */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-white rounded-lg shadow-sm p-4 h-full">
              <PhaseComparisonChart data={mockData} />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 h-full">
              <WeightDistributionChart data={mockData} />
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          {/* Map component */}
          <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-500 text-lg">Здесь будет карта</p>
          </div>
        </TabPanel>
      </div>
      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Сравнение фаз"
      >
        <div className="space-y-6">
          <div className="flex gap-4">
            {selectedPhases.map((phase, index) => (
              <div
                key={index}
                className="flex-1 p-4 border rounded-lg"
                style={{
                  borderColor: phaseColors[phase as keyof typeof phaseColors],
                }}
              >
                <h3
                  className="text-lg font-medium mb-2"
                  style={{
                    color: phaseColors[phase as keyof typeof phaseColors],
                  }}
                >
                  {phaseLabels[parseInt(phase.replace("phase", "")) - 1]}
                </h3>
                <div className="space-y-2">
                  {/* Phase-specific data would be displayed here */}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Запрошенные вагоны:
                    </span>
                    <span className="text-sm font-medium">
                      {String(
                        mockData[0][
                          `${phase}_wagonsRequested` as keyof (typeof mockData)[0]
                        ] || "N/A"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Клиент:</span>
                    <span className="text-sm font-medium">
                      {String(
                        mockData[0][
                          `${phase}_client` as keyof (typeof mockData)[0]
                        ] || "N/A"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Тип ПС:</span>
                    <span className="text-sm font-medium">
                      {String(
                        mockData[0][
                          `${phase}_psType` as keyof (typeof mockData)[0]
                        ] || "N/A"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-3">Сводка сравнения</h3>
            <p className="text-sm text-gray-600">
              Этот раздел будет содержать автоматический анализ различий между
              выбранными фазами, подчеркивая изменения в распределении вагонов,
              информации о клиентах и других соответствующих показателях.
            </p>
          </div>
        </div>
      </ComparisonModal>
    </div>
  );
};

export default Dashboard;

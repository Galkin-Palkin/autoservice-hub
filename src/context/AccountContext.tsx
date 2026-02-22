import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { UserCar, RepairRecord, PaymentMethod } from "@/types/account";

const STORAGE_KEY_PREFIX = "autoservice-account-";

function storageKey(userId: string) {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

function loadStorage(userId: string | null): {
  cars: UserCar[];
  repairHistory: RepairRecord[];
  paymentMethods: PaymentMethod[];
} {
  if (!userId) return { cars: [], repairHistory: [], paymentMethods: [] };
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return { cars: [], repairHistory: [], paymentMethods: [] };
    return JSON.parse(raw);
  } catch {
    return { cars: [], repairHistory: [], paymentMethods: [] };
  }
}

function saveStorage(
  userId: string,
  data: {
    cars: UserCar[];
    repairHistory: RepairRecord[];
    paymentMethods: PaymentMethod[];
  }
) {
  localStorage.setItem(storageKey(userId), JSON.stringify(data));
}

type AccountContextValue = {
  cars: UserCar[];
  repairHistory: RepairRecord[];
  paymentMethods: PaymentMethod[];
  addCar: (plateNumber: string, model: string, userId: string) => void;
  removeCar: (id: string) => void;
  addRepairRecord: (record: Omit<RepairRecord, "id" | "userId">, userId: string) => void;
  addPaymentMethod: (
    type: PaymentMethod["type"],
    title: string,
    userId: string,
    last4?: string
  ) => void;
  setDefaultPaymentMethod: (id: string) => void;
  removePaymentMethod: (id: string) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | null;
}) {
  const [data, setData] = useState(() => loadStorage(userId));

  useEffect(() => {
    setData(loadStorage(userId));
  }, [userId]);

  const persist = useCallback(
    (next: {
      cars: UserCar[];
      repairHistory: RepairRecord[];
      paymentMethods: PaymentMethod[];
    }) => {
      setData(next);
      if (userId) saveStorage(userId, next);
    },
    [userId]
  );

  const addCar = useCallback(
    (plateNumber: string, model: string, userId: string) => {
      const car: UserCar = {
        id: crypto.randomUUID(),
        plateNumber: plateNumber.replace(/\s/g, "").toUpperCase(),
        model,
        userId,
      };
      persist({
        ...data,
        cars: [...data.cars, car],
      });
    },
    [data, persist]
  );

  const removeCar = useCallback(
    (id: string) => {
      persist({
        ...data,
        cars: data.cars.filter((c) => c.id !== id),
        repairHistory: data.repairHistory.filter((r) => r.carId !== id),
      });
    },
    [data, persist]
  );

  const addRepairRecord = useCallback(
    (record: Omit<RepairRecord, "id" | "userId">, userId: string) => {
      const entry: RepairRecord = {
        ...record,
        id: crypto.randomUUID(),
        userId,
      };
      persist({
        ...data,
        repairHistory: [entry, ...data.repairHistory],
      });
    },
    [data, persist]
  );

  const addPaymentMethod = useCallback(
    (
      type: PaymentMethod["type"],
      title: string,
      userId: string,
      last4?: string
    ) => {
      const isFirst = data.paymentMethods.length === 0;
      const methods = data.paymentMethods.map((m) => ({
        ...m,
        isDefault: false,
      }));
      methods.push({
        id: crypto.randomUUID(),
        type,
        title,
        last4,
        isDefault: isFirst,
        userId,
      });
      persist({ ...data, paymentMethods: methods });
    },
    [data, persist]
  );

  const setDefaultPaymentMethod = useCallback(
    (id: string) => {
      persist({
        ...data,
        paymentMethods: data.paymentMethods.map((m) => ({
          ...m,
          isDefault: m.id === id,
        })),
      });
    },
    [data, persist]
  );

  const removePaymentMethod = useCallback(
    (id: string) => {
      persist({
        ...data,
        paymentMethods: data.paymentMethods.filter((m) => m.id !== id),
      });
    },
    [data, persist]
  );

  const value = useMemo<AccountContextValue>(
    () => ({
      cars: data.cars,
      repairHistory: data.repairHistory,
      paymentMethods: data.paymentMethods,
      addCar,
      removeCar,
      addRepairRecord,
      addPaymentMethod,
      setDefaultPaymentMethod,
      removePaymentMethod,
    }),
    [
      data,
      addCar,
      removeCar,
      addRepairRecord,
      addPaymentMethod,
      setDefaultPaymentMethod,
      removePaymentMethod,
    ]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}

import { useRouter } from "next/router";
import { usePersistentForm } from "./usePersistentForm";

const routeIds: Record<string, string> = {
  "/officer": "snaily-cad-notepad-officer-data",
  "/ems-fd": "snaily-cad-notepad-ems-data-fd",
  "/dispatch": "snaily-cad-notepad-dispatch-data",
  "/tow": "snaily-cad-notepad-tow-data",
  "/taxi": "snaily-cad-notepad-taxi-data",
};

export function useNotepad() {
  const router = useRouter();
  const routeId = routeIds[router.pathname] ?? "notepad";
  const store = usePersistentForm<{ value: any[] }>({
    name: routeId,
    getStorage: () => localStorage,
  });

  return store;
}

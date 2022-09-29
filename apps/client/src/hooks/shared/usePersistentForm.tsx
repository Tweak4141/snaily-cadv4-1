import { useFormikContext } from "formik";
import * as React from "react";
import create from "zustand";
import { persist, StateStorage } from "zustand/middleware";

interface Options {
  getStorage?(): StateStorage;
  name: string;
}

export function usePersistentForm<T>({ name, getStorage }: Options) {
  const store = React.useMemo(() => {
    return create<T>(
      persist(() => ({}), {
        name,
        getStorage: () => {
          return getStorage?.() ?? sessionStorage;
        },
      }) as any,
    );
  }, [name, getStorage]);

  return { ...store, state: store.getState() };
}

export function PersistentForm({
  store,
}: {
  store: ReturnType<typeof usePersistentForm>;
}): JSX.Element {
  const { values } = useFormikContext<any>();

  React.useEffect(() => {
    store.setState(values);
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return null as unknown as JSX.Element;
}

import { useEffect, useState } from "react";
import { AsyncStorage } from "../async";

type PayloadOrUpdater<Payload> = Payload | ((payload: Payload) => Payload);

interface BaseState<Data> {
  status: string;
  error: Error | null;
  data: Data | null;
}

interface PendingState<Data> extends BaseState<Data> {
  status: "pending";
  error: null;
  data: null;
}

interface ErrorState<Data> extends BaseState<Data> {
  status: "error";
  error: Error;
  data: Data | null;
}

interface ReadyState<Data> extends BaseState<Data> {
  status: "ready";
  error: null;
  data: Data | null;
}

type AsyncState<Data> =
  | PendingState<Data>
  | ErrorState<Data>
  | ReadyState<Data>;

export function useAsyncStorage<Data>(
  key: string
): [
  state: AsyncState<Data>,
  setState: (payloadOrUpdateFn: PayloadOrUpdater<Data | null>) => Promise<void>
] {
  const [status, setStatus] = useState<"pending" | "error" | "ready">(
    "pending"
  );
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Data | null>(null);

  function handleError(error: Error) {
    setError(error);
    console.error(error);
  }

  useEffect(() => {
    AsyncStorage.getItem<Data>(key, { handleError: false })
      .then((data) => {
        setData(data);
        setStatus("ready");
      })
      .catch(handleError);
  }, [key]);

  const asyncSetData = async (
    payloadOrUpdateFn: PayloadOrUpdater<Data | null>
  ) => {
    const payload =
      typeof payloadOrUpdateFn === "function"
        ? /* @ts-expect-error */
          payloadOrUpdateFn(data)
        : payloadOrUpdateFn;

    setData(payload);

    await AsyncStorage.setItem(key, payload, { handleError: false }).catch(
      handleError
    );
  };

  if (error) {
    return [
      {
        status: "error",
        error,
        data,
      },
      asyncSetData,
    ];
  }

  if (status === "ready") {
    return [
      {
        status: "ready",
        error: null,
        data,
      },
      asyncSetData,
    ];
  }

  return [
    {
      status: "pending",
      error: null,
      data: null,
    },
    asyncSetData,
  ];
}

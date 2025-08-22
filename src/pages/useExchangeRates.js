// useExchangeRates.js
import { useEffect, useState } from "react";

// Frankfurter: 무료/키 불필요 https://www.frankfurter.app
export function useExchangeRates(base = "USD") {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let aborted = false;
    setLoading(true);
    setError(null);

    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then((r) => {
        if (!r.ok) throw new Error(`FX HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (aborted) return;
        // base(USD)는 응답 rates에 없으니 직접 추가
        setRates({ [base]: 1, ...data.rates });
        setLoading(false);
      })
      .catch((e) => {
        if (aborted) return;
        setError(e);
        setLoading(false);
      });

    return () => {
      aborted = true;
    };
  }, [base]);

  return { rates, loading, error };
}
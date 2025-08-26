// TripCalc.jsx
import React, { useEffect, useMemo, useState } from "react";
import * as S from "./TripCalc.styles";
import { useExchangeRates } from "./useExchangeRates";

// USD 기준 프리셋(1인 1일)
const PRESETS = {
  frugal: { accommodation: 35, transport: 15, meals: 20, activities: 10, shopping: 10 },
  normal: { accommodation: 80, transport: 35, meals: 40, activities: 25, shopping: 30 },
  luxury: { accommodation: 250, transport: 120, meals: 120, activities: 120, shopping: 150 },
};

const TOP_CURRENCIES = ["USD", "EUR", "KRW", "JPY", "GBP"];
const FIELDS_PER_DAY = ["accommodation", "transport", "meals", "activities", "shopping"];
const FIELDS_TOTAL = ["activitiesTotal", "shoppingTotal", "emergencyTotal"];
const FIELDS_TRIP_PER_PERSON = ["flightRoundTrip"];
const dayMs = 86400000;

// 날짜 유틸
const toDateInput = (d) => {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().split("T")[0];
};
const addDaysStr = (ds, n) => {
  const d = new Date(ds + "T00:00:00");
  return toDateInput(new Date(d.getTime() + n * dayMs));
};

const todayStr = toDateInput(new Date());
const tomorrowStr = toDateInput(new Date(Date.now() + dayMs));

// KRW/JPY는 소수점 없음
const noCents = (c) => c === "KRW" || c === "JPY";

const formatCurrency = (amount, currency) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: noCents(currency) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString(undefined, { maximumFractionDigits: noCents(currency) ? 0 : 2 })}`;
  }
};

const isBlank = (v) => v === "" || v === null || v === undefined;

const TripCalc = () => {
  const { rates, loading: fxLoading, error: fxError } = useExchangeRates("USD");
  const [currency, setCurrency] = useState("USD");
  const rateFor = (cur) => (rates?.[cur] ?? (cur === "USD" ? 1 : undefined)) || 1;

  const [travelType, setTravelType] = useState("normal");
  const [numPeople, setNumPeople] = useState(1);
  const [sharedLodging, setSharedLodging] = useState(false);
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [nights, setNights] = useState(1);

  const [costsUSD, setCostsUSD] = useState({
    accommodation: PRESETS.normal.accommodation,
    transport: PRESETS.normal.transport,
    meals: PRESETS.normal.meals,
    activities: PRESETS.normal.activities,
    shopping: PRESETS.normal.shopping,
    activitiesTotal: 0,
    shoppingTotal: 0,
    flightRoundTrip: 0,
    emergencyTotal: 0,
  });

  const [costsDisplay, setCostsDisplay] = useState({ ...costsUSD });
  const [activitiesUseTotal, setActivitiesUseTotal] = useState(false);
  const [shoppingUseTotal, setShoppingUseTotal] = useState(false);
  const [includeEmergency, setIncludeEmergency] = useState(false);

  // 프리셋 변경
  useEffect(() => {
    setCostsUSD((prev) => {
      const nextUSD = { ...prev, ...PRESETS[travelType] };
      const r = rateFor(currency);
      setCostsDisplay((prevDisp) => {
        const updated = { ...prevDisp };
        FIELDS_PER_DAY.forEach((k) => {
          if (isBlank(prevDisp[k])) return;
          const raw = nextUSD[k] * r;
          updated[k] = noCents(currency) ? Math.round(raw) : Math.round(raw * 100) / 100;
        });
        return updated;
      });
      return nextUSD;
    });
  }, [travelType, currency, rates]);

  // 통화 변경
  useEffect(() => {
    const r = rateFor(currency);
    setCostsDisplay((prev) => {
      const out = { ...prev };
      [...FIELDS_PER_DAY, ...FIELDS_TOTAL, ...FIELDS_TRIP_PER_PERSON].forEach((k) => {
        if (isBlank(prev[k])) return;
        const raw = costsUSD[k] * r;
        out[k] = noCents(currency) ? Math.round(raw) : Math.round(raw * 100) / 100;
      });
      return out;
    });
  }, [currency, rates, costsUSD]);

  // 숙박일 계산
  useEffect(() => {
    if (startDate && endDate) {
      const diff = Math.floor((new Date(endDate) - new Date(startDate)) / dayMs);
      setNights(diff > 0 ? diff : 1);
    } else setNights(1);
  }, [startDate, endDate]);

  const decPeople = () => setNumPeople((n) => Math.max(1, n - 1));
  const incPeople = () => setNumPeople((n) => n + 1);

  const onChangeCost = (key, raw) => {
    if (raw === "") {
      setCostsDisplay((p) => ({ ...p, [key]: "" }));
      return;
    }
    const v = Math.max(0, Number(raw));
    const usdVal = v / rateFor(currency);
    setCostsDisplay((p) => ({ ...p, [key]: v }));
    setCostsUSD((p) => ({ ...p, [key]: usdVal }));
  };
  const onBlurCost = (key) => {
    setCostsDisplay((p) => {
      if (isBlank(p[key])) {
        setCostsUSD((u) => ({ ...u, [key]: 0 }));
        return { ...p, [key]: 0 };
      }
      return p;
    });
  };

  const onChangeTotal = (key, raw) => onChangeCost(key, raw);
  const onBlurTotal = (key) => onBlurCost(key);

  const perDayPerPersonUSD = useMemo(() => {
    const pdActivities = activitiesUseTotal ? 0 : costsUSD.activities;
    const pdShopping = shoppingUseTotal ? 0 : costsUSD.shopping;
    return costsUSD.transport + costsUSD.meals + pdActivities + pdShopping;
  }, [costsUSD, activitiesUseTotal, shoppingUseTotal]);

  const tripTotalsUSD = useMemo(() => {
    const tActivities = activitiesUseTotal ? costsUSD.activitiesTotal : 0;
    const tShopping = shoppingUseTotal ? costsUSD.shoppingTotal : 0;
    return tActivities + tShopping;
  }, [costsUSD, activitiesUseTotal, shoppingUseTotal]);

  const perPersonPerDayUSD = useMemo(() => {
    const accPerPerson = sharedLodging
      ? costsUSD.accommodation / Math.max(1, numPeople)
      : costsUSD.accommodation;
    return accPerPerson + perDayPerPersonUSD;
  }, [costsUSD, perDayPerPersonUSD, sharedLodging, numPeople]);

  const baseTotalUSD = useMemo(() => {
    const accPart = sharedLodging
      ? costsUSD.accommodation * nights
      : costsUSD.accommodation * nights * numPeople;
    const perDayPart = perDayPerPersonUSD * nights * numPeople;
    const flightsPart = costsUSD.flightRoundTrip * numPeople;
    return accPart + perDayPart + tripTotalsUSD + flightsPart;
  }, [costsUSD, sharedLodging, nights, numPeople, perDayPerPersonUSD, tripTotalsUSD]);

  const emergencyUSD = includeEmergency ? costsUSD.emergencyTotal : 0;
  const safeFormat = (usd, cur = currency) => formatCurrency(usd * rateFor(cur), cur);

  const accPreviewDisplay = useMemo(() => {
    const perNightDisplay = costsUSD.accommodation * rateFor(currency);
    const display = noCents(currency) ? Math.round(perNightDisplay) : Math.round(perNightDisplay * 100) / 100;
    return sharedLodging ? display / Math.max(1, numPeople) : display;
  }, [costsUSD.accommodation, sharedLodging, numPeople, currency]);

  const allCodes = rates ? Object.keys(rates).sort() : [];
  const moreCodes = allCodes.filter((c) => !TOP_CURRENCIES.includes(c));

  return (
    <S.Container>
      <h1>Trip Cost Calculator</h1>
      <S.Form>
        {/* Travel style */}
        <S.FormGroup>
          <S.Label htmlFor="travelType">Travel style</S.Label>
          <S.Select id="travelType" value={travelType} onChange={(e) => setTravelType(e.target.value)}>
            <option value="frugal">Budget</option>
            <option value="normal">Standard</option>
            <option value="luxury">Luxury</option>
          </S.Select>
          <S.HelperText>Presets are examples. All values can be manually adjusted.</S.HelperText>
        </S.FormGroup>

        {/* Travelers + Shared lodging */}
        <S.FormGroup>
          <S.Label>Travelers</S.Label>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <S.Stepper>
              <S.StepBtn onClick={decPeople} disabled={numPeople <= 1}>−</S.StepBtn>
              <S.Count aria-live="polite">{numPeople}</S.Count>
              <S.StepBtn onClick={incPeople}>+</S.StepBtn>
            </S.Stepper>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" checked={sharedLodging} onChange={(e) => setSharedLodging(e.target.checked)} />
              <span>Stay together</span>
            </label>
          </div>
          <S.HelperText>
            {sharedLodging
              ? `stay together: Accommodation cost charged once per night for group. per person: ${formatCurrency(accPreviewDisplay, currency)}`
              : `Uncheck: All costs per person per day: ${formatCurrency(accPreviewDisplay, currency)}`}
          </S.HelperText>
        </S.FormGroup>

        {/* Dates */}
        <S.FormGroup>
          <S.Label>Dates</S.Label>
          <S.Row2>
            <div>
              <S.Input
                type="date"
                min={todayStr}
                value={startDate}
                onChange={(e) => {
                  const v = e.target.value || todayStr;
                  setStartDate(v);
                  const minEnd = addDaysStr(v, 1);
                  if (!endDate || endDate <= v) setEndDate(minEnd);
                }}
              />
              <S.HelperText>Start date</S.HelperText>
            </div>
            <div>
              <S.Input
                type="date"
                min={startDate ? addDaysStr(startDate, 1) : tomorrowStr}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <S.HelperText>End date</S.HelperText>
            </div>
          </S.Row2>
        </S.FormGroup>

        {/* Currency */}
        <S.FormGroup>
          <S.Label htmlFor="currency">Currency</S.Label>
          <S.Select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {TOP_CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            {rates && moreCodes.length > 0 && (
              <optgroup label="More">
                {moreCodes.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
            )}
          </S.Select>
          {fxLoading && <S.HelperText>Loading exchange rates...</S.HelperText>}
          {fxError && <S.HelperText>Failed to load exchange rates. Defaults to USD.</S.HelperText>}
          <S.HelperText>All inputs & display use selected currency. Internal calculations in USD.</S.HelperText>
        </S.FormGroup>

        {/* Flights */}
        <S.FormGroup>
          <S.Label>Flights (round-trip, per person)</S.Label>
          <S.Input
            type="number"
            min="0"
            value={isBlank(costsDisplay.flightRoundTrip) ? "" : costsDisplay.flightRoundTrip}
            onChange={(e) => onChangeCost("flightRoundTrip", e.target.value)}
            onBlur={() => onBlurCost("flightRoundTrip")}
          />
          <S.HelperText>
            {`Ex: Round-trip ticket per person • ${formatCurrency(Number(costsDisplay.flightRoundTrip) || 0, currency)}`}
          </S.HelperText>
        </S.FormGroup>

        {/* Accommodation */}
        <S.FormGroup>
          <S.Label>Accommodation (per night)</S.Label>
          <S.Input
            type="number"
            min="0"
            value={isBlank(costsDisplay.accommodation) ? "" : costsDisplay.accommodation}
            onChange={(e) => onChangeCost("accommodation", e.target.value)}
            onBlur={() => onBlurCost("accommodation")}
          />
          <S.HelperText>
            {sharedLodging
              ? `Shared lodging ON: Total per night. Preview per person: ${formatCurrency(accPreviewDisplay, currency)}`
              : `Per person per night. Preview: ${formatCurrency(accPreviewDisplay, currency)}`}
          </S.HelperText>
        </S.FormGroup>

        {/* Transport */}
        <S.FormGroup>
          <S.Label>Transport (per person / day)</S.Label>
          <S.Input
            type="number"
            min="0"
            value={isBlank(costsDisplay.transport) ? "" : costsDisplay.transport}
            onChange={(e) => onChangeCost("transport", e.target.value)}
            onBlur={() => onBlurCost("transport")}
          />
          <S.HelperText>
            {formatCurrency(Number(costsDisplay.transport) || 0, currency)}
          </S.HelperText>
        </S.FormGroup>

        {/* Meals */}
        <S.FormGroup>
          <S.Label>Meals (per person / day)</S.Label>
          <S.Input
            type="number"
            min="0"
            value={isBlank(costsDisplay.meals) ? "" : costsDisplay.meals}
            onChange={(e) => onChangeCost("meals", e.target.value)}
            onBlur={() => onBlurCost("meals")}
          />
          <S.HelperText>
            {formatCurrency(Number(costsDisplay.meals) || 0, currency)}
          </S.HelperText>
        </S.FormGroup>

        {/* Activities */}
        <S.FormGroup>
          <S.Label>Activities</S.Label>
          <S.ToggleRow>
            <label>
              <input type="checkbox" checked={activitiesUseTotal} onChange={(e) => setActivitiesUseTotal(e.target.checked)} />
              <span>Use trip total</span>
            </label>
          </S.ToggleRow>
          <S.Row2>
            <S.InputCard $disabled={activitiesUseTotal}>
              <S.Input
                type="number"
                min="0"
                value={isBlank(costsDisplay.activities) ? "" : costsDisplay.activities}
                onChange={(e) => onChangeCost("activities", e.target.value)}
                onBlur={() => onBlurCost("activities")}
                disabled={activitiesUseTotal}
              />
              <S.HelperText>
                {`Per person / day • ${formatCurrency(Number(costsDisplay.activities) || 0, currency)}`}
              </S.HelperText>
            </S.InputCard>
            <S.InputCard $disabled={!activitiesUseTotal}>
              <S.Input
                type="number"
                min="0"
                value={isBlank(costsDisplay.activitiesTotal) ? "" : costsDisplay.activitiesTotal}
                onChange={(e) => onChangeTotal("activitiesTotal", e.target.value)}
                onBlur={() => onBlurTotal("activitiesTotal")}
                disabled={!activitiesUseTotal}
              />
              <S.HelperText>
                {`Trip total (group) • ${formatCurrency(Number(costsDisplay.activitiesTotal) || 0, currency)}`}
              </S.HelperText>
            </S.InputCard>
          </S.Row2>
          <S.HelperText>{activitiesUseTotal ? "Fixed total for trip." : "Activity cost per person per day"}</S.HelperText>
        </S.FormGroup>

        {/* Shopping */}
        <S.FormGroup>
          <S.Label>Shopping</S.Label>
          <S.ToggleRow>
            <label>
              <input type="checkbox" checked={shoppingUseTotal} onChange={(e) => setShoppingUseTotal(e.target.checked)} />
              <span>Use trip total</span>
            </label>
          </S.ToggleRow>
          <S.Row2>
            <S.InputCard $disabled={shoppingUseTotal}>
              <S.Input
                type="number"
                min="0"
                value={isBlank(costsDisplay.shopping) ? "" : costsDisplay.shopping}
                onChange={(e) => onChangeCost("shopping", e.target.value)}
                onBlur={() => onBlurCost("shopping")}
                disabled={shoppingUseTotal}
              />
              <S.HelperText>
                {`Per person / day • ${formatCurrency(Number(costsDisplay.shopping) || 0, currency)}`}
              </S.HelperText>
            </S.InputCard>
            <S.InputCard $disabled={!shoppingUseTotal}>
              <S.Input
                type="number"
                min="0"
                value={isBlank(costsDisplay.shoppingTotal) ? "" : costsDisplay.shoppingTotal}
                onChange={(e) => onChangeTotal("shoppingTotal", e.target.value)}
                onBlur={() => onBlurTotal("shoppingTotal")}
                disabled={!shoppingUseTotal}
              />
              <S.HelperText>
                {`Trip total (group) • ${formatCurrency(Number(costsDisplay.shoppingTotal) || 0, currency)}`}
              </S.HelperText>
            </S.InputCard>
          </S.Row2>
          <S.HelperText>{shoppingUseTotal ? "Fixed total for trip." : "Shopping cost per person per day"}</S.HelperText>
        </S.FormGroup>

        {/* Emergency */}
        <S.FormGroup>
          <S.Label htmlFor="emergency">Emergency fund (optional)</S.Label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              id="emergency"
              type="checkbox"
              checked={includeEmergency}
              onChange={(e) => setIncludeEmergency(e.target.checked)}
            />
            <S.Input
              type="number"
              min="0"
              value={isBlank(costsDisplay.emergencyTotal) ? "" : costsDisplay.emergencyTotal}
              onChange={(e) => onChangeTotal("emergencyTotal", e.target.value)}
              onBlur={() => onBlurTotal("emergencyTotal")}
              disabled={!includeEmergency}
            />
          </div>
          <S.HelperText>
            {formatCurrency(Number(costsDisplay.emergencyTotal) || 0, currency)}
          </S.HelperText>
        </S.FormGroup>
      </S.Form>

      <S.Result role="status" aria-live="polite">
        <S.KPI>
          <S.KPITitle>Nights</S.KPITitle>
          <S.KPIValue>{nights}</S.KPIValue>
        </S.KPI>
        <S.KPI>
          <S.KPITitle>Per person / day</S.KPITitle>
          <S.KPIValue>{safeFormat(perPersonPerDayUSD)}</S.KPIValue>
        </S.KPI>
        {includeEmergency && (
          <S.KPI>
            <S.KPITitle>Emergency</S.KPITitle>
            <S.KPIValue>{safeFormat(emergencyUSD)}</S.KPIValue>
          </S.KPI>
        )}
        <S.KPI>
          <S.KPITitle>Final total</S.KPITitle>
          <S.KPIValue>{safeFormat(baseTotalUSD + emergencyUSD)}</S.KPIValue>
        </S.KPI>
      </S.Result>
    </S.Container>
  );
};

export default TripCalc;

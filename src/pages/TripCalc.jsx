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
const FIELDS_TOTAL = ["activitiesTotal", "shoppingTotal", "emergencyTotal"]; // 그룹 총액 + 비상금
const FIELDS_TRIP_PER_PERSON = ["flightRoundTrip"]; // 항공 왕복(1인 총액)
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
    return `${currency} ${amount.toLocaleString(undefined, {
      maximumFractionDigits: noCents(currency) ? 0 : 2,
    })}`;
  }
};

const isBlank = (v) => v === "" || v === null || v === undefined;

const TripCalc = () => {
  // 환율(USD 기준)
  const { rates, loading: fxLoading, error: fxError } = useExchangeRates("USD");
  const [currency, setCurrency] = useState("USD");
  const rateFor = (cur) => (rates?.[cur] ?? (cur === "USD" ? 1 : undefined)) || 1;

  // 여행 설정
  const [travelType, setTravelType] = useState("normal");
  const [numPeople, setNumPeople] = useState(1);
  const [sharedLodging, setSharedLodging] = useState(false); // 합숙 여부
  const [startDate, setStartDate] = useState(todayStr);      // 기본: 오늘
  const [endDate, setEndDate] = useState(tomorrowStr);       // 기본: 내일
  const [nights, setNights] = useState(1);

  // 내부 계산(USD) — per-day / per-trip(그룹) / per-trip(1인)
  const [costsUSD, setCostsUSD] = useState({
    accommodation: PRESETS.normal.accommodation,
    transport: PRESETS.normal.transport,
    meals: PRESETS.normal.meals,
    activities: PRESETS.normal.activities,
    shopping: PRESETS.normal.shopping,
    activitiesTotal: 0,     // 여행 전체 고정 총액(그룹)
    shoppingTotal: 0,       // 여행 전체 고정 총액(그룹)
    flightRoundTrip: 0,     // 항공 왕복(1인 총액)
    emergencyTotal: 0,      // 비상금(그룹 총액)
  });

  // 화면 표시값(선택 통화) — 비우는 중이면 "" 유지
  const [costsDisplay, setCostsDisplay] = useState({
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

  // 액티비티/쇼핑: 총액 모드 사용 여부
  const [activitiesUseTotal, setActivitiesUseTotal] = useState(false);
  const [shoppingUseTotal, setShoppingUseTotal] = useState(false);

  // 비상금 토글(금액 입력)
  const [includeEmergency, setIncludeEmergency] = useState(false);

  // 프리셋 변경: per-day만 교체(총액/항공/비상금은 유지). 빈칸 표시 필드는 그대로 비움
  useEffect(() => {
    setCostsUSD((prevUSD) => {
      const nextUSD = { ...prevUSD, ...PRESETS[travelType] };
      const r = rateFor(currency);
      setCostsDisplay((prevDisp) => {
        const updated = { ...prevDisp };
        FIELDS_PER_DAY.forEach((k) => {
          if (isBlank(prevDisp[k])) return; // 빈칸 유지
          const raw = nextUSD[k] * r;
          updated[k] = noCents(currency) ? Math.round(raw) : Math.round(raw * 100) / 100;
        });
        return updated;
      });
      return nextUSD;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelType]);

  // 통화 변경: 모든 필드 전부 변환(빈칸은 보존)
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

  // 숙박 박수(종료일 미포함, 최소 1박)
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate + "T00:00:00");
      const end = new Date(endDate + "T00:00:00");
      const diff = Math.floor((end - start) / dayMs);
      setNights(diff > 0 ? diff : 1);
    } else {
      setNights(1);
    }
  }, [startDate, endDate]);

  // 인원 스테퍼
  const decPeople = () => setNumPeople((n) => Math.max(1, n - 1));
  const incPeople = () => setNumPeople((n) => n + 1);

  // 인풋: 표시 통화 기준. 비우면 "" 유지, blur 시 빈칸이면 0 커밋(공통)
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

  const onChangeTotal = (key, raw) => {
    if (raw === "") {
      setCostsDisplay((p) => ({ ...p, [key]: "" }));
      return;
    }
    const v = Math.max(0, Number(raw));
    const usdVal = v / rateFor(currency);
    setCostsDisplay((p) => ({ ...p, [key]: v }));
    setCostsUSD((p) => ({ ...p, [key]: usdVal }));
  };
  const onBlurTotal = (key) => {
    setCostsDisplay((p) => {
      if (isBlank(p[key])) {
        setCostsUSD((u) => ({ ...u, [key]: 0 }));
        return { ...p, [key]: 0 };
      }
      return p;
    });
  };

  // 합계(USD)
  const perDayPerPersonUSD = useMemo(() => {
    const pdActivities = activitiesUseTotal ? 0 : costsUSD.activities;
    const pdShopping = shoppingUseTotal ? 0 : costsUSD.shopping;
    return costsUSD.transport + costsUSD.meals + pdActivities + pdShopping;
  }, [costsUSD, activitiesUseTotal, shoppingUseTotal]);

  const tripTotalsUSD = useMemo(() => {
    const tActivities = activitiesUseTotal ? costsUSD.activitiesTotal : 0;
    const tShopping = shoppingUseTotal ? costsUSD.shoppingTotal : 0;
    return tActivities + tShopping; // 그룹 고정 총액
  }, [costsUSD, activitiesUseTotal, shoppingUseTotal]);

  // 1인 1일 체감가(표시용): 합숙 시 숙박비는 인원수로 나눠서 환산
  const perPersonPerDayUSD = useMemo(() => {
    const accPerPerson = sharedLodging
      ? costsUSD.accommodation / Math.max(1, numPeople)
      : costsUSD.accommodation;
    return accPerPerson + perDayPerPersonUSD;
  }, [costsUSD, perDayPerPersonUSD, sharedLodging, numPeople]);

  // 전체 합계(USD) = 숙박 + (교통/식사/일일항목) + (그룹 총액) + 항공(1인총액×인원) + 비상금(옵션)
  const baseTotalUSD = useMemo(() => {
    const accPart = sharedLodging
      ? costsUSD.accommodation * nights // 합숙: 숙박은 1박당 1회
      : costsUSD.accommodation * nights * numPeople; // 일반: 1인 1일
    const perDayPart = perDayPerPersonUSD * nights * numPeople;
    const flightsPart = costsUSD.flightRoundTrip * numPeople; // 항공: 1인 왕복 × 인원
    return accPart + perDayPart + tripTotalsUSD + flightsPart;
  }, [costsUSD, sharedLodging, nights, numPeople, perDayPerPersonUSD, tripTotalsUSD]);

  const emergencyUSD = includeEmergency ? costsUSD.emergencyTotal : 0; // 비상금: 금액 그대로 더함
  const finalUSD = baseTotalUSD + emergencyUSD;

  // 표시는 선택 통화로 변환
  const safeFormat = (usd, cur = currency) => {
    const amount = usd * rateFor(cur);
    return formatCurrency(amount, cur);
  };

  // 숙박 1인 환산 미리보기(표시 통화 기준)
  const accPreviewDisplay = useMemo(() => {
    const perNightDisplay = costsUSD.accommodation * rateFor(currency);
    const display = noCents(currency) ? Math.round(perNightDisplay) : Math.round(perNightDisplay * 100) / 100;
    return sharedLodging ? display / Math.max(1, numPeople) : display;
  }, [costsUSD.accommodation, sharedLodging, numPeople, currency, rates]);

  // 통화 목록
  const allCodes = rates ? Object.keys(rates).sort() : [];
  const moreCodes = allCodes.filter((c) => !TOP_CURRENCIES.includes(c));

  return (
    <S.Container>
      <h1>Trip Cost Calculator</h1>

      <S.Form>
        {/* 1) Travel style */}
        <S.FormGroup>
          <S.Label htmlFor="travelType">Travel style</S.Label>
          <S.Select
            id="travelType"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option value="frugal">Frugal</option>
            <option value="normal">Standard</option>
            <option value="luxury">Luxury</option>
          </S.Select>
          <S.HelperText>프리셋은 예시값이야. 아래 금액은 전부 직접 수정 가능.</S.HelperText>
        </S.FormGroup>

        {/* 2) Travelers + 합숙 */}
        <S.FormGroup>
          <S.Label>Travelers</S.Label>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <S.Stepper>
              <S.StepBtn onClick={decPeople} aria-label="decrease" disabled={numPeople <= 1}>−</S.StepBtn>
              <S.Count aria-live="polite">{numPeople}</S.Count>
              <S.StepBtn onClick={incPeople} aria-label="increase">+</S.StepBtn>
            </S.Stepper>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={sharedLodging}
                onChange={(e) => setSharedLodging(e.target.checked)}
              />
              <span>Shared lodging</span>
            </label>
          </div>
          <S.HelperText>
            {sharedLodging
              ? "합숙 ON: 숙박비는 1박당 그룹 1회 청구. 숙박 미리보기는 1인 환산."
              : "합숙 OFF: 모든 항목 1인 1일 기준."}
          </S.HelperText>
        </S.FormGroup>

        {/* 3) Dates (Start + End 묶음) */}
        <S.FormGroup>
          <S.Label>Dates</S.Label>
          <S.Row2>
            <div>
              <S.Input
                id="start"
                type="date"
                min={todayStr}
                value={startDate}
                onChange={(e) => {
                  const v = e.target.value || todayStr;
                  setStartDate(v);
                  const minEnd = addDaysStr(v, 1); // 최소 +1일 보장
                  if (!endDate || endDate <= v) setEndDate(minEnd);
                }}
              />
              <S.HelperText>Start date</S.HelperText>
            </div>

            <div>
              <S.Input
                id="end"
                type="date"
                min={startDate ? addDaysStr(startDate, 1) : tomorrowStr}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <S.HelperText>End date</S.HelperText>
            </div>
          </S.Row2>
        </S.FormGroup>

        {/* 4) Currency */}
        <S.FormGroup>
          <S.Label htmlFor="currency">Currency</S.Label>
          <S.Select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {TOP_CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            {rates && moreCodes.length > 0 && (
              <optgroup label="More">
                {moreCodes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
            )}
          </S.Select>
          {fxLoading && <S.HelperText>환율 불러오는 중…</S.HelperText>}
          {fxError && <S.HelperText>환율 로딩 실패 시 USD로 계산/표시돼.</S.HelperText>}
          <S.HelperText>입력·표시 모두 선택 통화 기준. 내부 계산은 USD로 처리.</S.HelperText>
        </S.FormGroup>

        {/* 5) Flights (왕복, 1인 총액) — Currency 다음 */}
        <S.FormGroup>
          <S.Label>Flights (round-trip, per person)</S.Label>
          <S.Input
            type="number"
            min="0"
            inputMode="decimal"
            value={isBlank(costsDisplay.flightRoundTrip) ? "" : costsDisplay.flightRoundTrip}
            onChange={(e) => onChangeCost("flightRoundTrip", e.target.value)}
            onBlur={() => onBlurCost("flightRoundTrip")}
          />
          <S.HelperText>
            예: 왕복 항공권 1인 비용 • {formatCurrency(isBlank(costsDisplay.flightRoundTrip) ? 0 : Number(costsDisplay.flightRoundTrip), currency)}
          </S.HelperText>
        </S.FormGroup>

        {/* 비용 항목들 */}
        <S.FormGroup>
          <S.Label>Accommodation (per night)</S.Label>
          <S.Input
            type="number"
            min="0"
            inputMode="decimal"
            value={isBlank(costsDisplay.accommodation) ? "" : costsDisplay.accommodation}
            onChange={(e) => onChangeCost("accommodation", e.target.value)}
            onBlur={() => onBlurCost("accommodation")}
          />
          <S.HelperText>
            {sharedLodging
              ? <>합숙 ON: 1박당 그룹 전체 숙박비. 1인 환산 미리보기: {formatCurrency(accPreviewDisplay, currency)}</>
              : <>합숙 OFF: 1인 1일 숙박비. 미리보기: {formatCurrency(accPreviewDisplay, currency)}</>
            }
          </S.HelperText>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>Transport (per person / day)</S.Label>
          <S.Input
            type="number"
            min="0"
            inputMode="decimal"
            value={isBlank(costsDisplay.transport) ? "" : costsDisplay.transport}
            onChange={(e) => onChangeCost("transport", e.target.value)}
            onBlur={() => onBlurCost("transport")}
          />
          <S.HelperText>
            {formatCurrency(isBlank(costsDisplay.transport) ? 0 : Number(costsDisplay.transport), currency)}
          </S.HelperText>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>Meals (per person / day)</S.Label>
          <S.Input
            type="number"
            min="0"
            inputMode="decimal"
            value={isBlank(costsDisplay.meals) ? "" : costsDisplay.meals}
            onChange={(e) => onChangeCost("meals", e.target.value)}
            onBlur={() => onBlurCost("meals")}
          />
          <S.HelperText>
            {formatCurrency(isBlank(costsDisplay.meals) ? 0 : Number(costsDisplay.meals), currency)}
          </S.HelperText>
        </S.FormGroup>

        {/* Activities: per-day vs trip total(그룹) — PC 가로 2열, 모바일 세로 스택 */}
        <S.FormGroup>
          <S.Label>Activities</S.Label>

          <S.ToggleRow>
            <label>
              <input
                type="checkbox"
                checked={activitiesUseTotal}
                onChange={(e) => setActivitiesUseTotal(e.target.checked)}
              />
              <span>Use trip total</span>
            </label>
          </S.ToggleRow>

          <S.Row2>
            <S.InputCard $disabled={activitiesUseTotal}>
              <S.Input
                type="number"
                min="0"
                inputMode="decimal"
                value={isBlank(costsDisplay.activities) ? "" : costsDisplay.activities}
                onChange={(e) => onChangeCost("activities", e.target.value)}
                onBlur={() => onBlurCost("activities")}
                disabled={activitiesUseTotal}
                placeholder={activitiesUseTotal ? "Disabled" : undefined}
              />
              <S.HelperText>
                Per person / day • {formatCurrency(isBlank(costsDisplay.activities) ? 0 : Number(costsDisplay.activities), currency)}
              </S.HelperText>
            </S.InputCard>

            <S.InputCard $disabled={!activitiesUseTotal}>
              <S.Input
                type="number"
                min="0"
                inputMode="decimal"
                value={isBlank(costsDisplay.activitiesTotal) ? "" : costsDisplay.activitiesTotal}
                onChange={(e) => onChangeTotal("activitiesTotal", e.target.value)}
                onBlur={() => onBlurTotal("activitiesTotal")}
                disabled={!activitiesUseTotal}
                placeholder={!activitiesUseTotal ? "Disabled" : undefined}
              />
              <S.HelperText>
                Trip total (group) • {formatCurrency(isBlank(costsDisplay.activitiesTotal) ? 0 : Number(costsDisplay.activitiesTotal), currency)}
              </S.HelperText>
            </S.InputCard>
          </S.Row2>

          <S.HelperText>
            {activitiesUseTotal
              ? "여행 기간과 무관하게 고정 총액(그룹)으로 계산돼."
              : "1인 1일 금액 × 인원 × 박수로 계산돼."
            }
          </S.HelperText>
        </S.FormGroup>

        {/* Shopping: per-day vs trip total(그룹) — PC 가로 2열, 모바일 세로 스택 */}
        <S.FormGroup>
          <S.Label>Shopping</S.Label>

          <S.ToggleRow>
            <label>
              <input
                type="checkbox"
                checked={shoppingUseTotal}
                onChange={(e) => setShoppingUseTotal(e.target.checked)}
              />
              <span>Use trip total</span>
            </label>
          </S.ToggleRow>

          <S.Row2>
            <S.InputCard $disabled={shoppingUseTotal}>
              <S.Input
                type="number"
                min="0"
                inputMode="decimal"
                value={isBlank(costsDisplay.shopping) ? "" : costsDisplay.shopping}
                onChange={(e) => onChangeCost("shopping", e.target.value)}
                onBlur={() => onBlurCost("shopping")}
                disabled={shoppingUseTotal}
                placeholder={shoppingUseTotal ? "Disabled" : undefined}
              />
              <S.HelperText>
                Per person / day • {formatCurrency(isBlank(costsDisplay.shopping) ? 0 : Number(costsDisplay.shopping), currency)}
              </S.HelperText>
            </S.InputCard>

            <S.InputCard $disabled={!shoppingUseTotal}>
              <S.Input
                type="number"
                min="0"
                inputMode="decimal"
                value={isBlank(costsDisplay.shoppingTotal) ? "" : costsDisplay.shoppingTotal}
                onChange={(e) => onChangeTotal("shoppingTotal", e.target.value)}
                onBlur={() => onBlurTotal("shoppingTotal")}
                disabled={!shoppingUseTotal}
                placeholder={!shoppingUseTotal ? "Disabled" : undefined}
              />
              <S.HelperText>
                Trip total (group) • {formatCurrency(isBlank(costsDisplay.shoppingTotal) ? 0 : Number(costsDisplay.shoppingTotal), currency)}
              </S.HelperText>
            </S.InputCard>
          </S.Row2>

          <S.HelperText>
            {shoppingUseTotal
              ? "여행 기간과 무관하게 고정 총액(그룹)으로 계산돼."
              : "1인 1일 금액 × 인원 × 박수로 계산돼."
            }
          </S.HelperText>
        </S.FormGroup>

        {/* 비상금: 금액 입력(그룹 총액) */}
        <S.FormGroup>
          <S.Label htmlFor="emergency">Emergency fund (optional, amount)</S.Label>
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
              inputMode="decimal"
              value={isBlank(costsDisplay.emergencyTotal) ? "" : costsDisplay.emergencyTotal}
              onChange={(e) => onChangeTotal("emergencyTotal", e.target.value)}
              onBlur={() => onBlurTotal("emergencyTotal")}
              disabled={!includeEmergency}
              placeholder={!includeEmergency ? "Disabled" : undefined}
            />
          </div>
          {includeEmergency && (
            <S.HelperText>Emergency: {safeFormat(costsUSD.emergencyTotal)}</S.HelperText>
          )}
        </S.FormGroup>
      </S.Form>

      {/* KPI: Final total도 같은 그리드에 함께 노출 */}
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
          <S.KPIValue>{safeFormat(finalUSD)}</S.KPIValue>
        </S.KPI>
      </S.Result>
    </S.Container>
  );
};

export default TripCalc;
// TripCalc.styles.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 5%;
  color: #0f172a;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
    "Segoe UI Emoji";
  @media (max-width: 640px) {
    padding: 15% 2%;
  }  
`;

export const Form = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #475569;
`;

export const Select = styled.select`
  appearance: none;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  }

  /* 비활성화 시 더 진한 회색 톤 */
  &:disabled {
    background: #e5e7eb;
    border-color: #94a3b8;
    color: #334155;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 1;
  }
`;

export const Input = styled.input`
  padding: 10px 0 10px 2px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease;
  width: 100%;

  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.15);
  }

  /* 비활성화 시 더 진한 회색 톤 */
  &:disabled {
    background: #e5e7eb;
    border-color: #94a3b8;
    color: #334155;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 1;
  }

  &:disabled::placeholder {
    color: #64748b;
  }
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: #64748b;
`;

export const Result = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const KPI = styled.div`
  background: linear-gradient(180deg, #ffffff, #f1f5f9);
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px 18px;
`;

export const KPITitle = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-bottom: 6px;
`;

export const KPIValue = styled.div`
  font-weight: 700;
  color: #0f172a;
  font-size: clamp(18px, 5.5vw, 28px);
  line-height: 1.15;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
  text-align: right;

  @media (max-width: 480px) {
    font-size: clamp(16px, 6vw, 24px);
  }
`;

/* Activities / Shopping 토글 라인 (문구는 유지) */
export const ToggleRow = styled.div`
  display: flex;
  justify-content: flex-end;

  label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #334155;
    font-size: 13px;
    user-select: none;
  }

  @media (max-width: 640px) {
    justify-content: space-between;
    label {
      font-size: 12px;
      line-height: 1.2;
      word-break: keep-all;
    }
  }
`;

/* 두 입력을 PC에선 가로 2열, 모바일에선 1열(아래로) */
export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* 비활성은 진한 회색, 활성은 기본 카드. PC/모바일 공통 */
export const InputCard = styled.div`
  background: ${(p) => (p.$disabled ? "#e5e7eb" : "#ffffff")};
  border: 1px solid ${(p) => (p.$disabled ? "#94a3b8" : "#e2e8f0")};
  border-radius: 10px;
  padding: 10px;
  transition: border-color 0.15s ease, background-color 0.15s ease;
`;

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const StepBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #0f172a;
  font-size: 20px;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover { border-color: #94a3b8; }
  &:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const Count = styled.div`
  min-width: 32px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;
import {
  ValueType,
  Value,
  VehicleValue,
  WeaponValue,
  StatusValue,
  DepartmentValue,
  DivisionValue,
  EmployeeValue,
  DriversLicenseCategoryValue,
  Officer,
  CombinedLeoUnit,
  EmsFdDeputy,
  QualificationValue,
  CallTypeValue,
} from "@snailycad/types";

export type ValueWithValueObj =
  | VehicleValue
  | WeaponValue
  | StatusValue
  | DepartmentValue
  | DivisionValue
  | EmployeeValue
  | DriversLicenseCategoryValue
  | QualificationValue
  | CallTypeValue;

export type AnyValue = Value<ValueType> | ValueWithValueObj;

export function isBaseValue(value: AnyValue): value is Value<ValueType> {
  return "createdAt" in value && typeof value.type === "string";
}

export function hasValueObj(value: AnyValue): value is ValueWithValueObj {
  return "value" in value && typeof value.value === "object";
}

export function isValue(value: AnyValue | null): value is ValueWithValueObj {
  if (!value) return false;
  if (typeof value.value === "string") return true;

  return (
    isVehicleValue(value) ||
    isWeaponValue(value) ||
    isStatusValue(value) ||
    isDepartmentValue(value) ||
    isDivisionValue(value) ||
    isEmployeeValue(value) ||
    isUnitQualification(value) ||
    isDLCategoryValue(value) ||
    isCallTypeValue(value)
  );
}

export function isVehicleValue(value: AnyValue): value is VehicleValue {
  return hasValueObj(value) && value.value.type === ValueType.VEHICLE;
}

export function isWeaponValue(value: AnyValue): value is WeaponValue {
  return hasValueObj(value) && value.value.type === ValueType.WEAPON;
}

export function isStatusValue(value: AnyValue): value is StatusValue {
  return hasValueObj(value) && value.value.type === ValueType.CODES_10;
}

export function isDepartmentValue(value: AnyValue): value is DepartmentValue {
  return hasValueObj(value) && value.value.type === ValueType.DEPARTMENT;
}

export function isDivisionValue(value: AnyValue): value is DivisionValue {
  return hasValueObj(value) && value.value.type === ValueType.DIVISION;
}

export function isEmployeeValue(value: AnyValue): value is EmployeeValue {
  return hasValueObj(value) && value.value.type === ValueType.BUSINESS_ROLE;
}

export function isUnitQualification(value: AnyValue): value is QualificationValue {
  return hasValueObj(value) && value.value.type === ValueType.QUALIFICATION;
}

export function isDLCategoryValue(value: AnyValue): value is DriversLicenseCategoryValue {
  return hasValueObj(value) && value.value.type === ValueType.DRIVERSLICENSE_CATEGORY;
}

export function isCallTypeValue(value: AnyValue): value is CallTypeValue {
  return hasValueObj(value) && value.value.type === ValueType.CALL_TYPE;
}

export function isUnitCombined(
  unit: Officer | CombinedLeoUnit | EmsFdDeputy,
): unit is CombinedLeoUnit {
  return !("citizenId" in unit) || "officers" in unit;
}

export function isUnitOfficer(unit: Officer | CombinedLeoUnit | EmsFdDeputy): unit is Officer {
  return !isUnitCombined(unit) && "divisions" in unit && Array.isArray(unit.divisions);
}

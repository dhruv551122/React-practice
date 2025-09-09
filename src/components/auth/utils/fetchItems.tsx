import type { City, State } from "../Register/Register";

export function fetchStates(
  e: React.ChangeEvent,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  URL: string,
  requestOptions: { method: string; headers: Headers },
  setNextOptions: React.Dispatch<React.SetStateAction<State[]>>
) {
  const data = JSON.parse((e.target as HTMLSelectElement).value);
  setFieldValue("country", JSON.stringify(data));
  setFieldValue("state", "");
  setFieldValue("city", "");
  fetch(URL + data.code + "/states", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setNextOptions(data);
    });
}

export function fetchCities(
  e: React.ChangeEvent,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  URL: string,
  requestOptions: { method: string; headers: Headers },
  setNextOptions: React.Dispatch<React.SetStateAction<City[]>>,
  countryCode: string
) {
  const data = JSON.parse((e.target as HTMLSelectElement).value);
  setFieldValue("state", JSON.stringify(data));
  setFieldValue("city", "");
  fetch(URL + countryCode + "/states/" + data.code + "/cities", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setNextOptions(data);
    });
}

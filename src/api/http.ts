const BASE_URL = import.meta.env.VITE_API_URL;

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}) {
  const bodyPayload = {
    ...payload,
    role: "Society",
  };

  const response = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function registerHRD(payload: {
  name: string;
  email: string;
  password: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyDescription: string;
}) {
  const bodyPayload = {
    ...payload,
    role: "HRD",
  };

  const response = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function loginHRD(payload: { email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function addPosition(payload: {
  positionName: string;
  capacity: number;
  description: string;
  submissionStartDate: string;
  submissionEndDate: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/position/add-position`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function updatePosition(
  id: number,
  payload: {
    positionName: string;
    capacity: number;
    description: string;
    submissionStartDate: string;
    submissionEndDate: string;
  }
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/position/update-position/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function getHRDPositions() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/position/position-view`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function getJobs() {
  const response = await fetch(`${BASE_URL}/position/position-view`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}
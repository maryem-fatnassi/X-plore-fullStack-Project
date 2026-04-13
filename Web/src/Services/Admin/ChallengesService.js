const API_URL = `${process.env.REACT_APP_API_URL}/api/admin/challenges`;

export async function getChallenges({ page = 1, limit = 10, difficulty = "easy" , sortBy = "createdAt", sortOrder = 'desc'}) {
  try {
    const url = new URL(API_URL);

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("difficulty", difficulty);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("sortOrder", sortOrder);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch challenges");
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
}

export async function deleteChallenge(id) {
  const res = await fetch(
    API_URL + `/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete challenge");
  }

  return res.json();
}

export async function getChallengeById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// CREATE
export async function createChallenge(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: data
  });

  return res.json();
}

// UPDATE
export async function updateChallenge(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: data
  });

  return res.json();
}

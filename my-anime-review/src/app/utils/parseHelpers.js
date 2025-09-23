import axios from "axios";

// Cria usuário se não existir
export async function createOrGetUser(username) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PARSE_SERVER_URL}/classes/Users?where=${encodeURIComponent(JSON.stringify({username}))}`,
    {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_KEY,
      },
    }
  );

  if (res.data.results.length > 0) return res.data.results[0];

  const newUser = await axios.post(
    `${process.env.NEXT_PUBLIC_PARSE_SERVER_URL}/classes/Users`,
    { username },
    {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return newUser.data;
}

// CREATE
export async function createReview(animeId, username, comment, rating) {
  const user = await createOrGetUser(username);
  return axios.post(
    `${process.env.NEXT_PUBLIC_PARSE_SERVER_URL}/classes/Reviews`,
    {
      anime_id: animeId.toString(),
      user: { __type: "Pointer", className: "Users", objectId: user.objectId },
      comment,
      rating: Number(rating),
    },
    {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_KEY,
        "Content-Type": "application/json",
      },
    }
  );
}

// READ
export async function getReviews(animeId) {
  const where = encodeURIComponent(JSON.stringify({ anime_id: animeId.toString() }));
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PARSE_SERVER_URL}/classes/Reviews?where=${where}&include=user`,
    {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_KEY,
      },
    }
  );
  return res.data.results;
}

// UPDATE
export async function updateReview(objectId, comment, rating) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_PARSE_SERVER_URL}/classes/Reviews/${objectId}`,
    { comment, rating: Number(rating) },
    {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_KEY,
        "Content-Type": "application/json",
      },
    }
  );
}

// DELETE
export async function deleteReview(objectId) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_PARSE_SERVER_URL}/classes/Reviews/${objectId}`,
    {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_KEY,
      },
    }
  );
}

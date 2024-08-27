const headers = {
    'Content-Type': 'application/json'
}

const stringify = (body) => JSON.stringify(body) 

export const postLogin = createAsyncThunk("postLogin", async () => {
  const res = await fetch(``, {
    headers,
    body: stringify(payload)
  });
  return res?.json();
});

export const postRegister = createAsyncThunk("postRegister", async (payload) => {
    const res = await fetch(``, {
        headers,
        body: stringify(payload)
      });
    return res?.json();
  });
  
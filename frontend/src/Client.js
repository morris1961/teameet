const client = new WebSocket('ws://localhost:4000');

export const client_ws = client;
export const login_req = async (data) => {await client.send(JSON.stringify(data)); console.log(data)};
export const register_req = async (data) => {await client.send(JSON.stringify(data)); console.log(data)};
export const index_req = async (data) => {await client.send(JSON.stringify(data)); console.log(data)};
export const createGroup_req = async (data) => {await client.send(JSON.stringify(data)); console.log(data)};
export const joinGroup_req = async (data) => {await client.send(JSON.stringify(data)); console.log(data)};
export const renewProfile_req = async (data) => {await client.send(JSON.stringify(data)); console.log(data)};

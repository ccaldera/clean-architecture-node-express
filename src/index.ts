import { container } from './inversify.config';
import { LoginEndpoint } from './presentation/endpoints/login.endpoint'
import express from "express";

const app = express()
const port = 3000

app.use(express.json());

const loginEndpoint = container.get<LoginEndpoint>(LoginEndpoint);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', async (req, res) => {
  await loginEndpoint.login(req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
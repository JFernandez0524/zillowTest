import 'dotenv/config';
import { app } from './app.js';
import axios from 'axios';
import morgan from 'morgan';

const PORT = process.env.PORT || 5000;
app.use(morgan('dev'));

app.get('/zestimate', async (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.bridgedataoutput.com/api/v2/zestimates_v2/zestimates?address=74 Florida St&city=Elizabeth',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.request(config);
    const data = await response.data;
    // console.log(jsonResponse.bundle[0].zpid);
    res.send(JSON.stringify(data.bundle[0].zestimate));
  } catch (error) {
    console.error(error);
  }
});

app.get('/test', async (req, res) => {
  try {
    const response = await axios.get('https://zillow.com');
    console.log(response);
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});

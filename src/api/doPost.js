import axios from 'axios';

async function doPost(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in doPost: ${error}`);
    return null;
  }
}

export default doPost;